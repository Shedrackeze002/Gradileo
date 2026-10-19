import type { Explainer } from '@/video/script.ts';

// Skips in one minute: 25, 28, 30, 34, 34, 37, 39, 41, 42, 46, 53.
const plot = { kind: 'table' as const, id: 't', head: ['Stem', 'Leaf'], rows: [['$2$', '$5\\ \\ 8$'], ['$3$', '$0\\ \\ 4\\ \\ 4\\ \\ 7\\ \\ 9$'], ['$4$', '$1\\ \\ 2\\ \\ 6$'], ['$5$', '$3$']] };

const video: Explainer = {
  id: 'm5-12-2-d',
  lessonId: 'm5-12-2',
  title: 'Collecting and Displaying Data, Part 4: Stem-and-Leaf Plots',
  thumbnailTitle: 'Stem-and-Leaf Plots',
  thumbnail: false,
  summary: 'A stem-and-leaf plot splits each number into a stem (the tens digit) and a leaf (the ones digit), so 3 | 4 means 34. Reading skipping scores: 5 students skipped from 30 to 39 times and 4 skipped more than 40 times; each row works like a category, and its number of leaves is its frequency.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 4', title: 'Stem-and-Leaf Plots', subtitle: 'Tens on the stem, ones on the leaves' }],
      lines: [
        { say: 'Students counted how many times they could skip rope in one minute. Their scores were numbers like twenty-five, thirty-four and forty-one. How can we show them all neatly?', show: 'title' },
        { say: 'In this video, you will learn how a stem-and-leaf plot works, and read one.' },
      ],
    },
    {
      chapter: 'Stems and leaves',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stem-and-leaf plot', md: 'A **stem-and-leaf plot** splits each number into a **stem** (the tens digit) and a **leaf** (the ones digit). Each leaf is one data value.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['34 \\;\\to\\; \\adj{3} \\mid \\opp{4}', '\\adj{\\text{stem}} \\quad \\opp{\\text{leaf}}'] },
      ],
      lines: [
        { say: 'A stem-and-leaf plot splits each number into two parts. Think of a plant: a stem, with leaves growing from it.', show: 'def' },
        { say: 'The stem is the tens digit. The leaf is the ones digit. So thirty-four has a stem of three, and a leaf of four.', show: ['m.0', 'm.1'], focus: 'm.0' },
        { say: 'We write it with a line between them: three, then a line, then four. In this plot, three and four with a line between means thirty-four.' },
        { say: 'Each leaf stands for one data value, so each leaf is one student’s score.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reading the plot',
      layout: 'split',
      leftWidth: 460,
      left: [plot],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\mid 5\\ 8 \\;\\to\\; 25,\\ 28', '3 \\mid 0\\ 4\\ 4\\ 7\\ 9 \\;\\to\\; 30,\\ 34,\\ 34,\\ 37,\\ 39', '4 \\mid 1\\ 2\\ 6 \\;\\to\\; 41,\\ 42,\\ 46', '5 \\mid 3 \\;\\to\\; 53'] }],
      lines: [
        { say: 'Here is the plot of the skipping scores. The stems go down the left side, and the leaves go across to the right.', show: 't' },
        { say: 'The first row has the stem two and the leaves five and eight. So it shows twenty-five and twenty-eight.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'The row with stem three has five leaves: zero, four, four, seven and nine. They are thirty, thirty-four, thirty-four, thirty-seven and thirty-nine. Two students scored thirty-four, so four appears twice.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'The row with stem four shows forty-one, forty-two and forty-six. And the last row shows fifty-three.', show: ['m.2', 'm.3'], focus: ['t.2', 't.3', 'm.2', 'm.3'] },
        { say: 'The leaves in each row are written in order, from smallest to largest, so the plot is easy to read.' },
      ],
    },
    {
      chapter: 'Answering questions',
      layout: 'split',
      leftWidth: 460,
      left: [plot],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many students skipped from $30$ to $39$ times? How many skipped more than $40$ times?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{stem 3: } 5 \\text{ leaves} \\;\\to\\; 5 \\text{ students}', '\\text{stems 4 and 5: } 3 + 1 = 4 \\text{ students}'] },
      ],
      lines: [
        { say: 'How many students skipped from thirty to thirty-nine times?', show: ['t', 'q'] },
        { say: 'All the scores from thirty to thirty-nine are in the row with stem three. It has five leaves, so five students.', show: 'm.0', focus: ['t.1', 'm.0'] },
        { say: 'How many skipped more than forty times? The row with stem four gives forty-one, forty-two and forty-six. That is three students.', focus: 't.2' },
        { say: 'The row with stem five gives fifty-three: one more student. Three plus one is four. So four students skipped more than forty times.', show: 'm.1', focus: ['t.2', 't.3', 'm.1'] },
      ],
    },
    {
      chapter: 'Each row is a category',
      layout: 'split',
      leftWidth: 460,
      left: [plot],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Each row is a category', md: 'The rows of a stem-and-leaf plot work like categories: the twenties, the thirties, and so on. The number of leaves in a row is its frequency.' }],
      lines: [
        { say: 'Here is a helpful way to think about it. The rows of a stem-and-leaf plot work like categories: the twenties, the thirties, the forties, and the fifties.', show: ['t', 'tip'] },
        { say: 'The number of leaves in a row is its frequency. The twenties have two leaves, and the thirties have five.', focus: ['t.0', 't.1'] },
        { say: 'So the row with the most leaves shows the most common group of scores. Here, most students skipped in the thirties.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a stem-and-leaf plot, the row with stem $2$ has the leaves $0\\ \\ 3\\ \\ 3\\ \\ 6$. Which values does this row show?',
          choices: ['$0,\\ 3,\\ 3,\\ 6$', '$2,\\ 0,\\ 3,\\ 3,\\ 6$', '$20,\\ 30,\\ 30,\\ 60$', '$20,\\ 23,\\ 23,\\ 26$'],
          answer: 3,
          working: 'The stem $2$ is the tens digit and each leaf is a ones digit: $20$, $23$, $23$ and $26$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a stem-and-leaf plot, the row with stem two has the leaves zero, three, three and six. Which values does this row show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: twenty, twenty-three, twenty-three and twenty-six. The stem is the tens digit, and each leaf is a ones digit. Choice A forgets the stem, and choice C uses the leaves as tens.', show: 'q.answer' },
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
          items: ['The stem is the tens digit and the leaf is the ones digit: $3 \\mid 4$ means $34$.', 'Each leaf is one data value.', 'Each row works like a category, and its number of leaves is its frequency.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a stem-and-leaf plot, the stem is the tens digit and the leaf is the ones digit.', show: 'sum.0' },
        { say: 'Each leaf is one data value.', show: 'sum.1' },
        { say: 'And each row works like a category: its number of leaves is its frequency. Well done! You can now collect data, and show it in tables and graphs.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
