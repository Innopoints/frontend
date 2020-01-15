import { AUTH_HOST, FRONTEND_BASE, USER_EMAIL, ENV } from '@/constants/env.js';
import generateQueryString from '@/utils/generate-query-string.js';
import * as api from '@/utils/api.js';
import { goto } from '@sapper/app';


function loginOAuth() {
  window.location.href = AUTH_HOST + '/login?' + generateQueryString(new Map([
    ['final_redirect_location', window.location.pathname],
    ['frontend_base', FRONTEND_BASE],
  ]));
}

function loginCheat() {
  window.location.href = `${AUTH_HOST}/login_cheat/${USER_EMAIL}?` + generateQueryString(new Map([
    ['final_redirect_location', window.location.pathname],
    ['frontend_base', FRONTEND_BASE],
  ]));
}

export const login = (ENV === 'development' ? loginCheat : loginOAuth);

export async function logout(session) {
  try {
    await api.get('/logout');
    // It's not what it looks like, `session` will actually be `$session` on calls
    session = null;
    goto('/');
  } catch (e) {
    console.error(e);
  }
}
