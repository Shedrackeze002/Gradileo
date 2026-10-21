import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-3-b',
  lessonId: 'm9-6-3',
  title: 'Solving Problems with Linear Equations, Part 2: Comparing Two Options',
  thumbnailTitle: 'Comparing Two Options',
  thumbnail: false,
  summary:
    'When two options each have a starting fee and a rate, setting the two costs equal shows where one stops being cheaper and the other starts. One taxi company charges $3.50 plus $1.80 per km, another $5.00 plus $1.60 per km: 3.5 + 1.8k = 5 + 1.6k gives k = 7.5, and both fares are $17.00. For longer trips the lower rate per kilometre is cheaper ($21.00 against $21.50 for 10 km); for shorter trips the lower starting fee wins.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 2', title: 'Comparing Two Options', subtitle: 'When do they cost the same?' }],
      lines: [
        { say: 'One taxi has a cheaper starting fee. Another has a cheaper price per kilometre. Which one should you call?', show: 'title' },
        { say: 'In this part, you will set two costs equal, to find where one option stops being cheaper and the other one starts.' },
      ],
    },
    {
      chapter: 'Two taxi companies',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'In one town, a taxi company charges \\$3.50 plus \\$1.80 per kilometre. Another charges \\$5.00 plus \\$1.60 per kilometre. For what distance are the fares the same?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Let } k = \\text{the distance in kilometres.}', '3.5 + 1.8k = 5 + 1.6k'] },
      ],
      lines: [
        { say: 'In one town, a taxi company charges three dollars and fifty cents, plus one dollar and eighty cents per kilometre. Another charges five dollars, plus one dollar and sixty cents per kilometre. For what distance are the fares the same?', show: 'q' },
        { say: 'Step one: let k stand for the distance in kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: in dollars, the first fare is three point five plus one point eight k, and the second is five plus one point six k.' },
        { say: 'Step three: the fares are equal, so three point five plus one point eight k equals five plus one point six k.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solve and verify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.5 + 0.2k = 5 \\qquad \\text{subtract } 1.6k', '0.2k = 1.5 \\qquad \\text{subtract } 3.5', 'k = 7.5 \\qquad \\text{divide by } 0.2', '3.5 + 1.8(7.5) = 17 \\qquad 5 + 1.6(7.5) = 17 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'The fares are the same, \\$17.00, for a trip of 7.5 km.' },
      ],
      lines: [
        { say: 'Step four: solve. Subtract one point six k from both sides: three point five plus zero point two k equals five.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract three point five: zero point two k equals one point five. Divide by zero point two: k equals seven point five.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Step five: verify. The first fare is three point five plus one point eight times seven point five, which is seventeen dollars. The second is five plus one point six times seven point five, which is also seventeen dollars.', show: 'm.3', focus: 'm.3' },
        { say: 'Step six: the fares are the same, seventeen dollars, for a trip of seven point five kilometres.', show: 'ans' },
      ],
    },
    {
      chapter: 'Which option is better?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Distance (km)', '$0$', '$5$', '$7.5$', '$10$'],
          rows: [
            ['First company (\\$)', '$3.50$', '$12.50$', '$17.00$', '$21.50$'],
            ['Second company (\\$)', '$5.00$', '$13.00$', '$17.00$', '$21.00$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which option is better?', md: 'For trips **longer** than 7.5 km, the lower rate per kilometre (\\$1.60) is cheaper. For **shorter** trips, the lower starting fee wins.' },
      ],
      lines: [
        { say: 'Which company is better? It depends on the distance. Look at the fares in this table.', show: ['t.0', 't.1'] },
        { say: 'For a short trip of five kilometres, the first company is cheaper: twelve dollars and fifty cents, against thirteen dollars. Its lower starting fee wins.', focus: ['t.0', 't.1'] },
        { say: 'At seven point five kilometres, both fares are seventeen dollars.' },
        { say: 'For a longer trip of ten kilometres, the second company is cheaper: twenty-one dollars, against twenty-one dollars and fifty cents. Its lower rate per kilometre wins on longer trips.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Bike rental A charges \\$10 plus \\$3 per hour. Bike rental B charges \\$4 plus \\$5 per hour. For how many hours do the two rentals cost the same?',
          choices: ['$7$ hours', '$1.5$ hours', '$2$ hours', '$3$ hours'],
          answer: 3,
          working: '$10 + 3h = 4 + 5h$. Subtract $3h$ and $4$ from both sides: $6 = 2h$, so $h = 3$. Both cost \\$19.',
        },
      ],
      lines: [
        { say: 'Your turn. Bike rental A charges ten dollars, plus three dollars per hour. Bike rental B charges four dollars, plus five dollars per hour. For how many hours do the two rentals cost the same? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Ten plus three h equals four plus five h. Subtract three h and four from both sides: six equals two h, so h equals three. Both cost nineteen dollars. Choice A adds the starting fees instead of subtracting them.', show: 'q.answer' },
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
            'For two options with a starting fee and a rate, write a cost expression for each.',
            'Set the costs equal and solve to find when they are the same.',
            'On one side of that point the lower starting fee wins; on the other side the lower rate wins.',
            'Verify in the words of the problem.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For two options that each have a starting fee and a rate, write a cost expression for each one.', show: 'sum.0' },
        { say: 'Set the costs equal, and solve, to find when they are the same.', show: 'sum.1' },
        { say: 'On one side of that point, the lower starting fee wins. On the other side, the lower rate wins.', show: 'sum.2' },
        { say: 'And verify in the words of the problem. In the next part, you will solve problems about ages. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
