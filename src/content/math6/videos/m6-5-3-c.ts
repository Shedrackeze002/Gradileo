import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { caption } from '@/content/math5/videos/lib/m5-6-figures.ts';
import { dotGroups } from './lib/m6-4-figures.ts';

// The $60 price in four quarters of $15: one quarter off, three quarters to pay.
const price = (id: string) =>
  figure(id, [
    bar({ name: 'b', parts: 4, shaded: 4, tones: ['good', 'good', 'good', 'bad'], width: 12, height: 1.4, pieces: '\\$15' }),
    caption({ id: 'whole', at: [6, 1.6], tex: '\\$60', place: 'above' }),
    caption({ id: 'pay', at: [4.5, -0.25], tex: '\\text{sale price: } \\$45', tone: 'good', place: 'below' }),
    caption({ id: 'off', at: [10.5, -0.25], tex: '25\\% \\text{ off}', tone: 'bad', place: 'below' }),
  ], 230);

// 30 students in 10 equal groups of 3: each group is 10%, and 4 groups walk.
const tones: DiagramTone[] = ['good', 'good', 'good', 'good', 'muted', 'muted', 'muted', 'muted', 'muted', 'muted'];
const students = (id: string) => figure(id, [dotGroups({ groups: 10, size: 3, cols: 3, perRow: 2, tones })]);

const video: Explainer = {
  id: 'm6-5-3-c',
  lessonId: 'm6-5-3',
  title: 'Percent of a Number, Part 3: Percent Problems',
  thumbnailTitle: 'Percent Problems',
  thumbnail: 'pr',
  summary:
    'A discount is the amount taken off a price: a $60 jacket at 25% off has a $15 discount (60 ÷ 4), so the sale price is $45. If 40% of 30 students walk to school, 12 walk (40 × 30 ÷ 100) and 18 do not. A percent within 100% is never more than the whole, so check that answers make sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 3', title: 'Percent Problems', subtitle: 'Sales and parts of a group' }],
      lines: [
        { say: 'A jacket is twenty-five percent off. How much do you pay? Questions like this use percents every day.', show: 'title' },
        { say: 'In this part, you will solve problems with percents, and check that the answers make sense.' },
      ],
    },
    {
      chapter: 'A sale',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A winter jacket costs \\$60. It is on sale for $25\\%$ off. What is the sale price?' },
        price('pr'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['25\\% \\text{ of } 60 = 60 \\div 4 = 15', '60 - 15 = 45 \\;\\to\\; \\$45'] },
      ],
      lines: [
        { say: 'A winter jacket costs sixty dollars. It is on sale for twenty-five percent off. What is the sale price?', show: ['t', 'pr.b-frame', 'pr.whole'] },
        { say: 'Twenty-five percent off means the price goes down by twenty-five percent of sixty dollars. The amount taken off a price is called the discount.' },
        { say: 'Twenty-five percent is one quarter. One quarter of sixty is sixty divided by four, which is fifteen. So the discount is fifteen dollars.', show: ['pr.b-shade', 'pr.b-units', 'pr.off', 'm.0'], focus: ['pr.b-p3', 'm.0'] },
        { say: 'Subtract the discount from the price. Sixty minus fifteen is forty-five. The sale price is forty-five dollars.', show: ['pr.pay', 'm.1'], focus: ['pr.b-p0', 'pr.b-p1', 'pr.b-p2', 'm.1'] },
        { say: 'Notice that you pay the other seventy-five percent of the price. Three quarters of sixty is forty-five as well.' },
      ],
    },
    {
      chapter: 'Walking to school',
      layout: 'split',
      leftWidth: 460,
      left: [students('st')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'There are $30$ students in a class. $40\\%$ of them walk to school. How many students do **not** walk?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10\\% \\text{ of } 30 = 3', '40\\% \\text{ of } 30 = 4 \\times 3 = 12', '30 - 12 = 18'] },
      ],
      lines: [
        { say: 'There are thirty students in a class. Forty percent of them walk to school. How many students do not walk?', show: 't' },
        { say: 'Use the ten percent trick. Ten percent of thirty is thirty divided by ten, which is three. Here are the thirty students in ten groups of three. Each group is ten percent of the class.', show: ['st.g0', 'st.g1', 'st.g2', 'st.g3', 'st.g4', 'st.g5', 'st.g6', 'st.g7', 'st.g8', 'st.g9', 'm.0'], focus: 'm.0' },
        { say: 'Forty percent is four groups. Four times three is twelve, so twelve students walk. The quick rule agrees: forty times thirty is one thousand two hundred, and divided by one hundred that is twelve.', show: 'm.1', focus: ['m.1', 'st.g0', 'st.g1', 'st.g2', 'st.g3'] },
        { say: 'But the question asks how many do not walk. That is the rest: thirty minus twelve, which is eighteen students.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does it make sense?', md: 'A percent within $100\\%$ is never more than the whole amount. $40\\%$ is a bit less than half, and $12$ is a bit less than half of $30$.' },
      ],
      lines: [
        { say: 'Always check that your answer makes sense. A percent up to one hundred percent is never more than the whole amount.', show: 'tip' },
        { say: 'Forty percent is a bit less than half. Half of thirty is fifteen, and twelve is a bit less than fifteen. So twelve makes sense.' },
        { say: 'And a sale price is always less than the full price. Forty-five dollars is less than sixty dollars, so it makes sense as well.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A game costs \\$40. It is on sale for $10\\%$ off. What is the sale price?',
          choices: ['\\$4', '\\$30', '\\$44', '\\$36'],
          answer: 3,
          working: '$10\\%$ of $40$ is $40 \\div 10 = 4$, so the discount is \\$4. The sale price is $40 - 4 = 36$, so \\$36.',
        },
      ],
      lines: [
        { say: 'Your turn. A game costs forty dollars. It is on sale for ten percent off. What is the sale price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirty-six dollars. Ten percent of forty dollars is four dollars, so the discount is four dollars. Forty minus four is thirty-six. Choice A, four dollars, is the discount, not the sale price.', show: 'q.answer' },
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
            'The **discount** is the amount taken off a price. Sale price = price − discount.',
            '$25\\%$ off \\$60: the discount is \\$15, so the sale price is \\$45.',
            'For “how many do not”, find the percent, then subtract from the whole.',
            'A percent within $100\\%$ is never more than the whole: check that it makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The discount is the amount taken off a price. Subtract it from the price to get the sale price.', show: 'sum.0' },
        { say: 'Twenty-five percent off sixty dollars is a fifteen-dollar discount, so the sale price is forty-five dollars.', show: 'sum.1' },
        { say: 'When a question asks how many do not, find the percent, then subtract from the whole.', show: 'sum.2' },
        { say: 'And always check that your answer makes sense. Well done on ratios, rates and percents!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
