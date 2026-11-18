import type { Explainer, WaveEl, WaveLane } from '@/video/script.ts';

// Lesson 4.5, part 1: reflection and echoes. A crest runs along a rope to a wall and comes back as
// a trough, to a free end and comes back as a crest, and to a join with a heavier rope, where part
// goes on and part comes back. Then three echoes, as pulses of sound that travel to a wall and
// back: a cliff 255 m away (1.5 s), a wall 85 m away (0.50 s) and a sea bed 60 m down (80 ms).
// Every pulse is carried by the rule of src/video/wave.ts, so the distances and times on screen
// come out of the speeds given here.

/** A crest 3 cm high and 1.6 m long, on a rope 8 m long where it travels at 4 m/s. */
const rope = (id: string, more: Partial<WaveLane>): WaveLane => ({ id, kind: 'transverse', frequency: 0, amplitude: 3, speed: 4, pulses: [{ height: 3, width: 1.6 }], ...more });

/**
 * A rope tied to a wall. The middle of the crest is 0.4 m from the wall after 2.1 s, when the
 * rope is at its steepest there; by 2.6 s the trough is clear of the wall.
 */
const fixed: WaveEl = {
  kind: 'wave',
  id: 'fixed',
  span: [0, 8],
  height: 400,
  amplitudeUnit: 'cm',
  lanes: [rope('rope', { label: 'A rope tied to a wall', reflect: true })],
  poster: 'back',
  clips: {
    in: { phases: [{ dur: 2.1, slow: 2, note: 'Slow motion' }] },
    turn: { phases: [{ dur: 0.5, slow: 8, note: 'Slow motion' }] },
    back: { phases: [{ dur: 0.9, slow: 2.5, note: 'Slow motion' }] },
  },
};

/** The same crest on two ropes: one tied to a wall, and one that ends in a ring on a pole. The middle of each crest reaches the end after 2.2 s. */
const ends: WaveEl = {
  kind: 'wave',
  id: 'ends',
  span: [0, 8],
  height: 540,
  amplitudeUnit: 'cm',
  lanes: [rope('tied', { label: 'A fixed end', reflect: true }), rope('ring', { label: 'A free end', reflect: 'free' })],
  clips: {
    in: { phases: [{ dur: 2.2, slow: 2.5, note: 'Slow motion' }] },
    back: { phases: [{ dur: 1.2, slow: 4, note: 'Slow motion' }] },
  },
};

/**
 * A light rope tied to a heavy one, where the pulse travels at half the speed. A third of the
 * crest comes back, turned over, and two thirds go on: 1 cm and 2 cm.
 */
const join: WaveEl = {
  kind: 'wave',
  id: 'join',
  span: [0, 10],
  height: 400,
  amplitudeUnit: 'cm',
  lanes: [rope('rope', { medium: { from: 6, speed: 2 } })],
  clips: {
    in: { phases: [{ dur: 1.3, slow: 2, note: 'Slow motion' }] },
    on: { phases: [{ dur: 1.4, slow: 4, note: 'Slow motion' }] },
  },
};

/**
 * A pulse of sound that travels to a wall `d` metres away and back at `v` m/s. Its middle leaves
 * as the clock starts, so the clip ends as the middle of the echo returns: after 2d ÷ v.
 */
const echo = (id: string, d: number, v: number, label: string, slow: number, more: Partial<WaveEl> = {}): WaveEl => {
  const width = d / 6;
  return {
    kind: 'wave',
    id,
    span: [0, d],
    height: 300,
    lanes: [{ id: 'air', kind: 'longitudinal', label, frequency: 0, amplitude: 2, speed: v, reflect: true, pulses: [{ height: 2, width, at: -width / (2 * v) }] }],
    clips: { go: { phases: [{ dur: (2 * d) / v, slow, note: 'Slow motion' }] } },
    ...more,
  };
};

