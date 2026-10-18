import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { drop, guide, line, numbers, riseRun, tag } from './lib/m303-5-graphs.ts';

// A taxi fare: $25.00 for 10 km and $66.00 for 30 km, so $2.05 a kilometre and a $4.50 flag fee.
const g = plane({ x: [0, 35], y: [0, 80], xStep: 5, yStep: 10, every: 0, width: 7, height: 6.5, titles: { x: '\\text{Distance (km)}', y: '\\text{Fare (\\$)}' } });
const taxi = (id: string) =>
  figure(id, [
    g,
    numbers(g, 5, 10),
    line(g, { id: 'line', m: 2.05, b: 4.5, from: 10, to: 34 }),
    line(g, { id: 'back', m: 2.05, b: 4.5, from: 0, to: 10, dashed: true, tone: 'good' }),
    riseRun(g, { id: 'rr', from: [10, 25], to: [30, 66], run: '20', rise: '41', runSide: 'above' }),
    guide(g, 'first-line', [10, 4.5], [10, 25], 'opp', { group: 'first' }),
    tag(g, 'first-t', 10.6, 14.75, '20.50', 'right', 'opp', 'first'),
    dots(g, [
      { id: 'P', x: 10, y: 25, tone: 'theta' },
      { id: 'Q', x: 30, y: 66, tone: 'theta' },
    ]),
    tag(g, 'P-t', 10.3, 23.5, '(10, 25)', 'below right', 'theta'),
    tag(g, 'Q-t', 30, 66, '(30, 66)', 'above left', 'theta'),
    dots(g, [{ id: 'b', x: 0, y: 4.5, tone: 'good' }]),
    tag(g, 'b-t', 2.6, 4.5, '4.50', 'right', 'good'),
  ]);

