import type { Explainer, LightEl } from '@/video/script.ts';

// Lesson 3.1, second part: the speed of light. The wave equation c = fλ on a wave whose frequency
// is raised; a flash that takes 500 s to cross from the Sun to the Earth; a radar pulse that goes
// out and comes back; and Michelson's spinning mirror, which reaches the detector only when the
// mirror makes one eighth of a turn during the round trip (src/video/light.ts).

/** The wave of a radio station at 98.5 MHz, at rest to be measured; then its frequency is doubled. */
const radio: LightEl = {
  kind: 'light',
  id: 'fm',
  wave: { hertz: 0.7, cross: 3.4, full: true, real: 98.5e6 },
  height: 330,
  poster: 'up',
  thumb: ['electric', 'wavelength', 'values'],
  clips: {
    a: { phases: [{ dur: 13.1 }] },
    up: { phases: [{ dur: 5 }, { dur: 4, hertz: 1.4 }, { dur: 3 }] },
  },
};

/** Green light: a wavelength of 550 nm, which is a frequency of 5.45 × 10¹⁴ Hz. */
const green: LightEl = {
  kind: 'light',
  id: 'gr',
  wave: { hertz: 0.9, cross: 3.4, full: true, real: 3.0e8 / 550e-9 },
  height: 330,
  clips: { a: { phases: [{ dur: 8.5 }] }, b: { phases: [{ dur: 7.5 }] } },
};

/** A flash from the Sun to the Earth: 500 s, played in 8 s of video. */
const sun: LightEl = {
  kind: 'light',
  id: 'sun',
  trip: { from: { shape: 'sun', label: 'The Sun' }, to: { shape: 'earth', label: 'The Earth' }, metres: 1.5e11 },
  rate: 62.5,
  height: 360,
  clips: { go: { phases: [{ dur: 9.4, send: true }] } },
};

/** A radar pulse to an aircraft 60 km away and back: 400 μs, played in 8 s of video. */
const radar: LightEl = {
  kind: 'light',
  id: 'radar',
  trip: { from: { shape: 'dish', label: 'Radar station' }, to: { shape: 'plane', label: 'Aircraft' }, metres: 60_000, echo: true, clock: { unit: 'μs', seconds: 1e-6 }, length: { unit: 'km', metres: 1000 } },
  rate: 5e-5,
  height: 360,
  clips: { go: { phases: [{ dur: 10.2, send: true }] }, again: { phases: [{ dur: 9.6, send: true }] } },
};

/** Michelson's mirror: at rest, where the beam grows along the path to the detector; then at 300 turns each second, then at 536. A round trip of the light is 2.5 s of video. */
const mirror: LightEl = {
  kind: 'light',
  id: 'mich',
  spin: { metres: 35_000 },
  height: 430,
  poster: 'go',
  posterAt: 0.685,
  thumb: ['rate', 'distance'],
  clips: {
    rest: { phases: [{ dur: 12.5 }] },
    slow: { phases: [{ dur: 3, hertz: 300 }, { dur: 9.6 }] },
    up: { phases: [{ dur: 5, hertz: 536 }, { dur: 12.2 }] },
    go: { phases: [{ dur: 19 }] },
  },
};

