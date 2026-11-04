import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-1-6',
  lessonId: 'mx-1-6',
  title: 'Surveys, Experiments and Simulation, Part 1: Three Kinds of Study',
  thumbnailTitle: 'Three Kinds of Study',
  thumbnail: false,
  summary: 'A survey asks a sample questions, an observational study records what happens, and an experiment gives a treatment to some subjects and compares them with a control group. Only a randomized experiment can show cause and effect; an observational study can show an association that a confounding variable might explain.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays · Part 1', title: 'Three Kinds of Study', subtitle: 'And which one shows cause and effect' }],
      lines: [
        { say: 'Does a new fertilizer make plants grow taller? Do students who play music do better at mathematics?', show: 'title' },
        { say: 'How the data are collected decides what a study can tell us, and above all, whether it can show that one thing causes another. In this video, you will learn the three kinds of study, and which one can show cause and effect.' },
      ],
    },
    {
      chapter: 'Three kinds of study',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A **sample survey** asks a sample of people questions, to learn about a population.', 'An **observational study** records what happens, without changing anything: the subjects are already in their groups.', 'An **experiment** gives a **treatment** to some subjects and not to others (the **control group**), and compares the results.'],
        },
      ],
      lines: [
        { say: 'A sample survey asks a sample of people questions, to learn about a whole population. For example, asking two hundred voters which candidate they prefer.', show: 'b.0', focus: 'b.0' },
        { say: 'An observational study records what happens, without changing anything. The subjects are already in their groups. For example, comparing the marks of students who already play music with those who do not.', show: 'b.1', focus: 'b.1' },
        { say: 'An experiment gives a treatment to some subjects and not to others, and compares the results. The subjects who get no treatment are called the control group. For example, giving fertilizer to some plants and not to others.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Naming the study',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'q', items: ['(a) A researcher records whether people who own dogs walk more than people who do not.', '(b) A researcher gives half of a group of volunteers, chosen at random, a step counter with reminders, and the other half a plain step counter, and compares how far they walk.'] },
        { kind: 'text', id: 'ans', md: '(a) [[adj:Observational study]] (b) [[opp:Experiment]]', align: 'center' },
      ],
      lines: [
        { say: 'Which kind of study is each of these? In the first, a researcher records whether people who own dogs walk more than people who do not.', show: 'q.0', focus: 'q.0' },
        { say: 'People already own a dog or not, and the researcher only records what happens. So this is an observational study.', show: 'ans', focus: 'q.0' },
        { say: 'In the second, a researcher gives half of a group of volunteers, chosen at random, a step counter with reminders, and the other half a plain step counter. Then the researcher compares how far they walk.', show: 'q.1', focus: 'q.1' },
        { say: 'Here the researcher decides, at random, who gets the reminders. So this is an experiment.', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Confounding variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Confounding variable', md: 'A hidden difference between the groups that could explain the result. Do dog owners walk more **because** of their dogs, or do people who like walking get dogs?' },
      ],
      lines: [
        { say: 'Suppose the dog study finds that dog owners walk more. Does owning a dog make people walk more? Not necessarily.', show: 'def' },
        { say: 'In an observational study, the groups can differ in other ways. Dog owners might walk more because of their dogs. Or people who already like walking might be more likely to get dogs.' },
        { say: 'A hidden difference like this, one that could explain the result, is called a confounding variable.' },
      ],
    },
    {
      chapter: 'Cause and effect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Randomized experiment', md: '**Chance** decides which subjects get the treatment, so the groups are alike on average in every other way. Only a randomized experiment can show **cause and effect**.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Association is not causation', md: 'An observational study can show that two things go **together**. It cannot show that one **causes** the other.' },
      ],
      lines: [
        { say: 'An experiment can get around confounding variables. In a randomized experiment, chance decides which subjects get the treatment, for example by drawing names from a hat.', show: 'def' },
        { say: 'Then the groups are alike on average in every other way: the same mix of walkers and non-walkers, of young and old. So a clear difference in the results can be put down to the treatment.' },
        { say: 'That is why only a randomized experiment can show cause and effect. An observational study can show that two things go together, which is called an association. But it cannot show that one causes the other, because a confounding variable might explain both.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school compares the reading scores of students who chose to join a reading club with those who did not. What kind of study is this?',
          choices: ['A randomized experiment', 'An observational study', 'A sample survey', 'An experiment with a control group'],
          answer: 1,
          working: 'The students chose their own groups, and the school only records the scores: an observational study. It cannot show that the club causes better reading.',
        },
      ],
      lines: [
        { say: 'Your turn. A school compares the reading scores of students who chose to join a reading club with those who did not. What kind of study is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, an observational study. The students chose their own groups, and the school only records the scores. Students who already love reading may be the ones who join, so this study cannot show that the club causes better reading.', show: 'q.answer' },
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
          items: ['A survey asks questions; an observational study records what happens.', 'An experiment gives a treatment and compares with a control group.', 'A confounding variable is a hidden difference that could explain a result.', 'Only a randomized experiment can show cause and effect.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sample survey asks questions, and an observational study records what happens without changing anything.', show: 'sum.0' },
        { say: 'An experiment gives a treatment to some subjects and compares them with a control group.', show: 'sum.1' },
        { say: 'A confounding variable is a hidden difference between groups that could explain a result.', show: 'sum.2' },
        { say: 'And only a randomized experiment can show cause and effect. In the next part, we use simulation to judge whether a result is unusual. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
