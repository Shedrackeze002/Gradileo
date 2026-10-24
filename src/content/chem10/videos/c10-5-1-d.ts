import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { balls, frame, tag } from './lib/c10-5-figures.ts';

// Calcium hydroxide: a calcium ion with two hydroxide groups, each ringed.
const rings: Part = { points: {}, items: [] };
for (const [k, cx] of [[1, -2.05], [2, 2.05]] as const) {
  const ids: string[] = [];
  for (let i = 0; i < 36; i++) {
    const a = (2 * Math.PI * i) / 36;
    rings.points[`r${k}-${i}`] = [cx + 1.3 * Math.cos(a), 0.2 + 1.0 * Math.sin(a)];
    ids.push(`r${k}-${i}`);
  }
  rings.items.push({ kind: 'curve', id: `ring${k}`, points: ids, closed: true, tone: 'theta', dashed: true, weight: 3, group: `g${k}` });
}
const hydroxide = figure('c', [
  balls({
    scale: 1.6,
    balls: [
      { id: 'ca', el: 'Ca', at: [0, 0], group: 'calcium' },
      { id: 'h1', el: 'H', at: [-2.6, 0.45], group: 'oh' },
      { id: 'o1', el: 'O', at: [-1.6, 0], group: 'oh' },
      { id: 'h2', el: 'H', at: [2.6, 0.45], group: 'oh' },
      { id: 'o2', el: 'O', at: [1.6, 0], group: 'oh' },
    ],
  }),
  rings,
  tag('oh1', [-2.05, 1.25], '\\ce{OH}', { place: 'above', tone: 'theta', group: 'g1' }),
  tag('oh2', [2.05, 1.25], '\\ce{OH}', { place: 'above', tone: 'theta', group: 'g2' }),
  tag('name', [0, -1.25], '\\ce{Ca(OH)2}', { place: 'below' }),
  frame('room', [-3.5, -1.6], [3.5, 1.6]),
]);

