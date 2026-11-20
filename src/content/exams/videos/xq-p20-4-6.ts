import type { Explainer, WaveEl, WaveLane } from '@/video/script.ts';

// Exam question for lesson 4.6 (standing waves and resonance in air columns): how long must a tube
// closed at one end be to have a fundamental frequency of 128 Hz, where sound travels at 344 m/s?
// The question is OpenStax Physics' own worked example, word for word (section 14.4, CC BY 4.0).
// λ = v ÷ f = 344 ÷ 128 = 2.6875 m, and the fundamental of a closed tube is a quarter of a
// wavelength, so L = 0.672 m.
//
// The pictures (src/video/wave.ts) hold standing waves of sound in the air of the tube, so the
// length drawn comes out of the frequency and the speed given here, and is not typed in: a
// quarter of a wavelength at 128 Hz, and three quarters at 384 Hz in the same tube.

/** The air in a tube closed at the left and open at the right, holding `quarters` quarter wavelengths of a sound. */
const column = (id: string, quarters: number, frequency: number, more: Partial<WaveLane> = {}): WaveLane => ({
  id,
  kind: 'longitudinal',
  frequency,
  amplitude: 2,
  speed: 344,
  standing: { quarters, length: (quarters * 344) / (4 * frequency) },
  ...more,
});

/** How long a clip of a standing wave of `f` hertz runs to stop with the air at its farthest: a quarter of a period after `n` whole ones. */
const widest = (n: number, f: number) => (n + 0.25) / f;

const tube: WaveEl = {
  kind: 'wave',
  id: 'tube',
  span: [0, 0.75],
  height: 360,
  lanes: [column('air', 1, 128, { label: 'Closed at the left, open at the right' })],
  poster: 'go',
  clips: { go: { phases: [{ dur: widest(4, 128), slow: 200, note: 'Slow motion' }] } },
};

