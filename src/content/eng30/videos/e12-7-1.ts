import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-7-1',
  lessonId: 'e12-7-1',
  title: 'Sentence Structure and Rhetorical Effect',
  thumbnailTitle: 'Sentence Shape and Effect',
  thumbnail: false,
  summary:
    'Two sentences can hold the same facts and land very differently. Learn loose and periodic sentences, inversion, asyndeton, polysyndeton, parallelism and antithesis, and explain what each one does to a reader.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Language', title: 'Sentence Structure and Rhetorical Effect', subtitle: 'Choose the shape of a sentence, not just its words' }],
      lines: [
        { say: 'Two sentences can hold exactly the same facts, yet one of them lands like a blow. The difference is shape. The first tells you the worst at once. The second makes you wait.', show: 'title' },
        { say: 'Skilled writers choose the shape of a sentence as carefully as its words. In this lesson you will recognize seven shapes, and explain the effect each one has on a reader.' },
      ],
    },
    {
      chapter: 'Loose and periodic sentences',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Loose**: *The village was gone, after a night of wind, a morning of rising water and an afternoon of silence.*',
            '**Periodic**: *After a night of wind, a morning of rising water and an afternoon of silence, the village was gone.*',
          ],
        },
      ],
      lines: [
        { say: 'A loose sentence states its main clause first, and then adds detail. It sounds natural and relaxed, and it gives the reader the point straight away.', show: 'b.0', focus: 'b.0' },
        { say: 'A periodic sentence holds its main clause back until the end. Because it is not complete until its final words, it builds suspense, and the main clause arrives with extra force.', show: 'b.1', focus: 'b.1' },
        { say: 'To tell them apart, find the part that could stand alone. If it comes first, the sentence is loose. If it closes the sentence, the sentence is periodic.' },
      ],
    },
    {
      chapter: 'Inversion',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'i',
          items: ['**Usual order**: *The cart rolled down the hill.*', '**Inversion**: *Down the hill rolled the cart.*'],
        },
      ],
      lines: [
        { say: 'English normally puts the subject first, then the verb. Inversion reverses that order, for example by placing a verb before its subject.', show: 'i.0', focus: 'i.0' },
        { say: 'It moves a key word where it cannot be missed, and gives the sentence a formal, elevated sound.', show: 'i.1', focus: 'i.1' },
      ],
    },
    {
      chapter: 'Asyndeton and polysyndeton',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'a',
          items: ['**Asyndeton**: *She read the letter, folded it, burned it.*', '**Polysyndeton**: *The rain fell on the roofs and the roads and the fields and the river.*'],
        },
        {
          kind: 'quote',
          id: 'q',
          lines: ['Heal the sick, cleanse the lepers, raise the dead, cast out devils'],
          by: 'Matthew 10:8, King James Bible (1611)',
          size: 'md',
        },
      ],
      lines: [
        { say: 'An ordinary list puts the word and only before the last item. Writers can break that habit in two opposite ways.', show: 'a.0', hide: 'q' },
        { say: 'Asyndeton leaves the joining words out. With nothing between the items, they rush past, so the effect is urgent, brisk or breathless.', focus: 'a.0' },
        { say: 'Polysyndeton repeats the word and between every item. Each one makes the reader pause, so the list feels heavy, long and relentless.', show: 'a.1', focus: 'a.1' },
        { say: 'Here are four commands with no and among them. They come quickly, like an urgent list of tasks.', hide: 'a', show: 'q' },
      ],
    },
    {
      chapter: 'Parallelism and antithesis',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'd',
          lines: ['It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness'],
          by: 'Charles Dickens, *A Tale of Two Cities* (1859)',
          size: 'md',
        },
      ],
      lines: [
        { say: 'Parallelism writes a series of words, phrases or clauses in the same grammatical form. It is easy to follow and easy to remember.', show: 'd' },
        { say: 'Antithesis uses that same balance to set opposite ideas side by side. Dickens sets opposites in matching clauses, so the contradictions of an age stand out.' },
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
          title: 'Naming without explaining',
          md: 'Do not stop at the name. Add the effect: *The missing conjunctions make the commands come quickly, like an urgent list of tasks.*',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Writing that a writer uses asyndeton earns little on its own.', show: 'm' },
        { say: 'Always add the effect. Say what the device does to the reader.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence is periodic, with its main clause last?',
          choices: [
            'The crowd cheered all night, long after the last song had ended.',
            'The river rose by morning, covering the road and the bridge below.',
            'The lights went out, as the wind tore across the empty harbour.',
            'After the wind had dropped and the river had calmed, the town woke.',
          ],
          answer: 3,
          working: 'D holds its main clause, the town woke, until the end. A, B and C all state the main clause first.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence is periodic, with its main clause last? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. It holds its main clause, the town woke, until the end. A, B and C all state the main clause first.', show: 'q2.answer' },
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
            'A periodic sentence holds its main clause back and builds suspense.',
            'Asyndeton speeds a list up, and polysyndeton slows it down.',
            'Name the device, then explain its effect.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A loose sentence gives its main clause first. A periodic sentence holds it back and builds suspense.', show: 'sum.0' },
        { say: 'Asyndeton drops the conjunctions and speeds a list up. Polysyndeton repeats them and slows it down.', show: 'sum.1' },
        { say: 'And whatever the device, name it, then explain its effect on the reader.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
