import type { Explainer, RipplesEl, WaveEl } from '@/video/script.ts';

// Lesson 4.5, part 2: superposition and interference. Two pulses run towards each other along a
// rope, and where they overlap the rope carries their sum (src/video/wave.ts): 5 cm and 3 cm give
// 8 cm, 5 cm and −3 cm give 2 cm, and 4 cm and −4 cm leave the rope flat for an instant, moving
// fastest. Then two speakers in step, seen from above (src/video/ripples.ts): a listener 3 m from
// one and 4.25 m from the other is 2.5 wavelengths farther from the second, where the two waves
// cancel; at 4.5 m the difference is 3 wavelengths, and they add.

/**
 * Two pulses 2 m long on a rope of 10 m, from opposite ends at 2 m/s. Their middles meet at 5 m
 * after 3 s: the clips stop there, and again when the pulses have passed through each other.
 */
const pair = (id: string, left: number, right: number): WaveEl => ({
  kind: 'wave',
  id,
  span: [0, 10],
  height: 400,
  amplitudeUnit: 'cm',
  lanes: [
    {
      id: 'rope',
      kind: 'transverse',
      frequency: 0,
      amplitude: Math.max(Math.abs(left), Math.abs(right)),
      speed: 2,
      pulses: [
        { height: left, width: 2 },
        { height: right, width: 2, from: 'right' },
      ],
    },
  ],
  clips: {
    in: { phases: [{ dur: 1.2, slow: 1.5 }] },
    meet: { phases: [{ dur: 1, slow: 1.5 }, { dur: 0.8, slow: 5, note: 'Slow motion' }] },
    part: { phases: [{ dur: 0.8, slow: 5, note: 'Slow motion' }, { dur: 1, slow: 1.5 }] },
  },
});

/** The lesson's two crests: 5 cm and 3 cm give 8 cm. */
const crests = pair('crests', 5, 3);
/** The lesson's crest and trough: 5 cm and −3 cm give 2 cm. */
const mixed = pair('mixed', 5, -3);
/** A crest and a trough of the same size: the rope is flat for an instant. */
const equal = pair('equal', 4, -4);

/** The place that is `a` metres from speaker A at (0, 1) and `b` metres from speaker B at (0, −1). */
const place = (a: number, b: number): [number, number] => {
  const y = (b * b - a * a) / 4;
  return [Math.sqrt(a * a - (y - 1) ** 2), y];
};

/**
 * The lesson's two speakers, 2 m apart and in step: sound of 680 Hz at 340 m/s, so a wavelength
 * of 0.5 m. The listener starts 3 m and 4.25 m from them, and walks to where the second is 4.5 m away.
 */
