/* ═══════════════════════════════════════════════════════════════
   CICIOT PRESENTATION — slides.js
   Navigation logic, bottom nav initialization, keyboard & touch.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── State ─────────────────────────────────────────────────── */
  const slides      = Array.from(document.querySelectorAll('.slide'));
  const TOTAL       = slides.length;
  let   current     = 0;
  let   isAnimating = false;
  const EXIT_MS     = 320;   /* must match slideExit animation duration in CSS */
  const LOCK_MS     = 380;   /* debounce window to prevent double-fire */

  /* ─── Navigate to slide i ───────────────────────────────────── */
  function show(i) {
    if (isAnimating) return;
    if (i < 0)       i = 0;
    if (i >= TOTAL)  i = TOTAL - 1;
    if (i === current) return;

    isAnimating = true;

    const prev = slides[current];
    const next = slides[i];

    /* Exit the current slide */
    prev.classList.remove('active');
    prev.classList.add('slide-exit');
    setTimeout(() => prev.classList.remove('slide-exit'), EXIT_MS + 40);

    /* Enter the new slide — adding 'active' triggers CSS animation */
    next.classList.add('active');

    current = i;
    updateNav();

    setTimeout(() => { isAnimating = false; }, LOCK_MS);
  }

  /* ─── Bottom Nav: initialization ───────────────────────────── */
  function initNav() {
    const dotsEl   = document.getElementById('nav-dots');
    const btnPrev  = document.getElementById('btn-prev');
    const btnNext  = document.getElementById('btn-next');

    if (!dotsEl || !btnPrev || !btnNext) return;

    /* Generate one dot per slide */
    slides.forEach(function (_, idx) {
      const dot = document.createElement('button');
      dot.className   = 'nav-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label',    'Slide ' + (idx + 1));
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.setAttribute('type',          'button');
      dot.addEventListener('click', function () { show(idx); });
      dotsEl.appendChild(dot);
    });

    /* Arrow buttons */
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });

    updateNav();
  }

  /* ─── Bottom Nav: update state ──────────────────────────────── */
  function updateNav() {
    /* Dots */
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach(function (dot, idx) {
      const isActive = idx === current;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    /* Counter: "01 / 08" */
    const counter = document.getElementById('nav-counter');
    if (counter) {
      const n     = String(current + 1).padStart(2, '0');
      const total = String(TOTAL).padStart(2, '0');
      counter.textContent = n + ' / ' + total;
    }

    /* Prev / Next button disabled state */
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnPrev) btnPrev.disabled = (current === 0);
    if (btnNext) btnNext.disabled = (current === TOTAL - 1);
  }

  /* ─── Keyboard navigation ───────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        show(current + 1);
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        show(current - 1);
        break;
      case 'Home':
        e.preventDefault();
        show(0);
        break;
      case 'End':
        e.preventDefault();
        show(TOTAL - 1);
        break;
    }
  });

  /* ─── Touch / swipe navigation ──────────────────────────────── */
  var touchStartX = null;
  var touchStartY = null;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    /* Only trigger if horizontal swipe is dominant and long enough */
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      show(current + (dx < 0 ? 1 : -1));
    }
    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  /* ─── Init ──────────────────────────────────────────────────── */
  initNav();

}());
