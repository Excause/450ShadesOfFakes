/**
 * data.js — Inhalte von 450ShadesOfFakes
 * =========================================
 * Hier verwaltest du alle Inhalte der Website.
 *
 * So fügst du eine neue Person hinzu:
 *   1. Kopiere einen bestehenden Eintrag aus PERSONEN
 *   2. Vergib eine eindeutige id (z.B. 'p24')
 *   3. Fülle alle Felder aus
 *   4. Speichere & pushe auf GitHub
 *
 * So fügst du einen neuen Beitrag hinzu:
 *   1. Kopiere einen bestehenden Eintrag aus BEITRAEGE
 *   2. Vergib einen eindeutigen slug (z.B. 'mein-neuer-beitrag')
 *   3. Schreibe den Inhalt im 'inhalt' Feld als HTML
 *   4. Verknüpfe Personen über ihre IDs im 'personen' Array
 *   5. Speichere & pushe auf GitHub
 */

'use strict';

/* ────────────────────────────────────────
   KATEGORIEN
   ──────────────────────────────────────── */
const KATEGORIEN = [
  { id: 'betrug',       label: 'Betrug',       icon: '⚠' },
  { id: 'tauschung',    label: 'Täuschung',    icon: '🎭' },
  { id: 'korruption',   label: 'Korruption',   icon: '💰' },
  { id: 'manipulation', label: 'Manipulation', icon: '🔀' },
  { id: 'sonstiges',    label: 'Sonstiges',    icon: '📋' },
];

/* ────────────────────────────────────────
   PERSONEN (23 Einträge)
   Felder:
     id          – eindeutige ID (z.B. 'p1')
     name        – vollständiger Name
     alias       – Spitzname / Pseudonym (optional, '' wenn keiner)
     initials    – 2-3 Buchstaben für den Avatar
     position    – Funktion oder Rolle dieser Person
     beschreibung– Freitext-Beschreibung (1-3 Sätze)
     fakten      – Array von belegten Einzelfakten (Strings)
     kategorien  – Array von Kategorie-IDs (aus KATEGORIEN)
     status      – 'aktiv' oder 'inaktiv'
     beitraege   – Array von Beitrags-Slugs (aus BEITRAEGE)
   ──────────────────────────────────────── */
