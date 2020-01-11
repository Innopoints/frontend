import { writable } from 'svelte/store';

export const open = writable(false);

export function openSnackbar() {
  open.update(() => true);
}

export function closeSnackbar() {
  open.update(() => false);
}
