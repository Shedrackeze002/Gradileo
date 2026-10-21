import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// From −11 °C up 3 °C an hour to 7 °C: six steps of +3, and the whole rise of +18.
const warm = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -12,
        max: 8,
        every: 2,
        unit: 0.26,
        points: [
          { id: 'start', value: -11, tex: '', tone: 'theta' },
          { id: 'end', value: 7, tex: '', tone: 'good' },
        ],
        moves: [
          ...[0, 1, 2, 3, 4, 5].map((k) => ({ id: `h${k}`, from: -11 + 3 * k, to: -8 + 3 * k, label: k === 0 ? '+3' : undefined, tone: 'opp' as const, x: 0.8 + 0.5 * k })),
          { id: 'all', from: -11, to: 7, label: '+18', tone: 'good', x: 4.4 },
        ],
      }),
    ],
    520,
  );
const rises = (fig: string) => [0, 1, 2, 3, 4, 5].map((k) => `${fig}.h${k}`);

// The submarine: from −30 m down 6 m a minute for 4 minutes, to −54 m.
const sub = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -60,
        max: 0,
        step: 2,
        every: 5,
        unit: 0.085,
        water: { width: 5.6 },
        points: [
          { id: 'start', value: -30, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -54, tex: '\\text{end}', tone: 'good' },
        ],
        moves: [0, 1, 2, 3].map((k) => ({ id: `m${k}`, from: -30 - 6 * k, to: -36 - 6 * k, label: k === 3 ? '-6' : undefined, tone: 'theta' as const, x: 2.6 + 0.7 * k })),
      }),
    ],
    520,
  );
const drops = (fig: string) => [0, 1, 2, 3].map((k) => `${fig}.m${k}`);

const video: Explainer = {
  id: 'm8-7-4-b',
  lessonId: 'm8-7-4',
  title: 'Solving Problems with Equations, Part 2: Problems with Integers',
  thumbnailTitle: 'Problems with Integers',
  thumbnail: 'sb',
  summary:
    'Equations with negative numbers come from temperatures, elevations and money owed. A temperature of −11 °C that rises 3 °C each hour until it reaches 7 °C gives 3h − 11 = 7, so 3h = 18 and h = 6 hours. A submarine at −30 m that changes elevation by the same amount each minute and is at −54 m after 4 minutes gives 4r − 30 = −54, so 4r = −24 and r = −6: it goes down 6 m a minute. Check each answer in the problem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 2', title: 'Problems with Integers', subtitle: 'Temperatures and elevations' }],
      lines: [
        { say: 'Temperatures below zero, elevations below sea level, money owed: many real problems use negative numbers.', show: 'title' },
        { say: 'In this part, you will use the four steps to write and solve equations with integers.' },
      ],
    },
    {
      chapter: 'A rising temperature',
      layout: 'split',
      leftWidth: 460,
      left: [warm('wm')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At sunrise it was $-11^\\circ\\text{C}$. The temperature rose $3^\\circ\\text{C}$ each hour until it reached $7^\\circ\\text{C}$. How many hours did that take?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3h - 11 = 7', '3h = 7 + 11 = 18', 'h = 18 \\div 3 = 6', '\\text{Check: } {-11} + 3 \\times 6 = 7 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'At sunrise one winter morning, it was negative eleven degrees Celsius. The temperature rose three degrees each hour, until it reached seven degrees Celsius. How many hours did that take?', show: ['q', 'wm.axis', 'wm.start', 'wm.end'] },
        { say: 'Step one: let h stand for the number of hours.', show: 'wm.h0', focus: 'wm.h0' },
        { say: 'Step two: start at negative eleven, and add three for each hour. So three h minus eleven equals seven.', show: [...rises('wm'), 'm.0'], focus: 'm.0' },
        { say: 'Step three: add eleven to both sides, so three h equals eighteen. Then divide both sides by three: h equals six.', show: ['m.1', 'm.2', 'wm.all'], focus: ['m.2', 'wm.all'] },
        { say: 'Step four: check in the problem. Start at negative eleven, and add three, six times. Negative eleven plus eighteen is seven. It works. It took six hours.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A submarine',
      layout: 'split',
      leftWidth: 460,
      left: [sub('sb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A submarine is at $-30$ m. It changes elevation by the same amount every minute, and after $4$ minutes it is at $-54$ m. What is the change each minute?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4r - 30 = -54', '4r = -54 + 30 = -24', 'r = -24 \\div 4 = -6', '\\text{Check: } {-30} + 4(-6) = -54 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A research submarine is at an elevation of negative thirty metres. It changes elevation by the same amount every minute, and after four minutes it is at negative fifty-four metres. What is the change in elevation each minute?', show: ['q', 'sb.axis', 'sb.water', 'sb.start', 'sb.end'] },
        { say: 'Let r stand for the change each minute, in metres. Start at negative thirty, and add four changes of r. So four r minus thirty equals negative fifty-four.', show: [...drops('sb'), 'm.0'], focus: 'm.0' },
        { say: 'Add thirty to both sides. Negative fifty-four plus thirty is negative twenty-four, so four r equals negative twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by four. Negative twenty-four divided by four is negative six, so r equals negative six.', show: 'm.2', focus: 'm.2' },
        { say: 'Check in the problem: negative thirty plus four times negative six is negative thirty minus twenty-four, which is negative fifty-four. It works. The submarine goes down six metres every minute.', show: 'm.3', focus: ['m.3', ...drops('sb')] },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'A temperature that rises from $-11$ to $7$ takes a **positive** number of hours. A submarine that goes deeper has a **negative** change in elevation. An answer that does not fit the story is a sign of a mistake.' }],
      lines: [
        { say: 'After you solve, ask: does the answer make sense?', show: 'tip' },
        { say: 'The temperature went up, so it took a positive number of hours. Six hours makes sense.' },
        { say: 'The submarine went deeper, so its change in elevation is negative. Negative six makes sense. If an answer does not fit the story, read the question again and check your equation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A freezer is at $5^\\circ\\text{C}$. It cools by $4^\\circ\\text{C}$ each hour until it reaches $-19^\\circ\\text{C}$. Solve $5 - 4h = -19$ to find the number of hours.',
          choices: ['$h = -6$', '$h = 3.5$', '$h = 24$', '$h = 6$'],
          answer: 3,
          working: 'Rewrite: $-4h + 5 = -19$. Subtract $5$: $-4h = -24$. Divide by $-4$: $h = 6$. Check: $5 - 4(6) = 5 - 24 = -19$.',
        },
      ],
      lines: [
        { say: 'Your turn. A freezer is at five degrees Celsius. It cools by four degrees each hour until it reaches negative nineteen degrees. Solve five minus four h equals negative nineteen to find the number of hours. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six hours. Subtract five from both sides to get negative four h equals negative twenty-four, then divide by negative four. Choice A divides by four instead of negative four, and a negative number of hours makes no sense.', show: 'q.answer' },
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
            'A rise is positive, and a fall or a drop is negative.',
            'Temperature: $3h - 11 = 7$, so $h = 6$ hours.',
            'Submarine: $4r - 30 = -54$, so $r = -6$ m each minute.',
            'Check in the problem, and ask whether the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In problems with integers, a rise is positive, and a fall or a drop is negative.', show: 'sum.0' },
        { say: 'The temperature took six hours to rise from negative eleven to seven degrees.', show: 'sum.1' },
        { say: 'The submarine changed by negative six metres each minute.', show: 'sum.2' },
        { say: 'Check each answer in the problem, and ask whether it makes sense. In the next part, you will solve problems with sharing and brackets. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
