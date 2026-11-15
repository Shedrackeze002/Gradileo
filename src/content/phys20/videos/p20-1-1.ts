import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Lesson 1.1: scalars and vectors, position and displacement, and adding displacements along a
// line. The track's ruler gives positions, with the origin at zero and negative positions to its
// left; the path and the displacement arrow under the track are drawn by src/video/motion.ts from
// where the cart has been.

/** From the position +6 m to the position −3 m: a displacement of −9 m. */
const positions: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-6, 10],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'Right is positive, left is negative' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 6 }],
  poster: 'go',
  clips: { go: { phases: [run(3, { cart: -3 }), halt('cart')] } },
};

/** 12 m to the right and then 5 m back: 17 m travelled, a displacement of +7 m. */
const thereAndBack: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-2, 14],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'East is positive' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'B', x: 0, tone: 'adj' }],
  clips: {
    out: { phases: [run(3, { cart: 4 }), halt('cart')] },
    back: { phases: [run(1.25, { cart: -4 }), halt('cart')] },
  },
};

/** 8 m east, and then a second move that ends 4 m west of the start: the second move is −12 m. */
const missing: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-6, 10],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'East is positive' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 0, tone: 'opp' }],
  clips: {
    first: { phases: [run(2, { cart: 4 }), halt('cart')] },
    second: { phases: [run(3, { cart: -4 }), halt('cart')] },
  },
};

const video: Explainer = {
  id: 'p20-1-1',
  lessonId: 'p20-1-1',
  title: 'Scalars, Vectors and Displacement',
  thumbnail: 'sim',
  summary:
    'Some quantities need a direction and some do not. Watch a cart move along a ruler to see the difference between position, distance and displacement, why a displacement can be negative, and how displacements along a line add with their signs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Scalars, Vectors and Displacement', subtitle: 'Where, how far, and which way' }],
      lines: [
        { say: 'Walk ten metres forward, then ten metres back. You have walked twenty metres, and yet you are exactly where you started.', show: 'title' },
        { say: 'Both statements are true, because they answer different questions. One ignores direction, and the other depends on it.' },
      ],
    },
    {
      chapter: 'Scalars and vectors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'scalar', tone: 'definition', title: 'Scalar', md: 'A quantity with a **size only**: a distance of 20 m, a speed of 12 m/s, a time of 5 s, a mass of 60 kg.' },
        { kind: 'callout', id: 'vector', tone: 'definition', title: 'Vector', md: 'A quantity with a **size and a direction**: a displacement of 9 m [W], a velocity of 12 m/s [E], a force of 40 N [down].' },
      ],
      lines: [
        { say: 'A scalar is a quantity with a size only. Distance, speed, time and mass are scalars. A number and a unit say everything about them.', show: 'scalar' },
        { say: 'A vector has a size and a direction. Displacement, velocity, acceleration and force are vectors. A velocity of twelve metres per second east is not the same as twelve metres per second west.', show: 'vector' },
      ],
    },
    {
      chapter: 'Position and displacement',
      layout: 'center',
      main: [
        positions,
        { kind: 'math', id: 'delta', size: 'md', lines: ['\\Delta d = d_2 - d_1 = ({-3}) - ({+6}) = \\brand{{-9}\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'A position says where an object is, measured from a chosen origin. On this track the origin is the zero of the ruler. Positions to the right are positive, and positions to the left are negative.', show: 'sim' },
        { say: 'This cart starts at the position plus six metres. Watch where it goes.', show: 'sim.displacement', play: 'sim.go', playDelay: 2.6 },
        { say: 'It ended at the position minus three metres. Its displacement is its change in position: the final position minus the starting position. Minus three, minus six, is minus nine metres.', show: 'delta' },
        { say: 'The minus sign is the direction. The cart moved nine metres to the left. Always subtract the starting position from the final one, never the other way round.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'Distance and displacement',
      layout: 'center',
      main: [
        thereAndBack,
        { kind: 'math', id: 'sum', size: 'md', lines: ['\\text{Distance: } 12 + 5 = 17\\ \\text{m} \\qquad \\text{Displacement: } ({+12}) + ({-5}) = \\brand{{+7}\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Now a journey that turns round. Take east as positive. This cart rolls twelve metres east.', show: ['sim', 'sim.distance', 'sim.displacement'], play: 'sim.out', playDelay: 3.4 },
        { say: 'Then it rolls five metres back, to the west. Watch the purple arrow.', play: 'sim.back', playDelay: 1.6 },
        { say: 'The distance kept growing: twelve plus five is seventeen metres. But the displacement arrow shrank. Add the two displacements with their signs: plus twelve, plus minus five, is plus seven metres.', show: 'sum' },
        { say: 'That single vector, seven metres east, is called the resultant. It has the same effect as the two displacements together.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'A missing displacement',
      layout: 'center',
      main: [
        missing,
        { kind: 'math', id: 'find', size: 'md', lines: ['({+8}) + \\Delta d_2 = {-4} \\quad\\Rightarrow\\quad \\Delta d_2 = {-4} - 8 = \\brand{{-12}\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'The same sum works backwards. A robot moves eight metres east. After a second move, it is four metres west of where it started. What was the second move?', show: ['sim', 'sim.displacement'], play: 'sim.first', playDelay: 2.2 },
        { say: 'Eight, plus the second displacement, must give minus four. So the second displacement is minus four, minus eight: minus twelve metres.', show: 'find' },
        { say: 'Watch it happen.', play: 'sim.second', playDelay: 0.6 },
        { say: 'Twelve metres west. That makes sense: the robot had to travel back past its starting point.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A dog runs 90 m east and then 60 m west. What is its displacement?',
          choices: ['$30\\ \\text{m [E]}$', '$150\\ \\text{m [E]}$', '$30\\ \\text{m [W]}$', '$60\\ \\text{m [W]}$'],
          answer: 0,
          working: 'Take east as positive: $({+90}) + ({-60}) = {+30}\\ \\text{m}$, which is 30 m [E]. The distance travelled is $90 + 60 = 150\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A dog runs ninety metres east, and then sixty metres west. What is its displacement? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Take east as positive. Plus ninety, plus minus sixty, is plus thirty. So the displacement is thirty metres east. That is choice A. A hundred and fifty metres is the distance the dog travelled.', show: 'q.answer' },
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
            'A **scalar** has a size only; a **vector** has a size and a direction',
            'Displacement is the change in position: $\\Delta d = d_2 - d_1$',
            'Along a line, the **sign** of a vector is its direction',
            'Add vectors along a line **with their signs** to find the resultant',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A scalar has a size only. A vector has a size and a direction.', show: 'sum.0' },
        { say: 'Displacement is the change in position: the final position minus the starting position.', show: 'sum.1' },
        { say: 'Along a line, choose a positive direction, and the sign of a vector becomes its direction.', show: 'sum.2' },
        { say: 'And add vectors along a line with their signs. The answer is the resultant.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
