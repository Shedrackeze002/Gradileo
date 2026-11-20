import type { Explainer, RipplesEl } from '@/video/script.ts';

// Exam question for lesson 4.7 (the Doppler effect): a train's 150 Hz horn moves at 35 m/s where
// sound travels at 340 m/s; what frequencies does a person beside the track hear as it approaches
// and after it passes? The question is OpenStax Physics' own worked example, word for word
// (section 14.3, CC BY 4.0). f = fₛ × v ÷ (v ∓ vₛ): 150 × 340 ÷ 305 = 167 Hz approaching, and
// 150 × 340 ÷ 375 = 136 Hz after it passes.
//
// The picture (src/video/ripples.ts) uses the question's own numbers, seen from above in slow
// motion: crests of 150 Hz spread at 340 m/s from a horn that moves at 35 m/s, so the wavelengths
// (2.03 m ahead, 2.50 m behind) and the frequencies the person hears come out of the motion, and
// are not typed in.

const train: RipplesEl = {
  kind: 'ripples',
  id: 'sim',
  view: [-30, -14, 30, 14],
  speed: 340,
  full: true,
  height: 420,
  sources: [{ id: 'horn', label: 'Train horn', at: [-28, 0], frequency: 150, velocity: [35, 0] }],
  listeners: [{ id: 'ear', label: 'Person', at: [0, -1.5], side: 'below' }],
  poster: 'in',
  clips: {
    in: { reset: true, phases: [{ dur: 0.5, slow: 6, note: 'Slow motion' }] },
    pass: { phases: [{ dur: 0.6, slow: 6, note: 'Slow motion' }] },
    away: { phases: [{ dur: 0.5, slow: 6, note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-4-7',
  lessonId: '',
  exam: {
    lesson: 'p20-4-7',
    source: 'OpenStax, Physics, worked example in section 14.3, Doppler Effect and Sonic Booms',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/14-3-doppler-effect-and-sonic-booms',
    question:
      'Suppose a train that has a 150 Hz horn is moving at 35 m/s in still air on a day when the speed of sound is 340 m/s. What frequencies are observed by a stationary person at the side of the tracks as the train approaches and after it passes?',
  },
  title: 'Exam Question: A Train Horn Passes You. What Do You Hear? The Doppler Effect',
  thumbnailTitle: 'The Passing Train Horn',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a train with a 150 Hz horn moves at 35 m/s, and we find the frequencies a person beside the track hears as it approaches and after it passes. We watch the crests crowd together in front of the train and spread out behind it, then use the Doppler formula with a minus sign for approaching and a plus sign for moving away. Then we check the answers and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Passing Train Horn', subtitle: 'The Doppler effect, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sound of a train horn as it rushes past. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Suppose a train that has a 150 Hz horn is moving at 35 m/s in still air on a day when the speed of sound is 340 m/s. What frequencies are observed by a stationary person at the side of the tracks as the train approaches and after it passes?',
          answer: '$167$ Hz approaching, $136$ Hz after it passes',
          working: '$150 \\times \\dfrac{340}{340 - 35} = 167$ Hz, and $150 \\times \\dfrac{340}{340 + 35} = 136$ Hz.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose a train that has a 150 hertz horn is moving at 35 metres per second in still air, on a day when the speed of sound is 340 metres per second. What frequencies are observed by a stationary person at the side of the tracks, as the train approaches, and after it passes?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [train, { kind: 'text', id: 'plain', size: 'lg', md: 'What note is heard **before** and **after** it passes?' }],
      lines: [
        { say: 'Let us picture it, looking down from above, in slow motion. Each circle is a crest of sound from the horn. The train moves to the right, and the person stands beside the track.', show: ['sim', 'sim.velocity'], play: 'sim.in', playDelay: 1 },
        { say: 'The horn always gives out 150 hertz. But you know from real life that a passing horn sounds higher as it comes, and lower as it goes. Watch it pass.', play: 'sim.pass' },
        { say: 'And away it goes.', play: 'sim.away' },
        { say: 'The question asks: what two frequencies does the person hear?', show: 'plain' },
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
          title: 'The Doppler effect, for a moving source',
          md: 'A source of frequency $f_s$ moves at $v_s$ through still air where sound travels at $v_w$. A person standing still hears $f_{obs} = f_s \\times \\dfrac{v_w}{v_w \\mp v_s}$: **minus** while it **approaches**, **plus** while it moves **away**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Coming closer, the bottom is **smaller**, so the note is **higher**. Moving away, it is **lower**.' },
      ],
      lines: [
        { say: 'Here is what we need. When a source of sound moves, the frequency a still listener hears is the source\'s frequency, times the speed of sound, over the speed of sound minus or plus the speed of the source.', show: 'def' },
        { say: 'Use minus while the source is coming towards you, and plus while it is going away.' },
        { say: 'An easy way to remember which: coming closer makes the bottom of the fraction smaller, so the note goes up. Moving away makes it bigger, so the note goes down.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['**Approaching**: use $v_w - v_s$', '**After it passes**: use $v_w + v_s$', 'Check: higher, then lower than 150 Hz'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, the train approaching: use the minus sign.', show: 'plan.0' },
        { say: 'Second, after it passes: use the plus sign.', show: 'plan.1' },
        { say: 'Then check that the first is above 150 hertz, and the second below.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Approaching',
      layout: 'center',
      main: [train, { kind: 'math', id: 'm', size: 'md', lines: ['f = 150 \\times \\dfrac{340}{340 - 35} = \\good{167\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Step one. The train is coming towards the person. Look at the crests in front of it: they are squashed together, because the horn chases its own sound.', show: ['sim', 'sim.velocity'], play: 'sim.in', playDelay: 0.5 },
        { say: 'Coming closer, so use the minus sign. 340 minus 35 is 305.', show: 'm.0' },
        { say: '150 times 340, over 305, is 167 hertz. The person hears a higher note, and it stays steady as long as the train approaches.', show: 'sim.heard', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: After it passes',
      layout: 'center',
      main: [train, { kind: 'math', id: 'm', size: 'md', lines: ['f = 150 \\times \\dfrac{340}{340 + 35} = \\good{136\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Step two. Now the train goes past. Behind it, the crests are stretched apart.', show: ['sim', 'sim.velocity', 'sim.heard'], play: ['sim.in'] },
        { say: 'Watch the note the person hears as the train passes.', play: 'sim.pass' },
        { say: 'Moving away, so use the plus sign. 340 plus 35 is 375. 150 times 340, over 375, is 136 hertz.', show: 'm.0', play: 'sim.away', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [train, { kind: 'math', id: 'm', size: 'md', lines: ['\\lambda = 305 \\div 150 = 2.03\\ \\text{m},\\ \\ f = 340 \\div 2.03 = 167\\ \\text{Hz}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 167 hertz is higher than 150, and 136 hertz is lower. That is the right way round.', show: ['sim', 'sim.velocity'], play: 'sim.in' },
        { say: 'We can check it another way too, by measuring the crests. In front of the train they are 2.03 metres apart, and behind it, 2.50 metres. Without moving, they would be 2.27 metres.', show: 'sim.wavelength' },
        { say: 'In front, each crest is only 305 over 150 metres from the next, because the train moves 35 metres each second after its sound. Sound at 340 metres per second with crests 2.03 metres apart arrives 167 times a second. It matches.', show: 'm.0' },
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
            ['136 Hz, then 167 Hz', 'Signs **swapped**: approaching must be **higher**'],
            ['135 Hz approaching', '$150 \\times 305 \\div 340$: fraction **upside down**'],
            ['185 Hz approaching', '$150 + 35$: added a **speed** to a **frequency**'],
            ['167 Hz, then 136 Hz', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The most common is swapping the signs. Check your answer against real life: a horn coming towards you sounds higher.' },
        { say: '135 hertz turns the fraction upside down. The speed of sound always goes on top.' },
        { say: 'And 185 adds a speed to a frequency. They have different units, so they can never be added.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An ambulance with an 800 Hz siren drives towards you at 20 m/s. The speed of sound is 340 m/s. What frequency do you hear?',
          choices: ['756 Hz', '850 Hz', '753 Hz', '820 Hz'],
          answer: 1,
          working: 'Approaching, so use minus: $800 \\times \\dfrac{340}{340 - 20} = 800 \\times \\dfrac{340}{320} = 850$ Hz.',
        },
      ],
      lines: [
        { say: 'Your turn. An ambulance with an 800 hertz siren drives towards you at twenty metres per second. The speed of sound is 340 metres per second. What frequency do you hear? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'It is approaching, so use the minus sign: 340 minus 20 is 320. 800 times 340, over 320, is 850 hertz. That is choice B. 756 hertz used the plus sign, which is what you hear after it passes.', show: 'q2.answer' },
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
          items: ['Moving source: $f_{obs} = f_s \\times \\dfrac{v_w}{v_w \\mp v_s}$', '**Approaching**: minus, a **higher** note', '**Moving away**: plus, a **lower** note', 'Check against real life: higher as it comes'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For a moving source, the frequency heard is the source\'s frequency, times the speed of sound over the speed of sound minus or plus the source\'s speed.', show: 'sum.0' },
        { say: 'Approaching, use minus, and the note is higher.', show: 'sum.1' },
        { say: 'Moving away, use plus, and the note is lower.', show: 'sum.2' },
        { say: 'And always check against real life. For more on the Doppler effect, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
