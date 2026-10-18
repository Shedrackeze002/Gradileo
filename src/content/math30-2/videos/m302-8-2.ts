import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-8-2',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 1: Choosing a Research Question',
  thumbnailTitle: 'Choosing a Research Question',
  thumbnail: false,
  summary: 'The five stages of a mathematics research project (question, plan, collect, analyze, present) and how to choose a research question that is specific, measurable and realistic, with a screen-time example improved step by step and a vague topic narrowed into a question data can answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 1', title: 'Choosing a Research Question', subtitle: 'The first step of a research project' }],
      lines: [
        { say: 'How many kilometres do students at your school travel each week? Is the price of a used truck related to its age?', show: 'title' },
        { say: 'A mathematics research project lets you choose a question that matters to you, collect real data, and use mathematics to answer it. In this video, you will see the stages of a project, and learn how to write a research question that works.' },
      ],
    },
    {
      chapter: 'The stages of a project',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Question**: choose one specific question to answer.',
            '**Plan**: decide what data you need and where to get them, and set a date for each stage.',
            '**Collect** the data fairly.',
            '**Analyze** the data with graphs and statistics.',
            '**Present** what the data show, and what they do not.',
          ],
        },
      ],
      lines: [
        { say: 'A research project has five stages. First, choose one specific question to answer.', show: 'b.0' },
        { say: 'Second, plan. Decide what data you need, where you will get them and how you will collect them. Set a date for finishing each stage, so that the work does not pile up at the end.', show: 'b.1' },
        { say: 'Third, collect the data, in a way that is fair.', show: 'b.2' },
        { say: 'Fourth, analyze the data, with graphs and with statistics such as the mean and the median.', show: 'b.3' },
        { say: 'And fifth, present your findings: what the data show, and also what they do not show.', show: 'b.4' },
        { say: 'Everything else depends on the first stage, so that is where this video starts. The next parts cover collecting, analyzing and presenting.' },
      ],
    },
    {
      chapter: 'A good research question',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Research question', md: 'The specific question your project will answer by collecting and analyzing data.' },
        { kind: 'bullets', id: 'b', items: ['**Specific**: it names who or what is being studied.', '**Measurable**: it can be answered with numerical data.', '**Realistic**: you can get the data in the time you have.'] },
      ],
      lines: [
        { say: 'A research question is the specific question your project will answer by collecting and analyzing data. A good research question has three qualities.', show: 'def' },
        { say: 'It is specific: it names who or what is being studied.', show: 'b.0' },
        { say: 'It is measurable: it can be answered with numerical data, such as counts, times or lengths.', show: 'b.1' },
        { say: 'And it is realistic: you can actually get the data in the time you have.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Improving a question',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Kwame wants to study screen time. Which question works best?' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '“How does technology affect people?” [[bad:Far too broad.]]',
            '“Is screen time bad?” [[bad:Asks for an opinion.]]',
            '“Is there a relationship between daily screen time and hours of sleep for Grade 12 students at my school?” [[good:Specific and measurable.]]',
          ],
        },
      ],
      lines: [
        { say: 'Kwame wants to study screen time. Which of these three questions works best?', show: 'p' },
        { say: 'How does technology affect people? That is far too broad. Which technology, which people, and affected in what way? No single set of data could answer it.', show: 'b.0' },
        { say: 'Is screen time bad? That asks for an opinion, not a measurement. Bad for what, and compared with what?', show: 'b.1' },
        { say: 'Is there a relationship between daily screen time and hours of sleep for Grade 12 students at my school? This one names the population, Grade 12 students at one school, and two quantities that can be measured and compared: hours of screen time, and hours of sleep.', show: 'b.2' },
        { say: 'It is realistic too: a short survey of students could collect both numbers in a week or two. So the third question is the best.' },
      ],
    },
    {
      chapter: 'From topic to question',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Topic: travel',
            'Too broad: “How do people get around?”',
            'Better: “On average, how many kilometres do Grade 12 students at my school travel to and from school each week?”',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Test your question', md: 'Is it specific? Is it measurable? Is it realistic?' },
      ],
      lines: [
        { say: 'To write your own question, start with a topic that interests you, and narrow it down. Say the topic is travel.', show: 'b.0' },
        { say: 'How do people get around? That is too broad to answer with data.', show: 'b.1' },
        { say: 'On average, how many kilometres do Grade 12 students at my school travel to and from school each week? That names who is being studied, asks for a number, and could be answered with a short survey.', show: 'b.2' },
        { say: 'Before you start, test your question. Is it specific? Is it measurable? Is it realistic? If the answer to any of these is no, narrow it down again.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which research question is best?',
          choices: [
            'Are trucks expensive?',
            'What do people think of trucks?',
            'For used pickup trucks advertised on one website this month, how is the asking price related to the age of the truck?',
            'How has the value of every vehicle in the world changed since cars were invented?',
          ],
          answer: 2,
          working: 'It is specific (used pickup trucks on one website this month), measurable (price and age are numbers) and realistic (the listings can be collected in a few hours).',
        },
      ],
      lines: [
        { say: 'Your turn. Which research question is best? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It names exactly which trucks, two quantities that can be measured, price and age, and data that can be collected in a few hours. Choice D could be measured in principle, but it is not realistic: no student could collect those data.', show: 'q.answer' },
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
            'A project has five stages: question, plan, collect, analyze and present.',
            'A good research question is **specific**, **measurable** and **realistic**.',
            'Narrow a topic down until it names who is studied and what is measured.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A research project has five stages: question, plan, collect, analyze and present.', show: 'sum.0' },
        { say: 'A good research question is specific, measurable and realistic.', show: 'sum.1' },
        { say: 'To write one, narrow a topic down until it names who is studied and what is measured. In the next part, you will plan how to collect your data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
