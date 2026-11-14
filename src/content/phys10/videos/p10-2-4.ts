import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 2.4: mass against weight, the gravitational field strength g and W = mg, and the same
// object on two worlds. The drops are worked out from the weights drawn (src/video/motion.ts): the
// same kilogram falls slowly on the Moon, and one and three kilograms fall together on Earth.

const weight = (on: string, n: number): MotionForce => ({ on, name: 'Weight', n, tone: 'hyp' });

/** Two columns side by side: the forces appear (`weigh`), then the bodies are let go (`drop`). */
function drops(o: { labels: [string, string]; masses: [number, number]; weights: [number, number]; names?: [string, string]; fall: number; seconds: number; forceScale: number; shape?: 'ball' | 'block'; height?: number }): MotionEl {
  const forces = [weight('left', o.weights[0]), weight('right', o.weights[1])];
  return {
    kind: 'motion',
    id: 'sim',
    vertical: true,
    span: [0, o.fall],
    height: o.height ?? 470,
    lanes: [{ label: o.labels[0] }, { label: o.labels[1] }],
    bodies: [
      { id: 'left', shape: o.shape ?? 'ball', mass: o.masses[0], label: o.names?.[0], x: 0, width: 1.2, lane: 0, tone: 'adj' },
      { id: 'right', shape: o.shape ?? 'ball', mass: o.masses[1], label: o.names?.[1], x: 0, width: 1.2, lane: 1, tone: 'opp' },
    ],
    forceScale: o.forceScale,
    velocityScale: 9,
    poster: 'weigh',
    clips: {
      weigh: { phases: [{ dur: 1, freeze: true, forces }] },
      drop: { phases: [{ dur: o.seconds, forces }] },
    },
  };
}

// The same kilogram on Earth (9.8 N) and on the Moon (1.6 N), let go for one second.
const worlds = drops({ labels: ['On Earth', 'On the Moon'], masses: [1, 1], weights: [9.8, 1.6], fall: 7, seconds: 1, forceScale: 8 });
// One kilogram and three kilograms on Earth: three times the weight, and they fall together.
const together = drops({ labels: ['1 kg on Earth', '3 kg on Earth'], masses: [1, 3], weights: [9.8, 29.4], fall: 7, seconds: 1, forceScale: 2.8 });
// A 50 kg rover on Earth (490 N) and on Mars (185 N), held one metre above the ground.
const rover = drops({ labels: ['The rover on Earth', 'The rover on Mars'], masses: [50, 50], weights: [490, 185], names: ['50 kg', '50 kg'], fall: 1, seconds: 1, forceScale: 0.2, shape: 'block', height: 320 });

