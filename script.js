// ============================================================
// Scroll progress trace (right-hand vertical line)
// ============================================================
const traceFill = document.getElementById('traceFill');

function updateTrace(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  traceFill.style.height = pct + '%';
}
window.addEventListener('scroll', updateTrace, { passive: true });
window.addEventListener('resize', updateTrace);
updateTrace();

// ============================================================
// Reveal-on-scroll for content blocks
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));



// ============================================================
// Active nav link highlight based on scroll position
// ============================================================
const navLinks = document.querySelectorAll('.topnav a');
const sections = Array.from(navLinks).map(link =>
  document.querySelector(link.getAttribute('href'))
).filter(Boolean);

function updateActiveNav(){
  let currentIndex = 0;
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.35){
      currentIndex = i;
    }
  });
  navLinks.forEach((link, i) => {
    link.style.color = i === currentIndex ? 'var(--signal)' : '';
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ============================================================
// Live India Clock
// ============================================================
function updateClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  const timeString = new Date().toLocaleTimeString('en-US', options);
  clockEl.textContent = `GUJARAT, IN — ${timeString}`;
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// Dark Mode / Light Mode Theme Toggle
// ============================================================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  // Check for saved preference, default to light mode
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    
    // Smooth transition effect when toggling variables
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 400);
  });
}
