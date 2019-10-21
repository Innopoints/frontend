import { writable } from 'svelte/store';
import orderOptions from '@/constants/store/order-options';

export const orders = writable(orderOptions);
export const selectedOrder = writable(orderOptions[0]);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}
