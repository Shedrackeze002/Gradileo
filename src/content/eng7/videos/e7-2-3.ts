import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-2-3',
  lessonId: 'e7-2-3',
  title: 'The Ballad',
  summary:
    'A ballad is a poem or song that tells a story. A ballad stanza has four lines that alternate four and three beats and usually rhyme ABCB, and ballads use dialogue, repetition and refrains because they began as songs.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'The Ballad', subtitle: 'Stories that were sung' }],
      lines: [
        { say: 'Long before most people could read, stories were sung. Shipwrecks, battles, ghosts and lost loves were turned into songs and passed from singer to singer.', show: 'title' },
        { say: 'Those songs are called ballads. In this video we learn the features of a ballad, check a ballad stanza, and follow the story in one.' },
      ],
    },
    {
      chapter: 'What a ballad is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ballad', md: 'A **ballad** is a poem or song that tells a story. It is a kind of **narrative poem**.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**ballad stanzas**: four lines, taking turns with **four** and **three** beats',
            '**rhyme**: lines 2 and 4 rhyme (**ABCB**)',
            'a **dramatic story**, often sad, strange or frightening',
            '**dialogue**, so the characters speak for themselves',
            '**repetition** and **refrains**, which made them easy to sing',
          ],
        },
      ],
      lines: [
        { say: 'A ballad is a poem or song that tells a story, so it is a kind of narrative poem.', show: 'def' },
        { say: 'Most ballads share five features. They are written in ballad stanzas: four lines that take turns with four beats and three beats.', show: 'b.0' },
        { say: 'The second and fourth lines rhyme, and sometimes the first and third rhyme too.', show: 'b.1' },
        { say: 'They tell a dramatic story, often sad, strange or frightening, and they use dialogue, so the characters speak for themselves.', show: ['b.2', 'b.3'] },
        { say: 'And they use repetition and refrains, repeated lines that made the songs easy to remember and sing together.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Checking a ballad stanza',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Water, water, every where,', 'And all the boards did shrink;', 'Water, water, every where,', 'Nor any drop to drink.'], by: 'Samuel Taylor Coleridge, “The Rime of the Ancient Mariner”' },
        { kind: 'text', id: 'a', size: 'md', md: 'Four lines · **4-3-4-3** beats · rhymes **ABCB** (*shrink*, *drink*)' },
      ],
      lines: [
        { say: 'The most famous literary ballad in English is Coleridge’s The Rime of the Ancient Mariner. An old sailor stops a guest on his way to a wedding and tells him a terrible tale of a voyage.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Let’s check this stanza. It has four lines, so it is a quatrain.', focus: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Water, water, every where has four beats. And all the boards did shrink has three.', focus: ['q.0', 'q.1'] },
        { say: 'And the second and fourth lines rhyme: shrink and drink. So it is a ballad stanza.', show: 'a', focus: ['q.1', 'q.3'] },
      ],
    },
    {
      chapter: 'Old words',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['It is an ancient Mariner,', 'And he stoppeth one of three.', '‘By thy long grey beard and glittering eye,', 'Now wherefore stopp’st thou me?'], by: 'Samuel Taylor Coleridge, “The Rime of the Ancient Mariner”' },
        {
          kind: 'table',
          id: 't',
          head: ['Old word', 'Meaning'],
          rows: [
            ['thou, thee', 'you'],
            ['thy', 'your'],
            ['wherefore', 'why'],
            ['stoppeth, stopp’st', 'stops'],
          ],
        },
      ],
      lines: [
        { say: 'Old ballads use some old words. Here is how Coleridge’s poem begins.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Thou and thee mean you, and thy means your.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Wherefore means why, and stoppeth means stops.', focus: ['t.2', 't.3'] },
        { say: 'So the last line means, why do you stop me? The wedding guest is speaking to the Mariner.', focus: 'q.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'p', size: 'md', lines: ['Day after day, day after day,', 'We stuck, nor breath nor motion;', 'As idle as a painted ship', 'Upon a painted ocean.'] },
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is happening in this stanza?',
          choices: ['The ship is sinking in a storm.', 'The sailors are arriving home.', 'There is no wind, so the ship is stuck.', 'The ship is racing to a wedding.'],
          answer: 2,
          working: 'The Mariner is speaking for the sailors. “Nor breath nor motion” means there is no wind, so the ship cannot move: it is becalmed.',
        },
      ],
      lines: [
        { say: 'Your turn. To follow a ballad, ask who is speaking, what is happening, and how it feels. What is happening in this stanza? Pause the video and try it.', show: ['p.0', 'p.1', 'p.2', 'p.3', 'q2'], wait: 6 },
        { say: 'The answer is C. The Mariner is speaking for the sailors. Nor breath nor motion means there is no wind, so the ship is stuck, and it feels slow and hopeless.', show: 'q2.answer' },
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
            'A **ballad** is a poem or song that tells a story.',
            'A **ballad stanza** has four lines, 4-3-4-3 beats, usually rhyming ABCB.',
            'Ballads use dialogue, repetition and refrains.',
            '*Thou* means you, *thy* means your, *wherefore* means why.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ballad is a poem or song that tells a story.', show: 'sum.0' },
        { say: 'A ballad stanza has four lines that take turns with four and three beats, and usually rhymes "A", "B", "C", "B".', caption: 'A ballad stanza has four lines that take turns with four and three beats, and usually rhymes ABCB.', show: 'sum.1' },
        { say: 'Ballads use dialogue, repetition and refrains, because they began as songs.', show: 'sum.2' },
        { say: 'And in old ballads, thou means you, thy means your, and wherefore means why.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
