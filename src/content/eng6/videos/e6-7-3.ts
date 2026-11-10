import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-7-3',
  lessonId: 'e6-7-3',
  title: 'Persuasive Writing: Claims and Counterclaims',
  thumbnailTitle: 'Persuasive Writing',
  summary:
    'A persuasive piece makes a clear claim that is arguable, specific and manageable. It answers a counterclaim, an argument against it, with a rebuttal that gives reasons, not insults.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Persuasive Writing', subtitle: 'Claims, counterclaims and rebuttals' }],
      lines: [
        { say: 'A persuasive piece makes a clear claim, supports it with evidence, and answers the people who disagree.', show: 'title' },
        { say: 'That last step is what makes an argument truly convincing. In this lesson, you will learn how to do all three.' },
      ],
    },
    {
      chapter: 'A clear, arguable claim',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Claim', md: 'The **claim** (or **thesis**) states exactly what the writer wants the reader to believe or do. A good claim is **arguable**, **specific** and **manageable**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Weak claim', 'Why', 'Stronger claim'],
          rows: [
            ['*Gardens are places where plants grow.*', 'a fact', '*Our school should plant a vegetable garden.*'],
            ['*Something should be done about our town.*', 'too vague', '*Our town should build a skate park in Elm Field.*'],
            ['*Schools around the world should be completely changed.*', 'too big', '*Pupils should have ten more minutes of break each day.*'],
          ],
        },
      ],
      lines: [
        { say: 'The claim, sometimes called the thesis, states exactly what the writer wants the reader to believe or do.', show: 'def' },
        { say: 'A good claim is arguable, meaning reasonable people could disagree. Gardens are places where plants grow is a fact, so there is nothing to argue.', show: 't', focus: 't.0' },
        { say: 'It is specific: it says exactly what should happen. Something should be done about our town is far too vague.', focus: 't.1' },
        { say: 'And it is manageable, so it can be supported well in the space you have. Changing every school in the world is too big for one page.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Counterclaims and rebuttals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counterclaim and rebuttal', md: 'A **counterclaim** is an argument against your claim. A **rebuttal** is your answer to it, with reasons or evidence.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Claim:** Pupils should have a longer lunch.',
            '**Counterclaim:** *Some people argue that* a longer lunch would make the school day end later.',
            '**Rebuttal:** *However,* five minutes could come from the morning assembly, so the day would end at the same time.',
          ],
        },
      ],
      lines: [
        { say: 'A counterclaim is an argument against your claim, one that someone on the other side might make. A rebuttal is your answer to it, with reasons or evidence.', show: 'def' },
        { say: 'Here is a claim: pupils should have a longer lunch.', show: 'b.0' },
        { say: 'A counterclaim might be that a longer lunch would make the school day end later. Notice how it is introduced, respectfully: some people argue that.', show: 'b.1' },
        { say: 'And a rebuttal answers the concern reasonably. Five minutes could come from the morning assembly instead, so the day would end at the same time. Turn back to your side with however, or but.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Insults are not rebuttals', md: '“Only foolish people think homework is useful” does not answer anything; it just attacks. A rebuttal must give a **reason**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Only foolish people think homework is useful does not answer anything. It just attacks.', show: 'm' },
        { say: 'A rebuttal must give a reason. Treating the other side fairly also makes readers trust you more.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the strongest claim for a one-page persuasive piece?',
          choices: [
            'Libraries have books in them.',
            'Our library should open on Sunday afternoons.',
            'Something should be done about libraries.',
            'Every library in the world should be rebuilt.',
          ],
          answer: 1,
          working: 'B is arguable, specific and manageable. A is a fact, C is vague, and D is too big for one page.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest claim for a one-page persuasive piece? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. It is arguable, specific and manageable. Choice A is a fact, Choice C is vague, and Choice D is far too big for one page.', show: 'q2.answer' },
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
            'A strong **claim** is arguable, specific and manageable.',
            'A **counterclaim** argues against your claim; a **rebuttal** answers it.',
            'Introduce the other side fairly, then answer it with reasons, not insults.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strong claim is arguable, specific and manageable.', show: 'sum.0' },
        { say: 'A counterclaim is an argument against your claim, and a rebuttal answers it.', show: 'sum.1' },
        { say: 'And introduce the other side fairly, then answer it with reasons, not insults.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
