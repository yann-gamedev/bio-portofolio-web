document.addEventListener('DOMContentLoaded', () => {

  const cursor = document.querySelector('.aura-cursor');
  const cursorTrail = document.querySelector('.aura-cursor-trail');

  if (window.matchMedia('(pointer: fine)').matches && cursor && cursorTrail) {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      cursorTrail.style.left = `${trailX}px`;
      cursorTrail.style.top = `${trailY}px`;
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    const interactables = document.querySelectorAll(
      'a, button, .btn, .project-card, .skill-category, .contact-link'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        cursorTrail.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        cursorTrail.classList.remove('hovering');
      });
    });
  }

  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px', threshold: 0.15 }
  );

  fadeElements.forEach((el) => {
    const parent = el.parentElement;
    if (parent) {
      const siblings = parent.querySelectorAll(':scope > .fade-in');
      if (siblings.length > 1) {
        const idx = Array.from(siblings).indexOf(el);
        if (idx >= 0 && idx < 5) {
          el.classList.add(`delay-${idx + 1}`);
        }
      }
    }
    fadeObserver.observe(el);
  });

  const typeElement = document.querySelector('.typewriter-text');
  const phrases = [
    'MBTI: INTP',
    'Innovator',
    'Developer',
    'Writer',
    'Game Enthusiast',
    'Lifelong Learner'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!typeElement) return;

    if (isDeleting) {
      typeElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80 + Math.random() * 40;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typeLoop, speed);
  }

  if (typeElement) {
    typeElement.textContent = '';
    setTimeout(typeLoop, 1200);
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });

    navLinkItems.forEach((item) => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
      });
    });
  }

  const sections = document.querySelectorAll('section');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }

    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        link.style.color = 'var(--text-main)';
        link.style.textShadow = '0 0 8px rgba(255,255,255,0.5)';
      } else {
        link.style.color = '';
        link.style.textShadow = '';
      }
    });
  });

});
