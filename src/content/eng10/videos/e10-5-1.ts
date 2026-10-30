import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-5-1',
  lessonId: 'e10-5-1',
  title: 'Reading an Image',
  thumbnail: false,
  summary:
    'Read an image like a text: find the focal point, notice foreground and background, see how the composition is arranged, and explain the effect of colour, light and space.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Visual and Media Texts', title: 'Reading an Image', subtitle: 'Noticing, arranging, explaining' }],
      lines: [
        { say: 'Around eighteen thirty-one, the Japanese artist Hokusai made a woodblock print of a gigantic wave curling over three small boats. Far away, under the curve of the wave, sits Mount Fuji, looking tiny.', show: 'title' },
        { say: 'Almost everything in this famous image was arranged on purpose. In this lesson, you will learn to read an image the way you read a text: by noticing its parts, how they are arranged, and the effect of each choice.' },
      ],
    },
    {
      chapter: 'The focal point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Focal point', md: 'The part of an image the eye goes to **first**. Size, brightness, sharp focus, strong colour or leading lines create it.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Foreground:** seems closest to the viewer', '**Middle ground:** in between', '**Background:** seems farthest away'],
        },
      ],
      lines: [
        { say: 'The focal point of an image is the part the eye goes to first. Artists create it with size, brightness, sharp focus, strong colour, or lines that lead to it.', show: 'def' },
        { say: 'Images also have depth, like a stage. The foreground seems closest to the viewer, the middle ground is in between, and the background seems farthest away.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'In Hokusai’s print, the boats and the wave fill the foreground and middle ground, and Mount Fuji sits in the background.', focus: 'b' },
      ],
    },
    {
      chapter: 'Composition',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'What it does'],
          rows: [
            ['Leading lines', 'roads, rivers or fences draw the eye to the subject'],
            ['Framing', 'a doorway or branches surround the subject'],
            ['Rule of thirds', 'the subject sits off-centre, on a line in thirds'],
            ['Contrast', 'light beside dark makes one thing stand out'],
            ['Symmetry', 'one half mirrors the other: balanced and calm'],
          ],
        },
      ],
      lines: [
        { say: 'Composition is the way the parts of an image are arranged in the frame. Leading lines, such as roads, rivers or fences, draw the eye toward the subject.', show: 't.0', focus: 't.0' },
        { say: 'Framing surrounds the subject with a doorway, a window or branches. In the Hokusai print, the curve of the wave frames Mount Fuji.', show: 't.1', focus: 't.1' },
        { say: 'The rule of thirds places the subject off-centre, and contrast puts light beside dark so one thing stands out.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Symmetry makes one half mirror the other, which feels balanced, calm or formal.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'The effect of each choice',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'e',
          head: ['Choice', 'Usual effect'],
          rows: [
            ['warm colours', 'warmth, energy, comfort'],
            ['cool colours', 'calm, sadness, distance'],
            ['darkness and deep shadow', 'mystery, fear, suspense'],
            ['a small figure in a vast space', 'loneliness'],
          ],
        },
      ],
      lines: [
        { say: 'Every visual choice changes how the viewer feels. Warm colours, such as red and orange, suggest warmth and energy. Cool colours, such as blue and grey, suggest calm, sadness or distance.', show: ['e.0', 'e.1'] },
        { say: 'Darkness and deep shadow suggest mystery, fear and suspense. And a small figure in a vast space suggests loneliness.', show: ['e.2', 'e.3'], focus: ['e.2', 'e.3'] },
        { say: 'These are the usual effects. A skilled artist can play against them, so always check them against the whole image.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Describing without explaining', md: '“The picture is dark” **describes**. “The darkness makes the house feel threatening” **analyses**.' },
      ],
      lines: [
        { say: 'A common mistake is describing without explaining. The picture is dark tells us what you see.', show: 'mis' },
        { say: 'The darkness makes the house feel threatening, as if something is hiding there, analyses. Always connect a visual choice to its effect on the viewer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A photograph shows one tiny hiker crossing a vast, empty desert. What effect does the huge empty space most likely create?',
          choices: [
            'The hiker seems powerful and very important',
            'The scene feels cheerful, busy and crowded',
            'The hiker seems small and alone in nature',
            'The desert feels warm, safe and comforting',
          ],
          answer: 2,
          working: 'A small figure in a vast space suggests loneliness and smallness against nature.',
        },
      ],
      lines: [
        { say: 'Your turn. A photograph shows one tiny hiker crossing a vast, empty desert. What effect does the huge empty space most likely create? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. A small figure in a vast space makes the hiker seem small and alone against nature.', show: 'q.answer' },
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
            'The **focal point** is where the eye goes first.',
            '**Composition** arranges the parts: leading lines, framing, thirds, contrast and symmetry.',
            'Colour, light, space and viewpoint shape feeling: always explain the effect.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The focal point is where the eye goes first.', show: 'sum.0' },
        { say: 'Composition arranges the parts of an image with leading lines, framing, thirds, contrast and symmetry.', show: 'sum.1' },
        { say: 'And colour, light, space and viewpoint shape how we feel. Always connect a choice to its effect.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
