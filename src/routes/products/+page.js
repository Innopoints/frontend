import getInitialData from 'src/utils/get-initial-data.js';
const productLimit = 24;

export async function load(page, session) {
  const { products, colors } = await getInitialData(this, session, new Map([
    ['products', `/products?limit=${productLimit}`],
    ['colors', `/colors`],
  ]));
  return {
    account: session.account,
    products: products != null ? products.data : [],
    pages: products != null ? products.pages : 0,
    colors,
  };
}
