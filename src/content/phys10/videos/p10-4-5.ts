import type { Explainer, WaveEl, WavePhase } from '@/video/script.ts';

// Lesson 4.5: light is one member of a family of waves that differ only in frequency and
// wavelength. Three of them run side by side at the same speed; then one source is turned up
// through the whole spectrum, and each rise in frequency travels in as a shorter wavelength
// (src/video/wave.ts). The pictures are not to scale: a radio wave is millions of times longer
// than a gamma ray. The calculations use the speed of light, 3.0 × 10⁸ m/s.

// Three members of the family: the same speed, very different frequencies.
const family: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 470,
  ruler: false,
  values: false,
  lanes: [
    { id: 'radio', kind: 'transverse', label: 'Radio waves', frequency: 0.75, amplitude: 2, speed: 4, full: true, tone: 'adj' },
    { id: 'light', kind: 'transverse', label: 'Visible light', frequency: 1.5, amplitude: 2, speed: 4, full: true, tone: 'good' },
    { id: 'xray', kind: 'transverse', label: 'X-rays', frequency: 4, amplitude: 2, speed: 4, full: true, tone: 'hyp' },
  ],
  poster: 'go',
  clips: { go: { phases: [{ dur: 5 }] } },
};

// One source turned up step by step: the new waves take three seconds to fill the strip.
const step = (frequency: number, note: string): { phases: WavePhase[] } => ({ phases: [{ dur: 4, set: { wave: { frequency } }, note }] });
const order: WaveEl = {
  kind: 'wave',
  id: 'w',
  span: [0, 12],
  height: 300,
  ruler: false,
  lanes: [{ id: 'wave', kind: 'transverse', frequency: 0.4, amplitude: 2, speed: 4, full: true, tone: 'brand' }],
  clips: {
    radio: { phases: [{ dur: 4, note: 'Radio waves' }] },
    micro: step(0.7, 'Microwaves'),
    infra: step(1.1, 'Infrared'),
    light: step(1.7, 'Visible light'),
    ultra: step(2.5, 'Ultraviolet'),
    xray: step(3.6, 'X-rays'),
    gamma: step(5, 'Gamma rays'),
  },
};

