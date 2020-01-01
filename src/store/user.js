import { writable } from 'svelte/store';

export const isAuthed = writable(false);
export const user = writable({
  balance: 1488,
  is_admin: true,
  full_name: '',
  telegram_username: '',
  email: '',
});

export const changeUserField = (field, value) => {
  user.update(usr => ({ ...usr, [field]: value }));
};

export const changeUser = (value) => {
  user.update(() => value);
  isAuthed.update(() => !!value.email);
};

export const logIn = () => {
  isAuthed.update(us => true);
};
