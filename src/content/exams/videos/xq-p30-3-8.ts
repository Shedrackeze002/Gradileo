import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.8 (matter waves): an electron has a de Broglie wavelength of
// 0.167 nm; find (a) its speed and (b) its kinetic energy in eV. The question is OpenStax College
// Physics 2e's own, word for word (the worked example "Electron Wavelength versus Velocity and
// Energy", section 29.6, CC BY-NC-SA 4.0; Gradileo is non-commercial). λ = h ÷ mv, so
// v = h ÷ mλ = 6.63 × 10⁻³⁴ ÷ (9.11 × 10⁻³¹ × 1.67 × 10⁻¹⁰) = 4.36 × 10⁶ m/s, and
// KE = ½mv² = 8.65 × 10⁻¹⁸ J = 54.0 eV.
//
// The picture (src/video/charges.ts) is an electron gun with 54.0 V between its plates: the
// electron is moved step by step by the force on it and leaves at 4.36 × 10⁶ m/s, the speed that
// gives it a wavelength of 0.167 nm, as in Davisson and Germer's experiment.

const ELECTRON = 9.11e-31;

const gun: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-0.03, 0.09, -0.019, 0.019],
  height: 360,
  unit: 'e',
  rate: 4.3e-9,
  speedFigures: 3,
  energyAt: 'left',
  plates: { at: [0.02, 0], span: [-0.008, 0.008], volts: 54, hole: 'first', lines: 5 },
  bodies: [{ id: 'e', charge: -1, x: 0, mass: ELECTRON }],
  poster: 'go',
  thumb: ['lines', 'charge', 'velocity', 'trail'],
  clips: { go: { reset: true, phases: [{ dur: 3.4, fly: true }] } },
};

const QUESTION =
  'For an electron having a de Broglie wavelength of 0.167 nm (appropriate for interacting with crystal lattice structures that are about this size): (a) Calculate the electron’s velocity, assuming it is nonrelativistic. (b) Calculate the electron’s kinetic energy in eV.';

