import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-3',
  lessonId: 'e10-6-3',
  title: 'The Persuasive Essay',
  thumbnail: false,
  summary:
    'A persuasive essay takes a clear position, backs it with reasons and evidence, answers the other side fairly, and ends with a call to action.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Persuasive Essay', subtitle: 'Position, evidence, rebuttal, action' }],
      lines: [
        { say: 'Every day someone tries to persuade you: an advertisement, a friend who wants to see a different film, a petition taped to the school door.', show: 'title' },
        { say: 'A persuasive essay does the same job in a careful, honest way. In this lesson you will plan each of its parts.' },
      ],
    },
    {
      chapter: 'Taking a position',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Position statement', md: 'The thesis of a persuasive essay: one sentence that takes a **clear side** and says what should happen. *Our school should start classes at 9:30 instead of 8:00.*' },
        { kind: 'bullets', id: 'b', items: ['**A topic**: *School start times are an interesting topic.*', '**The fence**: *There are good points on both sides.*', '**A question**: *Should our school start later?*'] },
      ],
      lines: [
        { say: 'A position statement takes one clear side on an issue, and says what should happen. For example: our school should start classes at nine thirty instead of eight.', show: 'def' },
        { say: 'Three kinds of sentence look like positions but are not.', hide: 'def', show: 'b.0' },
        { say: 'A topic names the issue but takes no side. The fence says there are good points on both sides, but an essay must choose.', show: 'b.1' },
        { say: 'And a question is not an answer. Your reader wants to know your position. The more specific it is, the stronger it is.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Reasons and evidence',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['One **reason** per body paragraph', 'Backed by **evidence**: a fact, a statistic, an example, an expert’s view or a survey', 'Real evidence only: never invent numbers'] },
      ],
      lines: [
        { say: 'Each body paragraph gives one reason for your position, and backs it with evidence.', show: 'b.0' },
        { say: 'Evidence can be a fact, a statistic, an example, an expert’s view or the results of a survey. A reason without evidence is only an opinion repeated.', show: 'b.1' },
        { say: 'Use evidence you can stand behind. Invented numbers destroy a writer’s credibility the moment a reader checks them.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Counterargument and rebuttal',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counterargument and rebuttal', md: 'A **counterargument** is a reasonable view from the other side. A **rebuttal** is your answer: **concede** what is fair, then **answer** with a reason or evidence.' },
        { kind: 'bullets', id: 'steps', items: ['Counterargument: *Paying staff to stay late would cost too much.*', 'Concede: staff time really does cost money.', 'Answer: trained student volunteers could help run the evening hours.'] },
        { kind: 'text', id: 'ans', md: '*Staff time does cost money, but trained student volunteers could help run the evening hours, so only one paid member of staff would be needed.*', size: 'md' },
      ],
      lines: [
        { say: 'A persuasive essay is more convincing when it faces the strongest argument against it. That argument is the counterargument, and your answer is the rebuttal.', show: 'def' },
        { say: 'A strong rebuttal concedes what is fair, then answers with a reason or evidence. Say your library should stay open until six, and someone objects that paying staff would cost too much.', hide: 'def', show: 'steps.0' },
        { say: 'First concede: staff time really does cost money.', show: 'steps.1' },
        { say: 'Then answer: trained student volunteers could help run the evening hours, so only one paid member of staff would be needed.', show: ['steps.2', 'ans'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Denying**: *That is simply not true.*', '**Attacking people**: *People who worry about cost do not care.*', '**Giving up**: *Perhaps the library should close early after all.*', '**Ignoring**: *The library should also buy new chairs.*'] }],
      lines: [
        { say: 'Weak rebuttals fail in four ways. Denying gives no reason.', show: 'b.0' },
        { say: 'Attacking people answers nobody’s argument. Giving up abandons your own position.', show: ['b.1', 'b.2'] },
        { say: 'And ignoring never answers the counterargument at all.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Objection to a library staying open late: “Paying staff to stay late would cost too much.” Which reply is the strongest rebuttal?',
          choices: [
            'Staff time costs money, but trained student volunteers could help, so one paid worker would do.',
            'That is simply not true, and anyone who says so has never needed to study.',
            'That is a fair point about cost, so perhaps the library should close early after all.',
            'People who worry about cost obviously do not care about students, so ignore them.',
          ],
          answer: 0,
          working: 'Choice A concedes what is fair, then answers with a practical solution. B denies, C gives up and D attacks people.',
        },
      ],
      lines: [
        { say: 'Your turn. A writer argues that the school library should stay open until six in the evening. A reader objects that paying staff would cost too much. Which reply is the strongest rebuttal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is Choice A. It concedes what is fair, then offers a practical solution. The others deny, give up, or attack people.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Take one clear, specific side.', 'Back each reason with real evidence.', 'Concede, then answer the strongest counterargument.', 'End with a call to action: a specific, realistic step.'] }],
      lines: [
        { say: 'Let’s sum up. Take one clear, specific side, and back each reason with real evidence.', show: ['sum.0', 'sum.1'] },
        { say: 'Concede what is fair, then answer the strongest counterargument.', show: 'sum.2' },
        { say: 'Finally, end with a call to action: a concrete step the reader can take soon, such as signing a petition this week.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
