import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-1',
  lessonId: 'e11-6-1',
  title: 'Literary Analysis: Thesis and Commentary',
  thumbnailTitle: 'Thesis and Commentary',
  thumbnail: false,
  summary:
    'Write an analytical thesis that names a writer’s choice and what it shows, test it with “How?” and “So what?”, and write commentary that explains how words work and ties the effect to your point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Literary Analysis', subtitle: 'Thesis and commentary' }],
      lines: [
        { say: 'In Grade ten you learned that an analytical essay asks how a text works, not what happens in it.', show: 'title' },
        { say: 'In Grade eleven the bar rises. A strong analysis names the writer’s choice precisely, explains how it works on a reader, and says why that matters.' },
      ],
    },
    {
      chapter: 'The analytical thesis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Analytical thesis', md: 'An arguable claim about **how** a text creates meaning and **why** it matters. It names a **choice** and the **meaning** that choice creates.' },
        {
          kind: 'bullets',
          id: 'w',
          items: [
            'Freedom and marriage in “The Story of an Hour”',
            '“The Story of an Hour” shows that marriage can take away a woman’s freedom.',
            'Kate Chopin uses imagery, irony and symbolism in “The Story of an Hour”.',
          ],
        },
      ],
      lines: [
        { say: 'An analytical thesis is an arguable claim about how a text creates meaning, and why it matters. It names a choice the writer makes, and the meaning that choice creates.', show: 'def' },
        { say: 'Weak theses fall short in different ways. A topic, like “Freedom and marriage”, is not a claim.', hide: 'def', show: 'w.0', focus: 'w.0' },
        { say: 'Saying that the story shows marriage can take away a woman’s freedom gives a meaning with no how.', show: 'w.1', focus: 'w.1' },
        { say: 'And a list of imagery, irony and symbolism gives devices with no why.', show: 'w.2', focus: 'w.2' },
      ],
    },
    {
      chapter: 'Building a thesis',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 's', items: ['**How?** The spring scene outside the window, in her first hour as a widow', '**So what?** The marriage she mourns had quietly confined her'] },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Through the spring scene outside Mrs. Mallard’s window, Kate Chopin turns an hour of mourning into an awakening, suggesting that the marriage she mourns had quietly confined her.'],
        },
      ],
      lines: [
        { say: 'Let’s strengthen the thesis about marriage. Ask how the story shows it. The turning point comes at the window, where Mrs. Mallard looks out at spring after hearing of her husband’s death.', show: 's.0', focus: 's.0' },
        { say: 'Then ask, so what? What does that choice reveal about her marriage?', show: 's.1', focus: 's.1' },
        { say: 'Join the two, and the thesis survives both questions.', hide: 's', show: 'q' },
      ],
    },
    {
      chapter: 'Commentary that goes deep',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Paraphrase**: repeats the quotation in other words',
            '**Device-spotting**: names a technique and stops',
            '**Word-level effect**: explains how particular words work',
            '**Effect linked to the point**: ties that effect back to the claim',
          ],
        },
      ],
      lines: [
        { say: 'Evidence proves nothing on its own. Your commentary, the analysis after a quotation, does the proving. It can sit on four levels.' },
        { say: 'Paraphrase repeats the quotation in other words. Device-spotting names a technique and stops.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'Word-level effect explains how particular words work. The word “aquiver” makes the trees tremble with barely contained energy.', show: 'b.2', focus: 'b.2' },
        { say: 'Only the fourth level proves your point, because it ties that effect back to the paragraph’s claim.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Naming the device and stopping', md: '“This is a metaphor” earns little credit: every reader can spot a device. Say **which words, what effect, and why it matters to your claim.**' },
      ],
      lines: [
        { say: 'Here is a common mistake. Writing “this is a metaphor” or “Chopin uses imagery” earns little credit, because every reader can spot a device.', show: 'm' },
        { say: 'The marks are in what comes next: which words, what effect, and why it matters to your claim.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is wrong with: “Kate Chopin uses imagery, irony and symbolism in ‘The Story of an Hour’.”?',
          choices: [
            'It only retells the plot of the whole story.',
            'It only praises the story with nothing to prove.',
            'It lists devices but never says why they matter.',
            'It states a meaning but never says how it works.',
          ],
          answer: 2,
          working: 'The sentence names devices but never says what they show. It has no why. A topic or plot summary would be a different fault.',
        },
      ],
      lines: [
        { say: 'Your turn. Here is a thesis: Kate Chopin uses imagery, irony and symbolism in “The Story of an Hour”. What is wrong with it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It lists devices, but never says why they matter. So what do they show?', show: 'q2.answer' },
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
          items: ['An analytical thesis names a choice and what it shows.', 'Test it by asking “How?” and “So what?”.', 'Deep commentary explains how words work and ties the effect to the point.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An analytical thesis names a specific choice the writer makes, and what that choice shows.', show: 'sum.0' },
        { say: 'Test it by asking, how? and so what?', show: 'sum.1' },
        { say: 'And deep commentary explains how particular words work, then ties that effect to the paragraph’s point.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
