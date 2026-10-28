import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, room, structure, tag, type GridAtom } from './lib/c30-3b-figures.ts';

/** A chain of carbon atoms only (hydrogens not shown), with a double bond after carbon `double` if given. */
function carbons(name: string, n: number, at: [number, number], o: { double?: number; tone?: 'good' | 'adj' } = {}) {
  const atoms: Record<string, GridAtom> = {};
  const bonds: string[] = [];
  for (let i = 0; i < n; i++) {
    atoms[`C${i}`] = o.tone ? ['C', i, 0, o.tone] : ['C', i, 0];
    if (i > 0) bonds.push(`C${i - 1}${o.double === i - 1 ? '=' : '-'}C${i}`);
  }
  return structure({ name, unit: 1.1, at, atoms, bonds: bonds.join(' ') });
}

// Decane's ten carbons (top) break into octane's eight and ethene's two (bottom); hydrogens not shown.
const crack = figure(
  'f',
  [
    carbons('big', 10, [0, 2.6]),
    tag('big-name', [11.0, 2.6], '\\ce{C10H22}', { place: 'right', tone: 'muted' }),
    arrow('arrow', [5.0, 1.9], [5.0, 0.8]),
    carbons('alk', 8, [0, 0], { tone: 'adj' }),
    tag('plus', [8.75, 0], '+'),
    carbons('ene', 2, [9.6, 0], { double: 0, tone: 'good' }),
    tag('alk-name', [3.85, -0.75], '\\ce{C8H18}\\ \\text{(an alkane)}', { tone: 'adj' }),
    tag('ene-name', [10.15, -0.75], '\\ce{C2H4}\\ \\text{(ethene)}', { tone: 'good' }),
    room('room', [-0.4, -1.1], [13.0, 3.0]),
  ],
  330,
);

