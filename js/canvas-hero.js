/* =====================================================================
   AVENTIS — Hero Canvas Scroll Scrubber
   240-frame sequence scrubbed by scroll with lerp damping (0.085).
   Preloads first frames + keyframes eagerly, streams the rest at idle.
   ===================================================================== */
(function () {
  'use strict';

  var TOTAL = 240;
  var LAST = TOTAL - 1;
  var DAMP = 0.085;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // CSS shows the static fallback image instead

  var canvas = document.getElementById('hero-canvas');
  var runway = document.getElementById('home');
  if (!canvas || !runway) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var frames = new Array(TOTAL);
  var loaded = new Array(TOTAL).fill(false);
  var loadedCount = 0;

  var currentFrame = 0;
  var targetFrame = 0;

  function framePath(i) {
    return 'frames/frame_' + String(i).padStart(3, '0') + '.jpg';
  }

  function loadFrame(i) {
    if (frames[i]) return;
    var img = new Image();
    img.decoding = 'async';
    img.onload = function () {
      loaded[i] = true;
      loadedCount++;
      if (i === 0) draw(0); // paint the very first frame ASAP
    };
    img.src = framePath(i);
    frames[i] = img;
  }

  /* ---- Preload strategy ---- */
  function preload() {
    // 1) first 30 frames immediately
    for (var i = 0; i < 30 && i < TOTAL; i++) loadFrame(i);
    // 2) keyframes (every 8th) immediately for instant responsiveness
    for (var k = 0; k < TOTAL; k += 8) loadFrame(k);
    // 3) stream the remainder at idle
    var next = 30;
    var idle = window.requestIdleCallback || function (cb) { return setTimeout(function () { cb({ timeRemaining: function () { return 8; } }); }, 32); };
    function streamChunk(deadline) {
      while (next < TOTAL && (deadline.timeRemaining ? deadline.timeRemaining() > 1 : true)) {
        if (!frames[next]) loadFrame(next);
        next++;
      }
      if (next < TOTAL) idle(streamChunk);
    }
    idle(streamChunk);
  }

  /* ---- Nearest available frame (in case target hasn't streamed yet) ---- */
  function nearestLoaded(i) {
    if (loaded[i]) return i;
    for (var d = 1; d < TOTAL; d++) {
      if (i - d >= 0 && loaded[i - d]) return i - d;
      if (i + d < TOTAL && loaded[i + d]) return i + d;
    }
    return 0;
  }

  /* ---- Cover-fit draw ---- */
  function draw(index) {
    var i = nearestLoaded(Math.max(0, Math.min(LAST, Math.round(index))));
    var img = frames[i];
    if (!img || !loaded[i]) return;
    var cw = canvas.width, ch = canvas.height;
    var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    var dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    draw(currentFrame);
  }

  /* ---- Scroll progress ---- */
  function progress() {
    var rect = runway.getBoundingClientRect();
    var scrollable = runway.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    var p = (-rect.top) / scrollable;
    return Math.max(0, Math.min(1, p));
  }

  /* ---- Hero HUD + stage dispatch ----
     Text content for each stage is owned by i18n.js (BG/EN). Here we only
     drive the HUD (active number + progress bar) and announce stage changes
     via the 'aventis:herostage' event so i18n.js can render the copy. */
  var stageEl = document.querySelector('.hero-content-stage');
  var hudNums = Array.prototype.slice.call(document.querySelectorAll('.hud-num'));
  var hudFill = document.getElementById('hud-fill');
  var activeStage = -1;

  function setStage(s) {
    if (s === activeStage) return;
    activeStage = s;
    if (stageEl) {
      stageEl.classList.add('is-swapping');
      setTimeout(function () { stageEl.classList.remove('is-swapping'); }, 60);
    }
    hudNums.forEach(function (n, i) { n.classList.toggle('is-active', i === s); });
    document.dispatchEvent(new CustomEvent('aventis:herostage', { detail: { stage: s } }));
  }

  function updateContent(p) {
    var s = p < 0.33 ? 0 : (p < 0.67 ? 1 : 2);
    setStage(s);
    if (hudFill) hudFill.style.width = (15 + p * 85) + '%';
  }

  /* ---- RAF loop ---- */
  function tick() {
    targetFrame = progress() * LAST;
    currentFrame += (targetFrame - currentFrame) * DAMP;
    if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;
    draw(currentFrame);
    requestAnimationFrame(tick);
  }

  var scrollScheduled = false;
  function onScroll() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(function () { updateContent(progress()); scrollScheduled = false; });
  }

  /* ---- Init ---- */
  function init() {
    resize();
    preload();
    updateContent(progress());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
