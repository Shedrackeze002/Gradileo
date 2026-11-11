import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-1-3',
  lessonId: 'e5-1-3',
  title: 'Problem, Events and Solution',
  summary:
    'Every story needs a problem: something that goes wrong or a goal that is hard to reach. The events are what the characters do about it, and the solution is how it is solved. Stories move in sequence from beginning to middle to end.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Problem, Events and Solution', subtitle: 'What goes wrong, and how it is fixed' }],
      lines: [
        { say: 'Imagine a story where nothing goes wrong. A girl walks to the park, plays, and walks home. It would be very boring!', show: 'title' },
        { say: 'Stories need a problem. In this lesson, you will learn to find a story’s problem and solution, and to keep its events in order.' },
      ],
    },
    {
      chapter: 'Problem and solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Problem and solution', md: 'The **problem** is what goes wrong, or what the main character wants but cannot easily get. The **events** are what the characters do about it. The **solution** is how the problem is solved, usually near the end.' },
      ],
      lines: [
        { say: 'The problem is what goes wrong in a story, or what the main character wants but cannot easily get.', show: 'def' },
        { say: 'The events are what the characters do about the problem.', focus: 'def' },
        { say: 'And the solution is how the problem is solved, usually near the end of the story.' },
      ],
    },
    {
      chapter: 'The Crow and the Pitcher',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['A thirsty crow found a pitcher with a little water at the bottom, but her beak could not reach it.', 'She picked up a pebble and dropped it in, then another, and another.', 'Slowly the water rose until she could drink.'], by: 'retold from Aesop' },
        { kind: 'table', id: 't', head: ['Problem', 'Events', 'Solution'], rows: [['She cannot reach the water', 'She drops in pebbles', 'The water rises; she drinks']] },
      ],
      lines: [
        { say: 'Here is a fable retold from Aesop. What is the problem, and how is it solved?', show: ['q.0', 'q.1', 'q.2'] },
        { say: 'What goes wrong? The crow is thirsty, but she cannot reach the water. That is the problem.', focus: 'q.0', show: 't' },
        { say: 'What does she do? She drops pebbles in, one by one. Those are the events.', focus: 'q.1' },
        { say: 'Slowly the water rises until she can drink. That is the solution.', focus: 'q.2' },
      ],
    },
    {
      chapter: 'Beginning, middle and end',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part', '“The Tortoise and the Hare”'],
          rows: [
            ['Beginning', 'The hare laughs at the slow tortoise, and they agree to race.'],
            ['Middle', 'The hare runs ahead and takes a nap; the tortoise keeps going.'],
            ['End', 'The tortoise passes the sleeping hare and wins.'],
          ],
        },
        { kind: 'text', id: 'sig', size: 'md', md: 'Signal words: *first*, *then*, *next*, *later*, *after that*, *finally*' },
      ],
      lines: [
        { say: 'Most stories move in order. The beginning tells us who, where, and the problem. The middle has events that try to solve it. And the end has the solution. This order is called the sequence.' },
        { say: 'In The Tortoise and the Hare, the beginning is the hare laughing at the slow tortoise, and the two agreeing to race.', show: 't', focus: 't.0' },
        { say: 'In the middle, the hare runs ahead and takes a nap, while the tortoise keeps going.', focus: 't.1' },
        { say: 'And at the end, the tortoise passes the sleeping hare and wins.', focus: 't.2' },
        { say: 'Signal words help you follow the sequence: first, then, next, later, after that, and finally. To put events in order, ask what has to happen before each one.', show: 'sig', focus: 'sig' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Ravi has a new costume and his family is in the audience, but he forgets his lines.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A detail is not the problem', md: 'The costume and the audience are details. The **problem** is the thing that goes wrong: Ravi forgets his lines.' },
      ],
      lines: [
        { say: 'Here is a common mistake: picking a detail instead of the problem.', show: 'q' },
        { say: 'The new costume and the family in the audience are only details. The problem is the thing that goes wrong. Ravi forgets his lines.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Zara’s kite got stuck high in a tree. She asked her tall uncle to help, and he lifted it free with a long rake.” What is the solution?',
          choices: [
            'Zara’s kite gets stuck in a tree.',
            'Zara asks her tall uncle to help.',
            'Zara has a kite.',
            'Her uncle lifts the kite free with a rake.',
          ],
          answer: 3,
          working: 'The solution is how the problem is solved. Choice A is the problem, and Choice B is an event on the way to the solution.',
        },
      ],
      lines: [
        { say: 'Your turn. Read about Zara’s kite, and choose the solution. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The solution is how the problem is solved: her uncle lifts the kite free. Choice A is the problem, and Choice B is an event on the way to the solution.', show: 'q2.answer' },
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
            'The **problem** is what goes wrong; the **solution** is how it is fixed.',
            'Stories move from **beginning** to **middle** to **end**.',
            'Put events in **sequence** by asking what has to happen first.',
            'Signal words such as *first*, *then* and *finally* show the order.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The problem is what goes wrong, and the solution is how it is fixed.', show: 'sum.0' },
        { say: 'Stories move from beginning, to middle, to end.', show: 'sum.1' },
        { say: 'Put events in sequence by asking what has to happen before each one.', show: 'sum.2' },
        { say: 'And signal words such as first, then and finally show the order.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
