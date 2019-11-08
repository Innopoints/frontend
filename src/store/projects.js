import { writable } from 'svelte/store';
import orderOptions from '@/constants/projects/order';
import competencesOptions from '@/constants/projects/competences';

export const selectedOrder = writable(orderOptions[0]);
export const selectedCompetences = writable(competencesOptions);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

export function selectCompetences(value) {
  selectedCompetences.update(() => value);
}
