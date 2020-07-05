import isoForURL from 'src/utils/iso-for-url.js';

/* Generate a query string from a map of strings or Dates.
   The resulting string does not contain the leading '?' */
export default function generateQueryString(queryArgs) {
  const queryFragments = [];
  for (let [key, values] of queryArgs.entries()) {
    if (!Array.isArray(values)) {
      values = [values];
    }
    for (const value of values) {
      if (value instanceof Date) {
        queryFragments.push(encodeURIComponent(key) + '=' + isoForURL(value));
      } else {
        queryFragments.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }
  }
  return queryFragments.join('&');
}
