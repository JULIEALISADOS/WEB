const CACHE_NAME = 'julie-ficha-v8.0';
const ASSETS = [
  'index.html',
  'style.css?v=8.0',
  'js/config.js', 'js/db.js', 'js/ui.js', 'js/signature.js', 'js/pdf.js', 'js/app.js?v=8.0',
  'manifest.json',
  'logo.png',
  'guia_cabello_tecnico_completa_julie_es_1774539016850.png',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Instalacion: Guardar archivos en el cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Cacheando archivos V5.3...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activacion: Borrar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Borrando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Network First (Red primero, si no hay internet usar cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});