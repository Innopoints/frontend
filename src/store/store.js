import { writable } from 'svelte/store';
import orderOptions from '@/constants/store/order-options';
import colorOptions from '@/constants/store/colors';

export const selectedOrder = writable(orderOptions[0]);
export const selectedColors = writable(colorOptions);
export const isColorless = writable(true);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

export function selectColors(value) {
  selectedColors.update(() => value);
}

export function changeColorless() {
  isColorless.update((val) => !val);
}
