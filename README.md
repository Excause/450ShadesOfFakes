# 450ShadesOfFakes

Investigativ-Plattform zur Dokumentation von Missständen — statische Website auf GitHub Pages.

**Live:** https://excause.github.io/450ShadesOfFakes/

---

## Inhalte bearbeiten

Alle Inhalte liegen in einer einzigen Datei: **`js/data.js`**

### Person bearbeiten / hinzufügen

Öffne `js/data.js` und suche den gewünschten Eintrag in `PERSONEN`:

```js
{
  id: 'p1',              // eindeutige ID — nie ändern!
  name: 'Max Mustermann', // vollständiger Name
  alias: 'Der Falsche',   // Spitzname (oder '' leer lassen)
  initials: 'MM',         // 2-3 Buchstaben für den Avatar
  position: 'Geschäftsführer bei Firma XY',
  beschreibung: 'Beschreibungstext der Person...',
  fakten: [
    'Fakt 1: Konkreter, belegter Sachverhalt',
    'Fakt 2: Weiterer Punkt',
  ],
  kategorien: ['betrug', 'manipulation'],   // aus der Liste unten
  status: 'aktiv',         // 'aktiv' oder 'inaktiv'
  beitraege: ['mein-artikel-slug'],  // Slugs verknüpfter Beiträge
},
```

**Verfügbare Kategorien:** `betrug` · `tauschung` · `korruption` · `manipulation` · `sonstiges`

---

### Beitrag schreiben / hinzufügen

Füge einen neuen Eintrag am Anfang von `BEITRAEGE` in `js/data.js` ein:

```js
{
  slug: 'mein-neuer-beitrag',   // nur a-z, 0-9, Bindestrich — wird zur URL
  titel: 'Titel des Beitrags',
  datum: '2024-03-15',          // Format: YYYY-MM-DD
  kategorie: 'betrug',
  zusammenfassung: '1-2 Sätze als Teaser für die Übersicht.',
  inhalt: `
    <p>Einleitungstext...</p>

    <h2>Hintergrund</h2>
    <p>Details...</p>

    <h2>Fakten</h2>
    <ul>
      <li>Fakt 1</li>
      <li>Fakt 2</li>
    </ul>

    <blockquote>Direktes Zitat aus einem Dokument.</blockquote>
  `,
  personen: ['p1', 'p3'],  // IDs der betroffenen Personen
  tags: ['betrug', 'finanzen'],
},
```

---

### Auf GitHub pushen (nach jeder Änderung)

```bash
cd C:/Users/maxih/modern-website
git add js/data.js
git commit -m "Inhalt: Person X aktualisiert / Beitrag Y hinzugefügt"
git push origin main
```

Die Seite ist ~60 Sekunden nach dem Push live.

---

## Projektstruktur

```
450ShadesOfFakes/
├── index.html        SPA-Shell (Header, Footer, App-Container)
├── css/style.css     Alle Styles (grünes Dark-Theme)
├── js/
│   ├── data.js       ← HIER bearbeitest du alle Inhalte
│   └── main.js       Router & Rendering-Logik
└── README.md
```

---

## Sicherheitshinweis

Dein GitHub Personal Access Token wurde in einem Chat geteilt.
**Erstelle sofort einen neuen Token:**
GitHub → Settings → Developer settings → Personal access tokens → alten Token löschen → neu erstellen.
