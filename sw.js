// The web build's service worker (see vite.config.ts), which makes it an installable PWA for the Microsoft Store.
// It caches the built game: pages come from the network first (so an update shows at once), and the
// build's own files from the cache. The build fills in the version and the file list.
const CACHE = 'random-tower-muthnf7x';
const FILES = ["./","./assets/Galmuri11-CKwGm43E.woff2","./assets/Galmuri11-Bold-Bp0lZJC8.woff2","./assets/Galmuri9-BNqqYFIV.woff2","./assets/achievement-DzIYfxmR.mp3","./assets/boss-kill-Cs0V4yLz.mp3","./assets/boss-warning-B_UrGjMB.mp3","./assets/defeat-Ca_tZgUC.mp3","./assets/phoenix-Cea7FRmA.mp3","./assets/skill-fire-legendary-CIE23NOr.mp3","./assets/skill-grass-legendary-Bhbz4ZCk.mp3","./assets/summon-unique-BJgx4YI7.mp3","./assets/summon-legendary-DiOMmae1.mp3","./assets/skill-water-legendary-DtwMnCS6.mp3","./assets/title-jzQ-WOWU.mp3","./assets/reward-open-CDXS7GHZ.mp3","./assets/victory-CD9kQTKF.mp3","./assets/title-bg-DpO0r8XI.png","./assets/ending-Zk09UiYz.mp3","./assets/boss-ZtQCtJhU.mp3","./assets/battle-BDDs6DgU.mp3","./assets/capybara-win-0-BxJlL8IX.png","./assets/capybara-lose-1-GmsNjhAc.png","./assets/capybara-lose-2-qPSqhNd-.png","./assets/capybara-lose-3-CcDxLcc8.png","./assets/capybara-lose-4-BMLDZ0Lj.png","./assets/capybara-lose-5-C5dRNg9z.png","./assets/capybara-lose-6-DCioT3AW.png","./assets/capybara-lose-8-cFUnrMmg.png","./assets/capybara-win-1-C_cWrxed.png","./assets/capybara-win-2-BfPtRVDk.png","./assets/capybara-win-3-Ckj2cM9l.png","./assets/capybara-win-5-BFqrldUV.png","./assets/capybara-win-4-CIHgQwch.png","./assets/capybara-win-6-CvJH1FhF.png","./assets/capybara-win-8-Qhs2vAYO.png","./assets/capybara-win-7-CcNClYUe.png","./assets/capybara-lose-7-CQbsyZ8e.png","./assets/penguin-lose-2-B3-SFq2y.png","./assets/penguin-lose-3-jMGNPM7R.png","./assets/penguin-lose-4-Cat81Fid.png","./assets/penguin-lose-5-BRef4Gek.png","./assets/penguin-lose-7-DqrviRRy.png","./assets/penguin-lose-6-CcYa8Gdt.png","./assets/penguin-win-0-5SdYnpMg.png","./assets/penguin-lose-8-K8OubEZY.png","./assets/penguin-win-1-lwPBbzN0.png","./assets/penguin-win-3-DvgBh9nE.png","./assets/penguin-win-5-DkQ5szL8.png","./assets/penguin-win-4-Dxqd3vEf.png","./assets/penguin-win-6-VeuvqpEU.png","./assets/penguin-win-8-DcRkCD2t.png","./assets/penguin-win-7-CvHowOiF.png","./assets/redpanda-win-0-DR6Qe33w.png","./assets/redpanda-lose-1-DFmaRIsW.png","./assets/redpanda-lose-2-eJwlRdum.png","./assets/redpanda-lose-3-d2ZRZYVl.png","./assets/redpanda-lose-5-qHgvVqb-.png","./assets/redpanda-lose-6-48cdMoxS.png","./assets/redpanda-lose-7-CjuGthNN.png","./assets/penguin-lose-1-DNdZEF4o.png","./assets/redpanda-lose-8-CfN2pxAj.png","./assets/redpanda-win-1-wUzIcPjE.png","./assets/redpanda-win-2-BHxanoRk.png","./assets/redpanda-win-4-rxhMexPi.png","./assets/redpanda-win-3-DcrjV6B1.png","./assets/redpanda-win-5-B60fdi0V.png","./assets/redpanda-win-6-DzjooUvi.png","./assets/redpanda-win-7-CjLyFNsq.png","./assets/penguin-win-2-CXZEqavx.png","./assets/redpanda-lose-4-CP99VshK.png","./assets/redpanda-win-8-DjuGTciU.png","./assets/artifacts-DFvJPy3B.png","./assets/b05-CL1q1Po3.png","./assets/b10-yhzFrvT2.png","./assets/b15-VOBbJ2N2.png","./assets/b20-BwtPsZs3.png","./assets/b35-D_Ml-kTU.png","./assets/b25-DbpVxb5O.png","./assets/b40-DPqyDPWD.png","./assets/b45-BpTI3Yoz.png","./assets/portal-CcVCBUII.png","./assets/fire-legendary-B8eZqgg2.png","./assets/index-DszaDS43.css","./assets/index-D7V8xb1t.js","./assets/web-CvQni8cR.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./privacy.html"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./')));
    return;
  }
  event.respondWith(caches.match(event.request).then((hit) => hit ?? fetch(event.request)));
});
