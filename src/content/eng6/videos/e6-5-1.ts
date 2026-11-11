import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-5-1',
  lessonId: 'e6-5-1',
  title: 'Greek and Latin Roots',
  summary:
    'A root is the core of a word, often from Greek or Latin, and it still carries its old meaning. Split a word into prefix, root and suffix, then put their meanings together.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Greek and Latin Roots', subtitle: 'Old pieces inside new words' }],
      lines: [
        { say: 'Many English words were built from pieces of two ancient languages, Greek and Latin.', show: 'title' },
        { say: 'If you know that tele means far, and scope means see, you already know what a telescope does. In this lesson, you will learn a handful of roots that unlock hundreds of words.' },
      ],
    },
    {
      chapter: 'What a root is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Root', md: 'A **root** is the core of a word that carries its main meaning. Many English roots come from **Greek** or **Latin**: *tele* (far) + *scope* (see) = *telescope*.' },
      ],
      lines: [
        { say: 'A root is the core of a word that carries its main meaning. Many English roots come from Greek or Latin, and they still carry their old meanings.', show: 'def' },
        { say: 'A long word is often a root with a prefix at the front and a suffix at the end. So to understand it, split the word, find the meaning of each part, and put them together.', focus: 'def' },
      ],
    },
    {
      chapter: 'Greek roots',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Greek root', 'Means', 'Examples'],
          rows: [
            ['bio', 'life', 'biology, biography'],
            ['geo', 'earth', 'geography, geology'],
            ['graph', 'write or draw', 'autograph, paragraph'],
            ['tele', 'far', 'telescope, television'],
            ['micro', 'small', 'microscope, microchip'],
            ['phon', 'sound', 'microphone, symphony'],
            ['auto', 'self', 'automatic, autobiography'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some roots from Greek.', show: 't' },
        { say: 'Bio means life, as in biology. Geo means earth, as in geography. And graph means write or draw, as in autograph.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Tele means far, micro means small, and fone means sound. So a microphone takes a small sound, and makes it bigger.', caption: 'Tele means far, micro means small, and phon means sound. So a microphone takes a small sound, and makes it bigger.', focus: ['t.3', 't.4', 't.5'] },
        { say: 'And auto means self, as in automatic.', focus: 't.6' },
      ],
    },
    {
      chapter: 'Latin roots',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Latin root', 'Means', 'Examples'],
          rows: [
            ['aqua', 'water', 'aquarium, aquatic'],
            ['port', 'carry', 'transport, portable'],
            ['aud', 'hear', 'audience, audible'],
            ['vis', 'see', 'vision, visible'],
            ['dict', 'say or speak', 'dictionary, predict'],
            ['rupt', 'break', 'erupt, interrupt'],
            ['struct / scrib', 'build / write', 'construct / describe'],
          ],
        },
      ],
      lines: [
        { say: 'And here are some roots from Latin.', show: 't' },
        { say: 'Aqua means water, as in aquarium. Port means carry, so something portable can be carried.', focus: ['t.0', 't.1'] },
        { say: 'Awd means hear, as in audience, and viz means see, as in vision.', caption: 'Aud means hear, as in audience, and vis means see, as in vision.', focus: ['t.2', 't.3'] },
        { say: 'Dict means say or speak, as in predict. Rupt means break, as in erupt. And struct means build, while scrib means write.', focus: ['t.4', 't.5', 't.6'] },
      ],
    },
    {
      chapter: 'Taking words apart',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm1', size: 'lg', lines: ['\\text{inter} + \\text{rupt} = \\text{between} + \\text{break}'] },
        { kind: 'math', id: 'm2', size: 'lg', lines: ['\\text{auto} + \\text{bio} + \\text{graphy} = \\text{self} + \\text{life} + \\text{writing}'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not every matching letter string is a root', md: 'The letters *port* appear in *portrait*, but a portrait is not something you carry. Check that the meaning fits.' },
      ],
      lines: [
        { say: 'What does interrupt mean? Split it: inter, plus rupt. Inter means between, and rupt means break. So to interrupt is to break in between, as when you speak while someone else is talking.', show: 'm1' },
        { say: 'What is an autobiography? Auto means self, bio means life, and graphy means writing. So it is a book someone writes about their own life.', show: 'm2' },
        { say: 'Here is a common mistake. The letters P O R T appear in portrait, but a portrait is not something you carry. Check that the root’s meaning fits, and use the sentence around the word as a second clue.', caption: 'Here is a common mistake. The letters port appear in portrait, but a portrait is not something you carry. Check that the root’s meaning fits, and use the sentence around the word as a second clue.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The root “aud” means hear. What does “audible” most likely mean?',
          choices: ['Able to be seen', 'Able to be heard', 'Able to be carried', 'Able to be broken'],
          answer: 1,
          working: '“aud” means hear, and the suffix -ible means able to be, so audible means able to be heard.',
        },
      ],
      lines: [
        { say: 'Your turn. What does audible most likely mean? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Awd means hear, and the suffix ible means able to be. So audible means able to be heard.', caption: 'The answer is B. Aud means hear, and the suffix -ible means able to be. So audible means able to be heard.', show: 'q2.answer' },
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
            'A **root** is the core of a word, often from Greek or Latin.',
            'Learn common roots: *bio, geo, graph, tele, aqua, port, aud, vis, dict, rupt*.',
            'Split a word into prefix, root and suffix, then combine their meanings.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A root is the core of a word, often from Greek or Latin.', show: 'sum.0' },
        { say: 'Learning a few common roots unlocks hundreds of words.', show: 'sum.1' },
        { say: 'And to understand a long word, split it into prefix, root and suffix, then combine their meanings.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
