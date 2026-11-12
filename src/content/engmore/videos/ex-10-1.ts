import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-10-1',
  lessonId: 'ex-10-1',
  title: 'An Inspector Calls',
  thumbnail: false,
  summary:
    'J. B. Priestley’s play, first performed in 1945 and set in 1912: an inspector shows each member of the wealthy Birling family their part in a young woman’s death. Its key moments, discussed in our own words, show social responsibility, class and the hope Priestley places in the young.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Modern Prose and Drama', title: 'An Inspector Calls', subtitle: 'J. B. Priestley, first performed in 1945' }],
      lines: [
        { say: 'An Inspector Calls is a play by J. B. Priestley, first performed in nineteen forty-five. It is still in copyright, so this video tells its story in our own words.', caption: 'An Inspector Calls is a play by J. B. Priestley, first performed in 1945. It is still in copyright, so this video tells its story in our own words.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, its key moments, and the play’s message.' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A celebration, and a visitor', 'Each family member confesses', 'The Inspector’s warning', 'A final telephone call'] }],
      lines: [
        { say: 'In nineteen twelve, the wealthy Birlings celebrate their daughter Sheila’s engagement to Gerald. An inspector arrives: a young woman has died.', caption: 'In 1912, the wealthy Birlings celebrate their daughter Sheila’s engagement to Gerald. An inspector arrives: a young woman has died.', show: 'b.0' },
        { say: 'One by one, he shows that each of them helped to ruin her: Mr Birling sacked her, Sheila had her dismissed, Gerald and Eric used her, and Mrs Birling refused her help.', show: 'b.1' },
        { say: 'He warns them that people are responsible for each other, and leaves.', show: 'b.2' },
        { say: 'The family discover he may not be a real inspector. Then the telephone rings: a girl has died, and an inspector is on his way.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Dramatic irony',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Dramatic irony', md: 'The audience knows something that a character does not.' }],
      lines: [
        { say: 'At dinner, Mr Birling confidently predicts that there will be no war, and that the Titanic cannot sink.', show: 'c' },
        { say: 'The audience in nineteen forty-five knew he was wrong about both, so they cannot trust his views about society either.', caption: 'The audience in 1945 knew he was wrong about both, so they cannot trust his views about society either.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ctx', items: ['Set in 1912, before two world wars', 'Written in 1945, as Britain rebuilt', 'Priestley was a socialist'] }],
      lines: [
        { say: 'Priestley set the play in the comfortable years before two world wars.', show: 'ctx.0' },
        { say: 'But he wrote it as Britain was deciding what kind of country to build after the second.', show: 'ctx.1' },
        { say: 'He was a socialist. Mr Birling speaks for selfishness; the Inspector speaks for social responsibility.', show: 'ctx.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'When the Inspector seems to be a hoax, Mr and Mrs Birling celebrate, but Sheila and Eric stay ashamed. What does this suggest?',
          choices: ['The young can change, but the old refuse to', 'Sheila and Eric are afraid of the police', 'The parents were right all along', 'The family will now be friends with the Inspector'],
          answer: 0,
          working: 'Priestley places his hope in the young, who have learned from the evening.',
        },
      ],
      lines: [
        { say: 'Your turn. When the Inspector seems to be a hoax, the parents celebrate, but Sheila and Eric stay ashamed. What does this suggest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A. The young have learned, but the old refuse to. Priestley places his hope in the young.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Social responsibility: we are responsible for each other.', 'Class: the Birlings use their power over a poor woman.', 'Age and youth: the young change; the old do not.'] }],
      lines: [
        { say: 'Let’s sum up. The play’s message is social responsibility.', show: 'sum.0' },
        { say: 'It shows a wealthy family using their power over a working woman.', show: 'sum.1' },
        { say: 'And it places its hope in the young, who are willing to change.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
