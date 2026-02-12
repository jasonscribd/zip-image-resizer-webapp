# ZIP Image Resizer Web App

Use the live app on GitHub Pages:

- https://jasonscribd.github.io/zip-image-resizer-webapp/

This version runs fully in the browser: upload a `.zip`, resize images to **300px width** (keeping aspect ratio), and download a new ZIP.

## What it does

- Accepts ZIP files from your laptop
- Resizes supported images to width `300px` without enlarging smaller images
- Preserves folder structure in the ZIP
- Keeps non-image files unchanged
- Does not upload files to a backend server

Supported input image extensions:

- `jpg`, `jpeg`, `png`, `webp`, `gif`, `avif`, `tiff`

## Local development (optional)

If you want to run the original Node app locally:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## GitHub

Repository:

- https://github.com/jasonscribd/zip-image-resizer-webapp
