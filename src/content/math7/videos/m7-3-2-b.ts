import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine } from '@/content/math5/videos/lib/m5-5-figures.ts';

// 2 3/12 + 1 8/12 on a line cut into twelfths: one whole, then eight twelfths, to 3 11/12.
const flour = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 0,
        max: 4,
        den: 12,
        length: 13,
        hops: [
          { id: 'one', from: 27, to: 39, tone: 'adj', label: '+1' },
          { id: 'frac', from: 39, to: 47, tone: 'opp', label: '+\\tfrac{8}{12}' },
        ],
        points: [
          { id: 'start', at: 27, tex: '2\\tfrac{3}{12}', tone: 'theta', below: true },
          { id: 'end', at: 47, tex: '3\\tfrac{11}{12}', tone: 'good', below: true },
        ],
      }),
    ],
    250,
  );

// The fraction parts: 3/4 + 2/4 = 5/4, one whole strip and one quarter more.
const carry = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 4, shaded: 4, tones: ['adj', 'adj', 'adj', 'opp'], at: [0, 0], width: 4, label: '1', labelPlace: 'below' }),
      bar({ name: 'b', parts: 4, shaded: 1, tone: 'opp', at: [5, 0], width: 4, label: '\\dfrac14', labelPlace: 'below' }),
    ],
    240,
  );

