const CACHE_NAME = "nagono-cache-v20";

const urlsToCache = [
  "/saloon/",
  "/saloon/index.html",
  "/saloon/index.css",
  "/saloon/style.css",
  "/saloon/age.html",
  "/saloon/drink.html",
  "/saloon/kanmi.html",
  "/saloon/oden.html",
  "/saloon/yaki.html",
  "/saloon/icon-192.png",
  "/saloon/icon-512.png",
  
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

