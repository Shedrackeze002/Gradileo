import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { oval, tag } from './lib/c30-2a-figures.ts';

// Hydrogen peroxide, H–O–O–H: the O–O bond pair is shared equally, so each oxygen is −1.
const peroxide = figure(
  'p',
  [
    lewis({
      atoms: [
        { id: 'h1', symbol: 'H', at: [-2.4, 0] },
        { id: 'o1', symbol: 'O', at: [-0.8, 0], dots: [2, 0, 2, 0] },
        { id: 'o2', symbol: 'O', at: [0.8, 0], dots: [2, 0, 2, 0] },
        { id: 'h2', symbol: 'H', at: [2.4, 0] },
      ],
      bonds: [
        { from: 'h1', to: 'o1', dots: true },
        { from: 'o1', to: 'o2', dots: true },
        { from: 'o2', to: 'h2', dots: true },
      ],
      width: 5.6,
    }),
    oval('ring', [0, 0], 0.32, 0.45, { tone: 'theta' }),
    tag('ring-l', [0, 0.95], '\\text{shared equally}', { place: 'above', tone: 'theta', group: 'ring-g' }),
    tag('on-h1', [-2.4, -1.15], '+1', { place: 'below', group: 'on' }),
    tag('on-o1', [-0.8, -1.15], '\\adj{-1}', { place: 'below', group: 'on' }),
    tag('on-o2', [0.8, -1.15], '\\adj{-1}', { place: 'below', group: 'on' }),
    tag('on-h2', [2.4, -1.15], '+1', { place: 'below', group: 'on' }),
  ],
  360,
);

