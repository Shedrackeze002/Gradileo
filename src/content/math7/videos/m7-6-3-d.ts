import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// A thermometer from −15 °C to 5 °C: −4 °C at noon, a rise of 9 degrees from sunrise, and the
// sunrise temperature, first unknown (t) and then −13 °C.
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        tube: true,
        min: -15,
        max: 5,
        every: 5,
        unit: 0.3,
        fills: [{ id: 'noon', value: -4, tone: 'bad' }],
        points: [
          { id: 'noonp', value: -4, tex: '\\text{noon: } {-4}^\\circ\\text{C}', tone: 'bad', dx: 0.7 },
          { id: 'sunp', value: -13, tex: '\\text{sunrise: } t', tone: 'adj', dx: 0.7 },
          { id: 'sunv', value: -13, tex: '\\text{sunrise: } {-13}^\\circ\\text{C}', tone: 'adj', dx: 0.7 },
        ],
        moves: [{ id: 'rise', from: -13, to: -4, label: '+9', tone: 'theta', x: 0.95 }],
        room: 5.6,
      }),
    ],
    560,
  );

// Nine packs of 4 rolls make 36 rolls.
const packs = (id: string) =>
  figure(id, [bars({ rows: [{ id: 'r', pieces: Array.from({ length: 9 }, (_, i) => ({ w: 1.2, tex: '4', tone: i % 2 ? ('opp' as const) : ('theta' as const) })) }], total: '36\\text{ rolls}' })], 190);

const video: Explainer = {
  id: 'm7-6-3-d',
  lessonId: 'm7-6-3',
  title: 'Solving One-Step Equations, Part 4: Equations in Stories',
  thumbnailTitle: 'Equations in Stories',
  thumbnail: 'th',
  summary:
    'To solve a story problem, choose a letter for the unknown, write an equation that says two amounts are equal, then solve it and check. The temperature rose 9 °C to reach −4 °C at noon: t + 9 = −4, so t = −13 °C at sunrise. Tape comes in packs of 4 rolls and a team needs 36 rolls: 4p = 36, so p = 9 packs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Equations in Stories', subtitle: 'Name the unknown, then write the equation' }],
      lines: [
        { say: 'Remember the question from the start of this lesson? The temperature rose nine degrees during the morning, and reached negative four degrees Celsius at noon. What was it at sunrise?', show: 'title' },
        { say: 'In this video, you will answer it. You will turn stories into equations, and solve them with one balanced step.' },
      ],
    },
    {
      chapter: 'The temperature at sunrise',
      layout: 'split',
      leftWidth: 520,
      left: [thermo('th')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['t + 9 = {-4}', 't + 9 - 9 = ({-4}) - 9', 't = {-13}', '\\text{Check: } ({-13}) + 9 = {-4} \\;\\checkmark'] }],
      lines: [
        { say: 'At noon, the thermometer showed negative four degrees Celsius.', show: ['th.axis', 'th.noon', 'th.noonp'] },
        { say: 'We do not know the temperature at sunrise, so we give it a letter. Let t be the temperature at sunrise.', show: 'th.sunp', focus: 'th.sunp' },
        { say: 'During the morning, it rose nine degrees. So t plus nine equals negative four. That is our equation.', show: ['th.rise', 'm.0'], focus: ['th.rise', 'm.0'] },
        { say: 'Nine is added to t, so subtract nine from both sides. Negative four minus nine means moving nine more steps below negative four. That is negative thirteen.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So the temperature at sunrise was negative thirteen degrees Celsius.', show: 'th.sunv', hide: 'th.sunp', focus: 'th.sunv' },
        { say: 'Check: start at negative thirteen and rise nine degrees. You reach negative four. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Packs of tape',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Hockey tape comes in packs of $4$ rolls. A team needs $36$ rolls. How many packs should they buy?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4p = 36', '\\dfrac{4p}{4} = \\dfrac{36}{4}', 'p = 9'] },
        packs('pk'),
      ],
      lines: [
        { say: 'Here is another story. Hockey tape comes in packs of four rolls. A team needs thirty-six rolls. How many packs should they buy?', show: 'q' },
        { say: 'We do not know the number of packs, so let p be the number of packs. Each pack has four rolls, so p packs have four p rolls. The team needs thirty-six rolls, so four p equals thirty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Here, p is multiplied by four, so divide both sides by four. Thirty-six divided by four is nine. So p equals nine.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: nine packs of four rolls make thirty-six rolls. The team should buy nine packs.', show: ['pk.r-p0', 'pk.r-p1', 'pk.r-p2', 'pk.r-p3', 'pk.r-p4', 'pk.r-p5', 'pk.r-p6', 'pk.r-p7', 'pk.r-p8', 'pk.total'] },
      ],
    },
    {
      chapter: 'Three steps for a story',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Name** the unknown with a letter.', '**Write** an equation that says two amounts are equal.', '**Solve** it with an inverse operation, then **check** in the story.'],
        },
      ],
      lines: [
        { say: 'Both stories used the same three steps. First, choose a letter for the amount you do not know.', show: 'b.0' },
        { say: 'Second, write an equation that says two amounts are equal, like the temperature at noon, two ways.', show: 'b.1' },
        { say: 'Third, solve it with an inverse operation, and check that your answer makes sense in the story.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'After spending \\$12, Mia has \\$25 left. Let $m$ be the amount Mia had at first, so $m - 12 = 25$. How much did Mia have at first?',
          choices: ['\\$13', '\\$300', '\\$37', '\\$2.08'],
          answer: 2,
          working: 'Twelve is subtracted from $m$, so add $12$ to both sides: $m = 25 + 12 = 37$. Mia had \\$37. Check: $37 - 12 = 25$.',
        },
      ],
      lines: [
        { say: 'Your turn. After spending twelve dollars, Mia has twenty-five dollars left. Let m be the amount Mia had at first, so m minus twelve equals twenty-five. How much did Mia have at first? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, thirty-seven dollars. Add twelve to both sides: twenty-five plus twelve is thirty-seven. Check: thirty-seven minus twelve is twenty-five. Choice A subtracts twelve again, instead of adding it back.', show: 'q.answer' },
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
          items: ['Choose a letter for the unknown.', 'Write an equation that says two amounts are equal.', 'Solve with the inverse operation, then check in the story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a story problem, first choose a letter for the unknown.', show: 'sum.0' },
        { say: 'Then write an equation that says two amounts are equal.', show: 'sum.1' },
        { say: 'Solve it with the inverse operation, and check your answer in the story. In the next lesson, you will solve equations with two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
