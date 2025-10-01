const CACHE_NAME = "meu-pwa-poke-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icons/pokeball-192.png",
  "/icons/pokeball-512.png"
];

// Instala o service worker e adiciona arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Ativa o SW
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercepta requisições e responde com cache quando offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
