import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 2.5, part 2: air resistance grows with speed, so a skydiver speeds up less and less until
// the air resistance equals the weight (terminal velocity); a parachute; and a hammer and a
// feather dropped on Earth and on the Moon. Each fall is worked out from its forces
// (src/video/motion.ts): the air resistance drawn is as large as the body is fast.

const G = 9.8;
const weight = (on: string, n: number, hidden = false): MotionForce => ({ on, name: 'Weight', n, tone: 'hyp', ...(hidden ? { hidden } : {}) });
const air = (on: string, drag: number, hidden = false): MotionForce => ({ on, name: 'Air resistance', n: 0, drag, tone: 'bad', ...(hidden ? { hidden } : {}) });

// A 70 kg skydiver: 686 N of weight, and 13.72 N of air resistance for each metre per second, so
// the terminal velocity is 50 m/s. The open parachute gives four times the air resistance: 12.5 m/s.
// A fall closes on its terminal velocity without ever quite reaching it, so the clips run until the
// two forces are the same to the nearest newton (39 s for the skydiver, 11 s under the parachute).
const W = 70 * G;
const FREE = W / 50;
const CHUTE = W / 12.5;

/** From the jump to terminal velocity, in three clips: the first as it happens, then twice as fast. */
const jump: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 2400],
  height: 440,
  lanes: [{ label: 'A skydiver of mass 70 kg' }],
  bodies: [{ id: 'diver', shape: 'block', mass: 70, x: 0, width: 800, tone: 'adj' }],
  graph: { of: ['diver'], seconds: 40, max: 60 },
  forceScale: 0.1,
  velocityScale: 1.3,
  poster: 'faster',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [weight('diver', W)] }] },
    jump: { phases: [{ dur: 3, forces: [weight('diver', W), air('diver', FREE)] }] },
    faster: { phases: [{ dur: 24, slow: 0.5, note: 'Twice as fast', forces: [weight('diver', W), air('diver', FREE)] }] },
    terminal: { phases: [{ dur: 12, slow: 0.5, note: 'Twice as fast', forces: [weight('diver', W), air('diver', FREE)] }] },
  },
};

/** Already at 50 m/s: two seconds at terminal velocity, then the parachute opens and the fall settles. */
const chute: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 320],
  height: 500,
  lanes: [{ label: 'The parachute opens' }],
  bodies: [{ id: 'diver', shape: 'block', mass: 70, x: 0, v: 50, width: 400, tone: 'adj' }],
  graph: { of: ['diver'], seconds: 14, max: 60 },
  forceScale: 0.045,
  velocityScale: 1.3,
  clips: {
    fall: { phases: [{ dur: 2, forces: [weight('diver', W), air('diver', FREE)] }] },
    open: { phases: [{ dur: 5, forces: [weight('diver', W), air('diver', CHUTE)] }] },
    settle: { phases: [{ dur: 6, forces: [weight('diver', W), air('diver', CHUTE)] }] },
  },
};

/** A 1 kg hammer and a 5 g feather: in air the feather drifts down at 1 m/s; on the Moon they fall together. */
const drop: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: true,
  span: [0, 5],
  height: 470,
  lanes: [{ label: 'A hammer' }, { label: 'A feather' }],
  bodies: [
    { id: 'hammer', shape: 'block', mass: 1, label: 'hammer', x: 0, width: 1.6, lane: 0, tone: 'adj' },
    { id: 'feather', shape: 'ball', mass: 0.005, label: 'feather', x: 0, width: 1.6, lane: 1, tone: 'opp' },
  ],
  velocityScale: 9,
  clips: {
    earth: { phases: [{ dur: 1, note: 'On Earth, in air', forces: [weight('hammer', G, true), weight('feather', 0.005 * G, true), air('feather', 0.005 * G, true)] }] },
    moon: { reset: true, phases: [{ dur: 2.45, note: 'On the Moon: no air', forces: [weight('hammer', 1.6, true), weight('feather', 0.005 * 1.6, true)] }] },
  },
};

