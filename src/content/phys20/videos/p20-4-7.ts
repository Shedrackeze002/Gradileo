import type { Explainer, RipplesEl, RippleSource } from '@/video/script.ts';

// Lesson 4.7, part 1: the Doppler effect. Waves seen from above (src/video/ripples.ts): every crest
// is a circle around the place where the source was when it sent that crest. The pictures use
// waves of 2 Hz that travel at 6 m/s, from a source that moves at 2 m/s, so the numbers are round:
// the wavelength is 3 m from a source at rest, 2 m in front of the moving source and 4 m behind
// it, and listeners there receive 3 Hz and 1.5 Hz.

const VIEW: [number, number, number, number] = [-20, -10, 20, 10];
/** The source of every picture: 2 Hz, starting at `x` on the middle line, at rest or moving to the right at `v` m/s. */
const source = (x: number, v = 0, more: Partial<RippleSource> = {}): RippleSource => ({ id: 'src', label: 'Source', at: [x, 0], frequency: 2, ...(v ? { velocity: [v, 0] as [number, number] } : {}), ...more });

/** At rest: evenly spaced circles, and listeners on both sides receive 2 Hz. */
const still: RipplesEl = {
  kind: 'ripples',
  id: 'still',
  view: VIEW,
  speed: 6,
  height: 600,
  sources: [source(0, 0, { side: 'below' })],
  listeners: [
    { id: 'west', label: 'Listener', at: [-15, 0] },
    { id: 'east', label: 'Listener', at: [15, 0] },
  ],
  clips: { go: { phases: [{ dur: 5.2 }] }, on: { phases: [{ dur: 6 }] } },
};

/** Moving at 2 m/s: each crest keeps the centre it was sent from, so the crests crowd together in front. */
const moving: RipplesEl = {
  kind: 'ripples',
  id: 'moving',
  view: VIEW,
  speed: 6,
  height: 600,
  sources: [source(-12, 2)],
  clips: {
    start: { phases: [{ dur: 1.45 }] },
    on: { phases: [{ dur: 7 }] },
  },
};

/** The same source, with its waves already spread out: in 4 s, 12 crests reach the listener in front and 6 the one behind. */
const counted: RipplesEl = {
  kind: 'ripples',
  id: 'counted',
  view: VIEW,
  speed: 6,
  full: true,
  height: 600,
  sources: [source(-10, 2)],
  listeners: [
    { id: 'back', label: 'Behind', at: [-16, 0] },
    { id: 'front', label: 'In front', at: [16, 0] },
  ],
  clips: { go: { phases: [{ dur: 4 }] }, on: { phases: [{ dur: 6, slow: 1.5 }] } },
};

/** The source passes a listener who stands just beside its path: 3 Hz, then 1.5 Hz. */
const passing: RipplesEl = {
  kind: 'ripples',
  id: 'passing',
  view: VIEW,
  speed: 6,
  full: true,
  height: 600,
  sources: [source(-14, 2)],
  listeners: [{ id: 'ear', label: 'Listener', at: [0, -0.8], side: 'below' }],
  clips: {
    in: { phases: [{ dur: 6 }] },
    pass: { phases: [{ dur: 2 }] },
    away: { phases: [{ dur: 5 }] },
    off: { phases: [{ dur: 3.5, slow: 2 }] },
  },
};

/** A source at rest, and a listener who walks towards it: in 6 s the one who stands still receives 12 crests, and the walker meets 17. */
const walker: RipplesEl = {
  kind: 'ripples',
  id: 'walker',
  view: VIEW,
  speed: 6,
  full: true,
  height: 600,
  sources: [source(-14, 0, { side: 'below' })],
  listeners: [
    { id: 'stay', label: 'Standing still', at: [14, 4.5] },
    { id: 'walk', label: 'Walking', at: [14, -4.5] },
  ],
  clips: {
    go: { phases: [{ dur: 6, move: { walk: [-2, -4.5] } }] },
    back: { phases: [{ dur: 6, move: { walk: [14, -4.5] } }] },
  },
};

