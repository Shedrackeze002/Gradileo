import type { Explainer, WaveEl } from '@/video/script.ts';

// Lesson 4.2: frequency and period, and the wave equation v = fλ. A post counts ten waves in five
// seconds; a source starting from rest sends out two waves of 1.5 m in one second, so the front
// has moved 3 m; and two ropes with the same speed show that a higher frequency means a shorter
// wavelength. The numbers on screen are measured from the waves themselves (src/video/wave.ts).

// A wave at 2 Hz and 3 m/s, already along the whole rope: ten waves pass the post in five seconds.
const counting: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 9],
  height: 400,
  mark: 6,
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 2, amplitude: 2, speed: 3, full: true }],
  poster: 'count',
  clips: {
    count: { phases: [{ dur: 5 }] },
  },
};

// The same source starting from rest: one second of it, slowed down.
const second: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 9],
  height: 400,
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 2, amplitude: 2, speed: 3 }],
  clips: {
    one: { phases: [{ dur: 1, slow: 5, note: 'Slow motion' }] },
  },
};

// Two ropes of the same kind, so the same speed: 1 Hz against 3 Hz.
const pair: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 9],
  height: 480,
  lanes: [
    { id: 'low', kind: 'transverse', label: 'Frequency 1 Hz', frequency: 1, amplitude: 2, speed: 3, full: true },
    { id: 'high', kind: 'transverse', label: 'Frequency 3 Hz', frequency: 3, amplitude: 2, speed: 3, full: true },
  ],
  clips: {
    go: { phases: [{ dur: 5 }] },
  },
};