const video: Explainer = {
  id: 'c30-3-7-b',
  lessonId: 'c30-3-7',
  title: 'Fossil Fuels and Combustion, Part 2: Cracking',
  thumbnailTitle: 'Cracking',
  thumbnail: 'f',
  summary:
    'Cracking breaks large alkane molecules into smaller ones by heating them, often with a catalyst: the products are a smaller alkane and one or more alkenes, such as ethene and propene, which are used to make polymers. Atoms are conserved, so a missing product is found by counting carbons and hydrogens: C₁₄H₃₀ → C₈H₁₈ + 2C₃H₆.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Cracking', subtitle: 'Breaking big molecules into useful ones' }],
      lines: [
        { say: 'Crude oil holds more large molecules than are needed, and fewer of the small ones in demand for petrol.', show: 'title' },
        { say: 'In this part, you will see how cracking fixes that mismatch, and how to complete a cracking equation by counting atoms.' },
      ],
    },
    {
      chapter: 'Cracking',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cracking', md: 'Breaks large alkane molecules into smaller ones by heating them, often with a catalyst. The products are a **smaller alkane** and one or more **alkenes**, such as ethene and propene.' },
        crack,
      ],
      lines: [
        { say: 'Cracking breaks large alkane molecules into smaller ones, by heating them, often with a catalyst.', show: 'def' },
        { say: 'Here is decane, with ten carbon atoms. Only its carbons are drawn here, to keep the picture simple.', caption: 'Here is decane, C₁₀H₂₂, with ten carbon atoms. Only its carbons are drawn here, to keep the picture simple.', show: ['f.big', 'f.big-name'] },
        { say: 'Cracking can break it into octane, an alkane with eight carbons, and ethene, an alkene with two.', show: ['f.arrow', 'f.alk', 'f.plus', 'f.ene', 'f.alk-name', 'f.ene-name'] },
        { say: 'The products are always a smaller alkane and one or more alkenes. Alkenes such as ethene and propene are used to make polymers and other chemicals, which is another reason cracking matters.', focus: ['f.ene', 'f.ene-name'] },
      ],
    },
    {
      chapter: 'Atoms are conserved',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{C10H22 -> C8H18 + C2H4}', '\\text{C: } 10 = 8 + 2 \\qquad \\text{H: } 22 = 18 + 4'] },
        { kind: 'text', id: 't', size: 'md', md: 'An alkane is $\\text{C}_n\\text{H}_{2n+2}$; an alkene with one double bond is $\\text{C}_n\\text{H}_{2n}$.' },
      ],
      lines: [
        { say: 'Atoms are conserved, so the products contain all the carbon and hydrogen atoms of the large molecule.', show: 'm.0' },
        { say: 'Check: ten carbons on the left, and eight plus two on the right. Twenty-two hydrogens on the left, and eighteen plus four on the right.', show: 'm.1', focus: 'm.1' },
        { say: 'It helps to remember the general formulas. An alkane is C n H two n plus two, and an alkene with one double bond is C n H two n.', caption: 'It helps to remember the general formulas. An alkane is CₙH₂ₙ₊₂, and an alkene with one double bond is CₙH₂ₙ.', show: 't' },
      ],
    },
    {
      chapter: 'A missing product',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Complete the cracking equation $\\ce{C14H30 -> C8H18 + 2X}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{C: } 14 - 8 = 6, \\ \\text{shared by 2 molecules: 3 each}', '\\text{H: } 30 - 18 = 12, \\ \\text{shared by 2 molecules: 6 each}', '\\ce{X = C3H6}\\ \\text{(propene)}', '\\ce{C14H30 -> C8H18 + 2C3H6}'],
        },
      ],
      lines: [
        { say: 'Try one. Complete the cracking equation: C fourteen H thirty gives C eight H eighteen, plus two molecules of X.', caption: 'Try one. Complete the cracking equation: C₁₄H₃₀ → C₈H₁₈ + 2X.', show: 'q' },
        { say: 'Carbon first. Fourteen minus eight leaves six carbon atoms, shared between two molecules: three each.', show: 'm.0', focus: 'm.0' },
        { say: 'Hydrogen next. Thirty minus eighteen leaves twelve hydrogen atoms, shared between two molecules: six each.', show: 'm.1', focus: 'm.1' },
        { say: 'So X is C three H six. That fits C n H two n, so it is an alkene: propene.', caption: 'So X is C₃H₆. That fits CₙH₂ₙ, so it is an alkene: propene.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Cracking breaks a large alkane into smaller molecules: $\\ce{C16H34 -> C10H22 + 2X}$. What is the formula of X?',
          choices: ['$\\ce{C6H12}$', '$\\ce{C3H8}$', '$\\ce{C3H6}$', '$\\ce{C6H14}$'],
          answer: 2,
          working: 'Carbon: $16 - 10 = 6$, shared by 2 molecules: 3 each. Hydrogen: $34 - 22 = 12$, 6 each. X is $\\ce{C3H6}$, propene: $\\ce{C16H34 -> C10H22 + 2C3H6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. C sixteen H thirty-four gives C ten H twenty-two, plus two molecules of X. What is the formula of X? Pause the video and try it.', caption: 'Your turn. C₁₆H₃₄ → C₁₀H₂₂ + 2X. What is the formula of X? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, C three H six. Sixteen minus ten leaves six carbons, three in each molecule, and thirty-four minus twenty-two leaves twelve hydrogens, six in each. Choice A forgets that there are two molecules of X.', caption: 'The answer is C, C₃H₆. Sixteen minus ten leaves six carbons, three in each molecule, and thirty-four minus twenty-two leaves twelve hydrogens, six in each. Choice A forgets that there are two molecules of X.', show: 'q.answer' },
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
            '**Cracking** breaks large alkanes into smaller ones by heating, often with a catalyst.',
            'The products are a smaller alkane and one or more alkenes, used to make polymers.',
            'Atoms are conserved: $\\ce{C10H22 -> C8H18 + C2H4}$.',
            'For a missing product, subtract the carbons and hydrogens, then share them among the molecules.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Cracking breaks large alkane molecules into smaller ones, by heating them, often with a catalyst.', show: 'sum.0' },
        { say: 'The products are a smaller alkane and one or more alkenes, which are used to make polymers.', show: 'sum.1' },
        { say: 'Atoms are conserved, so the carbons and hydrogens add up on both sides.', show: 'sum.2' },
        { say: 'To find a missing product, subtract the atoms, then share them among the molecules. In part three, you will balance combustion equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
