import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, on, ring, sq } from './lib/m9-8-figures.ts';

/**
 * A circle of radius `r` with a chord AB at distance `d` from the centre, its midpoint M in the
 * direction `dir`: the right triangle OMA has the radius OA as its hypotenuse (pink), half the
 * chord AM (blue) and the distance OM (orange). Every length is drawn to scale.
 */
const chordFig = (id: string, r: number, d: number, dir: number, labels: { oa?: string; am?: string; om?: string; mb?: string; inside?: boolean } = {}) => {
  const half2: 'left' | 'right' = labels.inside ? 'left' : 'right';
  const half = (Math.acos(d / r) * 180) / Math.PI;
  return figure(id, [
    ring({ r, pts: { A: dir - half, B: dir + half }, centrePlace: 'above' }),
    dot('M', on([0, 0], d, dir), labels.inside ? 'above right' : 'below'),
    ln('ab', 'A', 'B', { tone: 'muted' }),
    ln('mb', 'M', 'B', { tone: 'adj', dashed: true, ...(labels.mb ? { label: labels.mb, side: half2 } : {}) }),
    ln('am', 'A', 'M', { tone: 'adj', ...(labels.am ? { label: labels.am, side: half2, at: 0.4 } : {}) }),
    ln('om', 'O', 'M', { tone: 'opp', ...(labels.om ? { label: labels.om, side: 'left' as const } : {}) }),
    ln('oa', 'O', 'A', { tone: 'hyp', ...(labels.oa ? { label: labels.oa, side: 'right' as const } : {}) }),
    sq('rm', 'M', 'O', 'A'),
  ]);
};
const all = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.nM`, `${id}.ab`, `${id}.om`, `${id}.rm`];

const video: Explainer = {
  id: 'm9-8-1-c',
  lessonId: 'm9-8-1',
  title: 'Chord Properties, Part 3: Chords and the Pythagorean Theorem',
  thumbnailTitle: 'Chords and the Pythagorean Theorem',
  thumbnail: 'lc',
  summary:
    'The radius OA, half the chord AM and the distance OM from the centre make a right triangle with the radius as its hypotenuse: OA² = AM² + OM². With a radius of 13 cm and a chord 5 cm from the centre, AM = √(169 − 25) = 12, so the chord is 24 cm. With a radius of 10 m and a 12 m chord, OM = √(100 − 36) = 8 m. Use half the chord, and double it at the end when you need the whole chord.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 3', title: 'Chords and the Pythagorean Theorem', subtitle: 'A right triangle inside the circle' }],
      lines: [
        { say: 'The line from the centre to a chord makes a right angle. And where there is a right angle, the Pythagorean theorem is never far away.', show: 'title' },
        { say: 'In this part, you will use a right triangle inside a circle to find the length of a chord, and how far a chord is from the centre.' },
      ],
    },
    {
      chapter: 'The right triangle',
      layout: 'split',
      leftWidth: 560,
      left: [chordFig('rt', 13, 5, 250, { oa: 'r', am: '\\tfrac{1}{2} \\text{ chord}', om: 'd' })],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Pythagorean theorem', md: 'In a right triangle, the square of the **hypotenuse** (the longest side, across from the right angle) equals the sum of the squares of the other two sides.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\hyp{OA}^2 = \\adj{AM}^2 + \\opp{OM}^2', '\\hyp{r}^2 = (\\adj{\\text{half chord}})^2 + \\opp{d}^2'] },
      ],
      lines: [
        { say: 'Here is a chord A B, and the perpendicular from the centre, O M. Now draw the radius O A. Look at triangle O M A. It has a right angle at M.', show: [...all('rt'), 'rt.am', 'rt.oa'], focus: ['rt.oa', 'rt.am', 'rt.om'] },
        { say: 'Remember the Pythagorean theorem. In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. The hypotenuse is the longest side, across from the right angle.', show: 'k' },
        { say: 'In triangle O M A, the hypotenuse is the radius, O A, in pink. The other two sides are A M, half the chord, in blue, and O M, the distance from the centre to the chord, in orange.', focus: ['rt.oa', 'rt.am', 'rt.om'] },
        { say: 'So O A squared equals A M squared plus O M squared.', show: 'm.0', focus: 'm.0' },
        { say: 'In words: the radius squared equals half the chord squared, plus the distance squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Length of a chord',
      layout: 'split',
      leftWidth: 560,
      left: [chordFig('lc', 13, 5, 250, { oa: '13', am: 'AM', om: '5' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circle has a radius of $13$ cm. The chord $AB$ is $5$ cm from the centre. How long is $AB$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AM^2 = 13^2 - 5^2', '= 169 - 25 = 144', 'AM = \\sqrt{144} = 12', 'AB = 2 \\times 12 = 24 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A circle has a radius of thirteen centimetres. The chord A B is five centimetres from the centre. How long is A B?', show: [...all('lc'), 'lc.am', 'lc.oa', 'q'] },
        { say: 'Step one: in right triangle O M A, the hypotenuse is the radius, thirteen. One of the other sides is O M, five. To find a shorter side, subtract: A M squared is thirteen squared minus five squared.', show: 'm.0', focus: ['m.0', 'lc.oa', 'lc.om'] },
        { say: 'Thirteen squared is one hundred sixty-nine, and five squared is twenty-five. One hundred sixty-nine minus twenty-five is one hundred forty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two: A M is the square root of one hundred forty-four, which is twelve.', show: 'm.2', focus: ['m.2', 'lc.am'] },
        { say: 'Step three: A M is only half of the chord. O M cuts the chord into two equal parts, so A B is two times twelve, which is twenty-four. The chord is twenty-four centimetres long.', show: ['m.3', 'lc.mb'], focus: ['m.3', 'lc.am', 'lc.mb'] },
      ],
    },
    {
      chapter: 'Distance from the centre',
      layout: 'split',
      leftWidth: 560,
      left: [chordFig('dc', 10, 8, 270, { oa: '10', am: '6', mb: '6', om: 'OM', inside: true })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circle has a radius of $10$ m and a chord $12$ m long. How far is the chord from the centre?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AM = 12 \\div 2 = 6', 'OM^2 = 10^2 - 6^2', '= 100 - 36 = 64', 'OM = \\sqrt{64} = 8 \\text{ m}'] },
      ],
      lines: [
        { say: 'Now go the other way. A circle has a radius of ten metres, and a chord twelve metres long. How far is the chord from the centre?', show: [...all('dc'), 'dc.oa', 'q'] },
        { say: 'Step one: the triangle uses half of the chord. A M is twelve divided by two, which is six.', show: ['m.0', 'dc.am', 'dc.mb'], focus: ['m.0', 'dc.am'] },
        { say: 'Step two: O M squared is ten squared minus six squared. That is one hundred minus thirty-six, which is sixty-four.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 'dc.om'] },
        { say: 'O M is the square root of sixty-four, which is eight. The chord is eight metres from the centre.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [chordFig('wo', 9, 4, 260, { oa: '9', am: '\\sqrt{65}', om: '4' })],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the whole chord', md: 'The right triangle uses **half** the chord. Double it at the end if you need the whole chord.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AM = \\sqrt{81 - 16} = \\sqrt{65}', 'AM \\approx 8.06', 'AB \\approx 2 \\times 8.06 \\approx 16.1 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The right triangle uses half the chord, not the whole chord. It is easy to forget that at the end.', show: [...all('wo'), 'wo.am', 'wo.oa', 'oops'] },
        { say: 'Suppose the radius is nine centimetres, and O M is four centimetres. Then A M is the square root of eighty-one minus sixteen, which is the square root of sixty-five. That is about eight point zero six.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1', 'wo.am'] },
        { say: 'But that is only half of the chord. Double it: the chord is about sixteen point one centimetres. Do not forget to double at the end.', show: ['m.2', 'wo.mb'], focus: ['m.2', 'wo.am', 'wo.mb'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle has a radius of $17$ cm. A chord is $8$ cm from the centre. How long is the chord?',
          choices: ['$15$ cm', '$18.8$ cm', '$30$ cm', '$9$ cm'],
          answer: 2,
          working: 'Half the chord is $\\sqrt{17^2 - 8^2} = \\sqrt{289 - 64} = \\sqrt{225} = 15$, so the chord is $2 \\times 15 = 30\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of seventeen centimetres. A chord is eight centimetres from the centre. How long is the chord? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, thirty centimetres. Half the chord is the square root of seventeen squared minus eight squared, which is the square root of two hundred twenty-five, or fifteen. The whole chord is twice that. Choice A forgets to double: fifteen is only half of the chord.', show: 'q.answer' },
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
            'The radius, half the chord and the distance from the centre make a right triangle.',
            'The radius is the hypotenuse: $r^2 = (\\text{half chord})^2 + d^2$.',
            'Use **half** the chord in the triangle, and double it at the end for the whole chord.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A radius, half of a chord, and the distance from the centre to the chord make a right triangle.', show: 'sum.0' },
        { say: 'The radius is the hypotenuse. So the radius squared equals half the chord squared, plus the distance squared.', show: 'sum.1' },
        { say: 'Use half the chord in the triangle, and double it at the end if you need the whole chord. In the next part, you will use all of this to find how deep the water is in a pipe. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
