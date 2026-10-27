/* Abdiwakil & Associates Advocates: site behaviour */
(function () {
  'use strict';

  // Current year in the footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shadow once the page is scrolled
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });

    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset when the window grows back to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) setOpen(false);
    });
  }

  // Enquiry form: send in the background and show a message on the page
  var form = document.getElementById('enquiry-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    var button = form.querySelector('button[type="submit"]');

    var show = function (message, type) {
      status.textContent = message;
      status.className = 'form-status ' + type;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation with clear messages
      var fields = form.querySelectorAll('[required]');
      var firstInvalid = null;
      fields.forEach(function (field) {
        var bad = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        if (!bad && field.type === 'email') bad = !field.checkValidity();
        field.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        show('Please complete the highlighted fields and tick the consent box.', 'err');
        firstInvalid.focus();
        return;
      }

      // Bots fill the hidden field; humans never see it
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      button.disabled = true;
      var originalLabel = button.textContent;
      button.textContent = 'Sending...';
      show('', '');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed');
          form.reset();
          show('Thank you. Your enquiry has been sent and we will be in touch shortly.', 'ok');
        })
        .catch(function () {
          show('Sorry, we could not send your enquiry. Please try again, or call +254 722 696225 or message us on WhatsApp.', 'err');
        })
        .then(function () {
          button.disabled = false;
          button.textContent = originalLabel;
        });
    });

    // Clear the error mark as people correct a field
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') {
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }
})();
