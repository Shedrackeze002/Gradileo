import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-1-3',
  lessonId: 'e6-1-3',
  title: 'Point of View',
  summary:
    'Point of view is the position a narrator tells a story from: first person uses I and we, third person limited follows one character’s thoughts, and third person omniscient knows everyone’s. An unreliable narrator gives an account the reader should question.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Point of View', subtitle: 'Who tells the story, and what they know' }],
      lines: [
        { say: 'Every story is told by someone. The voice telling the story is the narrator.', show: 'title' },
        { say: 'In this lesson, you will learn the main points of view, and why the narrator’s position changes what the reader is allowed to know.' },
      ],
    },
    {
      chapter: 'First and third person',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Point of view', md: 'The **point of view** is the position the narrator tells the story from. In **first person**, the narrator is a character and uses *I*, *me* and *we*. In **third person**, the narrator is outside the story and uses *he*, *she* and *they*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Point of view', 'Example'],
          rows: [
            ['First person', '*I grabbed my bag and ran for the bus. My heart was pounding.*'],
            ['Third person limited', '*Amara grabbed her bag and ran for the bus. Her heart was pounding.*'],
            ['Third person omniscient', '*Amara ran for the bus, heart pounding. Inside, the driver sighed, wondering why children were always late.*'],
          ],
        },
      ],
      lines: [
        { say: 'The point of view is the position the narrator tells the story from.', show: 'def' },
        { say: 'In first person, the narrator is a character in the story, and uses I, me and we. I grabbed my bag and ran for the bus.', show: 't', focus: 't.0' },
        { say: 'In third person, the narrator is outside the story, and uses he, she and they for every character.', focus: 'def' },
        { say: 'In third person limited, the narrator tells us the thoughts and feelings of only one character. Here, we know only Amara’s heart is pounding.', focus: 't.1' },
        { say: 'In third person omniscient, the narrator knows the thoughts of many or all characters. Omniscient means all-knowing. Here, we also learn what the driver is wondering.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Naming the point of view',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The wolf licked his lips as he watched the cottage. Inside, Grandmother dozed in her chair, dreaming of her garden, and down the path, Red Riding Hood hummed a song, thinking only of the flowers.'] },
        { kind: 'text', id: 'ans', size: 'lg', md: '**Third person omniscient**' },
      ],
      lines: [
        { say: 'What is the point of view of this passage?', show: 'q' },
        { say: 'The narrator uses he and she, so it is third person.', focus: 'q' },
        { say: 'And we are told what three characters are thinking: the wolf, Grandmother, and Red Riding Hood. So it is third person omniscient.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'What a narrator can know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Watch for slips in point of view', md: 'A first-person narrator who says “Jo was secretly jealous of me” can only be **guessing**, unless Jo said so.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unreliable narrator', md: 'An **unreliable narrator** tells the story in a way that does not match the facts: *I never get angry. I only threw the plate because it slipped.*' },
      ],
      lines: [
        { say: 'A first-person narrator can tell us only what they see, hear, think and feel. They can guess what other people think, but they cannot know for certain. That is why many mysteries are told in first person: the reader finds the clues at the same time as the narrator.' },
        { say: 'So watch for slips. If a first-person narrator says Jo was secretly jealous of me, ask: how could the narrator know that? Unless Jo said so, it is only a guess.', show: 'm', focus: 'm' },
        { say: 'Sometimes a narrator cannot be trusted. An unreliable narrator tells the story in a way that does not match the facts, perhaps because they are proud, confused or hiding something.', show: 'def', focus: 'def' },
        { say: 'I never get angry, says this narrator. But in the same breath, they describe throwing a plate. Their words and actions do not match.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Amara stared at the test. She had studied all week, but now every answer seemed to slip away.” What is the point of view?',
          choices: ['First person', 'Third person limited', 'Third person omniscient', 'An unreliable narrator'],
          answer: 1,
          working: 'The narrator uses “she”, so it is third person, and we are told the thoughts of only one character, Amara.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the point of view of this passage? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, third person limited. The narrator uses she, so it is third person, and we are told the thoughts of only one character, Amara.', show: 'q2.answer' },
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
            '**First person** uses *I* and *we*; the narrator is a character.',
            '**Third person limited** follows one character’s thoughts; **omniscient** knows everyone’s.',
            'A first-person narrator knows only their own experience.',
            'An **unreliable narrator** gives an account the reader should question.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First person uses I and we, and the narrator is a character.', show: 'sum.0' },
        { say: 'Third person limited follows one character’s thoughts, and third person omniscient knows everyone’s.', show: 'sum.1' },
        { say: 'A first-person narrator knows only their own experience.', show: 'sum.2' },
        { say: 'And an unreliable narrator gives an account that the reader should question.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
