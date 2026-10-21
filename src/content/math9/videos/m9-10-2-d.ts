import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from '@/content/math6/videos/lib/m6-12-figures.ts';
import { join, note, shift } from './lib/m9-10-figures.ts';

// The club (240 + 200 + 160 = 600 members) and the stratified sample of 60 (24 + 20 + 16), drawn
// as bars of the same length: each group is the same share of both, because the sample takes 1/10
// of every group.
const bars = (id: string, height?: number) =>
  figure(
    id,
    [
      join(
        shift(
          stackBar({
            name: 'club',
            parts: [
              { id: 'a', value: 240, tone: 'adj', label: '240' },
              { id: 'b', value: 200, tone: 'opp', label: '200' },
              { id: 'c', value: 160, tone: 'good', label: '160' },
            ],
            whole: '\\text{Club: } 600 \\text{ members}',
          }),
          0,
          3.3,
        ),
        stackBar({
          name: 'smp',
          parts: [
            { id: 'a', value: 24, tone: 'adj', label: '24' },
            { id: 'b', value: 20, tone: 'opp', label: '20' },
            { id: 'c', value: 16, tone: 'good', label: '16' },
          ],
          whole: '\\text{Sample: } 60 \\text{ members}',
        }),
        note({ id: 'ages', at: [6, 5.75], tex: '\\text{Ages: }\\adj{\\blacksquare}\\ 10\\text{–}12 \\quad \\opp{\\blacksquare}\\ 13\\text{–}15 \\quad \\good{\\blacksquare}\\ 16\\text{–}18', place: 'above' }),
      ),
    ],
    height,
  );

const CLUB = (id: string) => [`${id}.club-a`, `${id}.club-b`, `${id}.club-c`, `${id}.club-whole`, `${id}.ages`];

const video: Explainer = {
  id: 'm9-10-2-d',
  lessonId: 'm9-10-2',
  title: 'Populations and Samples, Part 4: Stratified Samples in Proportion',
  thumbnailTitle: 'Stratified Samples',
  thumbnail: 'sp',
  summary:
    'In a stratified sample, every group gets the same fraction of its members chosen, so a bigger group gets more people. A sports club has 240 members aged 10 to 12, 200 aged 13 to 15 and 160 aged 16 to 18, 600 in all. A stratified sample of 60 is 60/600 = 1/10 of the club, so it takes 240 × 1/10 = 24, 200 × 1/10 = 20 and 160 × 1/10 = 16 members, and 24 + 20 + 16 = 60. Splitting the sample equally would ignore the sizes of the groups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 4', title: 'Stratified Samples in Proportion', subtitle: 'The same fraction from every group' }],
      lines: [
        { say: 'A stratified sample chooses people at random from every group. But how many should come from each group?', show: 'title' },
        { say: 'In this video, you will work it out, so the sample matches the population.' },
      ],
    },
    {
      chapter: 'The same fraction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'In proportion', md: 'In a stratified sample, **each group** gets the **same fraction** of its members chosen. A bigger group gets more people in the sample.' },
      ],
      lines: [
        { say: 'Here is the rule. In a stratified sample, each group gets the same fraction of its members chosen.', show: 'key' },
        { say: 'That means a bigger group gets more people in the sample, and a smaller group gets fewer. Then each group has the same share of the sample as it has of the population.' },
      ],
    },
    {
      chapter: 'A sports club',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'A sports club has $240$ members aged $10$ to $12$, $200$ aged $13$ to $15$, and $160$ aged $16$ to $18$. It wants a **stratified sample of $60$** members. How many should come from each age group?',
        },
        bars('cb'),
      ],
      lines: [
        { say: 'A sports club has two hundred forty members aged ten to twelve, two hundred members aged thirteen to fifteen, and one hundred sixty members aged sixteen to eighteen.', show: ['q', ...CLUB('cb')] },
        { say: 'The club wants a stratified sample of sixty members. How many should come from each age group?' },
      ],
    },
    {
      chapter: 'Step by step',
      layout: 'split',
      leftWidth: 560,
      left: [bars('sb', 420)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '240 + 200 + 160 = 600',
            '\\dfrac{60}{600} = \\dfrac{1}{10}',
            '240 \\times \\dfrac{1}{10} = 24',
            '200 \\times \\dfrac{1}{10} = 20',
            '160 \\times \\dfrac{1}{10} = 16',
            '\\text{Check: } 24 + 20 + 16 = 60',
          ],
        },
      ],
      lines: [
        { say: 'Step one: find the total. Two hundred forty plus two hundred plus one hundred sixty is six hundred members.', show: [...CLUB('sb'), 'm.0'], focus: 'm.0' },
        { say: 'Step two: find the fraction of the club that will be in the sample. Sixty out of six hundred is one tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: take one tenth of every group. One tenth of two hundred forty is twenty-four.', show: ['m.2', 'sb.smp-a'], focus: ['m.2', 'sb.smp-a'] },
        { say: 'One tenth of two hundred is twenty, and one tenth of one hundred sixty is sixteen.', show: ['m.3', 'm.4', 'sb.smp-b', 'sb.smp-c', 'sb.smp-whole'], focus: ['m.3', 'm.4', 'sb.smp-b', 'sb.smp-c'] },
        { say: 'Step four: check. Twenty-four plus twenty plus sixteen is sixty. That is the whole sample.', show: 'm.5', focus: 'm.5' },
        { say: 'Look at the two bars. Each age group takes up the same share of the sample as of the club. The sample is a small copy of the club.', focus: 'sb' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Splitting equally',
          md: 'Taking $20$ from each group ignores their sizes. The youngest group is $240 \\div 600 = 40\\%$ of the club, so it should be $40\\%$ of the sample: $24$ members, not $20$.',
        },
      ],
      lines: [
        { say: 'Watch out for a shortcut that does not work. It is tempting to split the sixty equally, twenty from each group.', show: 'oops' },
        { say: 'But the groups are different sizes. The youngest group is two hundred forty out of six hundred, which is forty percent of the club. So it should be forty percent of the sample, which is twenty-four members, not twenty.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school has $300$ students who walk, $450$ who take the bus and $150$ who are driven. A stratified sample of $90$ students is chosen in proportion. How many bus riders should be in the sample?',
          choices: ['$45$', '$30$', '$15$', '$90$'],
          answer: 0,
          working: 'The total is $300 + 450 + 150 = 900$, so the sample is $\\frac{90}{900} = \\frac{1}{10}$ of the school. Bus riders: $450 \\times \\frac{1}{10} = 45$.',
        },
      ],
      lines: [
        { say: 'Your turn. A school has three hundred students who walk, four hundred fifty who take the bus, and one hundred fifty who are driven. A stratified sample of ninety students is chosen in proportion. How many bus riders should be in the sample? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, forty-five. The total is nine hundred, so the sample is one tenth of the school, and one tenth of four hundred fifty is forty-five. Choice B splits the ninety equally among the three groups, which ignores their sizes.', show: 'q.answer' },
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
            'In a stratified sample, take the **same fraction** from every group.',
            'Find the total, then the fraction: sample size $\\div$ population size.',
            'Multiply each group by that fraction, and check that the results add up to the sample size.',
            'Do not split the sample equally when the groups are different sizes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a stratified sample, take the same fraction from every group.', show: 'sum.0' },
        { say: 'Find the total, then the fraction: the sample size divided by the population size.', show: 'sum.1' },
        { say: 'Multiply each group by that fraction, and check that the results add up to the sample size.', show: 'sum.2' },
        { say: 'And do not split the sample equally when the groups are different sizes. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
