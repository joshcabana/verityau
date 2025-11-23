self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'You have a new message',
    icon: '/favicon.png',
    badge: '/favicon.png',
    tag: data.tag || 'message-notification',
    data: {
      url: data.url || '/',
      matchId: data.matchId,
    },
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Message', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
