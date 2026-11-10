import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-3-1',
  lessonId: 'e6-3-1',
  title: 'Summarizing',
  summary:
    'A summary is a short retelling of a text’s most important ideas, in your own words. It gives the main idea and key ideas, leaves out minor details, and keeps your own opinions out.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Summarizing', subtitle: 'What to keep, and what to leave out' }],
      lines: [
        { say: 'Summarizing is one of the most useful reading skills there is. It shows that you have understood a text, and it helps you remember it.', show: 'title' },
        { say: 'The hard part is deciding what to keep, and what to leave out. That is what this lesson is about.' },
      ],
    },
    {
      chapter: 'What a good summary does',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Summary', md: 'A **summary** is a short retelling of a text’s most important ideas, **in your own words**.' },
        { kind: 'bullets', id: 'b', items: ['states the **main idea**', 'includes the **key ideas** that support it', 'leaves out **minor details**, examples and repetition', 'is **objective**: no opinions of your own'] },
      ],
      lines: [
        { say: 'A summary is a short retelling of a text’s most important ideas, in your own words. It is much shorter than the original.', show: 'def' },
        { say: 'A good summary states the main idea of the text, and includes the key ideas that support it.', show: ['b.0', 'b.1'] },
        { say: 'It leaves out minor details, examples and repetition.', show: 'b.2' },
        { say: 'And it is objective. It reports what the text says, without your own opinions.', show: 'b.3' },
      ],
    },
    {
      chapter: 'The monarch butterflies',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Every autumn, millions of monarch butterflies leave Canada and the northern United States and fly south to the mountains of central Mexico, a journey of more than 3,000 kilometres. No single butterfly makes the round trip. The monarchs that fly south in autumn spend the winter in the forests, and in spring they start north again, laying eggs on milkweed plants along the way. It takes three or four generations of butterflies to complete the journey back.'] },
      ],
      lines: [
        { say: 'Here is a passage about monarch butterflies. Read it, and think about what matters most.', show: 'q' },
        { say: 'The passage tells us that monarchs fly thousands of kilometres, from the north to Mexico and back. And the surprise is that no single butterfly makes the round trip. It takes several generations.', focus: 'q' },
      ],
    },
    {
      chapter: 'Key ideas and minor details',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Key idea and minor detail', md: 'A **key idea** is one the text needs to make its point. A **minor detail** adds colour or an example; the text would still make sense without it.' },
        {
          kind: 'table',
          id: 't',
          head: ['In the monarch passage', 'Key or minor?'],
          rows: [
            ['Monarchs fly south to Mexico each autumn.', 'Key idea'],
            ['No single butterfly makes the round trip.', 'Key idea'],
            ['They lay eggs on milkweed plants.', 'Minor detail'],
          ],
        },
      ],
      lines: [
        { say: 'A key idea is one the text needs to make its point. A minor detail adds colour or an example, but the text would still make sense without it.', show: 'def' },
        { say: 'Here is a quick test. Cover the idea up, and ask whether the passage would lose its point. If it would, the idea is key.', show: 't' },
        { say: 'Monarchs flying south, and no single butterfly making the round trip, are key ideas. Without them, there is no point.', focus: ['t.0', 't.1'] },
        { say: 'But laying eggs on milkweed is a minor detail. The passage still makes its point without it.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Keep your opinion out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Keep your opinion out', md: '“Monarchs are amazing, and everyone should plant milkweed” may be true, but it is **your** view, not the passage’s.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Monarchs are amazing, and everyone should plant milkweed, may be true. But it is your view, not the passage’s.', show: 'm' },
        { say: 'Save opinions for a response. A summary only reports.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the best summary of the monarch passage?',
          choices: [
            'Monarch butterflies lay their eggs on milkweed plants.',
            'Monarchs are the most amazing insects in the world.',
            'Some butterflies live in the forests of Mexico.',
            'Monarchs migrate thousands of kilometres over several generations.',
          ],
          answer: 3,
          working: 'D gives the main idea and the key surprise, briefly and objectively. A is a minor detail, and B is an opinion.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best summary of the monarch passage? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. It gives the main idea and the key surprise, briefly and objectively. Choice A is a minor detail, and Choice B is an opinion that the passage never states.', show: 'q2.answer' },
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
            'A **summary** gives the main idea and key ideas, briefly, in your own words.',
            'Leave out minor details and your own opinions.',
            'A **key idea** is one the text cannot make its point without.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A summary gives the main idea and the key ideas, briefly, and in your own words.', show: 'sum.0' },
        { say: 'Leave out minor details, and your own opinions.', show: 'sum.1' },
        { say: 'And a key idea is one the text cannot make its point without.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
