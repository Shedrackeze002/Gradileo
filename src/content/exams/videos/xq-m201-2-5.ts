import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 2.5 (the cosine law): two airplanes, one flying 300 mph due
// west and one 25° north of west at 420 mph; how far apart after 90 minutes? The question is an
// exercise from OpenStax Algebra and Trigonometry 2e, word for word (section 10.2, Non-right
// Triangles: Law of Cosines, CC BY-NC-SA 4.0), whose answer key gives 292.4 miles. In 1.5 hours
// they fly 450 and 630 miles, with 25° between them, so d² = 450² + 630² − 2(450)(630) cos 25°.

/** The airport, the two flight paths drawn to scale, and `gap` the distance between the planes. */
const map = (height = 360, gap = true): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'label', id: 'ap', at: 'O', tex: '\\text{airport}', place: 'below', dot: true },
    { kind: 'label', id: 'w', at: 'WL', tex: '\\text{west}', place: 'left', tone: 'muted' },
    { kind: 'line', id: 'p1', from: 'O', to: 'P', tone: 'adj', weight: 5, arrow: true, label: '450\\text{ mi}', labelSide: 'left', group: 'one' },
    { kind: 'line', id: 'p2', from: 'O', to: 'Q', tone: 'hyp', weight: 5, arrow: true, label: '630\\text{ mi}', labelSide: 'right', group: 'two' },
    { kind: 'angle', id: 'a25', at: 'O', from: 'P', to: 'Q', tone: 'theta', label: '25^\\circ', r: 80, labelDist: 120, group: 'two' },
  ];
  if (gap) items.push({ kind: 'line', id: 'd', from: 'P', to: 'Q', tone: 'good', weight: 5, dashed: true, label: 'd', labelSide: 'left', group: 'gap' });
  return {
    kind: 'diagram',
    id: 'map',
    height,
    points: { O: [0, 0], P: [-450, 0], Q: [-570.97, 266.25], WL: [-640, 0] },
    items,
  };
};

const QUESTION =
  'Two airplanes take off in different directions. One travels 300 mph due west and the other travels 25° north of west at 420 mph. After 90 minutes, how far apart are they, assuming they are flying at the same altitude?';

