const CACHE_NAME = 'julie-app-v7.5';
const ASSETS = [
  'index.html',
  'style.css?v=7.5',
  'js/config.js', 'js/db.js', 'js/ui.js', 'js/signature.js', 'js/pdf.js', 'js/app.js?v=7.5',
  'manifest.json',
  'logo.png',
  'guia_cabello_tecnico_completa_julie_es_1774539016850.png',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});