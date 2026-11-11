import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-7-2',
  lessonId: 'e7-7-2',
  title: 'The Essay',
  summary:
    'An essay explains or argues one main point. Its thesis states that point and should be specific and, for an argument, arguable, while the introduction hooks the reader, each body paragraph makes one point, and the conclusion restates the thesis with no new arguments.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Essay', subtitle: 'Paragraphs working together' }],
      lines: [
        { say: 'An essay is a group of paragraphs working together to explain or argue one main point.', show: 'title' },
        { say: 'If a paragraph is a brick, an essay is a small building. In this video we learn how to write its most important sentence, the thesis, and how its three parts fit together.' },
      ],
    },
    {
      chapter: 'The thesis statement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Thesis statement', md: 'A **thesis statement** is one or two sentences, usually at the end of the introduction, that state the **main point** of the whole essay.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**specific**: *Team sports teach cooperation, discipline and resilience*, not *Sports are good*', '**arguable**: a reader could disagree with it', 'often a **preview** of the main reasons'],
        },
      ],
      lines: [
        { say: 'A thesis statement is one or two sentences, usually at the end of the introduction, that state the main point of the whole essay.', show: 'def' },
        { say: 'A strong thesis is specific. Team sports teach young people cooperation, discipline and resilience, is much stronger than sports are good.', show: 'b.0' },
        { say: 'For an argument essay, it is arguable: something a reader could disagree with, not a plain fact.', show: 'b.1' },
        { say: 'And it often previews the main reasons, which become the body paragraphs.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Weak and strong',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Weak', 'Why', 'Stronger'],
          rows: [
            ['*This essay is about cooking classes.*', 'announces a topic', '*Schools should offer cooking classes because they teach health, budgeting and independence.*'],
            ['*Zoos keep animals in enclosures.*', 'a fact, not arguable', '*Zoos do more good than harm for endangered animals.*'],
            ['*Technology is good and bad.*', 'too vague', '*Video games can improve problem-solving skills.*'],
          ],
        },
      ],
      lines: [
        { say: 'This essay is about cooking classes only announces a topic. A stronger thesis makes a point and previews the reasons: schools should offer cooking classes because they teach health, budgeting and independence.', show: 't', focus: 't.0' },
        { say: 'Zoos keep animals in enclosures is a fact, so no one could argue with it. Zoos do more good than harm for endangered animals can be argued.', focus: 't.1' },
        { say: 'And technology is good and bad is too vague. Video games can improve problem-solving skills is specific.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Introduction, body and conclusion',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'What it does'],
          rows: [
            ['**Introduction**', 'a **hook** to grab the reader, brief background, then the **thesis**'],
            ['**Body paragraphs**', 'each makes **one point** for the thesis, with a topic sentence, evidence and explanation'],
            ['**Conclusion**', 'restates the thesis **in new words**, sums up, and ends with a final thought'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'No new arguments in the conclusion', md: 'If you think of a brand-new argument while writing the conclusion, it belongs in a **body paragraph** instead.' },
      ],
      lines: [
        { say: 'An essay has three parts. The introduction opens with a hook to grab the reader, gives brief background, and ends with the thesis.', show: 't', focus: 't.0' },
        { say: 'Each body paragraph makes one point that supports the thesis, with a topic sentence, evidence and explanation.', focus: 't.1' },
        { say: 'And the conclusion restates the thesis in new words, sums up the main points, and ends with a final thought or a call to action.', focus: 't.2' },
        { say: 'Watch out for one mistake. If you think of a brand-new argument while writing the conclusion, it belongs in a body paragraph instead.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Have you ever wondered where your rubbish goes? Every year, millions of tonnes end up in landfill. Our town should introduce weekly food-waste collections.” Which sentence is the thesis of this introduction?',
          choices: [
            'Have you ever wondered where your rubbish goes?',
            'Every year, millions of tonnes end up in landfill.',
            'Our town should introduce weekly food-waste collections.',
            'There is no thesis.',
          ],
          answer: 2,
          working: 'The question is a hook and the landfill figure is background. “Our town should…” states the arguable main point, at the end of the introduction.',
        },
      ],
      lines: [
        { say: 'Your turn. Here is the introduction to an essay about food waste. Which sentence is the thesis? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Have you ever wondered is a hook, and the landfill figure is background. Our town should introduce weekly food-waste collections states the arguable main point, so it is the thesis.', show: 'q2.answer' },
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
            'The **thesis** states the main point; make it specific and arguable.',
            'The **introduction** has a hook, background and the thesis.',
            'Each **body paragraph** makes one point with evidence.',
            'The **conclusion** restates the thesis in new words, with no new arguments.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The thesis states the main point of the essay. Make it specific and, for an argument, arguable.', show: 'sum.0' },
        { say: 'The introduction has a hook, some background, and the thesis.', show: 'sum.1' },
        { say: 'Each body paragraph makes one point, with evidence.', show: 'sum.2' },
        { say: 'And the conclusion restates the thesis in new words and ends strongly, with no new arguments.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
