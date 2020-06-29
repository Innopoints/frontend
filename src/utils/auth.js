import { AUTH_HOST, USER_EMAIL } from 'src/constants/env.js';
import generateQueryString from 'src/utils/generate-query-string.js';
import { goto, stores } from '@sapper/app';


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

export async function logout() {
  const { session } = stores();
  try {
    await fetch(AUTH_HOST + '/logout');
    session.set({ cookies: null });
    goto('/');
  } catch (e) {
    console.error(e);
  }
}
