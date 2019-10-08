import { writable } from 'svelte/store';

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

export const item = writable({
  name: '',
  type: '',
  description: '',
  price: 0,
  inSizes: false,
  quantity: 0,
  varieties: [newVariety()],
  varietiesCount: 1,
});

export function changeItemField(field, value) {
  item.update(itm => ({ ...itm, [field]: value }));
}

export function toggleSizes() {
  item.update(itm => ({ ...itm, inSizes: !itm.inSizes }));
}
