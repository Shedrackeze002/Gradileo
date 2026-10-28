import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, card } from './lib/c10-3-figures.ts';

// The three questions, top to bottom, with the structure each answer points to.
const flow = figure(
  'fc',
  [
    card('q1', [0, 4], 7, 1, '\\text{1. Conducts as a solid?}', 'brand'),
    card('q2', [0, 2], 7, 1, '\\text{2. Conducts when molten?}', 'brand'),
    card('q3', [0, 0], 7, 1, '\\text{3. Melting point?}', 'brand'),
    arrow('q1-no', [0, 3.5], [0, 2.5], { label: '\\text{no}', side: 'right' }),
    arrow('q2-no', [0, 1.5], [0, 0.5], { label: '\\text{no}', side: 'right' }),
    arrow('q1-yes', [3.5, 4], [6.6, 4], { label: '\\text{yes}', tone: 'good' }),
    arrow('q2-yes', [3.5, 2], [6.6, 2], { label: '\\text{yes}', tone: 'good' }),
    arrow('q3-low', [3.5, 0.25], [6.6, 0.6], { label: '\\text{low}', tone: 'good' }),
    arrow('q3-high', [3.5, -0.25], [6.6, -1.0], { label: '\\text{very high}', tone: 'good', side: 'right' }),
    card('metal', [9.4, 4], 5.2, 1, '\\text{metallic}', 'opp'),
    card('ionic', [9.4, 2], 5.2, 1, '\\text{ionic}', 'opp'),
    card('molecular', [9.4, 0.6], 5.2, 1, '\\text{simple molecular}', 'adj'),
    card('giant', [9.4, -1.0], 5.2, 1, '\\text{giant covalent}', 'adj'),
  ],
  460,
);

