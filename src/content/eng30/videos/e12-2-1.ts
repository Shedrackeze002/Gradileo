import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-2-1',
  lessonId: 'e12-2-1',
  title: 'The Ode and the Meditative Lyric',
  thumbnailTitle: 'The Ode',
  summary:
    'An ode is a long, serious lyric that speaks to a person, thing or idea, an address called apostrophe. A meditative lyric follows a mind as it thinks: a scene, a memory or question, a turn inward, and a return to the scene, seen anew.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'The Ode and the Meditative Lyric', subtitle: 'Speaking to a bird, and following a thought' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['My heart aches, and a drowsy numbness pains', 'My sense, as though of hemlock I had drunk,'],
          by: 'John Keats, “Ode to a Nightingale”',
        },
      ],
      lines: [
        { say: 'In the spring of eighteen nineteen, a nightingale built its nest near the house in Hampstead where John Keats was living. One morning, a friend remembered, Keats carried a chair out to the grass under a plum tree, and sat there for hours.', show: 'title' },
        { say: 'He came back with a few scraps of paper, and they held this poem. Keats does not simply describe the bird. He speaks to it. In this lesson, you will read the ode, and follow how a meditative lyric develops its thought.', show: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'The ode and its address',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ode and apostrophe', md: 'An **ode** is a long, serious lyric that speaks to a person, thing or idea. **Apostrophe** is speaking directly to someone absent, or to something not human.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Fade far away, dissolve, and quite forget', 'What thou among the leaves hast never known,', 'The weariness, the fever, and the fret', 'Here, where men sit and hear each other groan;'],
          by: 'John Keats, “Ode to a Nightingale”',
        },
      ],
      lines: [
        { say: 'An ode is a long, serious lyric that speaks to a person, thing or idea, and praises it or reflects on it. Speaking to something that cannot answer is called apostrophe.', show: 'def' },
        { say: 'To read an ode, first find the addressee. Look for thou, thee and thy. Here, thou among the leaves is the nightingale, hidden in the trees.', show: ['q.0', 'q.1'], focus: 'q.1' },
        { say: 'Then ask what the speaker wants. Keats wants to fade away with the bird, out of the weariness, the fever and the fret of a human world that the bird has never known.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'The meditative lyric',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A speaker describes a **scene**', 'The scene stirs a **memory or question**', 'The poem **turns inward**', 'It **returns** to the scene, seen differently'],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Mark the **present**, the **past** and the **future**.' },
      ],
      lines: [
        { say: 'An ode rarely stands still. A meditative lyric follows a mind as it thinks, and many Romantic poems share one shape.', show: 'b.0' },
        { say: 'The scene stirs a memory or a question. The poem turns inward. And then it returns to the scene, which is now seen differently.', show: ['b.1', 'b.2', 'b.3'] },
        { say: 'Wordsworth’s poem about Tintern Abbey opens with a return to a valley, and Coleridge’s “Frost at Midnight” opens in a silent cottage beside a sleeping baby. Both drift into memory. It helps to mark the present, the past and the future.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Confusing the addressee with what is mentioned', md: 'An ode names many things. Find who is spoken **to**, not just who is spoken **about**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. An ode names many things, but not all of them are the addressee.', show: 'm' },
        { say: 'In the nightingale ode, Keats mentions Death, an emperor and a clown, but the thou of the poem is still the bird. Find who is spoken to, not just who is spoken about.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “Ode to a Nightingale”, Keats mentions Death, an emperor and a clown. Who is the poem’s “thou”?',
          choices: [
            'Death, because the poem keeps returning to the thought of dying.',
            'The emperor, because he is the grandest figure the poem names.',
            'The reader, because the poem asks us to share the speaker’s pain.',
            'The nightingale, because the speaker is speaking to the bird.',
          ],
          answer: 3,
          working: 'An ode is built on apostrophe. Death, the emperor and the clown are mentioned, but the speaker speaks to the nightingale.',
        },
      ],
      lines: [
        { say: 'Your turn. In the nightingale ode, Keats mentions Death, an emperor and a clown. Who is the poem’s thou? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. An ode is built on apostrophe. Death, the emperor and the clown are mentioned, but the speaker speaks to the nightingale.', show: 'q2.answer' },
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
            'An ode speaks to someone or something; that address is apostrophe.',
            'Find the addressee, the feeling and the wish, then the turn.',
            'A meditative lyric follows a mind: scene, memory, turn, return.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ode speaks to someone or something, and that address is called apostrophe.', show: 'sum.0' },
        { say: 'To read one, find the addressee, what the speaker feels and wants, and the turn.', show: 'sum.1' },
        { say: 'And a meditative lyric follows a mind, from scene to memory to turn, and back to the scene again.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
