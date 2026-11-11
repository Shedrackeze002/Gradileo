import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-3-2',
  lessonId: 'e6-3-2',
  title: 'Text Structure and Graphic Organizers',
  thumbnailTitle: 'Text Structure',
  summary:
    'Non-fiction is organized in five main structures: description, sequence, compare and contrast, cause and effect, and problem and solution. Signal words give clues, and a matching graphic organizer helps you take notes.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Text Structure', subtitle: 'Five patterns, and how to take notes on them' }],
      lines: [
        { say: 'Writers of non-fiction organize their ideas in patterns.', show: 'title' },
        { say: 'Spotting the pattern tells you what kind of information to look for, and a diagram that matches it helps you take notes. In this lesson, you will learn both.' },
      ],
    },
    {
      chapter: 'Five text structures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Text structure', md: 'A **text structure** is the pattern a writer uses to organize ideas. **Signal words** give clues to it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Structure', 'What it does', 'Signal words'],
          rows: [
            ['**Description**', 'what something is like', '*for example, such as, also*'],
            ['**Sequence**', 'steps or events in order', '*first, next, then, finally*'],
            ['**Compare and contrast**', 'how things are alike or differ', '*both, similarly, however, unlike*'],
            ['**Cause and effect**', 'why it happens, what it causes', '*because, as a result, therefore*'],
            ['**Problem and solution**', 'a problem and its solution', '*problem, solve, to fix this*'],
          ],
        },
      ],
      lines: [
        { say: 'A text structure is the pattern a writer uses to organize ideas. Signal words give clues to it.', show: 'def' },
        { say: 'Description tells what something is like: its features, parts or qualities.', show: 't', focus: 't.0' },
        { say: 'Sequence gives steps or events in time order.', focus: 't.1' },
        { say: 'Compare and contrast shows how things are alike and different.', focus: 't.2' },
        { say: 'Cause and effect explains why something happens, and what it leads to.', focus: 't.3' },
        { say: 'And problem and solution presents a problem, and how it is, or could be, solved.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Naming the structure',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The school car park was jammed every morning. **To fix this**, the school started a “walking bus”: parents take turns walking groups of children to school. Now there are far fewer cars.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Look at the whole text', md: 'A description of pandas might use *because* once, but that does not make it cause and effect. Choose the structure of the **whole** passage.' },
      ],
      lines: [
        { say: 'What is the structure of this passage?', show: 'q' },
        { say: 'The first sentence names a problem, a jammed car park. To fix this introduces a solution, and the last sentence gives the result. So it is problem and solution.', focus: 'q' },
        { say: 'Here is a common mistake. A description of pandas might use the word because once, but that does not make it cause and effect. Choose the structure that organizes the whole passage, not one sentence.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Graphic organizers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Graphic organizer', md: 'A **graphic organizer** is a diagram for taking notes, shaped to match a text’s structure.' },
        {
          kind: 'table',
          id: 't',
          head: ['Structure', 'Graphic organizer'],
          rows: [
            ['Description', 'a **web**: the topic in the centre, details around it'],
            ['Sequence', 'a **timeline** or numbered **flow chart**'],
            ['Compare and contrast', 'a **Venn diagram** or a **T-chart**'],
            ['Cause and effect', 'a **chain** of boxes, with arrows from causes to effects'],
            ['Problem and solution', 'a **chart**: the problem, the solutions, the result'],
          ],
        },
      ],
      lines: [
        { say: 'A graphic organizer is a diagram for taking notes, shaped to match a text’s structure.', show: 'def' },
        { say: 'For description, use a web, with the topic in the centre and details around it. For sequence, use a timeline or a numbered flow chart.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'For compare and contrast, use a Venn diagram, two overlapping circles, or a T-chart.', focus: 't.2' },
        { say: 'For cause and effect, use a chain of boxes, with arrows from causes to effects. And for problem and solution, use a chart with the problem, the solutions, and the result.', focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A passage explains that a river flooded, so farmers planted late, so the harvest was small. Which graphic organizer fits best?',
          choices: ['A Venn diagram', 'A cause-and-effect chain', 'A web', 'A T-chart'],
          answer: 1,
          working: 'Each event causes the next one: flood → late planting → small harvest.',
        },
      ],
      lines: [
        { say: 'Your turn. Which graphic organizer fits this passage best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, a cause-and-effect chain. Each event causes the next one: the flood leads to late planting, which leads to a small harvest.', show: 'q2.answer' },
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
            'Five structures: description, sequence, compare and contrast, cause and effect, problem and solution.',
            'Signal words give clues, but choose the structure of the whole text.',
            'Match the organizer: web, timeline, Venn diagram, chain or problem-solution chart.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The five structures are description, sequence, compare and contrast, cause and effect, and problem and solution.', show: 'sum.0' },
        { say: 'Signal words give clues, but choose the structure of the whole text.', show: 'sum.1' },
        { say: 'And match the organizer to the structure: a web, a timeline, a Venn diagram, a chain, or a problem and solution chart.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
