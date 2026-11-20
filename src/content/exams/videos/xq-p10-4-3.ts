import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 4.3 (sound): a bat makes a sound of 17,250 Hz with a
// wavelength of 0.019 m; what is the speed of the sound? The question is OpenStax Physics' own,
// word for word (Problems, section 14.1, CC BY 4.0). v = fλ = 17,250 × 0.019 = 327.75 m/s, about
// 3.28 × 10² m/s (choice d). The two large choices are far faster than sound in air, close to
// what f ÷ λ gives (about 9 × 10⁵ m/s), and the tiny one is close to λ ÷ f (about 1.1 × 10⁻⁶ m/s).
//
// The picture (src/video/wave.ts) is the bat's sound to scale: compressions 0.019 m apart, sent
// out 17,250 times a second, travelling at 327.75 m/s. A millisecond of it, slowed five thousand
// times, carries about 17 waves past the post, and the clock counts in milliseconds.

const call: WaveEl = {
  kind: 'wave',
  id: 'snd',
  span: [0, 0.1],
  height: 380,
  mark: 0.06,
  markLabel: 'one particle of air',
  clock: { unit: 'ms', seconds: 0.001 },
  lanes: [{ id: 'air', kind: 'longitudinal', label: 'The bat\'s call, to scale', frequency: 17250, amplitude: 2, speed: 327.75, full: true, tone: 'opp' }],
  poster: 'on',
  clips: {
    on: { reset: true, phases: [{ dur: 0.0004, slow: 10000, note: '10,000 times slower' }] },
    one: { reset: true, phases: [{ dur: 0.001, slow: 6000, note: 'One millisecond, 6,000 times slower' }] },
  },
};

const QUESTION = 'A bat produces a sound at 17,250 Hz and wavelength 0.019 m. What is the speed of the sound?';
const CHOICES = ['1.7 × 10⁶ m/s', '8.6 × 10⁵ m/s', '1.15 × 10⁻⁶ m/s', '3.28 × 10² m/s'];

