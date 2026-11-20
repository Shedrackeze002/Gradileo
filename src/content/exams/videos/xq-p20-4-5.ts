import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for lesson 4.5 (superposition and interference): what kinds of interference can
// occur between two identical waves moving in opposite directions? The question is OpenStax
// Physics' own, word for word (Test Prep, section 13.3, CC BY 4.0). Each wave has crests and
// troughs, so as they pass through each other a crest meets a crest in some places (constructive)
// and a crest meets a trough in others (destructive): both (choice c). Together they make a
// standing wave, whose antinodes and nodes show the two kinds side by side.
//
// Every wave is carried by the rule of src/video/wave.ts, so the sums on screen come out of the
// pulses and waves given here: two crests of 3 cm make 6 cm, a crest and a trough of 3 cm make a
// flat rope, and a wave meeting its own reflection makes nodes and antinodes.

/**
 * Two pulses 2 m long on a rope of 10 m, from opposite ends at 2 m/s. Their middles meet at 5 m
 * after 3 s: the clips stop there, and again when the pulses have passed through each other.
 */
const pair = (id: string, left: number, right: number): WaveEl => ({
  kind: 'wave',
  id,
  span: [0, 10],
  height: 380,
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

const crests = pair('crests', 3, 3);
const opposite = pair('opposite', 3, -3);

/**
 * A wave of 2 Hz at 4 m/s (a wavelength of 2 m) on a string tied to a wall 6 m along the ruler:
 * its reflection is an identical wave travelling the other way. The hand is a sixth of a metre
 * before the first node, so it goes on shaking as before. The wave reaches the wall after REACH
 * seconds, and its reflection is back at the hand after twice that.
 */
const REACH = (6 + 1 / 6) / 4;
const made: WaveEl = {
  kind: 'wave',
  id: 'made',
  span: [-1 / 6, 6],
  height: 420,
  amplitudeUnit: 'cm',
  lanes: [{ id: 'string', kind: 'transverse', frequency: 2, amplitude: 2, speed: 4, reflect: true }],
  poster: 'on',
  clips: {
    out: { reset: true, phases: [{ dur: REACH, slow: 2.5, note: 'Slow motion' }] },
    back: { phases: [{ dur: REACH, slow: 3, note: 'Slow motion' }] },
    // The pattern is at its widest every quarter of a second after the wave first reached the wall: the clips stop then.
    stand: { phases: [{ dur: 2.25 - REACH, slow: 3, note: 'Slow motion' }, { dur: 1.5, slow: 3, note: 'Slow motion' }] },
    on: { phases: [{ dur: 2.5, slow: 3, note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-4-5',
  lessonId: '',
  exam: {
    lesson: 'p20-4-5',
    source: 'OpenStax, Physics, Test Prep for section 13.3, Wave Interaction: Superposition and Interference',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/13-3-wave-interaction-superposition-and-interference',
    question: 'What kind(s) of interference can occur between two identical waves moving in opposite directions?',
    choices: ['Constructive interference only', 'Destructive interference only', 'Both constructive and destructive interference', 'Neither constructive nor destructive interference'],
  },
  title: 'Exam Question: Two Waves Meet. Do They Add Up or Cancel?',
  thumbnailTitle: 'Do Waves Add or Cancel?',
  thumbnail: 'made',
  summary:
    'A real test question, solved one small step at a time: what kinds of interference can happen between two identical waves moving in opposite directions? We send pulses along a rope to see crest meeting crest and crest meeting trough, then let two whole waves pass through each other and make a standing wave, with both kinds of interference at once. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Do Waves Add or Cancel?', subtitle: 'Superposition and interference, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about what happens when two waves meet. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What kind(s) of interference can occur between two identical waves moving in opposite directions?',
          choices: ['Constructive interference only', 'Destructive interference only', 'Both constructive and destructive interference', 'Neither constructive nor destructive interference'],
          answer: 2,
          working: 'Each wave has crests and troughs. Where crest meets crest the waves add (constructive); where crest meets trough they cancel (destructive). Both happen: a standing wave.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What kinds of interference can occur between two identical waves moving in opposite directions?' },
        { say: 'The choices are: constructive interference only; destructive interference only; both constructive and destructive interference; or neither. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [made, { kind: 'text', id: 'plain', size: 'lg', md: 'Identical waves, **opposite** ways: **add**, **cancel**, or both?' }],
      lines: [
        { say: 'Let us picture it. Shake one end of a string steadily, and a wave runs along it to the wall.', show: 'made', play: 'made.out' },
        { say: 'At the wall it bounces back. The wave coming back is identical to the one going out: the same size, the same wavelength. It just travels the opposite way, through the waves still arriving.', play: 'made.back' },
        { say: 'The question asks: when two waves like this meet, do they add up, do they cancel, or both?', show: 'plain' },
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
          title: 'Superposition',
          md: 'Where two waves overlap, the medium\'s displacement is the **sum** of what each would give on its own. If they add to more than either alone, that is **constructive** interference. If they partly or wholly cancel, that is **destructive** interference.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Up $3$ cm and up $3$ cm: $+6$ cm. Up $3$ cm and down $3$ cm: $0$ cm.' },
      ],
      lines: [
        { say: 'Here is what we need. Where two waves overlap, they simply add. This is the principle of superposition.', show: 'def' },
        { say: 'If they add to more than either wave alone, that is constructive interference. If they cancel, partly or completely, that is destructive interference.' },
        { say: 'For example, three centimetres up plus three centimetres up is six centimetres up. But three up plus three down is zero.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['A wave has **crests** and **troughs**', 'Watch a crest meet a **crest**', 'Watch a crest meet a **trough**', 'Watch two whole waves pass through each other'],
        },
      ],
      lines: [
        { say: 'Here is the plan. A wave is not one bump. It is a train of crests and troughs, one after another. So as two waves pass through each other, many different meetings happen.', show: 'plan.0' },
        { say: 'First, we will watch a crest meet a crest.', show: 'plan.1' },
        { say: 'Second, a crest meet a trough.', show: 'plan.2' },
        { say: 'Third, two whole waves at once.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Crest meets crest',
      layout: 'center',
      main: [crests, { kind: 'math', id: 'm', size: 'md', lines: ['3 + 3 = \\good{6\\ \\text{cm}}:\\ \\text{constructive}'] }],
      lines: [
        { say: 'Step one. Here is one crest from each wave, three centimetres high, coming from opposite ends of a rope.', show: ['crests', 'crests.heights'], play: 'crests.in' },
        { say: 'Watch where they overlap. The dashed outlines show each one on its own.', hide: 'crests.heights', show: ['crests.pulses', 'crests.sum'], play: 'crests.meet' },
        { say: 'Three plus three: for an instant the rope is six centimetres high. That is constructive interference.', show: 'm.0' },
        { say: 'Then each crest carries on, unchanged.', hide: 'crests.sum', play: 'crests.part' },
      ],
    },
    {
      chapter: 'Step 2: Crest meets trough',
      layout: 'center',
      main: [opposite, { kind: 'math', id: 'm', size: 'md', lines: ['3 + ({-3}) = \\opp{0\\ \\text{cm}}:\\ \\text{destructive}'] }],
      lines: [
        { say: 'Step two. But the waves have troughs too. Here a crest from one wave meets a trough from the other, the same size.', show: ['opposite', 'opposite.heights'], play: 'opposite.in' },
        { say: 'Watch closely.', hide: 'opposite.heights', show: ['opposite.pulses', 'opposite.sum'], play: 'opposite.meet' },
        { say: 'Three plus minus three is zero. For an instant the rope is completely flat. That is destructive interference.', show: 'm.0' },
        { say: 'And again, both carry on unchanged. Nothing was destroyed.', hide: 'opposite.sum', play: 'opposite.part' },
      ],
    },
    {
      chapter: 'Step 3: Two whole waves',
      layout: 'center',
      main: [made, { kind: 'text', id: 'both', size: 'lg', md: '**Antinodes**: constructive. **Nodes**: destructive. **Both**: choice **C**.' }],
      lines: [
        { say: 'Step three. Now two whole waves, identical, travelling opposite ways. Every crest and trough of one passes every crest and trough of the other.', show: 'made', play: 'made.stand' },
        { say: 'They add up to a pattern that stays in one place: a standing wave. Look at the points that never move. These are the nodes. There the two waves always cancel: destructive interference.', show: 'made.nodes', play: 'made.on' },
        { say: 'Half way between, the string swings twice as far as either wave alone. These are the antinodes. There the two waves always add: constructive interference.' },
        { say: 'Both kinds happen at once, just in different places. So the answer is choice C: both constructive and destructive interference.', show: 'both', focus: 'both' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is tempting'],
          rows: [
            ['Constructive only', '"Identical" sounds like **in step** everywhere'],
            ['Destructive only', '"Opposite directions" sounds like **cancelling**'],
            ['Neither', 'Thinking waves **bounce off** each other'],
            ['Both', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Constructive only: identical sounds as if the waves must always be in step. But moving opposite ways, they are in step in some places and out of step in others.' },
        { say: 'Destructive only: opposite directions sounds like cancelling. But direction is not the same as being upside down. Crests still meet crests.' },
        { say: 'And neither: waves do not bounce off each other. They pass straight through, adding wherever they overlap.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two pulses, each 4 cm in size, travel towards each other on a rope. One is a crest and the other is a trough. What is the displacement of the rope where their middles meet?',
          choices: ['8 cm', '4 cm', '2 cm', '0 cm'],
          answer: 3,
          working: 'Add the displacements: $+4 + ({-4}) = 0$ cm. This is destructive interference.',
        },
      ],
      lines: [
        { say: 'Your turn. Two pulses, each four centimetres in size, travel towards each other on a rope. One is a crest and the other is a trough. What is the displacement of the rope where their middles meet? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Add them, with the trough counted as negative. Plus four and minus four is zero. That is choice D. Eight centimetres would be two crests.', show: 'q2.answer' },
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
          items: ['Where waves overlap, **add** the displacements', 'Crest on crest: **constructive**. Crest on trough: **destructive**', 'Two identical waves going opposite ways make a **standing wave**', 'Nodes cancel, antinodes add: **both** at once'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Where waves overlap, add their displacements.', show: 'sum.0' },
        { say: 'Crest on crest is constructive interference, and crest on trough is destructive.', show: 'sum.1' },
        { say: 'Two identical waves travelling in opposite directions make a standing wave.', show: 'sum.2' },
        { say: 'Its nodes are destructive and its antinodes are constructive, both at once. For more on interference, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
