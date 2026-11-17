import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.5, part 1: kinetic energy, gravitational potential energy and the work-energy theorem.
// Every energy bar is measured from the motion (src/video/motion.ts), and the numbers are the
// lesson's: a 1200 kg car at 20 m/s has 240 kJ; a net force of 30 N through 4 m takes a 5 kg cart
// from 2 m/s to 7.21 m/s; a 1500 kg car at 20 m/s stops in 40 m under 7500 N; and a 4 kg flowerpot
// 6 m up has 235.4 J.

const G = 9.81;

/** The lesson's car: a net force of 4800 N on 1200 kg is 4 m/s², so it reaches 20 m/s after 5 s and 50 m. */
const car: MotionEl = {
  kind: 'motion',
  id: 'car',
  span: [0, 62],
  bodies: [{ id: 'car', shape: 'cart', mass: 1200, label: '1200 kg', x: 4, width: 7, tone: 'adj' }],
  energy: { max: 270000, bars: ['work', 'kinetic'] },
  forceScale: 0.03,
  velocityScale: 5,
  height: 360,
  poster: 'go',
  clips: {
    go: { phases: [{ dur: 5, forces: [{ on: 'car', name: 'Net force', n: 4800, tone: 'theta' }] }, { dur: 0.001 }] },
  },
};

/** The lesson's cart: 5 kg moving at 2 m/s, then a net force of 30 N through 4 m. It takes 0.8685 s. */
const NET: MotionForce = { on: 'cart', name: 'Net force', n: 30, tone: 'theta' };
const cart: MotionEl = {
  kind: 'motion',
  id: 'cart',
  span: [0, 8],
  bodies: [{ id: 'cart', shape: 'cart', mass: 5, label: '5 kg', x: 1.5, v: 2, tone: 'adj' }],
  energy: { max: 150, bars: ['work', 'kinetic'], names: { work: 'Net work' } },
  forceScale: 4,
  velocityScale: 16,
  height: 440,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [NET] }] },
    go: { phases: [{ dur: (-2 + Math.sqrt(4 + 48)) / 6, slow: 4, forces: [NET], note: 'Slow motion' }] },
  },
};

/** Two cars of 1500 kg with the same brakes, 7500 N: from 10 m/s one stops in 10 m, and from 20 m/s the other needs 40 m. */
const brake = (on: string): MotionForce => ({ on, name: 'Brakes', n: -7500, resist: true, tone: 'bad' });
const braking: MotionEl = {
  kind: 'motion',
  id: 'brake',
  span: [0, 52],
  lanes: [{ label: 'At 10 m/s' }, { label: 'At 20 m/s' }],
  bodies: [
    { id: 'slow', shape: 'cart', mass: 1500, label: '', x: 5, v: 10, width: 6, lane: 0, tone: 'adj' },
    { id: 'fast', shape: 'cart', mass: 1500, label: '', x: 5, v: 20, width: 6, lane: 1, tone: 'opp' },
  ],
  energy: { max: 330000, of: ['slow', 'fast'], bars: ['kinetic'], labels: { slow: 'At 10 m/s', fast: 'At 20 m/s' } },
  forceScale: 0.012,
  velocityScale: 4,
  height: 520,
  clips: {
    stop: { phases: [{ dur: 4, slow: 1.5, forces: [brake('slow'), brake('fast')] }] },
  },
};

