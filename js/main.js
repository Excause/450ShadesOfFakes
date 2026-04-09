/**
 * main.js — Portfolio Website Interactivity
 *
 * Sections:
 *  1. Theme Toggle (Dark / Light)
 *  2. Mobile Navigation (Hamburger)
 *  3. Header Scroll Effect
 *  4. Active Nav Link on Scroll
 *  5. Scroll Progress Bar
 *  6. Typed Text Effect (Hero)
 *  7. Counter Animation (Hero Stats)
 *  8. Scroll-Reveal (Intersection Observer)
 *  9. Skill Bar Animation
 * 10. Project Filter
 * 11. Contact Form Validation
 */

'use strict';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


// ─────────────────────────────────────────────
// 1. Theme Toggle
// ─────────────────────────────────────────────
(function initTheme() {
  const html        = document.documentElement;
  const toggleBtn   = $('#theme-toggle');
  const icon        = toggleBtn.querySelector('.theme-toggle__icon');
  const STORAGE_KEY = 'portfolio-theme';

  // Respect OS preference if no saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  toggleBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln');
  }
})();


// ─────────────────────────────────────────────
// 2. Mobile Navigation
// ─────────────────────────────────────────────
(function initMobileNav() {
  const hamburger = $('#hamburger');
  const navMenu   = $('#nav-menu');

  hamburger.addEventListener('click', toggleMenu);

  // Close when a nav link is clicked
  $$('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside (on the dim overlay)
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== hamburger) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
})();


// ─────────────────────────────────────────────
// 3 & 4. Header Scroll + Active Nav Link
// ─────────────────────────────────────────────
(function initScrollBehavior() {
  const header   = $('#header');
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  function onScroll() {
    // Header shadow
    header.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    const scrollMid = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      if (scrollMid >= sec.offsetTop && scrollMid < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


// ─────────────────────────────────────────────
// 5. Scroll Progress Bar
// ─────────────────────────────────────────────
(function initScrollProgress() {
  const bar = $('#scroll-progress');

  window.addEventListener('scroll', () => {
    const scrolled   = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    bar.style.width  = pct.toFixed(2) + '%';
  }, { passive: true });
})();


// ─────────────────────────────────────────────
// 6. Typed Text Effect
// ─────────────────────────────────────────────
(function initTypedText() {
  const el = $('#typed-text');
  if (!el) return;

  const phrases = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let delay      = 120;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      delay = 115;
      if (charIdx === phrase.length) { deleting = true; delay = 2000; }
    } else {
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      delay = 55;
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 350; }
    }

    setTimeout(tick, delay);
  }

  // Start after hero entrance animations
  setTimeout(tick, 900);
})();


// ─────────────────────────────────────────────
// 7. Counter Animation
// ─────────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600; // ms
  const fps      = 60;
  const steps    = Math.round(duration / (1000 / fps));
  const increment = target / steps;
  let current = 0;

  const step = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(step);
}

// Trigger counters when hero stats scroll into view
(function initCounters() {
  const statsContainer = $('.hero__stats');
  if (!statsContainer) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat__number').forEach(animateCounter);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  obs.observe(statsContainer);
})();


// ─────────────────────────────────────────────
// 8. Scroll-Reveal (generic .reveal elements)
// ─────────────────────────────────────────────
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => obs.observe(el));
})();


// ─────────────────────────────────────────────
// 9. Skill Bar Animation
// ─────────────────────────────────────────────
(function initSkillBars() {
  const aboutSection = $('#about');
  if (!aboutSection) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-item__fill').forEach(fill => {
          // Short delay so the element is painted before transitioning
          requestAnimationFrame(() => {
            fill.style.width = (fill.dataset.width || 0) + '%';
          });
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(aboutSection);
})();


// ─────────────────────────────────────────────
// 10. Project Filter
// ─────────────────────────────────────────────
(function initProjectFilter() {
  const filterBtns  = $$('.filter-btn');
  const cards       = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();


// ─────────────────────────────────────────────
// 11. Contact Form Validation
// ─────────────────────────────────────────────
(function initContactForm() {
  const form       = $('#contact-form');
  const submitBtn  = $('#submit-btn');
  const successMsg = $('#form-success');
  if (!form) return;

  // Validation rules
  const rules = {
    name: {
      validate: (v) => v.length >= 2,
      message:  'Bitte gib deinen Namen ein (mind. 2 Zeichen).',
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
      message:  'Bitte gib eine gültige E-Mail-Adresse ein.',
    },
    message: {
      validate: (v) => v.length >= 10,
      message:  'Deine Nachricht sollte mind. 10 Zeichen lang sein.',
    },
  };

  // Real-time validation on blur
  Object.keys(rules).forEach(id => {
    const input = $(`#${id}`);
    if (!input) return;
    input.addEventListener('blur', () => validateField(id));
    input.addEventListener('input', () => {
      // Clear error as soon as valid while typing
      if (rules[id].validate(input.value.trim())) clearError(id);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = Object.keys(rules).reduce((acc, id) => validateField(id) && acc, true);
    if (!valid) return;

    // Simulate async send
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      Object.keys(rules).forEach(id => clearError(id));
      successMsg.hidden = false;
      setTimeout(() => { successMsg.hidden = true; }, 6000);
    }, 1500);
  });

  function validateField(id) {
    const input = $(`#${id}`);
    const error = $(`#${id}-error`);
    const value = input.value.trim();
    const rule  = rules[id];

    if (!rule) return true;

    if (!value) {
      showError(id, 'Dieses Feld ist erforderlich.');
      return false;
    }
    if (!rule.validate(value)) {
      showError(id, rule.message);
      return false;
    }
    clearError(id);
    return true;
  }

  function showError(id, msg) {
    const input = $(`#${id}`);
    const error = $(`#${id}-error`);
    input.classList.add('error');
    if (error) error.textContent = msg;
  }

  function clearError(id) {
    const input = $(`#${id}`);
    const error = $(`#${id}-error`);
    input.classList.remove('error');
    if (error) error.textContent = '';
  }

  function setSubmitting(loading) {
    submitBtn.disabled = loading;
    submitBtn.querySelector('.btn__text').textContent = loading ? 'Wird gesendet…' : 'Nachricht senden';
    submitBtn.querySelector('.btn__icon').textContent = loading ? '⏳' : '→';
  }
})();
