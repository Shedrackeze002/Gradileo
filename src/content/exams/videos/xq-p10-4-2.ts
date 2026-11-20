import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 4.2 (the wave equation): a seagull bobs up and down once every
// 2 s, and the crests are 3 m apart; what is the velocity of the wave? The question is OpenStax
// Physics' own, word for word (Problems, section 13.2, CC BY 4.0). One bob is one wave, so the
// period is 2 s and the frequency is 0.5 Hz: v = fλ = 0.5 × 3 = 1.5 m/s (choice a). 3 m/s, 6 m/s
// and 12 m/s would carry 2, 4 and 8 crests past the gull in each 2 s, not one.
//
// The picture (src/video/wave.ts) runs waves of 0.5 Hz and 3 m wavelength (1.5 m/s) past a marked
// seagull: the wavelength drawn comes from the speed and the frequency, and the front of a fresh
// wave shows the 3 m it covers in one period.

const water: WaveEl = {
  kind: 'wave',
  id: 'sea',
  span: [0, 9],
  height: 400,
  mark: 6,
  markLabel: 'the seagull',
  amplitudeUnit: 'm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'Water waves', frequency: 0.5, amplitude: 0.3, speed: 1.5, full: true }],
  poster: 'on',
  clips: {
    on: { reset: true, phases: [{ dur: 4 }] },
    bob: { reset: true, phases: [{ dur: 2, note: 'One bob: 2 seconds' }] },
  },
};

// The same waves starting from rest: in one period the front moves one wavelength.
const front: WaveEl = {
  kind: 'wave',
  id: 'fr',
  span: [0, 9],
  height: 400,
  amplitudeUnit: 'm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'The front of the waves', frequency: 0.5, amplitude: 0.3, speed: 1.5 }],
  clips: {
    two: { reset: true, phases: [{ dur: 2, slow: 1.5 }] },
    four: { reset: true, phases: [{ dur: 4 }] },
  },
};

const QUESTION =
  'If a seagull sitting in water bobs up and down once every 2 seconds and the distance between two crests of the water wave is 3 m, what is the velocity of the wave?';
const CHOICES = ['1.5 m/s', '3 m/s', '6 m/s', '12 m/s'];

