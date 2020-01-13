/* Generate a query string from a map of strings.
   The resulting string does not contain the leading '?' */
export default function generateQueryString(queryArgs) {
  const queryFragments = [];
  for (let arg in queryArgs.keys()) {
    queryFragments.push(encodeURIComponent(arg) + '=' + encodeURIComponent(queryArgs.get(arg)));
  }
  return queryFragments.join('&');
}
