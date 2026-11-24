import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 7.3 (composite shapes and material costs). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 9.5, Solve Geometry Applications:
// Circles and Irregular Figures, CC BY-NC-SA 4.0). The book shows a picture; our drawing places the
// house and driveway in the lot, and only their sizes matter. Lawn = 120 × 100 − 50 × 40 − 20 × 30 =
// 12,000 − 2,000 − 600 = 9,400 square feet, as in the book's answer. Check: 9,400 + 2,000 + 600 =
// 12,000.

const QUESTION =
  'Perry needs to put in a new lawn. His lot is a rectangle with a length of 120 feet and a width of 100 feet. The house is rectangular and measures 50 feet by 40 feet. His driveway is rectangular and measures 20 feet by 30 feet, as shown. Find the area of Perry’s lawn. [The picture shows the house and the driveway inside the lot, with the driveway joined to the house.]';

/** Perry's lot (120 × 100) with the house (50 × 40) and the driveway (20 × 30) joined to it. */
const lot = (): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height: 400,
  points: {
    A: [0, 0], B: [120, 0], C: [120, 100], D: [0, 100],
    H1: [35, 30], H2: [85, 30], H3: [85, 70], H4: [35, 70],
    D1: [50, 0], D2: [70, 0], D3: [70, 30], D4: [50, 30],
    HL: [60, 50], DL: [60, 15], LL: [105, 85],
  },
  items: [
    { kind: 'region', id: 'lawn', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.3 },
    { kind: 'line', id: 'w', from: 'A', to: 'B', tone: 'ink', label: '120 \\text{ ft}', labelSide: 'right' },
    { kind: 'line', id: 'r', from: 'B', to: 'C', tone: 'ink', label: '100 \\text{ ft}', labelSide: 'right' },
    { kind: 'line', id: 't', from: 'C', to: 'D', tone: 'ink' },
    { kind: 'line', id: 'l', from: 'D', to: 'A', tone: 'ink' },
    { kind: 'label', id: 'lawnL', at: 'LL', tex: '\\text{lawn}', tone: 'good', place: 'center' },
    { kind: 'region', id: 'house', points: ['H1', 'H2', 'H3', 'H4'], tone: 'bad', shade: 0.7 },
    { kind: 'curve', id: 'houseE', points: ['H1', 'H2', 'H3', 'H4'], closed: true, tone: 'bad' },
    { kind: 'label', id: 'houseL', at: 'HL', tex: '\\text{house } 50 \\times 40', place: 'center' },
    { kind: 'region', id: 'drive', points: ['D1', 'D2', 'D3', 'D4'], tone: 'muted', shade: 0.8 },
    { kind: 'curve', id: 'driveE', points: ['D1', 'D2', 'D3', 'D4'], closed: true, tone: 'muted' },
    { kind: 'label', id: 'driveL', at: 'DL', tex: '20 \\times 30', tone: 'ink', place: 'center' },
  ],
});

const LOT = ['pic', 'pic.lawn', 'pic.w', 'pic.r', 'pic.t', 'pic.l'];
const HOUSE = ['pic.house', 'pic.houseE', 'pic.houseL'];
const DRIVE = ['pic.drive', 'pic.driveE', 'pic.driveL'];

