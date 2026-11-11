import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-5-3',
  lessonId: 'e6-5-3',
  title: 'Idioms',
  summary:
    'An idiom is a phrase whose meaning is different from the meanings of its separate words, such as raining cats and dogs. Literal language means what it says, and figurative language means something more.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Idioms', subtitle: 'When words do not mean what they say' }],
      lines: [
        { say: 'If someone tells you it is raining cats and dogs, you do not look up expecting pets to fall from the sky. You know they mean it is raining hard.', show: 'title' },
        { say: 'In this lesson, you will learn about expressions like this, and how to work out what they mean.' },
      ],
    },
    {
      chapter: 'Idioms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Idiom', md: 'An **idiom** is a phrase whose meaning cannot be worked out from the words on their own. Its meaning is **figurative**, not literal.' },
        {
          kind: 'table',
          id: 't',
          head: ['Idiom', 'Meaning'],
          rows: [
            ['a piece of cake', 'something very easy'],
            ['break a leg', 'good luck (said to performers)'],
            ['let the cat out of the bag', 'tell a secret by accident'],
            ['in the same boat', 'in the same difficult situation'],
            ['hold your horses', 'wait; slow down'],
            ['cost an arm and a leg', 'be very expensive'],
          ],
        },
      ],
      lines: [
        { say: 'An idiom is a phrase whose meaning cannot be worked out from the words on their own. Its meaning is figurative, not literal.', show: 'def' },
        { say: 'A piece of cake means something very easy. Break a leg means good luck, said to performers before a show.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'To let the cat out of the bag is to tell a secret by accident. And if we are in the same boat, we are in the same difficult situation.', focus: ['t.2', 't.3'] },
        { say: 'Hold your horses means wait, or slow down. And something that costs an arm and a leg is very expensive.', focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Working out an idiom',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Jamal let the cat out of the bag about the surprise party.'] },
        { kind: 'text', id: 'ans', size: 'md', md: 'Jamal **told the secret by mistake**.' },
      ],
      lines: [
        { say: 'What does the idiom in this sentence mean? Suppose you had never met it before.', show: 'q' },
        { say: 'There is no real cat or bag at a surprise party. But the sentence is about a surprise, which is a kind of secret.', focus: 'q' },
        { say: 'So Jamal told the secret by mistake. Use the rest of the sentence to work out what an idiom means.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Literal and figurative',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Literal and figurative meaning', md: '**Literal** language means exactly what it says. **Figurative** language means something beyond what the words say.' },
        {
          kind: 'table',
          id: 't',
          head: ['Literal', 'Figurative'],
          rows: [
            ['*The cat jumped onto the fence.*', '*I’m on the fence about the trip.* (undecided)'],
            ['*After the snowball fight, my feet were cold.*', '*I got cold feet before the concert.* (nervous)'],
          ],
        },
      ],
      lines: [
        { say: 'Literal language means exactly what it says. Figurative language means something beyond what the words say.', show: 'def' },
        { say: 'The same words can be literal in one sentence, and figurative in another. The cat jumped onto the fence is literal. I’m on the fence about the trip means I am undecided.', show: 't', focus: 't.0' },
        { say: 'My feet were cold after a snowball fight is literal. But I got cold feet before the concert means I became nervous.', focus: 't.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Idioms do not translate', md: 'Translating an idiom word for word into another language usually makes nonsense. For readers still learning English, use idioms with care.' },
      ],
      lines: [
        { say: 'Here is something to watch for. Idioms belong to a language. Translating one word for word into another language usually makes nonsense.', show: 'm' },
        { say: 'And an English learner may find idioms confusing for the same reason. When you write for readers who are still learning English, use idioms with care.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Maya bit off more than she could chew when she joined four clubs at once.” What does the idiom mean?',
          choices: ['She ate too much food.', 'She took on more than she could manage.', 'She chewed her food slowly.', 'She enjoyed every club.'],
          answer: 1,
          working: 'Joining four clubs at once is a lot to manage: the idiom means taking on too much.',
        },
      ],
      lines: [
        { say: 'Your turn. What does the idiom mean in this sentence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. There is no food in the sentence. Joining four clubs at once is a lot to manage, so she took on more than she could manage.', show: 'q2.answer' },
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
            'An **idiom** is a phrase whose meaning differs from its separate words.',
            '**Literal** language means what it says; **figurative** language means something more.',
            'Use the rest of the sentence to work out an idiom.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An idiom is a phrase whose meaning is different from its separate words.', show: 'sum.0' },
        { say: 'Literal language means what it says, and figurative language means something more.', show: 'sum.1' },
        { say: 'And use the rest of the sentence to work out what an idiom means.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
