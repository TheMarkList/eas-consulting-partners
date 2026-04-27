const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }});
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (!heroContent) return;
  const y = window.scrollY, vh = window.innerHeight;
  if (y < vh) { heroContent.style.transform = `translateY(${y * 0.12}px)`; heroContent.style.opacity = Math.max(0, 1 - y / (vh * 0.65)); }
}, { passive: true });

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.querySelector('#name').value.trim() || !form.querySelector('#email').value.trim()) return;
    const btn = form.querySelector('button[type="submit"]');
    const t = btn.querySelector('.btn-text'), a = btn.querySelector('.btn-arrow');
    btn.disabled = true; btn.style.background = '#2d6b4a'; t.textContent = 'Message Sent'; a.textContent = '✓';
    setTimeout(() => { btn.disabled = false; btn.style.background = ''; t.textContent = 'Send to Elias'; a.textContent = '→'; form.reset(); }, 4000);
  });
}
