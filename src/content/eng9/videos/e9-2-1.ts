import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-2-1',
  lessonId: 'e9-2-1',
  title: 'Close Reading a Poem',
  summary:
    'Close reading means reading slowly and carefully, asking what every word, image and sound adds: read the whole poem, then study the title, speaker, key words, contrasts, shifts and context. Imagery appeals to the senses, so name the sense and the effect, as in Dunbar’s “We Wear the Mask” and Owen’s “Dulce et Decorum Est”.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Close Reading a Poem', subtitle: 'Every word, image and sound' }],
      lines: [
        { say: 'A poem can be read in a minute, and studied for a lifetime. The skill that unlocks it is close reading.', show: 'title' },
        { say: 'In this video we close read a poem step by step, and explain how its imagery creates an effect.' },
      ],
    },
    {
      chapter: 'What close reading is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Close reading', md: '**Close reading** means reading slowly and carefully, paying attention to every **word**, **image** and **sound**, and asking what each one **adds**.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Read the whole poem slowly, more than once.',
            'Look at the **title**, then the **speaker** and **situation**.',
            'Mark **key words**, images and contrasts.',
            'Ask what **changes**, then consider **context**.',
          ],
        },
      ],
      lines: [
        { say: 'Close reading means reading slowly and carefully, paying attention to every word, image and sound, and asking what each one adds. It is the core skill of literary analysis.', show: 'def' },
        { say: 'First, read the whole poem slowly, more than once, and aloud if you can.', show: 'b.0' },
        { say: 'Look at the title, which often names the key image. Then find the speaker and the situation: who is speaking, to whom, and about what?', show: 'b.1' },
        { say: 'Mark key words with strong connotations, and any contrasts. Then ask what changes, and consider the context. Context can open up a fuller reading, but it never replaces the words.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'We Wear the Mask',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['We wear the mask that grins and lies,', 'It hides our cheeks and shades our eyes,—', 'This debt we pay to human guile;', 'With torn and bleeding hearts we smile,', 'And mouth with myriad subtleties.'], by: 'Paul Laurence Dunbar, “We Wear the Mask”, first lines' },
      ],
      lines: [
        { say: 'Here are the first lines of a poem by Paul Laurence Dunbar, one of the first African American poets to win wide fame.', show: 'q' },
        { say: 'The title names the central image: a mask, something worn to hide the real face. And this mask grins and lies, so it is a false, smiling face.', focus: 'q.0' },
        { say: 'With torn and bleeding hearts we smile. This sets inner suffering against an outward show of happiness, and that contrast is the heart of the poem.', focus: 'q.3' },
        { say: 'This debt we pay to human guile. Guile means cunning deceit, so a cruel, deceitful world forces people to hide their pain.', focus: 'q.2' },
      ],
    },
    {
      chapter: 'Adding context',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Context deepens the reading', md: 'Dunbar wrote in **1895**, when Black Americans faced fierce racism. The “we” can be read as people who had to hide their pain to survive it, so the poem becomes a **protest** against a society that demands the mask.' },
      ],
      lines: [
        { say: 'Now add context. Dunbar wrote in eighteen ninety-five, when Black Americans faced fierce racism.', show: 'k' },
        { say: 'So the we can be read as the people who had to hide their pain to survive it. The context deepens the poem into a protest against a society that demands that mask.', focus: 'k' },
      ],
    },
    {
      chapter: 'Imagery',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Imagery', md: '**Imagery** is language that appeals to the **senses** (sight, sound, touch, taste and smell) to create a picture in the reader’s mind.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Name the sense, then the effect', md: '“Owen uses imagery” says nothing. Say **which sense** the image appeals to, and **what feeling** it creates.' },
      ],
      lines: [
        { say: 'Imagery is language that appeals to the senses, sight, sound, touch, taste and smell, to create a picture in the reader’s mind.', show: 'def' },
        { say: 'A common mistake is to write, the poet uses imagery, and stop. That says nothing. Name which sense the image appeals to, and what feeling it creates.', show: 'm' },
      ],
    },
    {
      chapter: 'Dulce et Decorum Est',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['Bent double, like old beggars under sacks,', 'Knock-kneed, coughing like hags, we cursed through sludge,', 'Till on the haunting flares we turned our backs', 'And towards our distant rest began to trudge.', 'Men marched asleep. Many had lost their boots', 'But limped on, blood-shod. All went lame; all blind;'], by: 'Wilfred Owen, “Dulce et Decorum Est”, first lines' },
      ],
      lines: [
        { say: 'Wilfred Owen fought as a soldier in the First World War, and was killed a week before it ended. His poems show the war as the soldiers lived it.', show: 'q' },
        { say: 'Like old beggars under sacks. The young soldiers are bent, exhausted and wretched, more like old beggars than heroes.', focus: 'q.0' },
        { say: 'Coughing like hags, we cursed through sludge. We hear the coughing and cursing, and feel the thick mud.', focus: 'q.1' },
        { say: 'Blood-shod. Having lost their boots, they march on feet so wounded that blood covers them like shoes.', focus: 'q.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the overall effect of Owen’s imagery in these lines?',
          choices: [
            'It celebrates the soldiers as glorious heroes.',
            'It strips away the idea that war is glorious, showing soldiers broken and suffering.',
            'It describes a peaceful walk in the countryside.',
            'It shows the soldiers are happy to be going home.',
          ],
          answer: 1,
          working: 'Beggars, hags, sludge and blood-shod feet all show the soldiers as broken, filthy and suffering, the opposite of the glorious picture of war.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the overall effect of Owen’s imagery in these lines? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Beggars, hags, sludge and blood-shod feet all show the soldiers as broken, filthy and suffering. Every image strips away the idea that war is glorious.', show: 'q2.answer' },
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
            '**Close reading**: ask what every word, image and sound adds.',
            'Study the title, speaker, key words, contrasts, shifts and context.',
            'Context deepens a reading, but evidence comes from the words.',
            '**Imagery** appeals to the senses: name the sense and the effect.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Close reading means asking what every word, image and sound adds.', show: 'sum.0' },
        { say: 'Study the title, the speaker, key words, contrasts, shifts and context.', show: 'sum.1' },
        { say: 'Context can deepen a reading, but your evidence always comes from the words.', show: 'sum.2' },
        { say: 'And imagery appeals to the senses, so name the sense, and the effect.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
