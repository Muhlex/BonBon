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

export const imageconvert = (src) => {
  // Creates PseudoElement Canvas; setting Canvas-Heigh/-Width to 1000 by default
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1000;
  // Createing new Image; Define on Load-Event
  const img = new Image();
  img.onload = e => {
    // Drawing Image to Canvas when its loaded and converting Image.src to type JPEG
    canvas.getContext('2d').drawImage(img, 0, 0);
    e.target.src = canvas.toDataURL('image/jpeg', 1);
  };
  // Setting originally Image.src
  img.src = src;

  // Setting Canvas Dimensions

  return img;
};
