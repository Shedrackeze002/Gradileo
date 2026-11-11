import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-7-1',
  lessonId: 'cx-7-1',
  title: 'Time of Flight Mass Spectrometry',
  thumbnail: false,
  summary:
    'A time of flight mass spectrometer turns a sample into positive ions, gives them all the same kinetic energy, lets them drift along a tube and detects them. Lighter ions arrive first. Each peak in a spectrum is an isotope, and its height is its abundance, so the relative atomic mass is the abundance-weighted mean of the isotope masses.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Atoms and Physical Chemistry', title: 'Time of Flight Mass Spectrometry', subtitle: 'Weighing atoms by racing them' }],
      lines: [
        { say: 'How do chemists know that chlorine is a mixture of two isotopes? They race its atoms down a tube, and time them.', show: 'title' },
        { say: 'In this lesson, you will see how a time of flight mass spectrometer works, and use its results to calculate a relative atomic mass.' },
      ],
    },
    {
      chapter: 'The four stages',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Stage', 'What happens'], rows: [['Ionisation', 'The sample is turned into positive ions'], ['Acceleration', 'An electric field gives every ion the same kinetic energy'], ['Ion drift', 'Lighter ions move faster along the tube, so they separate'], ['Detection', 'Each ion gains an electron, making a current']] },
      ],
      lines: [
        { say: 'The instrument works in four stages, all under a vacuum, so the ions do not bump into air molecules.' },
        { say: 'First, ionisation. The sample is turned into positive ions.', show: 't.0', focus: 't.0' },
        { say: 'Second, acceleration. An electric field gives every ion the same kinetic energy.', show: 't.1', focus: 't.1' },
        { say: 'Third, ion drift. With the same kinetic energy, a light ion must move faster than a heavy one, so the lighter ions pull ahead.', show: 't.2', focus: 't.2' },
        { say: 'Fourth, detection. Each ion picks up an electron at the detector, making a current. The bigger the current, the more ions of that mass.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Making the ions',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Electrospray: each molecule gains a proton, giving $\\ce{XH+}$', 'Electron impact: an electron is knocked out, giving $\\ce{X+}$'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['t \\propto \\sqrt{m}'] },
      ],
      lines: [
        { say: 'In electrospray ionisation, the sample is sprayed from a charged needle, and each molecule gains a proton. It is gentle, so big molecules stay whole, and the ion is one mass unit heavier than the molecule.', show: 'b.0' },
        { say: 'In electron impact, fast electrons knock an electron out of each particle. This often breaks molecules into fragments.', show: 'b.1' },
        { say: 'Because every ion has the same kinetic energy, the time of flight is proportional to the square root of the mass.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Relative atomic mass',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['A_r = \\dfrac{\\sum(\\text{mass} \\times \\text{abundance})}{\\sum \\text{abundance}}', 'A_r = \\dfrac{(63 \\times 69.2) + (65 \\times 30.8)}{100} = 63.62'] },
      ],
      lines: [
        { say: 'Each peak in the spectrum of an element is one isotope. Its position gives the mass, and its height gives the abundance.' },
        { say: 'The relative atomic mass is the mean mass, weighted by abundance. Multiply each mass by its abundance, add them up, and divide by the total abundance.', show: 'm.0', focus: 'm.0' },
        { say: 'Copper is sixty nine point two percent copper sixty-three and thirty point eight percent copper sixty-five. That gives sixty-three point six two.', caption: 'Copper is 69.2% copper-63 and 30.8% copper-65. That gives 63.62.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Divide by the right total', md: 'When the abundances are peak heights, such as 3 and 1, divide by their **sum**, 4, not by 100.' }],
      lines: [{ say: 'A common mistake is to divide by a hundred when the abundances are peak heights. If the heights are three and one, divide by their sum, four.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Chlorine’s mass spectrum has peaks at 35 and 37, with heights 3 and 1. What is its relative atomic mass?',
          choices: ['36.0', '35.5', '35.0', '36.5'],
          answer: 1,
          working: '$\\dfrac{(35 \\times 3) + (37 \\times 1)}{3 + 1} = \\dfrac{142}{4} = 35.5$',
        },
      ],
      lines: [
        { say: 'Your turn. Chlorine’s mass spectrum has peaks at thirty-five and thirty-seven, with heights three and one. What is its relative atomic mass? Pause the video and try it.', caption: 'Your turn. Chlorine’s mass spectrum has peaks at 35 and 37, with heights 3 and 1. What is its relative atomic mass? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-five point five. Thirty-five times three, plus thirty-seven, is one hundred forty-two. Divide by four.', caption: 'The answer is B, 35.5. 35 × 3, plus 37, is 142. Divide by 4.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Four stages: ionisation, acceleration, ion drift, detection.', 'Same kinetic energy, so lighter ions arrive first.', 'Electrospray adds a proton; electron impact removes an electron.', 'Relative atomic mass is the abundance-weighted mean mass.'] }],
      lines: [
        { say: 'Let’s sum up. A time of flight mass spectrometer ionises, accelerates, lets the ions drift, and detects them.', show: 'sum.0' },
        { say: 'Every ion gets the same kinetic energy, so the lighter ones arrive first.', show: 'sum.1' },
        { say: 'Electrospray adds a proton, and electron impact knocks out an electron.', show: 'sum.2' },
        { say: 'And the relative atomic mass is the mean of the isotope masses, weighted by their abundances.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
