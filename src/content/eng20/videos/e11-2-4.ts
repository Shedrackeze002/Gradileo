import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-2-4',
  lessonId: 'e11-2-4',
  title: 'Comparing Poems',
  summary:
    'To compare two poems, begin with what they share, then work through speaker, tone, imagery, form, ending and context, supporting each point with evidence from both poems and explaining why the difference matters.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Comparing Poems', subtitle: 'Two poems, one subject' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['If I should die, think only this of me:', 'That there’s some corner of a foreign field', 'That is for ever England.'],
          by: 'Rupert Brooke, “The Soldier”',
        },
      ],
      lines: [
        { say: 'Two young English poets, both soldiers in the First World War, wrote about dying for their country. Rupert Brooke wrote before he had seen battle.', show: ['title', 'q.0', 'q.1', 'q.2'] },
        { say: 'Wilfred Owen wrote after months in the trenches, and ended his poem with a Latin line from the Roman poet Horace, calling that line the old Lie. Same war, same subject, opposite answers. In this lesson, you will learn a method for comparing poems.' },
      ],
    },
    {
      chapter: 'Points of comparison',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Comparing poems', md: 'Explain how two poems are alike and how they differ, and **why the differences matter**. Begin with what they share.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Speaker** and situation',
            '**Attitude** and tone',
            '**Imagery**',
            '**Form** and structure, and the **ending**',
            '**Context**: when each was written',
          ],
        },
      ],
      lines: [
        { say: 'To compare two poems, begin with what they share, usually the subject. Then the differences become meaningful, instead of random.', show: 'def' },
        { say: 'Work through the same questions for both poems: the speaker and situation, the attitude and tone, and the imagery.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Then look at form and structure, the ending, and the context. Brooke’s imagery is gentle and green, while Owen’s is brutal. Brooke wrote before the fighting, and Owen after he had seen gas attacks with his own eyes.', show: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Two birds of hope',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Yet, never, in extremity,', 'It asked a crumb of me.'], by: 'Emily Dickinson, “Hope is the thing with feathers”' },
        { kind: 'quote', id: 'r', size: 'md', lines: ['Some blessed Hope, whereof he knew', 'And I was unaware.'], by: 'Thomas Hardy, “The Darkling Thrush”' },
        { kind: 'text', id: 'ans', size: 'md', md: 'Dickinson’s speaker feels hope **within**, steady and generous. Hardy’s speaker hears it from **outside** and cannot share it.' },
      ],
      lines: [
        { say: 'Here is the end of two poems in which a small bird stands for hope. Dickinson’s speaker has heard hope singing in the coldest, strangest places, and says it never asked for a crumb in return.', show: ['q.0', 'q.1'] },
        { say: 'Hardy’s speaker hears an old thrush sing with joy on a bleak winter evening, but can only guess at the hope it knows. This speaker is unaware.', show: ['r.0', 'r.1'] },
        { say: 'So both poems use a singing bird for hope, but one speaker is certain of it, and the other can only listen.', show: 'ans' },
      ],
    },
    {
      chapter: 'Writing the comparison',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Point by point**: one point at a time, with both poems under each',
            '**Poem by poem**: all of one poem, then all of the other',
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Joining words: *both*, *similarly*, *whereas*, *unlike*, *in contrast*.' },
      ],
      lines: [
        { say: 'There are two common ways to organize a comparison. Point by point takes one point at a time and discusses both poems under each.', show: 'b.0', focus: 'b.0' },
        { say: 'Poem by poem is simpler, but it risks becoming two separate essays.', show: 'b.1', focus: 'b.1' },
        { say: 'Comparative words such as both, whereas and unlike hold the two poems together in a single sentence.', show: 't' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Two summaries side by side', md: 'A paragraph on one poem followed by a paragraph on the other is not yet a comparison. Every paragraph should **connect** the poems and **quote both**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A paragraph on one poem, then a paragraph on the other, is not yet a comparison.', show: 'm' },
        { say: 'Every paragraph should connect the poems, quote both, and explain why the difference matters.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence best compares two poems about war?',
          choices: [
            'The first poem is about a soldier’s death, and the second is about war.',
            'The first poem is gentle, and the second also describes a soldier.',
            'Whereas the first poem is gentle, the second is brutal, so war looks different.',
            'Both poems were written by soldiers and are about the First World War.',
          ],
          answer: 2,
          working: 'Choice C names a point, contrasts both poems and says why it matters. The others list or only note a likeness.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence best compares two poems about war? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It names a point, contrasts both poems and says why it matters. The others only list or note a likeness.', show: 'q2.answer' },
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
            'Begin with what the poems share, usually the subject.',
            'Compare point by point, with evidence from both poems.',
            'Use comparative words, and explain why the difference matters.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Begin with what the poems share, usually the subject.', show: 'sum.0' },
        { say: 'Compare them point by point, with evidence from both poems.', show: 'sum.1' },
        { say: 'And use comparative words to keep both poems in every sentence, explaining why the difference matters.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
