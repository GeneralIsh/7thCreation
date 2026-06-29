/* ============================================================
   7th Creation Studio — Main JavaScript
   Handles: sticky header, mobile nav, work filters,
            project drawer, quote form mailto builder.
   No external dependencies.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Project data — update copy and image paths here.
     Images live in images/work/
  ---------------------------------------------------------- */
  var projects = {
    'airport-launch': {
      category: 'Exhibition & Event Graphics',
      title: 'Airport Launch Graphics',
      type: 'Exhibition & Event Display',
      scope: 'Branded arch, launch signage, banner display, and event-ready installation.',
      production: 'Large-format print, fabric banner production, rigid signage, and on-site installation.',
      materials: 'Printed fabric banners, vinyl banners, rigid sign substrate',
      installation: 'Event install including branded arch structure and multiple banner positions across the venue.',
      images: [
        { src: 'images/work/airport-launch-1.jpg', alt: 'Airport launch event — branded arch and signage in place' },
        { src: 'images/work/airport-launch-2.jpg', alt: 'Airport launch — banner display and event graphics installation' }
      ]
    },
    'creator-house': {
      category: 'Environmental Graphics + Window Vinyl + Exterior Panels',
      title: 'Creator Space Graphics System',
      type: 'Environmental Graphics',
      scope: 'Exterior graphic panels, translucent window vinyl, opaque interior glass decals, floor graphics, cornhole decals, and ping-pong logo decals.',
      production: 'Large-format print, panel production, die-cut vinyl, transfer masking, and on-site installation.',
      materials: 'Exterior-grade vinyl, translucent window film, floor graphic laminate, die-cut vinyl decals',
      installation: 'Multi-surface install across exterior panels, interior glass, and floor areas.',
      images: [
        { src: 'images/work/creator-space-1.jpg', alt: 'Creator House exterior graphic panels and window vinyl' },
        { src: 'images/work/creator-space-2.jpg', alt: 'Creator House interior glass decals and floor graphics' }
      ]
    },
    'hotel-lobby': {
      category: 'Hospitality Graphics',
      title: 'Hotel Lobby Welcome Graphics',
      type: 'Large-Format Hospitality Display',
      scope: 'Large-format balcony graphics produced and installed for a hospitality event environment.',
      production: 'Wide-format print, mounting, and on-site installation.',
      materials: 'Fabric or vinyl banner substrate with mounting hardware',
      installation: 'Balcony graphic installation for an event environment at Marriott Oakland City Center.',
      images: [
        { src: 'images/work/hotel-lobby-1.jpg', alt: 'Hotel lobby welcome graphics — balcony banner installation' },
        { src: 'images/work/hotel-lobby-2.jpg', alt: 'Large-format hospitality graphics in venue environment' }
      ]
    },
    'retail-window': {
      category: 'Retail Storefront Graphics',
      title: 'Retail Window Takeover',
      type: 'Retail & Storefront Graphics',
      scope: 'High-visibility storefront graphics and window branding for street-level retail.',
      production: 'Window vinyl print, die-cut, transfer tape, and installation.',
      materials: 'Clear window vinyl, opaque window vinyl, die-cut vinyl decals',
      installation: 'Street-level storefront window installation.',
      images: [
        { src: 'images/work/retail-window-1.jpg', alt: 'Retail storefront window takeover — full window coverage' },
        { src: 'images/work/retail-window-2.jpg', alt: 'Window branding installation for street-level retail' }
      ]
    },
    'vehicle-transit': {
      category: 'Vehicle & Transit Graphics',
      title: 'Vehicle & Transit Graphics',
      type: 'Vehicle Wraps & Transit Graphics',
      scope: 'Vehicle wraps, transit graphics, and mobile brand visibility.',
      production: 'Vehicle wrap print and laminate, contour cutting, and application.',
      materials: 'Cast vinyl wrap film with protective overlaminate',
      installation: 'Vehicle application with surface preparation, contour cutting, and wrap installation.',
      images: [
        { src: 'images/work/vehicle-transit-1.jpg', alt: 'Vehicle wrap — full-coverage mobile brand graphics' },
        { src: 'images/work/vehicle-transit-2.jpg', alt: 'Transit graphics — fleet branding in the field' }
      ]
    },
    'label-production': {
      category: 'Print Production',
      title: 'Label Production',
      type: 'Product Labels & Print Production',
      scope: 'High-volume printed labels with consistent color and production-ready finishing.',
      production: 'Digital label print, die-cut, and production-ready output.',
      materials: 'Label stock with matte, gloss, or vinyl finish options',
      installation: null,
      images: [
        { src: 'images/work/label-production-1.jpg', alt: 'Printed product labels — consistent color output at volume' },
        { src: 'images/work/label-production-2.jpg', alt: 'Label production — die-cut and finishing output' }
      ]
    },
    'branded-kits': {
      category: 'Apparel & Custom Print',
      title: 'Branded Kits & Apparel',
      type: 'Apparel, DTF & Custom Print',
      scope: 'Custom packaging, apparel, labels, decals, and promotional print pieces.',
      production: 'DTF transfers, apparel print, packaging production, die-cut vinyl decals.',
      materials: 'DTF transfer film, garment blanks, packaging stock, vinyl decals',
      installation: null,
      images: [
        { src: 'images/work/branded-kits-1.jpg', alt: 'Branded kits — custom apparel, labels, and packaging' },
        { src: 'images/work/branded-kits-2.jpg', alt: 'DTF apparel print and promotional print pieces' }
      ]
    }
  };

  /* ----------------------------------------------------------
     Sticky header
  ---------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     Mobile navigation
  ---------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openNav() {
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (mobileNav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  /* ----------------------------------------------------------
     Work portfolio filter
  ---------------------------------------------------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workTiles = document.querySelectorAll('.work-tile');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.dataset.filter;

      // Update button states
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      // Show / hide tiles
      workTiles.forEach(function (tile) {
        var match = filter === 'all' || tile.dataset.category === filter;
        tile.classList.toggle('is-hidden', !match);
        tile.setAttribute('aria-hidden', match ? 'false' : 'true');
      });
    });
  });

  /* ----------------------------------------------------------
     Project drawer
  ---------------------------------------------------------- */
  var drawer = document.getElementById('project-drawer');
  var drawerContent = document.getElementById('drawer-content');
  var drawerClose = document.getElementById('drawer-close');
  var drawerOverlay = document.getElementById('drawer-overlay');
  var lastFocused = null;

  function buildDrawerHTML(project) {
    var imagesHTML = project.images.map(function (img) {
      return '<img src="' + img.src + '" alt="' + img.alt + '" loading="lazy">';
    }).join('');

    var rows = [
      { dt: 'Project Type', dd: project.type },
      { dt: 'Scope', dd: project.scope },
      { dt: 'Production', dd: project.production },
      { dt: 'Materials', dd: project.materials }
    ];

    if (project.installation) {
      rows.push({ dt: 'Installation', dd: project.installation });
    }

    var rowsHTML = rows.map(function (row) {
      return '<div class="drawer-detail-row"><dt>' + row.dt + '</dt><dd>' + row.dd + '</dd></div>';
    }).join('');

    return (
      '<div class="drawer-images">' + imagesHTML + '</div>' +
      '<span class="drawer-category">' + project.category + '</span>' +
      '<h2 class="drawer-title">' + project.title + '</h2>' +
      '<dl class="drawer-details">' + rowsHTML + '</dl>' +
      '<div class="drawer-actions">' +
        '<a href="#quote" class="btn btn-primary" id="drawer-quote-link">Request a Similar Quote</a>' +
      '</div>'
    );
  }

  function openDrawer(projectId) {
    var project = projects[projectId];
    if (!project) return;

    lastFocused = document.activeElement;
    drawerContent.innerHTML = buildDrawerHTML(project);
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawerClose.focus();

    // Close drawer when internal quote link is clicked
    var quoteLink = document.getElementById('drawer-quote-link');
    if (quoteLink) {
      quoteLink.addEventListener('click', closeDrawer);
    }
  }

  function closeDrawer() {
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) {
      lastFocused.focus();
    }
  }

  // Open on tile click (any part of tile)
  workTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      openDrawer(this.dataset.project);
    });

    // Keyboard: Enter or Space
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDrawer(this.dataset.project);
      }
    });
  });

  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
      closeDrawer();
    }
  });

  /* ----------------------------------------------------------
     Quote form — build mailto on submit
  ---------------------------------------------------------- */
  var quoteForm = document.getElementById('quote-form');

  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name       = document.getElementById('q-name').value.trim();
    var company    = document.getElementById('q-company').value.trim();
    var email      = document.getElementById('q-email').value.trim();
    var phone      = document.getElementById('q-phone').value.trim();
    var need       = document.getElementById('q-need').value.trim();
    var size       = document.getElementById('q-size').value.trim();
    var qty        = document.getElementById('q-qty').value.trim();
    var deadline   = document.getElementById('q-deadline').value.trim();
    var location   = document.getElementById('q-location').value.trim();
    var environment = document.getElementById('q-environment').value;
    var artwork    = document.getElementById('q-artwork').value;
    var install    = document.getElementById('q-install').value;
    var file       = document.getElementById('q-file').value.trim();
    var notes      = document.getElementById('q-notes').value.trim();

    // Basic validation
    if (!name) {
      document.getElementById('q-name').focus();
      return;
    }
    if (!email) {
      document.getElementById('q-email').focus();
      return;
    }
    if (!need) {
      document.getElementById('q-need').focus();
      return;
    }

    var lines = [
      'Name: ' + name,
      'Company: ' + (company || 'N/A'),
      'Email: ' + email,
      'Phone: ' + (phone || 'N/A'),
      '',
      'What do you need?',
      need,
      '',
      'Size / Dimensions: ' + (size || 'TBD'),
      'Quantity: ' + (qty || 'TBD'),
      'Deadline: ' + (deadline || 'TBD'),
      'Location: ' + (location || 'TBD'),
      'Indoor or outdoor: ' + (environment || 'TBD'),
      'Artwork ready: ' + (artwork || 'TBD'),
      'Install needed: ' + (install || 'TBD'),
      'File / Artwork link: ' + (file || 'N/A'),
      '',
      'Notes:',
      (notes || 'None'),
      '',
      '---',
      'Sent via 7thcreation.com'
    ];

    var subject = encodeURIComponent('Quote Request — 7th Creation Studio');
    var body    = encodeURIComponent(lines.join('\n'));

    window.location.href = 'mailto:studio@7thcreation.com?subject=' + subject + '&body=' + body;
  });

  /* ----------------------------------------------------------
     Footer: auto-update copyright year
  ---------------------------------------------------------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     Smooth scroll polyfill for older Safari (optional)
     Only runs if scroll-behavior: smooth is not supported.
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      // Native smooth scroll (CSS handles it) — only intercept for offset
      e.preventDefault();
      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
