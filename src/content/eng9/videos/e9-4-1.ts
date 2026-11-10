import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-4-1',
  lessonId: 'e9-4-1',
  title: 'Rhetorical Devices',
  summary:
    'Rhetorical devices are patterns of language that make words persuasive and memorable: anaphora repeats openings, a tricolon groups three, antithesis balances opposites and a rhetorical question is asked for effect. Devices often combine, as in Lincoln’s Gettysburg Address, and small word choices matter too. Always explain the effect on the audience.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-fiction', title: 'Rhetorical Devices', subtitle: 'How great speeches persuade' }],
      lines: [
        { say: 'The greatest speeches are remembered not just for what they said, but for how they said it.', show: 'title' },
        { say: 'In this video we identify four of the most powerful rhetorical devices, and explain their effects.' },
      ],
    },
    {
      chapter: 'Four devices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rhetorical devices', md: '**Rhetorical devices** are patterns of language that make words **persuasive** and **memorable**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Device', 'What it is', 'Example'],
          rows: [
            ['**Anaphora**', 'the same words start several sentences', 'We will not wait. We will not be silent.'],
            ['**Tricolon**', 'three parallel items in a row', 'of the people, by the people, for the people'],
            ['**Antithesis**', 'opposites side by side', 'It was the best of times, it was the worst of times.'],
            ['**Rhetorical question**', 'asked for effect, not an answer', 'Who among us does not want a safer town?'],
          ],
        },
      ],
      lines: [
        { say: 'Rhetorical devices are patterns of language that make words persuasive and memorable.', show: 'def' },
        { say: 'Anaphora repeats the same words at the start of several sentences: we will not wait. We will not be silent. We will not give up. It builds rhythm like a drumbeat, and drives a key idea home.', show: 't', focus: 't.0' },
        { say: 'A tricolon, the rule of three, puts three parallel items in a row: government of the people, by the people, for the people, from Abraham Lincoln’s Gettysburg Address. It sounds complete, and often builds to a climax.', focus: 't.1' },
        { say: 'Antithesis sets opposite ideas side by side in a balanced structure, like the opening of Dickens’s A Tale of Two Cities. It sharpens a contrast.', focus: 't.2' },
        { say: 'And a rhetorical question is asked for effect, not for an answer. It pulls the audience in, and makes the answer seem obvious.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Devices together',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground.'], by: 'Abraham Lincoln, the Gettysburg Address' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '“We can not” begins each phrase: **anaphora**.',
            'Exactly three phrases: a **tricolon**.',
            '*dedicate*, *consecrate*, *hallow*: each more solemn, building to a **climax**.',
          ],
        },
      ],
      lines: [
        { say: 'Devices often work together. Lincoln said this during the American Civil War, at a cemetery for soldiers.', show: 'q' },
        { say: 'We can not begins each of the phrases, so that is anaphora.', show: 'b.0' },
        { say: 'There are exactly three phrases, so that is a tricolon.', show: 'b.1' },
        { say: 'And the three verbs grow in solemnity, from dedicate to consecrate to hallow. Lincoln builds to a climax: the soldiers who died have already made the ground sacred, more than any words could.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Small words, big effects',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim.'], by: 'Frederick Douglass, “What to the Slave Is the Fourth of July?”' },
        { kind: 'text', id: 'e', size: 'md', md: '“**your** 4th of July”, not “our”: one pronoun shows who is shut out of the freedom being celebrated.' },
      ],
      lines: [
        { say: 'Small word choices can be just as powerful. Frederick Douglass, who had escaped from slavery, was invited to speak at a Fourth of July celebration.', show: 'q' },
        { say: 'He asks a rhetorical question, then answers it himself. The question forces his audience to see their celebration of freedom from the view of an enslaved person.', focus: 'q' },
        { say: 'And he says your Fourth of July, not our. A single pronoun shows that enslaved people are shut out of the freedom being celebrated.', show: 'e' },
      ],
    },
    {
      chapter: 'Name it, then explain it',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Name it, then explain it', md: '“Lincoln uses a tricolon” earns little. Say what the device makes the audience **feel**, **notice** or **remember**, and why that serves the speaker’s **purpose**.' },
      ],
      lines: [
        { say: 'A common mistake is to name the device and stop. Lincoln uses a tricolon earns little.', show: 'm' },
        { say: 'Say what the device makes the audience feel, notice or remember, and why that serves the speaker’s purpose.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“It was the best of times, it was the worst of times.” Which device is this?',
          choices: [
            'Anaphora only',
            'A rhetorical question',
            'Onomatopoeia',
            'Antithesis: opposite ideas in a balanced structure',
          ],
          answer: 3,
          working: '“Best” and “worst” are opposites, set side by side in two balanced clauses. That is antithesis, and it sharpens the contrast.',
        },
      ],
      lines: [
        { say: 'Your turn. It was the best of times, it was the worst of times. Which device is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Best and worst are opposites, set side by side in two balanced clauses. That is antithesis, and it sharpens the contrast.', show: 'q2.answer' },
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
            '**Anaphora** repeats openings; a **tricolon** groups three.',
            '**Antithesis** balances opposites; a **rhetorical question** is asked for effect.',
            'Devices often combine to build to a climax.',
            'Always explain the effect on the audience, even of small words.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Anaphora repeats openings, and a tricolon groups three.', show: 'sum.0' },
        { say: 'Antithesis balances opposites, and a rhetorical question is asked for effect.', show: 'sum.1' },
        { say: 'Devices often combine, to build to a climax.', show: 'sum.2' },
        { say: 'And always explain the effect on the audience, including the effect of small word choices.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
