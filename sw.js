const CACHE_NAME = 'yclock-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate strategy for most requests
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Check if valid response
          if (networkResponse && networkResponse.status === 200) {
              // Cache valid responses for future use
              // (Note: clone is necessary as response stream can only be consumed once)
              cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
             // Fallback logic could go here
        });
        
        // Return cached response immediately if available, otherwise wait for network
        return response || fetchPromise;
      });
    })
  );
});