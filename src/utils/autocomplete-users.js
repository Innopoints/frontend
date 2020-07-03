import * as api from 'src/utils/api.js';

export const minSearchLength = 2;

export function userToAutocompleteValue(user) {
  return {
    name: user.full_name,
    details: user.email,
  };
}

export function autocompleteValueToUser(value) {
  return {
    full_name: value.name,
    email: value.details,
  };
}

export async function* getUsersRaw(query, filterFunction = null) {
  if (query.length < minSearchLength) {
    return [];
  }

  let currentPage = 1;
  let pages, data;
  while (pages == null || currentPage <= pages) {
    ({ pages, data } = await api.json(api.get('/accounts', {
      query: new Map([['q', query], ['page', currentPage]]),
    })));
    if (typeof filterFunction === 'function') {
      data = data.filter(filterFunction);
    }
    yield data.map(userToAutocompleteValue);
    currentPage++;
  }
}
