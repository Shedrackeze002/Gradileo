import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles in these boxes are simulated (src/video/particles.ts): they attract and jostle one
// another, so a cold box settles into vibrating rows, a warm one slides about and a hot one flies
// apart. Nothing about their motion is drawn by hand.

/** The three states side by side, with the same particles at three temperatures. */
const three: ParticlesEl = {
  kind: 'particles',
  id: 'p',
  boxes: [
    { id: 's', state: 'solid', n: 36, label: 'solid' },
    { id: 'l', state: 'liquid', n: 36, label: 'liquid' },
    { id: 'g', state: 'gas', n: 24, label: 'gas' },
  ],
  clips: {},
  height: 440,
};

/** One box, with one particle in yellow so its path can be followed. */
const one = (id: string, state: 'solid' | 'liquid' | 'gas', n: number): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state, n, follow: state === 'gas' ? 3 : 14, width: 10, height: 9 }],
  clips: {},
  height: 500,
});

/** The three states under pistons, to push each one in. */
const pistons: ParticlesEl = {
  kind: 'particles',
  id: 'x',
  boxes: [
    { id: 's', state: 'solid', n: 45, height: 7, piston: true, label: 'solid' },
    { id: 'l', state: 'liquid', n: 45, height: 7, piston: true, label: 'liquid' },
    { id: 'g', state: 'gas', n: 18, height: 7, piston: true, label: 'gas' },
  ],
  clips: { push: { phases: [{ dur: 5, lid: { s: 0.4, l: 0.4, g: 0.4 } }] } },
  height: 400,
};

