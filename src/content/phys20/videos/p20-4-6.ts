import type { Explainer, WaveEl, WaveLane } from '@/video/script.ts';

// Lesson 4.6, part 1: standing waves on a string. A steady wave meets its own reflection from a
// fixed end, and the two add up to a pattern that stays in place (src/video/wave.ts); then the
// patterns that fit a string fixed at both ends, with one, two and three loops. The lesson's
// numbers: nodes 0.6 m apart for a wavelength of 1.2 m, a string of 0.8 m at 240 m/s with three
// loops (450 Hz, three times its fundamental of 150 Hz), and a string of 1.5 m shaken at 60 Hz
// with four loops, where the waves travel at 45 m/s.

/**
 * A wave of 2 Hz at 4 m/s (a wavelength of 2 m) on a string tied to a wall 6 m along the ruler.
 * The hand is a sixth of a metre before the first node, where the standing wave moves the string
 * as far as the hand moves it, so the hand goes on shaking as before. The wave reaches the wall
 * after REACH seconds, and its reflection is back at the hand after twice that.
 */
const REACH = (6 + 1 / 6) / 4;
const made: WaveEl = {
  kind: 'wave',
  id: 'made',
  span: [-1 / 6, 6],
  height: 440,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'string', kind: 'transverse', frequency: 2, amplitude: 2, speed: 4, reflect: true }],
  poster: 'on',
  clips: {
    out: { phases: [{ dur: REACH, slow: 2.5, note: 'Slow motion' }] },
    back: { phases: [{ dur: REACH, slow: 3, note: 'Slow motion' }] },
    // The pattern is at its widest every quarter of a second after the wave first reached the wall: the clips stop then.
    stand: { phases: [{ dur: 2.25 - REACH, slow: 3, note: 'Slow motion' }, { dur: 1.5, slow: 3, note: 'Slow motion' }] },
    // Seven tenths of the way through this one, where the thumbnail is taken, is one of those moments too.
    on: { phases: [{ dur: 2.5, slow: 3, note: 'Slow motion' }] },
  },
};

/** A string with `loops` loops between its two fixed ends: the frequency that fits is loops × speed ÷ 2 × length. */
const string = (id: string, loops: number, length: number, speed: number, more: Partial<WaveLane> = {}): WaveLane => ({ id, kind: 'transverse', frequency: (loops * speed) / (2 * length), amplitude: 2, speed, standing: { loops }, ...more });

/** The lesson's string of 0.8 m, where waves travel at 240 m/s: one loop at 150 Hz, two at 300 Hz and three at 450 Hz. */
const fits: WaveEl = {
  kind: 'wave',
  id: 'fits',
  span: [0, 0.8],
  height: 560,
  ruler: false,
  lanes: [string('one', 1, 0.8, 240, { label: '1 loop: the fundamental' }), string('two', 2, 0.8, 240, { label: '2 loops' }), string('three', 3, 0.8, 240, { label: '3 loops' })],
  clips: {
    // Each clip stops an eighth of a period of the fundamental after a whole number of them, when no string is flat.
    go: { phases: [{ dur: 4.125 / 150, slow: 250, note: 'Slow motion' }] },
    on: { phases: [{ dur: 4 / 150, slow: 250, note: 'Slow motion' }] },
  },
};

/** The lesson's nodes: a wavelength of 1.2 m, so three loops of 0.6 m on a string of 1.8 m. */
const spacing: WaveEl = {
  kind: 'wave',
  id: 'spacing',
  span: [0, 1.8],
  height: 380,
  lanes: [string('string', 3, 1.8, 12)],
  // The clip stops with the string at its widest: a quarter of a period after five whole ones, at 10 Hz.
  clips: { go: { phases: [{ dur: 0.525, slow: 12, note: 'Slow motion' }] } },
};

/** The lesson's harmonic: three loops on 0.8 m at 240 m/s, a wavelength of 0.533 m and 450 Hz. */
const third: WaveEl = {
  kind: 'wave',
  id: 'third',
  span: [0, 0.8],
  height: 360,
  lanes: [string('string', 3, 0.8, 240)],
  clips: { go: { phases: [{ dur: 9.25 / 450, slow: 300, note: 'Slow motion' }] } },
};