const video: Explainer = {
  id: 'p10-4-2',
  lessonId: 'p10-4-2',
  title: 'The Wave Equation',
  thumbnail: 'w',
  summary:
    'How fast does a wave travel? Count the waves that pass a post each second to find the frequency, measure the distance between crests to find the wavelength, and multiply: wave speed = frequency × wavelength. Watch a source send out two waves in one second, and see why a higher frequency means a shorter wavelength.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Waves, Sound and Light', title: 'The Wave Equation', subtitle: 'Speed = frequency × wavelength' }],
      lines: [
        { say: 'Stand on a pier, and watch the waves roll past a post. You can count how many pass each second, and you can see how far apart the crests are.', show: 'title' },
        { say: 'Those two numbers are enough to tell you how fast the waves are travelling. In this lesson, you will see why.' },
      ],
    },
    {
      chapter: 'Frequency and period',
      layout: 'center',
      main: [
        counting,
        { kind: 'math', id: 'f', size: 'md', lines: ['f = \\dfrac{\\text{number of waves}}{\\text{time}} = \\dfrac{10}{5} = \\thc{2\\ \\text{Hz}} \\qquad T = \\dfrac{1}{f} = \\dfrac{1}{2} = \\thc{0.5\\ \\text{s}}'] },
      ],
      lines: [
        { say: 'Here is a wave on a rope, and a yellow post. Count the complete waves that pass the post in five seconds.', show: ['w', 'w.count', 'w.clock'], play: 'w.count', playDelay: 4 },
        { say: 'Ten waves passed in five seconds. The frequency is the number of waves divided by the time. Ten divided by five is two waves each second, or two hertz.', show: 'f' },
        { say: 'The period is the time for one complete wave. It is one divided by the frequency. One divided by two is half a second.' },
        { say: 'So a high frequency means a short period. A wave of one hundred hertz has a period of only one hundredth of a second.' },
      ],
    },
    {
      chapter: 'The wave equation',
      layout: 'center',
      main: [second, { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{wave speed} = \\text{frequency} \\times \\text{wavelength} \\qquad \\good{v} = f\\lambda = 2 \\times 1.5 = \\good{3\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Now the same source starts from rest. Watch what it sends out in exactly one second.', show: ['w', 'w.clock', 'w.front'], play: 'w.one', playDelay: 3.5 },
        { say: 'In one second the source made two complete waves, because its frequency is two hertz. And each wave is one point five metres long. That is the wavelength.', show: 'w.wavelength' },
        { say: 'So in one second, the front of the wave moved two wavelengths. Two times one point five is three metres. The wave travels three metres every second, and that is its speed.', focus: 'w.rope' },
        { say: 'This is the wave equation. Wave speed equals frequency times wavelength. In symbols, v equals f times lambda. Lambda is the Greek letter we use for wavelength.', caption: 'This is the wave equation. Wave speed equals frequency times wavelength. In symbols, v = fλ. Lambda (λ) is the Greek letter we use for wavelength.', show: 'eq' },
        { say: 'With the frequency in hertz and the wavelength in metres, the speed comes out in metres per second.' },
      ],
    },
    {
      chapter: 'Same speed, different frequency',
      layout: 'center',
      main: [pair, { kind: 'math', id: 'both', size: 'md', lines: ['v = f\\lambda: \\qquad 1 \\times 3 = \\good{3\\ \\text{m/s}} \\qquad 3 \\times 1 = \\good{3\\ \\text{m/s}}'] }],
      lines: [
        { say: 'The speed of a wave is set by what it travels through, not by the source. These two ropes are the same, so both waves travel at three metres per second.', show: ['w', 'w.speed'], play: 'w.go', playDelay: 2 },
        { say: 'The top source moves up and down once each second. The bottom one moves three times each second. Now look at their wavelengths.', show: 'w.wavelength' },
        { say: 'Three times the frequency gives one third of the wavelength. One times three is three, and three times one is three. The speed is the same.', show: 'both' },
        { say: 'So at the same speed, a higher frequency always means a shorter wavelength.', hide: 'w.wavelength', play: 'w.go' },
      ],
    },
    {
      chapter: 'Using the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'forms', size: 'lg', lines: ['v = f\\lambda \\qquad f = \\dfrac{v}{\\lambda} \\qquad \\lambda = \\dfrac{v}{f}'] },
        { kind: 'math', id: 'ex', size: 'md', lines: ['\\text{rope: } f = \\dfrac{v}{\\lambda} = \\dfrac{6}{1.5} = \\thc{4\\ \\text{Hz}}', '\\text{sound: } \\lambda = \\dfrac{v}{f} = \\dfrac{340}{680} = \\thc{0.5\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'The wave equation can be turned round. Frequency is speed divided by wavelength. And wavelength is speed divided by frequency.', show: 'forms' },
        { say: 'A wave on a rope travels at six metres per second, with a wavelength of one point five metres. Its frequency is six divided by one point five, which is four hertz.', show: 'ex.0' },
        { say: 'A sound wave travels at three hundred and forty metres per second in air, with a frequency of six hundred and eighty hertz. Its wavelength is three hundred and forty divided by six hundred and eighty, which is half a metre.', show: 'ex.1' },
        { say: 'Always check the units first. A frequency in kilohertz must be changed to hertz. One kilohertz is one thousand hertz.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A water wave has a frequency of 5 Hz and a wavelength of 0.8 m. What is its speed?',
          choices: ['0.16 m/s', '5.8 m/s', '6.25 m/s', '4 m/s'],
          answer: 3,
          working: 'Wave speed = frequency × wavelength: $v = f\\lambda = 5 \\times 0.8 = 4\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A water wave has a frequency of five hertz and a wavelength of zero point eight metres. What is its speed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Wave speed is frequency times wavelength. Five times zero point eight is four metres per second. That is choice D.', show: 'q.answer' },
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
            'Frequency = number of waves ÷ time, in hertz',
            'Period = 1 ÷ frequency: the time for one wave',
            'Wave speed = frequency × wavelength: v = fλ',
            'At the same speed, a higher frequency means a shorter wavelength',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Frequency is the number of waves divided by the time, measured in hertz.', show: 'end.0' },
        { say: 'The period is one divided by the frequency. It is the time for one wave.', show: 'end.1' },
        { say: 'Wave speed equals frequency times wavelength.', show: 'end.2' },
        { say: 'And at the same speed, a higher frequency means a shorter wavelength.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