// 3 3/4 + 2 2/4 on a line from 3 to 7 cut into quarters: two wholes, then two quarters past 6.
const check = (id: string) =>
  figure(
    id,
    [
      fractionLine({
        min: 3,
        max: 7,
        den: 4,
        length: 13,
        hops: [
          { id: 'two', from: 3, to: 11, tone: 'adj', label: '+2' },
          { id: 'frac', from: 11, to: 13, tone: 'opp', label: '+\\tfrac24' },
        ],
        points: [
          { id: 'start', at: 3, tex: '3\\tfrac34', tone: 'theta', below: true },
          { id: 'end', at: 13, tex: '6\\tfrac14', tone: 'good', below: true },
        ],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm7-3-2-b',
  lessonId: 'm7-3-2',
  title: 'Adding and Subtracting Mixed Numbers, Part 2: Adding Mixed Numbers',
  thumbnailTitle: 'Adding Mixed Numbers',
  thumbnail: 'ch',
  summary:
    'To add mixed numbers, add the whole numbers and add the fractions, using a common denominator: 2 1/4 + 1 2/3 = 2 3/12 + 1 8/12 = 3 11/12 cups of flour. If the fractions add to 1 or more, carry 1 whole: 3 3/4 + 2 1/2 = 5 + 5/4 = 5 + 1 1/4 = 6 1/4. An answer like 5 5/4 is not finished, because the fraction part of a mixed number must be less than 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 2', title: 'Adding Mixed Numbers', subtitle: 'Wholes with wholes, parts with parts' }],
      lines: [
        { say: 'A bread recipe uses two and one quarter cups of white flour, and one and two thirds cups of whole wheat flour. How much flour is that altogether?', show: 'title' },
        { say: 'In this part, you will add mixed numbers, and learn what to do when the fractions add up to more than one whole.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Adding mixed numbers', md: 'A mixed number is a whole number plus a fraction. Add the **whole numbers**, and add the **fractions**.' },
        { kind: 'bullets', id: 'b', items: ['Rewrite the fractions with a **common denominator**.', 'Add the **whole numbers**. Add the **fractions**.', 'If the fractions make $1$ or more, **carry** $1$ whole.'] },
      ],
      lines: [
        { say: 'Here is the plan. A mixed number is a whole number plus a fraction. So add the whole numbers, and add the fractions.', show: 'key' },
        { say: 'Before you add the fractions, rewrite them with a common denominator, so the parts are the same size.', show: 'b.0' },
        { say: 'Then add the whole numbers, and add the fractions.', show: 'b.1' },
        { say: 'And if the fractions add up to one whole or more, carry that whole over to the whole numbers. Let’s see how it works.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Flour for bread',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $2\\dfrac{1}{4} + 1\\dfrac{2}{3}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\dfrac{1}{4} = 2\\dfrac{3}{12} \\qquad 1\\dfrac{2}{3} = 1\\dfrac{8}{12}', '\\text{Wholes: } 2 + 1 = 3 \\qquad \\text{Fractions: } \\dfrac{3}{12} + \\dfrac{8}{12} = \\dfrac{11}{12}', '2\\dfrac{1}{4} + 1\\dfrac{2}{3} = 3\\dfrac{11}{12}'] },
      ],
      lines: [
        { say: 'Find two and one quarter plus one and two thirds.', show: 'q' },
        { say: 'Quarters and thirds are different sizes. List multiples: four, eight, twelve, and three, six, nine, twelve. The common denominator is twelve.' },
        { say: 'One quarter is three twelfths, so the first amount is two and three twelfths. Two thirds is eight twelfths, so the second amount is one and eight twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the whole numbers: two plus one is three. Add the fractions: three twelfths plus eight twelfths is eleven twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'So the recipe uses three and eleven twelfths cups of flour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [flour('fl'), { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{3}{12} + 1 + \\dfrac{8}{12} = 3\\dfrac{11}{12}'] }],
      lines: [
        { say: 'Here is the same sum on a number line from zero to four. Each whole is cut into twelfths. Start at two and three twelfths.', show: ['fl.axis', 'fl.start'], focus: 'fl.start' },
        { say: 'Add the whole number first. One whole takes you to three and three twelfths.', show: 'fl.one', focus: 'fl.one' },
        { say: 'Then add the fraction: eight more twelfths. You land on three and eleven twelfths, just one twelfth short of four.', show: ['fl.frac', 'fl.end', 'm'], focus: ['fl.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Carrying a whole',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $3\\dfrac{3}{4} + 2\\dfrac{1}{2}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\dfrac{1}{2} = 2\\dfrac{2}{4}', '\\text{Wholes: } 3 + 2 = 5 \\qquad \\text{Fractions: } \\dfrac{3}{4} + \\dfrac{2}{4} = \\dfrac{5}{4}'] },
      ],
      lines: [
        { say: 'Now find three and three quarters plus two and one half.', show: 'q' },
        { say: 'Four is a multiple of two, so use quarters. One half is two quarters, so the second amount is two and two quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the whole numbers: three plus two is five. Add the fractions: three quarters plus two quarters is five quarters.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Five quarters',
      layout: 'center',
      main: [carry('ch'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{4} = \\dfrac{4}{4} + \\dfrac{1}{4} = 1\\dfrac{1}{4}', '5 + 1\\dfrac{1}{4} = 6\\dfrac{1}{4}'] }],
      lines: [
        { say: 'Five quarters is more than one whole. Look at the strips. Three quarters, in blue, and two more quarters, in orange.', show: ['ch.a-frame', 'ch.a-shade', 'ch.b-frame', 'ch.b-shade'] },
        { say: 'Four of the quarters fill one whole strip, and one quarter is left over. So five quarters is one and one quarter.', show: ['ch.a-label', 'ch.b-label', 'm.0'], focus: ['ch.a-shade', 'ch.b-shade', 'm.0'] },
        { say: 'Carry the one whole over to the five wholes. Five plus one and one quarter is six and one quarter.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check on a number line',
      layout: 'center',
      main: [check('nl'), { kind: 'math', id: 'm', size: 'lg', lines: ['3\\dfrac{3}{4} + 2\\dfrac{1}{2} = 6\\dfrac{1}{4}'] }],
      lines: [
        { say: 'Let’s check on a number line from three to seven, cut into quarters. Start at three and three quarters.', show: ['nl.axis', 'nl.start'] },
        { say: 'Add the two wholes. That takes you to five and three quarters.', show: 'nl.two', focus: 'nl.two' },
        { say: 'Then add two quarters. The first quarter takes you to six, and the second takes you past it, to six and one quarter. The answer checks out.', show: ['nl.frac', 'nl.end', 'm'], focus: ['nl.end', 'm.0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at five and five quarters', md: '$5\\dfrac{5}{4}$ is **not finished**. In a mixed number, the fraction part must be **less than** $1$. Carry the extra whole: $5\\dfrac{5}{4} = 6\\dfrac{1}{4}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5\\dfrac{5}{4} = 5 + \\dfrac{4}{4} + \\dfrac{1}{4} = 5 + 1 + \\dfrac{1}{4} = 6\\dfrac{1}{4}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. After adding, some people write five and five quarters, and stop.', show: 'oops' },
        { say: 'Five and five quarters is not finished. In a mixed number, the fraction part must be less than one. Five quarters hides a whole: four quarters make one.', show: 'm.0', focus: 'm.0' },
        { say: 'So carry that whole to the five. The answer is six and one quarter.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $1\\dfrac{2}{3} + 2\\dfrac{2}{3}$.',
          choices: ['$4\\dfrac{1}{3}$', '$3\\dfrac{4}{3}$', '$3\\dfrac{1}{3}$', '$3\\dfrac{4}{6}$'],
          answer: 0,
          working: 'Wholes: $1 + 2 = 3$. Fractions: $\\dfrac{2}{3} + \\dfrac{2}{3} = \\dfrac{4}{3} = 1\\dfrac{1}{3}$. Carry: $3 + 1\\dfrac{1}{3} = 4\\dfrac{1}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one and two thirds plus two and two thirds. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four and one third. The wholes make three. The fractions make four thirds, which is one and one third. Carry the whole to get four and one third. Choice B has the right value, but it is not finished: four thirds is more than one.', show: 'q.answer' },
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
            'Rewrite the fractions with a common denominator.',
            'Add the whole numbers, and add the fractions.',
            'If the fractions make $1$ or more, carry $1$ whole: $5\\dfrac{5}{4} = 6\\dfrac{1}{4}$.',
            'The fraction part of the answer must be less than $1$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add mixed numbers, first rewrite the fractions with a common denominator.', show: 'sum.0' },
        { say: 'Then add the whole numbers, and add the fractions.', show: 'sum.1' },
        { say: 'If the fractions make one whole or more, carry the whole over to the whole numbers.', show: 'sum.2' },
        { say: 'The fraction part of your answer must be less than one. In the next part, you will subtract mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
