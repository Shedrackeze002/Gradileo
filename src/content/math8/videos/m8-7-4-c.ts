import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// What one friend pays for the pizza: a quarter of the cost, p/4, and $3 for a drink, $10 in all.
const share = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          {
            id: 'f',
            label: '\\text{Each friend}',
            pieces: [
              { w: 4, tex: '\\dfrac{p}{4}', tone: 'theta' },
              { w: 2, tex: '\\$3', tone: 'adj' },
            ],
          },
        ],
        total: '\\$10',
      }),
    ],
    210,
  );

// Hockey tickets: three friends each pay a ticket, t, and a $4 fee; $75 in all.
const tickets = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [0, 1, 2].map((k) => ({
          id: `r${k}`,
          label: `\\text{Friend ${k + 1}}`,
          pieces: [
            { w: 4, tex: 't', tone: 'theta' as const },
            { w: 1.6, tex: '\\$4', tone: 'adj' as const },
          ],
        })),
        total: '\\$75',
      }),
    ],
    300,
  );
const rows = (fig: string) => [0, 1, 2].flatMap((k) => [`${fig}.r${k}-p0`, `${fig}.r${k}-p1`, `${fig}.r${k}-label`]);

const video: Explainer = {
  id: 'm8-7-4-c',
  lessonId: 'm8-7-4',
  title: 'Solving Problems with Equations, Part 3: Sharing and Brackets',
  thumbnailTitle: 'Sharing and Brackets',
  thumbnail: 'tk',
  summary:
    'Equal shares mean dividing. Four friends share a pizza equally and each also pays $3 for a drink, $10 in all: p/4 + 3 = 10, so p/4 = 7 and p = 28; the pizza cost $28. Groups that are the same mean brackets. Three friends each pay a ticket price t plus a $4 fee, $75 in all: 3(t + 4) = 75, so t + 4 = 25 and t = 21; one ticket costs $21 before the fee. Check that each answer makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 3', title: 'Sharing and Brackets', subtitle: 'Equal shares and equal groups' }],
      lines: [
        { say: 'When friends split a bill, or each buy the same things, the equation often has a division or brackets in it.', show: 'title' },
        { say: 'In this part, you will write and solve equations for sharing problems, and for problems with equal groups.' },
      ],
    },
    {
      chapter: 'Sharing a pizza',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Four friends share the cost of a pizza equally. Each one also pays \\$3 for a drink, and each friend pays \\$10 in total. How much did the pizza cost?' },
        share('sh'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{p}{4} + 3 = 10 \\qquad \\dfrac{p}{4} = 7 \\qquad p = 28', '\\text{Check: } 28 \\div 4 = 7, \\quad 7 + 3 = 10 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Four friends share the cost of a pizza equally. Each one also pays three dollars for a drink, and each friend pays ten dollars in total. How much did the pizza cost?', show: 'q' },
        { say: 'Let p stand for the cost of the pizza, in dollars. Shared equally by four friends, each share is p over four. Add the three dollar drink, and each friend pays ten dollars.', show: ['sh.f-p0', 'sh.f-p1', 'sh.f-label', 'sh.total'] },
        { say: 'So p over four, plus three, equals ten. Subtract three from both sides: p over four equals seven. Multiply both sides by four: p equals twenty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Check in the problem. Twenty-eight dollars shared by four is seven dollars each, and seven plus three is ten. It works. The pizza cost twenty-eight dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hockey tickets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Three friends each buy a hockey ticket and pay a \\$4 service fee per ticket. They spend \\$75 in total. What is the price of one ticket before the fee?' },
        tickets('tk'),
        { kind: 'math', id: 'm', size: 'md', lines: ['3(t + 4) = 75 \\qquad t + 4 = 25 \\qquad t = 21', '\\text{Check: } 21 + 4 = 25, \\quad 3 \\times 25 = 75 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Three friends each buy a hockey ticket, and pay a four-dollar service fee for each ticket. They spend seventy-five dollars in total. What is the price of one ticket before the fee?', show: 'q' },
        { say: 'Let t stand for the price of one ticket, in dollars. Each friend pays t plus four, and there are three friends: three equal groups.', show: [...rows('tk'), 'tk.total'] },
        { say: 'So three times the bracket t plus four equals seventy-five. Seventy-five divides evenly by three, so divide first: t plus four equals twenty-five. Subtract four: t equals twenty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'Check in the problem. Twenty-one plus four is twenty-five dollars for each friend, and three times twenty-five is seventy-five. It works. One ticket costs twenty-one dollars before the fee.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'A ticket that costs more than the total, or a negative number of hours, is a sign of a mistake. Read the question again and check your equation.' }],
      lines: [
        { say: 'Before you finish, ask: does the answer make sense?', show: 'tip' },
        { say: 'A ticket that costs more than the seventy-five dollar total would make no sense. Neither would a negative number of hours, or a pizza that costs less than one share of it.' },
        { say: 'If your answer looks strange, read the question again, and check that your equation says the same thing as the words.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five friends share the cost of a gift equally, and each also pays \\$2 for a card. Each friend pays \\$9 in total. How much did the gift cost?',
          choices: ['\\$55', '\\$45', '\\$35', '\\$7'],
          answer: 2,
          working: 'Let $g$ be the cost of the gift: $\\dfrac{g}{5} + 2 = 9$, so $\\dfrac{g}{5} = 7$ and $g = 35$. Check: $35 \\div 5 = 7$, and $7 + 2 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five friends share the cost of a gift equally, and each also pays two dollars for a card. Each friend pays nine dollars in total. How much did the gift cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, thirty-five dollars. The equation is g over five, plus two, equals nine. So g over five is seven, and g is thirty-five. Choice D is one friend’s share of the gift, not the cost of the whole gift.', show: 'q.answer' },
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
            'Equal shares mean dividing: $\\dfrac{p}{4} + 3 = 10$, so $p = 28$.',
            'Equal groups mean brackets: $3(t + 4) = 75$, so $t = 21$.',
            'Check the answer in the problem.',
            'Ask whether the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Equal shares mean dividing. The pizza cost twenty-eight dollars.', show: 'sum.0' },
        { say: 'Equal groups mean brackets. One ticket cost twenty-one dollars before the fee.', show: 'sum.1' },
        { say: 'Always check the answer in the problem.', show: 'sum.2' },
        { say: 'And ask whether it makes sense. Well done: you can now turn real problems into equations and solve them!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
