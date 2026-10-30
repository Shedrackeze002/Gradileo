import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-3-2',
  lessonId: 'e11-3-2',
  title: 'Macbeth: Plot, Characters and Motive',
  thumbnailTitle: 'Macbeth: Plot and Motive',
  thumbnail: false,
  summary:
    'Meet the main characters of Macbeth, follow the plot act by act, and explain why Macbeth acts: ambition before the murder, fear once he is king. Banquo and Macduff are foils who show him by contrast.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Macbeth', title: 'Plot, Characters and Motive', subtitle: 'Why do they do it?' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I have no spur', 'To prick the sides of my intent, but only', 'Vaulting ambition, which o’erleaps itself', 'And falls on th’ other—'],
          by: 'Macbeth, Act 1, Scene 7',
        },
      ],
      lines: [
        { say: 'King Duncan is a guest in Macbeth’s castle. While the King dines, Macbeth slips away and argues with himself about murdering him.', show: 'title' },
        { say: 'He finds many reasons not to do it, and only one reason to go ahead. A spur pricks a horse to make it run, and Macbeth’s only spur is ambition.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'In this lesson, you will meet the characters, follow the events act by act, and explain why the characters act as they do.' },
      ],
    },
    {
      chapter: 'The people and the story',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Macbeth**: a brave general who murders King Duncan and takes the crown',
            '**Lady Macbeth**: his wife, who urges him on',
            '**Banquo**: a general whose descendants the Witches say will be kings',
            '**Macduff**: the Thane of Fife, who at last kills Macbeth',
          ],
        },
        {
          kind: 'bullets',
          id: 'acts',
          items: ['Acts 1 and 2: the prophecy, and the murder of Duncan', 'Act 3: the murder of Banquo, and his ghost', 'Act 4: the murder of Macduff’s family', 'Act 5: Lady Macbeth’s sleepwalking, and Macbeth’s death'],
        },
      ],
      lines: [
        { say: 'Macbeth is a brave general. His wife, Lady Macbeth, urges him on. Banquo fights beside him, and the Witches tell Banquo that his descendants will be kings.', show: ['b.0', 'b.1', 'b.2'], focus: ['b.0', 'b.1', 'b.2'] },
        { say: 'Macduff is the Thane of Fife, who discovers Duncan’s body and in the end kills Macbeth.', show: 'b.3', focus: 'b.3' },
        { say: 'In the first two acts, the Witches hail Macbeth as a future king, and he murders Duncan in his sleep. In Act 3, Macbeth has Banquo murdered, but Banquo’s son Fleance escapes.', hide: 'b', show: ['acts.0', 'acts.1'], focus: ['acts.0', 'acts.1'] },
        { say: 'In Act 4, he has Macduff’s wife and children killed. In Act 5, Lady Macbeth walks in her sleep and dies, and Macduff kills Macbeth, so that Duncan’s son Malcolm becomes king.', show: ['acts.2', 'acts.3'], focus: ['acts.2', 'acts.3'] },
      ],
    },
    {
      chapter: 'Why do they do it?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motive', md: 'The **reason** behind a character’s action.' },
        { kind: 'quote', id: 'q1', size: 'md', lines: ['When you durst do it, then you were a man;', 'And, to be more than what you were, you would', 'Be so much more the man.'], by: 'Lady Macbeth, Act 1, Scene 7' },
        { kind: 'quote', id: 'q2', size: 'md', lines: ['To be thus is nothing,', 'But to be safely thus.'], by: 'Macbeth, Act 3, Scene 1' },
      ],
      lines: [
        { say: 'A motive is the reason behind a character’s action. Before the murder, Macbeth’s motive is ambition, and Lady Macbeth knows how to push him. When he tries to back out, she attacks his pride as a man.', show: ['def', 'q1.0', 'q1.1', 'q1.2'] },
        { say: 'Once he is king, his motive changes. Ambition gives way to fear, and every murder is meant to make him safe.', hide: 'q1', show: ['q2.0', 'q2.1'] },
      ],
    },
    {
      chapter: 'Foils',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Foil', md: 'A character whose **contrast** with another makes that character’s qualities stand out.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Banquo** hears the Witches too, but resists the thoughts they bring.', '**Macduff** answers “Dispute it like a man” with grief: “But I must also feel it as a man”.'],
        },
      ],
      lines: [
        { say: 'A foil is a character whose contrast with another makes that character’s qualities stand out.', show: 'def' },
        { say: 'Banquo hears the Witches too, and he is tempted. But he prays against the thoughts, while Macbeth acts on his.', show: 'b.0', focus: 'b.0' },
        { say: 'Macduff is a foil of another kind. Lady Macbeth said a man dares to kill. When Macduff hears that his family is dead, he says a man must also feel it.', show: 'b.1', focus: 'b.1' },
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
          title: 'A motive is not a result',
          md: 'Macbeth does not kill Banquo “because Fleance escapes”: Fleance escapes **during** the murder. Your reason must come before the action.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. A motive is why a character acts, not what happens afterwards.', show: 'm' },
        { say: 'Macbeth does not kill Banquo because Fleance escapes. Fleance escapes during the murder. Check that the reason you give comes before the action.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why does Macbeth have Banquo murdered?',
          choices: [
            'Because Fleance escapes while Banquo is killed.',
            'Because Lady Macbeth taunts him about his manhood.',
            'Because he fears the Witches’ promise to Banquo.',
            'Because Banquo refuses to come to the banquet.',
          ],
          answer: 2,
          working: 'Macbeth fears the Witches’ promise that Banquo’s descendants will be kings. That reason comes before the murder.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does Macbeth have Banquo murdered? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Macbeth fears the Witches’ promise to Banquo, and that reason comes before the murder. Choice A is a result, not a motive.', show: 'q2.answer' },
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
            'Ambition drives Macbeth before the murder; fear drives him once he is king.',
            'A motive is a reason that comes before the action.',
            'Banquo and Macduff are foils to Macbeth.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Ambition drives Macbeth before the murder, and once he is king, fear drives him to murder again.', show: 'sum.0' },
        { say: 'A motive is the reason for an action, and it comes before the action.', show: 'sum.1' },
        { say: 'Banquo, who resists temptation, and Macduff, who feels grief as a man, are foils to Macbeth.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
