const CACHE_NAME = 'FootballFromHome-v1';
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/clubs.html",
    "/pages/schedule.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/css/main.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/appetizers.webp",
    "/img/appetizers2.webp",
    "/img/appetizers3.webp",
    "/img/mainDish.webp",
    "/img/dish2.webp",
    "/img/dish3.webp",
    "/img/dessert.webp",
    "/img/dessert2.webp",
    "/img/dessert3.webp",
    "/img/kitchen.webp",
    "/img/icon-72.png",
    "/img/icon-96.png",
    "/img/icon-128.png",
    "/img/icon-144.png",
    "/img/icon-192.png",
    "/img/icon-512.png",
    "/manifest.json",
    "/register.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});