import { writable } from 'svelte/store';
import request from '@/utils/request';
import { goto } from '@sapper/app';

export const isAuthed = writable(false);
const userTemplate = {
  balance: 0,
  is_admin: true,
  full_name: '',
  telegram_username: '',
  email: '',
};
export const user = writable(userTemplate);

export const changeUserField = (field, value) => {
  user.update(usr => ({ ...usr, [field]: value }));
};

export const changeUser = (value) => {
  user.update(() => value);
  isAuthed.update(() => !!value.email);
};

export const signOut = async () => {
  if (!(await request(fetch, 'logout'))) return;

  user.update(() => userTemplate);
  isAuthed.update(() => false);
  goto('/');
};
