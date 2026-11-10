import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-1-2',
  lessonId: 'e8-1-2',
  title: 'Irony',
  summary:
    'Irony is a gap between what is said or expected and what is really true. Verbal irony says the opposite of what is meant, situational irony reverses what we expect, and dramatic irony lets the audience know what a character does not.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Irony', subtitle: 'The gap between what seems and what is' }],
      lines: [
        { say: 'Irony is one of the most powerful tools a writer has, because it makes readers think twice.', show: 'title' },
        { say: 'In this video we learn to tell the three main kinds of irony apart, and to explain what each one adds to a story.' },
      ],
    },
    {
      chapter: 'Three kinds of irony',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Irony', md: '**Irony** is a gap between what is said or expected and what is really true.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'The gap', 'Example'],
          rows: [
            ['**Verbal**', 'what is said and what is meant', '*“Lovely weather for a picnic,” in pouring rain*'],
            ['**Situational**', 'what we expect and what happens', '*a fire station burns down*'],
            ['**Dramatic**', 'what the audience knows and a character knows', '*we know the cup is poisoned; the king drinks*'],
          ],
        },
      ],
      lines: [
        { say: 'Irony is a gap between what is said or expected, and what is really true. There are three main kinds.', show: 'def' },
        { say: 'Verbal irony is a gap between what a character says and what they mean, like looking at pouring rain and saying, lovely weather for a picnic.', show: 't', focus: 't.0' },
        { say: 'Situational irony is a gap between what we expect to happen and what does happen. A fire station burns down.', focus: 't.1' },
        { say: 'And dramatic irony is a gap between what the audience knows and what a character knows. We know the cup is poisoned, but the king drinks from it cheerfully.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Sarcasm and bad luck',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sarcasm', md: '**Sarcasm** is verbal irony used to mock or hurt: *“Oh, brilliant, you’ve broken it again.”* Not all verbal irony is sarcasm.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Irony is not bad luck', md: 'Rain on your birthday is unlucky, not ironic. Irony needs a clear gap: a forecaster planning an outdoor wedding on the one day she forecast sunshine, only for it to pour.' },
      ],
      lines: [
        { say: 'Sarcasm is verbal irony used to mock or hurt. Oh, brilliant, you’ve broken it again. But not all verbal irony is sarcasm. Irony can also be gentle or funny.', show: 'def' },
        { say: 'Do not confuse irony with bad luck. Rain on your birthday is unlucky, but it is not ironic unless something made us expect the opposite.', show: 'm', focus: 'm' },
        { say: 'A weather forecaster planning an outdoor wedding on the one day she forecast sunshine, only for it to pour, would be situational irony.', focus: 'm' },
      ],
    },
    {
      chapter: 'What irony does',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Its usual effect'],
          rows: [
            ['**Dramatic irony**', 'builds **tension**: we may want to shout a warning'],
            ['**Situational irony**', 'makes a **point about life**: a greedy man is locked in the vault with his treasure'],
            ['**Verbal irony**', 'reveals **character**: humour, bitterness or anger'],
          ],
        },
      ],
      lines: [
        { say: 'Naming the kind of irony is only the first step. The real question is: what does the gap make us feel or understand?', show: 't' },
        { say: 'Dramatic irony builds tension. Because we know what a character does not, we watch every line with a double meaning, and we may want to shout a warning.', focus: 't.0' },
        { say: 'Situational irony can make a point about life. When a greedy man finds treasure and is then locked inside the vault with it, the twist punishes his greed.', focus: 't.1' },
        { say: 'And verbal irony reveals character. What a person says ironically, and why, shows their humour, bitterness or anger.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The Gift of the Magi',
      layout: 'center',
      main: [
        { kind: 'text', id: 's', size: 'md', md: '**Della** sells her long hair to buy a chain for **Jim’s** watch. **Jim** sells his watch to buy combs for **Della’s** hair.' },
        { kind: 'text', id: 'a', size: 'md', md: 'The gifts are useless, but the **love** behind them is not.' },
      ],
      lines: [
        { say: 'O. Henry’s story The Gift of the Magi is built on situational irony. A poor young wife, Della, sells her beautiful long hair to buy a chain for her husband’s watch.', caption: 'O. Henry’s story “The Gift of the Magi” is built on situational irony. A poor young wife, Della, sells her beautiful long hair to buy a chain for her husband’s watch.', show: 's' },
        { say: 'Her husband, Jim, sells his watch to buy her a set of combs for her hair. Each gift is now useless.', focus: 's' },
        { say: 'Each person has sold the very thing the gift was meant for. But the sacrifice shows how much each loves the other. So the irony shows that their love matters more than any object.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In Romeo and Juliet, Romeo finds Juliet lying still and believes she is dead. The audience knows she has only taken a potion that makes her sleep. Which kind of irony is this?',
          choices: ['Verbal irony', 'Sarcasm', 'Situational irony', 'Dramatic irony'],
          answer: 3,
          working: 'The gap is between what the audience knows (she is asleep) and what the character believes (she is dead).',
        },
      ],
      lines: [
        { say: 'Your turn. Romeo believes Juliet is dead, but the audience knows she has only taken a sleeping potion. Which kind of irony is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, dramatic irony. The gap is between what the audience knows and what the character believes, and it fills the scene with tension.', show: 'q2.answer' },
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
            '**Verbal irony**: saying the opposite of what you mean; **sarcasm** mocks.',
            '**Situational irony**: the opposite of what we expect happens.',
            '**Dramatic irony**: the audience knows what a character does not.',
            'Explain the effect: tension, a point about life, or character.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Verbal irony is saying the opposite of what you mean, and sarcasm is verbal irony used to mock.', show: 'sum.0' },
        { say: 'Situational irony is when the opposite of what we expect happens.', show: 'sum.1' },
        { say: 'Dramatic irony is when the audience knows something a character does not.', show: 'sum.2' },
        { say: 'And always explain the effect: dramatic irony builds tension, situational irony makes a point, and verbal irony reveals character.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
