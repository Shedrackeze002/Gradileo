import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-4-2',
  lessonId: 'e12-4-2',
  title: 'Toulmin’s Model of Argument',
  thumbnailTitle: 'Toulmin’s Model',
  thumbnail: false,
  summary:
    'Toulmin’s model breaks an argument into claim, data, warrant, backing, qualifier and rebuttal. Learn to find an unstated warrant, to tell data from backing, and to test an argument part by part.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Rhetoric and Argument', title: 'Toulmin’s Model of Argument', subtitle: 'Six parts, and the hidden link' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['All silencing of discussion is an assumption of infallibility.'],
          by: 'John Stuart Mill, On Liberty (1859)',
        },
      ],
      lines: [
        { say: 'In eighteen fifty-nine, the philosopher John Stuart Mill made one of the boldest claims in the history of free speech, and he supported it with evidence and principles. This is one of them.', show: ['title', 'q'] },
        { say: 'A century later, the philosopher Stephen Toulmin noticed that real arguments are built from the same six kinds of parts. In this lesson, you will learn Toulmin’s model, and use it to take an argument apart.' },
      ],
    },
    {
      chapter: 'The six parts',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Claim**: the position you want accepted',
            '**Data**: the evidence for the claim',
            '**Warrant**: the principle linking data to claim',
            '**Backing**: support for the warrant',
            '**Qualifier**: limits the claim, like “probably”',
            '**Rebuttal**: the exceptions',
          ],
        },
      ],
      lines: [
        { say: 'The claim is the position the arguer wants you to accept. The data, also called grounds, are the facts and evidence offered in support.', show: ['b.0', 'b.1'] },
        { say: 'The warrant is the general principle that links the data to the claim: the reason the evidence counts. The backing is support for the warrant, such as research, law or experience.', show: ['b.2', 'b.3'] },
        { say: 'The qualifier limits how strongly the claim is made, with a word like probably. And the rebuttal names the exceptions, the conditions under which the claim would not hold.', show: ['b.4', 'b.5'] },
      ],
    },
    {
      chapter: 'The warrant: the hidden link',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Data**: Sunday visitors outnumber every other day.',
            '**Claim**: The library should probably keep its Sunday hours.',
            '**Warrant**: A public service should be open when the public most wants to use it.',
          ],
        },
      ],
      lines: [
        { say: 'Arguers often state the claim and the data, and leave the warrant unsaid, because it seems obvious. But the warrant is where an argument is most often weak.', show: ['b.0', 'b.1'] },
        { say: 'To find it, put the data and the claim side by side, and ask what general principle someone would have to believe to move from one to the other. A warrant is general, so it would apply to other cases too.', show: 'b.2', focus: 'b.2' },
        { say: 'Mill states his warrant outright. Whoever silences an opinion acts as if they could not be mistaken, and no person or government is infallible, which means incapable of being wrong.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Data** supports the claim: Sunday visitor numbers.',
            '**Backing** supports the warrant: the city charter says the library exists “to serve every resident”.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Data and backing are both evidence, so they are easy to confuse.', show: 'b.0' },
        { say: 'Ask what each piece of evidence supports. Data supports the claim directly. Backing supports the warrant, by showing that the principle can be trusted.', show: 'b.1', focus: 'b.1' },
        { say: 'Also watch for words like always and never. A claim with no qualifier can be destroyed by one good exception.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The library’s warrant is “A public service should be open when the public most wants to use it.” What is the city charter?',
          choices: [
            'Backing, because it supports the warrant that the library serves everyone.',
            'Data, because it shows directly that Sunday hours are wanted.',
            'A qualifier, because it limits how strongly the claim is made.',
            'A rebuttal, because it names a case where the claim fails.',
          ],
          answer: 0,
          working: 'The charter does not show that Sunday hours are wanted; it supports the warrant by showing the library’s job is to serve every resident.',
        },
      ],
      lines: [
        { say: 'Your turn. The library’s warrant says a public service should be open when the public most wants to use it. In Toulmin’s model, what is the city charter? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. The charter does not show that Sunday hours are wanted. It supports the warrant, by showing that the library’s job is to serve every resident.', show: 'q2.answer' },
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
            'Six parts: claim, data, warrant, backing, qualifier, rebuttal.',
            'Find a hidden warrant by asking what principle links data to claim.',
            'Data supports the claim; backing supports the warrant.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Toulmin’s model has six parts: claim, data, warrant, backing, qualifier and rebuttal.', show: 'sum.0' },
        { say: 'The warrant is often unstated. Find it by asking what general principle would carry someone from the data to the claim.', show: 'sum.1' },
        { say: 'And data supports the claim, while backing supports the warrant. An argument is only as strong as its weakest part.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
