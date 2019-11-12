import { writable } from 'svelte/store';
import orderOptions from '@/constants/projects/order';
import competencesOptions from '@/constants/projects/competences';

export const filters = writable({
  competences: competencesOptions,
  spots: 1,
  date: {},
  search: '',
});

export const selectedOrder = writable(orderOptions[0]);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

function changeFilter(name, value) {
  filters.update((state) => ({...state, [name]: value}));
}

export function changeSearch(value) {
  changeFilter('search', value);
}

export function changeSpots(value) {
  if (value > 0) changeFilter('spots', value);
  else changeFilter('spots', 1);
}

export function changeCompetences(value) {
  changeFilter('competences', value);
}

export function changeDate(value) {
  changeFilter('date', value);
}

