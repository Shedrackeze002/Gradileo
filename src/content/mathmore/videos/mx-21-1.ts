import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-21-1',
  lessonId: 'mx-21-1',
  title: 'Geometric Objects and Their Notation',
  thumbnailTitle: 'Geometric Notation',
  thumbnail: 'd',
  summary: 'A line has no endpoints, a ray has one and a line segment has two, and each has its own symbol over two letters. An angle is named with its vertex in the middle: ∠ABC has its vertex at B. Where two lines intersect, opposite angles are equal and adjacent angles add to 180°, so an angle of 65° gives 65° opposite and 115° beside it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Notation and Dilations', title: 'Geometric Objects and Their Notation', subtitle: 'Lines, rays, segments and angles' }],
      lines: [
        { say: 'Geometry has its own shorthand. A small symbol above two letters tells us whether we mean a line that never ends, a ray, or a segment with a length we can measure.', show: 'title' },
        { say: 'In this video, you will learn to name lines, rays, segments and angles, read the symbols for parallel and perpendicular, and find angles where lines intersect.' },
      ],
    },
    {
      chapter: 'Lines, rays and segments',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Object', 'Notation', 'Endpoints'],
          rows: [
            ['Line', '$\\overleftrightarrow{AB}$', 'none: it goes on forever both ways'],
            ['Ray', '$\\overrightarrow{AB}$', 'one: it starts at $A$ and passes through $B$'],
            ['Line segment', '$\\overline{AB}$', 'two: it runs from $A$ to $B$'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The order of the letters in a ray', md: 'The first letter is the endpoint. $\\overrightarrow{AB}$ starts at $A$, and $\\overrightarrow{BA}$ starts at $B$: they are different rays.' },
      ],
      lines: [
        { say: 'A point is an exact position, named with a capital letter. A line is a straight path that goes on forever in both directions. We name it with two of its points, and draw a double arrow above them.', show: 'tb.0' },
        { say: 'A ray is part of a line. It starts at one endpoint and goes on forever in one direction. Its symbol is a single arrow.', show: 'tb.1' },
        { say: 'A line segment is the part of a line between two endpoints, so it has a length. Its symbol is a bar.', show: 'tb.2' },
        { say: 'For a line or a segment, the order of the letters does not matter. For a ray it does, because the first letter is always the endpoint.', show: 'oops' },
      ],
    },
    {
      chapter: 'Angles',
      layout: 'split',
      leftWidth: 700,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          height: 420,
          points: { B: [0, 0], A: [4, 3], C: [5, 0] },
          items: [
            { kind: 'line', id: 'ba', from: 'B', to: 'A', arrow: true },
            { kind: 'line', id: 'bc', from: 'B', to: 'C', arrow: true },
            { kind: 'angle', id: 'ang', at: 'B', from: 'C', to: 'A', tone: 'theta' },
            { kind: 'label', id: 'lb', at: 'B', tex: 'B', place: 'below left', dot: true },
            { kind: 'label', id: 'la', at: 'A', tex: 'A', place: 'above left' },
            { kind: 'label', id: 'lc', at: 'C', tex: 'C', place: 'below' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle and vertex', md: 'An **angle** is formed by two rays that meet at a common point, the **vertex**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\angle ABC = \\angle CBA'] },
      ],
      lines: [
        { say: 'An angle is formed by two rays, lines or segments that meet at a common point. That point is called the vertex.', show: ['d', 'def'] },
        { say: 'We name an angle with three letters, with the vertex in the middle. This is angle A B C, and its vertex is B.', show: 'm.0', focus: 'd.ang' },
        { say: 'Reading the letters the other way names the same angle, so angle A B C equals angle C B A.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Parallel and perpendicular',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\overleftrightarrow{AB} \\parallel \\overleftrightarrow{CD}', '\\overleftrightarrow{AB} \\perp \\overleftrightarrow{CD}'] },
        { kind: 'bullets', id: 'marks', items: ['Parallel lines: the same number of **arrowheads**.', 'A right angle: a small **square**.', 'Equal lengths: the same number of **hash marks**.', 'Equal angles: the same number of **arcs**.'] },
      ],
      lines: [
        { say: 'Parallel lines are lines in the same plane that never meet. Two upright strokes mean is parallel to.', show: 'm.0', focus: 'm.0' },
        { say: 'Perpendicular lines meet at a right angle, which is ninety degrees. This symbol means is perpendicular to.', show: 'm.1', focus: 'm.1' },
        { say: 'Diagrams show the same facts with marks. Parallel lines carry matching arrowheads, and a small square marks a right angle.', show: ['marks.0', 'marks.1'] },
        { say: 'Segments of equal length carry matching hash marks, and equal angles carry matching arcs.', show: ['marks.2', 'marks.3'] },
      ],
    },
    {
      chapter: 'Angles where lines intersect',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          height: 440,
          points: { A: [-4, -1.5], B: [4, 1.5], C: [-2, 3.5], D: [2, -3.5], E: [0, 0] },
          items: [
            { kind: 'line', id: 'ab', from: 'A', to: 'B' },
            { kind: 'line', id: 'cd', from: 'C', to: 'D' },
            { kind: 'angle', id: 'aec', at: 'E', from: 'A', to: 'C', tone: 'theta', label: '65^\\circ' },
            { kind: 'angle', id: 'bed', at: 'E', from: 'B', to: 'D', tone: 'theta', label: '65^\\circ' },
            { kind: 'angle', id: 'aed', at: 'E', from: 'A', to: 'D', tone: 'opp', label: '115^\\circ' },
            { kind: 'label', id: 'la', at: 'A', tex: 'A', place: 'left' },
            { kind: 'label', id: 'lb', at: 'B', tex: 'B', place: 'right' },
            { kind: 'label', id: 'lc', at: 'C', tex: 'C', place: 'above' },
            { kind: 'label', id: 'ld', at: 'D', tex: 'D', place: 'below' },
            { kind: 'label', id: 'le', at: 'E', tex: 'E', place: 'above right' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle BED = 65^\\circ', '\\angle AED = 180^\\circ - 65^\\circ', '= 115^\\circ'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A transversal', md: 'A line that crosses two lines makes equal **corresponding angles** exactly when the two lines are parallel.' },
      ],
      lines: [
        { say: 'When two lines intersect, they form four angles. Here, lines A B and C D intersect at E, and angle A E C is sixty-five degrees.', show: ['d.ab', 'd.cd', 'd.la', 'd.lb', 'd.lc', 'd.ld', 'd.le', 'd.aec'] },
        { say: 'Angles across the intersection from each other are called opposite angles, and they are always equal. So angle B E D is sixty-five degrees as well.', show: ['d.bed', 'm.0'], focus: 'm.0' },
        { say: 'Angles next to each other along a straight line add to one hundred eighty degrees. So angle A E D is one hundred eighty minus sixty-five, which is one hundred fifteen degrees.', show: ['d.aed', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'A transversal is a line that crosses two other lines. The angles in matching positions at the two crossings are corresponding angles. They are equal exactly when the two lines are parallel.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lines $PQ$ and $RS$ intersect at $T$, and $\\angle PTR = 48^\\circ$. What is the measure of $\\angle PTS$?',
          choices: ['$48^\\circ$', '$42^\\circ$', '$312^\\circ$', '$132^\\circ$'],
          answer: 3,
          working: '$\\angle PTS$ and $\\angle PTR$ are adjacent angles on line $RS$: $180^\\circ - 48^\\circ = 132^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Lines P Q and R S intersect at T, and angle P T R is forty-eight degrees. What is the measure of angle P T S? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Angle P T S sits beside angle P T R on the line R S, so the two add to one hundred eighty degrees. One hundred eighty minus forty-eight is one hundred thirty-two degrees.', show: 'q.answer' },
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
          items: ['$\\overleftrightarrow{AB}$ is a line, $\\overrightarrow{AB}$ is a ray and $\\overline{AB}$ is a line segment.', '$\\angle ABC$ has its vertex at the middle letter, $B$.', '$\\parallel$ means parallel and $\\perp$ means perpendicular.', 'Opposite angles are equal. Adjacent angles on a line add to $180^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line has no endpoints, a ray has one, and a line segment has two. Each has its own symbol.', show: 'sum.0' },
        { say: 'An angle is named with its vertex as the middle letter.', show: 'sum.1' },
        { say: 'Two upright strokes mean parallel, and the upside-down T means perpendicular.', show: 'sum.2' },
        { say: 'And where two lines intersect, opposite angles are equal, and adjacent angles add to one hundred eighty degrees. In the next lesson, we enlarge and reduce shapes with dilations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
