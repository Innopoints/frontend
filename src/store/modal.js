import { writable } from 'svelte/store';

export const open = writable(false);

export function openModal() {
  open.update(() => true);
}

export function closeModal() {
  open.update(() => false);
}
