import type { Explainer, MotionEl, MotionPhase } from '@/video/script.ts';

// Lesson 1.3, second half: recoil and explosions. Two skaters at rest push each other apart, a
// spring throws a light cart and a heavy cart apart, and a firework breaks in two while it flies.
// In each, the two parts are moved by equal and opposite forces that act for the same time
// (src/video/motion.ts), so the bars show the total momentum staying where it was: zero for the
// skaters and the carts, and 20 kg·m/s for the firework.

/** The moment two bodies push each other apart: equal and opposite forces that give each `impulse` N·s. */
const apart = (left: string, right: string, impulse: number, time: number, o: { slow?: number; hidden?: boolean; flash?: boolean } = {}): MotionPhase => ({
  dur: time,
  ...(o.slow ? { slow: o.slow, note: 'Slow motion' } : {}),
  ...(o.flash ? { contact: [left, right] as [string, string] } : {}),
  forces: [
    { on: left, name: 'Push', n: -impulse / time, tone: 'bad', ...(o.hidden ? { hidden: true } : {}) },
    { on: right, name: 'Push', n: impulse / time, tone: 'good', ...(o.hidden ? { hidden: true } : {}) },
  ],
});

/** The lesson's skaters: 80 kg and 60 kg, at rest, push apart with 240 N for half a second. */
const skaters: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 440,
  bodies: [
    { id: 'heavy', shape: 'block', mass: 80, x: 5.45, label: '80 kg', tone: 'adj', width: 1.1 },
    { id: 'light', shape: 'block', mass: 60, x: 6.55, label: '60 kg', tone: 'opp', width: 1.1 },
  ],
  momentumMax: 150,
  momentumMin: -150,
  forceScale: 0.5,
  velocityScale: 40,
  clips: { push: { phases: [apart('heavy', 'light', 120, 0.5), { dur: 2 }] } },
};

/** A spring between a 3 kg cart and a 1 kg cart: each gets 3 kg·m/s, so the light one leaves three times as fast. */
const carts: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 440,
  bodies: [
    { id: 'heavy', shape: 'cart', mass: 3, x: 3.2, label: '3 kg', tone: 'adj', width: 1.5 },
    { id: 'light', shape: 'cart', mass: 1, x: 4.45, label: '1 kg', tone: 'opp', width: 1.1 },
  ],
  momentumMax: 4,
  momentumMin: -4,
  forceScale: 9,
  velocityScale: 30,
  clips: { spring: { phases: [apart('heavy', 'light', 3, 0.25, { slow: 6 }), { dur: 1.3 }] } },
};

/** The lesson's rifle, 500 times slower: a 10 g bullet leaves at 800 m/s, and the 4 kg rifle recoils at 2 m/s. */
const rifle: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 440,
  bodies: [
    { id: 'rifle', shape: 'block', mass: 4, x: 2.6, label: 'Rifle', tone: 'adj', width: 2.2 },
    { id: 'bullet', shape: 'ball', mass: 0.01, x: 3.86, label: 'Bullet', tone: 'opp', width: 0.3 },
  ],
  momentumMax: 10,
  momentumMin: -10,
  velocityScale: 0.15,
  clips: {
    fire: {
      phases: [
        { ...apart('rifle', 'bullet', 8, 0.0008, { hidden: true, flash: true }), slow: 500, note: 'Slow motion' },
        { dur: 0.0062, slow: 500, note: 'Slow motion' },
      ],
    },
  },
};

/** The lesson's firework: 5 kg moving east at 4 m/s breaks into 2 kg at 13 m/s and 3 kg at -2 m/s. */
const firework: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 440,
  bodies: [
    { id: 'back', shape: 'block', mass: 3, x: 1.2, v: 4, label: '3 kg', tone: 'adj', width: 1 },
    { id: 'front', shape: 'block', mass: 2, x: 2.2, v: 4, label: '2 kg', tone: 'opp', width: 1 },
  ],
  momentumMax: 28,
  momentumMin: -8,
  velocityScale: 9,
  clips: {
    fly: {
      phases: [
        { dur: 0.6, slow: 3, note: 'Slow motion' },
        { ...apart('back', 'front', 18, 0.04, { hidden: true, flash: true }), slow: 3, note: 'Slow motion' },
        { dur: 0.62, slow: 3, note: 'Slow motion' },
      ],
    },
  },
};

