export const API_HOST = process.browser ? process.env.SAPPER_APP_API_HOST_BROWSER : process.env.SAPPER_APP_API_HOST;
export const AUTH_HOST = process.env.SAPPER_APP_AUTH_HOST;
export const FRONTEND_BASE = process.env.SAPPER_APP_FRONTEND_BASE;
export const ENV = process.env.SAPPER_APP_ENVIRONMENT;
export const USER_EMAIL = process.env.SAPPER_APP_USER_EMAIL || '';
