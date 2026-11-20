import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 4.1 (what a wave is): a water wave has an amplitude of 0.4 m
// and a frequency of 2 Hz; how far does a bird on the water move with every wave, and how many
// times a second? The question is OpenStax Physics' own, word for word (Test Prep, Short Answer,
// section 13.2, CC BY 4.0). The bird rides from the top of a crest to the bottom of a trough, two
// amplitudes: 2 × 0.4 = 0.8 m, and it does this once for every wave, so twice a second (choice a).
// 0.2 m halves the amplitude instead of doubling it, and "once per second" mistakes the frequency.
//
// The picture (src/video/wave.ts) runs waves of 2 Hz and 0.4 m at 3 m/s past a marked bird, and
// its post counts the waves that pass in one second, slowed down.

const water: WaveEl = {
  kind: 'wave',
  id: 'sea',
  span: [0, 6],
  height: 400,
  mark: 3.6,
  markLabel: 'the bird',
  amplitudeUnit: 'm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'Water waves: amplitude 0.4 m, frequency 2 Hz', frequency: 2, amplitude: 0.4, speed: 3, full: true }],
  poster: 'on',
  clips: {
    on: { reset: true, phases: [{ dur: 3, slow: 1.5 }] },
    one: { reset: true, phases: [{ dur: 1, slow: 4, note: 'One second, slowed down' }] },
    wave: { reset: true, phases: [{ dur: 0.5, slow: 6, note: 'One wave, slowed down' }] },
  },
};

const QUESTION =
  'If the amplitude of a water wave is 0.4 m and its frequency is 2 Hz, how much distance would a bird sitting on the water’s surface move with every wave? How many times will it do this every second?';
const CHOICES = [
  'The bird will go up and down a distance of 0.8 m. It will do this twice per second.',
  'The bird will go up and down a distance of 0.2 m. It will do this twice per second.',
  'The bird will go up and down a distance of 0.8 m. It will do this once per second.',
  'The bird will go up and down a distance of 0.2 m. It will do this once per second.',
];

