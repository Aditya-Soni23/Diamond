const CACHE_NAME = 'diamond-v2026-07-24';

const APP_SHELL = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'cursor.js',
  'manifest.json',
  'assets/applogo.png',
  'assets/DiamondLogo.png',
  'products/products.css',
  'products/products.js',
  'industries/industries.css',
  'industries/industries.js'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests from this origin
  if (
    request.method !== 'GET' ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  // Never cache videos (avoids 206 Partial Content errors)
  if (
    request.destination === 'video' ||
    request.url.endsWith('.mp4')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() =>
          caches.match(request).then((response) => {
            return response || caches.match('index.html');
          })
        )
    );
    return;
  }

  // Cache First, then Network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Cache only successful full responses
          if (
            networkResponse.ok &&
            networkResponse.status === 200
          ) {
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() => caches.match(request));
    })
  );
});
