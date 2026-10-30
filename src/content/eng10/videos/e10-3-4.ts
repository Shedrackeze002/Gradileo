import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-3-4',
  lessonId: 'e10-3-4',
  title: 'Themes',
  thumbnail: false,
  summary:
    'The themes of Romeo and Juliet include hatred, love, haste and fate. Learn to write a theme statement and to support a claim with a quotation and an explanation.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare', title: 'Themes', subtitle: 'The big ideas of Romeo and Juliet' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['See what a scourge is laid upon your hate,', 'That heaven finds means to kill your joys with love!', 'And I, for winking at your discords too,', 'Have lost a brace of kinsmen. All are punish’d.'] },
      ],
      lines: [
        { say: 'At dawn, the Prince stands over the bodies of Romeo and Juliet and speaks to their fathers. See what a scourge is laid upon your hate. All are punish’d.', show: ['title', 'q'] },
        { say: 'The feud has cost every family in Verona. Lines like these point to the play’s themes, the ideas about life that it explores. In this lesson, you will state themes as complete ideas, and support claims with well-chosen quotations.' },
      ],
    },
    {
      chapter: 'The big ideas',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Topic', 'A line that shows it'],
          rows: [
            ['Hatred and the feud', '“A plague o’ both your houses.”'],
            ['Love', '“My only love sprung from my only hate!”'],
            ['Haste', '“Wisely and slow; they stumble that run fast.”'],
            ['Fate and chance', '“O, I am fortune’s fool!”'],
          ],
        },
      ],
      lines: [
        { say: 'A play this rich has several themes, all tangled together. Here are four.', show: 't.0' },
        { say: 'Hatred passed down through families destroys the innocent along with the guilty. Mercutio cries: A plague o’ both your houses.', focus: 't.0' },
        { say: 'Love can grow across the deepest divisions. Juliet says: My only love sprung from my only hate!', show: 't.1', focus: 't.1' },
        { say: 'Friar Lawrence warns about haste: Wisely and slow; they stumble that run fast. And when luck turns against Romeo, he says: O, I am fortune’s fool!', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Writing a theme statement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme statement', md: 'A complete sentence about life or people in general that the play supports. A topic such as “hatred” is not a theme.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Collect the evidence: the lovers marry within a day of meeting', 'Ask what the play suggests: each rushed decision brings disaster closer', '**Acting in haste, without stopping to think, can lead to disaster.**'],
        },
      ],
      lines: [
        { say: 'A theme statement is a complete sentence that says what the play suggests about life or people in general. A topic, such as hatred, is not a theme. A theme says something about the topic.', show: 'def' },
        { say: 'Let’s write one about haste. First, collect the evidence. The lovers marry within a day of meeting, and Capulet moves the wedding forward a day.', show: 'steps.0' },
        { say: 'Next, ask what the play suggests. Each rushed decision brings disaster closer, and there is never time to stop and think.', show: 'steps.1' },
        { say: 'Now turn that into a general statement, with no names, orders or absolutes: acting in haste, without stopping to think, can lead to disaster.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Quotations as evidence',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'cqe',
          items: ['**Claim:** what you are arguing', '**Quotation:** the words that prove it, with act and scene', '**Explanation:** how the words prove the claim'],
        },
      ],
      lines: [
        { say: 'To support a claim about the play, use three parts.', show: 'cqe.0' },
        { say: 'The claim is what you are arguing. The quotation is the short set of words that proves it, with its act and scene.', show: 'cqe.1', focus: 'cqe.1' },
        { say: 'The explanation says how those words prove the claim. A quotation from the right scene, or the right character, is not enough on its own. It must prove the claim.', show: 'cqe.2', focus: 'cqe.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Summaries and morals are not themes', md: 'A retelling of the plot, an order such as “Never marry in a hurry”, and an absolute such as “Feuds always end in death” are **not** theme statements.' },
      ],
      lines: [
        { say: 'Here are three common mistakes. A retelling of the plot is a summary, not a theme.', show: 'mis' },
        { say: 'An order, such as never marry in a hurry, is a moral. And a sweeping claim, such as feuds always end in death, is an absolute that the play does not prove.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a theme statement about Romeo and Juliet?',
          choices: [
            'Romeo and Juliet marry only a day after they first meet.',
            'Always stop and think carefully before making any decision.',
            'Hatred passed down in families destroys the innocent.',
            'Every feud in every family always ends in tragedy.',
          ],
          answer: 2,
          working: 'Choice C is a general idea the play supports. A is a plot summary, B is an order, and D is an absolute.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a theme statement about Romeo and Juliet? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It is a general idea that the play supports. Choice A only retells the plot, Choice B gives an order, and Choice D is an absolute.', show: 'q.answer' },
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
            'Themes include hatred, love, haste, and fate and chance.',
            'A theme statement is a complete, general sentence: not a topic, a summary, an order or an absolute.',
            'Support each claim with a short quotation, its act and scene, and an explanation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The play explores hatred, love, haste, and fate and chance.', show: 'sum.0' },
        { say: 'A theme statement is a complete, general sentence that the play supports.', show: 'sum.1' },
        { say: 'And every claim needs a short quotation, its act and scene, and an explanation of how the words prove the claim.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
