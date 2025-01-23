function downloadImage(image) {
  return new Promise((resolve, reject) => {
    fetch(image.url)
      .then(response => {
        // The fetch promise has resolved
        if (!response.ok) {
          // But the download failed, so we reject our promise
          reject(`Failed to load image's URL: ${image.url}`);
        } else {
          // The download succeeded, so we resolve our promise
          resolve(response.blob());
        }
      })
      .catch(error => {
        // The fetch promise rejected, so we reject our promise
        reject(`Failed to load image's URL: ${image.url}`);
      });
  });
} 
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
btn.addEventListener('click', () => {
  // Display loading spinner
  document.getElementById('loading').innerHTML = 'Loading...';

  const imagePromises = images.map(downloadImage);
// Display loading spinner
document.getElementById('loading').innerHTML = 'Loading...';

Promise.all(imagePromises)
  .then(blobs => {
    // Clear loading spinner
    document.getElementById('loading').innerHTML = '';

    // All images have been downloaded
    // Create an img element for each blob and add it to the output div
    blobs.forEach(blob => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      output.appendChild(img);
    });
  })
  .catch(error => {
    // Clear loading spinner
    document.getElementById('loading').innerHTML = '';

    // At least one image failed to download
    // Display the error message in the error div
    document.getElementById('error').textContent = error;
  });

