import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-6',
  lessonId: 'e10-6-6',
  title: 'Writing Under a Time Limit',
  thumbnail: false,
  summary:
    'In a timed essay, good decisions matter most: read the prompt exactly, plan for five to ten minutes, divide your time, and leave room to proofread.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Writing Under a Time Limit', subtitle: 'Read, plan, write, check' }],
      lines: [
        { say: 'The clock on the wall says forty-five minutes. Some students start writing at once and run out of ideas halfway down the second page. Others plan for so long that the conclusion never gets written.', show: 'title' },
        { say: 'A timed essay rewards making good decisions quickly. In this lesson you will read a prompt exactly, plan fast, divide your time, and leave room to check.' },
      ],
    },
    {
      chapter: 'Reading the prompt',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Verb', 'What it asks you to do'],
          rows: [
            ['Analyse', 'Explain how the parts work and what effect they have'],
            ['Compare', 'Show how things are alike, and usually how they differ'],
            ['Evaluate', 'Judge how good or effective, with evidence'],
            ['Discuss', 'Consider more than one side and reach a conclusion'],
          ],
        },
      ],
      lines: [
        { say: 'The most expensive mistake in timed writing is answering a question that was not asked. Look for the key verb in the prompt.' },
        { say: 'Analyse asks you to explain how the parts work and what effect they have.', show: 't.0', focus: 't.0' },
        { say: 'Compare asks how things are alike, and usually how they differ.', show: 't.1', focus: 't.1' },
        { say: 'Evaluate asks for a judgement, supported with evidence. An essay that only describes can be beautifully written and still score poorly.', show: 't.2', focus: 't.2' },
        { say: 'And discuss asks you to consider more than one side and reach a reasoned conclusion. Underline the verb, and circle what it applies to.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Planning and dividing time',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'steps', items: ['Read the prompt and mark its key words', 'Brainstorm ideas and evidence', 'Choose a thesis and two or three points', 'Order the points, with evidence beside each', 'Write, then proofread'] },
        { kind: 'text', id: 'ans', md: 'Sixty minutes: **10** planning, **45** writing, **5** proofreading.', size: 'lg' },
      ],
      lines: [
        { say: 'A plan does not need to be neat, but it needs to exist. First read the prompt and mark its key words. Then brainstorm ideas and evidence.', show: ['steps.0', 'steps.1'] },
        { say: 'Choose your thesis and the two or three points that prove it best, and put them in order with a word or two of evidence beside each.', show: ['steps.2', 'steps.3'] },
        { say: 'Then write, and proofread at the end.', show: 'steps.4' },
        { say: 'Now divide the time. For sixty minutes, spend about ten planning and five proofreading. Writing gets everything in between: forty-five minutes.', hide: 'steps', show: 'ans' },
      ],
    },
    {
      chapter: 'Writing and checking',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Start with your thesis', 'One point per paragraph', 'Short quotations or precise details', 'Short on time? Finish with a brief conclusion', 'Last five minutes: look for missing words and run-ons'] }],
      lines: [
        { say: 'Start with a short introduction that states your thesis, and give each body paragraph one point.', show: ['b.0', 'b.1'] },
        { say: 'You are not expected to remember long passages. A few exact words, or an accurate detail, are enough.', show: 'b.2' },
        { say: 'If time runs short, finish with a brief conclusion rather than stopping mid-paragraph.', show: 'b.3' },
        { say: 'In the last five minutes, read the essay through quickly for missing words, unfinished sentences and run-on sentences.', show: 'b.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Writing the essay twice', md: 'A full rough draft, then a neat copy, spends half the time **copying instead of thinking**. Write one careful draft from a good plan, and correct mistakes with a single line through them.' }],
      lines: [
        { say: 'A common mistake is writing the essay twice. A full rough draft followed by a neat copy spends half your time copying instead of thinking.', show: 'm' },
        { say: 'Write one careful draft from a good plan instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A prompt says: “Evaluate how effectively Saki builds suspense in ‘The Open Window’.” What must the essay do?',
          choices: [
            'List the techniques Saki uses and stay neutral about them',
            'Retell the events of the story in the order they happen',
            'Describe the setting and characters in as much detail as possible',
            'Judge how well the suspense works and support the judgement',
          ],
          answer: 3,
          working: 'Evaluate asks for a judgement, supported with evidence. Listing, retelling and describing do not judge.',
        },
      ],
      lines: [
        { say: 'Your turn. A prompt says: Evaluate how effectively Saki builds suspense in “The Open Window”. What must the essay do? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Evaluate asks for a judgement, supported with evidence. Choice A lists techniques but never judges them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the key verb and do exactly what it asks.', 'Plan for five to ten minutes: thesis, points, evidence.', 'Divide the time, write one careful draft, and proofread.'] }],
      lines: [
        { say: 'Let’s sum up. Find the key verb and do exactly what it asks.', show: 'sum.0' },
        { say: 'Plan for five to ten minutes: a thesis, your points, and the evidence for each.', show: 'sum.1' },
        { say: 'Then write one careful draft, and keep the last minutes for proofreading.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
