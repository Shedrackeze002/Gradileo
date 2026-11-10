import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-2-3',
  lessonId: 'e9-2-3',
  title: 'Metre and Rhythm',
  summary:
    'Scansion marks the stressed and unstressed syllables in a line to find its metre: iambs (da-DUM), trochees (DUM-da) and spondees (DUM-DUM). Poets break the regular beat to stress important words. Enjambment runs a sentence on to the next line, a caesura pauses mid-line, and end-stopped lines feel complete; the rhythm often mirrors the meaning.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Metre and Rhythm', subtitle: 'Hearing the beat, and the breaks' }],
      lines: [
        { say: 'Every line of poetry has a rhythm, and poets shape it as carefully as their words.', show: 'title' },
        { say: 'In this video we scan lines to find their metre, and look at the tools poets use to bend rhythm: enjambment, caesura, and the deliberate broken beat.' },
      ],
    },
    {
      chapter: 'Scansion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scansion', md: '**Scansion** is marking the **stressed** (DUM) and **unstressed** (da) syllables in a line to find its **metre**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Foot', 'Pattern', 'Example'],
          rows: [
            ['**Iamb**', 'da-DUM', 'to-DAY'],
            ['**Trochee**', 'DUM-da', 'GAR-den'],
            ['**Spondee**', 'DUM-DUM', 'true minds'],
          ],
        },
      ],
      lines: [
        { say: 'Scansion is marking the stressed and unstressed syllables in a line, to find its metre. A stressed syllable is a dum, and an unstressed one is a da.', show: 'def' },
        { say: 'An iamb is da dum, as in to-day. A trochee is dum da, as in gar-den. And a spondee is two stresses together, dum dum, as in true minds.', show: 't' },
        { say: 'To scan a line, read it aloud naturally, tap the beats, and count the feet.' },
      ],
    },
    {
      chapter: 'Scanning a line',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['Once upon a midnight dreary, while I pondered, weak and weary,'], by: 'Edgar Allan Poe, “The Raven”' },
        { kind: 'text', id: 'e', size: 'lg', md: '**ONCE** up-**ON** a **MID**-night **DREAR**-y, **WHILE** I **PON**-dered, **WEAK** and **WEAR**-y' },
        { kind: 'text', id: 'a', size: 'md', md: 'DUM-da, eight times: **trochaic**. The insistent beat feels haunting and chant-like.' },
      ],
      lines: [
        { say: 'Let’s scan the opening of Edgar Allan Poe’s The Raven.', show: 'q' },
        { say: 'Mark the stresses. ONCE up-ON a MID-night DREAR-y, WHILE I PON-dered, WEAK and WEAR-y.', show: 'e' },
        { say: 'The pattern is dum da, repeated eight times, so the line is trochaic. The insistent beat gives the poem its haunting, chant-like mood.', show: 'a' },
      ],
    },
    {
      chapter: 'Breaking the beat',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Breaking the beat', md: 'Sonnet 116 is mostly iambic pentameter, but it opens “**LET** me **NOT**”, landing on a stress straight away. The forceful start makes the speaker sound **firm and certain**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Read it naturally', md: 'Don’t force a pattern onto a line. Say it as you would in conversation, then listen. Real poems vary their metre, and the **variations** are often where the meaning lies.' },
      ],
      lines: [
        { say: 'Poets often break the beat on purpose, to make a word stand out. Shakespeare’s Sonnet one hundred and sixteen is mostly iambic pentameter, but it opens LET me NOT, landing on a stress straight away. So the speaker sounds firm and certain.', show: 'k' },
        { say: 'A common mistake is to force a pattern onto a line. Say it as you would in conversation, then listen for the stresses. Real poems vary their metre, and the variations are often where the meaning lies.', show: 'm' },
      ],
    },
    {
      chapter: 'Enjambment and caesura',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Enjambment and caesura', md: '**Enjambment** is when a sentence runs on from one line to the next without a pause. A **caesura** is a pause in the middle of a line, often marked by punctuation. A line that ends with punctuation is **end-stopped**.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Let me not to the marriage of true minds', 'Admit impediments.'], by: 'William Shakespeare, Sonnet 116' },
      ],
      lines: [
        { say: 'Enjambment is when a sentence runs on from one line to the next without a pause. A caesura is a pause in the middle of a line, often marked by punctuation. And a line that ends with punctuation is end-stopped.', show: 'def' },
        { say: 'In Sonnet one hundred and sixteen, the thought runs from true minds straight on to admit impediments. The enjambment pushes us into the next line, so the sense flows on.', show: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Owen writes: “Men marched asleep. Many had lost their boots / But limped on, blood-shod. All went lame; all blind;” What do the many caesuras do?',
          choices: [
            'They make the lines flow smoothly and quickly.',
            'They make the march sound cheerful.',
            'They turn the lines into a rhyming couplet.',
            'They break the rhythm into halting steps, like the stumbling soldiers.',
          ],
          answer: 3,
          working: '“All went lame; all blind;” is broken into tiny phrases. Each pause makes the reader stop and start again, mirroring the soldiers’ exhausted, stumbling march.',
        },
      ],
      lines: [
        { say: 'Your turn. Owen writes: men marched asleep. Many had lost their boots but limped on, blood-shod. All went lame, all blind. What do the many pauses, the caesuras, do? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. All went lame, all blind, is broken into tiny phrases. Each pause makes us stop and start again, like the soldiers’ exhausted, halting steps. Form mirrors meaning.', show: 'q2.answer' },
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
            '**Scansion** marks stresses: **iamb**, **trochee**, **spondee**.',
            'Poets break the regular beat to stress important words.',
            '**Enjambment** runs on; a **caesura** pauses; **end-stopped** lines feel complete.',
            'Ask how the rhythm matches the meaning.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Scansion marks the stresses to find the metre: iambs, trochees and spondees.', show: 'sum.0' },
        { say: 'Poets break the regular beat to stress important words.', show: 'sum.1' },
        { say: 'Enjambment runs on, a caesura pauses, and end-stopped lines feel complete and controlled.', show: 'sum.2' },
        { say: 'And always ask how the rhythm matches the meaning.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
