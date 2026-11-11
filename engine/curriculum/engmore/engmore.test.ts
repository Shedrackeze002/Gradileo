import { describe, expect, it } from 'vitest';
import { EXTRACTS, PAIRS, TASKS } from './gen/texts.ts';
import { SET_TEXTS } from './gen/litskills.ts';

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
