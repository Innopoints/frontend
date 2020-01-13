/* The API communication module.
   Inspired by Svelte RealWorld:
     https://github.com/sveltejs/realworld/blob/master/src/node_modules/api.js */

export const API_HOST = process.env.SAPPER_APP_API_HOST;
if (API_HOST == null) {
  throw new Error('The API host is undefined.');
}

function request(method, url, data) {
  const fetch = process.browser ? window.fetch : require('node-fetch').default;
  const formDataClass = process.browser ? FormData : require('url').URLSearchParams;

  let options = {
    credentials: 'include',
    method,
    headers: {},
  };

  if (data instanceof formDataClass) {
    options.body = data;
  } else if (data != null) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then(r => {
      console.log(r);
      console.log(r.status);
      if (r.status == 204) {
        return null;
      } else {
        return r.json();
      }
    });
}

export function get(path) {
  return request('GET', API_HOST + path);
}

export function post(path, data) {
  return request('POST', API_HOST + path, data);
}

export function patch(path, data) {
  return request('PATCH', API_HOST + path, data);
}

export function del(path) {
  return request('DELETE', API_HOST + path);
}
