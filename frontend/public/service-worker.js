// Basis service worker voor PWA-installeerbaarheid.
// Cachet alleen de app-shell (index.html) zodat de app een keer offline te openen is.
// Wordt later uitgebreid met echte offline-strategie zodra er meer statische assets zijn.
const CACHE_NAME = 'marktly-shell-v1'
const APP_SHELL = ['/']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match('/'))
      )
    }),
  )
})
