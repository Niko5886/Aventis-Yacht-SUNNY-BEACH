/* =====================================================================
   AVENTIS — main.js
   Header, reveal, stat counters, fleet tabs, Swiper carousels,
   custom cursor, and modals (search / booking / yacht details).
   ===================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Header scrolled state + back-to-top ---------- */
    var header = document.getElementById('main-header');
    var toTop = document.getElementById('back-to-top');
    var heroRunway = document.getElementById('home');
    var btThreshold = 500;
    function computeThreshold() {
      // Reveal only once the hero runway is cleared, keeping the hero HUD uncluttered
      btThreshold = heroRunway ? Math.max(500, heroRunway.offsetHeight - window.innerHeight) : 500;
    }
    computeThreshold();
    window.addEventListener('resize', computeThreshold, { passive: true });

    function onScrollHeader() {
      var y = window.scrollY;
      // Transparent while over the hero (the sea); the dark bar returns once the
      // hero has scrolled past the header and content sections are in view.
      var heroBottom = heroRunway ? heroRunway.getBoundingClientRect().bottom : 0;
      header.classList.toggle('scrolled', heroBottom <= 40);
      if (toTop) toTop.classList.toggle('is-visible', y > btThreshold);
    }
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();

    if (toTop) {
      toTop.addEventListener('click', function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Mobile drawer ---------- */
    var navToggle = document.getElementById('nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    function closeDrawer() {
      drawer.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (navToggle && drawer) {
      navToggle.addEventListener('click', function () {
        var open = drawer.classList.toggle('is-open');
        navToggle.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
      });
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    }

    /* ---------- Reveal on scroll ---------- */
    var reveals = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !reduced) {
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { revObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------- Animated stat counters ---------- */
    var statsGrid = document.querySelector('.stats');
    function runCounters() {
      document.querySelectorAll('.stat-number').forEach(function (node) {
        var target = parseInt(node.getAttribute('data-target'), 10) || 0;
        var duration = 1800, start = null;
        function step(ts) {
          if (!start) start = ts;
          var prog = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - prog, 3); // easeOutCubic
          node.textContent = Math.round(eased * target);
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    if (statsGrid) {
      if ('IntersectionObserver' in window && !reduced) {
        var statObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { runCounters(); statObs.disconnect(); } });
        }, { threshold: 0.4 });
        statObs.observe(statsGrid);
      } else { runCounters(); }
    }

    /* ---------- Fleet tabs filter ---------- */
    var tabs = document.querySelectorAll('.fleet__tabs .tab');
    var cards = document.querySelectorAll('.yacht-card');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var f = tab.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = f === 'all' || card.getAttribute('data-cat') === f;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });

    /* ---------- Swiper: destinations ---------- */
    if (window.Swiper) {
      new Swiper('#destinations-slider', {
        slidesPerView: 1.08,
        spaceBetween: 16,
        speed: 800,
        grabCursor: true,
        navigation: { nextEl: '.dest-next-btn', prevEl: '.dest-prev-btn' },
        breakpoints: {
          481: { slidesPerView: 1.25, spaceBetween: 20 },
          769: { slidesPerView: 1.8, spaceBetween: 24 },
          993: { slidesPerView: 2.2, spaceBetween: 24 },
          1280: { slidesPerView: 2.8, spaceBetween: 32 }
        }
      });

      /* ---------- Swiper: testimonials ---------- */
      new Swiper('#testimonials-slider', {
        slidesPerView: 1,
        speed: 700,
        loop: true,
        autoplay: reduced ? false : { delay: 6000, disableOnInteraction: false },
        pagination: { el: '.test-pagination', clickable: true, bulletClass: 'swiper-pagination-bullet', bulletActiveClass: 'swiper-pagination-bullet-active' }
      });
    }

    /* ---------- Modals ---------- */
    var lastFocused = null;
    function openModal(modal) {
      if (!modal) return;
      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var focusable = modal.querySelector('input, button, select, textarea, a[href]');
      if (focusable) setTimeout(function () { focusable.focus(); }, 60);
    }
    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
    function closeAllModals() {
      document.querySelectorAll('.modal.is-open').forEach(closeModal);
    }

    var searchModal = document.getElementById('search-modal');
    var bookingModal = document.getElementById('booking-modal');
    var yachtModal = document.getElementById('yacht-modal');

    var searchOpen = document.getElementById('search-open');
    if (searchOpen) searchOpen.addEventListener('click', function () { openModal(searchModal); });

    document.querySelectorAll('[data-open-booking]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeAllModals(); openModal(bookingModal); });
    });

    document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(btn.closest('.modal')); });
    });

    // click on backdrop closes
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('mousedown', function (e) { if (e.target === modal) closeModal(modal); });
    });

    // Escape + focus trap
    document.addEventListener('keydown', function (e) {
      var open = document.querySelector('.modal.is-open');
      if (!open) return;
      if (e.key === 'Escape') { closeModal(open); return; }
      if (e.key === 'Tab') {
        var f = open.querySelectorAll('input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* ---------- Yacht details modal ---------- */
    // The whole card is clickable (mouse); the .round-arrow button keeps the
    // keyboard/screen-reader path — its click bubbles up so we bind once on the card.
    document.querySelectorAll('.yacht-card').forEach(function (card) {
      card.addEventListener('click', function openYacht() {
        // Read from the card's DOM so the modal reflects the active language
        var img = card.querySelector('.yacht-card__media img');
        var name = card.querySelector('h3').textContent;
        var ymImg = document.getElementById('ym-img');
        ymImg.src = img ? img.getAttribute('src') : card.getAttribute('data-img');
        ymImg.alt = name;
        document.getElementById('ym-tag').textContent = card.querySelector('.yacht-card__tag').textContent;
        document.getElementById('ym-name').textContent = name;
        document.getElementById('ym-specs').textContent = card.querySelector('.yacht-card__specs').textContent;
        document.getElementById('ym-rate').textContent = card.querySelector('.yacht-card__rate').textContent;
        openModal(yachtModal);
      });
    });

  });
})();
