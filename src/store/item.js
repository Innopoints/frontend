import { writable } from 'svelte/store';
import colorOptions from '@/constants/item/colors';

export const colors = writable(colorOptions);
export const customColors = writable({});
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
  quantity: 0,
  varieties: [newVariety()],
});

export const item = writable(newItem());

export function changeItemField(field, value) {
  item.update(itm => ({ ...itm, [field]: value }));
}

export function changeVarietyField(id, field, value) {
  item.update(itm => {
    let varieties = itm.varieties;
    varieties[id][field] = value;
    return {...itm, varieties};
  });
}

export function changeVarietyQuantity(id, value) {
  item.update(itm => {
    let varieties = itm.varieties;
    varieties[id].quantity = value;
    return {...itm, varieties};
  });
}

export function changeVarietySize(id, size, value) {
  item.update(itm => {
    let varieties = itm.varieties;
    varieties[id].sizes[size] = value;
    return {...itm, varieties};
  });
}

export function toggleSizes() {
  item.update(itm => ({ ...itm, inSizes: !itm.inSizes }));
}

export function addVariety() {
  item.update(itm => ({ ...itm, varieties: [...itm.varieties, newVariety()] }));
}

export function removeVariety(index) {
  item.update(itm => ({ ...itm, varieties: itm.varieties.filter((x, i) => i !== index) }));
}

export function clearAll() {
  console.log(newItem());
  item.update(() => newItem());
}
