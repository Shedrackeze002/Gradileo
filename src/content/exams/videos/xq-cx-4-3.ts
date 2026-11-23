import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import water from '@/content/chemmore/videos/cx-4-3.ts';

// Exam question for More Chemistry Topics lesson 4.3 (potable water and waste water): why potable
// water is not pure, what sterilises it, and how distillation takes the salt out of sea water and
// its drawback. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's sea water being distilled (src/video/particles.ts).

const QUESTION = 'Drinking water must be potable. (a) Water from a river is made potable by filtering and sterilising it. Why is potable water not pure water in the chemical sense? (b) Name one substance used to sterilise drinking water. (c) A country with little fresh water makes drinking water from sea water by distillation. Explain how distillation removes the salt, and give one disadvantage of this method.';

const video: Explainer = {
  id: 'xq-cx-4-3',
  lessonId: '',
  exam: {
    lesson: 'cx-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: River Water, Chlorine and Distilling the Sea. Potable Water',
  thumbnailTitle: 'Safe to Drink?',
  thumbnail: 'st',
  summary:
    'A test-style question, solved one small step at a time: why is potable water not pure, what sterilises it, and how does distillation take the salt out of sea water? Potable water still has dissolved substances in it, chlorine (or ozone or ultraviolet light) sterilises it, and in distillation the water evaporates and condenses while the salt stays behind, which takes a lot of energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Safe to Drink?', subtitle: 'Potable water' }],
      lines: [
        { say: 'In this video, we solve a test-style question about potable water. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'It has dissolved substances; chlorine; water evaporates and condenses, salt stays; uses a lot of energy' }],
      lines: [
        { say: 'Here is the question. Drinking water must be potable. Part a: water from a river is made potable by filtering and sterilising it. Why is potable water not pure water in the chemical sense? Part b: name one substance used to sterilise drinking water. Part c: a country with little fresh water makes drinking water from sea water by distillation. Explain how distillation removes the salt, and give one disadvantage of this method.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Separate **safe to drink** from **pure**, then explain how each treatment works' }],
      lines: [
        { say: 'Potable means safe to drink, which is different from pure. Then we need how fresh water is made safe, and how salt is taken out of sea water.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(water, 'st')],
      lines: [
        { say: 'Here is what we need. This is distillation up close: sea water heated on the left, and a cold condenser on the right.', show: ['st', 'st.labels'] },
        { say: 'Water molecules escape as steam, cross over and condense as pure water. The ions of the salt cannot escape, so they stay behind.', play: 'st.boil' },
        { say: 'Keep heating, and more pure water collects, while the salt left behind gets more concentrated.', play: 'st.more' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pure: **only water** molecules', 'Fresh water: **filter**, then **sterilise**', 'Sea water: **distil**, or use reverse osmosis'] }],
      lines: [
        { say: 'Here is the plan. In chemistry, pure water contains only water molecules.', show: 'plan.0' },
        { say: 'Fresh water is filtered to remove solids, then sterilised to kill microbes.', show: 'plan.1' },
        { say: 'And sea water needs its salt removed, by distillation or reverse osmosis.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Potable is not pure',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{potable water} = \\text{water} + \\text{dissolved salts}', '\\Rightarrow \\good{\\text{not pure}}'] }],
      lines: [
        { say: 'Step one. Potable water still has small amounts of dissolved substances in it, such as salts and minerals.', show: 'm.0' },
        { say: 'A pure substance contains only one substance, so potable water is safe to drink but not chemically pure. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Sterilising',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['**Chlorine**', 'or **ozone**', 'or **ultraviolet light**'] }],
      lines: [
        { say: 'Step two. After filtering, the water is sterilised to kill harmful microbes. The usual answer is chlorine.', show: 's.0', focus: 's.0' },
        { say: 'Ozone also works.', show: 's.1' },
        { say: 'And so does ultraviolet light, though that is not a substance. Chlorine or ozone answers part b.', show: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Distilling sea water',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Stage', 'What happens'],
          rows: [
            ['heat', 'water **evaporates** as steam'],
            ['salt', 'the ions **cannot evaporate**, so stay behind'],
            ['cool', 'the steam **condenses** as pure water'],
            ['but', 'boiling takes **a lot of energy**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Heating the sea water makes the water evaporate as steam.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The salt\'s ions cannot evaporate, so they stay behind, just as we saw.', show: 't.1', focus: 't.1' },
        { say: 'The steam is cooled in a condenser, and turns back into water with no salt in it.', show: 't.2', focus: 't.2' },
        { say: 'The disadvantage is that boiling so much water takes a lot of energy, which makes it expensive. That is part c.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) It still contains **dissolved substances**. (b) **Chlorine** (or ozone). (c) The water **evaporates** and is **condensed**, while the salt **stays behind**; it uses **a lot of energy**.' },
      ],
      lines: [
        { say: 'Does it make sense? Countries that distil sea water often have cheap energy and very little fresh water, which fits the cost.', show: 'ans' },
        { say: 'So potable water has dissolved substances, chlorine sterilises it, and distillation leaves the salt behind but uses a lot of energy.' },
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
            ['It has **germs** in it', 'Potable water is **sterilised**'],
            ['**Filtering** removes the salt', 'Salt is **dissolved**, so it passes through'],
            ['The **salt evaporates**', 'Only the **water** evaporates'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Potable water has had its microbes killed. It is the dissolved salts that stop it being pure.', focus: 'traps.0' },
        { say: 'Dissolved salt goes straight through a filter, which is why sea water needs distilling.', focus: 'traps.1' },
        { say: 'And it is the water that evaporates. The salt is left behind.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In treating waste water, which step lets solids settle to the bottom?',
          choices: ['screening', 'sterilising', 'sedimentation', 'distillation'],
          answer: 2,
          working: 'In sedimentation the water is left to stand, so heavier solids settle out as sludge.',
        },
      ],
      lines: [
        { say: 'Your turn. In treating waste water, which step lets solids settle to the bottom? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In sedimentation the water stands still, so heavier solids settle out as sludge: choice C.', show: 'q2.answer' },
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
          items: ['Potable water is **safe to drink**, not pure', 'Fresh water: **filter**, then sterilise with **chlorine**', 'Distillation works but uses **a lot of energy**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Potable water is safe to drink, but it is not pure.', show: 'sum.0' },
        { say: 'Fresh water is filtered, then sterilised with chlorine, ozone or ultraviolet light.', show: 'sum.1' },
        { say: 'And distillation removes salt from sea water, but uses a lot of energy. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
