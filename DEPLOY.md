# Ad Script Builder, deploy guide

Your client link is: https://fcm-script-builder.vercel.app/
This folder is the complete, current version of the tool. Deploying it takes about 5 minutes.

## If you already have the GitHub repo + Vercel project (most likely)

1. Go to github.com and open your ad-script-builder repository.
2. Click "Add file" (top right), then "Upload files".
3. Unzip this download. Drag EVERYTHING inside the "adscript" folder into the upload area
   (pages, public, styles, components, lib, package.json, next.config.js, .env.example, DEPLOY.md).
   Uploading files with the same names replaces the old ones. That is what you want.
4. Click "Commit changes".
5. Vercel redeploys automatically. Wait about 60 seconds, then open your link.

## Check the API key (only needed once)

1. vercel.com > your project > Settings > Environment Variables.
2. There must be one called ANTHROPIC_API_KEY with your sk-ant-... key.
   If it is missing, add it, then go to Deployments and click "Redeploy" on the latest one.
3. Make sure console.anthropic.com shows credits on your account.

## If the link shows "404 NOT_FOUND" from Vercel

The project was never deployed or was deleted. Do this instead:
1. vercel.com > "Add New" > "Project" > Import your ad-script-builder repo.
2. Click "Environment Variables", add ANTHROPIC_API_KEY, click Deploy.

## Starting from scratch (no GitHub repo yet)

1. github.com > "+" > "New repository" > name it ad-script-builder, Private, Create.
2. Click "uploading an existing file", drag everything inside the "adscript" folder, Commit.
3. vercel.com > Add New Project > Import that repo > add ANTHROPIC_API_KEY > Deploy.

## Test it before you send it

Open your link, fill in the four niche fields, pick Direct Offer, Solution Aware,
Competitive Market, type an emotion, tick two durations, pick a framework, answer the
steps, generate hooks, pick one, generate scripts. You should see a tab per duration.

## Cost

Vercel and GitHub are free. Anthropic charges you roughly half a cent per script.
