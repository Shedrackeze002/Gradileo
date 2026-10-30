import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-2-4',
  lessonId: 'e12-2-4',
  title: 'Reading an Unseen Poem',
  summary:
    'To read an unseen poem, use the title, poet and date, then work in four passes: situation, structure, imagery and sound, then tone and meaning. Find the turn, describe both sides of it, name the tone precisely, and rest every reading on the words.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Reading an Unseen Poem', subtitle: 'Only the words on the page, and they are enough' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Rain, midnight rain, nothing but the wild rain', 'On this bleak hut, and solitude, and me', 'Remembering again that I shall die'],
          by: 'Edward Thomas, “Rain”',
        },
      ],
      lines: [
        { say: 'Sooner or later, in an exam or in a book you pick up, you will meet a poem nobody has explained to you. There are no notes, no class discussion, and perhaps no idea who the poet was.', show: 'title' },
        { say: 'This is the unseen poem. It is the truest test of this unit, because you have only the words on the page. Here is the start of one by Edward Thomas. In this lesson, you will practise a method for reading it.', show: ['q.0', 'q.1', 'q.2'] },
      ],
    },
    {
      chapter: 'Four passes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1. Situation**: who speaks, to whom, where and when',
            '**2. Structure**: how it is built, and where it turns',
            '**3. Imagery and sound**: pictures and sounds that stand out',
            '**4. Tone and meaning**: how the speaker feels, and what it is about',
          ],
        },
      ],
      lines: [
        { say: 'First, use everything you are given: the title, the poet’s name, any date. Read the poem twice, once for the sense and once slowly, with a pencil. Then work in four passes.', focus: 'b' },
        { say: 'Pass one is situation. Who is speaking, where, and what is happening? In “Rain”, a speaker is alone in a bleak hut at midnight, thinking about his own death.', show: 'b.0', focus: 'b.0' },
        { say: 'Pass two is structure, and where the poem turns. Pass three is imagery and sound. Here the word rain returns again and again.', show: ['b.1', 'b.2'] },
        { say: 'Pass four is tone and meaning. The speaker is bleak and calm rather than panicked.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Finding the turn',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Blessed are the dead that the rain rains upon:', 'But here I pray that none whom once I loved'],
          by: 'Edward Thomas, “Rain”',
        },
        { kind: 'text', id: 't', size: 'md', md: 'Look for *but*, *yet* or *then*, a change of tense or speaker, or line 9 of a sonnet.' },
      ],
      lines: [
        { say: 'Most short poems change direction once, and the turn is often the key. Look for a word like but or yet, a change of tense, or a change of speaker.', show: 't' },
        { say: 'In “Rain”, the turn comes at but here I pray. Before it, the speaker thinks of his own death. After it, he fears for the people he once loved.', show: ['q.0', 'q.1'], focus: 'q.1' },
        { say: 'When you find the turn, describe both sides of it. Naming both halves shows you understand how the poem is built.', focus: 't' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Inventing a meaning the words cannot support', md: 'If you decide “Rain” is about a farmer worried for his crops, look for the evidence. There is none. **Point to the line** that proves it.' },
      ],
      lines: [
        { say: 'Here is a common mistake. An unseen poem can be read in more than one way, but every reading must rest on the words.', show: 'm' },
        { say: 'If you decide that “Rain” is about a farmer worried for his crops, look for the evidence. There is none. Before you choose an answer, point to the line that proves it. And name the tone precisely, with a pair such as calm but grieving.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “Rain”, the poem turns at “But here I pray that none whom once I loved”. What changes at the turn?',
          choices: [
            'It moves from his own death to his fear for the people he once loved.',
            'It moves from the rain outside to a memory of a farm in sunshine.',
            'It moves from fear of death to hope that the rain will wash it away.',
            'It moves from calm acceptance to panic as the storm grows louder.',
          ],
          answer: 0,
          working: 'Before the turn, the speaker thinks of his own death. After it, he fears for the people he once loved. Naming both halves shows how the poem is built.',
        },
      ],
      lines: [
        { say: 'Your turn. In “Rain”, the poem turns at but here I pray that none whom once I loved. What changes at the turn? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. Before the turn, the speaker thinks of his own death. After it, he fears for the people he once loved. Naming both halves shows how the poem is built.', show: 'q2.answer' },
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
            'Use the title, poet and date, then read in four passes.',
            'Find the turn and describe both sides of it.',
            'Rest every reading on the words, and name tone precisely.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use everything you are given, then read in four passes: situation, structure, imagery and sound, and tone and meaning.', show: 'sum.0' },
        { say: 'Find the turn, and describe both sides of it.', show: 'sum.1' },
        { say: 'And rest every reading on the words of the poem, naming the tone precisely, with evidence.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
