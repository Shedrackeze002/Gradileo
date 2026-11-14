import type { Explainer, WaveEl } from '@/video/script.ts';

// Lesson 4.3: sound is a longitudinal wave passed from particle to particle. A plate pushes and
// pulls the air and compressions travel away; a low note beside a high one and a quiet sound
// beside a loud one show what pitch and loudness are; thunder crosses 1360 m in four seconds; and
// a shout goes to a cliff 510 m away and comes back in three. The waves are worked out by
// src/video/wave.ts, so the clock and the distances on screen are the ones the narration uses.

// Air in front of a loudspeaker: the wave runs in from the plate.
const air: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 360,
  mark: 8,
  markLabel: 'one particle of air',
  ruler: false,
  lanes: [{ id: 'air', kind: 'longitudinal', label: 'Air in front of a loudspeaker', frequency: 1, amplitude: 2, speed: 4, tone: 'opp' }],
  poster: 'on',
  clips: {
    start: { phases: [{ dur: 3 }] },
    on: { phases: [{ dur: 4 }] },
    slow: { phases: [{ dur: 2, slow: 2.5, note: 'Slow motion' }] },
  },
};

// A low note over a high one: the same speed and amplitude, different frequencies.
const pitch: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 440,
  ruler: false,
  lanes: [
    { id: 'low', kind: 'longitudinal', label: 'A low note: low frequency', frequency: 0.75, amplitude: 2, speed: 4, full: true, tone: 'adj' },
    { id: 'high', kind: 'longitudinal', label: 'A high note: high frequency', frequency: 2, amplitude: 2, speed: 4, full: true, tone: 'opp' },
  ],
  clips: { go: { phases: [{ dur: 5 }] } },
};

// A quiet sound over a loud one: the same frequency, different amplitudes.
const loud: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 440,
  mark: 7,
  ruler: false,
  lanes: [
    { id: 'quiet', kind: 'longitudinal', label: 'A quiet sound: small amplitude', frequency: 1.25, amplitude: 0.6, speed: 4, full: true, tone: 'adj' },
    { id: 'loud', kind: 'longitudinal', label: 'A loud sound: large amplitude', frequency: 1.25, amplitude: 2, speed: 4, full: true, tone: 'opp' },
  ],
  clips: { go: { phases: [{ dur: 5 }] }, slow: { phases: [{ dur: 2, slow: 2.5, note: 'Slow motion' }] } },
};

// Thunder leaving a lightning strike at 340 m/s: 1360 m in four seconds.
const storm: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 1500],
  height: 360,
  lanes: [{ id: 'air', kind: 'longitudinal', label: 'Thunder travelling away from the lightning', frequency: 2, amplitude: 2, speed: 340, tone: 'opp' }],
  clips: { go: { phases: [{ dur: 4 }] } },
};

// A shout towards a cliff 510 m away: a short burst of sound that goes there and back in 3 s.
const echo: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 510],
  height: 360,
  lanes: [{ id: 'air', kind: 'longitudinal', label: 'A shout towards a cliff', frequency: 4, amplitude: 2, speed: 340, reflect: true, tone: 'opp' }],
  clips: { shout: { phases: [{ dur: 0.5 }, { dur: 2.5, set: { air: { amplitude: 0 } } }] } },
};

