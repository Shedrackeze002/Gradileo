import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tip } from './lib/m7-6-figures.ts';

const G = [0, 1, 2];
const fifteen = G.map((g) => ({ id: `g${g}`, count: 5, tone: g % 2 ? ('opp' as const) : ('theta' as const) }));

// After step 2 of Jun's work: three bags balance 15 marbles (level, named ok). After step 3, the
// left was divided by 3 but the right was not: one bag against 15 marbles tips down on the right
// (named bad).
const steps = (id: string) =>
  figure(
    id,
    [
      balance({ name: 'ok', tex: 'x', perRow: 5, left: { bags: 3 }, right: { marbles: fifteen }, labels: ['3x', '15'] }),
      shift(tip(balance({ name: 'bad', tex: 'x', perRow: 5, left: { bags: 1 }, right: { marbles: fifteen }, labels: ['x', '15'] }), { name: 'bad', down: 'right', slope: 0.12 }), 12.5, 0),
    ],
    320,
  );
const show = (id: string, name: string) => [`${id}.${name}-stand`, `${id}.${name}-lbags`, `${id}.${name}-labels`, ...G.map((g) => `${id}.${name}-r-g${g}`)];

const video: Explainer = {
  id: 'm7-6-2-d',
  lessonId: 'm7-6-2',
  title: 'Preserving Equality, Part 4: Finding a Mistake',
  thumbnailTitle: 'Finding a Mistake',
  thumbnail: 'st',
  summary:
    'A wrong answer often comes from one step where the two sides were treated differently. Jun solved 3x + 6 = 21 and got x = 15, but 3(15) + 6 = 51: in Step 3, only the left side was divided by 3. Dividing both sides gives x = 5, and 3(5) + 6 = 21. Substitute your answer to check, and look for the step where the balance tipped.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 4', title: 'Finding a Mistake', subtitle: 'Where did the balance tip?' }],
      lines: [
        { say: 'Jun solved an equation, step by step, but the answer came out wrong. Can you find the step where it went wrong?', show: 'title' },
        { say: 'In this video, you will check each step of a solution, and find the step where the two sides were not treated the same way.' },
      ],
    },
    {
      chapter: 'Jun’s solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Jun solved $3x + 6 = 21$ like this:' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Step 1: } 3x + 6 - 6 = 21 - 6', '\\text{Step 2: } 3x = 15', '\\text{Step 3: } \\dfrac{3x}{3} = 15', '\\text{Step 4: } x = 15'] },
      ],
      lines: [
        { say: 'Here is how Jun solved three x plus six equals twenty-one.', show: 'q' },
        { say: 'In step one, Jun subtracted six. In step two, Jun wrote three x equals fifteen.', show: ['m.0', 'm.1'] },
        { say: 'In step three, Jun divided by three. And in step four, Jun got x equals fifteen.', show: ['m.2', 'm.3'] },
        { say: 'Is that right? Before looking at each step, let’s check the answer.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['3(15) + 6', '= 45 + 6', '= 51 \\quad \\bad{\\text{not } 21}'] }],
      lines: [
        { say: 'Put fifteen back in place of x in the first equation: three times fifteen, plus six.', show: 'm.0' },
        { say: 'Three times fifteen is forty-five, and forty-five plus six is fifty-one.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'But the right side of the equation is twenty-one, not fifty-one. So something went wrong. Somewhere, the balance tipped.' },
      ],
    },
    {
      chapter: 'Find the step',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 3x + 6 - 6 = 21 - 6 \\quad \\good{\\checkmark}', '\\text{Step 2: } 3x = 15 \\quad \\good{\\checkmark}', '\\text{Step 3: } \\dfrac{3x}{3} = 15 \\quad \\bad{\\text{only one side!}}'] },
        steps('bs'),
      ],
      lines: [
        { say: 'Now check each step. Ask: was the same thing done to both sides?', show: 'm.0' },
        { say: 'Step one subtracts six from both sides. That keeps the balance level. And step two is right as well: twenty-one minus six is fifteen. Three bags balance fifteen marbles.', show: ['m.1', ...show('bs', 'ok')], focus: 'm.1' },
        { say: 'Step three divides the left side by three, but not the right side. Only one bag is left on the left pan, but there are still fifteen marbles on the right.', show: ['m.2', ...show('bs', 'bad')], focus: 'm.2' },
        { say: 'One bag cannot balance all fifteen marbles, if three bags did. The balance tips. The mistake is in step three.' },
      ],
    },
    {
      chapter: 'Fix it',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3x}{3} = \\dfrac{15}{3}', 'x = 5', '\\text{Check: } 3(5) + 6 = 15 + 6 = 21 \\;\\checkmark'] }],
      lines: [
        { say: 'To fix it, divide both sides by three. Three x divided by three is x, and fifteen divided by three is five.', show: 'm.0', focus: 'm.0' },
        { say: 'So x equals five.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: three times five is fifteen, and fifteen plus six is twenty-one. That matches the equation, so x equals five is correct.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Substitute to check',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Substitute to check', md: 'Put your answer back into the **original** equation. If the two sides are not equal, look for the step where the balance tipped: the step where the two sides were treated differently.' }],
      lines: [
        { say: 'Here is a habit that catches many mistakes. When you finish solving an equation, put your answer back into the original equation.', show: 'tip' },
        { say: 'If the two sides are equal, your answer is right. If they are not, go back through your steps, and look for the one where the two sides were treated differently.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Leo solved $4x + 8 = 20$. Step 1: $4x + 8 - 8 = 20 - 8$. Step 2: $4x = 20$. Step 3: $\\dfrac{4x}{4} = \\dfrac{20}{4}$. Step 4: $x = 5$. Where is the mistake?',
          choices: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
          answer: 1,
          working: 'Check: $4(5) + 8 = 28$, not $20$. Step 1 subtracts $8$ from both sides, but in Step 2 the right side is still $20$: it should be $20 - 8 = 12$. Then $4x = 12$ and $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Leo solved four x plus eight equals twenty. Look at the four steps on the screen. Where is the mistake? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, step two. Step one subtracts eight from both sides, but in step two the right side is still twenty. It should be twenty minus eight, which is twelve, so x equals three. Choice C is not the mistake: step three divides both sides by four.', show: 'q.answer' },
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
          items: ['Check a solution by putting it back into the original equation.', 'If the sides are not equal, check each step: was the same thing done to both sides?', 'The mistake is where the balance tipped.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Check a solution by putting it back into the original equation.', show: 'sum.0' },
        { say: 'If the two sides are not equal, check each step. Was the same thing done to both sides?', show: 'sum.1' },
        { say: 'The mistake is the step where the balance tipped. In the next lesson, you will solve equations with inverse operations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
