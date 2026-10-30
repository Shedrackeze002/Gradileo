import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-2',
  lessonId: 'e10-6-2',
  title: 'The Analytical Essay: Thesis, Evidence, Analysis',
  thumbnailTitle: 'Thesis, Evidence, Analysis',
  thumbnail: false,
  summary:
    'An analytical essay argues how a text works. Learn to write an arguable, specific, analytical thesis, and to build body paragraphs from a point, evidence and analysis.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Analytical Essay', subtitle: 'Thesis, evidence, analysis' }],
      lines: [
        { say: 'An analytical essay is an argument about how a text works. It does not ask what happens in a story, because your reader already knows that.', show: 'title' },
        { say: 'It asks how the writer makes something happen to the reader, and why it matters. In this lesson you will write a thesis, and build a body paragraph from a point, evidence and analysis.' },
      ],
    },
    {
      chapter: 'The thesis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Thesis', md: 'The one-sentence claim an essay sets out to prove. It is **arguable**, **specific** and **analytical**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Weak thesis', 'What is wrong'],
          rows: [
            ['In this essay, I will discuss the monkey’s paw.', 'An announcement, not a claim'],
            ['The Whites wish for money and their son dies.', 'A plot summary'],
            ['“The Monkey’s Paw” is a scary story.', 'An opinion with no reason or focus'],
          ],
        },
      ],
      lines: [
        { say: 'A thesis is the one-sentence claim that a whole essay sets out to prove. A strong thesis is arguable, specific and analytical.', show: 'def' },
        { say: 'Arguable means a thoughtful reader could disagree. Specific means it names what you will examine. Analytical means it says how or why, not just what.' },
        { say: 'Weak theses fail in predictable ways. An announcement of a topic is not a claim.', hide: 'def', show: 't.0', focus: 't.0' },
        { say: 'A plot summary only retells the story.', show: 't.1', focus: 't.1' },
        { say: 'And a bare opinion, such as “it is a scary story”, gives no reason and no focus.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Strengthening a thesis',
      layout: 'center',
      main: [
        { kind: 'text', id: 'weak', md: 'Weak: *“The Monkey’s Paw” is a scary story.*', size: 'lg' },
        { kind: 'bullets', id: 'steps', items: ['What makes it scary? Early warnings that the paw brings sorrow.', 'Name the technique and where it happens: the sergeant-major’s warnings, before any wish.', 'Say how it works on the reader.'] },
        { kind: 'text', id: 'ans', md: '*W. W. Jacobs builds suspense in “The Monkey’s Paw” by warning the reader early, through the sergeant-major, so that every wish the Whites make is filled with dread.*', size: 'md' },
      ],
      lines: [
        { say: 'Let’s strengthen that weak thesis: “The Monkey’s Paw” is a scary story.', show: 'weak' },
        { say: 'First ask what makes it scary. The reader is warned early that the paw brings sorrow.', show: 'steps.0' },
        { say: 'Then name the technique and where it happens: the sergeant-major’s warnings, before any wish is made.', show: 'steps.1' },
        { say: 'Finally, say how it works on the reader. Now the claim is analytical, and a classmate could disagree with it.', hide: 'weak', show: ['steps.2', 'ans'] },
      ],
    },
    {
      chapter: 'Point, evidence, analysis',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Point**: a topic sentence saying what the paragraph proves', '**Evidence**: words from the text, usually a short quotation', '**Analysis**: how particular words prove the point'] },
        { kind: 'text', id: 'model', md: 'Point: Jack London presents the man as practical but unable to imagine danger.\n\nEvidence: The narrator says that the cold “impressed him as being cold and uncomfortable, and that was all.”\n\nAnalysis: The words “and that was all” show that the man notices the cold as a fact but never thinks about what it could do to him.', size: 'md' },
      ],
      lines: [
        { say: 'Each body paragraph proves one part of the thesis, in three parts. The point is a topic sentence stating what the paragraph will prove.', show: 'b.0' },
        { say: 'The evidence is words from the text, usually a short quotation. The analysis explains how those words prove the point.', show: ['b.1', 'b.2'] },
        { say: 'Here is a model on “To Build a Fire”. The point says the man cannot imagine danger. The evidence is a short quotation about the cold. The analysis picks out the words “and that was all”.', hide: 'b', show: 'model' },
        { say: 'Analysis is usually longer than the evidence. One quotation, explained well, proves more than three dropped in a row.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Repeating the quotation', md: '*This shows that the cold was only cold and uncomfortable to him.* That adds nothing. Ask: **which words matter, and why?**' }],
      lines: [
        { say: 'The commonest weak analysis repeats the quotation in other words. That adds nothing new.', show: 'm' },
        { say: 'Ask instead which words matter, and explain their effect on the reader.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is the strongest thesis for an essay about “The Monkey’s Paw”?',
          choices: [
            'In this essay, I will discuss the monkey’s paw and the three wishes.',
            'The Whites wish for money, and soon afterwards their son dies.',
            '“The Monkey’s Paw” is a very scary story that many readers enjoy.',
            'Jacobs builds dread by warning us early, so every wish feels risky.',
          ],
          answer: 3,
          working: 'Choice D is arguable, specific and analytical: it names the technique and how it affects the reader. A is an announcement, B a plot summary and C a bare opinion.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four sentences is the strongest thesis for an essay about “The Monkey’s Paw”? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. It makes a claim a reader could dispute, names the technique, and says how it affects the reader. Choice B is only plot summary.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A thesis is arguable, specific and analytical.', 'A body paragraph has a point, evidence and analysis.', 'Analysis explains how particular words prove the point.'] }],
      lines: [
        { say: 'Let’s sum up. A thesis is arguable, specific and analytical.', show: 'sum.0' },
        { say: 'Every body paragraph has a point, evidence and analysis.', show: 'sum.1' },
        { say: 'And analysis explains how particular words prove the point, instead of repeating them.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
