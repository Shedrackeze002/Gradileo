import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import { enScale, enTable } from '@/content/chem20/videos/lib/c20-1a-figures.ts';
import intro from '@/content/chem20/videos/c20-1-4.ts';
import charges from '@/content/chem20/videos/c20-1-4-c.ts';

// Exam question for Chemistry 20 lesson 1.4 (electronegativity and bond types): which of five bonds
// is the most polar. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter
// exercise 20, section 7.2, CC BY-NC-SA 4.0). The answer is (d) O–H, with the largest
// electronegativity difference, 3.4 − 2.2 = 1.2, on the course's values (selenium, not in the
// course's table, is 2.6 to one decimal place).
//
// The pictures are the lessons' own (src/video/atoms.ts): the tug-of-war between two hydrogen atoms
// and between hydrogen and chlorine, the course's table of values, the bond-type scale with the five
// bonds marked, and water's oxygen pulling its shared pairs towards itself.

const CHOICES = ['C–C', 'C–H', 'N–H', 'O–H', 'Se–H'];

const values = figure('en', [enTable({ highlights: [{ id: 'key', cells: ['H', 'C', 'N', 'O'], tone: 'theta' }] })], 560);

const scale = figure(
  'sc',
  [
    enScale({
      max: 2,
      length: 16,
      marks: [
        { id: 'cc', value: 0, tex: '\\text{C–C}', tone: 'good' },
        { id: 'ch', value: 0.4, tex: '\\begin{gathered}\\text{C–H}\\\\\\text{Se–H}\\end{gathered}', tone: 'good' },
        { id: 'nh', value: 0.8, tex: '\\text{N–H}', tone: 'theta' },
        { id: 'oh', value: 1.2, tex: '\\text{O–H}', tone: 'opp' },
      ],
    }),
  ],
  420,
);

