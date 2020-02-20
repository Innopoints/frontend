import { get } from '@/utils/api.js'; 

export default async function *getOptions(query) {
  let current_page = 1;
  let pages;
  let limit = 10;
  if (query.length < 3) {
    return [];
  }

  do {
    const res = await get(`/accounts?page=${current_page}&limit=${limit}&q=${query}`);
	const {data: accounts, pages: new_pages} = await res.json();
    yield accounts.map(account => ({name: account.full_name, details: account.email}));
    current_page++;
    pages = new_pages;
  } while (current_page < pages);

  return [];
}
