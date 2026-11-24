import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 6.3 (time and temperature). The question is an exercise from
// OpenStax Contemporary Mathematics, word for word (section 9.5, Measuring Temperature,
// CC BY-NC-SA 4.0). The liquid rises 1.5 × 10 = 15 °C in 10 minutes, so it reaches 15 + 15 = 30 °C.
// Check: after 2 minutes it is 18 °C, and every 2 minutes adds 3 °C, so 10 minutes adds 15 °C.

const QUESTION =
  'A liquid with a temperature of 15 °C is placed on a stovetop. The liquid is heated at the rate of 1.5 °C per minute. What is the temperature of the liquid after 10 minutes?';

const video: Explainer = {
  id: 'xq-m104-6-3',
  lessonId: '',
  exam: {
    lesson: 'm104-6-3',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 9.5, Measuring Temperature',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-5-measuring-temperature',
    question: QUESTION,
  },
  title: 'Exam Question: Heating a Liquid on the Stove (Time and Temperature)',
  thumbnailTitle: 'Heating a Liquid on the Stove',
  summary:
    'A real test question, solved one small step at a time: a liquid at 15 °C is heated at 1.5 °C per minute. What is its temperature after 10 minutes? The rise is 1.5 × 10 = 15 °C, and we add it to the starting temperature: 15 + 15 = 30 °C. Then we check two minutes at a time and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Heating a Liquid on the Stove', subtitle: 'Time and temperature, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about time and temperature. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A liquid with a temperature of $15\\,^\\circ$C is placed on a stovetop. The liquid is heated at the rate of $1.5\\,^\\circ$C per minute. What is the temperature of the liquid after $10$ minutes?',
          answer: '$30\\,^\\circ$C',
          working: '$15 + 1.5 \\times 10 = 15 + 15 = 30$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A liquid with a temperature of 15 degrees Celsius is placed on a stovetop. The liquid is heated at the rate of 1.5 degrees Celsius per minute. What is the temperature of the liquid after 10 minutes?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{start} = 15\\,^\\circ\\text{C}, \\quad \\text{rise} = 1.5\\,^\\circ\\text{C each minute}'] },
        { kind: 'text', id: 't', size: 'md', md: 'We want the temperature **after** $10$ minutes: where it **started**, plus how much it **rose**.' },
      ],
      lines: [
        { say: 'The liquid starts at 15 degrees, and it gets 1.5 degrees warmer every minute.', show: 'm' },
        { say: 'We want the temperature after 10 minutes: where it started, plus how much it rose.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{rise} = \\text{rate} \\times \\text{time}', '\\text{final} = \\text{start} + \\text{rise}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A rate per minute', md: '"$1.5\\,^\\circ$C per minute" means the temperature goes up by $1.5$ degrees **every** minute. Over many minutes, **multiply**.' },
      ],
      lines: [
        { say: 'Here is what we need. The total rise is the rate times the time. The final temperature is the start plus the rise.', show: 'f' },
        { say: '1.5 degrees per minute means it goes up 1.5 degrees every single minute. Over many minutes, multiply.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **rise** in $10$ minutes', '**Add** it to the start', 'Check **two minutes** at a time'] }],
      lines: [
        { say: 'Here is the plan. Find how much the temperature rises in 10 minutes.', show: 'plan.0' },
        { say: 'Add that to the starting temperature.', show: 'plan.1' },
        { say: 'Then check two minutes at a time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The rise',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.5 \\times 10 = 15\\,^\\circ\\text{C}'] }],
      lines: [
        { say: 'Step one. In 10 minutes it rises 1.5 times 10, which is 15 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Add the start',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 + 15 = \\good{30\\,^\\circ\\text{C}}'] }],
      lines: [
        { say: 'Step two. It started at 15 degrees and rose 15 degrees. 15 plus 15 is 30. After 10 minutes, the liquid is at 30 degrees Celsius.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Minutes', '$0$', '$2$', '$4$', '$6$', '$8$', '$10$'],
          rows: [['$^\\circ$C', '$15$', '$18$', '$21$', '$24$', '$27$', '$30$']],
        },
      ],
      lines: [
        { say: 'Let us check two minutes at a time. Every 2 minutes, it rises 2 times 1.5, which is 3 degrees.', show: 'm' },
        { say: 'So it goes 15, 18, 21, 24, 27, and after 10 minutes, 30. It checks out.' },
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
            ['$15\\,^\\circ$C', 'that is only the **rise**: add the **start**'],
            ['$16.5\\,^\\circ$C', 'added the rate **once**: it rises **every** minute'],
            ['$165\\,^\\circ$C', 'multiplied the start too: $(15 + 1.5) \\times 10$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '15 degrees is how much it rose. The liquid was already at 15 degrees, so add the start.' },
        { say: '16.5 degrees adds 1.5 only once. That is the temperature after just one minute.' },
        { say: 'And 165 degrees multiplies the starting temperature by 10 as well. Only the rise is multiplied by the time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cup of water at $80\\,^\\circ$C cools at the rate of $2.5\\,^\\circ$C per minute. What is its temperature after $8$ minutes?',
          choices: ['$100\\,^\\circ$C', '$20\\,^\\circ$C', '$77.5\\,^\\circ$C', '$60\\,^\\circ$C'],
          answer: 3,
          working: '$2.5 \\times 8 = 20$, and $80 - 20 = 60\\,^\\circ$C.',
        },
      ],
      lines: [
        { say: 'Your turn. A cup of water at 80 degrees Celsius cools at the rate of 2.5 degrees per minute. What is its temperature after 8 minutes? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'In 8 minutes it drops 2.5 times 8, which is 20 degrees. It is cooling, so subtract: 80 minus 20 is 60 degrees. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Change $=$ **rate** $\\times$ **time**', 'Heating: **add** the change', 'Cooling: **subtract** the change', 'Do not forget the **start**'] }],
      lines: [
        { say: 'Here is what to remember. The change in temperature is the rate times the time.', show: 'sum.0' },
        { say: 'When something heats up, add the change.', show: 'sum.1' },
        { say: 'When it cools down, subtract it.', show: 'sum.2' },
        { say: 'And do not forget the starting temperature. For more on time and temperature, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
