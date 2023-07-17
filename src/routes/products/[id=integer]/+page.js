import getInitialData from 'src/utils/get-initial-data.js';
import { groupByColor, groupByID } from 'src/utils/product-manipulation.js';
import { API_HOST_BROWSER } from 'src/constants/env.js';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['product', `/products/${page.params.id}`],
    ['sizes', '/sizes'],
  ]));

  if (data.product == null) {
    this.redirect(302, '/products');
  }

  data.account = session.account;

  // Pre-computed props
  data.product.sized = data.product.varieties[0].size != null;
  data.varietyMap = groupByID(data.product.varieties);
  data.varietiesByColor = groupByColor(data.product.varieties);
  data.totalPurchases = data.product.varieties.reduce(
    (acc, variety) => acc + variety.purchases, 0,
  );
  data.colors = [...data.varietiesByColor.keys()];
  data.sizes = data.sizes.map(sizeObject => sizeObject.value);
  data.flatImages = data.colors.flatMap(color => {
    return data.varietiesByColor.get(color)[0].images.map(id => (
      { url: `${API_HOST_BROWSER}/file/${id}`, color }
    ));
  });

  return data;
}