const video: Explainer = {
  id: 'p10-4-5',
  lessonId: 'p10-4-5',
  title: 'The Electromagnetic Spectrum',
  thumbnail: 'w',
  thumbnailTitle: 'The Electromagnetic Spectrum',
  summary:
    'Radio waves, microwaves, light and X-rays are all the same kind of wave. They travel at the same speed and differ only in frequency and wavelength. Watch one wave turned up through the whole electromagnetic spectrum, learn the order, the uses and the dangers, and calculate with the speed of light.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Waves, Sound and Light', title: 'The Electromagnetic Spectrum', subtitle: 'One family of waves, from radio to gamma rays' }],
      lines: [
        { say: 'The light you see is only a thin slice of a much larger family of waves.', show: 'title' },
        { say: 'Radio signals, the microwaves in an oven, the warmth from a fire, and the X-rays that show a broken bone are all the same kind of wave as light.' },
      ],
    },
    {
      chapter: 'One family of waves',
      layout: 'center',
      main: [family, { kind: 'math', id: 'c', size: 'md', lines: ['\\text{speed of light in a vacuum} = \\good{3.0 \\times 10^{8}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'These are called electromagnetic waves. Here are three of them: radio waves, visible light, and X-rays. They are transverse waves, and unlike sound, they can travel through a vacuum. That is how sunlight reaches us across empty space.', show: 'w', play: 'w.go', playDelay: 3 },
        { say: 'Watch the crests. All three waves move along at the same speed. In a vacuum, every electromagnetic wave travels at the speed of light, three times ten to the power eight metres per second. That is three hundred million metres every second.', caption: 'Watch the crests. All three waves move along at the same speed. In a vacuum, every electromagnetic wave travels at the speed of light, 3.0 × 10⁸ m/s. That is three hundred million metres every second.', show: 'c', play: 'w.go' },
        { say: 'What differs is the frequency, and so the wavelength. Radio waves have a low frequency and a long wavelength. X-rays have a very high frequency and a very short wavelength.', show: 'w.wavelength' },
        { say: 'So X-rays do not travel faster than radio waves. Their frequency is higher, and their wavelength is shorter to match.', hide: 'w.wavelength', play: 'w.go' },
      ],
    },
    {
      chapter: 'The spectrum in order',
      layout: 'center',
      main: [
        order,
        { kind: 'text', id: 'list', size: 'md', md: 'radio → microwaves → infrared → **visible light** → ultraviolet → X-rays → gamma rays' },
        { kind: 'text', id: 'trend', size: 'md', md: '**Frequency increases**. Wavelength decreases. The speed stays the same.' },
      ],
      lines: [
        { say: 'Arranged in order, these waves form the electromagnetic spectrum. We start with radio waves, which have the longest wavelength and the lowest frequency.', show: 'w', play: 'w.radio', playDelay: 1.5 },
        { say: 'Turn the frequency up, and the wavelength gets shorter. Next come microwaves.', play: 'w.micro' },
        { say: 'Then infrared, which we feel as warmth.', play: 'w.infra' },
        { say: 'Then the narrow band our eyes can see, visible light. It runs from red, with the longest wavelength, to violet, with the shortest.', play: 'w.light' },
        { say: 'Beyond violet is ultraviolet.', play: 'w.ultra' },
        { say: 'Then X-rays.', play: 'w.xray' },
        { say: 'And last, gamma rays, with the highest frequency and the shortest wavelength of all.', play: 'w.gamma' },
        { say: 'So the order of increasing frequency is radio, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. This picture is not to scale. A real radio wave can be longer than a house, and a gamma ray is far smaller than an atom.', show: ['list', 'trend'] },
      ],
    },
    {
      chapter: 'Uses and dangers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'uses',
          head: ['Wave', 'Typical use', 'Danger'],
          rows: [
            ['radio waves', 'radio and television broadcasts', ''],
            ['microwaves', 'cooking, mobile phones, satellites', 'heating of body tissue'],
            ['infrared', 'remote controls, heaters, thermal cameras', 'skin burns'],
            ['visible light', 'seeing, photography, optical fibres', 'very bright light damages the eyes'],
            ['ultraviolet', 'sterilising water, security marking', 'sunburn, skin cancer, eye damage'],
            ['X-rays', 'images of bones, airport security', 'damage to cells, cancer'],
            ['gamma rays', 'sterilising equipment, treating cancer', 'damage to cells, cancer'],
          ],
        },
      ],
      lines: [
        { say: 'Each part of the spectrum has its uses. Radio waves carry radio and television broadcasts. Microwaves cook food, and carry mobile phone and satellite signals.', show: ['uses', 'uses.0', 'uses.1'] },
        { say: 'Infrared is used in remote controls, heaters and thermal cameras. Visible light is for seeing, for photography, and for sending signals along optical fibres.', show: ['uses.2', 'uses.3'] },
        { say: 'Ultraviolet sterilises water. X-rays make images of bones. And gamma rays sterilise medical equipment and are used to treat cancer.', show: ['uses.4', 'uses.5', 'uses.6'] },
        { say: 'Now look down the last column. The higher the frequency, the more energy the wave can deliver. Ultraviolet, X-rays and gamma rays carry enough to damage living cells.' },
        { say: 'That is why we use sunscreen in strong sunlight, lead aprons with X-rays, and thick shielding with gamma rays.' },
      ],
    },
    {
      chapter: 'Using the speed of light',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'calc',
          size: 'md',
          lines: [
            '\\text{time: } t = \\dfrac{d}{v} = \\dfrac{6.0 \\times 10^{8}}{3.0 \\times 10^{8}} = \\thc{2\\ \\text{s}}',
            '\\text{wavelength: } \\lambda = \\dfrac{v}{f} = \\dfrac{3.0 \\times 10^{8}}{1.5 \\times 10^{8}} = \\thc{2\\ \\text{m}}',
            '\\text{frequency: } f = \\dfrac{v}{\\lambda} = \\dfrac{3.0 \\times 10^{8}}{6.0 \\times 10^{-7}} = 0.5 \\times 10^{15} = \\thc{5.0 \\times 10^{14}\\ \\text{Hz}}',
          ],
        },
      ],
      lines: [
        { say: 'Electromagnetic waves obey the same equations as every other wave. A radio signal is sent to a spacecraft six times ten to the power eight metres away. Time is distance divided by speed. Six divided by three is two, and the powers of ten cancel. The signal takes two seconds.', caption: 'Electromagnetic waves obey the same equations as every other wave. A radio signal is sent to a spacecraft 6.0 × 10⁸ m away. Time is distance divided by speed. Six divided by three is two, and the powers of ten cancel. The signal takes 2 s.', show: 'calc.0' },
        { say: 'A radio wave has a frequency of one point five times ten to the power eight hertz. Its wavelength is speed divided by frequency. Three divided by one point five is two, so the wavelength is two metres.', caption: 'A radio wave has a frequency of 1.5 × 10⁸ Hz. Its wavelength is speed divided by frequency. Three divided by one point five is two, so the wavelength is 2 m.', show: 'calc.1' },
        { say: 'Orange light has a wavelength of six times ten to the power minus seven metres. Its frequency is speed divided by wavelength. Three divided by six is zero point five.', caption: 'Orange light has a wavelength of 6.0 × 10⁻⁷ m. Its frequency is speed divided by wavelength. Three divided by six is 0.5.', show: 'calc.2' },
        { say: 'When dividing, subtract the powers of ten. Eight minus negative seven is fifteen. So the frequency is zero point five times ten to the power fifteen, which is five times ten to the power fourteen hertz.', caption: 'When dividing, subtract the powers of ten. Eight minus negative seven is fifteen. So the frequency is 0.5 × 10¹⁵, which is 5.0 × 10¹⁴ Hz.', focus: 'calc.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'All electromagnetic waves travel at $3.0 \\times 10^{8}$ m/s in a vacuum. Light from the Sun takes 500 s to reach the Earth. How far away is the Sun?',
          choices: ['$6.0 \\times 10^{5}$ m', '$1.5 \\times 10^{11}$ m', '$1.5 \\times 10^{6}$ m', '$3.5 \\times 10^{8}$ m'],
          answer: 1,
          working: 'Distance = speed × time: $d = vt = 3.0 \\times 10^{8} \\times 500 = 1.5 \\times 10^{11}\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. All electromagnetic waves travel at three times ten to the power eight metres per second in a vacuum. Light from the Sun takes five hundred seconds to reach the Earth. How far away is the Sun? Pause the video and try it.', caption: 'Your turn. All electromagnetic waves travel at 3.0 × 10⁸ m/s in a vacuum. Light from the Sun takes 500 s to reach the Earth. How far away is the Sun? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Distance is speed times time. Three times five hundred is one thousand five hundred, so the distance is one thousand five hundred times ten to the power eight. That is one point five times ten to the power eleven metres. That is choice B.', caption: 'Distance is speed times time. Three times five hundred is one thousand five hundred, so the distance is 1500 × 10⁸. That is 1.5 × 10¹¹ m. That is choice B.', show: 'q.answer' },
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
            'Electromagnetic waves are transverse and can cross a vacuum',
            'In a vacuum they all travel at $3.0 \\times 10^{8}$ m/s',
            'Radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma',
            'Higher frequency: shorter wavelength and more energy delivered',
            'Ultraviolet, X-rays and gamma rays can damage living cells',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Electromagnetic waves are transverse waves that can cross a vacuum.', show: 'end.0' },
        { say: 'In a vacuum they all travel at the same speed, three times ten to the power eight metres per second.', caption: 'In a vacuum they all travel at the same speed, 3.0 × 10⁸ m/s.', show: 'end.1' },
        { say: 'In order of increasing frequency, they are radio, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays.', show: 'end.2' },
        { say: 'A higher frequency means a shorter wavelength, and more energy delivered.', show: 'end.3' },
        { say: 'And ultraviolet, X-rays and gamma rays can damage living cells.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
