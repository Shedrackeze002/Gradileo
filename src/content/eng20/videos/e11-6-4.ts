import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-4',
  lessonId: 'e11-6-4',
  title: 'Building an Argument',
  thumbnailTitle: 'Building an Argument',
  thumbnail: false,
  summary:
    'An argument is a chain of claim, reason, evidence and warrant. Learn to find the warrant, concede and rebut a counterargument, and qualify a claim so it says exactly what the evidence supports.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Building an Argument', subtitle: 'Claim, evidence, warrant' }],
      lines: [
        { say: 'An argument is not a list of opinions said loudly. It is a chain: a claim, reasons for it, evidence for the reasons, and reasoning that shows why the evidence proves the claim.', show: 'title' },
        { say: 'A strong argument also faces the other side honestly.' },
      ],
    },
    {
      chapter: 'The parts of an argument',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Claim:** Our school should start classes at 9:00 instead of 8:00.',
            '**Reason:** Students would get the sleep they need to learn.',
            '**Evidence:** Attendance at first-period classes rose by six per cent.',
            '**Warrant:** A later start helps students take part in learning, not just sleep in.',
            '**Counterargument:** Some parents worry about getting to work on time.',
            '**Rebuttal:** The school could open its library at 8:00 for supervised reading.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a model paragraph, taken apart. The claim is the position the argument sets out to prove. A reason says why it is true.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'The evidence is a specific fact or finding. The warrant explains why that evidence proves the claim.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'Then comes a fair statement of the opposing view, the counterargument, and the answer to it, the rebuttal.', show: ['b.4', 'b.5'], focus: ['b.4', 'b.5'] },
      ],
    },
    {
      chapter: 'The warrant',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'w',
          items: ['**Claim:** Phones should be kept in lockers during lessons.', '**Evidence:** Students whose phones lay silent on their desks remembered less than students whose phones were in their bags.'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['If even a silent phone in sight lowers what students remember, then keeping phones out of sight altogether is the surest way to protect learning.'],
        },
      ],
      lines: [
        { say: 'Evidence does not speak for itself. A reader may accept it and still ask, so what? Take this claim and this evidence.', show: 'w' },
        { say: 'The warrant makes the link explicit. It does not add new facts, and it does not just repeat the claim.', hide: 'w', show: 'q' },
      ],
    },
    {
      chapter: 'Conceding and qualifying',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'c',
          size: 'md',
          lines: ['Admittedly, protected lanes would take some road space away from cars, but in a nearby city that built them, car journeys slowed by less than a minute while cycling injuries fell by almost half.'],
        },
        {
          kind: 'bullets',
          id: 'k',
          items: ['**Overstated:** A later start would improve the life of every single student.', '**Well qualified:** For most students, a later start would probably mean more sleep and better attendance.'],
        },
      ],
      lines: [
        { say: 'A concession admits that the other side has a point. It is a sign of strength. The strongest move is to concede, then turn: grant what is fair, then explain why your claim still holds.', show: 'c' },
        { say: 'A qualifier limits a claim to what the evidence can support, with words like most, often and probably.', hide: 'c', show: 'k.1' },
        { say: 'One study cannot prove that a change improves the life of every single student. So before you hand in an argument, circle every always, never and every, and ask whether your evidence really proves it.', show: 'k.0', focus: 'k.0' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Three weak answers to a counterargument', md: '**Giving up** lets the concession swallow the argument. **Ignoring** repeats your claim as if no one objected. **Attacking** insults the other side and costs you the reader’s trust.' },
      ],
      lines: [
        { say: 'Here is a common mistake: answering a counterargument badly. You can give up, so the concession swallows the argument.', show: 'm' },
        { say: 'You can ignore the objection. Or you can attack the people who raised it. None of these answers anything.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a study, students with a silent phone in sight remembered less. Which sentence is the warrant for keeping phones in lockers?',
          choices: [
            'If a visible phone harms learning, putting phones out of sight protects it.',
            'Phones should be kept in lockers during every lesson at school.',
            'Students with silent phones on their desks remembered less afterwards.',
            'Some students may need their phones to contact their families.',
          ],
          answer: 0,
          working: 'The warrant explains why the evidence proves the claim. B is the claim, C is the evidence and D is a counterargument.',
        },
      ],
      lines: [
        { say: 'Your turn. In a study, students with a silent phone in sight remembered less. Which sentence is the warrant for keeping phones in lockers? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. It explains why the evidence proves the claim. B is the claim, C is the evidence, and D is a counterargument.', show: 'q2.answer' },
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
          items: ['An argument links a claim, reasons, evidence and a warrant.', 'Concede what is fair, then turn back to your claim.', 'Qualify claims to fit the evidence.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An argument links a claim, reasons, evidence and a warrant that explains why the evidence proves the claim.', show: 'sum.0' },
        { say: 'Concede what is fair, then turn back to your claim with a reason.', show: 'sum.1' },
        { say: 'And qualify claims to fit the evidence, avoiding absolutes.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
