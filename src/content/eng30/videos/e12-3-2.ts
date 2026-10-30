import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-3-2',
  lessonId: 'e12-3-2',
  title: 'Hamlet: Plot, Characters and Motives',
  thumbnailTitle: 'Hamlet: Plot',
  thumbnail: false,
  summary:
    'Hamlet, Laertes and Fortinbras are all sons with murdered fathers. Follow who is who and what happens in each act, then explain a character’s motive with evidence, trusting private words over public ones.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Hamlet', title: 'Plot, Characters and Motives', subtitle: 'Who they are, and why they act' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The serpent that did sting thy father’s life', 'Now wears his crown.'],
          by: 'The Ghost, Act 1, Scene 5',
        },
      ],
      lines: [
        { say: 'Alone with Hamlet on the battlements, the Ghost of the dead King reveals how he really died.', show: ['title', 'q.0', 'q.1'] },
        { say: 'From this moment Hamlet has a secret, a duty and a terrible doubt. In this lesson, you will follow who the characters are and what happens in each act, and then explain why the characters act as they do, with evidence.' },
      ],
    },
    {
      chapter: 'Who’s who',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Hamlet**: his father is murdered; he must avenge him',
            '**Laertes**: Hamlet kills his father, Polonius',
            '**Fortinbras**: Hamlet’s father killed his father',
          ],
        },
      ],
      lines: [
        { say: 'Hamlet is the Prince of Denmark. Claudius, his uncle, murdered the old King, and married the widow, Gertrude, who is Hamlet’s mother.' },
        { say: 'Two families stand at the centre. Hamlet’s father is murdered, and Hamlet is asked to avenge him.', show: 'b.0' },
        { say: 'Then Hamlet kills Polonius, the King’s talkative counsellor, and Polonius’s son, Laertes, sets out to avenge his father. Fortinbras, the Prince of Norway, also has a father to avenge. The play sets these three sons side by side.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'The play, act by act',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Act 1**: the Ghost’s revelation',
            '**Act 2**: the court watches Hamlet; the actors arrive',
            '**Act 3**: the play, the prayer, the death of Polonius',
            '**Act 4**: England, Ophelia’s madness, the plot',
            '**Act 5**: the graveyard and the fatal fencing match',
          ],
        },
      ],
      lines: [
        { say: 'In Act 1, the Ghost tells Hamlet that Claudius poisoned him. In Act 2, spies watch Hamlet, and a company of actors arrives.', show: ['b.0', 'b.1'] },
        { say: 'In Act 3, the play tests the King, Hamlet spares him at prayer, and then stabs Polonius through a tapestry. In Act 4, Ophelia goes mad with grief, and Claudius and Laertes plot against Hamlet.', show: ['b.2', 'b.3'] },
        { say: 'And in Act 5, after the graveyard, the fencing match kills Gertrude, Laertes, Claudius and Hamlet himself.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Motives',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Motive', md: 'The reason behind a character’s action: what they want, fear or believe.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Can serve my turn? Forgive me my foul murder!', 'That cannot be; since I am still possess’d', 'Of those effects for which I did the murder,—', 'My crown, mine own ambition, and my queen.'],
          by: 'Claudius, Act 3, Scene 3',
        },
      ],
      lines: [
        { say: 'A motive is the reason behind an action. To explain one, find what the character says or does, and then the evidence for why.', show: 'def' },
        { say: 'The richest evidence often comes when a character is alone. In public, Claudius is the calm, wise King. Alone, he tries to pray, and finds that he cannot.', show: ['q.0', 'q.1'] },
        { say: 'His guilt is real, but so is his motive. He will not give up what the murder won him.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Taking a public speech at face value', md: 'Check a character’s public words against what they say **alone**, or in an aside.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not take a public speech at face value.', show: 'm' },
        { say: 'When Claudius tells Hamlet that endless mourning is unmanly grief, he speaks as a king in front of his court, and he has every reason to want Hamlet to stop brooding. Check public words against what a character says alone.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Alone at prayer, Claudius says he still has “My crown, mine own ambition, and my queen.” What does this show?',
          choices: [
            'He wants forgiveness most, so he will give up his crown.',
            'He wants Hamlet to rule, so he hopes to hand over the crown.',
            'He wants to confess, so he will tell the court the truth.',
            'He wants to keep what the murder won, so he cannot truly repent.',
          ],
          answer: 3,
          working: 'Alone, Claudius reveals his real motive: he will not give up the crown, the ambition and the queen that the murder won him.',
        },
      ],
      lines: [
        { say: 'Your turn. Alone at prayer, Claudius says he still has his crown, his ambition and his queen. What does this show? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Alone, Claudius reveals his real motive. He will not give up the crown, the ambition and the queen that the murder won him.', show: 'q2.answer' },
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
            'Hamlet, Laertes and Fortinbras are sons whose fathers were killed.',
            'Five acts: revelation, watching, the play and the prayer, England, the fencing match.',
            'A motive needs evidence; trust private words over public ones.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hamlet, Laertes and Fortinbras are all sons whose fathers have been killed, so the play sets their responses side by side.', show: 'sum.0' },
        { say: 'The five acts move from the Ghost’s revelation, to the watching court, the play and the prayer, to England, and finally the fencing match.', show: 'sum.1' },
        { say: 'And a motive is the reason behind an action. Support it with evidence, and trust what characters say alone more than what they say in public.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
