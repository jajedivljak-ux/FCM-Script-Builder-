# Ad Script Builder — Deployment Guide

This guide deploys your Ad Script Builder to Vercel so you can send
clients a clean link like `adscriptbuilder.vercel.app`.
Takes about 10 minutes. No coding required.

---

## What you need before you start

1. A free Vercel account — sign up at https://vercel.com (use "Continue with GitHub")
2. A free GitHub account — sign up at https://github.com
3. Your Anthropic API key — get it at https://console.anthropic.com

---

## Step 1 — Get your Anthropic API key

1. Go to https://console.anthropic.com
2. Click "API Keys" in the left sidebar
3. Click "Create Key", give it a name like "Ad Script Builder"
4. Copy the key immediately (it starts with sk-ant-...)
   IMPORTANT: Save it somewhere, you can only see it once
5. Make sure your account has credits. Add a small amount
   (even $5 covers thousands of script generations)

---

## Step 2 — Upload the project to GitHub

1. Go to https://github.com and sign in
2. Click the "+" icon top right, then "New repository"
3. Name it: ad-script-builder
4. Set it to Private
5. Click "Create repository"
6. On the next screen, click "uploading an existing file"
7. Unzip the folder you downloaded from Claude
8. Drag ALL the files and folders into the GitHub upload area
   (make sure you include: pages/, components/, lib/, styles/,
    package.json, next.config.js, .env.example)
9. Click "Commit changes"

---

## Step 3 — Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Click "Import" next to your ad-script-builder repository
4. Vercel will auto-detect it's a Next.js project — leave all settings as is
5. Before clicking Deploy, click "Environment Variables"
6. Add one variable:
   - Name:  ANTHROPIC_API_KEY
   - Value: paste your key (the sk-ant-... one you copied)
7. Click "Add"
8. Click "Deploy"
9. Wait about 60 seconds

---

## Step 4 — Your link is live

Vercel gives you a URL like: https://ad-script-builder-abc123.vercel.app

You can also set a custom domain if you have one:
- In your Vercel project, go to Settings > Domains
- Add your domain and follow their instructions

---

## Step 5 — Send it to clients

Just copy the Vercel URL and send it.
No login required. It works on any device.

---

## Updating the tool later

When you want to make changes (Claude can update the code for you):
1. Download the updated files from Claude
2. Go to your GitHub repository
3. Click on the file you want to update
4. Click the pencil icon (Edit)
5. Paste the new content
6. Click "Commit changes"
7. Vercel will automatically redeploy within 60 seconds

---

## Cost

- Vercel hosting: FREE (hobby plan is plenty)
- GitHub: FREE
- Anthropic API: you pay per script generated
  Roughly $0.003-0.006 per script (less than 1 cent each)
  $5 of credit = around 1000+ scripts

---

## Troubleshooting

**"Script generation failed" error on the live site**
- Check your Anthropic API key is correct in Vercel > Settings > Environment Variables
- Check your Anthropic account has credits at console.anthropic.com

**The site won't load**
- Check the Vercel dashboard for build errors
- Make sure all files were uploaded to GitHub including package.json

**Need help?**
Come back to Claude and paste the error message.
