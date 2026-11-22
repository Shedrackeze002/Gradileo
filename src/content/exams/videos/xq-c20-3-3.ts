import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';
import { saltDissolving } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 3.3 (percent and parts per million): find the mass of a
// 4.00% by mass NaOH solution that contains 15.0 g of NaOH. The question is OpenStax Chemistry 2e's
// own, word for word (end-of-chapter exercise 70, section 3.4, CC BY-NC-SA 4.0). The book gives no
// answer to even-numbered exercises, so the video works it out: 4.00 g of NaOH in every 100 g of
// solution, so 15.0 g needs 15.0 / 4.00 x 100 g = 375 g of solution.
//
// The pictures are simulated particles (src/video/particles.ts): sodium chloride dissolving (the
// mass of a solution is the solute plus the water), then two samples of the same solution, one
// three times the size of the other, each with one solute particle in every 25.

const WATER = { bond: 0.6, heavy: 0.2, size: 0.8, tone: 'adj', name: 'water' } as const;
const SOLUTE = { bond: 0.6, heavy: 0.2, size: 1.25, tone: 'bad', name: 'sodium hydroxide' } as const;

/** A sample of the solution: one solute particle in every 25, so 4% of the particles. */
const sample = (id: string, solute: number, width: number, label: string): ParticleBox => ({
  id,
  state: 'liquid',
  kinds: [{ n: solute, ...SOLUTE }, { n: solute * 24, ...WATER }],
  width,
  height: 8,
  temp: 0.6,
  label,
});

/** The same 4% solution in a small sample and a sample three times larger. */
const samples: ParticlesEl = {
  kind: 'particles',
  id: 'sm',
  boxes: [sample('s', 1, 4.7, '25 g: 1 g NaOH'), sample('l', 3, 14, '75 g: 3 g NaOH')],
  clips: {},
  key: true,
  seed: 2,
  height: 360,
};

const QUESTION = 'What mass of a 4.00% NaOH solution by mass contains 15.0 g of NaOH?';