const video: Explainer = {
  id: 'c30-2-2-c',
  lessonId: 'c30-2-2',
  title: 'Oxidation Numbers, Part 3: Peroxides, Hydrides and Averages',
  thumbnailTitle: 'Peroxides, Hydrides and Averages',
  thumbnail: 'p',
  summary:
    'In a peroxide such as H₂O₂, two oxygen atoms are bonded to each other, so each is −1. In a metal hydride such as NaH, hydrogen is −1, and fluorine is always −1, which makes oxygen +2 in OF₂. An oxidation number that is not a whole number, such as +8/3 for iron in Fe₃O₄, is an average.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 3', title: 'Peroxides, Hydrides and Averages', subtitle: 'When the usual values do not fit' }],
      lines: [
        { say: 'Hydrogen peroxide, used to bleach hair, is made of hydrogen and oxygen, just like water. But its oxygen is not minus two.', show: 'title' },
        { say: 'In this part, you will see why the rules make exceptions for peroxides and metal hydrides, and what an oxidation number that is not a whole number means.' },
      ],
    },
    {
      chapter: 'Peroxides',
      layout: 'center',
      main: [
        peroxide,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If O were } {-2}\\text{: } 2(+1) + 2(-2) = {-2} \\ne 0', '2(+1) + 2x = 0 \\;\\Rightarrow\\; x = {-1}'] },
      ],
      lines: [
        { say: 'In a peroxide, two oxygen atoms are bonded to each other. Here is hydrogen peroxide, H two O two.', caption: 'In a peroxide, two oxygen atoms are bonded to each other. Here is hydrogen peroxide, H₂O₂.', show: ['p.h1', 'p.o1', 'p.o2', 'p.h2', 'p.o1-dots', 'p.o2-dots', 'p.bond-h1-o1', 'p.bond-o1-o2', 'p.bond-o2-h2'] },
        { say: 'Neither oxygen can take the electrons of that bond, because the two atoms pull equally. Each takes only the pair it shares with hydrogen.', show: ['p.ring', 'p.ring-g'], focus: 'p.ring' },
        { say: 'Check with the sum. Hydrogen is plus one. If oxygen were minus two, the total would be minus two, not zero. So this must be a peroxide.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times plus one, plus two x, equals zero, so two x is minus two, and each oxygen is minus one.', show: ['m.1', 'p.on'], focus: ['m.1', 'p.on'] },
      ],
    },
    {
      chapter: 'Metal hydrides and fluorine',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'hyd', tone: 'key', title: 'Metal hydride', md: 'Hydrogen bonded to a metal less electronegative than itself takes the electrons, so it is $-1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NaH}\\text{: } \\ce{Na}\\ {+1} \\qquad \\ce{H}\\ {-1}', '\\ce{OF2}\\text{: } x + 2(-1) = 0 \\;\\Rightarrow\\; \\ce{O}\\ {+2}'] },
      ],
      lines: [
        { say: 'In a metal hydride, hydrogen is bonded to a metal less electronegative than itself. So hydrogen takes the electrons, and is minus one.', show: 'hyd' },
        { say: 'In sodium hydride, N A H, sodium is a group one metal, plus one, and hydrogen is minus one. The sum is zero.', caption: 'In sodium hydride, NaH, sodium is a group 1 metal, +1, and hydrogen is −1. The sum is zero.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Fluorine is the only element more electronegative than oxygen, and it is always minus one in a compound. In oxygen dye-fluoride, O F two, two fluorines make minus two, so oxygen is plus two.',
          caption: 'Fluorine is the only element more electronegative than oxygen, and it is always −1 in a compound. In oxygen difluoride, OF₂, two fluorines make −2, so oxygen is +2.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'Averages',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Fe3O4}\\text{: } 3x + 4(-2) = 0 \\;\\Rightarrow\\; x = {+\\tfrac{8}{3}}',
            '\\ce{Fe^2+},\\ \\ce{Fe^3+},\\ \\ce{Fe^3+}\\text{: } \\dfrac{2 + 3 + 3}{3} = \\dfrac{8}{3}',
            '\\ce{C2H5OH}\\text{: } 2x + 6(+1) + (-2) = 0 \\;\\Rightarrow\\; x = {-2}',
          ],
        },
      ],
      lines: [
        {
          say: 'Some formulas give an oxidation number that is not a whole number. For iron in F E three O four, three x plus four times minus two equals zero, so x is plus eight thirds.',
          caption: 'Some formulas give an oxidation number that is not a whole number. For iron in Fe₃O₄, 3x + 4(−2) = 0, so x is +8/3.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'The compound holds both iron two and iron three ions, one iron two for every two iron three. Plus two, plus three, plus three is plus eight, shared over three atoms: an average of plus eight thirds.',
          caption: 'The compound holds both iron(II) and iron(III) ions, one Fe²⁺ for every two Fe³⁺. +2 + 3 + 3 is +8, shared over three atoms: an average of +8/3.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The two carbon atoms of ethanol are not alike either. Six hydrogens make plus six and the oxygen minus two, so the carbons share minus four: an average of minus two.',
          caption: 'The two carbon atoms of ethanol, C₂H₅OH, are not alike either. Six hydrogens make +6 and the oxygen −2, so the carbons share −4: an average of −2.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the oxidation number of hydrogen in calcium hydride, $\\ce{CaH2}$?',
          choices: ['$+1$', '$-2$', '$-1$', '$+2$'],
          answer: 2,
          working: 'Calcium is a group 2 metal, $+2$. The total is 0: $+2 + 2x = 0$, so each hydrogen is $-1$. It is a metal hydride.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the oxidation number of hydrogen in calcium hydride, C A H two? Pause the video and try it.', caption: 'Your turn. What is the oxidation number of hydrogen in calcium hydride, CaH₂? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C, minus one. Calcium is a group two metal, plus two, so the two hydrogens make minus two. Choice A, plus one, is hydrogen’s usual value, but here hydrogen is bonded to a metal.',
          show: 'q.answer',
        },
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
            'In a **peroxide**, with an O–O bond, oxygen is $-1$.',
            'In a **metal hydride**, hydrogen is $-1$. Fluorine is always $-1$, so oxygen is $+2$ in $\\ce{OF2}$.',
            'An oxidation number that is not a whole number is an **average**: $+\\tfrac{8}{3}$ for iron in $\\ce{Fe3O4}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a peroxide, two oxygen atoms are bonded together, and each is minus one.', show: 'sum.0' },
        { say: 'In a metal hydride, hydrogen is minus one, and fluorine is always minus one.', show: 'sum.1' },
        { say: 'An oxidation number that is not a whole number is an average. In part four, you will use changes in oxidation numbers to spot redox reactions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