/** A source at nine tenths of the speed of its waves: the crests in front are 0.3 m apart. */
const fast: RipplesEl = {
  kind: 'ripples',
  id: 'fast',
  view: [-12, -9, 12, 9],
  speed: 6,
  height: 460,
  sources: [source(-11, 5.4)],
  poster: 'go',
  clips: { go: { phases: [{ dur: 3.8, slow: 2.5 }] } },
};

/** A source at one and a half times the speed of its waves: it leaves its crests behind, and they overlap along a shock wave. */
const boom: RipplesEl = {
  kind: 'ripples',
  id: 'boom',
  view: [-12, -9, 12, 9],
  speed: 6,
  height: 460,
  sources: [source(-11, 9, { frequency: 5 })],
  clips: { go: { phases: [{ dur: 2.2, slow: 4 }] } },
};

const video: Explainer = {
  id: 'p20-4-7',
  lessonId: 'p20-4-7',
  title: 'The Doppler Effect',
  thumbnailTitle: 'Doppler Effect',
  thumbnail: 'fast',
  summary:
    'A siren sounds higher as it comes towards you and lower as it moves away, although the siren itself has not changed. See why: a moving source crowds its crests together in front and spreads them out behind, so listeners there receive them more often and less often. Then watch the note drop as the source passes, and see what happens when a source moves almost as fast as its own waves.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'The Doppler Effect', subtitle: 'Why a siren drops as it passes' }],
      lines: [
        { say: 'Stand by a road as an ambulance goes past with its siren on. The note is high as the ambulance comes towards you, and it drops suddenly as it passes.', show: 'title' },
        { say: 'The siren has not changed. What has changed is how often its waves reach your ear.' },
      ],
    },
    {
      chapter: 'A source at rest',
      layout: 'center',
      main: [still],
      lines: [
        { say: 'Look down on a source of waves from above. It sends out one crest every period, and while it stands still, the crests spread out as evenly spaced circles.', show: 'still', play: 'still.go' },
        { say: 'The crests are the same distance apart in every direction: one wavelength.', show: 'still.wavelength' },
        { say: 'So listeners on either side receive the crests equally often. Both hear the true frequency of the source.', hide: 'still.wavelength', show: 'still.heard', play: 'still.on' },
      ],
    },
    {
      chapter: 'A source that moves',
      layout: 'center',
      main: [moving],
      lines: [
        { say: 'Now let the source move to the right, and watch its first three crests.', show: ['moving', 'moving.velocity'], play: 'moving.start', playDelay: 2.5 },
        { say: 'Each crest is still a circle. But its centre is the place where the source was when it sent that crest, and before it sends the next one, the source has moved forward a little.', show: 'moving.centres' },
        { say: 'Watch the pattern that builds up.', play: 'moving.on' },
        { say: 'In front of the source the crests are squeezed together, so the wavelength there is shorter. Behind it they are stretched apart, so the wavelength is longer.', hide: 'moving.centres', show: 'moving.wavelength' },
      ],
    },
    {
      chapter: 'What a listener receives',
      layout: 'center',
      main: [counted],
      lines: [
        { say: 'Put one listener in front of the source, and another behind it, and count the crests that reach each of them in the same four seconds.', show: ['counted', 'counted.velocity', 'counted.count', 'counted.clock'], play: 'counted.go', playDelay: 5 },
        { say: 'Twelve crests reach the listener in front, and only six reach the listener behind. The crests travel at the same speed as before, because that speed is set by the air, not by the motion of the source. But in front they are closer together, so they arrive more often.' },
        { say: 'The number of crests that arrive each second is the frequency received. So the listener in front receives a higher frequency than the source gives out, and the listener behind receives a lower one.', hide: ['counted.count', 'counted.clock'], show: 'counted.heard', play: 'counted.on' },
        { say: 'This is the Doppler effect: the change in the frequency received when a source of waves and an observer move towards each other, or away from each other.' },
      ],
    },
    {
      chapter: 'As the source passes',
      layout: 'center',
      main: [passing],
      lines: [
        { say: 'Here is the whole event, for a listener beside the road. While the source approaches, the note is raised, and it is steady.', show: ['passing', 'passing.heard'], play: 'passing.in' },
        { say: 'As the source goes past, the note drops.', play: 'passing.pass' },
        { say: 'And while the source moves away, the note is lowered, and steady again.', play: 'passing.away' },
        { say: 'So do not say that the pitch rises as the source comes nearer. The sound gets louder, but the pitch stays at one raised note, and it changes at the moment the source passes.', play: 'passing.off' },
      ],
    },
    {
      chapter: 'A listener who moves',
      layout: 'center',
      main: [walker],
      lines: [
        { say: 'The source does not have to be the one that moves. Here the source stands still, one listener stands still, and another walks towards the source.', show: ['walker', 'walker.count', 'walker.clock'], play: 'walker.go', playDelay: 4 },
        { say: 'In the same six seconds, twelve crests reach the listener who stands still, and the listener who walks meets seventeen. Moving towards a source also raises the frequency received.' },
        { say: 'What matters is whether the distance between the source and the observer is shrinking or growing. Closer together means a higher frequency, and farther apart means a lower one.', hide: ['walker.count', 'walker.clock'], play: 'walker.back' },
        { say: 'With no change in the distance, there is no change in the note. A driver hears the true note of the horn of their own car.' },
      ],
    },
    {
      chapter: 'As fast as the waves',
      layout: 'split',
      leftWidth: 544,
      left: [fast],
      right: [boom],
      lines: [
        { say: 'What if the source moves almost as fast as its own waves? In front, the crests can hardly get ahead of it, and they pile up.', show: ['fast', 'fast.velocity'], play: 'fast.go' },
        { say: 'And a source that is faster than its waves leaves its own crests behind. They overlap along two lines that trail back from the source, and there they add up to one strong pulse, called a shock wave.', show: ['boom', 'boom.velocity'], play: 'boom.go', playDelay: 1 },
        { say: 'For an aircraft that flies faster than sound, the shock wave reaches the ground as a sonic boom.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A train sounds a horn of 400 Hz as it moves at a steady speed towards a person on a platform, passes the person, and moves away. What does the person hear?',
          choices: ['A steady note above 400 Hz, then a steady note below 400 Hz', 'A note that rises steadily, then falls steadily', 'A steady 400 Hz that only gets louder, then quieter', 'A steady note below 400 Hz, then a steady note above 400 Hz'],
          answer: 0,
          working: 'While the train approaches, the distance is shrinking, so the frequency received is higher than 400 Hz. The speed is steady, so the raised note is steady. As the train passes, the distance starts to grow, and the note drops to a steady frequency below 400 Hz.',
        },
      ],
      lines: [
        { say: 'Your turn. A train sounds a horn of 400 hertz as it moves at a steady speed towards a person on a platform, passes the person, and moves away. What does the person hear? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'While the train approaches, the distance is shrinking, so the note is higher than 400 hertz, and because the speed is steady, the note is steady. As the train passes, the note drops, to a steady frequency below 400 hertz. That is choice A.', show: 'q.answer' },
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
            '**Doppler effect**: the frequency received changes when a source and an observer move closer or apart',
            'Closer together: a **higher** frequency. Farther apart: a **lower** one',
            'In front of a moving source the wavelength is **shorter**; the speed of the waves does not change',
            'The note is steady as a source approaches, and drops as it **passes**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The Doppler effect is the change in the frequency received when a source and an observer move towards each other or away from each other.', show: 'sum.0' },
        { say: 'Moving closer together raises the frequency received, and moving apart lowers it.', show: 'sum.1' },
        { say: 'In front of a moving source the wavelength is shorter, and behind it the wavelength is longer. The speed of the waves does not change.', show: 'sum.2' },
        { say: 'And the note is steady while a source approaches. It drops at the moment the source passes.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
