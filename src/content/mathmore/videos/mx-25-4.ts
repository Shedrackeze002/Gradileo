import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-25-4',
  lessonId: 'mx-25-4',
  title: 'Cyclic Quadrilaterals and the Alternate Segment Theorem',
  thumbnail: 'm',
  summary: 'A cyclic quadrilateral has all four vertices on one circle, and its opposite angles add up to 180°: if A = 74°, then C = 106°. Its exterior angle equals the interior opposite angle. The alternate segment theorem says the angle between a tangent and a chord equals the angle in the alternate segment, on the other side of the chord.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Cyclic Quadrilaterals and the Alternate Segment Theorem', subtitle: 'Two circle theorems' }],
      lines: [
        { say: 'Any three points that are not in a line lie on a circle, but a fourth point usually misses it. When all four corners of a quadrilateral do lie on one circle, its angles obey a simple rule.', show: 'title' },
        { say: 'In this video, you will learn that rule, and a second theorem about the angle between a tangent and a chord.' },
      ],
    },
    {
      chapter: 'Cyclic quadrilaterals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cyclic quadrilateral', md: 'A quadrilateral whose four vertices lie on one circle. Its **opposite angles add up to $180°$**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['A + C = 180°, \\quad B + D = 180°', 'A = 74° \\ \\Rightarrow \\ C = 180° - 74° = 106°', 'B = 112° \\ \\Rightarrow \\ D = 180° - 112° = 68°'] },
      ],
      lines: [
        { say: 'A cyclic quadrilateral is a quadrilateral whose four vertices all lie on one circle. Its opposite angles add up to a hundred and eighty degrees.', show: 'def' },
        { say: 'The reason is the angle at the centre. Each of two opposite angles is half the angle at the centre on its arc, and those two angles at the centre make a full turn. Half of three hundred and sixty is a hundred and eighty.', show: 'm.0', focus: 'm.0' },
        { say: 'So in a cyclic quadrilateral with angle A of seventy-four degrees, the opposite angle C is a hundred and six degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'And with angle B of a hundred and twelve degrees, angle D is sixty-eight degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Exterior angles and algebra',
      layout: 'center',
      main: [
        { kind: 'text', id: 'ext', md: 'The **exterior angle** of a cyclic quadrilateral equals the **interior opposite angle**.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(3x + 10) + (2x + 20) = 180', '5x + 30 = 180 \\ \\Rightarrow \\ x = 30', 'P = 3 \\times 30 + 10 = 100°'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Opposite, not adjacent', md: 'Angles next to each other, such as $A$ and $B$, do not usually add up to $180°$.' },
      ],
      lines: [
        { say: 'Extend one side beyond a corner. The exterior angle and the interior angle next to it make a straight line, so they add up to a hundred and eighty degrees. That means the exterior angle equals the interior opposite angle.', show: 'ext' },
        { say: 'When opposite angles are given as expressions, add them and set the sum to a hundred and eighty. Here three x plus ten and two x plus twenty are opposite.', show: 'm.0', focus: 'm.0' },
        { say: 'Five x plus thirty equals a hundred and eighty, so x is thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'And angle P is a hundred degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'The rule is only for opposite angles. Angles next to each other do not usually add up to a hundred and eighty.', show: 'oops' },
      ],
    },
    {
      chapter: 'The alternate segment theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Alternate segment theorem', md: 'The angle between a tangent and a chord through the point of contact equals the angle in the **alternate segment**, on the other side of the chord.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\angle TAB = \\angle BTQ = 58°', '\\angle TBA = \\angle ATP = 47°', '\\angle ATB = 180° - 58° - 47° = 75°'] },
      ],
      lines: [
        { say: 'A tangent touches a circle at one point, T. A chord from T makes an angle with the tangent. The alternate segment theorem says this angle equals the angle that the chord makes at the circumference on the other side.', show: 'def' },
        { say: 'Let PTQ be the tangent, and TA and TB be chords. If angle BTQ is fifty-eight degrees, then angle TAB, on the other side of chord TB, is fifty-eight degrees too.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, if angle ATP is forty-seven degrees, then angle TBA is forty-seven degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The three angles at T lie on a straight line, so angle ATB is seventy-five degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Put a finger on the chord. The angle between the tangent and the chord is on one side, and the equal angle is on the other side, facing the chord.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a cyclic quadrilateral $PQRS$, $Q = (4x - 5)°$ and $S = (x + 35)°$. Find angle $Q$.',
          choices: ['$30°$', '$65°$', '$115°$', '$145°$'],
          answer: 2,
          working: '$(4x - 5) + (x + 35) = 180$, so $5x + 30 = 180$ and $x = 30$. Then $Q = 4 \\times 30 - 5 = 115°$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a cyclic quadrilateral, angle Q is four x minus five degrees, and the opposite angle S is x plus thirty-five degrees. Find angle Q. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The two angles add up to a hundred and eighty, so five x plus thirty is a hundred and eighty and x is thirty. Then Q is a hundred and fifteen degrees. Choice B is angle S, and choice A is just the value of x.', show: 'q.answer' },
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
          items: ['A cyclic quadrilateral has all four vertices on one circle.', 'Its opposite angles add up to $180°$.', 'An exterior angle equals the interior opposite angle.', 'Tangent and chord: the angle equals the angle in the alternate segment.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A cyclic quadrilateral has all four vertices on one circle.', show: 'sum.0' },
        { say: 'Its opposite angles add up to a hundred and eighty degrees.', show: 'sum.1' },
        { say: 'Its exterior angle equals the interior opposite angle.', show: 'sum.2' },
        { say: 'And the angle between a tangent and a chord equals the angle in the alternate segment. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
