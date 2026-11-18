import type { Explainer, MotionEl, MotionPhase, WaveEl, WaveLane } from '@/video/script.ts';

// Lesson 4.6, part 2: resonance and air columns. A block on a spring has a natural frequency of
// 1 Hz; small pushes once a second build a large oscillation, and the same pushes every 0.7 s do
// not (the motion is worked out from the pushes and the spring, src/video/motion.ts). Then the
// air in a tube closed at one end (src/video/wave.ts): columns of a quarter, three quarters and
// five quarters of a wavelength, the lesson's shortest column for 512 Hz (16.6 cm), and its
// measurement of the speed of sound from resonances at 18.9 cm and 58.3 cm (347 m/s).

/** A block of 0.5 kg on a spring that makes its period exactly 1 s: k = 4π²m. */
const M = 0.5;
const K = 4 * Math.PI ** 2 * M;
const block = (id: string, x: number, clips: MotionEl['clips'], more: Partial<MotionEl> = {}): MotionEl => ({
  kind: 'motion',
  id,
  span: [0, 0.5],
  bodies: [{ id: 'block', shape: 'block', mass: M, label: '', x, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: K, rest: 0.25, hidden: true },
  equilibrium: 0.25,
  cm: true,
  height: 400,
  clips,
  ...more,
});

/** Left alone, 6 cm out: four oscillations in 4 s. */
const own = block('own', 0.31, { go: { phases: [{ dur: 4 }] } });

/** Pushes of 0.5 N that last an eighth of a second, one every `every` seconds, `n` times over. */
const pushes = (every: number, n: number): MotionPhase[] => Array.from({ length: n }, () => [{ dur: 0.125, forces: [{ on: 'block', name: 'Push', n: 0.5, tone: 'opp' as const }] }, { dur: every - 0.125 }]).flat();

/** Pushed once a second, in step with its own period: each push adds about 2 cm to the amplitude. */
const instep = block('instep', 0.25, { go: { phases: pushes(1, 7) } }, { lanes: [{ label: 'One push every 1 s' }], forceScale: 110, height: 380, poster: 'go' });
/** The same pushes every 0.7 s, for the same 7 s: they work against the motion as often as with it. */
const offstep = block('offstep', 0.25, { go: { phases: pushes(0.7, 10) } }, { lanes: [{ label: 'One push every 0.7 s' }], forceScale: 110, height: 380 });

/** The air in a tube closed at the left and open at the right, holding `quarters` quarter wavelengths of a sound. */
const column = (id: string, quarters: number, frequency: number, speed: number, more: Partial<WaveLane> & { beyond?: number } = {}): WaveLane => {
  const { beyond = 0, ...rest } = more;
  return { id, kind: 'longitudinal', frequency, amplitude: 2, speed, standing: { quarters, length: (quarters * speed) / (4 * frequency) - beyond, beyond }, ...rest };
};

/** How long a clip of a standing wave of `f` hertz runs to stop with the air at its farthest: a quarter of a period after `n` whole ones. */
const widest = (n: number, f: number) => (n + 0.25) / f;

/** A fork of 512 Hz, where sound travels at 340 m/s: the columns that resonate are 16.6 cm, 49.8 cm and 83.0 cm long. */
const columns: WaveEl = {
  kind: 'wave',
  id: 'columns',
  span: [0, 0.9],
  height: 560,
  lanes: [column('one', 1, 512, 340, { label: 'A quarter of a wavelength' }), column('three', 3, 512, 340, { label: 'Three quarters' }), column('five', 5, 512, 340, { label: 'Five quarters' })],
  clips: {
    go: { phases: [{ dur: widest(4, 512), slow: 700, note: 'Slow motion' }] },
    on: { phases: [{ dur: widest(3, 512) - 0.25 / 512, slow: 700, note: 'Slow motion' }] },
  },
};

/** The lesson's shortest column for 512 Hz: a quarter of 0.6641 m. */
const shortest: WaveEl = {
  kind: 'wave',
  id: 'shortest',
  span: [0, 0.3],
  height: 330,
  lanes: [column('air', 1, 512, 340)],
  clips: { go: { phases: [{ dur: widest(4, 512), slow: 700, note: 'Slow motion' }] } },
};

/**
 * The lesson's measurement: a fork of 440 Hz resonates with columns of 18.9 cm and 58.3 cm. They
 * differ by half a wavelength, so the wavelength is 0.788 m and the speed 440 × 0.788 = 347 m/s.
 * Each antinode sits 0.8 cm beyond the open end, which is why 18.9 cm is not quite a quarter of 78.8 cm.
 */
const SOUND = 440 * 0.788;
const measured: WaveEl = {
  kind: 'wave',
  id: 'measured',
  span: [0, 0.65],
  height: 370,
  lanes: [column('first', 1, 440, SOUND, { label: 'Loudest', beyond: 0.008 }), column('second', 3, 440, SOUND, { label: 'Loudest again', beyond: 0.008 })],
  clips: { go: { phases: [{ dur: widest(3, 440), slow: 700, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'p20-4-6-b',
  lessonId: 'p20-4-6',
  title: 'Standing Waves, Part 2: Resonance and Air Columns',
  thumbnailTitle: 'Resonance',
  thumbnail: 'instep',
  summary:
    'Small pushes in step with an object’s natural frequency build a large vibration: resonance. See it on a block and a spring, then in the air of a tube closed at one end, where the columns that resonate are a quarter, three quarters and five quarters of a wavelength long, and use two resonant lengths to measure the speed of sound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Resonance', subtitle: 'Natural frequencies and air columns' }],
      lines: [
        { say: 'A singer holds one note, and a wine glass shatters. A child on a swing goes higher and higher, with only gentle pushes.', show: 'title' },
        { say: 'Both are examples of resonance. This lesson explains it, and then uses it to measure the speed of sound.' },
      ],
    },
    {
      chapter: 'Natural frequency',
      layout: 'center',
      main: [own],
      lines: [
        { say: 'Pull this block to one side, let go, and leave it alone. It oscillates at a rate of its own.', show: ['own', 'own.count', 'own.clock'], play: 'own.go', playDelay: 4 },
        { say: 'Four oscillations in four seconds: one each second. That is the natural frequency of this block and spring, one hertz. Every object that can vibrate has one or more natural frequencies.' },
      ],
    },
    {
      chapter: 'Resonance',
      layout: 'split',
      leftWidth: 544,
      left: [instep],
      right: [offstep],
      lines: [
        { say: 'Now start from rest, and give the block small pushes. On the left, one push each second, in step with its natural frequency. On the right, the same pushes, but one every 0.7 seconds.', show: ['instep', 'offstep'] },
        { say: 'Watch what each set of pushes builds up.', show: ['instep.clock', 'offstep.clock'], play: ['instep.go', 'offstep.go'], playDelay: 1 },
        { say: 'On the left, every push arrives in step with the motion, so the energy adds up, and the oscillation grows large. This is resonance: the large vibration that builds up when an object is driven at one of its natural frequencies.' },
        { say: 'On the right, the pushes work against the motion about as often as with it, and the oscillation stays small.' },
        { say: 'It is how you push a child on a swing. It is why a singer can shatter a wine glass only with a note at the natural frequency of the glass. And engineers make sure that wind and footsteps do not drive a bridge at one of its natural frequencies.' },
      ],
    },
    {
      chapter: 'Air columns',
      layout: 'split',
      leftWidth: 640,
      left: [columns],
      right: [{ kind: 'math', id: 'l', size: 'md', lines: ['L_1 = \\dfrac{\\lambda}{4}', 'L_2 = \\dfrac{3\\lambda}{4}', 'L_3 = \\dfrac{5\\lambda}{4}'] }],
      lines: [
        { say: 'The air in a tube has natural frequencies too. Hold a vibrating tuning fork over a tube that is closed at the other end, and for certain lengths of air column the sound becomes much louder. The air is resonating.', show: 'columns', play: 'columns.go' },
        { say: 'It holds a standing wave. There must be a node at the closed end, where the air cannot move, and an antinode at the open end, where it is free.', show: 'columns.nodes' },
        { say: 'The shortest column that fits is a quarter of a wavelength long. The next is three quarters of a wavelength, and the next is five quarters.', show: ['l.0', 'l.1', 'l.2'], play: 'columns.on' },
        { say: 'So the lengths that resonate are half a wavelength apart.' },
      ],
    },
    {
      chapter: 'The shortest column',
      layout: 'center',
      main: [shortest, { kind: 'math', id: 's', size: 'md', lines: ['\\lambda = \\dfrac{v}{f} = \\dfrac{340}{512} = \\thc{0.6641\\ \\text{m}} \\qquad L = \\dfrac{\\lambda}{4} = \\dfrac{0.6641}{4} = \\good{0.166\\ \\text{m}}'] }],
      lines: [
        { say: 'The speed of sound in the air is 340 metres per second. A tuning fork of frequency 512 hertz is held over a tube that is closed at the bottom by water. What is the shortest air column that resonates?', show: ['shortest', 'shortest.nodes'], play: 'shortest.go' },
        { say: 'First the wavelength: 340 over 512, which is 0.6641 metres. The shortest column is a quarter of that: 0.166 metres, or 16.6 centimetres.', show: ['s.0', 'shortest.length'] },
      ],
    },
    {
      chapter: 'Measuring the speed of sound',
      layout: 'center',
      main: [measured, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\lambda}{2} = 58.3 - 18.9 = 39.4\\ \\text{cm} \\qquad \\lambda = \\thc{0.788\\ \\text{m}}', 'v = f\\lambda = 440 \\times 0.788 = \\good{347\\ \\text{m/s}}'] }],
      lines: [
        { say: 'This gives a neat way to measure the speed of sound. A fork of 440 hertz is held over a tube whose air column can be changed. The sound is loudest when the column is 18.9 centimetres long, and loudest again at 58.3 centimetres.', show: ['measured', 'measured.nodes', 'measured.length'], play: 'measured.go' },
        { say: 'Look at the open ends. The real antinode sits a little outside the tube, so one length alone gives a slightly wrong wavelength. The difference between two resonant lengths does not have that problem.' },
        { say: 'The two lengths differ by half a wavelength: 39.4 centimetres. So the wavelength is 0.788 metres, and the speed is 440 times 0.788, which is 347 metres per second.', show: ['m.0', 'm.1'] },
        { say: 'Remember that the gap between two resonances is half a wavelength, not a quarter. Double the gap to find the wavelength.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tuning fork of frequency 256 Hz is held over a tube that is closed at one end. The speed of sound in the air is 340 m/s. What is the shortest air column that resonates?',
          choices: ['$133\\ \\text{cm}$', '$66.4\\ \\text{cm}$', '$99.6\\ \\text{cm}$', '$33.2\\ \\text{cm}$'],
          answer: 3,
          working: 'Wavelength: $\\lambda = \\dfrac{v}{f} = \\dfrac{340}{256} = 1.328\\ \\text{m}$. The shortest column is a quarter of a wavelength: $L = \\dfrac{1.328}{4} = 0.332\\ \\text{m} = 33.2\\ \\text{cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A tuning fork of frequency 256 hertz is held over a tube that is closed at one end. The speed of sound in the air is 340 metres per second. What is the shortest air column that resonates? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The wavelength is 340 over 256, which is 1.328 metres. The shortest column is a quarter of that: 0.332 metres, or 33.2 centimetres. That is choice D. Choice B is half a wavelength, which is the gap between one resonance and the next.', show: 'q.answer' },
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
            '**Resonance**: driving at a natural frequency builds a large vibration',
            'A tube closed at one end: **node** at the closed end, **antinode** at the open end',
            'Resonant lengths: $\\dfrac{\\lambda}{4}$, $\\dfrac{3\\lambda}{4}$, $\\dfrac{5\\lambda}{4}$, half a wavelength apart',
            'Double the gap between two resonances for $\\lambda$; then $v = f\\lambda$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Resonance is the large vibration that builds up when an object is driven at one of its natural frequencies.', show: 'sum.0' },
        { say: 'The air in a tube closed at one end has a node at the closed end, and an antinode at the open end.', show: 'sum.1' },
        { say: 'The lengths that resonate are a quarter, three quarters and five quarters of a wavelength: half a wavelength apart.', show: 'sum.2' },
        { say: 'And to measure the speed of sound, double the gap between two resonances for the wavelength, and multiply by the frequency.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
