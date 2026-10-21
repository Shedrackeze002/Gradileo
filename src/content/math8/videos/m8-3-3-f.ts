import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from './lib/m8-3-figures.ts';

// The profit: Amara 3 blocks, Jun 4 blocks, $12 in each, $84 in all.
const profit = (id: string) =>
  figure(
    id,
    [
      tape({
        stacked: true,
        unit: 1.5,
        total: '\\$84',
        parts: [
          { id: 'a', count: 3, tone: 'opp', name: '\\text{Amara}', value: '\\$12' },
          { id: 'j', count: 4, tone: 'adj', name: '\\text{Jun}', value: '\\$12' },
        ],
      }),
    ],
    250,
  );

// The iced tea: 1 block of concentrate, 4 of water, 400 mL in each, 2,000 mL in all.
const tea = (id: string) =>
  figure(
    id,
    [
      tape({
        stacked: true,
        unit: 1.5,
        total: '2\\ \\text{L}',
        nameRoom: 3.6,
        parts: [
          { id: 'c', count: 1, tone: 'opp', name: '\\text{Concentrate}', value: '400' },
          { id: 'w', count: 4, tone: 'adj', name: '\\text{Water}', value: '400' },
        ],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm8-3-3-f',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 6: Sharing in a Ratio',
  thumbnailTitle: 'Sharing in a Ratio',
  thumbnail: 'pf',
  summary:
    'To share an amount in a ratio, add the terms to find the number of equal parts, find one part, then multiply. Amara and Jun share a profit of $84 in the ratio 3 : 4: there are 3 + 4 = 7 parts of 84 ÷ 7 = $12, so Amara gets $36 and Jun gets $48, which add back to $84. Iced tea mixed 1 : 4 has 5 parts, so 2 L (2,000 mL) holds 400 mL of concentrate and 1,600 mL of water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 6', title: 'Sharing in a Ratio', subtitle: 'Count the parts, then find one part' }],
      lines: [
        { say: 'Amara and Jun run a lemonade stand together. Jun worked more hours, so they agree to share the profit in the ratio three to four. How much does each of them get?', show: 'title' },
        { say: 'In this part, you will share an amount in a ratio, using a tape diagram.' },
      ],
    },
    {
      chapter: 'Sharing a profit',
      layout: 'split',
      leftWidth: 600,
      left: [profit('pf')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Amara and Jun share a profit of \\$84 in the ratio $3 : 4$. How much does each person get?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 4 = 7 \\text{ parts}', '84 \\div 7 = 12', '\\text{Amara: } 3 \\times 12 = 36', '\\text{Jun: } 4 \\times 12 = 48'] },
      ],
      lines: [
        { say: 'Amara and Jun share a profit of eighty-four dollars in the ratio three to four. A profit is the money left over after paying the costs. How much does each person get?', show: 'q' },
        { say: 'Draw a tape diagram. Amara gets three parts for every four parts that Jun gets. So draw a row of three equal blocks for Amara, and a row of four equal blocks for Jun.', show: ['pf.a', 'pf.j'] },
        { say: 'Together, the rows have three plus four, which is seven equal blocks. And all the blocks together hold the whole eighty-four dollars.', show: ['pf.total', 'm.0'], focus: ['pf.total', 'm.0'] },
        { say: 'Find one part. Eighty-four divided by seven is twelve, so each block is twelve dollars.', show: ['m.1', 'pf.a-v', 'pf.j-v'], focus: 'm.1' },
        { say: 'Amara has three blocks: three times twelve is thirty-six dollars.', show: 'm.2', focus: ['m.2', 'pf.a'] },
        { say: 'Jun has four blocks: four times twelve is forty-eight dollars.', show: 'm.3', focus: ['m.3', 'pf.j'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        profit('pf'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['36 + 48 = 84 \\qquad 36 : 48 = 3 : 4'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Amara gets **\\$36** and Jun gets **\\$48**.' },
      ],
      lines: [
        { say: 'Check the answer two ways. First, the shares should add up to the whole profit. Thirty-six plus forty-eight is eighty-four. Yes!', show: ['pf.a', 'pf.j', 'pf.a-v', 'pf.j-v', 'pf.total', 'm.0'], focus: 'm.0' },
        { say: 'Second, the shares should be in the right ratio. Divide thirty-six and forty-eight by twelve, and you get three to four. Yes again!' },
        { say: 'So Amara gets thirty-six dollars, and Jun gets forty-eight dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'Iced tea',
      layout: 'split',
      leftWidth: 640,
      left: [tea('tt')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Iced tea is made by mixing concentrate and water in the ratio $1 : 4$. How much concentrate is in $2$ L of iced tea?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\text{ L} = 2{,}000 \\text{ mL}', '1 + 4 = 5 \\text{ parts}', '2{,}000 \\div 5 = 400 \\text{ mL}'] },
        { kind: 'text', id: 'a', size: 'md', md: '**$400$ mL** of concentrate, and $1{,}600$ mL of water.' },
      ],
      lines: [
        { say: 'Sharing works for mixing too. Iced tea is made by mixing concentrate and water in the ratio one to four. How much concentrate is in two litres of iced tea?', show: 'q' },
        { say: 'First, change the litres to millilitres, so the numbers are easier to share. A litre is one thousand millilitres, so two litres is two thousand millilitres.', show: 'm.0', focus: 'm.0' },
        { say: 'Draw the tape diagram: one block of concentrate and four blocks of water. That is one plus four, which is five parts, and together they make the two thousand millilitres.', show: ['tt.c', 'tt.w', 'tt.total', 'm.1'], focus: 'm.1' },
        { say: 'One part: two thousand divided by five is four hundred millilitres.', show: ['m.2', 'tt.c-v', 'tt.w-v'], focus: 'm.2' },
        { say: 'Concentrate is one part, so there are four hundred millilitres of concentrate. The water is four parts: one thousand six hundred millilitres.', show: 'a', focus: 'tt.c' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Add** the terms to find the number of equal parts: $3 + 4 = 7$.',
            '**Divide** the whole by the number of parts to find one part: $84 \\div 7 = 12$.',
            '**Multiply** to find each share: $3 \\times 12 = 36$ and $4 \\times 12 = 48$.',
            '**Check** that the shares add up to the whole.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the steps for sharing in a ratio. First, add the terms to find the number of equal parts.', show: 'b.0' },
        { say: 'Second, divide the whole by the number of parts, to find one part.', show: 'b.1' },
        { say: 'Third, multiply to find each share.', show: 'b.2' },
        { say: 'And fourth, check that the shares add up to the whole. A common mistake is to divide by just one of the terms, such as eighty-four divided by three. Divide by the total number of parts.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sam and Lee share \\$90 in the ratio $2 : 3$. How much does Lee get?',
          choices: ['\\$36', '\\$30', '\\$54', '\\$45'],
          answer: 2,
          working: 'There are $2 + 3 = 5$ parts, and $90 \\div 5 = 18$, so each part is \\$18. Lee gets $3 \\times 18 = 54$, so \\$54 (and Sam gets \\$36).',
        },
      ],
      lines: [
        { say: 'Your turn. Sam and Lee share ninety dollars in the ratio two to three. How much does Lee get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fifty-four dollars. There are two plus three, which is five parts, and ninety divided by five is eighteen. Lee gets three parts: three times eighteen is fifty-four. Choice A, thirty-six dollars, is the share that Sam gets.', show: 'q.answer' },
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
            'Add the terms to find the number of equal parts.',
            'Divide to find one part, then multiply for each share.',
            'Check: the shares add up to the whole, and they are in the right ratio.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To share an amount in a ratio, add the terms to find the number of equal parts.', show: 'sum.0' },
        { say: 'Divide to find one part, then multiply to find each share.', show: 'sum.1' },
        { say: 'And check that the shares add up to the whole. Great work with ratios and rates! Next, you will multiply and divide fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
