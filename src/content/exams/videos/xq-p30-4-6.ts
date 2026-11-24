import type { Explainer, HalflifeEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.6 (half-life): the age of the charcoal of an old campfire.
// The question is OpenStax College Physics 2e's own, word for word (a Problem for section 31.5,
// CC BY-NC-SA 4.0; Gradileo is non-commercial), and the half-life of carbon-14 is the book's own
// figure of 5730 years. After n half-lives (1/2)ⁿ = 1/2ⁿ of the carbon-14 is left. Less than
// 1/1000 means 2ⁿ > 1000; 2⁹ = 512 is too few and 2¹⁰ = 1024 is just enough, so at least 10
// half-lives: 10 × 5730 = 57 300 years, as in the book's answer.
// Check: (1/2)¹⁰ = 1/1024 ≈ 0.098%, below 0.1%; after 9 half-lives 1/512 ≈ 0.195% is still left.
//
// The picture is the sample of src/video/halflife.ts: 400 nuclei of carbon-14 decaying beside the
// graph of the amount left, run on for five half-lives (to 1/32).

/** Carbon-14 in the charcoal: still, then one half-life, then on to five. */
const carbon: HalflifeEl = {
  kind: 'halflife',
  id: 'c14',
  height: 340,
  halfLife: 5730,
  unit: 'years',
  name: 'carbon-14',
  span: 5,
  clips: { a: { phases: [{ dur: 4 }] }, b: { phases: [{ dur: 1 }, { dur: 6, to: 5730 }, { dur: 1 }] }, c: { phases: [{ dur: 1 }, { dur: 9, to: 28650 }, { dur: 1.5 }] } },
  poster: 'c',
  posterAt: 0.8,
  thumb: ['names', 'graph', 'halves'],
};

const QUESTION =
  'An old campfire is uncovered during an archaeological dig. Its charcoal is found to contain less than 1/1000 the normal amount of ¹⁴C. Estimate the minimum age of the charcoal, noting that 2¹⁰ = 1024.';

const video: Explainer = {
  id: 'xq-p30-4-6',
  lessonId: '',
  exam: {
    lesson: 'p30-4-6',
    source: 'OpenStax, College Physics 2e, Problem for section 31.5, Half-Life and Activity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/31-5-half-life-and-activity',
    question: QUESTION,
  },
  title: 'Exam Question: How Old Is the Campfire? (Half-Life and Carbon Dating)',
  thumbnailTitle: 'How Old Is the Campfire?',
  thumbnail: 'c14',
  summary:
    'A real test question, solved one small step at a time: the charcoal of an old campfire holds less than 1/1000 of the normal amount of carbon-14. Estimate its minimum age, noting that 2¹⁰ = 1024. We watch a sample of carbon-14 halve again and again, so that after n half-lives 1/2ⁿ of it is left. 2⁹ = 512 is too small and 2¹⁰ = 1024 is just over 1000, so at least 10 half-lives have passed: 10 × 5730 = 57 300 years. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Old Is the Campfire?', subtitle: 'Half-life, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about half-life and carbon dating. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            'An old campfire is uncovered during an archaeological dig. Its charcoal is found to contain less than $1/1000$ the normal amount of ${}^{14}\\text{C}$. Estimate the minimum age of the charcoal, noting that $2^{10} = 1024$.',
          answer: '$57\\,300$ years',
          working: '$2^{10} > 1000$, so at least $10$ half-lives: $10 \\times 5730 = 57\\,300$ years.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'An old campfire is uncovered during an archaeological dig. Its charcoal is found to contain less than one thousandth of the normal amount of carbon-14.', caption: 'An old campfire is uncovered during an archaeological dig. Its charcoal is found to contain less than 1/1000 the normal amount of carbon-14.' },
        { say: 'Estimate the minimum age of the charcoal, noting that 2 to the power of 10 is 1 thousand and 24.', caption: 'Estimate the minimum age of the charcoal, noting that 2¹⁰ = 1024.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [carbon, { kind: 'text', id: 't', size: 'md', md: 'A living tree holds the **normal** amount of carbon-14. Once it dies, the carbon-14 **decays** and is not replaced.' }],
      lines: [
        { say: 'Here is a sample of carbon-14, like the carbon-14 in the wood when the tree was alive. A living tree keeps taking in carbon, so it holds the normal amount.', show: ['c14', 'c14.names', 'c14.left'], play: 'c14.a' },
        { say: 'Once the tree dies and is burned, the carbon-14 decays and is not replaced. The less there is left, the older the charcoal. We must find how long it takes to fall below one thousandth.', caption: 'Once the tree dies and is burned, the carbon-14 decays and is not replaced. The less there is left, the older the charcoal. We must find how long it takes to fall below 1/1000.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['T_{1/2} = 5730 \\text{ years}', '\\text{after } n \\text{ half-lives: } \\left(\\dfrac{1}{2}\\right)^n = \\dfrac{1}{2^n} \\text{ is left}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A fixed fraction, not a fixed amount', md: 'In each half-life, **half of what is left** decays. So the amount is halved again and again, and never falls by the same amount each time.' },
      ],
      lines: [
        { say: 'Here is what we need. The book gives the half-life of carbon-14 as 5 thousand 730 years.', caption: 'Here is what we need. The book gives the half-life of carbon-14 as 5730 years.', show: 'f.0' },
        { say: 'After n half-lives, the fraction left is one half to the power of n, which is 1 over 2 to the power of n.', caption: 'After n half-lives, the fraction left is (½)ⁿ, which is 1/2ⁿ.', show: 'f.1' },
        { say: 'Because in each half-life, half of what is left decays. The amount is halved again and again.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Watch the fraction left: $\\dfrac{1}{2^n}$', 'Find the **smallest** $n$ with $2^n > 1000$', '**Multiply** $n$ by $5730$ years'] }],
      lines: [
        { say: 'Here is the plan. Watch how the fraction left falls, half-life by half-life.', show: 'plan.0' },
        { say: 'Find the smallest number of half-lives that takes it below one thousandth.', show: 'plan.1' },
        { say: 'Then multiply that number by the half-life.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Halving',
      layout: 'center',
      main: [carbon, { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{2},\\ \\dfrac{1}{4},\\ \\dfrac{1}{8},\\ \\dfrac{1}{16},\\ \\dfrac{1}{32},\\ \\ldots'] }],
      lines: [
        { say: 'Step one. Watch the sample for one half-life, 5 thousand 730 years. Half of the carbon-14 is left.', caption: 'Step one. Watch the sample for one half-life, 5730 years. Half of the carbon-14 is left.', show: ['c14', 'c14.names', 'c14.left', 'c14.graph', 'c14.ahead', 'c14.halves'], play: 'c14.b' },
        { say: 'Now run on to five half-lives. A quarter, an eighth, a sixteenth, and one thirty-second is left.', show: 'm', play: 'c14.c' },
      ],
    },
    {
      chapter: 'Step 2: How many half-lives?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{2^n} < \\dfrac{1}{1000} \\quad \\Rightarrow \\quad 2^n > 1000', '2^9 = 512 \\ (\\text{too small}), \\qquad 2^{10} = 1024 > 1000', 'n = 10'] }],
      lines: [
        { say: 'Step two. After five half-lives, one thirty-second is still far more than one thousandth. We want 1 over 2 to the n to be less than one thousandth, so 2 to the n must be more than a thousand.', caption: 'Step two. After five half-lives, 1/32 is still far more than 1/1000. We want 1/2ⁿ to be less than 1/1000, so 2ⁿ must be more than 1000.', show: 'm.0' },
        { say: '2 to the power of 9 is 512, which is too small. 2 to the power of 10 is 1 thousand and 24, which is just over a thousand.', caption: '2⁹ = 512, which is too small. 2¹⁰ = 1024, which is just over 1000.', show: 'm.1' },
        { say: 'So at least 10 half-lives have passed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The age',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = 10 \\times 5730 = \\good{57\\,300 \\text{ years}}'] }],
      lines: [
        { say: 'Step three. Ten half-lives of 5 thousand 730 years is 57 thousand 300 years. The charcoal is at least 57 thousand 300 years old.', caption: 'Step three. Ten half-lives of 5730 years is 57 300 years. The charcoal is at least 57 300 years old.', show: 'm.0', focus: 'm.0' },
        { say: 'It is a minimum, because the less carbon-14 is left, the older the charcoal, and we only know that less than one thousandth is left.', caption: 'It is a minimum, because the less carbon-14 is left, the older the charcoal, and we only know that less than 1/1000 is left.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10 \\text{ half-lives: } \\dfrac{1}{1024} \\approx 0.098\\% < 0.1\\% \\ \\checkmark', '9 \\text{ half-lives: } \\dfrac{1}{512} \\approx 0.195\\% > 0.1\\%'] }],
      lines: [
        { say: 'Let us check. After 10 half-lives, 1 over 1 thousand and 24 is left, about 0.098 percent. That is just below a thousandth, which is 0.1 percent.', caption: 'Let us check. After 10 half-lives, 1/1024 is left, about 0.098%. That is just below a thousandth, which is 0.1%.', show: 'm.0' },
        { say: 'After only 9 half-lives, 1 over 512 is left, about 0.195 percent, which is still too much. So 10 half-lives is right.', caption: 'After only 9 half-lives, 1/512 is left, about 0.195%, which is still too much. So 10 half-lives is right.', show: 'm.1', focus: 'm.0' },
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
            ['$51\\,570$ years', 'used $9$ half-lives: $2^9 = 512$ is **less** than $1000$'],
            ['$11\\,460$ years', 'thought it **all** decays in two half-lives: it **halves**'],
            ['$5\\,730\\,000$ years', 'multiplied by $1000$: count **half-lives**, not the fraction'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '51 thousand 570 years uses 9 half-lives. But 2 to the 9 is only 512, so more than a thousandth would still be left.', caption: '51 570 years uses 9 half-lives. But 2⁹ is only 512, so more than a thousandth would still be left.' },
        { say: '11 thousand 460 years thinks half goes in one half-life and the other half in the next. But each half-life takes half of what is left, so it never all goes.', caption: '11 460 years thinks half goes in one half-life and the other half in the next. But each half-life takes half of what is left, so it never all goes.' },
        { say: 'And 5.73 million years multiplies the half-life by a thousand. We count the half-lives that bring the amount down to a thousandth, which is only 10.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An old bone holds $\\dfrac{1}{16}$ of the normal amount of carbon-14. The half-life of carbon-14 is $5730$ years. How old is the bone?',
          choices: ['$22\\,920$ years', '$91\\,680$ years', '$28\\,650$ years', '$17\\,190$ years'],
          answer: 0,
          working: '$16 = 2^4$, so $4$ half-lives: $4 \\times 5730 = 22\\,920$ years.',
        },
      ],
      lines: [
        { say: 'Your turn. An old bone holds one sixteenth of the normal amount of carbon-14. How old is the bone? Pause the video and try it.', caption: 'Your turn. An old bone holds 1/16 of the normal amount of carbon-14. How old is the bone? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '16 is 2 to the power of 4, so 4 half-lives have passed. 4 times 5 thousand 730 is 22 thousand 920 years. Choice "A".', caption: '16 = 2⁴, so 4 half-lives have passed. 4 × 5730 = 22 920 years. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each half-life **halves** what is left', 'After $n$ half-lives, $\\dfrac{1}{2^n}$ is left', 'Find $n$, then **multiply** by the half-life', 'Less left means **older**'] }],
      lines: [
        { say: 'Here is what to remember. Each half-life halves what is left.', show: 'sum.0' },
        { say: 'After n half-lives, 1 over 2 to the n is left.', caption: 'After n half-lives, 1/2ⁿ is left.', show: 'sum.1' },
        { say: 'Find the number of half-lives, then multiply by the half-life.', show: 'sum.2' },
        { say: 'And the less is left, the older the sample. For more on half-life, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
