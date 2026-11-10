import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-2-4',
  lessonId: 'e7-2-4',
  title: 'The Sonnet and Free Verse',
  summary:
    'A poem’s form is its shape: its lines, stanzas, rhyme and rhythm. Free verse has no regular rhyme or beat, while a Shakespearean sonnet has three quatrains and a couplet rhyming ABAB CDCD EFEF GG, often with a turn where the argument changes direction.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'The Sonnet and Free Verse', subtitle: 'A strict form and a free one' }],
      lines: [
        { say: 'Some poems follow strict rules about their shape, and some follow none at all.', show: 'title' },
        { say: 'In this video we compare a very strict form, the sonnet, with a very free one, free verse, and see how the shape of each poem carries meaning.' },
      ],
    },
    {
      chapter: 'Telling forms apart',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Form', md: 'A poem’s **form** is its shape: how many lines it has, how they are grouped, and whether it follows a pattern of rhyme and rhythm.' },
        {
          kind: 'table',
          id: 't',
          head: ['Form', 'What to look for'],
          rows: [
            ['**Sonnet**', '14 lines, usually iambic pentameter, a set rhyme scheme'],
            ['**Ballad**', 'a story in four-line stanzas, beats 4-3-4-3, rhyming ABCB'],
            ['**Limerick**', '5 lines rhyming AABBA, bouncy and funny'],
            ['**Free verse**', 'no regular rhyme scheme and no regular beat'],
          ],
        },
      ],
      lines: [
        { say: 'A poem’s form is its shape: how many lines it has, how they are grouped, and whether it follows a pattern of rhyme and rhythm.', show: 'def' },
        { say: 'A sonnet has fourteen lines, usually in iambic pentameter, with a set rhyme scheme. A ballad tells a story in four-line stanzas.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A limerick has five bouncy, funny lines. And free verse has no regular rhyme scheme and no regular beat.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Free verse',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['When I heard the learn’d astronomer,', 'When the proofs, the figures, were ranged in columns before me,', '…', 'In the mystical moist night-air, and from time to time,', 'Look’d up in perfect silence at the stars.'], by: 'Walt Whitman, “When I Heard the Learn’d Astronomer”' },
        { kind: 'text', id: 'a', size: 'md', md: 'Long, piled-up lines feel like the **tiring lecture**; the short last line feels like the **peace** of the stars.' },
      ],
      lines: [
        { say: 'Free verse follows the rhythms of natural speech. Its lines can be long or short, shaped by the thought rather than a pattern. Walt Whitman was one of its great early writers.', show: ['q.0', 'q.1'] },
        { say: 'In this poem, the speaker sits through a lecture full of proofs and figures, grows tired, and wanders outside to look up at the stars.', show: ['q.2', 'q.3', 'q.4'] },
        { say: 'There is no rhyme and no steady beat. But the form still matters. The long, piled-up when lines feel like the crowded, tiring lecture, and the short, simple last line feels like the peace of looking at the stars.', show: 'a', focus: ['q.4', 'a'] },
      ],
    },
    {
      chapter: 'The Shakespearean sonnet',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Shakespearean sonnet', md: 'A **Shakespearean sonnet** has **14 lines** of iambic pentameter: three **quatrains** (four lines each) and a final rhyming **couplet**. Its rhyme scheme is **ABAB CDCD EFEF GG**.' },
      ],
      lines: [
        { say: 'A Shakespearean sonnet has fourteen lines of iambic pentameter.', show: 'def' },
        { say: 'They form three quatrains, of four lines each, and a final rhyming couplet. Each quatrain has its own pair of rhymes, and the couplet rhymes with itself.', focus: 'def' },
      ],
    },
    {
      chapter: 'Sonnet 18',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', size: 'md', lines: ['Shall I compare thee to a summer’s day?', 'Thou art more lovely and more temperate:', 'Rough winds do shake the darling buds of May,', 'And summer’s lease hath all too short a date;', '…', 'But thy eternal summer shall not fade,', '…', 'So long as men can breathe or eyes can see,', 'So long lives this, and this gives life to thee.'], by: 'William Shakespeare, Sonnet 18' }],
      lines: [
        { say: 'Here is part of Shakespeare’s Sonnet eighteen. Lines one to four end day, temperate, May and date. That is "A", "B", "A", "B".', caption: 'Here is part of Shakespeare’s Sonnet 18. Lines 1 to 4 end day, temperate, May and date. That is ABAB.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Each new quatrain brings new rhymes, "C", "D", "C", "D", then "E", "F", "E", "F", and the last two lines, see and thee, are the couplet, "G", "G".', caption: 'Each new quatrain brings new rhymes, CDCD, then EFEF, and the last two lines, see and thee, are the couplet, GG.', show: ['q.4', 'q.5', 'q.6', 'q.7', 'q.8'], focus: ['q.7', 'q.8'] },
      ],
    },
    {
      chapter: 'The turn',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The turn', md: 'The **turn** (or *volta*) is the place where a sonnet’s argument **changes direction**.' },
        { kind: 'text', id: 't', size: 'md', md: 'Lines 1 to 8: summer’s **faults** → line 9: ***But*** thy eternal summer shall not fade → couplet: **why**' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Rhymes that look wrong', md: '*Temperate* and *date* do not sound perfect today. Pronunciation has changed in four hundred years, and poets also used near rhymes. Go by the **pattern** of line endings.' },
      ],
      lines: [
        { say: 'The first eight lines of the sonnet list summer’s faults: rough winds, a season that ends too soon, and a sun that is sometimes too hot.', show: 'def' },
        { say: 'Then, at line nine, the poem changes direction with the word but. The person’s eternal summer shall not fade. This change of direction is called the turn.', show: 't', focus: 't' },
        { say: 'The closing couplet explains why. As long as people read this poem, it keeps the person alive.', focus: 't' },
        { say: 'Watch out for rhymes that look wrong, like temperate and date. Pronunciation has changed in four hundred years, so go by the pattern of the line endings.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem has 14 lines in iambic pentameter, and its last two lines rhyme with each other. What form is it most likely?',
          choices: ['A ballad', 'Free verse', 'A limerick', 'A Shakespearean sonnet'],
          answer: 3,
          working: 'Fourteen lines of iambic pentameter ending in a rhyming couplet is the shape of a Shakespearean sonnet.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem has fourteen lines in iambic pentameter, and its last two lines rhyme. What form is it most likely? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, a Shakespearean sonnet. Fourteen lines of iambic pentameter ending in a rhyming couplet is its shape.', show: 'q2.answer' },
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
            'A poem’s **form** is its shape: lines, stanzas, rhyme and rhythm.',
            '**Free verse** has no regular rhyme or beat, but line lengths carry meaning.',
            'A **Shakespearean sonnet** is three quatrains and a couplet: ABAB CDCD EFEF GG.',
            'Many sonnets have a **turn**, where the argument changes direction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A poem’s form is its shape: its lines, stanzas, rhyme and rhythm.', show: 'sum.0' },
        { say: 'Free verse has no regular rhyme or beat, but its line lengths still carry meaning.', show: 'sum.1' },
        { say: 'A Shakespearean sonnet is three quatrains and a couplet.', show: 'sum.2' },
        { say: 'And many sonnets have a turn, where the argument changes direction.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
