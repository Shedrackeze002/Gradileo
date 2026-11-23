import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import neut from '@/content/chem9/videos/c9-4-3.ts';

// Exam question for Chemistry 9 lesson 4.3 (neutralization): the word equation for sodium
// hydroxide and hydrochloric acid, what a rise in temperature says about the reaction, and naming
// the salt that potassium hydroxide and nitric acid make. Written by Gradileo in the style of a
// Grade 9 science unit test.
//
// The picture is the lesson's hydrogen ions and hydroxide ions joining to make water, with a
// thermometer that rises as they do (src/video/particles.ts).

const QUESTION = 'A student adds sodium hydroxide solution to hydrochloric acid until the mixture is neutral. The temperature of the mixture rises from 21 °C to 27 °C. (a) Write a word equation for the reaction, naming the salt that forms. (b) Is the reaction exothermic or endothermic? Explain how you know. (c) Name the salt that forms when potassium hydroxide neutralizes nitric acid.';

const video: Explainer = {
  id: 'xq-c9-4-3',
  lessonId: '',
  exam: {
    lesson: 'c9-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sodium Hydroxide and Hydrochloric Acid, the Salt and the Heat. Neutralization',
  thumbnailTitle: 'Acid + Alkali',
  thumbnail: 'n',
  summary:
    'A test-style question, solved one small step at a time: what does sodium hydroxide make with hydrochloric acid, what does a rise in temperature tell us, and which salt do potassium hydroxide and nitric acid make? Sodium hydroxide and hydrochloric acid make sodium chloride and water, the reaction is exothermic because the mixture warms up, and the second salt is potassium nitrate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acid + Alkali', subtitle: 'The salt and the heat' }],
      lines: [
        { say: 'In this video, we solve a test-style question about neutralization. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Sodium chloride and water; exothermic; potassium nitrate' }],
      lines: [
        { say: 'Here is the question. A student adds sodium hydroxide solution to hydrochloric acid until the mixture is neutral. The temperature of the mixture rises from 21 degrees Celsius to 27 degrees Celsius. Part a: write a word equation for the reaction, naming the salt that forms. Part b: is the reaction exothermic or endothermic? Explain how you know. Part c: name the salt that forms when potassium hydroxide neutralizes nitric acid.', caption: 'Here is the question. A student adds sodium hydroxide solution to hydrochloric acid until the mixture is neutral. The temperature of the mixture rises from 21 °C to 27 °C. Part a: write a word equation for the reaction, naming the salt that forms. Part b: is the reaction exothermic or endothermic? Explain how you know. Part c: name the salt that forms when potassium hydroxide neutralizes nitric acid.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Name the **salt** an acid and an alkali make, and read the **thermometer**' }],
      lines: [
        { say: 'An acid and an alkali cancel each other out and make a salt. We need to name that salt, and decide what the change in temperature tells us.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(neut, 'n')],
      lines: [
        { say: 'Here is what we need. This is hydrochloric acid mixed with sodium hydroxide solution. The acid gives hydrogen ions, in yellow, and chloride ions, in green.', show: ['n', 'n.labels', 'n.thermo'] },
        { say: 'The alkali gives sodium ions, in purple, and hydroxide ions: a red oxygen joined to a hydrogen.' },
        { say: 'Each time a hydrogen ion meets a hydroxide ion, they join to make a water molecule. Heat is given out, so the mixture warms up.', play: 'n.go', show: 'n.tally' },
        { say: 'The sodium and chloride ions do not change. They are left in the water as the salt, sodium chloride. Keep an eye on the thermometer, because it is part b of our question.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Acid + alkali → **salt** + **water**', 'Salt name: the **metal** from the alkali, then the **acid** part', 'Temperature **rises**: heat given out, **exothermic**'] }],
      lines: [
        { say: 'Here is the plan. An acid and an alkali make a salt and water.', show: 'plan.0' },
        { say: 'The salt takes its first name from the metal in the alkali, and its second name from the acid.', show: 'plan.1' },
        { say: 'And a reaction that warms its surroundings gives out heat, so it is exothermic.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The word equation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part of the name', 'Comes from', 'Gives'],
          rows: [
            ['first', 'the metal in **sodium** hydroxide', '**sodium**'],
            ['second', 'hydro**chlor**ic acid', '**chloride**'],
          ],
        },
        { kind: 'text', id: 'eq', size: 'md', md: 'sodium hydroxide + hydrochloric acid → **sodium chloride** + **water**' },
      ],
      lines: [
        { say: 'Step one. The first part of the salt\'s name comes from the metal in the alkali, which is sodium.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The second part comes from the acid. Hydrochloric acid makes chlorides.', show: 't.1', focus: 't.1' },
        { say: 'So the salt is sodium chloride, and the word equation is sodium hydroxide plus hydrochloric acid gives sodium chloride plus water. That is part a.', show: 'eq', focus: 'eq' },
      ],
    },
    {
      chapter: 'Step 2: The temperature',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['27 - 21 = 6\\ ^\\circ\\text{C rise}', '\\text{heat given out} \\Rightarrow \\good{\\text{exothermic}}'] }],
      lines: [
        { say: 'Step two. The temperature went from 21 to 27 degrees, a rise of 6 degrees.', caption: 'Step two. The temperature went from 21 °C to 27 °C, a rise of 6 °C.', show: 'm.0' },
        { say: 'The mixture warmed up, so the reaction gave out heat to its surroundings, just like the thermometer showed. That makes it exothermic. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Another salt',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Part of the name', 'Comes from', 'Gives'],
          rows: [
            ['first', 'the metal in **potassium** hydroxide', '**potassium**'],
            ['second', '**nitr**ic acid', '**nitrate**'],
          ],
        },
        { kind: 'text', id: 'kn', size: 'md', md: 'The salt is **potassium nitrate**' },
      ],
      lines: [
        { say: 'Step three. The same rule works for any acid and alkali. The metal in potassium hydroxide is potassium.', show: ['k', 'k.0'], focus: 'k.0' },
        { say: 'And nitric acid makes nitrates.', show: 'k.1', focus: 'k.1' },
        { say: 'So potassium hydroxide and nitric acid make potassium nitrate, and water. That is part c.', show: 'kn', focus: 'kn' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) sodium hydroxide + hydrochloric acid → **sodium chloride** + **water**. (b) **Exothermic**: the mixture warms up, so heat is given out. (c) **Potassium nitrate**.' },
      ],
      lines: [
        { say: 'Does it make sense? Sodium chloride is ordinary table salt, and if we evaporated the neutral solution, salt crystals would be left behind.', show: 'ans' },
        { say: 'So the salt is sodium chloride, the reaction is exothermic, and potassium hydroxide with nitric acid makes potassium nitrate.' },
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
            ['**Chlorine sodium**', 'The **metal** comes first'],
            ['**Endothermic**', 'A temperature **rise** means heat out'],
            ['Potassium **nitride**', 'Nitric acid makes **nitrates**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The salt\'s name always starts with the metal, so it is sodium chloride.', focus: 'traps.0' },
        { say: 'Endothermic reactions take in heat, so the mixture would get colder. This one got warmer, so it is exothermic.', focus: 'traps.1' },
        { say: 'And a nitride has no oxygen in it. Salts of nitric acid are nitrates.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which salt forms when calcium hydroxide neutralizes sulfuric acid?',
          choices: ['calcium chloride', 'calcium nitrate', 'calcium sulfate', 'sulfur hydroxide'],
          answer: 2,
          working: 'The metal is calcium, and sulfuric acid makes sulfates: calcium sulfate.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt forms when calcium hydroxide neutralizes sulfuric acid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The metal is calcium, and sulfuric acid makes sulfates, so it is calcium sulfate: choice C.', show: 'q2.answer' },
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
          items: ['Acid + alkali → **salt** + **water**', 'Salt: **metal** first, then **chloride**, **sulfate** or **nitrate**', 'Neutralization gives out heat: **exothermic**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An acid and an alkali make a salt and water.', show: 'sum.0' },
        { say: 'The salt\'s name starts with the metal, then chloride, sulfate or nitrate from the acid.', show: 'sum.1' },
        { say: 'And neutralization gives out heat, so it is exothermic. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
