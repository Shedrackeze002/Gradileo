import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-10-1-c',
  lessonId: 'm9-10-1',
  title: 'Factors Affecting Data Collection, Part 3: Ethics, Privacy and Cultural Sensitivity',
  thumbnailTitle: 'Ethics and Privacy',
  thumbnail: false,
  summary:
    'Ethics means collecting data honestly and fairly, without harming or pressuring anyone, and using it only in the way people were told. Privacy means protecting personal information. Cultural sensitivity means respecting people’s cultures, beliefs and traditions. Asking for a home address and family income raises privacy; changing answers to fit a prediction raises ethics; asking every student what gifts they will get for Christmas raises cultural sensitivity, because not every student celebrates it. A survey about something sensitive should be anonymous.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 3', title: 'Ethics, Privacy and Cultural Sensitivity', subtitle: 'Treat people fairly' }],
      lines: [
        { say: 'Behind every piece of data is a real person who chose to answer. A good survey treats those people fairly.', show: 'title' },
        { say: 'In this video, you will learn three factors about treating people well: ethics, privacy and cultural sensitivity.' },
      ],
    },
    {
      chapter: 'Three factors',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Ethics:** collect data honestly and fairly, without harming or pressuring anyone, and use it only in the way people were told.',
            '**Privacy:** protect personal information. Ask only for what is needed, and keep answers private.',
            '**Cultural sensitivity:** respect people’s cultures, beliefs and traditions in the questions and the choices.',
          ],
        },
      ],
      lines: [
        { say: 'First, ethics. Ethics means collecting data honestly and fairly. You never harm or pressure anyone into answering, and you use the data only in the way you told people you would.', show: 'b.0', focus: 'b.0' },
        { say: 'For example, if you tell people their answers are for a class project, you cannot later post them online.' },
        { say: 'Second, privacy. Privacy means protecting personal information. People should not have to share more than is needed, and their answers should be kept private.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, cultural sensitivity. That means respecting people’s cultures, beliefs and traditions, in the questions you ask and in the choices you give.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Three problems',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which factor does each plan raise?' },
        {
          kind: 'table',
          id: 't',
          head: ['Plan', 'Factor'],
          rows: [
            ['(a) A survey asks students for their name, home address and family income.', '**Privacy**'],
            ['(b) A student changes some answers so the results support the prediction the student made.', '**Ethics**'],
            ['(c) A survey asks every student what gifts they will get for Christmas.', '**Cultural sensitivity**'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s try three plans. Which factor does each one raise?', show: 'q' },
        { say: 'The first plan asks students for their name, home address and family income. Those are personal details, and a survey rarely needs them. That is a privacy problem.', show: 't.0', focus: 't.0' },
        { say: 'In the second plan, a student changes some answers so the results support the prediction the student made. Changing data is dishonest, so that is an ethics problem.', show: 't.1', focus: 't.1' },
        { say: 'The third plan asks every student what gifts they will get for Christmas. Not every student celebrates Christmas, so the question does not respect everyone’s traditions. That is a cultural sensitivity problem.', show: 't.2', focus: 't.2' },
        { say: 'A fairer question would ask about something everyone can answer, such as a favourite season, or would offer choices that include everyone.' },
      ],
    },
    {
      chapter: 'Names on a sensitive survey',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Names on a sensitive survey',
          md: 'A survey about cheating or health that asks for names is a **privacy** problem, and it also gives **poor data**, because people will not answer honestly. Make sensitive surveys **anonymous**.',
        },
      ],
      lines: [
        { say: 'Watch out for this one. Imagine a survey that asks students whether they have ever cheated on a test, with a space for their name at the top.', show: 'oops' },
        { say: 'That is a privacy problem. But it is also a data problem. Students who have cheated are unlikely to admit it with their name on the page, so the answers will not be honest.' },
        { say: 'The fix is to make the survey anonymous. Anonymous means that no names or other details are collected, so nobody can tell who gave which answer.' },
        { say: 'When people know their answers cannot be traced back to them, they are much more likely to tell the truth.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student wants to show that most classmates like one band best, so the student leaves out the votes for every other band. Which factor does this raise?',
          choices: ['Privacy', 'Ethics', 'Timing', 'Cost'],
          answer: 1,
          working: 'Leaving out votes on purpose is dishonest, so it raises **ethics**. No personal information is shared, so it is not a privacy problem.',
        },
      ],
      lines: [
        { say: 'Your turn. A student wants to show that most classmates like one band best, so the student leaves out the votes for every other band. Which factor does this raise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ethics. Leaving out votes on purpose is dishonest. Choice A, privacy, is about protecting personal information, and no personal information is shared here.', show: 'q.answer' },
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
            '**Ethics:** be honest and fair, never harm or pressure people, and use data only as promised.',
            '**Privacy:** protect personal information, and ask only for what is needed.',
            '**Cultural sensitivity:** respect everyone’s cultures, beliefs and traditions.',
            'Make a survey about a sensitive topic **anonymous**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Ethics: be honest and fair, never harm or pressure people, and use the data only as you promised.', show: 'sum.0' },
        { say: 'Privacy: protect personal information, and ask only for what you need.', show: 'sum.1' },
        { say: 'Cultural sensitivity: respect everyone’s cultures, beliefs and traditions.', show: 'sum.2' },
        { say: 'And make a survey about a sensitive topic anonymous. In the next part, you will look at cost, time and timing. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
