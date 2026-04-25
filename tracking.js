(function () {
  if (typeof window === 'undefined') return;

  function fire(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!href) return;

    // tel: links are tracked via inline onclick on each <a> tag (call_click event)

    if (href.indexOf('mailto:') === 0) {
      fire('email_click', {
        email: href.replace('mailto:', '').split('?')[0],
        cta_location: window.location.pathname,
        link_text: (a.textContent || '').trim().slice(0, 80)
      });
      return;
    }

    if (/contact-us\.html/.test(href)) {
      fire('cta_click', {
        cta_target: 'contact-us',
        cta_text: (a.textContent || '').trim().slice(0, 80),
        cta_href: href,
        cta_location: window.location.pathname
      });
      return;
    }

    if (/make-a-payment\.html/.test(href)) {
      fire('payment_click', {
        cta_text: (a.textContent || '').trim().slice(0, 80),
        cta_location: window.location.pathname
      });
    }
  });
})();
