import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import salts from '@/content/chemmore/videos/cx-1-3.ts';

// Exam question for More Chemistry Topics lesson 1.3 (making soluble salts): why copper(II) oxide is
// added in excess, how the spare solid is removed, and how to get pure, dry crystals. Written by
// Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's salt solution heated and cooled until crystals form
// (src/video/particles.ts).

const QUESTION = 'A student makes crystals of copper(II) sulfate from copper(II) oxide, an insoluble black solid, and dilute sulfuric acid. (a) The student adds copper(II) oxide to the warm acid until some is left over. Why? (b) How should the student remove the copper(II) oxide that is left over? (c) Describe how the student should get pure, dry crystals of copper(II) sulfate from the solution.';

const video: Explainer = {
  id: 'xq-cx-1-3',
  lessonId: '',
  exam: {
    lesson: 'cx-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Copper Sulfate Crystals from Copper Oxide. Making Soluble Salts',
  thumbnailTitle: 'Growing Salt Crystals',
  thumbnail: 'sc',
  summary:
    'A test-style question, solved one small step at a time: why add copper(II) oxide until some is left, how is the spare removed, and how do we get pure, dry crystals? The excess makes sure all the acid reacts, filtering removes the spare solid, and heating until crystals start to form, then cooling, filtering and drying gives the crystals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Growing Salt Crystals', subtitle: 'Excess, filter, crystallise' }],
      lines: [
        { say: 'In this video, we solve a test-style question about making a soluble salt. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'So all the acid reacts; filter; heat until crystals form, cool, filter and dry' }],
      lines: [
        { say: 'Here is the question. A student makes crystals of copper two sulfate from copper two oxide, an insoluble black solid, and dilute sulfuric acid. Part a: the student adds copper two oxide to the warm acid until some is left over. Why? Part b: how should the student remove the copper two oxide that is left over? Part c: describe how the student should get pure, dry crystals of copper two sulfate from the solution.', caption: 'Here is the question. A student makes crystals of copper(II) sulfate from copper(II) oxide, an insoluble black solid, and dilute sulfuric acid. Part a: the student adds copper(II) oxide to the warm acid until some is left over. Why? Part b: how should the student remove the copper(II) oxide that is left over? Part c: describe how the student should get pure, dry crystals of copper(II) sulfate from the solution.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Explain each step of the **method**, from the acid to the dry **crystals**' }],
      lines: [
        { say: 'This question walks through the method for a soluble salt. For each step, we need what the student does and why.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(salts, 'sc')],
      lines: [
        { say: 'Here is what we need. This is a salt solution in an evaporating basin, up close. It is sodium chloride here, but every soluble salt crystallises in the same way.', show: ['sc', 'sc.labels'] },
        { say: 'Heating drives some of the water off as vapour, and the solution becomes more concentrated.', play: 'sc.heat' },
        { say: 'As it cools, the ions left behind lock together in a regular pattern: a crystal.', play: 'sc.cool' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the solid in **excess**', '**Filter** off the spare solid', '**Heat** until crystals start to form, then **cool**'] }],
      lines: [
        { say: 'Here is the plan. Add the solid base until some is left over.', show: 'plan.0' },
        { say: 'Filter off the spare solid.', show: 'plan.1' },
        { say: 'Then heat the solution until crystals start to form, and let it cool.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Why excess?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CuO + H2SO4 -> CuSO4 + H2O}', '\\text{solid left over} \\Rightarrow \\good{\\text{all the acid has reacted}}'] }],
      lines: [
        { say: 'Step one. Copper two oxide reacts with sulfuric acid to make copper two sulfate and water.', caption: 'Step one. Copper(II) oxide reacts with sulfuric acid to make copper(II) sulfate and water.', show: 'm.0' },
        { say: 'When some black solid is left over, there is no acid left for it to react with. So adding it in excess makes sure all of the acid is used up, and the solution holds only the salt and water. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Removing the spare solid',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Copper(II) oxide is **insoluble**', '**Filter** the mixture', 'The black solid stays in the paper; the **blue solution** passes through'] }],
      lines: [
        { say: 'Step two. Copper two oxide does not dissolve.', caption: 'Step two. Copper(II) oxide does not dissolve.', show: 's.0' },
        { say: 'So we can filter the mixture.', show: 's.1' },
        { say: 'The spare black solid stays in the filter paper, and the blue salt solution passes through. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Pure, dry crystals',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Do this', 'Because'],
          rows: [
            ['**heat** the solution in an evaporating basin', 'it becomes more **concentrated**'],
            ['stop when crystals **start** to form', 'boiling dry gives a **powder**'],
            ['leave to **cool**', 'crystals **grow** as it cools'],
            ['**filter** and **dry** between filter papers', 'removes the leftover solution'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Heat the solution in an evaporating basin, so some water evaporates and it becomes more concentrated.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Stop when crystals just start to form, because boiling it dry gives a powder.', show: 't.1', focus: 't.1' },
        { say: 'Leave it to cool, and crystals grow, just as we saw.', show: 't.2', focus: 't.2' },
        { say: 'Then filter off the crystals and pat them dry between filter papers. That is part c.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) So that **all the acid reacts**. (b) **Filter**. (c) **Heat** until crystals start to form, leave to **cool**, then **filter** and **dry** the crystals between filter papers.' },
      ],
      lines: [
        { say: 'Does it make sense? Any acid left over would end up in the crystals, and the excess solid is easy to filter off, so the method keeps the salt pure.', show: 'ans' },
        { say: 'So excess uses up the acid, filtering removes the spare oxide, and heating, cooling, filtering and drying gives the crystals.' },
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
            ['To make **more salt**', 'Excess is about using up the **acid**'],
            ['**Evaporate** the oxide away', 'It is a **solid**: filter it'],
            ['**Boil it dry**', 'That gives a **powder**, not crystals'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The amount of salt is set by the acid. The excess is there to make sure none of the acid is left.', focus: 'traps.0' },
        { say: 'The copper two oxide is an insoluble solid, so filtering is the way to remove it.', caption: 'The copper(II) oxide is an insoluble solid, so filtering is the way to remove it.', focus: 'traps.1' },
        { say: 'And boiling the solution dry gives a powder, and the hot solid can spit out of the basin.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which salt forms when zinc oxide reacts with dilute nitric acid?',
          choices: ['zinc chloride', 'zinc sulfate', 'zinc nitrate', 'zinc oxide nitrate'],
          answer: 2,
          working: 'The metal is zinc, and nitric acid makes nitrates: zinc nitrate.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt forms when zinc oxide reacts with dilute nitric acid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The metal is zinc, and nitric acid makes nitrates, so it is zinc nitrate: choice C.', show: 'q2.answer' },
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
          items: ['Add the insoluble base in **excess**', '**Filter** off the spare solid', '**Heat**, **cool**, filter and dry for crystals'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Add the insoluble base in excess, so all the acid reacts.', show: 'sum.0' },
        { say: 'Filter off the spare solid.', show: 'sum.1' },
        { say: 'Then heat until crystals start to form, cool, filter and dry. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
