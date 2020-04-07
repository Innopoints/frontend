import { AUTH_HOST, USER_EMAIL } from '@/constants/env.js';
import generateQueryString from '@/utils/generate-query-string.js';
import { goto } from '@sapper/app';


function loginOAuth() {
  window.location.href = AUTH_HOST + '/login?' + generateQueryString(new Map([
    ['final_redirect_location', '/profile'],
    ['frontend_base', window.location.origin],
  ]));
}

function loginCheat() {
  window.location.href = `${AUTH_HOST}/login_cheat/${USER_EMAIL}?` + generateQueryString(new Map([
    ['final_redirect_location', window.location.pathname],
    ['frontend_base', window.location.origin],
  ]));
}

export const login = (process.env.NODE_ENV === 'development' ? loginCheat : loginOAuth);

export async function logout(session) {
  try {
    await fetch(AUTH_HOST + '/logout');
    // It's not what it looks like, `session` will actually be `$session` on calls
    session = null;
    goto('/');
  } catch (e) {
    console.error(e);
  }
}
