import { writable } from 'svelte/store';

export const step = writable(0);

export function changeStep(st) {
  step.update( () => st);
}
