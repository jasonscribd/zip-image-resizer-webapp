const express = require('express');
const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_WIDTH = 300;

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.tiff',
  '.gif',
  '.avif',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 250 * 1024 * 1024,
  },
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/resize-zip', upload.single('zipFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a ZIP file.' });
    }

    const inputZip = new AdmZip(req.file.buffer);
    const entries = inputZip.getEntries();

    if (entries.length === 0) {
      return res.status(400).json({ error: 'ZIP file is empty.' });
    }

    const outputZip = new AdmZip();
    let resizedCount = 0;

    for (const entry of entries) {
      if (entry.isDirectory) {
        continue;
      }

      const parsed = path.parse(entry.entryName);
      const ext = parsed.ext.toLowerCase();

      if (!IMAGE_EXTENSIONS.has(ext)) {
        continue;
      }

      let imageBuffer;
      try {
        imageBuffer = entry.getData();
      } catch {
        continue;
      }

      try {
        const resizedBuffer = await sharp(imageBuffer)
          .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
          .toBuffer();

        outputZip.addFile(entry.entryName, resizedBuffer);
        resizedCount += 1;
      } catch {
        continue;
      }
    }

    if (resizedCount === 0) {
      return res.status(400).json({
        error: 'No supported image files were found in the ZIP.',
      });
    }

    const outputBuffer = outputZip.toBuffer();
    const baseName = path.parse(req.file.originalname).name || 'images';
    const downloadName = `${baseName}-resized-${TARGET_WIDTH}px.zip`;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.send(outputBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your file.' });
  }
});

app.listen(PORT, () => {
  console.log(`Zip image resizer running at http://localhost:${PORT}`);
});
