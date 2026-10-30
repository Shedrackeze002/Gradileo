import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-3-4',
  lessonId: 'e11-3-4',
  title: 'Macbeth: Tragedy and Themes',
  thumbnailTitle: 'Macbeth: Tragedy',
  thumbnail: false,
  summary:
    'Use Aristotle’s ideas of tragedy to explain Macbeth’s fall: his hamartia is ambition, his hubris is blind trust in the apparitions, and the audience feels pity and fear. Then write strong theme statements with quotations as evidence.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Macbeth', title: 'Tragedy and Themes', subtitle: 'The fall of a great man' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Tomorrow, and tomorrow, and tomorrow,', 'Creeps in this petty pace from day to day,', 'To the last syllable of recorded time;'],
          by: 'Macbeth, Act 5, Scene 5',
        },
      ],
      lines: [
        { say: 'Malcolm’s army is marching on Dunsinane when a cry of women goes up inside the castle. Macbeth hears that the Queen is dead, and he answers with the most famous speech in the play.', show: ['title', 'q.0', 'q.1', 'q.2'] },
        { say: 'The brave general of Act 1 now sees life as an empty show. In this lesson, you will use the ideas of tragedy to explain how he got there, and then state and support the play’s themes.' },
      ],
    },
    {
      chapter: 'Macbeth as a tragic hero',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Tragic hero**: a great person who falls through a flaw of their own',
            '**Hamartia**: the flaw that causes the fall. For Macbeth, ambition.',
            '**Hubris**: overconfident pride. For Macbeth, trust in the apparitions.',
            '**Recognition**: the moment the hero sees the truth',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['And be these juggling fiends no more believ’d'], by: 'Macbeth, Act 5, Scene 8' },
      ],
      lines: [
        { say: 'The Greek thinker Aristotle described the pattern of a tragedy. A tragic hero is a person of high standing and real greatness who falls to ruin through a flaw of their own.', show: 'b.0', focus: 'b.0' },
        { say: 'Hamartia is that flaw, the thing that leads to the downfall. For Macbeth, it is his ambition. Hubris is one kind of flaw, excessive pride. Near the end, Macbeth is blindly confident in the promises of the apparitions.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Recognition is the moment the hero realizes the truth. Macbeth reaches it when he sees that the Witches deceived him.', show: ['b.3', 'q'], focus: 'b.3' },
      ],
    },
    {
      chapter: 'Pity and fear',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Yet I will try the last. Before my body', 'I throw my warlike shield: lay on, Macduff;'],
          by: 'Macbeth, Act 5, Scene 8',
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Catharsis', md: 'The release of **pity and fear** that the audience feels at the end of a tragedy.' },
      ],
      lines: [
        { say: 'Macbeth knows he is doomed, yet he refuses to surrender.', show: ['q.0', 'q.1'] },
        { say: 'We have heard his conscience, his terror and his despair, so we feel pity for the man he might have been, and fear, because his ambition is a very human one. That mixture is the catharsis Aristotle described.', show: 'def' },
      ],
    },
    {
      chapter: 'Themes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme statement', md: 'A complete, **general** sentence about what the play suggests about life. A topic such as “guilt” is not a theme.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Topic:** ambition', '**Theme:** Ambition without conscience destroys the person it drives.'],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Vaulting ambition, which o’erleaps itself'], by: 'Macbeth, Act 1, Scene 7' },
      ],
      lines: [
        { say: 'The play explores ambition, guilt, appearance and reality, fate and free will, tyranny, manhood and violence. But a topic is not a theme.', show: 'def' },
        { say: 'A theme statement is a complete sentence that says what the play suggests about life in general. It uses no character names, and it avoids orders and absolutes.', focus: 'def' },
        { say: 'The topic is ambition. The theme is that ambition without conscience destroys the person it drives. Then support it with a quotation spoken at the right moment.', show: ['b.0', 'b.1', 'q'] },
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
          title: 'Hamartia and hubris are not the same',
          md: '**Hamartia** is the flaw that brings the hero down: for Macbeth, ambition. **Hubris** is one kind of flaw, overconfident pride.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Hamartia and hubris are not the same thing.', show: 'm' },
        { say: 'Hamartia is the flaw or error that brings the hero down. For Macbeth, that is ambition. Hubris is only one particular kind of flaw, and he shows it near the end, when he believes that none of woman born can harm him.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the strongest theme statement about Macbeth?',
          choices: [
            'Guilty people always lose their minds in the end.',
            'Never trust a prophecy that promises you a crown.',
            'Macbeth shows how ambition and guilt ruin a king.',
            'Ambition without a conscience destroys the one it drives.',
          ],
          answer: 3,
          working: 'A strong theme statement is a general sentence with no character names, no orders and no absolutes, and the play supports it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest theme statement about Macbeth? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. It is general, and it has no names, orders or absolutes. Choices A, B and C break those rules.', show: 'q2.answer' },
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
            'Macbeth is a tragic hero: his hamartia is ambition and his hubris is blind trust.',
            'Catharsis is the pity and fear the audience feels.',
            'A theme statement is a general sentence the play supports.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tragic hero is a great person who falls through a flaw of their own. Macbeth’s hamartia is ambition, and his hubris is his blind trust in the apparitions.', show: 'sum.0' },
        { say: 'Catharsis is the pity and fear that the audience feels at the end.', show: 'sum.1' },
        { say: 'And a theme statement is a complete, general sentence that the play supports, with a quotation spoken at the right moment.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
