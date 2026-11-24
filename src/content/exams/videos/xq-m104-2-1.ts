import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 2.1 (understanding fractions). The question is a Writing
// Exercise from OpenStax Prealgebra 2e, word for word (section 4.2, Multiply and Divide Fractions,
// CC BY-NC-SA 4.0). 3/6 and 4/8 are equivalent fractions: both are 1/2 of the pizza, so Rafael
// gets the same amount of pizza either way. The slices are bigger when the pizza is cut into 6.

type P = [number, number];

/** A pizza cut into `n` equal slices with `k` of them shaded, centred at x = `cx`. */
function pizza(name: string, cx: number, n: number, k: number, tone: 'adj' | 'opp'): { points: Record<string, P>; items: DiagramItem[] } {
  const points: Record<string, P> = { [`${name}c`]: [cx, 0] };
  const at = (a: number): P => [cx + Math.cos(a), Math.sin(a)];
  const rim: string[] = [];
  const steps = 48;
  for (let i = 0; i < steps; i++) {
    points[`${name}r${i}`] = at(Math.PI / 2 - (2 * Math.PI * i) / steps);
    rim.push(`${name}r${i}`);
  }
  const items: DiagramItem[] = [];
  // Shade the first k slices, going clockwise from the top.
  const per = steps / n;
  for (let s = 0; s < k; s++) {
    const pts = [`${name}c`];
    for (let i = s * per; i <= (s + 1) * per; i++) pts.push(`${name}r${i % steps}`);
    items.push({ kind: 'region', id: `${name}s${s}`, points: pts, tone, shade: 0.55, group: `${name}-half` });
  }
  items.push({ kind: 'curve', id: `${name}rim`, points: rim, closed: true, tone: 'ink', weight: 3, group: name });
  for (let s = 0; s < n; s++) items.push({ kind: 'line', id: `${name}cut${s}`, from: `${name}c`, to: `${name}r${(s * per) % steps}`, tone: 'muted', group: name });
  points[`${name}lab`] = [cx, -1.25];
  return { points, items };
}

const six = pizza('a', 0, 6, 3, 'adj');
const eight = pizza('b', 2.8, 8, 4, 'opp');

const pizzas = (height = 380): DiagramEl => ({
  kind: 'diagram',
  id: 'pz',
  height,
  points: { ...six.points, ...eight.points },
  items: [
    ...six.items,
    ...eight.items,
    { kind: 'label', id: 'la', at: 'alab', tex: '3 \\text{ of } 6 = \\tfrac{3}{6}', place: 'below', group: 'a-half' },
    { kind: 'label', id: 'lb', at: 'blab', tex: '4 \\text{ of } 8 = \\tfrac{4}{8}', place: 'below', group: 'b-half' },
  ],
});

const QUESTION =
  'Rafael wanted to order half a medium pizza at a restaurant. The waiter told him that a medium pizza could be cut into 6 or 8 slices. Would he prefer 3 out of 6 slices or 4 out of 8 slices? Rafael replied that since he wasn’t very hungry, he would prefer 3 out of 6 slices. Explain what is wrong with Rafael’s reasoning.';

