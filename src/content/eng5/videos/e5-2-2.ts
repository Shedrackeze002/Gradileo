import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-2-2',
  lessonId: 'e5-2-2',
  title: 'Similes and Metaphors',
  summary:
    'Figurative language uses words in an imaginative way. A simile compares two different things using like or as, and a metaphor says one thing is another. Ask what the two things have in common to find what the comparison means.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Similes and Metaphors', subtitle: 'Explaining by comparing' }],
      lines: [
        { say: 'Writers often explain something by comparing it to something else. The lake was as smooth as glass tells you more in a few words than a long description could.', show: 'title' },
        { say: 'In this lesson, you will learn the two most common kinds of comparison, similes and metaphors, and what they tell the reader.' },
      ],
    },
    {
      chapter: 'Literal and figurative',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Literal and figurative language', md: '**Literal** language means exactly what the words say: *The lake was calm.* **Figurative language** uses words in an imaginative way to create a picture or feeling: *The lake was as smooth as glass.*' },
      ],
      lines: [
        { say: 'Literal language means exactly what the words say. The lake was calm.', show: 'def' },
        { say: 'Figurative language uses words in an unusual, imaginative way to create a picture or a feeling, so the meaning is not exactly what the words say. The lake was not made of glass, but it was as smooth as glass.', focus: 'def' },
        { say: 'Similes and metaphors are two kinds of figurative language.' },
      ],
    },
    {
      chapter: 'Similes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Simile', md: 'A **simile** compares two different things using **like** or **as**.' },
        { kind: 'bullets', id: 'b', items: ['*Her hands were as cold as ice.*', '*The baby slept like a log.*'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not every “like” makes a simile', md: 'In “I like pizza”, *like* means *enjoy*. “My dog is as big as your dog” compares two dogs: not a simile.' },
      ],
      lines: [
        { say: 'A simile compares two different things using the word like or as.', show: 'def' },
        { say: 'Her hands were as cold as ice. The baby slept like a log.', show: ['b.0', 'b.1'] },
        { say: 'The two things must be different kinds of things. My dog is as big as your dog uses as, but it compares two dogs, so it is a plain comparison, not a simile.', show: 'm' },
        { say: 'And in I like pizza, like means enjoy. Nothing is being compared at all.', focus: 'm' },
      ],
    },
    {
      chapter: 'Metaphors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Metaphor', md: 'A **metaphor** compares two different things by saying one thing **is** the other, without *like* or *as*.' },
        { kind: 'bullets', id: 'b', items: ['*The classroom was a zoo.*', '*Grandpa’s beard is a snowy cloud.*', '*The stars were diamonds scattered across the sky.*'] },
      ],
      lines: [
        { say: 'A metaphor compares two different things by saying one thing is the other, without like or as.', show: 'def' },
        { say: 'The classroom was a zoo. The classroom was not really full of animals. The metaphor tells you it was noisy and wild, the way a zoo is.', show: 'b.0', focus: 'b.0' },
        { say: 'What about this one: the stars were diamonds scattered across the sky? There is no like or as, and it says the stars were diamonds, comparing two different things. So it is a metaphor.', show: ['b.1', 'b.2'], focus: 'b.2' },
      ],
    },
    {
      chapter: 'What a comparison means',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Comparison', 'The two things share', 'So the writer means'],
          rows: [
            ['*as busy as a bee*', 'bees never stop working', 'very busy'],
            ['*Her smile was sunshine.*', 'sunshine is warm and bright', 'a warm, cheerful smile'],
            ['*He ran like the wind.*', 'wind moves very fast', 'he ran very fast'],
          ],
        },
      ],
      lines: [
        { say: 'To understand a simile or metaphor, ask: what do the two things have in common? That shared quality is what the writer wants you to notice.', show: 't' },
        { say: 'As busy as a bee. Bees never stop working, so the person is very busy.', focus: 't.0' },
        { say: 'Her smile was sunshine. Sunshine is warm and bright, so her smile was warm and cheerful.', focus: 't.1' },
        { say: 'He ran like the wind. The wind moves very fast, so he ran very fast.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“When the bell rang, the hallway was a river of students.” What does the metaphor tell the reader?',
          choices: [
            'The hallway was flooded with water.',
            'The students were swimming.',
            'A crowd of students flowed through the hallway together.',
            'The hallway was very quiet.',
          ],
          answer: 2,
          working: 'A river is long and flows steadily one way, so the students moved together in a long, steady stream.',
        },
      ],
      lines: [
        { say: 'Your turn. What does this metaphor tell the reader? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. A river is long, and flows steadily in one direction, so the students were moving the same way, in a long, steady stream.', show: 'q2.answer' },
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
            'A **simile** compares two different things using *like* or *as*.',
            'A **metaphor** says one thing *is* another.',
            'Ask what the two things have in common to find the meaning.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simile compares two different things using like or as.', show: 'sum.0' },
        { say: 'A metaphor says that one thing is another.', show: 'sum.1' },
        { say: 'And to find what a comparison means, ask what the two things have in common.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