const video: Explainer = {
  id: 'xq-p10-4-3',
  lessonId: '',
  exam: {
    lesson: 'p10-4-3',
    source: 'OpenStax, Physics, Problem for section 14.1, Speed of Sound, Frequency, and Wavelength',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/14-1-speed-of-sound-frequency-and-wavelength',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Bat\'s Call. How Fast Is the Sound?',
  thumbnailTitle: 'How Fast Is a Bat\'s Call?',
  thumbnail: 'snd',
  summary:
    'A real test question, solved one small step at a time: a bat makes a sound of 17,250 Hz with a wavelength of 0.019 m, and we find the speed of the sound. We use the wave equation, v = fλ, and write the answer in scientific notation. Then we check it against the speed of sound in air and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Is a Bat\'s Call?', subtitle: 'The speed of sound, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sound a bat makes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$1.7 \\times 10^{6}$ m/s', '$8.6 \\times 10^{5}$ m/s', '$1.15 \\times 10^{-6}$ m/s', '$3.28 \\times 10^{2}$ m/s'],
          answer: 3,
          working: '$v = f\\lambda = 17\\,250 \\times 0.019 = 327.75$ m/s $\\approx 3.28 \\times 10^{2}$ m/s.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A bat produces a sound at 17,250 hertz and wavelength 0.019 metres. What is the speed of the sound?' },
        { say: 'The choices are 1.7 times ten to the six, 8.6 times ten to the five, 1.15 times ten to the minus six, and 3.28 times ten to the two metres per second. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [call, { kind: 'text', id: 'plain', size: 'lg', md: 'How fast do the **compressions** travel through the air?' }],
      lines: [
        { say: 'Let us picture it. Here is the bat\'s call, drawn to scale and ten thousand times slower than real life. The air is squeezed into compressions, and they travel away from the bat.', show: ['snd', 'snd.particle', 'snd.labels'], play: 'snd.on', playDelay: 0.5 },
        { say: 'Each particle of air only moves back and forth. It is the pattern of compressions that travels. The question asks: how fast?', show: 'plain' },
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
          title: 'The wave equation, for sound',
          md: 'Sound is a **wave**, so its speed is the **frequency** times the **wavelength**: $v = f\\lambda$. The frequency is how many compressions leave the source **each second**, and the wavelength is the distance from one compression to the next.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'A note of $200$ Hz with a wavelength of $1.7$ m: $v = 200 \\times 1.7 = 340$ m/s.' },
      ],
      lines: [
        { say: 'Here is what we need. Sound is a wave, so its speed is the frequency times the wavelength.', show: 'def' },
        { say: 'The frequency is how many compressions leave the source each second, and the wavelength is the distance from one compression to the next.' },
        { say: 'For example, a note of two hundred hertz with a wavelength of 1.7 metres travels at two hundred times 1.7: 340 metres per second.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write down $f$ and $\\lambda$', 'Multiply: $v = f\\lambda$', 'Write it in **scientific notation**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write down the frequency and the wavelength.', show: 'plan.0' },
        { say: 'Second, multiply them.', show: 'plan.1' },
        { say: 'Third, write the answer in scientific notation, to match the choices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Frequency and wavelength',
      layout: 'center',
      main: [call, { kind: 'math', id: 'm', size: 'md', lines: ['f = \\adj{17\\,250\\ \\text{Hz}} \\qquad \\lambda = \\opp{0.019\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. The bat sends out 17,250 compressions every second. Watch one thousandth of a second, slowed down, and count them as they pass the post.', show: ['snd', 'snd.count', 'snd.clock'], play: 'snd.one', playDelay: 0.3 },
        { say: 'About seventeen in one millisecond, so 17,250 in a whole second. And the compressions are only 0.019 metres apart: less than two centimetres.', show: ['snd.wavelength', 'm.0'] },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = f\\lambda = 17\\,250 \\times 0.019', '= 327.75\\ \\text{m/s}'] }],
      lines: [
        { say: 'Step two. The speed is the frequency times the wavelength: 17,250 times 0.019.', show: 'm.0' },
        { say: '327.75 metres per second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Scientific notation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['327.75 = 3.2775 \\times 100', '= 3.2775 \\times 10^{2}', '\\approx \\good{3.28 \\times 10^{2}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step three. To write 327.75 in scientific notation, move the decimal point two places to the left, and multiply by a hundred to make up for it.', show: 'm.0' },
        { say: 'A hundred is ten to the two.', show: 'm.1' },
        { say: 'Rounded to three figures, 3.28 times ten to the two metres per second. That is choice D.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [call, { kind: 'math', id: 'm', size: 'md', lines: ['\\lambda = \\dfrac{v}{f} = \\dfrac{327.75}{17\\,250} = 0.019\\ \\text{m}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. The speed divided by the frequency gives 0.019 metres, the wavelength we were given.', show: ['snd', 'snd.speed', 'm.0'] },
        { say: 'And the size makes sense. Sound in air travels at about 340 metres per second on a warm day, and a bit slower in cold air. 328 metres per second is just what we expect from sound in air.' },
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
            ['$1.7 \\times 10^{6}$ m/s', 'Thousands of times faster than sound: **not** a sound speed'],
            ['$8.6 \\times 10^{5}$ m/s', 'Close to $f \\div \\lambda$: **divided** instead of multiplied'],
            ['$1.15 \\times 10^{-6}$ m/s', 'Close to $\\lambda \\div f$: divided the **other way**'],
            ['$3.28 \\times 10^{2}$ m/s', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'The two big choices are thousands of times faster than sound can travel in air. 8.6 times ten to the five is close to what you get by dividing the frequency by the wavelength, instead of multiplying.' },
        { say: '1.15 times ten to the minus six is close to the wavelength divided by the frequency. That is about a millionth of a metre per second, far slower than a snail.' },
        { say: 'Knowing that sound in air travels at roughly 340 metres per second lets you spot all three traps at a glance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tuning fork makes a sound of 440 Hz in air, where sound travels at 330 m/s. What is the wavelength of the sound?',
          choices: ['0.75 m', '1.33 m', '145 200 m', '110 m'],
          answer: 0,
          working: '$\\lambda = \\dfrac{v}{f} = \\dfrac{330}{440} = 0.75$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A tuning fork makes a sound of 440 hertz in air, where sound travels at 330 metres per second. What is the wavelength of the sound? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The wavelength is the speed divided by the frequency: 330 divided by 440 is 0.75 metres. That is choice A. 1.33 is upside down, and 145,200 multiplied.', show: 'q2.answer' },
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
          items: ['Sound is a wave: $v = f\\lambda$', 'Frequency: compressions **each second**', 'Wavelength: compression to **compression**', 'Check: sound in air is about $340$ m/s'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Sound is a wave, so its speed is the frequency times the wavelength.', show: 'sum.0' },
        { say: 'The frequency is the number of compressions each second.', show: 'sum.1' },
        { say: 'The wavelength is the distance from one compression to the next.', show: 'sum.2' },
        { say: 'And sound in air travels at roughly 340 metres per second, which makes a handy check. For more on sound, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
