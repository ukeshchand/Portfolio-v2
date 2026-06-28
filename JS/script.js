/* ============================================
   PORTFOLIO SCRIPT - Ukesh Chand
   ============================================ */

/* ── Custom Cursor ── */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower
(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .skill-icon, .project-card, .filter-btn, .social-icon, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
});

/* ── Scroll Progress Bar ── */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress     = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
}, { passive: true });

/* ── Navbar: scroll class + active link ── */
const header  = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  header.classList.toggle('scrolled', window.scrollY > 50);

  // Back-to-top visibility
  backToTop.classList.toggle('active', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ── Mobile Menu ── */
const menuBtn  = document.getElementById('menuBtn');
const navMenu  = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !menuBtn.contains(e.target)) {
    menuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('i');

// Persist theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'light');
  }
});

/* ── Back to Top ── */
const backToTop = document.getElementById('backToTop');

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Typing Animation ── */
const typingText   = document.querySelector('.typing-text');
const phrases      = [
  'Frontend Developer',
  'UI/UX Designer',
  'Creative Coder',
  'Problem Solver',
  'Open Source Enthusiast'
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingSpeed = 100;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting  = true;
    typingSpeed = 1800; // pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

setTimeout(type, 800);

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill Bars Animation ── */
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.getAttribute('data-width');
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ── Stats Counter Animation ── */
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const step   = target / (duration / 16);
      let current  = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + '+';
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

/* ── Project Filter ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hide');
        card.classList.add('show');
      } else {
        card.classList.add('hide');
        card.classList.remove('show');
      }
    });
  });
});

/* ── Contact Form ── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const submitBtn  = contactForm.querySelector('.submit-btn');
    const btnSpan    = submitBtn.querySelector('span');
    const btnIcon    = submitBtn.querySelector('i');
    const originalText = btnSpan.textContent;

    // Loading state
    submitBtn.disabled   = true;
    btnSpan.textContent  = 'Sending…';
    btnIcon.className    = 'fas fa-spinner fa-spin';

    // Simulate send (replace with real fetch/EmailJS)
    setTimeout(() => {
      btnSpan.textContent = 'Sent!';
      btnIcon.className   = 'fas fa-check';
      submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

      contactForm.reset();

      setTimeout(() => {
        submitBtn.disabled  = false;
        btnSpan.textContent = originalText;
        btnIcon.className   = 'fas fa-paper-plane';
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

/* ── Particle Canvas ── */
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animFrame = requestAnimationFrame(animateParticles);
}

// Init
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
}, { passive: true });

/* ── Magnetic Button Effect ── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect   = btn.getBoundingClientRect();
    const x      = e.clientX - rect.left - rect.width  / 2;
    const y      = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── Smooth Anchor Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
