export const promptImageInput = (camera = false) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    if (camera) input.setAttribute('capture', 'camera');
    // INFO iOS Iphone: input has to be Part of Dom. If not Changeevent isn#t triggered
    input.style.display = 'none';
    document.body.appendChild(input);
    // INFO END
    input.click();
    input.onchange = ({ target: { files } }) => {
      document.body.removeChild(input);
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

export const convertImage = (src, maxSize = 1200, format = 'jpeg', quality = 0.85) => {
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
