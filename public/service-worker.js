self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    
    const title = data.title || 'TamOnda Bildirimi';
    const options = {
        body: data.body || 'Yeni bir bildiriminiz var.',
        icon: 'logo_tamonda.png',
        badge: 'logo_tamonda.png',
        data: { url: data.url || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});