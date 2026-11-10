import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-4-1',
  lessonId: 'e7-4-1',
  title: 'Claims, Reasons and Evidence',
  summary:
    'An argument has a claim, reasons and evidence, and a counterclaim argues the other side. Evidence can be statistics, expert opinion, anecdotes or examples, and strong evidence is relevant to the claim and comes from a reliable source.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Claims, Reasons and Evidence', subtitle: 'Taking an argument apart' }],
      lines: [
        { say: 'Newspaper columns, speeches, letters to the council and posts online all try to convince you of something.', show: 'title' },
        { say: 'To judge them, you need to take an argument apart and see how it is built: what it claims, why, and what proof it offers. That is what this video is about.' },
      ],
    },
    {
      chapter: 'The parts of an argument',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Claim, reasons and evidence', md: 'The **claim** is the main point the writer wants you to accept. **Reasons** explain *why* it is true. **Evidence** is the proof behind each reason. A **counterclaim** argues for the other side.' },
      ],
      lines: [
        { say: 'An argument has three main parts. The claim is the main point the writer wants you to accept.', show: 'def' },
        { say: 'Reasons explain why the claim is true. And evidence is the proof that backs up each reason: facts, figures, examples and expert views.', focus: 'def' },
        { say: 'There is one more part to know. A counterclaim is an argument for the other side, and a strong argument answers it.', focus: 'def' },
      ],
    },
    {
      chapter: 'Taking one apart',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Our school should start lunch fifteen minutes later. First, many students are not hungry at 11:30, so food is wasted: last month the canteen threw away 40 kilograms of uneaten meals. Second, a later lunch would split the long afternoon into shorter blocks. Ms. Patel, the school nurse, says that students who eat later concentrate better in their final lessons.'] },
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'In the passage'],
          rows: [
            ['**Claim**', 'Lunch should start fifteen minutes later.'],
            ['**Reason 1**', 'Many students are not hungry at 11:30, so food is wasted.'],
            ['**Evidence**', '40 kilograms of meals thrown away last month'],
            ['**Reason 2**', 'A later lunch would split the long afternoon.'],
            ['**Evidence**', 'the nurse’s view that students concentrate better'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s take this argument apart.', show: 'q' },
        { say: 'The claim is that lunch should start fifteen minutes later.', show: 't', focus: 't.0' },
        { say: 'The first reason is that many students are not hungry at eleven thirty, so food is wasted. The evidence is forty kilograms of meals thrown away last month.', focus: ['t.1', 't.2'] },
        { say: 'The second reason is that a later lunch would split the long afternoon. The evidence is the school nurse’s view that students concentrate better.', focus: ['t.3', 't.4'] },
        { say: 'A fair reader also thinks of counterclaims. Someone might object that a later lunch would make the school day finish later.', focus: 't.0' },
      ],
    },
    {
      chapter: 'Kinds of evidence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Example', 'Watch out for'],
          rows: [
            ['**Statistic**', '*72% of 500 cyclists felt safer with bike lanes.*', 'Who did the survey, and how many people?'],
            ['**Expert opinion**', '*A sleep scientist says teenagers need eight hours.*', 'Is the person an expert in this subject?'],
            ['**Anecdote**', '*My cousin said walking to school woke her up.*', 'One story may not be typical.'],
            ['**Example**', '*Cities such as Amsterdam have built thousands of kilometres of lanes.*', 'Typical, or hand-picked?'],
          ],
        },
      ],
      lines: [
        { say: 'Evidence comes in four main kinds. A statistic is a number, such as seventy-two percent of five hundred cyclists. Ask who did the survey, and how many people were asked.', show: 't', focus: 't.0' },
        { say: 'Expert opinion is the view of someone who knows the subject. Ask whether the person is an expert in this subject.', focus: 't.1' },
        { say: 'An anecdote is one person’s story. It may not be typical, so it is usually weaker than a fair statistic.', focus: 't.2' },
        { say: 'And an example is a case that shows the point. Ask whether the examples are typical, or hand-picked.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Relevant and reliable',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Strong evidence', md: 'Good evidence is **relevant** (it connects directly to the claim) and **reliable** (it comes from a trustworthy source).' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Famous is not the same as expert', md: 'A famous singer quoted on climate science is not an expert, however famous. Check that the source knows **this** subject.' },
      ],
      lines: [
        { say: 'Good evidence has two qualities. It is relevant, which means it connects directly to the claim. And it is reliable, which means it comes from a trustworthy source.', show: 'def' },
        { say: 'A survey about when students feel hungry is relevant to a claim about lunch times.', focus: 'def' },
        { say: 'But be careful. A famous singer quoted on climate science is not an expert, however famous. Check that the source knows this subject.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Claim: “Homework should be limited to one hour a night.” Which evidence is most relevant?',
          choices: [
            'A study of how many students own phones',
            'A famous athlete who says homework is boring',
            'A study linking more than an hour of homework to worse sleep',
            'My friend, who finished her homework in ten minutes',
          ],
          answer: 2,
          working: 'The sleep study is directly about the amount of homework. The phone study is off topic, the athlete is not an expert, and the friend is one anecdote.',
        },
      ],
      lines: [
        { say: 'Your turn. The claim is that homework should be limited to one hour a night. Which evidence is most relevant? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The sleep study is directly about the amount of homework. The phone study is off topic, the athlete is not an expert, and the friend is a single anecdote.', show: 'q2.answer' },
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
            'An argument has a **claim**, **reasons** and **evidence**; a **counterclaim** argues the other side.',
            'Evidence: **statistics**, **expert opinion**, **anecdotes**, **examples**.',
            'Strong evidence is **relevant** and **reliable**.',
            'An anecdote is usually weaker than a fair statistic.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An argument has a claim, reasons and evidence, and a counterclaim argues the other side.', show: 'sum.0' },
        { say: 'Evidence can be statistics, expert opinion, anecdotes or examples.', show: 'sum.1' },
        { say: 'Strong evidence is relevant to the claim and comes from a reliable source.', show: 'sum.2' },
        { say: 'And because an anecdote describes one person’s experience, it is usually weaker than a fair statistic.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