/** The lesson's cliff: the echo of a shout returns after 1.5 s, so the cliff is 340 × 1.5 ÷ 2 = 255 m away. */
const cliff = echo('cliff', 255, 340, 'A shout, towards a cliff', 4);
/** The lesson's wall, 85 m away: the echo of a clap returns after 170 ÷ 340 = 0.50 s. */
const wall = echo('wall', 85, 340, 'A clap, 85 m from a wall', 12);
/** The lesson's echo sounding: a pulse at 1500 m/s returns from the sea bed after 80 ms, so the sea is 60 m deep. */
const sea = echo('sea', 60, 1500, 'A pulse of sound, from a ship to the sea bed', 80, { clock: { unit: 'ms', seconds: 0.001 } });

const video: Explainer = {
  id: 'p20-4-5',
  lessonId: 'p20-4-5',
  title: 'Reflection and Echoes',
  thumbnail: 'fixed',
  summary:
    'What does a wave do when it reaches the end of its medium? Watch a pulse come back upside down from a fixed end, the same way up from a free end, and split in two at a join with a heavier rope. Then use d = vt ÷ 2 to find distances and times from echoes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Reflection and Echoes', subtitle: 'When a wave meets a barrier' }],
      lines: [
        { say: 'Shout towards a cliff, and a moment later the cliff shouts back. The sound did not stop at the rock. It turned round.', show: 'title' },
        { say: 'This lesson is about what a wave does when it reaches the end of its medium, and how to measure distances with an echo.' },
      ],
    },
    {
      chapter: 'A fixed end',
      layout: 'center',
      main: [fixed],
      lines: [
        { say: 'Send a single pulse along a rope that is tied to a wall. This pulse is a crest: the rope is lifted above its rest position.', show: 'fixed', play: 'fixed.in', playDelay: 3 },
        { say: "Stop it as the crest arrives. The rope pulls up on the wall. So, by Newton's third law, the wall pulls down on the rope.", show: 'fixed.pull' },
        { say: 'That downward pull sends a pulse back along the rope. Look at which way up it is.', hide: 'fixed.pull', play: 'fixed.turn' },
        { say: 'The crest came back as a trough. This is reflection, and at a fixed end, a pulse is reflected inverted.', play: 'fixed.back' },
      ],
    },
    {
      chapter: 'A free end',
      layout: 'center',
      main: [ends],
      lines: [
        { say: 'Now let the end of the rope move. The lower rope ends in a ring, which slides freely up and down a pole. Send the same crest along both ropes.', show: 'ends', play: 'ends.in', playDelay: 7 },
        { say: 'Nothing holds the free end down. The crest flicks it upwards, to twice the height of the pulse.', show: 'ends.sum' },
        { say: 'And that upward flick sends back a crest. At a free end, a pulse is reflected the same way up.', hide: 'ends.sum', play: 'ends.back' },
        { say: 'Both pulses come back at the same speed as before, because they are still in the same rope.' },
      ],
    },
    {
      chapter: 'A join',
      layout: 'center',
      main: [join],
      lines: [
        { say: 'Most barriers are neither fixed nor free. Tie the light rope to a heavier one, where a pulse travels at only half the speed.', show: ['join', 'join.speed'], play: 'join.in', playDelay: 4 },
        { say: 'At the join, both things happen at once. Part of the pulse goes on into the heavy rope, and part of it is reflected.', play: 'join.on' },
        { say: 'The reflected part is inverted, because the heavy rope acts partly like a fixed end. Here, a crest of three centimetres sends on a crest of two, and sends back a trough of one.', show: 'join.heights' },
      ],
    },
    {
      chapter: 'Echoes',
      layout: 'center',
      main: [cliff, { kind: 'math', id: 'e', size: 'md', lines: ['vt = 340 \\times 1.5 = \\thc{510\\ \\text{m}}\\ \\text{(there and back)}', '\\brand{d = \\dfrac{vt}{2}} = \\dfrac{510}{2} = \\good{255\\ \\text{m}}'] }],
      lines: [
        { say: 'An echo is a reflected sound. A hiker shouts towards a cliff, and hears the echo 1.5 seconds later. How far away is the cliff?', show: ['cliff', 'cliff.front', 'cliff.clock'], play: 'cliff.go', playDelay: 6 },
        { say: 'Sound travels at 340 metres per second in the air. So in 1.5 seconds it travelled 340 times 1.5, which is 510 metres.', show: 'e.0' },
        { say: 'But that is the distance there and back. The cliff is half as far away: 255 metres. For an echo, the distance is the speed times the time, over two.', show: 'e.1' },
      ],
    },
    {
      chapter: 'The time for an echo',
      layout: 'center',
      main: [wall, { kind: 'math', id: 't', size: 'md', lines: ['2 \\times 85 = \\thc{170\\ \\text{m}} \\qquad t = \\dfrac{170}{340} = \\good{0.50\\ \\text{s}}'] }],
      lines: [
        { say: 'Now the other way round. A student claps, 85 metres from a large wall. How long is it before the echo comes back?', show: 'wall' },
        { say: 'The sound has to go there and back: two times 85 is 170 metres. The time is that distance over the speed: 170 over 340, which is 0.50 seconds.', show: 't.0' },
        { say: 'Check it against the clap itself.', show: ['wall.front', 'wall.clock'], play: 'wall.go', playDelay: 1 },
      ],
    },
    {
      chapter: 'Echo sounding',
      layout: 'center',
      main: [sea, { kind: 'math', id: 's', size: 'md', lines: ['80\\ \\text{ms} = 0.080\\ \\text{s} \\qquad vt = 1500 \\times 0.080 = \\thc{120\\ \\text{m}}', 'd = \\dfrac{vt}{2} = \\dfrac{120}{2} = \\good{60\\ \\text{m}}'] }],
      lines: [
        { say: 'Ships measure the depth of the sea in the same way. A pulse of sound is sent straight down, and its echo from the sea bed returns 80 milliseconds later.', show: ['sea', 'sea.front', 'sea.clock'], play: 'sea.go', playDelay: 7 },
        { say: 'First change the units: 80 milliseconds is 0.080 seconds. Sound travels at 1,500 metres per second in sea water, so the pulse travelled 120 metres, down and back.', show: 's.0' },
        { say: 'Halve it: the sea is 60 metres deep. Forgetting to halve is the commonest mistake with echoes.', show: 's.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student shouts towards a cliff and hears the echo 2.4 s later. The speed of sound in the air is 340 m/s. How far away is the cliff?',
          choices: ['$408\\ \\text{m}$', '$816\\ \\text{m}$', '$142\\ \\text{m}$', '$283\\ \\text{m}$'],
          answer: 0,
          working: 'The sound travels $vt = 340 \\times 2.4 = 816\\ \\text{m}$, there and back. So $d = \\dfrac{816}{2} = 408\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A student shouts towards a cliff and hears the echo 2.4 seconds later. The speed of sound in the air is 340 metres per second. How far away is the cliff? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The sound travels 340 times 2.4, which is 816 metres, there and back. Half of that is 408 metres. That is choice A. Choice B forgets to halve.', show: 'q.answer' },
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
            'At a **fixed end**, a pulse is reflected **inverted**',
            'At a **free end**, it is reflected **the same way up**',
            'At a join, part of the pulse goes on and part is reflected',
            'Echo: $d = \\dfrac{vt}{2}$, because the sound goes there **and back**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. At a fixed end, a pulse is reflected inverted.', show: 'sum.0' },
        { say: 'At a free end, it is reflected the same way up.', show: 'sum.1' },
        { say: 'At a join, part of the pulse goes on, and part is reflected.', show: 'sum.2' },
        { say: 'And for an echo, the distance is the speed times the time, over two, because the sound goes there and back.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
