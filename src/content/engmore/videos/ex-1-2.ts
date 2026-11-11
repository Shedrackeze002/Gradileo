import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-1-2',
  lessonId: 'ex-1-2',
  title: 'Summarising the Differences between Two Texts',
  thumbnailTitle: 'Summarising Differences',
  thumbnail: false,
  summary:
    'A summary of two texts selects the details that answer the question and brings both sources together. For each point, state the difference in one sentence, quote each source briefly, and add an inference: a conclusion the texts do not state but their details support.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Evaluating and Comparing Texts', title: 'Summarising Differences', subtitle: 'Two texts, one answer' }],
      lines: [
        { say: 'Two friends go to the same concert. One says it was crowded, loud and wonderful. The other says it was crowded, loud and unbearable.', show: 'title' },
        { say: 'To say how their evenings differed, you would pick out the points that matter, set them side by side, and say what the difference shows. In this lesson, you will do that with two texts.' },
      ],
    },
    {
      chapter: 'What the question asks for',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Summary', md: 'The **main points** of a text, given briefly in your own words. A summary of two texts brings together details from both.' },
        { kind: 'bullets', id: 'b', items: ['**State the difference**, with both sources in one sentence.', '**Give evidence**: a short quotation from each source.', '**Make an inference** about what the difference suggests.'] },
      ],
      lines: [
        { say: 'A summary gives the main points of a text briefly, in your own words. A summary of two texts brings together details from both.', show: 'def' },
        { say: 'A summary question names a focus, such as the differences between two journeys. For each point, a good answer does three things. It states the difference, with both sources in one sentence.', show: 'b.0', focus: 'b.0' },
        { say: 'It gives evidence, a short quotation from each source. And it makes an inference about what the difference suggests.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Stating a difference',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'a', size: 'md', lines: ['I walk to school with my headphones in. It takes eleven minutes, and I could not tell you the name of one street.'], by: 'Source A, a modern writer' },
        { kind: 'quote', id: 'b', size: 'md', lines: ['We walked four miles to the schoolhouse, and I knew every gate, every dog and every farmer by name along the way.'], by: 'Source B, a nineteenth-century writer' },
        { kind: 'text', id: 's', size: 'md', md: 'In Source A the walk to school is short, **while** in Source B it is long.' },
      ],
      lines: [
        { say: 'Here are two sources about a walk to school. Source A is modern. I walk to school with my headphones in. It takes eleven minutes, and I could not tell you the name of one street.', show: 'a' },
        { say: 'Source B is from the nineteenth century. We walked four miles to the schoolhouse, and I knew every gate, every dog and every farmer by name along the way.', show: 'b' },
        { say: 'Begin with what is true in each source, joined by a comparing word such as while, whereas or but. In Source A the walk to school is short, while in Source B it is long.', show: 's', focus: 's' },
      ],
    },
    {
      chapter: 'Evidence and inference',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inference', md: 'A conclusion that the text **does not state**, but that its details **support**.' },
        { kind: 'text', id: 'p', size: 'md', md: 'In Source A the writer notices nothing on his walk (“could not tell you the name of one street”), while in Source B the writer knows everything along the way (“every gate, every dog and every farmer”). **This suggests that** the modern walker is cut off from his surroundings, while the earlier walker belonged to his.' },
      ],
      lines: [
        { say: 'Each half of the statement needs its own short quotation, and both must be about the same focus.' },
        { say: 'Then add an inference. An inference is a conclusion that the text does not state, but that its details support.', show: 'def' },
        { say: 'Here is a full point. In Source A the writer notices nothing on his walk, while in Source B the writer knows everything along the way. This suggests that the modern walker is cut off from his surroundings, while the earlier walker belonged to his.', show: 'p', focus: 'p' },
        { say: 'Neither writer says so, but the details support it. An inference must follow from the text. Children then were fitter than children today may or may not be true, but nothing in these sources tells us.' },
      ],
    },
    {
      chapter: 'Two common mistakes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm1', tone: 'mistake', title: 'Getting the sources the wrong way round', md: 'Check each half of your sentence against the right text before you move on.' },
        { kind: 'callout', id: 'm2', tone: 'mistake', title: 'Analysing the language', md: '“The list of three is effective” belongs in a language question. A summary deals with **what** the texts say, not **how** they say it.' },
      ],
      lines: [
        { say: 'Watch out for two mistakes. Under time pressure, it is easy to give Source A’s detail to Source B, so check each half of your sentence against the right text.', show: 'm1' },
        { say: 'And do not analyse the writer’s words in a summary. A summary deals with what the texts say, and what can be inferred, not with how they say it.', show: 'm2', focus: 'm2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is a fair inference about the writer of Source A?',
          choices: ['He dislikes listening to music.', 'He pays little attention to his surroundings.', 'He lives a long way from his school.', 'He is fitter than the writer of Source B.'],
          answer: 1,
          working: 'He cannot name one street on a walk he makes every day. Nothing in the text supports the others.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is a fair inference about the writer of Source A? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. He cannot name one street on a walk he makes every day, so he pays little attention to his surroundings. Choice A goes against the text, because he walks with his headphones in.', show: 'q.answer' },
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
            'A summary of two texts selects the details that answer the question.',
            'State the difference, quote each source briefly, and infer what it suggests.',
            'Join the two halves with a comparing word: while, whereas, but.',
            'An inference goes beyond what is stated, but the text must support it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A summary of two texts selects the details that answer the question, and leaves the rest out.', show: 'sum.0' },
        { say: 'For each point, state the difference, quote each source briefly, and infer what the difference suggests.', show: 'sum.1' },
        { say: 'Join the two halves with a comparing word, such as while, whereas or but.', show: 'sum.2' },
        { say: 'And an inference goes beyond what is stated, but the text must support it.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
