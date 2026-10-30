import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-4-3',
  lessonId: 'e11-4-3',
  title: 'Satire and Its Tools',
  thumbnailTitle: 'Satire',
  thumbnail: false,
  summary:
    'Satire uses humour, irony and exaggeration to criticize a target that may not be what the words seem to be about. Learn its five tools, and never read a satire literally.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'The Essay and Rhetoric', title: 'Satire and Its Tools', subtitle: 'Finding the target' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed, is, at a year old, a most delicious nourishing and wholesome food, whether stewed, roasted, baked, or boiled …'],
          by: 'Jonathan Swift, “A Modest Proposal” (1729)',
        },
      ],
      lines: [
        { say: 'In seventeen twenty-nine, with Ireland in the grip of famine, a pamphlet appeared that calmly proposed a solution to Irish poverty.', show: ['title', 'q'] },
        { say: 'Swift did not want anyone to eat children. He wanted readers to be so horrified by his narrator’s cool reasoning that they would see how coldly the poor were already being treated. That is satire. In this lesson, you will find the target of a satire and name its tools.' },
      ],
    },
    {
      chapter: 'The target',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Satire', md: 'Humour, irony, exaggeration or mock seriousness used to **criticize** a **target**: a person, group, institution or idea.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['I grant this food will be somewhat dear, and therefore very proper for landlords, who, as they have already devoured most of the parents, seem to have the best title to the children.'],
          by: 'Jonathan Swift, “A Modest Proposal” (1729)',
        },
      ],
      lines: [
        { say: 'Satire aims not only to amuse but to make readers judge its target. And the target is not always what the words seem to be about.', show: 'def' },
        { say: 'Swift’s pamphlet seems to be about cooking children, but its target is the landlords and rulers who let the poor starve. To say that landlords have devoured most of the parents is to accuse them of consuming the poor through rents and greed.', show: 'q', hide: 'def' },
      ],
    },
    {
      chapter: 'The tools of satire',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Verbal irony**: says the opposite of what it means',
            '**Exaggeration**: stretches a fault until it is absurd',
            '**Understatement**: treats something serious as minor',
            '**Parody**: imitates a kind of text to mock its subject',
            '**Mock seriousness**: treats something trivial in a solemn way',
          ],
        },
      ],
      lines: [
        { say: 'Satire has five main tools. Verbal irony says the opposite of what the writer means, often as mock praise.', show: 'b.0', focus: 'b.0' },
        { say: 'Exaggeration stretches a fault until it becomes absurd. Understatement describes something serious as if it were minor.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Parody imitates the style of a recognizable kind of text, such as a recipe, in order to mock its subject. And mock seriousness treats something trivial in a grave, solemn manner.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
        { say: 'The tools overlap, so name the one doing most of the work.', focus: 'b' },
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
          title: 'Reading satire literally',
          md: 'Do not take a satirist at their word. If a text proposes something monstrous in a calm voice, ask what the writer really wants you to **think**.',
        },
      ],
      lines: [
        { say: 'Here is the most common mistake: taking a satirist at their word.', show: 'm' },
        { say: 'Swift does not want children eaten, and Stephen Leacock does not admire a man who dumb-belled himself to death. If a text praises something absurd, or proposes something monstrous in a calm voice, ask what the writer really wants you to think.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A school board solemnly announces, after eighteen months of study, that the lunch queue will form on the left. Which tool is this?',
          choices: [
            'Verbal irony, because it says the opposite of its meaning.',
            'Exaggeration, because it stretches a fault until absurd.',
            'Mock seriousness, because it treats a small thing solemnly.',
            'Understatement, because it describes a disaster as minor.',
          ],
          answer: 2,
          working: 'The joke lies in the gap between the solemn manner and the trivial matter. The target is school boards that waste time on trivial things.',
        },
      ],
      lines: [
        { say: 'Your turn. A school board solemnly announces, after eighteen months of study, that the lunch queue will form on the left. Which tool does it mainly use? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The joke lies in the gap between the solemn manner and the trivial matter. Its target is school boards that waste time on small things.', show: 'q2.answer' },
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
            'Satire criticizes a target, which may not be what the words seem to be about.',
            'Its tools are irony, exaggeration, understatement, parody and mock seriousness.',
            'Never read satire literally.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Satire uses humour, irony and exaggeration to criticize a target, which may not be what the words seem to be about.', show: 'sum.0' },
        { say: 'Its main tools are verbal irony, exaggeration, understatement, parody and mock seriousness.', show: 'sum.1' },
        { say: 'And never read satire literally. Ask whom the writer wants you to judge, and why.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
