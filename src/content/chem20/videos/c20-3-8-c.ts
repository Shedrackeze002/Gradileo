import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker } from './lib/c20-3b-figures.ts';

const NA = '\\ce{Na+}';
const BA = '\\ce{Ba^2+}';
const OH = '\\ce{OH-}';

// Sodium hydroxide gives one hydroxide ion per sodium ion; barium hydroxide gives two per barium ion.
const bases = figure('f', [
  beaker({
    name: 'a',
    at: [0, 0],
    w: 4,
    h: 3.6,
    level: 3.1,
    label: '\\ce{NaOH(aq)}',
    ions: [
      { id: 'n0', at: [1.1, 0.55], tex: NA, tone: 'brand', group: 'na' },
      { id: 'o0', at: [2.9, 0.55], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'o1', at: [1.1, 1.5], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'n1', at: [2.9, 1.5], tex: NA, tone: 'brand', group: 'na' },
      { id: 'n2', at: [1.1, 2.45], tex: NA, tone: 'brand', group: 'na' },
      { id: 'o2', at: [2.9, 2.45], tex: OH, tone: 'adj', group: 'oh' },
    ],
  }),
  beaker({
    name: 'b',
    at: [5.2, 0],
    w: 4,
    h: 3.6,
    level: 3.1,
    label: '\\ce{Ba(OH)2(aq)}',
    ions: [
      { id: 'b0', at: [1.1, 0.55], tex: BA, tone: 'opp', group: 'ba' },
      { id: 'o0', at: [2.9, 0.55], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'o1', at: [1.1, 1.5], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'o2', at: [2.9, 1.5], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'o3', at: [1.1, 2.45], tex: OH, tone: 'adj', group: 'oh' },
      { id: 'b1', at: [2.9, 2.45], tex: BA, tone: 'opp', group: 'ba' },
    ],
  }),
]);

