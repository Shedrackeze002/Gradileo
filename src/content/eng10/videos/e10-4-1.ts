import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-4-1',
  lessonId: 'e10-4-1',
  title: 'Purpose and Audience',
  thumbnail: false,
  summary:
    'Work out why a text was written and who it was written for: the five main purposes, satire, audience clues, and choosing a formal or informal register.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction and Persuasion', title: 'Purpose and Audience', subtitle: 'The first two questions to ask of any text' }],
      lines: [
        { say: 'Picture three texts about the same river. A news report says it flooded two streets last night. A poster urges everyone to join Saturday’s clean-up. A travel journal paints the river at dawn, silver and still under the mist.', show: 'title' },
        { say: 'The subject is the same, but each writer wants something different from you. In this lesson, you will work out a text’s purpose and its audience.' },
      ],
    },
    {
      chapter: 'Why was it written?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Purpose', 'The writer wants the reader to …'],
          rows: [
            ['Inform', 'know or understand the facts'],
            ['Persuade', 'change what they think or do'],
            ['Entertain', 'enjoy, laugh or be gripped'],
            ['Instruct', 'carry out a task, step by step'],
            ['Describe', 'picture a person, place or thing'],
          ],
        },
      ],
      lines: [
        { say: 'A text’s purpose is what the writer wants it to do. Most non-fiction has one of five main purposes.', show: 't.0' },
        { say: 'To inform is to give facts. To persuade is to change what the reader thinks or does.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'To entertain is to make the reader enjoy it. To instruct is to explain a task step by step, and to describe is to help the reader picture something.', show: ['t.2', 't.3', 't.4'], focus: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Satire and audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sat', tone: 'definition', title: 'Satire', md: 'Humour, exaggeration or irony used to **criticize**. Its surface purpose may seem to be to entertain, but its real purpose is to **persuade**.' },
        { kind: 'callout', id: 'aud', tone: 'definition', title: 'Audience', md: 'The group of readers a text is **written for**. Clues: who is addressed, what the reader is assumed to know, and the vocabulary.' },
      ],
      lines: [
        { say: 'Some texts hide their purpose. In seventeen twenty-nine, Jonathan Swift published a calm, reasonable essay called A Modest Proposal. What he proposes is monstrous, and he does not mean a word of it.', show: 'sat' },
        { say: 'It is satire, writing that mocks a wrong by pretending to support it. His real purpose is to persuade readers to see how cruelly the poor were being treated.', focus: 'sat' },
        { say: 'A text’s audience is the group it is written for. Clues include who is addressed, what the text assumes the reader knows, and the vocabulary. A medical journal uses technical terms because its readers are doctors.', show: 'aud' },
      ],
    },
    {
      chapter: 'Register',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'r',
          head: ['Register', 'Example'],
          rows: [
            ['Informal', 'You guys seriously need to put a crossing by our school.'],
            ['Formal', 'I would like to request a pedestrian crossing outside Riverside School.'],
          ],
        },
      ],
      lines: [
        { say: 'Register is how formal or informal the language is, and it should suit the audience. Hana is writing to the city council to ask for a crossing outside her school.', show: 'r.0' },
        { say: 'The informal opening uses slang and sounds like a demand. The formal one is polite, complete and specific, so it is the one a council is most likely to act on.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Naming the technique, not the purpose', md: '“The advertisement tells a story” says **how** it works, not **why** it was written. A story or a statistic is a tool.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A student writes that the advertisement tells a story. That describes how it works, not why it was written.', show: 'mis' },
        { say: 'A story, a statistic or a striking image is a tool. The purpose is what the tool is used for. A funny advertisement exists to sell, so its main purpose is to persuade.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A passage reads: “First, rinse the rice until the water runs clear. Then add two cups of water for every cup of rice.” What is its main purpose?',
          choices: [
            'To instruct: it tells the reader how to do something',
            'To inform: it gives the reader facts about growing rice',
            'To persuade: it urges the reader to buy a brand of rice',
            'To describe: it paints a picture of a field of rice',
          ],
          answer: 0,
          working: 'The commands *rinse* and *add*, ordered by *first* and *then*, show a purpose of instructing.',
        },
      ],
      lines: [
        { say: 'Your turn. A passage reads: First, rinse the rice until the water runs clear. Then add two cups of water for every cup of rice. What is its main purpose? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, to instruct. The commands rinse and add, put in order by first and then, tell the reader how to do something.', show: 'q.answer' },
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
            'Purpose: **inform**, **persuade**, **entertain**, **instruct** or **describe**.',
            'Satire hides a persuasive purpose behind a straight face.',
            'Audience and register go together: formal for people you need to take you seriously.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A text’s purpose is to inform, persuade, entertain, instruct or describe.', show: 'sum.0' },
        { say: 'Satire hides a persuasive purpose behind a straight face.', show: 'sum.1' },
        { say: 'And look at the audience: choose a formal register for people you need to take you seriously, and an informal one for friends.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
