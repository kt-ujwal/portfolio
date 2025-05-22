// A direct copy of CRA’s helper (MIT licensed)
// Source: https://create-react-app.dev/docs/making-a-progressive-web-app/

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
    )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // This is running on localhost. Let’s check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);
  
        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) { return; }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available; execute callback
                if (config && config.onUpdate) { config.onUpdate(registration); }
              } else {
                // Content cached for offline use.
                if (config && config.onSuccess) { config.onSuccess(registration); }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can’t reload the page.
    fetch(swUrl, { headers: { 'Service-Worker':'script' } })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No service worker found. Probably a different app. Reload.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => window.location.reload());
          });
        } else {
          // Service worker found. Proceed.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('No internet connection found. App is running in offline mode.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => registration.unregister())
        .catch(error => console.error(error.message));
    }
  }
  