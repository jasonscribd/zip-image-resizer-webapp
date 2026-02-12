const form = document.getElementById('upload-form');
const fileInput = document.getElementById('zip-file');
const statusEl = document.getElementById('status');
const submitButton = form.querySelector('button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    statusEl.textContent = 'Select a ZIP file first.';
    return;
  }

  const formData = new FormData();
  formData.append('zipFile', file);

  statusEl.textContent = 'Processing ZIP...';
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/resize-zip', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let message = 'Failed to process ZIP file.';
      try {
        const data = await response.json();
        if (data.error) {
          message = data.error;
        }
      } catch {
        // Ignore JSON parsing errors.
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition') || '';
    const match = contentDisposition.match(/filename="(.+)"/i);
    const filename = match ? match[1] : 'resized-images.zip';

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    statusEl.textContent = 'Done. Your resized ZIP has started downloading.';
  } catch (error) {
    statusEl.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
