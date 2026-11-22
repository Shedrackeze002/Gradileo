import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.7 (the momentum of a photon): OpenStax Physics' own worked
// example, word for word (section 21.3, The Dual Nature of Light, CC BY 4.0): a 500 nm photon's
// momentum, the speed of an electron with the same momentum, and the electron's energy beside
// the photon's. p = h ÷ λ = 6.63 × 10⁻³⁴ ÷ 5.00 × 10⁻⁷ = 1.33 × 10⁻²⁷ kg·m/s, v = p ÷ m ≈ 1.46 × 10³
// m/s, KE = ½mv² ≈ 9.65 × 10⁻²⁵ J ≈ 6.03 × 10⁻⁶ eV, while the photon has hc ÷ λ = 3.98 × 10⁻¹⁹ J =
// 2.49 eV, about 400,000 times more. The book prints 9.64 × 10⁻²⁵ J, 6.02 × 10⁻⁶ eV and 2.48 eV
// because it rounds the speed and uses 1.602 × 10⁻¹⁹ J for 1 eV; the video keeps every digit in
// the calculator and the lessons' 1.60 × 10⁻¹⁹, and says that the book's last digits differ.
//
// The picture (src/video/photons.ts) is a beam of 500 nm light: each photon carries an arrow for
// its momentum and its energy, and the readouts give p = h ÷ λ.

const beam: PhotonsEl = {
  kind: 'photons',
  id: 'ph',
  nm: 500,
  rate: 3,
  height: 300,
  poster: 'b',
  thumb: ['names', 'values', 'momentum'],
  clips: {
    a: { phases: [{ dur: 9 }] },
    b: { phases: [{ dur: 11 }] },
    c: { phases: [{ dur: 11 }] },
    d: { phases: [{ dur: 11 }] },
  },
};

const QUESTION =
  '(a) Calculate the momentum of a visible photon that has a wavelength of 500 nm. (b) Find the velocity of an electron having the same momentum. (c) What is the energy of the electron, and how does it compare with the energy of the photon?';

