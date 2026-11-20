import type { Explainer, LightEl } from '@/video/script.ts';

// Lesson 3.1, first part: electromagnetic waves. An electron is driven up and down an aerial, and a
// wave of electric and magnetic fields leaves it (src/video/light.ts): the electric field up and
// down, the magnetic field towards you and away from you, and both across the way the wave
// travels. Then the spectrum, on a scale where each step is ten times shorter, and a polarizing
// filter, which shows that the wave is transverse.

/** The aerial, with its electron at rest; then the electron is driven, and the wave runs out. */
const em: LightEl = {
  kind: 'light',
  id: 'em',
  wave: { hertz: 0.7, cross: 3.4, on: false },
  height: 400,
  // Each clip is a little longer than its line of narration. The next line waits for the clip to end, so the wave never stops between them.
  clips: {
    start: { phases: [{ dur: 13.5, on: true }] },
    a: { phases: [{ dur: 17 }] },
    b: { phases: [{ dur: 13 }] },
  },
};

/** The same wave, already running; at the end the electron is stopped, and the last of the wave travels away. */
const across: LightEl = {
  ...em,
  id: 'tr',
  wave: { hertz: 0.7, cross: 3.4, full: true },
  poster: 'a',
  clips: {
    a: { phases: [{ dur: 14 }] },
    b: { phases: [{ dur: 9.5 }] },
    c: { phases: [{ dur: 12 }] },
    stop: { phases: [{ dur: 5.5 }, { dur: 8, on: false }] },
  },
};

/** The wave once more, to time it. */
const speed: LightEl = {
  ...em,
  id: 'sp',
  wave: { hertz: 0.7, cross: 3.4, full: true },
  height: 360,
  clips: { a: { phases: [{ dur: 14 }] }, b: { phases: [{ dur: 10.5 }] }, c: { phases: [{ dur: 13 }] } },
};

/** The spectrum: the pointer starts among the radio waves, and slides to the short end. */
const spectrum: LightEl = {
  kind: 'light',
  id: 'range',
  spectrum: { at: 300 },
  height: 430,
  clips: {
    start: { phases: [{ dur: 14 }] },
    radio: { phases: [{ dur: 3, to: 3 }, { dur: 8 }] },
    micro: { phases: [{ dur: 3, to: 0.03 }, { dur: 6 }] },
    infra: { phases: [{ dur: 3, to: 1e-5 }, { dur: 3.5 }] },
    visible: { phases: [{ dur: 3, to: 5.5e-7 }, { dur: 9.5 }] },
    rest: { phases: [{ dur: 2.5, to: 1e-7 }, { dur: 1.5 }, { dur: 2.5, to: 1e-9 }, { dur: 1.5 }, { dur: 2.5, to: 1e-12 }, { dur: 3 }] },
    all: { phases: [{ dur: 9 }] },
    harm: { phases: [{ dur: 10 }] },
  },
};

/** The wave through a polarizing filter, which is then turned a quarter of a turn. */
const filter: LightEl = {
  kind: 'light',
  id: 'pol',
  wave: { hertz: 0.7, cross: 3.4, full: true, filter: { at: 0.5, angle: 0 } },
  height: 400,
  clips: {
    a: { phases: [{ dur: 15 }] },
    turn: { phases: [{ dur: 4 }, { dur: 4, filter: 90 }, { dur: 5 }] },
    c: { phases: [{ dur: 11 }] },
  },
};

