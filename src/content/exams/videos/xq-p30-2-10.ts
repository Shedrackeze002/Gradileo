import type { Explainer, InductionEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.10 (electromagnetic induction): the magnetic flux through a
// single wire loop changes from 3.5 Wb to 1.5 Wb in 2.0 s; what emf is induced? The question is
// OpenStax Physics' own, word for word, with its four choices (a Problem for section 20.3, CC BY
// 4.0). ε = −N ΔΦ ÷ Δt = −(1)(1.5 − 3.5) ÷ 2.0 = +1.0 V (choice c). −1.0 V drops the minus sign of
// Lenz's law, and ±2.0 V forget to divide by the time.
//
// The picture (src/video/induction.ts) is a loop of 10 m² seen face on, in a field out of the page
// that falls steadily from 0.35 T to 0.15 T in 2.0 s, so the flux falls from 3.5 Wb to 1.5 Wb; the
// meter's reading is worked out from Faraday's law, and is +1.00 V while the flux falls.

const loop: InductionEl = {
  kind: 'induction',
  id: 'sim',
  view: [-7, 7, -2.34, 2.34],
  height: 380,
  tesla: 0.35,
  loop: { id: 'loop', rect: [-4, 0, -1.25, 1.25] },
  // One second of video is half a second for the field, so the 2.0 s of the question take 4 s.
  rate: 0.5,
  poster: 'fall',
  thumb: ['field', 'flux', 'emf'],
  clips: { fall: { reset: true, phases: [{ dur: 0.5 }, { dur: 4, tesla: 0.15 }, { dur: 0.6 }] } },
};

const QUESTION = 'The magnetic flux through a single wire loop changes from 3.5 Wb to 1.5 Wb in 2.0 s. What emf is induced in the loop?';
const CHOICES = ['–2.0 V', '–1.0 V', '+1.0 V', '+2.0 V'];

const video: Explainer = {
  id: 'xq-p30-2-10',
  lessonId: '',
  exam: {
    lesson: 'p30-2-10',
    source: 'OpenStax, Physics, Problem for section 20.3, Electromagnetic Induction',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/20-3-electromagnetic-induction',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Emf From a Changing Flux. Faraday’s Law and the Minus Sign',
  thumbnailTitle: 'The Emf From a Falling Flux',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: the magnetic flux through a single loop of wire falls from 3.5 Wb to 1.5 Wb in 2.0 s, and we find the emf induced in it, sign and all. We find the change in flux, divide by the time, and use the minus sign of Faraday’s law. Then we watch the flux fall on a loop joined to a meter, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Emf From a Falling Flux', subtitle: 'Electromagnetic induction, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the voltage made in a loop of wire when the magnetic field through it changes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$-2.0$ V', '$-1.0$ V', '$+1.0$ V', '$+2.0$ V'],
          answer: 2,
          working: '$\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t} = -(1)\\dfrac{1.5 - 3.5}{2.0} = -\\dfrac{-2.0}{2.0} = +1.0$ V.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The magnetic flux through a single wire loop changes from 3.5 webers to 1.5 webers in 2.0 seconds. What emf is induced in the loop?' },
        { say: 'The choices are minus 2.0, minus 1.0, plus 1.0, and plus 2.0 volts. Two of them differ only in their sign, so the sign matters. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [loop, { kind: 'text', id: 'plain', size: 'md', md: 'What **emf** does the falling flux make, and with which **sign**?' }],
      lines: [
        { say: 'Let us picture it. Here is a single loop of wire seen face on, joined to a voltmeter. A magnetic field comes out of the page through it, and the flux through the loop is 3.5 webers.', show: ['sim', 'sim.field', 'sim.flux'] },
        { say: 'Now let the field weaken steadily, so that the flux falls to 1.5 webers in 2.0 seconds. While the flux is changing, the meter shows an emf.', show: 'sim.emf', play: 'sim.fall', playDelay: 0.5 },
        { say: 'The question asks how large that emf is, and whether it is positive or negative.', show: 'plain' },
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
          title: 'Faraday’s law and Lenz’s law',
          md: 'A changing flux induces an emf $\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$, where $N$ is the number of turns and $\\Delta\\Phi = \\Phi_\\text{final} - \\Phi_\\text{initial}$. The **minus sign** is Lenz’s law: the emf always **opposes** the change in flux.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Flux rises from $1.0$ Wb to $4.0$ Wb in $3.0$ s: $\\varepsilon = -\\dfrac{4.0 - 1.0}{3.0} = -1.0$ V.' },
      ],
      lines: [
        { say: 'Here is what we need. Faraday\'s law says that a changing flux induces an emf. It is minus the number of turns, times the change in flux, divided by the time.', show: 'def' },
        { say: 'The change in flux is always the final flux minus the initial flux. The minus sign in front is Lenz\'s law: the induced emf always opposes the change that makes it.' },
        { say: 'For example, a flux that rises from one weber to four webers in three seconds changes by plus three. Three divided by three is one, and the minus sign makes the emf minus one volt.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the change in flux: $\\Delta\\Phi = \\Phi_\\text{final} - \\Phi_\\text{initial}$', 'Divide by the time', 'Put on the **minus sign** of Faraday’s law'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the change in flux: final minus initial.', show: 'plan.0' },
        { say: 'Second, divide it by the time.', show: 'plan.1' },
        { say: 'Third, put on the minus sign of Faraday\'s law, and keep track of the signs.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The change in flux',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\Delta\\Phi = \\Phi_\\text{final} - \\Phi_\\text{initial} = 1.5 - 3.5 = \\adj{-2.0\\ \\text{Wb}}'] }],
      lines: [
        { say: 'Step one. The flux ends at 1.5 webers and starts at 3.5. Final minus initial is 1.5 minus 3.5: minus 2.0 webers. It is negative because the flux falls.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide by the time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\Delta\\Phi}{\\Delta t} = \\dfrac{-2.0\\ \\text{Wb}}{2.0\\ \\text{s}} = \\opp{-1.0\\ \\text{Wb/s}}'] }],
      lines: [
        { say: 'Step two. Divide by the time: minus 2.0 webers in 2.0 seconds is minus 1.0 weber per second. A weber per second is the same as a volt.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The minus sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t} = -(1)(-1.0)', '= \\good{+1.0\\ \\text{V}}'] }],
      lines: [
        { say: 'Step three. There is a single loop, so N is one. The emf is minus one, times minus 1.0.', show: 'm.0' },
        { say: 'Minus times minus is plus. The emf is plus 1.0 volts. That is choice C. A falling flux gives a positive emf, which pushes a current that tries to keep the flux up.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [loop, { kind: 'math', id: 'm', size: 'md', lines: ['\\Phi = BA: \\ (0.35)(10) = 3.5\\ \\text{Wb} \\ \\to\\ (0.15)(10) = 1.5\\ \\text{Wb}'] }],
      lines: [
        { say: 'Let us check it on the picture. This loop has an area of ten square metres, and the field falls from 0.35 teslas to 0.15 teslas, so the flux falls from 3.5 to 1.5 webers, just as in the question.', show: ['sim', 'sim.field', 'sim.flux', 'm.0'] },
        { say: 'The meter works out the emf from Faraday\'s law as the flux changes. While the flux falls, it reads plus 1.00 volts, and when the flux stops changing, it reads zero.', show: 'sim.emf', play: 'sim.fall', playDelay: 0.3 },
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
            ['$-1.0$ V', 'Left out the **minus sign** of Lenz’s law'],
            ['$-2.0$ V', 'Did not **divide** by the time'],
            ['$+2.0$ V', 'Did not divide, and dropped a sign'],
            ['$+1.0$ V', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Minus 1.0 volts has the right size, but leaves out the minus sign of Faraday\'s law. That sign is Lenz\'s law, and it is why the emf opposes the change.' },
        { say: 'Minus 2.0 and plus 2.0 volts are only the change in flux. Faraday\'s law divides by the time, so a slower change gives a smaller emf.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The magnetic flux through a single loop of wire rises from 0.20 Wb to 0.80 Wb in 0.30 s. What emf is induced in the loop?',
          choices: ['+2.0 V', '−2.0 V', '+0.60 V', '−0.18 V'],
          answer: 1,
          working: '$\\varepsilon = -\\dfrac{0.80 - 0.20}{0.30} = -\\dfrac{0.60}{0.30} = -2.0$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. The magnetic flux through a single loop of wire rises from 0.20 webers to 0.80 webers in 0.30 seconds. What emf is induced in the loop? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The change is 0.80 minus 0.20: plus 0.60 webers. Divided by 0.30 seconds, that is 2.0, and the minus sign makes it minus 2.0 volts. That is choice B. A rising flux gives a negative emf.', show: 'q2.answer' },
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
          items: ['Faraday’s law: $\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$', '$\\Delta\\Phi$ is **final minus initial**', 'The minus sign is Lenz’s law: the emf **opposes** the change', 'Falling flux, positive emf; rising flux, negative emf'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The induced emf is minus the number of turns, times the change in flux, divided by the time.', show: 'sum.0' },
        { say: 'The change in flux is the final flux minus the initial flux.', show: 'sum.1' },
        { say: 'The minus sign is Lenz\'s law: the emf opposes the change.', show: 'sum.2' },
        { say: 'So a falling flux gives a positive emf, and a rising flux a negative one. For more on electromagnetic induction, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
