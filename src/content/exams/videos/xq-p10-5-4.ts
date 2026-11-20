import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 10 lesson 5.4 (parallel circuits): three resistors, 10, 20 and 30 Ω,
// are connected in parallel; what is the equivalent resistance? The question is OpenStax Physics'
// own, word for word (Practice Problems, section 19.3, CC BY 4.0). 1/R = 1/10 + 1/20 + 1/30 =
// 11/60, so R = 60/11 ≈ 5.5 Ω (choice a). 60 Ω adds them as if in series, and 6 × 10³ Ω is their
// product; in parallel the answer must be smaller than the smallest resistor.
//
// The picture (src/video/circuit.ts) puts the three resistors on separate branches across 6 V:
// the branch ammeters read 0.6 A, 0.3 A and 0.2 A, 1.1 A in all, and 6 V ÷ 1.1 A is 5.5 Ω.

const three: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 6,
  layout: 'parallel',
  parts: [
    { id: 'r1', kind: 'resistor', ohms: 10 },
    { id: 'r2', kind: 'resistor', ohms: 20 },
    { id: 'r3', kind: 'resistor', ohms: 30 },
  ],
  open: true,
  height: 460,
  poster: 'on',
  clips: {
    on: { phases: [{ dur: 0.6 }, { dur: 4, set: { closed: true } }] },
  },
};

const QUESTION = 'Three resistors, 10, 20, and 30 Ω, are connected in parallel. What is the equivalent resistance?';
const CHOICES = ['The equivalent resistance is 5.5 Ω', 'The equivalent resistance is 60 Ω', 'The equivalent resistance is 6 × 10³ Ω', 'The equivalent resistance is 6 × 10⁴ Ω'];