const video: Explainer = {
  id: 'p10-2-4',
  lessonId: 'p10-2-4',
  title: 'Mass, Weight and Gravity',
  thumbnail: 'sim',
  summary:
    'Mass and weight are not the same thing. Watch the same kilogram dropped on Earth and on the Moon, see why one kilogram and three kilograms fall together, and use weight = mass × g to find the weight of an object on another world.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Newton’s Laws', title: 'Mass, Weight and Gravity', subtitle: 'Why you would weigh less on the Moon' }],
      lines: [
        { say: 'On the Moon, an astronaut can leap several metres, wearing a heavy backpack that would be a struggle to lift on Earth. The backpack has not lost any of its contents.', show: 'title' },
        { say: 'What has changed is how hard gravity pulls on it. To make sense of this, we need two ideas that everyday speech mixes up: mass, and weight.' },
      ],
    },
    {
      chapter: 'Mass and weight',
      layout: 'center',
      main: [worlds, { kind: 'text', id: 'mw', size: 'md', md: '**Mass**: the amount of matter, in **kg**. **Weight**: the pull of gravity, in **N**.' }],
      lines: [
        { say: 'Here is the same ball in two places, on Earth and on the Moon. Its mass is one kilogram. Mass is the amount of matter in an object, and it is the same wherever the object is.', show: 'sim' },
        { say: 'Weight is different. Weight is the force of gravity on the object. On Earth, gravity pulls this ball down with nine point eight newtons. On the Moon, the pull is only one point six newtons.', play: 'sim.weigh', playDelay: 6.5 },
        { say: 'Now let go of both, and watch them for one second.', show: ['sim.velocity', 'sim.clock', 'sim.strobe'], play: 'sim.drop', playDelay: 1.6 },
        { say: 'On Earth, the larger weight pulled the ball down far more quickly. The mass is the same in both places, but the weight is not.', focus: 'sim.left' },
        { say: 'So mass is measured in kilograms, and weight is a force, measured in newtons.', show: 'mw', focus: 'sim' },
      ],
    },
    {
      chapter: 'Gravitational field strength',
      layout: 'center',
      main: [together, { kind: 'math', id: 'wmg', size: 'md', lines: ['\\text{weight} = \\text{mass} \\times g \\qquad W = mg = 3 \\times 9.8 = \\good{29.4\\ \\text{N}}'] }],
      lines: [
        { say: 'How strong is the pull? On Earth, gravity pulls on every kilogram with nine point eight newtons. This number is called the gravitational field strength, and its symbol is g.', show: 'sim', play: 'sim.weigh', playDelay: 4 },
        { say: 'So a mass of one kilogram has a weight of nine point eight newtons, and three kilograms has three times as much. Weight equals mass times g. Three times nine point eight is twenty-nine point four newtons.', show: 'wmg' },
        { say: 'Does the heavier ball fall faster? Watch.', show: ['sim.velocity', 'sim.readout', 'sim.clock', 'sim.strobe'], play: 'sim.drop', playDelay: 1.6 },
        { say: 'They fall together. The heavier ball has three times the weight, but it also has three times the mass to move. So both speed up at the same rate.', focus: ['sim.left', 'sim.right'] },
      ],
    },
    {
      chapter: 'Other worlds',
      layout: 'center',
      main: [
        rover,
        {
          kind: 'math',
          id: 'mars',
          size: 'md',
          lines: ['m = \\dfrac{W}{g} = \\dfrac{490}{9.8} = \\good{50\\ \\text{kg}} \\qquad W_{\\text{Mars}} = 50 \\times 3.7 = \\good{185\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Other worlds pull differently. On the Moon, g is one point six newtons per kilogram. On Mars, it is three point seven.', show: 'sim' },
        { say: 'A rover has a weight of four hundred and ninety newtons on Earth, where g is nine point eight. What will it weigh on Mars? Find its mass first. Four hundred and ninety divided by nine point eight is fifty kilograms.', show: 'mars' },
        { say: 'The mass is the same on Mars. So the weight there is fifty times three point seven, which is one hundred and eighty-five newtons.', play: 'sim.weigh', playDelay: 3.5 },
        { say: 'The same rover, the same fifty kilograms, but much less weight. To compare two worlds, find the mass first, then use the new value of g.', focus: 'sim.right' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An astronaut has a mass of 80 kg. On the Moon, g = 1.6 N/kg. What are the astronaut’s mass and weight on the Moon?',
          choices: ['13 kg and 128 N', '80 kg and 128 N', '80 kg and 784 N', '128 kg and 80 N'],
          answer: 1,
          working: 'The mass does not change: 80 kg. Weight $= mg = 80 \\times 1.6 = 128\\ \\text{N}$.',
        },
      ],
      lines: [
        { say: 'Your turn. An astronaut has a mass of eighty kilograms. On the Moon, g is one point six newtons per kilogram. What are the mass and the weight of the astronaut on the Moon? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The mass does not change, so it is still eighty kilograms. The weight is eighty times one point six, which is one hundred and twenty-eight newtons. That is choice B.', show: 'q.answer' },
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
            '**Mass** is the amount of matter, in kg: the same everywhere',
            '**Weight** is the pull of gravity, in N: it depends on where you are',
            'W = mg, and on Earth g = 9.8 N/kg',
            'To compare two worlds, find the mass first',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Mass is the amount of matter, in kilograms, and it is the same everywhere.', show: 'end.0' },
        { say: 'Weight is the pull of gravity, in newtons, and it depends on where the object is.', show: 'end.1' },
        { say: 'Weight equals mass times g. On Earth, g is nine point eight newtons per kilogram.', show: 'end.2' },
        { say: 'And to compare two worlds, find the mass first, then use the new value of g.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
