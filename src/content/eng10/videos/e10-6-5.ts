import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-5',
  lessonId: 'e10-6-5',
  title: 'Revising and Editing',
  thumbnail: false,
  summary:
    'Revise ideas and order first, then edit sentences: connect ideas with the right transitions, cut words that do no work, and keep every paragraph on one idea.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Revising and Editing', subtitle: 'From rough draft to strong essay' }],
      lines: [
        { say: 'No one writes a perfect first draft. Professional writers expect to change their work many times.', show: 'title' },
        { say: 'The difference between a rough draft and a strong essay is usually made after the first draft is finished. In this lesson you will connect ideas, cut wasted words, and keep paragraphs focused.' },
      ],
    },
    {
      chapter: 'Revising and transitions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Revising and editing', md: '**Revising** means re-seeing the draft: ideas, order, evidence, connections. **Editing** means fixing sentences: wordiness, word choice, grammar, spelling, punctuation. Revise first.' },
        {
          kind: 'table',
          id: 't',
          head: ['Relationship', 'Transitions'],
          rows: [
            ['Contrast', 'however, even so, nevertheless'],
            ['Cause and effect', 'as a result, therefore, consequently'],
            ['Addition', 'in addition, also, what is more'],
            ['Example', 'for example, for instance'],
          ],
        },
      ],
      lines: [
        { say: 'Revising means re-seeing the draft: the ideas, the order, the evidence and the connections. Editing means fixing the sentences. Revise first, because there is no point polishing a sentence you are about to cut.', show: 'def' },
        { say: 'A transition is a word or phrase that shows how one idea relates to the next. Choose it by the relationship. Contrast words include however and nevertheless.', hide: 'def', show: 't.0' },
        { say: 'Cause and effect words include as a result and therefore.', show: 't.1' },
        { say: 'Addition and example words, such as in addition and for instance, complete the set.', show: ['t.2', 't.3'] },
        { say: 'Try it: “The forecast promised sunshine. It rained all afternoon.” The rain goes against what we expected, so we need contrast: “However, it rained all afternoon.”', focus: 't.0' },
      ],
    },
    {
      chapter: 'Cutting wordiness',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['*due to the fact that* means *because*', '*made the decision to postpone* means *postponed*', '*until a later date* adds nothing'] },
        { kind: 'text', id: 'ans', md: 'Wordy: *Due to the fact that it was raining, we made the decision to postpone the match until a later date.*\n\nConcise: *Because it was raining, we postponed the match.*', size: 'md' },
      ],
      lines: [
        { say: 'Concise writing says everything it needs in as few words as possible. Watch for empty phrases, redundant pairs such as “free gift”, and needless repetition.', show: 'ans.0' },
        { say: 'Take “Due to the fact that it was raining, we made the decision to postpone the match until a later date.” “Due to the fact that” just means because.', hide: 'ans', show: 'b.0' },
        { say: '“Made the decision to postpone” means postponed. And “until a later date” adds nothing, because postponing already means moving to a later date.', show: ['b.1', 'b.2'] },
        { say: 'The result: “Because it was raining, we postponed the match.”', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'Unity and order',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Unity and coherence', md: 'A paragraph has **unity** when every sentence supports its topic sentence. It has **coherence** when the sentences are in a sensible order and linked.' }],
      lines: [
        { say: 'A paragraph has unity when every sentence supports its topic sentence. It has coherence when the sentences are in a sensible order and linked.', show: 'def' },
        { say: 'To check unity, reread the topic sentence, then ask of every other sentence: does this support that idea? A sentence that is true but off topic still has to go.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Cutting the meaning too', md: '*We postponed the match* is shorter still, but it has lost the reason. Cut the padding, **never the information**.' }],
      lines: [
        { say: 'Concise does not mean as short as possible. “We postponed the match” is shorter still, but it has lost the reason.', show: 'm' },
        { say: 'Cut the padding, never the information.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which transition best fills the gap? “The bakery ran out of bread by nine. ____ many customers left empty-handed.”',
          choices: ['As a result,', 'However,', 'For example,', 'On the other hand,'],
          answer: 0,
          working: 'The empty-handed customers are a result of the bread running out, so a cause and effect transition fits.',
        },
      ],
      lines: [
        { say: 'Your turn. The bakery ran out of bread by nine, and then a gap, many customers left empty-handed. Which transition best fills the gap? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is Choice A, as a result. The customers leaving is an effect of the bread running out. However would promise a contrast that is not there.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Revise ideas first, then edit sentences.', 'Choose transitions that show the real relationship.', 'Cut padding, never information.', 'Every sentence supports the topic sentence.'] }],
      lines: [
        { say: 'Let’s sum up. Revise the ideas first, then edit the sentences.', show: ['sum.0'] },
        { say: 'Choose transitions that show the real relationship between ideas, and cut padding without cutting information.', show: ['sum.1', 'sum.2'] },
        { say: 'Finally, make sure every sentence supports the topic sentence of its paragraph.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
