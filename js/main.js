/* =============================================
   WEAVES & FUEL NK — Main JavaScript
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// Start scrolled if not at top on load
if (window.scrollY > 50) navbar?.classList.add('scrolled');

// ── Mobile menu toggle ────────────────────────
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// ── Active nav link ───────────────────────────
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') ||
        (path === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ── Scroll reveal animations ──────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── Counter animation ─────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── Progress bar animation ────────────────────
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.progress-fill');
      if (fill) fill.style.width = fill.dataset.width;
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-wrap').forEach(el => progressObserver.observe(el));

// ── Smooth scroll for anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Blog category filter ─────────────────────
(function() {
  const categoryButtons = document.querySelectorAll('.blog-cat');
  const blogCards = document.querySelectorAll('.blog-full-grid .card, .blog-hero-card');
  if (!categoryButtons.length || !blogCards.length) return;

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      categoryButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selected = this.dataset.category || 'all';
      blogCards.forEach(card => {
        const cardCategory = card.dataset.category || 'all';
        if (selected === 'all' || cardCategory === selected) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ── Form submission handler ───────────────────
function handleForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send (replace with Formspree endpoint in production)
    setTimeout(() => {
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;
      const msg = document.getElementById(successId);
      if (msg) {
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 5000);
      }
    }, 1500);
  });
}

handleForm('contactForm', 'contactSuccess');
handleForm('rsvpForm', 'rsvpSuccess');

// ── Gallery lightbox ──────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    }
  });
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox?.classList.remove('open');
});
