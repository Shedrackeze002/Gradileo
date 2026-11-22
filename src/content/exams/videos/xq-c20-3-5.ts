import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import dilution from '@/content/chem20/videos/c20-3-5.ts';
import makingUp from '@/content/chem20/videos/c20-3-5-c.ts';

// Exam question for Chemistry 20 lesson 3.5 (dilution): find the volume of 0.33 M sucrose stock
// needed to make 25 mL of 0.025 M solution. The question is OpenStax Chemistry 2e's own, word for
// word (end-of-chapter exercise 61, section 3.3, CC BY-NC-SA 4.0). The answer: c1V1 = c2V2, so
// V1 = 0.025 x 25 / 0.33 = 1.89 mL, about 1.9 mL to two significant figures, which matches the
// book's answer.
//
// The pictures are the lesson's own simulated dilutions (src/video/particles.ts): solute particles
// that keep their number while water is added and they spread through more volume.

const QUESTION = 'What volume of a 0.33-M C12H22O11 solution can be diluted to prepare 25 mL of a solution with a concentration of 0.025 M?';

const video: Explainer = {
  id: 'xq-c20-3-5',
  lessonId: '',
  exam: {
    lesson: 'c20-3-5',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 61, section 3.3, Molarity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/3-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Stock Solution to Dilute? Dilution',
  thumbnailTitle: 'How Much Stock Solution?',
  thumbnail: 'dl',
  summary:
    'A real test question, solved one small step at a time: what volume of a 0.33 mol/L sugar solution must be diluted to make 25 mL of a 0.025 mol/L solution? We watch a dilution keep the same solute particles, use c₁V₁ = c₂V₂, and get about 1.9 mL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Stock Solution?', subtitle: 'Dilution, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about diluting a stock solution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What volume of a 0.33-M $\\ce{C12H22O11}$ solution can be diluted to prepare $25\\ \\text{mL}$ of a solution with a concentration of 0.025 M?',
          answer: 'about 1.9 mL',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What volume of a zero point three three molar sugar solution, C twelve H twenty two O eleven, can be diluted to prepare twenty five millilitres of a solution with a concentration of zero point zero two five molar?', caption: QUESTION },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'How much of the **strong** solution do we start with, so that adding water gives $25\\ \\text{mL}$ of the **weak** one?' }],
      lines: [
        { say: 'Capital M means moles per litre. The sugar here is sucrose, and the strong solution we start from is called the stock solution.', show: 'plain' },
        { say: 'So we must find how much stock to measure out, so that making it up to twenty five millilitres with water gives the weaker concentration.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 620,
      left: [pick(dilution, 'dl')],
      right: [{ kind: 'math', id: 'k', size: 'lg', lines: ['n = cV \\text{ stays the same}', 'c_1V_1 = c_2V_2'] }],
      lines: [
        { say: 'Here is what we need. These are the solute particles in some solution. Watch them as water is added.', show: ['dl', 'dl.labels', 'dl.volume', 'dl.key'] },
        { say: 'The volume goes up, and the particles spread out to fill it, but there are still exactly the same number of them.', play: 'dl.dilute', focus: 'dl.d' },
        { say: 'So the amount of solute, n equals c times V, stays the same.', show: 'k.0', caption: 'So the amount of solute, n = cV, stays the same.' },
        { say: 'Before and after are therefore equal: c one V one equals c two V two.', show: 'k.1', focus: 'k.1', caption: 'Before and after are therefore equal: c₁V₁ = c₂V₂.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Label** the stock (1) and the diluted solution (2)', '**Rearrange** $c_1V_1 = c_2V_2$ for $V_1$', '**Calculate**, then check the size of the change'] }],
      lines: [
        { say: 'Here is the plan. First, we label the stock solution as one and the diluted solution as two.', show: 'plan.0' },
        { say: 'Then we rearrange c one V one equals c two V two to find V one.', show: 'plan.1', caption: 'Then we rearrange c₁V₁ = c₂V₂ to find V₁.' },
        { say: 'Then we calculate, and check that the answer makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Label the values',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'v',
          head: ['', 'Stock (1)', 'Diluted (2)'],
          rows: [
            ['Concentration', '$c_1 = 0.33\\ \\text{mol/L}$', '$c_2 = 0.025\\ \\text{mol/L}$'],
            ['Volume', '$V_1 = \\ ?$', '$V_2 = 25\\ \\text{mL}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The stock solution is zero point three three moles per litre, and its volume is what we want.', show: ['v', 'v.0'], caption: 'Step one. The stock solution is 0.33 mol/L, and its volume is what we want.' },
        { say: 'The diluted solution is zero point zero two five moles per litre, and there are twenty five millilitres of it.', show: 'v.1', caption: 'The diluted solution is 0.025 mol/L, and there are 25 mL of it.' },
        { say: 'Both volumes can stay in millilitres, as long as they are in the same unit, because the units cancel in the same way on both sides.' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange and calculate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['V_1 = \\dfrac{c_2V_2}{c_1}', '= \\dfrac{0.025 \\times 25\\ \\text{mL}}{0.33}', '= 1.89\\ \\text{mL} \\approx \\good{1.9\\ \\text{mL}}'],
        },
      ],
      lines: [
        { say: 'Step two. Divide both sides by c one: V one equals c two times V two, over c one.', show: 'm.0', caption: 'Step two. Divide both sides by c₁: V₁ = c₂V₂ ÷ c₁.' },
        { say: 'Put in the numbers: zero point zero two five times twenty five millilitres, divided by zero point three three.', show: 'm.1', caption: 'Put in the numbers: 0.025 × 25 mL ÷ 0.33.' },
        { say: 'That is one point eight nine millilitres, or about one point nine millilitres to two significant figures.', show: 'm.2', focus: 'm.2', caption: 'That is 1.89 mL, or about 1.9 mL to two significant figures.' },
      ],
    },
    {
      chapter: 'Step 3: Make it up',
      layout: 'center',
      main: [pick(makingUp, 'fv'), { kind: 'math', id: 'w', size: 'md', lines: ['1.9\\ \\text{mL stock} \\;\\to\\; \\text{made up to } 25\\ \\text{mL}'] }],
      lines: [
        { say: 'Step three. In the lab, we would measure out one point nine millilitres of the stock and add water until the total volume is twenty five millilitres.', show: ['fv', 'fv.labels', 'fv.volume', 'fv.key', 'w.0'], caption: 'Step three. In the lab, we would measure out 1.9 mL of the stock and add water until the total volume is 25 mL.' },
        { say: 'Here is a dilution like it, ten millilitres made up to fifty: the water goes in, and the same solute particles spread through the whole volume. Ours is about thirteen times, so its particles end up even more spread out.', play: 'fv.dilute', focus: 'fv.d', caption: 'Here is a dilution like it, 10 mL made up to 50 mL: the water goes in, and the same solute particles spread through the whole volume. Ours is about 13 times, so its particles end up even more spread out.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'k2', size: 'lg', lines: ['\\dfrac{0.33}{0.025} = 13.2 \\text{ times weaker}', '13.2 \\times 1.89\\ \\text{mL} = 25\\ \\text{mL} \\;\\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'About $1.9\\ \\text{mL}$ of the 0.33 M stock, made up to $25\\ \\text{mL}$ with water.' },
      ],
      lines: [
        { say: 'Check the size of the change. The new solution is zero point three three divided by zero point zero two five, about thirteen times weaker.', show: 'k2.0', caption: 'Check the size of the change. The new solution is 0.33 ÷ 0.025, about 13.2 times weaker.' },
        { say: 'So its volume must be thirteen times larger, and thirteen point two times one point eight nine millilitres is twenty five millilitres.', show: 'k2.1', caption: 'So its volume must be 13.2 times larger, and 13.2 × 1.89 mL = 25 mL.' },
        { say: 'So we need about one point nine millilitres of the stock, made up to twenty five millilitres with water. That matches the book.', show: 'ans', caption: 'So we need about 1.9 mL of the stock, made up to 25 mL with water. That matches the book.' },
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
            ['$330\\ \\text{mL}$', 'The concentrations **swapped**: $\\dfrac{0.33 \\times 25}{0.025}$'],
            ['$23\\ \\text{mL}$', 'That is the **water** added, not the stock'],
            ['$13\\ \\text{mL}$', 'The **ratio** $\\dfrac{0.33}{0.025}$, used as a volume'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Three hundred and thirty millilitres comes from putting the concentrations the wrong way round. You cannot dilute to twenty five millilitres starting from more than that.', focus: 'traps.0', caption: '330 mL comes from putting the concentrations the wrong way round. You cannot dilute to 25 mL starting from more than that.' },
        { say: 'Twenty three millilitres is the water to add, twenty five minus one point nine. The question asks for the stock.', focus: 'traps.1', caption: '23 mL is the water to add, 25 − 1.9. The question asks for the stock.' },
        { say: 'And thirteen comes from dividing the concentrations and stopping. That number tells you how many times weaker the solution is, which has no units of volume.', focus: 'traps.2', caption: 'And 13 comes from dividing the concentrations and stopping. That number tells you how many times weaker the solution is, which has no units of volume.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What volume of $6.00\\ \\text{mol/L}$ stock hydrochloric acid is needed to make $250\\ \\text{mL}$ of $0.300\\ \\text{mol/L}$ acid?',
          choices: ['$12.5\\ \\text{mL}$', '$5000\\ \\text{mL}$', '$238\\ \\text{mL}$', '$20.0\\ \\text{mL}$'],
          answer: 0,
          working: '$V_1 = \\dfrac{0.300 \\times 250\\ \\text{mL}}{6.00} = 12.5\\ \\text{mL}$',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of six point zero zero moles per litre stock hydrochloric acid is needed to make two hundred and fifty millilitres of zero point three zero zero moles per litre acid? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. What volume of 6.00 mol/L stock hydrochloric acid is needed to make 250 mL of 0.300 mol/L acid? Pause the video and try it.' },
        { say: 'V one is zero point three zero zero times two hundred and fifty millilitres, divided by six point zero zero, which is twelve point five millilitres: choice A.', show: 'q2.answer', caption: 'V₁ = 0.300 × 250 mL ÷ 6.00 = 12.5 mL: choice A.' },
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
          items: ['Diluting keeps the **amount of solute** the same', '$c_1V_1 = c_2V_2$, with both volumes in the **same unit**', 'The stock volume is always **smaller** than the final volume'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Adding water keeps the amount of solute the same and spreads it through more volume.', show: 'sum.0' },
        { say: 'So c one V one equals c two V two, with both volumes in the same unit.', show: 'sum.1', caption: 'So c₁V₁ = c₂V₂, with both volumes in the same unit.' },
        { say: 'And the stock volume is always smaller than the final volume, which is a quick check on your answer. For more on dilution, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
