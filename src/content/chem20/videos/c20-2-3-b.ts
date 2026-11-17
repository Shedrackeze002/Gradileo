import type { Explainer, ParticlesEl } from '@/video/script.ts';

/**
 * A gas under a piston (simulated, src/video/particles.ts), with a gauge and a thermometer: halving
 * its volume doubles the pressure while the temperature, and so the particles' speed, stays put.
 */
const halves: ParticlesEl = {
  kind: 'particles',
  id: 'h',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 10, temp: 1.6, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: {
    halve: { phases: [{ dur: 4, lid: { b: 0.5 } }] },
    expand: { phases: [{ dur: 4, lid: { b: 1 } }] },
  },
  gauge: { box: 'b', start: 100 },
  volume: { box: 'b', start: 2 },
  thermometers: true,
  height: 480,
};

const video: Explainer = {
  id: 'c20-2-3-b',
  lessonId: 'c20-2-3',
  title: "Boyle's Law, Part 2: Why Squeezing Raises the Pressure",
  thumbnailTitle: 'Why Squeezing Raises the Pressure',
  thumbnail: 'h',
  summary:
    "Halve the volume of a gas at constant temperature and the same particles are packed into half the space, so they hit each part of the wall twice as often, and the pressure doubles. They do not move faster: their average speed depends only on the temperature. Boyle's law is at work in a pump and in every breath.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Why Squeezing Raises the Pressure', subtitle: 'Boyle’s law and moving particles' }],
      lines: [
        { say: 'Push the plunger of a sealed syringe halfway in, and the air inside pushes back twice as hard. But nothing has been added to the air. So where does the extra push come from?', show: 'title' },
        { say: 'In this part, you will explain Boyle’s law with the kinetic molecular theory, and see the law at work in a pump and in your own lungs.' },
      ],
    },
    {
      chapter: 'More often, not harder',
      layout: 'split',
      leftWidth: 600,
      left: [halves],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Pressure comes from particles **hitting the walls**.',
            'Constant temperature: the **same average speed**, so each hit is just as hard.',
            'Half the volume: each part of the wall is hit **twice as often**, so the pressure **doubles**.',
          ],
        },
      ],
      lines: [
        { say: 'The pressure of a gas comes from its particles hitting the walls of the container. Each flash is one hit.', show: ['h', 'h.hits', 'h.gauge', 'h.volume', 's.0'], focus: 'h.hits' },
        { say: 'At constant temperature, the particles keep the same average speed, so each collision with a wall is just as hard as before. What changes is how often they hit.', show: ['s.1', 'h.thermo'], focus: 'h.thermo' },
        { say: 'Halve the volume, and the same particles are packed into half the space. Each part of the wall now has twice as many particles close to it, so it is hit twice as often every second. The thermometer has not moved.', play: 'h.halve', focus: 'h.hits' },
        { say: 'Twice as many collisions on each square centimetre of wall means twice the pressure: two hundred kilopascals instead of one hundred.', show: 's.2', focus: 'h.gauge' },
        { say: 'Let the gas expand instead, and the particles spread out. They hit the walls less often, and the pressure falls.', play: 'h.expand', focus: 'h.gauge' },
      ],
    },
    {
      chapter: 'Squeezing does not speed them up',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squeezing a gas does not speed up its particles', md: 'At constant temperature, the average speed of the particles stays the same, because it depends only on the temperature. A smaller volume raises the pressure because the particles hit the walls **more often**, not harder.' }],
      lines: [
        { say: 'Watch out for a common mistake. Squeezing a gas does not speed up its particles. At constant temperature, their average speed stays the same, because it depends only on the temperature.', show: 'oops' },
        { say: 'A smaller volume raises the pressure because the particles hit the walls more often, not harder.' },
      ],
    },
    {
      chapter: 'Pumps and breathing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pump', tone: 'tip', title: 'Pumps get warm', md: 'Squeezing a gas fast heats it. Boyle’s law describes the gas once it is back at its starting temperature, so measurements are taken slowly.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Breathing in:** the chest gets bigger, the pressure in the lungs falls a little below the pressure outside, and air flows in.', '**Breathing out:** the chest gets smaller, the pressure inside rises, and air is pushed out.'],
        },
      ],
      lines: [
        { say: 'Pump up a tyre quickly, and the pump gets warm: squeezing a gas fast heats it.', show: 'pump' },
        { say: 'Boyle’s law describes the gas once it is back at its starting temperature. So measurements like those in the table were taken slowly, letting the syringe cool between readings.' },
        { say: 'Boyle’s law is at work every time you breathe. When you breathe in, muscles enlarge your chest, and the volume of your lungs increases. The pressure of the air inside falls a little below the pressure outside, and air flows in.', show: 'b.0' },
        { say: 'When you breathe out, your chest gets smaller. The pressure inside rises, and air is pushed out.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas is squeezed into half its volume at constant temperature, and its pressure doubles. According to the kinetic molecular theory, why?',
          choices: ['Its particles move twice as fast.', 'Its particles hit each part of the wall twice as often.', 'Its particles grow to twice their size.', 'Each collision with the wall is twice as hard.'],
          answer: 1,
          working: 'At constant temperature the particles keep the same average speed, so each hit is just as hard. In half the space, each part of the wall is hit twice as often, so the pressure doubles.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas is squeezed into half its volume at constant temperature, and its pressure doubles. According to the kinetic molecular theory, why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. In half the space, the particles hit each part of the wall twice as often. Choices A and D are wrong, because at constant temperature the particles keep the same average speed, so each hit is just as hard as before.', show: 'q.answer' },
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
            'In a smaller volume, particles hit each part of the wall **more often**, so the pressure is higher.',
            'At constant temperature, their **average speed does not change**.',
            'Breathing: a bigger chest means a lower pressure inside, so air flows in.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a smaller volume, the particles hit each part of the wall more often, so the pressure is higher.', show: 'sum.0' },
        { say: 'At constant temperature, their average speed does not change. Each hit is just as hard as before.', show: 'sum.1' },
        { say: 'And when your chest gets bigger, the pressure inside falls, so air flows in. In part three, you will use Boyle’s law to find a new volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
