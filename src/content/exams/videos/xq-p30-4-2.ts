import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.2 (the gold foil experiment): how close can a 5.00 MeV alpha
// particle come to a gold nucleus (79 protons)? The question is OpenStax College Physics 2e's own,
// word for word (a Problem for section 19.3, CC BY-NC-SA 4.0; Gradileo is non-commercial). All the
// kinetic energy becomes electric potential energy kQq ÷ r, so r = kQq ÷ KE =
// (8.99 × 10⁹)(79e)(2e) ÷ (8.00 × 10⁻¹³ J) = 4.55 × 10⁻¹⁴ m.
//
// The picture (src/video/charges.ts) fires the alpha particle head-on at the nucleus, to scale in
// femtometres, and moves it step by step by the Coulomb force: it stops 45 fm away and is sent
// back. The forces are worked out at that scale, with Coulomb's constant scaled to match (k × 10⁴⁵
// for distances counted in fm), so no force is written; only the distance between them is.

const ALPHA = 6.64e-27;
/** One femtometre of the picture is one unit of the view. */
const FM = 1e15;
const K = 8.99e9;
const E = 1.602e-19;
const START = 300;
/** The alpha starts 300 fm away, already a little slowed: its energy far away is 5.00 MeV. */
const LAUNCH = Math.sqrt((2 * (5.0e6 * E - (K * 79 * 2 * E * E * FM) / START)) / ALPHA) * FM;

const shot: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-330, 40, -60, 60],
  height: 380,
  unit: 'e',
  k: K * FM ** 3,
  length: { metres: 1, symbol: 'fm' },
  figures: 2,
  bodies: [
    { id: 'au', charge: 79, x: 0, radius: 7, label: 'Gold nucleus', labelAt: 'below' },
    { id: 'a', charge: 2, x: -START, mass: ALPHA, radius: 2, label: 'Alpha particle', labelAt: 'above' },
  ],
  poster: 'in',
  thumb: ['charge', 'trail', 'distance'],
  clips: {
    // In to the closest point (45 fm) in 2.25 s, and back out.
    in: { reset: true, phases: [{ dur: 2.25, fly: true, launch: { a: [LAUNCH, 0] }, rate: 1e-20 }] },
    out: { phases: [{ dur: 2, fly: true, rate: 1e-20 }] },
  },
};

const QUESTION =
  'In one of the classic nuclear physics experiments at the beginning of the 20th century, an alpha particle was accelerated toward a gold nucleus, and its path was substantially deflected by the Coulomb interaction. If the energy of the doubly charged alpha nucleus was 5.00 MeV, how close to the gold nucleus (79 protons) could it come before being deflected?';

