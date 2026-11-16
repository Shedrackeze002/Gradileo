import type { Explainer, WaveEl } from '@/video/script.ts';

// Lesson 4.1: a wave is a vibration that travels, carrying energy and not matter. A hand sends a
// wave along a rope and one marked point of the rope only moves up and down; a rope beside a tube
// of air shows the two kinds of wave; then the wave is frozen and measured: amplitude, wavelength,
// and the waves that pass a post each second. Every wave is drawn from one rule (src/video/wave.ts):
// each place does what the source did a little earlier.

// A rope whose wave travels at 4 m/s, shaken once a second: a wavelength of 4 m.
const rope: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 400,
  mark: 8,
  markLabel: 'one point of the rope',
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', label: 'A long rope', frequency: 1, amplitude: 2, speed: 4 }],
  poster: 'on',
  clips: {
    start: { phases: [{ dur: 3 }] },
    on: { phases: [{ dur: 4 }] },
    slow: { phases: [{ dur: 2, slow: 2.5, note: 'Slow motion' }] },
  },
};

// The rope again, over air in a tube with a plate that pushes and pulls its end.
const kinds: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 470,
  mark: 8,
  ruler: false,
  lanes: [
    { id: 'rope', kind: 'transverse', label: 'A rope, shaken up and down', frequency: 1, amplitude: 2, speed: 4 },
    { id: 'air', kind: 'longitudinal', label: 'Air in a tube, pushed and pulled', frequency: 1, amplitude: 2, speed: 4 },
  ],
  clips: {
    start: { phases: [{ dur: 3 }] },
    on: { phases: [{ dur: 4 }] },
    slow: { phases: [{ dur: 2, slow: 2.5, note: 'Slow motion' }] },
  },
};

// The wave already along the whole rope, to freeze and measure: crests at 3 m, 7 m and 11 m.
const frozen: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 400,
  mark: 6,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'rope', kind: 'transverse', frequency: 1, amplitude: 2, speed: 4, full: true }],
  clips: {
    count: { phases: [{ dur: 4 }] },
  },
};

