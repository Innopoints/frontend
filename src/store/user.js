import { writable } from 'svelte/store';
import request from '@/utils/request';
import generateQueryString from '@/utils/generate-query-string.js';
import { goto } from '@sapper/app';
import { AUTH_HOST, FRONTEND_BASE } from '@/constants/env';

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

export const login = () => {
  window.location.href = AUTH_HOST + '/login' + generateQueryString(new Map([
    ['final_redirect_location', window.location.pathname],
    ['frontend_base', FRONTEND_BASE],
  ]));
};

export const changeTelegram = (value) => {
  // TODO: place a request(fetch, 'account', 'PUT', {telegram_username: value}) function when backend will implement it
  changeUserField('telegram_username', value);
};

export const changeUser = (value) => {
  user.update(() => value);
  isAuthed.update(() => !!(value && value.email));
};

export const signOut = async () => {
  if (!(await request(fetch, '/logout'))) return;

  user.update(() => userTemplate);
  isAuthed.update(() => false);
  goto('/');
};
