const CACHE_NAME = "nagono-cache-v19";

const urlsToCache = [
  "/saloon/",
  "/saloon/index.html",
  "/saloon/index.css",
  "/saloon/images/",
  "/saloon/images/otosi.jpg",
  "/saloon/images/uzura.jpg",
  "/saloon/images/ankimo.jpg",
  "/saloon/images/ikakimo.jpg",
  "/saloon/images/chamame.jpg",
  "/saloon/images/sunagimo.jpg",
  "/saloon//images/kyouage-mentai.jpg",  
  "/saloon/images/aburi-ika.jpg",
  "/saloon/images/cream-cheese-saikyo.jpg",
  "/saloon/images/dashimaki.jpg",
  "/saloon/images/matcha_ice.jpg",
  "/saloon/images/kushikatsu.jpg" ,
  "/saloon/images/satoimo_isobe.jpg",
  "/saloon/images/karaage.jpg",
  "/saloon/images/tai_meshi.jpg",
  "/saloon/images/chicken_sansho.jpg",
  "/saloon/images/kyuri_salad.jpg",
  "/saloon/images/yuba_salad.jpg",
  "/saloon/images/harutamanegi.jpg",
  "/saloon/images/kaki.jpg",
  "/saloon/images/satoimo.jpg",
  "/saloon/images/lettuce.jpg",
  "/saloon/images/broccoli.jpg",
  "/saloon/images/kyomizuna.jpg",
  "/saloon/images/yakiniku-nasu.jpg",
  "/saloon/images/akashiyaki.jpg",
  "/saloon/images/tomato.jpg",
  "/saloon/images/tofu.jpg",
  "/saloon/images/gyusuji.jpg",
  "/saloon/images/kakuni.jpg",
  "/saloon/images/horumon.jpg",
  "/saloon/images/sakuraebi_takikomi.jpg",
  "/saloon/images/tofu_mentai_salad.jpg",
  "/saloon/images/cream-cheese-shiraae.jpg",
  "/saloon/images/yakumi-tofu.jpg",
  "/saloon/images/tsukimi.jpg",
  "/saloon/images/namafu_dengaku.jpg",
  "/saloon/images/onion_miso.jpg",
  "/saloon/images/saba_mentai.jpg",
  "/saloon/images/potato_fry.jpg",
  "/saloon/images/banana_toron.jpg",
  "/saloon/images/gyoza.jpg",
  "/saloon/images/wakame.jpg",
  "/saloon/images/warabi_mochi.jpg",
  "/saloon/images/butashabu.jpg",
  "/saloon/images/zaru_soba.jpg",
  "/saloon/images/tezukuri-tofu.jpg",
  "/saloon/images/nanohana.jpg",
  "/saloon/images/vanilla_monaka.jpg",
  "/saloon/images/oroshi_soba.jpg",

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

