import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). Colours show how fast each particle
// is moving, from blue (slow) to red (fast), so heat can be seen spreading.

/** Cooler and hotter air: the same particles, moving at different speeds. */
const speeds: ParticlesEl = {
  kind: 'particles',
  id: 't',
  boxes: [
    { id: 'c', state: 'gas', n: 14, width: 8, height: 9, temp: 1.4, follow: 2, label: 'cooler air' },
    { id: 'h', state: 'gas', n: 14, width: 8, height: 9, temp: 4.5, follow: 2, label: 'hotter air' },
  ],
  clips: {},
  thermometers: true,
  height: 400,
};

/** Hot water beside cold water: heat flows from one to the other until they are the same. */
const share: ParticlesEl = {
  kind: 'particles',
  id: 'w',
  boxes: [
    { id: 'h', state: 'liquid', n: 40, width: 9, height: 7, temp: 0.7, heatColor: [0.35, 0.7], label: 'hot water' },
    { id: 'c', state: 'liquid', n: 40, width: 9, height: 7, temp: 0.35, heatColor: [0.35, 0.7], label: 'cold water' },
  ],
  clips: { go: { phases: [{ dur: 9, heat: { h: 0.52, c: 0.52 } }, { dur: 1 }] } },
  thermometers: true,
  flow: { from: 'h', to: 'c' },
  height: 400,
};

/** A warm hand holding ice: heat flows out of the hand and into the ice, which melts. */
const ice: ParticlesEl = {
  kind: 'particles',
  id: 'i',
  boxes: [
    { id: 'h', state: 'liquid', n: 40, width: 9, height: 7, temp: 0.6, heatColor: [0.08, 0.6], label: 'your warm hand' },
    { id: 'i', state: 'solid', n: 36, width: 9, height: 7, temp: 0.08, heatColor: [0.08, 0.6], label: 'ice' },
  ],
  clips: { go: { phases: [{ dur: 10, heat: { h: 0.45, i: 0.45 } }, { dur: 1 }] } },
  thermometers: true,
  flow: { from: 'h', to: 'i' },
  height: 400,
};

/** A metal bar heated at its left end: the vibration is passed along it, particle to particle. */
const rod: ParticlesEl = {
  kind: 'particles',
  id: 'r',
  boxes: [{ id: 'b', state: 'solid', n: 57, cols: 19, width: 22, height: 4, temp: 0.04, bath: 'left', heatColor: [0.04, 0.2], label: 'a metal bar, heated at its left end', bare: true }],
  clips: { heat: { phases: [{ dur: 8, heat: { b: 0.26 } }, { dur: 4 }] } },
  height: 300,
};

