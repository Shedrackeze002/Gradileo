import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-10-4',
  lessonId: 'ex-10-4',
  title: 'Animal Farm',
  thumbnail: false,
  summary:
    'George Orwell’s novella, first published in 1945: the animals of a farm rebel against their farmer, but the pigs slowly take power and become the tyrants they replaced. Its key moments, discussed in our own words, show power and corruption, propaganda and revolution, as an allegory of the Russian Revolution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Modern Prose and Drama', title: 'Animal Farm', subtitle: 'George Orwell, 1945' }],
      lines: [
        { say: 'Animal Farm is a novella by George Orwell, first published in nineteen forty-five. It is still in copyright in some countries, so this video tells its story in our own words.', caption: 'Animal Farm is a novella by George Orwell, first published in 1945. It is still in copyright in some countries, so this video tells its story in our own words.', show: 'title' },
        { say: 'In this lesson, you will learn the plot and its characters, its key moments, and the history behind it.' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A dream, and a rebellion', 'Napoleon drives out Snowball', 'Boxer’s fate', 'Pigs and men'] }],
      lines: [
        { say: 'Old Major, a prize pig, dreams of a world without humans. The animals drive out their drunken farmer, Mr Jones, and promise that every animal will be equal.', show: 'b.0' },
        { say: 'The pigs take charge. Napoleon uses his secret pack of dogs to chase his rival, Snowball, off the farm.', show: 'b.1' },
        { say: 'Boxer, the loyal cart-horse, works until he collapses, and the pigs sell him to a slaughterer.', show: 'b.2' },
        { say: 'In the end, the pigs walk on two legs, and the other animals can no longer tell the pigs from the farmers.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Propaganda',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Propaganda', md: 'Information, often false, used to make people support those in power.' }],
      lines: [
        { say: 'Squealer, a persuasive pig, explains away every decision. When the pigs take the milk and apples, he claims they need them to think for everyone.', show: 'c' },
        { say: 'The pigs also quietly rewrite the rules painted on the barn, so the past seems to say whatever they want.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['In the story', 'In history'], rows: [['Old Major', 'Marx and Lenin'], ['Napoleon', 'Stalin'], ['Snowball', 'Trotsky']] }],
      lines: [
        { say: 'The story is an allegory of the Russian Revolution. Napoleon suggests Stalin, and Snowball suggests Trotsky, whom Stalin drove into exile.', show: 't' },
        { say: 'Orwell supported socialism, but believed Stalin had betrayed it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At the end, the animals cannot tell the pigs from the farmers. What does this show?',
          choices: ['That the pigs have made peace with the humans for good', 'That the animals’ eyesight is failing', 'That the pigs have become the tyrants they replaced', 'That the farmers have become kinder'],
          answer: 2,
          working: 'The revolution has come full circle: the pigs are now the masters.',
        },
      ],
      lines: [
        { say: 'Your turn. At the end, the animals cannot tell the pigs from the farmers. What does this show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The pigs have become the tyrants they replaced, so the revolution has come full circle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Power corrupts: Napoleon becomes a tyrant.', 'Propaganda: Squealer’s lies and the rewritten rules.', 'An allegory of the Russian Revolution.'] }],
      lines: [
        { say: 'Let’s sum up. Power corrupts: Napoleon becomes as cruel as the farmer he replaced.', show: 'sum.0' },
        { say: 'Propaganda keeps the other animals obedient.', show: 'sum.1' },
        { say: 'And the story is an allegory of how the Russian Revolution was betrayed.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