const video: Explainer = {
  id: 'xq-m204-7-3',
  lessonId: '',
  exam: {
    lesson: 'm204-7-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.5, Solve Geometry Applications: Circles and Irregular Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures',
    question: QUESTION,
  },
  title: 'Exam Question: The Area of a Lawn Around a House (Composite Shapes)',
  thumbnailTitle: 'How Big Is Perry’s Lawn?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: Perry’s lot is a 120 ft by 100 ft rectangle. On it are a 50 ft by 40 ft house and a 20 ft by 30 ft driveway. The lawn is what is left: 12,000 − 2,000 − 600 = 9,400 square feet. Then we check by adding the parts back, look at the traps, and in Your turn we find the cost of sod.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Big Is Perry’s Lawn?', subtitle: 'Composite shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a composite shape. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt:
            'Perry needs to put in a new lawn. His lot is a rectangle with a length of $120$ feet and a width of $100$ feet. The house is rectangular and measures $50$ feet by $40$ feet. His driveway is rectangular and measures $20$ feet by $30$ feet, as shown. Find the area of Perry’s lawn.',
          answer: '$9{,}400$ square feet',
          working: '120 × 100 − 50 × 40 − 20 × 30 = 12,000 − 2,000 − 600 = 9,400',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Perry needs to put in a new lawn. His lot is a rectangle, 120 feet long and 100 feet wide. The house is a rectangle, 50 feet by 40 feet. His driveway is a rectangle, 20 feet by 30 feet. Find the area of Perry’s lawn.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 580,
      left: [lot()],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A composite shape', md: 'The lawn is the **lot** with the **house** and **driveway** taken out. Its shape is made of rectangles.' }],
      lines: [
        { say: 'Here is a drawing of the lot. The book shows a picture like this. Where the house and driveway sit does not change the answer, only their sizes.', show: [...LOT, ...HOUSE, ...DRIVE, 'pic.lawnL'] },
        { say: 'The lawn is everything green: the whole lot, with the house and the driveway taken out. It is a composite shape, made from rectangles.', show: 'c', focus: 'pic.lawn' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A_{\\text{rectangle}} = \\text{length} \\times \\text{width}', '\\text{lawn} = \\text{lot} - \\text{house} - \\text{driveway}'] },
      ],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is its length times its width.', show: 'm.0' },
        { say: 'And the lawn is the area of the lot, minus the area of the house, minus the area of the driveway.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the area of the **lot**', 'Find the areas of the **house** and **driveway**', '**Subtract** them from the lot'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the whole lot.', show: 'plan.0' },
        { say: 'Find the areas of the house and the driveway.', show: 'plan.1' },
        { say: 'Then subtract them from the lot.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The lawn',
      layout: 'split',
      leftWidth: 580,
      left: [lot()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['120 \\times 100 = 12{,}000', '50 \\times 40 = 2{,}000', '20 \\times 30 = 600', '12{,}000 - 2{,}000 - 600', '= \\good{9{,}400 \\text{ ft}^2}'] }],
      lines: [
        { say: 'Step one. The lot is 120 by 100, which is 12 thousand square feet.', caption: 'Step one. The lot is 120 × 100 = 12,000 square feet.', show: [...LOT, 'm.0'], focus: 'pic.lawn' },
        { say: 'Step two. The house is 50 by 40, which is 2 thousand square feet.', caption: 'Step two. The house is 50 × 40 = 2,000 square feet.', show: [...HOUSE, 'm.1'], focus: 'pic.house' },
        { say: 'The driveway is 20 by 30, which is 600 square feet.', caption: 'The driveway is 20 × 30 = 600 square feet.', show: [...DRIVE, 'm.2'], focus: 'pic.drive' },
        { say: 'Step three. Take them both away: 12 thousand minus 2 thousand minus 600 is 9 thousand 400. Perry’s lawn is 9 thousand 400 square feet.', caption: 'Step three. Take them both away: 12,000 − 2,000 − 600 = 9,400. Perry’s lawn is 9,400 square feet.', show: ['pic.lawnL', 'm.3', 'm.4'], focus: ['pic.lawn', 'm.4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{lawn} + \\text{house} + \\text{driveway} = \\text{lot}', '9{,}400 + 2{,}000 + 600 = 12{,}000 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The lawn, the house and the driveway together fill the whole lot.', show: 'm.0' },
        { say: '9 thousand 400 plus 2 thousand plus 600 is 12 thousand, the area of the lot. It checks out.', caption: '9,400 + 2,000 + 600 = 12,000, the area of the lot. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$12{,}000$ sq ft', 'that is the whole **lot**: take out the house and driveway'],
            ['$10{,}000$ sq ft', 'forgot the **driveway**'],
            ['$14{,}600$ sq ft', '**added** the house and driveway: they are **not** lawn'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12 thousand is the whole lot. Grass does not grow under the house or on the driveway.', caption: '12,000 is the whole lot. Grass does not grow under the house or on the driveway.' },
        { say: '10 thousand takes out the house but forgets the driveway.', caption: '10,000 takes out the house but forgets the driveway.' },
        { say: 'And 14 thousand 600 adds the house and driveway on. They are not lawn, so subtract them.', caption: 'And 14,600 adds the house and driveway on. They are not lawn, so subtract them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A yard is a rectangle, $30$ ft by $20$ ft, with a $10$ ft by $8$ ft shed on it. Sod costs \\$0.45 per square foot. What does it cost to sod the yard around the shed?',
          choices: ['\\$270', '\\$36', '\\$234', '\\$306'],
          answer: 2,
          working: '30 × 20 − 10 × 8 = 600 − 80 = 520 sq ft, and 520 × 0.45 = 234.',
        },
      ],
      lines: [
        { say: 'Your turn, with a cost. A yard is a rectangle, 30 feet by 20 feet, with a 10 foot by 8 foot shed on it. Sod costs 45 cents per square foot. What does it cost to sod the yard around the shed? Pause the video and try it.', caption: 'Your turn, with a cost. A yard is a rectangle, 30 ft by 20 ft, with a 10 ft by 8 ft shed on it. Sod costs $0.45 per square foot. What does it cost to sod the yard around the shed? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The yard is 600 square feet, and the shed is 80. That leaves 520 square feet of sod. 520 times 45 cents is 234 dollars. Choice "C".', caption: 'The yard is 600 sq ft, and the shed is 80. That leaves 520 sq ft of sod. 520 × $0.45 = $234. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split a composite shape into **rectangles**', '**Subtract** the parts that are taken out', '**Check**: the parts add back to the whole', 'Cost $=$ area $\\times$ price per square unit'] }],
      lines: [
        { say: 'Here is what to remember. Split a composite shape into simple shapes, such as rectangles.', show: 'sum.0' },
        { say: 'Subtract the parts that are taken out.', show: 'sum.1' },
        { say: 'Check that the parts add back to the whole.', show: 'sum.2' },
        { say: 'And the cost of material is the area, times the price per square unit. For more on composite shapes and material costs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
