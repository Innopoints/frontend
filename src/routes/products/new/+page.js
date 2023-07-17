import getInitialData from 'src/utils/get-initial-data.js';
import { writable } from 'svelte/store';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['colors', '/colors'],
    ['sizes', '/sizes'],
  ]));

  if (session.account == null || !session.account.is_admin) {
    this.error(403, 'Create a Product');
  }

  data.colors = writable(data.colors);
  data.account = session.account;
  return data;
}
