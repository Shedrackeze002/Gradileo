import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import titration from '@/content/chem20/videos/c20-4-8.ts';
import { flow, rig, type FlowNode } from '@/content/chem20/videos/lib/c20-4b-figures.ts';

// Exam question for Chemistry 20 lesson 4.8 (titration): the volume of 0.3300 M sodium hydroxide
// that titrates 15.00 mL of 0.1500 M oxalic acid. The question is OpenStax Chemistry 2e's own, word
// for word (end-of-chapter exercise 89, section 4.5, CC BY-NC-SA 4.0). The answer, which matches the
// book's: H2C2O4 + 2NaOH -> Na2C2O4 + 2H2O, 0.1500 x 0.01500 = 2.250 x 10^-3 mol of acid, x 2 =
// 4.500 x 10^-3 mol of NaOH, and 4.500 x 10^-3 / 0.3300 = 0.01364 L = 13.64 mL.
//
// The pictures are a burette over a conical flask, the lesson's titration as simulated particles
// (src/video/particles.ts), where each hydroxide ion dripping in meets a hydrogen ion and makes
// water until the indicator turns pink, and the chain volume -> moles -> moles -> volume.

const two = (top: string, bottom: string) => `\\begin{gathered}\\text{${top}}\\\\ ${bottom}\\end{gathered}`;

const nodes: FlowNode[] = [
  { id: 'v1', tex: two('volume', '\\text{acid}'), tone: 'opp', value: '0.01500\\ \\text{L}' },
  { id: 'n1', tex: two('moles', '\\text{acid}'), tone: 'brand', value: '2.250 \\times 10^{-3}' },
  { id: 'n2', tex: two('moles', '\\ce{NaOH}'), tone: 'brand', value: '4.500 \\times 10^{-3}' },
  { id: 'v2', tex: two('volume', '\\ce{NaOH}'), tone: 'good', value: '13.64\\ \\text{mL}' },
];

/** The chain of conversions, volume of acid to volume of base. */
const chain = figure(
  'c',
  [
    flow({
      nodes,
      arrows: [
        { id: 'a1', from: 'v1', to: 'n1', tex: '\\times 0.1500', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\tfrac{2}{1}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'v2', tex: '\\div 0.3300', tone: 'good' },
      ],
      width: 2.9,
      height: 1.9,
      gap: 3.9,
    }),
  ],
  240,
);

/** A burette of sodium hydroxide over a flask of the acid. */
const setup = figure('r', [rig()], 400);

const QUESTION = 'What volume of a 0.3300-M solution of sodium hydroxide would be required to titrate 15.00 mL of 0.1500 M oxalic acid?';

