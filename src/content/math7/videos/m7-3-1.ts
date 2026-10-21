import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// One whole cut into eighths, with three eighths shaded.
const eighth = (id: string) => figure(id, [bar({ name: 'b', parts: 8, shaded: 3, tone: 'adj', width: 10, label: '\\dfrac38' })], 170);

// Jordan's fence: 3/8 on Saturday, 2/8 on Sunday, and both together on one strip, 5/8.
const fence = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'sat', parts: 8, shaded: 3, tone: 'adj', at: [0, 4.4], width: 8, label: '\\dfrac38' }),
      bar({ name: 'sun', parts: 8, shaded: 2, tone: 'opp', at: [0, 2.2], width: 8, label: '\\dfrac28' }),
      bar({ name: 'sum', parts: 8, shaded: 5, tones: [...repeat('adj', 3), ...repeat('opp', 2)], at: [0, 0], width: 8, label: '\\dfrac58' }),
    ],
    400,
  );

// Six sevenths, take away four sevenths (red): two sevenths are left (green).
const sevenths = (id: string) => figure(id, [bar({ name: 's', parts: 7, shaded: 6, tones: [...repeat('good', 2), ...repeat('bad', 4)], width: 10 })], 160);

// The mistake: 5/16 is less than 3/8 on its own, so it cannot be 3/8 + 2/8.
const mistake = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 8, shaded: 3, tone: 'adj', at: [0, 4.4], width: 10, label: '\\dfrac38' }),
      bar({ name: 'w', parts: 16, shaded: 5, tone: 'bad', at: [0, 2.2], width: 10, label: '\\dfrac{5}{16}' }),
      bar({ name: 'r', parts: 8, shaded: 5, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac58' }),
    ],
    370,
  );

