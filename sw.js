const CACHE_NAME = 'rm-calc-v1';
const ASSETS_TO_CACHE = [
    '/sk-calc/',
    '/sk-calc/index.html',
    '/sk-calc/manifest.json',
    '/sk-calc/icon.png',
    '/sk-calc/static/css/style.css',
    '/sk-calc/static/js/main.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
                    .then((response) => {
                        const responseClone = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseClone);
                            });

                        return response;
                    });
            })
            .catch(() => {
                return new Response('Offline - keine Internetverbindung verfügbar');
            })
    );
});