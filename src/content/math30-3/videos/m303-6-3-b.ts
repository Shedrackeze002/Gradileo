import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

// 30 apprentices: 6 scored higher than Kai (top), 3 (Kai and 2 others) the same, 21 lower.
const apprentices = () =>
  figure(
    'a',
    [
      marbles({
        groups: [
          { id: 'above', count: 6, tone: 'muted' },
          { id: 'equal', count: 3, tone: 'theta' },
          { id: 'below', count: 21, tone: 'adj' },
        ],
        perRow: 10,
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm303-6-3-b',
  lessonId: 'm303-6-3',
  title: 'Percentiles, Part 2: The Percentile Rank Formula',
  thumbnailTitle: 'The Percentile Rank Formula',
  thumbnail: false,
  summary: 'The percentile rank formula PR = (b + 0.5e)/n × 100, with b values below, e values equal (counting the person) and n in all: 21 of 30 apprentices below and 3 equal give PR 75; forgetting to count the person; and percentile ranks from a frequency table, where a quiz score of 8 with 10 workers below, 6 equal and 20 in all has PR 65.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 2', title: 'The Percentile Rank Formula', subtitle: 'Below, equal and total' }],
      lines: [
        { say: 'To find a percentile rank, you count. How many people scored below you? How many got the same score?', show: 'title' },
        { say: 'In this video, you will use a formula to calculate a percentile rank, from a list of results and from a frequency table.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['PR = \\dfrac{b + 0.5e}{n} \\times 100'] },
        { kind: 'bullets', id: 'b', items: ['$b$: the number of values **below** the score.', '$e$: the number of values **equal** to the score, counting the score itself.', '$n$: the total number of values. Round $PR$ to the nearest whole number.'] },
      ],
      lines: [
        { say: 'Here is the formula used in this lesson. PR equals b, plus 0.5 e, all over n, times 100.', show: 'm' },
        { say: 'b is the number of values below the score.', show: 'b.0' },
        { say: 'e is the number of values equal to the score, including the score itself.', show: 'b.1' },
        { say: 'And n is the total number of values. Round the result to the nearest whole number.', show: 'b.2' },
        { say: 'Why only half of the equal values? People with the same score are neither above nor below you, so the formula counts half of them as below.', focus: 'm' },
      ],
    },
    {
      chapter: 'A safety test',
      layout: 'split',
      leftWidth: 480,
      left: [apprentices()],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$30$ apprentices wrote a safety test. $21$ scored lower than Kai, and $2$ others got the same score as Kai.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b = 21, \\quad e = 2 + 1 = 3, \\quad n = 30', 'PR = \\dfrac{21 + 0.5(3)}{30} \\times 100', '= \\dfrac{22.5}{30} \\times 100 = 75'] },
      ],
      lines: [
        { say: 'Thirty apprentices wrote a fall-protection safety test. 21 of them scored lower than Kai, and two others got the same score as Kai. What percentile rank does Kai have?', show: ['q', 'a'] },
        { say: 'The 21 who scored lower are the blue dots: the bottom two rows, and one more. So b is 21.', focus: 'a.below' },
        { say: 'The three yellow dots in the top row have the same score: the two others, plus Kai. So e is two plus one, which is three. And n, the total, is 30.', show: 'm.0', focus: ['a.equal', 'm.0'] },
        { say: 'Substitute: 21, plus 0.5 times three, all over 30, times 100.', show: 'm.1', focus: 'm.1' },
        { say: '21 plus 1.5 is 22.5, and 22.5 divided by 30 is 0.75. Times 100, that is 75. Kai has a percentile rank of 75.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to count the person', md: '$e$ includes the person whose rank you are finding. If no one else has the same score, $e = 1$, not $0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{e = 2}: \\; \\dfrac{21 + 0.5(2)}{30} \\times 100 \\approx 73', '\\good{e = 3}: \\; \\dfrac{21 + 0.5(3)}{30} \\times 100 = 75'] },
      ],
      lines: [
        { say: 'A common mistake is to forget to count the person whose rank you are finding.', show: 'oops' },
        { say: 'Two others had the same score as Kai, so it is tempting to use two for e. That gives about 73, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Kai has that score too, so e is three, and the rank is 75. And if no one else had the same score, e would be one, not zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From a frequency table',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'table', id: 't', head: ['Score (out of 10)', 'Workers'], rows: [['5', '2'], ['6', '3'], ['7', '5'], ['8', '6'], ['9', '3'], ['10', '1']] }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The workers at a plant wrote a $10$-question safety quiz. Hana scored $8$. What is her percentile rank?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['n = 2 + 3 + 5 + 6 + 3 + 1 = 20', 'b = 2 + 3 + 5 = 10, \\quad e = 6', 'PR = \\dfrac{10 + 0.5(6)}{20} \\times 100 = 65'] },
      ],
      lines: [
        { say: 'Results often come in a frequency table, which shows how many people got each score. The workers at a plant wrote a ten-question safety quiz. Hana scored eight. What is Hana’s percentile rank?', show: ['t', 'q'] },
        { say: 'First, n. Add all the frequencies: two plus three plus five plus six plus three plus one is 20 workers.', show: 'm.0', focus: ['t', 'm.0'] },
        { say: 'Next, b: the workers who scored below eight. That is the scores of five, six and seven: two plus three plus five, which is ten.', show: 'm.1', focus: ['t.0', 't.1', 't.2'] },
        { say: 'And e: six workers scored eight, counting Hana.', focus: ['t.3', 'm.1'] },
        { say: 'So PR is ten, plus 0.5 times six, all over 20, times 100. Ten plus three is thirteen, and thirteen over 20 is 0.65. Hana’s percentile rank is 65.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a class of $25$, $16$ students scored lower than Ben, and $3$ others had the same score as Ben. What is Ben’s percentile rank?',
          choices: ['$72$', '$70$', '$64$', '$76$'],
          answer: 0,
          working: '$b = 16$, $e = 3 + 1 = 4$, $n = 25$: $PR = \\dfrac{16 + 0.5(4)}{25} \\times 100 = \\dfrac{18}{25} \\times 100 = 72$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of 25, sixteen students scored lower than Ben, and three others had the same score as Ben. What is Ben’s percentile rank? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b is sixteen. e, counting Ben, is three plus one, which is four. So PR is sixteen plus two, which is eighteen, over 25, times 100: 72. Choice B forgets to count Ben in e.', show: 'q.answer' },
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
          items: ['$PR = \\dfrac{b + 0.5e}{n} \\times 100$: $b$ below, $e$ equal, $n$ total.', '$e$ includes the person: it is at least $1$.', 'From a frequency table, add frequencies to find $n$ and $b$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The percentile rank is b, plus 0.5 e, over n, times 100: b below, e equal, and n in all.', show: 'sum.0' },
        { say: 'e includes the person, so it is always at least one.', show: 'sum.1' },
        { say: 'And from a frequency table, add the frequencies to find n and b. In the next part, we go the other way, and find the value at a given percentile. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
