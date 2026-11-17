import type { Explainer, WaveEl } from '@/video/script.ts';

// Lesson 4.4, part 2: the universal wave equation, v = fλ. A source that starts from rest sends a
// wave 1.5 m forward in each period of 0.25 s, so 6 m in a second; a sound of 440 Hz has a
// wavelength of 0.773 m; ten waves 3 m apart pass a pier in 20 s; and a wave of 5 Hz passes from a
// rope where it travels at 10 m/s into a heavier one where it travels at 4 m/s. The wavelengths on
// screen are measured from the waves themselves (src/video/wave.ts).

/** The lesson's first example: 4 Hz and 6 m/s, starting from rest. One period, and then the rest of a second. */
const first: WaveEl = {
  kind: 'wave',
  id: 'first',
  span: [0, 9],
  height: 400,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 4, amplitude: 2, speed: 6 }],
  poster: 'rest',
  clips: {
    one: { phases: [{ dur: 0.25, slow: 14, note: 'Slow motion' }] },
    rest: { phases: [{ dur: 0.75, slow: 8, note: 'Slow motion' }] },
  },
};

/** A sound of 440 Hz in air, where sound travels at 340 m/s: compressions 0.773 m apart. */
const sound: WaveEl = {
  kind: 'wave',
  id: 'sound',
  span: [0, 3.4],
  height: 330,
  lanes: [{ id: 'air', kind: 'longitudinal', label: 'A sound of 440 Hz in air', frequency: 440, amplitude: 2, speed: 340, full: true }],
  clips: {
    go: { phases: [{ dur: 0.012, slow: 700, note: 'Slow motion' }] },
  },
};

/** The lesson's pier: ten waves pass in 20 s, and the crests are 3 m apart, so the waves travel at 1.5 m/s. */
const pier: WaveEl = {
  kind: 'wave',
  id: 'pier',
  span: [0, 12],
  height: 330,
  mark: 9.5,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'Waves passing a pier', frequency: 0.5, amplitude: 30, speed: 1.5, full: true }],
  clips: {
    count: { phases: [{ dur: 20, slow: 0.5, note: 'Twice as fast' }] },
  },
};

/** A light rope over a heavy one, shaken together: first at 2 Hz, and then at 4 Hz. */
const ropes: WaveEl = {
  kind: 'wave',
  id: 'ropes',
  span: [0, 9],
  height: 500,
  lanes: [
    { id: 'light', kind: 'transverse', label: 'A light rope', frequency: 2, amplitude: 2, speed: 6, full: true },
    { id: 'heavy', kind: 'transverse', label: 'A heavy rope', frequency: 2, amplitude: 2, speed: 3, full: true },
  ],
  clips: {
    slow: { phases: [{ dur: 1.5, slow: 4, note: 'Slow motion' }] },
    faster: { phases: [{ dur: 3.5, slow: 2.5, note: 'Slow motion', set: { light: { frequency: 4 }, heavy: { frequency: 4 } } }] },
  },
};

