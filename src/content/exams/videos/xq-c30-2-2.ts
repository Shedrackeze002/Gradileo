import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import numbers from '@/content/chem30/videos/c30-2-2.ts';

// Exam question for Chemistry 30 lesson 2.2 (oxidation numbers): ethene burns,
// C2H4 + 3O2 -> 2CO2 + 2H2O. Assign oxidation numbers, say which element is oxidised and which is
// reduced, and find how many electrons one ethene molecule loses. Gradileo wrote the question in
// the style of a unit test. The answer: C goes from -2 to +4 and is oxidised; O goes from 0 to -2
// and is reduced; H stays +1; each ethene (two carbons) loses 2 x 6 = 12 electrons, which the six
// oxygen atoms of 3 O2 gain (6 x 2 = 12).
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's hydrogen and chlorine
// atoms sharing a pair that chlorine pulls closer, and an ethene molecule burning in oxygen.

const QUESTION = 'Ethene burns in oxygen: C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g). (a) Assign an oxidation number to each atom in every species. (b) Which element is oxidised and which is reduced? (c) How many electrons does one molecule of ethene lose?';

const video: Explainer = {
  id: 'xq-c30-2-2',
  lessonId: '',
  exam: {
    lesson: 'c30-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Burning Ethene, Atom by Atom. Oxidation Numbers',
  thumbnailTitle: 'Burning Ethene, Atom by Atom',
  thumbnail: 'eb',
  summary:
    'A test-style question, solved one small step at a time: ethene burns in oxygen to give carbon dioxide and water. We assign oxidation numbers to every atom, see that carbon rises from −2 to +4 while oxygen falls from 0 to −2, and find that each ethene molecule loses 12 electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Burning Ethene, Atom by Atom', subtitle: 'Oxidation numbers in a reaction between molecules' }],
      lines: [
        { say: 'In this video, we solve a test-style question about oxidation numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
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
          prompt: 'Ethene burns in oxygen: $\\ce{C2H4(g) + 3O2(g) -> 2CO2(g) + 2H2O(g)}$. (a) Assign an oxidation number to each atom in every species. (b) Which element is oxidised and which is reduced? (c) How many electrons does one molecule of ethene lose?',
          answer: 'C: −2 → +4, oxidised; O: 0 → −2, reduced; H stays +1; 12 electrons',
        },
      ],
      lines: [
        { say: 'Here is the question. Ethene burns in oxygen: C two H four plus three oxygen molecules give two carbon dioxide plus two water. Part a: assign an oxidation number to each atom in every species. Part b: which element is oxidised and which is reduced? Part c: how many electrons does one molecule of ethene lose?', show: 'q', caption: 'Here is the question. Ethene burns: C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g). (a) Assign an oxidation number to each atom in every species. (b) Which element is oxidised and which is reduced? (c) How many electrons does one molecule of ethene lose?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'No ions here, so we track electrons with **oxidation numbers**: **up** is oxidation, **down** is reduction' }],
      lines: [
        { say: 'Every substance here is a molecule with no charge, so we cannot see the electrons move from the charges. Instead, we give each atom an oxidation number. A number that goes up means oxidation, and a number that goes down means reduction.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        pick(numbers, 'hcl'),
        { kind: 'math', id: 'k', size: 'md', lines: ['\\ce{H} = +1 \\quad \\ce{O} = -2 \\quad \\text{element} = 0 \\quad \\text{sum} = 0'] },
      ],
      lines: [
        { say: 'Here is what we need. A hydrogen atom and a chlorine atom.', show: ['hcl', 'hcl.labels'] },
        { say: 'Watch them share a pair of electrons, and then chlorine pull the pair towards itself.', play: 'hcl.go' },
        { say: 'An oxidation number pretends the pull is complete, as if the more electronegative atom took the whole pair. That is why hydrogen in a compound is usually plus one, and oxygen is usually minus two.' },
        { say: 'An element on its own is zero, because both atoms pull equally. And the numbers in a neutral molecule add up to zero.', show: 'k.0', caption: 'H is +1, O is −2, an element on its own is 0, and the numbers in a neutral molecule add up to 0.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use **H = +1**, **O = −2** and **elements = 0** to find each number', 'An element whose number goes **up** is **oxidised**', 'Multiply the change for carbon by the **carbons per molecule**'] }],
      lines: [
        { say: 'Here is the plan. First, use the rules to find every oxidation number, working out carbon from the others.', show: 'plan.0', caption: 'Here is the plan. First, use H = +1, O = −2 and elements = 0 to find every oxidation number, working out carbon from the others.' },
        { say: 'Then compare. An element whose number goes up is oxidised, and one whose number goes down is reduced.', show: 'plan.1' },
        { say: 'Then multiply carbon\'s change by the number of carbon atoms in one ethene molecule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The oxidation numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'n', size: 'md', lines: ['\\ce{C2H4}: \\ 2x + 4(+1) = 0 \\Rightarrow x = \\good{-2}', '\\ce{O2}: \\ \\good{0}', '\\ce{CO2}: \\ x + 2(-2) = 0 \\Rightarrow x = \\good{+4}', '\\ce{H2O}: \\ \\ce{H} = \\good{+1},\\ \\ce{O} = \\good{-2}'] },
      ],
      lines: [
        { say: 'Step one. In ethene, the four hydrogens are plus one each, plus four in all. The two carbons must cancel that, so together they are minus four, and each carbon is minus two.', show: 'n.0', focus: 'n.0', caption: 'Step one. In C₂H₄, the four hydrogens are +1 each, +4 in all. The two carbons must cancel that: 2x + 4 = 0, so each carbon is −2.' },
        { say: 'Oxygen gas is an element, so each oxygen atom is zero.', show: 'n.1', focus: 'n.1', caption: 'O₂ is an element, so each oxygen atom is 0.' },
        { say: 'In carbon dioxide, two oxygens at minus two make minus four, so carbon is plus four.', show: 'n.2', focus: 'n.2', caption: 'In CO₂, two oxygens at −2 make −4, so carbon is +4.' },
        { say: 'And in water, hydrogen is plus one and oxygen is minus two.', show: 'n.3', focus: 'n.3', caption: 'And in H₂O, H is +1 and O is −2.' },
      ],
    },
    {
      chapter: 'Step 2: Up and down',
      layout: 'center',
      main: [
        reaction('eb', { from: [{ t: 'C2H4' }, { t: 'O2', n: 3 }], to: [{ t: 'CO2', n: 2 }, { t: 'H2O', n: 2 }], counts: true }),
        { kind: 'math', id: 'u', size: 'md', lines: ['\\ce{C}: -2 \\to +4 \\ \\text{(up, } \\good{\\text{oxidised}}) \\qquad \\ce{O}: 0 \\to -2 \\ \\text{(down, } \\good{\\text{reduced}})'] },
      ],
      lines: [
        { say: 'Step two. Here is one ethene molecule and three oxygen molecules. Watch the atoms swap partners.', show: 'eb', play: 'eb.go' },
        { say: 'Each carbon atom leaves its hydrogens and joins two oxygens. Its number goes from minus two up to plus four, so carbon is oxidised.', show: 'u.0', caption: 'Each carbon atom leaves its hydrogens and joins two oxygens. Its number goes from −2 up to +4, so carbon is oxidised.' },
        { say: 'Every oxygen atom goes from zero in oxygen gas down to minus two, in both carbon dioxide and water, so oxygen is reduced. Hydrogen is plus one on both sides, so it is neither.', focus: 'u.0' },
      ],
    },
    {
      chapter: 'Step 3: Electrons lost',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['\\text{per carbon: } +4 - (-2) = 6e^-', '\\text{per } \\ce{C2H4}: 2 \\times 6 = \\good{12\\ \\text{electrons}}'] }],
      lines: [
        { say: 'Step three. A rise of one in oxidation number is one electron lost. Carbon rises from minus two to plus four, a rise of six, so each carbon atom loses six electrons.', show: 'e.0', focus: 'e.0', caption: 'Step three. A rise of one is one electron lost. Carbon rises from −2 to +4, a rise of 6, so each carbon atom loses 6 electrons.' },
        { say: 'One ethene molecule has two carbon atoms, so it loses twelve electrons.', show: 'e.1', focus: 'e.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'c', size: 'md', lines: ['\\text{gained: } 6\\ \\ce{O} \\text{ atoms} \\times 2e^- = 12e^-', '\\text{lost} = \\text{gained} = 12'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'C: $-2 \\to +4$, **oxidised**. O: $0 \\to -2$, **reduced**. H stays $+1$. One ethene loses **12 electrons**.' },
      ],
      lines: [
        { say: 'Does it make sense? Three oxygen molecules have six oxygen atoms, and each falls by two, so they gain twelve electrons. That is exactly what the ethene lost.', show: ['c.0', 'c.1'] },
        { say: 'So carbon is oxidised from minus two to plus four, oxygen is reduced from zero to minus two, hydrogen stays plus one, and one ethene molecule loses twelve electrons.', show: 'ans', caption: 'So carbon is oxidised from −2 to +4, oxygen is reduced from 0 to −2, hydrogen stays +1, and one ethene molecule loses 12 electrons.' },
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
            ['C is $-4$ in $\\ce{C2H4}$', 'Gave **one** carbon the whole $-4$; there are **two** carbons'],
            ['Oxygen is oxidised', 'Its number **falls** from 0 to −2, which is **reduction**'],
            ['$6$ electrons', 'Counted **one** carbon; each ethene has **two**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Carbon at minus four comes from forgetting that ethene has two carbons. They share the minus four, so each one is minus two.', focus: 'traps.0' },
        { say: 'Saying oxygen is oxidised gets the direction backwards. Its number goes down, so it has gained electrons, and it is reduced.', focus: 'traps.1' },
        { say: 'And six electrons is what one carbon atom loses. One ethene molecule has two of them.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ammonia burns: $\\ce{4NH3(g) + 3O2(g) -> 2N2(g) + 6H2O(g)}$. The oxidation number of nitrogen changes from',
          choices: ['$-3$ to $+2$', '$-3$ to $0$', '$+3$ to $0$', '$0$ to $-3$'],
          answer: 1,
          working: 'In $\\ce{NH3}$, $x + 3(+1) = 0$, so N is $-3$. In $\\ce{N2}$, an element, N is $0$. It goes **up**, so nitrogen is oxidised.',
        },
      ],
      lines: [
        { say: 'Your turn. Ammonia burns: four N H three plus three oxygen molecules give two nitrogen molecules plus six water. The oxidation number of nitrogen changes from what, to what? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Ammonia burns: 4NH₃(g) + 3O₂(g) → 2N₂(g) + 6H₂O(g). The oxidation number of nitrogen changes from what, to what? Pause the video and try it.' },
        { say: 'In ammonia, three hydrogens at plus one make plus three, so nitrogen is minus three. In nitrogen gas, an element, it is zero. Minus three to zero: choice B.', show: 'q2.answer', caption: 'In NH₃, three H at +1 make +3, so N is −3. In N₂, an element, it is 0. −3 to 0: choice B.' },
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
          items: ['Use **H = +1**, **O = −2**, **elements = 0**, and a **sum of 0**', 'Number **up** means **oxidised**; number **down** means **reduced**', 'Electrons lost = **rise per atom** × **atoms per molecule**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Hydrogen is plus one, oxygen is minus two, an element is zero, and the numbers in a molecule add up to zero.', show: 'sum.0' },
        { say: 'A number that goes up means oxidised, and a number that goes down means reduced.', show: 'sum.1' },
        { say: 'The electrons lost are the rise for one atom times the number of those atoms in the molecule. For more on oxidation numbers, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
