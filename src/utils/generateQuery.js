export default (obj = {}) => {
  const res = [];
  for (let d in obj) res.push(encodeURIComponent(d) + '=' + encodeURIComponent(obj[d]));
  let str = res.join('&');
  return str ? '?' + str : str;
};