const video: Explainer = {
  id: 'c10-5-1-d',
  lessonId: 'c10-5-1',
  title: 'The Mole and Molar Mass, Part 4: Brackets in Formulas',
  thumbnailTitle: 'Brackets in Formulas',
  thumbnail: 'c',
  summary:
    'In a formula such as Ca(OH)₂, the number after the bracket multiplies every atom inside it, so calcium hydroxide has 1 Ca, 2 O and 2 H, and a molar mass of 74.1 g/mol. Count the atoms first, then multiply and add: ammonium sulfate, (NH₄)₂SO₄, is 132.1 g/mol. Reading Ca(OH)₂ as if it had no bracket gives 58.1 g/mol, which is too small.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 4', title: 'Brackets in Formulas', subtitle: 'The number after a bracket multiplies everything inside' }],
      lines: [
        { say: 'Some formulas have a group of atoms in brackets, with a small number after it. Calcium hydroxide and ammonium sulfate, a fertilizer, are two of them.', show: 'title' },
        { say: 'In this last part, you will count the atoms in formulas with brackets, and find their molar masses.' },
      ],
    },
    {
      chapter: 'Reading a bracket',
      layout: 'split',
      leftWidth: 680,
      left: [hydroxide],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Atoms in $\\ce{Ca(OH)2}$'],
          rows: [
            ['Ca', '$1$'],
            ['O', '$2 \\times 1 = 2$'],
            ['H', '$2 \\times 1 = 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is calcium hydroxide. Its formula is C A, then O H in brackets, then a small two.', caption: 'Here is calcium hydroxide. Its formula is Ca(OH)₂.', show: ['c.calcium', 'c.oh', 'c.name'] },
        { say: 'The hydroxide group, O H, is one oxygen atom joined to one hydrogen atom. The two after the bracket means there are two of these groups.', caption: 'The hydroxide group, OH, is one oxygen atom joined to one hydrogen atom. The two after the bracket means there are two of these groups.', show: ['c.g1', 'c.g2'], focus: ['c.g1', 'c.g2'] },
        { say: 'So the two multiplies everything inside the bracket. There is one calcium atom, two times one oxygen atoms, and two times one hydrogen atoms.', show: ['t.0', 't.1', 't.2'], focus: 'c' },
        { say: 'That is one calcium, two oxygen and two hydrogen atoms.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Calcium hydroxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the molar mass of calcium hydroxide, $\\ce{Ca(OH)2}$, to the nearest tenth? Use Ca $40.1\\ \\text{g/mol}$, O $16.0\\ \\text{g/mol}$ and H $1.0\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{1 Ca, 2 O and 2 H}', 'M = 40.1 + 2 \\times 16.0 + 2 \\times 1.0', '= 40.1 + 32.0 + 2.0', '= \\good{74.1\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'What is the molar mass of calcium hydroxide? Use forty point one grams per mole for calcium, sixteen point zero for oxygen and one point zero for hydrogen.', caption: 'What is the molar mass of calcium hydroxide? Use 40.1 g/mol for calcium, 16.0 for oxygen and 1.0 for hydrogen.', show: 'q' },
        { say: 'Count first: one calcium, two oxygen and two hydrogen atoms.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply each count by its molar mass: forty point one, plus two times sixteen point zero, plus two times one point zero.', show: 'm.1', focus: 'm.1' },
        { say: 'That is forty point one, plus thirty-two point zero, plus two point zero, which is seventy-four point one grams per mole.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Ammonium sulfate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find the molar mass of ammonium sulfate, $\\ce{(NH4)2SO4}$. Use N $14.0$, H $1.0$, S $32.1$ and O $16.0\\ \\text{g/mol}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Count', 'Molar mass', 'Total'],
          rows: [
            ['N', '$2 \\times 1 = 2$', '$14.0$', '$28.0$'],
            ['H', '$2 \\times 4 = 8$', '$1.0$', '$8.0$'],
            ['S', '$1$', '$32.1$', '$32.1$'],
            ['O', '$4$', '$16.0$', '$64.0$'],
            ['$\\ce{(NH4)2SO4}$', '', '', '[[good:$132.1\\ \\text{g/mol}$]]'],
          ],
        },
      ],
      lines: [
        { say: 'Ammonium sulfate is a fertilizer. Its formula is N H four in brackets, two, then S O four.', caption: 'Ammonium sulfate is a fertilizer. Its formula is (NH₄)₂SO₄.', show: 'q' },
        { say: 'The two after the bracket multiplies both the nitrogen and the hydrogen. Two times one is two nitrogen atoms, and two times four is eight hydrogen atoms.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Outside the bracket, there is one sulfur atom and four oxygen atoms.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Multiply each count by its molar mass: twenty-eight point zero, eight point zero, thirty-two point one and sixty-four point zero.', focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Add them up, and the molar mass is one hundred thirty-two point one grams per mole.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'The bracket multiplies everything',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The bracket multiplies everything inside', md: 'In $\\ce{Ca(OH)2}$ the 2 multiplies **both** the oxygen and the hydrogen. Reading it as if there were no bracket, with 1 O and 2 H, gives a molar mass that is too small.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{1 O and 2 H: } 40.1 + 16.0 + 2.0 = \\bad{58.1\\ \\text{g/mol}}', '\\text{2 O and 2 H: } 40.1 + 32.0 + 2.0 = \\good{74.1\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'A common mistake is to read calcium hydroxide as if there were no bracket, with one oxygen atom and two hydrogen atoms.', show: 'oops' },
        { say: 'That gives forty point one, plus sixteen point zero, plus two point zero, which is fifty-eight point one grams per mole. That is too small.', show: 'm.0', focus: 'm.0' },
        { say: 'The two multiplies both the oxygen and the hydrogen. With two of each, the molar mass is seventy-four point one grams per mole.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the molar mass of magnesium hydroxide, $\\ce{Mg(OH)2}$, to the nearest tenth? Use Mg $24.3\\ \\text{g/mol}$, O $16.0\\ \\text{g/mol}$ and H $1.0\\ \\text{g/mol}$.',
          choices: ['$41.3\\ \\text{g/mol}$', '$42.3\\ \\text{g/mol}$', '$58.3\\ \\text{g/mol}$', '$82.6\\ \\text{g/mol}$'],
          answer: 2,
          working: 'One formula unit has 1 Mg, $2 \\times 1 = 2$ O and $2 \\times 1 = 2$ H: $M = 24.3 + 2 \\times 16.0 + 2 \\times 1.0 = 24.3 + 32.0 + 2.0 = 58.3\\ \\text{g/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molar mass of magnesium hydroxide? Use the molar masses on the screen. Pause the video and try it.', caption: 'Your turn. What is the molar mass of magnesium hydroxide, Mg(OH)₂? Use the molar masses on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fifty-eight point three grams per mole. There are one magnesium, two oxygen and two hydrogen atoms: twenty-four point three, plus thirty-two point zero, plus two point zero. Choice B forgets that the two also multiplies the oxygen.', show: 'q.answer' },
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
            'A number after a bracket multiplies **every** atom inside it.',
            '$\\ce{Ca(OH)2}$ has 1 Ca, 2 O and 2 H, so $M = 74.1\\ \\text{g/mol}$.',
            '$\\ce{(NH4)2SO4}$ has 2 N, 8 H, 1 S and 4 O, so $M = 132.1\\ \\text{g/mol}$.',
            'Count the atoms first, then multiply and add.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number after a bracket multiplies every atom inside it.', show: 'sum.0' },
        { say: 'Calcium hydroxide has one calcium, two oxygen and two hydrogen atoms, so its molar mass is seventy-four point one grams per mole.', show: 'sum.1' },
        { say: 'Ammonium sulfate has two nitrogen, eight hydrogen, one sulfur and four oxygen atoms: one hundred thirty-two point one grams per mole.', show: 'sum.2' },
        { say: 'Count the atoms first, then multiply and add, and you can find the molar mass of any formula. Thanks for watching!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
