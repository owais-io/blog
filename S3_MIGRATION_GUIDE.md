# Next.js Blog Migration to AWS S3 + CloudFront
### Using AWS Console (Step-by-Step Guide)

Complete guide to migrate your Next.js blog from EC2 to S3 + CloudFront for static hosting.

**Cost Savings:** ~$8-10/month (EC2) → ~$2-5/month (S3 + CloudFront)

---

## Table of Contents

1. [Prerequisites - Configure AWS](#prerequisites---configure-aws)
2. [Step 1: Build Static Site](#step-1-build-static-site)
3. [Step 2: Create S3 Bucket (AWS Console)](#step-2-create-s3-bucket-aws-console)
4. [Step 3: Configure S3 for Website Hosting (AWS Console)](#step-3-configure-s3-for-website-hosting-aws-console)
5. [Step 4: Upload Files to S3 (AWS CLI)](#step-4-upload-files-to-s3-aws-cli)
6. [Step 5: Request SSL Certificate & Migrate DNS](#step-5-request-ssl-certificate-aws-console)
   - 5.1-5.2: Request SSL Certificate
   - **5.3: Migrate DNS from GoDaddy to Route 53** (New!)
   - 5.4: Add Certificate Validation Records
   - 5.5: Wait for Validation
7. [Step 6: Create CloudFront Distribution (AWS Console)](#step-6-create-cloudfront-distribution-aws-console)
8. [Step 7: Update DNS Records in Route 53](#step-7-update-dns-records-in-route-53)
9. [Step 8: Test Deployment](#step-8-test-deployment)
10. [Step 9: Future Updates](#step-9-future-updates)
11. [Troubleshooting](#troubleshooting)
12. [Optional: GitHub Actions Automation](#optional-github-actions-automation)

---

## Prerequisites - Configure AWS

### What You Need

- ✅ AWS account ([Create one here](https://aws.amazon.com/free/))
- ✅ AWS CLI installed (already done)
- ✅ Domain name (owais.io) with DNS access
- ✅ Node.js and npm installed

### Configure AWS CLI

Since AWS CLI is already installed, you just need to configure it with your credentials.

#### Step 1: Get Your AWS Credentials

1. **Go to AWS Console:** https://console.aws.amazon.com/
2. **Sign in** with your AWS account
3. **Click your name** in the top-right corner → **Security credentials**
4. **Scroll down** to "Access keys"
5. **Click "Create access key"**
   - Choose: "Command Line Interface (CLI)"
   - Check the confirmation box
   - Click "Next" → "Create access key"
6. **IMPORTANT:** Copy both:
   - **Access key ID** (looks like: `AKIAIOSFODNN7EXAMPLE`)
   - **Secret access key** (looks like: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)
   - Download the CSV file for backup

#### Step 2: Configure AWS CLI

Open your terminal and run:

```bash
aws configure
```

You'll be prompted to enter:

```
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

**Important Notes:**
- **Region MUST be `us-east-1`** for CloudFront SSL certificate compatibility
- The credentials are stored in `~/.aws/credentials` (hidden folder)

#### Step 3: Verify Configuration

```bash
aws sts get-caller-identity
```

**Expected output:**
```json
{
    "UserId": "AIDAJQABLZS4A3QDU576Q",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/YourUsername"
}
```

If you see this, you're configured correctly!

---

## Step 1: Build Static Site

### 1.1 Verify Next.js Configuration

Your `next.config.mjs` should already have static export enabled:

```javascript
const nextConfig = {
  output: 'export',           // Enable static HTML export
  trailingSlash: true,        // Better S3 compatibility
  images: {
    unoptimized: true,        // Required for static export
  },
}
```

### 1.2 Run the Build

Open terminal in your project directory (`D:\blog\`) and run:

```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (134/134)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    2.71 kB        104 kB
├ ○ /about                               295 B          92.7 kB
├ ● /blog/[slug]                         3.74 kB        105 kB
...

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
```

**Build time:** 3-4 minutes

### 1.3 Verify Output Directory

```bash
ls out/
```

You should see:
- `index.html` - Homepage
- `blog/` - Blog posts (120 posts)
- `categories/` - Categories page
- `tags/` - Tags page
- `_next/` - Static assets (CSS, JS, images)
- `404.html` - Error page

**Build folder size:** ~50-100MB

---

## Step 2: Create S3 Bucket (AWS Console)

### 2.1 Open S3 Console

1. Go to **AWS Console:** https://console.aws.amazon.com/s3/
2. Click **"Create bucket"** (orange button)

### 2.2 Configure Bucket Settings

**Bucket Configuration Page:**

1. **Bucket name:** `owais.io`
   - **CRITICAL:** Must exactly match your domain name
   - Bucket names must be globally unique across all AWS
   - Only lowercase letters, numbers, hyphens allowed

2. **AWS Region:** Select **US East (N. Virginia) us-east-1**
   - **IMPORTANT:** Must be us-east-1 for CloudFront

3. **Object Ownership:** Select **ACLs disabled (recommended)**

4. **Block Public Access settings:** **UNCHECK all 4 boxes**
   - ⬜ Block all public access
   - This is necessary for website hosting
   - You'll see a warning - that's expected
   - ✅ Check the acknowledgment: "I acknowledge that the current settings might result in this bucket and the objects within becoming public"

5. **Bucket Versioning:** Disabled (default)

6. **Tags:** (optional) Add if you want
   - Key: `Project`, Value: `Blog`
   - Key: `Environment`, Value: `Production`

7. **Default encryption:** Enable (optional but recommended)
   - Select: **Server-side encryption with Amazon S3 managed keys (SSE-S3)**

8. **Click "Create bucket"**

### 2.3 Verify Bucket Creation

You should see a green success banner: "Successfully created bucket 'owais.io'"

---

## Step 3: Configure S3 for Website Hosting (AWS Console)

### 3.1 Enable Static Website Hosting

1. **In S3 Console**, click on your bucket name: **owais.io**
2. Go to the **"Properties"** tab
3. **Scroll down** to the bottom section: **"Static website hosting"**
4. Click **"Edit"**

**Configure the following:**

5. **Static website hosting:** Select **Enable**
6. **Hosting type:** Select **Host a static website**
7. **Index document:** `index.html`
8. **Error document:** `404.html`
9. Click **"Save changes"**

**Copy the Website Endpoint** (appears after saving):
- It will look like: `http://owais.io.s3-website-us-east-1.amazonaws.com`
- **Save this URL** - you'll test it later

### 3.2 Add Bucket Policy for Public Access

1. Still in your bucket, go to the **"Permissions"** tab
2. Scroll down to **"Bucket policy"**
3. Click **"Edit"**

**Paste this policy** (replace `owais.io` with your bucket name if different):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::owais.io/*"
    }
  ]
}
```

4. Click **"Save changes"**

You should see a warning banner: "This bucket has public access" - that's correct!

---

## Step 4: Upload Files to S3 (AWS CLI)

Now we'll use AWS CLI to upload all your static files from the `out/` directory.

### 4.1 Initial Upload

Open terminal in your project directory (`D:\blog\`) and run:

```bash
aws s3 sync out/ s3://owais.io/ --delete
```

**What this does:**
- `sync` - Only uploads new/changed files (efficient)
- `out/` - Your local build directory
- `s3://owais.io/` - Your S3 bucket
- `--delete` - Removes files from S3 that don't exist locally (keeps it clean)

**Expected output:**
```
upload: out/index.html to s3://owais.io/index.html
upload: out/_next/static/css/app.css to s3://owais.io/_next/static/css/app.css
upload: out/blog/2025-12-08_lfcs-phase1-part-21-wildcards-file-management/index.html to s3://owais.io/blog/...
...
(134+ files uploading)
```

**Upload time:** 2-5 minutes depending on internet speed

### 4.2 Verify Upload in Console

1. Go back to **S3 Console** → **owais.io** bucket
2. Click **"Objects"** tab
3. You should see:
   - `index.html`
   - `404.html`
   - `blog/` folder
   - `categories/` folder
   - `tags/` folder
   - `_next/` folder

### 4.3 Test S3 Website Endpoint

**Method 1: Browser**
1. Open the S3 website endpoint you saved earlier:
   ```
   http://owais.io.s3-website-us-east-1.amazonaws.com
   ```
2. Your blog should load! (without HTTPS yet)

**Method 2: curl (terminal)**
```bash
curl -I http://owais.io.s3-website-us-east-1.amazonaws.com
```

**Expected:**
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 45678
```

---

## Step 5: Request SSL Certificate (AWS Console)

**CRITICAL:** Certificate MUST be created in `us-east-1` region for CloudFront.

### 5.1 Open AWS Certificate Manager (ACM)

1. Go to: https://console.aws.amazon.com/acm/
2. **VERIFY** top-right region shows: **N. Virginia (us-east-1)**
   - If not, click the region dropdown and select **US East (N. Virginia)**
3. Click **"Request a certificate"**

### 5.2 Configure Certificate

**Step 1: Certificate type**
- Select: **Request a public certificate**
- Click **"Next"**

**Step 2: Domain names**
1. **Fully qualified domain name:** Enter your domain:
   ```
   owais.io
   ```
2. Click **"Add another name to this certificate"**
3. Add wildcard subdomain:
   ```
   *.owais.io
   ```
4. Click **"Add another name to this certificate"** (again)
5. Add www subdomain explicitly:
   ```
   www.owais.io
   ```

**You should now have 3 domain names:**
- `owais.io`
- `*.owais.io`
- `www.owais.io`

**Step 3: Validation method**
- Select: **DNS validation - recommended**

**Step 4: Key algorithm**
- Select: **RSA 2048** (default)

**Step 5: Tags (optional)**
- Add if you want:
  - Key: `Name`, Value: `owais.io-blog-cert`

6. Click **"Request"**

**Certificate Status:** You'll see status **"Pending validation"** - Don't add validation records yet! First, let's migrate your DNS to Route 53 (next step).

---

### 5.3 Migrate DNS from GoDaddy to AWS Route 53

**Current Situation:**
- Domain registered with GoDaddy ✓
- GoDaddy manages your DNS (has A record pointing to EC2 IP)
- You want to use AWS Route 53 for DNS management

**Why migrate to Route 53?**
- ✅ Easier to manage AWS resources (S3, CloudFront) with AWS DNS
- ✅ Better integration with AWS services
- ✅ Automatic certificate validation (one-click)
- ✅ Health checks and advanced routing
- ✅ Lower latency for DNS queries
- ✅ Cost: $0.50/month per hosted zone (very cheap)

**Important:** Your domain registration stays with GoDaddy. You're only changing DNS management.

---

#### Step 5.3.1: Document Your Current DNS Records

Before migrating, you need to know what DNS records currently exist at GoDaddy.

**Go to GoDaddy DNS Management:**

1. **Log in to GoDaddy:** https://dcc.godaddy.com/
2. **Go to:** My Products → Domains
3. **Click:** DNS next to **owais.io**
4. **Review all records** - you should see something like:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `18.xxx.xxx.xxx` (EC2 Elastic IP) | 600 |
| CNAME | www | @ | 1 Hour |
| NS | @ | ns01.domaincontrol.com | 1 Hour |
| NS | @ | ns02.domaincontrol.com | 1 Hour |
| SOA | @ | (GoDaddy nameserver info) | 1 Hour |

**Write these down or take a screenshot!** You'll recreate them in Route 53.

**Common records to look for:**
- **A records** - Points domain to IP address (your EC2 IP)
- **CNAME records** - Alias records (like www → @)
- **MX records** - Email routing (if you have email)
- **TXT records** - Verification records (Google, SPF, DKIM)

---

#### Step 5.3.2: Create Route 53 Hosted Zone

Now let's create a hosted zone in AWS Route 53.

1. **Go to Route 53 Console:** https://console.aws.amazon.com/route53/
2. **Click** "Hosted zones" in the left sidebar
3. **Click** orange button: **"Create hosted zone"**

**Configure Hosted Zone:**

4. **Domain name:** `owais.io`
   - Must exactly match your domain
   - No "www" prefix
   - No "https://"

5. **Description:** (optional)
   ```
   DNS for owais.io blog
   ```

6. **Type:** **Public hosted zone**
   - This makes it accessible on the internet

7. **Tags:** (optional)
   - Key: `Project`, Value: `Blog`

8. **Click:** "Create hosted zone"

**Result:** Hosted zone created! You'll see:
- 2 default records: **NS** (Name Server) and **SOA** (Start of Authority)

---

#### Step 5.3.3: Note Your Route 53 Nameservers

After creating the hosted zone, you'll see 4 nameservers in the NS record:

**Example (yours will be different):**
```
ns-123.awsdns-12.com
ns-456.awsdns-45.net
ns-789.awsdns-78.org
ns-012.awsdns-01.co.uk
```

**IMPORTANT:** Copy these 4 nameservers to a notepad. You'll need them for GoDaddy.

**To view them:**
1. Click on your hosted zone name: **owais.io**
2. Look at the **NS** record (Type: NS)
3. The **Value/Route traffic to** column shows all 4 nameservers

---

#### Step 5.3.4: Recreate DNS Records in Route 53

Now recreate your existing DNS records from GoDaddy in Route 53.

**IMPORTANT:** Don't delete anything from GoDaddy yet! We're just preparing Route 53.

##### Create A Record for Root Domain (Temporary - EC2 IP)

1. **In Route 53 Hosted Zone** (owais.io), click **"Create record"**

**Configure:**
2. **Record name:** Leave blank (this is the root domain @)
3. **Record type:** A - Routes traffic to an IPv4 address
4. **Value:** Enter your EC2 Elastic IP (e.g., `18.xxx.xxx.xxx`)
   - Get this from your GoDaddy DNS or EC2 Console
5. **TTL:** 300 seconds (5 minutes)
6. **Routing policy:** Simple routing
7. **Click:** "Create records"

**Note:** We'll change this to CloudFront later. For now, keep your blog accessible.

##### Create CNAME Record for www

1. **Click:** "Create record" again

**Configure:**
2. **Record name:** `www`
3. **Record type:** CNAME - Routes traffic to another domain name
4. **Value:** `owais.io` (or your EC2 IP as A record)
   - Or you can point to your current EC2 setup
5. **TTL:** 300 seconds
6. **Click:** "Create records"

##### Create Other Records (If You Have Any)

If you found other records in GoDaddy (MX, TXT, etc.), recreate them here:

**For MX Records (Email):**
1. Record name: @ or leave blank
2. Record type: MX
3. Value: `10 mail.example.com` (your mail server)
4. Create records

**For TXT Records (Verification, SPF):**
1. Record name: @ or subdomain
2. Record type: TXT
3. Value: `"v=spf1 include:_spf.google.com ~all"` (example)
4. Create records

**Your Route 53 hosted zone should now have:**
- NS record (4 nameservers) - Auto-created
- SOA record - Auto-created
- A record (@) - Points to EC2 IP
- CNAME record (www) - Points to root domain
- Any other records you had in GoDaddy

---

#### Step 5.3.5: Update Nameservers at GoDaddy

Now change your domain's nameservers from GoDaddy to AWS Route 53.

**IMPORTANT:** This switches DNS control to AWS. Your site might be briefly unreachable (2-48 hours max, usually 5-30 minutes).

**Best time to do this:** Off-peak hours (late night, weekend)

**Go to GoDaddy:**

1. **Log in to GoDaddy:** https://dcc.godaddy.com/
2. **Go to:** My Products → Domains
3. **Click:** owais.io (your domain)
4. **Scroll down** to "Additional Settings"
5. **Click:** "Manage DNS"

**Change Nameservers:**

6. **Scroll down** to "Nameservers" section
7. **Click:** "Change" button
8. **Select:** "I'll use my own nameservers"

**Enter Route 53 Nameservers:**

9. **Enter the 4 nameservers** from Route 53 (from Step 5.3.3):
   ```
   Nameserver 1: ns-123.awsdns-12.com
   Nameserver 2: ns-456.awsdns-45.net
   Nameserver 3: ns-789.awsdns-78.org
   Nameserver 4: ns-012.awsdns-01.co.uk
   ```

**Important Notes:**
- GoDaddy might only show 2 nameserver fields initially - click "Add Nameserver" to add more
- Some providers require minimum 2, maximum 13 nameservers
- Enter all 4 for redundancy
- Remove any trailing dots if GoDaddy doesn't accept them

10. **Click:** "Save"

**GoDaddy Warning:** You'll see a warning that says changing nameservers will disable GoDaddy's DNS management. That's expected - click **"Continue"** or **"Yes, I understand"**

---

#### Step 5.3.6: Wait for DNS Propagation

After updating nameservers, you need to wait for DNS propagation.

**Propagation Time:**
- Minimum: 5-30 minutes
- Average: 2-4 hours
- Maximum: 24-48 hours (rare)

**Why the delay?**
- DNS servers worldwide cache nameserver information
- TTL (Time To Live) values determine cache duration
- GoDaddy's default NS TTL is usually 1 hour

---

#### Step 5.3.7: Verify DNS Migration

Check if your domain is now using Route 53 nameservers.

**Method 1: Command Line (Fastest)**

**Windows (PowerShell):**
```bash
nslookup -type=NS owais.io
```

**Mac/Linux:**
```bash
dig owais.io NS +short
```

**Expected Output (Route 53 nameservers):**
```
ns-123.awsdns-12.com
ns-456.awsdns-45.net
ns-789.awsdns-78.org
ns-012.awsdns-01.co.uk
```

**If you still see GoDaddy nameservers:**
```
ns01.domaincontrol.com
ns02.domaincontrol.com
```
Wait longer - propagation not complete yet.

---

**Method 2: Online DNS Checker**

1. **Go to:** https://dnschecker.org/
2. **Enter:** `owais.io`
3. **Select:** "NS" (Nameserver) record type
4. **Click:** "Search"

**Result:** You'll see a world map showing which locations see which nameservers.
- ✅ Green checkmarks = Route 53 nameservers
- ❌ Red X = Still seeing old GoDaddy nameservers

**When all locations show Route 53 nameservers, migration is complete!**

---

**Method 3: Test Website Accessibility**

**In your browser, visit:**
```
http://owais.io
```

**Your blog should still be accessible** (showing EC2 version).

If your site is down:
1. Check Route 53 A record has correct EC2 IP
2. Wait longer for DNS propagation
3. Clear your browser cache and DNS cache:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`

---

#### Step 5.3.8: Verify in Route 53 Console

**Go to Route 53 Console:** https://console.aws.amazon.com/route53/

1. **Click:** "Hosted zones"
2. **Click:** your hosted zone (owais.io)
3. You should see all your DNS records

**Test DNS Query:**
1. **Click:** "Test record" button (top right)
2. **Record name:** Enter `owais.io`
3. **Record type:** Select `A`
4. **Click:** "Get response"

**Expected Result:**
- Status: **NOERROR**
- Response: Your EC2 Elastic IP address

---

### 5.4 Add Certificate Validation Records in Route 53

Now that your DNS is managed by Route 53, adding the SSL certificate validation records is super easy!

**Go back to ACM Console:**

1. **Go to:** https://console.aws.amazon.com/acm/
2. **Verify region:** US East (N. Virginia) us-east-1
3. **Click:** on your certificate ID
4. **Scroll down** to "Domains" section

**You'll see validation records:**
- **CNAME name:** `_abc123def456.owais.io`
- **CNAME value:** `_xyz789.acm-validations.aws.`

**Add to Route 53 (Automatic - One Click!):**

5. **Click** the orange button: **"Create records in Route 53"**

**Confirmation Dialog:**
- You'll see: "Create DNS records in Amazon Route 53?"
- Shows which records will be created
- **Click:** "Create records"

**Success!**
You should see: "Successfully created DNS records"

**The validation CNAME records are now in Route 53.**

**To verify:**
1. Go to **Route 53 Console** → **Hosted zones** → **owais.io**
2. You should see new CNAME record(s) like:
   - Name: `_abc123def456.owais.io`
   - Type: CNAME
   - Value: `_xyz789.acm-validations.aws.`

---

### 5.5 Wait for Certificate Validation

Since you've added the validation records to Route 53, validation happens automatically!

1. **Go to ACM Console:** https://console.aws.amazon.com/acm/
2. **Refresh the page** every few minutes
3. **Status will change from:**
   - ⏳ **Pending validation** → ✅ **Issued**

**Time:** Usually 5-30 minutes with Route 53 (very fast!)

**To check status:**
- Look for **Status** column in ACM Console
- When it shows **"Issued"**, you're done!

**Certificate is now validated and ready to use with CloudFront!** ✅

---

## Step 6: Create CloudFront Distribution (AWS Console)

### 6.1 Open CloudFront Console

1. Go to: https://console.aws.amazon.com/cloudfront/
2. Click **"Create distribution"**

### 6.2 Configure Distribution Settings

This is a long form - follow carefully!

#### Origin Settings

**Origin domain:**
- **DO NOT** select the auto-suggested S3 bucket from dropdown
- **MANUALLY TYPE** the S3 website endpoint:
  ```
  owais.io.s3-website-us-east-1.amazonaws.com
  ```
  (This is the endpoint you copied in Step 3.1)

**Origin name:** (auto-fills)
- Leave as: `owais.io.s3-website-us-east-1.amazonaws.com`

**Protocol:**
- Select: **HTTP only**
  (S3 website endpoints don't support HTTPS)

**HTTP port:** `80` (default)

#### Default Cache Behavior Settings

**Viewer protocol policy:**
- Select: **Redirect HTTP to HTTPS**

**Allowed HTTP methods:**
- Select: **GET, HEAD** (default)

**Cache policy:**
- Select: **CachingOptimized** (recommended)

**Origin request policy:**
- Select: **None**

**Response headers policy:**
- Select: **None**

**Compress objects automatically:**
- ✅ **Yes** (check this - improves performance)

#### Settings

**Price class:**
- Select: **Use only North America and Europe** (PriceClass_100)
- Or select **All edge locations** for global coverage (costs more)

**Alternate domain names (CNAMEs):**
- Click **"Add item"**
- Enter: `owais.io`
- Click **"Add item"** again
- Enter: `www.owais.io`

**Custom SSL certificate:**
- Click the **radio button**: **Custom SSL certificate**
- **Select your certificate** from the dropdown:
  - Should show: `owais.io` (and alternatives *.owais.io, www.owais.io)
  - If you don't see it, make sure:
    - Certificate status is "Issued"
    - You're in us-east-1 region

**Supported HTTP versions:**
- ✅ Check: **HTTP/2**
- ✅ Check: **HTTP/3** (optional but recommended)

**Default root object:**
- Enter: `index.html`

**Standard logging:**
- Select: **Off** (or enable if you want access logs)

**IPv6:**
- ✅ **On** (default - recommended)

#### Custom Error Responses

**Scroll down and click "Add custom error response"**

**Error response 1 (404 errors):**
1. **HTTP error code:** 404
2. **Customize error response:** Yes
3. **Response page path:** `/404.html`
4. **HTTP response code:** 404
5. Click **"Create error response"**

**Error response 2 (403 errors):**
1. Click **"Add custom error response"** again
2. **HTTP error code:** 403
3. **Customize error response:** Yes
4. **Response page path:** `/404.html`
5. **HTTP response code:** 404
6. Click **"Create error response"**

### 6.3 Create Distribution

After configuring everything:

1. **Scroll to bottom** of the page
2. Click **"Create distribution"**

You'll be redirected to the CloudFront distributions list.

### 6.4 Wait for Deployment

**Status will show:**
- ⏳ **Deploying** → ✅ **Enabled**

**Distribution deployment takes 15-30 minutes**

**While waiting, copy these values:**
1. **Distribution domain name:** (e.g., `d111111abcdef8.cloudfront.net`)
   - You'll need this for DNS
2. **Distribution ID:** (e.g., `E1A2B3C4D5E6F7`)
   - You'll need this for cache invalidation

**Save both values in a notepad!**

**Check deployment status:**
- Refresh the CloudFront console page
- **Last modified** column will show "Deploying..." then a timestamp when done

### 6.5 Test CloudFront URL

Once **Status** shows **Enabled** (not Deploying):

**Method 1: Browser**
```
https://d111111abcdef8.cloudfront.net
```
(Replace with your actual CloudFront domain)

Your blog should load with HTTPS!

**Method 2: curl**
```bash
curl -I https://d111111abcdef8.cloudfront.net
```

**Expected:**
```
HTTP/2 200
content-type: text/html
x-cache: Miss from cloudfront
via: 1.1 abc123.cloudfront.net (CloudFront)
```

**If you see your blog, CloudFront is working!**

---

## Step 7: Update DNS Records in Route 53

Now update your Route 53 DNS records to point to CloudFront instead of EC2.

**Current Status:**
- ✅ Route 53 hosted zone created (Step 5.3)
- ✅ DNS migrated from GoDaddy to Route 53
- ✅ Currently pointing to EC2 Elastic IP
- 🎯 **Next:** Point to CloudFront distribution

### 7.1 Get Your CloudFront Domain

From CloudFront Console (Step 6.4), copy your **Distribution domain name**:
```
d111111abcdef8.cloudfront.net
```

**Example:** `d111111abcdef8.cloudfront.net` (yours will be different)

**Save this value!** You'll need it for DNS records.

---

### 7.2 Update A Record for Root Domain (owais.io)

We'll replace the EC2 IP address with a CloudFront ALIAS record.

1. **Go to Route 53 Console:** https://console.aws.amazon.com/route53/
2. **Click:** "Hosted zones" (left sidebar)
3. **Click:** your hosted zone name (**owais.io**)

**You should see your existing records:**
- NS record (nameservers)
- SOA record
- **A record (@)** - Currently points to EC2 IP
- CNAME record (www)
- CNAME record (certificate validation)

---

**Delete the old A record:**

4. **Find the A record** with:
   - Name: `owais.io` (or blank/@ symbol)
   - Type: A
   - Value: Your EC2 Elastic IP (e.g., `18.xxx.xxx.xxx`)

5. **Check the checkbox** next to this A record
6. **Click:** "Delete record" button (top right)
7. **Confirm deletion:** Click "Delete"

---

**Create new ALIAS record for CloudFront:**

8. **Click:** "Create record" (orange button)

**Configure the record:**

9. **Record name:** Leave blank (this represents the root domain @)

10. **Record type:** A - Routes traffic to an IPv4 address and some AWS resources

11. **Alias:** Toggle **ON** (turn the switch to blue/enabled)
    - This enables AWS ALIAS records (special Route 53 feature)

12. **Route traffic to:**
    - Select: **Alias to CloudFront distribution**

13. **Choose distribution:**
    - Select your CloudFront distribution from dropdown
    - Should show: `d111111abcdef8.cloudfront.net`
    - If you don't see it, make sure:
      - CloudFront distribution is deployed (Status: Enabled)
      - You added `owais.io` as alternate domain name (CNAME) in CloudFront

14. **Routing policy:** Simple routing (default)

15. **Evaluate target health:** No (default)

16. **Click:** "Create records"

**Success!** Your root domain now points to CloudFront.

---

### 7.3 Update CNAME Record for www Subdomain

Now update the www subdomain to point to CloudFront.

**Option 1: Update existing CNAME (if you created one in Step 5.3)**

1. **Find the CNAME record** with:
   - Name: `www.owais.io`
   - Type: CNAME
   - Value: `owais.io` or EC2 address

2. **Check the checkbox** next to this CNAME record
3. **Click:** "Delete record"
4. **Confirm:** Click "Delete"

**Option 2: Create new CNAME for www**

5. **Click:** "Create record"

**Configure:**

6. **Record name:** `www`
7. **Record type:** CNAME - Routes traffic to another domain name
8. **Value:** `d111111abcdef8.cloudfront.net`
   - Use your actual CloudFront domain
   - This is a regular CNAME, NOT an alias
9. **TTL:** 300 seconds (5 minutes)
10. **Routing policy:** Simple routing
11. **Click:** "Create records"

**Alternative (Using ALIAS for www):**

You can also use an ALIAS record for www:

6. **Record name:** `www`
7. **Record type:** A
8. **Alias:** Toggle ON
9. **Route traffic to:** Alias to CloudFront distribution
10. **Choose distribution:** Select your distribution
11. **Click:** "Create records"

---

### 7.4 Verify Route 53 Records

Your Route 53 hosted zone should now have:

| Name | Type | Value/Route Traffic To |
|------|------|------------------------|
| owais.io | NS | 4 Route 53 nameservers |
| owais.io | SOA | Route 53 zone info |
| **owais.io** | **A** | **Alias to CloudFront** |
| **www.owais.io** | **CNAME** | **d111111abcdef8.cloudfront.net** |
| _abc123.owais.io | CNAME | Certificate validation |

**To verify:**

1. **Click:** "Test record" button (top right in Route 53)
2. **Record name:** `owais.io`
3. **Record type:** A
4. **Click:** "Get response"

**Expected:**
- Response: CloudFront IP addresses (multiple IPs)
- Status: NOERROR

**Test www subdomain:**
5. **Record name:** `www.owais.io`
6. **Record type:** CNAME (or A if you used ALIAS)
7. **Click:** "Get response"

**Expected:** CloudFront domain or IPs

---

### 7.5 Wait for DNS Propagation

DNS changes can take **5 minutes to 48 hours** to propagate globally.

**Since you're already using Route 53:**
- Propagation is usually VERY fast (5-10 minutes)
- Route 53 has low TTL values (300 seconds = 5 minutes)
- Your browser might cache longer than DNS servers

**Check DNS propagation:**

**Method 1: Command line**
```bash
nslookup owais.io
```

Expected output should show CloudFront IP addresses.

**Method 2: Online tools**
- https://dnschecker.org/ (check globally)
- https://www.whatsmydns.net/

**Method 3: Direct DNS query**
```bash
dig owais.io
```

Look for CloudFront IPs in the ANSWER section.

**When DNS is propagated, you'll see CloudFront servers responding.**

---

## Step 8: Test Deployment

Once DNS has propagated, test your live site!

### 8.1 Test in Browser

Open these URLs in your browser:

1. **Root domain:** https://owais.io
2. **www subdomain:** https://www.owais.io
3. **Blog post:** https://owais.io/blog/2025-12-08_lfcs-phase1-part-21-wildcards-file-management/
4. **Categories:** https://owais.io/categories/
5. **Tags:** https://owais.io/tags/

**All should load with:**
- ✅ HTTPS (green padlock)
- ✅ Fast loading
- ✅ No errors

### 8.2 Test HTTP → HTTPS Redirect

```bash
curl -I http://owais.io
```

**Expected:**
```
HTTP/1.1 301 Moved Permanently
Location: https://owais.io/
```

### 8.3 Test 404 Page

Visit a non-existent page:
```
https://owais.io/this-page-does-not-exist
```

Should show your custom 404 page.

### 8.4 Test CloudFront Caching

```bash
curl -I https://owais.io
```

**First request:**
```
x-cache: Miss from cloudfront
```

**Second request (run same command again):**
```
x-cache: Hit from cloudfront
```

**"Hit from cloudfront" means caching is working!**

### 8.5 Test Category Filtering

1. Open https://owais.io in browser
2. Open browser DevTools (F12)
3. Go to Network tab
4. Click a category button (e.g., "Linux")
5. Check Network tab - **no new page loads** (client-side filtering)
6. Posts should filter without page reload

### 8.6 Test Performance

Use these tools to check performance:

1. **Google PageSpeed Insights:** https://pagespeed.web.dev/
   - Enter: `https://owais.io`
   - Should score 90+ on Performance

2. **GTmetrix:** https://gtmetrix.com/
   - Test your site
   - Should show fast load times

---

## Step 9: Future Updates

When you update blog content or code:

### 9.1 Rebuild and Upload

**In your local project directory:**

```bash
# 1. Build new static files
npm run build

# 2. Upload to S3 (only changed files)
aws s3 sync out/ s3://owais.io/ --delete
```

**Output:**
```
upload: out/blog/new-post/index.html to s3://owais.io/blog/new-post/index.html
upload: out/index.html to s3://owais.io/index.html
```

### 9.2 Invalidate CloudFront Cache

**Important:** CloudFront caches files. Users won't see changes until cache expires (24 hours default) or you invalidate.

#### Method 1: AWS CLI (Recommended)

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*"
```

Replace `E1A2B3C4D5E6F7` with your actual distribution ID.

**Output:**
```json
{
    "Invalidation": {
        "Id": "I1A2B3C4D5E6F7",
        "Status": "InProgress"
    }
}
```

**Invalidation takes 1-2 minutes.**

#### Method 2: AWS Console

1. Go to **CloudFront Console:** https://console.aws.amazon.com/cloudfront/
2. Click your **distribution ID**
3. Go to **"Invalidations"** tab
4. Click **"Create invalidation"**
5. **Object paths:** Enter `/*` (invalidates everything)
6. Click **"Create invalidation"**

**Note:** First 1,000 invalidations per month are FREE. After that, $0.005 per path.

#### Targeted Invalidation (More Efficient)

Instead of invalidating everything (`/*`), invalidate only changed paths:

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/index.html" "/blog/new-post/*"
```

This counts as 2 invalidations instead of everything.

### 9.3 Complete Update Workflow

**Every time you update your blog:**

```bash
# Step 1: Build
npm run build

# Step 2: Upload to S3
aws s3 sync out/ s3://owais.io/ --delete

# Step 3: Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

**Changes will be live in 1-2 minutes!**

---

## Troubleshooting

### Issue: "Bucket name already exists"

**Cause:** S3 bucket names are globally unique. Someone else owns that name.

**Solution:**
- Use a different bucket name (e.g., `blog.owais.io` instead of `owais.io`)
- If you own the domain, you can use any subdomain
- Update CloudFront origin and DNS accordingly

---

### Issue: 403 Forbidden When Accessing S3 Website

**Cause:** Bucket policy not applied or public access blocked.

**Solution:**

1. Go to **S3 Console** → **owais.io** → **Permissions** tab
2. Check **"Block public access"** - all should be **Off**
3. Check **"Bucket policy"** - should have the policy from Step 3.2
4. If missing, add this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::owais.io/*"
    }
  ]
}
```

---

### Issue: Certificate Stuck on "Pending Validation"

**Cause:** DNS validation record not added correctly.

**Solution:**

1. **Check ACM Console** - verify the exact CNAME name and value
2. **Check DNS provider** - verify the record was added correctly
3. **Wait longer** - can take up to 72 hours (usually 5-30 minutes)
4. **Verify DNS record exists:**
   ```bash
   dig _abc123def456.owais.io CNAME
   ```
   Should return the validation value.

5. **Common mistakes:**
   - Added the record to wrong domain
   - Typo in CNAME name or value
   - DNS provider requires different format

---

### Issue: CloudFront Shows S3 XML Error Pages

**Example error:**
```xml
<Error>
  <Code>NoSuchKey</Code>
  <Message>The specified key does not exist.</Message>
</Error>
```

**Cause:** Using S3 bucket endpoint instead of S3 website endpoint.

**Solution:**

1. Go to **CloudFront Console**
2. Click your distribution
3. Go to **"Origins"** tab
4. Click the origin → **Edit**
5. **Origin domain** should be:
   - ✅ `owais.io.s3-website-us-east-1.amazonaws.com` (website endpoint)
   - ❌ `owais.io.s3.amazonaws.com` (bucket endpoint)
6. Change **Origin protocol policy** to **HTTP only**
7. Save changes
8. Wait 5-10 minutes for deployment

---

### Issue: Changes Not Appearing on Website

**Cause:** CloudFront cache hasn't been invalidated.

**Solution:**

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

Or use CloudFront Console → Invalidations tab.

---

### Issue: DNS Not Propagating

**Cause:** DNS TTL or provider delays.

**Solution:**

1. **Wait 24-48 hours** (DNS can be slow)
2. **Clear local DNS cache:**
   - Windows: `ipconfig /flushdns`
   - macOS: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`
3. **Test with Google DNS:**
   ```bash
   dig @8.8.8.8 owais.io
   ```
4. **Check globally:** https://dnschecker.org/

---

### Issue: "Access Denied" Errors in AWS Console

**Cause:** Your AWS user doesn't have necessary permissions.

**Solution:**

1. Go to **IAM Console:** https://console.aws.amazon.com/iam/
2. Click **Users** → your username
3. Attach these policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AWSCertificateManagerFullAccess`
4. Or ask your AWS admin to grant permissions

---

## Optional: GitHub Actions Automation

Automate deployments on every push to main branch.

### Prerequisites

You'll need:
- GitHub repository for your blog
- AWS credentials (Access Key ID and Secret Access Key)
- CloudFront Distribution ID

### Step 1: Create GitHub Secrets

1. Go to your **GitHub repository**
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these 3 secrets:

**Secret 1:**
- Name: `AWS_ACCESS_KEY_ID`
- Value: Your AWS access key (e.g., `AKIAIOSFODNN7EXAMPLE`)

**Secret 2:**
- Name: `AWS_SECRET_ACCESS_KEY`
- Value: Your AWS secret key

**Secret 3:**
- Name: `CLOUDFRONT_DISTRIBUTION_ID`
- Value: Your CloudFront distribution ID (e.g., `E1A2B3C4D5E6F7`)

### Step 2: Create Workflow File

In your blog repository, create this file:

**File path:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to S3 + CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Sync files to S3
        run: |
          aws s3 sync out/ s3://owais.io/ --delete

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

      - name: Deployment summary
        run: |
          echo "✅ Deployed to https://owais.io"
          echo "⏳ CloudFront invalidation in progress (1-2 minutes)"
```

### Step 3: Commit and Push

```bash
git add .github/workflows/deploy.yml
git commit -m "Add automated deployment workflow"
git push origin main
```

### Step 4: Monitor Deployment

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You'll see the workflow running
4. Click on it to see progress

**From now on:**
- Every push to `main` branch triggers automatic deployment
- Build → Upload to S3 → Invalidate CloudFront
- Live in 3-5 minutes!

---

## Cost Breakdown

Estimated monthly costs for low-to-medium traffic blog (10,000 page views/month):

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | 0.1 GB (static files) | $0.02 |
| **S3 Requests** | 10,000 GET requests | $0.004 |
| **CloudFront Data Transfer** | 10 GB (first 10 TB free tier) | $0.85 |
| **CloudFront Requests** | 10,000 HTTPS requests | $0.10 |
| **Route 53 Hosted Zone** | 1 zone (optional) | $0.50 |
| **ACM SSL Certificate** | 1 certificate | **FREE** |
| **CloudFront Invalidations** | <1,000/month | **FREE** |

**Monthly Total: $1.50 - $2.50** 💰

**Previous EC2 Cost:** $8-10/month (t2.micro)

**Savings: $6-8/month (75-80% reduction)**

**Additional Benefits:**
- ✅ Unlimited bandwidth (no overage charges)
- ✅ Global CDN (faster for international users)
- ✅ No server maintenance
- ✅ Auto-scaling (handles traffic spikes)
- ✅ 99.99% uptime SLA

---

## Summary Checklist

Use this checklist to track your progress:

### Prerequisites & Setup
- [ ] **Configure AWS CLI** with access keys (get from IAM)
- [ ] **Verify AWS CLI** configuration (`aws sts get-caller-identity`)

### Build Static Site
- [ ] **Build static site** (`npm run build`)
- [ ] **Verify output directory** (`ls out/`)

### S3 Setup
- [ ] **Create S3 bucket** via AWS Console (name: `owais.io`)
- [ ] **Enable S3 website hosting** (index: `index.html`, error: `404.html`)
- [ ] **Add S3 bucket policy** (public read access)
- [ ] **Upload files to S3** (`aws s3 sync out/ s3://owais.io/ --delete`)
- [ ] **Test S3 website endpoint** (http://owais.io.s3-website-us-east-1.amazonaws.com)

### SSL Certificate
- [ ] **Request SSL certificate** in ACM (us-east-1 region, 3 domain names)

### DNS Migration (GoDaddy → Route 53)
- [ ] **Document GoDaddy DNS records** (take screenshot)
- [ ] **Create Route 53 hosted zone** (owais.io)
- [ ] **Copy Route 53 nameservers** (save the 4 nameservers)
- [ ] **Recreate DNS records in Route 53** (A record with EC2 IP, CNAME for www)
- [ ] **Update nameservers at GoDaddy** (replace with Route 53 nameservers)
- [ ] **Wait for DNS propagation** (verify with `nslookup -type=NS owais.io`)
- [ ] **Verify website still works** (http://owais.io shows EC2 version)

### Certificate Validation
- [ ] **Add certificate validation records** (one-click in Route 53)
- [ ] **Wait for certificate validation** (status: Issued in ACM)

### CloudFront Setup
- [ ] **Create CloudFront distribution** (origin: S3 website endpoint)
- [ ] **Configure custom SSL** (select ACM certificate)
- [ ] **Add alternate domain names** (owais.io, www.owais.io)
- [ ] **Add custom error responses** (404 → /404.html, 403 → /404.html)
- [ ] **Wait for CloudFront deployment** (~20 minutes)
- [ ] **Copy CloudFront domain** (e.g., d123.cloudfront.net)
- [ ] **Test CloudFront URL** (https://d123.cloudfront.net)

### Update DNS to CloudFront
- [ ] **Delete old A record in Route 53** (EC2 IP)
- [ ] **Create ALIAS record** (owais.io → CloudFront distribution)
- [ ] **Update www CNAME** (www.owais.io → CloudFront domain)
- [ ] **Verify Route 53 records** (use "Test record" feature)
- [ ] **Wait for DNS propagation** (5-10 minutes with Route 53)

### Final Testing
- [ ] **Test live site** (https://owais.io)
- [ ] **Test www subdomain** (https://www.owais.io)
- [ ] **Test HTTPS redirect** (http → https)
- [ ] **Test 404 page** (non-existent URLs)
- [ ] **Test category filtering** (client-side, no page reload)
- [ ] **Test performance** (PageSpeed Insights)

### Optional Enhancements
- [ ] **Set up GitHub Actions** (automated deployments)
- [ ] **Create CloudFront invalidation** (when updating content)
- [ ] **Monitor costs** (CloudWatch, AWS Cost Explorer)

---

## Quick Reference Commands

### AWS Configuration
```bash
# Configure AWS CLI
aws configure

# Verify AWS configuration
aws sts get-caller-identity
```

### Build & Deploy
```bash
# Build static site
npm run build

# Upload to S3 (initial or update)
aws s3 sync out/ s3://owais.io/ --delete

# Upload with cache headers (optional)
aws s3 sync out/_next/ s3://owais.io/_next/ \
  --cache-control "public, max-age=31536000, immutable"
```

### CloudFront
```bash
# Invalidate CloudFront cache (after updates)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

# Get CloudFront deployment status
aws cloudfront get-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --query 'Distribution.Status'

# List CloudFront invalidations
aws cloudfront list-invalidations \
  --distribution-id YOUR_DISTRIBUTION_ID
```

### DNS & Verification
```bash
# Check nameservers (verify Route 53 migration)
nslookup -type=NS owais.io
dig owais.io NS +short

# Check A record (verify CloudFront ALIAS)
nslookup owais.io
dig owais.io A +short

# Check DNS globally
# Use: https://dnschecker.org/

# Clear DNS cache
# Windows:
ipconfig /flushdns

# Mac:
sudo dscacheutil -flushcache

# Linux:
sudo systemd-resolve --flush-caches
```

### Testing
```bash
# Test HTTPS
curl -I https://owais.io

# Test HTTP → HTTPS redirect
curl -I http://owais.io

# Test CloudFront caching
curl -I https://owais.io | grep x-cache

# Test specific page
curl -I https://owais.io/blog/your-post-slug/
```

### S3 Management
```bash
# List S3 files
aws s3 ls s3://owais.io/ --recursive --summarize

# Check S3 bucket size
aws s3 ls s3://owais.io --recursive --human-readable --summarize

# Delete S3 bucket (careful!)
aws s3 rb s3://owais.io --force
```

---

## Additional Resources

### AWS Documentation
- **AWS S3 Documentation:** https://docs.aws.amazon.com/s3/
- **AWS CloudFront Documentation:** https://docs.aws.amazon.com/cloudfront/
- **AWS Route 53 Documentation:** https://docs.aws.amazon.com/route53/
- **AWS Certificate Manager (ACM):** https://docs.aws.amazon.com/acm/
- **AWS CLI Reference:** https://awscli.amazonaws.com/v2/documentation/api/latest/index.html

### Next.js & Development
- **Next.js Static Export:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Next.js Deployment:** https://nextjs.org/docs/app/building-your-application/deploying

### DNS & Domain Tools
- **DNS Checker (Global Propagation):** https://dnschecker.org/
- **What's My DNS:** https://www.whatsmydns.net/
- **GoDaddy Domain Management:** https://dcc.godaddy.com/

### Performance Testing
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **WebPageTest:** https://www.webpagetest.org/

---

## Need Help?

If you encounter issues:

1. **Check Troubleshooting section** above
2. **AWS Support:** https://console.aws.amazon.com/support/
3. **AWS Re:Post Community:** https://repost.aws/
4. **Stack Overflow:** Tag questions with `amazon-s3`, `cloudfront`, `nextjs`

---

**Migration Guide Version:** 2.0 (Console-based)
**Last Updated:** December 9, 2025
**Author:** Claude Code
**Repository:** https://github.com/owais-io/blog

**Happy deploying! 🚀**
