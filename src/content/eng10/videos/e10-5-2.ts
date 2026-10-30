import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-5-2',
  lessonId: 'e10-5-2',
  title: 'Film Techniques',
  thumbnail: false,
  summary:
    'Learn the names of film shots, angles, sounds and editing, and, more importantly, what each technique does to an audience.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Visual and Media Texts', title: 'Film Techniques', subtitle: 'What each choice does to the audience' }],
      lines: [
        { say: 'A film opens on a vast, empty ocean. Slowly the camera moves closer, until a tiny boat appears, and then a single face, staring at the horizon.', show: 'title' },
        { say: 'No one has said a word, yet you know this person is alone, far from help, and afraid. In this lesson, you will learn the names of film techniques and, more importantly, what each one does to an audience.' },
      ],
    },
    {
      chapter: 'Shots',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shot', 'Usual effect'],
          rows: [
            ['Extreme long shot', 'shows the setting; people seem small and alone'],
            ['Medium shot', 'shows faces and gestures, like a conversation'],
            ['Close-up', 'shows emotion; draws us close to the character'],
            ['Extreme close-up', 'one small detail; builds tension'],
          ],
        },
      ],
      lines: [
        { say: 'A shot is one continuous piece of film between two cuts. Shots are named by how much of the scene they show.', show: 't.0' },
        { say: 'An extreme long shot shows a vast area, so it can make people seem small and alone. A medium shot shows faces and gestures, like a conversation.', show: 't.1', focus: ['t.0', 't.1'] },
        { say: 'A close-up shows emotion and draws us close to the character. An extreme close-up focuses all attention on one small detail, such as an eye or a key, and builds tension.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Angles and sound',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'a',
          items: ['**High angle:** looks down; the subject seems small or weak', '**Low angle:** looks up; the subject seems powerful or threatening'],
        },
        { kind: 'callout', id: 'snd', tone: 'definition', title: 'Diegetic and non-diegetic sound', md: '**Diegetic** sound comes from inside the story: dialogue, footsteps. **Non-diegetic** sound is for the audience only: the music score.' },
      ],
      lines: [
        { say: 'The camera angle is where the camera sits in relation to the subject. A high angle looks down, which makes the subject seem small, weak or vulnerable.', show: 'a.0' },
        { say: 'A low angle looks up, which makes the subject seem large, powerful or threatening.', show: 'a.1', focus: 'a.1' },
        { say: 'Sound matters too. Diegetic sound comes from inside the story, such as dialogue and footsteps, and the characters can hear it.', show: 'snd' },
        { say: 'Non-diegetic sound, such as a music score, is added for the audience only.' },
      ],
    },
    {
      chapter: 'Editing and lighting',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'e',
          head: ['Technique', 'What it does'],
          rows: [
            ['Cross-cutting', 'switches between two scenes at once, building suspense'],
            ['Montage', 'short shots show time passing or change'],
            ['High-key lighting', 'bright and even: cheerful'],
            ['Low-key lighting', 'dark with strong shadows: mysterious'],
          ],
        },
      ],
      lines: [
        { say: 'Editing is how shots are joined. Cross-cutting switches back and forth between two scenes happening at once, which builds suspense: will the hero arrive in time?', show: 'e.0', focus: 'e.0' },
        { say: 'A montage is a series of short shots that show time passing, such as weeks of training in a few seconds.', show: 'e.1', focus: 'e.1' },
        { say: 'Lighting sets the mood. High-key lighting is bright and even, and suits cheerful scenes. Low-key lighting is dark, with strong shadows, and suits mysteries and thrillers.', show: ['e.2', 'e.3'], focus: ['e.2', 'e.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Naming a technique without its effect', md: '“The director uses a close-up” is only half an answer. Say what it **does**: “The close-up shows the fear in her eyes, so we feel her panic.”' },
      ],
      lines: [
        { say: 'Here is a common mistake. The director uses a close-up is only half an answer.', show: 'mis' },
        { say: 'Say what the close-up does: it shows the fear in her eyes, so we feel her panic with her.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a film, the villain is shown from a low angle as he steps out of the shadows. What effect does this angle have?',
          choices: [
            'He seems powerful and threatening',
            'He seems small, weak and afraid',
            'He seems calm, neutral and natural',
            'He seems far from the audience',
          ],
          answer: 0,
          working: 'A low angle looks up at the subject, which makes it seem large, powerful or threatening.',
        },
      ],
      lines: [
        { say: 'Your turn. In a film, the villain is shown from a low angle as he steps out of the shadows. What effect does this angle have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A low angle looks up at the subject, so the villain seems powerful and threatening, and the audience feels small beside him.', show: 'q.answer' },
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
            'Shots range from the extreme long shot to the extreme close-up.',
            'A high angle makes a subject weak; a low angle makes it powerful.',
            'Diegetic sound comes from the story world; non-diegetic sound is for the audience.',
            'Always explain the effect, not just the name.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Shots range from the extreme long shot, showing a whole landscape, to the extreme close-up, showing one detail.', show: 'sum.0' },
        { say: 'A high angle makes a subject seem weak, and a low angle makes it seem powerful.', show: 'sum.1' },
        { say: 'Diegetic sound comes from the story world, while non-diegetic sound is for the audience only.', show: 'sum.2' },
        { say: 'And always explain the effect of a technique, not just its name.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
