import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.6 (photons and the photoelectric effect): violet light of
// 420 nm on calcium, whose binding energy (work function) is 2.71 eV. The question is OpenStax
// Physics' own worked example, word for word (section 21.2, Einstein and the Photoelectric Effect,
// CC BY 4.0). E = hc ÷ λ = (6.63 × 10⁻³⁴)(3.00 × 10⁸) ÷ (4.20 × 10⁻⁷) = 4.74 × 10⁻¹⁹ J = 2.96 eV,
// and KE = hf − BE = 2.96 − 2.71 = 0.25 eV.
//
// The picture (src/video/photons.ts) is that light on calcium: each 2.96 eV photon frees one
// electron with up to 0.25 eV. For the check the light slides to 470 nm, past calcium's threshold
// of about 459 nm (hc ÷ W with the lessons' constants), and the electrons stop.

const light: PhotonsEl = {
  kind: 'photons',
  id: 'ph',
  nm: 420,
  rate: 4,
  metal: { name: 'Calcium', work: 2.71 },
  height: 340,
  poster: 'b',
  thumb: ['names', 'bars'],
  clips: {
    a: { phases: [{ dur: 9 }] },
    b: { phases: [{ dur: 11 }] },
    c: { phases: [{ dur: 10 }] },
    d: { phases: [{ dur: 10 }] },
    e: { phases: [{ dur: 11 }] },
    f: { phases: [{ dur: 10 }] },
    g: { phases: [{ dur: 10 }] },
    slide: { phases: [{ dur: 1 }, { dur: 6, nm: 470 }, { dur: 6 }] },
  },
};

const QUESTION =
  '(a) What is the energy in joules and electron volts of a photon of 420-nm violet light? (b) What is the maximum kinetic energy of electrons ejected from calcium by 420 nm violet light, given that the binding energy of electrons for calcium metal is 2.71 eV?';