const PERSONEN = [
  {
    id: 'p1',
    name: 'Person 1',
    alias: '',
    initials: 'P1',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Hier kommt die Beschreibung dieser Person. Erkläre kurz, warum sie auf dieser Seite vorkommt und welche Rolle sie spielt.',
    fakten: [
      'Beispiel-Fakt 1: Konkreter, belegter Sachverhalt',
      'Beispiel-Fakt 2: Weiterer dokumentierter Punkt',
    ],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p2',
    name: 'Person 2',
    alias: '',
    initials: 'P2',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 2.',
    fakten: [],
    kategorien: ['tauschung'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p3',
    name: 'Person 3',
    alias: '',
    initials: 'P3',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 3.',
    fakten: [],
    kategorien: ['korruption'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p4',
    name: 'Person 4',
    alias: '',
    initials: 'P4',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 4.',
    fakten: [],
    kategorien: ['manipulation'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p5',
    name: 'Person 5',
    alias: '',
    initials: 'P5',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 5.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p6',
    name: 'Person 6',
    alias: '',
    initials: 'P6',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 6.',
    fakten: [],
    kategorien: ['tauschung'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p7',
    name: 'Person 7',
    alias: '',
    initials: 'P7',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 7.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p8',
    name: 'Person 8',
    alias: '',
    initials: 'P8',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 8.',
    fakten: [],
    kategorien: ['korruption'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p9',
    name: 'Person 9',
    alias: '',
    initials: 'P9',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 9.',
    fakten: [],
    kategorien: ['manipulation'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p10',
    name: 'Person 10',
    alias: '',
    initials: 'P10',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 10.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p11',
    name: 'Person 11',
    alias: '',
    initials: 'P11',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 11.',
    fakten: [],
    kategorien: ['tauschung'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p12',
    name: 'Person 12',
    alias: '',
    initials: 'P12',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 12.',
    fakten: [],
    kategorien: ['korruption'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p13',
    name: 'Person 13',
    alias: '',
    initials: 'P13',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 13.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p14',
    name: 'Person 14',
    alias: '',
    initials: 'P14',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 14.',
    fakten: [],
    kategorien: ['manipulation'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p15',
    name: 'Person 15',
    alias: '',
    initials: 'P15',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 15.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'inaktiv',
    beitraege: [],
  },
  {
    id: 'p16',
    name: 'Person 16',
    alias: '',
    initials: 'P16',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 16.',
    fakten: [],
    kategorien: ['tauschung'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p17',
    name: 'Person 17',
    alias: '',
    initials: 'P17',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 17.',
    fakten: [],
    kategorien: ['sonstiges'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p18',
    name: 'Person 18',
    alias: '',
    initials: 'P18',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 18.',
    fakten: [],
    kategorien: ['korruption'],
    status: 'inaktiv',
    beitraege: [],
  },
  {
    id: 'p19',
    name: 'Person 19',
    alias: '',
    initials: 'P19',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 19.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p20',
    name: 'Person 20',
    alias: '',
    initials: 'P20',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 20.',
    fakten: [],
    kategorien: ['manipulation'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p21',
    name: 'Person 21',
    alias: '',
    initials: 'P21',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 21.',
    fakten: [],
    kategorien: ['tauschung'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p22',
    name: 'Person 22',
    alias: '',
    initials: 'P22',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 22.',
    fakten: [],
    kategorien: ['betrug'],
    status: 'aktiv',
    beitraege: [],
  },
  {
    id: 'p23',
    name: 'Person 23',
    alias: '',
    initials: 'P23',
    position: 'Funktion / Rolle eingeben',
    beschreibung: 'Beschreibung von Person 23.',
    fakten: [],
    kategorien: ['sonstiges'],
    status: 'aktiv',
    beitraege: [],
  },
];

/* ────────────────────────────────────────
   BEITRÄGE
   Felder:
     slug         – URL-freundliche ID, nur a-z, 0-9, Bindestrich
     titel        – Titel des Beitrags
     datum        – Format: 'YYYY-MM-DD'
     kategorie    – eine Kategorie-ID aus KATEGORIEN
     zusammenfassung – 1-2 Sätze Teaser (erscheint in der Karten-Ansicht)
     inhalt       – vollständiger Artikel als HTML-String
     personen     – Array von Personen-IDs (aus PERSONEN)
     tags         – Array von frei wählbaren Tags
   ──────────────────────────────────────── */
const BEITRAEGE = [
  {
    slug: 'willkommen-und-einfuehrung',
    titel: 'Willkommen bei 450ShadesOfFakes — Einführung in das Projekt',
    datum: '2024-01-01',
    kategorie: 'sonstiges',
    zusammenfassung: 'Eine Einführung in das Projekt: Wer wir sind, was wir aufdecken und warum Transparenz wichtig ist.',
    inhalt: `
      <p>Willkommen bei <strong>450ShadesOfFakes</strong>. Diese Website ist ein Ort für dokumentierte Recherchen und belegte Fakten.</p>

      <h2>Was ist 450ShadesOfFakes?</h2>
      <p>Dieses Projekt dient der Aufdeckung von Missständen, die durch konkrete Belege dokumentiert sind. Alle Inhalte basieren auf recherchierten Informationen und werden im öffentlichen Interesse veröffentlicht.</p>

      <h2>Wie sind die Inhalte organisiert?</h2>
      <p>Die Website ist in zwei Hauptbereiche unterteilt:</p>
      <ul>
        <li><strong>Personen</strong> – Steckbriefe der 23 betroffenen Personen</li>
        <li><strong>Beiträge</strong> – Detaillierte Artikel zu den einzelnen Sachverhalten</li>
      </ul>

      <h2>Grundsätze</h2>
      <p>Alle veröffentlichten Informationen sind durch Dokumente, Zeugenaussagen oder andere Belege gestützt. Die Darstellung erfolgt sachlich und ohne unbelegte Behauptungen.</p>

      <blockquote>„Transparenz ist der erste Schritt zur Gerechtigkeit."</blockquote>
    `,
    personen: [],
    tags: ['einführung', 'projekt'],
  },
  {
    slug: 'beispiel-beitrag-betrug',
    titel: 'Beispiel-Beitrag: So dokumentierst du einen Sachverhalt',
    datum: '2024-01-15',
    kategorie: 'betrug',
    zusammenfassung: 'Dieser Beitrag zeigt, wie ein gut strukturierter Beitrag aussieht — mit Einleitung, Fakten und Quellen.',
    inhalt: `
      <p>Dies ist ein Beispiel-Beitrag, der zeigt, wie ein Artikel strukturiert werden sollte. Ersetze diesen Inhalt durch deinen eigenen recherchierten Text.</p>

      <h2>Hintergrund</h2>
      <p>Beginne mit dem Hintergrund des Sachverhalts. Was ist passiert? Wann? Unter welchen Umständen?</p>

      <h2>Dokumentierte Fakten</h2>
      <ul>
        <li>Fakt 1: Konkreter, belegter Sachverhalt mit Datum</li>
        <li>Fakt 2: Weiterer belegter Punkt</li>
        <li>Fakt 3: Dritter belegter Punkt</li>
      </ul>

      <h2>Analyse</h2>
      <p>Hier kommt deine Analyse der Fakten. Was bedeuten sie? Welche Schlüsse lassen sie zu?</p>

      <blockquote>Direkte Zitate aus Dokumenten oder von Zeugen kommen hierhin.</blockquote>

      <h2>Quellen</h2>
      <p>Liste hier deine Quellen auf — Dokumente, Screenshots, Zeugenaussagen.</p>
    `,
    personen: ['p1', 'p2'],
    tags: ['beispiel', 'anleitung'],
  },
];
