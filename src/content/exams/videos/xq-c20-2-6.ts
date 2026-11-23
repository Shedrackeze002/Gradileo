import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import avogadro from '@/content/chem20/videos/c20-2-6.ts';
import molar from '@/content/chem20/videos/c20-2-6-c.ts';

// Exam question for Chemistry 20 lesson 2.6 (Avogadro's law and molar volume): the volumes at STP
// of 10.0 g each of two refrigerant gases. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 43, section 9.2, CC BY-NC-SA 4.0). The book's answers: (a) 1.85 L,
// (b) 4.66 L. CCl2F2: 120.91 g/mol, 0.08271 mol; CH3CH2F: 48.06 g/mol, 0.2081 mol; × 22.4 L/mol.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's equal volumes of
// hydrogen and carbon dioxide with equal numbers of molecules, four gases at STP with equal volumes
// and different masses, and then the two 10.0 g samples, with about 2.5 times as many of the
// lighter molecules filling about 2.5 times the volume.

const GAS = { bond: 0.15, heavy: 0 } as const;

/** 10.0 g of each gas at STP: 4 heavy molecules in 1.85 L beside 10 light ones in 4.66 L. */
const samples: ParticlesEl = {
  kind: 'particles',
  id: 'sm',
  boxes: [
    { id: 'a', state: 'gas', width: 6, height: 12, temp: 1.6, lid: 0.32, piston: true, kinds: [{ n: 4, size: 1.3, tone: 'opp', ...GAS }], label: 'CCl₂F₂: 1.85 L' },
    { id: 'b', state: 'gas', width: 6, height: 12, temp: 1.6, lid: 0.8, piston: true, kinds: [{ n: 10, tone: 'adj', ...GAS }], label: 'CH₃CH₂F: 4.66 L' },
  ],
  clips: {},
  thermometers: true,
  height: 480,
};

const QUESTION =
  'The effect of chlorofluorocarbons (such as CCl2F2) on the depletion of the ozone layer is well known. The use of substitutes, such as CH3CH2F(g), for the chlorofluorocarbons, has largely corrected the problem. Calculate the volume occupied by 10.0 g of each of these compounds at STP: (a) CCl2F2(g) (b) CH3CH2F(g)';

