import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). A blue and a yellow particle that
// collide hard enough join into a new molecule, and the count under each box is how many have
// formed: the same reaction, with one thing changed between the two boxes.

/** A gas particle that barely attracts the others. */
const GAS = { n: 0, bond: 0.15, heavy: 0 } as const;
const A = { ...GAS, tone: 'adj', name: 'A' } as const;
const B = { ...GAS, tone: 'theta', name: 'B' } as const;

/** Two gases that react on a hard enough collision, waiting to start on cue. */
const gases = (id: string, label: string, o: { n?: number; temp?: number; energy?: number } = {}): ParticleBox => ({
  id,
  state: 'gas',
  width: 10,
  height: 9,
  temp: o.temp ?? 0.7,
  waits: true,
  kinds: [{ ...A, n: o.n ?? 10 }, { ...B, n: o.n ?? 10 }, A, B],
  reactions: [{ a: 0, b: 1, to: [2, 3], join: true, energy: o.energy ?? 1.5 }],
  tally: { kinds: [2], label: 'new molecules' },
  label,
});

/** A solid (as one lump, or broken into `pieces`) that reacts with the gas round it. */
const solid = (id: string, label: string, pieces: number): ParticleBox => ({
  id,
  state: 'gas',
  width: 22,
  height: 9,
  temp: 0.7,
  waits: true,
  lump: pieces === 1 ? true : pieces,
  cols: pieces === 1 ? 6 : 2,
  // Held still until let go, so the pieces do not drift together before the reaction starts.
  hold: true,
  cross: 0.2,
  kinds: [{ n: 24, bond: 6, heavy: 3, tone: 'good', name: 'solid' }, { ...B, n: 24 }, { ...GAS, tone: 'good' }, B],
  reactions: [{ a: 1, b: 0, to: [3, 2], join: true, energy: 1.0, reach: 1.15 }],
  tally: { kinds: [2], label: 'new molecules' },
  label,
});

/** Two boxes side by side, let go together. */
const pair = (id: string, a: ParticleBox, b: ParticleBox, extra: Partial<ParticlesEl> = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [a, b],
  clips: { go: { phases: [{ dur: 1, release: [a.id, b.id] }, { dur: 13 }] } },
  height: 400,
  ...extra,
});

const temperature = pair('tp', gases('a', 'cold', { temp: 0.4 }), gases('b', 'hot', { temp: 1.2 }), { thermometers: true });
const concentration = pair('cc', gases('a', 'dilute', { n: 6 }), gases('b', 'concentrated', { n: 16 }));
const surface = pair('sa', solid('a', 'one lump', 1), solid('b', 'small pieces', 4), { seed: 8 });
const catalyst = pair('ca', gases('a', 'no catalyst', { energy: 3.5 }), gases('b', 'with a catalyst', { energy: 0.6 }));

