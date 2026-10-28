import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-3-c',
  lessonId: 'c20-3-3',
  title: 'Percent Concentration and Parts per Million, Part 3: Parts per Million',
  thumbnailTitle: 'Parts per Million',
  thumbnail: false,
  summary:
    'For very dilute solutions, chemists use parts per million: the mass of solute divided by the mass of solution, both in the same unit, times one million. A 180 g sample holding 0.0021 g of lead has 11.7 ppm of lead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Parts per Million', subtitle: 'For very dilute solutions' }],
      lines: [
        { say: 'Swimming-pool water may hold only a few milligrams of chlorine in each litre, and a drinking-water sample even less of an impurity such as lead.', show: 'title' },
        { say: 'In this part, you will see why chemists use parts per million for such dilute solutions, and calculate it from two masses.' },
      ],
    },
    {
      chapter: 'Tiny percentages',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', align: 'center', md: '$2\\ \\text{mg}$ of solute in a litre of water:' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['0.0002\\%', '= 2\\ \\text{ppm}'] },
      ],
      lines: [
        { say: 'As percentages, these concentrations are awkwardly small numbers. Two milligrams in a litre of water is only zero point zero zero zero two percent.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'Chemists use parts per million instead, which turns them into everyday numbers. The same water holds two parts per million.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Parts per million',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parts per million', md: 'Grams of solute per million grams of solution, with both masses in the **same unit**:' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\text{ppm} = \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 10^6',
            '1\\ \\text{ppm}\\text{: } 1\\ \\text{g in } 1\\,000\\,000\\ \\text{g, or } 1\\ \\text{mg in } 1\\ \\text{kg}',
            '1\\ \\text{ppm} = 1000\\ \\text{ppb}',
          ],
        },
      ],
      lines: [
        { say: 'Parts per million are grams of solute per million grams of solution. Divide the mass of solute by the mass of solution, with both in the same unit, and multiply by ten to the sixth.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'So one part per million is the same ratio as one gram in a million grams, or one milligram in one kilogram.', show: 'm.1', focus: 'm.1' },
        { say: 'For even smaller amounts, chemists use parts per billion. One part per million is one thousand parts per billion.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A weighed sample',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $180\\ \\text{g}$ sample of soil water contains $0.0021\\ \\text{g}$ of lead. What is the concentration in parts per million, to the nearest tenth?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{ppm} = \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 10^6', '= \\dfrac{0.0021\\ \\text{g}}{180\\ \\text{g}} \\times 10^6 = 11.67', '\\approx 11.7\\ \\text{ppm}'],
        },
      ],
      lines: [
        { say: 'Example. A one hundred eighty gram sample of soil water contains zero point zero zero two one grams of lead. What is the concentration in parts per million, to the nearest tenth?', show: 'q' },
        { say: 'The sample was weighed, so use the definition with the two masses.', show: 'm.0', focus: 'm.0' },
        { say: 'Both masses are in grams. Zero point zero zero two one divided by one hundred eighty, times ten to the sixth, is eleven point six seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Rounded, the sample holds eleven point seven parts per million of lead.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same units, and a million',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Same units, and the factor of a million', md: 'Change both masses to the **same unit** first: $2.1\\ \\text{mg}$ in $180\\ \\text{g}$ is $0.0021\\ \\text{g}$ in $180\\ \\text{g}$. Then multiply by $10^6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{0.0021}{180} = 0.0000117 \\quad \\bad{\\text{a plain fraction, not ppm}}'] },
      ],
      lines: [
        { say: 'Two things to watch. First, both masses must be in the same unit before you divide. Two point one milligrams in one hundred eighty grams is zero point zero zero two one grams in one hundred eighty grams.', show: 'mis' },
        { say: 'Second, remember to multiply by ten to the sixth. The division on its own gives about zero point zero zero zero zero one one seven. That is the concentration as a plain fraction, not in parts per million.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $250\\ \\text{g}$ sample of water contains $0.0040\\ \\text{g}$ of copper. What is the concentration of copper in parts per million? Parts per million are grams of solute per million grams of solution.',
          choices: ['$0.000016\\ \\text{ppm}$', '$1.6\\ \\text{ppm}$', '$16\\ \\text{ppm}$', '$160\\ \\text{ppm}$'],
          answer: 2,
          working: '$\\dfrac{0.0040\\ \\text{g}}{250\\ \\text{g}} \\times 10^6 = 16\\ \\text{ppm}$',
        },
      ],
      lines: [
        { say: 'Your turn. A two hundred fifty gram sample of water contains zero point zero zero four zero grams of copper. What is the concentration of copper in parts per million? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Zero point zero zero four zero divided by two hundred fifty, times ten to the sixth, is sixteen parts per million. Choice A is the plain fraction, without the factor of a million.', show: 'q.answer' },
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
            'Parts per million suit very dilute solutions, where a percentage would be tiny.',
            'ppm $= \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 10^6$, both masses in the same unit.',
            '$1\\ \\text{ppm}$ is $1\\ \\text{g}$ in $1\\,000\\,000\\ \\text{g}$, or $1\\ \\text{mg}$ in $1\\ \\text{kg}$.',
            'Without the factor of $10^6$, the answer is a plain fraction, not ppm.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Parts per million suit very dilute solutions, where a percentage would be a tiny number.', show: 'sum.0' },
        { say: 'Parts per million is the mass of solute over the mass of solution, both in the same unit, times ten to the sixth.', show: 'sum.1' },
        { say: 'One part per million is one gram in a million grams, or one milligram in one kilogram.', show: 'sum.2' },
        { say: 'And without the factor of a million, the answer is a plain fraction. In part four, you will use a quicker rule for water samples, in milligrams per litre. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
