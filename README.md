# My Personal Blog & Portfolio

[![Deploy Status](https://github.com/YOUR_USERNAME/blog/workflows/Deploy%20to%20EC2/badge.svg)](https://github.com/YOUR_USERNAME/blog/actions)
[![Live Site](https://img.shields.io/badge/live-owais.io-blue)](https://owais.io)

## 🚀 About This Project

This is my personal blog and portfolio website where I write comprehensive technical tutorials and share insights on topics including:

- **DevOps** - CI/CD, automation, infrastructure as code
- **SecOps** - Security operations, vulnerability management, best practices
- **Cloud Computing** - AWS, cloud architecture, serverless
- **SysOps** - Linux administration, system optimization, monitoring
- **AI/ML** - Artificial intelligence, machine learning implementations
- **And more...**

I built this project to demonstrate my full-stack development capabilities, cloud deployment expertise, and DevOps practices. It showcases my ability to architect, develop, deploy, and maintain a production-grade web application.

## 🛠️ Tech Stack

### Frontend & Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with JSX for rich blog content

### Infrastructure & Deployment
- **AWS EC2** - Ubuntu 24.04 LTS on t2.micro (Free Tier)
- **Nginx** - Reverse proxy and web server
- **PM2** - Production process manager
- **Let's Encrypt** - Free SSL/TLS certificates via Certbot
- **GitHub Actions** - Automated CI/CD pipeline

## 🏗️ Architecture Overview

```
User Request (HTTPS)
         ↓
    Domain (owais.io)
         ↓
    AWS EC2 Instance
         ↓
    Nginx (Port 80/443)
         ↓
    Next.js App (Port 3000)
         ↓
    Static & Dynamic Content
```

## 📦 AWS EC2 Deployment (Free Tier)

I deployed this application on AWS EC2 to gain hands-on experience with cloud infrastructure management while keeping costs minimal.

### Instance Configuration
- **Instance Type**: t2.micro (1 vCPU, 1GB RAM)
- **AMI**: Ubuntu Server 24.04 LTS
- **Storage**: 8GB gp3 SSD
- **Network**: VPC with Elastic IP for static addressing
- **Security**: Custom security group with SSH, HTTP, HTTPS access

### Setup Process

#### 1. **Server Provisioning**
- Launched EC2 instance via AWS Console
- Configured security groups with proper inbound/outbound rules
- Allocated and associated Elastic IP for consistent DNS mapping
- Set up SSH key pair for secure access

#### 2. **Environment Configuration**
```bash
# Updated system packages
sudo apt update && sudo apt upgrade -y

# Installed Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Installed PM2 for process management
sudo npm install -g pm2

# Installed Nginx as reverse proxy
sudo apt install nginx -y

# Created 2GB swap space (critical for t2.micro with limited RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 3. **Application Deployment**
```bash
# Cloned repository
git clone https://github.com/YOUR_USERNAME/blog.git
cd blog

# Installed dependencies
npm install

# Built production bundle
npm run build

# Started app with PM2
pm2 start npm --name "blog" -- start
pm2 startup  # Configure PM2 to start on system boot
pm2 save
```

#### 4. **Nginx Configuration**
I configured Nginx as a reverse proxy to forward traffic from port 80/443 to the Next.js application running on port 3000:

```nginx
server {
    listen 80;
    server_name owais.io www.owais.io;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 5. **SSL/TLS Setup**
```bash
# Installed Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtained free SSL certificate from Let's Encrypt
sudo certbot --nginx -d owais.io -d www.owais.io

# Configured auto-renewal
sudo certbot renew --dry-run
```

#### 6. **DNS Configuration**
- Updated domain DNS records (A records) to point to EC2 Elastic IP
- Configured both root domain and www subdomain
- Waited for DNS propagation (10-15 minutes)

## 🔄 CI/CD Pipeline with GitHub Actions

I implemented a fully automated CI/CD pipeline to streamline the deployment process and demonstrate modern DevOps practices.

### Pipeline Architecture

```
Git Push (main branch)
         ↓
GitHub Actions Trigger
         ↓
SSH into EC2 Instance
         ↓
Pull Latest Code
         ↓
Install Dependencies
         ↓
Build Application
         ↓
Restart PM2 Process
         ↓
Deployment Complete ✅
```

### Implementation Details

#### 1. **SSH Key Setup**
Generated dedicated SSH key pair on EC2 for GitHub Actions:
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions_key
cat ~/.ssh/github_actions_key.pub >> ~/.ssh/authorized_keys
```

#### 2. **GitHub Secrets Configuration**
Stored sensitive credentials securely in GitHub repository secrets:
- `EC2_SSH_KEY` - Private SSH key for authentication
- `EC2_HOST` - EC2 Elastic IP address
- `EC2_USER` - Ubuntu username

#### 3. **GitHub Actions Workflow**
Created `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/blog
            git pull origin main
            export NODE_OPTIONS="--max-old-space-size=1536"
            npm install
            npm run build
            pm2 restart blog
            pm2 save
```

#### 4. **Security Group Configuration**
Updated EC2 security group to allow SSH access from GitHub Actions runners:
- Port 22 (SSH): Open to 0.0.0.0/0 for GitHub Actions
- Port 80 (HTTP): Open to 0.0.0.0/0 (redirects to HTTPS)
- Port 443 (HTTPS): Open to 0.0.0.0/0

### Benefits of This CI/CD Setup

✅ **Automated Deployments** - Push to main branch and changes go live automatically
✅ **Zero Downtime** - PM2 performs graceful restarts
✅ **Fast Iterations** - Typical deployment completes in 1-2 minutes
✅ **Reduced Human Error** - Eliminates manual deployment steps
✅ **Audit Trail** - Full deployment history in GitHub Actions logs
✅ **Rollback Capability** - Can revert to previous commits if needed

## 🎯 Key Features & Learnings

### What I Built
- 📝 **MDX-powered blog** with syntax highlighting and rich content
- 🏷️ **Dynamic tagging system** with filter functionality
- 📱 **Responsive design** optimized for all devices
- 🔍 **SEO optimization** with meta tags and sitemap
- ⚡ **Performance optimized** with Next.js static generation
- 🔒 **HTTPS everywhere** with automatic SSL renewal

### Skills Demonstrated
- **Full-Stack Development** - Next.js, TypeScript, React, Tailwind
- **Cloud Infrastructure** - AWS EC2, VPC, Security Groups, Elastic IP
- **System Administration** - Linux, Nginx, PM2, SSH
- **DevOps** - CI/CD pipelines, automated deployments, GitHub Actions
- **Security** - SSL/TLS, SSH key management, firewall configuration
- **DNS Management** - Domain configuration, A records, propagation

### Challenges Overcome & Debugging Journey

#### 1. **Memory Constraints on t2.micro**
**Problem**: t2.micro instance has only 1GB RAM, which is insufficient for Next.js builds.

**Error Encountered**:
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**Solution**:
- Created 2GB swap space to supplement physical RAM
- Set `NODE_OPTIONS="--max-old-space-size=1536"` in deployment script
- Optimized build process to use available memory efficiently

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

#### 2. **GitHub Actions SSH Authentication Failure**
**Problem**: First deployment attempt failed with SSH key parsing error.

**Error Encountered**:
```
2025/10/10 17:48:37 ssh.ParsePrivateKey: ssh: no key found
```

**Root Cause**: The private SSH key wasn't copied correctly to GitHub Secrets - missing characters or extra whitespace.

**Solution**:
- Regenerated the private key display: `cat ~/.ssh/github_actions_key`
- Carefully copied the **entire** key including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`
- Updated the `EC2_SSH_KEY` secret in GitHub with the complete, unmodified key
- Ensured no extra spaces or line breaks were added during copy-paste

**Lesson Learned**: Always verify secret values are copied exactly as displayed in terminal.

#### 3. **GitHub Actions Network Timeout**
**Problem**: After fixing the SSH key, deployment failed with connection timeout.

**Error Encountered**:
```
2025/10/10 17:54:49 dial tcp ***:22: i/o timeout
Error: Process completed with exit code 1.
```

**Root Cause**: EC2 security group was configured to allow SSH only from "My IP", blocking GitHub Actions runners.

**Solution**:
- Updated EC2 security group inbound rules
- Added SSH (port 22) access from `0.0.0.0/0` to allow GitHub's dynamic runner IPs
- Maintained the rule allowing my personal IP for manual SSH access
- Configured proper descriptions for each rule to track their purpose

**Security Note**: While opening port 22 to all IPs is less restrictive, I mitigated risk by:
- Using SSH key authentication (no password authentication)
- Keeping the SSH key secure in GitHub Secrets
- Monitoring access logs regularly with `sudo tail -f /var/log/auth.log`

#### 4. **DNS Propagation Delay**
**Problem**: Domain didn't immediately point to EC2 instance after updating DNS records.

**Root Cause**: DNS caching at multiple levels (local machine, ISP, global DNS servers).

**Solution**:
- Verified DNS records were correctly set in GoDaddy (A record: `owais.io` → `98.90.226.233`)
- Tested DNS propagation using: `nslookup owais.io 8.8.8.8` (Google DNS)
- Cleared local DNS cache on development machine
- Waited 10-15 minutes for global DNS propagation
- Verified EC2 was responding correctly to IP address before troubleshooting DNS

**Diagnostic Commands Used**:
```bash
# Test DNS resolution
nslookup owais.io
dig owais.io

# Test direct IP access
curl -I http://98.90.226.233

# Check global DNS propagation
# Used: https://dnschecker.org
```

#### 5. **Zero-Downtime Deployments**
**Challenge**: Ensuring the site remains available during automated deployments.

**Solution**: Leveraged PM2's graceful restart capability
- PM2 automatically spawns new process before killing old one
- Configured `pm2 restart blog` instead of `pm2 stop` then `pm2 start`
- Used `pm2 save` to persist process list
- Set up `pm2 startup` to auto-restart on system reboot

**Result**: Achieved seamless deployments with no user-facing downtime.

## 🚀 Running Locally

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

## 📊 Project Stats

- **Lines of Code**: 5000+ (TypeScript, TSX, CSS)
- **Blog Posts**: Growing collection of technical tutorials
- **Build Time**: ~2 minutes on EC2 t2.micro
- **Deployment Time**: ~1-2 minutes (automated)
- **Uptime**: 99.9% (monitored via PM2)

## 🔗 Links

- **Live Site**: [owais.io](https://owais.io)
- **GitHub Actions**: [Deployment History](https://github.com/YOUR_USERNAME/blog/actions)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

Feel free to reach out if you have questions about this project or want to discuss opportunities!

- **Website**: [owais.io](https://owais.io)
- **GitHub**: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- **Email**: your.email@example.com

---

**Built with ❤️ using Next.js, deployed on AWS EC2, and automated with GitHub Actions.**
