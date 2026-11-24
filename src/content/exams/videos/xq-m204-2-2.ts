import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 2.2 (sales, discounts and taxes). The question is an Exercise
// from OpenStax Prealgebra 2e, word for word (section 6.3, Solve Sales Tax, Commission, and Discount
// Applications, CC BY-NC-SA 4.0). (a) 195 − 20 = 175, and 75% of 175 = $131.25. (b) 75% of 195 =
// 146.25, and 146.25 − 20 = $126.25. (c) 25% off first, as in the book's answers. Check: the
// difference, $5, is 25% of the $20 coupon.

const QUESTION =
  'Coupons Yvonne can use two coupons for the same purchase at her favorite department store. One coupon gives her $20 off and the other gives her 25% off. She wants to buy a bedspread that sells for $195. (a) Calculate the discount price if Yvonne uses the $20 coupon first and then takes 25% off. (b) Calculate the discount price if Yvonne uses the 25% off coupon first and then uses the $20 coupon. (c) In which order should Yvonne use the coupons?';

const video: Explainer = {
  id: 'xq-m204-2-2',
  lessonId: '',
  exam: {
    lesson: 'm204-2-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.3, Solve Sales Tax, Commission, and Discount Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-3-solve-sales-tax-commission-and-discount-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Which Coupon Goes First? (Sales and Discounts)',
  thumbnailTitle: 'Which Coupon Goes First?',
  summary:
    'A real test question, solved one small step at a time: Yvonne has a $20 off coupon and a 25% off coupon for a $195 bedspread. With $20 off first, she pays 75% of $175 = $131.25. With 25% off first, she pays $146.25 − $20 = $126.25. So she should take 25% off first. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Coupon Goes First?', subtitle: 'Discounts, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about discounts. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt:
            '**Coupons** Yvonne can use two coupons for the same purchase at her favorite department store. One coupon gives her \\$20 off and the other gives her $25\\%$ off. She wants to buy a bedspread that sells for \\$195. (a) Calculate the discount price if Yvonne uses the \\$20 coupon first and then takes $25\\%$ off. (b) Calculate the discount price if Yvonne uses the $25\\%$ off coupon first and then uses the \\$20 coupon. (c) In which order should Yvonne use the coupons?',
          answer: '(a) \\$131.25 (b) \\$126.25 (c) $25\\%$ off first, then \\$20 off',
          working: '(a) 0.75 × 175 = 131.25 (b) 0.75 × 195 − 20 = 126.25',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Yvonne can use two coupons on the same purchase. One gives her 20 dollars off, and the other gives her 25 percent off. She wants to buy a bedspread that sells for 195 dollars.', caption: 'Yvonne can use two coupons on the same purchase. One gives her $20 off, and the other gives her 25% off. She wants to buy a bedspread that sells for $195.' },
        { say: 'Part a: find the price if she uses the 20 dollar coupon first, then takes 25 percent off. Part b: find the price if she takes 25 percent off first, then uses the 20 dollar coupon. Part c: in which order should she use them?', caption: 'Part (a): the price with the $20 coupon first, then 25% off. Part (b): 25% off first, then the $20 coupon. Part (c): in which order should she use them?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Two kinds of coupon', md: '\\$20 off always takes off the **same** \\$20. $25\\%$ off takes off a **quarter of the price it is used on**, so it depends on the price.' },
        { kind: 'callout', id: 'b', tone: 'key', title: 'Order matters', md: 'The second coupon works on the price **after** the first one.' },
      ],
      lines: [
        { say: 'There are two kinds of coupon. 20 dollars off always takes off the same 20 dollars. But 25 percent off takes off a quarter of whatever price it is used on.', show: 'a' },
        { say: 'And the second coupon works on the price after the first one. So the order might change the final price. Let us find out.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['25\\% \\text{ off} \\ \\Rightarrow \\ \\text{pay } 75\\%', '\\text{price after} = 0.75 \\times \\text{price}'] },
      ],
      lines: [
        { say: 'Here is what we need. If 25 percent comes off, you pay the other 75 percent.', show: 'm.0' },
        { say: 'So the price after the discount is 0.75 times the price. That does it in one step.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **\\$20** off, then **$25\\%$** off', '(b) **$25\\%$** off, then **\\$20** off', '(c) Pick the **lower** price'] }],
      lines: [
        { say: 'Here is the plan. For part a, take off 20 dollars, then 25 percent.', show: 'plan.0' },
        { say: 'For part b, take off 25 percent, then 20 dollars.', show: 'plan.1' },
        { say: 'For part c, pick the order that gives the lower price.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): $20 off first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$195 - \\$20 = \\$175', '0.75 \\times \\$175 = \\good{\\$131.25}'] }],
      lines: [
        { say: 'Part a. First the 20 dollar coupon: 195 minus 20 is 175 dollars.', caption: 'Part (a). First the $20 coupon: $195 − $20 = $175.', show: 'm.0' },
        { say: 'Then 25 percent off, so she pays 75 percent of 175 dollars. 0.75 times 175 is 131 dollars and 25 cents.', caption: 'Then 25% off, so she pays 75% of $175. 0.75 × $175 = $131.25.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Part (b): 25% off first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.75 \\times \\$195 = \\$146.25', '\\$146.25 - \\$20 = \\good{\\$126.25}'] }],
      lines: [
        { say: 'Part b. First 25 percent off: 0.75 times 195 is 146 dollars and 25 cents.', caption: 'Part (b). First 25% off: 0.75 × $195 = $146.25.', show: 'm.0' },
        { say: 'Then the 20 dollar coupon: 146.25 minus 20 is 126 dollars and 25 cents.', caption: 'Then the $20 coupon: $146.25 − $20 = $126.25.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Part (c): The better order',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$126.25 < \\$131.25', '\\good{25\\% \\text{ off first, then } \\$20 \\text{ off}}'] }],
      lines: [
        { say: 'Part c. 126 dollars 25 is less than 131 dollars 25, so Yvonne should take 25 percent off first, then use the 20 dollar coupon. She saves 5 dollars more that way.', caption: 'Part (c). $126.25 is less than $131.25, so Yvonne should take 25% off first, then use the $20 coupon. She saves $5 more that way.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The reason: 25 percent of a bigger price is a bigger discount. Used first, it works on the full 195 dollars.', caption: 'The reason: 25% of a bigger price is a bigger discount. Used first, it works on the full $195.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$131.25 - \\$126.25 = \\$5', '25\\% \\text{ of } \\$20 = \\$5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The two prices differ by 5 dollars.', caption: 'Let us check. The two prices differ by $5.', show: 'm.0' },
        { say: 'In part a, the 25 percent works on 20 dollars less, and 25 percent of 20 dollars is exactly 5 dollars. It checks out.', caption: 'In part (a), the 25% works on $20 less, and 25% of $20 is exactly $5. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['\\$150', 'took off **\\$25**, not $25\\%$'],
            ['(a) \\$43.75', 'that is the **discount**, not the price she pays'],
            ['"Order doesn’t matter"', 'the second coupon works on the **new** price'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '150 dollars takes off 20 dollars and 25 dollars. But the second coupon is 25 percent, not 25 dollars.', caption: '$150 takes off $20 and $25. But the second coupon is 25 percent, not 25 dollars.' },
        { say: '43 dollars 75 is 25 percent of 175. That is the discount, not the price she pays. Subtract it, or use 75 percent.', caption: '$43.75 is 25% of $175. That is the discount, not the price she pays. Subtract it, or use 75%.' },
        { say: 'And saying the order does not matter forgets that the second coupon works on the price after the first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A jacket costs \\$80. You have a \\$10 off coupon and a $20\\%$ off coupon. What is the lowest price you can pay using both?',
          choices: ['\\$54', '\\$56', '\\$50', '\\$62'],
          answer: 0,
          working: '20% off first: 0.8 × 80 = 64, then 64 − 10 = 54. The other way: 0.8 × 70 = 56.',
        },
      ],
      lines: [
        { say: 'Your turn. A jacket costs 80 dollars. You have a 10 dollar off coupon and a 20 percent off coupon. What is the lowest price you can pay using both? Pause the video and try it.', caption: 'Your turn. A jacket costs $80. You have a $10 off coupon and a 20% off coupon. What is the lowest price you can pay using both? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Take 20 percent off first: 0.8 times 80 is 64. Then 10 dollars off makes 54 dollars. The other order gives 56. Choice "A".', caption: 'Take 20% off first: 0.8 × $80 = $64. Then $10 off makes $54. The other order gives $56. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$25\\%$ off means pay $75\\%$', 'The second coupon works on the **new** price', 'Use the **percent** coupon first', 'The discount is not the **price**'] }],
      lines: [
        { say: 'Here is what to remember. 25 percent off means you pay 75 percent.', show: 'sum.0' },
        { say: 'The second coupon works on the new price.', show: 'sum.1' },
        { say: 'With a dollar coupon and a percent coupon, use the percent coupon first.', show: 'sum.2' },
        { say: 'And the discount is not the price you pay. For more on sales, discounts and taxes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
