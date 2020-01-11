import { writable, get } from 'svelte/store';
import { goto } from '@sapper/app';
import request from '@/utils/request';

export const colors = writable([]);
export const customColors = writable({});
export function setColors(allColors) {
  colors.update(() => allColors.map(color => ({color: color.value})));
}
export function addNewColor(id, color) {
  customColors.update(x => {
    return {...x, [id]: { color }};
  });
}

function newVariety() {
  return {
    color: null,
    sizes: {
      XS:  0,
      S:   0,
      M:   0,
      L:   0,
      XL:  0,
      XXL: 0,
    },
    quantity: 0,
    images: [],
  };
}

const newItem = () => ({
  name: '',
  type: '',
  description: '',
  price: 0,
  inSizes: false,
  varieties: [newVariety()],
  error: false,
});

export const item = writable(newItem());

export const changeItemField = (field, value) => {
  item.update(itm => ({ ...itm, [field]: value }));
};

export const changeVarietyField = (id, field, value) => {
  item.update(itm => {
    let varieties = itm.varieties;
    varieties[id][field] = value;
    return {...itm, varieties};
  });
};

export const changeVarietySize = (id, size, value) => {
  item.update(itm => {
    let varieties = itm.varieties;
    varieties[id].sizes[size] = value;
    return {...itm, varieties};
  });
};

export const toggleSizes = () => {
  item.update(itm => ({ ...itm, inSizes: !itm.inSizes }));
  saveDraft();
};

export const addVariety = () => {
  item.update(itm => ({ ...itm, varieties: [...itm.varieties, newVariety()] }));
  saveDraft();
};

export const removeVariety = (index) => {
  item.update(itm => ({ ...itm, varieties: itm.varieties.filter((x, i) => i !== index) }));
  saveDraft();
};

export const uploadFiles = async files => {
  let images = [];
  for (let file of files) {
    const formData = new FormData();
    formData.append('file', file);
    images.push(await request(fetch, '/file/product', 'POST', formData, true));
  }
  return images;
};

export const clearAll = () => {
  item.update(() => newItem());
  saveDraft();
};

export const getDraft = () => {
  let product = JSON.parse(localStorage.getItem('product-draft'));
  if (product) item.update(() => product);
  validate();
};

export const saveDraft = () => {
  localStorage.setItem('product-draft', JSON.stringify(get(item)));
  validate();
};

const validate = () => {
  let product = get(item);

  let error = true;
  if (product.name && product.price && product.varieties[0].images.length) error = false;

  changeItemField('error', error);
  return error;
};

export const createProduct = async () => {
  if (validate()) return;

  const product = get(item);
  let varieties = [];
  product.varieties.forEach(variety => {
    let color = variety.color ? variety.color.replace(/[^0-9a-f]/gi, '') : null;
    let imgs = variety.images.map(img => img.url);

    if (product.inSizes) {
      for (let size in variety.sizes) {
        if (variety.sizes[size] > 0) {
          varieties.push({
            size,
            color,
            images: imgs,
            amount: variety.sizes[size],
          });
        }
      }
    } else {
      varieties.push({
        color,
        images: imgs,
        amount: variety.quantity,
        size: null,
      });
    }
  });

  const readyProduct = {
    name: product.name,
    type: product.type,
    description: product.description,
    price: product.price,
    varieties,
  };

  const res = await request(fetch, '/products', 'POST', readyProduct);
  if (res) {
    clearAll();
    goto('/store');
  }
};
