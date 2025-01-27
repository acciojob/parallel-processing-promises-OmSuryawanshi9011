function downloadImage(image) {
  return new Promise((resolve, reject) => {
    fetch(image.url)
      .then((response) => {
        if (!response.ok) {
          reject(`Failed to load image's URL: ${image.url}`);
        } else {
          resolve(response.blob());
        }
      })
      .catch(() => {
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

btn.addEventListener("click", () => {
  // Clear any previous content
  document.getElementById("output").innerHTML = "";
  document.getElementById("error").innerHTML = "";

  // Show loading spinner
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";

  // Start downloading images
  const imagePromises = images.map(downloadImage);

  Promise.all(imagePromises)
    .then((blobs) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Create image elements for each blob
      blobs.forEach((blob) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        img.style.margin = "10px";
        img.width = 200; // Adjust image size as needed
        img.height = 300;
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display error message
      const errorDiv = document.getElementById("error");
      errorDiv.textContent = error;
    });
});
