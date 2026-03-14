// ── Session check ──
if (sessionStorage.getItem('coh_logged_in') === 'true') {
  window.location.href = 'menu.html';
}

// ── Particles ──
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = [
    'rgba(200,130,32,0.32)',
    'rgba(180,100,20,0.22)',
    'rgba(232,180,70,0.26)',
    'rgba(160,90,20,0.18)'
  ];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*12+10}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));
}

// ── Smooth scroll ──
function scrollToAbout() {
  const about = document.getElementById('about');
  if (about) about.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollReveal();
});
