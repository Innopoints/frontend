import getInitialData from 'src/utils/get-initial-data.js';
import {
  prepareAfterBackend,
  copyProduct,
} from 'src/utils/product-manipulation.js';
import { writable } from 'svelte/store';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['unmodifiedProduct', `/products/${page.params.id}`],
    ['colors', '/colors'],
    ['sizes', '/sizes'],
  ]));

  if (session.account == null || !session.account.is_admin) {
    this.error(403, 'Edit the Product');
  }

  data.product = writable(prepareAfterBackend(copyProduct(data.unmodifiedProduct)));
  data.colors = writable(data.colors);
  data.account = session.account;
  return data;
}
