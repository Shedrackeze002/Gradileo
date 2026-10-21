import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barIds, bars } from './lib/m8-10-figures.ts';

// A school's band members: 42, 45, 49 and 52. On the poster the vertical axis starts at 40, so the
// bars show only 2, 5, 9 and 12 members above 40, and the 2025 bar looks 12 ÷ 2 = 6 times as tall
// as the 2022 bar. The real increase is 10 members, 10 ÷ 42 ≈ 24%.
const YEARS = ['2022', '2023', '2024', '2025'];
const BAND = [42, 45, 49, 52];
const poster = (id: string) => figure(id, [bars({ categories: YEARS, values: BAND, min: 40, max: 54, step: 2, titles: { y: 'Band members' } })], 500);
const fair = (id: string) => figure(id, [bars({ categories: YEARS, values: BAND, max: 60, step: 10, titles: { y: 'Band members' } })], 500);

const video: Explainer = {
  id: 'm8-10-1-d',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 4: An Axis That Does Not Start at Zero',
  thumbnailTitle: 'When the Axis Starts High',
  thumbnail: 'ps',
  summary:
    'A misleading graph gives a wrong impression of the data, even when its numbers are correct. A school poster shows its band growing from 42 to 52 members, but its vertical axis starts at 40, so the 2025 bar looks 6 times as tall as the 2022 bar. Read the real values from the scale: the band grew by 52 − 42 = 10 members, about 24%. Drawn fairly, with the axis starting at 0, the growth is steady and modest.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 4', title: 'An Axis That Does Not Start at Zero', subtitle: 'Read the numbers, not the picture' }],
      lines: [
        { say: 'A graph can have every number right, and still give you the wrong idea.', show: 'title' },
        { say: 'In this video, you will see how the scale of a graph can fool your eyes, and how to read the real story.' },
      ],
    },
    {
      chapter: 'Misleading graphs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Misleading graph', md: 'A **misleading graph** gives a wrong impression of the data, even when the numbers on it are correct.' },
        { kind: 'text', id: 't', size: 'md', md: 'The **vertical axis** is the line up the side. Its **scale** is the numbers along it.' },
      ],
      lines: [
        { say: 'A graph is misleading when it gives you a wrong impression of the data. All the numbers on it can be correct, but the picture makes you believe something that is not true.', show: 'def' },
        { say: 'One common trick is in the vertical axis. That is the line up the side of a bar graph. The numbers along it are called its scale, and they tell you how tall each bar is.', show: 't' },
      ],
    },
    {
      chapter: 'The poster',
      layout: 'split',
      leftWidth: 600,
      left: [poster('ps')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'A school put this graph of its band members on a poster. The $2025$ bar looks about $6$ times as tall as the $2022$ bar. Did the band really grow that much?' }],
      lines: [
        { say: 'A school put this graph of its band members on a poster.', show: [...barIds('ps', 4), 'q'] },
        { say: 'Look at the bars. The bar for twenty twenty-five looks about six times as tall as the bar for twenty twenty-two.', focus: ['ps.b0', 'ps.b3'] },
        { say: 'Did the band really grow to six times its size? Before you believe the picture, read the numbers.' },
      ],
    },
    {
      chapter: 'Reading the real values',
      layout: 'split',
      leftWidth: 600,
      left: [poster('rv')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2022\\text{: } 42 \\text{ members}', '2025\\text{: } 52 \\text{ members}', '52 - 42 = 10', '10 \\div 42 \\times 100 \\approx 24\\%'] }],
      lines: [
        { say: 'Look at the vertical axis. It starts at forty, not at zero. So the bottom of every bar, from zero up to forty, has been cut off.', show: barIds('rv', 4), focus: 'rv.scale' },
        { say: 'Read the real values from the scale. In twenty twenty-two, the band had forty-two members. In twenty twenty-five, it had fifty-two.', show: ['rv.r0', 'rv.r3', 'm.0', 'm.1'], focus: ['rv.r0', 'rv.r3', 'm.0', 'm.1'] },
        { say: 'That is an increase of fifty-two minus forty-two, which is ten members.', show: 'm.2', focus: 'm.2' },
        { say: 'Compared with forty-two, an increase of ten is ten divided by forty-two, times one hundred. That is about twenty-four percent. The band grew by about a quarter, not to six times its size.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why it looks so big',
      layout: 'split',
      leftWidth: 600,
      left: [poster('wb')],
      right: [{ kind: 'callout', id: 'key', tone: 'mistake', title: 'Cut-off bars', md: 'Above $40$, the $2022$ bar shows only $2$ members, and the $2025$ bar shows $12$. Since $12 \\div 2 = 6$, it **looks** $6$ times as tall.' }],
      lines: [
        { say: 'So why does it look like six times? Each bar only shows the part above forty.', show: [...barIds('wb', 4), 'key'] },
        { say: 'The twenty twenty-two bar shows just the two members above forty. The twenty twenty-five bar shows the twelve members above forty. Twelve is six times two.', focus: ['wb.b0', 'wb.b3'] },
        { say: 'A small change was made to seem huge, just by starting the axis high.' },
      ],
    },
    {
      chapter: 'Drawn fairly',
      layout: 'split',
      leftWidth: 600,
      left: [fair('fr')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'With the axis starting at $0$, the same data shows **steady, modest** growth.' }],
      lines: [
        { say: 'Here is the same data, drawn fairly, with the vertical axis starting at zero.', show: [...barIds('fr', 4), 't'] },
        { say: 'Now each bar is a little taller than the one before. That is the true story: the band grew steadily, by a modest amount each year.', focus: ['fr.b0', 'fr.b1', 'fr.b2', 'fr.b3'] },
        { say: 'So whenever you read a bar graph, check where the vertical axis starts.', focus: 'fr.scale' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The vertical axis of a bar graph starts at $90$. One bar shows $92$ and another shows $96$. About how many times as tall does the second bar **look**?',
          choices: ['$3$ times as tall', 'about the same height', '$4$ times as tall', '$2$ times as tall'],
          answer: 0,
          working: 'The bars show only the part above $90$: $92 - 90 = 2$ and $96 - 90 = 6$. Since $6 \\div 2 = 3$, the second bar looks $3$ times as tall, though $96$ is only a little more than $92$.',
        },
      ],
      lines: [
        { say: 'Your turn. The vertical axis of a bar graph starts at ninety. One bar shows ninety-two, and another shows ninety-six. About how many times as tall does the second bar look? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: three times as tall. The bars show only the parts above ninety, which are two and six, and six is three times two. Choice C uses the real difference between the values: ninety-six minus ninety-two is four, but that is not how tall the bars look.', show: 'q.answer' },
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
          items: ['A misleading graph gives a wrong impression, even with correct numbers.', 'A vertical axis that does not start at $0$ cuts off the bottom of every bar, so small changes look huge.', 'Read the real values from the scale before you believe the picture.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A misleading graph gives a wrong impression, even when its numbers are correct.', show: 'sum.0' },
        { say: 'A vertical axis that does not start at zero cuts off the bottom of every bar, so a small change can be made to seem huge.', show: 'sum.1' },
        { say: 'So read the real values from the scale before you believe the picture. In the next part, you will see two more tricks: unequal intervals and uneven scales. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
