import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-1-3',
  lessonId: 'c9-1-3',
  title: 'Electron Arrangements',
  thumbnail: 'arr',
  summary:
    'For the first 20 elements, shells hold 2, then 8, then 8 electrons, filling from the inside out. The number of shells gives the period and the number of outer electrons gives the group. Elements in a group have the same number of outer electrons, so they react alike, and full outer shells make the noble gases unreactive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic Structure', title: 'Electron Arrangements', subtitle: 'How electrons fill their shells' }],
      lines: [
        { say: 'Why is sodium so like potassium, and why do the noble gases refuse to react?', show: 'title' },
        { say: 'The answer is in how an atom’s electrons are arranged. In this video, you will learn to write electron arrangements, and see how they explain the periodic table.' },
      ],
    },
    {
      chapter: 'Filling the shells',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'definition', title: 'Shells fill from the inside out', md: 'First shell: up to **2**. Second: up to **8**. Third: up to **8**. Then the fourth.' },
        {
          kind: 'table',
          id: 'arr',
          head: ['Element', 'Atomic number', 'Arrangement'],
          rows: [
            ['carbon', '6', '2, 4'],
            ['sodium', '11', '2, 8, 1'],
            ['aluminium', '13', '2, 8, 3'],
            ['chlorine', '17', '2, 8, 7'],
            ['calcium', '20', '2, 8, 8, 2'],
          ],
        },
      ],
      lines: [
        { say: 'Electrons occupy shells around the nucleus. For the first twenty elements, the first shell holds up to two electrons, the second up to eight, and the third up to eight. Any more go into the fourth.', show: 'rule' },
        { say: 'Carbon has six electrons: two in the first shell and four in the second. We write that as two, four.', show: ['arr', 'arr.0'], focus: 'arr.0' },
        { say: 'Sodium has eleven: two, then eight, then one left over. So sodium is two, eight, one.', show: 'arr.1', focus: 'arr.1' },
        { say: 'Aluminium has thirteen: two, eight, and three in the third shell.', show: 'arr.2', focus: 'arr.2' },
        { say: 'Chlorine is two, eight, seven, and calcium, with twenty, is two, eight, eight, two. A quick check: the numbers always add up to the atomic number.', show: ['arr.3', 'arr.4'], focus: 'arr.4' },
      ],
    },
    {
      chapter: 'Shells and the periodic table',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'per', tone: 'key', title: 'Period', md: 'The number of **occupied shells**.' },
        { kind: 'callout', id: 'grp', tone: 'key', title: 'Group', md: 'From the number of **outer electrons**: 1 → group 1, 2 → group 2, 3 to 8 → groups 13 to 18.' },
      ],
      lines: [
        { say: 'An electron arrangement tells you where an element sits in the periodic table. The number of occupied shells is the period. Sodium has three shells, so it is in period three.', show: 'per' },
        { say: 'The number of outer electrons gives the group. One outer electron means group one, two means group two, and three to eight outer electrons mean groups thirteen to eighteen.', show: 'grp' },
        { say: 'Reactions involve the outer electrons. Elements in the same group have the same number of outer electrons, so they react in similar ways. The noble gases have full outer shells, which are very stable, so they hardly react at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An element has the arrangement 2, 8, 6. Which group and period is it in?',
          choices: ['group 16, period 3', 'group 6, period 2', 'group 3, period 6', 'group 18, period 3'],
          answer: 0,
          working: 'Three shells, so period 3. Six outer electrons, so group 16. It is sulfur.',
        },
      ],
      lines: [
        { say: 'Your turn. An element has the arrangement two, eight, six. Which group and period is it in? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It has three shells, so it is in period three. Six outer electrons put it in group sixteen. It is sulfur.', show: 'q.answer' },
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
            'Shells hold 2, then 8, then 8, filling from the inside out.',
            'Number of shells = **period**.',
            'Number of outer electrons gives the **group**.',
            'Same outer electrons, similar reactions; full shells are stable.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For the first twenty elements, shells hold two, then eight, then eight electrons, filling from the inside out.', show: 'sum.0' },
        { say: 'The number of shells gives the period.', show: 'sum.1' },
        { say: 'The number of outer electrons gives the group.', show: 'sum.2' },
        { say: 'And elements with the same number of outer electrons react alike, while full outer shells make the noble gases unreactive. Next, you will see atoms lose and gain electrons to become ions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