const video: Explainer = {
  id: 'm303-5-1-d',
  lessonId: 'm303-5-1',
  title: 'Patterns, Tables and Graphs, Part 4: Working Back to the Initial Value',
  thumbnailTitle: 'Working Back to the Start',
  thumbnail: 'tx',
  summary: 'Finding the rate of change and the initial value from two facts: a taxi fare of $25.00 for 10 km and $66.00 for 30 km rises $2.05 a kilometre, and working back from 10 km to 0 km gives a $4.50 flag fee. Why dividing $25.00 by 10 km does not give the rate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Working Back to the Initial Value', subtitle: 'When the value at zero is not given' }],
      lines: [
        { say: 'Sometimes you do not have a whole table or a graph. You only know two facts, such as the prices of two different trips.', show: 'title' },
        { say: 'In this video, you will find the rate of change and the initial value of a linear relation from just two facts, by finding the rate first, then working back to zero.' },
      ],
    },
    {
      chapter: 'Two facts',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'A taxi ride costs \\$25.00 for a $10$ km trip and \\$66.00 for a $30$ km trip. The fare is linear. Find the rate of change and the initial value.' },
        { kind: 'callout', id: 'plan', tone: 'key', title: 'The plan', md: '**1.** Find the rate of change from the two facts. **2.** Work back to $x = 0$ to find the initial value.' },
      ],
      lines: [
        { say: 'A taxi from a city airport costs 25 dollars for a ten-kilometre trip, and 66 dollars for a 30-kilometre trip. The fare is linear. Find the rate of change and the initial value.', show: 'q' },
        { say: 'Neither trip is zero kilometres long, so the initial value is not given. That is fine. Find the rate of change first, then use it to work back to zero kilometres.', show: 'plan' },
      ],
    },
    {
      chapter: 'The rate first',
      layout: 'split',
      leftWidth: 580,
      left: [drop(taxi('tx'), ['first', 'back', 'b', 'b-t'])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{66.00 - 25.00}{30 - 10} = \\dfrac{41.00}{20}', '= 2.05', '2.05 \\text{ dollars per km}'] }],
      lines: [
        { say: 'Here are the two trips as points on a graph: the point at ten, 25 and the point at 30, 66.', show: ['tx.grid', 'tx.axes', 'tx.P', 'tx.Q', 'tx.P-t', 'tx.Q-t'], focus: ['tx.P', 'tx.Q'] },
        { say: 'From the short trip to the long one, the distance goes up by 30 minus ten, which is 20 kilometres. The fare goes up by 66 minus 25, which is 41 dollars.', show: ['tx.rr', 'tx.line'], focus: 'tx.rr' },
        { say: 'So the rate of change is 41 dollars divided by 20 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 2.05 dollars per kilometre.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Back to zero',
      layout: 'split',
      leftWidth: 580,
      left: [taxi('tx2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{first 10 km: } 2.05 \\times 10 = 20.50', '\\text{initial value} = 25.00 - 20.50', '= 4.50'] }],
      lines: [
        { say: 'Now work back from the short trip to zero kilometres. The ten-kilometre trip costs 25 dollars.', show: ['tx2.grid', 'tx2.axes', 'tx2.line', 'tx2.P', 'tx2.Q'], focus: 'tx2.P' },
        { say: 'At 2.05 dollars per kilometre, the first ten kilometres cost 2.05 times ten, which is 20.50 dollars.', show: ['tx2.first', 'm.0'], focus: ['tx2.first', 'm.0'] },
        { say: 'Take those kilometres away, and what is left is the cost of zero kilometres: 25 dollars minus 20.50 dollars.', show: ['tx2.back', 'm.1'], focus: ['tx2.back', 'm.1'] },
        { say: 'That is 4 dollars and 50 cents. So the initial value is 4.50 dollars. It is the flag fee, which the taxi charges before it even moves.', show: ['m.2', 'tx2.b', 'tx2.b-t'], focus: ['m.2', 'tx2.b'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.50 + 2.05 \\times 30', '= 4.50 + 61.50', '= 66.00 \\;\\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'The fare is \\$2.05 per kilometre, with a \\$4.50 flag fee.' },
      ],
      lines: [
        { say: 'Check the answer with the other trip. The flag fee, plus 2.05 dollars for each of 30 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: '2.05 times 30 is 61.50, and 4.50 plus 61.50 is 66 dollars, exactly the fare for the long trip.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So the fare is 2.05 dollars per kilometre, and the initial value is a flag fee of 4 dollars and 50 cents.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing a total by the distance', md: '\\$25.00 for $10$ km is **not** \\$2.50 per kilometre, because the \\$25.00 includes the flag fee. Find the rate from the **change** between two facts.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{25.00 \\div 10 = 2.50} \\;\\Rightarrow\\; 30 \\text{ km would cost } 2.50 \\times 30 = 75.00', '\\text{but it costs } 66.00'] },
      ],
      lines: [
        { say: 'A common mistake is to divide one total by its distance. Twenty-five dollars for ten kilometres looks like 2.50 dollars per kilometre.', show: 'oops' },
        { say: 'But the 25 dollars includes the flag fee. If the rate really were 2.50 dollars, the 30-kilometre trip would cost 75 dollars, not 66.', show: 'm', focus: 'm' },
        { say: 'The rate of change comes from the change between two facts: the extra cost, divided by the extra distance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An electrician charges \\$150 for a $2$-hour job and \\$270 for a $5$-hour job. The cost is linear. What is the initial value (the call-out fee)?',
          choices: ['\\$40', '\\$75', '\\$70', '\\$54'],
          answer: 2,
          working: 'Rate: $\\dfrac{270 - 150}{5 - 2} = \\dfrac{120}{3} = 40$ dollars per hour. Two hours cost $2 \\times 40 = 80$, so the fee is $150 - 80 = 70$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. An electrician charges 150 dollars for a two-hour job, and 270 dollars for a five-hour job. The cost is linear. What is the initial value, the call-out fee? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The rate is 270 minus 150, which is 120 dollars, divided by three hours: 40 dollars per hour. Two hours cost 80 dollars, so the fee is 150 minus 80, which is 70 dollars. Choice B divides 150 by two, which ignores the fee.', show: 'q.answer' },
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
          items: ['With two facts, find the rate first: the change in $y$ over the change in $x$.', 'Then work back to $x = 0$: subtract the rate times $x$ from a known $y$.', 'Check with the other fact.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When you only know two facts, find the rate of change first: the change in y divided by the change in x.', show: 'sum.0' },
        { say: 'Then work back to x equals zero. Subtract the rate times x from a known value of y.', show: 'sum.1' },
        { say: 'And check with the other fact. In the next lesson, we put the rate and the initial value together into an equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
