import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-2-3',
  lessonId: 'e11-2-3',
  title: 'Dramatic Monologue and Irony',
  summary:
    'The speaker of a poem is not always the poet. A dramatic monologue is spoken by one character to a silent listener and reveals more than the speaker intends, and irony is a gap between what is said or expected and what is true.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Dramatic Monologue and Irony', subtitle: 'The speaker is not the poet' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['That’s my last Duchess painted on the wall,', 'Looking as if she were alive. I call', 'That piece a wonder, now: Frà Pandolf’s hands', 'Worked busily a day, and there she stands.', 'Will’t please you sit and look at her?'],
          by: 'Robert Browning, “My Last Duchess”',
        },
      ],
      lines: [
        { say: 'A wealthy duke draws back a curtain to show a visitor a painting of his late wife.', show: ['title', 'q.0', 'q.1', 'q.2', 'q.3', 'q.4'] },
        { say: 'He sounds polite, proud and in control. By the end of the poem, we suspect he is something far worse, and he never notices that he has told us. In this lesson, you will read poems spoken by characters, and look at irony.' },
      ],
    },
    {
      chapter: 'The speaker',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dramatic monologue', md: 'A poem spoken by one character to a silent listener, the **auditor**, at a particular moment. The speaker is often an invented **persona**, not the poet.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Who** is speaking?',
            '**To whom**, and where?',
            'What does the speaker **reveal without meaning to**?',
          ],
        },
      ],
      lines: [
        { say: 'The speaker is the voice that says the poem. Often it is an invented character, so write the speaker, not the poet’s name. Browning was not a murderous duke.', show: 'def' },
        { say: 'To read a dramatic monologue, ask three questions. Who is speaking? To whom, and where? And what does the speaker reveal without meaning to?', show: ['b.0', 'b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Between the lines',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Oh, sir, she smiled, no doubt,', 'Whene’er I passed her; but who passed without', 'Much the same smile? This grew; I gave commands;', 'Then all smiles stopped together. There she stands', 'As if alive.'],
          by: 'Robert Browning, “My Last Duchess”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'The Duke reveals a **jealous, cruel man**, and he tells it to the agent arranging his next marriage.' },
      ],
      lines: [
        { say: 'The Duke is explaining that his wife smiled too freely, at everyone. The listener is called sir, so someone stands beside him.', show: ['q.0', 'q.1', 'q.2'] },
        { say: 'The tone is calm. This grew, he says, I gave commands. Then all smiles stopped together, and now she stands only as if alive.', show: ['q.3', 'q.4'], focus: ['q.2', 'q.3', 'q.4'] },
        { say: 'He most likely had her killed, for smiling at other people. And he says this to the agent of the Count whose daughter he hopes to marry next.', show: 'ans' },
      ],
    },
    {
      chapter: 'Irony',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Irony', md: 'A gap between what is said or expected and what is actually true.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['So on we worked, and waited for the light,', 'And went without the meat, and cursed the bread;', 'And Richard Cory, one calm summer night,', 'Went home and put a bullet through his head.'],
          by: 'Edwin Arlington Robinson, “Richard Cory”',
        },
      ],
      lines: [
        { say: 'Irony comes in three kinds. In verbal irony, someone says the opposite of what they mean. In dramatic irony, the reader knows something a character does not.', show: 'def' },
        { say: 'In situational irony, events turn out the opposite of what we expect. The townspeople in “Richard Cory” describe a gentleman, richer than a king, admired and envied by all.', show: ['q.0', 'q.1'] },
        { say: 'Then the man who seemed to have everything takes his own life, while the struggling townspeople go on. The poem suggests that wealth and appearances do not guarantee happiness.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Taking the speaker at their word', md: 'The Duke wants to sound dignified. A careful reader asks what he **leaves out**. In a dramatic monologue, the speaker’s own words are the evidence against them.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not take the speaker at their word.', show: 'm' },
        { say: 'The Duke wants to sound dignified, so ask what he leaves out. In a dramatic monologue, the speaker’s own words are the evidence against them.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Everyone in a poem envies a rich, admired man, yet the last line shows him in despair. Which irony is it?',
          choices: [
            'Verbal irony, because someone says the opposite of what they mean.',
            'Dramatic irony, because the reader knows more than a character does.',
            'An allusion, because it refers to a well-known story or person.',
            'Situational irony, because events turn out the opposite of what we expect.',
          ],
          answer: 3,
          working: 'The ending reverses what the poem led us to expect, so the irony is situational.',
        },
      ],
      lines: [
        { say: 'Your turn. Everyone in a poem envies a rich, admired man, yet the last line shows him in despair. Which irony is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The ending reverses what the poem led us to expect, so the irony is situational.', show: 'q2.answer' },
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
            'The speaker of a poem is not necessarily the poet.',
            'A dramatic monologue reveals more than the speaker intends.',
            'Irony is a gap: verbal, situational or dramatic.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The speaker of a poem is not necessarily the poet.', show: 'sum.0' },
        { say: 'A dramatic monologue is spoken to a silent listener, and it reveals more than the speaker intends.', show: 'sum.1' },
        { say: 'And irony is a gap between what is said or expected and what is true. Name the gap, then say what it shows.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
