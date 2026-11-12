import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-8-1',
  lessonId: 'ex-8-1',
  title: 'Power and Conflict: Ozymandias, London and The Prelude',
  thumbnail: false,
  summary:
    'Three Romantic poems from the AQA Power and Conflict cluster: Shelley’s “Ozymandias”, where a tyrant’s pride is ruined by time; Blake’s “London”, a protest against the abuse of power; and Wordsworth’s extract from “The Prelude”, where nature humbles a proud child. Quotations are from public domain editions, credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Power and Conflict', title: 'Ozymandias, London and The Prelude', subtitle: 'Shelley, Blake and Wordsworth' }],
      lines: [
        { say: 'Three poems from the Power and Conflict cluster, all by Romantic poets: Ozymandias by Shelley, London by Blake, and an extract from The Prelude by Wordsworth.', show: 'title' },
        { say: 'In this lesson, you will learn what each poem is about, read its key lines, and compare the poems.' },
      ],
    },
    {
      chapter: 'Ozymandias',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['‘My name is Ozymandias, king of kings:', 'Look on my works, ye Mighty, and despair!’', 'Nothing beside remains.'], by: 'Percy Bysshe Shelley, “Ozymandias”' }],
      lines: [
        { say: 'In Ozymandias, from eighteen eighteen, a traveller describes a ruined statue of a king in the desert. Only its legs and a broken face remain.', caption: 'In Ozymandias, from 1818, a traveller describes a ruined statue of a king in the desert. Only its legs and a broken face remain.' },
        { say: 'The king’s boast survives on the pedestal: other rulers should look at his works and despair. Then comes the blunt reply: nothing beside remains.', show: 'q' },
        { say: 'The boast has become ironic. Time and nature have destroyed everything his pride and power built.' },
      ],
    },
    {
      chapter: 'London',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['I wander through each chartered street,', 'Near where the chartered Thames does flow,'], by: 'William Blake, “London”' }],
      lines: [
        { say: 'In London, from seventeen ninety-four, a speaker walks through the city and sees misery in every face.', caption: 'In London, from 1794, a speaker walks through the city and sees misery in every face.', show: 'q' },
        { say: 'Chartered means owned and controlled. Even the streets and the river belong to the powerful.' },
        { say: 'Blake blames the church, which lets child chimney sweeps suffer, and the palace, stained by the blood of soldiers. The poem is a protest against the abuse of power.' },
      ],
    },
    {
      chapter: 'The Prelude',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['a huge peak, black and huge,', 'As if with voluntary power instinct', 'Upreared its head.'], by: 'William Wordsworth, The Prelude' }],
      lines: [
        { say: 'In the extract from The Prelude, Wordsworth remembers taking a boat out on a lake one summer evening as a child, proud of his rowing.', show: 'q' },
        { say: 'Then a huge, black peak seems to rise up and follow him, as if it were alive. He rows back, trembling, and the shapes trouble his dreams for days.' },
        { say: 'Pride turns to fear before the power of nature.' },
      ],
    },
    {
      chapter: 'Context',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The Romantics', md: 'Poets who valued **nature**, imagination and strong feeling, and who questioned the power of kings and the church.' }],
      lines: [
        { say: 'All three poets were Romantics. They valued nature and feeling, and many were inspired by the French Revolution, which overthrew a king.', show: 'c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The last line of “Ozymandias” is: *“The lone and level sands stretch far away.”* What does it suggest?',
          choices: ['That the king’s empire still stretches far away', 'That nature and time outlast every empire', 'That the traveller is lost in the desert', 'That the statue will soon be rebuilt'],
          answer: 1,
          working: 'Only empty sand is left: nature and time outlast the king and everything he built.',
        },
      ],
      lines: [
        { say: 'Your turn. The poem ends: the lone and level sands stretch far away. What does it suggest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Only empty sand is left, so nature and time outlast every empire, and the proud king becomes insignificant.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Ozymandias: a tyrant’s pride, ruined by time.', 'London: a protest against the abuse of power.', 'The Prelude: the power of nature humbles a proud child.'] }],
      lines: [
        { say: 'Let’s sum up. In Ozymandias, time ruins a tyrant’s proud boast.', show: 'sum.0' },
        { say: 'London protests against the church and the palace for the suffering of the poor.', show: 'sum.1' },
        { say: 'And in The Prelude, the power of nature fills a proud child with fear that stays in his memory.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