const video: Explainer = {
  id: 'c7-2-1',
  lessonId: 'c7-2-1',
  title: 'Solids, Liquids and Gases',
  thumbnail: 'p',
  summary:
    'Matter is usually solid, liquid or gas. The particle model says matter is made of tiny particles that are always moving and never change size. Solid particles are packed tightly and vibrate on the spot; liquid particles touch but slide past one another; gas particles are far apart and move quickly, so a gas fills its container and can be squashed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Solids, Liquids and Gases', subtitle: 'Three states, explained by tiny particles' }],
      lines: [
        { say: 'Ice keeps its shape on a plate. Water spreads across the table. Steam from a kettle fills the whole kitchen. All three are water, so why do they behave so differently?', show: 'title' },
        { say: 'In this video, you will see the particles inside a solid, a liquid and a gas, and how the way they move explains everything each state does.' },
      ],
    },
    {
      chapter: 'The particle model',
      layout: 'center',
      main: [{ ...three, height: 340 }, { kind: 'callout', id: 'def', tone: 'definition', title: 'The particle model', md: 'All matter is made of **particles**, far too small to see. They are **always moving**, they attract one another, and they **never change size**.' }],
      lines: [
        { say: 'Matter on Earth is usually a solid, a liquid or a gas. These are the three states of matter, and here are the same particles in each of them.', show: ['p', 'p.labels'] },
        { say: 'The particle model says that all matter is made of particles far too small to see. Watch them: they are always moving, they pull on one another, and they never change size.', show: 'def' },
        { say: 'What makes the three states different is only how the particles are arranged, and how they move. Let’s look at each one closely.', focus: ['p.s', 'p.l', 'p.g'] },
      ],
    },
    {
      chapter: 'Solids',
      layout: 'split',
      left: [one('ps', 'solid', 40)],
      right: [
        {
          kind: 'bullets',
          id: 'bs',
          items: ['Packed **tightly**, in **rows**.', 'Each particle **vibrates** on the spot.', 'Strong attractions hold them in place.', 'So a solid keeps its **shape** and **volume**.'],
        },
      ],
      lines: [
        { say: 'In a solid, the particles are packed tightly together, in neat rows.', show: ['ps', 'bs.0'] },
        { say: 'Follow the yellow particle. It shakes back and forth all the time. This is called vibrating. But it never leaves its place.', show: ['ps.trail', 'bs.1'], focus: 'ps.trail' },
        { say: 'The particles attract one another strongly, so each one is held in its place by its neighbours.', show: 'bs.2' },
        { say: 'That is why a solid keeps its own shape and its own volume. It does not flow, and it cannot be squashed.', show: 'bs.3' },
      ],
    },
    {
      chapter: 'Liquids',
      layout: 'split',
      left: [one('pl', 'liquid', 40)],
      right: [
        {
          kind: 'bullets',
          id: 'bl',
          items: ['Still **touching**, but **jumbled**.', 'They **slide past** one another.', 'So a liquid **flows** and takes its container’s shape.', 'Its **volume** stays the same.'],
        },
      ],
      lines: [
        { say: 'In a liquid, the particles are still touching, but they are jumbled, with no rows.', show: ['pl', 'bl.0'] },
        { say: 'Follow the yellow particle now. It wanders through the liquid, sliding past its neighbours as it goes.', show: ['pl.trail', 'bl.1'], focus: 'pl.trail' },
        { say: 'Because the particles can slide past one another, a liquid flows. It spreads across the bottom of its container and takes the container’s shape.', show: 'bl.2' },
        { say: 'But the particles are still touching, so the liquid keeps its volume.', show: 'bl.3' },
      ],
    },
    {
      chapter: 'Gases',
      layout: 'split',
      left: [one('pg', 'gas', 24)],
      right: [
        {
          kind: 'bullets',
          id: 'bg',
          items: ['**Far apart**, with empty space between.', 'Moving **fast**, in **all directions**.', 'They **hit the walls** of their container.', 'So a gas **fills** its whole container.'],
        },
      ],
      lines: [
        { say: 'In a gas, the particles are far apart, with lots of empty space between them.', show: ['pg', 'bg.0'] },
        { say: 'They move fast, in straight lines, in every direction. Follow the yellow one as it races across the box.', show: ['pg.trail', 'bg.1'], focus: 'pg.trail' },
        { say: 'Every flash is a particle hitting a wall and bouncing off.', show: ['pg.hits', 'bg.2'] },
        { say: 'Because the particles fly off in every direction until something stops them, a gas spreads out to fill its whole container.', show: 'bg.3' },
      ],
    },
    {
      chapter: 'Squashing',
      layout: 'center',
      main: [
        pistons,
        { kind: 'callout', id: 'm2', tone: 'mistake', title: 'Particles do not shrink', md: 'Squash a gas, and the **spaces** between its particles get smaller, not the particles.' },
      ],
      lines: [
        { say: 'Now let’s push a piston down onto each state, with the same push.', show: ['x', 'x.labels'] },
        { say: 'Watch. The gas squashes easily, into a much smaller space. The solid and the liquid hardly move at all.', play: 'x.push' },
        { say: 'The gas could be squashed because its particles had empty space between them. In the solid and the liquid, the particles were already touching, so there was nowhere for them to go.', focus: 'x.g' },
        { say: 'And look at the gas particles. They are just as big as before. Squashing a gas makes the spaces between its particles smaller, never the particles themselves.', show: 'm2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why can the air in a sealed syringe be pushed in, but water cannot?',
          choices: [
            'Air particles shrink when they are pushed, but water particles cannot.',
            'Air particles are far apart, but water particles are already touching.',
            'Water particles are held in fixed rows, but air particles are not.',
            'Water particles do not move, but air particles move quickly.',
          ],
          answer: 1,
          working: 'In a gas the particles are far apart, so they can be pushed closer. In a liquid they already touch, so there is no space to push them into.',
        },
      ],
      lines: [
        { say: 'Your turn. Why can the air in a sealed syringe be pushed in, but water cannot? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Air particles are far apart, so they can be pushed closer, while water particles already touch. Particles never shrink, so A is wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'split',
      leftWidth: 680,
      left: [{ ...three, id: 'ps2', height: 380 }],
      right: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Particles are always moving and never change size.',
            '**Solid**: tightly packed in rows, vibrating.',
            '**Liquid**: touching, jumbled, sliding past one another.',
            '**Gas**: far apart and fast, so it fills its container and can be squashed.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. All matter is made of particles that are always moving and never change size.', show: ['ps2', 'ps2.labels', 'sum.0'] },
        { say: 'Solid particles are packed tightly in rows, and vibrate on the spot.', show: 'sum.1', focus: 'ps2.s' },
        { say: 'Liquid particles touch, but are jumbled, and slide past one another.', show: 'sum.2', focus: 'ps2.l' },
        { say: 'And gas particles are far apart and fast, so a gas fills its container and can be squashed. Next, you will see what happens to the particles when a substance melts, boils or freezes.', show: 'sum.3', focus: 'ps2.g' },
      ],
    },
  ],
};

export default video;