const video: Explainer = {
  id: 'c10-3-4-d',
  lessonId: 'c10-3-4',
  title: 'Bonding and Properties, Part 4: Identifying a Structure',
  thumbnailTitle: 'Identifying a Structure',
  thumbnail: 'fc',
  summary:
    'To identify a structure from test results, ask three questions in order: does it conduct as a solid (a metal)? Does it conduct when molten but not as a solid (ionic)? If it never conducts, a low melting point means simple molecular and a very high one giant covalent. A white solid that melts at 1610 °C and never conducts is giant covalent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 4', title: 'Identifying a Structure', subtitle: 'Three questions, in order' }],
      lines: [
        { say: 'A chemist has a white solid and a few simple tests: does it melt easily, and does it conduct electricity? That is enough to tell what kind of structure it has.', show: 'title' },
        { say: 'In this last part, you will work through the clues in the right order, and identify the structures of unknown substances.' },
      ],
    },
    {
      chapter: 'Three questions',
      layout: 'center',
      main: [flow],
      lines: [
        { say: 'Work through the clues in this order. First: does it conduct as a solid? If yes, it is a metal.', show: ['fc.q1', 'fc.q1-yes', 'fc.metal'], focus: 'fc.q1' },
        { say: 'If not, ask: does it conduct when molten, or dissolved? If yes, but not as a solid, it is ionic: its ions can move only once they are free.', show: ['fc.q1-no', 'fc.q2', 'fc.q2-yes', 'fc.ionic'], focus: 'fc.q2' },
        { say: 'If it never conducts, look at the melting point. A low melting point means simple molecular. A very high one means giant covalent.', show: ['fc.q2-no', 'fc.q3', 'fc.q3-low', 'fc.molecular', 'fc.q3-high', 'fc.giant'], focus: 'fc.q3' },
      ],
    },
    {
      chapter: 'One substance',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Test', 'Result'],
          rows: [
            ['Melting point', '1610\u00a0°C'],
            ['Conducts as a solid?', 'no'],
            ['Conducts when molten?', 'no'],
            ['In water', 'does not dissolve'],
          ],
        },
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['Not a metal: it does not conduct as a solid.', 'Not ionic: it does not conduct when molten.', 'Very high melting point: strong covalent bonds must break.', '**Giant covalent.**'] }],
      lines: [
        { say: 'A white solid melts at one thousand six hundred and ten degrees Celsius. It does not conduct electricity as a solid or when molten, and it does not dissolve in water. What kind of structure does it have?', show: 't' },
        { say: 'It does not conduct as a solid, so it is not a metal.', show: 'b.0', focus: 't.1' },
        { say: 'It does not conduct when molten, so it has no ions: it is not ionic.', show: 'b.1', focus: 't.2' },
        { say: 'Its melting point is very high, so strong covalent bonds must break to melt it, not weak forces between molecules. It has a giant covalent structure.', show: ['b.2', 'b.3'], focus: 't.0' },
      ],
    },
    {
      chapter: 'Four substances',
      layout: 'split',
      leftWidth: 820,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Melts at', 'Solid conducts?', 'Molten conducts?', 'Dissolves?'],
          rows: [
            ['P', '660\u00a0°C', 'yes', 'yes', 'no'],
            ['Q', '−95\u00a0°C', 'no', 'no', 'no'],
            ['R', '2070\u00a0°C', 'no', 'yes', 'no'],
            ['S', '3500\u00a0°C', 'no', 'no', 'no'],
          ],
        },
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['P: metallic', 'R: ionic', 'Q: simple molecular', 'S: giant covalent'] }],
      lines: [
        { say: 'Four substances were tested. Which is ionic, which is metallic, which is simple molecular, and which is giant covalent?', show: 't' },
        { say: 'P conducts as a solid, so it is the metal.', show: 'b.0', focus: 't.0' },
        { say: 'R conducts only when molten, so it is ionic. Its very high melting point does not change that.', show: 'b.1', focus: 't.2' },
        { say: 'Q and S never conduct. Q melts at minus ninety-five degrees Celsius, far below room temperature, so it is simple molecular. S has a very high melting point, so it is giant covalent.', show: ['b.2', 'b.3'], focus: ['t.1', 't.3'] },
      ],
    },
    {
      chapter: 'Conductivity first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A high melting point alone is not enough', md: 'Ionic, giant covalent and most metallic substances all have high melting points. Look at conductivity first, as a solid and then when molten. Use the melting point last.' }],
      lines: [
        { say: 'Notice that R and S, and even P, have high melting points. Ionic, giant covalent and most metallic substances all do, so the melting point alone cannot tell them apart.', show: 'oops' },
        { say: 'Look at conductivity first, as a solid and then when molten. Use the melting point last, to separate simple molecular from giant covalent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A substance melts at $770$\u00a0°C. It does not conduct electricity as a solid, but it does when molten, and it dissolves in water to give a solution that conducts. What kind of structure does it most likely have?',
          choices: ['metallic', 'simple molecular', 'ionic', 'giant covalent'],
          answer: 2,
          working: 'It conducts when molten but not as a solid: its ions are fixed in the solid and free to move in the liquid.',
        },
      ],
      lines: [
        { say: 'Your turn. A substance melts at seven hundred and seventy degrees Celsius. It does not conduct electricity as a solid, but it does when molten, and its solution in water conducts. What kind of structure does it most likely have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ionic. It conducts when molten but not as a solid, so its charged particles are ions, fixed in the solid and free to move in the liquid. Choice A is wrong: a metal would conduct as a solid too.', show: 'q.answer' },
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
            'Conducts as a solid: **metallic**.',
            'Conducts when molten or dissolved, but not as a solid: **ionic**.',
            'Never conducts: a low melting point means **simple molecular**, a very high one **giant covalent**.',
            'A high melting point alone cannot tell ionic, giant covalent and metallic apart.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A substance that conducts as a solid is a metal.', show: 'sum.0' },
        { say: 'One that conducts when molten or dissolved, but not as a solid, is ionic.', show: 'sum.1' },
        { say: 'One that never conducts is simple molecular if its melting point is low, and giant covalent if it is very high.', show: 'sum.2' },
        { say: 'So check conductivity first, and the melting point last. That completes this lesson on bonding and properties.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