/** The lesson's join: 5 Hz at 10 m/s, into a heavier rope at 4 m/s. The wavelength goes from 2 m to 0.8 m. */
const join: WaveEl = {
  kind: 'wave',
  id: 'join',
  span: [0, 10],
  height: 380,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 5, amplitude: 2, speed: 10, medium: { from: 6, speed: 4 } }],
  clips: {
    in: { phases: [{ dur: 1.8, slow: 5, note: 'Slow motion' }] },
    on: { phases: [{ dur: 1.2, slow: 6, note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'p20-4-4-b',
  lessonId: 'p20-4-4',
  title: 'Wave Properties, Part 2: The Universal Wave Equation',
  thumbnailTitle: 'The Wave Equation',
  thumbnail: 'first',
  summary:
    'In one period, a wave moves forward by one wavelength, so its speed is its frequency times its wavelength. Use v = fλ for a wave on a rope, a sound and waves at a pier, then see that the source sets the frequency and the medium sets the speed, and what happens when a wave passes into a heavier rope.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'The Universal Wave Equation', subtitle: 'Speed, frequency and wavelength' }],
      lines: [
        { say: 'A wave has a frequency, a wavelength, and a speed. The three are tied together by one short equation.', show: 'title' },
        { say: 'It works for every wave: on a rope, on water, in the air, and for light.' },
      ],
    },
    {
      chapter: 'One wavelength in each period',
      layout: 'center',
      main: [first, { kind: 'math', id: 'v', size: 'md', lines: ['v = \\dfrac{\\lambda}{T} \\qquad \\brand{v = f\\lambda} \\qquad v = 4 \\times 1.5 = \\good{6\\ \\text{m/s}}'] }],
      lines: [
        { say: 'This source shakes a rope four times each second, so its period is a quarter of a second. Watch the front of the wave for one period.', show: ['first', 'first.front'], play: 'first.one', playDelay: 6 },
        { say: 'In one period the source made one complete wave, and the front moved forward by one wavelength: 1.5 metres.', show: 'first.wavelength' },
        { say: 'So the speed of a wave is one wavelength, over one period. And because one over the period is the frequency, the speed is the frequency times the wavelength.', show: 'v.0' },
        { say: 'This is the universal wave equation. Here, four hertz times 1.5 metres is six metres per second. Check it: let the wave run for the rest of one second.', play: 'first.rest', playDelay: 7 },
        { say: 'In one second the source sent out four waves, each 1.5 metres long, and the front travelled six metres.' },
      ],
    },
    {
      chapter: 'The wavelength of a sound',
      layout: 'center',
      main: [sound, { kind: 'math', id: 's', size: 'md', lines: ['\\lambda = \\dfrac{v}{f} = \\dfrac{340}{440} = \\brand{0.773\\ \\text{m}}'] }],
      lines: [
        { say: 'The equation can be turned round. The speed of sound in the air is 340 metres per second. What is the wavelength of a sound of frequency 440 hertz?', show: 'sound', play: 'sound.go' },
        { say: 'Divide both sides by the frequency. The wavelength is the speed over the frequency: 340 over 440, which is 0.773 metres.', show: 's.0' },
        { say: 'That is the distance from one compression to the next.', show: 'sound.wavelength' },
      ],
    },
    {
      chapter: 'Waves at a pier',
      layout: 'center',
      main: [pier, { kind: 'math', id: 'p', size: 'md', lines: ['f = \\dfrac{10}{20} = \\good{0.5\\ \\text{Hz}} \\qquad \\lambda = 3\\ \\text{m} \\qquad v = 0.5 \\times 3 = \\thc{1.5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'An angler watches waves pass the end of a pier. The crests are three metres apart. Count the waves that pass in twenty seconds.', show: ['pier', 'pier.wavelength', 'pier.count', 'pier.clock'], play: 'pier.count', playDelay: 6 },
        { say: 'Ten waves passed in twenty seconds, so the frequency is 0.5 hertz. The distance between the crests is the wavelength: three metres.' },
        { say: 'So the speed is 0.5 times three, which is 1.5 metres per second.', show: 'p.0' },
      ],
    },
    {
      chapter: 'Who decides what',
      layout: 'center',
      main: [ropes],
      lines: [
        { say: 'Which of the three can you choose? Here are two ropes, a light one and a heavy one. Both are shaken twice each second.', show: ['ropes', 'ropes.frequency'], play: 'ropes.slow' },
        { say: 'The waves travel faster on the light rope: six metres per second, against three. The medium sets the speed, whatever the frequency.', show: 'ropes.speed' },
        { say: 'The wavelength then follows from the speed over the frequency: three metres on the light rope, and 1.5 on the heavy one.', show: 'ropes.wavelength' },
        { say: 'Now shake both ropes twice as often. The source sets the frequency. The speeds do not change, so each wavelength is halved.', play: 'ropes.faster' },
      ],
    },
    {
      chapter: 'Into a heavier rope',
      layout: 'center',
      main: [join, { kind: 'math', id: 'j', size: 'md', lines: ['\\lambda_1 = \\dfrac{10}{5} = \\brand{2\\ \\text{m}} \\qquad f = 5\\ \\text{Hz on both sides} \\qquad \\lambda_2 = \\dfrac{4}{5} = \\thc{0.8\\ \\text{m}}'] }],
      lines: [
        { say: 'Now tie the light rope to a heavy one. A wave of five hertz travels along the light rope at ten metres per second. In the heavy rope, it travels at only four.', show: ['join', 'join.speed', 'join.frequency'], play: 'join.in', playDelay: 3 },
        { say: 'Each wave that arrives at the join sends exactly one wave on. So the same number of waves pass each second on both sides: the frequency cannot change.', play: 'join.on' },
        { say: 'In the light rope the wavelength is ten over five: two metres. In the heavy rope it is four over five: 0.8 metres.', show: ['join.wavelength', 'j.0'] },
        { say: 'So when a wave passes into a new medium, its frequency stays the same, its speed changes, and its wavelength changes with the speed. A slower medium gives a shorter wavelength, not a lower frequency.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A wave travels along a spring at 12 m/s with a frequency of 8 Hz. What is its wavelength?',
          choices: ['$96\\ \\text{m}$', '$0.67\\ \\text{m}$', '$20\\ \\text{m}$', '$1.5\\ \\text{m}$'],
          answer: 3,
          working: 'Rearrange $v = f\\lambda$: $\\lambda = \\dfrac{v}{f} = \\dfrac{12}{8} = 1.5\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A wave travels along a spring at twelve metres per second, with a frequency of eight hertz. What is its wavelength? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The wavelength is the speed over the frequency: twelve over eight, which is 1.5 metres. That is choice D. Multiplying the two gives 96, which is not a wavelength at all.', show: 'q.answer' },
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
            'Universal wave equation: $v = f\\lambda$',
            'Rearranged: $\\lambda = \\dfrac{v}{f}$ and $f = \\dfrac{v}{\\lambda}$',
            'The **source** sets the frequency; the **medium** sets the speed',
            'In a new medium the frequency **stays the same**; the wavelength changes',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The universal wave equation: the speed is the frequency times the wavelength.', show: 'sum.0' },
        { say: 'Rearranged, the wavelength is the speed over the frequency.', show: 'sum.1' },
        { say: 'The source sets the frequency, and the medium sets the speed.', show: 'sum.2' },
        { say: 'And in a new medium the frequency stays the same, while the wavelength changes with the speed.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
