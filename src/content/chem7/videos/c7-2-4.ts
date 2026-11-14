import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). The solid's expansion is made larger
// than a real solid's (`expand`) so it can be seen; the two colours really mix by their own
// random movement.

/** A solid and a gas, heated and then cooled. */
const heat: ParticlesEl = {
  kind: 'particles',
  id: 'x',
  boxes: [
    { id: 's', state: 'solid', n: 39, cols: 13, width: 18, height: 8, temp: 0.03, expand: 0.8, label: 'a solid' },
    { id: 'g', state: 'gas', n: 14, width: 8, height: 8, temp: 1.6, lid: 0.5, piston: true, label: 'a gas' },
  ],
  clips: {
    heat: { phases: [{ dur: 6, heat: { s: 0.14, g: 3.2 }, lid: { g: 1 } }, { dur: 1 }] },
    cool: { phases: [{ dur: 6, heat: { s: 0.03, g: 1.6 }, lid: { g: 0.5 } }, { dur: 1 }] },
  },
  thermometers: true,
  height: 420,
};

/** Two gases and two liquids, each pair kept apart by a divider until it is lifted. */
const mixing: ParticlesEl = {
  kind: 'particles',
  id: 'd',
  boxes: [
    { id: 'g', state: 'gas', kinds: [{ n: 10, tone: 'opp' }, { n: 10, tone: 'adj' }], apart: true, divider: 0.5, width: 12, height: 9, temp: 3, label: 'two gases' },
    { id: 'l', state: 'liquid', kinds: [{ n: 30, tone: 'opp' }, { n: 30, tone: 'adj' }], apart: true, divider: 0.5, width: 12, height: 9, temp: 0.5, label: 'two liquids' },
  ],
  clips: { lift: { phases: [{ dur: 12, lift: ['g', 'l'] }] } },
  height: 420,
};