const video: Explainer = {
  id: 'xq-c20-1-4',
  lessonId: '',
  exam: {
    lesson: 'c20-1-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 20, section 7.2, Covalent Bonding',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/7-exercises',
    question: 'Which is the most polar bond?',
    choices: CHOICES,
  },
  title: 'Exam Question: Which Bond Is the Most Polar? Electronegativity and Bond Types',
  thumbnailTitle: 'The Most Polar Bond',
  thumbnail: 'oh',
  summary:
    'A real test question, solved one small step at a time: which of five bonds, C–C, C–H, N–H, O–H and Se–H, is the most polar? We look up the electronegativity of each atom, take the difference for each bond, place the bonds on the bond-type scale, and watch oxygen pull the shared electrons towards itself.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Most Polar Bond', subtitle: 'Electronegativity differences, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks which of five bonds is the most polar. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Which is the most polar bond?', choices: CHOICES, answer: 3 }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        {
          say: 'Which is the most polar bond? A, carbon to carbon. B, carbon to hydrogen. C, nitrogen to hydrogen. D, oxygen to hydrogen. E, selenium to hydrogen.',
          caption: 'Which is the most polar bond? (a) C–C (b) C–H (c) N–H (d) O–H (e) Se–H',
        },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'The most polar bond has the **largest difference** in electronegativity' }],
      lines: [
        { say: 'A polar bond is one where the shared electrons sit closer to one atom than the other.', show: 'plain' },
        { say: 'The bigger the difference in electronegativity between the two atoms, the more lopsided the sharing, so we are looking for the bond with the largest difference.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(intro, 'tug')],
      lines: [
        { say: 'Here is what we need. A bond is a tug-of-war over a shared pair of electrons. Two hydrogen atoms pull equally, so the pair sits in the middle.', show: ['tug', 'tug.labels'], play: 'tug.hh' },
        { say: 'Hydrogen and chlorine share a pair too, but chlorine pulls harder.', play: 'tug.hcl' },
        { say: 'So the pair slides towards chlorine. Electronegativity measures that pull, and the difference between the two atoms measures how polar the bond is.', play: 'tug.pull' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look up the **electronegativity** of each atom', 'Find the **difference** for each bond: larger minus smaller', 'The **largest difference** is the most polar bond'] }],
      lines: [
        { say: 'Here is the plan. First, look up the electronegativity of each atom.', show: 'plan.0' },
        { say: 'Second, find the difference for each bond, always the larger value minus the smaller.', show: 'plan.1' },
        { say: 'Third, the bond with the largest difference is the most polar.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The values',
      layout: 'split',
      leftWidth: 1000,
      left: [values],
      right: [{ kind: 'math', id: 'v', size: 'md', align: 'left', lines: ['\\text{H } 2.2', '\\text{C } 2.6', '\\text{N } 3.0', '\\text{O } 3.4', '\\text{Se } 2.6'] }],
      lines: [
        { say: 'Step one. Here are the electronegativity values this course uses.', show: 'en.table' },
        { say: 'Hydrogen is two point two, carbon two point six, nitrogen three point zero, and oxygen three point four.', show: ['en.key', 'v.0', 'v.1', 'v.2', 'v.3'], focus: 'en.key' },
        { say: 'Selenium is not on our table. It sits just below sulfur in group sixteen, and its value is also about two point six.', show: 'v.4' },
      ],
    },
    {
      chapter: 'Step 2: The differences',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'd',
          size: 'lg',
          lines: [
            '\\text{C–C: } 2.6 - 2.6 = \\good{0}',
            '\\text{C–H: } 2.6 - 2.2 = \\good{0.4}',
            '\\text{N–H: } 3.0 - 2.2 = \\thc{0.8}',
            '\\text{O–H: } 3.4 - 2.2 = \\opp{1.2}',
            '\\text{Se–H: } 2.6 - 2.2 = \\good{0.4}',
          ],
        },
      ],
      lines: [
        { say: 'Step two: the difference for each bond. Carbon to carbon is two point six minus two point six, which is zero. Two identical atoms share equally.', show: 'd.0', caption: 'Step two: the difference for each bond. C–C is 2.6 − 2.6 = 0. Two identical atoms share equally.' },
        { say: 'Carbon to hydrogen is two point six minus two point two, which is zero point four.', show: 'd.1', caption: 'C–H is 2.6 − 2.2 = 0.4.' },
        { say: 'Nitrogen to hydrogen is three point zero minus two point two, which is zero point eight.', show: 'd.2', caption: 'N–H is 3.0 − 2.2 = 0.8.' },
        { say: 'Oxygen to hydrogen is three point four minus two point two, which is one point two.', show: 'd.3', caption: 'O–H is 3.4 − 2.2 = 1.2.' },
        { say: 'And selenium to hydrogen is two point six minus two point two, which is zero point four, the same as carbon to hydrogen.', show: 'd.4', caption: 'And Se–H is 2.6 − 2.2 = 0.4, the same as C–H.' },
      ],
    },
    {
      chapter: 'Step 3: On the scale',
      layout: 'center',
      main: [scale],
      lines: [
        { say: 'Step three: we place the five bonds on the bond-type scale. Below zero point five the bond is non-polar covalent.', show: ['sc.axis', 'sc.nonpolar', 'sc.cc', 'sc.ch'], caption: 'Step three: we place the five bonds on the bond-type scale. Below 0.5 the bond is non-polar covalent.' },
        { say: 'Carbon to carbon, carbon to hydrogen and selenium to hydrogen all land there.', focus: ['sc.cc', 'sc.ch'], caption: 'C–C, C–H and Se–H all land there.' },
        { say: 'From zero point five up to one point seven it is polar covalent, and nitrogen to hydrogen and oxygen to hydrogen land in that band.', show: ['sc.polar', 'sc.ionic', 'sc.nh', 'sc.oh'], caption: 'From 0.5 up to 1.7 it is polar covalent, and N–H and O–H land in that band.' },
        { say: 'Oxygen to hydrogen is furthest along, so it is the most polar bond of the five: choice D.', focus: 'sc.oh', caption: 'O–H is furthest along, so it is the most polar bond of the five: choice (d).' },
      ],
    },
    {
      chapter: 'Watch the O–H bond',
      layout: 'center',
      main: [pick(charges, 'oh')],
      lines: [
        { say: 'Here is that bond at work in a water molecule. Oxygen shares a pair of electrons with each hydrogen atom.', show: ['oh', 'oh.labels'], play: 'oh.share' },
        { say: 'Oxygen is much more electronegative than hydrogen, so it pulls both shared pairs towards itself.', play: 'oh.pull' },
        { say: 'That makes oxygen the slightly negative end, delta minus, and each hydrogen slightly positive, delta plus.', show: 'oh.charges', caption: 'That makes oxygen the slightly negative end, δ−, and each hydrogen slightly positive, δ+.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Bond', 'Difference', 'Type'],
          rows: [
            ['C–C', '0', 'non-polar covalent'],
            ['C–H', '0.4', 'non-polar covalent'],
            ['N–H', '0.8', 'polar covalent'],
            ['**O–H**', '**1.2**', '**polar covalent, the most polar**'],
            ['Se–H', '0.4', 'non-polar covalent'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. The most polar bond is oxygen to hydrogen, choice D, with a difference of one point two.', show: 'ans', focus: 'ans.3', caption: 'Here is the whole answer. The most polar bond is O–H, choice (d), with a difference of 1.2.' },
        { say: 'A quick check with the trends: oxygen is the furthest right and highest up of these atoms, so it pulls hardest, and hydrogen is the weakest puller here, so the oxygen to hydrogen pair is the most mismatched.', caption: 'A quick check with the trends: oxygen is the furthest right and highest up of these atoms, so it pulls hardest, and hydrogen is the weakest puller here, so O–H is the most mismatched pair.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['(e) Se–H', 'Picked the **biggest** atom; only the **difference** counts'],
            ['(c) N–H', 'Nitrogen is strongly electronegative, but **oxygen** is more so'],
            ['(a) C–C', 'Same atoms means a difference of **0**, the least polar'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Choosing selenium to hydrogen because selenium is the biggest, heaviest atom. Size does not decide polarity. Only the difference in electronegativity does, and here it is just zero point four.', focus: 'traps.0', caption: 'Choosing Se–H because selenium is the biggest, heaviest atom. Size does not decide polarity. Only the difference in electronegativity does, and here it is just 0.4.' },
        { say: 'Choosing nitrogen to hydrogen. Nitrogen is a strong puller, but oxygen is one step further right in the same period, so it pulls harder still.', focus: 'traps.1', caption: 'Choosing N–H. Nitrogen is a strong puller, but oxygen is one step further right in the same period, so it pulls harder still.' },
        { say: 'And choosing carbon to carbon. Two identical atoms always share equally, so this is the least polar bond of all.', focus: 'traps.2', caption: 'And choosing C–C. Two identical atoms always share equally, so this is the least polar bond of all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Using C $2.6$, H $2.2$, N $3.0$, O $3.4$ and F $4.0$, which bond is the **most polar**?',
          choices: ['C–H', 'C–N', 'C–O', 'C–F'],
          answer: 3,
          working: 'C–F: 4.0 − 2.6 = 1.4, the largest difference.',
        },
      ],
      lines: [
        { say: 'Your turn. Using carbon two point six, hydrogen two point two, nitrogen three point zero, oxygen three point four and fluorine four point zero, which bond is the most polar: carbon to hydrogen, carbon to nitrogen, carbon to oxygen, or carbon to fluorine? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Using C 2.6, H 2.2, N 3.0, O 3.4 and F 4.0, which bond is the most polar: C–H, C–N, C–O or C–F? Pause the video and try it.' },
        { say: 'The differences are zero point four, zero point four, zero point eight and one point four, so carbon to fluorine is the most polar: choice D.', show: 'q2.answer', caption: 'The differences are 0.4, 0.4, 0.8 and 1.4, so C–F is the most polar: choice D.' },
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
          items: ['Polarity comes from the **difference** in electronegativity', 'Difference = **larger − smaller**', 'Largest difference: the **most polar** bond'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. How polar a bond is depends on the difference in electronegativity between its two atoms.', show: 'sum.0' },
        { say: 'The difference is always the larger value minus the smaller one.', show: 'sum.1' },
        { say: 'And the bond with the largest difference is the most polar. For more on electronegativity and bond types, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
