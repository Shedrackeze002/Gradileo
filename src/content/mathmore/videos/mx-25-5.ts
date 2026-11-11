import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-25-5',
  lessonId: 'mx-25-5',
  title: 'Intersecting Chords and Common Tangents',
  thumbnail: 'm',
  summary: 'When chords AB and CD cross at P, AP × PB = CP × PD. For two secants from an outside point, PA × PB = PC × PD, using the whole distance to the far point, and for a tangent PT² = PA × PB. For two circles with radii R and r and centres d apart, a direct common tangent is √(d² − (R − r)²) and a transverse one is √(d² − (R + r)²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Intersecting Chords and Common Tangents', subtitle: 'Products of lengths in circles' }],
      lines: [
        { say: 'When two chords of a circle cross, they cut each other into four pieces. The lengths of those pieces are linked by a rule that uses only multiplication.', show: 'title' },
        { say: 'In this video, you will learn that rule, the matching rule for lines from a point outside the circle, and how to find the length of a tangent shared by two circles.' },
      ],
    },
    {
      chapter: 'Intersecting chords',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Intersecting chords theorem', md: 'When chords $AB$ and $CD$ cross at $P$: $AP \\times PB = CP \\times PD$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 4 = 3 \\times PD', 'PD = 8 \\text{ cm}'] },
      ],
      lines: [
        { say: 'When two chords cross at a point P, the two parts of one chord multiply to give the same answer as the two parts of the other.', show: 'def' },
        { say: 'This comes from similar triangles: the angles at P are vertically opposite, and two angles in the same segment are equal.' },
        { say: 'Suppose AP is six centimetres, PB is four, and CP is three. Then six times four equals three times PD.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-four divided by three is eight, so PD is eight centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From a point outside',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['PA \\times PB = PC \\times PD', '4 \\times 12 = 6 \\times PD \\ \\Rightarrow \\ PD = 8', 'CD = 8 - 6 = 2 \\text{ cm}', 'PT^2 = PA \\times PB'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the whole distance to the far point', md: 'The product is $PA \\times PB$, not $PA \\times AB$.' },
      ],
      lines: [
        { say: 'A secant is a line that cuts a circle at two points. From a point P outside the circle, the same kind of rule holds for two secants: the distance to the near point times the distance to the far point is the same for both.', show: 'm.0', focus: 'm.0' },
        { say: 'One secant has PA of four centimetres and AB of eight, so PB is twelve. The other has PC of six. Then four times twelve equals six times PD, so PD is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'The chord CD is the difference, eight minus six, which is two centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Use the whole distance from P to the far point, not just the chord.', show: 'oops' },
        { say: 'If one line swings round until it just touches the circle at T, its two points come together, and the rule becomes PT squared equals PA times PB.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Common tangents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common tangent', md: 'A line that touches two circles. A **direct** one has both circles on the same side; a **transverse** one crosses between them.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{direct} = \\sqrt{d^2 - (R - r)^2} = \\sqrt{15^2 - 5^2} \\approx 14.14', '\\text{transverse} = \\sqrt{d^2 - (R + r)^2} = \\sqrt{15^2 - 9^2} = 12'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Difference for direct, sum for transverse', md: 'The direct tangent uses $R - r$; the transverse tangent uses $R + r$.' },
      ],
      lines: [
        { say: 'A common tangent touches two circles. A direct common tangent has both circles on the same side of it, and a transverse common tangent crosses between them.', show: 'def' },
        { say: 'A radius meets a tangent at a right angle, so each case gives a right-angled triangle. Take circles with radii seven and two centimetres, with centres fifteen centimetres apart.', show: 'm.0' },
        { say: 'For the direct tangent, one side of the triangle is the difference of the radii, five. The tangent is the square root of two hundred and twenty-five minus twenty-five, about fourteen point one four centimetres.', focus: 'm.0' },
        { say: 'For the transverse tangent, the side is the sum of the radii, nine. The tangent is the square root of two hundred and twenty-five minus eighty-one, which is twelve centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The direct tangent stays outside both circles and uses the difference. The transverse tangent crosses between them and uses the sum.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From $P$, a tangent touches a circle at $T$ with $PT = 6$ cm, and a secant meets it at $A$ and $B$ with $PA = 3$ cm. Find $AB$.',
          choices: ['$12$ cm', '$2$ cm', '$3$ cm', '$9$ cm'],
          answer: 3,
          working: '$PT^2 = PA \\times PB$, so $36 = 3 \\times PB$ and $PB = 12$. Then $AB = 12 - 3 = 9$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A tangent from P has length six centimetres, and a secant from P meets the circle first at a distance of three centimetres. Find the chord AB. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Thirty-six equals three times PB, so PB is twelve, and the chord is twelve minus three, which is nine centimetres. Choice A is the whole distance PB.', show: 'q.answer' },
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
          items: ['Chords crossing inside: $AP \\times PB = CP \\times PD$.', 'Secants from outside: $PA \\times PB = PC \\times PD$; tangent: $PT^2 = PA \\times PB$.', 'Direct common tangent $= \\sqrt{d^2 - (R - r)^2}$.', 'Transverse common tangent $= \\sqrt{d^2 - (R + r)^2}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When two chords cross inside a circle, the products of their parts are equal.', show: 'sum.0' },
        { say: 'From a point outside, multiply the distances to the near and far points. For a tangent, square its length.', show: 'sum.1' },
        { say: 'A direct common tangent uses the difference of the radii.', show: 'sum.2' },
        { say: 'And a transverse common tangent uses their sum. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
