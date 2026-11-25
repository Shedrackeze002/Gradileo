import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import mass from '@/content/chem9/videos/c9-3-1.ts';

// Exam question for Chemistry 9 lesson 3.1 (conservation of mass): magnesium burning to magnesium
// oxide, marble chips fizzing in an open flask on a balance, and how to show that mass is
// conserved. Written by Gradileo in the style of a Grade 9 science unit test.
//
// The pictures are the lesson's sealed flask of hydrogen and oxygen reacting with the atom count
// held steady, and its open and sealed containers fizzing (src/video/particles.ts).

const QUESTION = 'Answer these questions about conservation of mass. (a) 12 g of magnesium reacts completely with 8 g of oxygen to make magnesium oxide. What mass of magnesium oxide is made? (b) Marble chips are added to acid in an open flask on a balance. The reading falls from 150.0 g to 148.2 g as the mixture fizzes. Explain why the mass falls, and work out the mass of gas given off. (c) Describe how the experiment could be changed to show that mass is conserved.';

const video: Explainer = {
  id: 'xq-c9-3-1',
  lessonId: '',
  exam: {
    lesson: 'c9-3-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Magnesium Oxide and a Fizzing Flask. Conservation of Mass',
  thumbnailTitle: 'Where Did the Mass Go?',
  thumbnail: 'oc',
  summary:
    'A test-style question, solved one small step at a time: what mass of magnesium oxide do 12 g of magnesium and 8 g of oxygen make, why does a fizzing open flask lose mass, and how could we show that mass is conserved? The oxide weighs 20 g, the flask loses 1.8 g of carbon dioxide into the air, and sealing the flask keeps the gas in so the reading stays the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Did the Mass Go?', subtitle: 'Conservation of mass' }],
      lines: [
        { say: 'In this video, we solve a test-style question about conservation of mass. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '20 g; gas escapes, 1.8 g; seal the flask' }],
      lines: [
        { say: 'Here is the question. Part a: twelve grams of magnesium reacts completely with eight grams of oxygen to make magnesium oxide. What mass of magnesium oxide is made? Part b: marble chips are added to acid in an open flask on a balance. The reading falls from one hundred and fifty point zero grams to one hundred and forty eight point two grams as the mixture fizzes. Explain why the mass falls, and work out the mass of gas given off. Part c: describe how the experiment could be changed to show that mass is conserved.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Mass is never lost in a reaction. If the balance says it is, find where it **went**' }],
      lines: [
        { say: 'Mass cannot be created or destroyed in a reaction. So when a balance reading changes, something must have left or joined the container.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(mass, 'c')],
      lines: [
        { say: 'Here is what we need. Hydrogen and oxygen molecules in a sealed flask: thirty six atoms in all.', show: ['c', 'c.labels', 'c.tally', 'c.thermo'] },
        { say: 'A spark sets them reacting, and the atoms join up again as water. Watch the count: it never changes. The same atoms are there, only joined differently, so the mass stays the same.', play: 'c.spark', focus: 'c.b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Mass of products = mass of **reactants**', 'In an **open** container, a gas can **escape**', 'In a **closed** container, nothing gets in or out'] }],
      lines: [
        { say: 'Here is the plan. The total mass of the products equals the total mass of the reactants.', show: 'plan.0' },
        { say: 'In an open container, a gas made in the reaction can escape into the air.', show: 'plan.1' },
        { say: 'And in a closed container, nothing can get in or out.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Magnesium oxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{magnesium} + \\text{oxygen} \\rightarrow \\text{magnesium oxide}', '12 \\text{ g} + 8 \\text{ g} = \\good{20 \\text{ g}}'] }],
      lines: [
        { say: 'Step one. Magnesium and oxygen react to make magnesium oxide, and every atom ends up in the product.', show: 'm.0' },
        { say: 'So the mass of magnesium oxide is twelve plus eight, which is twenty grams. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The open flask',
      layout: 'center',
      main: [pick(mass, 'oc')],
      lines: [
        { say: 'Step two. Here the same kind of fizzing happens in two containers. On the left is an open beaker, open to the air just like the flask in the question. Watch its count fall as the gas escapes into the air.', show: ['oc', 'oc.labels', 'oc.tally'], play: 'oc.fizz', focus: 'oc.o' },
        { say: 'The fizz is carbon dioxide. In the open flask it escapes, so the balance no longer weighs it. The mass lost is one hundred and fifty point zero take away one hundred and forty eight point two, which is one point eight grams of gas. That is part b.', caption: 'The fizz is carbon dioxide. In the open flask it escapes, so the balance no longer weighs it. The mass lost is 150.0 − 148.2 = 1.8 g of gas. That is part b.', focus: 'oc.o' },
      ],
    },
    {
      chapter: 'Step 3: Closing the system',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Do it in a **sealed** flask, or put a **balloon** over the top', 'The gas is **trapped** and still weighed', 'The reading **stays the same**: mass is conserved'] }],
      lines: [
        { say: 'Step three. Do the reaction in a sealed flask, or stretch a balloon over the top. In the animation, that is the sealed flask on the right.', show: 's.0' },
        { say: 'Now the carbon dioxide is trapped, and it is still on the balance.', show: 's.1' },
        { say: 'So the reading stays the same from start to finish, which shows mass is conserved. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **20 g**. (b) The **carbon dioxide escapes** from the open flask: **1.8 g** of gas. (c) Use a **sealed flask** or a **balloon**, so the gas stays on the balance and the reading **does not change**.' },
      ],
      lines: [
        { say: 'Does it make sense? The mass did not vanish. It left the flask as a gas, and once we trap the gas, the mass is all still there.', show: 'ans' },
        { say: 'So the oxide is twenty grams, one point eight grams of gas escaped, and sealing the flask shows that mass is conserved.' },
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
            ['Magnesium oxide is **12 g**', 'Forgot the **oxygen** joins it'],
            ['Mass is **destroyed** in the reaction', 'It **escaped** as a gas'],
            ['Use a **bigger** flask', 'It must be **closed**, not bigger'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The oxygen becomes part of the magnesium oxide, so its mass counts too.', focus: 'traps.0' },
        { say: 'Mass is never destroyed in a reaction. The balance fell because the gas left.', focus: 'traps.1' },
        { say: 'And a bigger open flask still lets the gas out. What matters is closing it.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '12.4 g of copper carbonate is heated. It breaks down into 8.0 g of copper oxide and carbon dioxide gas. What mass of carbon dioxide is made?',
          choices: ['4.4 g', '20.4 g', '8.0 g', '12.4 g'],
          answer: 0,
          working: '12.4 g − 8.0 g = 4.4 g of carbon dioxide.',
        },
      ],
      lines: [
        { say: 'Your turn. Twelve point four grams of copper carbonate is heated. It breaks down into eight point zero grams of copper oxide and carbon dioxide gas. What mass of carbon dioxide is made? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The products together must weigh twelve point four grams, so the carbon dioxide is twelve point four take away eight point zero, which is four point four grams: choice A.', show: 'q2.answer' },
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
          items: ['Mass of products = mass of **reactants**', 'An **open** container loses any gas made', 'A **closed** container shows mass is conserved'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The mass of the products equals the mass of the reactants.', show: 'sum.0' },
        { say: 'An open container loses any gas the reaction makes, so the reading falls.', show: 'sum.1' },
        { say: 'And a closed container keeps everything in, so it shows mass is conserved. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
