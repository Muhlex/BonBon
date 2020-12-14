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
