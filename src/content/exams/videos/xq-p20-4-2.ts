import type { Explainer, MotionEl } from '@/video/script.ts';

// Exam question for lesson 4.2 (the mass on a spring): which factors affect the period and the
// frequency of an oscillator? The question is OpenStax Physics' own, word for word (Test Prep,
// section 5.5, CC BY 4.0). T = 2π√(m ÷ k) and f = 1 ÷ T, so only the mass and the force constant
// matter (choice d). The applied force only sets the amplitude, which does not change the period.
//
// The pictures (src/video/motion.ts) race masses on springs that obey Hooke's law, so the counts
// on screen come out of the masses and force constants, and are not typed in: a spring four times
// as stiff gives twice the oscillations, a mass four times as large gives half, and a larger pull
// gives the same.

/** A mass hung on a spring, let go from `A` metres above where it rests. */
const hung = (id: string, m: number, k: number, A: number, label: string): MotionEl => ({
  kind: 'motion',
  id,
  vertical: true,
  span: [0, 0.2],
  lanes: [{ label }],
  bodies: [{ id: 'mass', shape: 'block', mass: m, label: `${m} kg`, x: 0.1 - A, width: m > 1 ? 0.045 : 0.036, tone: 'adj' }],
  spring: { on: 'mass', k, rest: 0.1, hidden: true },
  equilibrium: 0.1,
  cm: true,
  height: 520,
  clips: { go: { phases: [{ dur: 4 }] } },
});

const one = hung('one', 0.5, 20, 0.04, 'k = 20 N/m');
one.poster = 'go';
const soft = hung('soft', 0.5, 20, 0.04, 'k = 20 N/m');
const stiff = hung('stiff', 0.5, 80, 0.04, 'k = 80 N/m');
const light = hung('light', 0.5, 20, 0.04, 'm = 0.5 kg');
const heavy = hung('heavy', 2, 20, 0.04, 'm = 2 kg');
const small = hung('small', 0.5, 20, 0.02, 'Small pull: 2 cm');
const large = hung('large', 0.5, 20, 0.06, 'Big pull: 6 cm');

