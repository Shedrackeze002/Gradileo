import { describe, expect, it } from 'vitest';
import { EXTRACTS, PAIRS, TASKS } from './gen/texts.ts';

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
