import type { DiagramEl, Explainer } from '@/video/script.ts';

/** The plot as a mountain: tension rises to the climax and falls to the resolution. */
const mountain: DiagramEl = {
  kind: 'diagram',
  id: 'd',
  height: 470,
  points: { o: [0, 0], xe: [10.6, 0], ye: [0, 7], p0: [0, 1], p1: [2, 1.2], p2: [4, 3], p3: [6, 4.6], p4: [7, 6], p5: [8.5, 3], p6: [10, 2], t: [5, 7.2] },
  items: [
    { kind: 'line', id: 'xa', from: 'o', to: 'xe', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'ya', from: 'o', to: 'ye', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'label', id: 'tension', at: 'ye', tex: '\\text{Tension}', tone: 'muted', place: 'right', group: 'axes' },
    { kind: 'line', id: 's1', from: 'p0', to: 'p1', tone: 'brand', weight: 4, group: 'expo' },
    { kind: 'label', id: 'l1', at: 'p1', tex: '\\text{Exposition}', place: 'below', dot: true, group: 'expo' },
    { kind: 'curve', id: 's2', points: ['p1', 'p2', 'p3', 'p4'], tone: 'brand', weight: 4, group: 'rising' },
    { kind: 'label', id: 'l2', at: 'p2', tex: '\\text{Rising action}', place: 'right', dot: true, group: 'rising' },
    { kind: 'label', id: 'l3', at: 'p4', tex: '\\text{Climax}', tone: 'opp', place: 'above', dot: true, group: 'climax' },
    { kind: 'line', id: 's4', from: 'p4', to: 'p5', tone: 'brand', weight: 4, group: 'falling' },
    { kind: 'label', id: 'l4', at: 'p5', tex: '\\text{Falling action}', place: 'right', dot: true, group: 'falling' },
    { kind: 'line', id: 's5', from: 'p5', to: 'p6', tone: 'brand', weight: 4, group: 'resolution' },
    { kind: 'label', id: 'l5', at: 'p6', tex: '\\text{Resolution}', place: 'below', dot: true, group: 'resolution' },
  ],
};

const video: Explainer = {
  id: 'e6-1-1',
  lessonId: 'e6-1-1',
  title: 'Plot and Conflict',
  summary:
    'A plot has five stages: exposition, rising action, climax, falling action and resolution. At its heart is a conflict, a struggle against another character, nature, society or oneself.',
  thumbnail: 'd',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Stories', title: 'Plot and Conflict', subtitle: 'The shape of a story' }],
      lines: [
        { say: 'Most stories follow a shape. They begin quietly, build up tension, reach a turning point, and then wind down to an ending.', show: 'title' },
        { say: 'In this lesson, you will learn the five stages of a plot, and the four kinds of conflict at its heart.' },
      ],
    },
    {
      chapter: 'The five stages of a plot',
      layout: 'center',
      main: [
        { kind: 'text', id: 'def', size: 'md', md: 'The **plot** is the sequence of events in a story, in five stages.' },
        mountain,
      ],
      lines: [
        { say: 'The plot is the sequence of events in a story. Many readers picture it as a mountain.', show: ['def', 'd.axes'] },
        { say: 'The exposition is the beginning. It introduces the characters, the setting and the situation.', show: 'd.expo', focus: 'd.expo' },
        { say: 'The rising action is a set of events that build tension, as the problem grows.', show: 'd.rising', focus: 'd.rising' },
        { say: 'The climax is the turning point, the moment of greatest tension, when the main problem is faced.', show: 'd.climax', focus: 'd.climax' },
        { say: 'The falling action is the events just after the climax, as loose ends are tied up.', show: 'd.falling', focus: 'd.falling' },
        { say: 'And the resolution is the ending. It shows how things are, once the problem is over.', show: 'd.resolution', focus: 'd.resolution' },
      ],
    },
    {
      chapter: 'Placing an event',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['At last Mira reached the top of the cliff, grabbed the rope with both hands and pulled the lost climber to safety as the rock gave way beneath them.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'The climax is not always the end', md: 'The climax usually comes near the end, but after it come the **falling action** and the **resolution**.' },
      ],
      lines: [
        { say: 'Which stage of the plot is this?', show: 'q' },
        { say: 'The whole story has built towards the rescue, and the danger is at its greatest. This is the moment when the main problem is faced, so it is the climax.', focus: 'q' },
        { say: 'Here is a common mistake. The climax usually comes near the end, but it is not the last part. After it come the falling action and the resolution, where we see what happens because of the climax.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Kinds of conflict',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conflict', md: 'A **conflict** is a struggle between opposing forces. Without one there is no story.' },
        {
          kind: 'table',
          id: 't',
          head: ['Conflict', 'Example'],
          rows: [
            ['Character against **character**', 'two friends competing to be captain'],
            ['Character against **nature**', 'a sailor caught in a storm'],
            ['Character against **self**', 'a boy deciding whether to tell the truth'],
            ['Character against **society**', 'a girl who wants to be a knight in a kingdom that says girls cannot'],
          ],
        },
      ],
      lines: [
        { say: 'A conflict is a struggle between opposing forces. Without one, there is no story, because nothing would need to happen.', show: 'def' },
        { say: 'In character against character, the struggle is with another person or creature, like two friends competing to be captain.', show: 't', focus: 't.0' },
        { say: 'In character against nature, it is with the weather, animals, the land or the sea, like a sailor caught in a storm.', focus: 't.1' },
        { say: 'In character against self, the character struggles with their own fears, doubts or choices.', focus: 't.2' },
        { say: 'And in character against society, the struggle is with the rules, laws or beliefs of a group.', focus: 't.3' },
        { say: 'Character against self is an internal conflict, because it happens inside the character’s mind. The other three are external, because the struggle is with something outside the character.', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Everyone in the kingdom believed that girls could not be knights. Ana practised with a sword every night, determined to prove them wrong.” What kind of conflict is this?',
          choices: ['Character against character', 'Character against nature', 'Character against self', 'Character against society'],
          answer: 3,
          working: 'Ana is not fighting one person or the weather, and she does not doubt herself. She is pushing against what the whole community believes.',
        },
      ],
      lines: [
        { say: 'Your turn. What kind of conflict does Ana face? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, character against society. Ana is not fighting one person or the weather, and she does not doubt herself. She is pushing against what the whole community believes.', show: 'q2.answer' },
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
            'Five stages: **exposition**, **rising action**, **climax**, **falling action**, **resolution**.',
            'The **climax** is the turning point, where the main problem is faced.',
            'A **conflict** is a struggle against another character, nature, society or oneself.',
            'Against self is **internal**; the others are **external**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A plot has five stages: exposition, rising action, climax, falling action and resolution.', show: 'sum.0' },
        { say: 'The climax is the turning point, where the main problem is faced.', show: 'sum.1' },
        { say: 'A conflict is the struggle at the heart of a story: against another character, nature, society, or oneself.', show: 'sum.2' },
        { say: 'And character against self is an internal conflict. The others are external.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
