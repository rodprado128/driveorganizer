// === Drive Organizer · Landing JS ===

// URL do Google Apps Script Web App (substituir após deploy).
const APP_URL = 'https://script.google.com/macros/s/AKfycbwKIcWlfMX4q2jeXB-9Linl_uMtF9RnQAjc4XPFYFcL4LNyaNGouY_J6j0O5eepz8FlTA/exec';

document.addEventListener('DOMContentLoaded', () => {
  // Ano dinâmico no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Configura link do CTA
  const ctaBtn = document.getElementById('ctaBtn');
  if (ctaBtn && APP_URL && APP_URL.startsWith('http')) {
    ctaBtn.href = APP_URL;
  } else {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Configure a URL do Apps Script no arquivo script.js (constante APP_URL).');
    });
  }

  // IntersectionObserver genérico para elementos .reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Fade especial do CTA (com timing escalonado já no CSS)
  const ctaSection = document.getElementById('ctaSection');
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ctaSection.classList.add('in-view');
      } else {
        // Permite re-trigger quando rolar de volta
        // ctaSection.classList.remove('in-view');
      }
    });
  }, { threshold: 0.35 });
  if (ctaSection) ctaObserver.observe(ctaSection);

  // Parallax suave no hero (opcional, leve)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        const heroInner = hero.querySelector('.hero-inner');
        if (heroInner) {
          heroInner.style.transform = `translateY(${y * 0.15}px)`;
          heroInner.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.8));
        }
      }
    }, { passive: true });
  }
});