const video: Explainer = {
  id: 'p30-1-3-b',
  lessonId: 'p30-1-3',
  title: 'Recoil and Explosions',
  thumbnail: 'sim',
  summary:
    'Two skaters at rest push each other apart, and both end up with momentum. Watch why the total is still zero, see why the lighter of two objects always leaves faster, find the recoil of a rifle, and follow a firework that breaks in two while it flies.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Recoil and Explosions', subtitle: 'When objects push each other apart' }],
      lines: [
        { say: 'Two skaters stand face to face on smooth ice, and push each other away. Neither had any momentum before the push. Afterwards, both do. Has momentum been made from nothing?', show: 'title' },
        { say: 'It has not. And the reason is the sign.' },
      ],
    },
    {
      chapter: 'Pushing apart',
      layout: 'center',
      main: [skaters, { kind: 'math', id: 'sk', size: 'md', lines: ['0 = \\opp{60 \\times 2} + \\adj{80 \\times v} \\qquad v = -120 \\div 80 = \\adj{-1.5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Here are the two skaters. The blue one has a mass of eighty kilograms, and the orange one has sixty. Both are at rest, so the total momentum is zero.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'Now they push. Each pushes on the other with the same force, in opposite directions, and for the same time.', play: 'sim.push', playDelay: 0.8 },
        { say: 'The orange skater moves east at two metres per second, with a momentum of positive one hundred and twenty. The blue skater has negative one hundred and twenty. Add them with their signs, and the total is still zero.', focus: 'sim' },
        { say: 'So we can find the speed of the blue skater. Zero equals sixty times two, plus eighty times the velocity. The velocity is negative 1.5 metres per second: 1.5 metres per second to the west.', show: 'sk' },
        { say: 'The heavier skater moves more slowly. Equal momentum does not mean equal speed.', focus: 'sim.heavy' },
      ],
    },
    {
      chapter: 'The lighter one leaves faster',
      layout: 'center',
      main: [carts, { kind: 'text', id: 'rule', size: 'md', md: 'The same size of **momentum**, not the same speed' }],
      lines: [
        { say: 'Here a spring is squeezed between a cart of three kilograms and a cart of one kilogram. Watch what happens when it is let go.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.spring', playDelay: 6.5 },
        { say: 'The spring pushed both carts equally hard for the same time, so each has three units of momentum, in opposite directions. But the heavy cart needs only one metre per second to carry it. The light cart needs three.', show: 'rule' },
        { say: 'This is the mistake to avoid. After an explosion from rest, the two objects have the same size of momentum, not the same speed. The one with less mass moves faster.', focus: 'sim.light' },
      ],
    },
    {
      chapter: 'Recoil',
      layout: 'center',
      main: [rifle, { kind: 'math', id: 'gun', size: 'md', lines: ['\\text{bullet:}\\quad 0.010 \\times 800 = \\opp{8\\ \\text{kg·m/s}} \\qquad \\text{rifle:}\\quad v = 8 \\div 4 = \\adj{2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'This is why a gun moves back, or recoils, far more slowly than its bullet moves forward. A rifle of four kilograms, at rest, fires a bullet of ten grams at eight hundred metres per second. Here it is, slowed down five hundred times.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.fire', playDelay: 11.5 },
        { say: 'Ten grams is 0.010 kilograms, so the bullet has eight units of momentum. The rifle gets eight units the other way. Eight over four is two metres per second. On the bars, the two momenta are equal and opposite, although the speeds could hardly be more different.', show: 'gun' },
        { say: 'A rocket works in the same way. It throws exhaust gas backwards at high speed, and gains an equal amount of momentum forwards. It does not need air or ground to push against, so it works in empty space.' },
      ],
    },
    {
      chapter: 'An explosion in flight',
      layout: 'center',
      main: [firework, { kind: 'math', id: 'fw', size: 'md', lines: ['5 \\times 4 = \\opp{2 \\times 13} + \\adj{3 \\times v}', '20 = 26 + 3v \\qquad v = \\adj{-2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'When an object is already moving before it breaks up, the total is not zero. It is the momentum the whole object had. This firework of five kilograms moves east at four metres per second, so the total is twenty.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'It explodes into a piece of two kilograms and a piece of three kilograms. Watch the total.', play: 'sim.fly', playDelay: 0.5, wait: 0.6 },
        { say: 'The two kilogram piece flies on at thirteen metres per second. So five times four equals two times thirteen, plus three times the velocity of the other piece.', show: 'fw.0' },
        { say: 'Twenty equals twenty-six plus three v. The velocity is negative two metres per second. The other piece moves west, and the total is still twenty.', show: 'fw.1', focus: 'sim.back' },
        { say: 'An explosion does not change the total momentum. But it does add kinetic energy, which comes from the explosive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two skaters stand at rest on smooth ice and push each other apart. The 40 kg skater moves away at 3 m/s. How fast does the 60 kg skater move?',
          choices: ['$3\\ \\text{m/s}$', '$4.5\\ \\text{m/s}$', '$2\\ \\text{m/s}$', '$1.2\\ \\text{m/s}$'],
          answer: 2,
          working: 'The momenta are equal in size: $40 \\times 3 = 120\\ \\text{kg·m/s}$, so $v = \\dfrac{120}{60} = 2\\ \\text{m/s}$, the other way.',
        },
      ],
      lines: [
        { say: 'Your turn. Two skaters stand at rest on smooth ice and push each other apart. The forty kilogram skater moves away at three metres per second. How fast does the sixty kilogram skater move? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The total stays zero, so the two momenta are equal in size. Forty times three is one hundred and twenty. Divide by sixty kilograms, and the speed is two metres per second, in the opposite direction. That is choice C.', show: 'q.answer' },
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
            'An explosion from rest: total momentum stays **zero**',
            'The two momenta are **equal in size** and opposite in direction',
            'The **lighter** object moves faster: that is recoil',
            'In flight, the total is the momentum the whole object had',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. When objects at rest push each other apart, the total momentum stays zero.', show: 'sum.0' },
        { say: 'The two momenta are equal in size, and opposite in direction.', show: 'sum.1' },
        { say: 'The lighter object moves faster. That is why a rifle recoils slowly.', show: 'sum.2' },
        { say: 'And if the object was already moving, the total is the momentum that the whole object had.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
