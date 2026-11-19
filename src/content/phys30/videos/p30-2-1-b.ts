import type { ChargeBody, ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.1, second half: the three ways to charge an object. In every picture each mark stands
// for 2 nC, the + marks never move, and the charge written by a body is counted from the
// electrons on it (src/video/charges.ts). The electrons of the metal spheres lean away from the
// negative rod by themselves, which is what makes charging by induction work.

const BENCH: Pick<ChargesEl, 'kind' | 'id' | 'unit' | 'mark'> = { kind: 'charges', id: 'bench', unit: 'nC', mark: 2 };

/** An ebonite rod rubbed with fur: three marks of electrons go from the fur to the rod. */
const friction: ChargesEl = {
  ...BENCH,
  view: [-4.2, 4.2, -2.1, 1.5],
  height: 400,
  bodies: [
    { id: 'rod', shape: 'rod', charge: 0, x: -0.6, y: 0.45, radius: 2.2, thick: 0.34, pairs: 6, label: 'Ebonite rod' },
    { id: 'fur', shape: 'cloth', charge: 0, x: -1.6, y: -0.62, radius: 1.15, thick: 0.62, pairs: 6, label: 'Fur', labelAt: 'below', tone: 'opp' },
  ],
  poster: 'rub',
  clips: {
    rub: {
      phases: [
        { dur: 0.9, to: { fur: [0.9, -0.62] } },
        { dur: 0.9, to: { fur: [-1.2, -0.62] } },
        { dur: 2.6, to: { fur: [0.5, -0.62] }, electrons: [{ from: 'fur', to: 'rod', n: 3 }] },
        { dur: 1.2, to: { fur: [2.5, -0.75] } },
      ],
    },
  },
};

/** The negative rod touches a neutral metal sphere, and two marks of electrons pass to the sphere. */
const contact: ChargesEl = {
  ...BENCH,
  view: [-5.3, 3.5, -2.2, 1.7],
  height: 420,
  bodies: [
    { id: 'ball', shape: 'sphere', charge: 0, x: 1.9, y: 0, radius: 1.05, pairs: 6, label: 'Metal sphere' },
    { id: 'rod', shape: 'rod', charge: -6, x: -3.6, y: 0, radius: 1.5, thick: 0.3, pairs: 5, label: 'Rod' },
  ],
  clips: {
    touch: {
      phases: [
        { dur: 1.8, to: { rod: -0.65 } },
        { dur: 2.4, electrons: [{ from: 'rod', to: 'ball', n: 2 }] },
        { dur: 1.6, to: { rod: -3.6 } },
      ],
    },
  },
};

const twin = (id: string, x: number, charge: number): ChargeBody => ({ id, shape: 'sphere', charge, x, y: 0, radius: 1, pairs: 8 });
/** Two identical spheres, +12 nC and −4 nC: when they touch, electrons flow until each has +4 nC. */
const sharing: ChargesEl = {
  ...BENCH,
  view: [-4.6, 4.6, -2.1, 1.7],
  height: 400,
  bodies: [twin('a', -2.3, 12), twin('b', 2.3, -4)],
  clips: {
    touch: {
      phases: [
        { dur: 1.6, to: { a: -1, b: 1 } },
        { dur: 2.8, electrons: [{ from: 'b', to: 'a', n: 4 }] },
        { dur: 1.6, to: { a: -2.3, b: 2.3 } },
      ],
    },
  },
};

const NEAR = -1.65;
const FAR = -3.8;
/** Charging by induction: a negative rod near a sphere that is grounded, the ground removed, and then the rod. */
const induction = (clips: ChargesEl['clips']): ChargesEl => ({
  ...BENCH,
  view: [-5.6, 3.6, -2.15, 1.75],
  height: 420,
  bodies: [
    { id: 'ball', shape: 'sphere', charge: 0, x: 1.2, y: 0.05, radius: 1.05, pairs: 7, label: 'Metal sphere' },
    { id: 'rod', shape: 'rod', charge: -8, x: FAR, y: 0.05, radius: 1.5, thick: 0.3, pairs: 5, label: 'Rod' },
  ],
  clips,
});

const inSteps = induction({
  near: { phases: [{ dur: 2, to: { rod: NEAR }, note: 'Step 1: hold the rod near' }] },
  ground: { phases: [{ dur: 0.8, ground: { ball: true }, note: 'Step 2: ground the sphere' }, { dur: 2.6, electrons: [{ from: 'ball', to: 'ground', n: 3 }], note: 'Step 2: ground the sphere' }] },
  cut: { phases: [{ dur: 1.2, ground: { ball: false }, note: 'Step 3: remove the ground' }] },
  away: { phases: [{ dur: 2.2, to: { rod: FAR }, note: 'Step 4: remove the rod' }] },
});

const wrongOrder = induction({
  start: { phases: [{ dur: 1.6, to: { rod: NEAR } }, { dur: 0.7, ground: { ball: true } }, { dur: 2, electrons: [{ from: 'ball', to: 'ground', n: 3 }] }] },
  wrong: { phases: [{ dur: 2.6, to: { rod: FAR }, electrons: [{ from: 'ground', to: 'ball', n: 3 }], note: 'The rod is removed first' }] },
});

const video: Explainer = {
  id: 'p30-2-1-b',
  lessonId: 'p30-2-1',
  title: 'Charging Objects',
  thumbnail: 'bench',
  summary:
    'There are three ways to charge an object, and in every one only electrons move. Watch fur give electrons to an ebonite rod, a rod pass them to a metal sphere, two spheres share their charge equally, and a sphere charged by induction without being touched.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Charging Objects', subtitle: 'Friction, contact and induction' }],
      lines: [
        { say: 'An object becomes charged when electrons move onto it, or off it. There are three ways to make that happen: friction, contact and induction.', show: 'title' },
        { say: 'In every one of them, the only thing that moves is electrons.' },
      ],
    },
    {
      chapter: 'Charging by friction',
      layout: 'center',
      main: [friction],
      lines: [
        { say: 'First, friction. Here is an ebonite rod and a piece of fur. Both are neutral: each has as many electrons as positive charges.', show: ['bench', 'bench.charge'] },
        { say: 'Ebonite holds electrons more strongly than fur does. So when the two are rubbed together, electrons move from the fur to the rod.', play: 'bench.rub', playDelay: 3.5 },
        { say: 'The rod has gained electrons, so it is negative. The fur has lost them, so it is positive by exactly the same amount.', focus: 'bench.rod' },
      ],
    },
    {
      chapter: 'Charging by contact',
      layout: 'center',
      main: [contact, { kind: 'text', id: 'same', md: 'Contact gives the **same sign** as the charged object.' }],
      lines: [
        { say: 'Second, contact. This metal sphere is neutral, and it stands on an insulating stand. Touch it with the negative rod.', show: ['bench', 'bench.charge'], play: 'bench.touch', playDelay: 5 },
        { say: 'Some of the extra electrons on the rod pass to the sphere, and spread over it. The sphere is now negative too.', focus: 'bench.ball' },
        { say: 'A positive rod would do the opposite, and draw electrons off the sphere. Either way, the sphere ends with the same sign as the rod.', show: 'same' },
      ],
    },
    {
      chapter: 'Sharing a charge',
      layout: 'center',
      main: [sharing, { kind: 'math', id: 'half', size: 'md', lines: ['\\dfrac{(+12) + (-4)}{2} = \\dfrac{8}{2} = \\bad{+4\\ \\text{nC each}}'] }],
      lines: [
        { say: 'Two identical metal spheres that touch share their total charge equally. One of these has positive twelve nanocoulombs, and the other has negative four.', show: ['bench', 'bench.charge'] },
        { say: 'When they touch, electrons flow from the negative sphere to the positive one, until the two are the same.', play: 'bench.touch' },
        { say: 'Charge is conserved, so the total is still twelve plus negative four, which is eight. Each sphere takes half of it: positive four nanocoulombs.', show: 'half' },
      ],
    },
    {
      chapter: 'Charging by induction',
      layout: 'center',
      main: [inSteps],
      lines: [
        { say: 'Third, induction. This charges a conductor without touching it. Step one: hold the negative rod near the neutral sphere. The rod repels electrons to the far side.', show: ['bench', 'bench.charge'], play: 'bench.near', playDelay: 6.5 },
        { say: 'Step two: connect the sphere to the ground. Some electrons escape down the wire, pushed away by the rod.', play: 'bench.ground', playDelay: 1.5 },
        { say: 'Step three: remove the ground connection. The sphere is now short of electrons, and they cannot come back.', play: 'bench.cut', playDelay: 1.5 },
        { say: 'Step four: take the rod away. The sphere is left positive, and its charge spreads out.', play: 'bench.away', playDelay: 1.5 },
        { say: 'So induction gives the sphere the opposite sign to the rod. And the rod has lost none of its own charge.', focus: 'bench.ball' },
      ],
    },
    {
      chapter: 'The order matters',
      layout: 'center',
      main: [wrongOrder, { kind: 'callout', id: 'order', tone: 'mistake', title: 'Remove the ground first', md: 'Then take the rod away. In the other order, the sphere ends up **neutral**.' }],
      lines: [
        { say: 'In induction, the order of the last two steps matters. Here the sphere is grounded again, and electrons have left it.', show: ['bench', 'bench.charge'], play: 'bench.start' },
        { say: 'This time, take the rod away while the wire is still connected. The electrons simply flow back, and the sphere ends up neutral.', play: 'bench.wrong', playDelay: 3.5 },
        { say: 'So always remove the ground connection first, and then the rod.', show: 'order' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two identical metal spheres on insulating stands carry charges of −10 nC and +2 nC. They are touched together and moved apart. What is the charge of each sphere?',
          choices: ['$-4\\ \\text{nC}$', '$-6\\ \\text{nC}$', '$-8\\ \\text{nC}$', '$+4\\ \\text{nC}$'],
          answer: 0,
          working: 'Charge is conserved: the total is $(-10) + 2 = -8$ nC. Identical spheres share it equally, so each has $-4$ nC.',
        },
      ],
      lines: [
        { say: 'Your turn. Two identical metal spheres carry charges of negative ten nanocoulombs and positive two nanocoulombs. They are touched together and moved apart. What is the charge of each sphere? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The total charge is negative ten plus two, which is negative eight. The spheres are identical, so each takes half: negative four nanocoulombs. That is choice A.', show: 'q.answer' },
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
          items: [
            '**Friction**: electrons move between two rubbed materials, so one is positive and the other negative',
            '**Contact**: the object gets the **same sign** as the charged object',
            'Identical conductors that touch **share** their total charge equally',
            '**Induction**: no touching, and the **opposite sign** to the charged object',
            'In induction, remove the **ground first**, and then the rod',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Friction moves electrons between two materials, so one becomes positive and the other negative.', show: 'sum.0' },
        { say: 'Contact gives an object the same sign as the charged object that touches it.', show: 'sum.1' },
        { say: 'Identical conductors that touch share their total charge equally.', show: 'sum.2' },
        { say: 'Induction charges a conductor without touching it, and gives it the opposite sign.', show: 'sum.3' },
        { say: 'And in induction, remove the ground connection first, and then the rod.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
