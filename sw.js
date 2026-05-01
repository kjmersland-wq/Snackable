const CACHE_VERSION = 'snackable-v3';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const IMAGE_CACHE   = `${CACHE_VERSION}-images`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

/* Assets to pre-cache on install */
const PRECACHE_ASSETS = [
  './index.html',
  './features.html',
  './vitenskap.html',
  './priser.html',
  './kontakt.html',
  './404.html',
  './styles.css',
  './manifest.json',
  './og-image.svg',
  './en/index.html',
  './en/features.html',
  './en/science.html',
  './en/pricing.html',
  './en/contact.html'
];

/* ── INSTALL: pre-cache static assets ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: purge old caches ── */
self.addEventListener('activate', e => {
  const validCaches = [STATIC_CACHE, IMAGE_CACHE, RUNTIME_CACHE];
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => !validCaches.includes(k))
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', e => {
  const { request } = e;

  /* Only handle GET requests */
  if (request.method !== 'GET') return;

  /* Never intercept FormSubmit or Stripe */
  if (
    request.url.includes('formsubmit.co') ||
    request.url.includes('stripe.com') ||
    request.url.includes('js.stripe.com')
  ) return;

  /* HTML pages: Network-First (freshness matters) */
  if (request.destination === 'document' || request.url.endsWith('.html')) {
    e.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./404.html')))
    );
    return;
  }

  /* CSS / JS / manifest: Cache-First with background revalidation (Stale-While-Revalidate) */
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.url.endsWith('.css') ||
    request.url.endsWith('.js') ||
    request.url.endsWith('.json')
  ) {
    e.respondWith(
      caches.open(STATIC_CACHE).then(async cache => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then(response => {
          cache.put(request, response.clone());
          return response;
        }).catch(() => null);
        return cached || networkFetch;
      })
    );
    return;
  }

  /* Images / SVGs: Cache-First */
  if (
    request.destination === 'image' ||
    request.url.endsWith('.svg') ||
    request.url.endsWith('.png') ||
    request.url.endsWith('.jpg') ||
    request.url.endsWith('.webp') ||
    request.url.endsWith('.avif')
  ) {
    e.respondWith(
      caches.open(IMAGE_CACHE).then(async cache => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request).catch(() => null);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  /* Other requests: Network-First with runtime cache fallback */
  e.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok && request.url.startsWith('https://kjmersland-wq.github.io/Snackable/')) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
