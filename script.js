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
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    if (!name || !email) return;

    const btn = form.querySelector('button[type="submit"]');
    const t = btn.querySelector('.btn-text'), a = btn.querySelector('.btn-arrow');
    btn.disabled = true; t.textContent = 'Sending...'; a.textContent = '...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        t.textContent = 'Message Sent'; a.textContent = '✓'; btn.style.background = '#2d6b4a';
        setTimeout(() => { btn.disabled = false; btn.style.background = ''; t.textContent = 'Send to Elias'; a.textContent = '→'; form.reset(); }, 4000);
      } else {
        t.textContent = 'Try Again'; a.textContent = '!'; btn.disabled = false;
      }
    } catch {
      t.textContent = 'Try Again'; a.textContent = '!'; btn.disabled = false;
    }
  });
}