const video: Explainer = {
  id: 'xq-p10-5-4',
  lessonId: '',
  exam: {
    lesson: 'p10-5-4',
    source: 'OpenStax, Physics, Practice Problem for section 19.3, Parallel Circuits',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/19-3-parallel-circuits',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Three Resistors in Parallel. The Equivalent Resistance',
  thumbnailTitle: 'Three Resistors in Parallel',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: resistors of 10, 20 and 30 Ω are connected in parallel, and we find their equivalent resistance. We add the reciprocals, 1/R = 1/R₁ + 1/R₂ + 1/R₃, over a common denominator, and turn the result back over. Then we check the answer with the currents in a working circuit and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Three Resistors in Parallel', subtitle: 'Parallel circuits, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about three resistors in parallel. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          choices: ['$5.5\\ \\Omega$', '$60\\ \\Omega$', '$6 \\times 10^{3}\\ \\Omega$', '$6 \\times 10^{4}\\ \\Omega$'],
          answer: 0,
          working: '$\\dfrac{1}{R} = \\dfrac{1}{10} + \\dfrac{1}{20} + \\dfrac{1}{30} = \\dfrac{11}{60}$, so $R = \\dfrac{60}{11} \\approx 5.5\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Three resistors, ten, twenty and thirty ohms, are connected in parallel. What is the equivalent resistance?' },
        { say: 'The choices are 5.5 ohms, sixty ohms, six times ten to the three ohms, and six times ten to the four ohms. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [three, { kind: 'text', id: 'plain', size: 'lg', md: 'What **single** resistor would do the same job as all three?' }],
      lines: [
        { say: 'Let us picture it. In parallel, each resistor sits on its own branch, straight across the battery. The current splits between the branches and joins up again.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.5 },
        { say: 'The equivalent resistance is the one single resistor that could replace all three and draw the same current from the battery. The question asks: how big is it?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Resistors in parallel',
          md: 'In **parallel**, every branch gets the **full voltage**, and each one gives the current **another path**. So the equivalent resistance is **less than the smallest** resistor. To find it, add the **reciprocals**: $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}$, then turn the answer over.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Two $4\\ \\Omega$ in parallel: $\\dfrac{1}{R} = \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{2}{4}$, so $R = \\dfrac{4}{2} = 2\\ \\Omega$.' },
      ],
      lines: [
        { say: 'Here is what we need. In parallel, every branch gets the full voltage of the battery, and each branch gives the current another path to take.', show: 'def' },
        { say: 'More paths make it easier for the current to flow, so the equivalent resistance is less than the smallest resistor. To find it, add the reciprocals, one over each resistance, and then turn the answer upside down.' },
        { say: 'For example, two four ohm resistors in parallel: a quarter plus a quarter is two quarters, and turned over, that is two ohms. Half of either one.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Add the **reciprocals** over a common denominator', 'Turn the answer **over**', 'Check: is it **less** than the smallest resistor?'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, add one over ten, one over twenty and one over thirty, using a common denominator.', show: 'plan.0' },
        { say: 'Second, turn the answer upside down.', show: 'plan.1' },
        { say: 'Third, check that it is less than the smallest resistor, ten ohms.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add the reciprocals',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{R} = \\dfrac{1}{10} + \\dfrac{1}{20} + \\dfrac{1}{30}', '= \\dfrac{6}{60} + \\dfrac{3}{60} + \\dfrac{2}{60}', '= \\adj{\\dfrac{11}{60}}'] }],
      lines: [
        { say: 'Step one. Add one over ten, one over twenty and one over thirty.', show: 'm.0' },
        { say: 'Sixty is a number that ten, twenty and thirty all divide into, so use sixtieths. One tenth is six sixtieths, one twentieth is three sixtieths, and one thirtieth is two sixtieths.', show: 'm.1' },
        { say: 'Six plus three plus two is eleven: eleven sixtieths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Turn it over',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{R} = \\dfrac{11}{60} \\quad \\Rightarrow \\quad R = \\dfrac{60}{11}', '= 5.45 \\ldots \\approx \\good{5.5\\ \\Omega}'] }],
      lines: [
        { say: 'Step two. That is one over R, not R itself. This is the step that is easiest to forget. Turn both sides upside down: R is sixty over eleven.', show: 'm.0' },
        { say: 'Sixty divided by eleven is about 5.5 ohms. That is choice A.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [three, { kind: 'math', id: 'm', size: 'md', lines: ['I = 0.6 + 0.3 + 0.2 = 1.1\\ \\text{A} \\qquad R = \\dfrac{V}{I} = \\dfrac{6}{1.1} \\approx 5.5\\ \\Omega\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on a real circuit. Put the three resistors across a six volt battery, and look at the ammeters.', show: ['c', 'c.charges', 'c.current'], play: 'c.on', playDelay: 0.3 },
        { say: 'Each branch gets the full six volts. The ten ohm branch takes 0.6 amps, the twenty ohm branch 0.3, and the thirty ohm branch 0.2. In all, 1.1 amps leave the battery.' },
        { say: 'A single resistor that draws 1.1 amps from six volts is six over 1.1: about 5.5 ohms. And it is less than ten ohms, the smallest resistor, just as it must be.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$60\\ \\Omega$', '$10 + 20 + 30$: the **series** rule'],
            ['$6 \\times 10^{3}\\ \\Omega$', '$10 \\times 20 \\times 30$: **multiplied** them'],
            ['$6 \\times 10^{4}\\ \\Omega$', 'Even bigger: **more** than the smallest resistor'],
            ['$5.5\\ \\Omega$', 'Correct: the only one **under** $10\\ \\Omega$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Sixty ohms adds the resistances. That is the rule for series, where the charges must pass through all three, not parallel.' },
        { say: 'Six times ten to the three multiplies them, and six times ten to the four is even bigger.' },
        { say: 'Here is the quick check: in parallel the answer must be less than the smallest resistor. Only 5.5 ohms is under ten.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Resistors of 6 Ω and 3 Ω are connected in parallel. What is their equivalent resistance?',
          choices: ['9 Ω', '2 Ω', '0.5 Ω', '18 Ω'],
          answer: 1,
          working: '$\\dfrac{1}{R} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{6} + \\dfrac{2}{6} = \\dfrac{3}{6}$, so $R = \\dfrac{6}{3} = 2\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Your turn. Resistors of six ohms and three ohms are connected in parallel. What is their equivalent resistance? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'One sixth plus one third is one sixth plus two sixths: three sixths. Turned over, six thirds: two ohms. That is choice B, and it is less than three ohms, as it must be. 0.5 forgot to turn it over, and nine is the series rule.', show: 'q2.answer' },
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
          items: ['Parallel: every branch gets the **full voltage**', '$\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}$', 'Then **turn it over** to get $R$', 'Check: $R$ is **less** than the smallest resistor'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In parallel, every branch gets the full voltage of the battery.', show: 'sum.0' },
        { say: 'To combine them, add the reciprocals of the resistances.', show: 'sum.1' },
        { say: 'Then turn the answer over.', show: 'sum.2' },
        { say: 'And check that the answer is less than the smallest resistor. For more on parallel circuits, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
