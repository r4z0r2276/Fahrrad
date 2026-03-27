const CACHE_NAME = 'larsi-erp-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Network First strategy for dynamic routes (admin, chat, etc.)
// Cache First only for manifest and icons
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});
