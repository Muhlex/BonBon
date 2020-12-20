export const promptImageInput = (camera = false) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', camera ? 'image/*' : 'image/*, application/pdf');
    if (camera) input.setAttribute('capture', 'camera');
    input.click();

    input.onchange = ({ target: { files } }) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onabort = reject;
      reader.onerror = reject;
      reader.readAsDataURL(files[0]);
    };
  });
};

export const convertImage = (src, maxSize = 800, format = 'jpeg', quality = 0.9) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const resize = (side) => {
        const factor = maxSize / side;
        img.width = Math.floor(img.width * factor);
        img.height = Math.floor(img.height * factor);
      };

      if (img.width > maxSize || img.height > maxSize ) {
        img.width > img.height ? resize(img.width) :  resize(img.height);
      }

      // Set Canvas to Image-Dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      canvas.getContext('2d').drawImage(img, 0, 0 , img.width, img.height);
      resolve(canvas.toDataURL(`image/${format}`, quality));
    };
  });
};