const video: Explainer = {
  id: 'p10-4-1',
  lessonId: 'p10-4-1',
  title: 'What a Wave Is',
  thumbnail: 'w',
  summary:
    'A wave is a vibration that travels, carrying energy from place to place without carrying matter. Watch a wave run along a rope while each point of the rope only moves up and down, compare a transverse wave with a longitudinal one, and measure a wave: its amplitude, its wavelength, its frequency and its period.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Waves, Sound and Light', title: 'What a Wave Is', subtitle: 'Energy that travels without carrying matter' }],
      lines: [
        { say: 'Drop a pebble into a still pond, and ripples spread outwards. Something travels across the pond, yet the water itself stays where it was.', show: 'title' },
        { say: 'That something is a wave. In this lesson, you will see what a wave really is, and how to measure one.' },
      ],
    },
    {
      chapter: 'Energy travels, matter stays',
      layout: 'center',
      main: [rope, { kind: 'callout', id: 'def', tone: 'definition', title: 'Wave', md: 'A vibration that travels. It transfers **energy** from one place to another, without transferring matter.' }],
      lines: [
        { say: 'Here is a long rope, lying still. A hand at the left end starts to move up and down.', show: 'w', play: 'w.start', playDelay: 2.5 },
        { say: 'A wave runs along the rope, from the hand to the far end. But look closely at one point of the rope.', show: 'w.particle', play: 'w.on', playDelay: 0.5 },
        { say: 'In slow motion, you can see that it only moves up and down, about its own place. It never travels along with the wave.', play: 'w.slow' },
        { say: 'It is like a leaf floating on a pond. As the ripples pass, the leaf bobs up and down, but it does not travel to the bank with them.', play: 'w.on' },
        { say: 'So what is travelling? Energy. The hand does work on the rope, and that energy arrives at the far end. A wave is a vibration that travels. It transfers energy from one place to another, without transferring matter.', show: 'def' },
      ],
    },
    {
      chapter: 'Two kinds of wave',
      layout: 'center',
      main: [kinds, { kind: 'text', id: 'two', size: 'md', md: '**Transverse**: vibrations at right angles to the travel. **Longitudinal**: vibrations along the travel.' }],
      lines: [
        { say: 'There are two kinds of wave, and they are named by the direction of the vibrations.', show: 'w', play: 'w.start', playDelay: 1.5 },
        { say: 'On the rope, each point moves up and down, while the wave moves along. The vibrations are at right angles to the direction of travel. This is a transverse wave.', show: 'w.particle', focus: 'w.rope', play: 'w.on' },
        { say: 'Below it is air in a tube. A plate at the left pushes and pulls the air next to it. Each particle moves backwards and forwards, along the same line the wave travels. This is a longitudinal wave.', focus: 'w.air', play: 'w.slow' },
        { say: 'A transverse wave has crests and troughs. A longitudinal wave has compressions, where the particles are squashed together, and rarefactions, where they are spread apart.', show: 'w.labels' },
        { say: 'Ripples on water, a wave on a rope, and light are all transverse. Sound is longitudinal, and so is a pulse pushed along a spring.', hide: 'w.labels', show: 'two', play: 'w.on' },
      ],
    },
    {
      chapter: 'Measuring a wave',
      layout: 'center',
      main: [frozen, { kind: 'math', id: 'f', size: 'md', lines: ['\\text{frequency} = \\dfrac{4\\ \\text{waves}}{4\\ \\text{s}} = \\thc{1\\ \\text{Hz}} \\qquad \\text{period} = \\thc{1\\ \\text{s}}'] }],
      lines: [
        { say: 'To describe a wave, we freeze it at one moment, like a photograph. The dotted line is the rest position, where the rope lies when there is no wave.', show: 'w' },
        { say: 'The amplitude is the greatest distance of a point from its rest position. It is measured from the rest position up to a crest. Here, it is two centimetres.', show: 'w.amplitude' },
        { say: 'Be careful. From the bottom of a trough to the top of a crest is twice the amplitude. That would be four centimetres, not two.', show: 'w.labels' },
        { say: 'The wavelength is the length of one complete wave, from one crest to the next. On the ruler, this crest is at seven metres and the next is at eleven metres. So the wavelength is four metres.', hide: 'w.labels', show: 'w.wavelength' },
        { say: 'Now let the wave run, and count the complete waves that pass the yellow post.', hide: ['w.amplitude', 'w.wavelength'], show: ['w.count', 'w.clock'], play: 'w.count', playDelay: 2.5 },
        { say: 'Four waves passed in four seconds. That is one wave each second. The frequency is the number of complete waves each second. It is measured in hertz, so this wave has a frequency of one hertz.', caption: 'Four waves passed in four seconds. That is one wave each second. The frequency is the number of complete waves each second. It is measured in hertz (Hz), so this wave has a frequency of 1 Hz.', show: 'f' },
        { say: 'And the period is the time for one complete wave to pass. Here, that is one second.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a frozen wave, one crest is at 2 m and the next crest is at 8 m. The crests are 4 cm above the rest position. What are the wavelength and the amplitude?',
          choices: ['6 m and 8 cm', '6 m and 4 cm', '3 m and 4 cm', '10 m and 8 cm'],
          answer: 1,
          working: 'Wavelength: crest to crest, $8 - 2 = 6\\ \\text{m}$. Amplitude: rest position to crest, $4\\ \\text{cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a frozen wave, one crest is at two metres and the next crest is at eight metres. The crests are four centimetres above the rest position. What are the wavelength and the amplitude? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The wavelength is from crest to crest. Eight minus two is six metres. The amplitude is from the rest position to a crest, which is four centimetres. That is choice B.', show: 'q.answer' },
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
            'A wave transfers energy without transferring matter',
            'Transverse: vibrations at right angles to the travel (a rope, ripples, light)',
            'Longitudinal: vibrations along the travel (sound)',
            'Amplitude: rest position to crest. Wavelength: crest to crest',
            'Frequency: complete waves each second, in hertz. Period: the time for one wave',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A wave transfers energy from place to place, without transferring matter.', show: 'end.0' },
        { say: 'In a transverse wave, the vibrations are at right angles to the direction of travel, as on a rope, in ripples, and in light.', show: 'end.1' },
        { say: 'In a longitudinal wave, the vibrations are along the direction of travel, as in sound.', show: 'end.2' },
        { say: 'The amplitude is from the rest position to a crest. The wavelength is from one crest to the next.', show: 'end.3' },
        { say: 'And the frequency is the number of complete waves each second, in hertz. The period is the time for one wave.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
