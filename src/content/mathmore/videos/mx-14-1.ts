import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-14-1',
  lessonId: 'mx-14-1',
  title: 'Sampling Methods',
  thumbnail: 't',
  summary: 'A sample is part of a population, and a sampling frame is a list of the population. Simple random, systematic and stratified sampling are random; quota and opportunity sampling are not, so they are quick but can be biased. In a stratified sample each group gives the same fraction: 120 and 80 students give 15 and 10 in a sample of 25. A systematic sample of n from N uses the interval N ÷ n.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'Sampling Methods', subtitle: 'Choosing who to ask' }],
      lines: [
        { say: 'A school wants to know what its one thousand two hundred students think of the new timetable, but asking everyone takes too long.', caption: 'A school wants to know what its 1,200 students think of the new timetable, but asking everyone takes too long.', show: 'title' },
        { say: 'Asking a sample is quicker, and the way the sample is chosen decides whether its answers can be trusted. In this video, you will meet five ways to choose a sample, and see how to share a sample fairly between groups.' },
      ],
    },
    {
      chapter: 'Populations and samples',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Population, sample, sampling frame', md: 'The **population** is everyone or everything we want to know about. A **sample** is the part we collect data from. A **sampling frame** is a list of the population that a sample can be chosen from.' },
      ],
      lines: [
        { say: 'The population is the whole set of people or items we want to know about: here, all the students in the school.', show: 'def' },
        { say: 'A sample is the part of the population that we actually collect data from.' },
        { say: 'And a sampling frame is a list of the members of the population, such as the school register, that we can choose a sample from.' },
      ],
    },
    {
      chapter: 'Five methods',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'How it works', 'Random?'],
          rows: [
            ['Simple random', 'Number everyone and choose numbers at random', 'Yes'],
            ['Systematic', 'Every $k$th member of a list, from a random start', 'Yes'],
            ['Stratified', 'Choose at random from each group, in proportion', 'Yes'],
            ['Quota', 'An interviewer fills a quota for each group', 'No'],
            ['Opportunity', 'Whoever is available at the time', 'No'],
          ],
        },
      ],
      lines: [
        { say: 'In a simple random sample, every member is numbered, and numbers are chosen at random, so everyone has the same chance of being picked.', show: 't.0', focus: 't.0' },
        { say: 'In a systematic sample, we take every k-th member of an ordered list, starting from a random place.', show: 't.1', focus: 't.1' },
        { say: 'In a stratified sample, the population is split into groups, called strata, and members are chosen at random from each group, in proportion to its size.', show: 't.2', focus: 't.2' },
        { say: 'These three are random, and they need a sampling frame. The last two are not random.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'In quota sampling, an interviewer chooses people who fit each group until that group’s quota is filled. In opportunity sampling, we use whoever is available, such as the first people to walk past.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'These are quick and cheap, but they can be biased. Quota sampling is not the same as stratified sampling: both use groups, but in quota sampling nobody is chosen at random.' },
      ],
    },
    {
      chapter: 'A stratified sample',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A sixth form has $120$ students in Year 12 and $80$ in Year 13. A stratified sample of $25$ is taken.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['120 + 80 = 200', '\\text{Year 12: } \\tfrac{120}{200} \\times 25 = 15', '\\text{Year 13: } \\tfrac{80}{200} \\times 25 = 10'] },
        { kind: 'callout', id: 'sys', tone: 'key', title: 'Systematic sampling', md: 'For $n$ from a list of $N$, the interval is $k = \\dfrac{N}{n}$. Start at random among the first $k$.' },
      ],
      lines: [
        { say: 'In a stratified sample, each group gives the same fraction of its members. A sixth form has one hundred twenty students in Year twelve and eighty in Year thirteen. A stratified sample of twenty five is taken. How many come from each year?', show: 'q' },
        { say: 'The population is two hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Year twelve is one hundred twenty out of two hundred of the population, so it gives one hundred twenty over two hundred of the sample: fifteen students.', show: 'm.1', focus: 'm.1' },
        { say: 'Year thirteen gives eighty over two hundred times twenty five, which is ten. Check: fifteen and ten make twenty five.', show: 'm.2', focus: 'm.2' },
        { say: 'For a systematic sample of n from a list of N, the interval is N over n. Choose a random start among the first k, then take every k-th member after it.', show: 'sys' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A club has $90$ adults and $60$ children. A stratified sample of $20$ members is taken. How many children are in it?',
          choices: ['$8$', '$12$', '$10$', '$6$'],
          answer: 0,
          working: 'The club has $150$ members, so $\\dfrac{60}{150} \\times 20 = 8$ children.',
        },
      ],
      lines: [
        { say: 'Your turn. A club has ninety adults and sixty children. A stratified sample of twenty members is taken. How many children are in it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The club has one hundred fifty members, so the children give sixty over one hundred fifty times twenty, which is eight. Choice B is the number of adults.', show: 'q.answer' },
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
          items: ['A sample is part of a population; a sampling frame is a list of it.', 'Simple random, systematic and stratified samples are random.', 'Quota and opportunity samples are quick, but can be biased.', 'Stratified: $\\dfrac{\\text{group size}}{\\text{population}} \\times$ sample size.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sample is part of a population, and a sampling frame is a list of the population.', show: 'sum.0' },
        { say: 'Simple random, systematic and stratified sampling are random, and need a sampling frame.', show: 'sum.1' },
        { say: 'Quota and opportunity sampling are quick and cheap, but can be biased.', show: 'sum.2' },
        { say: 'And in a stratified sample, each group gives its share of the sample. In the next lesson, we measure spread with the variance and standard deviation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
