import type { Explainer } from '@/video/script.ts';
import { boilOrBurn, sugarDissolving } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 1.4 (physical and chemical change): classify five changes.
// The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 27, section
// 1.3, CC BY-NC-SA 4.0). The book's answers: (a) physical, (b) chemical, (c) chemical,
// (d) physical, (e) physical.
//
// The pictures are the lesson's simulated particles: water boiled (every molecule is still water)
// beside hydrogen and oxygen sparked (the atoms join up as new molecules, counted), and a lump of
// sugar dissolving in water (the sugar particles spread out but stay sugar).

const QUESTION =
  'Classify each of the following changes as physical or chemical: (a) condensation of steam (b) burning of gasoline (c) souring of milk (d) dissolving of sugar in water (e) melting of gold';

const video: Explainer = {
  id: 'xq-c10-1-4',
  lessonId: '',
  exam: {
    lesson: 'c10-1-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 27, section 1.3, Physical and Chemical Properties',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/1-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Physical or Chemical Change? Steam, Gasoline, Milk, Sugar and Gold',
  thumbnailTitle: 'Physical or Chemical?',
  thumbnail: 'bb',
  summary:
    'A real test question, solved one small step at a time: is each of five changes physical or chemical? We watch water boil and hydrogen burn side by side, and see the one test that decides it: whether a new substance is made. Then we sort steam, gasoline, sour milk, dissolving sugar and melting gold.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Physical or Chemical?', subtitle: 'Classifying changes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks whether five changes are physical or chemical. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Classify each of the following changes as physical or chemical:<br>(a) condensation of steam<br>(b) burning of gasoline<br>(c) souring of milk<br>(d) dissolving of sugar in water<br>(e) melting of gold',
          answer: 'Physical: (a), (d), (e). Chemical: (b), (c).',
          working: 'A chemical change makes a new substance; a physical change does not.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Classify each of the following changes as physical or chemical. Condensation of steam, burning of gasoline, souring of milk, dissolving of sugar in water, and melting of gold.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'After each change, is it still the **same substance**?' }],
      lines: [
        { say: 'Five things change in this question. For each one, we must decide which of two kinds of change it is.', show: 'plain' },
        { say: 'That comes down to one question: after the change, do we still have the same substance, or a new one?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [boilOrBurn('bb', 400)],
      lines: [
        { say: 'Here is what we need, shown with particles. On the left is water. On the right, hydrogen and oxygen.', show: ['bb', 'bb.labels', 'bb.thermo'] },
        { say: 'Boil the water. The molecules fly apart into a gas, but every one is still a water molecule. Nothing new is made. That is a physical change: the substance only changes its state, shape or size.', play: 'bb.boil', playDelay: 0.3 },
        { say: 'Now a spark in the hydrogen and oxygen. The atoms break apart and join up in new ways, as water molecules. A new substance is made. That is a chemical change.', show: 'bb.tally', play: 'bb.spark' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['For each change, ask: is a **new substance** made?', 'No: **physical**. Yes: **chemical**', 'Look for signs: new gas, colour, smell, heat and light'] }],
      lines: [
        { say: 'Here is the plan. For each change, we ask: is a new substance made?', show: 'plan.0' },
        { say: 'If not, it is physical. If so, it is chemical.', show: 'plan.1' },
        { say: 'Signs of a new substance help: a new gas, a new colour or smell, or heat and light given out.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Changes of state',
      layout: 'center',
      main: [boilOrBurn('bb', 360), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) steam}\\to\\text{water: } \\ce{H2O(g) -> H2O(l)}', '\\text{(e) solid gold}\\to\\text{liquid gold: } \\ce{Au(s) -> Au(l)}'] }],
      lines: [
        { say: 'Step one: the changes of state. Condensation of steam is water vapour turning back into liquid water. It is the boiling we just watched, run backwards. Every molecule is still water, so it is physical.', show: ['bb', 'bb.labels', 'm.0'], focus: 'bb.w' },
        { say: 'Melting gold turns solid gold into liquid gold. Pour it into a mould, let it cool, and you have solid gold again. Still gold, so it is physical.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Dissolving',
      layout: 'center',
      main: [sugarDissolving('sd', 420)],
      lines: [
        { say: 'Step two: dissolving sugar in water. Watch the lump.', show: ['sd', 'sd.labels'] },
        { say: 'Water pulls the sugar particles away one by one, and they spread out through the water. But each one is still a sugar particle. Evaporate the water, and you get the sugar back. So dissolving is physical.', play: 'sd.drop', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 3: Burning and souring',
      layout: 'center',
      main: [boilOrBurn('bb', 360), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(b) gasoline} + \\ce{O2} \\to \\ce{CO2} + \\ce{H2O}\\ \\text{+ heat and light}', '\\text{(c) milk sugar} \\to \\text{lactic acid: sour taste, lumps}'] }],
      lines: [
        { say: 'Step three. Burning gasoline is like the spark we watched. Gasoline joins with oxygen from the air to make carbon dioxide and water, giving out heat and light. New substances, so it is chemical.', show: ['bb', 'bb.labels', 'bb.tally', 'm.0'], focus: 'bb.h', play: 'bb.spark', playDelay: 0.3 },
        { say: 'Milk turns sour when bacteria change the sugar in milk into lactic acid. The new sour taste, the new smell and the lumps all show a new substance, and you cannot turn sour milk back into fresh milk. So it is chemical.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Change', 'New substance?', 'Type'],
          rows: [
            ['(a) condensation of steam', 'No, still water', '**Physical**'],
            ['(b) burning of gasoline', 'Yes, CO₂ and H₂O', '**Chemical**'],
            ['(c) souring of milk', 'Yes, lactic acid', '**Chemical**'],
            ['(d) dissolving of sugar', 'No, still sugar', '**Physical**'],
            ['(e) melting of gold', 'No, still gold', '**Physical**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Condensation of steam, physical. Burning of gasoline, chemical. Souring of milk, chemical. Dissolving of sugar, physical. Melting of gold, physical.', show: 'ans' },
        { say: 'That matches the book. And notice the check that works every time: in each physical change, the substance at the end has the same name as the one at the start.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it is wrong'],
          rows: [
            ['Dissolving is chemical: the sugar vanishes', 'It is still there; evaporate to get it back'],
            ['Melting is chemical: it needs heat', 'Heat alone does not make a new substance'],
            ['Every change you cannot undo is chemical', 'Ask about **new substances**, not undoing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling dissolving chemical because the sugar seems to vanish. It is still there, spread out, and the water still tastes sweet.' },
        { say: 'Calling melting chemical because it needs heat. Heating can cause either kind of change. What matters is whether a new substance appears.' },
        { say: 'And judging only by whether a change can be undone. That is a useful hint, but the real test is always: is a new substance made?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a **chemical** change?',
          choices: ['Ice melting on a road', 'A puddle drying up', 'Salt dissolving in soup', 'A bicycle chain rusting'],
          answer: 3,
          working: 'Rust is a new substance: iron joins with oxygen and water to make iron oxide. The other three make nothing new.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a chemical change: ice melting, a puddle drying up, salt dissolving in soup, or a bicycle chain rusting? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, rusting. Iron joins with oxygen and water to make rust, a new substance. The other three are changes of state or dissolving, so they are physical.', show: 'q2.answer' },
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
          items: ['**Physical** change: same substance, new state, shape or size', '**Chemical** change: a **new substance** is made', 'Melting, condensing and dissolving are physical', 'Burning and souring are chemical'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a physical change, the substance stays the same: only its state, shape or size changes.', show: 'sum.0' },
        { say: 'In a chemical change, a new substance is made.', show: 'sum.1' },
        { say: 'Melting, condensing and dissolving are physical.', show: 'sum.2' },
        { say: 'Burning and souring are chemical. For more on physical and chemical change, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