const video: Explainer = {
  id: 'xq-p30-3-6',
  lessonId: '',
  exam: {
    lesson: 'p30-3-6',
    source: 'OpenStax, Physics, Worked Example in section 21.2, Einstein and the Photoelectric Effect',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/21-2-einstein-and-the-photoelectric-effect',
    question: QUESTION,
  },
  title: 'Exam Question: Violet Light on Calcium. The Photoelectric Effect',
  thumbnailTitle: 'Violet Light on Calcium',
  thumbnail: 'ph',
  summary:
    'A real test question, solved one small step at a time: violet light of 420 nm shines on calcium, and we find the energy of one photon in joules and electronvolts, then the greatest kinetic energy of the electrons it knocks out. We use E = hc ÷ λ, change joules to electronvolts and subtract the binding energy, watching each photon free an electron. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Violet Light on Calcium', subtitle: 'The photoelectric effect, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about light knocking electrons out of a metal. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '(a) $4.74 \\times 10^{-19}$ J $= 2.96$ eV  (b) $0.25$ eV',
          working: '$E = \\dfrac{hc}{\\lambda} = \\dfrac{(6.63 \\times 10^{-34})(3.00 \\times 10^{8})}{4.20 \\times 10^{-7}} = 4.74 \\times 10^{-19}$ J $= 2.96$ eV; $KE = 2.96 - 2.71 = 0.25$ eV.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. It has two parts.', show: 'q' },
        { say: 'Part A: what is the energy in joules and electronvolts of a photon of 420 nanometre violet light? Part B: what is the maximum kinetic energy of electrons ejected from calcium by 420 nanometre violet light, given that the binding energy of electrons for calcium metal is 2.71 electronvolts?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [light, { kind: 'text', id: 't', size: 'md', md: 'How much energy does **one photon** bring, and how much is **left** for the electron after it escapes?' }],
      lines: [
        { say: 'Let us picture it. Violet light shines on a plate of calcium. The light arrives as photons, little packets of energy.', show: ['ph', 'ph.names', 'ph.values'], play: 'ph.a' },
        { say: 'Each photon that lands gives all its energy to one electron. Part of that energy pulls the electron free of the metal, and the rest is left over as its kinetic energy.', show: 't', play: 'ph.b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['E = hf = \\dfrac{hc}{\\lambda}', 'KE = hf - BE', '1\\text{ eV} = 1.60 \\times 10^{-19}\\text{ J}'] },
        { kind: 'text', id: 't', size: 'md', md: '$h = 6.63 \\times 10^{-34}$ J·s, $c = 3.00 \\times 10^{8}$ m/s. The **binding energy** $BE$ is the **work function** $W$: the least energy that frees an electron.' },
      ],
      lines: [
        { say: 'Here is what we need. The energy of one photon is Planck\'s constant times its frequency. Since the frequency is c over lambda, that is h c over lambda.', show: 'f.0' },
        { say: 'The greatest kinetic energy of an escaping electron is the photon\'s energy minus the binding energy.', show: 'f.1' },
        { say: 'And one electronvolt is 1.60 times ten to the minus nineteen joules.', show: 'f.2' },
        { say: 'Planck\'s constant is 6.63 times ten to the minus 34 joule seconds, and the speed of light is 3.00 times ten to the eight metres per second. The binding energy is what our lesson calls the work function: the least energy that frees an electron from the metal.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the photon energy in **joules** with $E = \\dfrac{hc}{\\lambda}$', 'Change it to **electronvolts**', 'Subtract the binding energy for the **kinetic energy**'] }],
      lines: [
        { say: 'Here is the plan. First, find the photon\'s energy in joules.', show: 'plan.0' },
        { say: 'Second, change it into electronvolts. That finishes part A.', show: 'plan.1' },
        { say: 'Third, subtract the binding energy to get the kinetic energy. That is part B.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Energy in joules',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['\\lambda = 420\\text{ nm} = 4.20 \\times 10^{-7}\\text{ m}', 'E = \\dfrac{(6.63 \\times 10^{-34})(3.00 \\times 10^{8})}{4.20 \\times 10^{-7}} = 4.74 \\times 10^{-19}\\text{ J}'] }],
      lines: [
        { say: 'Step one. A nanometre is ten to the minus nine metres, so 420 nanometres is 4.20 times ten to the minus seven metres.', show: ['ph', 'ph.names', 'ph.values', 'm.0'], play: 'ph.c' },
        { say: 'Now h c over lambda: 6.63 times ten to the minus 34, times 3.00 times ten to the eight, divided by 4.20 times ten to the minus seven. That is 4.74 times ten to the minus nineteen joules, for one photon.', show: ['m.1', 'ph.energy'], focus: 'm.1', play: 'ph.d' },
      ],
    },
    {
      chapter: 'Step 2: Electronvolts',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['E = \\dfrac{4.74 \\times 10^{-19}}{1.60 \\times 10^{-19}} = \\good{2.96\\text{ eV}}'] }],
      lines: [
        { say: 'Step two. To change joules into electronvolts, divide by 1.60 times ten to the minus nineteen. The photon has 2.96 electronvolts. That is part A: 4.74 times ten to the minus nineteen joules, or 2.96 electronvolts.', show: ['ph', 'ph.names', 'ph.energy', 'm.0'], focus: 'm.0', play: 'ph.e' },
      ],
    },
    {
      chapter: 'Step 3: Kinetic energy',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['KE = hf - BE = 2.96 - 2.71 = \\good{0.25\\text{ eV}}'] }],
      lines: [
        { say: 'Step three. Now both energies are in electronvolts, so we can subtract. Each photon brings 2.96 electronvolts, and 2.71 of it is used to free the electron from the calcium.', show: ['ph', 'ph.names', 'ph.bars'], play: 'ph.f' },
        { say: '2.96 minus 2.71 leaves 0.25 electronvolts. That is the greatest kinetic energy of the electrons, part B. Some electrons lose a little more on their way out, so the fastest ones have 0.25.', show: 'm.0', focus: 'm.0', play: 'ph.g' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['2.96 > 2.71: \\text{ electrons escape, with a little left over } \\checkmark'] }],
      lines: [
        { say: 'Let us check. The photon has a bit more energy than the binding energy, so electrons escape, but with only a little to spare. A small answer like 0.25 makes sense.', show: ['ph', 'ph.names', 'ph.values', 'ph.bars', 'm.0'], play: 'ph.a' },
        { say: 'Watch what happens if the light is made a little longer in wavelength, past about 460 nanometres. Each photon now has less than 2.71 electronvolts, so it cannot free an electron at all, however bright the light is.', play: 'ph.slide' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Using $420$ for $\\lambda$, not $4.20 \\times 10^{-7}$ m', '$4.74 \\times 10^{-28}$ J: a billion times too small'],
            ['Subtracting $2.71$ eV from the energy in **joules**', 'nonsense: change the units first'],
            ['Adding the binding energy', '$5.67$ eV: the electron **spends** that energy to escape'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Putting in 420 without changing nanometres into metres gives an energy a billion times too small.' },
        { say: 'Subtracting 2.71 electronvolts from an energy in joules mixes two units, so the answer means nothing. Change the photon\'s energy into electronvolts first.' },
        { say: 'And adding the binding energy gives 5.67. But the electron spends that energy to escape, so we subtract it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ultraviolet light of wavelength 300 nm shines on a metal with a work function of 2.30 eV. What is the maximum kinetic energy of the ejected electrons?',
          choices: ['4.14 eV', '6.44 eV', '1.84 eV', '−1.84 eV'],
          answer: 2,
          working: '$E = \\dfrac{hc}{\\lambda} = \\dfrac{(6.63 \\times 10^{-34})(3.00 \\times 10^{8})}{3.00 \\times 10^{-7}} = 6.63 \\times 10^{-19}$ J $= 4.14$ eV, so $KE = 4.14 - 2.30 = 1.84$ eV.',
        },
      ],
      lines: [
        { say: 'Your turn. Ultraviolet light of wavelength 300 nanometres shines on a metal with a work function of 2.30 electronvolts. What is the maximum kinetic energy of the ejected electrons? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'One photon has h c over lambda, 6.63 times ten to the minus nineteen joules, which is 4.14 electronvolts. Take away 2.30, and 1.84 electronvolts is left. That is choice C. 4.14 is only the photon\'s energy, 6.44 added the work function, and minus 1.84 subtracted the wrong way round.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One photon: $E = \\dfrac{hc}{\\lambda}$', 'Divide by $1.60 \\times 10^{-19}$ for **electronvolts**', '$KE_{\\max} = hf - W$', 'Wavelengths in **metres**; subtract only in the **same units**'] }],
      lines: [
        { say: 'Here is what to remember. One photon has an energy of h c over lambda.', show: 'sum.0' },
        { say: 'Divide by 1.60 times ten to the minus nineteen to change joules into electronvolts.', show: 'sum.1' },
        { say: 'The fastest electrons have the photon\'s energy minus the work function, which the book calls the binding energy.', show: 'sum.2' },
        { say: 'And put wavelengths in metres, and subtract only energies in the same units. For more on photons and the photoelectric effect, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
