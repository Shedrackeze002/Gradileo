import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// 1/4 + 1/2: a quarter, a half, and the half cut into quarters, 1/4 + 2/4 = 3/4.
const strips = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'q', parts: 4, shaded: 1, tone: 'opp', at: [0, 4.4], width: 8, label: '\\dfrac{1}{4}' }),
      bar({ name: 'h', parts: 2, shaded: 1, tone: 'adj', at: [0, 2.2], width: 8, label: '\\dfrac{1}{2}' }),
      bar({ name: 's', parts: 4, shaded: 3, tones: ['opp', 'adj', 'adj'], at: [0, 0], width: 8, label: '\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{4}' }),
    ],
    380,
  );

// −2/3 + 3/4 in twelfths: from −8/12, right 9/12, to 1/12.
const line = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1,
        max: 1,
        step: 1 / 12,
        moves: [{ id: 'm', from: -8 / 12, to: 1 / 12, tone: 'adj', label: '+\\tfrac{9}{12}' }],
        points: [
          { id: 'start', value: -8 / 12, tex: '-\\tfrac{8}{12}', tone: 'opp', below: true },
          { id: 'end', value: 1 / 12, tex: '\\tfrac{1}{12}', tone: 'good', below: true },
        ],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'm9-3-2-c',
  lessonId: 'm9-3-2',
  title: 'Adding and Subtracting Rational Numbers, Part 3: Adding and Subtracting Fractions',
  thumbnailTitle: 'Adding and Subtracting Fractions',
  thumbnail: 'st',
  summary:
    'Fractions need a common denominator before you add or subtract them, because the denominator tells the size of the pieces: 1/4 + 1/2 = 1/4 + 2/4 = 3/4, not 2/6. Then use the sign rules on the numerators: −2/3 + 3/4 = −8/12 + 9/12 = 1/12. To subtract a negative fraction, add the opposite: −1/2 − (−5/6) = −3/6 + 5/6 = 2/6 = 1/3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 3', title: 'Adding and Subtracting Fractions', subtitle: 'A common denominator first' }],
      lines: [
        { say: 'Fractions can be positive or negative, just like decimals. Adding and subtracting them uses the same sign rules, with one extra step first.', show: 'title' },
        { say: 'In this part, you will add and subtract positive and negative fractions, using a common denominator.' },
      ],
    },
    {
      chapter: 'Pieces of the same size',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Numerator and denominator', md: 'The **denominator** (bottom) tells the size of the pieces. The **numerator** (top) counts the pieces.' },
        strips('st'),
      ],
      lines: [
        { say: 'First, why you need a common denominator. The denominator, the bottom number, tells you the size of the pieces. The numerator, the top number, counts the pieces.', show: 'def' },
        { say: 'Find one quarter plus one half. Quarters and halves are pieces of different sizes, so you cannot simply count them together.', show: ['st.q-frame', 'st.q-shade', 'st.q-label', 'st.h-frame', 'st.h-shade', 'st.h-label'] },
        { say: 'So cut the half into quarters. One half is two quarters. Now all the pieces are the same size.', show: ['st.s-frame', 'st.s-p1', 'st.s-p2'], focus: ['st.s-p1', 'st.s-p2'] },
        { say: 'One quarter plus two quarters is three quarters.', show: ['st.s-p0', 'st.s-label'], focus: 'st.s-label' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not add the denominators', md: '$\\dfrac{1}{4} + \\dfrac{1}{2}$ is **not** $\\dfrac{2}{6}$. The denominator tells the size of the pieces, and it stays the same once the pieces match.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{1}{4} + \\dfrac{1}{2} \\ne \\dfrac{1 + 1}{4 + 2} = \\dfrac{2}{6}}', '\\good{\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{4}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake: adding the tops and adding the bottoms. One plus one is two, and four plus two is six, which gives two sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'But two sixths is only one third, and that is less than the one half you started with! Adding more cannot give you less.' },
        { say: 'The denominator tells the size of the pieces. Once the pieces match, the denominator stays the same, and you add only the numerators.', show: ['oops', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Negative plus positive',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-\\dfrac{2}{3} + \\dfrac{3}{4}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= -\\dfrac{8}{12} + \\dfrac{9}{12} = \\dfrac{-8 + 9}{12} = \\dfrac{1}{12}'] },
        line('nl'),
      ],
      lines: [
        { say: 'Find negative two thirds plus three quarters. Twelve is a multiple of both three and four, so use twelve as the common denominator.', show: 'q' },
        { say: 'Two thirds is eight twelfths, so negative two thirds is negative eight twelfths. Three quarters is nine twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Now use the sign rules on the numerators: negative eight plus nine. The signs are different, so subtract the sizes: nine minus eight is one. Nine has the greater size, so the answer is positive: one twelfth.' },
        { say: 'On the number line, start at negative eight twelfths and move nine twelfths to the right. You land just past zero, on one twelfth.', show: ['nl.axis', 'nl.start', 'nl.m', 'nl.end'], focus: ['nl.m', 'nl.end'] },
      ],
    },
    {
      chapter: 'Subtracting a negative fraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-\\dfrac{1}{2} - \\left(-\\dfrac{5}{6}\\right)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= -\\dfrac{1}{2} + \\dfrac{5}{6}', '= -\\dfrac{3}{6} + \\dfrac{5}{6} = \\dfrac{-3 + 5}{6}', '= \\dfrac{2}{6} = \\dfrac{1}{3}'] },
      ],
      lines: [
        { say: 'Now find negative one half minus negative five sixths.', show: 'q' },
        { say: 'To subtract, add the opposite. The opposite of negative five sixths is five sixths, so this is negative one half plus five sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'The common denominator is six. One half is three sixths, so negative one half is negative three sixths. Then negative three plus five is two.', show: 'm.1', focus: 'm.1' },
        { say: 'The answer is two sixths. Divide the top and the bottom by two to simplify it: two sixths is one third.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{1}{3} - \\dfrac{5}{6}$.',
          choices: ['$\\dfrac{1}{2}$', '$-\\dfrac{4}{9}$', '$\\dfrac{7}{6}$', '$-\\dfrac{1}{2}$'],
          answer: 3,
          working: '$\\dfrac{1}{3} = \\dfrac{2}{6}$, so $\\dfrac{2}{6} - \\dfrac{5}{6} = \\dfrac{2 - 5}{6} = -\\dfrac{3}{6} = -\\dfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one third minus five sixths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative one half. One third is two sixths, and two sixths minus five sixths is negative three sixths, which is negative one half. Choice B subtracts the tops and adds the bottoms, but the denominator stays the same once the pieces match.', show: 'q.answer' },
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
            'Find a common denominator first, so all the pieces are the same size.',
            'Then use the sign rules on the numerators: $-\\dfrac{8}{12} + \\dfrac{9}{12} = \\dfrac{1}{12}$.',
            'Never add the denominators: $\\dfrac{1}{4} + \\dfrac{1}{2} = \\dfrac{3}{4}$, not $\\dfrac{2}{6}$.',
            'To subtract, add the opposite, then simplify.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add or subtract fractions, find a common denominator first, so all the pieces are the same size.', show: 'sum.0' },
        { say: 'Then use the sign rules on the numerators.', show: 'sum.1' },
        { say: 'Never add the denominators. Once the pieces match, the denominator stays the same.', show: 'sum.2' },
        { say: 'And to subtract, add the opposite, then simplify your answer. In the next part, you will add mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