const video: Explainer = {
  id: 'p30-3-1-b',
  lessonId: 'p30-3-1',
  title: 'The Speed of Light',
  thumbnail: 'mich',
  summary:
    'Every electromagnetic wave crosses a vacuum at c = 3.00 × 10⁸ m/s. Use c = fλ for a radio wave and for green light, time a flash from the Sun and a radar echo, and watch how Michelson measured the speed of light with a spinning mirror.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Speed of Light', subtitle: 'The wave equation for light, and how its speed was measured' }],
      lines: [
        { say: 'Every electromagnetic wave crosses a vacuum at the same speed. It matters so much that it has its own symbol: c.', show: 'title' },
        { say: 'c is three times ten to the eight metres per second. In one second, light could circle the Earth more than seven times.', caption: 'c is 3.00 × 10⁸ m/s. In one second, light could circle the Earth more than seven times.' },
      ],
    },
    {
      chapter: 'The wave equation for light',
      layout: 'center',
      main: [radio, { kind: 'math', id: 'w', size: 'md', lines: ['c = f\\lambda', '\\lambda = \\dfrac{c}{f} = \\dfrac{3.00 \\times 10^{8}}{98.5 \\times 10^{6}} = \\thc{3.05\\ \\text{m}}'] }],
      lines: [
        { say: 'In Grade 11, you met the universal wave equation: speed equals frequency times wavelength. For light, the speed is c. So c equals f lambda.', caption: 'In Grade 11, you met the universal wave equation: speed equals frequency times wavelength. For light, the speed is c. So c = fλ.', show: ['fm', 'fm.electric', 'w.0'], play: 'fm.a' },
        { say: 'This is the wave from a radio station that broadcasts at 98.5 megahertz. What is its wavelength?', show: 'fm.values' },
        { say: 'Lambda is c over f. That is 3.00 times ten to the eight, divided by 98.5 times ten to the six, which is 3.05 metres.', caption: 'λ = c ÷ f. That is 3.00 × 10⁸ ÷ (98.5 × 10⁶), which is 3.05 m.', show: ['fm.wavelength', 'w.1'] },
        { say: 'Now raise the frequency. The wave still travels at c, so its crests are closer together. Double the frequency, and the wavelength halves.', play: 'fm.up' },
      ],
    },
    {
      chapter: 'Green light',
      layout: 'center',
      main: [green, { kind: 'math', id: 'g', size: 'md', lines: ['f = \\dfrac{c}{\\lambda} = \\dfrac{3.00 \\times 10^{8}}{550 \\times 10^{-9}} = \\thc{5.45 \\times 10^{14}\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Try a much shorter wave. A beam of green light has a wavelength of 550 nanometres. Find its frequency.', show: ['gr', 'gr.electric', 'gr.wavelength'] },
        { say: 'f is c over lambda. That is 3.00 times ten to the eight, divided by 550 times ten to the minus nine, which is 5.45 times ten to the fourteen hertz.', caption: 'f = c ÷ λ. That is 3.00 × 10⁸ ÷ (550 × 10⁻⁹), which is 5.45 × 10¹⁴ Hz.', show: ['gr.values', 'g.0'], play: 'gr.a', playDelay: 4 },
        { say: 'The fields of this wave change direction more than a million billion times each second.', play: 'gr.b' },
      ],
    },
    {
      chapter: 'Light takes time',
      layout: 'center',
      main: [sun, { kind: 'math', id: 't', size: 'md', lines: ['t = \\dfrac{d}{c} = \\dfrac{1.50 \\times 10^{11}}{3.00 \\times 10^{8}} = \\thc{500\\ \\text{s}}'] }],
      lines: [
        { say: 'Light is so fast that it seems to arrive at once. But over a large distance, the delay is easy to notice. The Sun is 1.50 times ten to the eleven metres from the Earth.', caption: 'Light is so fast that it seems to arrive at once. But over a large distance, the delay is easy to notice. The Sun is 1.50 × 10¹¹ m from the Earth.', show: ['sun', 'sun.distance'] },
        { say: 'Watch a flash of light leave the Sun. The time it takes is the distance, divided by c.', show: ['sun.clock', 't.0'], play: 'sun.go', playDelay: 1.5 },
        { say: 'It takes 500 seconds, which is 8 minutes and 20 seconds. So you see the Sun as it was 8 minutes ago.' },
      ],
    },
    {
      chapter: 'Radar',
      layout: 'center',
      main: [radar, { kind: 'math', id: 'r', size: 'md', lines: ['ct = 3.00 \\times 10^{8} \\times 400 \\times 10^{-6} = 120\\,000\\ \\text{m}', 'd = \\dfrac{120\\,000}{2} = 60\\,000\\ \\text{m} = \\thc{60\\ \\text{km}}'] }],
      lines: [
        { say: 'Radar measures distance in this way. A dish sends out a short pulse of microwaves, and times how long its echo takes to come back.', show: ['radar', 'radar.clock'], play: 'radar.go', playDelay: 1.5 },
        { say: 'Here the echo returns after 400 microseconds. In that time, the pulse travels c times t, which is 120,000 metres.', caption: 'Here the echo returns after 400 μs. In that time, the pulse travels ct, which is 120 000 m.', show: ['radar.travelled', 'r.0'], play: 'radar.again', playDelay: 1 },
        { say: 'But that is the distance there and back. So the aircraft is half as far away: 60 kilometres.', show: ['radar.distance', 'r.1'] },
      ],
    },
    {
      chapter: 'Measuring the speed of light',
      layout: 'center',
      main: [mirror, { kind: 'math', id: 'm', size: 'md', lines: ['c = \\dfrac{2d}{t} = 70\\,000 \\times 8 \\times 536 = \\good{3.00 \\times 10^{8}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'How can such a short time be measured on the Earth? In the nineteen twenties, Albert Michelson used a mirror with eight faces. Light reflects from one face, travels to a fixed mirror 35 kilometres away, and comes back to another face, which sends it into a detector.', caption: 'How can such a short time be measured on the Earth? In the 1920s, Albert Michelson used a mirror with eight faces. Light reflects from one face, travels to a fixed mirror 35 km away, and comes back to another face, which sends it into a detector.', show: ['mich', 'mich.distance'], play: 'mich.rest', playDelay: 9 },
        { say: 'Now spin the mirror. By the time a flash returns, the faces have turned a little, so the light is sent the wrong way. It misses the detector.', show: 'mich.rate', play: 'mich.slow' },
        { say: 'Michelson slowly raised the speed. At 536 turns each second, the light appeared again. The mirror now makes exactly one eighth of a turn during the round trip, so the next face stands where the first one was.', show: 'mich.turn', play: 'mich.up' },
        { say: 'So the round trip takes one eighth of the time for one turn. In that time, the light travels 70 kilometres. And 70,000 metres, times 8, times 536, is 3.00 times ten to the eight metres per second.', caption: 'So the round trip takes one eighth of the time for one turn. In that time, the light travels 70 km. And 70 000 m × 8 × 536 is 3.00 × 10⁸ m/s.', show: ['mich.clock', 'm.0'], play: 'mich.go' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A laser pulse is sent from the Earth to a mirror on the Moon. It returns 2.56 s later. How far away is the Moon? Use $c = 3.00 \\times 10^{8}$ m/s.',
          choices: ['$1.17 \\times 10^{8}$ m', '$7.68 \\times 10^{8}$ m', '$3.84 \\times 10^{8}$ m', '$1.92 \\times 10^{8}$ m'],
          answer: 2,
          working: 'The pulse travels $ct = 3.00 \\times 10^{8} \\times 2.56 = 7.68 \\times 10^{8}$ m. That is there and back, so the Moon is $7.68 \\times 10^{8} \\div 2 = 3.84 \\times 10^{8}$ m away.',
        },
      ],
      lines: [
        { say: 'Your turn. A laser pulse is sent from the Earth to a mirror on the Moon. It returns 2.56 seconds later. How far away is the Moon? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The pulse travels c times t, which is 7.68 times ten to the eight metres. That is there and back, so halve it. The Moon is 3.84 times ten to the eight metres away. That is choice C.', caption: 'The pulse travels ct, which is 7.68 × 10⁸ m. That is there and back, so halve it. The Moon is 3.84 × 10⁸ m away. That is choice C.', show: 'q.answer' },
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
            'The speed of light in a vacuum is $c = 3.00 \\times 10^{8}$ m/s',
            'For every electromagnetic wave, $c = f\\lambda$',
            'Light takes time to travel: $t = d \\div c$',
            'An echo travels **there and back**, so halve its distance',
            'Michelson timed a round trip with a **spinning mirror**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The speed of light in a vacuum is c: three times ten to the eight metres per second.', caption: 'Here is what to remember. The speed of light in a vacuum is c: 3.00 × 10⁸ m/s.', show: 'sum.0' },
        { say: 'For every electromagnetic wave, c equals f lambda.', caption: 'For every electromagnetic wave, c = fλ.', show: 'sum.1' },
        { say: 'Light takes time to travel: the distance, divided by c.', show: 'sum.2' },
        { say: 'An echo travels there and back, so halve its distance.', show: 'sum.3' },
        { say: 'And Michelson measured c by timing a round trip with a spinning mirror.', caption: 'And Michelson measured c by timing a round trip with a spinning mirror.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
