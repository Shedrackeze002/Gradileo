import type { Explainer, RipplesEl } from '@/video/script.ts';

// Lesson 4.7, part 2: Doppler calculations. The formula comes from the picture of the first part
// (src/video/ripples.ts): waves of 2 Hz at 6 m/s from a source that moves at 2 m/s are 2 m apart
// in front of it and 4 m apart behind, so listeners there receive 3 Hz and 1.5 Hz. Then the
// lesson's numbers, drawn to scale in sound that travels at 340 m/s: a siren of 500 Hz at 25 m/s
// is heard at 539.7 Hz as it approaches and 465.8 Hz as it moves away, and a horn of 600 Hz that
// is heard at 650 Hz is on a car that moves at 26.2 m/s.

/** The source of the first part: 2 Hz, moving to the right at 2 m/s through waves that travel at 6 m/s. */
const slow = (id: string, x: number, view: RipplesEl['view'], height: number, more: Partial<RipplesEl>): RipplesEl => ({
  kind: 'ripples',
  id,
  view,
  speed: 6,
  height,
  sources: [{ id: 'src', label: 'Source', at: [x, 0], frequency: 2, velocity: [2, 0] }],
  clips: {},
  ...more,
});

/** Where the formula comes from: the crests are 2 m apart in front of the source, and 4 m apart behind it. */
const gap = slow('gap', -9, [-12, -8, 16, 8], 420, { poster: 'go', clips: { go: { phases: [{ dur: 6.45 }] } } });

/** Both formulas, checked against what each listener receives: 3 Hz in front and 1.5 Hz behind. */
const both = slow('both', -8, [-20, -4.5, 20, 4.5], 300, {
  full: true,
  listeners: [
    { id: 'back', label: 'Behind', at: [-16, 0] },
    { id: 'front', label: 'In front', at: [16, 0] },
  ],
  clips: { go: { phases: [{ dur: 4 }] }, on: { phases: [{ dur: 4, slow: 1.5 }] } },
});

/**
 * Sound drawn to scale, at 340 m/s: a source of `frequency` hertz that starts at `x` and moves to
 * the right at `v` m/s, and a person at `ear`. One crest in two is drawn, and a hundredth of a
 * second of the sound takes a second of the video.
 */
const sound = (id: string, label: string, frequency: number, v: number, x: number, ear: number): RipplesEl => ({
  kind: 'ripples',
  id,
  view: [-20, -4.6, 20, 4.6],
  speed: 340,
  full: true,
  every: 2,
  height: 310,
  sources: [{ id: 'src', label, at: [x, 0], frequency, velocity: [v, 0] }],
  listeners: [{ id: 'ear', label: 'Person', at: [ear, 0] }],
  clips: {
    go: { phases: [{ dur: 0.09, slow: 100, note: 'Slow motion' }] },
    on: { phases: [{ dur: 0.07, slow: 100, note: 'Slow motion' }] },
  },
});

/** The lesson's siren: 500 Hz at 25 m/s, towards the person. */
const towards = sound('towards', 'Siren', 500, 25, -9, 15);
/** The same siren after it has passed, moving away from the person. */
const away = sound('away', 'Siren', 500, 25, -3, -15);
/** The lesson's horn: 600 Hz, heard at 650 Hz, so the car moves at 340 − 600 × 340 ÷ 650 = 26.2 m/s. */
const car = sound('car', 'Car', 600, 340 - (600 * 340) / 650, -9, 15);

/** A source that moves away from an observer: the waves that arrive are stretched. */
const shift: RipplesEl = {
  kind: 'ripples',
  id: 'shift',
  view: [-12, -8, 12, 8],
  speed: 6,
  full: true,
  height: 420,
  sources: [{ id: 'src', label: 'Source', at: [-3, 0], frequency: 2, velocity: [2, 0], tone: 'bad' }],
  listeners: [{ id: 'eye', label: 'Observer', at: [-9, 0] }],
  clips: {
    go: { phases: [{ dur: 3.5, slow: 2.8 }] },
    on: { phases: [{ dur: 3, slow: 3 }] },
  },
};

