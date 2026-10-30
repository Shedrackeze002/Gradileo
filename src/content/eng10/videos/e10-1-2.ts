import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-1-2',
  lessonId: 'e10-1-2',
  title: 'Character',
  summary:
    'Writers reveal characters directly or indirectly, using speech, thoughts, effect on others, actions and looks. Characters can be protagonists, antagonists or foils, round or flat, dynamic or static, and a good inference rests on evidence.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Character', subtitle: 'How writers show who someone is' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet.'], by: 'O. Henry, “The Gift of the Magi”' },
      ],
      lines: [
        { say: 'In “The Gift of the Magi”, a young wife named Della has decided to sell her long hair to buy her husband a present. O. Henry never writes that Della was torn.', show: 'title' },
        { say: 'He shows us a tear splashing on the worn red carpet. The pause, the hurry and the tears tell us more than any label could. In this lesson, you will learn how writers build characters.', show: 'q' },
      ],
    },
    {
      chapter: 'Direct and indirect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Characterization', md: '**Direct**: the writer states a trait outright. **Indirect**: the writer shows the character through details, and you work out the trait.' },
        {
          kind: 'table',
          id: 't',
          head: ['Letter', 'Method'],
          rows: [['S', 'Speech'], ['T', 'Thoughts'], ['E', 'Effect on others'], ['A', 'Actions'], ['L', 'Looks']],
        },
      ],
      lines: [
        { say: 'Characterization is the way a writer reveals what a character is like.', show: 'def' },
        { say: 'In direct characterization, the narrator states a trait outright. In indirect characterization, the writer shows the character through details, and the reader works out the trait.', focus: 'def' },
        { say: 'Most characterization is indirect, and the word STEAL helps you remember the five methods.', show: 't' },
        { say: 'Speech, thoughts, effect on others, actions and looks. When Della says “Give it to me quick”, that is speech, and it shows a woman who acts the moment she has made up her mind.', focus: 't' },
      ],
    },
    {
      chapter: 'Kinds of character',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Protagonist**: the main character. **Antagonist**: works against them.',
            '**Foil**: a contrast that makes the protagonist stand out.',
            '**Round** or **flat**: many traits, or only one or two.',
            '**Dynamic** or **static**: changes in the story, or stays the same.',
          ],
        },
      ],
      lines: [
        { say: 'The protagonist is the main character, and the antagonist works against that character. A foil has contrasting traits that make the protagonist stand out.', show: ['b.0', 'b.1'] },
        { say: 'A round character is complex, with many traits. A flat character has only one or two.', show: 'b.2', focus: 'b.2' },
        { say: 'A dynamic character changes in an important way during the story. A static character stays the same.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Static or dynamic?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['She breathed a quick prayer that life might be long.', 'It was only yesterday she had thought with a shudder that life might be long.'], by: 'Kate Chopin, “The Story of an Hour”' },
        { kind: 'text', id: 'ans', size: 'md', md: 'Her feeling about her own life has turned around, so Mrs. Mallard is **dynamic**.' },
      ],
      lines: [
        { say: 'In “The Story of an Hour”, Louise Mallard has just learned that her husband is dead. Is she static or dynamic?', show: 'q.0' },
        { say: 'Yesterday, the thought of a long life made her shudder. Now she prays for one.', show: 'q.1', focus: 'q' },
        { say: 'Her whole feeling about her own life has turned around within an hour, so she is a dynamic character.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A trait word is not always direct', md: 'O. Henry writes that Jim “looked thin and very serious”. That describes how Jim **looks**, and we infer that he is poor and burdened. If you must work out the trait, it is indirect.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A word that describes someone is not always direct characterization.', show: 'm' },
        { say: 'When O. Henry writes that Jim looked thin and very serious, he is describing how Jim looks, and we infer the rest. If you have to work out the trait yourself, it is indirect.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A story is about a character named Ana. Which sentence is an example of indirect characterization?',
          choices: [
            'The narrator tells us that Ana is a generous person.',
            'Another character says that Ana is a generous person.',
            'The story begins by calling Ana a generous person.',
            'Ana gave the last of the bread to a stranger.',
          ],
          answer: 3,
          working: 'Choices A, B and C all state the trait outright. In Choice D the reader works out the trait from what Ana does.',
        },
      ],
      lines: [
        { say: 'Your turn. A story is about a character named Ana. Which sentence is an example of indirect characterization? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Choices A, B and C all state the trait outright. In Choice D, we work out the trait from what Ana does.', show: 'q2.answer' },
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
            'Direct characterization states a trait; indirect shows it through STEAL.',
            'Protagonist, antagonist and foil; round or flat; dynamic or static.',
            'Support every inference with a detail from the text.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Direct characterization states a trait, and indirect characterization shows it through speech, thoughts, effect on others, actions and looks.', show: 'sum.0' },
        { say: 'Characters can be protagonists, antagonists or foils, round or flat, dynamic or static.', show: 'sum.1' },
        { say: 'And a good inference always rests on a detail from the text.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
