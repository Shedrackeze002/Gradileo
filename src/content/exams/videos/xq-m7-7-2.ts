import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { parallelogram } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Exam question for Math 7 lesson 7.2 (area of a parallelogram). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.6, Area, CC BY-NC-SA 4.0); its
// figure shows a base of 25 ft and a height of 12 ft. Area = 25 × 12 = 300 ft², half is 150 ft²,
// 150 ÷ 25 = 6 bags, and 6 × $50 = $300.

const QUESTION =
  'You want to install sod on one-half of your parallelogram-shaped backyard as shown. The patio covers the other half. Sod costs $50 a bag and covers 25 ft². How much will it cost to buy the sod? (The figure shows the backyard with a base of 25 feet and a height of 12 feet.)';

const yard = (id: string) => figure(id, [parallelogram({ b: 5, h: 2.4, s: 1.4, labels: { b: '25 \\text{ ft}', h: '12 \\text{ ft}' } })], 380);

const video: Explainer = {
  id: 'xq-m7-7-2',
  lessonId: '',
  exam: {
    lesson: 'm7-7-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.6, Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area',
    question: QUESTION,
  },
  title: 'Exam Question: Sod for Half a Backyard (Area of a Parallelogram)',
  thumbnailTitle: 'Sod for Half a Backyard',
  thumbnail: 'yd',
  summary:
    'A real test question, solved one small step at a time: sod will cover half of a parallelogram-shaped backyard with a base of 25 feet and a height of 12 feet. A bag of sod costs $50 and covers 25 square feet. What does the sod cost? The yard\'s area is base × height = 25 × 12 = 300 ft², so half is 150 ft². That needs 150 ÷ 25 = 6 bags, and 6 × $50 = $300. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sod for Half a Backyard', subtitle: 'Area of a parallelogram, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area of a parallelogram. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'You want to install sod on one-half of your parallelogram-shaped backyard as shown. The patio covers the other half. Sod costs \\$50 a bag and covers $25$ ft². How much will it cost to buy the sod?',
          answer: '\\$300',
          working: '25 × 12 = 300 ft², half is 150 ft², 150 ÷ 25 = 6 bags, 6 × \\$50 = \\$300',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You want to install sod on one half of your parallelogram shaped backyard, as shown. The patio covers the other half. Sod costs 50 dollars a bag, and covers 25 square feet. How much will it cost to buy the sod?', caption: 'You want to install sod on one-half of your parallelogram-shaped backyard as shown. The patio covers the other half. Sod costs $50 a bag and covers 25 ft². How much will it cost to buy the sod?' },
        { say: 'The book\'s figure shows the yard with a base of 25 feet and a height of 12 feet. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [yard('yd')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Sod', md: '**Sod** is grass that comes ready-grown in rolls. We need enough to cover **half** the yard\'s **area**. Each bag covers $25$ ft² and costs \\$50, so we find how many **bags**, then the **cost**.' }],
      lines: [
        { say: 'Here is the backyard: a parallelogram with a base of 25 feet and a height of 12 feet. Sod is grass that comes ready grown, in rolls, and we need enough to cover half of the yard\'s area.', show: ['yd.shape', 'yd.base', 'yd.h0', 'c'] },
        { say: 'Each bag covers 25 square feet and costs 50 dollars. So we find how many bags we need, and then what they cost.', caption: 'Each bag covers 25 ft² and costs $50. So we find how many bags we need, and then what they cost.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = b \\times h', '\\text{height: straight up, not the slanted side}'] }],
      lines: [
        { say: 'Here is what we need. The area of a parallelogram is its base times its height.', show: 'm.0' },
        { say: 'The height is the straight up distance between the base and the top, at a right angle. It is not the slanted side.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **area** of the yard', 'Take **half** of it', 'Find the number of **bags**, then the **cost**'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the whole yard.', show: 'plan.0' },
        { say: 'Take half of it, for the sod.', show: 'plan.1' },
        { say: 'Then find the number of bags, and the cost.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 4: Area, half, bags, cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = 25 \\times 12 = 300 \\text{ ft}^2', '300 \\div 2 = \\adj{150 \\text{ ft}^2}', '150 \\div 25 = \\opp{6 \\text{ bags}}', '6 \\times 50 = \\good{\\$300}'] }],
      lines: [
        { say: 'Step one. The area of the yard is base times height: 25 times 12. 25 times 12 is 300, so the yard is 300 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The sod covers half of it. 300 divided by 2 is 150 square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Each bag covers 25 square feet. 150 divided by 25 is 6, so we need 6 bags.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four. Each bag costs 50 dollars. 6 times 50 is 300. The sod costs 300 dollars.', caption: 'Step four. Each bag costs $50. 6 × $50 = $300. The sod costs $300.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 25 = 150 \\text{ ft}^2 \\ \\checkmark', '\\$50 \\text{ for } 25 \\text{ ft}^2 = \\$2 \\text{ per ft}^2: \\ 150 \\times 2 = \\$300 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 6 bags of 25 square feet cover 150 square feet, exactly half the yard.', show: 'm.0' },
        { say: 'Another way: 50 dollars for 25 square feet is 2 dollars for each square foot. 150 square feet at 2 dollars each is 300 dollars. It checks out.', caption: 'Another way: $50 for 25 ft² is $2 per square foot. 150 ft² at $2 each is $300. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$600', 'covered the **whole** yard: the patio takes **half**'],
            ['\\$7500', 'multiplied the area by \\$50: each bag covers **$25$ ft²**'],
            ['\\$150', 'took the area as dollars: find the number of **bags** first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '600 dollars buys sod for the whole yard, 12 bags. The patio covers half, so only 6 bags are needed.', caption: '$600 buys sod for the whole yard, 12 bags. The patio covers half, so only 6 bags are needed.' },
        { say: '7 thousand 500 dollars pays 50 dollars for every square foot. But 50 dollars buys a bag that covers 25 square feet.', caption: '$7500 pays $50 for every square foot. But $50 buys a bag that covers 25 ft².' },
        { say: 'And 150 dollars treats the 150 square feet as dollars. Find the number of bags first, then the cost.', caption: '$150 treats the 150 ft² as dollars. Find the number of bags first, then the cost.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A floor shaped like a parallelogram has a base of $12$ ft and a height of $10$ ft. A box of tiles covers $15$ ft² and costs \\$40. How much do the tiles for the whole floor cost?',
          choices: ['\\$4800', '\\$320', '\\$160', '\\$300'],
          answer: 1,
          working: 'Area 12 × 10 = 120 ft². 120 ÷ 15 = 8 boxes. 8 × \\$40 = \\$320.',
        },
      ],
      lines: [
        { say: 'Your turn. A floor shaped like a parallelogram has a base of 12 feet and a height of 10 feet. A box of tiles covers 15 square feet and costs 40 dollars. How much do the tiles for the whole floor cost? Pause the video and try it.', caption: 'Your turn. A floor shaped like a parallelogram has a base of 12 ft and a height of 10 ft. A box of tiles covers 15 ft² and costs $40. How much do the tiles for the whole floor cost? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The area is 12 times 10, which is 120 square feet. 120 divided by 15 is 8 boxes, and 8 times 40 dollars is 320 dollars. Choice "B".', caption: 'The area is 12 × 10 = 120 ft². 120 ÷ 15 = 8 boxes, and 8 × $40 = $320. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area $=$ **base $\\times$ height**', 'Use the **straight-up** height', 'Area $\\div$ coverage $=$ number of **bags**', 'Bags $\\times$ price $=$ **cost**'] }],
      lines: [
        { say: 'Here is what to remember. The area of a parallelogram is base times height.', show: 'sum.0' },
        { say: 'Use the straight up height, not the slanted side.', show: 'sum.1' },
        { say: 'Divide the area by what one bag covers to find the number of bags.', show: 'sum.2' },
        { say: 'And multiply by the price to find the cost. For more on the area of a parallelogram, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