const video: Explainer = {
  id: 'c7-2-4',
  lessonId: 'c7-2-4',
  title: 'Expansion and Diffusion',
  thumbnail: 'd',
  summary:
    'Most substances expand when heated and contract when cooled, because their particles move more and take up more room; the particles themselves do not grow. Expansion joints in bridges, sagging power lines and thermometers are everyday examples. Diffusion is particles spreading out by their own movement until they are evenly mixed: fastest in gases, slower in liquids, almost nothing in solids, and faster when warmer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Expansion and Diffusion', subtitle: 'Why bridges have gaps, and how smells spread' }],
      lines: [
        { say: 'Long bridges are built with small gaps between their sections. Power lines sag lower on a hot day. And a smell spreads across a room in a few minutes.', show: 'title' },
        { say: 'The particle model explains all of these, through two ideas: expansion and diffusion.' },
      ],
    },
    {
      chapter: 'Expansion and contraction',
      layout: 'center',
      main: [heat, { kind: 'callout', id: 'def', tone: 'definition', title: 'Expansion and contraction', md: '**Expansion**: getting bigger when heated. **Contraction**: getting smaller when cooled.' }],
      lines: [
        { say: 'Most solids, liquids and gases expand when they are heated, and contract when they are cooled. Here are the particles of a solid, and of a gas under a piston that can move freely.', show: ['x', 'x.labels', 'x.thermo'] },
        { say: 'The dashed lines mark where the solid ends now. Let’s heat both. The solid’s particles vibrate more strongly and push one another slightly further apart, so the solid grows past the lines. The gas expands far more, pushing the piston right up.', show: 'x.width', play: 'x.heat' },
        { say: 'Getting bigger when heated is called expansion. Gases expand the most, because their particles are free to fly further apart.', show: 'def' },
        { say: 'Now let’s cool them. The particles slow down and settle closer together, so the solid and the gas both shrink back. This is contraction.', play: 'x.cool' },
      ],
    },
    {
      chapter: 'The particles do not grow',
      layout: 'center',
      main: [
        { ...heat, id: 'x2', height: 380 },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The particles do not grow', md: 'Only the **space between** the particles grows. The number of particles, their size and the mass stay the same.' },
      ],
      lines: [
        { say: 'Watch the particles as we heat them again.', show: ['x2', 'x2.labels'] },
        { say: 'Every particle stays exactly the same size. There are no more of them, and no fewer. Only the spaces between them grow.', play: 'x2.heat', show: 'oops' },
        { say: 'So the mass stays the same as a substance expands. Only the room it takes up changes.' },
      ],
    },
    {
      chapter: 'Expansion in everyday life',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'uses',
          items: [
            '**Bridges and railways** have gaps, so sections can expand without buckling.',
            '**Power lines** hang loosely, so they can contract in winter without snapping.',
            'The liquid in a **thermometer** expands and rises up the tube.',
            'A stuck metal lid loosens under hot water: metal expands more than glass.',
          ],
        },
      ],
      lines: [
        { say: 'Expansion is guarded against all around us. Bridges and railways have small gaps, so the sections can expand on hot days without buckling.', show: 'uses.0' },
        { say: 'Power lines are hung loosely, so they can contract on cold days without snapping.', show: 'uses.1' },
        { say: 'Expansion is also put to use. The liquid in a thermometer expands as it warms, and rises up the thin tube.', show: 'uses.2' },
        { say: 'And a stuck metal lid on a glass jar loosens under hot water, because the metal expands more than the glass.', show: 'uses.3' },
      ],
    },
    {
      chapter: 'Diffusion',
      layout: 'center',
      main: [mixing, { kind: 'callout', id: 'dif', tone: 'definition', title: 'Diffusion', md: 'Particles spreading out, by their **own random movement**, from where there are many to where there are few, until evenly mixed.' }],
      lines: [
        { say: 'Open a bottle of perfume at the front of a room, and soon it can be smelled at the back. To see why, here are two gases kept apart by a thin wall, and two liquids kept apart in the same way.', show: ['d', 'd.labels'] },
        { say: 'Let’s lift the walls. In the gases, the orange and blue particles spread into each other within seconds. Nothing stirs them: each particle just keeps moving at random.', play: 'd.lift', focus: 'd.g' },
        { say: 'In the liquids, the colours mix far more slowly, because each particle keeps bumping into its neighbours.', focus: 'd.l' },
        { say: 'This spreading out, by the particles’ own movement, is called diffusion. It carries on until the particles are evenly mixed.', show: 'dif' },
      ],
    },
    {
      chapter: 'How fast is diffusion?',
      layout: 'center',
      main: [{ kind: 'table', id: 'speed', head: ['In a…', 'Diffusion is…', 'Because the particles…'], rows: [['gas', 'fastest', 'move quickly, with lots of space'], ['liquid', 'slower', 'keep bumping into neighbours'], ['solid', 'almost nothing', 'are held in place']] }],
      lines: [
        { say: 'Diffusion is fastest in gases, where the particles move quickly and have lots of space.', show: ['speed', 'speed.0'], focus: 'speed.0' },
        { say: 'It is slower in liquids, where the particles keep bumping into their neighbours, and almost nothing happens in solids, where the particles are held in place.', show: ['speed.1', 'speed.2'], focus: ['speed.1', 'speed.2'] },
        { say: 'Diffusion is also faster when it is warmer, because the particles move faster. That is why a smell spreads more quickly on a hot day.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tea bag is put into hot water and another into cold water. In which cup does the colour spread faster, and why?',
          choices: [
            'The cold water, because its particles are closer together.',
            'Both the same, because diffusion does not depend on temperature.',
            'The hot water, because its particles move faster.',
            'The hot water, because its particles are bigger.',
          ],
          answer: 2,
          working: 'The colour spreads by diffusion, which is faster when the particles move faster: in the hot water. Particles never get bigger.',
        },
      ],
      lines: [
        { say: 'Your turn. A tea bag goes into hot water, and another into cold water. In which cup does the colour spread faster, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. In hot water the particles move faster, so diffusion is faster. The particles never get bigger, so D is wrong.', show: 'q.answer' },
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
            'Substances **expand** when heated and **contract** when cooled.',
            'The particles do not grow; the spaces between them do.',
            '**Diffusion**: particles spreading out by their own movement.',
            'Fastest in gases, slower in liquids, faster when warmer.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Most substances expand when heated and contract when cooled.', show: 'sum.0' },
        { say: 'The particles do not grow. Only the spaces between them change.', show: 'sum.1' },
        { say: 'Diffusion is particles spreading out by their own movement until they are evenly mixed.', show: 'sum.2' },
        { say: 'And it is fastest in gases, slower in liquids, and faster when it is warmer. Next, you will find out what chemists mean by pure.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
