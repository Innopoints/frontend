import {API_HOST} from '@/constants/env';

// fetchType is needed for server-side request:
// in Sapper's preload() function there's this.fetch function that
// distinguishes between node-fetch and usual fetch depending on env
export default async (fetchType = fetch, url = '', method = 'GET', body = {}, isForm = false) => {
  let options = {
    credentials: 'include',
    method,
  };

  if (isForm) options.body = body;
  else if (Object.entries(body).length) options.body = JSON.stringify(body);

  let headers = new Headers();
  if (!isForm && Object.entries(body).length) headers.append('Content-Type', 'application/json');
  options.headers = headers;

  return await fetchType(API_HOST + url, options).then(res => {
    if (res.status === 204) return true;
    else if (res.ok) return res.json();
    return null;
  });
};