const video: Explainer = {
  id: 'xq-p30-3-7',
  lessonId: '',
  exam: {
    lesson: 'p30-3-7',
    source: 'OpenStax, Physics, Worked Example in section 21.3, The Dual Nature of Light',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/21-3-the-dual-nature-of-light',
    question: QUESTION,
  },
  title: 'Exam Question: The Momentum of a Photon. A Photon and an Electron Compared',
  thumbnailTitle: 'The Momentum of a Photon',
  thumbnail: 'ph',
  summary:
    'A real test question, solved one small step at a time: we find the momentum of a 500 nm photon with p = h ÷ λ, the speed of an electron with the same momentum, and the electron\'s kinetic energy, then compare it with the photon\'s energy. Same momentum, but the photon carries about 400,000 times more energy. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Momentum of a Photon', subtitle: 'A photon and an electron compared, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the momentum that light carries. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '(a) $1.33 \\times 10^{-27}$ kg·m/s  (b) $1.46 \\times 10^{3}$ m/s  (c) $6.03 \\times 10^{-6}$ eV, about $400\\,000$ times less than the photon\'s $2.49$ eV',
          working: '$p = \\dfrac{h}{\\lambda}$, $v = \\dfrac{p}{m}$, $KE = \\tfrac{1}{2}mv^2 = 9.65 \\times 10^{-25}$ J; the photon has $\\dfrac{hc}{\\lambda} = 3.98 \\times 10^{-19}$ J.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. It has three parts.', show: 'q' },
        { say: 'Part A: calculate the momentum of a visible photon that has a wavelength of 500 nanometres. Part B: find the velocity of an electron having the same momentum. Part C: what is the energy of the electron, and how does it compare with the energy of the photon?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [beam, { kind: 'text', id: 't', size: 'md', md: 'A photon has no mass, but it still has **momentum**. An electron with the **same momentum**: how fast is it, and how much **energy** does it have?' }],
      lines: [
        { say: 'Let us picture it. Here is a beam of green light, 500 nanometres. Each photon is a little packet of energy, and it also carries momentum, shown by its arrow.', show: ['ph', 'ph.names', 'ph.values', 'ph.momentum'], play: 'ph.a' },
        { say: 'A photon has no mass, but it still has momentum. The question asks how fast an electron must go to have the same momentum, and then compares the two energies.', show: 't', play: 'ph.b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['p_{\\text{photon}} = \\dfrac{h}{\\lambda} \\qquad E_{\\text{photon}} = \\dfrac{hc}{\\lambda}', 'p = mv \\qquad KE = \\tfrac{1}{2}mv^2'] },
        { kind: 'text', id: 't', size: 'md', md: '$h = 6.63 \\times 10^{-34}$ J·s, $c = 3.00 \\times 10^{8}$ m/s, $m_e = 9.11 \\times 10^{-31}$ kg, $1$ eV $= 1.60 \\times 10^{-19}$ J' },
      ],
      lines: [
        { say: 'Here is what we need. A photon\'s momentum is Planck\'s constant divided by its wavelength, and its energy is h c over lambda.', show: 'f.0' },
        { say: 'An electron is an ordinary particle, so its momentum is mass times velocity, and its kinetic energy is a half m v squared.', show: 'f.1' },
        { say: 'Planck\'s constant is 6.63 times ten to the minus 34 joule seconds, the speed of light is 3.00 times ten to the eight metres per second, an electron\'s mass is 9.11 times ten to the minus 31 kilograms, and one electronvolt is 1.60 times ten to the minus nineteen joules.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Part A: $p = \\dfrac{h}{\\lambda}$, with $\\lambda$ in **metres**', 'Part B: rearrange $p = mv$ for $v$', 'Part C: $\\tfrac{1}{2}mv^2$ for the electron, $\\dfrac{hc}{\\lambda}$ for the photon, and compare'] }],
      lines: [
        { say: 'Here is the plan. For part A, divide Planck\'s constant by the wavelength in metres.', show: 'plan.0' },
        { say: 'For part B, rearrange p equals m v to find the electron\'s speed.', show: 'plan.1' },
        { say: 'For part C, find both energies and compare them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The photon\'s momentum',
      layout: 'center',
      main: [beam, { kind: 'math', id: 'm', size: 'md', lines: ['p = \\dfrac{h}{\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{5.00 \\times 10^{-7}} = \\good{1.33 \\times 10^{-27}\\text{ kg·m/s}}'] }],
      lines: [
        { say: 'Step one. 500 nanometres is 5.00 times ten to the minus seven metres.', show: ['ph', 'ph.names', 'ph.values', 'ph.momentum'], play: 'ph.c' },
        { say: 'Planck\'s constant divided by that is 1.33 times ten to the minus 27 kilogram metres per second. That is part A. It is a very small momentum.', show: 'm.0', focus: 'm.0', play: 'ph.d' },
      ],
    },
    {
      chapter: 'Step 2: The electron\'s speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['v = \\dfrac{p}{m} = \\dfrac{1.33 \\times 10^{-27}}{9.11 \\times 10^{-31}}', '\\approx \\good{1.46 \\times 10^{3}\\text{ m/s}}'] }],
      lines: [
        { say: 'Step two. The electron has the same momentum, so its speed is the momentum divided by its mass.', show: 'm.0' },
        { say: 'That is about 1.46 times ten to the three metres per second, or about 1,460 metres per second. That is part B. It is fast for a car, but tiny next to the speed of light, so the ordinary formulas work.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare the energies',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'KE_e = \\tfrac{1}{2}mv^2 \\approx 9.65 \\times 10^{-25}\\text{ J}',
            '= 6.03 \\times 10^{-6}\\text{ eV}',
            'E_{\\text{photon}} = \\dfrac{hc}{\\lambda} = 3.98 \\times 10^{-19}\\text{ J} = 2.49\\text{ eV}',
            '\\dfrac{3.98 \\times 10^{-19}}{9.65 \\times 10^{-25}} \\approx \\good{4 \\times 10^{5}}',
          ],
        },
      ],
      lines: [
        { say: 'Step three. The electron\'s kinetic energy is a half m v squared. Keeping every digit in the calculator, that is 9.65 times ten to the minus 25 joules.', show: 'm.0' },
        { say: 'In electronvolts, that is 6.03 times ten to the minus six, a few millionths of an electronvolt.', show: 'm.1' },
        { say: 'The photon\'s energy is h c over lambda: 3.98 times ten to the minus nineteen joules, or 2.49 electronvolts.', show: 'm.2' },
        { say: 'Divide one by the other. The photon has about 400,000 times more energy than the electron, even though their momenta are the same. That is part C. The textbook\'s last digits differ a little, because it rounds differently.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{photon: } E = pc', '\\text{electron: } KE = \\tfrac{1}{2}pv', '\\dfrac{E}{KE} = \\dfrac{2c}{v} = \\dfrac{2(3.00 \\times 10^{8})}{1.46 \\times 10^{3}} \\approx 4 \\times 10^{5} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the comparison another way. A photon\'s energy is its momentum times the speed of light.', show: 'm.0' },
        { say: 'An electron\'s kinetic energy, a half m v squared, is a half times its momentum times its speed.', show: 'm.1' },
        { say: 'With the same momentum, the ratio is 2 c over v: twice the speed of light, divided by 1,460. That is about 400,000 again. The photon has far more energy because it moves so much faster.', show: 'm.2', focus: 'm.2' },
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
            ['Using $500$ for $\\lambda$, not $5.00 \\times 10^{-7}$ m', '$1.33 \\times 10^{-36}$ kg·m/s: a billion times too small'],
            ['Forgetting to square $v$', '$6.6 \\times 10^{-28}$ J'],
            ['Same momentum, so same energy', 'no: the photon has about $400\\,000$ times more'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Putting in 500 without changing nanometres into metres gives a momentum a billion times too small.' },
        { say: 'Forgetting to square the speed in a half m v squared gives 6.6 times ten to the minus 28 joules, which is far too small.' },
        { say: 'And it is tempting to think that the same momentum means the same energy. It does not. The photon moves at the speed of light, so it carries far more energy.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the momentum of an ultraviolet photon with a wavelength of 250 nm?',
          choices: ['$2.65 \\times 10^{-27}$ kg·m/s', '$1.66 \\times 10^{-40}$ kg·m/s', '$3.77 \\times 10^{26}$ kg·m/s', '$2.65 \\times 10^{-36}$ kg·m/s'],
          answer: 0,
          working: '$p = \\dfrac{h}{\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{2.50 \\times 10^{-7}} = 2.65 \\times 10^{-27}$ kg·m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the momentum of an ultraviolet photon with a wavelength of 250 nanometres? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Planck\'s constant divided by 2.50 times ten to the minus seven metres is 2.65 times ten to the minus 27 kilogram metres per second. That is choice A. B multiplied instead of dividing, C divided the wrong way round, and D left the wavelength in nanometres.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A photon\'s momentum: $p = \\dfrac{h}{\\lambda}$', 'A particle\'s momentum: $p = mv$', 'Same momentum, but the photon has **far more energy**', 'Wavelengths in **metres** before you calculate'] }],
      lines: [
        { say: 'Here is what to remember. A photon\'s momentum is Planck\'s constant over its wavelength.', show: 'sum.0' },
        { say: 'An ordinary particle\'s momentum is mass times velocity.', show: 'sum.1' },
        { say: 'A photon and an electron with the same momentum have very different energies, because the photon moves at the speed of light.', show: 'sum.2' },
        { say: 'And put wavelengths in metres before you calculate. For more on the momentum of a photon and the Compton effect, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
