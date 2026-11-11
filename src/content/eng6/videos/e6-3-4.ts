import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-3-4',
  lessonId: 'e6-3-4',
  title: 'Author’s Purpose and Point of View',
  thumbnailTitle: 'Purpose and Point of View',
  summary:
    'Authors write to inform, persuade, entertain or give instructions. An author’s point of view is how they feel about their subject, shown by their word choice, and one-sided writing shows bias.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Author’s Purpose and Point of View', subtitle: 'Why they wrote it, and how they feel' }],
      lines: [
        { say: 'Every author writes for a reason, and every author has a view of their subject.', show: 'title' },
        { say: 'Knowing why an author wrote tells you how to read a text, and noticing how they feel helps you judge whether they are being fair.' },
      ],
    },
    {
      chapter: 'The author’s purpose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Author’s purpose', md: 'The **author’s purpose** is the main reason an author writes: to **inform**, **persuade**, **entertain** or **give instructions**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Purpose', 'Clues', 'Example'],
          rows: [
            ['**Inform**', 'neutral words, facts and figures', 'an encyclopedia entry about whales'],
            ['**Persuade**', 'opinion words, *you*, calls to act', 'an advert or a letter to the council'],
            ['**Entertain**', 'a story, humour, vivid description', 'a funny poem or an adventure story'],
            ['**Give instructions**', 'numbered steps, commands', 'a recipe, or a guide to building a kite'],
          ],
        },
      ],
      lines: [
        { say: 'The author’s purpose is the main reason an author writes.', show: 'def' },
        { say: 'To inform is to give the reader facts, in neutral words, like an encyclopedia entry about whales.', show: 't', focus: 't.0' },
        { say: 'To persuade is to change what the reader thinks or does, with opinion words, the word you, and calls to act.', focus: 't.1' },
        { say: 'To entertain is to amuse, thrill or move the reader, with a story, humour or vivid description.', focus: 't.2' },
        { say: 'And to give instructions is to explain how to do something, with numbered steps and commands.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Naming the purpose',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Every plastic bag you refuse is one less bag in the sea. Bring a cloth bag. The turtles are counting on you.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Interesting is not the same as entertaining', md: 'A fascinating article about butterflies may be enjoyable, but its purpose is still to **inform**. Ask what the author **mainly** wants.' },
      ],
      lines: [
        { say: 'What is the purpose of this text?', show: 'q' },
        { say: 'The author speaks directly to the reader, using you, and gives a command: bring a cloth bag. The last line appeals to the reader’s feelings. So the purpose is to persuade.', focus: 'q' },
        { say: 'Here is a common mistake. A fascinating article about monarch butterflies may be enjoyable to read, but its purpose is still to inform. Ask what the author mainly wants: for you to know, do, enjoy, or follow steps.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Point of view and bias',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Point of view and bias', md: 'An author’s **point of view** is how they feel about their subject, shown by their **word choice**. **Bias** is including only the facts that support one side.' },
        {
          kind: 'table',
          id: 't',
          head: ['Neutral', 'Shows a point of view'],
          rows: [
            ['*The council voted to close the park after 6 p.m.*', '*The council’s **unfair** rule **punishes** children who just want to play.*'],
            ['*A new shopping centre opened on Friday.*', '*The **exciting** new centre brings 200 jobs to our town.*'],
          ],
        },
      ],
      lines: [
        { say: 'An author’s point of view is how they feel about their subject. You can usually infer it from their word choice.', show: 'def' },
        { say: 'The council voted to close the park in the evening is neutral. The council’s unfair rule punishes children who just want to play shows that the author disapproves.', show: 't', focus: 't.0' },
        { say: 'And exciting shows that this author is pleased about the new shopping centre.', focus: 't.1' },
        { say: 'When an author feels strongly, they may include only the facts that support their side. This is called bias. Noticing it helps you ask: what might the author have left out?', focus: 'def' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Each year, shops hand out billions of wasteful plastic bags.” What is the author’s point of view on plastic bags?',
          choices: ['The author likes them.', 'The author disapproves of them.', 'The author has no view.', 'The author wants more of them.'],
          answer: 1,
          working: '“Billions” is a fact, but “wasteful” is a judgement: the author disapproves.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the author’s point of view on plastic bags? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Billions is a fact, but wasteful is a judgement. It shows that the author disapproves of plastic bags.', show: 'q2.answer' },
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
            'Authors write to **inform**, **persuade**, **entertain** or **give instructions**.',
            'Ask what the author mainly wants the reader to know, do or feel.',
            'Word choice shows **point of view**; one-sided writing shows **bias**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Authors write to inform, persuade, entertain, or give instructions.', show: 'sum.0' },
        { say: 'Ask what the author mainly wants the reader to know, do or feel.', show: 'sum.1' },
        { say: 'And word choice shows an author’s point of view, while one-sided writing shows bias.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
