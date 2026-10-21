import type { Explainer } from '@/video/script.ts';

const STEPS = [
  '**1.** Write a clear **question** to investigate.',
  '**2.** Choose a **data-collection method**, thinking about bias, privacy and other social issues.',
  '**3.** Decide on a **population or a sample**, and choose who will take part.',
  '**4.** **Collect** the data.',
  '**5.** **Organize** the data and **display** it in a suitable graph or table.',
  '**6.** **Analyze** the data and draw **conclusions** that answer the question.',
];

const video: Explainer = {
  id: 'm9-10-3',
  lessonId: 'm9-10-3',
  title: 'Developing a Project Plan, Part 1: The Six Steps',
  thumbnailTitle: 'The Six Steps',
  thumbnail: false,
  summary:
    'A project plan lists the steps for answering a question with data: write a clear question; choose a data-collection method, thinking about bias, privacy and other social issues; decide on a population or a sample and choose who will take part; collect the data; organize and display it; and analyze it to draw conclusions that answer the question. Each step depends on the one before, shown with a project about how much students at a school sleep.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 1', title: 'The Six Steps', subtitle: 'From a question to an answer' }],
      lines: [
        { say: 'How much do the students at your school really sleep? How do most of them get to school? A data project lets you answer questions like these with evidence.', show: 'title' },
        { say: 'A good plan makes the difference between a useful answer and a pile of confusing numbers. In this video, you will learn the six steps of a project plan.' },
      ],
    },
    {
      chapter: 'A project plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: STEPS }],
      lines: [
        { say: 'A project plan lists the steps for answering a question with data. Step one: write a clear question to investigate.', show: 'b.0', focus: 'b.0' },
        { say: 'Step two: choose a way to collect the data, and think about the social issues you have met, such as bias and privacy.', show: 'b.1', focus: 'b.1' },
        { say: 'Step three: decide whether to use the whole population or a sample, and choose who will take part.', show: 'b.2', focus: 'b.2' },
        { say: 'Step four: collect the data.', show: 'b.3', focus: 'b.3' },
        { say: 'Step five: organize the data, and display it in a suitable graph or table.', show: 'b.4', focus: 'b.4' },
        { say: 'And step six: analyze the data, and draw conclusions that answer your question.', show: 'b.5', focus: 'b.5' },
      ],
    },
    {
      chapter: 'One step at a time',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'In order',
          md: 'Each step depends on the one before. You cannot graph data you have not collected, and you cannot collect data until you know what you are asking.',
        },
      ],
      lines: [
        { say: 'The order matters, because each step depends on the one before.', show: 'key' },
        { say: 'You cannot graph data you have not collected. And you cannot collect data until you know exactly what you are asking.' },
      ],
    },
    {
      chapter: 'A sleep project',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'The sleep project'],
          rows: [
            ['Question', 'On a school night, how many hours do students at our school sleep?'],
            ['Method', 'An anonymous survey with one neutral question'],
            ['Who', '$50$ students chosen at random from the list of all students'],
            ['Collect', 'Hand out the survey on an ordinary school day'],
            ['Display', 'A bar graph of the hours of sleep'],
            ['Conclude', 'About how much do most students sleep?'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s follow a whole plan. The question: on a school night, how many hours do students at our school sleep?', show: 't.0', focus: 't.0' },
        { say: 'The method: a survey. Make it anonymous, so students can answer honestly, and use one neutral question.', show: 't.1', focus: 't.1' },
        { say: 'Who takes part: the school is large, so choose a random sample of fifty students from the list of all students.', show: 't.2', focus: 't.2' },
        { say: 'Collect the data on an ordinary school day, not right after a holiday, when sleep might be unusual. That keeps the timing fair.', show: 't.3', focus: 't.3' },
        { say: 'Display the answers in a bar graph, with the number of hours along the bottom.', show: 't.4', focus: 't.4' },
        { say: 'Finally, use the graph to answer the question. For example, find the most common number of hours in the sample, and say what that suggests about the whole school.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a project plan, which step comes **right before** collecting the data?',
          choices: [
            'Analyze the data and draw conclusions.',
            'Decide on a population or a sample, and choose who will take part.',
            'Display the data in a graph or table.',
            'Organize the data.',
          ],
          answer: 1,
          working: 'The steps are: question, method, population or sample, **collect**, organize and display, then conclude. So choosing who will take part comes right before collecting.',
        },
      ],
      lines: [
        { say: 'Your turn. In a project plan, which step comes right before collecting the data? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B. You need to know who will take part before you can collect their answers. Choice C comes after collecting, because you cannot graph data you do not have yet.', show: 'q.answer' },
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
            'A project plan: **question**, **method**, **population or sample**, **collect**, **display**, **conclude**.',
            'Think about bias, privacy and other social issues when you choose a method.',
            'Each step depends on the one before.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A project plan has six steps: the question, the method, a population or a sample, collecting, displaying, and concluding.', show: 'sum.0' },
        { say: 'Think about bias, privacy and the other social issues when you choose a method.', show: 'sum.1' },
        { say: 'And each step depends on the one before. In the next part, you will learn how to write a good project question. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
