import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-2-1',
  lessonId: 'c8-2-1',
  title: 'Organizing the Elements',
  thumbnail: 'periods',
  summary:
    'The periodic table lists the elements in order of atomic number. Periods are rows and groups are columns, and elements in the same group have similar properties. In 1869 Mendeleev grouped similar elements, left gaps for elements not yet found, and predicted their properties; germanium matched his predictions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Periodic Table', title: 'Organizing the Elements', subtitle: 'Groups, periods and Mendeleev’s gaps' }],
      lines: [
        { say: 'With one hundred and eighteen elements to keep track of, chemists need a way to organize them.', show: 'title' },
        { say: 'The periodic table puts every element in its place, so that elements that behave alike sit together. In this video, you will learn how it is laid out, and how it was first built.' },
      ],
    },
    {
      chapter: 'Groups and periods',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Periodic table', md: 'The elements in order of **atomic number**. A **period** is a row; a **group** is a column. Elements in a group have **similar properties**.' },
        {
          kind: 'table',
          id: 'periods',
          head: ['Period', 'Atomic numbers', 'Elements'],
          rows: [
            ['1', '1 to 2', 'hydrogen, helium'],
            ['2', '3 to 10', 'lithium to neon'],
            ['3', '11 to 18', 'sodium to argon'],
          ],
        },
      ],
      lines: [
        { say: 'The periodic table lists the elements in order of their atomic number, the number of protons in each atom, starting with hydrogen at number one.', show: 'def' },
        { say: 'A horizontal row is called a period. A vertical column is called a group, and the groups are numbered one to eighteen from left to right. Elements in the same group have similar chemical properties.' },
        { say: 'Period one holds just hydrogen and helium. Period two runs from lithium, number three, to neon, number ten, and period three from sodium, number eleven, to argon, number eighteen.', show: 'periods' },
        { say: 'In periods two and three there are only eight elements, in groups one and two, then thirteen to eighteen. The gap in between fills up from period four, with metals such as iron and copper.' },
      ],
    },
    {
      chapter: 'Mendeleev’s table',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'men', tone: 'key', title: 'Dmitri Mendeleev, 1869', md: 'Put similar elements in the same column, left **gaps** for elements not yet found, and **predicted** their properties.' },
      ],
      lines: [
        { say: 'In eighteen sixty-nine, the Russian chemist Dmitri Mendeleev arranged the sixty-three elements then known, so that elements with similar properties sat in the same column.', show: 'men' },
        { say: 'Where no known element fitted, he left a gap, and predicted that a new element would be found to fill it. He even predicted its properties.' },
        { say: 'He predicted an element below silicon. In eighteen eighty-six, germanium was discovered, and its properties matched his predictions closely. Correct predictions like this convinced scientists that his pattern was real.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In which period and group is the element with atomic number 12?',
          choices: ['period 3, group 2', 'period 2, group 3', 'period 3, group 12', 'period 2, group 12'],
          answer: 0,
          working: '12 is between 11 and 18, so it is in period 3. Period 3 starts at 11 in group 1, so 12 is in group 2. It is magnesium.',
        },
      ],
      lines: [
        { say: 'Your turn. In which period and group is the element with atomic number twelve? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve is between eleven and eighteen, so it is in period three. Period three starts at eleven in group one, so twelve is in group two. It is magnesium.', show: 'q.answer' },
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
            'The table lists elements in order of **atomic number**.',
            '**Periods** are rows; **groups** are columns.',
            'Elements in a group have similar properties.',
            'Mendeleev left gaps and predicted new elements.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The periodic table lists the elements in order of atomic number.', show: 'sum.0' },
        { say: 'Periods are rows, and groups are columns.', show: 'sum.1' },
        { say: 'Elements in the same group have similar properties.', show: 'sum.2' },
        { say: 'And Mendeleev left gaps for undiscovered elements, then correctly predicted their properties. Next, you will meet metals and non-metals.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