const both: WaveEl = {
  kind: 'wave',
  id: 'both',
  span: [0, 0.75],
  height: 340,
  lanes: [column('one', 1, 128, { label: 'The fundamental: a quarter of a wavelength' }), column('three', 3, 384, { label: 'The next: three quarters of a wavelength' })],
  clips: { go: { phases: [{ dur: widest(4, 128), slow: 200, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'xq-p20-4-6',
  lessonId: '',
  exam: {
    lesson: 'p20-4-6',
    source: 'OpenStax, Physics, worked example in section 14.4, Sound Interference and Resonance',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/14-4-sound-interference-and-resonance',
    question: 'If sound travels through the air at a speed of 344 m/s, what should be the length of a tube closed at one end to have a fundamental frequency of 128 Hz?',
  },
  title: 'Exam Question: How Long Should a Tube Be to Play 128 Hz?',
  thumbnailTitle: 'How Long Is the Tube?',
  thumbnail: 'tube',
  summary:
    'A real test question, solved one small step at a time: sound travels at 344 m/s, and we find the length of a tube closed at one end whose fundamental frequency is 128 Hz. We find the wavelength from v = fλ, see why the fundamental of a closed tube fits a quarter of a wavelength, and divide by four. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Tube?', subtitle: 'Resonance in a closed tube, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sound made in a tube, like the pipes of an organ. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If sound travels through the air at a speed of 344 m/s, what should be the length of a tube closed at one end to have a fundamental frequency of 128 Hz?',
          answer: '$0.672$ m',
          working: '$\\lambda = \\dfrac{v}{f} = \\dfrac{344}{128} = 2.6875$ m, and the fundamental of a closed tube is a quarter of a wavelength: $L = \\dfrac{\\lambda}{4} = 0.672$ m.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'If sound travels through the air at a speed of 344 metres per second, what should be the length of a tube closed at one end to have a fundamental frequency of 128 hertz?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tube, { kind: 'text', id: 'plain', size: 'lg', md: 'How **long** must the tube be, so that its **lowest** note is **128 Hz**?' }],
      lines: [
        { say: 'Let us picture it. Here is the air inside a tube. The left end is closed, and the right end is open. Each dot is a bit of air, and we are watching the sound in very slow motion.', show: 'tube', play: 'tube.go', playDelay: 1 },
        { say: 'Blow across the open end, and the air inside vibrates. The tube picks out the notes that fit inside it, and the lowest of them is called the fundamental.' },
        { say: 'The question asks: how long must the tube be, so that its lowest note is 128 hertz?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        both,
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'A tube closed at one end',
          md: 'Closed end: a **node**, where the air cannot move. Open end: an **antinode**. Shortest fit: a **quarter** wavelength, $L = \\lambda / 4$.',
        },
      ],
      lines: [
        { say: 'Here is what we need. In a tube like this, the sound makes a standing wave. Watch the two patterns.', show: 'both', play: 'both.go', playDelay: 1 },
        { say: 'At the closed end, the air is up against the wall, so it cannot move. That is a node. At the open end it is free, so it moves the most. That is an antinode.', show: ['def', 'both.nodes'] },
        { say: 'From a node to the next antinode is a quarter of a wavelength. So the shortest pattern that fits, the fundamental, is a quarter of a wavelength long. The next one that fits is three quarters.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **wavelength**: $\\lambda = \\dfrac{v}{f}$', 'The fundamental fits a **quarter** of it: $L = \\dfrac{\\lambda}{4}$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the wavelength of a 128 hertz sound, from the speed and the frequency.', show: 'plan.0' },
        { say: 'Second, the tube is a quarter of that wavelength long, so divide by four.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Step 1: The wavelength',
      layout: 'center',
      main: [tube, { kind: 'math', id: 'm', size: 'md', lines: ['v = f\\lambda \\quad\\Rightarrow\\quad \\lambda = \\dfrac{v}{f}', '\\lambda = \\dfrac{344}{128} = \\adj{2.6875\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. The speed of a wave is its frequency times its wavelength. So the wavelength is the speed divided by the frequency.', show: ['tube', 'm.0'] },
        { say: '344 divided by 128 is 2.6875 metres. That is how far apart the squashed parts of the sound are.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: A quarter',
      layout: 'center',
      main: [tube, { kind: 'math', id: 'm', size: 'md', lines: ['L = \\dfrac{\\lambda}{4} = \\dfrac{2.6875}{4} = \\good{0.672\\ \\text{m}}'] }],
      lines: [
        { say: 'Step two. The fundamental of a closed tube fits a quarter of a wavelength: a node at the closed end, and an antinode at the open end.', show: ['tube', 'tube.nodes'], play: 'tube.go' },
        { say: '2.6875 divided by four is 0.672 metres: about 67 centimetres.', show: ['m.0', 'tube.length'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['f = \\dfrac{v}{4L} = \\dfrac{344}{4 \\times 0.672} = 128\\ \\text{Hz}\\ \\checkmark', '\\text{a pipe of about two thirds of a metre: organ-pipe size}'] }],
      lines: [
        { say: 'Let us check it by working forwards. For a closed tube, the fundamental is the speed over four times the length. 344 over four times 0.672 is 128 hertz.', show: 'm.0' },
        { say: 'And the size makes sense. 128 hertz is a low note, and a pipe two thirds of a metre long is the size of a real organ pipe.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['2.69 m', 'The whole **wavelength**: forgot to divide by four'],
            ['1.34 m', '$\\lambda \\div 2$: that is a tube **open at both ends**'],
            ['2.02 m', '$3\\lambda \\div 4$: the **next** note, not the fundamental'],
            ['0.672 m', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: '2.69 metres is the whole wavelength. The tube only holds a quarter of it.' },
        { say: '1.34 metres is half a wavelength. That is right for a tube open at both ends, which has an antinode at each end. Read whether the tube is open or closed.' },
        { say: 'And 2.02 metres is three quarters of a wavelength. That tube does resonate at 128 hertz, but it is not its fundamental: its lowest note is lower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tube closed at one end is 0.25 m long, and sound travels at 340 m/s. What is its fundamental frequency?',
          choices: ['340 Hz', '680 Hz', '1360 Hz', '85 Hz'],
          answer: 0,
          working: 'The fundamental is a quarter wavelength: $\\lambda = 4 \\times 0.25 = 1.0$ m, so $f = \\dfrac{v}{\\lambda} = \\dfrac{340}{1.0} = 340$ Hz.',
        },
      ],
      lines: [
        { say: 'Your turn. A tube closed at one end is 0.25 metres long, and sound travels at 340 metres per second. What is its fundamental frequency? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The tube is a quarter of a wavelength, so the wavelength is four times 0.25: one metre. The frequency is 340 over one: 340 hertz. That is choice A. 680 hertz treats it as a tube open at both ends.', show: 'q2.answer' },
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
          items: ['Wavelength: $\\lambda = \\dfrac{v}{f}$', 'Closed end: a **node**. Open end: an **antinode**', 'A closed tube\'s fundamental: $L = \\dfrac{\\lambda}{4}$', 'Open at both ends: $L = \\dfrac{\\lambda}{2}$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The wavelength is the speed over the frequency.', show: 'sum.0' },
        { say: 'At a closed end the air cannot move, so there is a node. At an open end there is an antinode.', show: 'sum.1' },
        { say: 'So the fundamental of a tube closed at one end is a quarter of a wavelength.', show: 'sum.2' },
        { say: 'And a tube open at both ends holds half a wavelength. For more on resonance, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