const video: Explainer = {
  id: 'xq-p30-3-8',
  lessonId: '',
  exam: {
    lesson: 'p30-3-8',
    source: 'OpenStax, College Physics 2e, Worked Example "Electron Wavelength versus Velocity and Energy", section 29.6',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/29-6-the-wave-nature-of-matter',
    question: QUESTION,
  },
  title: 'Exam Question: The Speed and Energy of an Electron Wave. λ = h/mv',
  thumbnailTitle: 'An Electron’s Wavelength',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: an electron has a de Broglie wavelength of 0.167 nm, and we find its speed and its kinetic energy in electronvolts. We rearrange λ = h/mv for the speed, find ½mv² in joules, and change it to electronvolts. Then we send an electron through 54.0 V in an electron gun to check, and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'An Electron’s Wavelength', subtitle: 'Matter waves, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the wavelength of an electron. Moving particles behave like waves, and this question links the wave to the electron\'s speed and energy. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          answer: '(a) $4.36 \\times 10^{6}$ m/s  (b) $54.0$ eV',
          working: '$v = \\dfrac{h}{m\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(1.67 \\times 10^{-10})} = 4.36 \\times 10^{6}$ m/s; $\\tfrac{1}{2}mv^2 = 8.65 \\times 10^{-18}$ J $= 54.0$ eV.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. It has two parts.', show: 'q' },
        { say: 'For an electron having a de Broglie wavelength of 0.167 nanometres, which is about the size of the spacing in a crystal: Part A, calculate the electron\'s velocity, assuming it is nonrelativistic. Part B, calculate the electron\'s kinetic energy in electronvolts. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [gun, { kind: 'text', id: 'plain', size: 'md', md: 'How **fast** must an electron go to have a wavelength of $0.167$ nm, and how much **energy** does that take?' }],
      lines: [
        { say: 'Let us picture it. An electron gun pulls an electron across a voltage, and it shoots out through a hole.', show: ['sim', 'sim.lines', 'sim.charge'] },
        { say: 'A moving electron behaves like a wave, and the faster it goes, the shorter its wavelength.', show: ['sim.velocity', 'sim.trail'], play: 'sim.go', playDelay: 0.4 },
        { say: 'Nonrelativistic just means slow enough, compared with light, to use the ordinary formulas. The question asks how fast the electron must go to have a wavelength of 0.167 nanometres, and how much energy it then has.', show: 'plain' },
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
          title: 'The de Broglie wavelength',
          md: 'Every moving particle has a wavelength $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$, where $h = 6.63 \\times 10^{-34}$ J·s is Planck’s constant. An electron has mass $m = 9.11 \\times 10^{-31}$ kg. Its kinetic energy is $\\tfrac{1}{2}mv^2$, and $1$ eV $= 1.60 \\times 10^{-19}$ J.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'An electron at $1.00 \\times 10^{6}$ m/s: $\\lambda = \\dfrac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(1.00 \\times 10^{6})} = 7.28 \\times 10^{-10}$ m.' },
      ],
      lines: [
        { say: 'Here is what we need. Louis de Broglie said that every moving particle has a wavelength: Planck\'s constant divided by its momentum, which is mass times velocity.', show: 'def' },
        { say: 'Planck\'s constant is 6.63 times ten to the minus 34 joule seconds, and an electron has a mass of 9.11 times ten to the minus 31 kilograms. Its kinetic energy is a half m v squared, and one electronvolt is 1.60 times ten to the minus nineteen joules.' },
        { say: 'For example, an electron at a million metres per second has a wavelength of 7.28 times ten to the minus ten metres.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Change the wavelength to **metres**', '(a) Rearrange $\\lambda = \\dfrac{h}{mv}$ for $v$', '(b) Find $\\tfrac{1}{2}mv^2$ in joules, then in **eV**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, change the wavelength into metres.', show: 'plan.0' },
        { say: 'For part A, rearrange the de Broglie equation for the speed.', show: 'plan.1' },
        { say: 'For part B, find the kinetic energy in joules, and change it into electronvolts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The speed',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\lambda = 0.167\\ \\text{nm} = 1.67 \\times 10^{-10}\\ \\text{m}', 'v = \\dfrac{h}{m\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(1.67 \\times 10^{-10})}', '= \\adj{4.36 \\times 10^{6}\\ \\text{m/s}}'],
        },
      ],
      lines: [
        { say: 'Step one. A nanometre is ten to the minus nine metres, so 0.167 nanometres is 1.67 times ten to the minus ten metres.', show: 'm.0' },
        { say: 'Rearranging, the speed is Planck\'s constant divided by the mass times the wavelength. Put in the numbers.', show: 'm.1' },
        { say: 'The bottom is 1.52 times ten to the minus forty. Dividing gives 4.36 times ten to the six metres per second. That is part A. It is less than two percent of the speed of light, so nonrelativistic is fine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The energy',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['KE = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2}(9.11 \\times 10^{-31})(4.36 \\times 10^{6})^2', '= 8.65 \\times 10^{-18}\\ \\text{J}', '= \\dfrac{8.65 \\times 10^{-18}}{1.60 \\times 10^{-19}}\\ \\text{eV} = \\good{54.0\\ \\text{eV}}'],
        },
      ],
      lines: [
        { say: 'Step two. The kinetic energy is a half, times the mass, times the speed squared.', show: 'm.0' },
        { say: 'That is 8.65 times ten to the minus eighteen joules.', show: 'm.1' },
        { say: 'To change joules into electronvolts, divide by 1.60 times ten to the minus nineteen. The kinetic energy is 54.0 electronvolts. That is part B.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [gun, { kind: 'math', id: 'm', size: 'md', lines: ['\\lambda = \\dfrac{h}{mv} = \\dfrac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(4.36 \\times 10^{6})} = 0.167\\ \\text{nm}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it. An electron that gains 54.0 electronvolts has been pulled through 54.0 volts. Here is an electron gun with 54.0 volts between its plates. The electron is moved step by step by the force of the field.', show: ['sim', 'sim.lines', 'sim.charge', 'sim.velocity', 'sim.trail', 'sim.energy'], play: 'sim.go', playDelay: 0.5 },
        { say: 'It leaves at 4.36 times ten to the six metres per second. And its wavelength, h over m v, comes back to 0.167 nanometres. Both parts agree.', show: 'm.0' },
        { say: 'This is just what Davisson and Germer did in nineteen twenty-seven. They fired 54 electronvolt electrons at a nickel crystal and saw them diffract, like waves.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['$\\lambda$ left in **nanometres**', '$v = 4.36 \\times 10^{-3}$ m/s: far too slow'],
            ['Left out the $\\tfrac{1}{2}$', '$108$ eV: twice too much'],
            ['Energy left in **joules**', '$8.65 \\times 10^{-18}$: right, but not in eV'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'Putting in 0.167 without changing it into metres gives a speed a billion times too small.' },
        { say: 'Forgetting the half in the kinetic energy doubles it, to 108 electronvolts.' },
        { say: 'And the question asks for electronvolts, so an answer left in joules is not finished. Divide by 1.60 times ten to the minus nineteen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the de Broglie wavelength of an electron (mass $9.11 \\times 10^{-31}$ kg) moving at $2.0 \\times 10^{6}$ m/s?',
          choices: ['3.3 × 10⁻⁴⁰ m', '2.7 × 10⁹ m', '1.8 × 10⁻²⁴ m', '3.6 × 10⁻¹⁰ m'],
          answer: 3,
          working: '$\\lambda = \\dfrac{h}{mv} = \\dfrac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(2.0 \\times 10^{6})} = 3.6 \\times 10^{-10}$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the de Broglie wavelength of an electron moving at 2.0 times ten to the six metres per second? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The momentum is 9.11 times ten to the minus 31, times two times ten to the six: 1.8 times ten to the minus 24. Planck\'s constant divided by that is 3.6 times ten to the minus ten metres. That is choice D. 3.3 times ten to the minus forty left out the mass, 2.7 times ten to the nine is upside down, and 1.8 times ten to the minus 24 is only the momentum.', show: 'q2.answer' },
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
          items: ['de Broglie: $\\lambda = \\dfrac{h}{mv}$', 'Faster particle, **shorter** wavelength', 'Kinetic energy $\\tfrac{1}{2}mv^2$; divide by $1.60 \\times 10^{-19}$ for eV', 'Wavelengths in **metres** before you calculate'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A moving particle has a wavelength: Planck\'s constant over its momentum.', show: 'sum.0' },
        { say: 'The faster it goes, the shorter its wavelength.', show: 'sum.1' },
        { say: 'Its kinetic energy is a half m v squared, and dividing by 1.60 times ten to the minus nineteen gives electronvolts.', show: 'sum.2' },
        { say: 'And always put wavelengths in metres before you calculate. For more on matter waves, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
