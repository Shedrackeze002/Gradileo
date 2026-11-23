import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import theoretical from '@/content/chem20/videos/c20-4-7-c.ts';
import whyShort from '@/content/chem20/videos/c20-4-7-b.ts';
import { yieldBars } from '@/content/chem20/videos/lib/c20-4b-figures.ts';

// Exam question for Chemistry 20 lesson 4.7 (percent yield): 0.53 g of carbon dioxide from heating
// 1.31 g of calcium carbonate. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 64, section 4.4, CC BY-NC-SA 4.0); the book prints no answer for it.
// The answer: CaCO3 -> CaO + CO2, 1.31 / 100.09 = 0.01309 mol, so the theoretical yield is
// 0.01309 x 44.01 = 0.576 g of CO2, and 0.53 / 0.576 x 100% = 92%.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's calcium carbonate
// breaking down into lime and carbon dioxide; simulated particles (src/video/particles.ts): the
// lesson's dinitrogen tetroxide splitting until the count levels off, one reason a yield falls
// short; and the theoretical and actual yields as two bars to the same scale.

/** The theoretical and actual yields of carbon dioxide, to the same scale. */
const bars = figure('y', [yieldBars({ theoretical: 0.576, actual: 0.53, values: ['0.576\\ \\text{g}', '0.53\\ \\text{g}'] })], 270);

const QUESTION = 'A sample of 0.53 g of carbon dioxide was obtained by heating 1.31 g of calcium carbonate. What is the percent yield for this reaction?';

