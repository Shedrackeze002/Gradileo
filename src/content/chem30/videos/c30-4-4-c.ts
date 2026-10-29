import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-4-c',
  lessonId: 'c30-4-4',
  title: 'Brønsted–Lowry Acids and Bases, Part 3: Writing Conjugates',
  thumbnailTitle: 'Writing Conjugates',
  thumbnail: false,
  summary:
    'To write a conjugate base, remove one H and lower the charge by 1: H₂SO₄ → HSO₄⁻, NH₄⁺ → NH₃, H₂O → OH⁻. To write a conjugate acid, add one H and raise the charge by 1: CO₃²⁻ → HCO₃⁻, NH₃ → NH₄⁺, H₂O → H₃O⁺. So the conjugate base of H₂CO₃ is HCO₃⁻, and the conjugate acid of OH⁻ is H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Writing Conjugates', subtitle: 'Move one proton, track the charge' }],
      lines: [
        { say: 'Every acid has a conjugate base, and every base has a conjugate acid. Writing one takes two small steps: move one proton, and keep track of the charge.', show: 'title' },
        { say: 'In this part, you will write conjugate bases and conjugate acids, for molecules and for ions.' },
      ],
    },
    {
      chapter: 'Conjugate bases',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Conjugate base', md: 'Remove **one H** and **lower the charge by 1**: the proton, $\\ce{H+}$, takes a positive charge away with it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2SO4} \\to \\ce{HSO4-}', '\\ce{NH4+} \\to \\ce{NH3}', '\\ce{H2O} \\to \\ce{OH-}'] },
      ],
      lines: [
        { say: 'To find a conjugate base, remove one H, and lower the charge by one. The proton that leaves takes a positive charge with it.', show: 'key' },
        { say: 'Sulfuric acid, H two S O four, becomes hydrogen sulfate, H S O four minus.', caption: 'Sulfuric acid, H₂SO₄, becomes hydrogen sulfate, HSO₄⁻.', show: 'm.0', focus: 'm.0' },
        { say: 'Ammonium, N H four plus, becomes ammonia, N H three: the charge goes from plus one to zero.', caption: 'Ammonium, NH₄⁺, becomes ammonia, NH₃: the charge goes from +1 to 0.', show: 'm.1', focus: 'm.1' },
        { say: 'And water, H two O, becomes hydroxide, O H minus.', caption: 'And water, H₂O, becomes hydroxide, OH⁻.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Conjugate acids',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Conjugate acid', md: 'Add **one H** and **raise the charge by 1**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{CO3^2-} \\to \\ce{HCO3-}', '\\ce{NH3} \\to \\ce{NH4+}', '\\ce{H2O} \\to \\ce{H3O+}'] },
      ],
      lines: [
        { say: 'To find a conjugate acid, do the opposite: add one H, and raise the charge by one.', show: 'key' },
        { say: 'The carbonate ion, C O three, two minus, becomes hydrogen carbonate, H C O three minus: the charge goes from minus two to minus one.', caption: 'The carbonate ion, CO₃²⁻, becomes hydrogen carbonate, HCO₃⁻: the charge goes from −2 to −1.', show: 'm.0', focus: 'm.0' },
        { say: 'Ammonia becomes ammonium, and water becomes hydronium, H three O plus.', caption: 'Ammonia becomes ammonium, and water becomes hydronium, H₃O⁺.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A table of conjugates',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Acid', 'Conjugate base', 'Base', 'Conjugate acid'],
          rows: [
            ['$\\ce{HNO2}$', '$\\ce{NO2-}$', '$\\ce{F-}$', '$\\ce{HF}$'],
            ['$\\ce{H2PO4-}$', '$\\ce{HPO4^2-}$', '$\\ce{PO4^3-}$', '$\\ce{HPO4^2-}$'],
            ['$\\ce{HSO4-}$', '$\\ce{SO4^2-}$', '$\\ce{CH3COO-}$', '$\\ce{CH3COOH}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some more. Nitrous acid gives the nitrite ion, and the fluoride ion takes a proton to become hydrogen fluoride.', show: 'tb.0', focus: 'tb.0' },
        { say: 'Dye-hydrogen phosphate, H two P O four minus, loses a proton to become hydrogen phosphate, H P O four, two minus. Phosphate, P O four, three minus, gains one and becomes hydrogen phosphate too.', caption: 'Dihydrogen phosphate, H₂PO₄⁻, loses a proton to become hydrogen phosphate, HPO₄²⁻. Phosphate, PO₄³⁻, gains one and becomes hydrogen phosphate too.', show: 'tb.1', focus: 'tb.1' },
        { say: 'The hydrogen sulfate ion gives the sulfate ion, and the acetate ion takes a proton to become acetic acid.', show: 'tb.2', focus: 'tb.2' },
      ],
    },
    {
      chapter: 'Two conjugates',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write the conjugate base of $\\ce{H2CO3}$ and the conjugate acid of $\\ce{OH-}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{H2CO3} - \\ce{H+} \\to \\ce{HCO3-} \\qquad \\text{charge } 0 \\to {-1}', '\\ce{OH-} + \\ce{H+} \\to \\ce{H2O} \\qquad \\text{charge } {-1} \\to 0'],
        },
      ],
      lines: [
        { say: 'Write the conjugate base of carbonic acid, H two C O three, and the conjugate acid of hydroxide.', caption: 'Write the conjugate base of carbonic acid, H₂CO₃, and the conjugate acid of hydroxide.', show: 'q' },
        { say: 'Carbonic acid loses one proton: one hydrogen fewer, and the charge goes from zero to minus one. Its conjugate base is H C O three minus.', caption: 'Carbonic acid loses one proton: one hydrogen fewer, and the charge goes from 0 to −1. Its conjugate base is HCO₃⁻.', show: 'm.0', focus: 'm.0' },
        { say: 'Hydroxide gains one proton: one hydrogen more, and the charge goes from minus one to zero. Its conjugate acid is water.', caption: 'Hydroxide gains one proton: one hydrogen more, and the charge goes from −1 to 0. Its conjugate acid is water.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the conjugate acid of the sulfate ion, $\\ce{SO4^2-}$?',
          choices: ['$\\ce{HSO4-}$', '$\\ce{H2SO4}$', '$\\ce{HSO4^2-}$', '$\\ce{SO4-}$'],
          answer: 0,
          working: 'Add one H and raise the charge by 1: $\\ce{SO4^2-} + \\ce{H+} \\to \\ce{HSO4-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the conjugate acid of the sulfate ion, S O four, two minus? Pause the video and try it.', caption: 'Your turn. What is the conjugate acid of the sulfate ion, SO₄²⁻? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Add one H and raise the charge by one: minus two becomes minus one, giving H S O four minus. Choice C adds the H but forgets the charge, and choice B adds two protons.', caption: 'The answer is A. Add one H and raise the charge by one: −2 becomes −1, giving HSO₄⁻. Choice C adds the H but forgets the charge, and choice B adds two protons.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            '**Conjugate base**: remove one H and lower the charge by 1.',
            '**Conjugate acid**: add one H and raise the charge by 1.',
            'Check both the hydrogens and the charge: $\\ce{H2CO3} \\to \\ce{HCO3-}$, $\\ce{OH-} \\to \\ce{H2O}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a conjugate base, remove one H and lower the charge by one.', show: 'sum.0' },
        { say: 'For a conjugate acid, add one H and raise the charge by one.', show: 'sum.1' },
        { say: 'Always check both the hydrogens and the charge. In part four, you will meet particles that have both a conjugate acid and a conjugate base. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
