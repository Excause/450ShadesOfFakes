# MaxPortfolio — Moderne Portfolio-Website

Eine vollständig responsive Portfolio-Website, bereit für GitHub Pages.  
Gebaut mit **Vanilla HTML5, CSS3 und JavaScript** — kein Build-Tool nötig.

## Live-Demo

> Nach dem Deploy verfügbar unter:  
> `https://<dein-github-username>.github.io/<repo-name>/`

## Features

- **Dark / Light Mode** — mit localStorage-Persistenz und System-Präferenz-Erkennung
- **Responsives Design** — optimiert für Desktop, Tablet und Smartphone
- **Smooth Navigation** — Sticky Header, aktiver Link-Highlighting, Mobile Hamburger-Menü
- **Typed Text Effect** — animierter Titeltext in der Hero-Section
- **Scroll-Reveal Animationen** — Elemente erscheinen beim Einblenden via Intersection Observer
- **Animierte Skill-Bars** — Fortschrittsbalken mit CSS-Transition
- **Zähler-Animation** — Hero-Statistiken zählen animiert hoch
- **Projekt-Filter** — Filtere Projekte nach Kategorie (Web, App, Design)
- **Kontaktformular** — mit Live-Validierung und Erfolgsmeldung
- **Scroll Progress Bar** — zeigt den Lesefortschritt am oberen Rand

## Projektstruktur

```
modern-website/
├── index.html          # Haupt-HTML-Datei
├── css/
│   └── style.css       # Alle Styles (CSS Custom Properties, Dark Mode, Animationen)
├── js/
│   └── main.js         # Alle interaktiven Features
└── README.md
```

## Technologien

| Technologie | Zweck |
|-------------|-------|
| HTML5 (Semantic) | Struktur & Zugänglichkeit |
| CSS3 (Custom Properties) | Design-Tokens, Dark Mode, Animationen |
| Vanilla JavaScript (ES6+) | Interaktivität, DOM-Manipulation |
| Google Fonts (Inter + Fira Code) | Typografie |
| Intersection Observer API | Scroll-Animationen |

## Auf GitHub Pages deployen

### Option A — Direkt im Browser

1. Erstelle ein neues Repository auf [github.com](https://github.com)
2. Lade alle Dateien hoch (Drag & Drop im Web-Interface)
3. Gehe zu **Settings → Pages**
4. Setze **Source** auf `Deploy from a branch` → Branch `main` → Ordner `/ (root)`
5. Klicke **Save** — die Seite ist in ~60 Sekunden live

### Option B — Via Git CLI

```bash
# Repository initialisieren
git init
git add .
git commit -m "Initial commit: Portfolio website"

# Mit GitHub verbinden
git remote add origin https://github.com/<username>/<repo-name>.git
git branch -M main
git push -u origin main

# GitHub Pages aktivieren (einmalig in den Repo-Einstellungen)
```

## Anpassung

Alle wichtigen Inhalte können direkt in `index.html` geändert werden:

- **Name & Beschreibung** → Hero-Section (`#home`)
- **Skills & Prozentsätze** → About-Section (`data-width` Attribute)
- **Projekte** → Projects-Section (jeweils ein `<article class="project-card">`)
- **Kontaktinfos** → Contact-Section
- **Farbpalette** → `css/style.css`, Zeile 1 (`:root` Variablen)

---

*Gebaut mit ❤️ — direkt deploybar, keine Abhängigkeiten, kein Build-Step.*
