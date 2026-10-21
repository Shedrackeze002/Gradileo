import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-10-3-b',
  lessonId: 'm9-10-3',
  title: 'Developing a Project Plan, Part 2: Writing a Good Question',
  thumbnailTitle: 'A Good Question',
  thumbnail: false,
  summary:
    'A good project question is clear and specific: it names the population, says exactly what will be measured or counted, uses neutral words and respects people’s privacy. "Do teens use screens too much?" is vague, and "Don’t you agree that phones are ruining teenagers’ lives?" is a leading question; "On a typical school day, how many hours do students at our school spend on screens outside of class?" names the population and something you can measure. A question about every person in the world sounds clear, but the data could never be collected.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 2', title: 'Writing a Good Question', subtitle: 'Clear, specific, measurable and fair' }],
      lines: [
        { say: 'Every data project starts with a question. If the question is fuzzy, the whole project goes fuzzy with it.', show: 'title' },
        { say: 'In this video, you will learn what makes a good project question, and practise choosing one.' },
      ],
    },
    {
      chapter: 'A good question',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Good project question',
          md: 'A **good project question** is clear and specific. It:',
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['names the **population**,', 'says exactly what will be **measured or counted**,', 'uses **neutral** words, and', 'respects people’s **privacy**.'],
        },
      ],
      lines: [
        { say: 'A good project question is clear and specific. It does four things.', show: 'def' },
        { say: 'It names the population: exactly who you want to learn about.', show: 'b.0', focus: 'b.0' },
        { say: 'It says exactly what will be measured or counted, such as hours, or the number of people who choose each option.', show: 'b.1', focus: 'b.1' },
        { say: 'It uses neutral words, so it does not push people toward an answer.', show: 'b.2', focus: 'b.2' },
        { say: 'And it respects people’s privacy, by asking only for what the project needs.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Choosing a question',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which question is best for a project about screen time?' },
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Verdict'],
          rows: [
            ['(A) Do teens use screens too much?', 'Vague'],
            ['(B) Don’t you agree that phones are ruining teenagers’ lives?', 'Leading'],
            ['(C) On a typical school day, how many hours do students at our school spend on screens outside of class?', '**Good**'],
          ],
        },
      ],
      lines: [
        { say: 'Which question is best for a project about screen time? Question A: do teens use screens too much?', show: ['q', 't.0'], focus: 't.0' },
        { say: 'That is vague. Which teens? And what is too much? Two people could answer it in completely different ways.' },
        { say: 'Question B: don’t you agree that phones are ruining teenagers’ lives? That is a leading question. It pushes people to agree.', show: 't.1', focus: 't.1' },
        { say: 'Question C: on a typical school day, how many hours do students at our school spend on screens outside of class?', show: 't.2', focus: 't.2' },
        { say: 'It names the population, the students at our school. It says exactly what to measure, hours per day. And its words are neutral. So question C is the best.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Questions you cannot answer',
          md: '“Which sport does every person in the world like best?” sounds clear, but you could never collect the data. Choose a population you can actually reach.',
        },
      ],
      lines: [
        { say: 'Watch out for a question that sounds clear, but cannot be answered. Which sport does every person in the world like best?', show: 'oops' },
        { say: 'It is short and neutral. But you could never ask every person in the world, or even a fair sample of them, for a class project.' },
        { say: 'Choose a population you can actually reach, such as the students at your school, or the people on your street.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best question for a project about exercise?',
          choices: [
            'Do teens these days get enough exercise, or not enough?',
            'Don’t you agree that video games are making teens lazy and unfit?',
            'In a typical week, how many hours do students at our school spend exercising outside of class?',
            'Which kind of exercise does every person in the world like best?',
          ],
          answer: 2,
          working: 'It names the population (students at our school), says exactly what to measure (hours of exercise in a typical week) and uses neutral words.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best question for a project about exercise? Pause the video and try it.', show: 'q', wait: 10 },
        { say: 'The answer is C. It names the population, says exactly what to measure, and uses neutral words. Choice A is vague: which teens, and how much exercise is enough?', show: 'q.answer' },
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
            'A good question names the **population** and what will be **measured or counted**.',
            'It uses **neutral** words and respects **privacy**.',
            'Avoid vague questions and leading questions.',
            'Choose a population you can actually reach.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A good question names the population, and says what will be measured or counted.', show: 'sum.0' },
        { say: 'It uses neutral words, and respects privacy.', show: 'sum.1' },
        { say: 'Avoid questions that are vague, and questions that lead.', show: 'sum.2' },
        { say: 'And choose a population you can actually reach. In the next part, you will choose the best way to collect the data. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
