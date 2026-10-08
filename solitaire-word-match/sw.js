/* Minimal service worker for Solitaire Word Match.
   Exists so the page meets Chrome's installability criteria
   (registered worker with a fetch handler). Pass-through: network
   first, no caching tricks, so gameplay is untouched. */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request));
});