const video: Explainer = {
  id: 'p20-4-7-b',
  lessonId: 'p20-4-7',
  title: 'The Doppler Effect, Part 2: Doppler Calculations',
  thumbnailTitle: 'Doppler Formula',
  thumbnail: 'gap',
  summary:
    'Work out how much the Doppler effect changes a note. See where the formula for a moving source comes from, find the frequency heard from a siren as it approaches and as it moves away, and run the formula backwards to find the speed of a car from the note of its horn.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Doppler Calculations', subtitle: 'How much does the note change?' }],
      lines: [
        { say: 'An ambulance comes towards you at 25 metres per second, with a siren of 500 hertz. You hear a higher note. But how much higher?', show: 'title' },
        { say: 'In this lesson we work it out, and then run the calculation backwards, to find the speed of a car from the note of its horn.' },
      ],
    },
    {
      chapter: 'Where the formula comes from',
      layout: 'split',
      leftWidth: 640,
      left: [gap],
      right: [{ kind: 'math', id: 'l', size: 'md', lines: ['\\lambda_{\\text{front}} = \\dfrac{v - v_s}{f}', 'f_{\\text{heard}} = \\dfrac{v}{\\lambda_{\\text{front}}}', 'f_{\\text{heard}} = \\good{f \\times \\dfrac{v}{v - v_s}}'] }],
      lines: [
        { say: 'Here is a source that moves through its own waves. The waves travel at six metres per second. The source moves at two metres per second, and sends out two crests each second.', show: ['gap', 'gap.velocity'], play: 'gap.go' },
        { say: 'Take the half second between one crest and the next. In that time the first crest travels three metres, and the source follows it for one metre. So the next crest starts only two metres behind the first.', show: 'gap.wavelength' },
        { say: 'In general, the wavelength in front is the speed of the waves minus the speed of the source, divided by the frequency of the source.', show: 'l.0' },
        { say: 'The crests still travel at the speed of the waves. So the frequency heard is that speed, divided by the shorter wavelength.', show: 'l.1' },
        { say: 'Put the two together. The frequency heard is the true frequency, times the speed of the waves, over the speed of the waves minus the speed of the source.', show: 'l.2' },
      ],
    },
    {
      chapter: 'Approaching, or moving away',
      layout: 'center',
      main: [both, { kind: 'math', id: 'f', size: 'md', lines: ['\\text{source approaching:}\\quad f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s}', '\\text{source moving away:}\\quad f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s}'] }],
      lines: [
        { say: 'So that is the formula for a source that approaches.', show: ['both', 'both.velocity', 'f.0'], play: 'both.go' },
        { say: 'Behind the source, the crests are stretched instead. In each half second the crest and the source move apart, so the crests are three plus one, four metres apart. For a source that moves away, the same steps give a plus sign underneath.', show: 'f.1' },
        { say: 'Check both against the picture. In front: two hertz, times six over four, is three hertz. Behind: two hertz, times six over eight, is 1.5 hertz.', show: 'both.heard', play: 'both.on' },
        { say: 'To choose the sign, decide first which way the answer must go. An approaching source must give a higher frequency. So the fraction must be larger than one, and that needs the smaller number underneath: the minus sign.' },
      ],
    },
    {
      chapter: 'An approaching siren',
      layout: 'center',
      main: [towards, { kind: 'math', id: 'a', size: 'md', lines: ['f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s} = 500 \\times \\dfrac{340}{340 - 25}', 'f_{\\text{heard}} = 500 \\times 1.0794 = \\good{539.7\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Now the real thing. The speed of sound in the air is 340 metres per second. An ambulance sounds a siren of 500 hertz, and moves at 25 metres per second directly towards a person standing by the road. What frequency does the person hear?', show: ['towards', 'towards.velocity'], play: 'towards.go', playDelay: 3 },
        { say: 'The source is approaching, so the answer must be higher than 500 hertz, and we subtract underneath: 500, times 340, over 340 minus 25.', show: 'a.0' },
        { say: '340 over 315 is 1.0794. So the person hears 539.7 hertz.', show: ['a.1', 'towards.heard'], play: 'towards.on' },
      ],
    },
    {
      chapter: 'The siren moving away',
      layout: 'center',
      main: [away, { kind: 'math', id: 'b', size: 'md', lines: ['f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s} = 500 \\times \\dfrac{340}{340 + 25}', 'f_{\\text{heard}} = 500 \\times 0.9315 = \\good{465.8\\ \\text{Hz}} \\qquad 539.7 - 465.8 \\approx \\thc{74\\ \\text{Hz}}'] }],
      lines: [
        { say: 'The ambulance passes the person, and moves directly away at the same speed. What frequency does the person hear now?', show: ['away', 'away.velocity'], play: 'away.go', playDelay: 1 },
        { say: 'The source is moving away, so the answer must be lower than 500 hertz, and we add underneath: 500, times 340, over 340 plus 25.', show: 'b.0' },
        { say: '340 over 365 is 0.9315, so the person hears 465.8 hertz. As the ambulance passes, the note drops from 539.7 to 465.8: about 74 hertz.', show: ['b.1', 'away.heard'], play: 'away.on' },
      ],
    },
    {
      chapter: 'The speed of a source',
      layout: 'center',
      main: [car, { kind: 'math', id: 'c', size: 'md', lines: ['v - v_s = \\dfrac{f\\,v}{f_{\\text{heard}}} = \\dfrac{600 \\times 340}{650} = 313.85\\ \\text{m/s}', 'v_s = 340 - 313.85 = \\good{26.2\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Run backwards, the formula gives the speed of the source. The speed of sound in the air is 340 metres per second. A car sounds a horn of 600 hertz as it drives directly towards a person, who hears 650 hertz. How fast is the car moving?', show: ['car', 'car.heard'], play: 'car.go', playDelay: 3 },
        { say: 'Rearrange the formula for a source that approaches. The speed of sound minus the speed of the car is the true frequency times the speed of sound, over the frequency heard. That is 600 times 340, over 650, which is 313.85 metres per second.', show: 'c.0' },
        { say: 'So the speed of the car is 340 minus 313.85, which is 26.2 metres per second.', show: 'c.1', play: 'car.on' },
      ],
    },
    {
      chapter: 'Using the Doppler effect',
      layout: 'split',
      leftWidth: 544,
      left: [shift],
      right: [
        {
          kind: 'bullets',
          id: 'u',
          items: ['**Radar speed check**: the shift of waves reflected from a car gives its speed', '**Ultrasound scan**: the shift of waves reflected from blood cells gives the speed of the blood', '**Astronomy**: light from a galaxy that moves away is shifted to lower frequencies, a **red shift**'],
        },
      ],
      lines: [
        { say: 'That is how a radar speed check works. It sends waves at a car, and the shift in the frequency of the waves that come back gives the speed of the car.', show: ['shift', 'u.0'], play: 'shift.go' },
        { say: 'An ultrasound scan does the same with waves reflected from blood cells, to measure how fast the blood flows.', show: 'u.1' },
        { say: 'And the effect is true of light as well. Light from a galaxy that moves away from us is shifted to lower frequencies, towards the red end of the spectrum. Astronomers call this a red shift.', show: 'u.2', play: 'shift.on' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The speed of sound in the air is 340 m/s. A train sounds a whistle of frequency 800 Hz as it moves at 20 m/s directly away from a person. What frequency does the person hear?',
          choices: ['$850\\ \\text{Hz}$', '$755.6\\ \\text{Hz}$', '$847.1\\ \\text{Hz}$', '$752.9\\ \\text{Hz}$'],
          answer: 1,
          working: 'The source is moving away, so the frequency heard is lower, and we add underneath: $f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s} = 800 \\times \\dfrac{340}{340 + 20} = 800 \\times 0.9444 = 755.6\\ \\text{Hz}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The speed of sound in the air is 340 metres per second. A train sounds a whistle of 800 hertz as it moves at 20 metres per second directly away from a person. What frequency does the person hear? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The train is moving away, so the note must be lower, and we add underneath: 800, times 340, over 360. That is 800 times 0.9444, which is 755.6 hertz: choice B. Choice A is what the person would hear from a train that approaches.', show: 'q.answer' },
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
            'Source approaching: $f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s}$',
            'Source moving away: $f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s}$',
            'Decide first: closer means **higher**, apart means **lower**',
            'Run backwards, the shift gives the **speed** of the source',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For a source that approaches, the frequency heard is the true frequency, times the speed of the waves, over that speed minus the speed of the source.', show: 'sum.0' },
        { say: 'For a source that moves away, it is the same, with a plus sign underneath.', show: 'sum.1' },
        { say: 'Decide first which way the answer must go. Closer together means higher, and apart means lower.', show: 'sum.2' },
        { say: 'And run backwards, the shift in the frequency gives the speed of the source.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