const video: Explainer = {
  id: 'm7-3-1',
  lessonId: 'm7-3-1',
  title: 'Adding and Subtracting Fractions, Part 1: The Same Denominator',
  thumbnailTitle: 'The Same Denominator',
  thumbnail: 'fn',
  summary:
    'The denominator tells how many equal parts make one whole, and the numerator tells how many of those parts you have. When two fractions have the same denominator, the parts are the same size, so add or subtract the numerators and keep the denominator: 3/8 + 2/8 = 5/8 and 6/7 − 4/7 = 2/7. Never add the denominators: 3/8 + 2/8 is not 5/16.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 1', title: 'The Same Denominator', subtitle: 'Parts of the same size' }],
      lines: [
        { say: 'Jordan paints part of a fence on Saturday, and some more of it on Sunday. How much of the fence is painted? To answer questions like this, you add fractions.', show: 'title' },
        { say: 'In this part, you will add and subtract fractions that have the same denominator. Let’s start with what the numbers in a fraction mean.' },
      ],
    },
    {
      chapter: 'Numerator and denominator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{\\opp{3}}{\\adj{8}}'] },
        eighth('ei'),
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Numerator and denominator',
          md: 'The [[adj:denominator]] is the bottom number. It tells how many equal parts make one whole. The [[opp:numerator]] is the top number. It tells how many of those parts you have.',
        },
      ],
      lines: [
        { say: 'Here is the fraction three eighths. It has a top number and a bottom number, and each one has a name.', show: 'm' },
        { say: 'The bottom number, eight, is the denominator. It tells how many equal parts make one whole.', show: ['def', 'ei.b-frame'] },
        { say: 'This strip is one whole, cut into eight equal parts. So each part is one eighth.', focus: 'ei.b-frame' },
        { say: 'The top number, three, is the numerator. It tells how many of those parts you have. Three parts are shaded, so the strip shows three eighths.', show: ['ei.b-shade', 'ei.b-label'], focus: 'ei.b-shade' },
      ],
    },
    {
      chapter: 'Adding eighths',
      layout: 'split',
      leftWidth: 560,
      left: [fence('fn')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Jordan paints $\\dfrac{3}{8}$ of a fence on Saturday and $\\dfrac{2}{8}$ of it on Sunday. How much of the fence is painted?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 2 = 5', '\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}'] },
      ],
      lines: [
        { say: 'Jordan paints three eighths of a fence on Saturday, and two eighths of it on Sunday. How much of the fence is painted?', show: 'q' },
        { say: 'Here is three eighths: three of the eight equal parts, in blue.', show: ['fn.sat-frame', 'fn.sat-shade', 'fn.sat-label'] },
        { say: 'And here is two eighths: two more parts, in orange. They are eighths as well, so they are the same size as the blue parts.', show: ['fn.sun-frame', 'fn.sun-shade', 'fn.sun-label'] },
        { say: 'Now put them together on one strip. Three parts and two more parts make five parts. The parts are still eighths, so together they make five eighths.', show: ['fn.sum-frame', 'fn.sum-shade', 'fn.sum-label'], focus: 'fn.sum-shade' },
        { say: 'In numbers, the denominators are the same, so add the numerators. Three plus two is five.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep the denominator, eight. Three eighths plus two eighths equals five eighths. So Jordan has painted five eighths of the fence.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Subtracting works the same way',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same denominator', md: 'The parts are the same size. **Add or subtract the numerators**, and **keep the denominator**.' },
        sevenths('sv'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{7} - \\dfrac{4}{7} = \\dfrac{6 - 4}{7} = \\dfrac{2}{7}'] },
      ],
      lines: [
        { say: 'Here is the rule. When two fractions have the same denominator, the parts are the same size. Add or subtract the numerators, and keep the denominator.', show: 'key' },
        { say: 'Subtracting works the same way. Find six sevenths minus four sevenths. This strip is cut into seven equal parts, and six of them are shaded.', show: ['sv.s-frame', 'sv.s-shade'] },
        { say: 'Take away four sevenths, the four red parts. Two parts are left, in green.', focus: ['sv.s-p2', 'sv.s-p3', 'sv.s-p4', 'sv.s-p5'] },
        { say: 'In numbers, six minus four is two, and the parts are still sevenths. So six sevenths minus four sevenths is two sevenths.', show: 'm.0', focus: ['m.0', 'sv.s-p0', 'sv.s-p1'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the denominators', md: '$\\dfrac{3}{8} + \\dfrac{2}{8}$ is **not** $\\dfrac{5}{16}$. The parts are still eighths. Only the numerators are added.' },
        mistake('mk'),
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people add the tops and the bottoms, and write that three eighths plus two eighths is five sixteenths.', show: 'oops' },
        { say: 'Let’s see why that cannot be right. Here is three eighths.', show: ['mk.a-frame', 'mk.a-shade', 'mk.a-label'] },
        { say: 'And here is five sixteenths. Sixteenths are smaller parts, and five of them cover less of the strip than three eighths does!', show: ['mk.w-frame', 'mk.w-shade', 'mk.w-label'], focus: 'mk.w-shade' },
        { say: 'Adding two eighths should give more than three eighths, not less. The correct answer is five eighths. The denominator names the size of the parts, and adding more parts does not change their size.', show: ['mk.r-frame', 'mk.r-shade', 'mk.r-label'], focus: 'mk.r-shade' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{4}{9} + \\dfrac{3}{9}$.',
          choices: ['$\\dfrac{7}{18}$', '$\\dfrac{1}{9}$', '$\\dfrac{7}{9}$', '$\\dfrac{12}{9}$'],
          answer: 2,
          working: 'The denominators are the same, so add the numerators and keep the ninths: $4 + 3 = 7$, so the sum is $\\dfrac{7}{9}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four ninths plus three ninths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven ninths. The denominators are the same, so add the numerators: four plus three is seven. Keep the denominator, nine. Choice A adds the denominators, but the parts are still ninths.', show: 'q.answer' },
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
            'The **denominator** tells how many equal parts make one whole. The **numerator** tells how many parts you have.',
            'Same denominator: add or subtract the numerators and keep the denominator.',
            '$\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$ and $\\dfrac{6}{7} - \\dfrac{4}{7} = \\dfrac{2}{7}$',
            'Never add the denominators.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The denominator tells how many equal parts make one whole, and the numerator tells how many of those parts you have.', show: 'sum.0' },
        { say: 'When the denominators are the same, the parts are the same size. Add or subtract the numerators, and keep the denominator.', show: 'sum.1' },
        { say: 'So three eighths plus two eighths is five eighths, and six sevenths minus four sevenths is two sevenths.', show: 'sum.2' },
        { say: 'And never add the denominators. In the next part, you will write answers in lowest terms. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