/** The lesson's flowerpot: 4 kg lifted 6 m at a steady 1.5 m/s. The work of the lift is stored as height. */
const WEIGHT: MotionForce = { on: 'pot', name: 'Weight', n: -4 * G, tone: 'hyp' };
const LIFT: MotionForce = { on: 'pot', name: 'Lift', n: 4 * G, tone: 'opp' };
const lift: MotionEl = {
  kind: 'motion',
  id: 'lift',
  vertical: 'up',
  span: [0, 6.6],
  bodies: [{ id: 'pot', shape: 'block', mass: 4, label: '4 kg', x: 0, width: 1.5, tone: 'adj' }],
  energy: { max: 260, bars: ['work', 'potential'], g: G },
  forceScale: 1.3,
  velocityScale: 24,
  height: 560,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [LIFT, WEIGHT] }] },
    up: { phases: [{ dur: 4, set: { pot: 1.5 }, forces: [LIFT, WEIGHT] }, { dur: 0.001, set: { pot: 0 }, forces: [LIFT, WEIGHT] }] },
  },
};

const video: Explainer = {
  id: 'p20-3-5',
  lessonId: 'p20-3-5',
  title: 'Kinetic and Potential Energy',
  thumbnail: 'brake',
  summary:
    'Work done on an object does not vanish: it becomes energy. See work turn into kinetic energy, use the work-energy theorem to find a speed, find out why twice the speed needs four times the braking distance, and store work as gravitational potential energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Kinetic and Potential Energy', subtitle: 'Where the work goes' }],
      lines: [
        { say: 'Work done on an object does not vanish. Push a trolley, and it ends up moving. Lift a box, and it ends up higher.', show: 'title' },
        { say: 'In each case, the work has become energy: the ability to do work in turn. This lesson gives a formula to two kinds of energy, and links them to work.' },
      ],
    },
    {
      chapter: 'Kinetic energy',
      layout: 'center',
      main: [car, { kind: 'math', id: 'k', size: 'md', lines: ['\\good{E_k = \\tfrac{1}{2}mv^2}', 'E_k = \\tfrac{1}{2} \\times 1200 \\times 20^2 = \\good{240\\,000\\ \\text{J}}'] }],
      lines: [
        { say: 'A net force speeds up a car of twelve hundred kilograms, from rest. Watch the two bars: the work done on the car, and the energy of its motion.', show: ['car', 'car.velocity', 'car.energy'], play: 'car.go', playDelay: 4 },
        { say: 'The bars stay equal all the way. The work has become kinetic energy, the energy an object has because it is moving.' },
        { say: 'Kinetic energy is one half, times the mass, times the speed squared, with the mass in kilograms and the speed in metres per second.', show: 'k.0' },
        { say: 'The car is now moving at twenty metres per second. One half, times twelve hundred, times twenty squared, is 240,000 joules. That is 240 kilojoules.', show: 'k.1' },
      ],
    },
    {
      chapter: 'The work-energy theorem',
      layout: 'center',
      main: [
        cart,
        { kind: 'math', id: 't', size: 'md', lines: ['\\thc{W_{\\text{net}} = \\Delta E_k} \\qquad W_{\\text{net}} = 30 \\times 4 = 120\\ \\text{J}', 'E_k = 10 + 120 = 130\\ \\text{J} \\qquad v = \\sqrt{\\dfrac{2 \\times 130}{5}} = \\good{7.21\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'That link is exact, and it has a name. The work-energy theorem says that the net work done on an object equals the change in its kinetic energy.', show: ['cart', 'cart.velocity', 'cart.energy'] },
        { say: 'This cart of five kilograms is already moving at two metres per second, so it starts with ten joules of kinetic energy. Now a net force of thirty newtons acts on it, through four metres.', play: 'cart.ready' },
        { say: 'The net work is thirty times four: 120 joules. Watch the kinetic energy rise by exactly that much.', show: 't.0', play: 'cart.go' },
        { say: 'So the cart ends with 130 joules. Rearrange the formula for the speed: the square root of two times 130, over five, is 7.21 metres per second.', show: 't.1' },
        { say: 'Positive net work speeds an object up. Negative net work slows it down.' },
      ],
    },
    {
      chapter: 'Twice the speed, four times the energy',
      layout: 'center',
      main: [braking, { kind: 'math', id: 'b', size: 'md', lines: ['E_k = \\tfrac{1}{2} \\times 1500 \\times 20^2 = 300\\,000\\ \\text{J} \\qquad F = \\dfrac{300\\,000}{40} = \\bad{7500\\ \\text{N}}'] }],
      lines: [
        { say: 'Here are two cars of fifteen hundred kilograms. One moves at ten metres per second, and the other at twenty. Look at their kinetic energy before they brake.', show: ['brake', 'brake.velocity', 'brake.energy'] },
        { say: 'The speed is squared in the formula. So the car at twice the speed has four times the kinetic energy: 300 kilojoules, against 75.' },
        { say: 'Now both cars brake, with the same force. The brakes do negative work, and take the kinetic energy away.', show: 'brake.distance', play: 'brake.stop' },
        { say: 'The faster car has four times the energy to lose, so it needs four times the distance: forty metres, against ten.' },
        { say: 'You can find the braking force from the energy. The car loses 300,000 joules in forty metres, and work is force times distance. So the force is 7,500 newtons.', show: 'b' },
      ],
    },
    {
      chapter: 'Gravitational potential energy',
      layout: 'split',
      leftWidth: 560,
      left: [lift],
      right: [{ kind: 'math', id: 'g', size: 'md', lines: ['\\hyp{E_g = mgh}', 'E_g = 4 \\times 9.81 \\times 6', 'E_g = \\hyp{235.4\\ \\text{J}}'] }],
      lines: [
        { say: 'Work can be stored, too. A flowerpot of four kilograms is lifted at a steady speed. The lifting force equals its weight, 39.2 newtons.', show: ['lift', 'lift.energy'], play: 'lift.ready' },
        { say: 'Watch the work of the lift. The pot is not speeding up, so the work does not become kinetic energy. It is stored as height.', play: 'lift.up' },
        { say: 'This is gravitational potential energy: the mass, times g, times the height. For the pot, six metres up: four, times 9.81, times six, is 235.4 joules.', show: ['g.0', 'g.1', 'g.2'] },
        { say: 'The height is measured from a level that you choose, usually the ground or the lowest point of the motion. Let the pot fall, and gravity gives all of that energy back as motion.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 2 kg ball is moving at 3 m/s. A net force then does 16 J of work on it, in the direction of its motion. What is its speed afterwards?',
          choices: ['$5\\ \\text{m/s}$', '$4\\ \\text{m/s}$', '$7\\ \\text{m/s}$', '$11\\ \\text{m/s}$'],
          answer: 0,
          working: 'At the start, $E_k = \\tfrac{1}{2} \\times 2 \\times 3^2 = 9\\ \\text{J}$. The net work adds 16 J: $E_k = 25\\ \\text{J}$. So $v = \\sqrt{\\dfrac{2 \\times 25}{2}} = 5\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two kilogram ball is moving at three metres per second. A net force then does sixteen joules of work on it, in the direction of its motion. What is its speed afterwards? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The ball starts with one half, times two, times three squared: nine joules. The net work adds sixteen, which makes twenty-five joules. The square root of two times twenty-five, over two, is five metres per second. That is choice A.', show: 'q.answer' },
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
            'Kinetic energy: $E_k = \\tfrac{1}{2}mv^2$. Twice the speed gives **four times** the kinetic energy',
            'Work-energy theorem: $W_{\\text{net}} = \\Delta E_k$',
            'Positive net work speeds an object up, and negative net work slows it down',
            'Gravitational potential energy: $E_g = mgh$, with $h$ measured from a level that you choose',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Kinetic energy is one half m v squared. Twice the speed gives four times the kinetic energy.', show: 'sum.0' },
        { say: 'The work-energy theorem says that the net work equals the change in kinetic energy.', show: 'sum.1' },
        { say: 'Positive net work speeds an object up, and negative net work slows it down.', show: 'sum.2' },
        { say: 'And gravitational potential energy is m g h, with the height measured from a level that you choose.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
