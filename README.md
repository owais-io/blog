# My Personal Blog & Portfolio

[![Deploy Status](https://github.com/owais-io/blog/workflows/Deploy%20Blog%20to%20S3%20+%20CloudFront/badge.svg)](https://github.com/owais-io/blog/actions)
[![Live Site](https://img.shields.io/badge/live-owais.io-blue)](https://owais.io)

## About This Project

This is my personal blog and portfolio website where I write comprehensive technical tutorials and share insights on topics including:

- **DevOps** - CI/CD, automation, infrastructure as code
- **SecOps** - Security operations, vulnerability management, best practices
- **Cloud Computing** - AWS, cloud architecture, serverless
- **SysOps** - Linux administration, system optimization, monitoring
- **AI/ML** - Artificial intelligence, machine learning implementations
- **And more...**

I built this project to demonstrate my expertise in system architecture, cloud deployment, and DevOps practices. It showcases my ability to design, deploy, and maintain production-grade infrastructure and applications.

### Infrastructure Evolution

**Previous Architecture (EC2)**: Initially deployed on AWS EC2 with Nginx, PM2, and Let's Encrypt for SSL.

**Current Architecture (S3 + CloudFront)**: Migrated to a serverless architecture using AWS S3 for static hosting and CloudFront for global content delivery, significantly improving performance, reducing costs, and eliminating server maintenance overhead.

## Tech Stack

### Frontend & Framework (designed with the help of Claude)
- **Next.js 14** - React framework with App Router (Static Export)
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with JSX for rich blog content

### Infrastructure & Deployment
- **AWS S3** - Static website hosting with high durability
- **AWS CloudFront** - Global CDN for fast content delivery
- **AWS Certificate Manager** - Free SSL/TLS certificates
- **GitHub Actions** - Automated CI/CD pipeline

## Architecture Overview

```
User Request (HTTPS)
         ↓
    Domain (owais.io)
         ↓
    AWS Route 53 / DNS
         ↓
    AWS CloudFront (CDN)
    - Global Edge Locations
    - SSL/TLS Termination
    - Caching & Compression
         ↓
    AWS S3 Bucket (owais.io)
    - Static Website Hosting
    - 99.999999999% Durability
         ↓
    Static HTML/CSS/JS Assets
```

## AWS S3 + CloudFront Deployment

I migrated this application to AWS S3 with CloudFront to leverage serverless architecture, improve global performance, reduce costs, and eliminate server maintenance overhead.

### Infrastructure Configuration

#### S3 Bucket Setup
- **Bucket Name**: owais.io (matches domain for easy routing)
- **Region**: us-east-1 (required for CloudFront integration)
- **Purpose**: Static website hosting
- **Features**:
  - 99.999999999% (11 9's) durability
  - Automatic scaling with traffic
  - Pay only for storage and requests used

#### CloudFront Distribution
- **Origin**: S3 bucket (owais.io)
- **SSL/TLS**: AWS Certificate Manager (ACM) certificate
- **Edge Locations**: 400+ globally distributed
- **Features**:
  - Automatic HTTPS enforcement
  - Gzip/Brotli compression
  - Edge caching for faster delivery
  - DDoS protection via AWS Shield

### Setup Process

#### 1. **Next.js Configuration for Static Export**
Modified `next.config.js` to enable static site generation:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

#### 2. **S3 Bucket Creation & Configuration**
```bash
# Create S3 bucket
aws s3 mb s3://owais.io --region us-east-1

# Enable static website hosting
aws s3 website s3://owais.io/ \
  --index-document index.html \
  --error-document 404.html

# Configure bucket policy for public read access
aws s3api put-bucket-policy --bucket owais.io --policy file://bucket-policy.json
```

Bucket policy JSON:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::owais.io/*"
  }]
}
```

#### 3. **CloudFront Distribution Setup**
Created CloudFront distribution via AWS Console:
- **Origin Domain**: owais.io.s3-website-us-east-1.amazonaws.com
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Allowed HTTP Methods**: GET, HEAD, OPTIONS
- **Compress Objects Automatically**: Yes
- **Alternate Domain Names (CNAMEs)**: owais.io, www.owais.io
- **SSL Certificate**: Custom ACM certificate for owais.io

#### 4. **SSL/TLS Certificate (AWS Certificate Manager)**
```bash
# Request certificate in us-east-1 (required for CloudFront)
aws acm request-certificate \
  --domain-name owais.io \
  --subject-alternative-names www.owais.io \
  --validation-method DNS \
  --region us-east-1

# Validate via DNS records (added to domain provider)
# Certificate auto-renews before expiration
```

#### 5. **DNS Configuration**
Updated domain DNS records:
- **A Record (Apex)**: owais.io → CloudFront distribution (using ALIAS)
- **A Record (WWW)**: www.owais.io → CloudFront distribution (using ALIAS)
- Or use CNAME if domain provider doesn't support ALIAS records
- TTL: 300 seconds for faster propagation

#### 6. **IAM User for GitHub Actions**
Created dedicated IAM user with minimal permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::owais.io",
        "arn:aws:s3:::owais.io/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::*:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

## 🔄 CI/CD Pipeline with GitHub Actions

I implemented a fully automated CI/CD pipeline that builds and deploys the static site to S3 with CloudFront cache invalidation.

### Pipeline Architecture

```
Git Push (main branch)
         ↓
GitHub Actions Trigger
         ↓
Checkout Code
         ↓
Setup Node.js 18
         ↓
Install Dependencies (npm ci)
         ↓
Build Static Site (npm run build)
         ↓
Configure AWS Credentials
         ↓
Sync Files to S3 (aws s3 sync)
         ↓
Invalidate CloudFront Cache
         ↓
Deployment Complete ✅
```

### Implementation Details

#### 1. **GitHub Secrets Configuration**
Stored AWS credentials securely in GitHub repository secrets:
- `AWS_ACCESS_KEY_ID` - IAM user access key
- `AWS_SECRET_ACCESS_KEY` - IAM user secret key
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID

#### 2. **GitHub Actions Workflow**
Created `.github/workflows/deploy.yml`:

```yaml
name: Deploy Blog to S3 + CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js site
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Sync files to S3
        run: |
          aws s3 sync out/ s3://owais.io/ --delete --no-progress

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

#### 3. **Build Output**
Next.js generates static files to the `out/` directory:
- Pre-rendered HTML pages
- Optimized CSS and JavaScript bundles
- Static assets (images, fonts)
- All ready for S3 hosting

### Benefits of This CI/CD Setup

**Fully Serverless** - No servers to manage or maintain
**Global Performance** - Content delivered from 400+ edge locations worldwide
**Cost Efficient** - Pay only for storage and data transfer, no idle server costs
**Instant Scaling** - Handles traffic spikes automatically without configuration
**Automated Deployments** - Push to main branch and changes go live in 1-2 minutes
**Cache Invalidation** - Ensures users see latest content immediately
**Reduced Human Error** - Eliminates manual deployment steps
**Audit Trail** - Full deployment history in GitHub Actions logs
**Rollback Capability** - Can revert to previous commits if needed

## 🔔 Monitoring & Performance with CloudWatch

CloudFront and S3 provide built-in monitoring through AWS CloudWatch, giving visibility into performance, usage, and potential issues.

### CloudFront Metrics (Automatic)

**Real-time Monitoring** - Available in CloudWatch console:
- **Requests** - Total number of viewer requests
- **Bytes Downloaded** - Amount of data transferred to viewers
- **Bytes Uploaded** - Amount of data uploaded from viewers
- **4xx Error Rate** - Client errors (e.g., 404 not found)
- **5xx Error Rate** - Server/origin errors
- **Cache Hit Rate** - Percentage of requests served from cache

### S3 Metrics (Request Metrics)

**Storage & Request Monitoring**:
- **Bucket Size** - Total storage used
- **Number of Objects** - Total files stored
- **All Requests** - GET, PUT, DELETE operations
- **Data Transfer** - Bytes uploaded/downloaded
- **4xx/5xx Errors** - Request failures

### Optional: CloudWatch Alarms

Can set up alarms for proactive monitoring:

```bash
# Example: Alert on high 5xx error rate
aws cloudwatch put-metric-alarm \
  --alarm-name high-cloudfront-errors \
  --alarm-description "Alert when 5xx errors spike" \
  --metric-name 5xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

**Recommended Alarms:**
- **High 5xx Error Rate** - Detect origin/configuration issues
- **Low Cache Hit Rate** - Optimize caching strategy
- **Unusual Request Volume** - Detect traffic spikes or attacks
- **High 4xx Error Rate** - Find broken links

### Benefits of S3 + CloudFront Monitoring

- **High Availability Built-in** - 99.99% SLA for CloudFront, no instance failures
- **No Server Metrics Needed** - No CPU, memory, or disk to monitor
- **Automatic Scaling** - Infrastructure scales without intervention
- **DDoS Protection** - AWS Shield Standard included automatically
- **Cost Monitoring** - Track S3 storage and CloudFront data transfer costs
- **Performance Insights** - Identify slow-loading pages or assets

## Key Features & Learnings

### What I Built
- **MDX-powered blog** with syntax highlighting and rich content
- **Dynamic tagging system** with filter functionality
- **Responsive design** optimized for all devices
- **SEO optimization** with meta tags and sitemap
- **Static site generation** with Next.js for optimal performance
- **Global CDN delivery** with CloudFront edge locations
- **HTTPS everywhere** with AWS Certificate Manager
- **Serverless architecture** with zero server maintenance

### Skills Demonstrated
- **Cloud Infrastructure** - AWS S3, CloudFront, Certificate Manager, IAM
- **Serverless Architecture** - Static site hosting, CDN configuration
- **DevOps** - CI/CD pipelines, automated deployments, GitHub Actions
- **Security** - SSL/TLS certificates, IAM policies, least-privilege access
- **DNS Management** - Domain configuration, CNAME/ALIAS records
- **Performance Optimization** - CDN caching, compression, edge delivery
- **Cost Optimization** - Serverless pay-per-use model, free SSL certificates

## Troubleshooting / Debugging

### 1. **Next.js Static Export Configuration**
**Problem**: Next.js Server Components and dynamic features don't work with static export.

**Error Encountered**:
```
Error: Page "/blog/[slug]" is using `export const dynamic = "force-dynamic"` which is not compatible with `output: "export"`.
```

**Solution**:
- Configured `next.config.js` with `output: 'export'`
- Set `images.unoptimized: true` to disable Next.js Image Optimization (requires Node.js server)
- Removed server-side features (API routes, ISR, dynamic rendering)
- Used static generation for all pages with `generateStaticParams`

**Lesson Learned**: Static export requires all pages to be pre-rendered at build time.

### 2. **CloudFront Caching Issues**
**Problem**: Updated content not appearing on the live site after deployment.

**Root Cause**: CloudFront caches content at edge locations, old versions remain cached.

**Solution**:
- Added CloudFront cache invalidation to GitHub Actions workflow
- Invalidates all paths (`/*`) after each deployment
- Ensures users get fresh content within 1-2 minutes

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

**Cost Note**: First 1,000 invalidation paths per month are free, then $0.005 per path.

### 3. **S3 Bucket Policy - Access Denied**
**Problem**: Site returns 403 Forbidden errors when accessing pages.

**Root Cause**: S3 bucket doesn't have public read permissions configured.

**Solution**:
- Created bucket policy allowing public `s3:GetObject` access
- Ensured block public access settings allow bucket policies
- Verified CloudFront origin is configured correctly

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::owais.io/*"
  }]
}
```

### 4. **GitHub Actions AWS Credentials Error**
**Problem**: Deployment fails with AWS authentication errors.

**Error Encountered**:
```
Error: Could not load credentials from any providers
```

**Root Cause**: AWS credentials not properly configured in GitHub Secrets.

**Solution**:
- Created IAM user with specific S3 and CloudFront permissions
- Added `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to GitHub Secrets
- Verified IAM policy grants necessary permissions:
  - `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` for S3
  - `cloudfront:CreateInvalidation` for CloudFront

**Security Best Practice**: Use least-privilege IAM policies, never use root credentials.

### 5. **DNS Configuration for CloudFront**
**Problem**: Domain not resolving to CloudFront distribution.

**Solution**:
- Updated DNS records to point to CloudFront distribution domain
- Used CNAME record for `www.owais.io` → CloudFront domain
- Used ALIAS record (if supported by DNS provider) for apex domain `owais.io`
- Waited 5-10 minutes for DNS propagation

**Diagnostic Commands**:
```bash
# Test DNS resolution
nslookup owais.io
dig owais.io

# Check CloudFront distribution
curl -I https://d1234567890abc.cloudfront.net

# Verify SSL certificate
openssl s_client -connect owais.io:443 -servername owais.io
```

### 6. **Missing 404 Page**
**Problem**: Non-existent pages show CloudFront error instead of custom 404.

**Solution**:
- Created custom `404.html` page in Next.js (`app/not-found.tsx`)
- Configured S3 static website hosting with error document: `404.html`
- Set CloudFront to forward 404 errors to custom error page

**Result**: Users see branded 404 page instead of generic error message.

## Running Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/blog.git
cd blog

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the site.

## Project Stats

- **Lines of Code**: 5000+ (TypeScript, TSX, CSS)
- **Blog Posts**: Growing collection of technical tutorials
- **Build Time**: ~1-2 minutes on GitHub Actions runners
- **Deployment Time**: ~1-2 minutes (automated via GitHub Actions)
- **Global Edge Locations**: 400+ CloudFront POPs worldwide
- **Uptime SLA**: 99.99% (CloudFront) + 99.99% (S3)
- **Page Load Time**: <500ms globally (thanks to CDN caching)

## Links

- **Live Site**: [owais.io](https://owais.io)
- **GitHub Actions**: [Deployment History](https://github.com/YOUR_USERNAME/blog/actions)

## 📧 Contact

Feel free to reach out if you have questions about this project or want to discuss opportunities!

- **Website**: [owais.io](https://owais.io)
- **GitHub**: [@owais-io](https://github.com/owais-io)
- **Email**: owais.abbasi9@gmail.com

---

**Built with Next.js, hosted on AWS S3 + CloudFront, and automated with GitHub Actions.**
