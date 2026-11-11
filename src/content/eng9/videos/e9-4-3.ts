import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-4-3',
  lessonId: 'e9-4-3',
  title: 'Sound and Faulty Reasoning',
  summary:
    'A premise is a statement an argument offers as a reason. Deductive reasoning goes from a general rule to a certain conclusion, if the premises are true; inductive reasoning goes from examples to a probable one, so ask whether the evidence is enough and representative. Watch for the straw man, slippery slope, circular reasoning and false appeal to authority.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Sound and Faulty Reasoning', subtitle: 'Does the argument hold up?' }],
      lines: [
        { say: 'An argument can be full of feeling, and still be badly reasoned.', show: 'title' },
        { say: 'In this video we learn the two main kinds of reasoning, judge whether evidence is strong enough, and spot four more fallacies.' },
      ],
    },
    {
      chapter: 'Premises and reasoning',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Premise', md: 'A **premise** is a statement that an argument assumes or offers as a **reason**. The **conclusion** is what the premises are meant to prove.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Example', 'How strong?'],
          rows: [
            ['**Deductive**: rule to case', 'All mammals breathe air. Whales are mammals. So whales breathe air.', '**certain**, if the premises are true'],
            ['**Inductive**: examples to rule', 'Every swan I have seen is white. So swans are probably white.', 'only **probable**: black swans exist'],
          ],
        },
      ],
      lines: [
        { say: 'A premise is a statement that an argument assumes or offers as a reason. The conclusion is what the premises are meant to prove.', show: 'def' },
        { say: 'Deductive reasoning goes from a general rule to a conclusion about a case. All mammals breathe air, whales are mammals, so whales breathe air. If the premises are true, the conclusion is certain.', show: 't', focus: 't.0' },
        { say: 'Inductive reasoning goes from examples to a general conclusion. Every swan I have seen is white, so swans are probably white. That is only probable, and in fact black swans exist.', focus: 't.1' },
        { say: 'Most everyday arguments are inductive, so the key question is: is there enough evidence?' },
      ],
    },
    {
      chapter: 'Testing the argument',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['We asked ten customers in our café, and eight prefer our coffee. So most people in the town prefer our coffee.'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Enough, and representative?', md: 'Ten is **too few**, and café regulars are **not a fair sample** of the whole town. The conclusion is weak.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Check the premises too', md: '*All birds can fly; penguins are birds; so penguins can fly.* It follows logically, but the first premise is **false**.' },
      ],
      lines: [
        { say: 'Let’s test an inductive argument. We asked ten customers in our café, and eight prefer our coffee. So most people in the town prefer our coffee.', show: 'q' },
        { say: 'Ten is too few, and café regulars, who chose to visit this café, are not a fair sample of the whole town. So the conclusion is weak.', show: 'k' },
        { say: 'A deductive argument can also fail if a premise is false. All birds can fly, penguins are birds, so penguins can fly. It follows logically, but the first premise is wrong, so the conclusion is too.', show: 'm' },
      ],
    },
    {
      chapter: 'Four more fallacies',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Fallacy', 'Example'],
          rows: [
            ['**Straw man**: distorts the other side', '“He wants less homework. So he thinks students should never learn anything.”'],
            ['**Slippery slope**: one step leads to disaster', '“If students choose one book, soon there will be no school at all.”'],
            ['**Circular reasoning**: the claim proves itself', '“This site is trustworthy because it says it is the most reliable.”'],
            ['**False appeal to authority**', '“A famous footballer says this toothpaste is the best.”'],
          ],
        },
      ],
      lines: [
        { say: 'Here are four more fallacies. A straw man distorts the other side into an extreme version that is easy to attack. Defeating that weaker version proves nothing about the real argument.', show: 't', focus: 't.0' },
        { say: 'A slippery slope claims that one small step will lead, without evidence, to an extreme result.', focus: 't.1' },
        { say: 'Circular reasoning uses the claim as its own proof: this website is trustworthy because it says it is the most reliable site online.', focus: 't.2' },
        { say: 'And a false appeal to authority relies on someone who is not an expert on the subject. Quoting an expert is fine, if they are an expert on that subject. A dentist’s view on toothpaste is relevant, but a footballer’s is not.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“If we allow phones at lunch, next they’ll be in every lesson, and soon nobody will learn anything.” Which fallacy is this?',
          choices: [
            'Circular reasoning',
            'Slippery slope',
            'Straw man',
            'False appeal to authority',
          ],
          answer: 1,
          working: 'It claims, without evidence, that one small step will lead to an extreme result. That is a slippery slope.',
        },
      ],
      lines: [
        { say: 'Your turn. If we allow phones at lunch, next they’ll be in every lesson, and soon nobody will learn anything. Which fallacy is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, a slippery slope. It claims, without any evidence, that one small step will lead to an extreme result.', show: 'q2.answer' },
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
            '**Deductive**: rule to a certain conclusion. **Inductive**: examples to a probable one.',
            'Check that premises are true.',
            'Check that evidence is enough and representative.',
            'Fallacies: **straw man**, **slippery slope**, **circular reasoning**, **false authority**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Deductive reasoning goes from a rule to a certain conclusion, and inductive reasoning goes from examples to a probable one.', show: 'sum.0' },
        { say: 'Check that the premises are true.', show: 'sum.1' },
        { say: 'And check that the evidence is enough, and representative.', show: 'sum.2' },
        { say: 'Watch for the straw man, the slippery slope, circular reasoning, and the false appeal to authority.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
