import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-6-figures.ts';

// A fruit bowl: 4 apples, 3 pears and 5 bananas. The fruit that is not bananas is the apples and pears.
const bowl = (id: string, withNot = false) =>
  figure(id, [
    counters({
      groups: [
        { id: 'apple', count: 4, tone: 'bad', label: '4\\text{ apples}', perRow: 2 },
        { id: 'pear', count: 3, tone: 'good', label: '3\\text{ pears}', perRow: 2 },
        { id: 'banana', count: 5, tone: 'theta', label: '5\\text{ bananas}', perRow: 3 },
      ],
      gap: 1.9,
      ...(withNot ? { spans: [{ id: 'not', from: 0, to: 1, label: '7\\text{ not bananas}', tone: 'brand' as const }] } : { whole: '12\\text{ pieces of fruit}' }),
    }),
  ]);

// A punch recipe: 2 cups of juice and 3 cups of water.
const punch = (id: string) =>
  figure(id, [
    counters({
      gap: 1,
      groups: [
        { id: 'juice', count: 2, tone: 'opp', label: '2\\text{ cups juice}' },
        { id: 'water', count: 3, tone: 'adj', label: '3\\text{ cups water}' },
      ],
      whole: '5\\text{ cups of punch}',
    }),
  ]);

const video: Explainer = {
  id: 'm5-6-1-c',
  lessonId: 'm5-6-1',
  title: 'Ratios, Part 3: More Parts, and Amounts You Measure',
  thumbnailTitle: 'More Than Two Parts',
  thumbnail: 'fb',
  summary: 'Ratios when a whole has more than two parts (a bowl of 4 apples, 3 pears and 5 bananas: pears to all the fruit is 3 : 12, and fruit that is not bananas to bananas is 7 : 5) and for amounts you measure (2 cups of juice in 5 cups of punch is 2 : 5), naming the parts before writing a ratio.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 3', title: 'More Parts, and Amounts You Measure', subtitle: 'Fruit bowls and recipes' }],
      lines: [
        { say: 'Not every whole has just two parts. A fruit bowl can hold apples, pears and bananas. Ratios can also compare amounts you measure, like cups of juice in a recipe.', show: 'title' },
        { say: 'In this video, you will write ratios for a whole with more than two parts, and for amounts you measure.' },
      ],
    },
    {
      chapter: 'Three kinds of fruit',
      layout: 'center',
      main: [
        bowl('fb'),
        { kind: 'text', id: 'q', size: 'md', md: 'Write the ratio of **pears to all the fruit**, and the ratio of **fruit that is not bananas to bananas**.' },
      ],
      lines: [
        { say: 'A fruit bowl has four apples, three pears and five bananas. Each counter is one piece of fruit.', show: ['fb.apple', 'fb.pear', 'fb.banana', 'fb.apple-tag', 'fb.pear-tag', 'fb.banana-tag'] },
        { say: 'Write the ratio of pears to all the fruit, and the ratio of fruit that is not bananas to bananas.', show: 'q' },
      ],
    },
    {
      chapter: 'Pears to all the fruit',
      layout: 'split',
      leftWidth: 640,
      left: [bowl('fb2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 + 3 + 5 = 12', '\\text{pears} : \\text{all} = 3 : 12', '= \\dfrac{3}{12}'] }],
      lines: [
        { say: 'Pears to all the fruit is a part-whole ratio. So first, find the whole.', show: ['fb2.apple', 'fb2.pear', 'fb2.banana', 'fb2.apple-tag', 'fb2.pear-tag', 'fb2.banana-tag'] },
        { say: 'Add all three parts: four plus three plus five is twelve. There are twelve pieces of fruit in all.', show: ['m.0', 'fb2.whole'], focus: ['m.0', 'fb2.whole'] },
        { say: 'Pears to all the fruit: the pears go first, and the whole goes second. That is three to twelve.', show: 'm.1', focus: ['m.1', 'fb2.pear'] },
        { say: 'As a fraction, it is three over twelve. Three twelfths of the fruit are pears.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Not bananas to bananas',
      layout: 'split',
      leftWidth: 640,
      left: [bowl('fb3', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{not bananas} = 4 + 3 = 7', '\\text{not bananas} : \\text{bananas}', '= 7 : 5'] }],
      lines: [
        { say: 'Next, the fruit that is not bananas. That is the apples and the pears together.', show: ['fb3.apple', 'fb3.pear', 'fb3.banana', 'fb3.apple-tag', 'fb3.pear-tag', 'fb3.banana-tag'], focus: ['fb3.apple', 'fb3.pear'] },
        { say: 'Four apples plus three pears is seven pieces of fruit that are not bananas.', show: ['m.0', 'fb3.not'], focus: ['m.0', 'fb3.not'] },
        { say: 'Not bananas to bananas: seven to five.', show: ['m.1', 'm.2'], focus: ['m.2', 'fb3.banana'] },
        { say: 'This ratio compares two parts of the bowl, so it is a part-part ratio. Together, the two parts make the whole bowl of twelve.' },
      ],
    },
    {
      chapter: 'A punch recipe',
      layout: 'split',
      leftWidth: 560,
      left: [punch('pr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A punch recipe mixes $2$ cups of juice with $3$ cups of water. What is the part-whole ratio of **juice to all the punch**?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 3 = 5 \\text{ cups}', '\\text{juice} : \\text{all} = 2 : 5 = \\dfrac{2}{5}'] },
      ],
      lines: [
        { say: 'Ratios can also compare amounts you measure, like cups or litres.', show: ['pr.juice', 'pr.water', 'pr.juice-tag', 'pr.water-tag'] },
        { say: 'A punch recipe mixes two cups of juice with three cups of water. What is the part-whole ratio of juice to all the punch?', show: 'q' },
        { say: 'The whole is all the punch. Two cups plus three cups is five cups of punch.', show: ['m.0', 'pr.whole'], focus: ['m.0', 'pr.whole'] },
        { say: 'Juice to all the punch is two to five, or two over five. So two fifths of the punch is juice.', show: 'm.1', focus: ['m.1', 'pr.juice'] },
      ],
    },
    {
      chapter: 'Name the parts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Name the parts', md: 'Before you write a ratio, say what each number stands for. “Juice **to** all the punch” tells you the first number is the juice and the second is the whole.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\underbrace{2}_{\\text{juice}} : \\underbrace{5}_{\\text{all the punch}}'] },
      ],
      lines: [
        { say: 'Here is a tip. Before you write a ratio, say what each number stands for.', show: 'tip' },
        { say: 'Juice to all the punch tells you: the first number is the juice, and the second number is the whole punch.', show: 'm.0', focus: 'm.0' },
        { say: 'Saying it first helps you choose the right numbers, and put them in the right order.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A jar has $5$ red beads, $4$ green beads and $3$ yellow beads. What is the ratio of **green beads to all the beads**?',
          choices: ['$4 : 12$', '$4 : 8$', '$12 : 4$', '$4 : 5$'],
          answer: 0,
          working: 'The whole is $5 + 4 + 3 = 12$ beads. Green to all the beads is $4 : 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. A jar has five red beads, four green beads and three yellow beads. What is the ratio of green beads to all the beads? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four to twelve. The whole is five plus four plus three, which is twelve beads, and the green beads come first. Choice C, twelve to four, has the numbers in the wrong order.', show: 'q.answer' },
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
          items: ['A whole can have more than two parts. Add them all to find the whole.', 'Ratios can compare amounts you measure, like cups.', 'Say what each number stands for before you write the ratio.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A whole can have more than two parts. Add all the parts to find the whole.', show: 'sum.0' },
        { say: 'Ratios can compare amounts you measure, like cups of juice and water.', show: 'sum.1' },
        { say: 'And say what each number stands for before you write the ratio. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
