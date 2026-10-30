import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-3',
  lessonId: 'e12-6-3',
  title: 'Research Writing',
  thumbnailTitle: 'Research Writing',
  thumbnail: false,
  summary:
    'Research writing means finding sources, judging them and weaving what they say into an argument that is still your own. Learn five tests for a reliable source, how to weigh a mixed one, and how to synthesize and attribute honestly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Research Writing', subtitle: 'Judge sources, then weave them in' }],
      lines: [
        { say: 'Research writing asks you to do three things well: find sources, judge them, and weave what they say into an argument that is still your own.', show: 'title' },
        { say: 'Now the evidence comes from other people, so you must decide whom to trust. Every source in this lesson is invented, for practice.' },
      ],
    },
    {
      chapter: 'Judging a source',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Authority**: who wrote it, and what do they know?',
            '**Evidence**: what does it rest on?',
            '**Currency**: is it recent enough for this question?',
            '**Purpose**: why was it written, and who gains?',
            '**Relevance**: does it answer this question?',
          ],
        },
      ],
      lines: [
        { say: 'A reliable source has five qualities. Authority: the writer has real expertise. Evidence: it rests on more than one person’s experience.', show: ['b.0', 'b.1'] },
        { say: 'Currency: it is recent enough for the question. Purpose: no seller or sponsor profits if one answer wins. And relevance: it answers the question you are actually asking.', show: ['b.2', 'b.3', 'b.4'] },
        { say: 'Few sources pass every test, so weigh them. Say what the source can show, name its limit, and decide what else you need to check it against.' },
      ],
    },
    {
      chapter: 'Weighing a mixed source',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Source**: a report by a company that sells classroom reading software',
            '**Finding**: vocabulary scores rose in fifteen schools using its program',
            '**Limit**: the seller gains, and every school used its software',
          ],
        },
      ],
      lines: [
        { say: 'Suppose your question is whether daily reading time improves vocabulary. You find this invented report.', show: ['b.0', 'b.1'] },
        { say: 'It compares scores in fifteen schools, which is real evidence. But the company gains if the result is good, and every school used its software, so the effect of reading time cannot be separated from the effect of the program.', show: 'b.2', focus: 'b.2' },
        { say: 'So use it, state its limit, and check it against independent research.' },
      ],
    },
    {
      chapter: 'Weaving sources into your argument',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['A staffed library does more than store books: the Westbrook Library study found that weekly visitors read twice as many books a year, and in the Teen Reading Survey most students said they found their books on library displays, which someone has to build.'],
        },
      ],
      lines: [
        { say: 'Synthesis combines findings from several sources so that together they serve your own point. Attribution names, in your sentence, where each finding comes from.' },
        { say: 'A source dump strings findings together, one sentence per source, with no point of the writer’s own. Here, the point leads, and each source is named.', show: 'q' },
        { say: 'The verb that introduces a source is a claim about it. Use found or reported for results, argues for opinions, and suggests when the evidence is tentative. Save proves for mathematics.', focus: 'q' },
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
          title: 'Patchwriting is not paraphrase',
          md: 'Moving a source’s clauses around, or swapping in a synonym here and there, keeps the source’s sentence and passes it off as yours.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: patchwriting. Moving a source’s clauses around, or swapping in a few synonyms, keeps the source’s sentence and passes it off as yours.', show: 'm' },
        { say: 'That is plagiarism even when the source is named. To paraphrase honestly, close the source, say the idea in your own way, then check it against the original for accuracy.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A software seller reports that vocabulary rose in fifteen schools using its program. How should you use it?',
          choices: [
            'Reject it, because the seller gains and so the report is worthless.',
            'Accept it as settled, because the seller knows its program best.',
            'Treat it as proof, because it compares scores in fifteen schools.',
            'Use it, name its limit, and check it against independent research.',
          ],
          answer: 3,
          working: 'The report is real evidence, but the seller gains from the result. Use it, state its limit, and look for independent support.',
        },
      ],
      lines: [
        { say: 'Your turn. A software seller reports that vocabulary rose in fifteen schools using its program. How should you use it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The report is real evidence, but the seller gains from the result. Use it, state its limit, and look for independent support.', show: 'q2.answer' },
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
            'Judge a source by authority, evidence, currency, purpose and relevance.',
            'Weigh mixed sources, and name their limits.',
            'Synthesize in your own words, and name each source.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Judge a source by its authority, evidence, currency, purpose and relevance.', show: 'sum.0' },
        { say: 'Weigh mixed sources: say what each can show, and name its limit.', show: 'sum.1' },
        { say: 'And synthesize in your own words, naming each source, with a verb that matches the strength of its evidence.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
