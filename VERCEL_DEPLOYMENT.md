# Vercel Deployment

This repository is set up for automatic deployment to Vercel.

## Setup Instructions

To enable Vercel deployment, you need to configure the following secrets in your GitHub repository:

### 1. Get Vercel Credentials

1. Sign up or log in to [Vercel](https://vercel.com)
2. Create a new project or use an existing one
3. Go to your account settings: https://vercel.com/account/tokens
4. Generate a new token and save it

### 2. Get Project IDs

Run these commands in your terminal (after installing Vercel CLI):

```bash
# Login to Vercel
vercel login

# Link your project
vercel link

# This will create a .vercel folder with project.json
# The file contains your orgId and projectId
cat .vercel/project.json
```

### 3. Add GitHub Secrets

Go to your GitHub repository settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your organization/team ID from `.vercel/project.json`
- `VERCEL_PROJECT_ID`: Your project ID from `.vercel/project.json`

### 4. Deploy

Once the secrets are configured, every push to the `main` branch will automatically deploy to Vercel.

## Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## Project Configuration

The `vercel.json` file in the root directory contains the deployment configuration:
- Clean URLs (no `.html` extension)
- Service Worker headers for PWA support
- Public directory configuration
