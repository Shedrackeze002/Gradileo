import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine, unitHops } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Wholes cut into quarters, side by side: `full` whole strips and then `last` quarters of one more.
const quarters = (id: string, full: number, last: number, lastLabel: string) =>
  figure(
    id,
    [
      ...Array.from({ length: full }, (_, k) => bar({ name: `w${k}`, parts: 4, shaded: 4, tone: 'adj', at: [k * 3.6, 0], width: 3, label: '1', labelPlace: 'below' })),
      bar({ name: 'f', parts: 4, shaded: last, tone: 'opp', at: [full * 3.6, 0], width: 3, label: lastLabel, labelPlace: 'below' }),
    ],
    220,
  );

// 2 1/4 on a number line cut into quarters: nine hops of a quarter from 0.
const line = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 0,
        max: 3,
        den: 4,
        length: 13,
        hops: [...unitHops(0, 8, 'ha'), ...unitHops(8, 9, 'hb', 'good')],
        points: [
          { id: 'p', at: 9, tex: '\\dfrac94', tone: 'good' },
          { id: 'q', at: 9, tex: '2\\dfrac14', tone: 'good', below: true },
        ],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm7-3-2',
  lessonId: 'm7-3-2',
  title: 'Adding and Subtracting Mixed Numbers, Part 1: Mixed Numbers and Improper Fractions',
  thumbnailTitle: 'Mixed Numbers and Improper Fractions',
  thumbnail: 'tw',
  summary:
    'A mixed number has a whole number part and a fraction part: 2 1/4 means 2 + 1/4. An improper fraction has a numerator greater than or equal to its denominator, like 9/4, and is worth 1 or more. Each whole is 4/4, so 2 1/4 = 8/4 + 1/4 = 9/4, nine quarters from 0 on a number line. Going back, 11 ÷ 4 = 2 remainder 3, so 11/4 = 2 3/4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 1', title: 'Mixed Numbers and Improper Fractions', subtitle: 'Two ways to write the same amount' }],
      lines: [
        { say: 'A bread recipe uses two and one quarter cups of flour. A hiking trail is six and one half kilometres long. Amounts like these are bigger than one whole.', show: 'title' },
        { say: 'In this part, you will meet two ways to write them, mixed numbers and improper fractions, and learn to change from one to the other.' },
      ],
    },
    {
      chapter: 'Mixed numbers',
      layout: 'center',
      main: [
        quarters('tw', 2, 1, '\\dfrac14'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed number', md: 'A **mixed number** has a whole number part and a fraction part, like $2\\dfrac{1}{4}$. It means $2 + \\dfrac{1}{4}$.' },
      ],
      lines: [
        { say: 'Here are two whole strips, and one quarter of another strip. Together they show two and one quarter.', show: ['tw.w0-frame', 'tw.w0-shade', 'tw.w0-label', 'tw.w1-frame', 'tw.w1-shade', 'tw.w1-label', 'tw.f-frame', 'tw.f-shade', 'tw.f-label'] },
        { say: 'Two and one quarter is a mixed number. A mixed number has a whole number part and a fraction part.', show: 'def' },
        { say: 'Here the whole number part is two, and the fraction part is one quarter. So two and one quarter means two plus one quarter.', focus: ['tw.f-shade'] },
      ],
    },
    {
      chapter: 'Improper fractions',
      layout: 'center',
      main: [
        quarters('tw', 2, 1, '\\dfrac14'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Improper fraction', md: 'An **improper fraction** has a numerator that is greater than or equal to its denominator, like $\\dfrac{9}{4}$. It is worth $1$ or more.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 + 4 + 1 = 9 \\text{ quarters} \\quad\\to\\quad 2\\dfrac{1}{4} = \\dfrac{9}{4}'] },
      ],
      lines: [
        { say: 'Each whole strip is cut into four quarters. So we can count the same amount in quarters.', show: ['tw.w0-frame', 'tw.w0-shade', 'tw.w1-frame', 'tw.w1-shade', 'tw.f-frame', 'tw.f-shade'] },
        { say: 'The first strip has four quarters. The second strip has four more, which makes eight. And one more quarter makes nine quarters.', focus: ['tw.w0-shade', 'tw.w1-shade', 'tw.f-shade'] },
        { say: 'So two and one quarter is nine quarters. Nine quarters is an improper fraction. Its numerator is greater than or equal to its denominator, so it is worth one or more.', show: ['m.0', 'def'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [
        line('nl'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same point', md: 'The mixed number and the improper fraction are at the **same point**: $2\\dfrac{1}{4} = \\dfrac{9}{4}$.' },
      ],
      lines: [
        { say: 'Here is a number line from zero to three. Each whole is cut into quarters, so each small space is one quarter.', show: 'nl.axis' },
        { say: 'Start at zero and count quarters. Four quarters reach one. Eight quarters reach two.', show: 'nl.ha' },
        { say: 'One more quarter makes nine quarters. The point is nine quarters from zero, and it is also two and one quarter.', show: ['nl.hb', 'nl.p', 'nl.q'], focus: ['nl.p', 'nl.q'] },
        { say: 'So the mixed number and the improper fraction name the same point. They are two ways to write the same amount.', show: 'key' },
      ],
    },
    {
      chapter: 'Mixed number to improper fraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $2\\dfrac{1}{4}$ as an improper fraction.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1 = \\dfrac{4}{4}, \\quad \\text{so } 2 = \\dfrac{8}{4}', '\\dfrac{8}{4} + \\dfrac{1}{4} = \\dfrac{9}{4}', '\\text{Shortcut: } 2 \\times 4 + 1 = 9 \\;\\to\\; \\dfrac{9}{4}'] },
      ],
      lines: [
        { say: 'Here is how to do it without a picture. Write two and one quarter as an improper fraction.', show: 'q' },
        { say: 'Each whole is four quarters. So two wholes are eight quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the one quarter. Eight quarters plus one quarter is nine quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is a shortcut. Multiply the whole number by the denominator, and add the numerator. Two times four is eight, plus one is nine. Keep the denominator: nine quarters.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Improper fraction to mixed number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $\\dfrac{11}{4}$ as a mixed number.' },
        quarters('el', 2, 3, '\\dfrac34'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['11 \\div 4 = 2 \\text{ remainder } 3', '\\dfrac{11}{4} = 2\\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'Now go the other way. Write eleven quarters as a mixed number.', show: 'q' },
        { say: 'Every four quarters make one whole. How many wholes are in eleven quarters? Divide: eleven divided by four is two, remainder three.', show: 'm.0', focus: 'm.0' },
        { say: 'So eleven quarters fill two whole strips, with three quarters left over.', show: ['el.w0-frame', 'el.w0-shade', 'el.w0-label', 'el.w1-frame', 'el.w1-shade', 'el.w1-label', 'el.f-frame', 'el.f-shade', 'el.f-label'] },
        { say: 'The quotient, two, is the whole number. The remainder, three, is the number of quarters left. Eleven quarters equals two and three quarters.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $3\\dfrac{2}{5}$ as an improper fraction.',
          choices: ['$\\dfrac{6}{5}$', '$\\dfrac{32}{5}$', '$\\dfrac{15}{5}$', '$\\dfrac{17}{5}$'],
          answer: 3,
          working: 'Each whole is $\\dfrac{5}{5}$, so $3$ wholes are $\\dfrac{15}{5}$. Then $\\dfrac{15}{5} + \\dfrac{2}{5} = \\dfrac{17}{5}$. Shortcut: $3 \\times 5 + 2 = 17$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write three and two fifths as an improper fraction. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, seventeen fifths. Three wholes are fifteen fifths, and two more fifths make seventeen fifths. Choice C counts the three wholes, but it forgets the two fifths.', show: 'q.answer' },
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
            'A **mixed number** has a whole number part and a fraction part: $2\\dfrac{1}{4} = 2 + \\dfrac{1}{4}$.',
            'An **improper fraction** is worth $1$ or more: its numerator is at least its denominator.',
            'Mixed to improper: $2 \\times 4 + 1 = 9$, so $2\\dfrac{1}{4} = \\dfrac{9}{4}$.',
            'Improper to mixed: $11 \\div 4 = 2$ R $3$, so $\\dfrac{11}{4} = 2\\dfrac{3}{4}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A mixed number has a whole number part and a fraction part.', show: 'sum.0' },
        { say: 'An improper fraction has a numerator greater than or equal to its denominator, so it is worth one or more.', show: 'sum.1' },
        { say: 'To change a mixed number into an improper fraction, multiply the whole number by the denominator, and add the numerator.', show: 'sum.2' },
        { say: 'To go back, divide. The quotient is the whole number, and the remainder is the numerator. In the next part, you will add mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
