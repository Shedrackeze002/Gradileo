import type { AtomsEl, Explainer } from '@/video/script.ts';

// Exam question for Chemistry 10 lesson 2.3 (electron shells): the electron arrangements of sulfur
// and potassium, and their group and period. OpenStax Chemistry 2e teaches orbitals rather than the
// 2,8,8 shells of this course, so Gradileo wrote this one in the style of a high-school chemistry
// unit test (our own wording). Answers: S 2,8,6 (period 3, group 16); K 2,8,8,1 (period 4, group 1).
//
// The pictures (src/video/atoms.ts): sulfur and potassium side by side, each filling its shells
// shell by shell with clips s1 to s4, so the counts 2, 8, 6 and 2, 8, 8, 1 build up on screen.

const QUESTION =
  'Sulfur has atomic number 16 and potassium has atomic number 19. (a) Write the electron arrangement of an atom of each element. (b) Use the electron arrangements to state the period and the group of each element.';

const pair: AtomsEl = {
  kind: 'atoms',
  id: 'at',
  span: [14, 7.4],
  atoms: [
    { id: 's', symbol: 'S', protons: 16, electrons: 0, at: [3.6, 3.7], tone: 'theta', name: 'sulfur' },
    { id: 'k', symbol: 'K', protons: 19, electrons: 0, at: [10.4, 3.7], tone: 'opp', name: 'potassium' },
  ],
  clips: {
    s1: { phases: [{ dur: 1.4, fill: { s: 2, k: 2 } }, { dur: 0.4 }] },
    s2: { phases: [{ dur: 3, fill: { s: 10, k: 10 } }, { dur: 0.4 }] },
    s3: { phases: [{ dur: 3, fill: { s: 16, k: 18 } }, { dur: 0.4 }] },
    s4: { phases: [{ dur: 1.4, fill: { k: 19 } }, { dur: 0.6 }] },
  },
  poster: 's4',
  height: 500,
};

