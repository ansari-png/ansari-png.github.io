// Entrance animations (simple, no library)
document.addEventListener('DOMContentLoaded', ()=>{
  const els = document.querySelectorAll('.card, .section-title, .hero-text, .hero-media .portrait, .about-card');
  els.forEach((el,i)=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(14px)';
    setTimeout(()=>{ el.style.transition = 'opacity .7s cubic-bezier(.16,.84,.28,1), transform .7s cubic-bezier(.16,.84,.28,1)'; el.style.opacity = 1; el.style.transform = 'translateY(0)'; }, 120 + i*80);
  });
  const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Optional: Save preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

  // Simple parallax on hero background
  const hero = document.querySelector('.hero');
  if(hero){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      hero.style.backgroundPosition = `center ${-y * 0.05}px`;
    }, {passive:true});
  }

  // Contact form: simple client-side success feedback
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Sent';
      btn.disabled = true;
      btn.style.transform = 'translateY(-2px)';
      setTimeout(()=>{ btn.textContent = 'Send message'; btn.disabled = false; btn.style.transform = ''; }, 2500);
    });
  }
});