const video: Explainer = {
  id: 'xq-m201-2-5',
  lessonId: '',
  exam: {
    lesson: 'm201-2-5',
    source: 'OpenStax, Algebra and Trigonometry 2e, Exercise in section 10.2, Non-right Triangles: Law of Cosines',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/10-2-non-right-triangles-law-of-cosines',
    question: QUESTION,
  },
  title: 'Exam Question: How Far Apart Are the Two Airplanes? (The Cosine Law)',
  thumbnailTitle: 'How Far Apart Are the Planes?',
  thumbnail: 'map',
  summary:
    'A real test question, solved one small step at a time: one airplane flies 300 mph due west, another 420 mph at 25° north of west. After 90 minutes they have flown 450 and 630 miles with 25° between their paths, so the cosine law gives the distance between them: about 292.4 miles. Then we check with coordinates and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Apart Are the Planes?', subtitle: 'The cosine law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the cosine law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Algebra and Trigonometry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Two airplanes take off in different directions. One travels $300$ mph due west and the other travels $25^\\circ$ north of west at $420$ mph. After $90$ minutes, how far apart are they, assuming they are flying at the same altitude?',
          answer: 'about $292.4$ miles',
          working: '$d^2 = 450^2 + 630^2 - 2(450)(630)\\cos 25^\\circ \\approx 85\\,523$, so $d \\approx 292.4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Two airplanes take off in different directions. One travels 300 miles per hour due west, and the other travels 25 degrees north of west at 420 miles per hour.' },
        { say: 'After 90 minutes, how far apart are they, assuming they are flying at the same altitude?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        map(340, false),
        { kind: 'text', id: 't', size: 'md', md: 'The two flight paths and the gap between the planes make a **triangle**. We know **two sides** and the **angle between them**, and want the third side.' },
      ],
      lines: [
        { say: 'Let us draw it. Both planes start at the airport. One flies due west.', show: ['map', 'map.one'] },
        { say: 'The other flies 25 degrees north of west, so there are 25 degrees between the two paths.', show: 'map.two', focus: 'map.two' },
        { say: 'The two paths and the gap between the planes make a triangle with no right angle. We will know two sides and the angle between them, and we want the third side.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'definition', title: 'The cosine law', md: 'With two sides $a$ and $b$ and the angle $C$ **between** them, the third side $c$ is given by $c^2 = a^2 + b^2 - 2ab\\cos C$.' },
        { kind: 'callout', id: 'dst', tone: 'key', title: 'Distance', md: 'distance $=$ speed $\\times$ time, with the time in **hours** when the speed is in miles per hour.' },
      ],
      lines: [
        { say: 'Here is what we need. The cosine law: if you know two sides, \"a\" and b, and the angle C between them, then the third side squared is \"a\" squared plus b squared, minus 2 \"a\" b times the cosine of C.', show: 'law' },
        { say: 'And distance is speed times time. The speeds are in miles per hour, so the time must be in hours.', show: 'dst' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Turn $90$ minutes into **hours**', 'Find how far **each plane** flies', 'Use the **cosine law** for the gap'] }],
      lines: [
        { say: 'Here is the plan. First, turn 90 minutes into hours.', show: 'plan.0' },
        { say: 'Second, find how far each plane flies.', show: 'plan.1' },
        { say: 'Third, use the cosine law for the distance between them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two distances',
      layout: 'split',
      left: [map(360, false)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['90 \\text{ min} = 1.5 \\text{ h}', '300 \\times 1.5 = 450 \\text{ mi}', '420 \\times 1.5 = 630 \\text{ mi}'] }],
      lines: [
        { say: 'Step one. 90 minutes is one and a half hours, 1.5 hours.', show: ['map', 'm.0'] },
        { say: 'The first plane flies 300 times 1.5, which is 450 miles.', show: ['map.one', 'm.1'], focus: 'map.one' },
        { say: 'The second flies 420 times 1.5, which is 630 miles.', show: ['map.two', 'm.2'], focus: 'map.two' },
      ],
    },
    {
      chapter: 'Step 2: The cosine law',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d^2 = 450^2 + 630^2 - 2(450)(630)\\cos 25^\\circ', '= 202\\,500 + 396\\,900 - 567\\,000(0.9063)', '\\approx 599\\,400 - 513\\,877 = 85\\,523'] }],
      lines: [
        { say: 'Step two. Call the distance between the planes d. It is opposite the 25 degree angle, so d squared is 450 squared plus 630 squared, minus 2 times 450 times 630 times the cosine of 25 degrees.', show: 'm.0' },
        { say: '450 squared is 202,500, and 630 squared is 396,900. 2 times 450 times 630 is 567,000, and the cosine of 25 degrees is about 0.9063.', show: 'm.1' },
        { say: 'So d squared is 599,400 minus about 513,877, which is about 85,523.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Take the square root',
      layout: 'split',
      left: [map(360)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['d \\approx \\sqrt{85\\,523}', 'd \\approx \\good{292.4 \\text{ mi}}'] }],
      lines: [
        { say: 'Step three. That was d squared, so take the square root.', show: ['map', 'map.one', 'map.two', 'map.gap', 'm.0'], focus: 'map.gap' },
        { say: 'd is about 292.4. After 90 minutes, the planes are about 292.4 miles apart. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P = (-450,\\ 0)', 'Q = (-630\\cos 25^\\circ,\\ 630\\sin 25^\\circ) \\approx (-571.0,\\ 266.2)', 'PQ \\approx \\sqrt{121.0^2 + 266.2^2} \\approx 292.4 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check another way, with coordinates. Put the airport at the origin, with west to the left. The first plane is at the point at negative 450, 0.', show: 'm.0' },
        { say: 'The second plane is 630 miles along a line 25 degrees above the west direction: about 571.0 miles west and 266.2 miles north.', show: 'm.1' },
        { say: 'The planes are 121.0 miles apart east to west, and 266.2 miles apart north to south. By the Pythagorean theorem, that is about 292.4 miles. The same answer.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['using $300$ and $420$', 'those are **speeds**: multiply by $1.5$ hours first'],
            ['$+\\,2ab\\cos C$', 'the cosine law **takes away** $2ab\\cos C$'],
            ['$d \\approx 85\\,523$', 'that is $d^2$: take the **square root**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '300 and 420 are speeds, not distances. Using them gives about 195 miles, the gap after only one hour. Multiply by 1.5 hours first.' },
        { say: 'The cosine law takes away 2 \"a\" b times the cosine of C. Adding it gives a gap far too big.' },
        { say: 'And 85,523 is d squared. Do not forget the square root.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In $\\triangle ABC$, $a = 5$, $b = 8$ and $\\angle C = 60^\\circ$. Find $c$.',
          choices: ['$9.4$', '$7$', '$49$', '$3$'],
          answer: 1,
          working: '$c^2 = 25 + 64 - 2(5)(8)\\cos 60^\\circ = 89 - 40 = 49$, so $c = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle \"A\" B C, side \"a\" is 5, side b is 8, and angle C is 60 degrees. Find side c. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'c squared is 25 plus 64, minus 2 times 5 times 8 times the cosine of 60 degrees. The cosine of 60 degrees is one half, so that is 89 minus 40, which is 49. So c is 7, choice B. A forgets the cosine part, and C forgets the square root.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two sides and the angle **between** them: the cosine law', '$c^2 = a^2 + b^2 - 2ab\\cos C$', 'Turn speeds into **distances** first', 'Finish with the **square root**'] }],
      lines: [
        { say: 'Here is what to remember. When you know two sides and the angle between them, use the cosine law.', show: 'sum.0' },
        { say: 'c squared equals \"a\" squared plus b squared, minus 2 \"a\" b times the cosine of C.', show: 'sum.1' },
        { say: 'Turn speeds into distances before you start.', show: 'sum.2' },
        { say: 'And finish with the square root. For more on the cosine law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
