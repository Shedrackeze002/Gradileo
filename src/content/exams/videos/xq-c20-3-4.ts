import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import fromMass from '@/content/chem20/videos/c20-3-4-b.ts';

// Exam question for Chemistry 20 lesson 3.4 (molar concentration): outline the steps, then find
// the molarity of a solution of 0.0908 g of KMnO4 in 0.500 L. The question is OpenStax Chemistry
// 2e's own, word for word (end-of-chapter exercise 53, section 3.3, CC BY-NC-SA 4.0). The answer:
// mass to moles with the molar mass (158.04 g/mol), n = 5.745 x 10^-4 mol, then c = n / V =
// 1.15 x 10^-3 mol/L, which matches the book's answer.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's crystal of sodium
// chloride dissolving, then the permanganate solution in a 0.500 L box beside 1.000 L of the same
// solution, holding twice as many particles at the same crowding (molarity counts moles per litre).

const SOLUTE = { bond: 0.05, heavy: 0, size: 1.2, tone: 'hyp', name: 'potassium permanganate' } as const;

/** A box of the solution: the same crowding whatever its volume. */
const portion = (id: string, n: number, width: number, label: string): ParticleBox => ({ id, state: 'gas', kinds: [{ n, ...SOLUTE }], width, height: 8, temp: 0.4, label });

const perLitre: ParticlesEl = {
  kind: 'particles',
  id: 'pl',
  boxes: [portion('h', 4, 6, '0.500 L: 5.75 × 10⁻⁴ mol'), portion('f', 8, 12, '1.000 L: 1.15 × 10⁻³ mol')],
  clips: {},
  key: true,
  seed: 3,
  height: 340,
};

const QUESTION =
  'Consider this question: What is the molarity of KMnO4 in a solution of 0.0908 g of KMnO4 in 0.500 L of solution? (a) Outline the steps necessary to answer the question. (b) Answer the question.';

