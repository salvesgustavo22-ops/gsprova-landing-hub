// Service Worker for caching static assets
const CACHE_NAME = 'gs-aprova-v1';
const STATIC_CACHE_TTL = 365 * 24 * 60 * 60 * 1000; // 1 year for static assets

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/src/index.css',
  '/assets/gs-aprova-logo.png',
  '/assets/hero-modern-bg.jpg',
  '/assets/hero-student-18yo.jpg',
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(request);

      // Determine cache strategy based on asset type
      if (isStaticAsset(request.url)) {
        // Static assets: Cache first, fallback to network
        if (cachedResponse) {
          // Check if cache is still valid
          const cacheTime = await getCacheTime(cache, request);
          if (cacheTime && Date.now() - cacheTime < STATIC_CACHE_TTL) {
            return cachedResponse;
          }
        }

        // Fetch from network and update cache
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            await setCacheTime(cache, request, Date.now());
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          // Return cached version if network fails
          return cachedResponse || new Response('Offline', { status: 503 });
        }
      } else {
        // HTML and dynamic content: Network first, fallback to cache
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse || new Response('Offline', { status: 503 });
        }
      }
    })
  );
});

// Helper functions
function isStaticAsset(url) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf|webp|avif)(\?.*)?$/i.test(url);
}

async function getCacheTime(cache, request) {
  const timeKey = `${request.url}:timestamp`;
  const timeResponse = await cache.match(timeKey);
  if (timeResponse) {
    return parseInt(await timeResponse.text());
  }
  return null;
}

async function setCacheTime(cache, request, time) {
  const timeKey = `${request.url}:timestamp`;
  cache.put(timeKey, new Response(time.toString()));
}
