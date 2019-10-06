import { writable } from 'svelte/store';

const user = writable({
  isAuthed: false,
});

export default user;

export function logIn() {
  user.update(us => ({ ...us, isAuthed: true }));
}
