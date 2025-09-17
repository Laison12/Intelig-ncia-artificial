const CACHE_NAME = 'dodge-bc-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './sw.js',
  './cubo192.png',
  './cubo512.png'
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Intercepta requisições e responde do cache ou faz fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
