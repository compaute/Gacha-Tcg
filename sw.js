// Service worker de Poké Gacha TCG : l'appli (HTML, icônes) démarre sans réseau.
// Les appels à l'API TCGdex et les images ne passent PAS par ici (le jeu gère son propre stockage des données).
// Pour forcer une mise à jour chez tout le monde après une modification, change le numéro de version ci-dessous.
const V='pokegacha-v100';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;      // API et images : le navigateur s'en charge
 e.respondWith((async()=>{
  const c=await caches.open(V);
  const hit=(await c.match(r,{ignoreSearch:true}))||(r.mode==='navigate'?await c.match('./index.html'):null);
  // on répond tout de suite avec la version enregistrée et on la met à jour en arrière-plan
  const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}
  return (await net)||new Response('Hors ligne : ouvre l\'appli une première fois avec du réseau.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
 })());
});
