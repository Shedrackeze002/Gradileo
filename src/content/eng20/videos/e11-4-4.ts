import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-4-4',
  lessonId: 'e11-4-4',
  title: 'Fallacies and Evidence',
  thumbnailTitle: 'Fallacies and Evidence',
  thumbnail: false,
  summary:
    'Five subtler fallacies: post hoc, circular reasoning, red herring, false analogy and appeal to tradition. Then judge evidence by whether it is relevant, sufficient and representative, and remember that correlation is not causation.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'The Essay and Rhetoric', title: 'Fallacies and Evidence', subtitle: 'Is the argument any good?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Ever since the new mayor took office, it has rained every weekend.', 'So the mayor must be bringing the bad weather.'],
        },
      ],
      lines: [
        { say: 'Ever since the new mayor took office, it has rained every weekend. That may be true.', show: ['title', 'b.0'] },
        { say: 'So the mayor must be bringing the bad weather. That is not true at all. The first sentence is a fact, and the second is a conclusion it cannot support. In this lesson, you will learn five subtler fallacies, and ask whether the evidence in an argument is any good.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Five subtler fallacies',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Post hoc**: A came before B, so A caused B',
            '**Circular reasoning**: the conclusion is its own evidence',
            '**Red herring**: changes the subject to something irrelevant',
            '**False analogy**: compares things not alike in the way that matters',
            '**Appeal to tradition**: it is right because it has always been done',
          ],
        },
      ],
      lines: [
        { say: 'Post hoc assumes that because one thing happened after another, the first caused the second. I wore my green socks the day I passed my driving test, so the socks helped me pass.', show: 'b.0', focus: 'b.0' },
        { say: 'Circular reasoning uses its conclusion as its own evidence. This website is trustworthy, because it says on its home page that it is trustworthy.', show: 'b.1', focus: 'b.1' },
        { say: 'A red herring changes the subject. Why worry about pollution from the factory when there are so many potholes in our roads?', show: 'b.2', focus: 'b.2' },
        { say: 'A false analogy compares two things that are not alike in the way that matters. And an appeal to tradition says something is right because it has always been done that way.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Judging evidence',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Relevant?** It bears on the claim.', '**Sufficient?** There are enough cases.', '**Representative?** The cases are typical of the whole group.'],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Correlation and causation', md: 'Two things can rise together without one **causing** the other. Ice-cream sales and sunburn both rise with hot, sunny weather.' },
      ],
      lines: [
        { say: 'An argument with evidence is not automatically strong. Ask three questions of any evidence. Is it relevant, so that it bears on the claim? Is it sufficient, with enough cases?', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'And is it representative, meaning the cases are typical of the whole group the claim is about?', show: 'b.2', focus: 'b.2' },
        { say: 'Also, a correlation means two things rise and fall together, but it does not prove that one causes the other. Ice-cream sales and sunburn rise together, but hot weather causes both.', show: 'def' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Telling close fallacies apart',
          md: '**Post hoc** is about cause. A **hasty generalization** is about how many. A **red herring** changes the subject; a **straw man** distorts the other side.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: confusing fallacies that look alike.', show: 'm' },
        { say: 'Post hoc is about cause, while a hasty generalization is about how many. And a red herring ignores the argument and changes the subject, while a straw man distorts the other side’s argument and attacks the distortion.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A survey at a 7:00 a.m. breakfast club finds that 85% of students like the early start. What is wrong with it?',
          choices: [
            'Not relevant, because it asks about the wrong thing.',
            'Not representative, because early risers are not typical.',
            'Not sufficient, because two hundred students is too few.',
            'Circular, because it assumes what it sets out to prove.',
          ],
          answer: 1,
          working: 'Students who choose a breakfast club at seven in the morning are early risers, so the sample does not represent the whole school.',
        },
      ],
      lines: [
        { say: 'Your turn. A survey at a breakfast club that opens at seven in the morning finds that eighty-five percent of the two hundred students asked like the early start. What is wrong with the evidence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Students who choose a breakfast club are early risers, so the sample does not represent the whole school.', show: 'q2.answer' },
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
            'Post hoc, circular reasoning, red herring, false analogy, appeal to tradition.',
            'Judge evidence: relevant, sufficient, representative.',
            'Correlation is not causation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Post hoc confuses sequence with cause. Circular reasoning assumes its conclusion. A red herring changes the subject.', show: 'sum.0' },
        { say: 'A false analogy compares things unlike in the way that matters, and an appeal to tradition relies on we have always done it. Judge evidence by asking whether it is relevant, sufficient and representative.', show: 'sum.1' },
        { say: 'And remember that correlation is not causation, because a third thing may cause both.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
