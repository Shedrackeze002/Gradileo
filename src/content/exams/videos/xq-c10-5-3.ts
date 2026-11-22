import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { phStrip } from '@/content/chem10/videos/lib/c10-5-figures.ts';
import { dilutingAcid } from '@/content/chem10/videos/lib/c10-particles.ts';
import { acidIonising } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 10 lesson 5.3 (acids, bases and pH): classify four household
// solutions from their pH, pick the one with the most hydrogen ions, compare lemon juice with
// vinegar on the tenfold scale and read universal indicator's colour. Gradileo wrote this one in
// the style of a high-school chemistry unit test (OpenStax's pH exercises use logarithms beyond
// this lesson). Answers: (a) lemon juice acidic, water neutral, baking soda and oven cleaner
// basic; (b) lemon juice; (c) 10 times; (d) purple.
//
// The pictures: the pH scale with the four solutions marked, hydrogen chloride handing its
// hydrogen to water as hydrogen ions (src/video/particles.ts), an acid's hydrogen ions spreading
// out as water is added, and the universal indicator colours with the oven cleaner marked.

const QUESTION =
  'The pH values of four household solutions are: lemon juice, pH 2; pure water, pH 7; baking soda solution, pH 9; oven cleaner, pH 13. (a) Classify each solution as acidic, neutral or basic. (b) Which solution has the highest concentration of hydrogen ions? (c) Vinegar has a pH of 3. How many times greater is the hydrogen ion concentration in lemon juice than in vinegar? (d) What colour would universal indicator turn in the oven cleaner?';

const MARKS = [
  { id: 'lemon', value: 2, tex: '\\text{lemon juice}' },
  { id: 'water', value: 7, tex: '\\text{pure water}' },
  { id: 'soda', value: 9, tex: '\\text{baking soda}', level: 1 },
  { id: 'oven', value: 13, tex: '\\text{oven cleaner}' },
];
const scale = () => figure('s', [phStrip({ colours: 'nature', names: true, marks: MARKS })], 340);
const tenfold = figure('t', [phStrip({ colours: 'nature', hops: [{ id: 'hop', from: 3, to: 2, tex: '\\times 10', high: true }] })], 300);
const universal = figure('u', [phStrip({ colours: 'universal', names: true, shade: 0.7, marks: [{ id: 'oven', value: 13, tex: '\\text{oven cleaner}', arrow: true }] })], 300);