const video: Explainer = {
  id: 'xq-c20-4-7',
  lessonId: '',
  exam: {
    lesson: 'c20-4-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 64, section 4.4, Reaction Yields',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Percent Yield of Carbon Dioxide From Limestone. Percent Yield',
  thumbnailTitle: 'Percent Yield of Carbon Dioxide',
  thumbnail: 'lm',
  summary:
    'A real test question, solved one small step at a time: heating 1.31 g of calcium carbonate gave 0.53 g of carbon dioxide, so what is the percent yield? We balance the equation, find the theoretical yield of 0.576 g, and divide the actual yield by it, to get 92%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Percent Yield of Carbon Dioxide', subtitle: 'What we collected, against what could form' }],
      lines: [
        { say: 'In this video, we solve a real test question about percent yield. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A sample of $0.53\\ \\text{g}$ of carbon dioxide was obtained by heating $1.31\\ \\text{g}$ of calcium carbonate. What is the percent yield for this reaction?', answer: '92%' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. A sample of zero point five three grams of carbon dioxide was obtained by heating one point three one grams of calcium carbonate. What is the percent yield for this reaction?', show: 'q', caption: 'Here is the question, exactly as it was printed. A sample of 0.53 g of carbon dioxide was obtained by heating 1.31 g of calcium carbonate. What is the percent yield for this reaction?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare the carbon dioxide we **collected** with the **most** the calcium carbonate **could** give' }],
      lines: [
        { say: 'Zero point five three grams is what was actually collected. That is the actual yield.', show: 'plain', caption: '0.53 g is what was actually collected. That is the actual yield.' },
        { say: 'We must work out the most carbon dioxide that one point three one grams of calcium carbonate could give, and see what percent of it we got.', caption: 'We must work out the most carbon dioxide that 1.31 g of calcium carbonate could give, and see what percent of it we got.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        pick(theoretical, 'lm'),
        { kind: 'math', id: 'k', size: 'md', lines: ['\\text{percent yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'Here is what we need. One unit of calcium carbonate. Watch it break down into calcium oxide, lime, and carbon dioxide.', show: 'lm', play: 'lm.go' },
        { say: 'The most product the reactant can make is the theoretical yield, and we find it with stoichiometry. What we really collect is the actual yield.' },
        { say: 'The percent yield is the actual yield over the theoretical yield, times one hundred percent.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Balance the equation, and find the **moles** of calcium carbonate', 'Find the **theoretical yield** of carbon dioxide, in grams', 'Divide the **actual** yield by the **theoretical** yield'] }],
      lines: [
        { say: 'Here is the plan. First, balance the equation and change the mass of calcium carbonate to moles.', show: 'plan.0' },
        { say: 'Then use the mole ratio and the molar mass to find the theoretical yield of carbon dioxide, in grams.', show: 'plan.1' },
        { say: 'Then divide the actual yield by the theoretical yield, and multiply by one hundred percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Equation and moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['\\ce{CaCO3 -> CaO + CO2}', 'n(\\ce{CaCO3}) = \\dfrac{1.31}{100.09} = \\good{0.01309\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step one. Calcium carbonate gives calcium oxide and carbon dioxide, and it is already balanced: one of each.', show: 'n.0', caption: 'Step one. CaCO₃ → CaO + CO₂ is already balanced: one of each.' },
        { say: 'Calcium carbonate is one hundred point zero nine grams per mole, so one point three one grams is zero point zero one three zero nine moles.', show: 'n.1', focus: 'n.1', caption: 'CaCO₃ is 100.09 g/mol, so n = 1.31 ÷ 100.09 = 0.01309 mol.' },
      ],
    },
    {
      chapter: 'Step 2: The theoretical yield',
      layout: 'center',
      main: [{ kind: 'math', id: 't', size: 'lg', lines: ['n(\\ce{CO2}) = 0.01309 \\times \\dfrac{1}{1} = 0.01309\\ \\text{mol}', 'm(\\ce{CO2}) = 0.01309 \\times 44.01 = \\good{0.576\\ \\text{g}}'] }],
      lines: [
        { say: 'Step two. One calcium carbonate gives one carbon dioxide, so the most carbon dioxide is also zero point zero one three zero nine moles.', show: 't.0', caption: 'Step two. One CaCO₃ gives one CO₂, so the most CO₂ is also 0.01309 mol.' },
        { say: 'Carbon dioxide is forty four point zero one grams per mole, so the theoretical yield is zero point five seven six grams.', show: 't.1', focus: 't.1', caption: 'CO₂ is 44.01 g/mol, so the theoretical yield is 0.01309 × 44.01 = 0.576 g.' },
      ],
    },
    {
      chapter: 'Step 3: The percent yield',
      layout: 'center',
      main: [bars, { kind: 'math', id: 'p', size: 'lg', lines: ['\\dfrac{0.53}{0.576} \\times 100\\% = \\good{92\\%}'] }],
      lines: [
        { say: 'Step three. Here are the two yields as bars, to the same scale. The theoretical yield is zero point five seven six grams, and the actual yield is zero point five three grams.', show: ['y', 'y.theo', 'y.actual', 'y.full'], caption: 'Step three. Here are the two yields as bars, to the same scale. The theoretical yield is 0.576 g, and the actual yield is 0.53 g.' },
        { say: 'Zero point five three over zero point five seven six, times one hundred percent, is ninety two percent. The actual yield has only two significant figures, so that is as far as we can go.', show: 'p.0', focus: 'p.0', caption: '0.53 ÷ 0.576 × 100% = 92%. The actual yield has only two significant figures, so that is as far as we can go.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        pick(whyShort, 'eq'),
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'A percent yield of $92\\%$.' },
      ],
      lines: [
        { say: 'Does it make sense? A yield a little under one hundred percent is normal. Here is one reason: in this tube, dinitrogen tetroxide splits into nitrogen dioxide.', show: ['eq', 'eq.labels', 'eq.key', 'eq.tally'], play: 'eq.go', caption: 'Does it make sense? A yield a little under 100% is normal. Here is one reason: in this tube, N₂O₄ splits into NO₂.' },
        { say: 'The count levels off, because the products turn back into the reactant, so the reaction never finishes. Product can also be lost, or a reactant can be impure.', focus: 'eq.tally' },
        { say: 'Ninety two percent is below one hundred, as it should be. So the percent yield is ninety two percent.', show: 'ans', caption: '92% is below 100%, as it should be. So the percent yield is 92%.' },
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
            ['$40\\%$', 'Divided by the mass of **calcium carbonate**'],
            ['$109\\%$', 'Put the **theoretical** yield on top'],
            ['$0.92\\%$', 'Forgot to **multiply by 100**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Forty percent comes from dividing by one point three one grams. That is the mass of the reactant, and part of it becomes calcium oxide, so it can never all be carbon dioxide.', focus: 'traps.0', caption: '40% comes from dividing by 1.31 g. That is the mass of the reactant, and part of it becomes calcium oxide, so it can never all be CO₂.' },
        { say: 'One hundred and nine percent comes from the fraction upside down. A yield over one hundred percent is a sign something is wrong.', focus: 'traps.1', caption: '109% comes from the fraction upside down. A yield over 100% is a sign something is wrong.' },
        { say: 'And zero point nine two percent forgets to multiply by one hundred. The fraction is zero point nine two, which is ninety two percent.', focus: 'traps.2', caption: 'And 0.92% forgets to multiply by 100. The fraction is 0.92, which is 92%.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Heating $50.0\\ \\text{g}$ of $\\ce{CaCO3}$ gives $25.2\\ \\text{g}$ of $\\ce{CaO}$: $\\ce{CaCO3 -> CaO + CO2}$. What is the percent yield? Use $\\ce{CaCO3}$ $100.09$ and $\\ce{CaO}$ $56.08\\ \\text{g/mol}$.',
          choices: ['$50.4\\%$', '$111\\%$', '$90.0\\%$', '$0.900\\%$'],
          answer: 2,
          working: 'The theoretical yield is $\\dfrac{50.0}{100.09} \\times 56.08 = 28.0\\ \\text{g}$, and $\\dfrac{25.2}{28.0} \\times 100\\% = 90.0\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Heating fifty point zero grams of calcium carbonate gives twenty five point two grams of calcium oxide. What is the percent yield? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Heating 50.0 g of CaCO₃ gives 25.2 g of CaO. What is the percent yield? Pause the video and try it.' },
        { say: 'Fifty point zero grams is zero point four nine nine six moles, which could give twenty eight point zero grams of calcium oxide. Twenty five point two over twenty eight point zero is ninety point zero percent: choice C.', show: 'q2.answer', caption: '50.0 g is 0.4996 mol, which could give 0.4996 × 56.08 = 28.0 g of CaO. 25.2 ÷ 28.0 × 100% = 90.0%: choice C.' },
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
          items: ['Find the **theoretical yield** with stoichiometry', 'Percent yield $= \\dfrac{\\text{actual}}{\\text{theoretical}} \\times 100\\%$', 'A real yield is usually **under 100%**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Find the theoretical yield of the product with stoichiometry, from the mass of the reactant.', show: 'sum.0' },
        { say: 'The percent yield is the actual yield over the theoretical yield, times one hundred percent.', show: 'sum.1' },
        { say: 'A real yield is usually under one hundred percent. For more on percent yield, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