const video: Explainer = {
  id: 'xq-p30-4-2',
  lessonId: '',
  exam: {
    lesson: 'p30-4-2',
    source: 'OpenStax, College Physics 2e, Problem for section 19.3, Electrical Potential Due to a Point Charge',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/19-3-electrical-potential-due-to-a-point-charge',
    question: QUESTION,
  },
  title: 'Exam Question: How Close Can an Alpha Particle Get to a Gold Nucleus?',
  thumbnailTitle: 'Alpha Meets Gold',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an alpha particle with 5.00 MeV of energy is fired at a gold nucleus with 79 protons, as in Rutherford’s gold foil experiment, and we find how close it gets before it is turned back. We change the energy to joules and set it equal to the electric potential energy, kQq/r. Then we fire the alpha particle at the nucleus to scale and watch it stop, and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Alpha Meets Gold', subtitle: 'The gold foil experiment, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about Rutherford\'s gold foil experiment: how close an alpha particle can get to a gold nucleus. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          answer: '$4.55 \\times 10^{-14}$ m',
          working: '$r = \\dfrac{kQq}{KE} = \\dfrac{(8.99 \\times 10^{9})(79 \\times 1.60 \\times 10^{-19})(2 \\times 1.60 \\times 10^{-19})}{8.00 \\times 10^{-13}} = 4.55 \\times 10^{-14}$ m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'In one of the classic nuclear physics experiments at the beginning of the twentieth century, an alpha particle was accelerated toward a gold nucleus, and its path was substantially deflected by the Coulomb interaction.' },
        { say: 'If the energy of the doubly charged alpha nucleus was 5.00 mega electronvolts, how close to the gold nucleus, with 79 protons, could it come before being deflected? If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [shot, { kind: 'text', id: 'plain', size: 'md', md: 'How close does the alpha particle get before it is **stopped**?' }],
      lines: [
        { say: 'Let us picture it, at the size of a nucleus. Here is a gold nucleus, with a charge of plus 79. An alpha particle, with a charge of plus two, is fired straight at it.', show: ['sim', 'sim.charge'] },
        { say: 'Both are positive, so they repel. The closer the alpha particle gets, the harder it is pushed back, until it stops and turns round.', show: 'sim.trail', play: 'sim.in', playDelay: 0.5 },
        { say: 'The question asks how close it gets at that turning point. Aiming straight at the nucleus gives the closest approach of all.', show: 'plain' },
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
          title: 'Energy and the closest approach',
          md: 'Two charges $Q$ and $q$ a distance $r$ apart have electric potential energy $U = \\dfrac{kQq}{r}$, with $k = 8.99 \\times 10^{9}$ N·m²/C². At the closest point the alpha particle has stopped, so **all** its kinetic energy has become potential energy. An alpha particle has charge $2e$, a nucleus with $Z$ protons $Ze$, and $1$ MeV $= 1.60 \\times 10^{-13}$ J.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'At $r = 1.0 \\times 10^{-13}$ m: $U = \\dfrac{(8.99 \\times 10^{9})(79e)(2e)}{1.0 \\times 10^{-13}} = 3.6 \\times 10^{-13}$ J $= 2.3$ MeV.' },
      ],
      lines: [
        { say: 'Here is what we need. Two charges a distance r apart have an electric potential energy of k Q q over r. It grows as they come closer.', show: 'def' },
        { say: 'As the alpha particle comes in, it slows down, and its kinetic energy turns into potential energy. At the closest point it has stopped, so all of its kinetic energy has become potential energy.' },
        { say: 'The alpha particle\'s charge is two e, the gold nucleus\'s is 79 e, and one mega electronvolt is 1.60 times ten to the minus thirteen joules. For example, ten to the minus thirteen metres from the nucleus, the potential energy is already 2.3 mega electronvolts.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the energy to **joules**', 'Set $KE = \\dfrac{kQq}{r}$ and rearrange for $r$', 'Put in the charges $79e$ and $2e$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, change the energy from mega electronvolts into joules.', show: 'plan.0' },
        { say: 'Second, set the kinetic energy equal to the potential energy, and rearrange for the distance.', show: 'plan.1' },
        { say: 'Third, put in the two charges and work it out.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Joules',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['KE = 5.00\\ \\text{MeV} = 5.00 \\times 10^{6} \\times 1.60 \\times 10^{-19}\\ \\text{J}', '= \\adj{8.00 \\times 10^{-13}\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. Mega means a million, and one electronvolt is 1.60 times ten to the minus nineteen joules.', show: 'm.0' },
        { say: 'So 5.00 mega electronvolts is 8.00 times ten to the minus thirteen joules.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['KE = \\dfrac{kQq}{r}', 'r = \\dfrac{kQq}{KE}'] }],
      lines: [
        { say: 'Step two. At the closest point, the kinetic energy equals k Q q over r.', show: 'm.0' },
        { say: 'Swap r and the kinetic energy: r equals k Q q over the kinetic energy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The numbers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['Q = 79e = 1.264 \\times 10^{-17}\\ \\text{C}, \\quad q = 2e = 3.20 \\times 10^{-19}\\ \\text{C}', 'r = \\dfrac{(8.99 \\times 10^{9})(1.264 \\times 10^{-17})(3.20 \\times 10^{-19})}{8.00 \\times 10^{-13}}', '= \\good{4.55 \\times 10^{-14}\\ \\text{m}}'],
        },
      ],
      lines: [
        { say: 'Step three. The gold nucleus has 79 protons, so its charge is 79 times 1.60 times ten to the minus nineteen: 1.264 times ten to the minus seventeen coulombs. The alpha particle, doubly charged, has 3.20 times ten to the minus nineteen.', show: 'm.0' },
        { say: 'Multiply k by the two charges, and divide by the energy.', show: 'm.1' },
        { say: 'The closest approach is 4.55 times ten to the minus fourteen metres. That is about six times the radius of the gold nucleus, so the alpha particle never touches it.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [shot, { kind: 'math', id: 'm', size: 'md', lines: ['4.55 \\times 10^{-14}\\ \\text{m} = 45\\ \\text{fm}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it. Here the distances are in femtometres, ten to the minus fifteen metres. The alpha particle starts with 5.00 mega electronvolts, and is moved step by step by the push of the nucleus.', show: ['sim', 'sim.charge', 'sim.trail', 'sim.distance'], play: 'sim.in', playDelay: 0.5 },
        { say: 'It stops 45 femtometres from the centre of the nucleus: 4.5 times ten to the minus fourteen metres. Then the push sends it straight back the way it came.', show: 'm.0', play: 'sim.out', playDelay: 1.5 },
        { say: 'Bouncing back like this is what amazed Rutherford. Only a tiny, heavy, positive nucleus could push that hard.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['Alpha charge $e$, not $2e$', '$2.27 \\times 10^{-14}$ m: half'],
            ['MeV left as **5.00 J**', '$7.3 \\times 10^{-27}$ m: far too small'],
            ['Used $\\dfrac{kQq}{r^2}$, a force', 'Not an energy: it cannot equal $KE$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'An alpha particle is doubly charged: two protons. Using one e halves the answer.' },
        { say: 'Putting in 5.00 as if it were joules gives a distance far smaller than a nucleus. Change mega electronvolts into joules first.' },
        { say: 'And k Q q over r squared is the force, not the energy. Only the potential energy, k Q q over r, can be set equal to the kinetic energy.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A proton with 2.00 MeV of kinetic energy is fired straight at a gold nucleus (79 protons). How close can it get?',
          choices: ['1.1 × 10⁻¹³ m', '5.7 × 10⁻¹⁴ m', '2.8 × 10⁻¹⁴ m', '9.1 × 10⁻²⁷ m'],
          answer: 1,
          working: '$r = \\dfrac{kQq}{KE} = \\dfrac{(8.99 \\times 10^{9})(79 \\times 1.60 \\times 10^{-19})(1.60 \\times 10^{-19})}{3.20 \\times 10^{-13}} = 5.7 \\times 10^{-14}$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A proton with 2.00 mega electronvolts of kinetic energy is fired straight at a gold nucleus. How close can it get? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The energy is 3.20 times ten to the minus thirteen joules, and a proton has a single charge, e. k Q q over the energy is 5.7 times ten to the minus fourteen metres. That is choice B. 1.1 times ten to the minus thirteen gave the proton two charges, and 9.1 times ten to the minus 27 left the energy in mega electronvolts.', show: 'q2.answer' },
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
          items: ['Electric potential energy: $U = \\dfrac{kQq}{r}$', 'At the closest point, all the $KE$ has become $U$', 'Closest approach: $r = \\dfrac{kQq}{KE}$', 'Alpha: $2e$; $1$ MeV $= 1.60 \\times 10^{-13}$ J'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Two charges have electric potential energy k Q q over r.', show: 'sum.0' },
        { say: 'At the closest point, the alpha particle has stopped, and all its kinetic energy has become potential energy.', show: 'sum.1' },
        { say: 'So the closest approach is k Q q over the kinetic energy.', show: 'sum.2' },
        { say: 'And an alpha particle has two charges, and one mega electronvolt is 1.60 times ten to the minus thirteen joules. For more on the gold foil experiment, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
