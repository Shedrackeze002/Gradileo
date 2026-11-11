import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-7-2',
  lessonId: 'e8-7-2',
  title: 'The Literary Paragraph',
  summary:
    'To embed a quotation is to blend a short, exact quotation into your own sentence so it fits the grammar; avoid floating quotations. A literary paragraph follows Point, Evidence, Explain, Link, and the explanation is where analysis happens: say what the writer’s choices show, not just what happens.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Literary Paragraph', subtitle: 'Embedding quotations and analysing them' }],
      lines: [
        { say: 'A literary paragraph makes a point about a text, and proves it with evidence. The difference between a good paragraph and a great one is usually what happens after the quotation.', show: 'title' },
        { say: 'In this video we learn to embed quotations smoothly, and to write analysis instead of summary.' },
      ],
    },
    {
      chapter: 'Embedding a quotation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Embedding a quotation', md: 'To **embed** a quotation is to blend a short quotation into your own sentence, so that it fits the grammar of what you are writing.' },
        {
          kind: 'table',
          id: 't',
          head: ['Floating (weak)', 'Embedded (strong)'],
          rows: [
            ['“Lord, what fools these mortals be!” This is what Puck says.', 'Puck mocks the lovers as “fools”, which shows his amusement at human love.'],
          ],
        },
      ],
      lines: [
        { say: 'To embed a quotation is to blend a short quotation into your own sentence, so that it fits the grammar of what you are writing.', show: 'def' },
        { say: 'A floating quotation is dropped in with no introduction or comment. Lord, what fools these mortals be. This is what Puck says.', show: 't', focus: 't.0' },
        { say: 'The embedded version is smoother and says more: Puck mocks the lovers as fools, which shows his amusement at human love. Every quotation needs a lead-in and an explanation.' },
      ],
    },
    {
      chapter: 'Tips for embedding',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Keep it short.** Choose the few key words, not a whole speech.',
            '**Quote exactly.** Helena says that Hermia is “little” but “fierce”.',
            '**Use square brackets** for a small change: “[Love] looks not with the eyes”.',
          ],
        },
      ],
      lines: [
        { say: 'Three tips. Keep it short. Choose the few key words and embed them, rather than copying a whole speech.', show: 'b.0' },
        { say: 'Quote exactly. Only the writer’s exact words go inside the quotation marks: Helena says that Hermia is little but fierce.', show: 'b.1' },
        { say: 'And use square brackets for a small change that makes the quotation fit your sentence.', show: 'b.2' },
      ],
    },
    {
      chapter: 'PEEL',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Step', 'Example: How does Shakespeare present Hermia?'],
          rows: [
            ['**Point**', 'Hermia is small but powerful.'],
            ['**Evidence**', 'Helena warns that “though she be but little, she is fierce.”'],
            ['**Explain**', 'The word “but” turns a weakness into a strength.'],
            ['**Link**', 'Hermia refuses to be underestimated, as when she defies her father.'],
          ],
        },
      ],
      lines: [
        { say: 'A literary paragraph often follows PEEL. Let’s answer the question: how does Shakespeare present Hermia? First, the point, a clear claim: Hermia is small but powerful.', show: 't', focus: 't.0' },
        { say: 'Then the evidence, a short, embedded quotation: Helena warns that though she be but little, she is fierce.', focus: 't.1' },
        { say: 'Then explain. This is where the analysis happens. The word but turns a weakness into a strength, so her small size makes her fierceness all the more surprising.', focus: 't.2' },
        { say: 'Finally, link back to the question. Shakespeare presents Hermia as someone who refuses to be underestimated, which matches her defiance of her father.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Summary or analysis?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Summary', 'Analysis'],
          rows: [
            ['Puck puts the love potion on the wrong Athenian.', 'Puck’s word “fools” shows he finds human love ridiculous.'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Saying where is not saying why', md: '“This is a quote from Act 4” tells the reader **where** the words come from, not what they **show**. After every quotation, ask: *so what?*' },
      ],
      lines: [
        { say: 'Summary retells what happens. Analysis explains what the writer’s choices reveal. Puck puts the potion on the wrong Athenian is summary. Puck’s word fools shows he finds human love ridiculous is analysis.', show: 't' },
        { say: 'A common mistake is to say where a quotation comes from instead of what it shows. This is a quote from Act four is not analysis. After every quotation, ask yourself: so what?', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence embeds the quotation best?',
          choices: [
            '“The course of true love never did run smooth.” Lysander.',
            'Quote: the course of true love never did run smooth.',
            'Lysander warns that “the course of true love never did run smooth.”',
            'This quote is from Act 1, Scene 1.',
          ],
          answer: 2,
          working: 'It leads in with who speaks (“Lysander warns that…”), and the quotation fits the grammar of the writer’s own sentence.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence embeds the quotation best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It leads in with who is speaking, Lysander warns that, and the quotation fits the grammar of the writer’s own sentence.', show: 'q2.answer' },
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
            '**Embed** short quotations so they fit your sentence.',
            'Quote exactly, and use square brackets for small changes.',
            'Follow **Point, Evidence, Explain, Link**.',
            'Analysis explains what choices show; summary only retells.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Embed short quotations so they fit the grammar of your sentence, and avoid floating quotations.', show: 'sum.0' },
        { say: 'Quote exactly, and use square brackets for small changes.', show: 'sum.1' },
        { say: 'Follow PEEL: point, evidence, explain, link.', show: 'sum.2' },
        { say: 'And remember, analysis explains what the writer’s choices show, while summary only retells events.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