const video: Explainer = {
  id: 'xq-c10-5-3',
  lessonId: '',
  exam: {
    lesson: 'c10-5-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Four Household Solutions on the pH Scale. Acids, Bases and pH',
  thumbnailTitle: 'Read the pH Scale',
  thumbnail: 's',
  summary:
    'An exam-style question, solved one small step at a time: we classify lemon juice, water, baking soda and oven cleaner from their pH, find the one with the most hydrogen ions, see why one step on the pH scale is a tenfold change, and read the colour of universal indicator. We watch an acid make hydrogen ions and see them spread out as water is added.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Read the pH Scale', subtitle: 'Acids, bases and pH, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the p H of four household solutions. We will take it one small step at a time, so that every step makes sense.', caption: 'In this video, we solve an exam-style question about the pH of four household solutions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'The pH values of four household solutions are: lemon juice, pH 2; pure water, pH 7; baking soda solution, pH 9; oven cleaner, pH 13.<br>(a) Classify each solution as acidic, neutral or basic.<br>(b) Which solution has the highest concentration of hydrogen ions?<br>(c) Vinegar has a pH of 3. How many times greater is the hydrogen ion concentration in lemon juice than in vinegar?<br>(d) What colour would universal indicator turn in the oven cleaner?',
          answer: '(a) acidic, neutral, basic, basic (b) lemon juice (c) 10 times (d) purple',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The p H values of four household solutions are: lemon juice, p H 2. Pure water, p H 7. Baking soda solution, p H 9. And oven cleaner, p H 13.', caption: 'The pH values of four household solutions are: lemon juice, pH 2. Pure water, pH 7. Baking soda solution, pH 9. And oven cleaner, pH 13.' },
        { say: 'Part a: classify each solution as acidic, neutral or basic. Part b: which solution has the highest concentration of hydrogen ions?' },
        { say: 'Part c: vinegar has a p H of 3. How many times greater is the hydrogen ion concentration in lemon juice than in vinegar? Part d: what colour would universal indicator turn in the oven cleaner?', caption: 'Part c: vinegar has a pH of 3. How many times greater is the hydrogen ion concentration in lemon juice than in vinegar? Part d: what colour would universal indicator turn in the oven cleaner?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [scale()],
      lines: [
        { say: 'Let us put the four solutions on the p H scale, which runs from 0 to 14.', caption: 'Let us put the four solutions on the pH scale, which runs from 0 to 14.', show: ['s.scale', 's.lemon', 's.water', 's.soda', 's.oven'] },
        { say: 'Every part of the question comes down to reading this scale: where each solution sits, what that means for its hydrogen ions, and what colour an indicator shows there.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'facts',
          head: ['pH', 'Meaning'],
          rows: [
            ['Below 7', '**Acidic**: more hydrogen ions than pure water'],
            ['7', '**Neutral**'],
            ['Above 7', '**Basic**'],
            ['One step down', '**Ten times** more hydrogen ions'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A solution with a p H below 7 is acidic. The lower the p H, the more hydrogen ions it holds.', caption: 'Here is what we need. A solution with a pH below 7 is acidic. The lower the pH, the more hydrogen ions it holds.', show: 'facts.0' },
        { say: 'A p H of exactly 7 is neutral, like pure water. And a p H above 7 is basic.', caption: 'A pH of exactly 7 is neutral, like pure water. And a pH above 7 is basic.', show: ['facts.1', 'facts.2'] },
        { say: 'One more fact matters: each step down the scale means ten times as many hydrogen ions.', show: 'facts.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Compare each pH with **7**', 'The **lowest** pH has the most hydrogen ions', 'Count the **steps**: ×10 for each one', 'Read the indicator **colour** at that pH'] }],
      lines: [
        { say: 'Here is the plan. For part a, compare each p H with 7.', caption: 'Here is the plan. For part a, compare each pH with 7.', show: 'plan.0' },
        { say: 'For part b, the lowest p H has the most hydrogen ions.', caption: 'For part b, the lowest pH has the most hydrogen ions.', show: 'plan.1' },
        { say: 'For part c, count the steps between the two p H values, multiplying by ten for each one.', caption: 'For part c, count the steps between the two pH values, multiplying by ten for each one.', show: 'plan.2' },
        { say: 'And for part d, read the colour of universal indicator at that p H.', caption: 'And for part d, read the colour of universal indicator at that pH.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [scale()],
      lines: [
        { say: 'Step one, part a. Here is the scale with its three regions.', show: ['s.scale', 's.acidic', 's.neutral', 's.basic'] },
        { say: 'Lemon juice, at p H 2, is below 7, so it is acidic.', caption: 'Lemon juice, at pH 2, is below 7, so it is acidic.', show: 's.lemon', focus: 's.lemon' },
        { say: 'Pure water, at p H 7, is neutral.', caption: 'Pure water, at pH 7, is neutral.', show: 's.water', focus: 's.water' },
        { say: 'Baking soda solution, at p H 9, and oven cleaner, at p H 13, are both above 7, so they are both basic.', caption: 'Baking soda solution, at pH 9, and oven cleaner, at pH 13, are both above 7, so they are both basic.', show: ['s.soda', 's.oven'], focus: ['s.soda', 's.oven'] },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [{ ...acidIonising('ai'), key: true }],
      lines: [
        { say: 'Step two, part b. Hydrogen ions are what make a solution acidic. Here is hydrogen chloride dissolving in water, up close.', show: ['ai', 'ai.labels', 'ai.key'] },
        { say: 'Each molecule hands over its hydrogen, which joins the water as a hydrogen ion. The more hydrogen ions there are, the more acidic the solution, and the lower its p H.', caption: 'Each molecule hands over its hydrogen, which joins the water as a hydrogen ion. The more hydrogen ions there are, the more acidic the solution, and the lower its pH.', show: 'ai.tally', play: 'ai.go' },
        { say: 'So the solution with the lowest p H has the highest concentration of hydrogen ions. That is lemon juice, at p H 2.', caption: 'So the solution with the lowest pH has the highest concentration of hydrogen ions. That is lemon juice, at pH 2.' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [tenfold, { kind: 'math', id: 'tm', size: 'md', lines: ['\\text{vinegar, pH } 3 \\;\\longrightarrow\\; \\text{lemon juice, pH } 2: \\quad \\bad{\\times 10} \\text{ hydrogen ions}'] }],
      lines: [
        { say: 'Step three, part c. Vinegar is at p H 3, and lemon juice at p H 2.', caption: 'Step three, part c. Vinegar is at pH 3, and lemon juice at pH 2.', show: ['t.scale', 't.acidic', 't.neutral', 't.basic'] },
        { say: 'That is one step down the scale, and each step means ten times as many hydrogen ions. So lemon juice has ten times the hydrogen ion concentration of vinegar.', show: ['t.hop', 'tm'], focus: 't.hop' },
      ],
    },
    {
      chapter: 'Why one step is ten times',
      layout: 'center',
      main: [dilutingAcid('dl')],
      lines: [
        { say: 'Here is the same idea from the other side: the hydrogen ions in a small volume of acid.', show: ['dl', 'dl.labels', 'dl.key', 'dl.volume'] },
        { say: 'Add water. The same hydrogen ions spread out through more volume, so each millilitre holds fewer of them, and the p H rises. To raise the p H by one whole step, the acid must be made ten times more dilute.', caption: 'Add water. The same hydrogen ions spread out through more volume, so each millilitre holds fewer of them, and the pH rises. To raise the pH by one whole step, the acid must be made ten times more dilute.', play: 'dl.dilute' },
      ],
    },
    {
      chapter: 'Step 4: Part (d)',
      layout: 'center',
      main: [universal],
      lines: [
        { say: 'Step four, part d. Universal indicator changes colour all the way along the scale: red for strong acids, through orange, yellow and green, to blue and purple for strong bases.', show: ['u.scale', 'u.red', 'u.orange', 'u.yellow', 'u.green', 'u.blue', 'u.purple'] },
        { say: 'The oven cleaner is at p H 13, in the purple region. So universal indicator turns purple.', caption: 'The oven cleaner is at pH 13, in the purple region. So universal indicator turns purple.', show: 'u.oven', focus: 'u.oven' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', 'Lemon juice **acidic**, water **neutral**, baking soda and oven cleaner **basic**'],
            ['(b)', '**Lemon juice**, the lowest pH'],
            ['(c)', '**10 times**: one step on the scale'],
            ['(d)', '**Purple**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer.', show: 'ans' },
        { say: 'A quick check on parts b and c together: lemon juice is the most acidic of all, and it is more acidic than vinegar too, so it has the most hydrogen ions either way.' },
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
            ['(b) oven cleaner', 'Thought a **higher** pH means more hydrogen ions'],
            ['(c) 1 time or 1.5 times', 'Treated the scale as a **difference** or a **ratio** of pH'],
            ['(a) baking soda neutral', 'Thought only strong bases count as **basic**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Picking the oven cleaner for part b, because it has the biggest number. The p H scale runs backwards: the lower the p H, the more hydrogen ions.', caption: 'Picking the oven cleaner for part b, because it has the biggest number. The pH scale runs backwards: the lower the pH, the more hydrogen ions.', focus: 'traps.0' },
        { say: 'Answering one time, from 3 minus 2, or one and a half times, from 3 divided by 2. Each step on the p H scale is a factor of ten.', caption: 'Answering one time, from 3 minus 2, or one and a half times, from 3 divided by 2. Each step on the pH scale is a factor of ten.', focus: 'traps.1' },
        { say: 'And calling baking soda neutral because it is gentle. Anything above p H 7 is basic, even if only a little.', caption: 'And calling baking soda neutral because it is gentle. Anything above pH 7 is basic, even if only a little.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solution X has pH 4 and solution Y has pH 6. Which is true?',
          choices: ['Y is more acidic than X', 'X has 100 times the hydrogen ion concentration of Y', 'X has 2 times the hydrogen ion concentration of Y', 'Both are basic'],
          answer: 1,
          working: 'Two steps down the scale: 10 × 10 = 100.',
        },
      ],
      lines: [
        { say: 'Your turn. Solution X has p H 4, and solution Y has p H 6. Which statement is true? Pause the video and try it.', caption: 'Your turn. Solution X has pH 4, and solution Y has pH 6. Which statement is true? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'X is two steps lower than Y, and each step is ten times, so X has ten times ten, or 100 times, the hydrogen ion concentration. That is choice B.', show: 'q2.answer' },
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
          items: ['Below 7 **acidic**, 7 **neutral**, above 7 **basic**', 'Lower pH, **more** hydrogen ions', 'Each step on the scale is **ten times**', 'Universal indicator: red for acids, through green, to **purple** for strong bases'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A p H below 7 is acidic, 7 is neutral, and above 7 is basic.', caption: 'Here is what to remember. A pH below 7 is acidic, 7 is neutral, and above 7 is basic.', show: 'sum.0' },
        { say: 'The lower the p H, the more hydrogen ions.', caption: 'The lower the pH, the more hydrogen ions.', show: 'sum.1' },
        { say: 'Each step on the scale is a factor of ten.', show: 'sum.2' },
        { say: 'And universal indicator runs from red for strong acids, through green at neutral, to purple for strong bases. For more on p H, watch this lesson\'s explainer videos on Gradileo.', caption: 'And universal indicator runs from red for strong acids, through green at neutral, to purple for strong bases. For more on pH, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
