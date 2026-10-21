import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-10-1-b',
  lessonId: 'm9-10-1',
  title: 'Factors Affecting Data Collection, Part 2: The Use of Language',
  thumbnailTitle: 'The Use of Language',
  thumbnail: false,
  summary:
    'A leading question uses its wording to push people toward an answer: loaded words such as "greasy" or "waste", opinions such as "Don’t you agree…?", and claims about what others think such as "Most students want…". To make a question neutral, remove the push and give fair choices: "Should the town build a new skatepark? (Yes / No / Not sure)". Good wording also uses plain words that people understand.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 2', title: 'The Use of Language', subtitle: 'How the wording changes the answers' }],
      lines: [
        { say: 'The words in a survey question can push people toward an answer, often without them even noticing.', show: 'title' },
        { say: 'In this video, you will learn to spot a leading question, and to rewrite it so it is fair.' },
      ],
    },
    {
      chapter: 'Leading questions',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Leading question',
          md: 'A **leading question** uses its wording to push people toward an answer. A leading question is one cause of **bias**.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['What pushes people', 'Example'],
          rows: [
            ['Loaded words', 'Do you like the **greasy** fries?'],
            ['An opinion', '**Don’t you agree** the park needs a fence?'],
            ['What others think', '**Most students want** a longer lunch. Do you?'],
          ],
        },
      ],
      lines: [
        { say: 'A leading question uses its wording to push people toward an answer. It is one of the most common causes of bias.', show: 'def' },
        { say: 'Here are three ways a question can lead. First, loaded words. A word like greasy makes the fries sound bad before anyone answers.', show: 't.0', focus: 't.0' },
        { say: 'Second, an opinion built into the question. Starting with, don’t you agree, makes it hard to say no.', show: 't.1', focus: 't.1' },
        { say: 'Third, a claim about what other people think. If most students want a longer lunch, many people will just go along with them.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Rewriting a question',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bad', tone: 'mistake', title: 'Leading', md: 'Should the town **waste** money on a new skatepark?' },
        { kind: 'callout', id: 'good', tone: 'key', title: 'Neutral', md: 'Should the town build a new skatepark? (Yes / No / Not sure)' },
      ],
      lines: [
        { say: 'Here is a question from a town survey. Should the town waste money on a new skatepark?', show: 'bad' },
        { say: 'The word waste tells people that the skatepark is a bad idea before they even think about it. Many people will say no just because of that one word.', focus: 'bad' },
        { say: 'To rewrite it, first find the word or phrase that pushes. Here it is waste. Then remove it.' },
        { say: 'Next, give fair choices, so people can answer the way they really feel. Should the town build a new skatepark? Yes, no, or not sure.', show: 'good', focus: 'good' },
        { say: 'Now the question does not lean either way. People who love the idea and people who dislike it can both answer honestly.' },
      ],
    },
    {
      chapter: 'Plain words',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Plain words',
          md: 'The **use of language** also means using words people understand. A question full of hard words gets careless answers.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Hard to understand', 'Plain'],
          rows: [['Do you support reallocating discretionary funds to recreational infrastructure?', 'Should the town spend more money on parks and sports fields?']],
        },
      ],
      lines: [
        { say: 'The use of language is about more than leading words. A question also needs words that people understand.', show: 'tip' },
        { say: 'Read this one. Do you support reallocating discretionary funds to recreational infrastructure? Many people would not be sure what it means.', show: 't.0' },
        { say: 'When people do not understand a question, they guess, or they skip it, and the answers are careless. In plain words: should the town spend more money on parks and sports fields?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which survey question is **neutral**?',
          choices: [
            'Don’t you agree that homework is a waste of time?',
            'Most students think the school day is too long. Do you agree?',
            'How many hours of sleep did you get last night?',
            'Do you enjoy the delicious, healthy meals in the cafeteria?',
          ],
          answer: 2,
          working: 'The sleep question asks for a fact and does not push toward any answer. The others use an opinion, a claim about what most students think, or loaded words (“delicious”, “healthy”).',
        },
      ],
      lines: [
        { say: 'Your turn. Which survey question is neutral? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C. Asking how many hours of sleep you got does not push toward any answer. Choice B tells people what most students think, which pushes them to agree.', show: 'q.answer' },
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
            'A **leading question** pushes people toward an answer. It causes bias.',
            'Watch for loaded words, opinions, and claims about what others think.',
            'To rewrite a question: remove the push, and give fair choices.',
            'Use plain words that people understand.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A leading question pushes people toward an answer, and it causes bias.', show: 'sum.0' },
        { say: 'Watch for loaded words, opinions, and claims about what others think.', show: 'sum.1' },
        { say: 'To rewrite a question, remove the push, and give fair choices.', show: 'sum.2' },
        { say: 'And use plain words that people understand. In the next part, you will look at treating people fairly: ethics, privacy and cultural sensitivity. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