const room: RipplesEl = {
  kind: 'ripples',
  id: 'room',
  view: [-0.8, -2.3, 4.8, 3.3],
  speed: 340,
  full: true,
  height: 610,
  sources: [
    { id: 'a', label: 'Speaker A', at: [0, 1], frequency: 680, side: 'below' },
    { id: 'b', label: 'Speaker B', at: [0, -1], frequency: 680, side: 'below' },
  ],
  listeners: [{ id: 'ear', label: 'Listener', at: place(3, 4.25), side: 'right' }],
  poster: 'play',
  clips: {
    play: { phases: [{ dur: 0.006, slow: 1000, note: 'Slow motion' }] },
    on: { phases: [{ dur: 0.006, slow: 1000, note: 'Slow motion' }] },
    walk: { phases: [{ dur: 0.007, slow: 1000, note: 'Slow motion', move: { ear: place(3, 4.5) } }] },
    after: { phases: [{ dur: 0.005, slow: 1000, note: 'Slow motion' }] },
    bands: { phases: [{ dur: 0.007, slow: 1000, note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'p20-4-5-b',
  lessonId: 'p20-4-5',
  title: 'Reflection and Echoes, Part 2: Superposition and Interference',
  thumbnailTitle: 'Interference',
  thumbnail: 'room',
  summary:
    'Two waves that meet pass straight through each other, and while they overlap the medium carries their sum. Add two pulses on a rope, see a crest and a trough cancel and then reappear, and use the path difference to find where the sound from two speakers is loud and where it is quiet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Superposition and Interference', subtitle: 'When two waves meet' }],
      lines: [
        { say: 'Two balls that meet head on bounce apart. Two waves that meet head on do something no solid object can do.', show: 'title' },
        { say: 'They pass straight through each other. This lesson is about what happens while they overlap.' },
      ],
    },
    {
      chapter: 'Two crests',
      layout: 'center',
      main: [crests, { kind: 'math', id: 'm', size: 'md', lines: ['5 + 3 = \\good{8\\ \\text{cm}}'] }],
      lines: [
        { say: 'Send two pulses along a rope from opposite ends, towards each other.', show: 'crests', play: 'crests.in' },
        { say: 'One is a crest five centimetres high, and the other is a crest three centimetres high. What does the rope do where they meet?', show: 'crests.heights' },
        { say: 'Watch the rope where they overlap. The dashed outlines show each pulse on its own.', hide: 'crests.heights', show: ['crests.pulses', 'crests.sum'], play: 'crests.meet' },
        { say: 'At the instant they overlap exactly, the rope is eight centimetres above its rest position: five plus three.', show: 'm.0' },
        { say: 'This is the principle of superposition: where waves overlap, the displacement is the sum of the displacements each would give on its own. Here the sum is larger than either pulse, so this is constructive interference.' },
        { say: 'And afterwards, each pulse carries on unchanged, as if the other had never been there.', hide: 'crests.sum', play: 'crests.part' },
      ],
    },
    {
      chapter: 'A crest and a trough',
      layout: 'center',
      main: [mixed, { kind: 'math', id: 'n', size: 'md', lines: ['5 + ({-3}) = \\thc{2\\ \\text{cm}}'] }],
      lines: [
        { say: 'Now turn the second pulse over. The crest of five centimetres meets a trough three centimetres deep.', show: 'mixed', play: 'mixed.in' },
        { say: 'Count a displacement above the rest position as positive, and one below it as negative. So these two are plus five, and minus three.', show: 'mixed.heights' },
        { say: 'Let them meet.', hide: 'mixed.heights', show: ['mixed.pulses', 'mixed.sum'], play: 'mixed.meet' },
        { say: 'Five plus negative three is two. The rope is only two centimetres above its rest position, which is less than the crest alone. This is destructive interference.', show: 'n.0' },
        { say: 'Again, both pulses carry on unchanged.', hide: 'mixed.sum', play: 'mixed.part' },
      ],
    },
    {
      chapter: 'Do waves that cancel disappear?',
      layout: 'center',
      main: [equal],
      lines: [
        { say: 'What if the crest and the trough are the same size? Watch closely.', show: ['equal', 'equal.pulses'], play: ['equal.in'] },
        { say: 'Here they come.', play: 'equal.meet' },
        { say: 'For an instant, the rope is completely flat. The two pulses have cancelled.' },
        { say: 'But look at how the rope is moving at that instant. It is moving faster than at any other time. The energy of the two pulses has not vanished: it is all in the motion of the rope.', show: 'equal.motion' },
        { say: 'So nothing has been destroyed. Both pulses reappear on the far side, and carry on.', hide: 'equal.motion', play: 'equal.part' },
      ],
    },
    {
      chapter: 'Two speakers',
      layout: 'center',
      main: [room],
      lines: [
        { say: 'Interference explains a strange effect. Two loudspeakers play the same note, in step, and the sound spreads out from each in circles. Each circle here is a crest.', show: 'room', play: 'room.play', playDelay: 2 },
        { say: 'Walk across the room, and the sound is loud in some places and quiet in others. What matters at each place is how far the sound has come from each speaker.', show: 'room.paths' },
        { say: 'This listener is three metres from speaker A, and 4.25 metres from speaker B. The path difference is 1.25 metres. The wavelength of this sound is 0.5 metres, so that is two and a half wavelengths.', show: 'room.difference' },
        { say: 'The extra half wavelength means that a crest from one speaker arrives with a trough from the other. Here are the two waves as they reach the listener, and their sum.', show: 'room.traces', play: 'room.on', playDelay: 4 },
        { say: 'They cancel. The interference is destructive, and the sound here is quiet.', show: 'room.loudness' },
        { say: 'Now the listener walks on, until speaker B is 4.5 metres away.', play: 'room.walk' },
        { say: 'The path difference is now 1.5 metres: exactly three wavelengths. Crest arrives with crest, the interference is constructive, and the sound is loud.', play: 'room.after' },
        { say: 'So here is the rule, for two sources in step. A path difference of a whole number of wavelengths gives constructive interference. An odd number of half wavelengths gives destructive interference.' },
        { say: 'Shade the whole room by how loud the sound is, and the loud places and the quiet places form bands that fan out from between the speakers.', show: 'room.pattern', play: 'room.bands' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two speakers vibrate in step and give out sound of wavelength 0.8 m. A listener is 5.0 m from one speaker and 6.2 m from the other. What does the listener hear?',
          choices: ['A loud sound: the path difference is 1.5 wavelengths', 'A quiet sound: the path difference is 1.5 wavelengths', 'A loud sound: the path difference is 14 wavelengths', 'A quiet sound: the path difference is 0.96 wavelengths'],
          answer: 1,
          working: 'Path difference: $6.2 - 5.0 = 1.2\\ \\text{m}$. In wavelengths: $\\dfrac{1.2}{0.8} = 1.5$. That is an odd number of half wavelengths, so crest meets trough: destructive interference, and the sound is quiet.',
        },
      ],
      lines: [
        { say: 'Your turn. Two speakers vibrate in step, and give out sound of wavelength 0.8 metres. A listener is 5.0 metres from one speaker, and 6.2 metres from the other. What does the listener hear? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The path difference is 6.2 minus 5.0, which is 1.2 metres. Divide by the wavelength: 1.2 over 0.8 is 1.5 wavelengths. That is an odd number of half wavelengths, so crest meets trough, and the sound is quiet. That is choice B.', show: 'q.answer' },
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
            '**Superposition**: where waves overlap, add their displacements',
            '**Constructive**: crest on crest. **Destructive**: crest on trough',
            'Waves that cancel carry on **unchanged** afterwards',
            'Path difference: whole $\\lambda$ is loud; an odd number of half $\\lambda$ is quiet',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The principle of superposition: where waves overlap, add their displacements.', show: 'sum.0' },
        { say: 'Crest on crest is constructive interference, and crest on trough is destructive.', show: 'sum.1' },
        { say: 'Waves that cancel are not destroyed. They carry on unchanged afterwards.', show: 'sum.2' },
        { say: 'And for two sources in step, a path difference of a whole number of wavelengths is loud, and an odd number of half wavelengths is quiet.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
