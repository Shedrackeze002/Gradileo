import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-4-4',
  lessonId: 'cx-4-4',
  title: 'Life Cycle Assessments and Recycling',
  thumbnail: false,
  summary:
    'A life cycle assessment follows a product through four stages (raw materials, manufacture, use and disposal) and adds up the energy, resources and waste at each. Products used many times are compared per use. Reducing, reusing and recycling save finite resources and energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Earth’s Atmosphere and Resources', title: 'Life Cycle Assessments and Recycling', subtitle: 'Paper bag or plastic bag?' }],
      lines: [
        { say: 'Which is better for the planet, a paper bag or a plastic one? To answer fairly, you have to follow each bag through its whole life.', show: 'title' },
        { say: 'In this lesson, you will use a life cycle assessment to compare products, and see what reducing, reusing and recycling save.' },
      ],
    },
    {
      chapter: 'The four stages',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Life cycle assessment', md: 'A study of the effect a product has on the environment at **every stage** of its life.' },
        { kind: 'bullets', id: 'b', items: ['Extracting and processing the raw materials', 'Manufacturing and packaging', 'Use during its lifetime', 'Disposal at the end of its life'] },
      ],
      lines: [
        { say: 'A life cycle assessment, or L C A, is a study of the effect a product has on the environment at every stage of its life.', caption: 'A life cycle assessment, or LCA, is a study of the effect a product has on the environment at every stage of its life.', show: 'def' },
        { say: 'There are four stages: extracting the raw materials, manufacturing, use, and disposal.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'At each stage it records the energy and water used, the resources consumed, and the waste and pollution produced.' },
      ],
    },
    {
      chapter: 'Comparing for each use',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{plastic: } 20 \\div 1 = 20\\ \\text{g per use}', '\\text{cotton: } 500 \\div 50 = 10\\ \\text{g per use}'] }],
      lines: [
        { say: 'A thin plastic bag accounts for twenty grams of carbon dioxide and is used once. That is twenty grams per use.', caption: 'A thin plastic bag accounts for 20 g of carbon dioxide and is used once. That is 20 g per use.', show: 'm.0', focus: 'm.0' },
        { say: 'A cotton bag accounts for five hundred grams, but it is used fifty times. That is only ten grams per use, as long as it really is used fifty times.', caption: 'A cotton bag accounts for 500 g, but it is used 50 times. That is only 10 g per use, as long as it really is used 50 times.', show: 'm.1', focus: 'm.1' },
        { say: 'Some parts of an assessment, such as how harmful a pollutant is, are judgements. So an L C A can be selective, and used to support a conclusion chosen in advance.', caption: 'Some parts of an assessment, such as how harmful a pollutant is, are judgements. So an LCA can be selective, and used to support a conclusion chosen in advance.' },
      ],
    },
    {
      chapter: 'Reduce, reuse, recycle',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['', 'Example'], rows: [['Reduce', 'Cans made with thinner walls'], ['Reuse', 'A glass bottle washed and refilled'], ['Recycle', 'Aluminium cans melted into new cans']] }],
      lines: [
        { say: 'Metals, glass and most plastics come from finite resources that are being used up. Reducing means using less in the first place.', show: 't.0', focus: 't.0' },
        { say: 'Reusing means using the same object again, without remaking it.', show: 't.1', focus: 't.1' },
        { say: 'Recycling means processing the material into a new product. It still needs energy for collecting, sorting and melting, but far less than starting from ore.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Reusing is not recycling', md: 'Refilling a glass bottle is **reusing**. Melting it down to make a new bottle is **recycling**.' }],
      lines: [{ say: 'A common mistake is to call reusing recycling. Refilling a glass bottle is reusing. Melting it down to make a new one is recycling.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Making 1 tonne of a metal from ore takes 200 GJ. From recycled metal it takes 10 GJ. What percentage of the energy does recycling save?',
          choices: ['5%', '90%', '95%', '190%'],
          answer: 2,
          working: '$\\dfrac{200 - 10}{200} \\times 100 = 95\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. Making one tonne of a metal from its ore takes two hundred gigajoules. Making it from recycled metal takes ten. What percentage of the energy does recycling save? Pause the video and try it.', caption: 'Your turn. Making 1 tonne of a metal from its ore takes 200 GJ. Making it from recycled metal takes 10 GJ. What percentage of the energy does recycling save? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ninety-five percent. The saving is one hundred ninety gigajoules, and one hundred ninety over two hundred is ninety-five percent. Choice A is the share that is still used.', caption: 'The answer is C, 95%. The saving is 190 GJ, and 190 ÷ 200 × 100 = 95%. Choice A is the share that is still used.', show: 'q.answer' },
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
          items: ['An LCA covers raw materials, manufacture, use and disposal.', 'Compare products for each use.', 'Some parts of an LCA are judgements.', 'Reduce, reuse and recycle save resources and energy.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A life cycle assessment covers the raw materials, manufacture, use and disposal of a product.', show: 'sum.0' },
        { say: 'Compare products for each use when they are used more than once.', show: 'sum.1' },
        { say: 'Some parts of an assessment are judgements, so it can be biased.', show: 'sum.2' },
        { say: 'And reducing, reusing and recycling save finite resources and energy.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
