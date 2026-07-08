/* =========================================
   LADSCLUB.__ — script.js
   ========================================= */

(function () {
  'use strict';

  /* ─── Loading Screen ─── */
  const loader    = document.getElementById('loader');
  const loaderFill  = document.getElementById('loaderFill');
  const loaderCount = document.getElementById('loaderCount');

  let count = 0;
  const totalDuration = 2000; // ms
  const interval = totalDuration / 100;

  const ticker = setInterval(() => {
    count++;
    loaderFill.style.width  = count + '%';
    loaderCount.textContent = count;
    if (count >= 100) {
      clearInterval(ticker);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero reveals after loader
        revealHero();
      }, 300);
    }
  }, interval);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';

  function revealHero() {
    const heroEls = document.querySelectorAll('.hero [data-reveal]');
    heroEls.forEach((el) => {
      el.classList.add('visible');
    });
  }

  /* ─── Custom Cursor ─── */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Ring lerp animation
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .price-card, .contact-card, .about-p, .care-item, .cafe-item, .visit-map-card, .visit-info-card'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  });

  /* ─── Scroll Progress Bar ─── */
  const scrollBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = progress + '%';
  }, { passive: true });

  /* ─── Navbar Scroll Effect ─── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ─── Mobile Nav Toggle ─── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ─── Smooth Scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll('[data-reveal]:not(.hero [data-reveal])');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach((el) => observer.observe(el));

  /* ─── Active Nav Link on Scroll ─── */
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, {
    threshold: 0.5
  });

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ─── Care Quote Parallax (subtle) ─── */
  const careQuote = document.querySelector('.care-quote');
  if (careQuote) {
    window.addEventListener('scroll', () => {
      const rect  = careQuote.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offset = (rect.top - center) / center;
      const scale  = 1 + Math.abs(offset) * 0.03;
      const alpha  = Math.max(0.04, Math.min(0.12, 0.04 + (1 - Math.abs(offset)) * 0.08));
      careQuote.style.transform = `scale(${scale})`;
      careQuote.style.color = `rgba(255,255,255,${alpha})`;
    }, { passive: true });
  }

})();
