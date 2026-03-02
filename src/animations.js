export function initAnimations() {
  // Intersection Observer for fade-in elements
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  // Lazy load map iframe
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    const mapObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Inject iframe when visible
          const iframe = document.createElement('iframe');
          iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125433.24256434447!2d-74.254331!3d11.231527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef3f5a285d8362b%3A0x6b16e41b0416955a!2sSanta%20Marta%2C%20Magdalena%2C%20Colombia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';
          iframe.allowFullscreen = '';
          iframe.loading = 'lazy';
          iframe.referrerPolicy = 'no-referrer-when-downgrade';
          
          mapContainer.appendChild(iframe);
          
          // Add loaded class after a short delay to trigger CSS transition
          setTimeout(() => {
            mapContainer.classList.add('loaded');
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' }); // Load slightly before it comes into view
    
    mapObserver.observe(mapContainer);
  }
}
