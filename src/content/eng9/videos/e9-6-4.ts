import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-6-4',
  lessonId: 'e9-6-4',
  title: 'Punctuation for Effect',
  summary:
    'Writers choose punctuation to change the pace and voice of a sentence. A dash emphasises, brackets play down, an ellipsis leaves words out or trails off, and a hyphen joins words: dashes raise the volume, brackets lower it. Close a pair with the same mark, and explain how each choice changes pace, emphasis or voice.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Punctuation for Effect', subtitle: 'Dashes, brackets and ellipses' }],
      lines: [
        { say: 'Punctuation is not only about being correct. Writers choose their marks to change the pace and the voice of a sentence.', show: 'title' },
        { say: 'In this video we use dashes, brackets and ellipses correctly, and explain their effect.' },
      ],
    },
    {
      chapter: 'Punctuation for effect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Punctuation for effect', md: '**Punctuation for effect** means choosing a mark not just because it is correct, but for how it changes a sentence’s **pace**, **emphasis** or **voice**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Mark', 'Use', 'Example'],
          rows: [
            ['**Dash** —', 'a sharp pause before a surprising point', 'Only one thing was missing—the guest of honour.'],
            ['**Brackets** ( )', 'extra information, said quietly', 'The concert (if you can call it that) lasted two hours.'],
            ['**Ellipsis** …', 'words left out, or a trailing pause', 'I thought I heard… no, it was nothing.'],
            ['**Hyphen** -', 'joins words, with no spaces', 'a well-known writer'],
          ],
        },
      ],
      lines: [
        { say: 'Punctuation for effect means choosing a mark not just because it is correct, but for how it changes a sentence’s pace, emphasis or voice.', show: 'def' },
        { say: 'A dash makes a sharp pause before an added or surprising point: there was only one thing missing from the party, dash, the guest of honour.', show: 't', focus: 't.0' },
        { say: 'Brackets wrap extra information more quietly: the concert, if you can call it that, lasted two hours.', focus: 't.1' },
        { say: 'An ellipsis shows words left out of a quotation, or a trailing pause. And a hyphen is short, with no spaces, and joins words, as in a well-known writer.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Dashes or brackets?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'lg', md: 'My aunt (who hates flying) flew to Lagos.' },
        { kind: 'text', id: 'b', size: 'lg', md: 'My aunt—who hates flying—flew to Lagos.' },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Remember', md: '**Dashes raise the volume; brackets lower it.**' },
      ],
      lines: [
        { say: 'Here is the same extra detail, who hates flying, two ways. With brackets, it sounds like a quiet aside.', show: 'a' },
        { say: 'With a pair of dashes, the detail jumps out.', show: 'b' },
        { say: 'Both are correct. A useful way to remember the difference: dashes raise the volume, and brackets lower it. So choose dashes if the detail is the surprising point, and brackets if it is a side note.', show: 'k' },
      ],
    },
    {
      chapter: 'Close the pair',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Close the pair', md: 'If you open a pair of dashes or brackets, close it with the **same mark**. *My aunt—who hates flying, flew to Lagos* starts with a dash and ends with a comma.' },
      ],
      lines: [
        { say: 'A common mistake is to open a pair with one mark, and close it with another.', show: 'm' },
        { say: 'My aunt, dash, who hates flying, comma, flew to Lagos starts with a dash and ends with a comma. If you open with a dash or a bracket, close with the same mark.', focus: 'm' },
      ],
    },
    {
      chapter: 'Reading the effect',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Choice', 'Effect'],
          rows: [
            ['I thought I heard… no.', 'hesitation, or building suspense'],
            ['The concert (if you can call it that)…', 'a sly, ironic aside'],
            ['Run! Now! They’re coming!', 'frantic and urgent'],
            ['many semicolons in a calm description', 'a measured, balanced rhythm'],
          ],
        },
      ],
      lines: [
        { say: 'Punctuation shapes rhythm, and rhythm shapes mood. An ellipsis, as in I thought I heard, no, shows hesitation, or builds suspense.', show: 't', focus: 't.0' },
        { say: 'Brackets can carry a sly, ironic aside.', focus: 't.1' },
        { say: 'Repeated exclamation marks sound frantic and urgent. And many semicolons in a calm description give a measured, balanced rhythm that suits the mood.', focus: ['t.2', 't.3'] },
        { say: 'So when you analyse a text, ask how a mark changes the pause, or the voice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why might a writer choose “He opened the box—empty.” rather than “He opened the box, which was empty.”?',
          choices: [
            'Because a dash is always more correct than a comma',
            'To make the sentence quieter and calmer',
            'Because brackets cannot be used in stories',
            'The dash makes a sharper pause, so the reveal hits harder.',
          ],
          answer: 3,
          working: 'The dash creates a sharp pause before the single word “empty”, so the surprise lands with more force than it would in a smooth clause.',
        },
      ],
      lines: [
        { say: 'Your turn. Why might a writer choose: he opened the box, dash, empty, rather than: he opened the box, which was empty? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The dash creates a sharp pause before the single word empty, so the reveal hits harder than it would in a smooth clause.', show: 'q2.answer' },
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
            'A **dash** emphasises; **brackets** play down.',
            'An **ellipsis** leaves words out or trails off; a **hyphen** joins words.',
            'Close a pair of dashes or brackets with the same mark.',
            'Explain how a mark changes pace, emphasis or voice.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dash emphasises, and brackets play down.', show: 'sum.0' },
        { say: 'An ellipsis leaves words out or trails off, and a hyphen joins words.', show: 'sum.1' },
        { say: 'Close a pair of dashes or brackets with the same mark.', show: 'sum.2' },
        { say: 'And always explain how a punctuation choice changes the pace, emphasis or voice.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
