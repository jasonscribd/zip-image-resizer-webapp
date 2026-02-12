# ZIP Image Resizer Web App

Simple web app to upload a `.zip` file of images, resize each image to **300px width** while preserving proportions, and download a new ZIP.

## Features

- Upload ZIP from your laptop
- Automatically processes supported image files: `jpg`, `jpeg`, `png`, `webp`, `tiff`, `gif`, `avif`
- Keeps aspect ratio (`300px` width target)
- Returns a downloadable ZIP with resized images

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open in browser:

```text
http://localhost:3000
```

## Scripts

- `npm start` - start server
- `npm run dev` - start server in watch mode

## Share with coworkers on GitHub

1. Create a new repo on GitHub (for example: `zip-image-resizer-webapp`)
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial ZIP image resizer app"
git branch -M main
git remote add origin https://github.com/<your-org-or-user>/zip-image-resizer-webapp.git
git push -u origin main
```

3. Coworkers can clone and run:

```bash
git clone https://github.com/<your-org-or-user>/zip-image-resizer-webapp.git
cd zip-image-resizer-webapp
npm install
npm start
```

## Notes

- Images smaller than 300px wide are not enlarged.
- Non-image files in the ZIP are skipped.
- If needed later, deployment to Render/Railway can be added with minimal changes.
