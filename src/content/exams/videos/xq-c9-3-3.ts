import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import types from '@/content/chem9/videos/c9-3-3.ts';

// Exam question for Chemistry 9 lesson 3.3 (types of reaction): classify three reactions, describe
// an iron nail in copper sulfate solution, and decide whether silver reacts with copper sulfate.
// Written by Gradileo in the style of a Grade 9 science unit test.
//
// The picture is the lesson's iron nail in copper sulfate beside copper in iron sulfate, with the
// copper ions turning into copper on the iron (src/video/particles.ts).

const QUESTION = 'The reactivity series, most reactive first: potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver, gold. (a) Name the type of each reaction: (i) copper carbonate → copper oxide + carbon dioxide, on heating; (ii) zinc + copper sulfate → zinc sulfate + copper; (iii) propane + oxygen → carbon dioxide + water. (b) An iron nail is put into blue copper sulfate solution. Describe two things you would see. (c) Would silver react with copper sulfate solution? Explain.';

const video: Explainer = {
  id: 'xq-c9-3-3',
  lessonId: '',
  exam: {
    lesson: 'c9-3-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Three Reactions, an Iron Nail and Silver. Types of Reaction',
  thumbnailTitle: 'Types of Reaction and the Reactivity Series',
  thumbnail: 'dp',
  summary:
    'A test-style question, solved one small step at a time: what type is each of three reactions, what happens to an iron nail in copper sulfate, and does silver react with copper sulfate? The reactions are decomposition, displacement and combustion, the nail gets a brown copper coating while the blue colour fades, and silver is below copper in the reactivity series, so nothing happens.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Types of Reaction', subtitle: 'And the reactivity series' }],
      lines: [
        { say: 'In this video, we solve a test-style question about types of reaction and the reactivity series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Decomposition, displacement, combustion; brown coating, blue fades; no' }],
      lines: [
        { say: 'Here is the question. The reactivity series, most reactive first, is potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver and gold.', show: 'q' },
        { say: 'Part a: name the type of each reaction. First, copper carbonate makes copper oxide and carbon dioxide, on heating. Second, zinc and copper sulfate make zinc sulfate and copper. Third, propane and oxygen make carbon dioxide and water. Part b: an iron nail is put into blue copper sulfate solution. Describe two things you would see. Part c: would silver react with copper sulfate solution? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Spot each reaction\'s **pattern**, then use the **series** to see who can push whom out' }],
      lines: [
        { say: 'Most reactions follow a few patterns. Once we spot the pattern, the reactivity series tells us whether a displacement can happen at all.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(types, 'dp')],
      lines: [
        { say: 'Here is what we need. On the left, an iron nail in blue copper sulfate solution. On the right, a piece of copper in iron sulfate solution.', show: ['dp', 'dp.labels', 'dp.key'] },
        { say: 'Watch. Each copper ion that hits the iron becomes a copper atom and settles on the nail, while an iron atom leaves as an ion. The copper coating builds up, and the blue copper ions are used up.', play: 'dp.go', show: 'dp.tally', focus: 'dp.fe' },
        { say: 'On the right, nothing happens, because copper is below iron in the series.', focus: 'dp.cu' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Synthesis** joins; **decomposition** breaks apart', '**Displacement** swaps a metal; **combustion** burns a fuel', 'A metal displaces another only if it is **higher** in the series'] }],
      lines: [
        { say: 'Here is the plan. Synthesis joins substances into one, and decomposition breaks one substance apart.', show: 'plan.0' },
        { say: 'Displacement swaps a more reactive element in, and combustion burns a fuel in oxygen.', show: 'plan.1' },
        { say: 'And a metal displaces another from its compound only if it is higher in the series.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The three reactions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reaction', 'Pattern', 'Type'],
          rows: [
            ['copper carbonate → two products', 'one substance **breaks apart**', '**decomposition**'],
            ['zinc + copper sulfate', 'zinc **swaps in** for copper', '**displacement**'],
            ['propane + oxygen', 'a **fuel** burns in oxygen', '**combustion**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Copper carbonate is one substance breaking down into two when heated. That is decomposition.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Zinc takes the place of copper in copper sulfate. That is displacement.', show: 't.1', focus: 't.1' },
        { say: 'And propane is a fuel burning in oxygen to make carbon dioxide and water. That is combustion. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: The iron nail',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Iron is **above** copper, so it **displaces** it', 'A **brown** coating of copper forms on the nail', 'The **blue** colour of the solution **fades**'] }],
      lines: [
        { say: 'Step two. Iron is above copper in the series, so iron displaces copper from copper sulfate, just as we saw.', show: 's.0' },
        { say: 'The copper settles on the nail as a brown coating.', show: 's.1', focus: 's.1' },
        { say: 'And the blue copper ions are used up, so the blue colour fades. Those are the two things we would see. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Silver',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ldots \\text{ copper}, \\text{ silver}, \\text{ gold}', '\\text{silver is below copper} \\Rightarrow \\good{\\text{no reaction}}'] }],
      lines: [
        { say: 'Step three. Look at the end of the series: copper, then silver, then gold.', show: 'm.0' },
        { say: 'Silver is below copper, so it is less reactive and cannot push copper out of its compound. Nothing happens. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Decomposition**, **displacement**, **combustion**. (b) A **brown coating** forms on the nail, and the **blue colour fades**. (c) **No**: silver is **below copper** in the series, so it cannot displace it.' },
      ],
      lines: [
        { say: 'Does it make sense? Silver jewellery does not dissolve away or turn brown in water with copper in it, which fits silver being less reactive.', show: 'ans' },
        { say: 'So the reactions are decomposition, displacement and combustion, the nail turns brown as the blue fades, and silver does not react.' },
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
            ['Copper carbonate is **synthesis**', 'It **breaks apart**; synthesis joins'],
            ['The nail turns **blue**', 'The blue **leaves** the solution'],
            ['Silver displaces copper', 'Read the series the **wrong way**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Synthesis joins substances together. Copper carbonate is breaking apart, so that is decomposition.', focus: 'traps.0' },
        { say: 'The nail goes brown with copper. It is the solution that loses its blue colour.', focus: 'traps.1' },
        { say: 'And only a metal higher in the series can displace another. Silver is lower than copper.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which metal could displace iron from iron sulfate solution?',
          choices: ['Copper', 'Silver', 'Zinc', 'Lead'],
          answer: 2,
          working: 'Only zinc is above iron in the series. Copper, silver and lead are all below it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which metal could displace iron from iron sulfate solution? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Only zinc is above iron in the series, so zinc can displace it: choice C. Copper, silver and lead are all below iron.', show: 'q2.answer' },
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
          items: ['Four types: **synthesis**, **decomposition**, **displacement**, **combustion**', 'A metal displaces another only if it is **higher**', 'Displacement: a **coating** forms and the colour **changes**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Most reactions are synthesis, decomposition, displacement or combustion.', show: 'sum.0' },
        { say: 'A metal displaces another from its compound only if it is higher in the series.', show: 'sum.1' },
        { say: 'And in a displacement, a coating of the pushed-out metal forms and the colour of the solution changes. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