const video: Explainer = {
  id: 'xq-c20-4-8',
  lessonId: '',
  exam: {
    lesson: 'c20-4-8',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 89, section 4.5, Quantitative Chemical Analysis',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/4-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Base Titrates Oxalic Acid? Titration',
  thumbnailTitle: 'How Much Base Titrates Oxalic Acid?',
  thumbnail: 'tt',
  summary:
    'A real test question, solved one small step at a time: what volume of 0.3300 mol/L sodium hydroxide titrates 15.00 mL of 0.1500 mol/L oxalic acid? We balance the equation, find the moles of acid, use the two to one mole ratio, and turn moles of base into a volume, to get 13.64 mL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Base Titrates Oxalic Acid?', subtitle: 'Solution stoichiometry for a titration, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a titration. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'What volume of a $0.3300\\ \\text{M}$ solution of sodium hydroxide would be required to titrate $15.00\\ \\text{mL}$ of $0.1500\\ \\text{M}$ oxalic acid?', answer: '13.64 mL' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. What volume of a zero point three three zero zero molar solution of sodium hydroxide would be required to titrate fifteen point zero zero millilitres of zero point one five zero zero molar oxalic acid?', show: 'q', caption: 'Here is the question, exactly as it was printed. What volume of a 0.3300 M solution of sodium hydroxide would be required to titrate 15.00 mL of 0.1500 M oxalic acid?' },
        { say: 'M means moles per litre, so these are zero point three three zero zero and zero point one five zero zero moles per litre. If you would like to try it first, pause the video now.', wait: 5, caption: 'M means mol/L, so these are 0.3300 mol/L and 0.1500 mol/L. If you would like to try it first, pause the video now.' },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [setup, { kind: 'text', id: 'plain', size: 'md', md: 'How much base from the **burette** exactly uses up the **acid** in the flask?' }],
      lines: [
        { say: 'Fifteen point zero zero millilitres of oxalic acid sits in the flask, and the sodium hydroxide goes in the burette.', show: ['r.flask', 'r.sample', 'r.burette', 'r.titrant', 'r.scale', 'r.tap'], caption: '15.00 mL of oxalic acid sits in the flask, and the sodium hydroxide goes in the burette.' },
        { say: 'We want the volume of base that reacts with all of the acid, and no more.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(titration, 'tt'), { kind: 'math', id: 'k', size: 'md', lines: ['n = cV \\qquad V = \\dfrac{n}{c} \\qquad (V\\ \\text{in litres})'] }],
      lines: [
        { say: 'Here is what we need. Inside a flask of acid, the burette adds sodium hydroxide. Each hydroxide ion that meets a hydrogen ion joins it to make a water molecule.', show: ['tt', 'tt.labels', 'tt.key', 'tt.tally'], play: 'tt.titrate' },
        { say: 'When the last hydrogen ion is used up, the next drop has nothing to react with, and the indicator turns pink. So the base we need depends on how many hydrogen ions the acid can give.', focus: 'tt.f' },
        { say: 'For a solution, the amount is the concentration times the volume in litres. So a volume is the amount divided by the concentration.', show: 'k.0', caption: 'For a solution, the amount is n = cV, with V in litres. So a volume is V = n ÷ c.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [chain],
      lines: [
        { say: 'Here is the plan, as a chain. First, the volume of acid to moles of acid, multiplying by its concentration.', show: ['c.v1', 'c.n1', 'c.a1'], focus: 'c.a1' },
        { say: 'Then moles of acid to moles of sodium hydroxide, using the mole ratio from the balanced equation.', show: ['c.n2', 'c.a2'], focus: 'c.a2' },
        { say: 'Then moles of sodium hydroxide to a volume, dividing by its concentration.', show: ['c.v2', 'c.a3'], focus: 'c.a3' },
      ],
    },
    {
      chapter: 'Step 1: The balanced equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['\\ce{H2C2O4 + 2NaOH -> Na2C2O4 + 2H2O}'] }],
      lines: [
        { say: 'Step one. Oxalic acid is H two C two O four. It has two hydrogens to give, and each one needs a hydroxide ion.', caption: 'Step one. Oxalic acid is H₂C₂O₄. It has two hydrogens to give, and each one needs a hydroxide ion.' },
        { say: 'So one oxalic acid reacts with two sodium hydroxide, to make sodium oxalate and two waters.', show: 'e.0', focus: 'e.0', caption: 'So one H₂C₂O₄ reacts with two NaOH: H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O.' },
      ],
    },
    {
      chapter: 'Step 2: Moles of acid',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['15.00\\ \\text{mL} = 0.01500\\ \\text{L}', 'n = 0.1500 \\times 0.01500 = \\good{2.250 \\times 10^{-3}\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Change the volume to litres: fifteen point zero zero millilitres is zero point zero one five zero zero litres.', show: 'n.0', caption: 'Step two. Change the volume to litres: 15.00 mL = 0.01500 L.' },
        { say: 'Concentration times volume is two point two five zero times ten to the minus three moles of oxalic acid.', show: 'n.1', focus: 'n.1', caption: 'n = cV = 0.1500 × 0.01500 = 2.250 × 10⁻³ mol of oxalic acid.' },
      ],
    },
    {
      chapter: 'Step 3: The mole ratio',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['n(\\ce{NaOH}) = 2.250 \\times 10^{-3} \\times \\dfrac{2}{1} = \\good{4.500 \\times 10^{-3}\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step three. Two sodium hydroxide for every one oxalic acid, so multiply by two over one: four point five zero zero times ten to the minus three moles of sodium hydroxide.', show: 'r.0', focus: 'r.0', caption: 'Step three. Two NaOH for every one H₂C₂O₄, so multiply by 2/1: 4.500 × 10⁻³ mol of NaOH.' },
      ],
    },
    {
      chapter: 'Step 4: Moles to a volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'v', size: 'lg', lines: ['V = \\dfrac{4.500 \\times 10^{-3}}{0.3300} = 0.01364\\ \\text{L}', '= \\good{13.64\\ \\text{mL}}'] }],
      lines: [
        { say: 'Step four. Divide the moles by the concentration of the base: zero point zero one three six four litres.', show: 'v.0', caption: 'Step four. V = n ÷ c = 4.500 × 10⁻³ ÷ 0.3300 = 0.01364 L.' },
        { say: 'A burette reads in millilitres, so that is thirteen point six four millilitres.', show: 'v.1', focus: 'v.1', caption: 'A burette reads in millilitres, so that is 13.64 mL.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        chain,
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$13.64\\ \\text{mL}$ of the sodium hydroxide solution.' },
      ],
      lines: [
        { say: 'Here is the whole chain again, with the value under each box.', show: ['c', 'c.v1', 'c.n1', 'c.n2', 'c.v2', 'c.a1', 'c.a2', 'c.a3', 'c.v1-value', 'c.n1-value', 'c.n2-value', 'c.v2-value'] },
        { say: 'Does it make sense? The base is a bit more than twice as concentrated as the acid, and it is needed twice over. Those nearly cancel, so the volume of base is a little less than the fifteen millilitres of acid.', caption: 'Does it make sense? The base is a bit more than twice as concentrated as the acid, and it is needed twice over. Those nearly cancel, so the volume of base is a little less than the 15 mL of acid.' },
        { say: 'So thirteen point six four millilitres of sodium hydroxide. That matches the book.', show: 'ans', caption: 'So 13.64 mL of sodium hydroxide. That matches the book.' },
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
            ['$6.818\\ \\text{mL}$', 'Used $c_1V_1 = c_2V_2$, which leaves out the **2 : 1** ratio'],
            ['$3.409\\ \\text{mL}$', 'Used the ratio **upside down**, 1 over 2'],
            ['$66.00\\ \\text{mL}$', '**Swapped** the two concentrations'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Six point eight one eight millilitres comes from c one V one equals c two V two. That is for dilution, and it leaves out the two to one ratio.', focus: 'traps.0', caption: '6.818 mL comes from c₁V₁ = c₂V₂. That is for dilution, and it leaves out the 2 : 1 ratio.' },
        { say: 'Three point four zero nine millilitres comes from multiplying by one half. The base is the one needed twice over, so it goes on top.', focus: 'traps.1', caption: '3.409 mL comes from multiplying by 1/2. The base is the one needed twice over, so it goes on top.' },
        { say: 'And sixty six point zero zero millilitres comes from mixing up which concentration belongs to which solution.', focus: 'traps.2', caption: 'And 66.00 mL comes from mixing up which concentration belongs to which solution.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What volume of $0.200\\ \\text{mol/L}$ $\\ce{NaOH}$ titrates $25.0\\ \\text{mL}$ of $0.150\\ \\text{mol/L}$ sulfuric acid? $\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$',
          choices: ['$18.8\\ \\text{mL}$', '$9.38\\ \\text{mL}$', '$66.7\\ \\text{mL}$', '$37.5\\ \\text{mL}$'],
          answer: 3,
          working: '$n(\\ce{H2SO4}) = 0.150 \\times 0.0250 = 3.75 \\times 10^{-3}\\ \\text{mol}$, so $7.50 \\times 10^{-3}\\ \\text{mol}$ of $\\ce{NaOH}$, and $\\dfrac{7.50 \\times 10^{-3}}{0.200} = 37.5\\ \\text{mL}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of zero point two zero zero mole per litre sodium hydroxide titrates twenty five point zero millilitres of zero point one five zero mole per litre sulfuric acid? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What volume of 0.200 mol/L NaOH titrates 25.0 mL of 0.150 mol/L sulfuric acid? Pause the video and try it.' },
        { say: 'There are three point seven five times ten to the minus three moles of acid, so twice that of base, seven point five zero times ten to the minus three moles. Divided by zero point two zero zero, that is thirty seven point five millilitres: choice D.', show: 'q2.answer', caption: 'There are 3.75 × 10⁻³ mol of acid, so twice that of base, 7.50 × 10⁻³ mol. Divided by 0.200, that is 37.5 mL: choice D.' },
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
          items: ['Count the hydrogens the acid gives in the **balanced equation**', '$n = cV$, then the **mole ratio**, then $V = \\dfrac{n}{c}$', 'Volumes in **litres** for the working'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Write the balanced equation, which counts how many hydroxide ions each acid molecule needs.', show: 'sum.0' },
        { say: 'Find the moles of the solution you know with n equals c V, use the mole ratio, then find the volume with V equals n over c.', show: 'sum.1', caption: 'Find the moles of the solution you know with n = cV, use the mole ratio, then find the volume with V = n ÷ c.' },
        { say: 'And work with volumes in litres. For more on titration, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
