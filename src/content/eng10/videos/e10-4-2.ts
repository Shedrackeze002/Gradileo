import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-4-2',
  lessonId: 'e10-4-2',
  title: 'Argument and Evidence',
  thumbnail: false,
  summary:
    'Take an argument apart into its claim, reasons, evidence, counterclaim and rebuttal, tell fact from opinion, and judge how strong the evidence is.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Non-fiction and Persuasion', title: 'Argument and Evidence', subtitle: 'Taking an argument apart' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Must I undertake to prove that the slave is a man? That point is conceded already. Nobody doubts it.'], by: 'Frederick Douglass, 1852' },
      ],
      lines: [
        { say: 'In eighteen fifty-two, Frederick Douglass, who had escaped from slavery, was invited to give an Independence Day speech. He asked: Must I undertake to prove that the slave is a man? That point is conceded already.', show: ['title', 'q'] },
        { say: 'Douglass knew exactly how arguments are built. In this lesson, you will take an argument apart, and learn to tell fact from opinion and to judge evidence.' },
      ],
    },
    {
      chapter: 'The parts of an argument',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'What it does'],
          rows: [
            ['Claim', 'the writer’s main position'],
            ['Reason', 'explains why the writer holds the claim'],
            ['Evidence', 'facts, numbers, examples or expert opinions that back a reason'],
            ['Counterclaim', 'states an opposing view'],
            ['Rebuttal', 'answers the counterclaim'],
          ],
        },
      ],
      lines: [
        { say: 'Every argument has a claim. This is the main position the whole argument sets out to prove.', show: 't.0', focus: 't.0' },
        { say: 'A reason explains why the writer holds the claim. Evidence backs up a reason with specific facts, numbers, examples or expert opinions.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'A good writer also states a counterclaim, an opposing view, and then answers it with a rebuttal. Counterclaims often begin with some people argue, and rebuttals often begin with however.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Fact and opinion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fact and opinion', md: 'A **fact** can be checked and proved true or false. An **opinion** is a judgment that people can reasonably disagree about.' },
        { kind: 'text', id: 'ex', size: 'md', md: '**Fact:** Light travels faster than sound.\n\n**Opinion:** Summer is the most enjoyable season.' },
      ],
      lines: [
        { say: 'A fact is a statement that can be checked and proved true or false. Light travels faster than sound is a fact.', show: ['def', 'ex'] },
        { say: 'An opinion is a judgment people can disagree about. Summer is the most enjoyable season is an opinion. Judging words such as best, worst and should often give opinions away.', focus: 'ex' },
        { say: 'A statement can be a fact and still be false. The Pacific is the smallest ocean can be checked, and it is wrong.' },
      ],
    },
    {
      chapter: 'Strong evidence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'e',
          head: ['Kind of evidence', 'Example'],
          rows: [
            ['Statistic', 'In a survey of 300 students, 64 percent said their homes were too noisy.'],
            ['Anecdote', 'When my cousin started reading every week, her essays improved.'],
            ['Expert testimony', 'A professor of education calls daily reading the best habit a student can build.'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Strong evidence is', md: '**Relevant**, **specific** and **credible**.' },
      ],
      lines: [
        { say: 'Evidence comes in several kinds. A statistic uses numbers, an anecdote is a short personal story, and expert testimony is the view of someone with special knowledge.', show: 'e' },
        { say: 'Strong evidence is relevant, because it is about the claim. It is specific, so it can be checked. And it is credible, because it comes from a trustworthy source.', show: 'tip' },
        { say: 'An anecdote can bring an argument to life, but one person’s story proves little alone. Everybody knows that reading is good for you is not evidence at all.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Mixing up a reason and its evidence', md: 'A reason is **general**. Evidence is **specific** and can be checked. If you could ask “How do you know?”, the answer is the evidence.' },
      ],
      lines: [
        { say: 'A common mistake is mixing up a reason and its evidence. Teenagers learn better when they are rested is a reason. It is general.', show: 'mis' },
        { say: 'Attendance rose by eight percent at one named school is evidence. It is specific and can be checked. If you can ask how do you know, the answer is the evidence.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A writer claims that regular exercise improves teenagers’ mood. Which piece of evidence supports the claim best?',
          choices: [
            'Running is the most boring sport that there could ever be.',
            'Exercise is good for all kinds of things in a person’s life.',
            'A study of 500 teenagers found exercise halved low moods.',
            'Everybody knows that people who exercise are much happier.',
          ],
          answer: 2,
          working: 'Statement C is relevant, specific and can be checked. A is an opinion, B is too vague, and D is not evidence.',
        },
      ],
      lines: [
        { say: 'Your turn. A writer claims that regular exercise improves teenagers’ mood. Which of the four choices supports the claim best? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It is relevant, specific and can be checked. Choice A is an opinion about running, and Choice B is too vague to check.', show: 'q.answer' },
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
            'An argument has a claim, reasons, evidence, and often a counterclaim and rebuttal.',
            'A **fact** can be checked; an **opinion** is a judgment.',
            'The strongest evidence is relevant, specific and credible.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An argument has a claim, reasons, evidence, and often a counterclaim and a rebuttal.', show: 'sum.0' },
        { say: 'A fact can be checked, while an opinion is a judgment.', show: 'sum.1' },
        { say: 'And the strongest evidence is relevant, specific and credible.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
