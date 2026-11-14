import { hydrogenBurning } from '@/video/reactions.ts';
import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). The count under each box is every
// atom still in it, which stands for its mass: a reaction only rearranges atoms, so the count
// changes only when atoms leave an open container.

/** Hydrogen burning in a sealed flask, with every atom counted. */
const sealed: ParticlesEl = {
  kind: 'particles',
  id: 'c',
  boxes: [hydrogenBurning('b', { tally: { kinds: [0, 1, 2, 3, 4], label: 'atoms' }, label: 'hydrogen and oxygen, sealed' })],
  clips: { spark: { phases: [{ dur: 1, heat: { b: 2 } }, { dur: 2 }, { dur: 1, heat: { b: 0.4 } }, { dur: 10 }] } },
  thermometers: true,
  seed: 3,
  height: 420,
};

/** Particles dissolved in the acid (the water itself is not drawn). */
const DISSOLVED = { n: 0, bond: 0.15, heavy: 1 } as const;

/**
 * A solid fizzing in acid: an acid particle that hits the solid takes an atom of it into the
 * solution and is set loose; two loose ones join as a gas molecule that rises. With `open`, gas
 * that reaches the top leaves.
 */
const fizz = (id: string, label: string, open: boolean): ParticleBox => ({
  id,
  state: 'liquid',
  width: 10,
  height: 11,
  temp: 0.5,
  escape: open,
  lump: true,
  hold: true,
  kinds: [
    { n: 14, bond: 3, heavy: 2, tone: 'good', name: 'solid' },
    { ...DISSOLVED, n: 18, size: 0.8, tone: 'theta', name: 'acid' },
    { ...DISSOLVED, tone: 'good', name: 'dissolved solid' },
    { ...DISSOLVED, size: 0.8, tone: 'theta', name: 'set loose' },
    { ...DISSOLVED, size: 0.8, heavy: -1.5, tone: 'theta', name: 'gas' },
  ],
  reactions: [
    { a: 1, b: 0, to: [3, 2], energy: 1.5 },
    { a: 3, b: 3, to: [4, 4], join: true },
  ],
  tally: { kinds: [0, 1, 2, 3, 4], label: 'atoms' },
  label,
});

const systems: ParticlesEl = {
  kind: 'particles',
  id: 'oc',
  boxes: [fizz('o', 'open beaker', true), fizz('s', 'sealed flask', false)],
  clips: { fizz: { phases: [{ dur: 1, release: ['o', 's'] }, { dur: 14 }] } },
  height: 400,
};

