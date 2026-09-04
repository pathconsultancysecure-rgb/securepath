document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Stat counter animation ---------- */
  var counters = document.querySelectorAll('[data-count]');
  var countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var current = 0;
      var duration = 1100;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  var heroTrust = document.querySelector('.hero-trust');
  if (heroTrust && 'IntersectionObserver' in window) {
    var trustObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          trustObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    trustObserver.observe(heroTrust);
  } else {
    animateCounters();
  }

  /* ---------- Scroll-in reveal for section headers/cards ---------- */
  var revealTargets = document.querySelectorAll(
    '.leader-card, .service-card, .trust-card, .testimonial-card, .process-step, .faq-item'
  );
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Modals (Privacy / Terms) ---------- */
  var openTriggers = document.querySelectorAll('[data-open-modal]');
  var closeTriggers = document.querySelectorAll('[data-close-modal]');

  openTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById(btn.getAttribute('data-open-modal'));
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  closeTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.is-open').forEach(function (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      });
    }
  });

  /* ---------- Appointment form: also offer WhatsApp handoff with filled data ---------- */
  var form = document.getElementById('appointmentForm');
  var waFormLink = document.getElementById('waFormLink');
  if (form && waFormLink) {
    form.addEventListener('input', function () {
      var name = form.querySelector('[name="Name"]').value.trim();
      var mobile = form.querySelector('[name="Mobile"]').value.trim();
      var service = form.querySelector('[name="Service"]').value;
      var message = form.querySelector('[name="Message"]').value.trim();

      var text = 'Hi, I would like to book a consultation.\n' +
        'Name: ' + (name || '-') + '\n' +
        'Mobile: ' + (mobile || '-') + '\n' +
        'Interested in: ' + service + '\n' +
        'Message: ' + (message || '-');

      waFormLink.href = 'https://wa.me/917300070456?text=' + encodeURIComponent(text);
    });
  }

});
