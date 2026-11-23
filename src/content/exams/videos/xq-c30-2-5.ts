import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import trials from '@/content/chem30/videos/c30-2-5-c.ts';
import { rig } from '@/content/chem30/videos/lib/c30-2b-figures.ts';

// Exam question for Chemistry 30 lesson 2.5 (redox titrations): 25.00 mL samples of acidified
// iron(II) sulfate are titrated with 0.0200 mol/L permanganate; the trials take 19.10 (a rough
// trial), 18.42, 18.38 and 18.40 mL. Find [Fe2+] and say what shows the end point. Gradileo wrote
// the question in the style of a unit test. The answer: the three close trials average 18.40 mL;
// n(MnO4-) = 0.0200 x 0.01840 = 3.680e-4 mol; n(Fe2+) = 5 x 3.680e-4 = 1.840e-3 mol;
// [Fe2+] = 1.840e-3 / 0.02500 = 0.0736 mol/L. The end point is the first pale pink that lasts.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's titration, drops
// reacting until the flask has nothing left to react with; and the burette and flask
// (src/video/solids.ts), the permanganate's purple staying once the iron(II) is used up.

const QUESTION = 'A student titrates 25.00 mL samples of acidified iron(II) sulfate solution with 0.0200 mol/L potassium permanganate solution: MnO₄⁻(aq) + 5Fe²⁺(aq) + 8H⁺(aq) → Mn²⁺(aq) + 5Fe³⁺(aq) + 4H₂O(l). The volumes of permanganate used were 19.10 mL (a rough trial), 18.42 mL, 18.38 mL and 18.40 mL. (a) What is the concentration of iron(II) ions? (b) What shows the end point?';

const setup = figure('r', [rig({ titrant: '\\ce{KMnO4(aq)}', sample: '\\ce{Fe^2+(aq)}' })], 520);

