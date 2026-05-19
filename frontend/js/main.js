// ═══════════════════════════════════════
// NEPAL TRAIL GUIDE — main.js
// ═══════════════════════════════════════

'use strict';

// ── Navbar scroll effect ──
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const hamburgerIcon = document.getElementById('hamburgerIcon');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu ──
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburgerIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerIcon.className = 'fa-solid fa-bars';
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

window.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to elements
  const revealEls = document.querySelectorAll(
    '.card, .info-card, .latest-item, .stat-item, .banner-content'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ── Newsletter form ──
function handleSubscribe(e) {
  e.preventDefault();
  const input  = e.target.querySelector('input');
  const button = e.target.querySelector('button');
  const email  = input.value;

  // Success state
  button.innerHTML = '<i class="fa-solid fa-circle-check"></i> Subscribed!';
  button.style.background = '#2d7a50';
  input.value = '';
  input.placeholder = `${email} added!`;
  input.disabled = true;
  button.disabled = true;

  // Reset after 5s
  setTimeout(() => {
    button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Subscribe';
    button.style.background = '';
    input.placeholder = 'your@email.com';
    input.disabled = false;
    button.disabled = false;
  }, 5000);
}