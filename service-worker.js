const CACHE_NAME = 'english-words-v1.2';

const FILES_TO_CACHE = [
    '/',
    '/index.html',

    '/css/style.css',

    '/css/common/reset.css',
    '/css/common/layout.css',
    '/css/common/variables.css',
    '/css/common/typography.css',

    '/css/learning/cards.css',
    '/css/learning/choose-language.css',
    '/css/learning/units.css',

    '/js/index.js',
    '/js/cache.js',
    '/js/learning.js',
    '/js/state.js',
    '/js/supabase.js',
    '/js/libs/supabase.min.js',
    '/js/units.js',
    '/js/utils.js',
    '/js/ui/learning-ui.js'
];

self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();

});


self.addEventListener('activate', event => {

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


self.addEventListener('fetch', event => {

    // Працюємо тільки з GET-запитами
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // Не перехоплюємо запити до Supabase та інших зовнішніх сайтів
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        caches.match(event.request).then(async cachedResponse => {

            if (cachedResponse) {
                return cachedResponse;
            }

            try {

                const networkResponse = await fetch(event.request);

                const cache = await caches.open(CACHE_NAME);

                cache.put(event.request, networkResponse.clone());

                return networkResponse;

            } catch {

                // Якщо файл не знайдено в кеші і немає інтернету
                return new Response('Offline', {
                    status: 503,
                    statusText: 'Offline'
                });

            }

        })

    );

});