const video: Explainer = {
  id: 'xq-c30-2-5',
  lessonId: '',
  exam: {
    lesson: 'c30-2-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron(II) by Permanganate Titration. Redox Titrations',
  thumbnailTitle: 'Iron(II) by Permanganate Titration',
  thumbnail: 'tm',
  summary:
    'A test-style question, solved one small step at a time: iron(II) sulfate is titrated with 0.0200 mol/L permanganate, and four burette readings are given. We average the three trials that agree, find the moles of permanganate, use the 1 : 5 mole ratio to find the moles of iron(II), and divide by the volume to get 0.0736 mol/L. The end point is the first lasting pale pink.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Iron(II) by Permanganate Titration', subtitle: 'From burette readings to a concentration' }],
      lines: [
        { say: 'In this video, we solve a test-style question about redox titrations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
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
          prompt: 'A student titrates $25.00\\ \\text{mL}$ samples of acidified iron(II) sulfate solution with $0.0200\\ \\text{mol/L}$ potassium permanganate solution: $\\ce{MnO4^- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. The volumes of permanganate used were $19.10\\ \\text{mL}$ (a rough trial), $18.42$, $18.38$ and $18.40\\ \\text{mL}$. (a) What is the concentration of iron(II) ions? (b) What shows the end point?',
          answer: '0.0736 mol/L; the first pale pink that lasts',
        },
      ],
      lines: [
        { say: 'Here is the question. A student titrates twenty five point zero zero millilitre samples of acidified iron two sulfate solution with zero point zero two zero zero mole per litre potassium permanganate solution. One permanganate ion reacts with five iron two plus ions. The volumes of permanganate used were nineteen point one zero millilitres, a rough trial, then eighteen point four two, eighteen point three eight and eighteen point four zero. Part a: what is the concentration of iron two ions? Part b: what shows the end point?', show: 'q', caption: 'Here is the question. 25.00 mL samples of acidified iron(II) sulfate are titrated with 0.0200 mol/L KMnO₄: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Volumes: 19.10 mL (rough), 18.42, 18.38 and 18.40 mL. (a) What is [Fe²⁺]? (b) What shows the end point?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know everything about the **permanganate**. Use the **ratio** to find the **iron(II)**' }],
      lines: [
        { say: 'We know the permanganate\'s concentration and, from the burette, its volume. The balanced equation links its moles to the moles of iron two, and the sample\'s volume turns those into a concentration.', caption: 'We know the permanganate\'s concentration and, from the burette, its volume. The balanced equation links its moles to the moles of iron(II), and the sample\'s volume turns those into a concentration.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(trials, 'tm'), { kind: 'math', id: 'k', size: 'md', lines: ['n = cV \\qquad c = \\dfrac{n}{V}'] }],
      lines: [
        { say: 'Here is what we need. One trial of a titration: a solution added drop by drop from a burette. Watch it reach its end point.', show: ['tm', 'tm.labels', 'tm.key', 'tm.tally'], play: 'tm.titrate' },
        { say: 'Each drop reacts with the sample until none of the sample is left. At that moment, the titrant added and the sample are in exactly the ratio of the balanced equation.' },
        { say: 'And to move between moles and concentrations, moles are concentration times volume in litres.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Average** the trials that agree', 'Find the moles of $\\ce{MnO4^-}$, then use the **1 : 5** ratio', 'Divide by the **sample volume**'] }],
      lines: [
        { say: 'Here is the plan. First, average the trials that agree with each other.', show: 'plan.0' },
        { say: 'Then find the moles of permanganate, and use the one to five ratio to get the moles of iron two.', show: 'plan.1', caption: 'Then find the moles of permanganate, and use the 1 : 5 ratio to get the moles of iron(II).' },
        { say: 'Then divide by the sample\'s volume.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The average volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'v', size: 'lg', lines: ['19.10\\ \\text{mL: rough, left out}', '\\bar V = \\dfrac{18.42 + 18.38 + 18.40}{3} = \\good{18.40\\ \\text{mL}}'] }],
      lines: [
        { say: 'Step one. The first trial is a rough one, run fast to find the end point roughly. It is nearly a millilitre more than the others, so we leave it out.', show: 'v.0', focus: 'v.0' },
        { say: 'The other three agree within a few hundredths of a millilitre. Their average is eighteen point four zero millilitres.', show: 'v.1', focus: 'v.1', caption: 'The other three agree within a few hundredths of a millilitre. Their average is 18.40 mL.' },
      ],
    },
    {
      chapter: 'Step 2: Moles of permanganate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n(\\ce{MnO4^-}) = 0.0200\\ \\text{mol/L} \\times 0.01840\\ \\text{L}', '= \\good{3.680 \\times 10^{-4}\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Eighteen point four zero millilitres is zero point zero one eight four zero litres. Moles are concentration times volume: zero point zero two zero zero times zero point zero one eight four zero.', show: 'm.0', caption: 'Step two. 18.40 mL is 0.01840 L. Moles are concentration times volume: 0.0200 × 0.01840.' },
        { say: 'That is three point six eight zero times ten to the minus four moles of permanganate.', show: 'm.1', focus: 'm.1', caption: 'That is 3.680 × 10⁻⁴ mol of permanganate.' },
      ],
    },
    {
      chapter: 'Step 3: Moles of iron(II)',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['n(\\ce{Fe^2+}) = 3.680 \\times 10^{-4} \\times \\dfrac{5}{1} = \\good{1.840 \\times 10^{-3}\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step three. One permanganate ion takes five electrons, and each iron two ion gives one, so each permanganate ion reacts with five iron two ions. Multiply by five: one point eight four zero times ten to the minus three moles of iron two.', show: 'f.0', focus: 'f.0', caption: 'Step three. One MnO₄⁻ takes five electrons, and each Fe²⁺ gives one, so each MnO₄⁻ reacts with five Fe²⁺. Multiply by five: 1.840 × 10⁻³ mol of Fe²⁺.' },
      ],
    },
    {
      chapter: 'Step 4: The concentration',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'lg', lines: ['[\\ce{Fe^2+}] = \\dfrac{1.840 \\times 10^{-3}\\ \\text{mol}}{0.02500\\ \\text{L}} = \\good{0.0736\\ \\text{mol/L}}'] }],
      lines: [
        { say: 'Step four. Those moles were in twenty five point zero zero millilitres, which is zero point zero two five zero zero litres. Divide, and the concentration of iron two ions is zero point zero seven three six moles per litre.', show: 'c.0', focus: 'c.0', caption: 'Step four. Those moles were in 25.00 mL = 0.02500 L. Divide: [Fe²⁺] = 0.0736 mol/L.' },
      ],
    },
    {
      chapter: 'Step 5: The end point',
      layout: 'split',
      leftWidth: 520,
      left: [setup],
      right: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\text{end point: the first}', '\\good{\\text{pale pink that lasts}}'] }],
      lines: [
        { say: 'Step five. Here is the burette of purple permanganate over the flask of iron two solution.', caption: 'Step five. Here is the burette of purple permanganate over the flask of iron(II) solution.', show: ['r.flask', 'r.sample', 'r.burette', 'r.titrant', 'r.scale', 'r.tap'] },
        { say: 'Each drop meets iron two ions, reacts, and loses its purple at once, because manganese two plus is almost colourless.', caption: 'Each drop meets Fe²⁺ ions, reacts, and loses its purple at once, because Mn²⁺ is almost colourless.', show: 'r.drop', focus: 'r.drop' },
        { say: 'Once the iron two is used up, the next drop has nothing to react with. Its purple stays, and the solution turns a pale pink that lasts after swirling. That is the end point, so permanganate needs no indicator.', caption: 'Once the Fe²⁺ is used up, the next drop has nothing to react with. Its purple stays, and the solution turns a pale pink that lasts after swirling. That is the end point, so permanganate needs no indicator.', show: ['r.pink', 'e.0', 'e.1'], focus: 'r.pink' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['0.0200 \\times 18.40 \\times 5 = 1.840 \\qquad 0.0736 \\times 25.00 = 1.840'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$[\\ce{Fe^2+}] = 0.0736\\ \\text{mol/L}$. The end point is the **first pale pink that lasts**.' },
      ],
      lines: [
        { say: 'Does it make sense? Work back the other way. In millimoles, the permanganate gives zero point zero two zero zero times eighteen point four zero times five, which is one point eight four zero, and zero point zero seven three six times twenty five is also one point eight four zero.', show: 'x.0', caption: 'Does it make sense? Work back in millimoles: 0.0200 × 18.40 × 5 = 1.840, and 0.0736 × 25.00 = 1.840.' },
        { say: 'So the concentration of iron two ions is zero point zero seven three six moles per litre, and the end point is the first pale pink that lasts.', show: 'ans', caption: 'So [Fe²⁺] = 0.0736 mol/L, and the end point is the first pale pink that lasts.' },
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
            ['$0.0743\\ \\text{mol/L}$', 'Put the **rough trial** into the average'],
            ['$0.0147\\ \\text{mol/L}$', 'Left out the **5** in the mole ratio'],
            ['$0.00294\\ \\text{mol/L}$', '**Divided** by 5 instead of multiplying'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point zero seven four three comes from averaging all four trials. The rough trial overshoots on purpose, so it is left out.', focus: 'traps.0', caption: '0.0743 mol/L comes from averaging all four trials. The rough trial overshoots on purpose, so it is left out.' },
        { say: 'Zero point zero one four seven treats the reaction as one to one. Each permanganate ion reacts with five iron two ions.', focus: 'traps.1', caption: '0.0147 mol/L treats the reaction as 1 : 1. Each MnO₄⁻ reacts with five Fe²⁺.' },
        { say: 'And zero point zero zero two nine four uses the ratio upside down. There are more iron two ions than permanganate ions, so the moles must go up.', focus: 'traps.2', caption: 'And 0.00294 mol/L uses the ratio upside down. There are more Fe²⁺ ions than MnO₄⁻ ions, so the moles must go up.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $10.00\\ \\text{mL}$ sample of hydrogen peroxide needs $16.00\\ \\text{mL}$ of $0.0200\\ \\text{mol/L}$ permanganate: $\\ce{2MnO4^- + 5H2O2 + 6H+ -> 2Mn^2+ + 5O2 + 8H2O}$. What is $[\\ce{H2O2}]$?',
          choices: ['$0.0800\\ \\text{mol/L}$', '$0.0320\\ \\text{mol/L}$', '$0.0128\\ \\text{mol/L}$', '$0.160\\ \\text{mol/L}$'],
          answer: 0,
          working: '$0.0200 \\times 0.01600 \\times \\tfrac{5}{2} = 8.00 \\times 10^{-4}$ mol of $\\ce{H2O2}$, in $0.01000$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A ten point zero zero millilitre sample of hydrogen peroxide needs sixteen point zero zero millilitres of zero point zero two zero zero mole per litre permanganate. Two permanganate ions react with five hydrogen peroxide molecules. What is the concentration of the hydrogen peroxide? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A 10.00 mL sample of H₂O₂ needs 16.00 mL of 0.0200 mol/L permanganate: 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O. What is [H₂O₂]? Pause the video and try it.' },
        { say: 'The permanganate is three point two zero times ten to the minus four moles. Times five over two is eight point zero zero times ten to the minus four moles of peroxide, and divided by zero point zero one litres that is zero point zero eight zero zero moles per litre: choice A.', show: 'q2.answer', caption: 'n(MnO₄⁻) = 3.20 × 10⁻⁴ mol. × 5/2 = 8.00 × 10⁻⁴ mol of H₂O₂, and ÷ 0.01000 L = 0.0800 mol/L: choice A.' },
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
          items: ['Average only the trials that **agree**; leave out the rough one', '$n = cV$, then the **mole ratio** from the balanced equation', 'Permanganate is its own indicator: the **first lasting pink**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Average only the trials that agree, and leave out the rough one.', show: 'sum.0' },
        { say: 'Find the moles of the titrant from concentration times volume, then use the mole ratio from the balanced equation.', show: 'sum.1' },
        { say: 'And permanganate is its own indicator: the end point is the first pale pink that lasts. For more on redox titrations, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
