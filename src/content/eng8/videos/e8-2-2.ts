import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-2-2',
  lessonId: 'e8-2-2',
  title: 'Poetic Form and Metre',
  summary:
    'A poem’s form is its shape and its metre is its beat. Common forms are the haiku, rhyming couplets, the sonnet, blank verse and free verse, and metre is built from feet such as the iamb (da-DUM) and the trochee (DUM-da).',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Poetic Form and Metre', subtitle: 'The shape and the beat of a poem' }],
      lines: [
        { say: 'Poets choose the shape and the beat of a poem on purpose.', show: 'title' },
        { say: 'So a good reader asks not just what the form is, but why the poet chose it. In this video we identify common forms, and learn to hear and count metre.' },
      ],
    },
    {
      chapter: 'Forms of poetry',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Form and metre', md: 'A poem’s **form** is its shape. Its **metre** is its regular beat.' },
        {
          kind: 'table',
          id: 't',
          head: ['Form', 'What to look for'],
          rows: [
            ['**Haiku**', 'three lines of 5, 7 and 5 syllables, one moment, often in nature'],
            ['**Rhyming couplets**', 'lines that rhyme in pairs: AA BB CC'],
            ['**Sonnet**', '14 lines, usually iambic pentameter, a set rhyme scheme'],
            ['**Blank verse**', 'unrhymed lines of iambic pentameter'],
            ['**Free verse**', 'no regular rhyme and no regular beat'],
          ],
        },
      ],
      lines: [
        { say: 'A poem’s form is its shape, and its metre is its regular beat.', show: 'def' },
        { say: 'A haiku has three lines, traditionally of five, seven and five syllables in English, capturing one moment. Rhyming couplets are lines that rhyme in pairs.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A sonnet has fourteen lines, usually in iambic pentameter. Blank verse is unrhymed iambic pentameter.', focus: ['t.2', 't.3'] },
        { say: 'And free verse has no regular rhyme and no regular beat.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Why this form?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Nature’s first green is gold,', 'Her hardest hue to hold.', 'Her early leaf’s a flower;', 'But only so an hour.', 'Then leaf subsides to leaf.', 'So Eden sank to grief,', 'So dawn goes down to day.', 'Nothing gold can stay.'], by: 'Robert Frost, “Nothing Gold Can Stay”' },
        { kind: 'text', id: 'a', size: 'md', md: 'A brief, tight form for **beauty that lasts only a moment**.' },
      ],
      lines: [
        { say: 'Robert Frost’s Nothing Gold Can Stay is eight short lines in rhyming couplets.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5', 'q.6', 'q.7'] },
        { say: 'The poem is about beauty that lasts only a moment. It is very short, and its quick, neat couplets snap shut one after another.', focus: ['q.0', 'q.1'] },
        { say: 'So the form matches the subject. The poem is over almost as soon as it begins, like the gold of early spring.', show: 'a' },
      ],
    },
    {
      chapter: 'Feet',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Foot', 'Pattern', 'Example word'],
          rows: [
            ['**Iamb**', 'da-**DUM**', 'to-**DAY**'],
            ['**Trochee**', '**DUM**-da', '**GAR**-den'],
          ],
        },
        { kind: 'text', id: 'n', size: 'md', md: '**Tetrameter**: four feet. **Pentameter**: five feet.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Blank verse is not free verse', md: 'Both are unrhymed. **Blank verse** keeps a regular beat; **free verse** has none. Shakespeare wrote most of his plays in blank verse.' },
      ],
      lines: [
        { say: 'Metre is built from feet: small groups of stressed and unstressed syllables. An iamb is da dum, as in today. A trochee is dum da, as in garden.', show: 't' },
        { say: 'The number of feet in a line gives the second part of the name. Tetrameter has four feet, and pentameter has five.', show: 'n' },
        { say: 'Do not confuse blank verse with free verse. Both are unrhymed, but blank verse keeps a regular beat, and free verse has none.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Counting feet',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The course of true love never did run smooth.'], by: 'Lysander, A Midsummer Night’s Dream' },
        { kind: 'text', id: 'a', size: 'lg', md: 'the **COURSE** · of **TRUE** · love **NEV** · er **DID** · run **SMOOTH**' },
        { kind: 'text', id: 'b', size: 'md', md: '**TY**-ger **TY**-ger, **BURN**-ing **BRIGHT**: trochaic, like a hammer striking' },
      ],
      lines: [
        { say: 'Let’s count the feet in a line from A Midsummer Night’s Dream. The course of true love never did run smooth.', show: 'q' },
        { say: 'Mark the beats. Each foot is da dum, and there are five of them. So the line is iambic pentameter, which often sounds like natural speech.', show: 'a', focus: 'a' },
        { say: 'William Blake’s The Tyger opens with a different beat: Tyger Tyger, burning bright. That is dum da, dum da, so it is trochaic. The heavy first beats sound like a hammer striking.', caption: 'William Blake’s “The Tyger” opens with a different beat: Tyger Tyger, burning bright. That is DUM-da, DUM-da, so it is trochaic. The heavy first beats sound like a hammer striking.', show: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem has no rhyme, but every line has a steady da-DUM beat with five beats. What form is it?',
          choices: ['Free verse', 'A haiku', 'Rhyming couplets', 'Blank verse'],
          answer: 3,
          working: 'Unrhymed lines of iambic pentameter are blank verse. Free verse has no regular beat at all.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem has no rhyme, but every line has a steady da dum beat with five beats. What form is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, blank verse. Unrhymed iambic pentameter is blank verse, while free verse has no regular beat at all.', show: 'q2.answer' },
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
            '**Haiku**, **rhyming couplets**, **sonnet**, **blank verse**, **free verse**.',
            'Ask why a poet chose a form: it often matches the subject.',
            'An **iamb** is da-DUM; a **trochee** is DUM-da.',
            '**Tetrameter** has four feet; **pentameter** has five.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Common forms are the haiku, rhyming couplets, the sonnet, blank verse and free verse.', show: 'sum.0' },
        { say: 'Ask why a poet chose a form, because it often matches the subject.', show: 'sum.1' },
        { say: 'An iamb is da dum, and a trochee is dum da.', show: 'sum.2' },
        { say: 'And tetrameter has four feet, while pentameter has five.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
