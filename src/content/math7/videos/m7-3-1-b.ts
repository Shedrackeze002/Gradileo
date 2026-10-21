import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// Six eighths and three quarters cover the same length of strip.
const same = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'e', parts: 8, shaded: 6, tone: 'adj', at: [0, 2.2], width: 10, label: '\\dfrac68' }),
      bar({ name: 'q', parts: 4, shaded: 3, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac34' }),
    ],
    250,
  );

// Seven tenths, take away three tenths (red): four tenths are left (green), the same as two fifths.
const tenths = (id: string) =>
  figure(
    id,
    [
      bar({ name: 't', parts: 10, shaded: 7, tones: [...repeat('good', 4), ...repeat('bad', 3)], at: [0, 2.2], width: 10, label: '\\dfrac{4}{10}' }),
      bar({ name: 'f', parts: 5, shaded: 2, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac25' }),
    ],
    250,
  );

// 5/6 + 4/6 = 9/6: one whole strip of sixths and three sixths more.
const overOne = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 6, shaded: 6, tones: [...repeat('adj', 5), 'opp'], at: [0, 2.2], width: 9, label: '1' }),
      bar({ name: 'b', parts: 6, shaded: 3, tone: 'opp', at: [0, 0], width: 9, label: '\\dfrac36' }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm7-3-1-b',
  lessonId: 'm7-3-1',
  title: 'Adding and Subtracting Fractions, Part 2: Lowest Terms',
  thumbnailTitle: 'Lowest Terms',
  thumbnail: 'sm',
  summary:
    'Six eighths and three quarters cover the same amount of a strip, so they are equivalent fractions. A fraction is in lowest terms when its numerator and denominator have no common factor except 1; to get there, divide both by their greatest common factor: 6/8 = 3/4 and 8/12 = 2/3. So 7/10 − 3/10 = 4/10 = 2/5, and a sum can be more than 1: 5/6 + 4/6 = 9/6 = 3/2 = 1 1/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 2', title: 'Lowest Terms', subtitle: 'The simplest way to write a fraction' }],
      lines: [
        { say: 'Six eighths and three quarters look different, but they are the same amount. So which one should you write as your answer?', show: 'title' },
        { say: 'In this part, you will learn to write fractions in lowest terms, and use it to finish your answers when you add and subtract.' },
      ],
    },
    {
      chapter: 'The same amount',
      layout: 'center',
      main: [
        same('sm'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivalent fractions', md: 'Fractions that show the **same amount** are **equivalent**: $\\dfrac{6}{8} = \\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Here is a strip cut into eight equal parts. Six of them are shaded, so it shows six eighths.', show: ['sm.e-frame', 'sm.e-shade', 'sm.e-label'] },
        { say: 'Here is a strip of the same length, cut into four equal parts. Three are shaded, so it shows three quarters.', show: ['sm.q-frame', 'sm.q-shade', 'sm.q-label'] },
        { say: 'Look at the shaded parts. They are exactly the same length! Each quarter is the same as two eighths.', focus: ['sm.e-shade', 'sm.q-shade'] },
        { say: 'Fractions that show the same amount are called equivalent fractions. Six eighths and three quarters are equivalent.', show: 'def' },
      ],
    },
    {
      chapter: 'Lowest terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lowest terms', md: 'A fraction is in **lowest terms** when the numerator and the denominator have **no common factor** except $1$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{3}{4}\\colon\\ \\text{factors of } 3\\colon 1, 3 \\quad \\text{factors of } 4\\colon 1, 2, 4 \\;\\to\\; \\good{\\text{lowest terms}}', '\\dfrac{6}{8}\\colon\\ 2 \\text{ divides both } 6 \\text{ and } 8 \\;\\to\\; \\bad{\\text{not in lowest terms}}'],
        },
      ],
      lines: [
        { say: 'Three quarters uses smaller numbers, so it is the simpler way to write this amount. We say that three quarters is in lowest terms.', show: 'def' },
        { say: 'A factor of a number divides into it evenly. A common factor divides into both numbers. A fraction is in lowest terms when the numerator and the denominator have no common factor except one.' },
        { say: 'Check three quarters. The factors of three are one and three. The factors of four are one, two and four. The only common factor is one, so three quarters is in lowest terms.', show: 'm.0', focus: 'm.0' },
        { say: 'Now check six eighths. Two divides into six, and two divides into eight as well. So six eighths is not in lowest terms.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Writing a fraction in lowest terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Lowest terms', md: 'Divide the numerator and the denominator by their **greatest common factor**, the biggest number that divides both.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{8} = \\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}', '\\dfrac{8}{12} = \\dfrac{8 \\div 4}{12 \\div 4} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'To write a fraction in lowest terms, divide the numerator and the denominator by their greatest common factor. That is the biggest number that divides into both of them.', show: 'key' },
        { say: 'For six eighths, the greatest common factor of six and eight is two. Six divided by two is three, and eight divided by two is four. So six eighths is three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Try eight twelfths. The greatest common factor of eight and twelve is four. Eight divided by four is two, and twelve divided by four is three. So eight twelfths is two thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'If you divide by a smaller common factor, such as two, you get four sixths. That is correct, but not finished: two still divides both numbers. Keep going until the only common factor is one.' },
      ],
    },
    {
      chapter: 'Subtracting tenths',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\dfrac{7}{10} - \\dfrac{3}{10}$. Write the answer in lowest terms.' },
        tenths('tn'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{7}{10} - \\dfrac{3}{10} = \\dfrac{4}{10}', '\\dfrac{4}{10} = \\dfrac{4 \\div 2}{10 \\div 2} = \\dfrac{2}{5}'] },
      ],
      lines: [
        { say: 'Now use this to finish an answer. Find seven tenths minus three tenths, and write the answer in lowest terms.', show: 'q' },
        { say: 'Start with seven tenths. Take away three tenths, the red parts. Four tenths are left, in green.', show: ['tn.t-frame', 'tn.t-shade'], focus: ['tn.t-p4', 'tn.t-p5', 'tn.t-p6'] },
        { say: 'The denominators are the same, so subtract the numerators. Seven minus three is four. The difference is four tenths.', show: ['tn.t-label', 'm.0'], focus: 'm.0' },
        { say: 'But two divides both four and ten. Four divided by two is two, and ten divided by two is five. So the answer in lowest terms is two fifths. The strip of fifths shows the same amount.', show: ['m.1', 'tn.f-frame', 'tn.f-shade', 'tn.f-label'], focus: ['m.1', 'tn.f-shade'] },
      ],
    },
    {
      chapter: 'Answers bigger than 1',
      layout: 'center',
      main: [
        overOne('ov'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{5}{6} + \\dfrac{4}{6} = \\dfrac{9}{6} = \\dfrac{9 \\div 3}{6 \\div 3} = \\dfrac{3}{2}', '\\dfrac{3}{2} = 1\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'A sum can be more than one whole. Find five sixths plus four sixths. Five sixths and four more sixths make nine sixths.', show: ['ov.a-frame', 'ov.a-shade', 'ov.b-frame', 'ov.b-shade'] },
        { say: 'Six of the sixths fill one whole strip, and three sixths are left over.', show: ['ov.a-label', 'ov.b-label'], focus: ['ov.a-shade', 'ov.b-shade'] },
        { say: 'Three divides both nine and six, so nine sixths in lowest terms is three halves.', show: 'm.0', focus: 'm.0' },
        { say: 'You can leave the answer as three halves, or write it as a mixed number: a whole number and a fraction together. Three halves is one and one half. Look: one whole strip, and three sixths, which is one half.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{5}{12} + \\dfrac{3}{12}$. Write the answer in lowest terms.',
          choices: ['$\\dfrac{2}{3}$', '$\\dfrac{8}{12}$', '$\\dfrac{8}{24}$', '$\\dfrac{4}{6}$'],
          answer: 0,
          working: '$\\tfrac{5}{12} + \\tfrac{3}{12} = \\tfrac{8}{12}$. Divide $8$ and $12$ by $4$, their greatest common factor: $\\tfrac{8}{12} = \\tfrac{2}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five twelfths plus three twelfths, and write the answer in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, two thirds. Five twelfths plus three twelfths is eight twelfths. Divide eight and twelve by four, their greatest common factor, to get two thirds. Choice D is four sixths. It is equal, but two still divides four and six, so it is not in lowest terms.', show: 'q.answer' },
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
            'Equivalent fractions show the same amount: $\\dfrac{6}{8} = \\dfrac{3}{4}$.',
            'A fraction is in **lowest terms** when the numerator and the denominator have no common factor except $1$.',
            'Divide both by their greatest common factor: $\\dfrac{4}{10} = \\dfrac{2}{5}$.',
            'A sum can be more than $1$: $\\dfrac{9}{6} = \\dfrac{3}{2} = 1\\dfrac{1}{2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Equivalent fractions show the same amount, like six eighths and three quarters.', show: 'sum.0' },
        { say: 'A fraction is in lowest terms when the numerator and the denominator have no common factor except one.', show: 'sum.1' },
        { say: 'To write a fraction in lowest terms, divide both numbers by their greatest common factor.', show: 'sum.2' },
        { say: 'And a sum can be more than one. In the next part, you will add fractions with different denominators. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
