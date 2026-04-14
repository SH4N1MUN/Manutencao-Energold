/* ════════════════════════════════════════════════════
   SERVICE WORKER — ENERGOLD v12
   Estratégia: Cache First para assets estáticos,
   Network First para navegação, bypass total para API.

   Mudanças em relação à v11:
   ─ Versão incrementada para forçar atualização
   ─ Estratégia stale-while-revalidate para melhor UX
   ─ Notifica os clientes quando nova versão está disponível
   ─ Separa caches de assets e de páginas
   ─ Evita cache de rotas não encontradas (404)
════════════════════════════════════════════════════ */

const APP_VERSION    = 'v12';
const CACHE_STATIC   = `energold-static-${APP_VERSION}`;
const CACHE_PAGES    = `energold-pages-${APP_VERSION}`;

/* Lista de arquivos essenciais (shell do app) */
const STATIC_ASSETS = [
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

/* Domínios que NUNCA devem ser cacheados (API externa) */
const API_DOMAINS = [
  'script.google.com',
  'googleusercontent.com',
  'googleapis.com'
];

/* ── INSTALL ────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => {
        console.log(`[SW] Cache ${CACHE_STATIC} criado.`);
        /* Ativa imediatamente sem esperar fechar todas as abas */
        return self.skipWaiting();
      })
      .catch(err => console.error('[SW] Falha no install:', err))
  );
});

/* ── ACTIVATE ───────────────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_STATIC && key !== CACHE_PAGES)
          .map(key => {
            console.log(`[SW] Removendo cache antigo: ${key}`);
            return caches.delete(key);
          })
      ))
      .then(() => {
        /* Toma controle de todas as abas abertas */
        return self.clients.claim();
      })
      .then(() => {
        /* Notifica todos os clientes que há nova versão */
        return self.clients.matchAll({ type: 'window' });
      })
      .then(clients => {
        clients.forEach(client =>
          client.postMessage({ type: 'SW_UPDATED', version: APP_VERSION })
        );
      })
  );
});

/* ── FETCH ──────────────────────────────────────── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* 1. Métodos não-GET vão direto para a rede */
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  /* 2. Requisições para a API (Apps Script) — sempre rede */
  if (API_DOMAINS.some(domain => url.hostname.includes(domain))) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'offline', offline: true }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  /* 3. Navegação (document) — Network First com fallback para cache */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResp => {
          /* Armazena cópia no cache de páginas */
          if (networkResp && networkResp.status === 200) {
            const clone = networkResp.clone();
            caches.open(CACHE_PAGES).then(c => c.put(request, clone));
          }
          return networkResp;
        })
        .catch(() =>
          /* Offline: serve o index.html do cache */
          caches.match('./index.html').then(cached =>
            cached || new Response('<h1>Offline</h1>', {
              headers: { 'Content-Type': 'text/html' }
            })
          )
        )
    );
    return;
  }

  /* 4. Assets estáticos — Cache First (stale-while-revalidate) */
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request)
        .then(networkResp => {
          /* Atualiza o cache silenciosamente se o recurso mudou */
          if (networkResp && networkResp.status === 200) {
            const clone = networkResp.clone();
            caches.open(CACHE_STATIC).then(c => c.put(request, clone));
          }
          return networkResp;
        })
        .catch(() => cached); /* Sem rede: retorna cache mesmo sendo antigo */

      /* Retorna o cache imediatamente (se existir), busca em paralelo */
      return cached || networkFetch;
    })
  );
});

/* ── MESSAGE — ouve pedido de skipWaiting manual ── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
