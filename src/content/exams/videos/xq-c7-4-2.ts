import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import methods from '@/content/chem7/videos/c7-4-2.ts';

// Exam question for Chemistry 7 lesson 4.2 (evaporation and distillation): pure drinking water from
// sea water by distillation (boiling, then condensing, collected as the distillate), and the salt
// alone by evaporation. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are the lesson's salt water in an open dish, heated and cooled, and its still with a
// heated flask and a cold condenser (src/video/particles.ts).

const QUESTION = 'Sea water is a solution of salt in water. (a) People on a small island need pure drinking water from sea water. Name the method they should use, and the two changes of state that happen in it. (b) What is the pure liquid that is collected called? (c) Someone else wants only the salt. Which simpler method can they use?';

const video: Explainer = {
  id: 'xq-c7-4-2',
  lessonId: '',
  exam: {
    lesson: 'c7-4-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Water from the Sea. Evaporation and Distillation',
  thumbnailTitle: 'Water from the Sea',
  thumbnail: 'st',
  summary:
    'A test-style question, solved one small step at a time: how do you get pure drinking water from sea water, and how do you get just the salt? Distillation boils the water and then condenses it, collecting pure water as the distillate, while evaporation is enough when only the salt is wanted.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Water from the Sea', subtitle: 'Distillation or evaporation?' }],
      lines: [
        { say: 'In this video, we solve a test-style question about evaporation and distillation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Distillation (boiling, then condensing); the distillate; evaporation' }],
      lines: [
        { say: 'Here is the question. Sea water is a solution of salt in water. Part a: people on a small island need pure drinking water from sea water. Name the method they should use, and the two changes of state that happen in it. Part b: what is the pure liquid that is collected called? Part c: someone else wants only the salt. Which simpler method can they use?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Which part of the sea water do we want to **keep**: the **water**, or only the **salt**?' }],
      lines: [
        { say: 'The salt is dissolved, so filtering will not work. The choice of method depends on what we want to keep: the water, or only the salt.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(methods, 'ev')],
      lines: [
        { say: 'Here is what we need. This is salt water in an open dish: yellow salt particles among blue water particles.', show: ['ev', 'ev.labels'] },
        { say: 'Heat it. The water particles speed up and escape into the air as a gas, one by one. The salt cannot boil away, so it stays behind in the dish. This is evaporation, and the water is lost to the air.', play: 'ev.heat', focus: 'ev.a' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Keep the **water**: catch the gas and cool it', 'That is **distillation**: boil, then condense', 'Keep only the **salt**: let the water go'] }],
      lines: [
        { say: 'Here is the plan. To keep the water, we must catch the gas and cool it back into a liquid.', show: 'plan.0' },
        { say: 'Boiling and then condensing is called distillation.', show: 'plan.1' },
        { say: 'If we only want the salt, the water can simply escape into the air.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Distillation',
      layout: 'center',
      main: [pick(methods, 'st')],
      lines: [
        { say: 'Step one. Here is salt water in a flask on the left, heated from below, beside a cold condenser on the right.', show: ['st', 'st.labels'] },
        { say: 'First, the water boils. Liquid water becomes a gas, steam, and rises out of the flask. The salt does not boil, so it stays behind.', play: 'st.boil' },
        { say: 'Then the steam reaches the cold condenser and condenses, turning from a gas back into liquid water. So the method is distillation, and the two changes of state are boiling, then condensing. That is part a.', play: 'st.more' },
      ],
    },
    {
      chapter: 'Step 2: The distillate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'dis', tone: 'definition', title: 'Distillate', md: 'The **pure liquid** collected from the condenser. Here, it is **pure water**, with no salt in it.' }],
      lines: [
        { say: 'Step two. The pure liquid that drips out of the condenser is called the distillate. Here it is pure water, safe to drink, because the salt stayed in the flask. That is part b.', show: 'dis' },
      ],
    },
    {
      chapter: 'Step 3: Just the salt',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'salt', items: ['Heat the sea water in an **open dish**', 'The water **evaporates** into the air', 'The **salt** is left behind as crystals'] }],
      lines: [
        { say: 'Step three. If only the salt is wanted, there is no need to catch the water. Heat the sea water in an open dish.', show: 'salt.0' },
        { say: 'The water evaporates into the air.', show: 'salt.1' },
        { say: 'And the salt is left behind as crystals. This is evaporation, the simpler method. That is part c.', show: 'salt.2', focus: 'salt.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Distillation**: the water **boils**, then **condenses**. (b) The **distillate**. (c) **Evaporation**.' },
      ],
      lines: [
        { say: 'Does it make sense? Salt makers by the sea dry sea water in the sun, which is evaporation, while ships that make their own drinking water use distillation.', show: 'ans' },
        { say: 'So the islanders should use distillation, boiling then condensing, and collect the distillate. For just the salt, evaporation is enough.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['**Filtration**', 'Dissolved salt passes **through** filter paper'],
            ['**Evaporation** for drinking water', 'The water is **lost** to the air'],
            ['Melting and freezing', 'The changes are **boiling** and **condensing**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Filtration cannot work, because the salt is dissolved and passes straight through the paper.', focus: 'traps.0' },
        { say: 'Evaporation gets the salt, but the water escapes into the air, so there is nothing to drink.', focus: 'traps.1' },
        { say: 'And the two changes of state are liquid to gas, then gas back to liquid: boiling and condensing. Melting and freezing are about solids.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In distillation, where does the steam turn back into liquid water?',
          choices: ['In the flask', 'In the condenser', 'On the hot plate', 'In the salt'],
          answer: 1,
          working: 'The condenser is kept cold, so the steam gives out heat there and condenses.',
        },
      ],
      lines: [
        { say: 'Your turn. In distillation, where does the steam turn back into liquid water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The condenser is kept cold, so the steam gives out heat there and condenses: choice B.', show: 'q2.answer' },
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
          items: ['**Distillation**: boil, then condense, to keep the liquid', 'The pure liquid collected is the **distillate**', '**Evaporation** keeps only the dissolved solid'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Distillation boils a liquid and then condenses it, so the liquid is kept.', show: 'sum.0' },
        { say: 'The pure liquid collected is the distillate.', show: 'sum.1' },
        { say: 'And evaporation lets the liquid escape, keeping only the dissolved solid. For more on these methods, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