const video: Explainer = {
  id: 'c7-2-3',
  lessonId: 'c7-2-3',
  title: 'Temperature and Heat',
  thumbnail: 'w',
  summary:
    'Temperature, measured in degrees Celsius with a thermometer, tells how fast the particles move on average. Heat is energy moving from a hotter object to a cooler one. Heat moves by conduction through touching particles, best in metals; by convection in moving liquids and gases; and by radiation, even through empty space. Insulators such as wood, plastic, wool and air let heat through slowly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Temperature and Heat', subtitle: 'What hot means, and how heat moves' }],
      lines: [
        { say: 'A metal spoon in hot soup quickly gets too hot to hold, but a wooden spoon does not. Why?', show: 'title' },
        { say: 'In this video, you will find out what temperature and heat really are, and the three ways heat moves.' },
      ],
    },
    {
      chapter: 'Temperature',
      layout: 'center',
      main: [speeds, { kind: 'callout', id: 'def', tone: 'definition', title: 'Temperature', md: 'How hot or cold something is: a measure of how fast its particles move, on average. Measured with a **thermometer**, in °C.' }],
      lines: [
        { say: 'Temperature tells us how hot or cold something is. Here are the particles of two boxes of air, one cooler and one hotter.', show: ['t', 't.labels'] },
        { say: 'Follow the yellow particle in each box. In the hotter air, it races across the box. In the cooler air, it moves more slowly.', show: 't.trail', focus: 't.trail' },
        { say: 'So in the particle model, temperature measures how fast the particles are moving, on average. The faster they move, the higher the temperature, and the higher a thermometer reads.', show: ['def', 't.thermo'] },
      ],
    },
    {
      chapter: 'The Celsius scale',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{-6}\\,^\\circ\\text{C} \\to 0\\,^\\circ\\text{C}: \\ 6 \\text{ degrees}', '0\\,^\\circ\\text{C} \\to 4\\,^\\circ\\text{C}: \\ 4 \\text{ degrees}', '\\text{rise} = 6 + 4 = 10\\,^\\circ\\text{C}'] }],
      lines: [
        { say: 'On the Celsius scale, pure water freezes at zero degrees and boils at one hundred degrees. Colder temperatures are written with a minus sign.' },
        { say: 'A winter morning is at minus six degrees, and by afternoon it is four degrees. From minus six up to zero is six degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Then four more degrees up to four. So the temperature rose by ten degrees.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Heat',
      layout: 'center',
      main: [share, { kind: 'callout', id: 'heat', tone: 'definition', title: 'Heat', md: 'Energy that moves from a **hotter** object to a **cooler** one, until both are at the same temperature.' }],
      lines: [
        { say: 'Here is hot water right beside cold water. The colours show how fast each particle moves: red is fast and blue is slow.', show: ['w', 'w.labels', 'w.thermo'] },
        { say: 'Where they meet, the fast particles of the hot water knock into the slow ones, and pass on some of their energy. Heat flows from the hot water into the cold water.', play: 'w.go', show: 'w.flow' },
        { say: 'The hot water cools down and the cold water warms up, until both are at the same temperature. Then no more heat flows.', show: 'heat' },
        { say: 'Heat and temperature are not the same. A warm bath has a lower temperature than a cup of boiling water, but it holds far more heat energy, because it has far more particles.' },
      ],
    },
    {
      chapter: 'Cold does not flow',
      layout: 'center',
      main: [ice, { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cold does not flow', md: 'Holding ice, your hand feels cold because **heat flows out** of your hand into the ice.' }],
      lines: [
        { say: 'When you hold an ice cube, your hand feels cold. So does cold flow from the ice into your hand?', show: ['i', 'i.labels', 'i.thermo'] },
        { say: 'No. Watch the particles. Heat flows out of your warm hand and into the ice. The particles of your hand slow down, and the particles of the ice vibrate harder, until the ice begins to melt.', play: 'i.go', show: 'i.flow' },
        { say: 'Your hand feels cold because it is losing heat. Nothing called cold ever flows: only heat, and always from hotter to cooler.', show: 'oops' },
      ],
    },
    {
      chapter: 'Conduction',
      layout: 'center',
      main: [
        rod,
        { kind: 'bullets', id: 'ins', items: ['**Conductors** let heat through easily: copper, iron, aluminium.', '**Insulators** let it through slowly: wood, plastic, wool, air.'] },
      ],
      lines: [
        { say: 'Heat moves in three ways. The first is conduction. Here are the particles of a metal bar, and we are about to heat its left end.', show: ['r', 'r.labels'] },
        { say: 'The particles at the hot end vibrate faster. They knock into their neighbours, which start to vibrate faster too, and they knock into theirs. So heat passes along the bar, particle to particle.', play: 'r.heat' },
        { say: 'Notice that no particle moves along the bar. Only the vibration is passed on. This is conduction, and it works best in metals.', focus: 'r.b' },
        { say: 'Metals are conductors, which is why a metal spoon in hot soup gets hot. Wood is an insulator, and so are plastic, wool and still air.', show: ['ins.0', 'ins.1'] },
      ],
    },
    {
      chapter: 'Convection and radiation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ways',
          head: ['Way', 'How it works', 'Example'],
          rows: [
            ['conduction', 'particle to particle, through a material', 'a metal spoon in soup'],
            ['convection', 'carried by a moving liquid or gas', 'water heated in a pan'],
            ['radiation', 'as invisible rays, no particles needed', 'the Sun warming Earth'],
          ],
        },
      ],
      lines: [
        { say: 'Conduction passes heat through a material, from particle to particle.', show: ['ways', 'ways.0'], focus: 'ways.0' },
        { say: 'In convection, a liquid or gas moves and carries the heat with it. Warm water rises, and cooler water sinks to be heated in turn.', show: 'ways.1', focus: 'ways.1' },
        { say: 'And radiation travels as invisible rays that need no particles at all. That is how the Sun’s heat crosses empty space.', show: 'ways.2', focus: 'ways.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How does the Sun’s heat reach Earth across empty space?',
          choices: ['By conduction', 'By convection', 'By sound waves', 'By radiation'],
          answer: 3,
          working: 'Conduction and convection both need particles. Space is empty, so only radiation, which travels as rays, can cross it.',
        },
      ],
      lines: [
        { say: 'Your turn. How does the Sun’s heat reach Earth across empty space? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, radiation. Conduction and convection both need particles, but radiation travels as rays, even through empty space.', show: 'q.answer' },
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
            '**Temperature** tells how fast the particles move on average.',
            '**Heat** is energy moving from hotter to cooler.',
            'Conduction through particles, convection in moving fluids, radiation as rays.',
            '**Insulators** such as wood, plastic, wool and air slow heat down.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Temperature tells how fast the particles move, on average.', show: 'sum.0' },
        { say: 'Heat is energy that flows from a hotter object to a cooler one.', show: 'sum.1' },
        { say: 'Heat moves by conduction, convection and radiation.', show: 'sum.2' },
        { say: 'And insulators let heat through slowly. Next, you will see how heating makes things expand, and how particles spread out by themselves.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
