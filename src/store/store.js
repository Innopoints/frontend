import { writable, get } from 'svelte/store';
import orderOptions from '@/constants/store/order';
import colorOptions from '@/constants/store/colors';

export const selectedOrder = writable(orderOptions[0]);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

export const filters = writable({
  colors: colorOptions,
  isColorless: true,
  search: '',
  priceLow: null,
  priceHigh: null,
});

function changeFilter(name, value) {
  filters.update((state) => ({...state, [name]: value}));
}

export function changeSearch(value) {
  changeFilter('search', value);
}

export function changeColors(value) {
  changeFilter('colors', value);
}

export function changeIsColorless() {
  let {isColorless} = get(filters);
  changeFilter('isColorless', !isColorless);
}

export function changePrice(value, isHigh = false) {
  let {priceLow} = get(filters);

  if (isHigh) {
    if (parseInt(value) > priceLow) {
      changeFilter('priceHigh', parseInt(value));
    }
  } else {
    if (parseInt(value) >= 0) changeFilter('priceLow', parseInt(value));
    else changeFilter('priceLow', 0);
  }
}
