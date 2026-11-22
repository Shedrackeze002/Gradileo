import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 5.2 (relations and their representations): a mapping from a
// woman's weight to her Body Mass Index, turned into ordered pairs, a domain and a range. The
// question is an exercise from OpenStax Intermediate Algebra 2e, word for word (section 3.5,
// Relations and Functions, CC BY-NC-SA 4.0), with the section's instruction in front and the
// mapping described in brackets. The answer key gives the seven pairs, the domain
// {100, 110, ..., 160} and the range {17.2, 18.9, ..., 27.5}. In the book's mapping the BMI column
// is not in order, so the arrows cross.

const WEIGHTS = ['100', '110', '120', '130', '140', '150', '160'];
/** The BMI column as the book prints it, top to bottom. */
const BMIS = ['18.9', '22.3', '17.2', '24.0', '25.7', '20.6', '27.5'];
/** Where each weight's arrow goes, as a row of the BMI column. */
const TO = [2, 0, 5, 1, 3, 4, 6];

const y = (row: number) => 12 - 2 * row;

/** The mapping: weights on the left, BMIs on the right, an arrow from each weight. */
const mapping = (height = 400): DiagramEl => {
  const points: Record<string, [number, number]> = { HL: [0, 14.2], HR: [20, 14.2] };
  const items: DiagramItem[] = [
    { kind: 'label', id: 'hl', at: 'HL', tex: '\\textbf{Weight (lbs)}', place: 'center', group: 'cols' },
    { kind: 'label', id: 'hr', at: 'HR', tex: '\\textbf{BMI}', place: 'center', group: 'cols' },
  ];
  WEIGHTS.forEach((w, i) => {
    points[`L${i}`] = [0, y(i)];
    points[`a${i}`] = [2.6, y(i)];
    items.push({ kind: 'label', id: `w${i}`, at: `L${i}`, tex: w, place: 'center', group: 'cols' });
  });
  BMIS.forEach((b, j) => {
    points[`R${j}`] = [20, y(j)];
    points[`b${j}`] = [17.2, y(j)];
    items.push({ kind: 'label', id: `m${j}`, at: `R${j}`, tex: b, place: 'center', group: 'cols' });
  });
  TO.forEach((j, i) => {
    items.push({ kind: 'line', id: `arr${i}`, from: `a${i}`, to: `b${j}`, tone: i % 2 ? 'opp' : 'adj', arrow: true, group: 'arrows' });
  });
  return { kind: 'diagram', id: 'map', height, points, items };
};
const MAP = ['map', 'map.cols', 'map.arrows'];

const QUESTION =
  'Use the mapping of the relation to (a) list the ordered pairs of the relation, (b) find the domain of the relation, and (c) find the range of the relation. For a woman of height 5′4″ the mapping below shows the corresponding Body Mass Index (BMI). The body mass index is a measurement of body fat based on height and weight. A BMI of 18.5–24.9 is considered healthy. [The mapping has a column of weights in pounds and a column of BMIs, with an arrow from each weight: 100 → 17.2, 110 → 18.9, 120 → 20.6, 130 → 22.3, 140 → 24.0, 150 → 25.7, 160 → 27.5.]';

