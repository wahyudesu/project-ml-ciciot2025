/* ═══════════════════════════════════════════════════════════════
   CICIOT PRESENTATION — slides.js
   Navigation, lightbox, inline edit mode, keyboard & touch.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── State ─────────────────────────────────────────────────── */
  const slides      = Array.from(document.querySelectorAll('.slide'));
  const TOTAL       = slides.length;
  let   current     = 0;
  let   isAnimating = false;
  let   whyProblemRevealed = false;
  let   itemMotionTimers = [];
  const EXIT_MS     = 320;
  const LOCK_MS     = 380;
  const DESIGN_W    = 1920;
  const DESIGN_H    = 1080;
  const deckStage   = document.querySelector('.deck-stage') || document.querySelector('.stage');
  const MOTION_GROUPS = [
    {
      selectors: '.cover-brand, .topbar .ttl, .ktag, .cover-kicker, .cover-headline span, .wi-title, .hd-title, .paper-title, .out-card-title, .preview-title, .out-num',
      className: 'motion-title',
      start: 120,
      step: 90
    },
    {
      selectors: '.brand-kicker, .brand-sub, .advisor-label, .advisor-name, .cover-name, .cover-nim, .cover-link, .cover-linknote, .topbar .lab, .wi-lbl, .wi-note, .wi-desc, .wi-mono, .goal-text, .benefit-text, .paper-id, .paper-author, .paper-abstract, .paper-foot, .dl-tag, .dl-url, .preview-kicker, .preview-url, .diagram-caption, .out-kicker',
      className: 'motion-copy',
      start: 150,
      step: 55
    },
    {
      selectors: '.why-item, .goal-item, .benefit-item, .card, .dataset-link, .workflow-main, .workflow-card, .out-card, .outputs-hero, .dataset-preview, .col-card, .cover-linkbox, .advisor-box, .diagram-figure, .table-wrap, .timeline-stat, .timeline-note, .phase-card',
      className: 'motion-panel',
      start: 180,
      step: 80
    },
    {
      selectors: '.cover-ribbons .rib, .blob, .wi-strip, .topstrip, .benefit-dot, .timeline-ribbon .month, .phase-code, .phase-tag',
      className: 'motion-accent',
      start: 100,
      step: 60
    },
    {
      selectors: '.compare-table tr',
      className: 'motion-row',
      start: 120,
      step: 35
    },
    {
      selectors: '.slide img',
      className: 'motion-media',
      start: 140,
      step: 80
    }
  ];

  function clearItemMotionTimers() {
    while (itemMotionTimers.length) {
      clearTimeout(itemMotionTimers.pop());
    }
  }

  function fitStage() {
    if (!deckStage) return;
    var navEl = document.getElementById('bottom-nav');
    var navH = navEl ? navEl.getBoundingClientRect().height : 0;

    var availableW = window.innerWidth;
    var availableH = Math.max(0, window.innerHeight - navH);
    var scale = Math.min(availableW / DESIGN_W, availableH / DESIGN_H);
    var x = Math.max(0, (availableW - (DESIGN_W * scale)) / 2);
    var y = Math.max(0, (availableH - (DESIGN_H * scale)) / 2);

    deckStage.style.width = DESIGN_W + 'px';
    deckStage.style.height = DESIGN_H + 'px';
    deckStage.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
  }

  function queueItemMotion(item, delay) {
    item.classList.remove('anim-reveal');
    item.style.animation = 'none';
    void item.offsetWidth;
    item.style.animation = '';

    var timer = setTimeout(function () {
      item.classList.add('anim-reveal');
    }, delay);
    itemMotionTimers.push(timer);
  }

  function clearMotionClasses(slide) {
    slide.querySelectorAll('.motion-title, .motion-copy, .motion-panel, .motion-accent, .motion-row, .motion-media').forEach(function (node) {
      node.classList.remove('motion-title', 'motion-copy', 'motion-panel', 'motion-accent', 'motion-row', 'motion-media', 'anim-reveal');
      node.style.removeProperty('--motion-delay');
      node.style.animation = '';
    });
  }

  function applyMotionGroups(slide) {
    MOTION_GROUPS.forEach(function (group) {
      var items = Array.from(slide.querySelectorAll(group.selectors));
      items.forEach(function (item, idx) {
        if (!item || !slide.contains(item)) return;
        item.classList.add(group.className);
        queueItemMotion(item, group.start + (idx * group.step));
      });
    });
  }

  function replayItemMotion(slide) {
    if (!slide) return;

    clearItemMotionTimers();
    slide.classList.remove('item-motion');
    clearMotionClasses(slide);
    void slide.offsetWidth;
    slide.classList.add('item-motion');
    applyMotionGroups(slide);
  }

  function syncPageNumbers() {
    slides.forEach(function (slide, idx) {
      var pagenum = slide.querySelector('.pagenum');
      if (!pagenum) return;
      var n = String(idx + 1).padStart(2, '0');
      var total = String(TOTAL).padStart(2, '0');
      pagenum.textContent = n + ' / ' + total;
    });
  }

  /* ─── Navigate to slide i ───────────────────────────────────── */
  function show(i) {
    if (isAnimating) return;
    if (i < 0)       i = 0;
    if (i >= TOTAL)  i = TOTAL - 1;
    if (i === current) return;

    if (current === 1 && i === current + 1 && !whyProblemRevealed) {
      slides[current].classList.add('problem-revealed');
      whyProblemRevealed = true;
      isAnimating = true;
      setTimeout(function () { isAnimating = false; }, 220);
      return;
    }

    isAnimating = true;

    const prev = slides[current];
    const next = slides[i];
    const direction = i > current ? 1 : -1;

    prev.style.setProperty('--slide-dir', direction);
    next.style.setProperty('--slide-dir', direction);

    prev.classList.remove('active');
    prev.classList.remove('item-motion');
    prev.querySelectorAll('.anim-reveal').forEach(function (node) {
      node.classList.remove('anim-reveal');
    });
    prev.classList.add('slide-exit');
    setTimeout(function () { prev.classList.remove('slide-exit'); }, EXIT_MS + 40);

    next.classList.add('active');
    replayItemMotion(next);
    current = i;
    updateNav();

    setTimeout(function () { isAnimating = false; }, LOCK_MS);
  }

  /* ─── Bottom Nav: initialization ───────────────────────────── */
  function initNav() {
    var dotsEl  = document.getElementById('nav-dots');
    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');

    if (!dotsEl || !btnPrev || !btnNext) return;

    slides.forEach(function (_, idx) {
      var dot = document.createElement('button');
      var slideTitle = (slides[idx].querySelector('.topbar .ttl') || {}).textContent || slides[idx].getAttribute('aria-label') || ('Slide ' + (idx + 1));
      slideTitle = slideTitle.replace(/\s+/g, ' ').trim();
      dot.className   = 'nav-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label',    'Slide ' + (idx + 1));
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.setAttribute('type',          'button');
      dot.setAttribute('data-title',    slideTitle);
      dot.addEventListener('click', function () {
        if (idx === current) {
          replayItemMotion(slides[current]);
          return;
        }
        show(idx);
      });
      dotsEl.appendChild(dot);
    });

    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });

    updateNav();
  }

  /* ─── Bottom Nav: update state ──────────────────────────────── */
  function updateNav() {
    var dots = document.querySelectorAll('.nav-dot');
    dots.forEach(function (dot, idx) {
      var isActive = idx === current;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    var counter = document.getElementById('nav-counter');
    if (counter) {
      var n     = String(current + 1).padStart(2, '0');
      var total = String(TOTAL).padStart(2, '0');
      counter.textContent = n + ' / ' + total;
    }

    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');
    if (btnPrev) btnPrev.disabled = (current === 0);
    if (btnNext) btnNext.disabled = (current === TOTAL - 1);
  }


  /* ═══════════════════════════════════════════════════════════════
     LIGHTBOX
     ═══════════════════════════════════════════════════════════════ */
  function initLightbox() {
    var lb      = document.getElementById('lightbox');
    var lbTitle = document.getElementById('lb-title');
    var lbBody  = document.getElementById('lb-body');
    var lbFoot  = document.getElementById('lb-footer');
    var lbClose = document.getElementById('lb-close');

    if (!lb) return;

    function openLightbox(item) {
      var title   = item.getAttribute('data-title')   || item.getAttribute('aria-label') || 'Figure';
      var caption = item.getAttribute('data-caption') || '';
      var srcSvg  = item.querySelector('svg');
      var srcImg  = item.tagName === 'IMG' ? item : item.querySelector('img');

      if (lbTitle) lbTitle.textContent = title;
      if (lbFoot)  lbFoot.textContent  = caption;
      if (lbBody) {
        lbBody.innerHTML = '';
        if (srcSvg) {
          lbBody.appendChild(srcSvg.cloneNode(true));
        } else if (srcImg) {
          var clone = srcImg.cloneNode(true);
          clone.classList.add('lightbox-image');
          lbBody.appendChild(clone);
        }
      }

      lb.classList.add('open');
      lb.focus();
    }

    function closeLightbox() {
      lb.classList.remove('open');
    }

    /* Attach click to every gallery item */
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () { openLightbox(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
      });
    });

    /* Attach click to every image asset in the deck */
    document.querySelectorAll('.slide img').forEach(function (img) {
      if (img.closest('.lightbox')) return;
      img.classList.add('zoomable-image');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', img.getAttribute('alt') || 'Open image');
      img.addEventListener('click', function () { openLightbox(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
      });
    });

    /* Close on backdrop or close button */
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    /* Keyboard: Esc closes */
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function initLinkPreviews() {
    var links = document.querySelectorAll('.dataset-link[data-preview-url]');
    var preview = document.querySelector('.dataset-preview');
    if (!links.length || !preview) return;

    var titleEl = preview.querySelector('[data-preview-title]');
    var urlEl = preview.querySelector('[data-preview-url]');
    var frame = preview.querySelector('.dataset-preview-frame');
    var hideTimer = null;

    function setPreview(link) {
      var title = link.getAttribute('data-preview-title') || link.textContent.trim();
      var url = link.getAttribute('data-preview-url') || link.getAttribute('href');
      if (titleEl) titleEl.textContent = title;
      if (urlEl) urlEl.textContent = url;
      if (frame) {
        var frameUrl = frame.getAttribute('data-preview-src') || url;
        if (frameUrl && frame.getAttribute('src') !== frameUrl) {
          frame.setAttribute('src', frameUrl);
        }
      }
      preview.classList.add('is-visible');
    }

    function hidePreview() {
      preview.classList.remove('is-visible');
    }

    function scheduleHide() {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        hidePreview();
      }, 90);
    }

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        if (hideTimer) clearTimeout(hideTimer);
        setPreview(link);
      });
      link.addEventListener('mouseleave', function () {
        scheduleHide();
      });
    });

    preview.addEventListener('mouseenter', function () {
      if (hideTimer) clearTimeout(hideTimer);
    });
    preview.addEventListener('mouseleave', function () {
      scheduleHide();
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     INLINE EDIT MODE
     Edit text in-slide and save to localStorage.
     Toggle: click ✏ button in nav, or press E.
     Save: Ctrl/Cmd + S (or button again).
     ═══════════════════════════════════════════════════════════════ */
  var editMode = false;

  function initEditMode() {
    var btn   = document.getElementById('edit-btn');
    var saved = document.getElementById('edit-saved');

    /* Restore from localStorage on load */
    loadEdits();

    if (btn) {
      btn.addEventListener('click', function () { toggleEditMode(); });
    }

    function showSaved() {
      if (!saved) return;
      saved.classList.add('show');
      setTimeout(function () { saved.classList.remove('show'); }, 1800);
    }

    window._editMode   = false;
    window._saveEdits  = saveEdits;
    window._showSaved  = showSaved;
  }

  function toggleEditMode() {
    editMode = !editMode;
    window._editMode = editMode;

    var btn = document.getElementById('edit-btn');
    document.body.classList.toggle('editing', editMode);

    if (btn) {
      btn.classList.toggle('edit-on', editMode);
      btn.title = editMode ? 'Exit edit mode (E)' : 'Edit slide text (E)';
    }

    document.querySelectorAll('[data-eid]').forEach(function (el) {
      if (editMode) {
        el.setAttribute('contenteditable', 'plaintext-only');
      } else {
        el.removeAttribute('contenteditable');
      }
    });

    if (!editMode) {
      saveEdits();
      if (window._showSaved) window._showSaved();
    }
  }

  function saveEdits() {
    try {
      var data = {};
      document.querySelectorAll('[data-eid]').forEach(function (el) {
        data[el.getAttribute('data-eid')] = el.textContent;
      });
      localStorage.setItem('ciciot-pres-edits', JSON.stringify(data));
    } catch (e) {}
  }

  function loadEdits() {
    try {
      var raw = localStorage.getItem('ciciot-pres-edits');
      if (!raw) return;
      var data = JSON.parse(raw);
      Object.keys(data).forEach(function (key) {
        var el = document.querySelector('[data-eid="' + key + '"]');
        if (el) el.textContent = data[key];
      });
    } catch (e) {}
  }


  /* ─── Keyboard navigation ───────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    /* When a contenteditable element is focused, don't navigate */
    var active = document.activeElement;
    var inEdit = active && (active.isContentEditable ||
                            active.tagName === 'INPUT' ||
                            active.tagName === 'TEXTAREA');

    /* Ctrl/Cmd+S always saves when in edit mode */
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (editMode) {
        saveEdits();
        if (window._showSaved) window._showSaved();
      }
      return;
    }

    /* E key toggles edit mode (only when not typing) */
    if ((e.key === 'e' || e.key === 'E') && !inEdit && !e.ctrlKey && !e.metaKey) {
      toggleEditMode();
      return;
    }

    if (inEdit) return;

    /* Lightbox closes on Esc (handled in lightbox itself) */

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
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      show(current + (dx < 0 ? 1 : -1));
    }
    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  /* ─── Init ──────────────────────────────────────────────────── */
  initNav();
  initLightbox();
  initLinkPreviews();
  initEditMode();
  syncPageNumbers();
  fitStage();
  window.addEventListener('resize', fitStage);
  replayItemMotion(slides[current]);

}());