const video: Explainer = {
  id: 'xq-p10-4-2',
  lessonId: '',
  exam: {
    lesson: 'p10-4-2',
    source: 'OpenStax, Physics, Problem for section 13.2, Wave Properties: Speed, Amplitude, Frequency, and Period',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/13-2-wave-properties-speed-amplitude-frequency-and-period',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Seagull Bobs on the Waves. How Fast Is the Wave?',
  thumbnailTitle: 'How Fast Is the Wave?',
  thumbnail: 'sea',
  summary:
    'A real test question, solved one small step at a time: a seagull bobs up and down once every 2 seconds, and the crests are 3 m apart, and we find the speed of the wave. We read the period and the wavelength from the question, turn the period into a frequency, and use the wave equation, v = fλ. Then we check the answer by watching the front of a wave and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Is the Wave?', subtitle: 'The wave equation, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a seagull bobbing on the waves. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          choices: ['$1.5$ m/s', '$3$ m/s', '$6$ m/s', '$12$ m/s'],
          answer: 0,
          working: 'One bob is one wave: $T = 2$ s, so $f = \\dfrac{1}{2} = 0.5$ Hz. Then $v = f\\lambda = 0.5 \\times 3 = 1.5$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If a seagull sitting in water bobs up and down once every two seconds, and the distance between two crests of the water wave is three metres, what is the velocity of the wave?' },
        { say: 'The choices are 1.5 metres per second, three, six, and twelve metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [water, { kind: 'text', id: 'plain', size: 'lg', md: 'How fast do the **crests** travel across the water?' }],
      lines: [
        { say: 'Let us picture it. Waves roll across the water, and the marked dot is the seagull, bobbing up and down as each wave passes under it.', show: ['sea', 'sea.particle'], play: 'sea.on', playDelay: 0.5 },
        { say: 'The seagull stays where it is. It is the wave that travels. The question asks: how fast do the crests move across the water?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'The wave equation',
          md: 'The **wavelength** $\\lambda$ is the distance from one crest to the next. The **period** $T$ is the time for one whole wave to pass, and the **frequency** is the waves each second: $f = \\dfrac{1}{T}$. The wave\'s speed is $v = f\\lambda$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$4$ waves a second, each $2$ m long: $v = 4 \\times 2 = 8$ m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. The wavelength is the distance from one crest to the next. The period is the time for one whole wave to pass, and the frequency is the number of waves each second: one over the period.', show: 'def' },
        { say: 'The speed of the wave is the frequency times the wavelength. That is the wave equation.' },
        { say: 'For example, if four waves pass each second, and each is two metres long, then eight metres of wave pass each second: eight metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Read the **period** and the **wavelength**', 'Turn the period into a **frequency**', 'Use $v = f\\lambda$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, read the period and the wavelength from the question.', show: 'plan.0' },
        { say: 'Second, turn the period into a frequency.', show: 'plan.1' },
        { say: 'Third, multiply the frequency by the wavelength.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Period and wavelength',
      layout: 'center',
      main: [water, { kind: 'math', id: 'm', size: 'md', lines: ['T = \\adj{2\\ \\text{s}} \\qquad \\lambda = \\opp{3\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. Each time one whole wave passes, the seagull bobs up and down once. So once every two seconds means one wave every two seconds: the period is two seconds.', show: ['sea', 'sea.particle', 'sea.clock'], play: 'sea.bob', playDelay: 0.3 },
        { say: 'The distance between two crests is the wavelength: three metres.', show: ['sea.wavelength', 'm.0'] },
      ],
    },
    {
      chapter: 'Step 2: The frequency',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f = \\dfrac{1}{T} = \\dfrac{1}{2\\ \\text{s}}', '= \\adj{0.5\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Step two. If one wave takes two seconds, how many waves pass in one second? One over two.', show: 'm.0' },
        { say: 'Half a wave each second: a frequency of 0.5 hertz.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = f\\lambda = 0.5\\ \\text{Hz} \\times 3\\ \\text{m}', '= \\good{1.5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. The speed is the frequency times the wavelength: 0.5 times three.', show: 'm.0' },
        { say: '1.5 metres per second. That is choice A.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [front, { kind: 'math', id: 'm', size: 'md', lines: ['v = \\dfrac{\\lambda}{T} = \\dfrac{3\\ \\text{m}}{2\\ \\text{s}} = 1.5\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the water. Here the waves start from rest, and the marker rides on the front of the very first wave.', show: ['fr', 'fr.front', 'fr.clock'] },
        { say: 'In one period, two seconds, the front moves forward exactly one wavelength: three metres.', play: 'fr.two', playDelay: 0.3 },
        { say: 'Three metres every two seconds is 1.5 metres every second. The same answer.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'In each $2$ s, the crests would move', 'So the gull would bob'],
          rows: [
            ['$3$ m/s', '$6$ m: **two** wavelengths', '**twice**, not once'],
            ['$6$ m/s', '$12$ m: **four** wavelengths', '**four** times'],
            ['$12$ m/s', '$24$ m: **eight** wavelengths', '**eight** times'],
            ['$1.5$ m/s', '$3$ m: **one** wavelength', 'once: correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices, and a neat way to see why they are wrong.', show: 'traps' },
        { say: 'Three metres per second just gives the wavelength as the speed. At that speed, two crests would pass the seagull in every two seconds, and it would bob twice, not once.' },
        { say: 'Six metres per second multiplies the wavelength by the period, instead of dividing. Four crests would pass in two seconds. And twelve metres per second would be eight.' },
        { say: 'Only 1.5 metres per second carries exactly one crest past the seagull every two seconds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A wave on a rope has a frequency of 4 Hz and a wavelength of 0.5 m. What is the speed of the wave?',
          choices: ['8 m/s', '0.125 m/s', '4.5 m/s', '2 m/s'],
          answer: 3,
          working: '$v = f\\lambda = 4 \\times 0.5 = 2$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A wave on a rope has a frequency of four hertz and a wavelength of 0.5 metres. What is the speed of the wave? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Speed is frequency times wavelength: four times 0.5 is two metres per second. That is choice D. Eight divided the frequency by the wavelength, and 4.5 added them.', show: 'q2.answer' },
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
          items: ['One bob $=$ one wave: the time is the **period**', 'Crest to crest is the **wavelength**', '$f = \\dfrac{1}{T}$, then $v = f\\lambda$', 'Check: in one period, the wave moves **one wavelength**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Something floating bobs once for each wave, so the time for one bob is the period.', show: 'sum.0' },
        { say: 'The distance from crest to crest is the wavelength.', show: 'sum.1' },
        { say: 'The frequency is one over the period, and the speed is the frequency times the wavelength.', show: 'sum.2' },
        { say: 'And in one period, the wave moves forward exactly one wavelength. For more on the wave equation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
