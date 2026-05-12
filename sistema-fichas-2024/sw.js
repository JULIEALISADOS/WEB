const CACHE_NAME = 'julie-app-v8.1';
const ASSETS = [
  'index.html',
  'style.css?v=8.1',
  'js/config.js', 'js/db.js', 'js/ui.js', 'js/signature.js', 'js/pdf.js', 'js/app.js?v=8.1',
  'manifest.json',
  'logo.png',
  'guia_cabello_tecnico_completa_julie_es_1774539016850.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&family=Outfit:wght@300;400;600;700&display=swap',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forzar activación inmediata
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Tomar control de los clientes inmediatamente
      caches.keys().then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
    ])
  );
});

self.addEventListener('fetch', event => {
  // Para páginas HTML, JS y CSS, intentar red primero
  if (event.request.mode === 'navigate' || event.request.destination === 'style' || event.request.destination === 'script') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  // Para el resto (imágenes, etc), Cache First
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});