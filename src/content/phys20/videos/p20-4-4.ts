import type { Explainer, WaveEl } from '@/video/script.ts';

// Lesson 4.4, part 1: the properties of a wave. A single pulse runs along a rope while one piece
// of the rope only moves up and down; a rope beside a tube of air shows the two kinds of wave; the
// lesson's snapshot is frozen and read (amplitude 3 cm, wavelength 2 m); and ten waves are counted
// past the end of a pier in 25 s. Every wave is drawn from one rule (src/video/wave.ts): each
// place does what the source did a little earlier.

/** One flick of a long rope: a hump 3 cm high runs along it at 4 m/s. */
const flick: WaveEl = {
  kind: 'wave',
  id: 'flick',
  span: [0, 12],
  height: 400,
  mark: 8,
  markLabel: 'one piece of the rope',
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', label: 'A long rope', frequency: 0, amplitude: 3, speed: 4, pulses: [{ height: 3, width: 2.4 }] }],
  poster: 'go',
  clips: {
    go: { phases: [{ dur: 3.4, slow: 1.6, note: 'Slow motion' }] },
  },
};

/** A rope over a tube of air: the same frequency and speed, shaken across and along. */
const kinds: WaveEl = {
  kind: 'wave',
  id: 'kinds',
  span: [0, 12],
  height: 500,
  mark: 8,
  ruler: false,
  lanes: [
    { id: 'rope', kind: 'transverse', label: 'Transverse: a rope, shaken up and down', frequency: 1, amplitude: 2, speed: 4 },
    { id: 'air', kind: 'longitudinal', label: 'Longitudinal: air in a tube, pushed and pulled', frequency: 1, amplitude: 2, speed: 4 },
  ],
  clips: {
    start: { phases: [{ dur: 3 }] },
    on: { phases: [{ dur: 5 }] },
    slow: { phases: [{ dur: 2, slow: 3, note: 'Slow motion' }] },
  },
};

/** The lesson's snapshot: an amplitude of 3 cm and a wavelength of 2 m, with crests at 0.5 m, 2.5 m and 4.5 m once it is frozen. */
const snapshot: WaveEl = {
  kind: 'wave',
  id: 'snap',
  span: [0, 5],
  height: 380,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 0.5, amplitude: 3, speed: 1, full: true }],
  clips: {
    // Three seconds carry each crest 3 m along: from 1.5 m to 4.5 m.
    run: { phases: [{ dur: 3 }] },
  },
};

/** The lesson's pier: ten waves pass its end in 25 s, so 0.4 Hz. The waves travel at 2 m/s, 5 m apart. */
const pier: WaveEl = {
  kind: 'wave',
  id: 'pier',
  span: [0, 20],
  height: 360,
  mark: 14,
  markLabel: 'the end of the pier',
  amplitudeUnit: 'cm',
  lanes: [{ id: 'sea', kind: 'transverse', label: 'Waves on the sea', frequency: 0.4, amplitude: 30, speed: 2, full: true }],
  clips: {
    count: { phases: [{ dur: 25, slow: 0.4, note: '2.5 times as fast' }] },
    watch: { phases: [{ dur: 5 }] },
  },
};

