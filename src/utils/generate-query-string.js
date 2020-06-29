/* Generate a query string from a map of strings.
   The resulting string does not contain the leading '?' */
export default function generateQueryString(queryArgs) {
  const queryFragments = [];
  for (let [key, values] of queryArgs.entries()) {
    if (!Array.isArray(values)) {
      values = [values];
    }
    for (const value of values) {
      queryFragments.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  return queryFragments.join('&');
}
