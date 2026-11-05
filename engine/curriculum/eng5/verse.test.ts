import { describe, expect, it } from 'vitest';
import { quote } from './gen/common.ts';
import { ENG5_SKILLS } from './skills.ts';

describe('Grade 5 English verse in questions', () => {
  it('keeps each line of a poem on its own line, and the stanza breaks', () => {
    expect(quote('One line,\nanother line.\n\nA new stanza.')).toBe('> One line,\\\n> another line.\n> \n> A new stanza.');
  });
  it('quotes poems with their line breaks in the practice questions', () => {
    const s = ENG5_SKILLS.find((x) => x.id === 'e5-lines-stanzas')!;
    for (const d of [1, 2, 3] as const) expect(s.generate(1, d).prompt).toMatch(/\\\n> /);
  });
});
