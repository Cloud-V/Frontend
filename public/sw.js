const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

const PRECACHE_URLS = [];

self.addEventListener("install", (event) => {
    // console.log('[ServiceWorker] Installed');
    return;
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});
// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
    // console.log('[ServiceWorker] Activated');
    return;
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter(
                    (cacheName) => !currentCaches.includes(cacheName)
                );
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    return;
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then((cache) => {
                    return fetch(event.request).then((response) => {
                        // Put a copy of the response in the runtime cache.
                        return cache
                            .put(event.request, response.clone())
                            .then(() => {
                                return response;
                            });
                    });
                });
            })
        );
    }
});
self.addEventListener("push", (event) => {
    console.log("Push message", event);
    let title = "Cloud V",
        body = event.data.text();
    try {
        const msg = JSON.parse(event.data.text());
        title = msg.title || title;
        body = msg.body || body;
    } catch (err) {}
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: "/assets/img/sygnet96.png",
            tag: "noty",
        })
    );
});
