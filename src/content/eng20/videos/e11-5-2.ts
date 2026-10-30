import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-5-2',
  lessonId: 'e11-5-2',
  title: 'Documentary Techniques',
  thumbnailTitle: 'Documentary Techniques',
  thumbnail: false,
  summary:
    'Six techniques of documentary film, how each one persuades, why real footage can still mislead, and how to read a documentary’s point of view from the pattern of its choices.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'News and Media', title: 'Documentary Techniques', subtitle: 'A window, or a set of choices?' },
      ],
      lines: [
        { say: 'A documentary feels like a window onto reality: real places, real people, real events.', show: 'title' },
        { say: 'But every documentary is made of choices: whom to interview, which footage to use, and which shot follows which. Those choices can inform viewers, and they can also persuade them.' },
      ],
    },
    {
      chapter: 'Six techniques',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Expert interview**: someone with special knowledge speaks to the camera',
            '**Voice-over narration**: an unseen voice explains the images',
            '**Archival footage**: real film or photographs from the past',
            '**Reconstruction**: actors show an event no camera recorded',
            '**Music**: tells viewers how to feel',
            '**Editing**: shots side by side, so viewers connect them',
          ],
        },
      ],
      lines: [
        { say: 'An expert interview lets someone with special knowledge or first-hand experience speak to the camera, lending the film authority.', show: 'b.0', focus: 'b.0' },
        { say: 'Voice-over narration is an unseen voice that tells viewers how to understand the images. Archival footage is real film or photographs from the past.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'A reconstruction uses actors to show an event that no camera recorded. Music added to the soundtrack tells viewers how to feel.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
        { say: 'And editing places shots side by side so that viewers connect them. Placing two contrasting shots together is called juxtaposition.', show: 'b.5', focus: 'b.5' },
      ],
    },
    {
      chapter: 'How they persuade',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Shots of children walking miles to fetch water are placed straight after shots of a lawn being watered in the rain.'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Technique:** editing, by juxtaposition', '**Viewers:** compare the two shots', '**Effect:** scarcity set against waste, and a feeling of unfairness'],
        },
      ],
      lines: [
        { say: 'Each technique shapes what viewers believe or feel. An expert makes a claim sound settled, so ask whether other experts would disagree.' },
        { say: 'Archival footage feels like proof, but someone chose which footage to show.' },
        { say: 'Here is an example of editing. Shots of children walking miles to fetch water follow shots of a lawn being watered in the rain.', show: 'q' },
        { say: 'Viewers compare the two shots, and feel the unfairness, though the film never states it.', show: 'b' },
      ],
    },
    {
      chapter: 'Point of view',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Who speaks, and for how long?** The farmer at length, the company briefly',
            '**How is each side filmed?** Warmly at home, or behind glass',
            '**What does the music do?** Gentle piano and old film',
            '**Who has the last word?** The film ends on the farmer',
          ],
        },
      ],
      lines: [
        { say: 'Every documentary has a point of view, even when no one says “I think”.' },
        { say: 'Take a film about a wind farm on a hill. The farmer, filmed warmly in her kitchen, speaks at length. The company’s spokesperson appears once, for twenty seconds, behind a glass office wall.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'Gentle piano and old film make the hill precious and fragile, and the film ends on the farmer, silent, looking at the hill.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'Without stating an opinion, the film opposes the wind farm. That is not dishonest, unless the film presents itself as neutral.' },
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
          title: 'Real footage is not the whole truth',
          md: 'Footage can be completely genuine and still mislead, through what comes before and after it, what the narrator says over it, or what was left out.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: trusting a scene just because the pictures are real.', show: 'm' },
        { say: 'Genuine footage can still mislead. So judge a documentary by the choices behind it, not only by whether its pictures are real.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Low, slow strings play over an empty playground at dusk. Which technique is this?',
          choices: [
            'An expert interview that lends the film authority.',
            'Archival footage that feels like real proof.',
            'A reconstruction that shows an unfilmed event.',
            'Music that tells viewers how to feel.',
          ],
          answer: 3,
          working: 'Low, slow strings added to the soundtrack set the mood. That is music, which tells viewers how to feel.',
        },
      ],
      lines: [
        { say: 'Your turn. Low, slow strings play over an empty playground at dusk. Which technique is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Music added to the soundtrack sets the mood, and tells viewers how to feel about what they see.', show: 'q2.answer' },
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
            'Documentaries use interviews, narration, archival footage, reconstructions, music and editing.',
            'Each technique can inform and persuade.',
            'Real footage can still mislead, so judge the choices behind it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Documentaries use expert interviews, narration, archival footage, reconstructions, music and editing.', show: 'sum.0' },
        { say: 'Each technique can inform and persuade, and the pattern of choices gives a film its point of view.', show: 'sum.1' },
        { say: 'And real footage can still mislead, so judge a documentary by the choices behind it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
