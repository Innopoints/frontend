import { get, json } from '@/utils/api.js';

export default async function *getOptions(query) {
  let current_page = 1;
  let pages;
  let limit = 10;
  if (query.length < 3) {
    return [];
  }

  do {
    try {
      const { data: accounts, pages: newPages } = await json(get(
        `/accounts?page=${current_page}&limit=${limit}&q=${query}`,
      ));
      yield accounts.map(account => ({name: account.full_name, details: account.email}));
      current_page++;
      pages = newPages;
    } catch (e) {
      console.error(e);
    }
  } while (current_page < pages);

  return [];
}
