import type { Explainer, RampEl } from '@/video/script.ts';

// Lesson 2.3: static and kinetic friction. The friction arrow is worked out, not drawn by hand
// (src/video/ramp.ts): on the lesson's 16 kg suitcase it matches a push of 30 N and then 60 N,
// lets go when the push passes 0.5 × 157 = 78.5 N, and drops to the kinetic value once the
// suitcase slides. The lesson's 12 kg box, pushed with 50 N against a kinetic friction of
// 23.5 N, speeds up at 2.20 m/s², and two sleds of different mass stop in the same 9.2 m.

/** The lesson's suitcase: 16 kg, with coefficients of 0.5 (static) and 0.3 (kinetic). */
const suitcase: RampEl = {
  kind: 'ramp',
  id: 'floor',
  angle: 0,
  length: 10,
  friction: [0.5, 0.3],
  bodies: [{ id: 'case', mass: 16, label: '16 kg', x: 2.6, width: 1.3, tone: 'theta' }],
  label: 'A push that grows',
  height: 400,
  pad: [150, 150],
  forceScale: 1,
  velocityScale: 20,
  poster: 'p90',
  clips: {
    p30: { phases: [{ dur: 2.4, forces: [{ on: 'case', name: 'Push', n: 30 }] }] },
    p60: { phases: [{ dur: 2.4, forces: [{ on: 'case', name: 'Push', n: 60 }] }] },
    p90: { phases: [{ dur: 1.7, forces: [{ on: 'case', name: 'Push', n: 90 }] }] },
  },
};

/** The lesson's box: 12 kg pushed with 50 N, with a coefficient of kinetic friction of 0.2. */
const box: RampEl = {
  kind: 'ramp',
  id: 'floor',
  angle: 0,
  length: 10,
  friction: [0.3, 0.2],
  bodies: [{ id: 'box', mass: 12, label: '12 kg', x: 2.4, width: 1.2, tone: 'theta' }],
  label: 'A box that slides',
  height: 360,
  pad: [150, 120],
  forceScale: 1.6,
  velocityScale: 20,
  clips: { go: { phases: [{ dur: 2.2, forces: [{ on: 'box', name: 'Push', n: 50 }] }] } },
};

/** A sled that slides onto level snow at 6 m/s with a coefficient of 0.2: it stops after 9.2 m, whatever its mass. */
const sled = (id: string, mass: number, label: string): RampEl => ({
  kind: 'ramp',
  id,
  angle: 0,
  length: 12,
  friction: [0.2, 0.2],
  bodies: [{ id: 'sled', mass, label: `${mass} kg`, x: 1.2, v: 6, width: 1.2, tone: mass > 10 ? 'opp' : 'adj' }],
  label,
  height: 225,
  pad: [110, 44],
  forceScale: 2,
  velocityScale: 16,
  strobe: 0.5,
  clips: { go: { phases: [{ dur: 3.4 }] } },
});

