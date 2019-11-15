import { writable } from 'svelte/store';
import orderOptions from '@/constants/projects/order';
import competencesOptions from '@/constants/projects/competences';

export const selectedOrder = writable(orderOptions[0]);

export function selectOrder(value) {
  selectedOrder.update(() => value);
}

const filtersDefaultState = {
  competences: competencesOptions,
  spots: 1,
  date: {},
  search: '',
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

export function changeSpots(value) {
  changeFilter('spots', Math.max(value, 1));
}

export function changeCompetences(value) {
  changeFilter('competences', value);
}

export function changeDate(value) {
  changeFilter('date', value);
}

