/* ============================================================
NEXAVO AI — Main JavaScript (Updated with Form Success UX)
============================================================ */

(function () {
'use strict';

/* ── Nav scroll effect ───────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
window.addEventListener('scroll', () => {
nav.classList.toggle('scrolled', window.scrollY > 20);
});
}

/* ── Mobile menu ─────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
mobileMenu.classList.toggle('open');

  document.body.style.overflow =
    mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

}

/* ── Scroll reveal animation ─────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

}

/* ── Active nav link ─────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link').forEach(link => {
const href = link.getAttribute('href');

if (href === currentPage || (currentPage === '' && href === 'index.html')) {
  link.classList.add('active');
}

});

/* ── Contact form handling (Web3Forms) ───────────── */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
form.addEventListener('submit', async (e) => {
e.preventDefault();

  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
      form.reset();

      if (status) {
        status.innerHTML = "✅ Message sent successfully! We’ll get back to you soon.";
        status.style.color = "#4ade80";
      }

      button.textContent = 'Sent';
    } else {
      if (status) {
        status.innerHTML = "❌ Something went wrong. Please try again.";
        status.style.color = "#f87171";
      }

      button.textContent = 'Error';
    }

  } catch (error) {
    if (status) {
      status.innerHTML = "❌ Network error. Please try again.";
      status.style.color = "#f87171";
    }

    button.textContent = 'Error';
  }

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 3000);
});

}

})();