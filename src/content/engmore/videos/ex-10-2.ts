import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-10-2',
  lessonId: 'ex-10-2',
  title: 'Blood Brothers',
  thumbnail: false,
  summary:
    'Willy Russell’s musical play, first performed as a musical in 1983: twins separated at birth grow up on opposite sides of the class divide in Liverpool, and die on the same day. Its key moments, discussed in our own words, show class, fate and superstition, friendship, and nature and nurture.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Modern Prose and Drama', title: 'Blood Brothers', subtitle: 'Willy Russell, first performed as a musical in 1983' }],
      lines: [
        { say: 'Blood Brothers is a musical play by Willy Russell, first performed as a musical in nineteen eighty-three. It is still in copyright, so this video tells its story in our own words.', caption: 'Blood Brothers is a musical play by Willy Russell, first performed as a musical in 1983. It is still in copyright, so this video tells its story in our own words.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, its key moments, and the play’s message.' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A mother gives away a twin', 'The twins become blood brothers', 'Two very different lives', 'A tragic ending'] }],
      lines: [
        { say: 'In Liverpool, Mrs Johnstone, a poor mother, gives one of her newborn twins to Mrs Lyons, the wealthy woman she cleans for.', show: 'b.0' },
        { say: 'At seven, Mickey and Eddie meet, and swear to be blood brothers, not knowing that they really are brothers.', show: 'b.1' },
        { say: 'Eddie goes to university. Mickey loses his job, turns to crime and goes to prison.', show: 'b.2' },
        { say: 'In the end, Mickey confronts Eddie with a gun, learns the truth, and both twins are shot dead.', show: 'b.3' },
      ],
    },
    {
      chapter: 'The Narrator',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The Narrator', md: 'Like the chorus of a Greek tragedy, he comments on the action and warns of the **price** to be paid.' }],
      lines: [
        { say: 'The play opens with the twins’ deaths, so the audience watches to see why it happens, not what happens.', show: 'c' },
        { say: 'The Narrator keeps reminding us of the mothers’ secret, building a sense of fate and doom.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'ctx', tone: 'definition', title: 'Liverpool in the early 1980s', md: 'Factories closed and **unemployment** rose sharply across the North of England.' }],
      lines: [
        { say: 'When Russell wrote the play, many factories in Liverpool were closing. Mickey’s loss of his job reflects what happened to many working families.', show: 'ctx' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Twins with the same nature end up with very different lives. What does Russell suggest?',
          choices: ['That Eddie was born cleverer than Mickey', 'That superstition really does decide our fate', 'That Mickey chose to waste his chances', 'That class and money shape who we become'],
          answer: 3,
          working: 'The twins share the same nature; only their upbringing and class differ.',
        },
      ],
      lines: [
        { say: 'Your turn. Twins with the same nature end up with very different lives. What does Russell suggest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The twins share the same nature, so the difference comes from their upbringing: class and money shape who we become.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Class divides the twins’ lives.', 'Fate and superstition create a sense of doom.', 'Friendship: the blood brothers choose each other.'] }],
      lines: [
        { say: 'Let’s sum up. Class divides the twins’ lives, and decides their fates.', show: 'sum.0' },
        { say: 'Superstition, and the Narrator, fill the play with a sense of doom.', show: 'sum.1' },
        { say: 'And the twins’ friendship is real, which makes the ending all the more tragic.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
