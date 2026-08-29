export const createImagePreview = async (
  file,
  maxWidth = 800,
  maxHeight = 800,
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const originalUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = image.width;
      let height = image.height;

      // Resize while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);

        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      // Convert to compressed WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create preview"));
            return;
          }

          const previewFile = new File(
            [blob],
            `${file.name.split(".")[0]}.webp`,
            {
              type: "image/webp",
            },
          );

          const previewUrl = URL.createObjectURL(previewFile);

          resolve({
            file: previewFile,
            filename: previewFile.name,
            url: previewUrl,
          });

          URL.revokeObjectURL(originalUrl);
        },
        "image/webp",
        0.7,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(originalUrl);
      reject(new Error("Failed to load image"));
    };

    image.src = originalUrl;
  });
};

export const compressImageTo1MB = async (file) => {
  const MAX_SIZE = 1999 * 1024; // 1999 KB
  const TWO_MB = 2 * 1024 * 1024;

  // If image is already <= 2 MB, return original file
  if (file.size <= TWO_MB) {
    return file;
  }

  const MAX_WIDTH = 2000;
  const MAX_HEIGHT = 2000;

  return new Promise((resolve, reject) => {
    const image = new Image();
    const originalUrl = URL.createObjectURL(file);

    image.onload = async () => {
      URL.revokeObjectURL(originalUrl);

      let width = image.width;
      let height = image.height;

      // Resize while maintaining aspect ratio
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);

        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not create canvas context"));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      const getBlob = (quality) =>
        new Promise((resolveBlob) => {
          canvas.toBlob(resolveBlob, "image/webp", quality);
        });

      // Find the highest quality that stays below 1999 KB
      let low = 0.1;
      let high = 1;
      let bestBlob = null;

      for (let i = 0; i < 8; i++) {
        const quality = (low + high) / 2;

        const blob = await getBlob(quality);

        if (!blob) {
          reject(new Error("Failed to compress image"));
          return;
        }

        if (blob.size <= MAX_SIZE) {
          bestBlob = blob;

          // File is small enough.
          // Try higher quality.
          low = quality;
        } else {
          // File is too large.
          // Reduce quality.
          high = quality;
        }
      }

      if (!bestBlob) {
        reject(new Error("Unable to compress image below 1999 KB"));
        return;
      }

      const filename = `${file.name.replace(/\.[^/.]+$/, "")}.webp`;

      const compressedFile = new File([bestBlob], filename, {
        type: "image/webp",
      });

      resolve(compressedFile);
    };

    image.onerror = () => {
      URL.revokeObjectURL(originalUrl);

      reject(new Error("Failed to load image"));
    };

    image.src = originalUrl;
  });
};
