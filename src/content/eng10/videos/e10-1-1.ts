import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-1-1',
  lessonId: 'e10-1-1',
  title: 'Plot and Conflict',
  summary:
    'A plot moves through five stages, from exposition to resolution, and is driven by conflict, either external or internal. Writers also play with time through foreshadowing, flashback and suspense.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Plot and Conflict', subtitle: 'How a story moves' }],
      lines: [
        { say: 'On a stormy night, readers of “The Monkey’s Paw” met the White family by their fire. The blinds were drawn, and the fire burned brightly.', show: 'title' },
        { say: 'Before the evening is over, a visitor has left a dried paw that grants three wishes, and the story begins to move. In this lesson, you will learn how a plot works.' },
      ],
    },
    {
      chapter: 'The five stages of a plot',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Exposition**: the characters, setting and situation',
            '**Rising action**: complications build the tension',
            '**Climax**: the turning point that decides the outcome',
            '**Falling action**: the tension eases',
            '**Resolution**: how things stand at the end',
          ],
        },
      ],
      lines: [
        { say: 'A plot is the sequence of events in a story, arranged so that each one leads to the next. Most short stories follow five stages.' },
        { say: 'First comes the exposition, which introduces the characters, the setting and the situation.', show: 'b.0', focus: 'b.0' },
        { say: 'Then the rising action piles up complications and raises the tension.', show: 'b.1', focus: 'b.1' },
        { say: 'The climax is the turning point, the moment when the main conflict comes to a head and the outcome is decided.', show: 'b.2', focus: 'b.2' },
        { say: 'The falling action follows straight on, as the tension eases. Last, the resolution shows how things stand at the end.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Finding the climax',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ex',
          items: [
            'A knock sounds at the door, and Mrs. White struggles with the bolt.',
            'Mr. White finds the paw and makes his third wish as the bolt slides back: the **climax**.',
            'The knocking stops: the falling action.',
            'The road outside is empty: the resolution.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s find a climax in “The Monkey’s Paw”. After the first wish, the Whites receive two hundred pounds. Ten days later, Mrs. White makes her husband wish their son alive again.' },
        { say: 'That night, a knock sounds at the door. Mrs. White struggles with the bolt.', show: 'ex.0', focus: 'ex.0' },
        { say: 'The bolt comes back at the very moment Mr. White finds the paw and makes his third wish. Nothing will be the same after that, so this is the climax.', show: 'ex.1', focus: 'ex.1' },
        { say: 'Afterward the knocking stops, which is the falling action, and the empty road is the resolution.', show: ['ex.2', 'ex.3'], focus: ['ex.2', 'ex.3'] },
      ],
    },
    {
      chapter: 'Conflict',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of conflict', 'The character struggles against'],
          rows: [
            ['External', 'another person, nature or society'],
            ['Internal', 'a fear, a doubt or a hard choice'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ask “against what?”', md: 'Finish the sentence: “The character struggles against …”' },
      ],
      lines: [
        { say: 'A plot moves because a character wants something and something stands in the way. That struggle is the conflict.' },
        { say: 'An external conflict is a struggle against an outside force: another person, nature or society.', show: 't.0', focus: 't.0' },
        { say: 'An internal conflict happens inside a character’s mind, such as a fear, a doubt or a hard choice.', show: 't.1', focus: 't.1' },
        { say: 'To name a conflict, finish the sentence: the character struggles against what? In “To Build a Fire”, a man fights the deadly cold, but his real weakness is inside him.', show: 'tip', focus: 'tip' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'The climax is not simply the most exciting event',
          md: 'A story can have several exciting moments. The climax is the one that **decides** the outcome. It usually comes near the end, not in the middle.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Students often pick the most exciting event as the climax.', show: 'm' },
        { say: 'The climax is the one moment that decides the outcome.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a short story, which of these describes the climax?',
          choices: [
            'The most exciting or frightening event in the story',
            'The moment that decides the outcome of the main conflict',
            'The first event that introduces the characters and setting',
            'The final scene, where the loose ends are tied up',
          ],
          answer: 1,
          working: 'The climax is the turning point: the moment the main conflict comes to a head and the outcome is decided. Choice D describes the resolution.',
        },
      ],
      lines: [
        { say: 'Your turn. In a short story, which of these describes the climax? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The climax is the moment that decides the outcome of the main conflict.', show: 'q.answer' },
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
            'A plot has five stages: exposition, rising action, climax, falling action and resolution.',
            'Conflict drives the plot, and it is either external or internal.',
            'Foreshadowing, flashback and suspense let writers play with time.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A plot has five stages, and the climax is the turning point that decides the outcome.', show: 'sum.0' },
        { say: 'Conflict drives the plot. It can be external, against a person, nature or society, or internal, inside a character’s mind.', show: 'sum.1' },
        { say: 'Writers also play with time, with hints of what is coming, jumps into the past, and suspense that makes you wait.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
