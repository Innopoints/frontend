import * as api from './api.js';

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

let unsub; 

export default async function subscribe() {
  if (!('serviceWorker' in navigator)) {
    return;
  }
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration == undefined) {
    return;
  }
  // TODO: move the following code to service worker
  const pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BLHdmxCmBlgSj8NHRwRs7IqWD1ucN_aZuk2aEdFGjGLDAreYnlNUi-MGxuMvvdrYKSLNESQHN5dxo2isFxfdfp4'),
  });
  console.log('Received notification subscription:', pushSubscription);
  unsub = pushSubscription.unsubscribe.bind(pushSubscription);
  await api.post('/notifications/subscribe', {
    data: pushSubscription.toJSON(),
  });
}

export function unsubscribe() {
  if (!unsub) {
    console.error('No subscription to remove');
    return;
  }
  unsub();
}