const video: Explainer = {
  id: 'xq-c20-3-4',
  lessonId: '',
  exam: {
    lesson: 'c20-3-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 53, section 3.3, Molarity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/3-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Molarity of a Permanganate Solution. Molar Concentration',
  thumbnailTitle: 'Molarity from a Mass',
  thumbnail: 'pl',
  summary:
    'A real test question, solved one small step at a time: what is the molar concentration of 0.0908 g of potassium permanganate in 0.500 L of solution? We outline the steps, turn grams into moles with the molar mass, divide by the volume in litres, and get 1.15 × 10⁻³ mol/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Molarity from a Mass', subtitle: 'Grams to moles to moles per litre' }],
      lines: [
        { say: 'In this video, we solve a real test question about the molar concentration of a solution made from a weighed solid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Consider this question: What is the molarity of $\\ce{KMnO4}$ in a solution of $0.0908\\ \\text{g}$ of $\\ce{KMnO4}$ in $0.500\\ \\text{L}$ of solution?<br>(a) Outline the steps necessary to answer the question.<br>(b) Answer the question.',
          answer: '1.15 × 10⁻³ mol/L',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Consider this question: What is the molarity of K M n O four in a solution of zero point zero nine zero eight grams of K M n O four in zero point five zero zero litres of solution?', caption: 'Consider this question: What is the molarity of KMnO₄ in a solution of 0.0908 g of KMnO₄ in 0.500 L of solution?' },
        { say: 'Part a: outline the steps necessary to answer the question. Part b: answer the question.', caption: '(a) Outline the steps necessary to answer the question. (b) Answer the question.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'How many **moles** of $\\ce{KMnO4}$ are there in each **litre** of this solution?' }],
      lines: [
        { say: 'Molarity is the molar concentration, the moles of solute in each litre of solution. Its unit is moles per litre, written capital M or mol per L.', show: 'plain' },
        { say: 'We are given a mass in grams, so first we describe how to get from grams to moles per litre, and then we do it.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 600,
      left: [pick(fromMass, 'sd')],
      right: [
        { kind: 'math', id: 'k', size: 'md', lines: ['n = \\dfrac{m}{M}', 'c = \\dfrac{n}{V} \\quad (V \\text{ in litres})'] },
      ],
      lines: [
        { say: 'Here is what we need. A weighed solid dissolves and spreads through the solution, and we know its mass in grams.', show: ['sd', 'sd.labels', 'sd.key'], play: 'sd.drop' },
        { say: 'To count its moles, divide the mass by the molar mass: n equals m over capital M.', show: 'k.0', caption: 'To count its moles, divide the mass by the molar mass: n = m ÷ M.' },
        { say: 'Then the molar concentration is the moles divided by the volume of solution, in litres: c equals n over V.', show: 'k.1', caption: 'Then the molar concentration is the moles divided by the volume of solution, in litres: c = n ÷ V.' },
      ],
    },
    {
      chapter: 'Part (a): The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **molar mass** of $\\ce{KMnO4}$ from the periodic table', 'Divide the **mass** by the molar mass to get **moles**', 'Divide the moles by the **volume in litres**'],
        },
      ],
      lines: [
        { say: 'Part a asks for the steps, and they are our plan. First, find the molar mass of potassium permanganate from the periodic table.', show: 'plan.0' },
        { say: 'Second, divide the mass in grams by the molar mass, to get the amount in moles.', show: 'plan.1' },
        { say: 'Third, divide the moles by the volume of the solution in litres. That gives the molarity.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Molar mass',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'mm',
          size: 'lg',
          lines: ['\\ce{K}: 39.10 \\quad \\ce{Mn}: 54.94 \\quad \\ce{O}: 4 \\times 16.00 = 64.00', 'M = 39.10 + 54.94 + 64.00 = \\good{158.04\\ \\text{g/mol}}'],
        },
      ],
      lines: [
        { say: 'Step one. One formula unit has one potassium, one manganese and four oxygen atoms. Their molar masses are thirty nine point one zero, fifty four point nine four, and four times sixteen point zero zero, which is sixty four point zero zero grams per mole.', show: 'mm.0', caption: 'Step one. KMnO₄ has one K, one Mn and four O. Their molar masses are 39.10, 54.94, and 4 × 16.00 = 64.00 g/mol.' },
        { say: 'Add them up: one hundred and fifty eight point zero four grams per mole.', show: 'mm.1', focus: 'mm.1', caption: 'Add them up: M = 158.04 g/mol.' },
      ],
    },
    {
      chapter: 'Step 2: Moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['n = \\dfrac{m}{M} = \\dfrac{0.0908\\ \\text{g}}{158.04\\ \\text{g/mol}}', '= \\good{5.745 \\times 10^{-4}\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. The amount is the mass divided by the molar mass: zero point zero nine zero eight grams divided by one hundred and fifty eight point zero four grams per mole.', show: 'n.0', caption: 'Step two. n = m ÷ M = 0.0908 g ÷ 158.04 g/mol.' },
        { say: 'That is five point seven four five times ten to the minus four moles. We keep the extra digit until the end.', show: 'n.1', focus: 'n.1', caption: 'That is 5.745 × 10⁻⁴ mol. We keep the extra digit until the end.' },
      ],
    },
    {
      chapter: 'Step 3: Moles per litre',
      layout: 'center',
      main: [
        perLitre,
        { kind: 'math', id: 'c', size: 'md', lines: ['c = \\dfrac{5.745 \\times 10^{-4}\\ \\text{mol}}{0.500\\ \\text{L}} = \\good{1.15 \\times 10^{-3}\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'Step three. Here is our solution: zero point five zero zero litres, holding five point seven five times ten to the minus four moles.', show: ['pl', 'pl.labels', 'pl.key'], focus: 'pl.h', caption: 'Step three. Here is our solution: 0.500 L, holding 5.75 × 10⁻⁴ mol.' },
        { say: 'Molarity asks how much would be in a whole litre. A litre of the same solution is twice the volume, with the same crowding, so it holds twice as much.', focus: 'pl.f' },
        { say: 'Dividing by the volume in litres does exactly that: five point seven four five times ten to the minus four, divided by zero point five zero zero, is one point one five times ten to the minus three moles per litre.', show: 'c.0', focus: 'c.0', caption: 'Dividing by the volume in litres does exactly that: 5.745 × 10⁻⁴ ÷ 0.500 = 1.15 × 10⁻³ mol/L.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'ans',
          tone: 'key',
          title: 'The answer',
          md: '**(a)** Find the molar mass, divide the mass by it to get moles, then divide by the volume in litres.<br>**(b)** $c = 1.15 \\times 10^{-3}\\ \\text{mol/L}$ (or $1.15 \\times 10^{-3}\\ \\text{M}$), to three significant figures.',
        },
      ],
      lines: [
        { say: 'Here is the whole answer. For part a: find the molar mass, divide the mass by it to get moles, then divide by the volume in litres.', show: 'ans' },
        { say: 'For part b: the molarity is one point one five times ten to the minus three moles per litre, to three significant figures, since the mass and the volume both have three.', caption: 'For part (b): the molarity is 1.15 × 10⁻³ mol/L, to three significant figures, since the mass and the volume both have three.' },
        { say: 'That matches the book. It is a small number, which makes sense, because less than a tenth of a gram is spread through half a litre.' },
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
            ['$0.182\\ \\text{mol/L}$', 'Divided **grams** by litres, with no molar mass'],
            ['$2.87 \\times 10^{-4}\\ \\text{mol/L}$', '**Multiplied** by the volume instead of dividing'],
            ['$5.75 \\times 10^{-4}\\ \\text{mol/L}$', 'That is the **moles**; it still needs dividing by $0.500\\ \\text{L}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point one eight two comes from dividing the mass in grams straight by the volume. That gives grams per litre, which is not molarity.', focus: 'traps.0', caption: '0.182 comes from dividing the mass in grams straight by the volume. That gives grams per litre, which is not molarity.' },
        { say: 'Two point eight seven times ten to the minus four comes from multiplying the moles by the volume. Concentration is moles divided by volume.', focus: 'traps.1', caption: '2.87 × 10⁻⁴ comes from multiplying the moles by the volume. Concentration is moles divided by volume.' },
        { say: 'And five point seven five times ten to the minus four is the amount in moles. It only becomes a concentration once it is divided by the volume.', focus: 'traps.2', caption: 'And 5.75 × 10⁻⁴ is the amount in moles. It only becomes a concentration once it is divided by the volume.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the molar concentration of a solution of $2.34\\ \\text{g}$ of $\\ce{NaCl}$ in $0.250\\ \\text{L}$ of solution? The molar mass of $\\ce{NaCl}$ is $58.44\\ \\text{g/mol}$.',
          choices: ['$9.36\\ \\text{mol/L}$', '$0.0100\\ \\text{mol/L}$', '$0.0400\\ \\text{mol/L}$', '$0.160\\ \\text{mol/L}$'],
          answer: 3,
          working: '$n = \\dfrac{2.34}{58.44} = 0.04004\\ \\text{mol}$, and $c = \\dfrac{0.04004}{0.250} = 0.160\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molar concentration of a solution of two point three four grams of sodium chloride, molar mass fifty eight point four four grams per mole, in zero point two five zero litres? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What is the molar concentration of a solution of 2.34 g of NaCl (M = 58.44 g/mol) in 0.250 L of solution? Pause the video and try it.' },
        { say: 'The amount is two point three four over fifty eight point four four, which is zero point zero four zero zero moles. Divided by zero point two five zero litres, that is zero point one six zero moles per litre: choice D.', show: 'q2.answer', caption: 'n = 2.34 ÷ 58.44 = 0.0400 mol. Divided by 0.250 L, that is 0.160 mol/L: choice D.' },
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
          items: ['Molarity is **moles per litre** of solution', 'Grams to moles: **divide by the molar mass**', 'Moles to molarity: **divide by the litres**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Molarity is the moles of solute in each litre of solution.', show: 'sum.0' },
        { say: 'To turn grams into moles, divide by the molar mass.', show: 'sum.1' },
        { say: 'Then divide the moles by the volume in litres. For more on molar concentration, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
