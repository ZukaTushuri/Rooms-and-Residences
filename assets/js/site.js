/* ROOMS & RESIDENCES — site behaviour
   Shared header/footer injection + interactions.
   In production these partials would be server/CMS-rendered; injected here
   to keep the static prototype DRY and consistent.

   Analytics: Replace GA_MEASUREMENT_ID below with your GA4 ID.
   CRM: Replace the catalogue form stub with a POST to your CRM endpoint. */

// Google Analytics 4 — replace GA_MEASUREMENT_ID
// (function(){ var s=document.createElement('script'); s.async=true;
//   s.src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
//   document.head.appendChild(s); window.dataLayer=window.dataLayer||[];
//   function gtag(){dataLayer.push(arguments);} gtag('js',new Date());
//   gtag('config','GA_MEASUREMENT_ID'); })();

(function () {
  'use strict';

  const NAV = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['products.html', 'Products &amp; Solutions'],
    ['services.html', 'Services'],
    ['sectors.html', 'Sectors'],
    ['projects.html', 'Projects'],
    ['partners.html', 'Brands &amp; Partners'],
    ['contact.html', 'Contact'],
  ];

  const page = document.body.dataset.page || '';

  /* ---------- Header ---------- */
  function buildHeader() {
    const links = NAV.map(([href, label]) => {
      const current = href === page ? ' aria-current="page"' : '';
      return `<a href="${href}"${current}>${label}</a>`;
    }).join('');

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="Rooms &amp; Residences home">
        <b>Rooms &amp; Residences</b>
        <span>Interior &amp; Architectural Solutions</span>
      </a>
      <nav class="nav" aria-label="Primary">
        ${links}
        <a class="nav-cta" href="#" data-modal-open>Request Catalogue</a>
      </nav>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
    `;
    document.body.prepend(header);

    const toggle = header.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.nav a').forEach(a =>
      a.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );

    // Solid header on scroll (or always solid if page requests it)
    const forceSolid = document.body.dataset.solidHeader === 'true';
    const onScroll = () => header.classList.toggle('solid', forceSolid || window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    const col = (title, items) =>
      `<div><h4>${title}</h4><ul>${items.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="foot-grid">
          <div class="foot-brand">
            <b>Rooms &amp; Residences</b>
            <p>End-to-end interior &amp; architectural solutions — from concept and sourcing to installation and turnkey completion.</p>
            <div class="socials" style="margin-top:1.6rem">
              ${social('Instagram','M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.96-11.4a1.58 1.58 0 1 0 0 3.15 1.58 1.58 0 0 0 0-3.15Z')}
              ${social('LinkedIn','M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.49 2.49 0 0 1 4.98 3.5ZM3 8.98h4V21H3ZM9.5 8.98h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.34c0-1.27-.02-2.91-1.77-2.91-1.78 0-2.05 1.39-2.05 2.82V21h-4Z')}
              ${social('Pinterest','M12 2a10 10 0 0 0-3.65 19.31c-.05-.79-.09-2 .02-2.86.1-.78.66-4.97.66-4.97s-.17-.34-.17-.84c0-.79.46-1.38 1.03-1.38.49 0 .72.37.72.8 0 .49-.31 1.22-.47 1.9-.13.57.29 1.03.85 1.03 1.02 0 1.8-1.08 1.8-2.63 0-1.37-.99-2.33-2.4-2.33a2.49 2.49 0 0 0-2.6 2.5c0 .5.19.83.39 1.18.07.11.08.16.06.28-.02.08-.08.32-.1.41-.04.13-.13.18-.29.11-.81-.33-1.18-1.21-1.18-2.2 0-1.64 1.38-3.6 4.12-3.6 2.2 0 3.65 1.59 3.65 3.3 0 2.26-1.26 3.95-3.11 3.95-.62 0-1.21-.34-1.41-.72l-.38 1.52c-.14.53-.51 1.19-.77 1.6A10 10 0 1 0 12 2Z')}
            </div>
          </div>
          ${col('Explore', [['products.html','Products &amp; Solutions'],['services.html','Services'],['sectors.html','Sectors'],['projects.html','Projects']])}
          ${col('Company', [['about.html','About'],['partners.html','Brands &amp; Partners'],['contact.html','Contact']])}
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="tel:+995322000000">+995 (32) 200 0000</a></li>
              <li><a href="mailto:hello@roomsandresidences.com">hello@roomsandresidences.com</a></li>
              <li>Tbilisi, Georgia</li>
              <li><a href="#" data-modal-open>Request Catalogue →</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© ${new Date().getFullYear()} Rooms &amp; Residences. All rights reserved.</span>
          <span>Georgia-based · China-sourced · Delivered locally</span>
        </div>
      </div>`;
    document.body.appendChild(footer);
  }
  function social(label, d) {
    return `<a href="#" aria-label="${label}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg></a>`;
  }

  /* ---------- Catalogue modal ---------- */
  function buildModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'catalogue-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cat-title');
    modal.innerHTML = `
      <div class="modal__overlay" data-modal-close></div>
      <div class="modal__panel">
        <button class="modal__close" data-modal-close aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <aside class="modal__aside">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80" alt="" onerror="this.remove()">
          <div>
            <span class="eyebrow" style="color:var(--brass-bright)">Catalogues</span>
            <h3>The Rooms &amp; Residences Collection</h3>
          </div>
          <ul>
            <li>Furniture — Residential &amp; Hospitality</li>
            <li>Lighting — Decorative &amp; Architectural</li>
            <li>Materials &amp; Finishes</li>
            <li>Kitchens &amp; Storage</li>
            <li>Hospitality Solutions</li>
          </ul>
        </aside>
        <div class="modal__form">
          <form id="catalogue-form" novalidate>
            <span class="eyebrow">Request Access</span>
            <h3 id="cat-title" style="font-size:1.9rem;margin:.7rem 0 1.4rem">Download the catalogue</h3>
            <div class="field"><label for="c-name">Full name *</label><input id="c-name" name="name" required autocomplete="name"></div>
            <div class="field row">
              <div><label for="c-email">Email *</label><input id="c-email" name="email" type="email" required autocomplete="email"></div>
              <div><label for="c-phone">Phone *</label><input id="c-phone" name="phone" type="tel" required autocomplete="tel"></div>
            </div>
            <div class="field"><label for="c-company">Company (optional)</label><input id="c-company" name="company" autocomplete="organization"></div>
            <div class="field"><label for="c-cat">Catalogue of interest</label>
              <select id="c-cat" name="catalogue">
                <option>Full Collection</option><option>Furniture</option><option>Lighting</option>
                <option>Materials &amp; Finishes</option><option>Kitchens &amp; Storage</option><option>Hospitality Solutions</option>
              </select>
            </div>
            <button type="submit" class="btn" style="width:100%;justify-content:center">Send me the catalogue <span class="arrow">→</span></button>
            <p class="form-note">By submitting, you agree to be contacted by our team. We respect your privacy.</p>
          </form>
          <div class="form-success" id="catalogue-success">
            <div class="check"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>
            <h3 style="font-size:1.7rem">Thank you</h3>
            <p class="lead" style="margin:.6rem auto 1.4rem">Your catalogue is on its way to your inbox. Our team will follow up shortly.</p>
            <a class="link-arrow" href="#" id="download-now">Download PDF now <span class="arrow">↓</span></a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const open = () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => modal.querySelector('input')?.focus(), 220);
    };
    const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };

    document.addEventListener('click', e => {
      const opener = e.target.closest('[data-modal-open]');
      if (opener) {
        e.preventDefault();
        const cat = opener.dataset.catalogue;
        const titleEl = modal.querySelector('#cat-title');
        const sel = modal.querySelector('#c-cat');
        if (cat && sel) {
          const match = [...sel.options].find(o => o.text.includes(cat));
          if (match) sel.value = match.value;
          if (titleEl) titleEl.textContent = `Request the ${cat} catalogue`;
        } else {
          if (sel) sel.selectedIndex = 0;
          if (titleEl) titleEl.textContent = 'Download the catalogue';
        }
        open();
      }
      if (e.target.closest('[data-modal-close]')) { close(); }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    const form = modal.querySelector('#catalogue-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      // Stub: in production POST to CRM / lead-capture endpoint here.
      setTimeout(() => {
        form.classList.add('is-hidden');
        modal.querySelector('#catalogue-success').classList.add('show');
      }, 700);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in')); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));

    // process step bars
    const steps = document.querySelectorAll('.step');
    if (steps.length) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach((en, i) => { if (en.isIntersecting) { en.target.classList.add('in'); so.unobserve(en.target); } });
      }, { threshold: 0.4 });
      steps.forEach(s => so.observe(s));
    }
  }

  /* ---------- Project filter ---------- */
  function filter() {
    const bar = document.querySelector('.filter-bar');
    if (!bar) return;
    const items = document.querySelectorAll('[data-sector]');
    bar.addEventListener('click', e => {
      const btn = e.target.closest('button'); if (!btn) return;
      bar.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
      const f = btn.dataset.filter;
      items.forEach(it => {
        const show = f === 'all' || it.dataset.sector === f;
        it.classList.toggle('hide', !show);
      });
    });
  }

  /* ---------- Generic contact form ---------- */
  function contactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(() => {
        form.classList.add('is-hidden');
        document.querySelector('#contact-success')?.classList.add('show');
      }, 700);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    buildModal();
    reveal();
    filter();
    contactForm();
    // year
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  });
})();