const video: Explainer = {
  id: 'xq-p20-4-2',
  lessonId: '',
  exam: {
    lesson: 'p20-4-2',
    source: 'OpenStax, Physics, Test Prep for section 5.5, Simple Harmonic Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/5-5-simple-harmonic-motion',
    question: 'For a given oscillator, what are the factors that affect its period and frequency?',
    choices: ['Mass only', 'Force constant only', 'Applied force and mass', 'Mass and force constant'],
  },
  title: 'Exam Question: What Sets the Period of a Mass on a Spring?',
  thumbnailTitle: 'What Sets the Period?',
  thumbnail: 'one',
  summary:
    'A real test question, solved one small step at a time: which factors affect the period and the frequency of an oscillator? We race masses on springs to test the stiffness, the mass and the size of the pull one at a time, and then see all three results in one formula, T = 2π√(m ÷ k). Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Sets the Period?', subtitle: 'The mass on a spring, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a mass bouncing on a spring. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'For a given oscillator, what are the factors that affect its period and frequency?',
          choices: ['Mass only', 'Force constant only', 'Applied force and mass', 'Mass and force constant'],
          answer: 3,
          working: '$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$ and $f = \\dfrac{1}{T}$: only the mass $m$ and the force constant $k$ appear.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'For a given oscillator, what are the factors that affect its period and frequency?' },
        { say: 'The choices are: mass only; force constant only; applied force and mass; or mass and force constant. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [one, { kind: 'text', id: 'plain', size: 'lg', md: 'What changes how **quickly** it bobs?' }],
      lines: [
        { say: 'Let us picture it. An oscillator is anything that moves back and forth, over and over. Here is the simplest one: a mass hanging on a spring. Pull it down, let go, and it bobs up and down at a steady rate.', show: ['one', 'one.count', 'one.clock'], play: 'one.go', playDelay: 1 },
        { say: 'The question asks: what changes how quickly it bobs?', show: 'plain' },
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
          title: 'Period and frequency',
          md: 'The **period** $T$ is the time for one whole oscillation, in seconds. The **frequency** $f$ is the number of oscillations each second, in hertz: $f = \\dfrac{1}{T}$. The **force constant** $k$ says how stiff the spring is.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A period of $0.5$ s means $f = 1 \\div 0.5 = 2$ oscillations each second.' },
      ],
      lines: [
        { say: 'Here is what we need. The period is the time for one whole oscillation, down and back up again.', show: 'def' },
        { say: 'The frequency is how many oscillations happen each second. It is one over the period, so the two always change together. Anything that changes one changes the other.' },
        { say: 'For example, a period of half a second means two oscillations each second.', show: 'ex' },
        { say: 'And the force constant k says how stiff the spring is.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the **force constant**, keep the rest the same', 'Change the **mass**', 'Change the **applied force**: how hard we pull it', 'See all three in one formula'],
        },
      ],
      lines: [
        { say: 'Here is the plan. We will test each choice fairly, by changing one thing at a time and counting the oscillations. First, the force constant.', show: 'plan.0' },
        { say: 'Second, the mass.', show: 'plan.1' },
        { say: 'Third, the applied force: how hard we pull the mass down before we let go.', show: 'plan.2' },
        { say: 'Then we will see all three results in one formula.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The force constant',
      layout: 'split',
      leftWidth: 544,
      left: [soft],
      right: [stiff],
      lines: [
        { say: 'Step one. Two equal masses of 0.5 kilograms. The spring on the right is four times as stiff.', show: ['soft', 'stiff'] },
        { say: 'Let them go together, and count for four seconds.', show: ['soft.count', 'stiff.count', 'soft.clock', 'stiff.clock'], play: ['soft.go', 'stiff.go'], playDelay: 1 },
        { say: 'The soft spring gave four oscillations, and the stiff one gave eight. A stiffer spring pulls back harder, so it bobs faster. The force constant matters.' },
      ],
    },
    {
      chapter: 'Step 2: The mass',
      layout: 'split',
      leftWidth: 544,
      left: [light],
      right: [heavy],
      lines: [
        { say: 'Step two. Now the same spring, and change the mass. The mass on the right is four times as large: two kilograms.', show: ['light', 'heavy'] },
        { say: 'Let them go together.', show: ['light.count', 'heavy.count', 'light.clock', 'heavy.clock'], play: ['light.go', 'heavy.go'], playDelay: 1 },
        { say: 'The small mass gave four oscillations, and the large one only two. A larger mass is harder to speed up and slow down, so it bobs more slowly. The mass matters too.' },
      ],
    },
    {
      chapter: 'Step 3: The applied force',
      layout: 'split',
      leftWidth: 544,
      left: [small],
      right: [large],
      lines: [
        { say: 'Step three. The same mass on the same spring. On the left we pull it down gently, two centimetres. On the right we pull three times as hard, six centimetres.', show: ['small', 'large', 'small.amplitude', 'large.amplitude'] },
        { say: 'Let them go together.', show: ['small.count', 'large.count', 'small.clock', 'large.clock'], play: ['small.go', 'large.go'], playDelay: 1 },
        { say: 'They stay exactly in step. The big pull has farther to go, but the spring pulls back harder too, and the two effects cancel. The applied force changes how far it swings, the amplitude, but not the period.' },
      ],
    },
    {
      chapter: 'Step 4: The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['T = 2\\pi\\sqrt{\\dfrac{\\adj{m}}{\\opp{k}}}', 'f = \\dfrac{1}{T}'] },
        { kind: 'text', id: 'only', size: 'lg', md: 'Only the **mass** and the **force constant**: choice **D**.' },
      ],
      lines: [
        { say: 'Step four. All three results are in one formula. The period is two pi, times the square root of the mass over the force constant.', show: 'm.0' },
        { say: 'The frequency is one over the period, so it depends on the same two things.', show: 'm.1' },
        { say: 'There is a mass and a force constant, and nothing else. No applied force, no amplitude. So the answer is choice D: mass and force constant.', show: 'only', focus: 'only' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4k:\\ T \\to \\dfrac{T}{2}\\ \\text{(twice as many: 8 not 4)}\\ \\checkmark', '4m:\\ T \\to 2T\\ \\text{(half as many: 2 not 4)}\\ \\checkmark', '\\text{bigger pull: same } T\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the formula against our races. Four times the force constant, under the square root, halves the period. That is twice as many oscillations: eight instead of four. That is what we saw.', show: 'm.0' },
        { say: 'Four times the mass doubles the period: half as many oscillations, two instead of four. That matches too.', show: 'm.1' },
        { say: 'And a bigger pull left the period the same, just as the formula says.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is tempting'],
          rows: [
            ['Mass only', 'A heavier mass is **slower**, but stiffness counts too'],
            ['Force constant only', 'A stiffer spring is **faster**, but mass counts too'],
            ['Applied force and mass', 'The pull sets the **amplitude**, not the period'],
            ['Mass and force constant', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Mass only, and force constant only, are each half right. Both of them change the period, so neither is enough on its own.' },
        { say: 'Applied force and mass is the sneaky one. It feels as if a harder pull should make it go faster. It does move faster, but it also has farther to go, so each oscillation takes the same time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A mass on a spring has a period of 1.0 s. The mass is replaced by one four times as large, on the same spring. What is the new period?',
          choices: ['2.0 s', '4.0 s', '0.5 s', '1.0 s'],
          answer: 0,
          working: '$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$: four times $m$ multiplies $T$ by $\\sqrt{4} = 2$, so $T = 2.0$ s.',
        },
      ],
      lines: [
        { say: 'Your turn. A mass on a spring has a period of one second. The mass is replaced by one four times as large, on the same spring. What is the new period? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The mass is under a square root. Four times the mass multiplies the period by the square root of four, which is two. The new period is 2.0 seconds. That is choice A. 4.0 seconds forgets the square root.', show: 'q2.answer' },
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
          items: ['$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$ and $f = \\dfrac{1}{T}$', 'A **larger mass**: slower. A **stiffer spring**: faster', 'The **applied force** (amplitude) does **not** change the period', 'Test one thing at a time'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period is two pi times the square root of m over k, and the frequency is one over the period.', show: 'sum.0' },
        { say: 'A larger mass oscillates more slowly, and a stiffer spring oscillates faster.', show: 'sum.1' },
        { say: 'How hard you pull it changes the amplitude, but not the period.', show: 'sum.2' },
        { say: 'And when you test what matters, change one thing at a time. For more on the mass on a spring, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
