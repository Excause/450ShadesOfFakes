/**
 * main.js — 450ShadesOfFakes
 * Hash-basierter SPA-Router + alle UI-Logik
 */
'use strict';

// ─── Helpers ──────────────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const app = () => $('#app');

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function badgeHtml(katId) {
  const kat = KATEGORIEN.find(k => k.id === katId);
  if (!kat) return '';
  return `<span class="badge badge--${esc(katId)}">${esc(kat.label)}</span>`;
}

function statusBadgeHtml(status) {
  return `<span class="status-badge status-badge--${esc(status)}">${status === 'aktiv' ? 'Aktiv' : 'Inaktiv'}</span>`;
}

function isNew(dateStr) {
  if (!dateStr) return false;
  const diff = (Date.now() - new Date(dateStr + 'T00:00:00').getTime()) / 86400000;
  return diff <= 30;
}

function getPersonById(id)      { return PERSONEN.find(p => p.id === id); }
function getArtikelBySlug(slug) { return BEITRAEGE.find(b => b.slug === slug); }

function navigate(hash) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Theme ────────────────────────────────────────────────────────
(function initTheme() {
  const html = document.documentElement;
  const btn  = $('#theme-toggle');
  const icon = btn.querySelector('.theme-toggle__icon');

  const saved = localStorage.getItem('450sof-theme');
  const pref  = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  apply(saved || pref);

  btn.addEventListener('click', () => {
    apply(html.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  function apply(t) {
    html.setAttribute('data-theme', t);
    icon.textContent  = t === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', t === 'dark' ? 'Helles Design' : 'Dunkles Design');
    localStorage.setItem('450sof-theme', t);
  }
})();

// ─── Mobile Nav ───────────────────────────────────────────────────
(function initNav() {
  const hamburger = $('#hamburger');
  const menu      = $('#nav-menu');

  hamburger.addEventListener('click', toggle);
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== hamburger)
      close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  $$('.nav__link').forEach(l => l.addEventListener('click', close));

  function toggle() {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function close() {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
})();

// ─── Header Scroll ────────────────────────────────────────────────
(function initScroll() {
  const header = $('#header');
  const bar    = $('#scroll-progress');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct.toFixed(1) + '%';
  }, { passive: true });
})();

// ─── Active Nav Link ──────────────────────────────────────────────
function setActiveNav(page) {
  $$('.nav__link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
}

// ─── Router ───────────────────────────────────────────────────────
function router() {
  const raw    = (window.location.hash || '#home').slice(1);
  const parts  = raw.split('/');
  const page   = parts[0] || 'home';
  const param  = parts[1] || '';

  switch (page) {
    case 'home':       setActiveNav('home');       renderHome();           break;
    case 'personen':   setActiveNav('personen');   renderPersonen();       break;
    case 'person':     setActiveNav('personen');   renderPerson(param);    break;
    case 'beitraege':  setActiveNav('beitraege');  renderBeitraege();      break;
    case 'beitrag':    setActiveNav('beitraege');  renderBeitrag(param);   break;
    case 'ueber':      setActiveNav('ueber');      renderUeber();          break;
    default:           renderNotFound();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// ─── Page: Home ───────────────────────────────────────────────────
function renderHome() {
  const latestArticles = [...BEITRAEGE]
    .sort((a, b) => new Date(b.datum) - new Date(a.datum))
    .slice(0, 6);

  const featuredPersons = PERSONEN.slice(0, 8);

  const stats = [
    { number: PERSONEN.length,  label: 'Betroffene Personen' },
    { number: BEITRAEGE.length, label: 'Veröffentlichte Beiträge' },
    { number: KATEGORIEN.length, label: 'Kategorien' },
    { number: PERSONEN.filter(p => p.status === 'aktiv').length, label: 'Aktive Fälle' },
  ];

  app().innerHTML = `
    <div class="home-hero">
      <div class="container">
        <div class="home-hero__eyebrow">
          <span class="home-hero__alert">Investigativ-Plattform</span>
        </div>
        <h1 class="home-hero__title fade-up">
          450<span>Shades</span>OfFakes
        </h1>
        <p class="home-hero__sub fade-up fade-up--d1">
          Gefälschte GoFundMe Kampanien, inszinierte Ki unfälle, gebottete Abonennten und Fake Insta Stories. 
          Hier findest du Recherchen zu <a href="https://instagram.com/jxn4fifty" target="_blank">Jxn4fifty</a> und <a href="https://instagram.com/lxca4fifty/" target="_blank">lxca4fifty</a>
        </p>
        <div class="home-hero__actions fade-up fade-up--d2">
          <a href="#personen" class="btn btn--primary">Alle Personen ansehen →</a>
          <a href="#beitraege" class="btn btn--outline">Beiträge lesen</a>
        </div>
      </div>
    </div>

    <div class="page">
      <div class="container">

        <div class="stats-bar fade-up">
          ${stats.map(s => `
            <div class="stat-item">
              <span class="stat-item__number">${s.number}</span>
              <span class="stat-item__label">${esc(s.label)}</span>
            </div>
          `).join('')}
        </div>

        <div class="home-section">
          <div class="home-section__header">
            <h2 class="section-title">Neueste Beiträge</h2>
            <a href="#beitraege" class="btn btn--ghost">Alle ansehen →</a>
          </div>
          <div class="home-articles-grid">
            ${latestArticles.map(renderArtikelKarte).join('')}
          </div>
        </div>

        <div class="home-section">
          <div class="home-section__header">
            <h2 class="section-title">Personen</h2>
            <a href="#personen" class="btn btn--ghost">Alle 23 →</a>
          </div>
          <div class="home-persons-row">
            ${featuredPersons.map(p => `
              <a href="#person/${esc(p.id)}" class="person-card fade-up">
                <div class="person-card__avatar">${esc(p.initials)}</div>
                <div>
                  <div class="person-card__name">${esc(p.name)}</div>
                  <div class="person-card__position">${esc(p.position)}</div>
                </div>
                <div class="person-card__meta">
                  ${statusBadgeHtml(p.status)}
                  <span class="person-card__articles">${p.beitraege.length} Beitr.</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  // Delegated click handler for article cards
  app().addEventListener('click', handleCardClick);
}

// ─── Page: Personen-Übersicht ──────────────────────────────────────
function renderPersonen() {
  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="page__header">
          <p class="page__tag">Recherche</p>
          <h1 class="page__title">Personen</h1>
          <p class="page__subtitle">${PERSONEN.length} dokumentierte Personen — klicke auf eine Karte für den vollständigen Steckbrief.</p>
        </div>

        <div class="persons-controls">
          <div class="filter-group" id="persons-filter">
            <button class="filter-btn active" data-filter="all">Alle (${PERSONEN.length})</button>
            <button class="filter-btn" data-filter="aktiv">Aktiv (${PERSONEN.filter(p=>p.status==='aktiv').length})</button>
            <button class="filter-btn" data-filter="inaktiv">Inaktiv (${PERSONEN.filter(p=>p.status==='inaktiv').length})</button>
            ${KATEGORIEN.map(k => {
              const c = PERSONEN.filter(p => p.kategorien.includes(k.id)).length;
              return c ? `<button class="filter-btn" data-filter="${esc(k.id)}">${esc(k.label)} (${c})</button>` : '';
            }).join('')}
          </div>
          <div class="search-input">
            <span class="search-input__icon">🔍</span>
            <input type="text" id="persons-search" placeholder="Person suchen…" aria-label="Personen suchen" />
          </div>
        </div>

        <div class="persons-grid" id="persons-grid">
          ${PERSONEN.map(p => `
            <a href="#person/${esc(p.id)}" class="person-card" data-status="${esc(p.status)}" data-kategorien="${esc(p.kategorien.join(','))}">
              <div class="person-card__avatar">${esc(p.initials)}</div>
              <div>
                <div class="person-card__name">${esc(p.name)}</div>
                <div class="person-card__position">${esc(p.position)}</div>
              </div>
              <div class="person-card__meta">
                ${statusBadgeHtml(p.status)}
                <span class="person-card__articles">${p.beitraege.length} Beitr.</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  initPersonenFilter();
}

function initPersonenFilter() {
  const grid   = $('#persons-grid');
  const search = $('#persons-search');
  const filter = $('#persons-filter');
  if (!grid) return;

  let activeFilter = 'all';
  let searchTerm   = '';

  function update() {
    const cards = $$('.person-card', grid);
    cards.forEach(card => {
      const name = card.querySelector('.person-card__name')?.textContent.toLowerCase() || '';
      const pos  = card.querySelector('.person-card__position')?.textContent.toLowerCase() || '';
      const matchSearch = !searchTerm || name.includes(searchTerm) || pos.includes(searchTerm);
      const matchFilter = activeFilter === 'all'
        || card.dataset.status === activeFilter
        || (card.dataset.kategorien || '').split(',').includes(activeFilter);
      card.classList.toggle('hidden', !matchSearch || !matchFilter);
    });
  }

  filter.addEventListener('click', e => {
    if (!e.target.matches('.filter-btn')) return;
    $$('.filter-btn', filter).forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    activeFilter = e.target.dataset.filter;
    update();
  });

  search?.addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase().trim();
    update();
  });
}

// ─── Page: Steckbrief (Einzelperson) ──────────────────────────────
function renderPerson(id) {
  const person = getPersonById(id);
  if (!person) { renderNotFound(); return; }

  const relatedArticles = BEITRAEGE.filter(b => person.beitraege.includes(b.slug) || b.personen.includes(id));

  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#personen">Personen</a>
          <span class="breadcrumb__sep">/</span>
          <span>${esc(person.name)}</span>
        </div>

        <div class="steckbrief">
          <div class="steckbrief__header">
            <div class="steckbrief__avatar">${esc(person.initials)}</div>
            <div class="steckbrief__info">
              <h1 class="steckbrief__name">${esc(person.name)}</h1>
              <p class="steckbrief__position">${esc(person.position)}</p>
              <div class="steckbrief__badges">
                ${statusBadgeHtml(person.status)}
                ${person.alias ? `<span class="badge badge--sonstiges">Alias: ${esc(person.alias)}</span>` : ''}
                ${person.kategorien.map(badgeHtml).join('')}
              </div>
            </div>
          </div>

          <div class="steckbrief__body">
            <div>
              <div class="steckbrief__card">
                <div class="steckbrief__card-title">Beschreibung</div>
                <p class="steckbrief__beschreibung">${esc(person.beschreibung)}</p>

                ${person.fakten.length ? `
                  <div class="steckbrief__card-title" style="margin-top:1.5rem">Dokumentierte Fakten</div>
                  <div class="steckbrief__fakten">
                    ${person.fakten.map(f => `<div class="steckbrief__fakt">${esc(f)}</div>`).join('')}
                  </div>
                ` : `<p style="color:var(--clr-text-muted);font-size:0.875rem">Noch keine Fakten eingetragen.</p>`}
              </div>
            </div>

            <div class="steckbrief__sidebar">
              <div class="steckbrief__card">
                <div class="steckbrief__card-title">Verknüpfte Beiträge</div>
                ${relatedArticles.length ? `
                  <div class="steckbrief__related-list">
                    ${relatedArticles.map(b => `
                      <a href="#beitrag/${esc(b.slug)}" class="steckbrief__related-link">
                        ${esc(b.titel)}
                      </a>
                    `).join('')}
                  </div>
                ` : `<p style="color:var(--clr-text-muted);font-size:0.8rem">Keine Beiträge verknüpft.</p>`}
              </div>

              <div class="steckbrief__card">
                <div class="steckbrief__card-title">Kategorien</div>
                <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
                  ${person.kategorien.map(badgeHtml).join('')}
                </div>
              </div>

              <a href="#personen" class="btn btn--outline btn--sm" style="text-align:center">← Alle Personen</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Page: Beiträge-Übersicht ──────────────────────────────────────
function renderBeitraege() {
  const sorted = [...BEITRAEGE].sort((a, b) => new Date(b.datum) - new Date(a.datum));

  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="page__header">
          <p class="page__tag">Recherchen</p>
          <h1 class="page__title">Beiträge</h1>
          <p class="page__subtitle">${BEITRAEGE.length} veröffentlichte Beiträge</p>
        </div>

        <div class="filter-group" id="artikel-filter">
          <button class="filter-btn active" data-filter="all">Alle (${BEITRAEGE.length})</button>
          ${KATEGORIEN.map(k => {
            const c = BEITRAEGE.filter(b => b.kategorie === k.id).length;
            return c ? `<button class="filter-btn" data-filter="${esc(k.id)}">${esc(k.label)} (${c})</button>` : '';
          }).join('')}
        </div>

        <div class="artikel-grid" id="artikel-grid">
          ${sorted.map(renderArtikelKarte).join('')}
        </div>
      </div>
    </div>
  `;

  initArtikelFilter();
  app().addEventListener('click', handleCardClick);
}

function initArtikelFilter() {
  const filter = $('#artikel-filter');
  const grid   = $('#artikel-grid');
  if (!filter || !grid) return;

  filter.addEventListener('click', e => {
    if (!e.target.matches('.filter-btn')) return;
    $$('.filter-btn', filter).forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const f = e.target.dataset.filter;
    $$('.artikel-card', grid).forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.kategorie !== f);
    });
  });
}

// ─── Page: Einzelner Beitrag ───────────────────────────────────────
function renderBeitrag(slug) {
  const beitrag = getArtikelBySlug(slug);
  if (!beitrag) { renderNotFound(); return; }

  const linkedPersons = beitrag.personen
    .map(getPersonById)
    .filter(Boolean);

  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#beitraege">Beiträge</a>
          <span class="breadcrumb__sep">/</span>
          <span>${esc(beitrag.titel)}</span>
        </div>

        <article class="artikel-detail">
          <header class="artikel-detail__header">
            <div class="artikel-detail__meta">
              ${badgeHtml(beitrag.kategorie)}
              ${isNew(beitrag.datum) ? '<span class="badge--neu">NEU</span>' : ''}
              <span class="artikel-detail__date">${fmtDate(beitrag.datum)}</span>
            </div>
            <h1 class="artikel-detail__title">${esc(beitrag.titel)}</h1>
            <p class="artikel-detail__summary">${esc(beitrag.zusammenfassung)}</p>
          </header>

          <hr class="divider" />

          <div class="artikel-detail__body">
            ${beitrag.inhalt}
          </div>

          ${linkedPersons.length ? `
            <div class="artikel-detail__persons">
              <div class="artikel-detail__persons-label">Betroffene Personen</div>
              <div class="artikel-detail__persons-list">
                ${linkedPersons.map(p => `
                  <a href="#person/${esc(p.id)}" class="person-chip">
                    <span style="font-weight:700;font-family:var(--font-mono)">${esc(p.initials)}</span>
                    ${esc(p.name)}
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--clr-border)">
            <a href="#beitraege" class="btn btn--outline btn--sm">← Alle Beiträge</a>
          </div>
        </article>
      </div>
    </div>
  `;
}

// ─── Page: Über das Projekt ────────────────────────────────────────
function renderUeber() {
  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="page__header">
          <p class="page__tag">Über uns</p>
          <h1 class="page__title">Über das Projekt</h1>
        </div>

        <div class="ueber-content">
          <p>
            <strong>450ShadesOfFakes</strong> ist eine unabhängige Recherche-Plattform.
            Unser Ziel ist die öffentliche Dokumentation von Missständen auf Basis
            belegter Fakten.
          </p>

          <h3>// Unser Ansatz</h3>
          <p>
            Jeder Beitrag auf dieser Plattform basiert auf dokumentierten Quellen.
            Wir veröffentlichen ausschließlich Informationen, die durch Belege gestützt
            werden können. Spekulation und Meinungen werden als solche gekennzeichnet.
          </p>

          <h3>// Die 23 Personen</h3>
          <p>
            Die Plattform dokumentiert das Handeln von insgesamt ${PERSONEN.length} Personen.
            Für jede Person gibt es einen Steckbrief mit Hintergrundinformationen sowie
            verknüpfte Beiträge zu konkreten Sachverhalten.
          </p>

          <h3>// Kategorien</h3>
          <p>Die Beiträge sind in folgende Kategorien unterteilt:</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem">
            ${KATEGORIEN.map(k => `<span class="badge badge--${esc(k.id)}">${esc(k.icon)} ${esc(k.label)}</span>`).join('')}
          </div>

          <h3>// Kontakt</h3>
          <p>
            Wenn du Hinweise, Dokumente oder Belege teilen möchtest,
            nutze sichere Kommunikationswege und anonyme Kanäle.
          </p>

          <div class="ueber-disclaimer">
            <div class="ueber-disclaimer__title">⚠ Rechtlicher Hinweis</div>
            <p>
              Alle veröffentlichten Inhalte basieren auf recherchierten und dokumentierten
              Informationen. Die Veröffentlichung erfolgt im öffentlichen Interesse.
              Für die Richtigkeit der Inhalte wird nach bestem Wissen gesorgt.
              Bei Fragen oder Richtigstellungen wende dich an die Betreiber.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── 404 ──────────────────────────────────────────────────────────
function renderNotFound() {
  app().innerHTML = `
    <div class="page">
      <div class="container">
        <div class="empty-state">
          <div class="empty-state__icon">◈</div>
          <h2 style="margin-bottom:0.5rem">Seite nicht gefunden</h2>
          <p class="empty-state__text">Diese Seite existiert nicht.</p>
          <a href="#home" class="btn btn--primary" style="margin-top:1.5rem">Zur Startseite</a>
        </div>
      </div>
    </div>
  `;
}

// ─── Artikel-Karte (wiederverwendbar) ─────────────────────────────
function renderArtikelKarte(b) {
  const neu = isNew(b.datum);
  return `
    <div class="artikel-card" data-slug="${esc(b.slug)}" data-kategorie="${esc(b.kategorie)}" role="button" tabindex="0" aria-label="Beitrag öffnen: ${esc(b.titel)}">
      <div class="artikel-card__cat-bar artikel-card__cat-bar--${esc(b.kategorie)}"></div>
      <div class="artikel-card__body">
        <div class="artikel-card__meta">
          ${badgeHtml(b.kategorie)}
          ${neu ? '<span class="badge--neu">NEU</span>' : ''}
          <span class="artikel-card__date">${fmtDate(b.datum)}</span>
        </div>
        <h3 class="artikel-card__title">${esc(b.titel)}</h3>
        <p class="artikel-card__summary">${esc(b.zusammenfassung)}</p>
        <div class="artikel-card__footer">
          <span class="artikel-card__persons">${b.personen.length} Person(en)</span>
          <span class="btn btn--ghost">Lesen →</span>
        </div>
      </div>
    </div>
  `;
}

// ─── Klick-Handler für Artikel-Karten ────────────────────────────
function handleCardClick(e) {
  const card = e.target.closest('.artikel-card');
  if (card?.dataset.slug) navigate(`#beitrag/${card.dataset.slug}`);
}