const video: Explainer = {
  id: 'c9-3-4',
  lessonId: 'c9-3-4',
  title: 'Rates of Reaction',
  thumbnail: 'tp',
  summary:
    'The rate of reaction is how fast products form, and the mean rate is the amount of product divided by the time. Higher temperature, higher concentration, larger surface area and a catalyst all increase the rate. Collision theory explains why: particles must collide with enough energy, and more frequent successful collisions mean a faster reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Conservation of Mass', title: 'Rates of Reaction', subtitle: 'Speeding reactions up, and why it works' }],
      lines: [
        { say: 'Some reactions are over in a flash, like a firework. Others take years, like rusting.', show: 'title' },
        { say: 'In this video, you will find out what changes the rate of a reaction, and use collision theory to explain why.' },
      ],
    },
    {
      chapter: 'What changes the rate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rate', size: 'md', lines: ['\\text{mean rate} = \\dfrac{\\text{amount of product made}}{\\text{time taken}}'] },
        { kind: 'callout', id: 'four', tone: 'key', title: 'Four ways to speed up a reaction', md: 'Higher **temperature**, higher **concentration**, larger **surface area**, and a **catalyst**.' },
      ],
      lines: [
        { say: 'The rate of reaction is how fast reactants are used up, or products are made. The mean rate is the amount of product made, divided by the time taken.', show: 'rate' },
        { say: 'For example, if a reaction gives off sixty cubic centimetres of gas in twenty seconds, the mean rate is sixty divided by twenty, which is three cubic centimetres per second.' },
        { say: 'Four changes make a reaction faster: a higher temperature, a higher concentration of a solution, a larger surface area of a solid, and adding a catalyst.', show: 'four' },
        { say: 'A catalyst speeds up a reaction without being used up. It is still there, unchanged, at the end. Enzymes are the catalysts in living things.' },
      ],
    },
    {
      chapter: 'Collision theory',
      layout: 'center',
      main: [{ kind: 'callout', id: 'ct', tone: 'definition', title: 'Collision theory', md: 'Particles react only when they **collide** with **enough energy**. More frequent successful collisions mean a **faster** reaction.' }],
      lines: [
        { say: 'Collision theory says particles react only when they collide with enough energy. Anything that makes successful collisions more frequent makes the reaction faster. Let’s see each change in action.', show: 'ct' },
      ],
    },
    {
      chapter: 'Temperature',
      layout: 'center',
      main: [temperature],
      lines: [
        { say: 'Here the same two gases react in two boxes, one cold and one hot. When a blue and a yellow particle collide hard enough, they join into a new molecule. Watch the counts.', show: ['tp', 'tp.labels', 'tp.tally', 'tp.thermo'], play: 'tp.go' },
        { say: 'At a higher temperature, particles move faster. They collide more often, and more of the collisions have enough energy to react. Both make the rate rise.', focus: 'tp.b' },
      ],
    },
    {
      chapter: 'Concentration',
      layout: 'center',
      main: [concentration],
      lines: [
        { say: 'Now both boxes are at the same temperature, but the one on the right has more particles in the same space: a higher concentration.', show: ['cc', 'cc.labels', 'cc.tally'], play: 'cc.go' },
        { say: 'More particles in the same volume collide more often, so new molecules form faster.', focus: 'cc.b' },
      ],
    },
    {
      chapter: 'Surface area',
      layout: 'center',
      main: [surface],
      lines: [
        { say: 'Here a gas reacts with a solid. On the left, the solid is one lump. On the right, the same amount is broken into four smaller pieces.', show: ['sa', 'sa.labels', 'sa.tally'], play: 'sa.go' },
        { say: 'Breaking a solid into small pieces exposes more of its particles to the gas, so there are more collisions at once, and it reacts faster. Only particles on the surface can react.', focus: 'sa.b' },
      ],
    },
    {
      chapter: 'Catalysts',
      layout: 'center',
      main: [catalyst],
      lines: [
        { say: 'Last, two identical boxes, except that the one on the right has a catalyst, which gives the reaction an easier route.', show: ['ca', 'ca.labels', 'ca.tally'], play: 'ca.go' },
        { say: 'Now a collision needs less energy to succeed, so more of them do, and the reaction is faster. The catalyst itself is not used up.', focus: 'ca.b' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'why',
          head: ['Change', 'Why it is faster'],
          rows: [
            ['higher temperature', 'faster particles: more collisions, with more energy'],
            ['higher concentration', 'more particles in the same space'],
            ['larger surface area', 'more particles exposed at once'],
            ['catalyst', 'an easier route that needs less energy'],
          ],
        },
      ],
      lines: [{ say: 'So each of the four changes works in the same way: it makes successful collisions more frequent.', show: ['why', 'why.0', 'why.1', 'why.2', 'why.3'] }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does powdered marble react with acid faster than a single lump?',
          choices: ['the powder has a larger surface area', 'the powder is hotter', 'the powder is a catalyst', 'the acid is more concentrated'],
          answer: 0,
          working: 'More marble particles are exposed to the acid, so there are more collisions each second.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does powdered marble react with acid faster than a single lump? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The powder has a much larger surface area, so more marble particles are exposed to the acid, and there are more collisions each second.', show: 'q.answer' },
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
            'Mean rate = amount of product ÷ time.',
            'Temperature, concentration, surface area and catalysts increase the rate.',
            'Particles must collide with enough energy.',
            'More frequent successful collisions: a faster reaction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean rate is the amount of product made, divided by the time.', show: 'sum.0' },
        { say: 'Higher temperature, higher concentration, larger surface area and catalysts all increase the rate.', show: 'sum.1' },
        { say: 'Collision theory says particles must collide with enough energy to react.', show: 'sum.2' },
        { say: 'So more frequent successful collisions mean a faster reaction. Next, you will meet acids and bases.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
