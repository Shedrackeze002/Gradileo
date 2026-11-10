import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-7-1',
  lessonId: 'e9-7-1',
  title: 'The Analytical Essay',
  summary:
    'An analytical thesis is an arguable, precise interpretation of a text that names the text, the writer’s method and its effect, moving from what happens to how and why. Each body paragraph opens with a topic sentence, transitions link the ideas, the argument builds to its deepest point, and the conclusion shows why it all matters.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Analytical Essay', subtitle: 'Thesis and structure' }],
      lines: [
        { say: 'An analytical essay does not retell a text. It makes a claim about how the text works, and then proves it.', show: 'title' },
        { say: 'In this video we write an arguable thesis, and structure an essay around it.' },
      ],
    },
    {
      chapter: 'The analytical thesis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Analytical thesis', md: 'An **analytical thesis** is an interpretation of a text that the essay sets out to prove. It argues what a text **means** or **how it works**, not just what happens in it.' },
        {
          kind: 'table',
          id: 't',
          head: ['Weak', 'Strong'],
          rows: [
            ['*The Tempest* is a play by Shakespeare about an island.', 'Shakespeare uses Caliban to question whether Prospero’s rule is just.'],
            ['Owen’s poem is about war, and war is bad.', 'Owen’s imagery of disease and decay turns the soldiers’ heroism into horror.'],
          ],
        },
      ],
      lines: [
        { say: 'An analytical thesis is an interpretation of a text that the essay sets out to prove. It argues what a text means or how it works, not just what happens in it.', show: 'def' },
        { say: 'The Tempest is a play by Shakespeare about an island is just a fact, with nothing to prove. Shakespeare uses Caliban to question whether Prospero’s rule is just is something a reader could argue about.', show: 't', focus: 't.0' },
        { say: 'Owen’s poem is about war, and war is bad, is vague and obvious. Owen’s imagery of disease and decay turns the soldiers’ heroism into horror is precise. It names the text, the writer’s method and the effect.', focus: 't.1' },
      ],
    },
    {
      chapter: 'What, how and why',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**What:** Prospero forgives his enemies.',
            '**How:** Shakespeare builds up his power over them, then has him choose mercy.',
            '**Why:** to suggest that mercy is a rarer strength than revenge.',
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Thesis', md: 'By giving Prospero complete power over his enemies before he forgives them, Shakespeare suggests that **mercy is a rarer strength than revenge**.' },
      ],
      lines: [
        { say: 'To build a thesis, move from what to how and why. What happens? Prospero forgives his enemies.', show: 'b.0' },
        { say: 'How does the writer do it? Shakespeare builds up Prospero’s power over them, then has him choose mercy.', show: 'b.1' },
        { say: 'Why? To suggest that mercy is a rarer strength than revenge.', show: 'b.2' },
        { say: 'Put together, that gives a thesis: by giving Prospero complete power over his enemies before he forgives them, Shakespeare suggests that mercy is a rarer strength than revenge.', show: 'k' },
      ],
    },
    {
      chapter: 'Structuring the essay',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part', 'What it does'],
          rows: [
            ['**Introduction**', 'context on the text and question, ending with the thesis'],
            ['**Body paragraphs**', 'each opens with a **topic sentence** making one point'],
            ['**Transitions**', '*however*, *similarly*, *as a result* link the ideas'],
            ['**Conclusion**', 'draws it together and answers “so what?”'],
          ],
        },
      ],
      lines: [
        { say: 'The introduction gives some context on the text and the question, and ends with your thesis.', show: 't', focus: 't.0' },
        { say: 'Each body paragraph begins with a topic sentence that makes one point supporting the thesis, then gives evidence and analysis. Order them so the argument builds, and save your most insightful point for last.', focus: 't.1' },
        { say: 'Transitions, such as however, similarly and as a result, show how one idea links to the next.', focus: 't.2' },
        { say: 'And the conclusion draws the argument together, and answers the question: so what?', focus: 't.3' },
      ],
    },
    {
      chapter: 'A conclusion is not a full stop',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A conclusion is not a full stop', md: '“In conclusion, that is everything I have to say” adds nothing. Show the **bigger significance**: “In forgiving his enemies, Prospero shows that the play’s real magic is mercy.” Don’t add brand-new evidence there.' },
      ],
      lines: [
        { say: 'A common mistake is a conclusion that simply stops. In conclusion, that is everything I have to say, adds nothing.', show: 'm' },
        { say: 'A strong conclusion shows the bigger significance: in forgiving his enemies, Prospero shows that the play’s real magic is mercy. And don’t introduce brand-new evidence there.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the strongest analytical thesis?',
          choices: [
            '“Dulce et Decorum Est” is a poem by Wilfred Owen.',
            'In this essay I will talk about Owen’s poem.',
            'Owen’s broken rhythm and images of decay expose the lie that war is glorious.',
            'War is bad, and Owen thinks so too.',
          ],
          answer: 2,
          working: 'It is arguable and precise: it names the writer’s methods (broken rhythm, images of decay) and their effect (exposing the lie that war is glorious).',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest analytical thesis? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It is arguable and precise. It names the writer’s methods, broken rhythm and images of decay, and their effect: exposing the lie that war is glorious.', show: 'q2.answer' },
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
            'An **analytical thesis** is an arguable interpretation: text, method, effect.',
            'Move from **what** happens to **how** and **why**.',
            'Body paragraphs open with **topic sentences**; **transitions** link them.',
            'The **conclusion** shows why the argument matters.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An analytical thesis is an arguable, precise interpretation: it names the text, the method and the effect.', show: 'sum.0' },
        { say: 'Move from what happens, to how and why.', show: 'sum.1' },
        { say: 'Body paragraphs open with topic sentences, and transitions link the ideas.', show: 'sum.2' },
        { say: 'And the conclusion shows why the argument matters.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
