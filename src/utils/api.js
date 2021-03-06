/* The API communication module.
   Inspired by Svelte RealWorld:
     https://github.com/sveltejs/realworld/blob/master/src/node_modules/api.js */

import { API_HOST } from 'src/constants/env.js';
import generateQueryString from 'src/utils/generate-query-string.js';

if (API_HOST == null) {
  throw new Error('The API host is undefined.');
}

function request(method, url, options) {
  const formDataClass = process.browser ? FormData : require('url').URLSearchParams;

  const actualOptions = {
    method,
    headers: options && options.headers || {},
    signal: options && options.signal,
  };

  if (options && 'cookie' in options) {
    actualOptions.headers['Cookie'] = options.cookie;
  }

  if (options && 'csrfToken' in options) {
    actualOptions.headers['X-CSRF-Token'] = options.csrfToken;
  }

  if (options && options.data instanceof formDataClass) {
    actualOptions.body = options.data;
  } else if (options && options.data != null) {
    actualOptions.headers['Content-Type'] = 'application/json';
    actualOptions.body = JSON.stringify(options.data);
  }

  if (this == null || this.fetch == null) {
    return window.fetch(url, actualOptions);
  }

  return this.fetch(url, actualOptions);
}

export function get(path, options) {
  let fullPath = API_HOST + path;
  if (options != null && options.query != null) {
    fullPath += '?' + generateQueryString(options.query);
    delete options.query;
  }
  return request.call(this, 'GET', fullPath, options);
}

export function post(path, options) {
  return request.call(this, 'POST', API_HOST + path, options);
}

export function patch(path, options) {
  return request.call(this, 'PATCH', API_HOST + path, options);
}

export function del(path, options) {
  return request.call(this, 'DELETE', API_HOST + path, options);
}

/* Returns the JSON-decoded response on request success,
   throws the appropriate type of error on request failure. */
export async function json(request) {
  const response = await request;

  if (!response.ok) {
    if (response.status === 400) {
      throw await response.json();
    } else {
      throw await response.text();
    }
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}
