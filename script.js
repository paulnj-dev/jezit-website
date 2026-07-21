(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const year = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const formStatus = document.querySelector('.form-status');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('open');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'เปิดเมนู');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('open');
      nav.classList.toggle('open', isOpen);
      toggle.classList.toggle('open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    }, { passive: true });
  }

  let ticking = false;
  const updateNavigation = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);

    const headerOffset = (header?.offsetHeight || 0) + 36;
    let current = sections[0]?.id || 'home';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerOffset) current = section.id;
    }

    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavigation);
      ticking = true;
    }
  }, { passive: true });
  updateNavigation();


  const root = document.documentElement;
  let starScrollTicking = false;

  const updateStarScroll = () => {
    root.style.setProperty('--page-scroll-y', `${window.scrollY}px`);
    starScrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!starScrollTicking) {
      window.requestAnimationFrame(updateStarScroll);
      starScrollTicking = true;
    }
  }, { passive: true });

  updateStarScroll();


  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const buttonLabel = submitButton?.querySelector('.button-label');
      const originalLabel = buttonLabel?.textContent || 'ส่งข้อความ';

      if (submitButton) submitButton.disabled = true;
      if (buttonLabel) buttonLabel.textContent = 'กำลังส่ง...';
      if (formStatus) {
        formStatus.textContent = 'กำลังส่งข้อมูล กรุณารอสักครู่...';
        formStatus.classList.remove('success', 'error');
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === 'false' || result.success === false) {
          throw new Error(result.message || 'ไม่สามารถส่งข้อมูลได้');
        }

        form.reset();

        if (formStatus) {
          formStatus.textContent = 'ส่งข้อมูลเรียบร้อยแล้ว ทีมงาน JEZiT จะติดต่อกลับโดยเร็วที่สุด';
          formStatus.classList.add('success');
        }
      } catch (error) {
        console.error('Contact form error:', error);

        if (formStatus) {
          formStatus.textContent = 'ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือติดต่อ sales@jezits.com';
          formStatus.classList.add('error');
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (buttonLabel) buttonLabel.textContent = originalLabel;
      }
    });
  }
})();
