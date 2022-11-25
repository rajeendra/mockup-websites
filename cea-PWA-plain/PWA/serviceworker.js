const CACHE_NAME = "verson-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;
// We need to wright Events for three differnt things 

// install SW
self.addEventListener('install', (event) => {
    // open the cache and add file names to the cache
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opend cache');

            return cache.addAll(urlsToCache);
        })
    )
});

// Listen for requests
// feth - type of request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map( (cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});

