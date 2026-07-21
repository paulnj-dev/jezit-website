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

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = `${data.get('firstName') || ''} ${data.get('lastName') || ''}`.trim();
      const email = data.get('email') || '';
      const phone = data.get('phone') || '-';
      const message = data.get('message') || '';
      const subject = encodeURIComponent(`Website inquiry from ${name || 'customer'}`);
      const body = encodeURIComponent(`ชื่อ: ${name}\nอีเมล: ${email}\nโทรศัพท์: ${phone}\n\nข้อความ:\n${message}`);

      if (formStatus) formStatus.textContent = 'กำลังเปิดโปรแกรมอีเมลของคุณ...';
      window.location.href = `mailto:sales@jezits.com?subject=${subject}&body=${body}`;

      window.setTimeout(() => {
        if (formStatus) formStatus.textContent = 'ขอบคุณสำหรับข้อมูล ทีมงานพร้อมติดต่อกลับโดยเร็วที่สุด';
        form.reset();
      }, 700);
    });
  }
})();
