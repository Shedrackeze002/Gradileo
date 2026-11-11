import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-22-1',
  lessonId: 'mx-22-1',
  title: 'Relations and Functions',
  thumbnail: 'def',
  summary: 'A relation pairs inputs with outputs. It is a function when every input has exactly one output. {(1, 4), (2, 7), (3, 7), (1, 9)} is not a function, because the input 1 has two outputs. On a graph, use the vertical line test. For the rule "multiply by 4, then subtract 3", an input of 5 gives 17, and an output of 25 comes from an input of 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions and Simple Quadratic Equations', title: 'Relations and Functions', subtitle: 'One input, exactly one output' }],
      lines: [
        { say: 'A vending machine is predictable. Press the same button, and the same drink comes out every time. That predictability is what turns a relation into a function.', show: 'title' },
        { say: 'In this video, you will learn what relations and functions are, how to test whether a relation is a function, and how to find inputs and outputs.' },
      ],
    },
    {
      chapter: 'Relations and functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rel', tone: 'definition', title: 'Relation', md: 'A set of pairings between two sets of values. Each pairing matches an **input** with an **output**: (input, output).' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Function', md: 'A relation in which every input is paired with **exactly one** output.' },
      ],
      lines: [
        { say: 'A relation is a set of pairings between two sets of values. Each pairing matches an input with an output, and we often write it as an ordered pair.', show: 'rel' },
        { say: 'A relation can be shown as a set of ordered pairs, a table, an arrow diagram, a graph, or a rule.' },
        { say: 'A function is a relation in which every input is paired with exactly one output. Knowing the input is enough to know the output for certain.', show: 'def' },
      ],
    },
    {
      chapter: 'Testing a relation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\{(1, 4),\\ (2, 7),\\ (3, 7),\\ (1, 9)\\}', '1 \\rightarrow 4 \\quad \\text{and} \\quad 1 \\rightarrow 9'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Thinking outputs cannot repeat', md: 'Two inputs may share an output: $2 \\rightarrow 7$ and $3 \\rightarrow 7$ is fine. Only an input with two different outputs breaks the rule.' },
      ],
      lines: [
        { say: 'Is this set of ordered pairs a function? Look for an input that appears more than once.', show: 'm.0', focus: 'm.0' },
        { say: 'The input one appears twice. It is paired with four, and it is also paired with nine. One input has two different outputs, so this relation is not a function.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that the inputs two and three both give seven. That is allowed. Outputs can repeat. Only an input with two different outputs breaks the rule.', show: 'oops' },
      ],
    },
    {
      chapter: 'The vertical line test',
      layout: 'split',
      leftWidth: 700,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          height: 440,
          points: { X0: [-1, 0], X1: [6, 0], Y0: [0, -1], Y1: [0, 6], P1: [1, 2], P2: [3, 1], P3: [3, 4], P4: [5, 2], V0: [3, -0.8], V1: [3, 5.8] },
          items: [
            { kind: 'line', id: 'xa', from: 'X0', to: 'X1', tone: 'muted', arrow: true },
            { kind: 'line', id: 'ya', from: 'Y0', to: 'Y1', tone: 'muted', arrow: true },
            { kind: 'label', id: 'p1', at: 'P1', tex: '(1, 2)', place: 'above', dot: true },
            { kind: 'label', id: 'p2', at: 'P2', tex: '(3, 1)', place: 'left', dot: true },
            { kind: 'label', id: 'p3', at: 'P3', tex: '(3, 4)', place: 'right', dot: true },
            { kind: 'label', id: 'p4', at: 'P4', tex: '(5, 2)', place: 'above', dot: true },
            { kind: 'line', id: 'v', from: 'V0', to: 'V1', tone: 'bad', dashed: true },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The vertical line test', md: 'If a vertical line ever passes through more than one point of a graph, the relation is **not** a function.' },
      ],
      lines: [
        { say: 'On a graph, the input is the x-coordinate and the output is the y-coordinate. Here is the graph of a relation with four points.', show: ['d.xa', 'd.ya', 'd.p1', 'd.p2', 'd.p3', 'd.p4'] },
        { say: 'Imagine sliding a vertical line across the graph. If it ever passes through more than one point, one input has more than one output.', show: 'tip' },
        { say: 'This vertical line passes through two points. The input three has the outputs one and four, so this relation is not a function.', show: 'd.v', focus: ['d.p2', 'd.p3'] },
      ],
    },
    {
      chapter: 'Inputs and outputs',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', md: 'Rule: multiply the input by $4$, then subtract $3$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5:\\quad 4 \\times 5 - 3 = 17', '25:\\quad 25 + 3 = 28,\\quad 28 \\div 4 = 7'] },
      ],
      lines: [
        { say: 'A function can be given by a rule. This one says: multiply the input by four, then subtract three.', show: 't' },
        { say: 'For an input of five, four times five is twenty, and twenty minus three is seventeen. The output is seventeen.', show: 'm.0', focus: 'm.0' },
        { say: 'To go from an output back to the input, undo the steps in reverse order. For an output of twenty-five, add three to get twenty-eight, then divide by four. The input is seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which relation is **not** a function?',
          choices: ['$\\{(1, 2),\\ (2, 2),\\ (3, 2)\\}$', '$\\{(0, 5),\\ (1, 6),\\ (2, 7)\\}$', '$\\{(4, 1),\\ (5, 3),\\ (4, 6)\\}$', '$\\{(-1, 1),\\ (1, 1),\\ (2, 4)\\}$'],
          answer: 2,
          working: 'In C, the input $4$ has two outputs, $1$ and $6$. In the others, every input has one output.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these relations is not a function? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The input four is paired with one, and also with six. In choice A, every output is two, but each input still has only one output, so it is a function.', show: 'q.answer' },
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
          items: ['A relation pairs inputs with outputs.', 'A function gives each input exactly one output.', 'Outputs may repeat. An input with two outputs is not allowed.', 'Vertical line test: more than one point on a vertical line means not a function.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A relation pairs inputs with outputs.', show: 'sum.0' },
        { say: 'A function is a relation in which each input has exactly one output.', show: 'sum.1' },
        { say: 'Outputs may repeat, but an input with two different outputs means the relation is not a function.', show: 'sum.2' },
        { say: 'On a graph, use the vertical line test. In the next lesson, we find the domain and the range of a function. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
