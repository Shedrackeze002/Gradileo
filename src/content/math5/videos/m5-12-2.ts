import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm5-12-2',
  lessonId: 'm5-12-2',
  title: 'Collecting and Displaying Data, Part 1: Survey Questions',
  thumbnailTitle: 'Survey Questions',
  thumbnail: false,
  summary: 'A closed-list question gives a list of answers to choose from; an open-ended question lets people give any answer, which can then be sorted into categories. Writing a good closed-list question to answer "Which sport should our class play on fun day?"',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 1', title: 'Survey Questions', subtitle: 'Good data starts with a good question' }],
      lines: [
        { say: 'Before you can find a mode, you need data. And good data starts with a good question.', show: 'title' },
        { say: 'A survey is a set of questions you ask a group of people, to collect data. In this video, you will meet two kinds of survey questions, and write a good one.' },
      ],
    },
    {
      chapter: 'Two kinds of questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Closed-list and open-ended questions', md: 'A **closed-list question** gives a list of answers to choose from. An **open-ended question** lets people give any answer they like.' },
        {
          kind: 'table',
          id: 't',
          head: ['Open-ended', 'Closed-list'],
          rows: [
            ['What sport do you like to play?', 'Which sport do you like best: hockey, soccer, basketball or volleyball?'],
            ['What do you eat for breakfast?', 'What do you eat most often for breakfast: cereal, toast, eggs or other?'],
          ],
        },
      ],
      lines: [
        { say: 'There are two kinds of survey questions. A closed-list question gives a list of answers to choose from. An open-ended question lets people give any answer they like.', show: 'def' },
        { say: 'What sport do you like to play? That is open-ended. People could say anything, even a sport you have never heard of.', show: 't.0', focus: 't.0' },
        { say: 'Which sport do you like best: hockey, soccer, basketball or volleyball? That is closed-list. People choose from the list.' },
        { say: 'In the same way, what do you eat for breakfast is open-ended. But giving the choices cereal, toast, eggs or other makes it closed-list.', show: 't.1', focus: 't.1' },
        { say: 'Notice the choice called other. It gives a place for answers that are not on the list.' },
      ],
    },
    {
      chapter: 'Sorting into categories',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Answers to "What do you eat for breakfast?" sorted into categories:' },
        { kind: 'table', id: 't', head: ['Category', 'Answers'], rows: [['grains', 'cereal, toast, rice, oatmeal'], ['fruit', 'banana, berries, apple'], ['dairy', 'yogurt, milk, cheese'], ['other', 'eggs, soup']] },
      ],
      lines: [
        { say: 'Open-ended answers can all be different, so they are hard to count. If twenty people give twenty different answers, there is no mode at all!', show: 'q' },
        { say: 'But you can still sort them into categories. Breakfast answers can be grouped into grains, fruit, dairy and other.', show: 't' },
        { say: 'Cereal, toast, rice and oatmeal are all grains. Banana, berries and apple are fruit.', focus: ['t.0', 't.1'] },
        { say: 'Yogurt, milk and cheese are dairy, and anything else goes in other. Now you can count each category, and find the mode.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Choosing a survey question',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Statistical question: "Which sport should our class play on fun day?"' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Ask about the same topic: sports for fun day.', 'Give a short list of choices the class could really play.', '**"Which sport would you like to play on fun day: soccer, basketball, kickball or relay races?"**'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Then find the mode', md: 'The mode of the answers answers the statistical question.' },
      ],
      lines: [
        { say: 'Your class wants to answer the statistical question: which sport should our class play on fun day? Let’s write a good closed-list survey question for it.', show: 'q' },
        { say: 'First, the survey question must be about the same topic: sports for fun day. Asking about favourite foods would not help!', show: 'b.0' },
        { say: 'Second, give a short list of choices that the class could really play on the day.', show: 'b.1' },
        { say: 'Here is a good question: which sport would you like to play on fun day: soccer, basketball, kickball or relay races?', show: 'b.2', focus: 'b.2' },
        { say: 'Ask the class, count the answers, and find the mode. The mode of the answers answers the statistical question.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a **closed-list** question?',
          choices: ['What is your favourite animal?', 'Which pet would you like best: a cat, a dog, a fish or a rabbit?', 'What did you do on the weekend?', 'What is your favourite song?'],
          answer: 1,
          working: 'It gives a list of answers to choose from. The other questions let people give any answer.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a closed-list question? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. It gives a list of answers to choose from: a cat, a dog, a fish or a rabbit. Choice A lets people name any animal at all, so it is open-ended.', show: 'q.answer' },
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
          items: ['A closed-list question gives choices.', 'An open-ended question allows any answer. Its answers can be sorted into categories.', 'A good survey question fits the statistical question, with a short list of real choices.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A closed-list question gives a list of choices.', show: 'sum.0' },
        { say: 'An open-ended question allows any answer, and its answers can be sorted into categories.', show: 'sum.1' },
        { say: 'And a good survey question fits the statistical question, with a short list of real choices. In the next part, you will put answers in a frequency table. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