/** The lesson's vibrator: 60 Hz on a string of 1.5 m with four loops, each 0.375 m long, so the waves travel at 45 m/s. */
const driven: WaveEl = {
  kind: 'wave',
  id: 'driven',
  span: [0, 1.5],
  height: 360,
  lanes: [string('string', 4, 1.5, 45)],
  clips: { go: { phases: [{ dur: 4.25 / 60, slow: 80, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'p20-4-6',
  lessonId: 'p20-4-6',
  title: 'Standing Waves',
  thumbnail: 'made',
  summary:
    'A wave that meets its own reflection adds up to a pattern that stays in one place: a standing wave, with nodes that never move and antinodes between them. See which patterns fit a string fixed at both ends, and use λ = 2L ÷ n and f = nv ÷ 2L for the fundamental and the harmonics.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Standing Waves', subtitle: 'Nodes, antinodes and harmonics' }],
      lines: [
        { say: 'Pluck a guitar string, and it does not look like a wave running back and forth. It looks like a blur with a fixed shape: wide in the middle, and still at the ends.', show: 'title' },
        { say: 'That shape is a standing wave. This lesson shows where it comes from, and which patterns fit on a string.' },
      ],
    },
    {
      chapter: 'A wave meets its reflection',
      layout: 'center',
      main: [made],
      lines: [
        { say: 'Shake one end of a string steadily. The wave runs along the string to its fixed end.', show: 'made', play: 'made.out' },
        { say: 'There it is reflected, and it travels back through the waves that are still arriving.', play: 'made.back' },
        { say: 'Two identical waves, travelling in opposite directions, add up to a pattern that stays in one place. This is a standing wave.', play: 'made.stand' },
        { say: 'Some points of the string never move, because the two waves always cancel there. These are the nodes. Half way between them are the antinodes, the points that move the most.', show: 'made.nodes', play: 'made.on' },
        { say: 'Neighbouring nodes are half a wavelength apart. So each loop of the pattern is half a wavelength long: here, one metre, for waves of wavelength two metres.', show: 'made.loop' },
      ],
    },
    {
      chapter: 'What fits on a string',
      layout: 'split',
      leftWidth: 640,
      left: [fits],
      right: [{ kind: 'math', id: 'f', size: 'md', lines: ['L = n \\times \\dfrac{\\lambda}{2}', '\\brand{\\lambda = \\dfrac{2L}{n}}', '\\brand{f = \\dfrac{nv}{2L}}'] }],
      lines: [
        { say: 'A string that is fixed at both ends must have a node at each end. So only certain patterns fit: those with a whole number of loops.', show: ['fits', 'fits.nodes'], play: 'fits.go' },
        { say: 'With one loop, half a wavelength fills the string. This is the lowest frequency the string can make. It is called the fundamental.', focus: 'fits.one' },
        { say: 'The patterns with two loops, three loops, and more, are the higher harmonics.', focus: ['fits.two', 'fits.three'], play: 'fits.on' },
        { say: 'With n loops on a string of length L, the length is n half wavelengths. So the wavelength is two L over n.', focus: 'fits', show: ['f.0', 'f.1'] },
        { say: 'And because the frequency is the speed over the wavelength, the frequencies that fit are n v over two L: the fundamental, twice the fundamental, three times, and so on.', show: 'f.2' },
      ],
    },
    {
      chapter: 'The spacing of the nodes',
      layout: 'center',
      main: [spacing, { kind: 'math', id: 'n', size: 'md', lines: ['\\dfrac{\\lambda}{2} = \\dfrac{1.2}{2} = \\good{0.6\\ \\text{m}}'] }],
      lines: [
        { say: 'A standing wave is set up on a string by waves of wavelength 1.2 metres. How far apart are neighbouring nodes?', show: ['spacing', 'spacing.nodes'], play: 'spacing.go' },
        { say: 'Neighbouring nodes are half a wavelength apart: 1.2 over two, which is 0.6 metres.', show: ['n.0', 'spacing.loop'] },
        { say: 'Be careful here. One loop, from a node to the next, is only half a wavelength. A whole wavelength is two loops.', show: 'spacing.wavelength' },
      ],
    },
    {
      chapter: 'The frequency of a harmonic',
      layout: 'center',
      main: [third, { kind: 'math', id: 'h', size: 'md', lines: ['\\lambda = \\dfrac{2L}{n} = \\dfrac{2 \\times 0.8}{3} = \\thc{0.5333\\ \\text{m}} \\qquad f = \\dfrac{v}{\\lambda} = \\dfrac{240}{0.5333} = \\good{450\\ \\text{Hz}}'] }],
      lines: [
        { say: 'A string 0.8 metres long is fixed at both ends, and waves travel along it at 240 metres per second. At what frequency does it vibrate with three loops?', show: ['third', 'third.nodes'], play: 'third.go' },
        { say: 'Three loops fill the string, so the wavelength is two times 0.8, over three: 0.5333 metres. The frequency is the speed over the wavelength: 240 over 0.5333, which is 450 hertz.', show: ['h.0', 'third.wavelength'] },
        { say: 'With one loop, the same string vibrates at 150 hertz. That is its fundamental, and 450 hertz is three times it.' },
      ],
    },
    {
      chapter: 'The speed of the waves',
      layout: 'center',
      main: [driven, { kind: 'math', id: 'v', size: 'md', lines: ['\\dfrac{\\lambda}{2} = \\dfrac{1.5}{4} = 0.375\\ \\text{m} \\qquad \\lambda = \\thc{0.75\\ \\text{m}} \\qquad v = f\\lambda = 60 \\times 0.75 = \\good{45\\ \\text{m/s}}'] }],
      lines: [
        { say: 'A standing wave also measures the speed of the waves. A vibrator shakes a string at 60 hertz. The string is 1.5 metres long, and a pattern with four loops appears.', show: ['driven', 'driven.nodes', 'driven.frequency'], play: 'driven.go' },
        { say: 'Each loop is 1.5 over four, which is 0.375 metres. That is half a wavelength, so the wavelength is 0.75 metres.', show: ['driven.loop', 'driven.wavelength'] },
        { say: 'The speed is the frequency times the wavelength: 60 times 0.75, which is 45 metres per second.', show: 'v.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A string 1.2 m long is fixed at both ends, and waves travel along it at 90 m/s. At what frequency does it vibrate with 2 loops?',
          choices: ['$37.5\\ \\text{Hz}$', '$150\\ \\text{Hz}$', '$75\\ \\text{Hz}$', '$108\\ \\text{Hz}$'],
          answer: 2,
          working: 'Two loops fill the string: $\\lambda = \\dfrac{2L}{n} = \\dfrac{2 \\times 1.2}{2} = 1.2\\ \\text{m}$. Then $f = \\dfrac{v}{\\lambda} = \\dfrac{90}{1.2} = 75\\ \\text{Hz}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A string 1.2 metres long is fixed at both ends, and waves travel along it at 90 metres per second. At what frequency does it vibrate with two loops? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Two loops fill the string, so the wavelength is two times 1.2, over two: 1.2 metres. The frequency is 90 over 1.2, which is 75 hertz. That is choice C. Choice B takes one loop for a whole wavelength.', show: 'q.answer' },
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
            'A **standing wave**: two identical waves in opposite directions',
            '**Nodes** never move; neighbouring nodes are $\\dfrac{\\lambda}{2}$ apart',
            'A string fixed at both ends, with $n$ loops: $\\lambda = \\dfrac{2L}{n}$',
            'The frequencies that fit: $f = \\dfrac{nv}{2L}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A standing wave is the pattern made by two identical waves travelling in opposite directions.', show: 'sum.0' },
        { say: 'Its nodes never move, and neighbouring nodes are half a wavelength apart.', show: 'sum.1' },
        { say: 'On a string fixed at both ends, with n loops, the wavelength is two L over n.', show: 'sum.2' },
        { say: 'And the frequencies that fit are n v over two L.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
