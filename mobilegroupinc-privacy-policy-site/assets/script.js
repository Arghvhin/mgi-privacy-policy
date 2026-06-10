(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const printButton = document.querySelector('[data-print]');
  const progressBar = document.getElementById('reading-progress-bar');
  const currentYear = document.getElementById('current-year');

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem('mgi-policy-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  const syncHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('mgi-policy-theme', next);
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (printButton) printButton.addEventListener('click', () => window.print());

  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
  }, { passive: true });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy');
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => { button.textContent = original; }, 1500);
      } catch (error) {
        button.textContent = 'Copy failed';
      }
    });
  });
})();
