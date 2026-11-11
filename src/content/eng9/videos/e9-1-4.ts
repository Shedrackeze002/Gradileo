import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-1-4',
  lessonId: 'e9-1-4',
  title: 'Style: Diction and Syntax',
  summary:
    'Diction is a writer’s choice of words, formal or colloquial, concrete or abstract, and words carry connotations beyond their dictionary meaning. Syntax is how words are arranged into sentences: a short sentence after long ones hits hard, a long one can feel breathless, and a deliberate fragment shocks. Always link diction and syntax to their effect.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Style: Diction and Syntax', subtitle: 'Word choice and sentence shape' }],
      lines: [
        { say: 'Two writers can describe the same rainy street and make it feel completely different. The difference is style.', show: 'title' },
        { say: 'In this video we look at two of its main ingredients, diction and syntax, and explain their effects.' },
      ],
    },
    {
      chapter: 'Diction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diction', md: '**Diction** is a writer’s choice of words. It can be formal or colloquial, plain or ornate, gentle or harsh.' },
        {
          kind: 'table',
          id: 't',
          head: ['Diction', 'Example', 'Effect'],
          rows: [
            ['**Formal**', 'The committee has postponed its decision.', 'serious, official'],
            ['**Colloquial**', 'The committee’s gone and put it off again.', 'chatty, like real speech'],
            ['**Concrete**', 'The radiator clanked and hissed.', 'vivid and specific'],
            ['**Abstract**', 'The atmosphere was uncomfortable.', 'general and vague'],
          ],
        },
      ],
      lines: [
        { say: 'Diction is a writer’s choice of words. It can be formal or colloquial, plain or ornate, gentle or harsh.', show: 'def' },
        { say: 'Formal diction, like the committee has postponed its decision, sounds serious and official. Colloquial diction, like the committee’s gone and put it off again, sounds chatty, like real speech.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Concrete diction is vivid and specific: the radiator clanked and hissed. Abstract diction is general and vague: the atmosphere was uncomfortable.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Connotations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Connotations', md: 'Words carry **connotations**: feelings and associations beyond their dictionary meaning. “The sky **bled**” brings pain and danger into an image that is usually peaceful.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Damp clawed at the walls. Something had gnawed the skirting boards, and the air choked with dust.'] },
        { kind: 'text', id: 'e', size: 'md', md: '*clawed*, *gnawed*, *choked*: attack, hunger, suffocation. The room feels **alive and hostile**.' },
      ],
      lines: [
        { say: 'Words carry connotations, the feelings and associations beyond their dictionary meaning. A writer who says the sky bled, rather than the sky turned red, brings pain and danger into a peaceful image.', show: 'k' },
        { say: 'Read this. Damp clawed at the walls. Something had gnawed the skirting boards, and the air choked with dust.', show: 'q' },
        { say: 'Look at the verbs: clawed, gnawed, choked. They all suggest attack, hunger or suffocation. So the diction makes the room feel grim and threatening, almost alive and hostile.', show: 'e' },
      ],
    },
    {
      chapter: 'Syntax',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Syntax', md: '**Syntax** is the way words are arranged into sentences: their **length**, **word order** and **structure**. Syntax creates rhythm, and rhythm shapes how we feel.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**A short sentence after long ones** hits hard.',
            '**A long sentence full of “and”** can feel breathless or chaotic.',
            '**A fragment**, used on purpose, creates shock or emphasis.',
            '**Inverted order**, as in *Silent was the house*, sounds formal.',
          ],
        },
      ],
      lines: [
        { say: 'Syntax is the way words are arranged into sentences: their length, word order and structure. Syntax creates rhythm, and rhythm shapes how we feel.', show: 'def' },
        { say: 'A short sentence after long ones hits hard, and draws attention to itself. A long sentence full of commas and and can feel breathless, rushed or chaotic.', show: ['b.0', 'b.1'] },
        { say: 'A fragment is a group of words punctuated as a sentence but missing a main clause. It is usually an error, but writers use it on purpose for shock or emphasis.', show: 'b.2' },
        { say: 'And inverted word order, as in silent was the house, puts weight on the first word and sounds formal.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Connect syntax to meaning',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Connect syntax to meaning', md: '“The writer uses short sentences” is an **observation**, not analysis. Say what the short sentences **do**: create tension, mimic a heartbeat, show shock.' },
      ],
      lines: [
        { say: 'A common mistake is to spot the syntax and stop. The writer uses short sentences is an observation, not analysis.', show: 'm' },
        { say: 'Say what the short sentences do. Do they create tension, mimic a heartbeat, or show shock?', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“We spent the morning on the beach, building towers and digging moats and chasing the waves as they slid back down the sand. Then the siren.” What does the final fragment do?',
          choices: [
            'It is a careless grammar mistake.',
            'It slows the pace to show a lazy afternoon.',
            'It shatters the peaceful mood, as the siren shatters the morning.',
            'It shows the narrator is bored.',
          ],
          answer: 2,
          working: 'The first sentence is long and flowing, like a happy morning. The sudden two-word fragment breaks that rhythm, just as the siren breaks the peace.',
        },
      ],
      lines: [
        { say: 'Your turn. We spent the morning on the beach, building towers and digging moats and chasing the waves as they slid back down the sand. Then the siren. What does the final fragment do? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The first sentence is long and flowing, like a lazy, happy morning. The sudden two-word fragment shatters that mood, just as the siren shatters the morning.', show: 'q2.answer' },
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
            '**Diction** is word choice: formal or colloquial, concrete or abstract.',
            'Words carry **connotations** beyond their dictionary meaning.',
            '**Syntax** is sentence structure: length, order and shape.',
            'Always link diction and syntax to their **effect**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Diction is word choice: formal or colloquial, concrete or abstract.', show: 'sum.0' },
        { say: 'Words carry connotations, feelings beyond their dictionary meaning.', show: 'sum.1' },
        { say: 'Syntax is sentence structure: its length, order and shape. Short sentences and fragments hit hard, and long ones can feel breathless or calm.', show: 'sum.2' },
        { say: 'And always link diction and syntax to their effect on tone and mood.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
