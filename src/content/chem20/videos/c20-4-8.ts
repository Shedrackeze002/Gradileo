import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { buretteScale, rig } from './lib/c20-4b-figures.ts';

// A burette over a conical flask, named part by part.
const setup = (id: string) => figure(id, [rig()], 560);

// A close-up of the burette's scale, read at eye level at the bottom of the meniscus.
const scale = figure('s', [buretteScale()], 520);

const video: Explainer = {
  id: 'c20-4-8',
  lessonId: 'c20-4-8',
  title: 'Titration, Part 1: How a Titration Is Done',
  thumbnailTitle: 'How a Titration Is Done',
  thumbnail: 'r',
  summary:
    'In a titration, a standard solution of known concentration, the titrant, is added from a burette to a pipetted sample with an indicator, until one drop changes the indicator’s colour for good. A burette reads downward, so the volume added is the final reading minus the initial reading, read at eye level to the nearest 0.05 mL. The endpoint, where the indicator changes colour, should match the equivalence point, where the titrant has reacted exactly with the sample.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'How a Titration Is Done', subtitle: 'A burette, a flask and an indicator' }],
      lines: [
        { say: 'How much acid is in a bottle of vinegar? A food-testing lab cannot see the acid, or weigh it apart from the water around it.', show: 'title' },
        { say: 'Instead, a chemist adds a base of known concentration, drop by drop, until the acid is exactly used up. The volume of base it took gives away how much acid there was.' },
        { say: 'In this lesson, you will learn about titration. This part shows how it is done. Later parts find a concentration, read titration curves, and choose an indicator.' },
      ],
    },
    {
      chapter: 'Titration',
      layout: 'split',
      leftWidth: 460,
      left: [setup('r')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Titration', md: 'The gradual addition of one solution from a burette to a measured volume of another, until the reaction between them is complete. The solution added is the **titrant**, usually a **standard solution** of precisely known concentration.' },
        { kind: 'callout', id: 'bur', tone: 'definition', title: 'Burette', md: 'A long glass tube marked in millilitres, with a tap at the bottom. Its scale reads **downward**, from 0 at the top.' },
      ],
      lines: [
        { say: 'A titration is the gradual addition of one solution from a burette to a measured volume of another, until the reaction between them is complete.', show: ['def', 'r.flask', 'r.sample', 'r.burette'] },
        { say: 'The solution added from the burette is the titrant. It is usually a standard solution, one whose concentration is known precisely.', show: 'r.titrant', focus: 'r.titrant' },
        { say: 'A burette is a long glass tube marked in millilitres, with a tap at the bottom. Its scale reads downward, from zero at the top.', show: ['bur', 'r.scale', 'r.tap'], focus: 'r.scale' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'split',
      leftWidth: 460,
      left: [setup('r')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Pipette** an exact volume of the sample into a conical flask.',
            '**Add** a few drops of indicator.',
            '**Fill** the burette with titrant, and record the initial reading.',
            '**Titrate** while swirling, until one drop changes the colour for good. Record the final reading.',
            '**Repeat**: a rough first trial, then until three trials agree within $0.20\\ \\text{mL}$.',
          ],
        },
      ],
      lines: [
        { say: 'First, pipette an exact volume of the sample, such as twenty-five point zero zero millilitres, into a clean conical flask.', show: ['b.0', 'r.flask', 'r.sample'] },
        { say: 'Second, add a few drops of indicator.', show: 'b.1' },
        { say: 'Third, fill the burette with the titrant, and record the initial reading.', show: ['b.2', 'r.burette', 'r.titrant', 'r.scale', 'r.tap'] },
        { say: 'Fourth, titrate. Add the titrant while swirling the flask, quickly at first and then drop by drop, until one drop makes the indicator change colour for good. Record the final reading.', show: ['b.3', 'r.drop', 'r.pink'], focus: 'r.pink' },
        { say: 'Fifth, repeat. The first trial is a quick, rough trial that usually overshoots. Repeat carefully until three trials agree within zero point two zero millilitres.', show: 'b.4', focus: 'r' },
      ],
    },
    {
      chapter: 'Reading the burette',
      layout: 'split',
      leftWidth: 560,
      left: [scale],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Read at **eye level**, at the bottom of the meniscus.', 'Read to the nearest $0.05\\ \\text{mL}$, with two decimal places: $18.40\\ \\text{mL}$.', 'Volume added $=$ final reading $-$ initial reading.'],
        },
      ],
      lines: [
        { say: 'Read the burette at eye level, at the bottom of the curved surface of the liquid, the meniscus.', show: ['s.tube', 's.scale', 's.liquid', 's.eye', 'b.0'], focus: 's.eye' },
        { say: 'Read it to the nearest zero point zero five millilitres, and write it with two decimal places, such as eighteen point four zero millilitres.', show: ['s.value', 'b.1'], focus: 's.value' },
        { say: 'Then the volume added is the final reading minus the initial reading.', show: 'b.2', focus: 's' },
      ],
    },
    {
      chapter: 'Equivalence point and endpoint',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivalence point and endpoint', md: 'The **equivalence point** is where the titrant added has reacted exactly with the sample, in the mole ratio of the balanced equation. The **endpoint** is where the indicator changes colour. A well-chosen indicator changes colour at, or within a drop of, the equivalence point.' },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Rinse with the right liquid', md: 'Rinse the burette with titrant and the pipette with sample, so that no water dilutes them. The flask can be wet with distilled water: that changes the volume, not the **amount** of sample.' },
      ],
      lines: [
        { say: 'The equivalence point is the moment when the titrant added has reacted exactly with the sample, in the mole ratio of the balanced equation.', show: 'def' },
        { say: 'The endpoint is the moment the indicator changes colour. A well-chosen indicator changes colour at, or within a drop of, the equivalence point.' },
        { say: 'One more tip: rinse the burette with titrant, and the pipette with sample, so no water dilutes them. The flask can be wet with distilled water, which changes the volume, but not the amount of sample.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A burette reads $2.35\\ \\text{mL}$ before a titration and $21.80\\ \\text{mL}$ at the endpoint. What volume of titrant was added?',
          choices: ['$24.15\\ \\text{mL}$', '$21.80\\ \\text{mL}$', '$18.45\\ \\text{mL}$', '$19.45\\ \\text{mL}$'],
          answer: 3,
          working: 'Volume added $=$ final reading $-$ initial reading $= 21.80 - 2.35 = 19.45\\ \\text{mL}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A burette reads two point three five millilitres before a titration, and twenty-one point eight zero millilitres at the endpoint. What volume of titrant was added? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nineteen point four five millilitres: the final reading minus the initial reading. Choice A adds the readings, and choice B is just the final reading.', show: 'q.answer' },
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
          items: ['A **titrant** from a **burette** is added to a pipetted sample with an indicator.', 'Volume added $=$ final reading $-$ initial reading, read to the nearest $0.05\\ \\text{mL}$.', 'The **endpoint**, a colour change, should match the **equivalence point**, the exact reaction.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a titration, a titrant from a burette is added to a pipetted sample with an indicator.', show: 'sum.0' },
        { say: 'The volume added is the final reading minus the initial reading.', show: 'sum.1' },
        { say: 'And the endpoint, where the colour changes, should match the equivalence point. In part two, you will turn titration data into a concentration. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
