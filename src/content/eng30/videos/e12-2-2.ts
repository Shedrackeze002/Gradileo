import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-2-2',
  lessonId: 'e12-2-2',
  title: 'War Poetry and Witness',
  summary:
    'A poem of witness records suffering so that it cannot be forgotten. Ask where it watches from, look for irony and refused consolation, notice how form such as pararhyme and long lines is part of the witness, and compare two war poems point by point.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'War Poetry and Witness', subtitle: 'Poems that make readers see what war does' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The subject of it is War, and the pity of War.', 'The Poetry is in the pity.'],
          by: 'Wilfred Owen, preface to Poems',
        },
      ],
      lines: [
        { say: 'Wilfred Owen was killed in France on the fourth of November, nineteen eighteen, a week before the war ended. Among his papers, his friends found a draft preface that says what his poems are for.', show: 'title' },
        { say: 'Owen did not want to celebrate battles or to console. He wanted readers to see what war does to people. In this lesson, you will compare how poets bear witness, and how they use situation, form, imagery and irony.', show: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'Where the witness stands',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Poetry of witness', md: 'A poem that records suffering the poet has seen or lived through, so that it cannot be forgotten. Ask **where it watches from**.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Shall they return to beatings of great bells', 'In wild trainloads?', 'A few, a few, too few for drums and yells,', 'May creep back, silent, to still village wells', 'Up half-known roads.'],
          by: 'Wilfred Owen, “The Send-off”',
        },
      ],
      lines: [
        { say: 'A poem of witness records suffering so that it cannot be forgotten. The first question to ask is where it watches from. Rosenberg writes from the trenches, Whitman from a battlefield at night, and Hardy from the grave.', show: 'def' },
        { say: 'Owen watches from a railway station. His soldiers leave so secretly, like wrongs hushed up. Will they come home to bells and cheering crowds?', show: ['q.0', 'q.1'] },
        { say: 'No. Only a few, too few for drums and yells, will creep back, silent. Most of the men will die, so the send-off was a funeral in disguise.', show: ['q.2', 'q.3', 'q.4'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'Irony and form',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Irony**: the poem refuses the comfort a reader expects',
            '**Pararhyme**: matching consonants, different vowels (*years*, *yours*)',
            '**Whitman**: long, unrhymed lines that make us wait',
          ],
        },
      ],
      lines: [
        { say: 'War elegies often refuse consolation, and they use irony, the gap between what a reader expects and what the poem gives. In Hardy’s “Channel Firing”, the dead hear naval guns and think it is Judgment Day. It is only gunnery practice.', show: 'b.0', focus: 'b.0' },
        { say: 'Form is part of the witness too. Owen uses pararhyme, which pairs words with matching consonants but different vowels, such as years and yours. The ends of his lines echo, but never quite chime.', show: 'b.1', focus: 'b.1' },
        { say: 'Whitman’s long, unrhymed lines unroll slowly, so the reader sits through the night with the speaker. Owen’s echoes unsettle us, while Whitman’s lines make us wait and watch.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Comparing poem by poem', md: 'Everything about one poem, then everything about the other, gives two short essays. Take **one point at a time**: where each watches from, its image, its form, its tone.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Writing everything about one poem and then everything about the other gives you two short essays, not a comparison.', show: 'm' },
        { say: 'Take one point at a time, such as where each poem watches from, and say how the two poems are alike and how they differ. Edward Thomas’s owl and Rosenberg’s rat make a good pair.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence best compares how form works as witness in Owen and Whitman?',
          choices: [
            'Both poets use perfect rhyme, so each poem ends in settled comfort.',
            'Owen’s pararhyme echoes without resolving; Whitman’s long lines make us wait.',
            'Owen’s long lines slow the reader down; Whitman’s pararhyme unsettles us.',
            'Owen writes in strict rhyme to console, while Whitman writes in short lines.',
          ],
          answer: 1,
          working: 'Owen’s pararhyme echoes without resolving, and Whitman’s long unrhymed lines make the reader wait and watch.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence best compares how form works as witness in Owen and Whitman? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Owen’s pararhyme echoes without resolving, and Whitman’s long unrhymed lines make the reader wait and watch.', show: 'q2.answer' },
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
            'A poem of witness records suffering; ask where it watches from.',
            'Many war elegies refuse consolation; look for irony.',
            'Form is part of the witness; compare point by point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A poem of witness records suffering so it cannot be forgotten, so ask where it watches from.', show: 'sum.0' },
        { say: 'Many war elegies refuse consolation, so look for irony.', show: 'sum.1' },
        { say: 'And form is part of the witness. To compare two poems, go point by point.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
