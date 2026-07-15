<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it with GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/d1cfc76b-8b46-43b2-8f50-997f470d3594

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, select `GitHub Actions`.
4. Push to `main` to trigger the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

The site will be published at:

`https://ganeshalearns.github.io/engl1210-pythonvenv/`
