import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from './lib/m5-5-figures.ts';

const video: Explainer = {
  id: 'm5-5-2',
  lessonId: 'm5-5-2',
  title: 'Adding and Subtracting Fractions, Part 1: Unit Fractions',
  thumbnailTitle: 'Unit Fractions',
  thumbnail: 'split',
  summary: 'Unit fractions (one equal piece, like 1/8), building 5/8 from five eighths, splitting 5/8 into 2/8 + 3/8, and finding a missing numerator: 7/10 = 4/10 + 3/10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 1', title: 'Unit Fractions', subtitle: 'Every fraction is made of equal pieces' }],
      lines: [
        { say: 'Kateri ate two eighths of a pizza. Her brother ate three eighths of the same pizza. How much did they eat together?', show: 'title' },
        { say: 'When the pieces are the same size, adding and subtracting fractions is just counting pieces. In this video, you will see how every fraction is built from equal pieces called unit fractions.' },
      ],
    },
    {
      chapter: 'Unit fractions',
      layout: 'center',
      main: [
        figure('u', [bar({ parts: 8, shaded: 1, width: 12, height: 1.4, label: '\\dfrac18' })], 220),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit fraction', md: 'A **unit fraction** has $1$ as its numerator, such as $\\dfrac{1}{8}$. It is one equal piece of a whole.' },
      ],
      lines: [
        { say: 'This bar is one whole, cut into eight equal pieces. Each piece is one eighth.', show: 'u.frame' },
        { say: 'One piece on its own is one eighth. A fraction like this, with one as its numerator, is called a unit fraction.', show: ['u.shade', 'u.label', 'def'] },
        { say: 'A unit fraction is one equal piece of a whole. One half, one third and one tenth are unit fractions as well.' },
      ],
    },
    {
      chapter: 'Five eighths',
      layout: 'center',
      main: [
        figure('f', [bar({ parts: 8, shaded: 5, width: 12, height: 1.4, pieces: '\\dfrac18' })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac58 = \\dfrac18 + \\dfrac18 + \\dfrac18 + \\dfrac18 + \\dfrac18'] },
      ],
      lines: [
        { say: 'Every fraction is made of unit fractions. Let’s build five eighths, one piece at a time.', show: 'f.frame' },
        { say: 'One eighth.', show: ['f.p0', 'f.u0'] },
        { say: 'Two eighths.', show: ['f.p1', 'f.u1'] },
        { say: 'Three eighths.', show: ['f.p2', 'f.u2'] },
        { say: 'Four eighths.', show: ['f.p3', 'f.u3'] },
        { say: 'Five eighths.', show: ['f.p4', 'f.u4'] },
        { say: 'So five eighths is five pieces of size one eighth. It is one eighth, plus one eighth, plus one eighth, plus one eighth, plus one eighth.', show: 'm.0', focus: 'm.0' },
        { say: 'The numerator, five, counts the pieces. The denominator, eight, tells the size of each piece.' },
      ],
    },
    {
      chapter: 'Splitting a fraction',
      layout: 'center',
      main: [
        figure('split', [bar({ parts: 8, shaded: 5, width: 12, height: 1.4, tones: ['brand', 'brand', 'opp', 'opp', 'opp'] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac58 = \\brand{\\dfrac28} + \\opp{\\dfrac38}', '\\dfrac58 = \\dfrac18 + \\dfrac48'] },
      ],
      lines: [
        { say: 'You can also split five eighths into two parts. Here, two of the pieces are purple, and three are orange.', show: ['split.frame', 'split.shade'] },
        { say: 'Two eighths plus three eighths make five eighths. That is how much pizza Kateri and her brother ate together!', show: 'm.0', focus: 'm.0' },
        { say: 'There are other ways to split it as well. One eighth plus four eighths also makes five eighths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A missing numerator',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find the missing numerator: $\\dfrac{7}{10} = \\dfrac{4}{10} + \\dfrac{?}{10}$' },
        figure('mn', [bar({ parts: 10, shaded: 7, width: 12, height: 1.3, tones: ['brand', 'brand', 'brand', 'brand', 'opp', 'opp', 'opp'] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['7 - 4 = 3', '\\dfrac{7}{10} = \\brand{\\dfrac{4}{10}} + \\opp{\\dfrac{3}{10}}'] },
      ],
      lines: [
        { say: 'Here is a puzzle. Seven tenths equals four tenths plus how many tenths?', show: ['t', 'mn.frame'] },
        { say: 'Seven tenths is seven pieces, each one tenth.', show: ['mn.p0', 'mn.p1', 'mn.p2', 'mn.p3', 'mn.p4', 'mn.p5', 'mn.p6'] },
        { say: 'Four tenths is four of them. That leaves the rest.', focus: ['mn.p0', 'mn.p1', 'mn.p2', 'mn.p3'] },
        { say: 'Seven minus four is three, so three tenths are left.', show: 'm.0', focus: ['m.0', 'mn.p4', 'mn.p5', 'mn.p6'] },
        { say: 'So seven tenths equals four tenths plus three tenths. The missing numerator is three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the missing numerator: $\\dfrac{5}{6} = \\dfrac{2}{6} + \\dfrac{?}{6}$',
          choices: ['$7$', '$3$', '$4$', '$2$'],
          answer: 1,
          working: '$\\tfrac{5}{6}$ is $5$ sixths and $\\tfrac{2}{6}$ is $2$ of them. $5 - 2 = 3$, so $\\tfrac{5}{6} = \\tfrac{2}{6} + \\tfrac{3}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five sixths equals two sixths plus how many sixths? Find the missing numerator. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three. Five sixths is five pieces, and two sixths is two of them. Five minus two is three, so three sixths are left. Choice A adds five and two, instead of taking two away.', show: 'q.answer' },
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
          items: ['A **unit fraction** has numerator $1$: one equal piece of a whole.', 'Every fraction is made of unit fractions: $\\dfrac58$ is five eighths.', 'A fraction can be split into parts: $\\dfrac58 = \\dfrac28 + \\dfrac38$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A unit fraction has one as its numerator. It is one equal piece of a whole.', show: 'sum.0' },
        { say: 'Every fraction is made of unit fractions. Five eighths is five pieces of one eighth.', show: 'sum.1' },
        { say: 'And a fraction can be split into parts, like two eighths plus three eighths. In the next part, we add and subtract fractions with the same denominator. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
