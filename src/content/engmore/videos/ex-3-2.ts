import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-3-2',
  lessonId: 'ex-3-2',
  title: 'Descriptive Writing from a Picture',
  thumbnail: false,
  summary:
    'A description from a picture recreates a scene through precise detail. Look closely and never contradict the picture; use precise words and all the senses; show feelings through details rather than naming them; use imagery with purpose; and structure the piece like a camera, from the wide view to a small detail and then a change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Nineteenth-Century Non-fiction and Description', title: 'Descriptive Writing from a Picture', subtitle: 'Making the reader see it' }],
      lines: [
        { say: 'Some writing tasks give you a picture and ask you to describe it. There is no plot to invent, so every sentence has to earn its place through what it lets the reader see, hear and feel.', show: 'title' },
        { say: 'In this lesson, you will choose and describe details, show rather than tell, and give a description a clear shape.' },
      ],
    },
    {
      chapter: 'Starting from the picture',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Description', md: 'Writing that recreates a place, person or moment through **precise detail**, so the reader experiences it rather than being told about it.' },
        { kind: 'text', id: 'pic', md: '*A photograph of an empty beach in winter. Grey waves break on the shingle, a single set of footprints leads towards the sea, a lifeguard’s hut is boarded up, and gulls hang in the wind above the cliffs.*' },
      ],
      lines: [
        { say: 'A description recreates a scene through precise detail, so the reader experiences it.', show: 'def' },
        { say: 'Start by looking closely: the time of day, the weather, the light, and the small details at the edges.', show: 'pic' },
        { say: 'You may add the sound of the waves or the smell of salt, but you must not contradict the picture. This is not a crowded summer beach.' },
      ],
    },
    {
      chapter: 'Precise and sensory detail',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Vague', 'Precise'], rows: [['The wind was very strong.', 'The wind tore at the shutters.'], ['There were lots of nice smells.', 'Warm sugar and cinnamon hung in the air.'], ['He walked slowly.', 'He shuffled, dragging one foot.']] }],
      lines: [
        { say: 'Vague words such as nice, very and a lot tell the reader nothing. Precise nouns and verbs do the work.', caption: 'Vague words such as “nice”, “very” and “a lot” tell the reader nothing. Precise nouns and verbs do the work.', show: 't.0', focus: 't.0' },
        { say: 'Use the senses beyond sight: smell, sound and touch.', show: 't.1', focus: 't.1' },
        { say: 'And choose verbs that carry a picture of their own.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Show, not tell',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Show, not tell', md: '**Telling** names a feeling: *she was nervous*. **Showing** gives the details that reveal it: *she twisted the strap of her bag*.' },
        { kind: 'text', id: 'ex', md: '*The old house was creepy.* → *The gate hung from one hinge, and somewhere inside a door creaked slowly open.*' },
      ],
      lines: [
        { say: 'Telling names a feeling. Showing gives the details that reveal it, so the reader works it out.', show: 'def' },
        { say: 'Instead of saying the old house was creepy, show the gate hanging from one hinge, and a door creaking slowly open inside.', show: 'ex' },
      ],
    },
    {
      chapter: 'Shaping a description',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['The wide view: the whole beach under a low sky', 'Closer: the far cliffs and the gulls', 'A small detail: the footprints in the shingle', 'A change: the tide washing the footprints away'] }],
      lines: [
        { say: 'A description needs a shape. One clear plan works like a camera. Begin with the wide view of the whole scene.', show: 'b.0' },
        { say: 'Move closer, to one part of it.', show: 'b.1' },
        { say: 'Zoom in on a single small detail.', show: 'b.2' },
        { say: 'And end with a change: the light fades, or the tide turns. Returning to the opening image, changed, gives a cyclical ending.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sentence **shows**, rather than tells, that the man was cold?',
          choices: ['He stamped his feet and blew into his cupped, reddened hands.', 'The man was very cold because it was a freezing night.', 'He felt cold, and he did not enjoy the cold at all.', 'It was cold, so he was cold, and he wished he was warmer.'],
          answer: 0,
          working: 'Stamping and blowing on red hands are what a cold person does, so the reader feels the cold without being told.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence shows, rather than tells, that the man was cold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It never uses the word cold. His actions let the reader feel it. The other three all name the feeling.', show: 'q.answer' },
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
          items: ['Look closely, and never contradict the picture.', 'Use precise words and all the senses.', 'Show feelings through details; don’t name them.', 'Shape it: wide view, closer, small detail, a change.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Look closely, and never contradict the picture.', show: 'sum.0' },
        { say: 'Use precise words and all the senses.', show: 'sum.1' },
        { say: 'Show feelings through details, instead of naming them.', show: 'sum.2' },
        { say: 'And shape the piece like a camera: the wide view, closer, a small detail, and then a change.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
