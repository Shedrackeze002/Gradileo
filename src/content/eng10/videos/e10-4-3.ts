import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-4-3',
  lessonId: 'e10-4-3',
  title: 'Ethos, Pathos and Logos',
  thumbnail: false,
  summary:
    'Aristotle’s three appeals, credibility, emotion and logic, and the rhetorical devices that make famous speeches memorable.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Non-fiction and Persuasion', title: 'Ethos, Pathos and Logos', subtitle: 'The art of persuading with language' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['… and that government of the people, by the people, for the people, shall not perish from the earth.'], by: 'Abraham Lincoln, 1863' },
      ],
      lines: [
        { say: 'On the nineteenth of November, eighteen sixty-three, Abraham Lincoln spoke for about two minutes at the dedication of a cemetery at Gettysburg. His speech ends: government of the people, by the people, for the people, shall not perish from the earth.', show: ['title', 'q'] },
        { say: 'Why are those words still quoted today? Part of the answer is rhetoric, the art of persuading with language. In this lesson, you will learn the three appeals and the devices that make words memorable.' },
      ],
    },
    {
      chapter: 'The three appeals',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Appeal', 'Persuades through', 'Example'],
          rows: [
            ['Ethos', 'credibility and character', 'I have volunteered at the shelter every weekend for six years.'],
            ['Pathos', 'emotion', 'Picture a frightened puppy, shivering in a cold cage.'],
            ['Logos', 'logic and evidence', 'The shelter takes in about 900 animals a year but has only 40 kennels.'],
          ],
        },
      ],
      lines: [
        { say: 'More than two thousand years ago, the philosopher Aristotle described three ways to persuade an audience. Imagine a student asking the town for more money for an animal shelter.', show: 't.0' },
        { say: 'Ethos appeals to the speaker’s credibility. I have volunteered at the shelter every weekend for six years says: trust me, I know this first-hand.', focus: 't.0' },
        { say: 'Pathos appeals to emotion, such as pity, fear or pride. Picture a frightened puppy, shivering in a cold cage.', show: 't.1', focus: 't.1' },
        { say: 'Logos appeals to logic, with facts, numbers and reasoning. The shelter takes in about nine hundred animals a year but has only forty kennels.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Rhetorical devices',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'a', size: 'md', lines: ['… we can not dedicate—we can not consecrate—we can not hallow—this ground.'], by: 'Abraham Lincoln, 1863' },
        { kind: 'quote', id: 'b', size: 'md', lines: ['For it is not light that is needed, but fire; it is not the gentle shower, but thunder.'], by: 'Frederick Douglass, 1852' },
      ],
      lines: [
        { say: 'Rhetorical devices are patterns of language that make an argument striking and easy to remember. Lincoln repeats we can not three times.', show: 'a' },
        { say: 'That is repetition, also called anaphora, and the three parts together make a tricolon.', focus: 'a' },
        { say: 'Frederick Douglass uses antithesis. It is not light that is needed, but fire; it is not the gentle shower, but thunder.', show: 'b' },
        { say: 'Each half sets an idea against its opposite, to say that gentle argument is no longer enough.', focus: 'b' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Choosing an appeal by its topic', md: 'An appeal is named by **how** it persuades, not by what it is about. Facts about the speaker’s career are **ethos**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Students choose the appeal by the topic. A sad subject must be pathos, they think.', show: 'mis' },
        { say: 'But an appeal is named by how it persuades. A sad subject argued with numbers is logos, and a sentence full of facts about the speaker’s own career is ethos, because it asks you to trust the speaker.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student speaks to the town council: “I have volunteered at the shelter every weekend for six years, so I know its work first-hand.” Which appeal is this?',
          choices: [
            'Pathos, because it makes the reader feel pity',
            'Ethos, because it builds the speaker’s credibility',
            'Logos, because it gives facts and numbers',
            'Antithesis, because it sets opposites side by side',
          ],
          answer: 1,
          working: 'The speaker asks the audience to trust them because of their experience. That is ethos.',
        },
      ],
      lines: [
        { say: 'Your turn. A student tells the town council: I have volunteered at the shelter every weekend for six years, so I know its work first-hand. Which appeal is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ethos. The speaker asks the audience to trust them because of their experience. Choice D names a device, not an appeal.', show: 'q.answer' },
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
            '**Ethos** is credibility, **pathos** is emotion and **logos** is logic.',
            'Name an appeal by how it persuades, not by its topic.',
            'Devices such as repetition and antithesis make words memorable.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Ethos persuades through credibility, pathos through emotion and logos through logic.', show: 'sum.0' },
        { say: 'Name an appeal by how it persuades, not by its topic.', show: 'sum.1' },
        { say: 'And devices such as repetition, tricolon and antithesis make a speaker’s words memorable.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
