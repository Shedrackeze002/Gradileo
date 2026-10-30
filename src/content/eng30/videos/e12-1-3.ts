import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-1-3',
  lessonId: 'e12-1-3',
  title: 'Critical Lenses and Evidence',
  summary:
    'A critical lens is a set of questions that brings some features of a text into focus: historical, feminist, psychological, economic and reader-response lenses. A strong reading names its lens and proves its claim with the quotation that shows exactly what it says.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Critical Lenses and Evidence', subtitle: 'Different questions, different readings' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['All who know me, consider me an eminently safe man.'],
          by: 'Herman Melville, “Bartleby, the Scrivener”',
        },
      ],
      lines: [
        { say: 'This is how the lawyer who narrates Melville’s “Bartleby, the Scrivener” introduces himself.', show: ['title', 'q'] },
        { say: 'One reader hears a man who fears risk. Another hears a businessman whose world is measured in money. A third notices how the line changes on a second reading. Each is using a different critical lens. In this lesson, you will recognize five lenses, and choose the evidence that supports a reading.' },
      ],
    },
    {
      chapter: 'Five lenses',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Historical**: how the events and beliefs of the time shape the story',
            '**Feminist**: the roles, power and voices of women and men',
            '**Psychological**: hidden fears, desires and defences',
            '**Economic (class)**: how money, work and class shape lives',
            '**Reader-response**: how readers make meaning as they read',
          ],
        },
      ],
      lines: [
        { say: 'A historical lens asks how the events and beliefs of the time shape the story. A feminist lens asks about the roles, power and voices of women and men.', show: ['b.0', 'b.1'] },
        { say: 'A psychological lens asks what hidden fears and desires drive the characters. An economic lens asks how money, work and class shape their lives.', show: ['b.2', 'b.3'] },
        { say: 'And a reader-response lens asks how readers make meaning as they read. A lens is not a verdict. It is a way of asking questions, and the same story can support several readings.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Evidence for a reading',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The escape would have been to love her; then, *then* he would have lived.'],
          by: 'Henry James, “The Beast in the Jungle”',
        },
        { kind: 'text', id: 't', size: 'md', md: 'A **psychological** reading: the waiting that filled his life kept him from love.' },
      ],
      lines: [
        { say: 'A reading is only as strong as the quotation that supports it. At May Bartram’s grave, John Marcher finally understands something.', show: 'q' },
        { say: 'For a psychological reading, this is strong evidence. The waiting that filled his life was what kept him from love.', show: 't', focus: 't' },
        { say: 'A paragraph of analysis moves in four steps. Name the lens, state the claim, quote the evidence, and explain exactly how the words support the claim. The explanation is where the marks are.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A quotation that is only nearby', md: 'A line can come from the right scene and still not prove the claim. Choose the words that show **what your claim says**.' },
        { kind: 'text', id: 't', size: 'md', md: 'To show that Mr. Pontellier treats Edna as property, use the line where he looks at her “as one looks at a valuable piece of personal property which has suffered some damage”.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A quotation can come from the right scene and still not prove your claim.', show: 'm' },
        { say: 'Suppose you claim that a husband treats his wife as property. A line about the sea in The Awakening comes from the right book, but the wrong point.', focus: 'm' },
        { say: 'The line you need is the one where Mr. Pontellier looks at Edna as one looks at a valuable piece of personal property that has suffered some damage.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The lawyer loves the sound of John Jacob Astor’s name, which “rings like unto bullion”. Which lens does this support?',
          choices: [
            'Feminist, because it shows how the roles of women and men are fixed.',
            'Psychological, because it shows a hidden fear of loving another person.',
            'Historical, because it shows the beliefs of upper-class London in 1900.',
            'Economic, because it shows how deeply money shapes his sense of himself.',
          ],
          answer: 3,
          working: 'His pleasure in a millionaire’s name, which rings like gold, shows how money shapes his self-image. That is an economic lens.',
        },
      ],
      lines: [
        { say: 'Your turn. The lawyer loves the sound of John Jacob Astor’s name, which rings like unto bullion. Which lens does this support? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. His pleasure in a millionaire’s name, which rings like gold, shows how money shapes his self-image. That is an economic lens.', show: 'q2.answer' },
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
            'A critical lens is a set of questions; name the lens you use.',
            'Choose the quotation that shows exactly what your claim says.',
            'Explain how the words support the claim, then test it against the whole story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A critical lens is a set of questions, and one story can support several readings, so name the lens you are using.', show: 'sum.0' },
        { say: 'Choose the quotation that shows exactly what your claim says.', show: 'sum.1' },
        { say: 'Then explain how the words support it, and test your reading against the whole story.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
