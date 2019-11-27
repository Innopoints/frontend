export default (arr, uniqueKey) => {
  if (Array.isArray(arr) && arr[0]) {
    let first = arr[0];
    if (first && typeof first === 'object') {
      return arr.map((item, i) => ({
        id: item[uniqueKey] || item.id || i,
        ...item,
      }));
    } else if (first && typeof first === 'string') {
      return arr.map((item, i) => ({
        id: i,
        label: item,
      }));
    }
  }
};
