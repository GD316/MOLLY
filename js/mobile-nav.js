(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.menu-toggle');
  const nav = header?.querySelector('#main-navigation');
  if (!header || !toggle || !nav) return;

  const setOpen = (open, returnFocus = false) => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    if (returnFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (header.classList.contains('is-menu-open') && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) setOpen(false, true);
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
})();