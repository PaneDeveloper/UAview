// ─────────────────────────────────────────────────────────
// Service Worker — UA Viewer Pro
// Estratégia: cache básico do "app shell" (HTML, manifest, ícones).
// Recursos externos (Google Fonts, QR code lib, Wikipedia, CDN)
// sempre vão direto pra rede — não cacheamos, pois precisam
// estar atualizados / exigem internet (QR, links da Wikipedia).
// ─────────────────────────────────────────────────────────

const CACHE_NAME = 'ua-viewer-pro-v1';

// Arquivos do próprio app que podem ficar disponíveis offline
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

// Domínios externos que NUNCA devem ser cacheados (precisam de rede sempre)
const NETWORK_ONLY_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'translate.google.com',
  'wikipedia.org'
];

// ── INSTALL: guarda o app shell no cache ────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpa caches antigos de versões anteriores ────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estratégia básica (não agressiva) ────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Recursos externos (fontes, QR lib, GTTS, Wikipedia) → sempre rede,
  // nunca interceptamos nem cacheamos.
  const isNetworkOnly = NETWORK_ONLY_HOSTS.some((host) => url.hostname.includes(host));
  if (isNetworkOnly || url.origin !== self.location.origin) {
    return; // deixa o browser tratar normalmente
  }

  // Arquivos do próprio app: cache-first, com fallback de rede
  // e atualização do cache em segundo plano (stale-while-revalidate leve).
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => cached); // sem internet: usa o que tem em cache

      return cached || networkFetch;
    })
  );
});
