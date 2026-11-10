import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-2-1',
  lessonId: 'e7-2-1',
  title: 'Imagery',
  summary:
    'Imagery is language that appeals to the five senses: sight, sound, touch, smell and taste. An image helps the reader experience a scene, and it always adds a feeling or an idea to the poem.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Imagery', subtitle: 'Poems you can see, hear and touch' }],
      lines: [
        { say: 'A poem can make you see a wheelbarrow shining in the rain, smell an autumn orchard, or hear ice cracking around a ship.', show: 'title' },
        { say: 'Language like this is called imagery, and it is one of the most powerful tools a poet has. In this video we learn to name the sense an image uses, and to explain what it adds.' },
      ],
    },
    {
      chapter: 'Images for every sense',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Imagery', md: '**Imagery** is language that appeals to the five senses: **sight**, **sound**, **touch**, **smell** and **taste**. Each word picture is called an **image**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Sense', 'Example'],
          rows: [
            ['sight', '*The scarlet kite blazed against the clear blue sky.*'],
            ['sound', '*The kettle shrieked, and the pans rattled on the stove.*'],
            ['touch', '*The icy railing burned my bare fingers.*'],
            ['smell', '*The kitchen was thick with cinnamon and warm bread.*'],
            ['taste', '*The lemon was so sour it made my whole face pucker.*'],
          ],
        },
      ],
      lines: [
        { say: 'Imagery is language that appeals to the five senses: sight, sound, touch, smell and taste. Each word picture is called an image.', show: 'def' },
        { say: 'A sight image might be a scarlet kite blazing against a clear blue sky. A sound image might be a kettle shrieking while pans rattle on the stove.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'An icy railing that burns bare fingers is touch. A kitchen thick with cinnamon and warm bread is smell.', focus: ['t.2', 't.3'] },
        { say: 'And a lemon so sour it makes your whole face pucker is taste.', focus: 't.4' },
      ],
    },
    {
      chapter: 'A poem made of one image',
      layout: 'split',
      left: [{ kind: 'quote', id: 'q', size: 'md', lines: ['so much depends', 'upon', 'a red wheel', 'barrow', 'glazed with rain', 'water', 'beside the white', 'chickens'], by: 'William Carlos Williams, “The Red Wheelbarrow”' }],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**colours**: red, white', '**a texture**: glazed', '**a scene**: the chickens beside the barrow'],
        },
      ],
      lines: [
        { say: 'Here is a famous poem made almost entirely of one image, by William Carlos Williams.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5', 'q.6', 'q.7'] },
        { say: 'Williams gives us colours, red and white, and a texture: the barrow is glazed with rain.', show: ['b.0', 'b.1'] },
        { say: 'He also gives us a scene, with the chickens beside the barrow. The poem asks us to see an ordinary farmyard so clearly that it becomes beautiful.', show: 'b.2' },
      ],
    },
    {
      chapter: 'What an image adds',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Season of mists and mellow fruitfulness,', 'Close bosom-friend of the maturing sun;', 'Conspiring with him how to load and bless', 'With fruit the vines that round the thatch-eves run;'], by: 'John Keats, “To Autumn”, first lines' },
        { kind: 'text', id: 'a', size: 'md', md: 'Images of **ripeness** make autumn feel **rich, warm and generous**.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Imagery is not only about sight', md: 'An image can be a sound, a smell, a taste or a feeling on the skin. Always ask **which sense** is being used.' },
      ],
      lines: [
        { say: 'An image is never there just to decorate a poem. Ask what feeling or idea it brings. Here is the opening of John Keats’s poem To Autumn.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Mellow fruitfulness, the maturing sun, and vines loaded with fruit pile up images of ripeness.', focus: ['q.0', 'q.1', 'q.3'] },
        { say: 'Together they make autumn feel rich, warm and generous, not cold and sad.', show: 'a' },
        { say: 'A common mistake is to think imagery means only pictures. An image can be a sound, a smell, a taste, or a feeling on the skin.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “The Rime of the Ancient Mariner”, the ice around the ship “cracked and growled, and roared and howled”. Which sense does this image appeal to?',
          choices: ['Sight', 'Touch', 'Smell', 'Sound'],
          answer: 3,
          working: 'Cracked, growled, roared and howled are all noises: we hear the ice rather than see it.',
        },
      ],
      lines: [
        { say: 'Your turn. In a poem by Coleridge, the ice around a ship cracked and growled, and roared and howled. Which sense does this image appeal to? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, sound. Cracked, growled, roared and howled are all noises, so we hear the ice rather than see it.', show: 'q2.answer' },
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
            '**Imagery** appeals to sight, sound, touch, smell or taste.',
            'An image lets the reader experience a scene, not just hear about it.',
            'Always ask what **feeling** or **idea** an image adds.',
            'Vivid images use precise, sensory details.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Imagery is language that appeals to sight, sound, touch, smell or taste.', show: 'sum.0' },
        { say: 'An image helps the reader experience a scene, not just be told about it.', show: 'sum.1' },
        { say: 'Always ask what feeling or idea an image adds to the poem.', show: 'sum.2' },
        { say: 'And remember that vivid images use precise, sensory details.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
