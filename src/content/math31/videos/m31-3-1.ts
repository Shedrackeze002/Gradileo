import type { Explainer } from '@/video/script.ts';
// The temperature one spring day, in hours after 6:00 a.m.
const readings: [number, number][] = [[0, 3], [2, 7], [4, 12], [6, 16], [8, 15]];

const table = { kind: 'table' as const, id: 't', head: ['Hours after 6:00 a.m.', 'Temperature (°C)'], rows: readings.map(([x, y]) => [String(x), String(y)]) };

const video: Explainer = {
  id: 'm31-3-1',
  lessonId: 'm31-3-1',
  title: 'Rates of Change and Tangent Lines, Part 1: Average Rate of Change',
  thumbnailTitle: 'Average Rate of Change',
  thumbnail: false,
  summary: 'What an average rate of change is: the change in the output divided by the change in the input over an interval, (f(b) − f(a))/(b − a). Worked from a table of temperatures (2.25 °C per hour from 2 to 6 hours, then −0.5 °C per hour), with its units, what its sign means, and why the order of subtraction must match on the top and the bottom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Derivative · Part 1', title: 'Average Rate of Change', subtitle: 'How fast something changes over an interval' }],
      lines: [
        { say: 'Calculus is the mathematics of change: how fast a car moves, how quickly a tank drains, how steeply a curve climbs. Every one of those questions starts with a rate of change.', show: 'title' },
        { say: 'In this video, you will find an average rate of change from a table of values, give it the right units, and see what its sign tells you.' },
      ],
    },
    {
      chapter: 'Average speed',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{average speed} = \\dfrac{300\\text{ km}}{3\\text{ h}} = 100\\text{ km/h}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Average rate of change', md: 'A **rate of change** compares how much one quantity changes with how much another changes. An **average** rate of change does it over a whole interval.' },
      ],
      lines: [
        { say: 'Suppose you drive 300 kilometres in three hours. Your average speed is the distance divided by the time: 300 kilometres over three hours, which is 100 kilometres per hour.', show: 'm', focus: 'm' },
        { say: 'Speed is a rate of change. It tells you how fast the distance you have travelled changes as time goes by.' },
        { say: 'But you did not drive at exactly 100 the whole way. You went faster on the open road and slower through towns. The 100 describes the whole trip, not any one moment. That is why it is called an average rate of change.', show: 'key' },
      ],
    },
    {
      chapter: 'The definition',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Average rate of change', md: 'The average rate of change of $f$ on the interval $[a, b]$ is the change in $y$ divided by the change in $x$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{f(b) - f(a)}{b - a}'] },
      ],
      lines: [
        { say: 'In general, the average rate of change of a function f, on an interval from "a" to b, is the change in y divided by the change in x.', show: 'def' },
        { say: 'The symbol delta, a Greek letter shaped like a triangle, means the change in. So delta y over delta x is the change in y over the change in x.', show: 'm', focus: 'm' },
        { say: 'The input goes from "a" to b, so it changes by b minus "a". The output goes from f of "a" to f of b, so it changes by f of b minus f of "a". Divide the change in the output by the change in the input.' },
      ],
    },
    {
      chapter: 'From a table',
      layout: 'split',
      leftWidth: 480,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the average rate of change of the temperature from $2$ to $6$ hours after 6:00 a.m.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta y = 16 - 7 = 9\\ ^\\circ\\text{C}', '\\Delta x = 6 - 2 = 4\\text{ h}', '\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{9}{4} = 2.25\\ ^\\circ\\text{C/h}'] },
      ],
      lines: [
        { say: 'The table shows the temperature one spring day, at different numbers of hours after six in the morning. Find the average rate of change of the temperature from two hours to six hours.', show: ['t', 'q'] },
        { say: 'At two hours, the temperature was seven degrees Celsius. At six hours, it was sixteen degrees.', focus: ['t.1', 't.3'] },
        { say: 'The change in temperature is sixteen minus seven, which is nine degrees.', show: 'm.0', focus: ['t.1', 't.3', 'm.0'] },
        { say: 'The change in time is six minus two, which is four hours.', show: 'm.1', focus: 'm.1' },
        { say: 'So the average rate of change is nine over four, which is 2.25 degrees Celsius per hour. On average, the temperature rose 2.25 degrees each hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The units of a rate', md: 'A rate of change is always measured in (units of the output) **per** (unit of the input).' },
        {
          kind: 'table',
          id: 't',
          head: ['Output against input', 'Units of the rate'],
          rows: [
            ['Distance (km) against time (h)', 'km/h'],
            ['Temperature (°C) against time (h)', '°C/h'],
            ['Volume (L) against time (min)', 'L/min'],
            ['Cost (\\$) against items made', '\\$ per item'],
          ],
        },
      ],
      lines: [
        { say: 'Always give a rate of change its units. They are the units of the output, per one unit of the input.', show: 'tip' },
        { say: 'Distance in kilometres against time in hours gives kilometres per hour. Temperature in degrees against time in hours gives degrees per hour.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Volume in litres against time in minutes gives litres per minute. And a cost in dollars against the number of items made gives dollars per item.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A negative rate',
      layout: 'split',
      leftWidth: 480,
      left: [table],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta y = 15 - 16 = {-1}\\ ^\\circ\\text{C}', '\\Delta x = 8 - 6 = 2\\text{ h}', '\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{-1}{2} = -0.5\\ ^\\circ\\text{C/h}'] }],
      lines: [
        { say: 'Now find the average rate of change from six hours to eight hours.', show: 't', focus: ['t.3', 't.4'] },
        { say: 'The temperature goes from sixteen to fifteen degrees, a change of negative one degree. The time goes from six to eight hours, a change of two hours.', show: ['m.0', 'm.1'], focus: ['t.3', 't.4', 'm.0', 'm.1'] },
        { say: 'So the average rate of change is negative one over two, which is negative 0.5 degrees Celsius per hour.', show: 'm.2', focus: 'm.2' },
        { say: 'The sign tells you the direction. A positive rate means the output went up, and a negative rate means it went down. Here, the temperature was falling, by half a degree each hour on average.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the order', md: 'Subtract in the **same order** on the top and the bottom. If the top is later minus earlier, the bottom must be later minus earlier too.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{16 - 7}{2 - 6} = -2.25}', '\\good{\\dfrac{16 - 7}{6 - 2} = 2.25}'] },
      ],
      lines: [
        { say: 'Watch the order of subtraction. A common mistake is to take sixteen minus seven on the top, but two minus six on the bottom.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That gives negative 2.25, which says the temperature fell. But it rose!' },
        { say: 'Subtract in the same order on the top and the bottom. Sixteen is the temperature at six hours, so the bottom must start with six: six minus two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bathtub holds $150$ L of water $2$ minutes after the plug is pulled, and $70$ L after $7$ minutes. Find the average rate of change of the volume over this time.',
          choices: ['$16$ L/min', '$-16$ L/min', '$-80$ L/min', '$-\\tfrac{1}{16}$ min/L'],
          answer: 1,
          working: 'Change in volume: $70 - 150 = -80$ L. Change in time: $7 - 2 = 5$ min. Rate: $\\dfrac{-80}{5} = -16$ L/min.',
        },
      ],
      lines: [
        { say: 'Your turn. A bathtub is draining. Two minutes after the plug is pulled, it holds 150 litres of water. After seven minutes, it holds 70 litres. Find the average rate of change of the volume. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The volume changes by 70 minus 150, which is negative 80 litres, over seven minus two, which is five minutes. Negative 80 over five is negative sixteen litres per minute. Choice C forgets to divide by the five minutes.', show: 'q.answer' },
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
            'Average rate of change on $[a, b]$: $\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{f(b) - f(a)}{b - a}$.',
            'Its units are (output units) per (input unit).',
            'Positive: the output went up. Negative: it went down.',
            'Subtract in the same order on the top and the bottom.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The average rate of change on an interval is the change in the output divided by the change in the input: f of b minus f of "a", over b minus "a".', show: 'sum.0' },
        { say: 'Its units are the units of the output, per unit of the input.', show: 'sum.1' },
        { say: 'A positive rate means the output went up, and a negative rate means it went down.', show: 'sum.2' },
        { say: 'And subtract in the same order on the top and the bottom. In the next part, we see an average rate of change as the slope of a line through two points of a curve. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
