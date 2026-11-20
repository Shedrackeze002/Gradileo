import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for lesson 4.4 (the properties of a wave): a boat in a trough takes 3 seconds to
// reach the crest of a wave travelling at 5 m/s; what is the wavelength? The question is OpenStax
// Physics' own, word for word (Problems, section 13.2, CC BY 4.0). From a trough up to a crest is
// half a wave, so the period is 6 s, and λ = vT = 5 × 6 = 30 m (choice c). 15 m takes 3 s as the
// period, 0.83 m is v ÷ T, and 180 m is v × T².
//
// The picture (src/video/wave.ts) runs waves of 1/6 Hz at 5 m/s past a marked boat, so the
// wavelength drawn (30 m) comes out of the speed and frequency, and is not typed in. The boat sits
// at 37.5 m, a quarter of a wave plus one wave from the source, which puts it in a trough as each
// clip starts: the source's phase there is 2π(t ÷ 6) − π/2.

const wave: WaveEl = {
  kind: 'wave',
  id: 'sea',
  span: [0, 60],
  height: 380,
  mark: 37.5,
  markLabel: 'the boat',
  amplitudeUnit: 'm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'Waves on the sea, travelling at 5 m/s', frequency: 1 / 6, amplitude: 1, speed: 5, full: true }],
  poster: 'whole',
  clips: {
    rise: { reset: true, phases: [{ dur: 3, slow: 1.5, note: 'Slow motion' }] },
    whole: { reset: true, phases: [{ dur: 6 }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-4-4',
  lessonId: '',
  exam: {
    lesson: 'p20-4-4',
    source: 'OpenStax, Physics, Problem for section 13.2, Wave Properties: Speed, Amplitude, Frequency, and Period',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/13-2-wave-properties-speed-amplitude-frequency-and-period',
    question: 'A boat in the trough of a wave takes 3 seconds to reach the highest point of the wave. The velocity of the wave is 5 m/s. What is its wavelength?',
    choices: ['0.83 m', '15 m', '30 m', '180 m'],
  },
  title: 'Exam Question: A Boat Rides a Wave. How Long Is the Wave?',
  thumbnailTitle: 'How Long Is the Wave?',
  thumbnail: 'sea',
  summary:
    'A real test question, solved one small step at a time: a boat in the trough of a wave takes 3 seconds to rise to the crest, and the wave travels at 5 m/s. We find the period, seeing that trough to crest is only half a wave, and then the wavelength from λ = vT. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Wave?', subtitle: 'Wave speed, period and wavelength, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a boat riding on waves. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A boat in the trough of a wave takes 3 seconds to reach the highest point of the wave. The velocity of the wave is 5 m/s. What is its wavelength?',
          choices: ['0.83 m', '15 m', '30 m', '180 m'],
          answer: 2,
          working: 'Trough to crest is half a wave, so $T = 2 \\times 3 = 6$ s. Then $\\lambda = vT = 5 \\times 6 = 30$ m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A boat in the trough of a wave takes three seconds to reach the highest point of the wave. The velocity of the wave is five metres per second. What is its wavelength?' },
        { say: 'The choices are 0.83 metres, fifteen metres, thirty metres, and 180 metres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [wave, { kind: 'text', id: 'plain', size: 'lg', md: 'How far is it from one **crest** to the next?' }],
      lines: [
        { say: 'Let us picture it. Waves roll across the sea from left to right. The marked dot is the boat.', show: ['sea', 'sea.particle'] },
        { say: 'The boat starts at the bottom of a wave, in a trough. Watch it rise. Three seconds later it is at the top, on a crest.', play: 'sea.rise', playDelay: 0.5 },
        { say: 'Notice that the boat only goes up and down. It is the wave that travels along, at five metres per second.' },
        { say: 'The wavelength is the length of one whole wave: from one crest to the next. The question asks: how long is it?', show: 'plain' },
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
          title: 'Period, speed and wavelength',
          md: 'The **period** $T$ is the time for one whole wave to pass a point: crest, trough, and back to a crest. In one period the wave travels one **wavelength** $\\lambda$, so $v = \\dfrac{\\lambda}{T}$, or $\\lambda = vT$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Waves at $2$ m/s with a period of $4$ s: $\\lambda = 2 \\times 4 = 8$ m.' },
      ],
      lines: [
        { say: 'Here is what we need. The period is the time for one whole wave to pass a point. A boat goes from a crest, down to a trough, and back up to a crest.', show: 'def' },
        { say: 'In that time the wave moves forward by exactly one wavelength. So the speed is the wavelength over the period, and the wavelength is the speed times the period.' },
        { say: 'For example, waves at two metres per second with a period of four seconds are eight metres long.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **period**: how long for a **whole** wave?', 'Use $\\lambda = vT$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the period, being careful about how much of a wave the three seconds is.', show: 'plan.0' },
        { say: 'Second, multiply the speed by the period.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Step 1: The period',
      layout: 'center',
      main: [wave, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{trough} \\to \\text{crest} = \\tfrac{1}{2}\\ \\text{wave} = 3\\ \\text{s}', 'T = 2 \\times 3 = \\adj{6\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. Here is the careful part. Trough to crest is not a whole wave. It is only half of one, the way up.', show: ['sea', 'sea.particle', 'm.0'], play: 'sea.rise', playDelay: 0.3 },
        { say: 'A whole wave goes up and comes back down again. Watch the boat for a whole period, and count the waves that pass it.', show: ['sea.count', 'sea.clock'], play: 'sea.whole', playDelay: 0.5 },
        { say: 'Up in three seconds, down in three more. So the period is twice three: six seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The wavelength',
      layout: 'center',
      main: [wave, { kind: 'math', id: 'm', size: 'md', lines: ['\\lambda = vT = 5 \\times 6 = \\good{30\\ \\text{m}}'] }],
      lines: [
        { say: 'Step two. In one period, the wave moves forward one wavelength. Five metres every second, for six seconds.', show: ['sea', 'sea.particle', 'm.0'] },
        { say: 'Thirty metres. That is choice C.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [wave, { kind: 'math', id: 'm', size: 'md', lines: ['v = \\dfrac{\\lambda}{T} = \\dfrac{30}{6} = 5\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the picture. Here is the distance from one crest to the next.', show: ['sea', 'sea.wavelength'] },
        { say: 'Thirty metres, just as we found. And working backwards, thirty metres in six seconds is five metres per second, the speed we were given.', show: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['0.83 m', '$5 \\div 6$: **divided** by the period'],
            ['15 m', '$5 \\times 3$: took **trough to crest** as a whole wave'],
            ['180 m', '$5 \\times 6 \\times 6$: multiplied by the period **twice**'],
            ['30 m', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Fifteen metres is the big one. It uses three seconds as the period. But trough to crest is only half a wave.' },
        { say: '0.83 divides the speed by the period. Check the units: metres per second, divided by seconds, is not a length.' },
        { say: 'And 180 multiplies by the period twice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Waves 12 m long travel past a buoy at 3.0 m/s. How long does the buoy take to go from a crest down to the next trough?',
          choices: ['4.0 s', '0.25 s', '2.0 s', '36 s'],
          answer: 2,
          working: '$T = \\lambda \\div v = 12 \\div 3.0 = 4.0$ s. Crest to trough is half a wave: $2.0$ s.',
        },
      ],
      lines: [
        { say: 'Your turn. Waves twelve metres long travel past a buoy at 3.0 metres per second. How long does the buoy take to go from a crest down to the next trough? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The period is the wavelength over the speed: twelve over three is four seconds. But crest to trough is only half a wave, so it takes two seconds. That is choice C. Four seconds is the whole period.', show: 'q2.answer' },
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
          items: ['**Period**: the time for a **whole** wave to pass', 'Trough to crest is **half** a wave', 'In one period a wave travels one wavelength: $\\lambda = vT$', 'Check the units: a wavelength is in metres'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period is the time for a whole wave to pass: up and back down again.', show: 'sum.0' },
        { say: 'Trough to crest is only half a wave, so double it.', show: 'sum.1' },
        { say: 'In one period a wave travels one wavelength, so the wavelength is the speed times the period.', show: 'sum.2' },
        { say: 'And check the units. For more on the properties of waves, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
