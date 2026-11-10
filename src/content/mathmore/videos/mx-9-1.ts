import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 12], y: [0, 12], xStep: 2, yStep: 2 });

const video: Explainer = {
  id: 'mx-9-1',
  lessonId: 'mx-9-1',
  title: 'Direct and Inverse Proportion',
  thumbnail: 'gr',
  summary: 'y ∝ x means y = kx, and y ∝ 1/x means y = k/x. Write the rule, use one pair of values to find k, then use the rule: a spring that stretches 10 cm under 4 kg stretches 17.5 cm under 7 kg, and if 3 painters take 8 hours, 4 painters take 24 ÷ 4 = 6 hours.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Proportion and Compound Measures', title: 'Direct and Inverse Proportion', subtitle: 'One rule, one constant' }],
      lines: [
        { say: 'If every pen costs the same, twice as many pens cost twice as much. If a job is shared by more people, it takes less time.', show: 'title' },
        { say: 'These are the two kinds of proportion. In this video, you will learn to write each one as a rule with a single constant, and to use that rule.' },
      ],
    },
    {
      chapter: 'Direct proportion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Directly proportional', md: '$y$ is **directly proportional** to $x$, written $y \\propto x$, when $y = kx$ for a fixed number $k$, the **constant of proportionality**. Double $x$, and $y$ doubles too.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['e = km', '10 = k \\times 4 \\quad\\Rightarrow\\quad k = 2.5', 'e = 2.5 \\times 7 = 17.5\\text{ cm}'] },
      ],
      lines: [
        { say: 'y is directly proportional to x when y equals k times x, for some fixed number k, called the constant of proportionality. Double x, and y doubles too.', show: 'def' },
        { say: 'Every proportion question takes the same three steps. Here is one. The extension e of a spring, in centimetres, is directly proportional to the mass m hung on it, in kilograms. When m is four, e is ten. Find e when m is seven.' },
        { say: 'Step one: write the rule. e equals k m.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: put in the pair of values you are given to find k. Ten equals k times four, so k is ten divided by four, which is two point five.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: use the rule. When m is seven, e is two point five times seven, which is seventeen point five centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squares and roots',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['In words', 'The rule'], rows: [['$y$ is proportional to the square of $x$', '$y = kx^2$'], ['$y$ is proportional to the cube of $x$', '$y = kx^3$'], ['$y$ is proportional to the square root of $x$', '$y = k\\sqrt{x}$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['d = kt^2', '20 = k \\times 2^2 = 4k \\quad\\Rightarrow\\quad k = 5', 'd = 5 \\times 5^2 = 125\\text{ m}'] },
      ],
      lines: [
        { say: 'A quantity can also be proportional to a power or a root of another. Then the rule has that power or root in it.', show: 't' },
        { say: 'The distance d a stone falls, in metres, is directly proportional to the square of the time t, in seconds. When t is two, d is twenty. Find d when t is five.' },
        { say: 'The rule is d equals k t squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty equals k times two squared, which is four k. So k is five.', show: 'm.1', focus: 'm.1' },
        { say: 'When t is five, d is five times five squared, which is one hundred twenty five metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Inverse proportion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inversely proportional', md: '$y$ is **inversely proportional** to $x$, written $y \\propto \\dfrac{1}{x}$, when $y = \\dfrac{k}{x}$. Double $x$, and $y$ halves, so $x \\times y$ is always $k$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t = \\dfrac{k}{n}', '8 = \\dfrac{k}{3} \\quad\\Rightarrow\\quad k = 24', 't = \\dfrac{24}{4} = 6\\text{ hours}'] },
      ],
      lines: [
        { say: 'y is inversely proportional to x when y equals k divided by x. Double x, and y halves. So x times y always gives the same number, k.', show: 'def' },
        { say: 'The time t it takes to paint a hall, in hours, is inversely proportional to the number of painters n. Three painters take eight hours. How long do four painters take?' },
        { say: 'The rule is t equals k over n.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight equals k over three, so k is eight times three, which is twenty four. That is twenty four hours of work in total.', show: 'm.1', focus: 'm.1' },
        { say: 'With four painters, t is twenty four over four, which is six hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The graphs',
      layout: 'split',
      leftWidth: 620,
      left: [figure('gr', [g, plot(g, { id: 'direct', f: (x) => x, label: 'y = x', labelAt: 0.8 }), plot(g, { id: 'inverse', f: (x) => 24 / x, from: 1.8, to: 12, tone: 'opp', label: 'y = \\frac{24}{x}', labelAt: 0.92, side: 'right' })], 540)],
      right: [
        { kind: 'text', id: 'a', md: '**Direct:** a straight line through the origin.' },
        { kind: 'text', id: 'b', md: '**Inverse:** a curve that falls steeply, then levels out, and never touches either axis.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide, don’t subtract', md: 'Going from $3$ painters to $6$ **halves** the time; it does not take $3$ hours off it.' },
      ],
      lines: [
        { say: 'The graph of direct proportion, y equals k x, is a straight line through the origin.', show: ['gr.grid', 'gr.axes', 'gr.direct', 'a'], focus: 'gr.direct' },
        { say: 'The graph of inverse proportion, y equals k over x, is a curve. It falls steeply, then levels out, and never touches either axis.', show: ['gr.inverse', 'b'], focus: 'gr.inverse' },
        { say: 'In inverse proportion, y is divided as x is multiplied. Going from three painters to six halves the time. It does not take three hours off it.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$y$ is inversely proportional to $x$. When $x = 5$, $y = 12$. Find $y$ when $x = 15$.',
          choices: ['$36$', '$2$', '$4$', '$60$'],
          answer: 2,
          working: '$y = \\dfrac{k}{x}$, so $k = 5 \\times 12 = 60$. When $x = 15$, $y = \\dfrac{60}{15} = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. y is inversely proportional to x. When x is five, y is twelve. Find y when x is fifteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. k is five times twelve, which is sixty, so y is sixty over fifteen, which is four. Choice A treats it as direct proportion, and choice D is the constant k.', show: 'q.answer' },
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
          items: ['$y \\propto x$ means $y = kx$; $y \\propto x^2$ means $y = kx^2$.', '$y \\propto \\dfrac{1}{x}$ means $y = \\dfrac{k}{x}$.', 'Write the rule, use one pair of values to find $k$, then use the rule.', 'Direct: a straight line through the origin. Inverse: a curve that never meets the axes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Directly proportional means y equals k x, or k x squared, and so on.', show: 'sum.0' },
        { say: 'Inversely proportional means y equals k over x.', show: 'sum.1' },
        { say: 'Write the rule, use one pair of values to find k, then use the rule.', show: 'sum.2' },
        { say: 'And recognize the graphs: a straight line through the origin, or a curve that never meets the axes. In the next lesson, we meet density and pressure. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