const video: Explainer = {
  id: 'p20-2-3',
  lessonId: 'p20-2-3',
  title: 'Static and Kinetic Friction',
  thumbnail: 'floor',
  summary:
    'Friction comes in two kinds. Watch static friction grow to match a push until it reaches its limit, see it drop to kinetic friction the moment the object slides, and find out why a heavy sled and a light sled stop in the same distance.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Static and Kinetic Friction', subtitle: 'Why starting is harder than sliding' }],
      lines: [
        { say: 'Lean on a heavy wardrobe, and at first nothing happens. Push harder, and it suddenly lurches forward. Then it is oddly easier to keep it sliding than it was to start it.', show: 'title' },
        { say: 'Those two stages are two different kinds of friction.' },
      ],
    },
    {
      chapter: 'Static friction',
      layout: 'center',
      main: [suitcase, { kind: 'math', id: 'max', size: 'md', lines: ['F_{f,\\,\\text{max}} = \\mu_s F_N = 0.5 \\times 157 = \\bad{78.5\\ \\text{N}}'] }],
      lines: [
        { say: 'Here is a suitcase of sixteen kilograms on a level floor. Its weight is 157 newtons, so the normal force of the floor is 157 newtons as well.', show: ['floor', 'floor.weight', 'floor.normal'] },
        { say: 'Push it gently, with thirty newtons. Nothing moves, so the forces must balance. Friction pushes back with exactly thirty newtons. This is static friction.', hide: ['floor.weight', 'floor.normal'], show: 'floor.friction', play: 'floor.p30', playDelay: 0.6 },
        { say: 'Push harder, with sixty newtons. Static friction grows to sixty. It takes whatever size it needs to stop the suitcase from sliding.', play: 'floor.p60', playDelay: 0.6 },
        { say: 'But there is a limit. The greatest static friction is the coefficient of static friction, times the normal force. Here that is 0.5 times 157: 78.5 newtons.', show: 'max' },
        { say: 'So push with ninety newtons, and static friction cannot hold.', show: 'floor.velocity', play: 'floor.p90', playDelay: 1.6 },
        { say: 'And look at the friction arrow now. It has dropped to 47 newtons. A sliding object feels kinetic friction, which is smaller. That is why it is easier to keep something moving than to start it.', focus: 'floor.case' },
      ],
    },
    {
      chapter: 'Kinetic friction',
      layout: 'center',
      main: [
        box,
        {
          kind: 'math',
          id: 'kin',
          size: 'md',
          lines: ['\\bad{F_f = \\mu_k F_N = 0.2 \\times 117.7 = 23.5\\ \\text{N}}', 'a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{50 - 23.5}{12} = \\good{2.20\\ \\text{m/s}^2}'],
        },
      ],
      lines: [
        { say: 'Kinetic friction acts between surfaces that are sliding. Its size is the coefficient of kinetic friction, times the normal force. This box of twelve kilograms is pushed with fifty newtons, and the coefficient is 0.2.', show: ['floor', 'floor.friction', 'floor.velocity', 'floor.readout'], play: 'floor.go', playDelay: 9.6 },
        { say: 'The normal force equals the weight: 117.7 newtons. So the friction is 0.2 times 117.7, which is 23.5 newtons, against the motion.', show: 'kin.0' },
        { say: 'The net force is fifty minus 23.5: 26.5 newtons. Divide by the mass, and the acceleration is 2.2 metres per second squared.', show: ['kin.1', 'floor.net'], focus: 'floor.box' },
        { say: 'In this model, kinetic friction does not depend on the speed, or on the area in contact. It depends only on the two surfaces, and on how hard they are pressed together.' },
      ],
    },
    {
      chapter: 'Sliding to a stop',
      layout: 'center',
      main: [
        sled('light', 5, 'A light sled'),
        sled('heavy', 20, 'A heavy sled'),
        { kind: 'math', id: 'stop', size: 'md', lines: ['ma = \\mu_k mg \\quad\\Rightarrow\\quad a = \\mu_k g = 0.2 \\times 9.81 = \\good{1.96\\ \\text{m/s}^2}'] },
      ],
      lines: [
        {
          say: 'Two sleds slide onto level snow at six metres per second. One is four times as heavy as the other. Friction is the only horizontal force on each. Which one stops first?',
          show: ['light', 'heavy', 'light.friction', 'heavy.friction', 'light.velocity', 'heavy.velocity', 'light.strobe', 'heavy.strobe'],
          play: ['light.go', 'heavy.go'],
          playDelay: 8.4,
        },
        { say: 'They stop together. The heavy sled has four times the friction, but also four times the mass to slow down.', focus: ['light.sled', 'heavy.sled'] },
        { say: 'When friction is the only horizontal force, m "a" equals the coefficient times m g. The mass cancels, and "a" is the coefficient times g: 1.96 metres per second squared, for both sleds.', show: 'stop' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 25 kg crate rests on a level floor. The coefficient of static friction is 0.4. Use $g = 9.81\\ \\text{m/s}^2$. What is the greatest static friction on the crate?',
          choices: ['$98.1\\ \\text{N}$', '$10\\ \\text{N}$', '$245\\ \\text{N}$', '$62.5\\ \\text{N}$'],
          answer: 0,
          working: '$F_N = mg = 25 \\times 9.81 = 245.25\\ \\text{N}$, so $F_{f,\\,\\text{max}} = \\mu_s F_N = 0.4 \\times 245.25 = 98.1\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A crate of twenty-five kilograms rests on a level floor. The coefficient of static friction is 0.4. Use 9.81 metres per second squared for g. What is the greatest static friction on the crate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The normal force equals the weight: twenty-five times 9.81 is about 245 newtons. The greatest static friction is 0.4 times that: 98.1 newtons. That is choice A. Any push smaller than this will not move the crate.', show: 'q.answer' },
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
            'Static friction **matches the push**, up to a limit of $\\mu_s F_N$',
            'An object starts to move only when the push **passes that limit**',
            'Kinetic friction, on a sliding object, is $F_f = \\mu_k F_N$, and it is **smaller**',
            'With friction as the only horizontal force, $a = \\mu_k g$ **for any mass**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Static friction matches the push, up to a limit: the coefficient of static friction times the normal force.', show: 'sum.0' },
        { say: 'An object starts to move only when the push passes that limit.', show: 'sum.1' },
        { say: 'Kinetic friction acts on a sliding object. It is the coefficient of kinetic friction times the normal force, and it is usually smaller.', show: 'sum.2' },
        { say: 'And when friction is the only horizontal force, the acceleration is the coefficient times g, whatever the mass.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
