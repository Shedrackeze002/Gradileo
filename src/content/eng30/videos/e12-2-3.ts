import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-2-3',
  lessonId: 'e12-2-3',
  title: 'Modern Form, Free Verse and Sound',
  thumbnailTitle: 'Form, Free Verse and Sound',
  summary:
    'Poets from Hopkins to the Imagists reshaped the sonnet and invented new forms. Free verse follows breath, image and thought, and sound devices such as alliteration and caesura should always be linked to the meaning they support.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Modern Form, Free Verse and Sound', subtitle: 'When the sound of a line carries its sense' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I caught this morning morning’s minion, king-', 'dom of daylight’s dauphin, dapple-dawn-drawn Falcon, in his riding'],
          by: 'Gerard Manley Hopkins, “The Windhover”',
        },
      ],
      lines: [
        { say: 'Gerard Manley Hopkins wrote “The Windhover” in eighteen seventy-seven, but almost no one read it for forty years. His friend Robert Bridges did not publish his poems until nineteen eighteen.', show: 'title' },
        { say: 'Readers met lines like these. A word breaks in the middle, and stresses pile on stresses. The poem seemed to belong to the new century. In this lesson, you will see how poets reshaped old forms, and how the sound of a line can carry its sense.', show: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'Reshaping the sonnet',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Petrarchan**: an octave, then a sestet, with a turn at line 9',
            '**Shakespearean**: three quatrains and a closing couplet',
            '**Curtal**: Hopkins’s shortened sonnet, six lines then four and a half',
          ],
        },
      ],
      lines: [
        { say: 'A Petrarchan sonnet has an octave of eight lines and a sestet of six, with a turn at line nine. A Shakespearean sonnet has three quatrains and a closing couplet.', show: ['b.0', 'b.1'] },
        { say: 'Modern poets bent these forms to new purposes. Hopkins invented the curtal sonnet, with the same proportions as a Petrarchan sonnet, but shortened. Millay used the strict Petrarchan sonnet for grief, and Claude McKay and Countee Cullen used the Shakespearean sonnet for anger, love and wonder.', show: 'b.2', focus: 'b.2' },
        { say: 'To identify a sonnet, mark the rhymes, count the lines and find the turn. Then ask why the poem takes that shape.' },
      ],
    },
    {
      chapter: 'Free verse',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Little cramped words scrawling all over the paper', 'Like draggled fly’s legs,', 'What can you tell of the flaring moon', 'Through the oak leaves?'],
          by: 'Amy Lowell, “The Letter”',
        },
      ],
      lines: [
        { say: 'Around nineteen twelve, a group of poets calling themselves Imagists wanted poems that presented a thing directly, and cut every word that did no work.', focus: 'q' },
        { say: 'Free verse has no regular metre and usually no rhyme. A line ends where a breath, a picture or a thought ends. Read this opening by Amy Lowell.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Each line is a breath and a picture. The cramped words of a letter are set against a moonlit night they cannot capture, and no rhyme or metre gets in the way.', focus: 'q' },
      ],
    },
    {
      chapter: 'Sound and sense',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Alliteration**: the same first consonant repeated',
            '**Onomatopoeia**: a word that imitates its sound',
            '**Caesura**: a strong pause inside a line',
            '**Enjambment**: a sentence running over a line break',
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Naming the device and stopping', md: '“Hopkins uses alliteration” earns little. Say what **sound** it creates, and what **meaning** that supports.' },
      ],
      lines: [
        { say: 'Hopkins wrote in sprung rhythm, counting only the stressed syllables, so his lines rush, stop and surge like the falcon they describe.' },
        { say: 'Poets use sound to make a line do what it says. Alliteration repeats a first consonant. Onomatopoeia imitates a sound. A caesura is a strong pause inside a line, and enjambment runs a sentence over a line break.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Here is the common mistake. Saying Hopkins uses alliteration earns little. Always finish the sentence: the device creates this sound, and that sound supports this meaning.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Hopkins writes, “Landscape plotted and pieced—fold, fallow, and plough”. Which sentence best links sound to sense?',
          choices: [
            'The line uses alliteration on p and f, a feature of Hopkins’s style.',
            'The long, flowing line imitates a smooth field with an unbroken rhythm.',
            'The repeated sounds and broken list make the line a patchwork, like the land.',
            'The line uses rhyme and a strict metre to show how orderly the farmland is.',
          ],
          answer: 2,
          working: 'Alliteration and a list broken by a dash and commas make the line itself a patchwork, like the patched and dappled countryside it describes.',
        },
      ],
      lines: [
        { say: 'Your turn. In “Pied Beauty”, Hopkins writes, landscape plotted and pieced, fold, fallow, and plough. Which sentence best links sound to sense? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Alliteration and a list broken by a dash and commas make the line itself a patchwork, like the patched and dappled countryside it describes.', show: 'q2.answer' },
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
            'Modern poets reshaped the sonnet; ask why the poem takes its shape.',
            'Free verse follows breath, image and thought, not metre or rhyme.',
            'Link every sound device to the meaning it supports.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Modern poets reshaped the sonnet, so always ask why a poem takes its shape.', show: 'sum.0' },
        { say: 'Free verse follows breath, image and thought, not metre or rhyme.', show: 'sum.1' },
        { say: 'And every sound device should be linked to the meaning it supports. Read the line aloud, and listen.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
