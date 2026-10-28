import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasGraph, lumpAndPowder } from './lib/c10-4-figures.ts';

// A lump of 36 particles, 20 at its surface, beside the same particles as nine small pieces.
const lp = figure('lp', [lumpAndPowder()], 420);
// The lesson's graph: marble powder and lumps in the same acid.
const graph = figure('g', [gasGraph({ lumps: true })], 480);

const video: Explainer = {
  id: 'c10-4-5-d',
  lessonId: 'c10-4-5',
  title: 'Rates of Reaction, Part 4: Surface Area and Comparing Experiments',
  thumbnailTitle: 'Surface Area and Fair Tests',
  thumbnail: 'g',
  summary:
    'Breaking a solid into smaller pieces exposes more of its particles, so collisions happen more often and powder reacts faster than lumps, though the same amounts of reactants make the same amount of product. A fair test changes one factor only; with several factors, the experiment at least as good on every one is the fastest.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 4', title: 'Surface Area and Fair Tests', subtitle: 'Powder or lumps?' }],
      lines: [
        { say: 'A log burns slowly in a fireplace, but the same wood as fine shavings flares up in moments. The wood has not changed, only the size of the pieces.', show: 'title' },
        { say: 'In this part, you will explain surface area, compare powder with lumps on a graph, and find the fastest of several experiments.' },
      ],
    },
    {
      chapter: 'Surface area',
      layout: 'split',
      leftWidth: 620,
      left: [lp],
      right: [{ kind: 'callout', id: 'k', tone: 'key', title: 'Larger surface area', md: 'Smaller pieces or a powder expose **more of the solid’s particles**, so collisions with them happen **more often**.' }],
      lines: [
        { say: 'A reaction with a solid can only happen at its surface, where the other reactant can reach its particles.', show: ['lp.lump-surface', 'lp.lump-inside', 'lp.lump-label'] },
        { say: 'In this lump of thirty-six particles, only the twenty on the outside, in orange, can be reached.', focus: 'lp.lump-surface' },
        { say: 'Break the same lump into small pieces, and every particle is now on a surface.', show: ['lp.split', 'lp.powder', 'lp.powder-label'], focus: 'lp.powder' },
        { say: 'A larger surface area exposes more of the solid’s particles, so collisions with them happen more often, and the reaction is faster.', show: 'k' },
      ],
    },
    {
      chapter: 'Powder or lumps?',
      layout: 'split',
      leftWidth: 600,
      left: [graph],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Steeper at the start:** the powder’s larger surface area makes collisions more frequent.', '**Same final volume:** the same amounts of reactants make the same amount of product.'],
        },
      ],
      lines: [
        { say: 'The graph shows the same mass of marble reacting with the same acid, as lumps in grey and as a powder in colour.', show: ['g.grid', 'g.axes', 'g.powder', 'g.lumps', 'g.powder-label', 'g.lumps-label'] },
        { say: 'Why is the powder curve steeper at the start? Powder has a much larger surface area than lumps, so more marble particles are exposed to the acid, and collisions happen more often.', show: 'b.0', focus: 'g.powder' },
        { say: 'And why do both level off at 80 cubic centimetres? The same mass of marble and the same acid make the same amount of carbon dioxide in the end. The powder just makes it sooner.', show: ['b.1', 'g.top'], focus: 'g.top' },
      ],
    },
    {
      chapter: 'Hotter particles are not bigger',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Hotter particles are not bigger', md: 'Heating does not make particles grow, and a concentrated solution does not hold more energetic particles. Say whether a change makes particles collide **more often**, makes **more collisions** reach the activation energy, or both.' }],
      lines: [
        { say: 'Explain a rate with collisions, not with particles changing. Heating does not make particles grow, and a concentrated solution does not hold more energetic particles.', show: 'oops' },
        { say: 'Say whether the change makes the particles collide more often, makes more of the collisions have at least the activation energy, or both.' },
      ],
    },
    {
      chapter: 'Which is fastest?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Each experiment uses $2.0\\ \\text{g}$ of marble and $50\\ \\text{cm}^3$ of hydrochloric acid.' },
        {
          kind: 'table',
          id: 't',
          head: ['Experiment', 'Marble', 'Acid concentration (mol/L)', 'Temperature (°C)'],
          rows: [
            ['1', 'lumps', '1.0', '20'],
            ['2', 'powder', '1.0', '20'],
            ['3', 'powder', '2.0', '30'],
          ],
        },
      ],
      lines: [
        { say: 'A fair test changes only the factor being tested, and keeps everything else the same: the same mass and size of solid, the same volume and concentration of solution, and the same temperature.' },
        { say: 'Here, three experiments each use 2.0 grams of marble and 50 cubic centimetres of hydrochloric acid. Which has the fastest rate at the start?', show: ['q', 't'] },
        { say: 'Experiment two beats experiment one: the same acid and temperature, but powder instead of lumps.', focus: ['t.0', 't.1'] },
        { say: 'Experiment three beats experiment two: a higher concentration and a higher temperature. So experiment three is fastest: it is at least as good as the others on every factor.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Four experiments use the same mass of marble and the same volume of hydrochloric acid. Which has the fastest rate at the start?',
          choices: ['lumps, $2.0\\ \\text{mol/L}$ acid, $40^\\circ\\text{C}$', 'powder, $2.0\\ \\text{mol/L}$ acid, $40^\\circ\\text{C}$', 'powder, $1.0\\ \\text{mol/L}$ acid, $40^\\circ\\text{C}$', 'powder, $2.0\\ \\text{mol/L}$ acid, $20^\\circ\\text{C}$'],
          answer: 1,
          working: 'Choice B is at least as good as every other experiment on every factor: powder, the higher concentration and the higher temperature.',
        },
      ],
      lines: [
        { say: 'Your turn. Four experiments use the same mass of marble and the same volume of acid. Which has the fastest rate at the start? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: powder, the more concentrated acid, and the higher temperature. Each other experiment is worse on one factor: A uses lumps, C uses weaker acid, and D is cooler.', show: 'q.answer' },
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
            'A larger **surface area** exposes more particles, so collisions happen more often.',
            'Powder reacts faster than lumps, but the same amounts make the same amount of product.',
            'A **fair test** changes one factor only; the fastest experiment is at least as good on every factor.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A larger surface area exposes more of a solid’s particles, so collisions happen more often.', show: 'sum.0' },
        { say: 'So powder reacts faster than lumps, but the same amounts of reactants still make the same amount of product.', show: 'sum.1' },
        { say: 'A fair test changes only one factor, and the fastest experiment is at least as good as the others on every factor. That completes this unit on chemical reactions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
