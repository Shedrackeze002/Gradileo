import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundred } from '@/content/math6/videos/lib/m6-12-figures.ts';

// A hundred phones: with a 15% chance of needing a repair, about 15 of them do (red).
const phones = (id: string) => figure(id, [hundred({ shaded: 15, tone: 'bad' })], 440);

const video: Explainer = {
  id: 'm9-10-4-e',
  lessonId: 'm9-10-4',
  title: 'Probability in Society, Part 5: Expected Cost',
  thumbnailTitle: 'Expected Cost',
  thumbnail: 'ph',
  summary:
    'A one-year warranty on a phone costs $49, a repair costs $240, and suppose the probability of needing a repair in the first year is 15%. Out of 100 phones, about 15 need a repair, costing 15 × $240 = $3,600, or $36 a phone. Expected cost = probability × cost = 0.15 × $240 = $36.00. The warranty costs $49, more than $36, so on average paying for repairs only when needed costs less; someone who could not afford a surprise repair bill might still choose the warranty.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 5', title: 'Expected Cost', subtitle: 'Is the warranty worth it?' }],
      lines: [
        { say: 'When you buy a phone, the store may offer a warranty. Should you pay for it? Probability can help you decide.', show: 'title' },
        { say: 'In this video, you will find an expected cost, and use it to make a decision about money.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'A one-year **warranty** on a phone costs **\\$49**. A repair costs **\\$240**. Suppose the probability of needing a repair in the first year is **15%**. Is the warranty worth it?',
        },
      ],
      lines: [
        { say: 'A warranty is a promise from the seller to fix the phone for free if it breaks. A one-year warranty on a phone costs forty-nine dollars.', show: 'q' },
        { say: 'Without the warranty, a repair costs two hundred forty dollars. Suppose the probability of needing a repair in the first year is fifteen percent.' },
        { say: 'Is the warranty worth forty-nine dollars? It depends on what you expect to spend on repairs.' },
      ],
    },
    {
      chapter: 'A hundred phones',
      layout: 'split',
      leftWidth: 520,
      left: [phones('ph')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['About **15** of every **100** phones need a repair.', 'Repairs: 15 × \\$240 = **\\$3,600**', 'Shared by 100 phones: \\$3,600 ÷ 100 = **\\$36** each'],
        },
      ],
      lines: [
        { say: 'Picture a hundred people who buy this phone, with no warranty. Each square is one phone.', show: 'ph' },
        { say: 'A fifteen percent chance means that about fifteen of the hundred phones need a repair in the first year. Those are the red squares.', show: 'b.0', focus: ['b.0', 'ph.shade'] },
        { say: 'Fifteen repairs at two hundred forty dollars each cost three thousand six hundred dollars in all.', show: 'b.1', focus: 'b.1' },
        { say: 'Share that total over all one hundred phones, and it is thirty-six dollars for each phone, on average.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Expected cost',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Expected cost', md: 'Expected cost = probability × cost' },
        { kind: 'text', id: 't', size: 'lg', md: '0.15 × \\$240 = **\\$36.00** per phone, on average' },
      ],
      lines: [
        { say: 'There is a quicker way to get the same answer. The expected cost equals the probability times the cost.', show: 'key' },
        { say: 'Multiply zero point one five by two hundred forty dollars, and you get thirty-six dollars. That is the expected repair cost for one phone, on average.', show: 't' },
      ],
    },
    {
      chapter: 'Making the decision',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Choice', 'Cost per phone'],
          rows: [
            ['Buy the warranty', '\\$49'],
            ['Pay for repairs only when needed', 'about \\$36 on average'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Not just the average', md: 'Someone who could **not** afford a surprise repair bill of \\$240 might still choose the warranty.' },
      ],
      lines: [
        { say: 'Now compare. The warranty costs forty-nine dollars. Paying for repairs only when needed costs about thirty-six dollars per phone, on average.', show: 't.0' },
        { say: 'Thirty-six dollars is less than forty-nine dollars. So on average, skipping the warranty and paying for repairs only when needed costs less.', show: 't.1', focus: 't.1' },
        { say: 'But an average is not the whole story. An unlucky buyer pays the full two hundred forty dollars. Someone who could not afford a surprise bill like that might still choose the warranty, for peace of mind.', show: 'tip' },
        { say: 'Probability gives you the facts. You still decide what matters most to you.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A \\$30 protection plan for a bike covers a repair that costs \\$150. Suppose the probability of needing that repair is $10\\%$. What is the expected repair cost, and which choice costs less on average?',
          choices: [
            '\\$15; the protection plan costs less on average.',
            '\\$15; paying for the repair only when needed costs less on average.',
            '\\$150; the protection plan costs less on average.',
            '\\$30; the two choices cost the same on average.',
          ],
          answer: 1,
          working: 'Expected cost $= 0.10 \\times 150 = 15$, so \\$15. That is less than the \\$30 plan, so paying for the repair only when needed costs less on average.',
        },
      ],
      lines: [
        { say: 'Your turn. A thirty dollar protection plan for a bike covers a repair that costs one hundred fifty dollars. Suppose the probability of needing that repair is ten percent. What is the expected repair cost, and which choice costs less on average? Pause the video and try it.', show: 'q', wait: 10 },
        { say: 'The answer is B. Zero point one times one hundred fifty dollars is fifteen dollars, which is less than the thirty dollar plan. Choice A has the right expected cost, but fifteen dollars is less than thirty, so the plan costs more on average, not less.', show: 'q.answer' },
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
            'Expected cost = probability × cost. For the phone: 0.15 × \\$240 = \\$36.',
            'Compare the expected cost with the price of a warranty or plan.',
            'On average, the cheaper choice wins, but people may still pay for peace of mind.',
            'A probability is never a promise: an unlucky buyer pays the full repair cost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The expected cost equals the probability times the cost. For the phone, that is thirty-six dollars.', show: 'sum.0' },
        { say: 'Compare the expected cost with the price of the warranty or plan.', show: 'sum.1' },
        { say: 'On average, the cheaper choice wins, but people may still pay for peace of mind.', show: 'sum.2' },
        { say: 'And a probability is never a promise. An unlucky buyer pays the full repair cost. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
