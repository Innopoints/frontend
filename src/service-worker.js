import { timestamp, files, shell /* routes */ } from '@sapper/service-worker';

const ASSETS = `cache${timestamp}`;

// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache = shell.concat(files);
const cached = new Set(to_cache);

self.addEventListener('install', event => {
  console.log('[Service Worker] installing');
  event.waitUntil(
    caches
      .open(ASSETS)
      .then(cache => cache.addAll(to_cache))
      .then(() => {
        self.skipWaiting();
      }),
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] activating');
  event.waitUntil(
    caches.keys().then(async keys => {
      // delete old caches
      for (const key of keys) {
        if (key !== ASSETS) await caches.delete(key);
      }

      self.clients.claim();
    }),
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

  const url = new URL(event.request.url);

  // don't try to handle e.g. data: URIs
  if (!url.protocol.startsWith('http')) return;

  // ignore dev server requests
  if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

  // always serve static files and bundler-generated assets from cache
  if (url.host === self.location.host && cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request));
    return;
  }

  // for pages, you might want to serve a shell `service-worker-index.html` file,
  // which Sapper has generated for you. It's not right for every
  // app, but if it's right for yours then uncomment this section
  /*
  if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
    event.respondWith(caches.match('/service-worker-index.html'));
    return;
  }
  */

  if (event.request.cache === 'only-if-cached') return;

  // for everything else, try the network first, falling back to
  // cache if the user is offline. (If the pages never change, you
  // might prefer a cache-first approach to a network-first one.)
  event.respondWith(
    caches
      .open(`offline${timestamp}`)
      .then(async cache => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch (err) {
          const response = await cache.match(event.request);
          if (response) return response;

          throw err;
        }
      }),
  );
});

self.addEventListener('push', event => {
  console.log('[Service Worker] received push notification:', event);
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    data,
    icon: '/favicon.png',
    badge: '/favicon.png',
  };
  if (data.image) {
    options.image = 'process.env.API_HOST_BROWSER' + data.image;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received:', event);
  event.notification.close();
  const href = event.notification.data.link;
  if (href) { 
    event.waitUntil(self.clients.openWindow(href));
  }
});

// TODO: check why the following event does not fire
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: "pushsubscriptionchange" event fired.');
  console.log(event);
  // TODO: Move the notification (un)subscription here
});
