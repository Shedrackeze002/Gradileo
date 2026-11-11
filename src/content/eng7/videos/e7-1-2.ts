import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-1-2',
  lessonId: 'e7-1-2',
  title: 'Characterization',
  summary:
    'Characterization is how a writer reveals what a character is like. Direct characterization names a trait, indirect characterization shows it, and readers use five clues, speech, thoughts, effect on others, actions and looks, to infer it.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Characterization', subtitle: 'How writers reveal a character' }],
      lines: [
        { say: 'We get to know people by watching what they do and listening to what they say.', show: 'title' },
        { say: 'We get to know characters in stories in exactly the same way. In this video we look at the two ways writers reveal a character, and five clues you can use to read one.' },
      ],
    },
    {
      chapter: 'Direct and indirect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Characterization', md: '**Characterization** is how a writer reveals what a character is like. **Direct** characterization tells us a trait. **Indirect** characterization shows us, and we **infer** the trait.' },
        {
          kind: 'table',
          id: 't',
          head: ['Direct', 'Indirect'],
          rows: [['*Mia was the most generous person in the village.*', '*Mia gave her only coat to the shivering stranger and walked home in the snow.*']],
        },
      ],
      lines: [
        { say: 'Characterization is how a writer reveals what a character is like.', show: 'def' },
        { say: 'Direct characterization tells us a trait straight out. Mia was the most generous person in the village.', show: 't', focus: 't.0' },
        { say: 'Indirect characterization shows us instead. Mia gave her only coat to a shivering stranger and walked home in the snow. The word generous never appears, but we infer it.', focus: 't.0' },
        { say: 'Indirect characterization asks more of the reader, which is why it often feels more real. We are trusted to work the character out for ourselves, as we do with people we meet.', focus: 'def' },
      ],
    },
    {
      chapter: 'Five clues: STEAL',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Clue', 'Ask yourself'],
          rows: [
            ['**S**peech', 'What does the character say, and how?'],
            ['**T**houghts', 'What do they think or feel inside?'],
            ['**E**ffect on others', 'How do other characters react to them?'],
            ['**A**ctions', 'What does the character do?'],
            ['**L**ooks', 'What do they look like and wear?'],
          ],
        },
      ],
      lines: [
        { say: 'When a writer uses indirect characterization, look for five kinds of clue. Some readers remember them with the word steal.', show: 't' },
        { say: 'S is for speech: what the character says, and how. T is for thoughts: what they think or feel inside.', focus: ['t.0', 't.1'] },
        { say: 'E is for effect on others: how other characters react to them. A is for actions: what the character does.', focus: ['t.2', 't.3'] },
        { say: 'And L is for looks: what they look like, and what they choose to wear.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Reading the clues',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['“I don’t need anyone’s help,” Kofi said, lifting the heavy box alone.', 'On the way out, he saw an old man struggling with his shopping, and without a word he carried it to his car.'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Kofi is **proud** but **kind**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Do not stop at the first clue', md: 'A character may smile on the outside while their thoughts are full of worry. Check speech, thoughts and actions **together**.' },
      ],
      lines: [
        { say: 'Characters often have more than one trait, and the traits can pull against each other. Look at Kofi.', show: 'q.0' },
        { say: 'His speech, I don’t need anyone’s help, suggests pride.', focus: 'q.0' },
        { say: 'But his actions, helping a stranger without being asked, show kindness.', show: 'q.1', focus: 'q.1' },
        { say: 'So Kofi is proud but kind. The best answer fits all the clues, not just one.', show: 'a' },
        { say: 'This is the common mistake: stopping at the first clue. If you only read a character’s smile, you will miss the worry in their thoughts.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“When Dev walked into the room, the younger children went quiet and moved out of his way.” Which STEAL clue is the writer using?',
          choices: ['Speech', 'Looks', 'Thoughts', 'Effect on others'],
          answer: 3,
          working: 'We learn about Dev from how the other children react to him, so this is the effect he has on others.',
        },
      ],
      lines: [
        { say: 'Your turn. When Dev walks in, the younger children go quiet and move out of his way. Which clue is the writer using? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, effect on others. We learn about Dev from how the other children react to him.', show: 'q2.answer' },
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
            '**Characterization** is how a writer reveals a character.',
            '**Direct** names a trait; **indirect** shows it, and we infer.',
            'Five clues: **speech, thoughts, effect on others, actions, looks**.',
            'Choose the answer that fits every clue.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Characterization is how a writer reveals what a character is like.', show: 'sum.0' },
        { say: 'Direct characterization names a trait. Indirect characterization shows it, and we infer the trait.', show: 'sum.1' },
        { say: 'Look for five clues: speech, thoughts, effect on others, actions and looks.', show: 'sum.2' },
        { say: 'And because characters often have more than one trait, choose the answer that fits every clue.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
