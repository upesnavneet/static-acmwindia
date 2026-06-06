document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom premium cubic-bezier easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis scroll with WordPress admin bar if present
    const wpAdminBar = document.getElementById('wpadminbar');
    if (wpAdminBar) {
      document.documentElement.style.setProperty('--wp-admin-bar-height', wpAdminBar.offsetHeight + 'px');
    }
  }

  // 2. Scroll Reveal Animations (using Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px', // Trigger reveal slightly before element enters viewport
      threshold: 0.05
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    revealElements.forEach(el => {
      el.classList.add('revealed');
    });
  }

  // 3. Sticky Glassmorphic Header Navigation
  const mainNav = document.querySelector('.top-bar.main-nav');
  const header = document.getElementById('header');
  
  if (mainNav && header) {
    const mainNavHeight = mainNav.offsetHeight;
    // Calculate the threshold when main-nav reaches top of screen
    // We scroll past eyebrow and utilities area to stick the main navigation menu
    const getScrollThreshold = () => {
      const rect = mainNav.getBoundingClientRect();
      return window.scrollY + rect.top;
    };
    
    let scrollThreshold = getScrollThreshold();
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
      scrollThreshold = getScrollThreshold();
    });

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        if (!mainNav.classList.contains('sticky-nav')) {
          mainNav.classList.add('sticky-nav');
          // Add padding-top to body to prevent content layout jump
          document.body.style.paddingTop = `${mainNavHeight}px`;
        }
      } else {
        if (mainNav.classList.contains('sticky-nav')) {
          mainNav.classList.remove('sticky-nav');
          document.body.style.paddingTop = '0';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
  }
});
