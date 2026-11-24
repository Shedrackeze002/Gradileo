import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 8.3 (distance, speed and time). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 9.7, Solve a Formula for a Specific Variable, CC
// BY-NC-SA 4.0). d = rt, so r = d ÷ t = 22 ÷ 1.5 = 14.666... ≈ 14.7 miles per hour, as in the book's
// answer. Check: 14.7 × 1.5 = 22.05 ≈ 22 miles.

const QUESTION =
  'The Catalina Express takes 1 1/2 hours to travel from Long Beach to Catalina Island, a distance of 22 miles. To the nearest tenth, what is the speed of the boat?';

const video: Explainer = {
  id: 'xq-m204-8-3',
  lessonId: '',
  exam: {
    lesson: 'm204-8-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.7, Solve a Formula for a Specific Variable',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-7-solve-a-formula-for-a-specific-variable',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Is the Ferry? (Distance, Speed and Time)',
  thumbnailTitle: 'How Fast Is the Ferry?',
  summary:
    'A real test question, solved one small step at a time: a ferry takes 1½ hours to travel 22 miles from Long Beach to Catalina Island. What is its speed, to the nearest tenth? From d = rt, the speed is r = d ÷ t = 22 ÷ 1.5 = 14.66…, about 14.7 miles per hour. Then we check by multiplying back, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Is the Ferry?', subtitle: 'Distance, speed and time, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about distance, speed and time. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The Catalina Express takes $1\\tfrac{1}{2}$ hours to travel from Long Beach to Catalina Island, a distance of $22$ miles. To the nearest tenth, what is the speed of the boat?',
          answer: 'about $14.7$ miles per hour',
          working: '22 ÷ 1.5 = 14.66… ≈ 14.7',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The Catalina Express is a ferry. It takes one and a half hours to travel from Long Beach to Catalina Island, a distance of 22 miles. To the nearest tenth, what is the speed of the boat?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Speed', md: '**Speed** (or **rate**) is the distance travelled in **one** unit of time. Here: how many **miles** the boat goes in **one hour**.' }],
      lines: [
        { say: 'Speed, also called rate, is the distance travelled in one unit of time.', show: 'c' },
        { say: 'Here it means: how many miles does the boat go in one hour?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['d = r \\times t', 'r = \\dfrac{d}{t}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Mixed numbers', md: 'Write the time as a **decimal** first: $1\\tfrac{1}{2}$ hours $= 1.5$ hours.' },
      ],
      lines: [
        { say: 'Here is what we need. Distance is rate times time.', show: 'm.0' },
        { say: 'To find the rate, undo the multiplying: divide the distance by the time.', show: 'm.1' },
        { say: 'Write the time as a decimal first. One and a half hours is 1.5 hours.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $1\\tfrac{1}{2}$ hours as $1.5$', '**Divide** the distance by the time', 'Round to the nearest **tenth**'] }],
      lines: [
        { say: 'Here is the plan. Write one and a half hours as 1.5.', show: 'plan.0' },
        { say: 'Divide the distance by the time.', show: 'plan.1' },
        { say: 'Then round to the nearest tenth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The speed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = 1\\tfrac{1}{2} = 1.5 \\text{ h}', 'r = \\dfrac{22}{1.5} = 14.6\\underline{6}6\\ldots', 'r \\approx \\good{14.7 \\text{ mph}}'] }],
      lines: [
        { say: 'Step one. One and a half hours is 1.5 hours.', show: 'm.0' },
        { say: 'Step two. 22 divided by 1.5 is 14.666, and so on.', show: 'm.1' },
        { say: 'Step three. The hundredths digit is 6, so round up. The boat travels about 14.7 miles per hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = r \\times t', '14.7 \\times 1.5 = 22.05 \\approx 22 \\text{ miles} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. Distance is rate times time.', show: 'm.0' },
        { say: '14.7 times 1.5 is 22.05, which is about 22 miles. It is a little over only because we rounded. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$33$ mph', '**multiplied**: speed is distance **divided** by time'],
            ['$0.1$ mph', 'divided the wrong way: $1.5 \\div 22$'],
            ['$14.6$ mph', 'cut off: $14.66\\ldots$ **rounds up** to $14.7$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '33 multiplies 22 by 1.5. That would mean the boat goes further in one hour than in the whole trip.' },
        { say: '0.1 divides the time by the distance, the wrong way round. That is hours per mile, not miles per hour.' },
        { say: 'And 14.6 cuts off the digits. The next digit is 6, so round up to 14.7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A truck travels $315$ km in $3\\tfrac{1}{2}$ hours. What is its average speed?',
          choices: ['$1{,}102.5$ km/h', '$90$ km/h', '$0.01$ km/h', '$105$ km/h'],
          answer: 1,
          working: '315 ÷ 3.5 = 90.',
        },
      ],
      lines: [
        { say: 'Your turn. A truck travels 315 kilometres in three and a half hours. What is its average speed? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Three and a half hours is 3.5 hours. 315 divided by 3.5 is 90 kilometres per hour. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$d = r \\times t$', 'Speed $=$ distance $\\div$ time', 'Mixed numbers to **decimals** first', '**Check** by multiplying back'] }],
      lines: [
        { say: 'Here is what to remember. Distance is rate times time.', show: 'sum.0' },
        { say: 'So speed is distance divided by time.', show: 'sum.1' },
        { say: 'Change mixed numbers to decimals first.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on distance, speed and time, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
