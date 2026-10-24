import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flaskOnBalance, labels } from './lib/c10-4-figures.ts';

// A sealed flask and an open one, side by side.
const both = figure(
  'f',
  [
    flaskOnBalance({ name: 'c', stopper: true, readings: [] }),
    flaskOnBalance({ name: 'o', at: [6.6, 0], readings: [] }),
    labels([
      { id: 'closed', at: [0, -0.3], tex: '\\text{closed}' },
      { id: 'open', at: [6.6, -0.3], tex: '\\text{open}' },
    ]),
  ],
  440,
);
// Marble chips in acid in an open flask: the reading before and after the fizzing.
const marble = figure('fl', [flaskOnBalance({ readings: [{ id: 'r0', tex: '85.40\\ \\text{g}' }, { id: 'r1', tex: '84.52\\ \\text{g}' }] })], 500);

const video: Explainer = {
  id: 'c10-4-1-d',
  lessonId: 'c10-4-1',
  title: 'Word Equations and Conservation of Mass, Part 4: Open and Closed Containers',
  thumbnailTitle: 'Open and Closed Containers',
  thumbnail: 'f',
  summary:
    'Mass is conserved in every reaction, but in an open container a balance does not always show it: the mass falls when a gas escapes and rises when a gas from the air is taken in. In a sealed container the reading never changes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 4', title: 'Open and Closed Containers', subtitle: 'When the balance seems to disagree' }],
      lines: [
        { say: 'Put fizzing marble chips on a balance, and the reading falls. Heat magnesium in a crucible, and it rises. So is mass destroyed in one reaction, and made in the other?', show: 'title' },
        { say: 'In this part, you will see why mass is conserved in every reaction, even when a balance seems to say otherwise.' },
      ],
    },
    {
      chapter: 'Closed and open systems',
      layout: 'split',
      leftWidth: 620,
      left: [both],
      right: [
        { kind: 'callout', id: 'closed', tone: 'definition', title: 'Closed system', md: 'Such as a sealed flask: no substance can get in or out, so the total mass **never changes**.' },
        { kind: 'callout', id: 'open', tone: 'definition', title: 'Open system', md: 'Such as an open beaker: a gas can **escape** into the air or be **taken in** from it.' },
      ],
      lines: [
        { say: 'In a closed system, such as a sealed flask, no substance can get in or out. So the total mass never changes.', show: ['closed', 'f.c-balance', 'f.c-flask', 'f.c-acid', 'f.c-chips', 'f.c-bubbles', 'f.c-stopper', 'f.closed'] },
        { say: 'In an open system, such as an open beaker, a gas can escape into the air, or be taken in from it.', show: ['open', 'f.o-balance', 'f.o-flask', 'f.o-acid', 'f.o-chips', 'f.o-bubbles', 'f.o-gas', 'f.open'] },
        { say: 'Mass is conserved in every reaction. But in an open container, a balance does not always show it.' },
      ],
    },
    {
      chapter: 'Marble chips on a balance',
      layout: 'split',
      leftWidth: 520,
      left: [marble],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'An open flask of acid with marble chips reads $85.40\\ \\text{g}$. When the fizzing stops, it reads $84.52\\ \\text{g}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['85.40 - 84.52 = 0.88\\ \\text{g}'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'The mass falls', md: 'when a product is a gas that **escapes**: $0.88\\ \\text{g}$ of carbon dioxide left the flask.' },
      ],
      lines: [
        { say: 'A flask of dilute hydrochloric acid stands open on a balance. Marble chips are added, and the reading is 85.40 grams.', show: ['fl.balance', 'fl.flask', 'fl.acid', 'fl.chips', 'fl.r0', 'q'] },
        { say: 'The chips fizz as carbon dioxide forms and bubbles out of the open neck. When the fizzing stops, the balance reads 84.52 grams.', show: ['fl.bubbles', 'fl.gas', 'fl.r1'], hide: 'fl.r0' },
        { say: 'The mass fell by 85.40 minus 84.52, which is 0.88 grams.', show: 'm', focus: 'm' },
        { say: 'No atoms were destroyed: 0.88 grams of carbon dioxide left the flask as a gas. In a sealed flask, the reading would have stayed at 85.40 grams.', show: 'k' },
      ],
    },
    {
      chapter: 'Heating magnesium',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A crucible, its lid and some magnesium have a mass of $25.62\\ \\text{g}$. The magnesium is heated, with the lid lifted now and then to let air in, until it has all turned into magnesium oxide. The mass is then $25.86\\ \\text{g}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['25.86 - 25.62 = 0.24\\ \\text{g of oxygen}'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'The mass rises', md: 'when a reactant is a gas from the air: the oxide holds the metal’s mass **plus** the oxygen’s.' },
      ],
      lines: [
        { say: 'The mass can rise, too. A crucible, its lid and some magnesium ribbon have a mass of 25.62 grams.', show: 'q' },
        { say: 'The magnesium is heated strongly, with the lid lifted now and then to let air in, until it has all turned into magnesium oxide. The mass is then 25.86 grams.' },
        { say: 'The mass rose by 25.86 minus 25.62, which is 0.24 grams. The only thing that could have come in is oxygen from the air.', show: 'm', focus: 'm' },
        { say: 'That oxygen combined with the magnesium, so the magnesium oxide holds the mass of the magnesium plus the mass of the oxygen.', show: 'k' },
      ],
    },
    {
      chapter: 'Mass is never destroyed',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: '“The mass went down, so mass was destroyed”', md: 'A gas does have mass; it has simply **escaped** from the container. Repeat the reaction in a sealed flask and the reading does not change at all.' }],
      lines: [
        { say: 'When the reading on a balance falls, it is tempting to say the reaction destroyed some mass, or that gases have no mass. Neither is true.', show: 'oops' },
        { say: 'A gas does have mass. It has simply escaped from the container. Repeat the reaction in a sealed flask, and the reading does not change at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Copper powder in an open dish is heated in air until it has all turned into black copper(II) oxide. The dish and its contents have a mass of $32.40\\ \\text{g}$ at the start and $32.72\\ \\text{g}$ at the end. Which statement is correct?',
          choices: [
            '$0.32\\ \\text{g}$ of copper was made by the heating.',
            '$0.32\\ \\text{g}$ of oxygen from the air combined with the copper.',
            '$0.32\\ \\text{g}$ of mass was created, because hot substances weigh more.',
            'Mass was destroyed: the copper lost $0.32\\ \\text{g}$.',
          ],
          answer: 1,
          working: 'The mass rose by $32.72 - 32.40 = 0.32\\ \\text{g}$. No atoms are made or destroyed: oxygen from the air combined with the copper.',
        },
      ],
      lines: [
        { say: 'Your turn. Copper powder in an open dish is heated in air until it has all turned into copper two oxide. The dish and contents have a mass of 32.40 grams at the start, and 32.72 grams at the end. Which statement is correct? Pause the video and try it.', caption: 'Your turn. Copper powder in an open dish is heated in air until it has all turned into copper(II) oxide. The dish and contents have a mass of 32.40 grams at the start, and 32.72 grams at the end. Which statement is correct? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The mass rose by 0.32 grams, and since no atoms are made, oxygen from the air must have combined with the copper. The other choices break the law of conservation of mass.', show: 'q.answer' },
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
            'In a **closed** container, no substance gets in or out, so the mass never changes.',
            'In an **open** container, the mass **falls** when a gas escapes.',
            'It **rises** when a gas from the air, such as oxygen, is taken in.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a closed container, nothing gets in or out, so the mass never changes.', show: 'sum.0' },
        { say: 'In an open container, the mass falls when a gas escapes, as carbon dioxide does from marble chips in acid.', show: 'sum.1' },
        { say: 'And it rises when a gas from the air is taken in, as oxygen is by a metal heated in air. That completes this lesson on word equations and conservation of mass.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