const video: Explainer = {
  id: 'p10-2-5-b',
  lessonId: 'p10-2-5',
  title: 'Friction and Air Resistance, Part 2: Air Resistance',
  thumbnailTitle: 'Air Resistance',
  thumbnail: 'sim',
  summary:
    'Air resistance grows as an object moves faster. Follow a skydiver from the jump to terminal velocity with the forces and the velocity graph drawn as they fall, see what a parachute does, and watch a hammer and a feather dropped on Earth and on the Moon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Air Resistance', subtitle: 'Why a skydiver stops speeding up' }],
      lines: [
        { say: 'A skydiver steps out of a plane, and starts to fall. Yet the skydiver does not keep speeding up all the way to the ground.', show: 'title' },
        { say: 'In this lesson, you will see the force that stops the speed from growing, and what a parachute does to it.' },
      ],
    },
    {
      chapter: 'A skydiver’s fall',
      layout: 'center',
      main: [
        jump,
        { kind: 'text', id: 'rule', size: 'md', md: '**Air resistance** acts against the motion, and **grows** with **speed**.' },
        { kind: 'text', id: 'def', size: 'md', md: 'At **terminal velocity**, **air resistance equals weight**.' },
      ],
      lines: [
        { say: 'Here is a skydiver with a mass of seventy kilograms. On Earth, g is nine point eight newtons per kilogram, so the weight is six hundred and eighty-six newtons.', show: ['sim', 'sim.clock'], play: 'sim.ready', playDelay: 6 },
        { say: 'The air pushes back on anything that moves through it. This force is called air resistance. It acts against the motion, and it grows as the object moves faster.', show: 'rule' },
        { say: 'Just after the jump, the skydiver is slow, so the air resistance is small. The weight is much larger, and the skydiver speeds up quickly.', show: ['sim.velocity', 'sim.net', 'sim.graph'], play: 'sim.jump', playDelay: 0.6 },
        { say: 'As the speed grows, the air resistance grows with it, and the net force shrinks. The skydiver is still speeding up, but more and more gently. On the graph, the line starts to level off.', play: 'sim.faster', playDelay: 0.4 },
        { say: 'Now the air resistance is as large as the weight. The two forces are balanced, and the net force is zero. So by the first law, the velocity stops changing. The skydiver falls at a steady fifty metres per second.', play: 'sim.terminal', playDelay: 0.5 },
        { say: 'This steady velocity is called the terminal velocity. At terminal velocity, the air resistance equals the weight. For this skydiver, that is six hundred and eighty-six newtons, upwards.', show: 'def', hide: 'rule', focus: 'sim.diver' },
      ],
    },
    {
      chapter: 'The parachute',
      layout: 'center',
      main: [chute, { kind: 'text', id: 'big', size: 'md', md: 'A larger **area** facing the air gives more air resistance.' }],
      lines: [
        { say: 'Air resistance is also larger for a larger area facing the air. Here, the skydiver is falling at terminal velocity, and is about to open a parachute.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.net', 'sim.graph'], play: 'sim.fall', playDelay: 7 },
        { say: 'The parachute opens. Its huge area makes the air resistance much larger than the weight. The net force now points upwards, so the skydiver slows down.', show: 'big', play: 'sim.open', playDelay: 0.3 },
        { say: 'As the skydiver slows, the air resistance shrinks again, until it equals the weight once more. The skydiver has reached a new, lower terminal velocity, slow enough to land safely.', play: 'sim.settle', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Do heavy things fall faster?',
      layout: 'center',
      main: [drop, { kind: 'text', id: 'noair', size: 'md', md: 'With **no air**, all objects fall **together**.' }],
      lines: [
        { say: 'Do heavy things always fall faster? On Earth, drop a hammer and a feather at the same moment.', show: ['sim', 'sim.velocity', 'sim.clock'], play: 'sim.earth', playDelay: 5.6 },
        { say: 'The hammer wins easily. But that is only because air resistance is large, compared with the tiny weight of the feather.', focus: 'sim.feather' },
        { say: 'Now try it on the Moon, where there is no air at all.', play: 'sim.moon', playDelay: 2.4 },
        { say: 'They fall side by side, and land at the same moment. Astronauts really did this experiment on the Moon. With no air, all objects fall together.', show: 'noair', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On Earth, g = 9.8 N/kg. A 60 kg skydiver is falling, and at one moment the air resistance is 288 N. What is the skydiver’s acceleration at that moment?',
          choices: ['$9.8\\ \\text{m/s}^2$', '$4.8\\ \\text{m/s}^2$', '$14.6\\ \\text{m/s}^2$', '$5\\ \\text{m/s}^2$'],
          answer: 3,
          working: 'Weight $= 60 \\times 9.8 = 588\\ \\text{N}$. Net force $= 588 - 288 = 300\\ \\text{N}$ downwards. $a = 300 \\div 60 = 5\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. On Earth, g is nine point eight newtons per kilogram. A sixty kilogram skydiver is falling, and at one moment the air resistance is two hundred and eighty-eight newtons. What is the acceleration of the skydiver at that moment? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The weight is sixty times nine point eight, which is five hundred and eighty-eight newtons. Take away the air resistance, and the net force is three hundred newtons downwards. Three hundred divided by sixty is five metres per second squared. That is choice D.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            '**Air resistance** acts against motion through the air',
            'It grows with **speed** and with **area**',
            '**Terminal velocity**: air resistance equals weight, so the velocity is steady',
            'A parachute gives a much lower terminal velocity',
            'With no air, all objects fall together',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Air resistance acts against motion through the air, and it grows with speed and with area.', show: ['end.0', 'end.1'] },
        { say: 'A falling object speeds up until the air resistance equals its weight. Then it falls at its terminal velocity.', show: 'end.2' },
        { say: 'A parachute makes the air resistance larger, so the skydiver slows to a much lower terminal velocity.', show: 'end.3' },
        { say: 'And with no air, all objects fall together.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
