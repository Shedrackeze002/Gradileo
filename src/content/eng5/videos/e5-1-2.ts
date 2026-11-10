import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-1-2',
  lessonId: 'e5-1-2',
  title: 'Characters: Traits and Feelings',
  thumbnailTitle: 'Character Traits and Feelings',
  summary:
    'A character trait is what a character is like inside, and a feeling is how they feel at one moment. We infer both from what characters do, say and think, and we compare the beginning and end of a story to see how a character changes.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Characters', subtitle: 'Traits, feelings and change' }],
      lines: [
        { say: 'Think of a friend. You could describe what they look like, but what makes them who they are is what they are like inside: funny, kind, brave or stubborn.', show: 'title' },
        { say: 'Characters in stories are the same. In this lesson, you will learn to work out what a character is like, and how they feel, even when the writer does not say it.' },
      ],
    },
    {
      chapter: 'Character traits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Character trait', md: 'A **character trait** describes what a character is like on the inside: *honest*, *patient*, *brave*, *selfish*, *curious*. A trait stays fairly steady through a story.' },
        { kind: 'bullets', id: 'b', items: ['What the character **does**', 'What the character **says**', 'What the character **thinks**', 'How **others** react to them'] },
      ],
      lines: [
        { say: 'A character trait is a word that describes what a character is like on the inside, such as honest, patient, brave, selfish or curious. A trait stays fairly steady through a story.', show: 'def' },
        { say: 'Writers rarely tell us a trait. They show it, through what a character does, says and thinks, and how other characters react to them.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'So you, the reader, have to infer. To infer means to put the clues together with what you already know.' },
      ],
    },
    {
      chapter: 'Inferring a trait',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Liam found a ten-dollar note on the floor of the shop.', 'He carried it straight to the counter and said, “Someone must have dropped this.”'] },
        { kind: 'text', id: 'ans', size: 'lg', md: 'Liam is **honest**.' },
      ],
      lines: [
        { say: 'Which word best describes Liam?', show: ['q.0', 'q.1'] },
        { say: 'First, what does Liam do? He hands in money that he could have kept.', focus: 'q.1' },
        { say: 'Then ask, what kind of person does that? Someone who tells the truth and does the right thing. So Liam is honest. The evidence is what he does, in the story’s own words.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Feelings',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The character…', 'The feeling might be…'],
          rows: [
            ['jumps up and down, grins', 'excited'],
            ['stomps, slams a door', 'angry'],
            ['holds the straps of a backpack tightly', 'nervous'],
            ['lets out a long breath and laughs', 'relieved'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A trait is not a feeling', md: '*Nervous before a test* is a feeling: it passes. *Shy* is a trait: it is how the character usually is.' },
      ],
      lines: [
        { say: 'A feeling is how a character feels at one moment: excited, nervous, relieved or jealous. Unlike a trait, a feeling can change from one page to the next.' },
        { say: 'Actions show feelings. A character who jumps up and down and grins is probably excited. One who stomps and slams a door is angry.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Holding the straps of a backpack tightly shows nerves, and a long breath and a laugh show relief.', focus: ['t.2', 't.3'] },
        { say: 'Here is a common mistake. Nervous before a test is a feeling, because it passes. Shy is a trait, because it is how the character usually is. When a question asks what a character is like, give a trait. When it asks how a character feels, give a feeling.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Characters change',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'lg', md: '**Beginning:** How does the character act?\n\n**End:** How do they act now?' }],
      lines: [
        { say: 'In many stories, the main character changes. A nervous speaker becomes confident, or a selfish character learns to share.', show: 't' },
        { say: 'To see the change, compare how the character acts at the beginning with how they act at the end.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Ana let her little brother go first on the swing, even though she had waited a long time.” Which trait does Ana show?',
          choices: ['Nervous', 'Excited', 'Selfish', 'Patient and kind'],
          answer: 3,
          working: 'She waits and lets her brother go first, so she is patient and kind. Nervous and excited are feelings, and selfish is the opposite of what she does.',
        },
      ],
      lines: [
        { say: 'Your turn. Read about Ana, and choose the trait she shows. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Ana waits and lets her brother go first, so she is patient and kind. Nervous and excited are feelings, not traits, and selfish is the opposite of what she does.', show: 'q2.answer' },
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
            'A **trait** is what a character is like; a **feeling** is how they feel now.',
            'Infer them from what characters **do**, **say** and **think**.',
            'Support your answer with **evidence** from the story.',
            'Compare the beginning and the end to see how a character **changes**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A trait is what a character is like, and a feeling is how they feel at one moment.', show: 'sum.0' },
        { say: 'Infer traits and feelings from what characters do, say and think.', show: 'sum.1' },
        { say: 'Support your answer with evidence: the words in the story that show it.', show: 'sum.2' },
        { say: 'And compare the beginning with the end to see how a character changes.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
