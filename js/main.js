/**
 * Ing. arch. Katarína Němcová - Interactive JavaScript
 * Handles mobile navigation, smooth scrolling, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = mobileDrawer ? mobileDrawer.querySelectorAll('a') : [];

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking any link inside
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth Scroll for Navigation Anchors
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // IntersectionObserver for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.highlight-card, .pricing-card, .process-step, .service-card, .highlight-card-about');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // Services Horizontal Scroll Controls
  const servicesGrid = document.querySelector('.services-grid');
  const servicesPrevBtn = document.getElementById('services-prev');
  const servicesNextBtn = document.getElementById('services-next');

  if (servicesGrid && servicesPrevBtn && servicesNextBtn) {
    servicesPrevBtn.addEventListener('click', () => {
      servicesGrid.scrollBy({ left: -260, behavior: 'smooth' });
    });

    servicesNextBtn.addEventListener('click', () => {
      servicesGrid.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }
});