const video: Explainer = {
  id: 'xq-m104-2-1',
  lessonId: '',
  exam: {
    lesson: 'm104-2-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 4.2, Multiply and Divide Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/4-2-multiply-and-divide-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: 3 Slices of 6 or 4 Slices of 8? (Understanding Fractions)',
  thumbnailTitle: '3 of 6 or 4 of 8?',
  thumbnail: 'pz',
  summary:
    'A real test question, solved one small step at a time: Rafael wants half a medium pizza, which can be cut into 6 or 8 slices. He says he would rather have 3 of 6 slices than 4 of 8, because he is not very hungry. What is wrong with his reasoning? We draw both pizzas, simplify 3/6 and 4/8, and see that both are 1/2: the same amount of pizza, just cut into different sized slices. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '3 of 6 or 4 of 8?', subtitle: 'Understanding fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about what a fraction means. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: '$\\tfrac{3}{6} = \\tfrac{4}{8} = \\tfrac{1}{2}$: the **same** amount of pizza',
          working: 'With $6$ slices each slice is **bigger**, so $3$ of them is still half.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Rafael wanted to order half a medium pizza at a restaurant. The waiter told him that a medium pizza could be cut into 6 or 8 slices. Would he prefer 3 out of 6 slices or 4 out of 8 slices?' },
        { say: 'Rafael replied that since he wasn\'t very hungry, he would prefer 3 out of 6 slices. Explain what is wrong with Rafael\'s reasoning. If you would like to think about it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pizzas(), { kind: 'text', id: 't', size: 'md', md: 'Rafael thinks **fewer slices** means **less pizza**. Is that true?' }],
      lines: [
        { say: 'Here are two medium pizzas, the same size. The first is cut into 6 equal slices, and the second into 8.', show: ['pz.a', 'pz.b'] },
        { say: 'Rafael could have 3 of the 6 slices,', show: 'pz.a-half' },
        { say: 'or 4 of the 8 slices.', show: 'pz.b-half' },
        { say: 'He thinks fewer slices means less pizza. The question asks what is wrong with that.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{\\text{parts you have}}{\\text{equal parts in the whole}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Equivalent fractions', md: 'Divide the top and the bottom by the **same number**, and the fraction keeps the same value: $\\tfrac{6}{8} = \\tfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Here is what we need. A fraction is the number of parts you have, over the number of equal parts in the whole.', show: 'f' },
        { say: 'If you divide the top and the bottom by the same number, you get an equivalent fraction. It looks different, but it is the same amount.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each choice as a **fraction**', '**Simplify** both fractions', '**Compare**, and explain'] }],
      lines: [
        { say: 'Here is the plan. Write each choice as a fraction of the pizza.', show: 'plan.0' },
        { say: 'Simplify both fractions.', show: 'plan.1' },
        { say: 'Then compare them, and explain what Rafael got wrong.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Write the fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\text{ of } 6 \\text{ slices} = \\dfrac{3}{6}, \\qquad 4 \\text{ of } 8 \\text{ slices} = \\dfrac{4}{8}'] }],
      lines: [
        { say: 'Step one. 3 slices out of 6 is three sixths of the pizza. 4 slices out of 8 is four eighths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{6} = \\dfrac{3 \\div 3}{6 \\div 3} = \\dfrac{1}{2}', '\\dfrac{4}{8} = \\dfrac{4 \\div 4}{8 \\div 4} = \\dfrac{1}{2}'] }],
      lines: [
        { say: 'Step two. Divide the top and bottom of three sixths by 3. That gives one half.', show: 'm.0' },
        { say: 'Divide the top and bottom of four eighths by 4. That is one half too.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Explain',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{6} = \\dfrac{4}{8} = \\good{\\dfrac{1}{2}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Both choices are **half** the pizza. With $6$ slices, each slice is **bigger**, so Rafael gets the **same amount** either way.' },
      ],
      lines: [
        { say: 'Step three. Both choices are exactly one half of the pizza.', show: 'm.0', focus: 'm.0' },
        { say: 'So Rafael is wrong. When the pizza is cut into 6, each slice is bigger. Fewer, bigger slices give the same amount as more, smaller slices. He gets half the pizza either way.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [pizzas(400), { kind: 'text', id: 't', size: 'md', md: 'Both shaded parts cover **half** the pizza $\\checkmark$' }],
      lines: [
        { say: 'Let us check with the pictures. In both pizzas, the shaded part covers exactly half of the pizza, from the top to the bottom.', show: ['pz.a', 'pz.b', 'pz.a-half', 'pz.b-half'] },
        { say: 'The amounts are the same. It checks out.', show: 't' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$3$ slices is less than $4$', 'the slices are **not the same size**'],
            ['$\\tfrac{4}{8}$ is bigger: $8 > 6$', 'a bigger bottom means **smaller** pieces'],
            ['comparing only the tops', 'compare the **whole fraction**: simplify first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Counting slices only works when the slices are the same size. Here they are not.' },
        { say: 'A bigger number on the bottom means the whole is cut into more pieces, so each piece is smaller.' },
        { say: 'So do not compare only the tops. Simplify the whole fractions, then compare.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Maya eats $2$ of the $3$ equal pieces of a sandwich. Leo eats $4$ of the $6$ equal pieces of a sandwich of the same size. Who eats more?',
          choices: ['Maya', 'Leo', 'You cannot tell', 'They eat the same amount'],
          answer: 3,
          working: '$\\tfrac{4}{6} = \\tfrac{4 \\div 2}{6 \\div 2} = \\tfrac{2}{3}$, so they eat the same amount.',
        },
      ],
      lines: [
        { say: 'Your turn. Maya eats 2 of the 3 equal pieces of a sandwich. Leo eats 4 of the 6 equal pieces of a sandwich of the same size. Who eats more? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide the top and bottom of four sixths by 2. That gives two thirds, the same as Maya. They eat the same amount. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A fraction: parts you have over **equal** parts in the whole', 'More pieces in the whole means **smaller** pieces', 'Divide top and bottom by the same number: an **equivalent** fraction', 'Simplify **before** you compare'] }],
      lines: [
        { say: 'Here is what to remember. A fraction is the parts you have over the equal parts in the whole.', show: 'sum.0' },
        { say: 'More pieces in the whole means smaller pieces.', show: 'sum.1' },
        { say: 'Dividing the top and bottom by the same number gives an equivalent fraction, with the same value.', show: 'sum.2' },
        { say: 'So simplify before you compare. For more on understanding fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