const video: Explainer = {
  id: 'xq-m10c-5-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-5-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 3.5, Relations and Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/3-5-relations-and-functions',
    question: QUESTION,
  },
  title: 'Exam Question: From a Mapping to Ordered Pairs, Domain and Range',
  thumbnailTitle: 'Read a Mapping',
  thumbnail: 'map',
  summary:
    'A real test question, solved one small step at a time: a mapping matches seven weights with a Body Mass Index. We follow each arrow to write the relation as ordered pairs, then collect the first elements for the domain and the second elements for the range. Then we check the count and look at the traps, including the crossing arrows.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Read a Mapping', subtitle: 'Relations, domain and range, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a relation shown as a mapping. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use the mapping of the relation to (a) list the ordered pairs of the relation, (b) find the domain of the relation, and (c) find the range of the relation. For a woman of height 5′4″ the mapping below shows the corresponding Body Mass Index (BMI). The body mass index is a measurement of body fat based on height and weight. A BMI of $18.5$–$24.9$ is considered healthy.',
          answer: 'Pairs $(100, 17.2), (110, 18.9), \\ldots, (160, 27.5)$; domain $\\{100, 110, \\ldots, 160\\}$; range $\\{17.2, 18.9, \\ldots, 27.5\\}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed, with the instruction for this set of exercises in front.', show: 'q' },
        { say: 'Use the mapping of the relation to, a, list the ordered pairs of the relation, b, find the domain of the relation, and c, find the range of the relation.' },
        { say: 'For a woman of height 5 foot 4 the mapping below shows the corresponding Body Mass Index, or B M I. The body mass index is a measurement of body fat based on height and weight. A B M I of 18.5 to 24.9 is considered healthy.' },
        { say: 'If you would like to try it first, pause the video now. You will see the mapping in a moment.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [mapping()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A **mapping** is one way to show a **relation**: an arrow joins each weight to its BMI.' }],
      lines: [
        { say: 'Here is the mapping. The left column lists seven weights in pounds, and the right column lists seven B M I values.', show: ['map', 'map.cols'] },
        { say: 'An arrow joins each weight to its B M I. Look closely: the right column is not in order, so the arrows cross. The question asks us to write the same relation in other ways.', show: ['map.arrows', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ordered pairs, domain and range', md: 'Each arrow gives an **ordered pair** (start, end). The **domain** is the set of all first elements. The **range** is the set of all second elements.' },
        { kind: 'math', id: 'ex', size: 'md', lines: ['\\{(1, 5), (2, 5), (3, 7)\\}: \\ \\text{domain } \\{1, 2, 3\\}, \\ \\text{range } \\{5, 7\\}'] },
      ],
      lines: [
        { say: 'Here is what we need. Each arrow gives an ordered pair: where it starts, then where it ends.', show: 'def' },
        { say: 'The domain is the set of all the first elements, and the range is the set of all the second elements. For example, the pairs 1 5, 2 5, and 3 7 have domain 1, 2, 3, and range 5 and 7. In a set, we list each value only once.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Follow each **arrow** to write a pair', 'Collect the **first** elements: the domain', 'Collect the **second** elements: the range'] }],
      lines: [
        { say: 'Here is the plan. First, follow each arrow to write an ordered pair.', show: 'plan.0' },
        { say: 'Second, collect the first elements for the domain.', show: 'plan.1' },
        { say: 'Third, collect the second elements for the range.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Follow the arrows',
      layout: 'split',
      left: [mapping()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(100, 17.2)', '(110, 18.9)', '(120, 20.6)', '(130, 22.3)', '(140, 24.0)', '(150, 25.7)', '(160, 27.5)'] }],
      lines: [
        { say: 'Step one. Follow each arrow from its weight to its B M I. 100 goes to 17.2, so the first pair is 100, 17.2.', show: [...MAP, 'm.0'], focus: 'map.arr0' },
        { say: '110 goes to 18.9.', show: 'm.1', focus: 'map.arr1' },
        { say: '120 goes to 20.6.', show: 'm.2', focus: 'map.arr2' },
        { say: '130 goes to 22.3.', show: 'm.3', focus: 'map.arr3' },
        { say: '140 goes to 24.0, 150 goes to 25.7, and 160 goes to 27.5. That is part a: seven ordered pairs.', show: ['m.4', 'm.5', 'm.6'] },
      ],
    },
    {
      chapter: 'Step 2: The domain and the range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Domain} = \\good{\\{100, 110, 120, 130, 140, 150, 160\\}}', '\\text{Range} = \\good{\\{17.2, 18.9, 20.6, 22.3, 24.0, 25.7, 27.5\\}}'] }],
      lines: [
        { say: 'Step two. The domain is every first element, the weights: 100, 110, 120, 130, 140, 150 and 160. That is part b.', show: 'm.0', focus: 'm.0' },
        { say: 'The range is every second element, the B M I values: 17.2, 18.9, 20.6, 22.3, 24.0, 25.7 and 27.5. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['7 \\text{ arrows} \\Rightarrow 7 \\text{ ordered pairs} \\ \\checkmark', '\\text{heavier} \\Rightarrow \\text{higher BMI, in every pair} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. There are seven arrows, and we wrote seven ordered pairs, so none is missing.', show: 'm.0' },
        { say: 'And the pairs make sense: for a woman of the same height, a higher weight should give a higher B M I, and it does in every pair. The crossing arrows did not trick us.', show: 'm.1' },
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
            ['Reading straight across: $(100, 18.9)$', 'the BMIs are **not in order**: follow the arrow'],
            ['Swapping the domain and the range', 'domain $=$ **first** elements, the weights'],
            ['$(17.2, 100)$', 'an ordered pair keeps its **order**: (weight, BMI)'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Reading straight across the columns pairs 100 with 18.9, which is wrong. The B M I column is not in order, so always follow the arrow.' },
        { say: 'The domain is the first elements, the weights, and the range is the second elements. Do not swap them.' },
        { say: 'And an ordered pair keeps its order: the weight first, then the B M I.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the range of the relation $\\{(1, 7), (5, 3), (7, 9), (-2, -3), (-2, 8)\\}$.',
          choices: ['$\\{1, 5, 7, -2\\}$', '$\\{1, 5, 7, -2, -2\\}$', '$\\{7, 3, 9, -3\\}$', '$\\{7, 3, 9, -3, 8\\}$'],
          answer: 3,
          working: 'The range is every second element: $7, 3, 9, -3$ and $8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the range of the relation 1 7, 5 3, 7 9, minus 2 minus 3, and minus 2 8. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The range is every second element: 7, 3, 9, minus 3, and 8, choice D. A is the domain, B lists minus 2 twice, and C forgets the 8.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each **arrow** is an ordered pair', '**Domain**: the first elements', '**Range**: the second elements', 'List each value **once**, and follow the arrows'] }],
      lines: [
        { say: 'Here is what to remember. In a mapping, each arrow is an ordered pair.', show: 'sum.0' },
        { say: 'The domain is the set of first elements.', show: 'sum.1' },
        { say: 'The range is the set of second elements.', show: 'sum.2' },
        { say: 'List each value once, and always follow the arrows. For more on relations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
