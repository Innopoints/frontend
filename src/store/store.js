import { writable, get } from 'svelte/store';
import orderOptions from '@/constants/store/order';
import colorOptions from '@/constants/store/colors';

export const selectedOrder = writable(orderOptions[0]);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

const filtersDefaultState = {
  colors: colorOptions,
  isColorless: true,
  search: '',
  priceLow: null,
  priceHigh: null,
  isEmpty: true,
};

export const filters = writable(filtersDefaultState);

function changeFilter(name, value) {
  filters.update((state) => ({...state, [name]: value, isEmpty: false}));
}

export function clearAllFilters() {
  filters.update(() => filtersDefaultState);
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

export function changeLowPrice(value) {
  changeFilter('priceLow', Math.max(parseInt(value), 0));
}

export function changeHighPrice(value) {
  let {priceLow} = get(filters);
  if (parseInt(value) > priceLow) {
    changeFilter('priceHigh', parseInt(value));
  }
}
