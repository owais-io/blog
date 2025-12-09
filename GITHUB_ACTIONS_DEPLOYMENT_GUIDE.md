# GitHub Actions Automated Deployment Guide
## Automatic Blog Updates on Every Push

**What This Does:**
- You add a new blog post (MDX file)
- You commit and push to GitHub
- GitHub Actions automatically:
  - Builds your static site
  - Uploads to S3
  - Invalidates CloudFront cache
  - Your blog is updated in 3-5 minutes! 🚀

**No manual commands needed!**

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Get Your AWS Credentials](#step-1-get-your-aws-credentials)
3. [Step 2: Get Your CloudFront Distribution ID](#step-2-get-your-cloudfront-distribution-id)
4. [Step 3: Create GitHub Secrets](#step-3-create-github-secrets)
5. [Step 4: Create GitHub Actions Workflow File](#step-4-create-github-actions-workflow-file)
6. [Step 5: Commit and Push Workflow](#step-5-commit-and-push-workflow)
7. [Step 6: Test the Automation](#step-6-test-the-automation)
8. [Step 7: Monitor Deployments](#step-7-monitor-deployments)
9. [Understanding the Workflow](#understanding-the-workflow)
10. [Troubleshooting](#troubleshooting)
11. [Optional Enhancements](#optional-enhancements)

---

## Prerequisites

Before starting, ensure you have:

- ✅ GitHub repository for your blog (public or private)
- ✅ AWS CLI configured locally
- ✅ S3 bucket created (owais.io)
- ✅ CloudFront distribution deployed
- ✅ Blog successfully deployed manually (Steps 1-8 complete)
- ✅ Git installed on your computer

**If you don't have a GitHub repository yet, see [Create GitHub Repository](#appendix-a-create-github-repository) first.**

---

## Step 1: Get Your AWS Credentials

You need AWS access keys that GitHub Actions will use to deploy your blog.

### Option A: Use Existing Credentials (Quick)

If you already configured AWS CLI (in Prerequisites section), you can use those credentials.

**Find your credentials:**

**Windows:**
```bash
notepad %USERPROFILE%\.aws\credentials
```

**Mac/Linux:**
```bash
cat ~/.aws/credentials
```

**You'll see:**
```ini
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Copy these values** to a notepad.

---

### Option B: Create New Credentials (Recommended - More Secure)

Create dedicated credentials for GitHub Actions with limited permissions.

#### Step 1.1: Go to IAM Console

1. **Open:** https://console.aws.amazon.com/iam/
2. **Click:** "Users" (left sidebar)
3. **Click:** "Create user" (orange button)

#### Step 1.2: Create User

**Step 1: Specify user details**

4. **User name:** `github-actions-blog-deploy`
5. **Select:** ⬜ "Provide user access to the AWS Management Console" (UNCHECK - not needed)
6. **Click:** "Next"

**Step 2: Set permissions**

7. **Select:** "Attach policies directly"

8. **Search and select these 3 policies:**
   - ✅ `AmazonS3FullAccess` (for S3 upload)
   - ✅ `CloudFrontFullAccess` (for cache invalidation)

   **Or create a custom policy (more secure):**

   Click "Create policy" (opens new tab)

   **Policy JSON:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "S3Upload",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:DeleteObject",
           "s3:ListBucket",
           "s3:GetObject"
         ],
         "Resource": [
           "arn:aws:s3:::owais.io",
           "arn:aws:s3:::owais.io/*"
         ]
       },
       {
         "Sid": "CloudFrontInvalidation",
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation",
           "cloudfront:GetInvalidation",
           "cloudfront:ListInvalidations"
         ],
         "Resource": "arn:aws:cloudfront::*:distribution/*"
       }
     ]
   }
   ```

   - Policy name: `BlogDeploymentPolicy`
   - Click "Create policy"
   - Go back to user creation tab
   - Refresh policies and select `BlogDeploymentPolicy`

9. **Click:** "Next"

**Step 3: Review and create**

10. **Review** the settings
11. **Click:** "Create user"

#### Step 1.3: Create Access Keys

12. **Click** on the user name: `github-actions-blog-deploy`
13. **Click** "Security credentials" tab
14. **Scroll down** to "Access keys" section
15. **Click:** "Create access key"

**Access key best practices:**

16. **Select:** "Command Line Interface (CLI)"
17. **Check** the confirmation checkbox: "I understand..."
18. **Click:** "Next"

**Set description tag (optional):**

18. **Description:** `GitHub Actions blog deployment`
19. **Click:** "Create access key"

**Retrieve access keys:**

20. You'll see:
    - **Access key ID:** `AKIAIOSFODNN7EXAMPLE`
    - **Secret access key:** `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

21. **IMPORTANT:**
    - **Copy both values** to a secure notepad
    - **Download CSV file** (backup)
    - **You can't see the secret key again!**

22. **Click:** "Done"

---

## Step 2: Get Your CloudFront Distribution ID

You need your CloudFront distribution ID for cache invalidation.

### Method 1: From CloudFront Console

1. **Go to:** https://console.aws.amazon.com/cloudfront/
2. **Find your distribution** (Domain: d9el5q3a256si.cloudfront.net)
3. **Copy the ID** from the "ID" column
   - Example: `E1A2B3C4D5E6F7`

**Save this value!**

---

### Method 2: Using AWS CLI

```bash
aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'owais.io')]].Id" --output text
```

**Output:** `E1A2B3C4D5E6F7`

---

## Step 3: Create GitHub Secrets

GitHub Secrets securely store your AWS credentials. They're encrypted and only accessible to GitHub Actions.

### Step 3.1: Go to Your Repository

1. **Open your browser**
2. **Go to:** https://github.com/YOUR_USERNAME/YOUR_REPO
   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `YOUR_REPO` with your repository name

Example: `https://github.com/owais-io/blog`

---

### Step 3.2: Access Repository Settings

3. **Click:** "Settings" tab (top navigation bar)
   - ⚠️ If you don't see "Settings", you might not have admin permissions

---

### Step 3.3: Navigate to Secrets

4. **Click:** "Secrets and variables" (left sidebar)
5. **Click:** "Actions" (submenu appears)

You'll see the "Actions secrets and variables" page.

---

### Step 3.4: Add AWS Access Key ID

6. **Click:** "New repository secret" (green button, top right)

**Add secret:**

7. **Name:** `AWS_ACCESS_KEY_ID`
   - Must be exactly this (case-sensitive)
   - No spaces

8. **Secret:** Paste your AWS Access Key ID
   - Example: `AKIAIOSFODNN7EXAMPLE`

9. **Click:** "Add secret"

**Success!** You'll see "AWS_ACCESS_KEY_ID" in the secrets list.

---

### Step 3.5: Add AWS Secret Access Key

10. **Click:** "New repository secret" again

**Add secret:**

11. **Name:** `AWS_SECRET_ACCESS_KEY`
    - Must be exactly this (case-sensitive)

12. **Secret:** Paste your AWS Secret Access Key
    - Example: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

13. **Click:** "Add secret"

**Success!** You'll see "AWS_SECRET_ACCESS_KEY" in the list.

---

### Step 3.6: Add CloudFront Distribution ID

14. **Click:** "New repository secret" again

**Add secret:**

15. **Name:** `CLOUDFRONT_DISTRIBUTION_ID`
    - Must be exactly this (case-sensitive)

16. **Secret:** Paste your CloudFront Distribution ID
    - Example: `E1A2B3C4D5E6F7`

17. **Click:** "Add secret"

**Success!** You'll see "CLOUDFRONT_DISTRIBUTION_ID" in the list.

---

### Step 3.7: Verify Secrets

You should now see **3 secrets:**

| Name | Last updated |
|------|--------------|
| AWS_ACCESS_KEY_ID | Just now |
| AWS_SECRET_ACCESS_KEY | Just now |
| CLOUDFRONT_DISTRIBUTION_ID | Just now |

**You can't view the secret values** (security feature). If you made a mistake, delete and recreate.

---

## Step 4: Create GitHub Actions Workflow File

Now create the automation workflow file in your repository.

### Step 4.1: Understand the Directory Structure

GitHub Actions workflows live in:
```
.github/
└── workflows/
    └── deploy.yml
```

You need to create this structure in your repository.

---

### Step 4.2: Create the Workflow File Locally

**Open your blog directory in terminal/command prompt:**

```bash
cd D:\blog
```

**Create the directories:**

**Windows (PowerShell):**
```powershell
mkdir .github\workflows -Force
```

**Mac/Linux:**
```bash
mkdir -p .github/workflows
```

---

### Step 4.3: Create the Workflow File

**Open your code editor** (VS Code, Notepad++, etc.) or use command line:

**Windows:**
```powershell
notepad .github\workflows\deploy.yml
```

**Mac/Linux:**
```bash
nano .github/workflows/deploy.yml
```

---

### Step 4.4: Paste the Workflow Configuration

**Copy and paste this entire YAML configuration:**

```yaml
name: Deploy Blog to S3 + CloudFront

# Trigger: Run on every push to main branch
on:
  push:
    branches: [ main ]

# Workflow will run these jobs
jobs:
  deploy:
    # Use Ubuntu Linux runner (GitHub-hosted)
    runs-on: ubuntu-latest

    # Steps to execute
    steps:
      # Step 1: Checkout the code
      - name: Checkout repository
        uses: actions/checkout@v4

      # Step 2: Setup Node.js environment
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm ci

      # Step 4: Build static site
      - name: Build Next.js site
        run: npm run build

      # Step 5: Configure AWS credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      # Step 6: Upload to S3
      - name: Sync files to S3
        run: |
          aws s3 sync out/ s3://owais.io/ --delete --no-progress

      # Step 7: Invalidate CloudFront cache
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

      # Step 8: Deployment summary
      - name: Print deployment summary
        run: |
          echo "✅ Deployment completed successfully!"
          echo "📦 Static files uploaded to S3"
          echo "🔄 CloudFront cache invalidated"
          echo "🌐 Site: https://owais.io"
          echo "⏳ Changes will be visible in 1-2 minutes"
```

**Save the file!**

---

### Step 4.5: Verify File Structure

Your repository should now have:

```
D:\blog\
├── .github/
│   └── workflows/
│       └── deploy.yml          ← NEW FILE
├── app/
├── content/
│   └── posts/
│       └── (your blog posts)
├── public/
├── next.config.mjs
├── package.json
└── ...
```

---

## Step 5: Commit and Push Workflow

Now commit and push the workflow file to GitHub.

### Step 5.1: Check Git Status

```bash
git status
```

**You should see:**
```
Untracked files:
  .github/workflows/deploy.yml
```

---

### Step 5.2: Add the Workflow File

```bash
git add .github/workflows/deploy.yml
```

---

### Step 5.3: Commit the Workflow

```bash
git commit -m "Add GitHub Actions workflow for automated deployment"
```

---

### Step 5.4: Push to GitHub

```bash
git push origin main
```

**Expected output:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
...
To https://github.com/YOUR_USERNAME/YOUR_REPO.git
   abc1234..def5678  main -> main
```

---

### Step 5.5: Verify Push Succeeded

**Go to GitHub in your browser:**
```
https://github.com/YOUR_USERNAME/YOUR_REPO
```

**Check:**
- ✅ You should see `.github/workflows/deploy.yml` in file list
- ✅ A workflow run should have started automatically!

---

## Step 6: Test the Automation

Let's test if the automation works by adding a test blog post.

### Step 6.1: Create a Test Post

**Create a new file:**

```bash
D:\blog\content\posts\test-automation-post.mdx
```

**Content:**

```mdx
---
title: "Testing GitHub Actions Automation"
date: "2025-12-09"
description: "This post was deployed automatically via GitHub Actions!"
category: "Test"
tags: ["automation", "github-actions", "ci-cd"]
author: "Owais"
published: true
---

# Testing Automated Deployment

This blog post was created to test the GitHub Actions automation.

## What Just Happened?

1. I created this MDX file locally
2. Committed it to Git
3. Pushed to GitHub
4. GitHub Actions automatically:
   - Built the site
   - Uploaded to S3
   - Invalidated CloudFront cache
5. The blog updated automatically! 🎉

## Benefits

- ✅ No manual `npm run build`
- ✅ No manual `aws s3 sync`
- ✅ No manual cache invalidation
- ✅ Just git commit and push!

**Deployment time:** 3-5 minutes from push to live.

---

**Generated with:** GitHub Actions + AWS S3 + CloudFront
```

**Save the file.**

---

### Step 6.2: Commit and Push the Test Post

```bash
# Add the new post
git add content/posts/test-automation-post.mdx

# Commit with a message
git commit -m "Add test post for GitHub Actions automation"

# Push to GitHub
git push origin main
```

---

### Step 6.3: Watch the Workflow Run

**Immediately after pushing:**

1. **Go to GitHub:** https://github.com/YOUR_USERNAME/YOUR_REPO
2. **Click:** "Actions" tab (top navigation)
3. **You'll see:** A workflow run in progress!

**Workflow name:** "Deploy Blog to S3 + CloudFront"
**Status:** 🟡 Running (yellow dot)

---

## Step 7: Monitor Deployments

### Step 7.1: View Workflow Details

**Click on the workflow run** (the commit message)

**You'll see:**
- **Checkout repository** ✅ (completed)
- **Setup Node.js** ✅ (completed)
- **Install dependencies** 🟡 (running)
- **Build Next.js site** ⏳ (waiting)
- **Configure AWS credentials** ⏳ (waiting)
- **Sync files to S3** ⏳ (waiting)
- **Invalidate CloudFront cache** ⏳ (waiting)
- **Print deployment summary** ⏳ (waiting)

---

### Step 7.2: Watch Real-Time Logs

**Click on a step** to see detailed logs:

**Example: "Build Next.js site"**
```
Run npm run build
> blog@0.1.0 build
> next build

✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (135/135)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    2.71 kB        104 kB
...
```

---

### Step 7.3: Verify Deployment Success

**When all steps complete:**

**Status:** ✅ **Success** (green checkmark)

**Last step output:**
```
✅ Deployment completed successfully!
📦 Static files uploaded to S3
🔄 CloudFront cache invalidated
🌐 Site: https://owais.io
⏳ Changes will be visible in 1-2 minutes
```

**Total time:** 3-5 minutes

---

### Step 7.4: Check Your Live Blog

**Wait 1-2 minutes** for CloudFront invalidation to propagate.

**Then visit:**
```
https://owais.io
```

**You should see:**
- ✅ Your new test post in the blog list
- ✅ Accessible at: `https://owais.io/blog/test-automation-post/`

**🎉 AUTOMATION WORKING!** 🎉

---

## Understanding the Workflow

Let's break down what happens when you push to GitHub:

### Trigger

```yaml
on:
  push:
    branches: [ main ]
```

**Means:** Run this workflow every time you push to the `main` branch.

---

### Job: Deploy

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
```

**Means:** Run on a fresh Ubuntu Linux virtual machine (GitHub provides this for free).

---

### Steps Breakdown

#### Step 1: Checkout Repository

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

**What it does:** Downloads your repository code to the runner.

---

#### Step 2: Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

**What it does:**
- Installs Node.js version 18
- Caches npm dependencies (faster subsequent runs)

---

#### Step 3: Install Dependencies

```yaml
- name: Install dependencies
  run: npm ci
```

**What it does:**
- Runs `npm ci` (clean install)
- Faster and more reliable than `npm install`
- Uses exact versions from `package-lock.json`

---

#### Step 4: Build Static Site

```yaml
- name: Build Next.js site
  run: npm run build
```

**What it does:**
- Runs `npm run build`
- Generates static files in `out/` directory
- Same as you do manually

---

#### Step 5: Configure AWS Credentials

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

**What it does:**
- Configures AWS CLI with your credentials
- Uses secrets you created earlier
- Sets region to us-east-1

---

#### Step 6: Upload to S3

```yaml
- name: Sync files to S3
  run: |
    aws s3 sync out/ s3://owais.io/ --delete --no-progress
```

**What it does:**
- Uploads `out/` directory to S3
- `--delete` removes old files
- `--no-progress` reduces log clutter

---

#### Step 7: Invalidate CloudFront Cache

```yaml
- name: Invalidate CloudFront cache
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

**What it does:**
- Clears CloudFront cache
- Forces CloudFront to fetch new files from S3
- Makes changes visible immediately

---

#### Step 8: Deployment Summary

```yaml
- name: Print deployment summary
  run: |
    echo "✅ Deployment completed successfully!"
    ...
```

**What it does:**
- Prints success message
- Shows in workflow logs
- Confirms deployment completed

---

## Troubleshooting

### Issue: Workflow Doesn't Start

**Symptoms:**
- You pushed to GitHub
- No workflow appears in "Actions" tab

**Solutions:**

1. **Check branch name:**
   ```bash
   git branch --show-current
   ```
   Should show: `main`

   If not `main`, either:
   - Rename branch: `git branch -m main`
   - Or update workflow to match your branch name

2. **Check file location:**
   - Must be: `.github/workflows/deploy.yml`
   - Exact path and filename (case-sensitive)

3. **Check YAML syntax:**
   - Indentation must be 2 spaces (not tabs)
   - Use YAML validator: https://www.yamllint.com/

---

### Issue: Build Fails

**Symptoms:**
- Workflow starts
- "Build Next.js site" step fails
- Red X on step

**Solutions:**

1. **Check build locally:**
   ```bash
   npm run build
   ```
   If this fails locally, fix the error first.

2. **Check Node.js version:**
   - Workflow uses Node.js 18
   - Your local might use different version
   - Update workflow or fix compatibility

3. **Check dependencies:**
   ```bash
   npm ci
   npm run build
   ```
   Ensure `package-lock.json` is committed.

---

### Issue: AWS Authentication Fails

**Symptoms:**
- "Configure AWS credentials" step fails
- Error: "The security token included in the request is invalid"

**Solutions:**

1. **Verify secrets exist:**
   - Go to: GitHub → Settings → Secrets → Actions
   - Should see: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, CLOUDFRONT_DISTRIBUTION_ID

2. **Check secret names:**
   - Must be EXACTLY: `AWS_ACCESS_KEY_ID` (case-sensitive)
   - Must be EXACTLY: `AWS_SECRET_ACCESS_KEY`
   - Must be EXACTLY: `CLOUDFRONT_DISTRIBUTION_ID`

3. **Recreate secrets:**
   - Delete old secrets
   - Create new secrets with fresh credentials

4. **Check IAM permissions:**
   - User must have S3 and CloudFront permissions
   - See Step 1.2 for required policies

---

### Issue: S3 Upload Fails

**Symptoms:**
- "Sync files to S3" step fails
- Error: "Access Denied" or "NoSuchBucket"

**Solutions:**

1. **Check bucket name:**
   - Workflow uses: `s3://owais.io/`
   - Update if your bucket has different name

2. **Check IAM permissions:**
   - User needs `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`

3. **Verify bucket exists:**
   ```bash
   aws s3 ls s3://owais.io/
   ```

---

### Issue: CloudFront Invalidation Fails

**Symptoms:**
- "Invalidate CloudFront cache" step fails
- Error: "NoSuchDistribution" or "Access Denied"

**Solutions:**

1. **Verify distribution ID:**
   ```bash
   aws cloudfront list-distributions --query "DistributionList.Items[].Id"
   ```
   Copy correct ID to GitHub secret.

2. **Check IAM permissions:**
   - User needs `cloudfront:CreateInvalidation`

3. **Check distribution status:**
   - Distribution must be "Enabled" (not "Disabled")

---

### Issue: Site Not Updating

**Symptoms:**
- Workflow succeeds
- But blog doesn't show new post

**Solutions:**

1. **Wait longer:**
   - CloudFront invalidation takes 1-2 minutes
   - Sometimes up to 5 minutes

2. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows)
   - Or: `Cmd + Shift + R` (Mac)

3. **Check CloudFront invalidation:**
   ```bash
   aws cloudfront list-invalidations \
     --distribution-id YOUR_DISTRIBUTION_ID
   ```
   Look for status: "Completed"

4. **Verify S3 upload:**
   ```bash
   aws s3 ls s3://owais.io/blog/ --recursive
   ```
   Should see your new post.

---

### Issue: Workflow is Slow

**Symptoms:**
- Workflow takes 10+ minutes

**Solutions:**

1. **Enable dependency caching** (already in workflow):
   ```yaml
   cache: 'npm'
   ```

2. **Use `npm ci` instead of `npm install`** (already in workflow)

3. **Optimize build:**
   - Remove unused dependencies
   - Optimize images
   - Reduce number of pages

**Normal times:**
- Install dependencies: 30-60 seconds (cached: 10-20 seconds)
- Build: 2-4 minutes (134 pages)
- Upload to S3: 30-60 seconds
- CloudFront invalidation: 10-20 seconds
- **Total: 3-5 minutes**

---

## Optional Enhancements

### Enhancement 1: Deploy Only on Changes to Content

Currently, workflow runs on **every push**. You might want to deploy only when content changes.

**Update trigger:**

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'content/**'
      - 'app/**'
      - 'public/**'
      - 'next.config.mjs'
```

**This runs only when:**
- Content files change (`content/posts/*.mdx`)
- App code changes
- Public assets change
- Next.js config changes

**Skips when:**
- README changes
- Documentation changes
- GitHub workflow changes

---

### Enhancement 2: Add Build Status Badge

Show workflow status in your README.

**Add to README.md:**

```markdown
# My Blog

![Deployment Status](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml/badge.svg)

Automatically deployed to [owais.io](https://owais.io)
```

Replace `YOUR_USERNAME` and `YOUR_REPO`.

**Result:** Shows ✅ or ❌ badge indicating last deployment status.

---

### Enhancement 3: Slack/Discord Notifications

Get notified when deployment succeeds or fails.

**Add to workflow (end of steps):**

```yaml
      # Send Slack notification
      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Blog deployment ${{ job.status }}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

**Setup:**
1. Create Slack incoming webhook
2. Add webhook URL as GitHub secret: `SLACK_WEBHOOK_URL`

---

### Enhancement 4: Preview Deployments (Pull Requests)

Deploy preview versions when creating pull requests.

**Add another workflow:** `.github/workflows/preview.yml`

```yaml
name: Deploy Preview

on:
  pull_request:
    branches: [ main ]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build

      # Upload to preview bucket
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Upload to preview bucket
        run: |
          aws s3 sync out/ s3://owais-io-preview-${{ github.event.pull_request.number }}/ --delete

      - name: Comment preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed to: http://owais-io-preview-${{ github.event.pull_request.number }}.s3-website-us-east-1.amazonaws.com'
            })
```

**Requires:**
- Separate S3 bucket for previews
- More advanced setup

---

### Enhancement 5: Scheduled Rebuilds

Rebuild site daily (useful for date-based content).

**Add schedule trigger:**

```yaml
on:
  push:
    branches: [ main ]
  schedule:
    # Run at 00:00 UTC every day
    - cron: '0 0 * * *'
```

---

## Daily Workflow: Adding New Posts

Now that automation is set up, here's your daily workflow:

### 1. Create New Blog Post

```bash
# Navigate to posts directory
cd D:\blog\content\posts

# Create new post file
notepad 2025-12-10_my-new-post.mdx
```

**Write your post**, save.

---

### 2. Preview Locally (Optional)

```bash
# Start dev server
npm run dev

# Open browser
http://localhost:3000
```

**Check:** Post looks good.

---

### 3. Commit and Push

```bash
# Add new post
git add content/posts/2025-12-10_my-new-post.mdx

# Commit with descriptive message
git commit -m "Add new post: My New Post"

# Push to GitHub
git push origin main
```

---

### 4. Wait for Deployment

**Automatic process:**
1. GitHub receives push
2. Workflow starts automatically
3. Builds site (3 minutes)
4. Uploads to S3 (1 minute)
5. Invalidates cache (1 minute)
6. **Total: 3-5 minutes**

---

### 5. Verify Live

**After 3-5 minutes:**

```
https://owais.io
```

**Your new post is live!** 🎉

---

### That's It!

**No more:**
- ❌ `npm run build`
- ❌ `aws s3 sync out/ s3://owais.io/`
- ❌ `aws cloudfront create-invalidation`

**Just:**
- ✅ Write post
- ✅ `git commit`
- ✅ `git push`
- ✅ Done!

---

## Cost Implications

### GitHub Actions Usage

**Free tier:**
- **Public repositories:** Unlimited minutes (free forever)
- **Private repositories:** 2,000 minutes/month free

**Your workflow uses:** ~5 minutes per deployment

**If private repo:**
- 2,000 minutes = 400 deployments/month
- More than enough for a blog (1-2 posts/day = 30-60 deployments/month)

**Paid plans:** $0.008 per minute after free tier

---

### AWS Costs

No additional AWS costs:
- S3 uploads: Part of free tier
- CloudFront invalidations: First 1,000/month free
- You're likely using <100 invalidations/month

**Total monthly cost remains:** ~$2-3/month

---

## Security Best Practices

### 1. Use Separate IAM User

✅ Create dedicated `github-actions-blog-deploy` user
❌ Don't use your personal AWS credentials

---

### 2. Principle of Least Privilege

**Only grant necessary permissions:**
- S3: Only owais.io bucket
- CloudFront: Only invalidation (not delete/modify)

---

### 3. Rotate Credentials Regularly

**Every 3-6 months:**
1. Create new access keys in IAM
2. Update GitHub secrets
3. Delete old access keys

---

### 4. Monitor Access

**CloudTrail logs all AWS API calls:**
- Check for unauthorized access
- Monitor S3 uploads
- Monitor CloudFront invalidations

---

### 5. Enable MFA on GitHub

**Protect your GitHub account:**
- Enable two-factor authentication
- Use strong password
- Review authorized applications

---

## Conclusion

You now have a **fully automated blog deployment pipeline**! 🎉

### What You Achieved

✅ **Write once, deploy automatically**
- No manual build steps
- No manual upload steps
- No manual cache invalidation

✅ **Fast deployments**
- 3-5 minutes from push to live
- Automated testing
- Consistent process

✅ **Cost-effective**
- Free GitHub Actions (public repo)
- ~$2-3/month AWS costs
- No server maintenance

✅ **Professional workflow**
- Version control (Git)
- CI/CD pipeline (GitHub Actions)
- Cloud hosting (AWS)

---

### Your Publishing Workflow

**Before (Manual):**
1. Write post (30 mins)
2. `npm run build` (4 mins)
3. `aws s3 sync` (2 mins)
4. `aws cloudfront create-invalidation` (1 min)
5. Wait and verify (2 mins)
**Total: 39 minutes**

**After (Automated):**
1. Write post (30 mins)
2. `git commit && git push`
3. ☕ Coffee break (5 mins)
4. Post is live!
**Total: 35 minutes** (saved 4 minutes + no context switching)

---

### Next Steps

**You can now:**
- Focus on writing content
- Publish posts anytime, anywhere
- Let GitHub Actions handle deployment
- Monitor deployments in Actions tab
- Scale to multiple posts per day

---

### Additional Resources

**GitHub Actions Documentation:**
- https://docs.github.com/en/actions

**AWS Actions:**
- https://github.com/aws-actions/configure-aws-credentials

**Next.js Deployment:**
- https://nextjs.org/docs/app/building-your-application/deploying

**Workflow Examples:**
- https://github.com/actions/starter-workflows

---

## Appendix A: Create GitHub Repository

If you don't have a GitHub repository yet:

### A.1: Create Repository on GitHub

1. **Go to:** https://github.com/new
2. **Repository name:** `blog`
3. **Description:** "My personal blog - owais.io"
4. **Visibility:**
   - **Public** (recommended - unlimited Actions minutes)
   - Or **Private** (2,000 Actions minutes/month free)
5. **Initialize:** ⬜ DO NOT check any boxes (repo should be empty)
6. **Click:** "Create repository"

---

### A.2: Push Existing Code to GitHub

```bash
# Navigate to your blog directory
cd D:\blog

# Initialize git (if not already)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - blog setup"

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/blog.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Appendix B: Common Git Commands

```bash
# Check status
git status

# Add files
git add filename.mdx
git add .  # Add all files

# Commit
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.mdx
```

---

**Last Updated:** December 9, 2025
**Version:** 1.0
**Author:** Claude Code
**Repository:** https://github.com/owais-io/blog

**Happy automated blogging! 🚀**
