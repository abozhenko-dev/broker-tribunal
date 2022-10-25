export const getMediaDimensions = (file) => {
  const img = new Image();

  return new Promise((resolve, reject) => {
    // the following handler will fire after a successful loading of the image
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({
        width,
        height
      });
    };

    // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
    img.onerror = () => {
      reject("There was some problem with the image.");
    };

    img.src = URL.createObjectURL(file);
  });
};
