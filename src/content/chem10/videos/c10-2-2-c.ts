import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-2-2-c',
  lessonId: 'c10-2-2',
  title: 'Isotopes and Relative Atomic Mass, Part 3: Measured Masses and Abundances',
  thumbnailTitle: 'Finding an Abundance',
  thumbnail: false,
  summary:
    'Precise calculations use the measured mass of each isotope: copper (69.2% at 62.93 and 30.8% at 64.93) has a relative atomic mass of 63.55. The percentages add up to 100. To work back from a relative atomic mass to an abundance, let x be one percentage and 100 − x the other, and solve: boron with a relative atomic mass of 10.8 is 20% boron-10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 3', title: 'Measured Masses and Abundances', subtitle: 'Forwards and backwards' }],
      lines: [
        { say: 'The periodic table gives copper a relative atomic mass of 63.55. That number comes from copper’s two isotopes, measured very precisely.', show: 'title' },
        { say: 'In this part, you will use measured masses, and then work backwards from a relative atomic mass to find an abundance.' },
      ],
    },
    {
      chapter: 'Measured masses',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Copper: $69.2\\%$ copper-63, relative mass $62.93$, and $30.8\\%$ copper-65, relative mass $64.93$. Find $A_r$ to the nearest hundredth.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['62.93 \\times 69.2 = 4354.756', '64.93 \\times 30.8 = 1999.844', 'A_r = \\dfrac{4354.756 + 1999.844}{100} = \\dfrac{6354.6}{100} = 63.546', 'A_r = 63.55'],
        },
      ],
      lines: [
        { say: 'More precise calculations use the measured mass of each isotope, which is very close to its mass number, but not exactly equal to it.' },
        { say: 'Copper is sixty-nine point two percent copper-63, with a mass of 62.93, and thirty point eight percent copper-65, with a mass of 64.93. Find its relative atomic mass to the nearest hundredth.', show: 'q' },
        { say: 'Multiply each mass by its percentage: 62.93 times 69.2 is 4,354.756, and 64.93 times 30.8 is 1,999.844.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Add them and divide by one hundred: 63.546, which is 63.55 to the nearest hundredth. That is the value in the periodic table.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'The percentages add up to 100',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The percentages add up to 100', md: 'If a question gives one abundance and says "the rest" are the other isotope, subtract from $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{copper-65: } 100 - 69.2 = 30.8\\%'] },
      ],
      lines: [
        { say: 'If a question gives only one abundance, and says the rest are the other isotope, subtract from one hundred.', show: 'tip' },
        { say: 'If 69.2 percent of copper atoms are copper-63, then one hundred minus 69.2, or 30.8 percent, are copper-65.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Finding an abundance',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Boron has two isotopes, boron-10 and boron-11. A sample has $A_r = 10.8$. Taking each mass to be its mass number, find the percentage of boron-10 atoms.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{boron-10: } x\\% \\qquad \\text{boron-11: } (100 - x)\\%', '\\dfrac{10x + 11(100 - x)}{100} = 10.8', '10x + 1100 - 11x = 1080', '1100 - x = 1080, \\quad \\text{so } x = 20'],
        },
      ],
      lines: [
        { say: 'You can also work backwards, from a relative atomic mass to the abundances.' },
        { say: 'Boron has two isotopes, boron-10 and boron-11. A sample has a relative atomic mass of 10.8. What percentage of the atoms are boron-10?', show: 'q' },
        { say: 'Use x for the percentage of boron-10. The rest, one hundred minus x percent, are boron-11.', show: 'm.0', focus: 'm.0' },
        { say: 'Write the weighted mean with x, and set it equal to 10.8.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by one hundred and expand: ten x, plus 1,100, minus eleven x, equals 1,080.', show: 'm.2', focus: 'm.2' },
        { say: 'That simplifies to 1,100 minus x equals 1,080, so x is twenty. Twenty percent of the atoms are boron-10, and eighty percent are boron-11.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check with an estimate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{10 \\times 20 + 11 \\times 80}{100} = \\dfrac{1080}{100} = 10.8 \\ \\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate first', md: '$10.8$ is much closer to $11$ than to $10$, so boron-11 must be the more common isotope.' },
      ],
      lines: [
        { say: 'Check: ten times twenty, plus eleven times eighty, is 1,080, and over one hundred that is 10.8.', show: 'm' },
        { say: 'A quick estimate helps too. 10.8 is much closer to eleven than to ten, so boron-11 must be the more common isotope.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Gallium has two isotopes, gallium-69 and gallium-71. Take the mass of each isotope to be its mass number. A sample of gallium has a relative atomic mass of $69.8$. What percentage of the atoms are gallium-69?',
          choices: ['$40\\%$', '$60\\%$', '$80\\%$', '$20\\%$'],
          answer: 1,
          working: '$\\dfrac{69x + 71(100 - x)}{100} = 69.8$. Multiply by $100$: $69x + 7100 - 71x = 6980$, so $7100 - 2x = 6980$ and $x = 60$. Check: $\\dfrac{69 \\times 60 + 71 \\times 40}{100} = \\dfrac{6980}{100} = 69.8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Gallium has two isotopes, gallium-69 and gallium-71. A sample has a relative atomic mass of 69.8. Taking each mass to be its mass number, what percentage of the atoms are gallium-69? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, sixty percent. Using x for the percentage of gallium-69, the equation simplifies to 7,100 minus two x equals 6,980, so x is sixty. Choice A, forty percent, is the share of gallium-71.', show: 'q.answer' },
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
            'Precise calculations use each isotope’s **measured mass**: copper gives $A_r = 63.55$.',
            'The percentages add up to $100$: subtract to find a missing one.',
            'To find an abundance, let $x$ be one percentage and $100 - x$ the other, and solve.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Precise calculations use each isotope’s measured mass, which gives copper a relative atomic mass of 63.55.', show: 'sum.0' },
        { say: 'The percentages add up to one hundred, so subtract to find a missing one.', show: 'sum.1' },
        { say: 'And to find an abundance, use x for one percentage and one hundred minus x for the other, and solve. That completes this lesson. Next, you will see how electrons are arranged in shells.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
