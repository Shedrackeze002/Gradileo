import { describe, expect, it } from 'vitest';
import { renderMath } from './markdown.ts';

describe('chemistry in the maths', () => {
  it('sets formulas, charges and equations with \\ce', () => {
    for (const tex of ['\\ce{H2SO4}', '\\ce{SO4^2-}', '\\ce{2H2 + O2 -> 2H2O}', '\\ce{CH3COOH <=> H+ + CH3COO-}']) {
      const html = renderMath(tex);
      expect(html, tex).toContain('class="katex"');
      expect(html, tex).not.toContain('katex-error');
    }
  });
});
