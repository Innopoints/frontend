// Get array of files ([File, File]), open each asynchronously
// and return array of strings that should be passed as src:
// <img src={images}>

export default (arr) => Promise.all(arr.map(readFileAsync));

export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