const video: Explainer = {
  id: 'xq-c20-2-6',
  lessonId: '',
  exam: {
    lesson: 'c20-2-6',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 43, section 9.2, The Ideal Gas Law',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: QUESTION,
  },
  title: "Exam Question: Volumes of Two Gases at STP. Avogadro's Law and Molar Volume",
  thumbnailTitle: 'Same Mass, Different Volume',
  thumbnail: 'sm',
  summary:
    'A real test question, solved one small step at a time: what volume do 10.0 g of the ozone-damaging gas CCl2F2 and 10.0 g of its replacement, CH3CH2F, occupy at STP? We find each molar mass, change grams to moles, and multiply by the molar volume, 22.4 L/mol, and we see why the same mass of the lighter gas fills more room.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Same Mass, Different Volume', subtitle: 'Molar volume at STP, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two gases used in refrigerators. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'The effect of chlorofluorocarbons (such as $\\ce{CCl2F2}$) on the depletion of the ozone layer is well known. The use of substitutes, such as $\\ce{CH3CH2F}(g)$, for the chlorofluorocarbons, has largely corrected the problem. Calculate the volume occupied by $10.0\\ \\text{g}$ of each of these compounds at STP:<br>(a) $\\ce{CCl2F2}(g)$ (b) $\\ce{CH3CH2F}(g)$',
          answer: '(a) $1.85\\ \\text{L}$ (b) $4.66\\ \\text{L}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        {
          say: 'The effect of chlorofluorocarbons, such as C C l two F two, on the depletion of the ozone layer is well known. The use of substitutes, such as C H three C H two F gas, for the chlorofluorocarbons, has largely corrected the problem. Calculate the volume occupied by 10.0 grams of each of these compounds at S T P. Part a: C C l two F two gas. Part b: C H three C H two F gas.',
          caption: 'The effect of chlorofluorocarbons (such as CCl₂F₂) on the depletion of the ozone layer is well known. The use of substitutes, such as CH₃CH₂F(g), for the chlorofluorocarbons, has largely corrected the problem. Calculate the volume occupied by 10.0 g of each of these compounds at STP: (a) CCl₂F₂(g) (b) CH₃CH₂F(g)',
        },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: '$10.0\\ \\text{g}$ of each gas at **STP**: how many **litres**?' }],
      lines: [
        { say: 'We have the same mass, 10.0 grams, of two different gases.', show: 'plain' },
        { say: 'S T P means standard temperature and pressure: zero degrees Celsius and 101.325 kilopascals. We must find the volume each sample fills there.', caption: 'STP means standard temperature and pressure: 0 °C and 101.325 kPa. We must find the volume each sample fills there.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(avogadro, 'e')],
      lines: [
        { say: 'Here is what we need. Equal volumes of gases, at the same temperature and pressure, hold equal numbers of molecules, whichever gas they are. Here, six molecules of hydrogen and six of carbon dioxide fill the same space.', show: ['e', 'e.labels', 'e.thermo'] },
        { say: 'That is Avogadro\'s law. The volume of a gas depends on how many particles it has, and not on what they are.' },
      ],
    },
    {
      chapter: 'One mole at STP',
      layout: 'center',
      main: [pick(molar, 'g'), { kind: 'math', id: 'vm', size: 'md', lines: ['V_m = 22.4\\ \\text{L/mol at STP}'] }],
      lines: [
        { say: 'So one mole of any gas fills the same volume. At S T P, that molar volume is 22.4 litres per mole.', show: ['g', 'g.labels', 'vm'], caption: 'So one mole of any gas fills the same volume. At STP, that molar volume is 22.4 L/mol.' },
        { say: 'The masses are different, though: a mole of hydrogen is about 2 grams, and a mole of carbon dioxide is 44. So to get from grams to litres, we go through moles.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **molar mass** $M$', 'Moles: $n = m / M$', 'Volume: $V = n \\times 22.4\\ \\text{L/mol}$'] }],
      lines: [
        { say: 'Here is the plan, for each gas. First, add up the molar mass from the atomic masses.', show: 'plan.0' },
        { say: 'Second, divide the mass by the molar mass to get moles.', show: 'plan.1' },
        { say: 'Third, multiply the moles by the molar volume, 22.4 litres per mole.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: [
            'M = 12.01 + 2(35.45) + 2(19.00) = \\adj{120.91\\ \\text{g/mol}}',
            'n = \\dfrac{10.0\\ \\cancel{\\text{g}}}{120.91\\ \\cancel{\\text{g}}\\text{/mol}} = 0.08271\\ \\text{mol}',
            'V = 0.08271\\ \\cancel{\\text{mol}} \\times 22.4\\ \\text{L/}\\cancel{\\text{mol}} = \\good{1.85\\ \\text{L}}',
          ],
        },
      ],
      lines: [
        { say: 'Step one, part a. One carbon at 12.01, two chlorines at 35.45 each, and two fluorines at 19.00 each make 120.91 grams per mole.', show: 'a.0', caption: 'Step one, part (a). One carbon at 12.01, two chlorines at 35.45 each, and two fluorines at 19.00 each make 120.91 g/mol.' },
        { say: '10.0 grams divided by 120.91 grams per mole is zero point zero eight two seven one moles.', show: 'a.1', caption: '10.0 g ÷ 120.91 g/mol = 0.08271 mol.' },
        { say: 'Times 22.4 litres per mole, that is one point eight five litres.', show: 'a.2', focus: 'a.2', caption: 'Times 22.4 L/mol, that is 1.85 L.' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          lines: [
            'M = 2(12.01) + 5(1.008) + 19.00 = \\adj{48.06\\ \\text{g/mol}}',
            'n = \\dfrac{10.0\\ \\cancel{\\text{g}}}{48.06\\ \\cancel{\\text{g}}\\text{/mol}} = 0.2081\\ \\text{mol}',
            'V = 0.2081\\ \\cancel{\\text{mol}} \\times 22.4\\ \\text{L/}\\cancel{\\text{mol}} = \\good{4.66\\ \\text{L}}',
          ],
        },
      ],
      lines: [
        { say: 'Step two, part b. C H three C H two F has two carbons, five hydrogens and one fluorine: 2 times 12.01, plus 5 times 1.008, plus 19.00, which is 48.06 grams per mole.', show: 'b.0', caption: 'Step two, part (b). CH₃CH₂F has two carbons, five hydrogens and one fluorine: 2 × 12.01 + 5 × 1.008 + 19.00 = 48.06 g/mol.' },
        { say: '10.0 grams divided by 48.06 grams per mole is zero point two zero eight one moles.', show: 'b.1', caption: '10.0 g ÷ 48.06 g/mol = 0.2081 mol.' },
        { say: 'Times 22.4 litres per mole, that is four point six six litres.', show: 'b.2', focus: 'b.2', caption: 'Times 22.4 L/mol, that is 4.66 L.' },
      ],
    },
    {
      chapter: 'Step 3: Compare them',
      layout: 'center',
      main: [samples],
      lines: [
        { say: 'Step three: compare. Here are the two samples at S T P. Each ball stands for a crowd of molecules.', show: ['sm', 'sm.labels', 'sm.thermo'], caption: 'Step three: compare. Here are the two samples at STP. Each ball stands for a crowd of molecules.' },
        { say: 'The replacement gas has lighter molecules, so 10 grams of it holds about two and a half times as many. At the same temperature and pressure, more molecules need more room, so it fills about two and a half times the volume.', focus: 'sm.b' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Molar mass', 'Moles', 'Volume at STP'],
          rows: [
            ['(a) $\\ce{CCl2F2}$', '120.91 g/mol', '0.08271 mol', '**1.85 L**'],
            ['(b) $\\ce{CH3CH2F}$', '48.06 g/mol', '0.2081 mol', '**4.66 L**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer: one point eight five litres for part a, and four point six six litres for part b. That matches the book.', show: 'ans', caption: 'Here is the whole answer: 1.85 L for part (a), and 4.66 L for part (b). That matches the book.' },
        { say: 'A quick check: the molar masses are in the ratio of about 2.5 to 1, and the volumes are in the ratio of about 1 to 2.5, the other way round, as they should be.' },
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
            ['(a) $224\\ \\text{L}$', 'Multiplied the **grams** by 22.4: change to moles first'],
            ['(a) $2.05\\ \\text{L}$', 'Used **24.8 L/mol**, the molar volume at SATP'],
            ['(a) $271\\ \\text{L}$', 'Divided the wrong way: $n = m / M$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Multiplying the 10.0 grams straight by 22.4. The molar volume is litres per mole, so we must change grams to moles first.', focus: 'traps.0' },
        { say: 'Using 24.8 litres per mole. That is the molar volume at S A T P, 25 degrees and 100 kilopascals. This question says S T P, so it is 22.4.', focus: 'traps.1', caption: 'Using 24.8 L/mol. That is the molar volume at SATP, 25 °C and 100 kPa. This question says STP, so it is 22.4.' },
        { say: 'And dividing the molar mass by the mass, 120.91 over 10.0. The moles are the mass divided by the molar mass.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What volume does $0.50\\ \\text{mol}$ of any gas occupy at STP?',
          choices: ['$0.50\\ \\text{L}$', '$11.2\\ \\text{L}$', '$22.4\\ \\text{L}$', '$44.8\\ \\text{L}$'],
          answer: 1,
          working: 'V = 0.50 mol × 22.4 L/mol = 11.2 L, whichever gas it is.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume does zero point five zero moles of any gas occupy at S T P? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What volume does 0.50 mol of any gas occupy at STP? Pause the video and try it.' },
        { say: 'Zero point five zero moles times 22.4 litres per mole is 11.2 litres, whichever gas it is: choice B.', show: 'q2.answer', caption: '0.50 mol × 22.4 L/mol = 11.2 L, whichever gas it is: choice B.' },
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
          items: ['One mole of **any** gas: $22.4\\ \\text{L}$ at STP', 'Grams to moles: $n = m / M$', 'Then $V = n \\times V_m$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. One mole of any gas fills 22.4 litres at S T P.', show: 'sum.0', caption: 'Here is what to remember. One mole of any gas fills 22.4 L at STP.' },
        { say: 'To start from a mass, divide by the molar mass to get moles.', show: 'sum.1' },
        { say: 'Then multiply the moles by the molar volume. For more on Avogadro\'s law and molar volume, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
