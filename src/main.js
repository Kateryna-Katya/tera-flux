document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.background = 'rgba(10, 38, 28, 0.95)';
      } else {
          header.style.padding = '20px 0';
          header.style.background = 'rgba(10, 38, 28, 0.8)';
      }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
});
// Внутри DOMContentLoaded
new TypeIt("#hero-typing", {
  strings: ["Tera-Flux", "AI-ботами", "будущим"],
  speed: 100,
  breakLines: false,
  loop: true,
  nextStringDelay: 2000,
  startDelay: 500
}).go();
// Внутри DOMContentLoaded
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});
// Внутри DOMContentLoaded
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});
// Внутри DOMContentLoaded
const canvas = document.getElementById('canvas-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = '#C0FF00';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const init = () => {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    init();
    animate();
}
// Внутри DOMContentLoaded

// 1. Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone-input');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '');
});

// 2. Генерация капчи
const captchaQ = document.getElementById('captcha-question');
const n1 = Math.floor(Math.random() * 10) + 1;
const n2 = Math.floor(Math.random() * 10) + 1;
if(captchaQ) captchaQ.innerText = `${n1} + ${n2}`;
const correctAnswer = n1 + n2;

// 3. AJAX отправка
const contactForm = document.getElementById('ai-contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userAnswer = parseInt(document.getElementById('captcha-answer').value);

    if (userAnswer !== correctAnswer) {
        formStatus.textContent = 'Ошибка капчи. Попробуйте снова.';
        formStatus.className = 'form__status error';
        return;
    }

    const btn = contactForm.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Отправка...';

    // Имитация задержки сети
    setTimeout(() => {
        formStatus.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
        formStatus.className = 'form__status success';
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = 'Начать сейчас';
    }, 1500);
});
// Внутри DOMContentLoaded

// 1. Cookie Logic
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
        cookiePopup.classList.add('active');
    }, 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookiePopup.classList.remove('active');
});

// 2. Mobile Menu Logic
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

const toggleMenu = () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
};

burger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenu.classList.contains('active')) toggleMenu();
    });
});