const video: Explainer = {
  id: 'p30-3-1',
  lessonId: 'p30-3-1',
  title: 'Electromagnetic Waves',
  thumbnail: 'tr',
  summary:
    'Light, radio signals and X-rays are all electromagnetic waves. Watch an accelerating charge send out a wave of electric and magnetic fields, see why the wave is transverse and needs no material, tour the electromagnetic spectrum from radio waves to gamma rays, and see what a polarizing filter proves.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Electromagnetic Waves', subtitle: 'What light is, and where it comes from' }],
      lines: [
        { say: 'The light from your screen, the signal to your phone, the warmth of the Sun, and the X-rays at the dentist are all the same kind of thing.', show: 'title' },
        { say: 'Each one is an electromagnetic wave. Here is what that means, and where these waves come from.' },
      ],
    },
    {
      chapter: 'A charge that is shaken',
      layout: 'center',
      main: [em],
      lines: [
        { say: 'Here is an electron in a metal rod, called an aerial. While the electron sits still, its electric field is steady, and nothing travels away from it.', show: ['em', 'em.electric'] },
        { say: 'Now drive the electron up and down. Its field has to keep changing, and the change travels outwards. The yellow arrows show the electric field along one line.', play: 'em.start', playDelay: 2.5 },
        { say: 'You know that a changing magnetic field makes an electric field. In the eighteen sixties, James Clerk Maxwell showed that the reverse is also true. A changing electric field makes a magnetic field.', show: 'em.magnetic', play: 'em.a' },
        { say: 'So the two fields keep each other going. The result is a wave of electric and magnetic fields that travels away from its source. This is an electromagnetic wave.', play: 'em.b' },
      ],
    },
    {
      chapter: 'A transverse wave',
      layout: 'center',
      main: [across],
      lines: [
        { say: 'Look at the directions. The electric field, in yellow, points up and down. The magnetic field, in violet, points towards you and away from you. The two are at right angles to each other.', show: ['tr', 'tr.electric', 'tr.magnetic'], play: 'tr.a' },
        { say: 'And both are at right angles to the direction of travel. So an electromagnetic wave is a transverse wave.', play: 'tr.b' },
        { say: 'No material is vibrating here. The fields themselves are what waves. That is why light can cross empty space, from the Sun to the Earth.', play: 'tr.c' },
        { say: 'Only a charge that accelerates sends out a wave. Stop the electron, and it sends no more. The last of the wave simply travels away.', play: 'tr.stop' },
      ],
    },
    {
      chapter: 'Light is one of them',
      layout: 'center',
      main: [speed, { kind: 'math', id: 'c', size: 'md', lines: ['c = \\good{3.00 \\times 10^{8}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Maxwell worked out how fast his waves must travel, from electric and magnetic measurements alone. The answer was three times ten to the eight metres per second.', caption: 'Maxwell worked out how fast his waves must travel, from electric and magnetic measurements alone. The answer was 3.00 × 10⁸ m/s.', show: ['sp', 'sp.electric', 'sp.magnetic', 'sp.speed', 'c.0'], play: 'sp.a' },
        { say: 'That number was already known. It is the speed of light. So Maxwell concluded that light itself is an electromagnetic wave.', play: 'sp.b' },
        { say: 'In eighteen eighty-seven, Heinrich Hertz proved him right. He made electromagnetic waves with a spark, and detected them across his laboratory. They were radio waves.', caption: 'In 1887, Heinrich Hertz proved him right. He made electromagnetic waves with a spark, and detected them across his laboratory. They were radio waves.', play: 'sp.c' },
      ],
    },
    {
      chapter: 'The electromagnetic spectrum',
      layout: 'center',
      main: [spectrum],
      lines: [
        { say: 'Electromagnetic waves come in every wavelength. The full range is called the electromagnetic spectrum, and it has seven regions. On this scale, each step to the right is ten times shorter.', show: ['range', 'range.wave', 'range.scale', 'range.values'], play: 'range.start' },
        { say: 'Radio waves are the longest, from about a metre to a kilometre or more. They are made by electrons driven along an aerial, just as you saw.', show: 'range.made', play: 'range.radio' },
        { say: 'Microwaves are shorter, from millimetres to centimetres. Phones, radar and ovens use them.', show: 'range.use', play: 'range.micro' },
        { say: 'Next is infrared, which every warm object gives out.', play: 'range.infra' },
        { say: 'Then comes a very narrow band: visible light, from red, at about 700 nanometres, to violet, at about 400. This is all that your eyes can detect.', show: 'range.visible', play: 'range.visible' },
        { say: 'Beyond violet is ultraviolet. Then X-rays. And at the short end are gamma rays, which come from the nuclei of atoms.', play: 'range.rest' },
        { say: 'All of these waves cross a vacuum at the same speed. So the shorter the wavelength, the higher the frequency.', show: 'range.arrows', play: 'range.all' },
        { say: 'From ultraviolet on, the waves carry enough energy to knock electrons out of atoms. This is called ionizing radiation, and it can damage living cells.', hide: 'range.arrows', show: 'range.ionizing', play: 'range.harm' },
      ],
    },
    {
      chapter: 'Polarization',
      layout: 'center',
      main: [filter],
      lines: [
        { say: 'Here is one more piece of evidence. The wave from this aerial vibrates up and down only. A polarizing filter, like the lens of some sunglasses, passes vibrations in one direction.', show: ['pol', 'pol.electric'], play: 'pol.a' },
        { say: 'Lined up with the vibration, the filter lets the wave through. Now turn the filter a quarter of a turn. The wave is blocked.', play: 'pol.turn' },
        { say: 'Only a transverse wave has a direction of vibration across its path. So polarization is evidence that light is a transverse wave.', play: 'pol.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'X-rays and radio waves both cross a vacuum. Which statement about them is correct?',
          choices: ['X-rays travel faster, because they carry more energy', 'They travel at the same speed, and X-rays have the higher frequency', 'They travel at the same speed, and X-rays have the longer wavelength', 'Radio waves travel faster, because their wavelength is longer'],
          answer: 1,
          working: 'Every electromagnetic wave crosses a vacuum at $c = 3.00 \\times 10^{8}$ m/s. X-rays have a much shorter wavelength than radio waves, so their frequency is much higher.',
        },
      ],
      lines: [
        { say: 'Your turn. X-rays and radio waves both cross a vacuum. Which statement about them is correct? Pause the video and decide.', show: 'q', wait: 6 },
        { say: 'Every electromagnetic wave crosses a vacuum at the same speed. X-rays have a much shorter wavelength than radio waves, so their frequency is much higher. That is choice B.', show: 'q.answer' },
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
            'An **electromagnetic wave** is a changing electric field and a changing magnetic field, at right angles to each other and to the direction of travel',
            'It is **transverse**, and it needs no material',
            'It is made by a charge that **accelerates**',
            'The spectrum: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays',
            'All of them cross a vacuum at $3.00 \\times 10^{8}$ m/s',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An electromagnetic wave is a changing electric field and a changing magnetic field, at right angles to each other and to the direction of travel.', show: 'sum.0' },
        { say: 'It is a transverse wave, and it needs no material to travel through.', show: 'sum.1' },
        { say: 'It is made by a charge that accelerates.', show: 'sum.2' },
        { say: 'The spectrum runs from radio waves, through microwaves, infrared, visible light and ultraviolet, to X-rays and gamma rays.', show: 'sum.3' },
        { say: 'And all of them cross a vacuum at the same speed: three times ten to the eight metres per second.', caption: 'And all of them cross a vacuum at the same speed: 3.00 × 10⁸ m/s.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
