const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/script.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-pwa-cache').then(cache => {
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn(`Failed to cache ${url}: ${err}`);
                        return null;
                    });
                })
            );
        })
    );
});
