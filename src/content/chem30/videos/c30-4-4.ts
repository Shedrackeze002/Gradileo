import type { Explainer } from '@/video/script.ts';
import { atomShells, lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { link, showAll, tag } from './lib/c30-4a-figures.ts';

// A hydrogen atom (one proton, one electron) and a hydrogen ion, H⁺: just the proton.
const atom = atomShells({ name: 'h', protons: 1, neutrons: 0, shells: [1] });
const ion = atomShells({ name: 'p', at: [6, 0], protons: 1, neutrons: 0, shells: [] });
const proton = figure(
  'h',
  [
    atom,
    ion,
    link('arr', [2.9, 0], [4.3, 0], { arrow: true, tone: 'muted', label: '-\\,e^-', labelSide: 'left' }),
    tag('la', [0, -2.9], '\\text{hydrogen atom}', { place: 'below' }),
    tag('lb', [6, -2.9], '\\ce{H+}\\text{: a proton}', { place: 'below' }),
  ],
  380,
);

// HF + H₂O ⇌ H₃O⁺ + F⁻ as Lewis structures: the green H moves from HF to a lone pair on water.
const hf = lewis({ name: 'hf', atoms: [{ id: 'F', symbol: 'F', at: [0, 0], dots: [2, 0, 2, 2] }, { id: 'H', symbol: 'H', at: [1.6, 0], tone: 'good' }], bonds: [{ from: 'F', to: 'H' }] });
const water = lewis({ name: 'w', atoms: [{ id: 'O', symbol: 'O', at: [4.4, 0], dots: [2, 0, 0, 2] }, { id: 'H1', symbol: 'H', at: [6.0, 0] }, { id: 'H2', symbol: 'H', at: [4.4, -1.6] }], bonds: [{ from: 'O', to: 'H1' }, { from: 'O', to: 'H2' }] });
const hydronium = lewis({ name: 'h3o', charge: '+', atoms: [{ id: 'H0', symbol: 'H', at: [9.4, 0], tone: 'good' }, { id: 'O', symbol: 'O', at: [11.0, 0], dots: [2, 0, 0, 0] }, { id: 'H1', symbol: 'H', at: [12.6, 0] }, { id: 'H2', symbol: 'H', at: [11.0, -1.6] }], bonds: [{ from: 'H0', to: 'O' }, { from: 'O', to: 'H1' }, { from: 'O', to: 'H2' }] });
const fluoride = lewis({ name: 'f', charge: '-', atoms: [{ id: 'F', symbol: 'F', at: [15.9, 0], dots: [2, 2, 2, 2] }] });
const transfer = figure(
  'd',
  [
    hf,
    water,
    hydronium,
    fluoride,
    tag('plus1', [2.95, 0], '+'),
    tag('arrow', [7.6, 0], '\\rightleftharpoons'),
    tag('plus2', [14.2, 0], '+'),
    link('move', [1.75, 0.75], [3.85, 0.75], { arrow: true, tone: 'good', dashed: true, label: '\\ce{H+}', labelSide: 'left' }),
    tag('acid', [0.8, -1.9], '\\text{acid}', { place: 'below', tone: 'opp' }),
    tag('base', [4.6, -1.9], '\\text{base}', { place: 'below', tone: 'adj' }),
  ],
  330,
);
const reactants = [...showAll('d', hf), ...showAll('d', water), 'd.plus1'];
const products = [...showAll('d', hydronium), ...showAll('d', fluoride), 'd.arrow', 'd.plus2'];

const video: Explainer = {
  id: 'c30-4-4',
  lessonId: 'c30-4-4',
  title: 'Brønsted–Lowry Acids and Bases, Part 1: Proton Donors and Acceptors',
  thumbnailTitle: 'Proton Donors and Acceptors',
  thumbnail: 'd',
  summary:
    'A hydrogen ion, H⁺, is just a proton. In the Brønsted–Lowry theory an acid donates a proton and a base accepts one, in water or not: when hydrogen fluoride dissolves, HF is the acid and water is the base, which becomes the hydronium ion, H₃O⁺. In ammonia solution, water is the acid and ammonia the base, which is why the solution contains hydroxide ions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'Proton Donors and Acceptors', subtitle: 'Acids and bases, with or without water' }],
      lines: [
        { say: 'Open bottles of concentrated ammonia and hydrochloric acid side by side, and a white smoke forms between them: ammonia gas and hydrogen chloride gas react to make tiny crystals of ammonium chloride.', show: 'title' },
        { say: 'It is an acid-base reaction, yet there is no water and no hydroxide. This part gives a broader idea of acids and bases. Later parts cover conjugates, and particles that act both ways.', caption: 'It is an acid–base reaction, yet there is no water and no hydroxide. This part gives a broader idea of acids and bases. Later parts cover conjugates, and particles that act both ways.' },
      ],
    },
    {
      chapter: 'A hydrogen ion is a proton',
      layout: 'split',
      leftWidth: 560,
      left: [proton],
      right: [
        { kind: 'callout', id: 'arr', tone: 'tip', title: 'Arrhenius', md: 'An acid makes hydrogen ions in water; a base makes hydroxide ions. This misses ammonia, a base with no hydroxide, and reactions outside water.' },
        { kind: 'text', id: 't', size: 'md', md: 'The **Brønsted–Lowry** theory: an acid–base reaction is the **transfer of a proton** from one particle to another.' },
      ],
      lines: [
        { say: 'In earlier courses you met the Arrhenius definitions: an acid makes hydrogen ions in water, and a base makes hydroxide ions.', show: 'arr' },
        { say: 'They work for hydrochloric acid and sodium hydroxide, but not for ammonia, a base with no hydroxide, or for reactions outside water.' },
        { say: 'A hydrogen atom is one proton and one electron. Take away the electron, and all that is left is a proton. So a hydrogen ion, H plus, is a proton.', caption: 'A hydrogen atom is one proton and one electron. Take away the electron, and all that is left is a proton. So a hydrogen ion, H⁺, is a proton.', show: ['h.h-nucleus', 'h.h-shell-1', 'h.la', 'h.arr', 'h.p-nucleus', 'h.lb'], focus: 'h.p-nucleus' },
        { say: 'The Bronsted-Lowry theory describes acid-base reactions as the transfer of a proton from one particle to another.', caption: 'The Brønsted–Lowry theory describes acid–base reactions as the transfer of a proton from one particle to another.', show: 't' },
      ],
    },
    {
      chapter: 'Donors and acceptors',
      layout: 'center',
      main: [
        transfer,
        { kind: 'bullets', id: 'b', items: ['A **Brønsted–Lowry acid** donates a proton ($\\ce{H+}$) to another particle.', 'A **Brønsted–Lowry base** accepts a proton from another particle.'] },
      ],
      lines: [
        { say: 'In this theory, an acid is a particle that donates a proton to another particle, and a base is one that accepts it.', show: ['b.0', 'b.1'] },
        { say: 'When hydrogen fluoride dissolves, it gives a proton to a water molecule. The proton lands on one of the lone pairs of oxygen.', show: [...reactants, 'd.move'], focus: 'd.move' },
        { say: 'Hydrogen fluoride loses a proton, so it is the acid. Water gains one, so it is the base.', show: ['d.acid', 'd.base'], focus: ['d.acid', 'd.base'] },
        { say: 'The water molecule becomes a hydronium ion, H three O plus, and a fluoride ion is left behind.', caption: 'The water molecule becomes a hydronium ion, H₃O⁺, and a fluoride ion is left behind.', show: products, focus: ['d.h3o-H0', 'd.h3o-bracket'] },
      ],
    },
    {
      chapter: 'The hydronium ion',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HF(aq) + H2O(l) <=> H3O+(aq) + F-(aq)}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hydronium ion', md: '$\\ce{H3O+}$ is a water molecule that has accepted a proton. In water, a free $\\ce{H+}$ is always attached to a water molecule, so chemists write $\\ce{H3O+(aq)}$: the ion that makes a solution acidic.' },
      ],
      lines: [
        { say: 'As an equation: hydrogen fluoride plus water, in equilibrium with hydronium ions and fluoride ions.', caption: 'As an equation: HF + H₂O ⇌ H₃O⁺ + F⁻.', show: 'm' },
        { say: 'The hydronium ion is a water molecule that has accepted a proton. In water, a free H plus is always attached to a water molecule, so chemists write H three O plus.', caption: 'The hydronium ion is a water molecule that has accepted a proton. In water, a free H⁺ is always attached to a water molecule, so chemists write H₃O⁺.', show: 'def' },
      ],
    },
    {
      chapter: 'Ammonia in water',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NH3(aq) + H2O(l) <=> NH4+(aq) + OH-(aq)}'] },
        { kind: 'bullets', id: 'b', items: ['$\\ce{NH3}$ becomes $\\ce{NH4+}$: it gains a proton, so it is the **base**.', '$\\ce{H2O}$ becomes $\\ce{OH-}$: it loses a proton, so it is the **acid**.', 'In the white smoke, $\\ce{HCl}$ is the acid and $\\ce{NH3}$ the base: no water at all.'] },
      ],
      lines: [
        { say: 'Now ammonia in water. Ammonia becomes ammonium, N H four plus: it gains a proton, so it is the base.', caption: 'Now ammonia in water. Ammonia becomes ammonium, NH₄⁺: it gains a proton, so it is the base.', show: ['m', 'b.0'], focus: 'b.0' },
        { say: 'Water becomes hydroxide, O H minus: it loses a proton, so here water is the acid. That is why a solution of ammonia contains hydroxide ions.', caption: 'Water becomes hydroxide, OH⁻: it loses a proton, so here water is the acid. That is why a solution of ammonia contains hydroxide ions.', show: 'b.1', focus: 'b.1' },
        { say: 'And in the white smoke, hydrogen chloride is the acid and ammonia is the base, with no water at all.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the reaction $\\ce{HNO2(aq) + NH3(aq) <=> NO2^-(aq) + NH4^+(aq)}$, which particle is the Brønsted–Lowry base?',
          choices: ['$\\ce{HNO2}$', '$\\ce{NO2-}$', '$\\ce{NH4+}$', '$\\ce{NH3}$'],
          answer: 3,
          working: '$\\ce{NH3}$ gains a proton and becomes $\\ce{NH4+}$, so it is the base. $\\ce{HNO2}$ loses the proton and becomes $\\ce{NO2-}$, so it is the acid.',
        },
      ],
      lines: [
        { say: 'Your turn. Nitrous acid reacts with ammonia, as shown. Which particle is the Bronsted-Lowry base? Pause the video and try it.', caption: 'Your turn. Nitrous acid reacts with ammonia, as shown. Which particle is the Brønsted–Lowry base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Ammonia gains a proton and becomes ammonium, so it is the base, and nitrous acid is the acid. Choice C, ammonium, is on the product side: it is what the base becomes.', show: 'q.answer' },
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
            'A hydrogen ion, $\\ce{H+}$, is a **proton**.',
            'A **Brønsted–Lowry acid** donates a proton; a **base** accepts one, in water or not.',
            'In water, a proton joins a water molecule to form the **hydronium ion**, $\\ce{H3O+}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A hydrogen ion, H plus, is a proton.', caption: 'Let’s sum up. A hydrogen ion, H⁺, is a proton.', show: 'sum.0' },
        { say: 'A Bronsted-Lowry acid donates a proton, and a base accepts one, in water or not.', caption: 'A Brønsted–Lowry acid donates a proton, and a base accepts one, in water or not.', show: 'sum.1' },
        { say: 'In water, a proton joins a water molecule to form the hydronium ion. In part two, you will find the acid and base on both sides of an equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
