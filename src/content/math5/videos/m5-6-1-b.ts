import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-6-figures.ts';

// The bag of 3 red and 5 blue marbles: two parts and the whole.
const bag = (id: string, height?: number) =>
  figure(
    id,
    [
      counters({
        groups: [
          { id: 'red', count: 3, tone: 'bad', label: '3\\text{ red}' },
          { id: 'blue', count: 5, tone: 'adj', label: '5\\text{ blue}' },
        ],
        whole: '8\\text{ marbles in all}',
      }),
    ],
    height,
  );

// A chess club of 7 children and 5 adults.
const club = (id: string) =>
  figure(id, [
    counters({
      gap: 1,
      groups: [
        { id: 'kid', count: 7, tone: 'theta', label: '7\\text{ children}', perRow: 4 },
        { id: 'adult', count: 5, tone: 'hyp', label: '5\\text{ adults}', perRow: 3 },
      ],
      whole: '12\\text{ members}',
    }),
  ]);

const video: Explainer = {
  id: 'm5-6-1-b',
  lessonId: 'm5-6-1',
  title: 'Ratios, Part 2: Part-Part and Part-Whole Ratios',
  thumbnailTitle: 'Parts and the Whole',
  thumbnail: 'bg',
  summary: 'A part-part ratio compares two parts (3 red to 5 blue marbles, 3 : 5); a part-whole ratio compares a part with the whole (3 red to all 8 marbles, 3 : 8, so 3/8 of the marbles are red). A chess club of 7 children and 5 adults gives 7 : 5 and 7 : 12, and the whole must be found first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 2', title: 'Part-Part and Part-Whole Ratios', subtitle: 'Comparing parts, and a part with the whole' }],
      lines: [
        { say: 'In the last part, you compared the red marbles in a bag with the blue marbles. But you can also compare the red marbles with all the marbles in the bag.', show: 'title' },
        { say: 'In this video, you will learn two kinds of ratios: part-part ratios and part-whole ratios.' },
      ],
    },
    {
      chapter: 'Parts and the whole',
      layout: 'center',
      main: [bag('bg')],
      lines: [
        { say: 'Here is the bag again: three red marbles and five blue marbles.', show: ['bg.red', 'bg.blue', 'bg.red-tag', 'bg.blue-tag'] },
        { say: 'The bag has eight marbles in all. All eight marbles together are called the whole.', show: 'bg.whole', focus: 'bg.whole' },
        { say: 'The red marbles are one part of the whole. The blue marbles are the other part.', focus: ['bg.red', 'bg.blue'] },
        { say: 'Three red plus five blue makes eight. The parts add up to the whole.', focus: 'bg.whole' },
      ],
    },
    {
      chapter: 'Part-part ratios',
      layout: 'center',
      main: [
        bag('bg2', 280),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Part-part ratio', md: 'A **part-part ratio** compares one part with another part, such as red to blue: $\\bad{3} : \\adj{5}$.' },
      ],
      lines: [
        { say: 'A part-part ratio compares one part with another part.', show: ['bg2', 'def'] },
        { say: 'Red to blue is a part-part ratio. It compares the red part with the blue part, so it is three to five.', focus: ['bg2.red', 'bg2.blue'] },
        { say: 'Blue to red is a part-part ratio as well. It is five to three.' },
      ],
    },
    {
      chapter: 'Part-whole ratios',
      layout: 'center',
      main: [
        bag('bg3', 280),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Part-whole ratio', md: 'A **part-whole ratio** compares one part with the whole, such as red to all the marbles: $\\bad{3} : 8$, or $\\dfrac{3}{8}$.' },
      ],
      lines: [
        { say: 'A part-whole ratio compares one part with the whole.', show: ['bg3', 'def'] },
        { say: 'Red to all the marbles is a part-whole ratio. There are three red marbles, and eight marbles in all. So it is three to eight.', focus: ['bg3.red', 'bg3.whole'] },
        { say: 'As a fraction, a part-whole ratio tells you what fraction of the whole the part is. Three to eight is three over eight. So three eighths of the marbles are red.' },
        { say: 'What about blue to all the marbles? That is five to eight. So five eighths of the marbles are blue.', focus: ['bg3.blue', 'bg3.whole'] },
      ],
    },
    {
      chapter: 'A chess club',
      layout: 'split',
      leftWidth: 540,
      left: [club('cc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A chess club has $7$ children and $5$ adults. Write the part-part ratio of children to adults, and the part-whole ratio of children to all the members.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{children} : \\text{adults} = 7 : 5', '7 + 5 = 12', '\\text{children} : \\text{all} = 7 : 12 = \\dfrac{7}{12}'] },
      ],
      lines: [
        { say: 'A chess club has seven children and five adults. Write the part-part ratio of children to adults, and the part-whole ratio of children to all the members.', show: ['q', 'cc.kid', 'cc.adult', 'cc.kid-tag', 'cc.adult-tag'] },
        { say: 'Part-part first. Children to adults compares two parts. It is seven to five.', show: 'm.0', focus: 'm.0' },
        { say: 'For the part-whole ratio, find the whole first. Seven children plus five adults is twelve members.', show: ['m.1', 'cc.whole'], focus: ['m.1', 'cc.whole'] },
        { say: 'Children to all the members is seven to twelve. As a fraction, seven over twelve. So seven twelfths of the members are children.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Find the whole first', md: 'In a part-whole ratio, the second number is the **whole**. For the chess club it is $7 + 5 = 12$, not $5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{children to all: } \\bad{7 : 5} \\quad \\text{\\bad{wrong}}', '\\text{children to all: } \\good{7 : 12} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. For children to all the members, it is easy to write seven to five. But five is only the adults: one part, not the whole.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'In a part-whole ratio, the second number is the whole. Add the parts to find it: seven plus five is twelve. So the ratio is seven to twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pet shop has $6$ cats and $9$ dogs. What is the part-whole ratio of **cats to all the pets**?',
          choices: ['$6 : 9$', '$9 : 15$', '$15 : 6$', '$6 : 15$'],
          answer: 3,
          working: 'The whole is $6 + 9 = 15$ pets. Cats to all the pets is $6 : 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pet shop has six cats and nine dogs. What is the part-whole ratio of cats to all the pets? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six to fifteen. The whole is six plus nine, which is fifteen pets, and the cats come first. Choice A, six to nine, compares cats with dogs. That is a part-part ratio.', show: 'q.answer' },
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
          items: ['A part-part ratio compares two parts: red to blue, $3 : 5$.', 'A part-whole ratio compares a part with the whole: red to all, $3 : 8$.', 'Add the parts to find the whole first.', 'As a fraction, $\\dfrac{3}{8}$ tells what fraction of the whole the part is.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A part-part ratio compares two parts, like red to blue.', show: 'sum.0' },
        { say: 'A part-whole ratio compares a part with the whole, like red to all the marbles.', show: 'sum.1' },
        { say: 'To write a part-whole ratio, add the parts to find the whole first.', show: 'sum.2' },
        { say: 'And as a fraction, a part-whole ratio tells you what fraction of the whole the part is. In the next part, you will work with more than two parts. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