const video: Explainer = {
  id: 'p10-4-3',
  lessonId: 'p10-4-3',
  title: 'Sound',
  thumbnail: 'w',
  summary:
    'Sound is a longitudinal wave, passed from particle to particle. Watch compressions travel through the air, see what makes a note higher or a sound louder, and use the speed of sound to find how far away a thunderstorm is and how far away a cliff is from its echo.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Waves, Sound and Light', title: 'Sound', subtitle: 'Vibrations passed on from particle to particle' }],
      lines: [
        { say: 'Rest a finger lightly on your throat, and hum. You can feel the vibration that is making the sound.', show: 'title' },
        { say: 'Every sound starts this way, with something vibrating. It reaches your ear as a wave travelling through the air.' },
      ],
    },
    {
      chapter: 'How sound travels',
      layout: 'center',
      main: [air, { kind: 'text', id: 'vac', size: 'md', md: 'No particles, no sound: sound **cannot travel through a vacuum**.' }],
      lines: [
        { say: 'Here the vibrating object is the cone of a loudspeaker, drawn as a plate that moves in and out.', show: 'w', play: 'w.start', playDelay: 2.5 },
        { say: 'The plate pushes the air next to it and squashes it together. Then it pulls back, and leaves the air spread out. These squashed and spread-out regions travel away through the air.', play: 'w.on' },
        { say: 'But the air itself does not travel. Each particle only moves backwards and forwards about its own place, and passes the vibration on to its neighbour. So sound is a longitudinal wave.', show: 'w.particle', play: 'w.slow', playDelay: 1 },
        { say: 'The squashed regions are called compressions. The spread-out regions are called rarefactions.', hide: 'w.particle', show: 'w.labels' },
        { say: 'Because sound is passed on by particles, it cannot travel through a vacuum. If a ringing bell is sealed in a jar and the air is pumped out, the sound fades away, although you can still see the bell ringing.', hide: 'w.labels', show: 'vac', play: 'w.on' },
      ],
    },
    {
      chapter: 'Pitch',
      layout: 'center',
      main: [pitch, { kind: 'text', id: 'p', size: 'md', md: 'A **higher pitch** is a **higher frequency**. We hear from about 20 Hz to 20 000 Hz.' }],
      lines: [
        { say: 'What we hear depends on two features of the wave. The first is its frequency. Here are two notes travelling through the same air.', show: 'w', play: 'w.go' },
        { say: 'In the bottom wave, more compressions arrive each second. Its frequency is higher, and we hear a higher pitch. In the top wave the frequency is lower, and we hear a lower note.', show: 'p', focus: 'w.high', play: 'w.go' },
        { say: 'Human ears can hear frequencies from about twenty hertz to twenty thousand hertz. Sound above that is called ultrasound. It is too high for us to hear, but it is used in medical scans, and bats use it to find their way.' },
      ],
    },
    {
      chapter: 'Loudness',
      layout: 'center',
      main: [loud, { kind: 'text', id: 'l', size: 'md', md: 'A **louder** sound is a **larger amplitude**. Loudness and pitch do not change the speed.' }],
      lines: [
        { say: 'The second feature is the amplitude. These two sounds have the same frequency, so they have the same pitch.', show: 'w', play: 'w.go' },
        { say: 'But in the bottom wave, each particle swings further from its rest position. The amplitude is larger, and the sound is louder.', show: ['w.particle', 'l'], focus: 'w.loud', play: 'w.slow', playDelay: 1 },
        { say: 'Notice that the loud sound does not travel any faster. A shout and a whisper cross a room in the same time. The speed depends only on what the sound travels through.', play: 'w.go' },
      ],
    },
    {
      chapter: 'The speed of sound',
      layout: 'center',
      main: [storm, { kind: 'math', id: 'd', size: 'md', lines: ['\\text{distance} = \\text{speed} \\times \\text{time} = 340 \\times 4 = \\thc{1360\\ \\text{m}}'] }],
      lines: [
        { say: 'Sound travels fastest in solids, slower in liquids, and slowest in gases. In air, its speed is about three hundred and forty metres per second.', show: 'w' },
        { say: 'Light is so much faster that you see a flash of lightning almost at the moment it happens. The thunder leaves at the same moment, but here it is heard four seconds after the flash.', show: ['w.clock', 'w.front'], play: 'w.go', playDelay: 7 },
        { say: 'Sound travels at a steady speed, so distance equals speed times time. Three hundred and forty times four is one thousand three hundred and sixty metres. That is how far away the storm is.', show: 'd' },
      ],
    },
    {
      chapter: 'Echoes',
      layout: 'center',
      main: [echo, { kind: 'math', id: 'e', size: 'md', lines: ['\\text{there and back: } 340 \\times 3 = 1020\\ \\text{m} \\qquad \\text{to the cliff: } 1020 \\div 2 = \\thc{510\\ \\text{m}}'] }],
      lines: [
        { say: 'An echo is a sound reflected from a hard surface, such as a wall or a cliff. A person on the left shouts towards a cliff, and listens.', show: ['w', 'w.clock', 'w.front'], play: 'w.shout', playDelay: 6 },
        { say: 'The echo came back after three seconds. In that time, the sound travelled three hundred and forty times three, which is one thousand and twenty metres.', show: 'e.0' },
        { say: 'But that is the distance to the cliff and back again. The cliff is half of that away. One thousand and twenty divided by two is five hundred and ten metres.' },
        { say: 'This is the mistake to avoid with echoes. The time is for the trip there and back, so always halve the distance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sound travels at 1500 m/s in sea water. A ship sends a pulse of sound straight down, and the echo from the sea bed returns 0.4 s later. How deep is the sea?',
          choices: ['300 m', '600 m', '150 m', '3750 m'],
          answer: 0,
          working: 'Down and back: $1500 \\times 0.4 = 600\\ \\text{m}$. Halve it: $600 \\div 2 = 300\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Sound travels at one thousand five hundred metres per second in sea water. A ship sends a pulse of sound straight down, and the echo from the sea bed returns zero point four seconds later. How deep is the sea? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The distance down and back is one thousand five hundred times zero point four, which is six hundred metres. Halve it, and the sea is three hundred metres deep. That is choice A.', show: 'q.answer' },
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
            'Sound is a longitudinal wave made by vibrations. It needs a material',
            'Fastest in solids, slowest in gases: about 340 m/s in air',
            'Higher frequency: higher pitch. Larger amplitude: louder',
            'We hear about 20 Hz to 20 000 Hz. Above that is ultrasound',
            'Distance = speed × time. For an echo, halve the distance',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Sound is a longitudinal wave made by vibrations, and it needs a material to travel through.', show: 'end.0' },
        { say: 'It is fastest in solids and slowest in gases. In air, it travels at about three hundred and forty metres per second.', show: 'end.1' },
        { say: 'A higher frequency means a higher pitch. A larger amplitude means a louder sound.', show: 'end.2' },
        { say: 'We hear from about twenty hertz to twenty thousand hertz. Above that is ultrasound.', show: 'end.3' },
        { say: 'And distance equals speed times time. For an echo, halve the distance there and back.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
