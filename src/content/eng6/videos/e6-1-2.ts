import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-1-2',
  lessonId: 'e6-1-2',
  title: 'Character and Motive',
  summary:
    'A motive is the reason behind a character’s actions, which readers infer from what the character says, does and thinks. A dynamic character changes during a story, and a static character stays the same.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Character and Motive', subtitle: 'Why characters do what they do' }],
      lines: [
        { say: 'Characters in good stories do things for reasons, just as real people do.', show: 'title' },
        { say: 'Understanding those reasons helps you predict what characters will do next, and explain why the story unfolds as it does. Noticing how characters change is one of the best ways to find a story’s meaning.' },
      ],
    },
    {
      chapter: 'Motive',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motive', md: 'A **motive** is the reason a character acts the way they do: what they want, fear or care about. Readers **infer** it from what the character says, does and thinks.' },
        {
          kind: 'table',
          id: 't',
          head: ['What the character does', 'What it suggests about their motive'],
          rows: [
            ['Saves every coin for three months', 'They want something badly, perhaps a gift'],
            ['Laughs too loudly at others’ jokes', 'They want to be liked or included'],
            ['Says “Who cares?” but practises every night', 'They care a great deal and fear failing'],
          ],
        },
      ],
      lines: [
        { say: 'A motive is the reason a character acts the way they do: what they want, fear or care about.', show: 'def' },
        { say: 'Writers rarely state a motive directly, so readers infer it from what the character says, does and thinks.', focus: 'def' },
        { say: 'A character who saves every coin for three months probably wants something badly. One who laughs too loudly at other people’s jokes probably wants to be liked.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'And one who says who cares, but practises every night, cares a great deal, and is afraid of failing.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Inferring a motive',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['“Who cares about a drawing contest?” Leo shrugged.', 'But every night that week he sat at his desk, drawing until midnight, and on Friday he was the first to check the results board.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Actions speak louder than words', md: 'When what a character **says** and what they **do** disagree, trust the actions.' },
      ],
      lines: [
        { say: 'Why does Leo pretend not to care?', show: ['q.0', 'q.1'] },
        { say: 'His actions, drawing every night and rushing to see the results, show that he cares very much.', focus: 'q.1' },
        { say: 'So saying who cares protects him, in case he loses. He is afraid of being disappointed.', focus: 'q.0' },
        { say: 'This shows something important. A character’s words can hide their real motive. When what a character says and what they do disagree, trust the actions.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'How characters change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dynamic and static characters', md: 'A **dynamic** character changes during the story, usually because of what happens to them. A **static** character stays the same from beginning to end.' },
        { kind: 'text', id: 't', size: 'md', md: '**Beginning** → the **event** that caused the change → **End**' },
      ],
      lines: [
        { say: 'A dynamic character changes during the story, usually because of what happens to them. They might learn a lesson, become braver, or see someone differently.', show: 'def' },
        { say: 'A static character stays the same from beginning to end. In The Tortoise and the Hare, the boastful Hare learns a lesson when he loses, so he is dynamic. The Tortoise is steady and patient from start to finish, so he is static.', focus: 'def' },
        { say: 'To describe a change, compare the character at the beginning and at the end, and then find the event that caused it.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Kai always made jokes about Sam’s old coat. Then, one afternoon, he found Sam crying behind the gym. After that, Kai never made a joke about anyone’s clothes again.” How does Kai change, and why?',
          choices: [
            'He becomes unkind because Sam was crying.',
            'He changes from unkind to thoughtful because he sees how his jokes hurt Sam.',
            'He stays the same: he is a static character.',
            'He becomes funnier because he tells new jokes.',
          ],
          answer: 1,
          working: 'At the beginning Kai mocks Sam’s coat. Finding Sam crying shows him how much his jokes hurt, and at the end he never mocks anyone’s clothes again.',
        },
      ],
      lines: [
        { say: 'Your turn. How does Kai change, and why? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. At the beginning, Kai mocks Sam’s coat. The turning event is finding Sam crying, which shows Kai how much his jokes hurt. So he changes from unkind to thoughtful.', show: 'q2.answer' },
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
            'A **motive** is the reason behind a character’s actions.',
            'When words and actions disagree, the actions show the real motive.',
            'A **dynamic** character changes; a **static** character stays the same.',
            'Explain a change: beginning, end, and the event that caused it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A motive is the reason behind a character’s actions. Infer it from what they say, do and think.', show: 'sum.0' },
        { say: 'When words and actions disagree, the actions usually show the real motive.', show: 'sum.1' },
        { say: 'A dynamic character changes, and a static character stays the same.', show: 'sum.2' },
        { say: 'And explain a change by comparing the beginning and the end, and naming the event that caused it.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
