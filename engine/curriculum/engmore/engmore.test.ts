import { describe, expect, it } from 'vitest';
import { EXTRACTS, PAIRS, TASKS } from './gen/texts.ts';
import { MODERN_SET, SET_TEXTS } from './gen/litskills.ts';
import { POEM_LESSONS } from './gen/poemskills.ts';
import { POWER_POEMS, POWER_THEMES } from './gen/poems/power.ts';
import { LOVE_POEMS, LOVE_THEMES } from './gen/poems/love.ts';

// The questions quote the texts, so every quotation must be in its text word for word.
describe('More English Topics: the practice texts', () => {
  it('quote each pair of sources exactly', () => {
    for (const p of PAIRS) {
      for (const s of [p.a, p.b]) expect(s.text, `${s.writer}: ${s.quote}`).toContain(s.quote);
      for (const d of p.diffs) {
        expect(p.a.text, `${p.topic}: ${d.qa}`).toContain(d.qa);
        expect(p.b.text, `${p.topic}: ${d.qb}`).toContain(d.qb);
      }
      // The older source is the nineteenth-century one.
      expect(p.a.year).toBeGreaterThan(2000);
      expect(p.b.year).toBeLessThan(1900);
    }
  });

  it('quote each extract exactly', () => {
    for (const e of EXTRACTS) {
      for (const quote of [...e.supports.map((s) => s.quote), e.against.quote, ...e.neutral]) expect(e.text, `${e.title}: ${quote}`).toContain(quote);
      expect(e.conclusion, e.title).toContain(e.against.point);
    }
  });

  it('open and close each form in its own way', () => {
    for (const t of TASKS) {
      expect(t.letterOpen.startsWith(t.greeting), t.issue).toBe(true);
      expect(t.speechOpen.startsWith(t.speechGreeting), t.issue).toBe(true);
      expect(t.articleOpen.startsWith(t.headline.toUpperCase()), t.issue).toBe(true);
      expect(t.letterEnd, t.issue).toContain(t.signOff);
      expect(t.speechEnd, t.issue).toContain('Thank you for listening.');
      // "Sincerely" goes with a name, "faithfully" with "Sir or Madam".
      expect(t.signOff).toBe(t.greeting.includes('Sir or Madam') ? 'Yours faithfully,' : 'Yours sincerely,');
    }
  });
});

// The literature questions draw on each set text's data. The quotations were checked word for word
// against the Project Gutenberg edition named in each file; here we check that the data fits the
// generators: every speaker is a character, every theme is listed, and there is enough of each kind
// for four distinct choices.
describe('More English Topics: the set texts', () => {
  for (const { key, text: t } of SET_TEXTS) {
    it(`${key}: has the data each kind of question needs`, () => {
      const names = new Set(t.characters.map((c) => c.name));
      expect(names.size, 'distinct character names').toBe(t.characters.length);
      expect(t.characters.length).toBeGreaterThanOrEqual(6);
      expect(t.themes.length).toBeGreaterThanOrEqual(5);
      expect(new Set(t.events.map((e) => e.where)).size, 'places for “where” questions').toBeGreaterThanOrEqual(4);
      expect(t.events.length).toBeGreaterThanOrEqual(8);
      expect(t.quotations.length).toBeGreaterThanOrEqual(10);
      expect(t.quotations.filter((x) => x.who !== 'the narrator').length, 'spoken quotations').toBeGreaterThanOrEqual(6);
      expect(t.context.length).toBeGreaterThanOrEqual(6);
      for (const x of t.quotations) {
        if (x.who !== 'the narrator') expect(names.has(x.who), `${x.who} is a character`).toBe(true);
        expect(t.themes, x.text).toContain(x.theme);
        expect(new Set([x.reading, ...x.misreadings]).size, x.text).toBe(4);
        // Typographic quotation marks and apostrophes, as in the rest of the course.
        expect(x.text, x.text).not.toMatch(/['"]/);
      }
    });
  }
});

// The modern texts are still in copyright, so they are never quoted: their key moments are told in
// our own words, and each credits its writer and first publication or performance.
describe('More English Topics: the modern texts', () => {
  for (const { key, text: t, play } of MODERN_SET) {
    it(`${key}: has the data each kind of question needs, and no quotations`, () => {
      expect(t.quotations).toEqual([]);
      expect(new Set(t.characters.map((c) => c.name)).size).toBe(t.characters.length);
      expect(t.characters.length).toBeGreaterThanOrEqual(6);
      expect(t.themes.length).toBeGreaterThanOrEqual(5);
      expect(t.events.length).toBeGreaterThanOrEqual(8);
      // A novel's plot skill asks which chapter an event happens in.
      if (!play) expect(new Set(t.events.map((e) => e.where)).size).toBeGreaterThanOrEqual(4);
      expect(t.moments!.length).toBeGreaterThanOrEqual(4);
      expect(t.context.length).toBeGreaterThanOrEqual(3);
      expect(t.source).toContain(t.author);
      for (const m of t.moments!) {
        expect(t.themes, m.what).toContain(m.theme);
        expect(new Set([m.reading, ...m.misreadings]).size, m.what).toBe(4);
        // No quoted words from the text.
        expect(m.what, m.what).not.toMatch(/[“”"]/);
      }
    });
  }
});

// The anthology poems: those in the public domain are quoted from the edition each names (checked
// word for word against it), and those still in copyright are described in our own words only.
describe('More English Topics: the anthology poems', () => {
  const clusters = [
    { poems: POWER_POEMS, themes: POWER_THEMES },
    { poems: LOVE_POEMS, themes: LOVE_THEMES },
  ];
  it('cover each cluster of fifteen poems once', () => {
    for (const { poems } of clusters) {
      expect(poems.length).toBe(15);
      expect(new Set(poems.map((p) => p.title)).size).toBe(15);
    }
    const taught = POEM_LESSONS.flatMap((l) => l.set.poems);
    expect(taught.length).toBe(30);
    expect(new Set(taught).size).toBe(30);
  });

  for (const { poems, themes } of clusters) {
    for (const p of poems) {
      it(`${p.title}: has the data each kind of question needs`, () => {
        expect(p.themes.length).toBeGreaterThanOrEqual(2);
        for (const t of p.themes) expect(themes, t).toContain(t);
        expect(p.context.length).toBeGreaterThanOrEqual(1);
        expect(p.about).not.toContain(p.title);
        // Exactly one of quotations (public domain) and moments (in copyright).
        expect(!!p.quotations?.length).toBe(!p.moments?.length);
        for (const x of p.quotations ?? []) {
          expect(p.themes.concat(themes), x.text).toContain(x.theme);
          expect(new Set([x.reading, ...x.misreadings]).size, x.text).toBe(4);
          expect(x.text, x.text).not.toMatch(/['"]/);
        }
        for (const m of p.moments ?? []) {
          expect(themes, m.what).toContain(m.theme);
          expect(new Set([m.reading, ...m.misreadings]).size, m.what).toBe(4);
          expect(m.what, m.what).not.toMatch(/[“”"]/);
        }
      });
    }
  }
});