const video: Explainer = {
  id: 'xq-c10-2-3',
  lessonId: '',
  exam: {
    lesson: 'c10-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Electron Arrangements of Sulfur and Potassium, Group and Period',
  thumbnailTitle: 'Sulfur and Potassium',
  thumbnail: 'at',
  summary:
    'An exam-style question, solved one small step at a time: we write the electron arrangements of sulfur (2,8,6) and potassium (2,8,8,1) by filling the shells in order, and watch the electrons arrive. Then we read the period from the number of shells and the group from the outer electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sulfur and Potassium', subtitle: 'Electron shells, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about where the electrons go in two atoms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'Sulfur has atomic number 16 and potassium has atomic number 19.<br>(a) Write the electron arrangement of an atom of each element.<br>(b) Use the electron arrangements to state the period and the group of each element.',
          answer: 'S: 2,8,6, period 3, group 16. K: 2,8,8,1, period 4, group 1.',
          working: 'Fill shells 2, 8, 8, 2. Number of shells = period; outer electrons give the group.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Sulfur has atomic number 16 and potassium has atomic number 19. Part a: write the electron arrangement of an atom of each element. Part b: use the electron arrangements to state the period and the group of each element.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ask', items: ['How many electrons in **each shell**?', 'Written as numbers with commas, like **2,8,1**', 'Then: which **row** and which **column** of the periodic table?'] }],
      lines: [
        { say: 'An electron arrangement lists how many electrons sit in each shell, from the inside out.', show: 'ask.0' },
        { say: 'We write it as numbers separated by commas. Sodium, for example, is two, eight, one.', show: 'ask.1' },
        { say: 'Then part b asks us to place each element in the periodic table, using only those numbers.', show: 'ask.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Neutral atom: **electrons = atomic number**', 'Shells fill from the inside: **2**, then **8**, then **8**, then the fourth shell', '**Number of shells** = period', '**Outer electrons**: 1 or 2 give group 1 or 2; 3 to 8 give group 13 to 18'] },
      ],
      lines: [
        { say: 'Here is what we need. A neutral atom has as many electrons as its atomic number.', show: 'b.0' },
        { say: 'The shells fill from the inside out. The first holds 2, the second 8, the third 8, and then the fourth shell starts.', show: 'b.1' },
        { say: 'The number of shells in use is the period, the row of the table.', show: 'b.2' },
        { say: 'And the outer electrons give the group. One or two outer electrons give group 1 or 2. Three to eight give groups 13 to 18: add ten.', show: 'b.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **electrons**', '**Fill the shells**: 2, then 8, then 8…', 'Read the **period** and the **group**'] }],
      lines: [
        { say: 'Here is the plan. First, count the electrons in each atom.', show: 'plan.0' },
        { say: 'Second, fill the shells in order.', show: 'plan.1' },
        { say: 'Third, read off the period and the group.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count the electrons',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{S: atomic number } 16 \\to \\hyp{16}\\ \\text{electrons}', '\\text{K: atomic number } 19 \\to \\opp{19}\\ \\text{electrons}'] }],
      lines: [
        { say: 'Step one. Each atom is neutral, so its electrons match its protons. Sulfur has 16 electrons.', show: 'm.0' },
        { say: 'Potassium has 19.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Fill the shells',
      layout: 'split',
      leftWidth: 760,
      left: [pair],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{shell 1: S } 2,\\ \\text{K } 2', '\\text{shell 2: S } 8,\\ \\text{K } 8', '\\text{shell 3: S } 6,\\ \\text{K } 8', '\\text{shell 4: K } 1', '\\text{S} = \\good{2,8,6}', '\\text{K} = \\good{2,8,8,1}'] }],
      lines: [
        { say: 'Step two. Watch the electrons arrive. The first shell takes 2 in each atom.', show: ['at', 'at.labels', 'at.arrangement', 'm.0'], play: 'at.s1', playDelay: 0.3 },
        { say: 'The second shell takes 8 in each. Sulfur has 6 left, and potassium has 9.', show: 'm.1', play: 'at.s2' },
        { say: 'Sulfur\'s last 6 go into the third shell. Potassium fills its third shell with 8, leaving 1.', show: 'm.2', play: 'at.s3' },
        { say: 'That last electron starts the fourth shell.', show: 'm.3', play: 'at.s4' },
        { say: 'So sulfur is two, eight, six, and potassium is two, eight, eight, one.', show: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Step 3: Period and group',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Atom', 'Arrangement', 'Shells → period', 'Outer electrons → group'],
          rows: [
            ['Sulfur', '2,8,**6**', '3 → **period 3**', '6 → 6 + 10 = **group 16**'],
            ['Potassium', '2,8,8,**1**', '4 → **period 4**', '1 → **group 1**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Sulfur uses three shells, so it is in period 3. It has 6 outer electrons, and 6 plus 10 is 16, so it is in group 16.', show: ['tab', 'tab.0'] },
        { say: 'Potassium uses four shells, so it is in period 4. It has one outer electron, so it is in group 1, with the other alkali metals.', show: 'tab.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 + 8 + 6 = 16\\ \\checkmark', '2 + 8 + 8 + 1 = 19\\ \\checkmark'] }],
      lines: [
        { say: 'Check by adding each arrangement back up. Two plus eight plus six is 16, sulfur\'s atomic number.', show: 'm.0' },
        { say: 'Two plus eight plus eight plus one is 19, potassium\'s. And on the periodic table, sulfur sits below oxygen in group 16, period 3, and potassium starts period 4 in group 1. It all agrees.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['K: 2,8,9', 'Put **9** in the third shell; it holds 8 here'],
            ['S: group 6', 'Forgot to **add ten** for groups 13 to 18'],
            ['K: period 1', 'Confused **outer electrons** with **shells**'],
            ['S: 2,6,8', 'Filled the shells in the **wrong order**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Two, eight, nine for potassium overfills the third shell. For the first 20 elements, the nineteenth electron starts the fourth shell.' },
        { say: 'Group 6 for sulfur forgets that the groups jump from 2 to 13 across the transition metals, so six outer electrons means group 16.' },
        { say: 'Mixing up the two rules: shells give the period, outer electrons give the group. And always fill from the inside out.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Aluminium has atomic number 13. What is its electron arrangement?',
          choices: ['$2,8,3$', '$2,11$', '$8,5$', '$2,8,2,1$'],
          answer: 0,
          working: '13 electrons: 2 in the first shell, 8 in the second, and the last 3 in the third. Period 3, group 13.',
        },
      ],
      lines: [
        { say: 'Your turn. Aluminium has atomic number 13. What is its electron arrangement? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two in the first shell, eight in the second, and the last three in the third: two, eight, three, choice A. That puts aluminium in period 3 and group 13.', show: 'q2.answer' },
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
          items: ['Electrons = atomic number in a neutral atom', 'Fill shells **2, 8, 8**, then the fourth', 'Shells → **period**; outer electrons → **group**', 'Check: the arrangement adds up to the atomic number'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a neutral atom, the electrons equal the atomic number.', show: 'sum.0' },
        { say: 'Fill the shells two, eight, eight, and then the fourth.', show: 'sum.1' },
        { say: 'The number of shells gives the period, and the outer electrons give the group.', show: 'sum.2' },
        { say: 'And the arrangement must add up to the atomic number. For more on electron shells, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