const video: Explainer = {
  id: 'xq-c20-3-3',
  lessonId: '',
  exam: {
    lesson: 'c20-3-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 70, section 3.4, Other Units for Solution Concentrations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/3-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Mass of a 4% Solution. Percent by Mass',
  thumbnailTitle: 'How Much 4% Solution Holds 15 g?',
  thumbnail: 'sm',
  summary:
    'A real test question, solved one small step at a time: what mass of a 4.00% by mass sodium hydroxide solution contains 15.0 g of sodium hydroxide? We read the percentage as grams per 100 g of solution, scale it up to 375 g, and check the answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much 4% Solution Holds 15 g?', subtitle: 'Percent by mass, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a solution measured in percent by mass. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'What mass of a 4.00% $\\ce{NaOH}$ solution by mass contains $15.0\\ \\text{g}$ of $\\ce{NaOH}$?', answer: '375 g of solution' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What mass of a four point zero zero percent N a O H solution by mass contains fifteen point zero grams of N a O H?', caption: QUESTION },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know the **solute** ($15.0\\ \\text{g}$) and the **percentage** (4.00%). Find the mass of the whole **solution**.' }],
      lines: [
        { say: 'In plain words, we know how much sodium hydroxide we want, fifteen grams, and how concentrated the solution is.', show: 'plain' },
        { say: 'We must find how much of the solution to weigh out, so the answer is the mass of the whole solution, sodium hydroxide and water together.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 600,
      left: [saltDissolving('sd', 380)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent by mass', md: '% (w/w) $= \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100\\%$' },
        { kind: 'text', id: 'sol', size: 'md', md: 'mass of solution = solute **+** water' },
      ],
      lines: [
        { say: 'Here is what we need. When a solute dissolves, its particles spread through the water, and together they make the solution.', show: ['sd', 'sd.labels'], play: 'sd.drop' },
        { say: 'Percent by mass is the mass of the solute divided by the mass of the solution, times one hundred percent.', show: 'def' },
        { say: 'The mass of the solution is the solute plus the water. So a four percent solution has four grams of solute in every hundred grams of solution.', show: 'sol' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Read** the percentage as grams per $100\\ \\text{g}$', '**Rearrange** for the mass of the solution', '**Calculate**, then check'] }],
      lines: [
        { say: 'Here is the plan. First, we read the percentage as grams of sodium hydroxide in every hundred grams of solution.', show: 'plan.0' },
        { say: 'Then we rearrange the formula to find the mass of the solution.', show: 'plan.1' },
        { say: 'Then we calculate and check the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read the percentage',
      layout: 'center',
      main: [samples, { kind: 'math', id: 'r', size: 'md', lines: ['4.00\\% \\;\\Rightarrow\\; 4.00\\ \\text{g NaOH in every } 100\\ \\text{g of solution}'] }],
      lines: [
        { say: 'Step one. Here is the same four percent solution in two samples. One particle in every twenty five is sodium hydroxide, in red.', show: ['sm', 'sm.labels', 'sm.key'] },
        { say: 'In the small sample, twenty five grams of solution hold one gram of sodium hydroxide. The sample three times larger holds three times as much, three grams.', focus: 'sm.l' },
        { say: 'So the more sodium hydroxide we want, the more solution we need, in the same proportion. Four point zero zero percent means four point zero zero grams in every hundred grams of solution.', show: 'r.0', caption: 'So the more NaOH we want, the more solution we need, in the same proportion. 4.00% means 4.00 g in every 100 g of solution.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['4.00\\% = \\dfrac{15.0\\ \\text{g}}{\\text{mass of solution}} \\times 100\\%', '\\text{mass of solution} = \\dfrac{15.0\\ \\text{g}}{4.00\\%} \\times 100\\%'],
        },
      ],
      lines: [
        { say: 'Step two. Put what we know into the formula: four point zero zero percent equals fifteen point zero grams over the mass of the solution, times one hundred percent.', show: 'm.0', caption: 'Step two. Put what we know into the formula: 4.00% = 15.0 g ÷ mass of solution × 100%.' },
        { say: 'Rearranged, the mass of the solution is fifteen point zero grams divided by four point zero zero percent, times one hundred percent.', show: 'm.1', caption: 'Rearranged, the mass of solution = 15.0 g ÷ 4.00% × 100%.' },
      ],
    },
    {
      chapter: 'Step 3: Calculate',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'lg', lines: ['\\dfrac{15.0}{4.00} = 3.75', '3.75 \\times 100\\ \\text{g} = \\good{375\\ \\text{g of solution}}'] }],
      lines: [
        { say: 'Step three. Fifteen point zero divided by four point zero zero is three point seven five. So we need three point seven five lots of a hundred grams.', show: 'c.0', caption: 'Step three. 15.0 ÷ 4.00 = 3.75. So we need 3.75 lots of 100 g.' },
        { say: 'That is three hundred and seventy five grams of solution, to three significant figures.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'k', size: 'lg', lines: ['\\dfrac{15.0\\ \\text{g}}{375\\ \\text{g}} \\times 100\\% = 4.00\\% \\;\\checkmark', '375 - 15.0 = 360\\ \\text{g of water}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$375\\ \\text{g}$ of the 4.00% solution contains $15.0\\ \\text{g}$ of $\\ce{NaOH}$.' },
      ],
      lines: [
        { say: 'Check it. Fifteen point zero grams out of three hundred and seventy five grams, times one hundred percent, is four point zero zero percent, as it should be.', show: 'k.0', caption: 'Check it. 15.0 g ÷ 375 g × 100% = 4.00%, as it should be.' },
        { say: 'The rest of the solution, three hundred and sixty grams, is water.', show: 'k.1', caption: 'The rest of the solution, 360 g, is water.' },
        { say: 'So three hundred and seventy five grams of the solution contains fifteen point zero grams of sodium hydroxide.', show: 'ans', caption: 'So 375 g of the solution contains 15.0 g of NaOH.' },
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
            ['$0.600\\ \\text{g}$', 'Took 4% **of** 15.0 g: $15.0 \\times 0.0400$'],
            ['$360\\ \\text{g}$', 'The mass of the **water** only, not the solution'],
            ['$3.75\\ \\text{g}$', 'Divided, but **forgot** the $\\times 100$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point six zero zero grams comes from taking four percent of fifteen grams. That would be the sodium hydroxide in fifteen grams of solution, which is a different question.', focus: 'traps.0', caption: '0.600 g comes from taking 4% of 15.0 g. That would be the NaOH in 15.0 g of solution, which is a different question.' },
        { say: 'Three hundred and sixty grams is the mass of the water alone. The question asks for the mass of the solution, which includes the sodium hydroxide.', focus: 'traps.1', caption: '360 g is the mass of the water alone. The question asks for the mass of the solution, which includes the NaOH.' },
        { say: 'And three point seven five grams comes from dividing fifteen by four and stopping there. A solution must weigh more than the solute in it.', focus: 'traps.2', caption: 'And 3.75 g comes from dividing 15.0 by 4.00 and stopping there. A solution must weigh more than the solute in it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What mass of a 5.00% (w/w) sugar solution contains $12.0\\ \\text{g}$ of sugar?',
          choices: ['$0.600\\ \\text{g}$', '$228\\ \\text{g}$', '$240\\ \\text{g}$', '$2.40\\ \\text{g}$'],
          answer: 2,
          working: '$\\dfrac{12.0}{5.00} \\times 100\\ \\text{g} = 240\\ \\text{g}$ of solution.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of a five point zero zero percent by mass sugar solution contains twelve point zero grams of sugar? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What mass of a 5.00% (w/w) sugar solution contains 12.0 g of sugar? Pause the video and try it.' },
        { say: 'Twelve point zero divided by five point zero zero is two point four, times one hundred grams gives two hundred and forty grams of solution: choice C.', show: 'q2.answer', caption: '12.0 ÷ 5.00 = 2.4, and 2.4 × 100 g = 240 g of solution: choice C.' },
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
          items: ['A percent by mass is **grams of solute per $100\\ \\text{g}$ of solution**', 'Mass of solution $= \\dfrac{\\text{mass of solute}}{\\text{percent}} \\times 100$', 'The **solution** includes the solute **and** the water'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A percent by mass is the grams of solute in every hundred grams of solution.', show: 'sum.0' },
        { say: 'To find the mass of solution, divide the mass of solute by the percentage and multiply by one hundred.', show: 'sum.1' },
        { say: 'And the solution includes both the solute and the water. For more on percent concentrations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
