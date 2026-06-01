const CACHE_NAME = "vinde-a-mim-v2";

const urlsToCache = [
"./",
"./index.html",

"./1.html",
"./2.html",
"./3.html",
"./4.html",
"./5.html",
"./autor.html",

"./img-1.png",
"./img-2.png",
"./img-3.png",
"./img-4.png",
"./img-5.png",
"./img-6.png",

"./autor.png",

"./logo-192.png",
"./logo-512.png",

"./manifest.json"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
.then(() => self.skipWaiting())
);
});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys => {
return Promise.all(
keys.map(key => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
);
}).then(() => self.clients.claim())
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
.catch(() => caches.match("./index.html"))
);
});