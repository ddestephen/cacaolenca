// CacaoLenca — interacciones mínimas
(function () {
  // ---- Menú móvil ----
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // ---- Instagram (URL en <body data-instagram="...">) ----
  const ig = (document.body.dataset.instagram || '').trim();
  document.querySelectorAll('.js-instagram').forEach((a) => {
    if (ig) {
      a.href = ig;
    } else {
      a.removeAttribute('href');
      a.removeAttribute('target');
      a.setAttribute('aria-disabled', 'true');
      const label = a.querySelector('.js-instagram-label');
      if (label) label.textContent = a.closest('.footer') ? 'Instagram (próximamente)' : 'Instagram: próximamente';
    }
  });

  // ---- QR hacia la URL publicada (solo cuando está en línea) ----
  const qrBox = document.getElementById('qr');
  const qrCode = document.getElementById('qr-code');
  if (qrBox && qrCode && location.protocol.startsWith('http') && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    const render = () => {
      if (typeof window.qrcode !== 'function') return;
      const url = location.origin + location.pathname;
      const qr = window.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      qrCode.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      qrBox.hidden = false;
    };
    if (document.readyState === 'complete') render(); else window.addEventListener('load', render);
  }
})();
