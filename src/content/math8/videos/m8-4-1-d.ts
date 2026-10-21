import type { Explainer } from '@/video/script.ts';

// A crossed-out number with what it becomes written above it (a numerator) or below it (a denominator).
const up = (from: string, to: string, tone: string) => `\\overset{\\${tone}{${to}}}{\\cancel{${from}}}`;
const down = (from: string, to: string, tone: string) => `\\underset{\\${tone}{${to}}}{\\cancel{${from}}}`;

const video: Explainer = {
  id: 'm8-4-1-d',
  lessonId: 'm8-4-1',
  title: 'Multiplying Fractions, Part 4: Simplifying First',
  thumbnailTitle: 'Simplifying First',
  thumbnail: false,
  summary:
    'When you multiply fractions, all the numerators are multiplied together and all the denominators are multiplied together, so you can divide any numerator and any denominator by a common factor before you multiply. For 4/9 × 3/8, divide 4 and 8 by 4 and divide 3 and 9 by 3: 1/3 × 1/2 = 1/6. Multiplying first gives 12/72, which is also 1/6, but with bigger numbers. Always pair a numerator with a denominator, never two numerators.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 4', title: 'Simplifying First', subtitle: 'Keep the numbers small' }],
      lines: [
        { say: 'Find four ninths times three eighths. Multiplying straight across gives twelve over seventy-two, and then you have to simplify big numbers. There is a way to keep the numbers small.', show: 'title' },
        { say: 'In this part, you will simplify before you multiply.' },
      ],
    },
    {
      chapter: 'Why you can simplify first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{4 \\times 3}{9 \\times 8}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Simplify first', md: 'Before you multiply, you can divide **any numerator** and **any denominator** by a common factor.' },
      ],
      lines: [
        { say: 'When you multiply fractions, all the numerators are multiplied together on top, and all the denominators are multiplied together on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'So it does not matter which fraction a number started in. A number on top can be simplified with any number on the bottom.' },
        { say: 'That means that before you multiply, you can divide any numerator and any denominator by a common factor. The numbers stay small.', show: 'key' },
      ],
    },
    {
      chapter: 'Four ninths times three eighths',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{4}{9} \\times \\dfrac{3}{8}$. Write the answer in lowest terms.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            `\\dfrac{${up('4', '1', 'opp')}}{9} \\times \\dfrac{3}{${down('8', '2', 'opp')}}`,
            `\\dfrac{${up('4', '1', 'opp')}}{${down('9', '3', 'adj')}} \\times \\dfrac{${up('3', '1', 'adj')}}{${down('8', '2', 'opp')}}`,
            '\\dfrac{1 \\times 1}{3 \\times 2} = \\dfrac{1}{6}',
          ],
        },
      ],
      lines: [
        { say: 'Find four ninths times three eighths, and write the answer in lowest terms.', show: 'q' },
        { say: 'Look for a numerator and a denominator that share a factor. Four and eight share the factor four. Four divided by four is one, and eight divided by four is two.', show: 'm.0', focus: 'm.0' },
        { say: 'Three and nine share the factor three. Three divided by three is one, and nine divided by three is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply what is left. One times one is one, and three times two is six. So four ninths times three eighths is one sixth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check without simplifying first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4 \\times 3}{9 \\times 8} = \\dfrac{12}{72}', '\\dfrac{12}{72} = \\dfrac{12 \\div 12}{72 \\div 12} = \\dfrac{1}{6}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same answer, bigger numbers', md: 'Multiplying first works too, but you must simplify larger numbers at the end.' },
      ],
      lines: [
        { say: 'Let’s check by multiplying first. Four times three is twelve, and nine times eight is seventy-two. That is twelve over seventy-two.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve divides both twelve and seventy-two. Twelve divided by twelve is one, and seventy-two divided by twelve is six. So the answer is one sixth again.', show: 'm.1', focus: 'm.1' },
        { say: 'It is the same answer, but with bigger numbers, and you had to spot that twelve divides seventy-two. Simplifying first is usually easier.', show: 'tip' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{5}{6} \\times \\dfrac{9}{10}$. Write the answer in lowest terms.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [`\\dfrac{${up('5', '1', 'opp')}}{${down('6', '2', 'adj')}} \\times \\dfrac{${up('9', '3', 'adj')}}{${down('10', '2', 'opp')}} = \\dfrac{1 \\times 3}{2 \\times 2} = \\dfrac{3}{4}`],
        },
      ],
      lines: [
        { say: 'Let’s try another. Find five sixths times nine tenths.', show: 'q' },
        { say: 'Five and ten share the factor five. Five divided by five is one, and ten divided by five is two.', show: 'm.0' },
        { say: 'Nine and six share the factor three. Nine divided by three is three, and six divided by three is two.', focus: 'm.0' },
        { say: 'Multiply what is left. One times three is three, and two times two is four. The answer is three quarters, already in lowest terms.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two numerators', md: 'Pair a numerator with a **denominator**. In $\\dfrac{2}{5} \\times \\dfrac{4}{7}$, the $2$ and the $4$ are both numerators, so you cannot divide them by $2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{5} \\times \\dfrac{4}{7} = \\dfrac{2 \\times 4}{5 \\times 7} = \\dfrac{8}{35}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Find two fifths times four sevenths. Two and four share the factor two, but they are both numerators.', show: 'oops' },
        { say: 'Dividing both of them by two would make the top smaller, with nothing on the bottom to balance it. That changes the answer.' },
        { say: 'Here, no numerator shares a factor with a denominator, so just multiply. Two times four is eight, and five times seven is thirty-five. The answer is eight thirty-fifths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{3}{10} \\times \\dfrac{5}{6}$. Write the answer in lowest terms.',
          choices: ['$\\dfrac{15}{60}$', '$\\dfrac{8}{16}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$'],
          answer: 2,
          working: 'Divide $3$ and $6$ by $3$, and $5$ and $10$ by $5$: $\\tfrac{1}{2} \\times \\tfrac{1}{2} = \\tfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find three tenths times five sixths, and write the answer in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one quarter. Three and six share the factor three, and five and ten share the factor five. That leaves one half times one half, which is one quarter. Choice A, fifteen sixtieths, is equal to one quarter, but it is not in lowest terms.', show: 'q.answer' },
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
            'Before you multiply, divide **any numerator** and **any denominator** by a common factor.',
            '$\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$',
            'Multiplying first gives the same answer with bigger numbers: $\\dfrac{12}{72} = \\dfrac{1}{6}$.',
            'Always pair a numerator with a denominator.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Before you multiply, you can divide any numerator and any denominator by a common factor.', show: 'sum.0' },
        { say: 'So four ninths times three eighths becomes one third times one half, which is one sixth.', show: 'sum.1' },
        { say: 'Multiplying first gives the same answer, with bigger numbers.', show: 'sum.2' },
        { say: 'And always pair a numerator with a denominator. In the next part, you will multiply mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
