import * as api from './api.js';
import { VAPID_PUBLIC_KEY } from 'src/constants/env.js';


// Source: https://github.com/web-push-libs/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default async function subscribe(csrfToken) {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();
  if (registration == null) {
    return;
  }

  const pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  console.log('Received notification subscription:', pushSubscription);
  const response = await api.post('/notifications/subscribe', {
    data: pushSubscription.toJSON(),
    csrfToken,
  });

  if (!response.ok) {
    throw {
      subscription: pushSubscription,
      response: await response.json(),
    };
  }
}
