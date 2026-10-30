import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-4-2',
  lessonId: 'e11-4-2',
  title: 'Rhetorical Analysis',
  thumbnailTitle: 'Rhetorical Analysis',
  thumbnail: false,
  summary:
    'Describe a text’s rhetorical situation with SOAPSTone, then explain a writer’s choices by naming each one, its effect on the audience, and the purpose it serves.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'The Essay and Rhetoric', title: 'Rhetorical Analysis', subtitle: 'Situation and choices' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Under a government which imprisons any unjustly, the true place for a just man is also a prison.'],
          by: 'Henry David Thoreau, “Civil Disobedience” (1849)',
        },
      ],
      lines: [
        { say: 'In eighteen forty-six, Henry David Thoreau spent a night in jail for refusing to pay a tax to a government that allowed slavery. He explained himself in the essay “Civil Disobedience”.', show: ['title', 'q'] },
        { say: 'The sentence is powerful partly because of who said it, when, to whom and why. Rhetorical analysis studies the situation a text answers, and the choices a writer makes to move an audience.' },
      ],
    },
    {
      chapter: 'The rhetorical situation',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Speaker**: whose voice the text speaks in',
            '**Occasion**: what prompted the text',
            '**Audience**: the group the writer is trying to reach',
            '**Purpose**: what the text should do to its audience',
            '**Subject** and **Tone**: the topic, and the writer’s attitude to it',
          ],
        },
      ],
      lines: [
        { say: 'A useful way to remember the parts of a situation is SOAPSTone: speaker, occasion, audience, purpose, subject and tone.', show: 'b.0', focus: 'b.0' },
        { say: 'The occasion is the event that prompted the text. The audience is the group the writer is trying to reach.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'The purpose is what the writer wants the text to do, such as inform, persuade, honour, warn or mock. Subject is the topic, and tone is the writer’s attitude, shown by word choice.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Rhetorical choices',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Must the citizen ever for a moment, or in the least degree, resign his conscience to the legislator?', 'Why has every man a conscience, then?'],
          by: 'Henry David Thoreau, “Civil Disobedience” (1849)',
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Choice:** two rhetorical questions', '**Effect:** the reader answers no, and agrees with him', '**Purpose:** to win agreement before he states his claim'],
        },
      ],
      lines: [
        { say: 'Once you know the situation, ask why the writer makes each choice. A strong answer names the choice, explains its effect on the audience, and connects that effect to the purpose.', show: 'q' },
        { say: 'Thoreau opens a key passage with two questions. The choice is the rhetorical question.', show: 'b.0', focus: 'b.0' },
        { say: 'The questions expect the answer no, so a reader who answers them has agreed with Thoreau before he states his claim.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
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
          title: 'Audience is not “anyone who reads it”',
          md: 'The audience is the group the writer is **trying to reach**, and the text’s details show who that is. A graduation speech is for the graduates and their families.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Almost any text could be read by anyone, so the audience is not simply anyone who reads it.', show: 'm' },
        { say: 'It is the group the writer is trying to reach. A graduation speech is for the graduates and their families, even if the local newspaper prints it.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A nurse writes to the town paper after the council votes to close her clinic. What is her purpose?',
          choices: [
            'To persuade readers to come and keep the clinic open.',
            'To inform readers about how the council votes work.',
            'To apologize to readers for the clinic’s closing now.',
            'To mock the council by praising its decision loudly.',
          ],
          answer: 0,
          working: 'The letter urges readers to attend a public meeting and demand that the clinic stay open, so its purpose is to persuade.',
        },
      ],
      lines: [
        { say: 'Your turn. A nurse writes to the town paper after the council votes to close her clinic, and urges readers to come to a public meeting. What is her purpose? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. She wants readers to come to the meeting and fight to keep the clinic open, so her purpose is to persuade.', show: 'q2.answer' },
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
            'The rhetorical situation is speaker, occasion, audience, purpose, subject and tone.',
            'The audience is the group the writer is trying to reach.',
            'Name the choice, explain its effect, and connect it to the purpose.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The rhetorical situation is the speaker, occasion, audience, purpose, subject and tone of a text.', show: 'sum.0' },
        { say: 'The audience is the group the writer is trying to reach, not everyone who might read it.', show: 'sum.1' },
        { say: 'And to analyse a choice, name it, explain its effect on the audience, and connect that effect to the writer’s purpose.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
