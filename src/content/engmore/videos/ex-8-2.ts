import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-8-2',
  lessonId: 'ex-8-2',
  title: 'Power and Conflict: My Last Duchess, The Charge of the Light Brigade and Exposure',
  thumbnail: false,
  summary:
    'Three poems from the AQA Power and Conflict cluster: Browning’s “My Last Duchess”, a duke’s chilling monologue; Tennyson’s “The Charge of the Light Brigade”, honouring soldiers who obeyed a mistaken order; and Owen’s “Exposure”, where the cold is deadlier than the enemy. Quotations are from public domain editions, credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Power and Conflict', title: 'My Last Duchess, The Charge of the Light Brigade and Exposure', subtitle: 'Browning, Tennyson and Owen' }],
      lines: [
        { say: 'Three poems from the Power and Conflict cluster: a proud duke, a famous cavalry charge, and soldiers freezing in the trenches.', show: 'title' },
        { say: 'In this lesson, you will learn what each poem is about, read its key lines, and see each poem in its time.' },
      ],
    },
    {
      chapter: 'My Last Duchess',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['I gave commands;', 'Then all smiles stopped together.'], by: 'Robert Browning, “My Last Duchess”' }],
      lines: [
        { say: 'In My Last Duchess, from eighteen forty-two, a duke shows a visitor a portrait of his late wife. Only the duke speaks: it is a dramatic monologue.', caption: 'In My Last Duchess, from 1842, a duke shows a visitor a portrait of his late wife. Only the duke speaks: it is a dramatic monologue.' },
        { say: 'He complains that she smiled at everyone, and valued his ancient name no more than small kindnesses. Then, calmly, he says that he gave commands, and all her smiles stopped.', show: 'q' },
        { say: 'He has had her killed, and now he is arranging his next marriage. His calm voice shows his pride and his abuse of power.' },
      ],
    },
    {
      chapter: 'The Charge of the Light Brigade',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['Their’s not to reason why,', 'Their’s but to do and die,'], by: 'Alfred, Lord Tennyson, “The Charge of the Light Brigade”' }],
      lines: [
        { say: 'In eighteen fifty-four, in the Crimean War, a mistaken order sent six hundred cavalrymen charging at the enemy’s guns.', caption: 'In 1854, in the Crimean War, a mistaken order sent six hundred cavalrymen charging at the enemy’s guns.' },
        { say: 'Tennyson, the Poet Laureate, wrote this poem weeks later. Its galloping rhythm imitates the horses.' },
        { say: 'The soldiers’ duty is to obey without question, even to death, and the poem ends by commanding us to honour them. It is a patriotic tribute.', show: 'q' },
      ],
    },
    {
      chapter: 'Exposure',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['Our brains ache, in the merciless iced east winds that knife us', 'But nothing happens.'], by: 'Wilfred Owen, “Exposure”' }],
      lines: [
        { say: 'Wilfred Owen fought in the First World War, and was killed a week before it ended. In Exposure, soldiers wait through a freezing night in the trenches.', show: 'q' },
        { say: 'The wind attacks them like a knife: nature is the real enemy. Several stanzas end with the same line, but nothing happens, showing the boredom and futility of the waiting.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Tennyson is not against the war', md: 'He admits someone blundered, but his purpose is to **honour** the soldiers. Owen is the poet who shows war without glory.' }],
      lines: [{ say: 'A common mistake is to call The Charge of the Light Brigade an anti-war poem. Tennyson admits there was a blunder, but he honours the soldiers. Owen is the one who shows war without any glory.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The duke’s first words are: *“That’s my last Duchess painted on the wall, / Looking as if she were alive.”* What do they suggest?',
          choices: ['That the duke has just painted the portrait himself', 'That his wife is away on a long visit', 'That she was one of his possessions, and is now dead', 'That he is selling the painting to the visitor'],
          answer: 2,
          working: '“My” and “last” suggest a possession in a series, and “as if she were alive” hints at her death.',
        },
      ],
      lines: [
        { say: 'Your turn. The duke begins: that’s my last Duchess painted on the wall, looking as if she were alive. What do his words suggest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The word my, and the word last, make her sound like one possession in a series, and as if she were alive hints that she is dead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['My Last Duchess: a duke’s pride and abuse of power.', 'The Light Brigade: patriotic tribute to obedient soldiers.', 'Exposure: nature is the enemy, and nothing happens.'] }],
      lines: [
        { say: 'Let’s sum up. In My Last Duchess, a proud duke reveals that he had his wife killed.', show: 'sum.0' },
        { say: 'The Charge of the Light Brigade honours soldiers who obeyed a mistaken order.', show: 'sum.1' },
        { say: 'And in Exposure, the cold kills, while nothing happens.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
