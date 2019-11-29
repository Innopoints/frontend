// Get array of files ([File, File]), open each asynchronously
// and return array of strings that should be passed as src:
// <img src={images}>

export default async (arr) => {
  let urls = [];
  for (let i = 0; i < arr.length; i++) urls.push(await readFileAsync(arr[i]));
  return urls;
};

export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
