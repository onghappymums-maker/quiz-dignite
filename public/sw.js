const CACHE = "quiz-dignite-v11";

// Fichiers essentiels à mettre en cache pour le hors ligne
const ASSETS = [
  "/",
  "/index.html",
  "/og-image.png",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json"
];

// ── INSTALLATION ────────────────────────────────────────────────
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATION ──────────────────────────────────────────────────
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH — Hors ligne d'abord pour l'app, réseau d'abord pour le reste ──
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Ignore les requêtes non-GET et les extensions externes
  if (e.request.method !== "GET") return;
  if (!url.origin.includes("quizdignite.org") && !url.origin.includes("localhost")) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      // Stratégie : réseau d'abord, cache en fallback
      return fetch(e.request)
        .then(resp => {
          if (!resp || resp.status !== 200 || resp.type !== "basic") return resp;
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return resp;
        })
        .catch(() => cached || caches.match("/index.html"));
    })
  );
});

// ── NOTIFICATIONS PUSH ──────────────────────────────────────────
self.addEventListener("push", e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || "Quiz Dignité";
  const options = {
    body: data.body || "🌸 Bonsoir ! Ton défi du jour t'attend sur Quiz Dignité.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    tag: "defi-du-jour",
    renotify: true,
    actions: [
      { action: "open", title: "Voir mon défi 🌸" },
      { action: "dismiss", title: "Plus tard" }
    ],
    data: { url: "/" }
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// ── CLIC SUR NOTIFICATION ───────────────────────────────────────
self.addEventListener("notificationclick", e => {
  e.notification.close();
  if (e.action === "dismiss") return;
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(list => {
        for (const client of list) {
          if (client.url.includes("quizdignite.org") && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
  );
});

// ── PROGRAMMATION LOCALE 18H ────────────────────────────────────
// Quand l'app s'active, on programme un check toutes les heures
self.addEventListener("message", e => {
  if (e.data && e.data.type === "SCHEDULE_NOTIF") {
    scheduleDefiNotif();
  }
});

function scheduleDefiNotif() {
  const now = new Date();
  // Heure d'Abidjan = UTC+0 (GMT)
  const target = new Date();
  target.setUTCHours(18, 0, 0, 0);

  // Si 18h est déjà passé aujourd'hui, on programme pour demain
  if (now >= target) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  setTimeout(() => {
    self.registration.showNotification("Quiz Dignité", {
      body: "🌸 Bonsoir ! Ton défi du jour t'attend sur Quiz Dignité.",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "defi-du-jour",
      renotify: true,
      data: { url: "/" }
    });
    // Reprogramme pour le lendemain
    scheduleDefiNotif();
  }, delay);
}