const video: Explainer = {
  id: 'c20-3-8-c',
  lessonId: 'c20-3-8',
  title: 'Strong and Weak Acids and Bases, Part 3: Strong Bases',
  thumbnailTitle: 'Strong Bases',
  thumbnail: 'f',
  summary:
    'A strong base dissociates completely in water, releasing all of its hydroxide ions: the group 1 hydroxides, such as LiOH, NaOH and KOH, and barium and strontium hydroxide. A group 1 hydroxide gives one OH⁻ per formula unit, so [OH⁻] = c; Ba(OH)₂ and Sr(OH)₂ give two, so [OH⁻] = 2c. Ammonia is a common weak base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Strong Bases', subtitle: 'Hydroxides that dissociate completely' }],
      lines: [
        { say: 'Sodium hydroxide and ammonia are both bases. But like acids, bases come in strong and weak kinds.', show: 'title' },
        { say: 'In this part, you will meet the strong bases, find their hydroxide ion concentration, and see why ammonia is weak.' },
      ],
    },
    {
      chapter: 'Strong bases',
      layout: 'split',
      leftWidth: 640,
      left: [bases],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Strong base', md: 'A base that **dissociates completely** in water, releasing all of its hydroxide ions. The group 1 hydroxides, such as $\\ce{LiOH}$, $\\ce{NaOH}$ and $\\ce{KOH}$, are strong bases, and so are $\\ce{Ba(OH)2}$ and $\\ce{Sr(OH)2}$.' }],
      lines: [
        { say: 'Metal hydroxides are ionic compounds, so they do not ionise. They dissociate into the ions they are already made of.' },
        { say: 'A strong base dissociates completely in water, releasing all of its hydroxide ions. The group one hydroxides, such as lithium, sodium and potassium hydroxide, are strong bases. So are barium hydroxide and strontium hydroxide.', show: 'def' },
        { say: 'Each formula unit of sodium hydroxide releases one sodium ion and one hydroxide ion. So there are as many hydroxide ions as sodium ions.', show: ['f.a-glass', 'f.a-liquid', 'f.a-label', 'f.a-na', 'f.a-oh'], focus: 'f.a-oh' },
        { say: 'But each formula unit of barium hydroxide releases one barium ion and two hydroxide ions: twice as many hydroxide ions as barium ions.', show: ['f.b-glass', 'f.b-liquid', 'f.b-label', 'f.b-ba', 'f.b-oh'], focus: 'f.b-oh' },
      ],
    },
    {
      chapter: 'One or two hydroxide ions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Strong base', 'Dissociation', '$[\\ce{OH-}]$ for concentration $c$'],
          rows: [
            ['group 1 hydroxide', '$\\ce{NaOH(s) -> Na+(aq) + OH-(aq)}$', '$c$'],
            ['barium or strontium hydroxide', '$\\ce{Ba(OH)2(s) -> Ba^2+(aq) + 2OH-(aq)}$', '$2c$'],
          ],
        },
        { kind: 'text', id: 'k', size: 'md', align: 'center', md: '$0.020\\ \\text{mol/L}$ $\\ce{Ba(OH)2}$: $\\ [\\ce{OH-}] = 2 \\times 0.020 = 0.040\\ \\text{mol/L}$' },
      ],
      lines: [
        { say: 'Write the dissociation equation first, and the hydroxide ion concentration follows.' },
        { say: 'A group one hydroxide releases one hydroxide ion per formula unit. So for a solution of concentration c, the hydroxide ion concentration is c.', show: 't.0', focus: 't.0' },
        { say: 'Barium and strontium hydroxide release two hydroxide ions per formula unit, so the hydroxide ion concentration is two c.', show: 't.1', focus: 't.1' },
        { say: 'For example, in zero point zero two zero moles per litre barium hydroxide, the hydroxide ion concentration is zero point zero four zero moles per litre.', caption: 'For example, in 0.020 mol/L barium hydroxide, [OH⁻] = 2 × 0.020 = 0.040 mol/L.', show: 'k' },
      ],
    },
    {
      chapter: 'A weak base',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NH3(aq) + H2O(l) <=> NH4+(aq) + OH-(aq)}'] }],
      lines: [
        { say: 'Ammonia is a common weak base. It is a molecular compound, and it makes hydroxide ions by taking a hydrogen ion from water.', show: 'm' },
        { say: 'Only a small fraction of its molecules do this, so its solution holds far fewer hydroxide ions than a strong base of the same concentration. As for a weak acid, the double arrow shows that the reaction goes both ways.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is $[\\ce{OH-}]$ in a $0.030\\ \\text{mol/L}$ solution of strontium hydroxide, $\\ce{Sr(OH)2}$? It dissociates completely.',
          choices: ['$0.030\\ \\text{mol/L}$', '$0.060\\ \\text{mol/L}$', '$0.015\\ \\text{mol/L}$', '$0.090\\ \\text{mol/L}$'],
          answer: 1,
          working: '$\\ce{Sr(OH)2(s) -> Sr^2+(aq) + 2OH-(aq)}$, so $[\\ce{OH-}] = 2 \\times 0.030 = 0.060\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the hydroxide ion concentration in a zero point zero three zero moles per litre solution of strontium hydroxide? Pause the video and try it.', caption: 'Your turn. What is [OH⁻] in a 0.030 mol/L solution of strontium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, zero point zero six zero moles per litre. Each formula unit of strontium hydroxide releases two hydroxide ions, so the concentration doubles. Choice A forgets the second hydroxide ion.', caption: 'The answer is B, 0.060 mol/L. Each formula unit of strontium hydroxide releases two hydroxide ions, so the concentration doubles. Choice A forgets the second hydroxide ion.', show: 'q.answer' },
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
            'A **strong base** dissociates completely: the group 1 hydroxides, $\\ce{Ba(OH)2}$ and $\\ce{Sr(OH)2}$.',
            'Group 1 hydroxide: $[\\ce{OH-}] = c$. Barium or strontium hydroxide: $[\\ce{OH-}] = 2c$.',
            'Ammonia is a weak base: only a small fraction of its molecules react with water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strong base dissociates completely. The group one hydroxides, and barium and strontium hydroxide, are strong bases.', show: 'sum.0' },
        { say: 'For a group one hydroxide, the hydroxide ion concentration equals the base’s concentration. For barium or strontium hydroxide, it is twice the concentration.', show: 'sum.1' },
        { say: 'And ammonia is a weak base. In part four, you will find the p H of strong acids and strong bases. See you there!', caption: 'And ammonia is a weak base. In part four, you will find the pH of strong acids and strong bases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