const video: Explainer = {
  id: 'c9-3-1',
  lessonId: 'c9-3-1',
  title: 'Conservation of Mass',
  thumbnail: 'oc',
  summary:
    'Mass is conserved in every chemical reaction, because atoms are only rearranged, so the total mass of the reactants equals the total mass of the products. In an open container, gases escaping or joining make the mass seem to change; in a closed one it stays the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Conservation of Mass', title: 'Conservation of Mass', subtitle: 'Mass is never created or destroyed' }],
      lines: [
        { say: 'When wood burns, a big log turns into a small pile of ash. Has mass been destroyed?', show: 'title' },
        { say: 'No. The missing mass has gone into the air as gases. In this video, you will see why mass is conserved in every reaction, and use it to find masses you never measured.' },
      ],
    },
    {
      chapter: 'The law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'law', size: 'md', lines: ['\\text{total mass of reactants} = \\text{total mass of products}'] },
      ],
      lines: [
        { say: 'In a chemical reaction, mass is not created or destroyed. The total mass of the products equals the total mass of the reactants.', show: 'law' },
        { say: 'This is because a reaction only rearranges atoms into new substances. Every atom that goes in comes out again.' },
      ],
    },
    {
      chapter: 'Counting atoms',
      layout: 'center',
      main: [sealed],
      lines: [
        { say: 'Let’s count. Here are hydrogen and oxygen molecules in a sealed flask: thirty-six atoms in all.', show: ['c', 'c.labels', 'c.tally', 'c.thermo'] },
        { say: 'A spark sets them reacting. The molecules break apart, and their atoms join up again as water. Watch the count.', play: 'c.spark' },
        { say: 'It never changes. The same thirty-six atoms are there, only joined differently, so the mass of the water made is the same as the mass of the gases it came from.', focus: 'c.b' },
      ],
    },
    {
      chapter: 'Using the law',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'ex',
          size: 'md',
          lines: ['\\text{iron} + \\text{sulfur} \\rightarrow \\text{iron sulfide}', '14\\text{ g} + 8\\text{ g} = 22\\text{ g}'],
        },
      ],
      lines: [
        { say: 'So if fourteen grams of iron reacts completely with eight grams of sulfur, fourteen plus eight makes twenty-two grams of iron sulfide.', show: 'ex' },
        { say: 'It works backwards too. If six grams of magnesium burns to make ten grams of magnesium oxide, then ten take away six, or four grams of oxygen, must have joined it.' },
      ],
    },
    {
      chapter: 'Open and closed systems',
      layout: 'center',
      main: [systems],
      lines: [
        { say: 'Yet sometimes a balance reading does change. The reason is whether the system is open or closed.', show: ['oc', 'oc.labels', 'oc.tally'] },
        { say: 'Here the same solid fizzes in acid in two containers, giving off a gas. On the left is an open beaker. Watch its count fall as the gas escapes into the air.', play: 'oc.fizz', focus: 'oc.o' },
        { say: 'On the right is a sealed flask. The gas collects at the top, and the count stays the same.', focus: 'oc.s' },
      ],
    },
    {
      chapter: 'Balance readings',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'open',
          head: ['Reaction', 'Balance reading', 'Why'],
          rows: [
            ['marble chips in acid, open beaker', 'goes down', 'carbon dioxide escapes'],
            ['magnesium burning, open crucible', 'goes up', 'oxygen from the air joins'],
            ['either reaction in a sealed flask', 'stays the same', 'no gas gets in or out'],
          ],
        },
      ],
      lines: [
        { say: 'When marble chips fizz in acid in an open beaker, the reading goes down, because carbon dioxide gas escapes into the air.', show: ['open', 'open.0'], focus: 'open.0' },
        { say: 'When magnesium burns in an open crucible, the reading goes up, because oxygen from the air joins the magnesium.', show: 'open.1', focus: 'open.1' },
        { say: 'In a sealed flask, a closed system, nothing can get in or out, so the reading stays the same. Mass is never really lost. It has just moved somewhere you are not measuring.', show: 'open.2', focus: 'open.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tablet fizzes in water in an open cup. The reading falls from 152.4 g to 151.6 g. What has happened?',
          choices: ['0.8 g of mass was destroyed', '0.8 g of carbon dioxide escaped', '0.8 g of oxygen joined the cup', 'the balance is broken'],
          answer: 1,
          working: '152.4 − 151.6 = 0.8 g. The gas made by the reaction left the open cup; mass was conserved.',
        },
      ],
      lines: [
        { say: 'Your turn. A tablet fizzes in water in an open cup. The reading falls from one hundred and fifty-two point four grams to one hundred and fifty-one point six grams. What has happened? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The difference is zero point eight grams. The reaction made carbon dioxide gas, which escaped from the open cup. Mass was conserved; it just left the cup.', show: 'q.answer' },
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
            'Mass is conserved: atoms are rearranged, not made or destroyed.',
            'Mass of reactants = mass of products.',
            'Open container: gases escaping or joining change the reading.',
            'Closed container: the reading stays the same.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Mass is conserved in every reaction, because atoms are only rearranged.', show: 'sum.0' },
        { say: 'So the total mass of the reactants equals the total mass of the products.', show: 'sum.1' },
        { say: 'In an open container, gases escaping or joining make the mass seem to change.', show: 'sum.2' },
        { say: 'And in a closed container, it stays the same. Next, you will show conservation of mass by balancing equations.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
