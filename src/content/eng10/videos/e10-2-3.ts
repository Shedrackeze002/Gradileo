import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-2-3',
  lessonId: 'e10-2-3',
  title: 'Form',
  summary:
    'Stanzas are named by their number of lines, and forms such as the sonnet, haiku, limerick, ballad, ode, elegy and free verse set up expectations. Form shapes meaning, so say what it does, not just its name.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Form', subtitle: 'The shape of a poem' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['There was an Old Man with a beard,', 'Who said, “It is just as I feared!—', 'Two Owls and a Hen,', 'Four Larks and a Wren,', 'Have all built their nests in my beard!”'], by: 'Edward Lear, “There was an Old Man with a beard”' },
      ],
      lines: [
        { say: 'Here is a poem by Edward Lear.', show: ['title', 'q.0', 'q.1', 'q.2', 'q.3', 'q.4'] },
        { say: 'Before you reach the end, you know it is going to be funny. Five lines, a bouncing rhythm, two short lines rushing toward a punchline: the form tells you what kind of poem you are reading. In this lesson, you will learn to name stanzas and the main forms of poetry.' },
      ],
    },
    {
      chapter: 'Stanzas',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Stanza', 'Lines'],
          rows: [['Couplet', '2'], ['Tercet', '3'], ['Quatrain', '4'], ['Sestet', '6'], ['Octave', '8']],
        },
      ],
      lines: [
        { say: 'A stanza is a group of lines in a poem, set apart by a space, like a paragraph in prose. Stanzas are named by their number of lines.' },
        { say: 'A couplet has two lines, a tercet has three, and a quatrain has four.', show: ['t.0', 't.1', 't.2'] },
        { say: 'A sestet has six lines, and an octave has eight. Tennyson’s “The Eagle” is two tercets, and the space between them marks the change from stillness to action.', show: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'The sonnet',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Shakespearean', 'Petrarchan'],
          rows: [
            ['Parts', 'three quatrains and a couplet', 'an octave and a sestet'],
            ['The turn', 'line 9, or the closing couplet', 'usually line 9'],
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['So long as men can breathe, or eyes can see,', 'So long lives this, and this gives life to thee.'], by: 'William Shakespeare, “Sonnet 18”' },
      ],
      lines: [
        { say: 'A sonnet is a poem of fourteen lines, usually in iambic pentameter. At some point it turns to a new thought or feeling, and that turn is called the volta.' },
        { say: 'A Shakespearean sonnet is three quatrains and a couplet. A Petrarchan sonnet is an octave and a sestet.', show: 't' },
        { say: 'In a Shakespearean sonnet, the closing couplet often sums up the poem or gives it a twist. Sonnet eighteen ends by claiming that the poem itself will keep a beauty alive.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Other forms',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Haiku**: three lines, one moment',
            '**Limerick**: a comic poem rhyming AABBA',
            '**Ballad**: tells a story in song-like stanzas',
            '**Ode** praises its subject; an **elegy** mourns',
            '**Free verse**: no regular rhyme or metre',
          ],
        },
      ],
      lines: [
        { say: 'A haiku is a three-line form that captures a single moment. A limerick is a comic five-line poem rhyming A A B B A.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'A ballad tells a story in song-like stanzas. An ode speaks to its subject and praises it, and an elegy mourns someone who has died.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'Free verse has no regular rhyme or metre, and follows the rhythms of speech.', show: 'b.4', focus: 'b.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Naming the form is not enough', md: 'Say what the form **does**: a couplet that clinches an argument, a refrain that keeps returning, a haiku’s single image.' },
      ],
      lines: [
        { say: 'Here is a common mistake. When you write about a poem’s form, do not stop at naming it.', show: 'm' },
        { say: 'Say what the form does. A couplet might clinch an argument, a refrain might keep returning to a place, and a haiku might hold a single image.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem has fourteen lines, made up of three quatrains and a couplet. Which kind of poem is it?',
          choices: [
            'A Petrarchan (Italian) sonnet',
            'A Shakespearean (English) sonnet',
            'A ballad, a poem that tells a story',
            'A limerick, a short comic poem',
          ],
          answer: 1,
          working: 'Three quatrains and a couplet make fourteen lines: a Shakespearean sonnet. A Petrarchan sonnet is an octave and a sestet.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem has fourteen lines, made up of three quatrains and a couplet. Which kind of poem is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Three quatrains and a couplet make a Shakespearean sonnet. Choice A is an octave and a sestet.', show: 'q2.answer' },
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
            'Stanzas are named by their number of lines.',
            'A sonnet has fourteen lines and a turn, the volta.',
            'Form shapes meaning: ask where the poem pauses, repeats and turns.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Stanzas are named by their number of lines, from the couplet to the octave.', show: 'sum.0' },
        { say: 'A sonnet has fourteen lines and a turn called the volta, and other forms include the haiku, limerick, ballad, ode and elegy.', show: 'sum.1' },
        { say: 'Form shapes meaning, so ask where the poem pauses, repeats and turns, and why.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
