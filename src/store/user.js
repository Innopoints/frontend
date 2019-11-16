import { writable } from 'svelte/store';

// TODO: persist the state with some lib

export const isAuthed = writable(false);
export const user = writable({
  id: 1,
  balance: 1488,
  hours: 111,
  rating: 3.8,
  isAdmin: true,
  name: 'Zeus',
  surname: 'Rozhdestvenskiy',
  telegram: '',
});

export function changeUserField(field, value) {
  user.update(usr => ({ ...usr, [field]: value }));
}

export function logIn() {
  isAuthed.update(us => true);
}
