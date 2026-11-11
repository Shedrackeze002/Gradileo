import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-1-1',
  lessonId: 'ex-1-1',
  title: 'Evaluating a Statement: How Far Do You Agree?',
  thumbnailTitle: 'How Far Do You Agree?',
  thumbnail: false,
  summary:
    'To evaluate a statement about a text, judge how far it is true and prove the judgement from the text. Choose the strongest evidence for the statement, look for a detail that pulls against it, explain the writer’s methods and their effect, and open and close with a clear judgement.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Evaluating and Comparing Texts', title: 'How Far Do You Agree?', subtitle: 'Evaluating a statement' }],
      lines: [
        { say: 'A friend says, that film was terrifying. You saw it too. Do you agree completely, partly, or not at all? To answer well, you would point to particular scenes, and admit the moments that were not frightening.', show: 'title' },
        { say: 'An exam question that asks, how far do you agree, wants exactly this. In this lesson, you will learn how to answer it.' },
      ],
    },
    {
      chapter: 'What evaluating means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Evaluate', md: 'To **judge how well something works**. When you evaluate a statement about a text, you decide how far it is true, and you prove it from the text.' },
        { kind: 'bullets', id: 'b', items: ['**A judgement:** how far you agree', '**Evidence:** short quotations from the text', '**Methods and effect:** what the writer has done, and what it makes the reader feel'] },
      ],
      lines: [
        { say: 'To evaluate is to judge how well something works. When you evaluate a statement about a text, you decide how far the statement is true, and you prove your judgement from the text.', show: 'def' },
        { say: 'A strong evaluation has three parts. A judgement: how far you agree.', show: 'b.0', focus: 'b.0' },
        { say: 'Evidence: short quotations from the text. And methods and effect: what the writer has done, and what it makes the reader think or feel.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Evidence for the statement',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: [
            'The corridor was longer than Asha remembered. Her new shoes squeaked on every step, announcing her to rows of closed doors.',
            'Somewhere a bell rang, and the sound seemed to chase her.',
            'At the far end, a girl with paint on her sleeves looked up and smiled.',
          ],
        },
        { kind: 'text', id: 's', size: 'md', md: 'A student says: *“The writer makes the reader feel that Asha is nervous and alone.”*' },
      ],
      lines: [
        { say: 'Here is a short extract. The corridor was longer than Asha remembered. Her new shoes squeaked on every step, announcing her to rows of closed doors. Somewhere a bell rang, and the sound seemed to chase her.', show: ['q.0', 'q.1'] },
        { say: 'A student says: the writer makes the reader feel that Asha is nervous and alone.', show: 's', focus: 's' },
        { say: 'Start with the strongest evidence for the statement. The sound seemed to chase her turns an ordinary bell into something that hunts her. And rows of closed doors shows that nobody is there to welcome her.', focus: ['q.0', 'q.1'] },
      ],
    },
    {
      chapter: 'Evidence against the statement',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['At the far end, a girl with paint on her sleeves looked up and smiled.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Words for how far you agree', md: '*I agree completely* · *I agree to a large extent* · *I partly agree* · *I agree only to a small extent*' },
      ],
      lines: [
        { say: 'A statement is rarely the whole truth, so look for a detail that pulls the other way. Here, it is the last sentence. At the far end, a girl with paint on her sleeves looked up and smiled. Asha is not completely alone after all.', show: 'q' },
        { say: 'Weighing that detail is what turns agreement into evaluation. Then choose the words your evidence supports: I agree completely, to a large extent, partly, or only to a small extent.', show: 'tip', focus: 'tip' },
      ],
    },
    {
      chapter: 'Methods and their effect',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of comment', 'Example', 'Evaluation?'],
          rows: [
            ['Repeats the quotation', '*This shows that the bell rang and Asha heard it.*', 'No'],
            ['Could be about any text', '*This is effective and makes the reader want to read on.*', 'No'],
            ['Method and effect, linked to the statement', '*The personification makes the bell seem to hunt her, so the reader feels her fear.*', 'Yes'],
          ],
        },
      ],
      lines: [
        { say: 'A quotation proves nothing until you explain it. A comment that only repeats the quotation is not evaluation. Nor is a comment that could be written about any text, such as, this makes the reader want to read on.', show: ['t.0', 't.1'] },
        { say: 'Name what the writer has done, say what effect it has, and link it to the statement. The personification makes the bell seem to hunt her, so the reader feels her fear.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Retelling is not evaluating', md: '*Asha walks down the corridor, a bell rings and a girl smiles.* Every word is true, and none of it judges the statement.' }],
      lines: [
        { say: 'The commonest weak answer tells the story again. Asha walks down the corridor, a bell rings, and a girl smiles. Every word is true, and none of it judges the statement.', show: 'm' },
        { say: 'Here is a test. If your sentence would still make sense with the statement deleted from the question, it is retelling.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best opening sentence for an evaluation of the statement?',
          choices: [
            'In this extract a girl called Asha walks down a long school corridor.',
            'I really enjoyed this extract because it is tense and interesting.',
            'It depends on the reader whether Asha seems nervous and alone.',
            'I agree to a large extent, because the school seems empty and hostile until the final sentence.',
          ],
          answer: 3,
          working: 'It says how far the writer agrees, and why. The others describe, give an opinion with no evidence, or refuse to judge.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best opening sentence for an evaluation of the statement? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. It says how far the writer agrees, and why. Choice A only describes the extract, choice B is an opinion with no evidence, and choice C refuses to judge.', show: 'q.answer' },
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
            'To evaluate a statement is to judge how far it is true, and prove it from the text.',
            'Choose the strongest evidence for it, and a detail that pulls against it.',
            'Explain each quotation: the method, its effect, and the link to the statement.',
            'Open with how far you agree, and end by weighing both sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To evaluate a statement is to judge how far it is true, and to prove your judgement from the text.', show: 'sum.0' },
        { say: 'Choose the strongest evidence for the statement, and look for a detail that pulls against it.', show: 'sum.1' },
        { say: 'Explain each quotation: name the method, say what it makes the reader feel, and link it to the statement.', show: 'sum.2' },
        { say: 'And open with how far you agree, then end with a conclusion that weighs both sides and still decides.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
