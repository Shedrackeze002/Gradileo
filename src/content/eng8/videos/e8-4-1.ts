import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-4-1',
  lessonId: 'e8-4-1',
  title: 'Building an Argument',
  summary:
    'An argument has a claim, reasons, evidence and a warrant, the often unstated link that explains why the evidence supports the claim. Testing the warrant finds weak spots. A counterargument opposes the claim, a concession admits a fair point, and a rebuttal answers it.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Building an Argument', subtitle: 'Claim, reasons, evidence and warrant' }],
      lines: [
        { say: 'An argument is more than an opinion said loudly. A strong one is built from parts that fit together, and it takes the other side seriously.', show: 'title' },
        { say: 'In this video we take an argument apart to find its parts, and see how a writer answers the other side.' },
      ],
    },
    {
      chapter: 'The parts of an argument',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Argument', md: 'An **argument** tries to convince the reader to believe or do something, by giving reasons and evidence for it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'What it is', 'It answers…'],
          rows: [
            ['**Claim**', 'the main position', 'What should I believe?'],
            ['**Reason**', 'a statement that supports the claim', 'Why?'],
            ['**Evidence**', 'facts, statistics, examples, experts', 'How do you know?'],
            ['**Warrant**', 'the link from evidence to claim', 'Why does that prove it?'],
          ],
        },
      ],
      lines: [
        { say: 'An argument tries to convince the reader to believe or do something, by giving reasons and evidence for it.', show: 'def' },
        { say: 'It has four parts. The claim is the main position, so it answers: what do you want me to believe? A reason supports the claim, and answers: why?', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Evidence is the facts, statistics, examples or expert views, and it answers: how do you know?', focus: 't.2' },
        { say: 'And the warrant is the link that explains why the evidence supports the claim. It answers: why does that evidence prove it? The warrant is often not written down at all.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Finding the parts',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Schools should ban phones during lessons. In a trial at one school, test scores rose by 8% in the year after phones were banned. Phones distract students, and a student who checks a message loses focus for several minutes afterwards.'], by: 'An argument written for this lesson' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Claim:** schools should ban phones during lessons.',
            '**Reason:** phones distract students.',
            '**Evidence:** scores rose by 8%; focus is lost for minutes.',
            '**Warrant:** if scores rose after the ban, phones were hurting learning.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a short argument written for this lesson.', show: 'q' },
        { say: 'The claim is that schools should ban phones during lessons. The reason is that phones distract students.', show: ['b.0', 'b.1'] },
        { say: 'The evidence is that test scores rose by eight percent after the ban, and that a student loses focus for several minutes after checking a message.', show: 'b.2' },
        { say: 'And the warrant, which is never written down, is the hidden step: if scores rose after the ban, then phones must have been hurting learning.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Testing the warrant',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Test the warrant', md: 'The evidence comes from **one school**, which may not be typical, and **something else** might have changed that year. A stronger argument would use several studies.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Evidence is not the claim', md: '“Test scores rose by 8%” is **evidence**. The claim is what the writer wants you to believe or do. Ask: what is all this evidence *for*?' },
      ],
      lines: [
        { say: 'Testing the warrant is how you find an argument’s weak spots. Here, the evidence comes from a single school, which may not be typical, and something else might have changed that year too. So a stronger argument would use several studies.', show: 'k' },
        { say: 'A common mistake is to call the evidence the claim. Test scores rose by eight percent is evidence. The claim is what the writer wants you to believe or do, so ask: what is all this evidence for?', show: 'm' },
      ],
    },
    {
      chapter: 'Answering the other side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counterargument, concession and rebuttal', md: 'A **counterargument** argues against the claim. A **concession** admits that part of it has a point. A **rebuttal** shows why it is weak or does not change the conclusion.' },
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'Signal phrases'],
          rows: [
            ['counterargument', '*Some people argue…*, *Critics claim…*'],
            ['concession', '*It is true that…*, *Admittedly…*'],
            ['rebuttal', '*However…*, *But this overlooks…*'],
          ],
        },
      ],
      lines: [
        { say: 'Strong arguments answer the other side. A counterargument argues against the writer’s claim. A concession admits that part of it has a point. And a rebuttal shows why it is weak, or why it does not change the conclusion.', show: 'def' },
        { say: 'Writers use signal phrases for each step. Some people argue, or critics claim, introduce a counterargument.', show: 't', focus: 't.0' },
        { say: 'It is true that, or admittedly, signal a concession. And however, or but this overlooks, signal the rebuttal.', focus: ['t.1', 't.2'] },
        { say: 'Admitting a fair point first makes the writer seem reasonable, so the rebuttal is more convincing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Some argue that phones help in emergencies; however, students could still use them at break and lunch, and the school office can always reach parents.” What is the part after “however”?',
          choices: [
            'The claim',
            'A rebuttal',
            'A concession',
            'The warrant',
          ],
          answer: 1,
          working: '“Some argue…” introduces a counterargument. The part after “however” shows why it does not change the conclusion, so it is a rebuttal.',
        },
      ],
      lines: [
        { say: 'Your turn. Some argue that phones help in emergencies. However, students could still use them at break and lunch, and the school office can always reach parents. What is the part after however? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Some argue introduces a counterargument, and the part after however shows why it does not change the conclusion. So it is a rebuttal.', show: 'q2.answer' },
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
            'An argument has a **claim**, **reasons**, **evidence** and a **warrant**.',
            'The warrant links evidence to claim; test it to find weak spots.',
            'A **counterargument** opposes the claim; a **concession** admits a fair point.',
            'A **rebuttal** answers the counterargument and makes the argument stronger.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An argument has a claim, reasons, evidence and a warrant.', show: 'sum.0' },
        { say: 'The warrant links the evidence to the claim, so test it to find weak spots, like evidence from only one case.', show: 'sum.1' },
        { say: 'A counterargument opposes the claim, and a concession admits it has a fair point.', show: 'sum.2' },
        { say: 'And a rebuttal answers the counterargument, which makes the whole argument stronger.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
