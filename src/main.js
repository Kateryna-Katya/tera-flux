document.addEventListener('DOMContentLoaded', () => {

  // --- 1. МОБИЛЬНОЕ МЕНЮ (Работает на всех страницах) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (burger && mobileMenu) {
      const toggleMenu = () => {
          burger.classList.toggle('active');
          mobileMenu.classList.toggle('active');
          // Блокируем скролл при открытом меню
          document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      };

      burger.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (mobileMenu.classList.contains('active')) toggleMenu();
          });
      });
  }

  // --- 2. ЭФФЕКТ СКРОЛЛА ДЛЯ ХЕДЕРА ---
  const header = document.querySelector('.header');
  if (header) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              header.style.padding = '12px 0';
              header.style.background = 'rgba(10, 38, 28, 0.95)';
          } else {
              header.style.padding = '20px 0';
              header.style.background = 'rgba(10, 38, 28, 0.8)';
          }
      });
  }

  // --- 3. ПЕЧАТНЫЙ ТЕКСТ (TypeIt) ---
  // Проверяем наличие элемента перед инициализацией
  if (document.getElementById('hero-typing')) {
      new TypeIt("#hero-typing", {
          strings: ["Tera-Flux", "AI-ботами", "будущим"],
          speed: 100,
          breakLines: false,
          loop: true,
          nextStringDelay: 2000,
          startDelay: 500
      }).go();
  }

  // --- 4. ЭФФЕКТ СЛЕЖЕНИЯ МЫШИ ДЛЯ КАРТОЧЕК ---
  const cards = document.querySelectorAll('.feature-card');
  if (cards.length > 0) {
      cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty('--x', `${x}px`);
              card.style.setProperty('--y', `${y}px`);
          });
      });
  }

  // --- 5. CANVAS: ЧАСТИЦЫ (Цифровое ДНК) ---
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
              this.speedX = Math.random() * 0.5 - 0.25;
              this.speedY = Math.random() * 0.5 - 0.25;
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

      const initCanvas = () => {
          particles = [];
          for (let i = 0; i < 80; i++) particles.push(new Particle());
      };
      const animateCanvas = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach(p => { p.update(); p.draw(); });
          requestAnimationFrame(animateCanvas);
      };
      initCanvas();
      animateCanvas();
  }

  // --- 6. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');
  if (cookiePopup && cookieAccept) {
      if (!localStorage.getItem('cookies-accepted')) {
          setTimeout(() => cookiePopup.classList.add('active'), 2000);
      }
      cookieAccept.addEventListener('click', () => {
          localStorage.setItem('cookies-accepted', 'true');
          cookiePopup.classList.remove('active');
      });
  }

  // --- 7. ВАЛИДАЦИЯ ФОРМЫ И КАПЧА ---
  const contactForm = document.getElementById('ai-contact-form');
  const phoneInput = document.getElementById('phone-input');
  const captchaQ = document.getElementById('captcha-question');

  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9+]/g, '');
      });
  }

  if (contactForm && captchaQ) {
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 10) + 1;
      captchaQ.innerText = `${n1} + ${n2}`;
      const correctAnswer = n1 + n2;

      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const userAnswer = parseInt(document.getElementById('captcha-answer').value);
          const formStatus = document.getElementById('form-status');

          if (userAnswer !== correctAnswer) {
              formStatus.textContent = 'Ошибка капчи!';
              formStatus.className = 'form__status error';
          } else {
              const btn = contactForm.querySelector('button');
              btn.disabled = true;
              btn.textContent = 'Отправка...';
              setTimeout(() => {
                  formStatus.textContent = 'Успешно отправлено!';
                  formStatus.className = 'form__status success';
                  contactForm.reset();
                  btn.disabled = false;
                  btn.textContent = 'Начать сейчас';
              }, 1500);
          }
      });
  }

  // --- 8. ИНИЦИАЛИЗАЦИЯ AOS (Анимации при скролле) ---
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 1000,
          once: true,
          offset: 100
      });
  }
});