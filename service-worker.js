const CACHE_NAME = 'energold-github-pwa-v11';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/login.css',
  './css/responsive.css',
  './js/config.js',
  './js/storage.js',
  './js/login.js',
  './js/cadastros.js',
  './js/sync.js',
  './js/ui.js',
  './js/app.js',
  './assets/logo.png',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // ✅ FIX: Deixa TODAS as requisições não-GET passarem direto para a rede
  // (antes o `return` sem respondWith causava cancelamento silencioso do POST)
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Não cachear Apps Script / API — vai direto para a rede
  if (
    url.hostname.includes('script.google.com') ||
    url.hostname.includes('googleusercontent.com')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Arquivos locais: cache first, fallback para rede
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