const video: Explainer = {
  id: 'xq-p10-4-1',
  lessonId: '',
  exam: {
    lesson: 'p10-4-1',
    source: 'OpenStax, Physics, Test Prep (Short Answer) for section 13.2, Wave Properties: Speed, Amplitude, Frequency, and Period',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/13-2-wave-properties-speed-amplitude-frequency-and-period',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Bird Rides the Waves. Amplitude and Frequency',
  thumbnailTitle: 'A Bird on the Waves',
  thumbnail: 'sea',
  summary:
    'A real test question, solved one small step at a time: a water wave has an amplitude of 0.4 m and a frequency of 2 Hz, and we find how far a bird sitting on the water moves with every wave, and how many times it does this each second. We see that the amplitude is only half of the bird\'s rise and fall, and that the frequency counts the waves each second. Then we check the answer on the moving waves and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Bird on the Waves', subtitle: 'Amplitude and frequency, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a bird sitting on the waves. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: [
            'Up and down $0.8$ m, **twice** per second',
            'Up and down $0.2$ m, **twice** per second',
            'Up and down $0.8$ m, **once** per second',
            'Up and down $0.2$ m, **once** per second',
          ],
          answer: 0,
          working: 'Crest to trough is two amplitudes: $2 \\times 0.4 = 0.8$ m. One rise and fall for each wave, and $2$ Hz is $2$ waves a second: twice per second.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If the amplitude of a water wave is 0.4 metres and its frequency is two hertz, how much distance would a bird sitting on the water\'s surface move with every wave? How many times will it do this every second?' },
        { say: 'The choices say the bird goes up and down 0.8 metres or 0.2 metres, and that it does this twice per second or once per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [water, { kind: 'text', id: 'plain', size: 'lg', md: 'How far does the bird go **up and down**, and how **often**?' }],
      lines: [
        { say: 'Let us picture it. Waves roll across the water from left to right. The marked dot is the bird.', show: ['sea', 'sea.particle'], play: 'sea.on', playDelay: 0.5 },
        { say: 'Notice that the bird does not travel along with the wave. It only rides up and down, in the same place, as each wave passes under it.' },
        { say: 'The question asks two things: how far does the bird move with each wave, and how many times does it do that every second?', show: 'plain' },
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
          title: 'Amplitude and frequency',
          md: 'The **amplitude** is how far the water rises **from the middle** to the top of a crest, which is also how far it sinks from the middle to the bottom of a trough. The **frequency** is the number of waves that pass **each second**, in **hertz (Hz)**: $1$ Hz is one wave a second.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Amplitude $5$ cm: the top of a crest is $5 + 5 = 10$ cm above the bottom of a trough.' },
      ],
      lines: [
        { say: 'Here is what we need. The amplitude is how far the water rises from its middle, flat level up to the top of a crest. It sinks the same distance below the middle at the bottom of a trough.', show: 'def' },
        { say: 'The frequency is the number of waves that pass each second, measured in hertz. One hertz is one wave every second.' },
        { say: 'For example, with an amplitude of five centimetres, a crest is five above the middle and a trough is five below it, so the top of a crest is ten centimetres above the bottom of a trough.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['How far: from the **top** of a crest to the **bottom** of a trough', 'How often: one rise and fall for **each wave**', 'Count the waves each second: the **frequency**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find how far the bird goes, from the top of a crest down to the bottom of a trough.', show: 'plan.0' },
        { say: 'Second, see that the bird rises and falls once for each wave that passes.', show: 'plan.1' },
        { say: 'Third, use the frequency to count the waves each second.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: How far',
      layout: 'center',
      main: [water, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{crest to trough} = 2 \\times \\adj{0.4\\ \\text{m}} = \\good{0.8\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. Here is the amplitude, measured on the wave: 0.4 metres from the middle up to the top of a crest.', show: ['sea', 'sea.amplitude'] },
        { say: 'But the bird does not stop at the middle. It rides all the way down to the bottom of a trough, which is another 0.4 metres below the middle. Watch one wave pass the bird.', show: 'sea.particle', play: 'sea.wave', playDelay: 0.3 },
        { say: 'So from its highest point to its lowest, the bird moves two amplitudes: twice 0.4, which is 0.8 metres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: How often',
      layout: 'center',
      main: [water, { kind: 'math', id: 'm', size: 'md', lines: ['f = 2\\ \\text{Hz} = \\good{2\\ \\text{waves each second}}'] }],
      lines: [
        { say: 'Step two. Each wave that passes lifts the bird up once and drops it down once. So the bird goes up and down once for every wave.', show: ['sea', 'sea.particle'] },
        { say: 'A frequency of two hertz means two waves pass every second. Watch one second, slowed down, and count the waves that pass the bird.', show: ['sea.count', 'sea.clock'], play: 'sea.one', playDelay: 0.3 },
        { say: 'Two waves in one second. So the bird goes up and down twice per second.', show: 'm.0', focus: 'm.0' },
        { say: 'Up and down 0.8 metres, twice per second. That is choice A.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [water, { kind: 'math', id: 'm', size: 'md', lines: ['T = \\dfrac{1}{f} = \\dfrac{1}{2} = 0.5\\ \\text{s}\\ \\text{for each rise and fall}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way. If the bird rises and falls twice a second, each rise and fall takes half a second. That time is the period: one over the frequency.', show: ['sea', 'sea.particle', 'sea.clock', 'm.0'] },
        { say: 'Watch one wave pass, and the clock: half a second, from one crest to the next.', play: 'sea.wave', playDelay: 0.3 },
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
            ['$0.2$ m, twice', '$0.4 \\div 2$: **halved** the amplitude instead of doubling it'],
            ['$0.8$ m, once', 'Right distance, but $2$ Hz means **two** waves a second'],
            ['$0.2$ m, once', 'Both mistakes at once'],
            ['$0.8$ m, twice', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '0.2 metres halves the amplitude. But the amplitude is already only half of the bird\'s rise and fall, from the middle to the top. We double it, not halve it.' },
        { say: 'Once per second gets the frequency wrong. Two hertz means two waves every second, and one rise and fall for each.' },
        { say: 'And the last choice makes both mistakes at once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cork floats on a pond. Waves with an amplitude of 0.1 m pass under it. How far is it from the cork\'s highest point to its lowest point?',
          choices: ['0.05 m', '0.2 m', '0.1 m', '0.4 m'],
          answer: 1,
          working: 'Two amplitudes, from the top of a crest to the bottom of a trough: $2 \\times 0.1 = 0.2$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A cork floats on a pond. Waves with an amplitude of 0.1 metres pass under it. How far is it from the cork\'s highest point to its lowest point? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'From the top of a crest to the bottom of a trough is two amplitudes: twice 0.1 is 0.2 metres. That is choice B. 0.05 halved the amplitude, and 0.1 is the amplitude alone.', show: 'q2.answer' },
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
          items: ['Amplitude: from the **middle** to the top of a crest', 'Crest to trough $=$ **two** amplitudes', 'A floating object rises and falls once for **each wave**', 'Frequency: waves **each second**, in hertz'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The amplitude is measured from the middle of the wave to the top of a crest.', show: 'sum.0' },
        { say: 'So from the top of a crest to the bottom of a trough is two amplitudes.', show: 'sum.1' },
        { say: 'Something floating on the water rises and falls once for each wave that passes.', show: 'sum.2' },
        { say: 'And the frequency counts the waves each second, in hertz. For more on waves, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
