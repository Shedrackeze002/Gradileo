import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-3-1',
  lessonId: 'ex-3-1',
  title: 'Reading Nineteenth-Century Non-fiction',
  thumbnail: false,
  summary:
    'Older non-fiction can be read clearly with a few habits: work out unfamiliar words from their context, break long sentences at their joins and put each part into your own words, read the writer’s attitude from their word choices (polite language can carry sharp criticism), and use the text as evidence about what its time took for granted.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Non-fiction and Description', title: 'Reading Nineteenth-Century Non-fiction', subtitle: 'Letters, diaries and reports from the past' }],
      lines: [
        { say: 'A letter from eighteen forty-seven can feel like a message in a foreign language. The sentences run on for lines, and the words are old-fashioned. But the writer is still a person telling you what they saw and thought.', caption: 'A letter from 1847 can feel like a message in a foreign language. The sentences run on for lines, and the words are old-fashioned. But the writer is still a person telling you what they saw and thought.', show: 'title' },
        { say: 'In this lesson, you will work out older words and long sentences, infer a writer’s attitude, and read a text as evidence about its time.' },
      ],
    },
    {
      chapter: 'Words in context',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Context', md: 'The sentence and passage around a word. When a word is unfamiliar, the context narrows down what it can mean.' },
        { kind: 'text', id: 'ex', md: '*“I was much alarmed at first by the shrieking of the engine and the **prodigious** speed, for the hedges flew past the window so swiftly that I could not fix my eye upon a single leaf.”*' },
      ],
      lines: [
        { say: 'The context of a word is the sentence and passage around it. It usually narrows down what an unfamiliar word can mean.', show: 'def' },
        { say: 'Here a governess describes her first train journey. What does prodigious mean?', show: 'ex' },
        { say: 'She is alarmed by the speed, and the hedges fly past so fast that she cannot see a single leaf. So prodigious must mean enormous. Try your meaning in place of the word, and check the sentence still makes sense.' },
      ],
    },
    {
      chapter: 'Long sentences',
      layout: 'center',
      main: [
        { kind: 'text', id: 'ex', md: '*“For years the poorer districts upon the banks have endured this nuisance without remedy; it is a curious circumstance that the evil should only now be thought worthy of attention, when it has reached the windows of Parliament itself.”*' },
        { kind: 'bullets', id: 'b', items: ['Before the semicolon: the poor have put up with the smell for years', 'After it: only now that it reaches Parliament is anyone paying attention'] },
      ],
      lines: [
        { say: 'Long sentences are built from shorter ideas, joined by words such as for, yet and however, or by semicolons. This one comes from a newspaper report in eighteen fifty-eight, about the smell of the river.', caption: 'Long sentences are built from shorter ideas, joined by words such as “for”, “yet” and “however”, or by semicolons. This one comes from a newspaper report in 1858, about the smell of the river.', show: 'ex' },
        { say: 'Before the semicolon: the poor people by the river have put up with the smell for years, with no cure.', show: 'b.0' },
        { say: 'After it: only now that the smell reaches Parliament is anyone paying attention.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Attitude and irony',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Attitude', md: 'What a writer thinks and feels about their subject: approving, critical, sympathetic, alarmed. It shows in the **words they choose**.' }],
      lines: [
        { say: 'A writer’s attitude is what they think and feel about their subject, and it shows in their word choices.', show: 'def' },
        { say: 'Nineteenth-century writers are often polite on the surface and sharp underneath. Calling Parliament’s delay a curious circumstance sounds mild, but it is irony. The writer means that it is shameful.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Polite is not the same as approving', md: 'A formal, courteous style can carry strong criticism. Ask what the writer wants the reader to **think** of what happened.' }],
      lines: [{ say: 'A common mistake is to read a polite style as approval. A formal, courteous writer can still be strongly critical. Ask what they want the reader to think.', show: 'm' }],
    },
    {
      chapter: 'Evidence about its time',
      layout: 'center',
      main: [{ kind: 'text', id: 'ex', md: '*“We were conducted through the spinning room, where some two hundred girls, few of them older than fifteen, attended the machines from six in the morning until seven at night.”*' }],
      lines: [
        { say: 'A text from the past also shows what its writer took for granted. This visitor to a cotton mill in eighteen forty-four reports girls of fifteen working from six in the morning until seven at night.', caption: 'A text from the past also shows what its writer took for granted. This visitor to a cotton mill in 1844 reports girls of fifteen working from six in the morning until seven at night.', show: 'ex' },
        { say: 'That such hours could be shown to visitors tells us that children could work long, hard days at the time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The overseer says the girls are “perfectly contented”, *yet* the visitor notes that “not one of them raised her eyes from her work while he stood near”. What is the visitor’s attitude?',
          choices: ['Impressed by how efficiently the mill is run', 'Bored, and eager to leave', 'Amused by the girls’ hard work', 'Doubtful of the overseer, and sympathetic to the girls'],
          answer: 3,
          working: '“Yet” introduces evidence against the overseer: the girls seem afraid of him.',
        },
      ],
      lines: [
        { say: 'Your turn. The overseer says the girls are perfectly contented, yet the visitor notes that not one of them looked up from her work while he stood near. What is the visitor’s attitude? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The word yet introduces evidence against the overseer. The girls seem afraid of him, and the visitor doubts his claim and feels for them.', caption: 'The answer is D. The word “yet” introduces evidence against the overseer. The girls seem afraid of him, and the visitor doubts his claim and feels for them.', show: 'q.answer' },
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
          items: ['Work out older words from their context.', 'Break long sentences at their joins.', 'Read attitude from word choices; watch for irony.', 'Use the text as evidence about its time.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Work out older words from their context.', show: 'sum.0' },
        { say: 'Break long sentences at their joins, and put each part into your own words.', show: 'sum.1' },
        { say: 'Read the writer’s attitude from their word choices, and watch for polite irony.', show: 'sum.2' },
        { say: 'And use the text as evidence about what its time took for granted.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