const video: Explainer = {
  id: 'p20-4-4',
  lessonId: 'p20-4-4',
  title: 'Wave Properties',
  thumbnail: 'flick',
  summary:
    'A wave carries energy from place to place while the medium only vibrates. Watch a pulse run along a rope, compare a transverse wave with a longitudinal one, freeze a wave to read its amplitude and its wavelength, and count waves past a pier to find the frequency and the period.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Wave Properties', subtitle: 'Describing a wave' }],
      lines: [
        { say: 'A sound crosses a room. A ripple crosses a pond. In each case something travels, but it is not the air, and it is not the water.', show: 'title' },
        { say: 'This lesson is about what does travel, and how to measure it.' },
      ],
    },
    {
      chapter: 'What a wave is',
      layout: 'center',
      main: [flick],
      lines: [
        { say: 'Flick one end of a long rope, and a hump runs along it to the other end. Watch the marked piece of the rope as the hump goes by.', show: ['flick', 'flick.particle'], play: 'flick.go', playDelay: 3 },
        { say: 'The piece of rope moved up, and came back down. It went nowhere along the rope. What travelled was the disturbance, and the energy that goes with it.' },
        { say: 'That is a wave: a disturbance that carries energy from one place to another, without carrying matter. A mechanical wave needs a medium to travel through, such as a rope, water, or air.' },
      ],
    },
    {
      chapter: 'Two kinds of wave',
      layout: 'center',
      main: [kinds],
      lines: [
        { say: 'Shake the end of the rope steadily, and it sends out a steady train of waves. Do the same to the air in a tube, with a plate that pushes and pulls.', show: 'kinds', play: 'kinds.start' },
        { say: 'Waves are sorted by the way the medium vibrates. On the rope, each piece moves up and down, at right angles to the direction of travel. This is a transverse wave.', show: 'kinds.particle', focus: 'kinds.rope', play: 'kinds.on' },
        { say: 'In the tube, each particle of air moves back and forth, along the direction of travel. This is a longitudinal wave. Sound is a wave like this.', focus: 'kinds.air', play: 'kinds.slow' },
        { say: 'A transverse wave has crests and troughs. A longitudinal wave has compressions, where the medium is squeezed together, and rarefactions, where it is spread out.', show: 'kinds.labels' },
      ],
    },
    {
      chapter: 'Amplitude and wavelength',
      layout: 'center',
      main: [snapshot, { kind: 'math', id: 'r', size: 'md', lines: ['A = \\thc{3\\ \\text{cm}} \\qquad \\lambda = 2.5 - 0.5 = \\brand{2\\ \\text{m}}'] }],
      lines: [
        { say: 'Here is a wave on a rope. To measure it, freeze it. A picture of a wave at one instant is called a snapshot.', show: 'snap', play: 'snap.run' },
        { say: 'The amplitude, capital A, is the greatest displacement of the medium from its rest position: the height of a crest. Here it is three centimetres.', show: 'snap.amplitude' },
        { say: 'The wavelength is the length of one complete wave: from one crest to the next. Its symbol is the Greek letter lambda.', show: 'snap.wavelength' },
        { say: 'On this rope the crests are at 0.5 metres, and at 2.5 metres. So the wavelength is two metres.', show: 'r.0' },
      ],
    },
    {
      chapter: 'Period and frequency',
      layout: 'center',
      main: [pier, { kind: 'math', id: 'f', size: 'md', lines: ['f = \\dfrac{10}{25} = \\good{0.4\\ \\text{Hz}} \\qquad T = \\dfrac{25}{10} = \\thc{2.5\\ \\text{s}} \\qquad \\brand{f = \\dfrac{1}{T}}'] }],
      lines: [
        { say: 'The other two measurements are about time. Stand at the end of a pier, and count the waves that pass in 25 seconds.', show: ['pier', 'pier.count', 'pier.clock'], play: 'pier.count', playDelay: 5 },
        { say: 'Ten complete waves passed in 25 seconds. The frequency is the number of waves that pass a point each second: ten over 25, which is 0.4 hertz.', show: 'f.0' },
        { say: 'The period is the time for one complete wave to pass: 25 over ten, which is 2.5 seconds. As for any oscillation, the frequency is one over the period.' },
      ],
    },
    {
      chapter: 'A length, or a time?',
      layout: 'center',
      main: [pier],
      lines: [
        { say: 'Be careful not to mix up the wavelength and the period. The wavelength is a length. It is measured along the wave, at one instant.', show: ['pier', 'pier.wavelength'] },
        { say: 'The period is a time. It is measured at one place, by watching one point of the medium go up, down, and back up again.', show: 'pier.particle', play: 'pier.watch' },
        { say: 'So check the label on the horizontal axis of a graph of a wave. If it is a distance, one cycle is a wavelength. If it is a time, one cycle is a period.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '20 complete waves pass a point in 8 s. What is the period of the waves?',
          choices: ['$2.5\\ \\text{s}$', '$160\\ \\text{s}$', '$0.4\\ \\text{s}$', '$12\\ \\text{s}$'],
          answer: 2,
          working: 'The period is the time for one wave: $T = \\dfrac{8}{20} = 0.4\\ \\text{s}$. (The frequency is $\\dfrac{20}{8} = 2.5\\ \\text{Hz}$.)',
        },
      ],
      lines: [
        { say: 'Your turn. Twenty complete waves pass a point in eight seconds. What is the period of the waves? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The period is the time for one wave: eight over twenty, which is 0.4 seconds. That is choice C. Twenty over eight, 2.5, is the frequency in hertz, not the period.', show: 'q.answer' },
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
            'A **wave** carries energy through a medium whose particles only vibrate',
            '**Transverse**: across the direction of travel; **longitudinal**: along it',
            '**Amplitude**: height of a crest; **wavelength** $\\lambda$: length of one wave',
            '**Period** $T$: time for one wave to pass; $f = \\dfrac{1}{T}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A wave carries energy through a medium whose particles only vibrate.', show: 'sum.0' },
        { say: 'In a transverse wave the medium vibrates across the direction of travel, and in a longitudinal wave, along it.', show: 'sum.1' },
        { say: 'The amplitude is the height of a crest, and the wavelength is the length of one complete wave.', show: 'sum.2' },
        { say: 'And the period is the time for one wave to pass, with the frequency equal to one over the period.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
