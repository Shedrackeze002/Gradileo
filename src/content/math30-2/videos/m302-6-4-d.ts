import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// Each step of 1 on the scale is a factor of 10 in the quantity.
const scale = numberLine({
  min: 0,
  max: 4,
  step: 1,
  length: 12,
  points: [
    { id: 'q0', value: 0, tex: '1', tone: 'opp' },
    { id: 'q1', value: 1, tex: '10', tone: 'opp' },
    { id: 'q2', value: 2, tex: '100', tone: 'opp' },
    { id: 'q3', value: 3, tex: '1000', tone: 'opp' },
    { id: 'q4', value: 4, tex: '10\\,000', tone: 'opp' },
  ],
});

const video: Explainer = {
  id: 'm302-6-4-d',
  lessonId: 'm302-6-4',
  title: 'Modelling with Exponential and Logarithmic Functions, Part 4: Logarithmic Scales',
  thumbnailTitle: 'Logarithmic Scales',
  thumbnail: 'ls',
  summary: 'How a logarithmic scale turns each factor of 10 into a step of 1, and three of them: the pH of a solution with [H⁺] = 3.2 × 10⁻⁴ mol/L (about 3.49), a magnitude 6.3 earthquake compared with a magnitude 4.8 (about 32 times as intense), and two 70 dB speakers (about 73.0 dB); and why a difference on the scale is a ratio in the quantity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 4', title: 'Logarithmic Scales', subtitle: 'pH, decibels and earthquakes' }],
      lines: [
        { say: 'Earthquakes, sounds and the acidity of liquids cover enormous ranges, from tiny to millions of times bigger. Ordinary numbers for them would be clumsy.', show: 'title' },
        { say: 'In this video, you will see how a logarithmic scale squeezes a huge range into small numbers, and use three of them: p H, decibels and the Richter scale.', caption: 'In this video, you will see how a logarithmic scale squeezes a huge range into small numbers, and use three of them: pH, decibels and the Richter scale.' },
      ],
    },
    {
      chapter: 'Steps of ten',
      layout: 'center',
      main: [
        figure('ls', [scale], 240),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Logarithmic scale', md: 'Each step of $1$ on the scale means **multiplying by $10$**. The scale value is the common logarithm of the quantity: $\\log 1000 = 3$.' },
      ],
      lines: [
        { say: 'On a logarithmic scale, each step of one on the scale means multiplying by ten.', show: ['ls.axis', 'key'] },
        { say: 'The scale values zero, one, two, three and four stand for one, ten, one hundred, one thousand and ten thousand.', show: ['ls.q0', 'ls.q1', 'ls.q2', 'ls.q3', 'ls.q4'], focus: ['ls.q0', 'ls.q1', 'ls.q2', 'ls.q3', 'ls.q4'] },
        { say: 'The scale value is the common logarithm of the quantity. Log one thousand is three, so one thousand sits at three on the scale.', focus: 'ls.q3' },
        { say: 'So a difference of two on the scale, from one to three, means a factor of one hundred, from ten to one thousand. On a logarithmic scale, differences become ratios.', focus: ['ls.q1', 'ls.q3'] },
      ],
    },
    {
      chapter: 'Three scales',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Scale', 'Formula', 'What it means'],
          rows: [
            ['pH', '$\\text{pH} = -\\log[\\text{H}^+]$', '$[\\text{H}^+]$ is the hydrogen ion concentration in mol/L; a lower pH is more acidic'],
            ['Sound level', '$\\beta = 10\\log \\dfrac{I}{I_0}$', 'in decibels (dB); $I_0$ is the quietest sound a person can hear'],
            ['Richter scale', '$\\dfrac{I_1}{I_2} = 10^{M_1 - M_2}$', 'an increase of $1$ in magnitude is $10$ times the intensity'],
          ],
        },
      ],
      lines: [
        { say: 'Here are three logarithmic scales. In every problem, the formula is given to you.', show: 't.0' },
        { say: 'p H measures acidity. It is negative log of the hydrogen ion concentration, in moles per litre. A lower p H means a more acidic liquid.', caption: 'pH measures acidity. It is negative log of the hydrogen ion concentration, in moles per litre. A lower pH means a more acidic liquid.', focus: 't.0' },
        { say: 'Sound level, beta, is ten log of I over I naught, in decibels. I is the intensity of the sound, and I naught is the quietest sound a person can hear.', show: 't.1', focus: 't.1' },
        { say: 'And on the Richter scale, an increase of one in magnitude means ten times the intensity. So the ratio of two intensities is ten to the power of the difference in magnitudes.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Acidity',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the pH when $[\\text{H}^+] = 3.2 \\times 10^{-4}$ mol/L.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pH} = -\\log\\left(3.2 \\times 10^{-4}\\right)', '\\text{pH} = 3.4948\\ldots \\approx 3.49'] },
      ],
      lines: [
        { say: 'Find the p H when the hydrogen ion concentration is 3.2 times ten to the power negative four moles per litre.', caption: 'Find the pH when the hydrogen ion concentration is 3.2 times ten to the power negative four moles per litre.', show: 'q' },
        { say: 'Substitute into the formula: p H equals negative log of 3.2 times ten to the power negative four.', caption: 'Substitute into the formula: pH equals negative log of 3.2 times ten to the power negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'The log of that number is negative 3.4948, and the minus sign in front makes it positive. So the p H is about 3.49.', caption: 'The log of that number is negative 3.4948, and the minus sign in front makes it positive. So the pH is about 3.49.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Comparing earthquakes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many times as intense is a magnitude 6.3 earthquake as a magnitude 4.8 earthquake?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{I_1}{I_2} = 10^{6.3 - 4.8} = 10^{1.5}', '10^{1.5} = 31.62\\ldots \\approx 32'] },
      ],
      lines: [
        { say: 'How many times as intense is a magnitude 6.3 earthquake as a magnitude 4.8 earthquake?', show: 'q' },
        { say: 'The ratio of the intensities is ten to the power of the difference in magnitudes: ten to the power 6.3 minus 4.8, which is ten to the power 1.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten to the power 1.5 is 31.62. So the bigger earthquake is about 32 times as intense, even though its magnitude is only 1.5 higher.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two speakers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'One speaker produces 70 dB. What level do two identical speakers produce?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\beta = 10\\log \\dfrac{2I}{I_0} = 10\\log 2 + 10\\log \\dfrac{I}{I_0}', '\\beta = 3.0103\\ldots + 70 \\approx 73.0 \\text{ dB}'] },
      ],
      lines: [
        { say: 'One speaker produces 70 decibels. What level do two identical speakers produce?', show: 'q' },
        { say: 'Two speakers give twice the intensity, two I. So beta equals ten log of two I over I naught. The product law splits it: ten log two, plus ten log of I over I naught.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten log of I over I naught is the level of one speaker, 70 decibels. And ten log two is about 3.0103. So two speakers produce about 73.0 decibels, not 140.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A difference is not a ratio', md: 'A magnitude 6 earthquake is not twice as intense as a magnitude 3: it is $10^{6 - 3} = 1000$ times as intense. On a logarithmic scale, **differences** in the scale become **ratios** in the quantity.' },
      ],
      lines: [
        { say: 'A common mistake is to compare the scale numbers as if they were the quantities. A magnitude six earthquake is not twice as intense as a magnitude three.', show: 'oops' },
        { say: 'The difference in magnitude is three, so the ratio of intensities is ten cubed: one thousand times as intense. On a logarithmic scale, differences in the scale become ratios in the quantity.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Using $\\dfrac{I_1}{I_2} = 10^{M_1 - M_2}$, how many times as intense is a magnitude 7.2 earthquake as a magnitude 5.2 earthquake?',
          choices: ['$2$', '$100$', '$1.38$', '$20$'],
          answer: 1,
          working: '$M_1 - M_2 = 7.2 - 5.2 = 2$, so $\\dfrac{I_1}{I_2} = 10^{2} = 100$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many times as intense is a magnitude 7.2 earthquake as a magnitude 5.2 earthquake? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The difference in magnitude is 7.2 minus 5.2, which is two. So the ratio of the intensities is ten squared, which is 100. Choice A is the difference on the scale, not the ratio of the intensities.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['On a logarithmic scale, each step of $1$ means a factor of $10$.', 'pH $= -\\log[\\text{H}^+]$; sound level $\\beta = 10\\log \\dfrac{I}{I_0}$ dB.', 'Richter: $\\dfrac{I_1}{I_2} = 10^{M_1 - M_2}$.', 'A difference on the scale is a ratio in the quantity.'] }],
      lines: [
        { say: 'Let’s sum up. On a logarithmic scale, each step of one means a factor of ten.', show: 'sum.0' },
        { say: 'p H is negative log of the hydrogen ion concentration, and sound level is ten log of I over I naught, in decibels.', caption: 'pH is negative log of the hydrogen ion concentration, and sound level is ten log of I over I naught, in decibels.', show: 'sum.1' },
        { say: 'On the Richter scale, the ratio of intensities is ten to the power of the difference in magnitudes.', show: 'sum.2' },
        { say: 'And a difference on the scale is a ratio in the quantity. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
