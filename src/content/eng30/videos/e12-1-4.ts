import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-1-4',
  lessonId: 'e12-1-4',
  title: 'Ambiguity and Endings',
  summary:
    'Deliberate ambiguity gives real evidence for more than one reading, and a strong reading accounts for all of it. Endings can be closed, open, ironic or epiphanic, and one ending can be more than one kind.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Ambiguity and Endings', subtitle: 'When a story leaves the question open' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['And it seemed as though in a little while the solution would be found, and then a new and splendid life would begin; and it was clear to both of them that they had still a long, long road before them, and that the most complicated and difficult part of it was only just beginning.'],
          by: 'Anton Chekhov, “The Lady with the Dog”',
        },
      ],
      lines: [
        { say: 'Anton Chekhov’s “The Lady with the Dog” follows two lovers, each married to someone else. It does not end with a wedding, a parting or a scandal.', show: 'title' },
        { say: 'The solution only seemed near, and the hardest part is only just beginning. Chekhov leaves the lovers, and the reader, on the road. In this lesson, you will analyse deliberate ambiguity, and the different kinds of ending.', show: 'q' },
      ],
    },
    {
      chapter: 'Deliberate ambiguity',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Generous tears filled Gabriel’s eyes. He had never felt like that himself towards any woman but he knew that such a feeling must be love.'],
          by: 'James Joyce, “The Dead”',
        },
        {
          kind: 'quote',
          id: 'r',
          size: 'md',
          lines: ['His own identity was fading out into a grey impalpable world: the solid world itself which these dead had one time reared and lived in was dissolving and dwindling.'],
          by: 'James Joyce, “The Dead”',
        },
      ],
      lines: [
        { say: 'A story is ambiguous when it supports more than one reading and does not settle which is right. Deliberate ambiguity is a choice. The writer gives real evidence on both sides.' },
        { say: 'At the end of “The Dead”, Gabriel lies awake beside Gretta. In one moment, generous tears fill his eyes, and he knows that such a feeling must be love.', show: 'q', focus: 'q' },
        { say: 'In the next, his own identity is fading into a grey world of the dead. Is the ending hopeful or bleak? Joyce gives evidence for both.', show: 'r', focus: 'r' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Choosing a side** and ignoring the rest of the evidence',
            '**A free-for-all**: “Gabriel plans to leave Gretta” has no support in the text',
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Gabriel grows more generous *even as* his old sense of himself dissolves.' },
      ],
      lines: [
        { say: 'Here are two common mistakes. The first is choosing a side and ignoring the rest. Saying the ending is hopeful because of the generous tears leaves out the fading identity.', show: 'b.0', focus: 'b.0' },
        { say: 'The second treats ambiguity as a free-for-all. It does not mean any reading will do. Nothing in the text suggests Gabriel plans to leave Gretta.', show: 'b.1', focus: 'b.1' },
        { say: 'Words such as yet, while and even as let one sentence carry both readings.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'How stories end',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Closed**: settles the conflict and makes its meaning clear',
            '**Open**: leaves the conflict for the reader to imagine',
            '**Ironic**: reverses what was expected',
            '**Epiphanic**: a sudden moment of seeing a truth',
          ],
        },
      ],
      lines: [
        { say: 'There are four common kinds of ending. A closed ending settles the main conflict and makes its meaning clear, as in “The Wife of His Youth”, where Mr. Ryder presents the old woman as his wife.', show: 'b.0', focus: 'b.0' },
        { say: 'An open ending leaves the conflict unresolved. Melville never tells us why Bartleby would prefer not to.', show: 'b.1', focus: 'b.1' },
        { say: 'An ironic ending reverses what was expected. An epiphanic ending turns on a sudden moment of seeing a truth. One ending can be more than one kind. At May Bartram’s grave, Marcher has an epiphany, and it is also a bitter irony.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Waythorn, who wanted his wife’s past kept away, “took the third cup with a laugh”. What kind of ending is this?',
          choices: [
            'Closed, because it settles his unease and makes the meaning plain.',
            'Ironic, because it reverses what he wanted and he accepts it.',
            'Open, because it leaves his future for the reader to imagine.',
            'Epiphanic, because he suddenly sees a truth he had missed.',
          ],
          answer: 1,
          working: 'The man who wanted his wife’s past at a distance ends up as the third of her husbands, drinking tea with the other two. The outcome reverses his wish, so the ending is ironic.',
        },
      ],
      lines: [
        { say: 'Your turn. Waythorn wanted his wife’s past kept at a distance. In the last scene, he took the third cup with a laugh. What kind of ending is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. The man who wanted his wife’s past at a distance ends up as the third of her husbands, drinking tea with the other two. The outcome reverses his wish, so the ending is ironic.', show: 'q2.answer' },
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
            'Deliberate ambiguity gives real evidence for more than one reading.',
            'Endings can be closed, open, ironic or epiphanic, or more than one.',
            'Ask what an ending settles, what it leaves open, and how it changes the story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Deliberate ambiguity gives real evidence for more than one reading, and a strong reading accounts for all of it.', show: 'sum.0' },
        { say: 'Endings can be closed, open, ironic or epiphanic, and one ending can be more than one.', show: 'sum.1' },
        { say: 'Always ask what an ending settles, what it leaves open, and how it changes the meaning of everything before it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
