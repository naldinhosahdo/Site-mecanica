// =========================================
// SERVICE WORKER DO MECÂNICAPRO
// Guarda o site no celular para abrir rápido e funcionar sem internet.
//
// Regra de ouro das versões: todo arquivo que muda é pedido com ?v=N.
// Por isso o arquivo com ?v= pode ser guardado pelo endereço exato —
// quando a versão sobe, o endereço muda, dá "não tenho" e vem da rede.
// Já o HTML não tem ?v=, então ele sempre tenta a rede primeiro.
// =========================================
const CACHE = 'mecanicapro-v4';

// o essencial para a primeira tela abrir offline
const ESSENCIAL = [
  './',
  './index.html',
  './montagem.html',
  './mapa-mental.html',
  './manifest.json',
  './icones/icone-192.png',
  './icones/icone-512.png',
  './vendor/three.module.min.js',
  './vendor/three.core.min.js',
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ESSENCIAL))
      // se um arquivo falhar, não derruba a instalação inteira
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'atualizar-agora') self.skipWaiting();
});

self.addEventListener('fetch', evento => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // fontes do Google etc. ficam com o navegador

  // páginas: rede primeiro, para a pessoa sempre pegar a versão nova
  if (req.mode === 'navigate') {
    evento.respondWith(
      fetch(req)
        .then(res => {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
          return res;
        })
        // sem rede: a página do motor vem com ?arq=... na URL, e esse endereço
        // exato nunca foi guardado. ignoreSearch casa com a página guardada.
        .catch(() => caches.match(req, { ignoreSearch: true })
                       .then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // demais arquivos: cache primeiro (é o que deixa rápido e offline)
  evento.respondWith(
    caches.match(req).then(guardado => {
      if (guardado) return guardado;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return res;
      });
    })
  );
});
