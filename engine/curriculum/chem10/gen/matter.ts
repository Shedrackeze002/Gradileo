/**
 * Grade 10 Chemistry, Unit 1: Matter and the Particle Model (10-A1, 10-A2). States of matter and
 * changes of state, elements, compounds and mixtures, solutions, separating mixtures and paper
 * chromatography, physical and chemical change, density, hazard pictograms and laboratory safety.
 * Every question states the data it uses, and laboratory questions describe a procedure in words.
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { ce } from '../../../chem/formula.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';

const L = (n: number) => `c10-1-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
const cm3 = (v: string | number) => `$${v}\\ \\text{cm}^3$`;
const degC = (v: number) => `$${v}^\\circ\\text{C}$`;
/** A temperature for a table cell or plain text, with a true minus sign. */
const deg = (v: number) => `${v < 0 ? '−' : ''}${Math.abs(v)}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a" or "an" before a word. */
const an = (w: string) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;
const f1 = (v: number) => fmtFixed(v, 1);
const f2 = (v: number) => fmtFixed(v, 2);
/** Round to one decimal place (sums and differences of masses given to 0.1 g). */
const r1 = (v: number) => Math.round(v * 10) / 10;

const NAMES = ['Amara', 'Kenji', 'Priya', 'Mateo', 'Fatima', 'Liam', 'Wei', 'Chidi', 'Sofia', 'Arjun', 'Aisha', 'Tomás', 'Yuki', 'Kwame', 'Leila', 'Noah', 'Mei', 'Ines', 'Ravi', 'Zainab', 'Oliver', 'Hana', 'Diego', 'Nia'];

/** Pick `n` items so that at least one passes and at least one fails `test` (for select-all questions). */
function mixedSample<T>(rng: Rng, pool: readonly T[], n: number, test: (x: T) => boolean): T[] {
  for (let i = 0; i < 100; i++) {
    const s = rng.sample(pool, n);
    if (s.some(test) && s.some((x) => !test(x))) return s;
  }
  const yes = pool.filter(test);
  const no = pool.filter((x) => !test(x));
  return rng.shuffle([rng.pick(yes), ...rng.sample(no, n - 1)]);
}

// ---------------------------------------------------------------------------- lesson 1.1: states of matter

type State = 'solid' | 'liquid' | 'gas';
const STATES: State[] = ['solid', 'liquid', 'gas'];
const STATE_CHOICES = ['Solid', 'Liquid', 'Gas'];

const PARTICLE_PICTURES: Record<State, string[]> = {
  solid: [
    'The particles are packed closely together in a regular pattern and vibrate about fixed positions.',
    'The particles touch one another and are held in place by strong forces; they vibrate but cannot move from place to place.',
    'The particles are lined up in neat rows, each one jiggling on the spot without changing places with its neighbours.',
  ],
  liquid: [
    'The particles are close together but arranged randomly, and they slide past one another.',
    'The particles stay in contact with one another but are not held in place, so they move around each other.',
    'The particles are touching, with no regular pattern, and they keep changing places with their neighbours.',
  ],
  gas: [
    'The particles are far apart and move quickly in all directions.',
    'The particles are widely spaced, with almost no force between them, and travel in straight lines until they collide.',
    'The particles move rapidly and randomly and spread out to fill all the space they are given.',
  ],
};

const PROPERTY_PICTURES: Record<State, string[]> = {
  solid: [
    'It has a fixed shape and a fixed volume, and it cannot be squashed into a smaller space.',
    'It keeps the same shape when it is moved from one container to another, and it does not flow.',
    'It cannot be poured, and pushing hard on it hardly changes its volume.',
  ],
  liquid: [
    'It has a fixed volume but takes the shape of the bottom of its container.',
    'It can be poured, but it is very hard to squash into a smaller volume.',
    'It flows and forms a flat surface at the top of its container, and its volume stays the same whatever the container.',
  ],
  gas: [
    'It has no fixed shape or volume and spreads out to fill its whole container.',
    'It is easily squashed into a smaller volume by pushing in the plunger of a sealed syringe.',
    'It flows, and it always fills every part of the container it is in.',
  ],
};

const STATE_EXAMPLES: Record<State, string[]> = {
  solid: ['a block of ice', 'an iron nail', 'a grain of sand', 'a lump of candle wax'],
  liquid: ['water in a glass', 'cooking oil', 'liquid mercury in a thermometer', 'vinegar'],
  gas: ['the air inside a balloon', 'steam (water vapour)', 'carbon dioxide gas', 'helium in a party balloon'],
};

const WHY_STATE: Array<{ ask: string; answer: string; wrong: string[]; why: string }> = [
  {
    ask: 'Why can a gas be compressed (squashed into a smaller volume) easily?',
    answer: 'Its particles are far apart, with a lot of empty space between them.',
    wrong: ['Its particles shrink when they are squeezed.', 'Its particles are close together and touching.', 'Its particles stop moving when they are squeezed.'],
    why: 'Squashing a gas pushes its particles into the empty space between them; the particles themselves do not change size.',
  },
  {
    ask: 'Why does a liquid take the shape of its container?',
    answer: 'Its particles are not held in fixed positions, so they can slide past one another.',
    wrong: ['Its particles are far apart, with a lot of empty space between them.', 'Its particles are held in fixed positions by strong forces.', 'Its particles grow larger to fill the container.'],
    why: 'Liquid particles stay close together but can move over one another, so the liquid flows into the shape of its container.',
  },
  {
    ask: 'Why does a solid keep its shape?',
    answer: 'Its particles are held in fixed positions by strong forces and can only vibrate.',
    wrong: ['Its particles do not move at all.', 'Its particles are bigger than the particles of a liquid.', 'Its particles are far apart and move quickly.'],
    why: 'Strong forces hold each particle in place. The particles still vibrate, but they cannot change places, so the shape stays the same.',
  },
  {
    ask: 'Why does a gas spread out to fill its whole container?',
    answer: 'Its particles move quickly in all directions, and the forces between them are very weak.',
    wrong: ['Its particles grow larger until they fill the space.', 'Its particles slide over one another but stay touching.', 'Its particles are held in a regular pattern.'],
    why: 'Nothing holds gas particles together, so they keep moving until they reach every part of the container.',
  },
  {
    ask: 'Why is a liquid very hard to compress?',
    answer: 'Its particles are already touching, so there is almost no empty space between them.',
    wrong: ['Its particles are held in a regular pattern.', 'Its particles do not move.', 'Its particles are far apart.'],
    why: 'There is almost no space between liquid particles for them to be pushed into.',
  },
  {
    ask: 'A smell spreads across a room much faster than a drop of food colouring spreads through still water. Why?',
    answer: 'Gas particles move faster than liquid particles and have much more space to move into.',
    wrong: ['Liquid particles do not move at all.', 'Gas particles are bigger than liquid particles.', 'The forces between gas particles are stronger than those in a liquid.'],
    why: 'Gas particles are far apart and fast, so they spread (diffuse) quickly. Liquid particles keep bumping into neighbours that are touching them.',
  },
  {
    ask: 'Why can a liquid be poured but a solid cannot?',
    answer: 'Liquid particles can move past one another, but solid particles are held in fixed positions.',
    wrong: ['Liquid particles are far apart, but solid particles are touching.', 'Liquid particles are smaller than solid particles.', 'Solid particles do not move, but liquid particles move quickly in straight lines.'],
    why: 'In both a solid and a liquid the particles are touching. The difference is that liquid particles can change places.',
  },
];

const STATE_STATEMENTS: Array<{ md: string; holds: State[] }> = [
  { md: 'The particles are close together.', holds: ['solid', 'liquid'] },
  { md: 'The particles are arranged in a regular pattern.', holds: ['solid'] },
  { md: 'The particles vibrate about fixed positions.', holds: ['solid'] },
  { md: 'The particles slide past one another while staying in contact.', holds: ['liquid'] },
  { md: 'The particles are far apart compared with their size.', holds: ['gas'] },
  { md: 'The forces between the particles are very weak.', holds: ['gas'] },
  { md: 'The particles are always moving.', holds: ['solid', 'liquid', 'gas'] },
  { md: 'The particles do not move at all.', holds: [] },
  { md: 'It has a fixed volume.', holds: ['solid', 'liquid'] },
  { md: 'It has a fixed shape.', holds: ['solid'] },
  { md: 'It can be compressed easily.', holds: ['gas'] },
  { md: 'It can flow.', holds: ['liquid', 'gas'] },
  { md: 'It takes the shape of its container.', holds: ['liquid', 'gas'] },
  { md: 'Its particles get bigger when it is heated.', holds: [] },
];

const MODEL_SUMMARY: Record<State, string> = {
  solid: 'In a solid the particles are close together in a regular pattern, held by strong forces, and vibrate about fixed positions: a fixed shape and volume, and it cannot be compressed.',
  liquid: 'In a liquid the particles are close together but randomly arranged, and they slide past one another: a fixed volume, no fixed shape, it flows, and it is hard to compress.',
  gas: 'In a gas the particles are far apart, with very weak forces between them, and move quickly in all directions: no fixed shape or volume, it flows, and it is easy to compress.',
};

function states(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(STATES);
  if (d === 1) {
    return {
      prompt: `${rng.pick(PARTICLE_PICTURES[s])} Which state of matter is this?`,
      parts: [part(fixedChoice(STATE_CHOICES, STATES.indexOf(s)))],
      hints: ['Ask two questions: are the particles close together or far apart, and are they held in place or free to move?'],
      solution: [MODEL_SUMMARY[s], `So the substance is a ${s}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      return {
        prompt: `A substance has these properties: ${rng.pick(PROPERTY_PICTURES[s])} Which state is it in?`,
        parts: [part(fixedChoice(STATE_CHOICES, STATES.indexOf(s)))],
        hints: ['Only a solid has a fixed shape. Only a gas has no fixed volume and is easy to compress.', 'A liquid has a fixed volume but flows into the shape of its container.'],
        solution: [MODEL_SUMMARY[s], `These properties fit a ${s}.`],
      };
    }
    const w = rng.pick(WHY_STATE);
    return {
      prompt: `${w.ask} Use the particle model.`,
      parts: [part(mc(rng, w.answer, w.wrong))],
      hints: ['Think about how far apart the particles are, and whether they are held in place or free to move.', 'The particles themselves never change size or stop moving.'],
      solution: [w.why, `Answer: ${w.answer}`],
    };
  }
  const example = rng.pick(STATE_EXAMPLES[s]);
  const opts = mixedSample(rng, STATE_STATEMENTS, 5, (x) => x.holds.includes(s));
  return {
    prompt: `Select every statement that is true of a substance in the ${s} state, such as ${example}.`,
    parts: [part(multi(rng, opts.map((o) => ({ md: o.md, correct: o.holds.includes(s) })), true))],
    hints: ['Picture the particles: how close they are, whether they are in a pattern, and how they move.', 'Particles are always moving, even in a solid, and they never change size.'],
    solution: [MODEL_SUMMARY[s], ...opts.map((o) => `${o.holds.includes(s) ? 'True' : 'False'}: ${o.md}`)],
  };
}

// ---------------------------------------------------------------------------- changes of state

type ChangeKey = 'melting' | 'freezing' | 'evaporation' | 'condensation' | 'sublimation' | 'deposition';
const CHANGES: Array<{ key: ChangeKey; name: string; from: State; to: State; takesIn: boolean }> = [
  { key: 'melting', name: 'melting', from: 'solid', to: 'liquid', takesIn: true },
  { key: 'freezing', name: 'freezing', from: 'liquid', to: 'solid', takesIn: false },
  { key: 'evaporation', name: 'evaporation or boiling', from: 'liquid', to: 'gas', takesIn: true },
  { key: 'condensation', name: 'condensation', from: 'gas', to: 'liquid', takesIn: false },
  { key: 'sublimation', name: 'sublimation', from: 'solid', to: 'gas', takesIn: true },
  { key: 'deposition', name: 'deposition', from: 'gas', to: 'solid', takesIn: false },
];
const CHANGE_NAMES = CHANGES.map((c) => cap(c.name));
const ENERGY = ['Taken in by the substance', 'Given out by the substance'];

const CHANGE_EXAMPLES: Record<ChangeKey, string[]> = {
  melting: ['An ice cube left on a plate turns into a puddle.', 'A bar of chocolate held in a warm hand turns soft and runny.', 'Butter put into a hot pan turns into a liquid.', 'Solid candle wax next to the flame turns into a clear liquid.'],
  freezing: ['Water in an ice-cube tray turns into ice in the freezer.', 'Melted candle wax runs down the side of the candle and turns solid.', 'Molten iron is poured into a mould and becomes solid as it cools.', 'A puddle turns into ice on a cold night.'],
  evaporation: ['A puddle dries up on a sunny day.', 'Wet clothes on a washing line become dry.', 'Water boiling in a kettle turns into steam.', 'A drop of perfume on the skin disappears within a minute.'],
  condensation: ['Droplets of water form on the outside of a glass of iced water.', 'A bathroom mirror mists up during a hot shower.', 'Dew forms on grass on a cool morning.', 'Drops of water form on the inside of a saucepan lid while soup cooks.'],
  sublimation: ['A lump of dry ice (solid carbon dioxide) turns straight into a gas without melting.', 'Iodine crystals are warmed gently and give off a purple gas without melting.', 'On a cold, dry, sunny day, snow slowly disappears without melting.', 'Solid air-freshener blocks slowly get smaller as they turn straight into a gas.'],
  deposition: ['On a freezing night, frost forms on a car window straight from the water vapour in the air.', 'Purple iodine gas touches a cold surface and forms solid crystals without becoming a liquid first.', 'Ice crystals grow on the walls of a freezer from the water vapour in the air.'],
};

const ENERGY_RULE = 'Changes to a state whose particles move more freely (solid to liquid, liquid to gas, solid to gas) take in energy. The reverse changes give out energy.';

interface MeltBoil {
  name: string;
  mp: number;
  bp: number;
}
const MP_BP: MeltBoil[] = [
  { name: 'water', mp: 0, bp: 100 },
  { name: 'ethanol', mp: -114, bp: 78 },
  { name: 'mercury', mp: -39, bp: 357 },
  { name: 'oxygen', mp: -218, bp: -183 },
  { name: 'nitrogen', mp: -210, bp: -196 },
  { name: 'bromine', mp: -7, bp: 59 },
  { name: 'iron', mp: 1538, bp: 2862 },
  { name: 'sodium chloride', mp: 801, bp: 1465 },
  { name: 'copper', mp: 1085, bp: 2562 },
  { name: 'sulfur', mp: 115, bp: 445 },
  { name: 'aluminium', mp: 660, bp: 2470 },
  { name: 'ammonia', mp: -78, bp: -33 },
  { name: 'chlorine', mp: -101, bp: -34 },
  { name: 'lead', mp: 327, bp: 1749 },
  { name: 'methane', mp: -182, bp: -162 },
  { name: 'gallium', mp: 30, bp: 2400 },
  { name: 'iodine', mp: 114, bp: 184 },
];

const stateAt = (s: MeltBoil, t: number): State => (t < s.mp ? 'solid' : t < s.bp ? 'liquid' : 'gas');
/** At least 3 degrees from both the melting and the boiling point, so the state is clear. */
const clearAt = (s: MeltBoil, t: number) => Math.abs(t - s.mp) >= 3 && Math.abs(t - s.bp) >= 3;

/** A whole-number temperature at which the substance is clearly in the given state (a multiple of 5 when one fits). */
function stateRange(s: MeltBoil, state: State): [number, number] {
  return state === 'solid' ? [Math.max(s.mp - 100, -260), s.mp - 3] : state === 'liquid' ? [s.mp + 3, s.bp - 3] : [s.bp + 3, s.bp + 100];
}
function tempIn(rng: Rng, s: MeltBoil, state: State): number {
  const [lo, hi] = stateRange(s, state);
  const t = rng.int(lo, hi);
  const r = Math.round(t / 5) * 5;
  return r >= lo && r <= hi ? r : t;
}

function mpTable(list: MeltBoil[]): TableFigure {
  return { type: 'table', headers: ['Substance', 'Melting point (°C)', 'Boiling point (°C)'], rows: list.map((s) => [cap(s.name), deg(s.mp), deg(s.bp)]) };
}

const RANGE_RULE = 'Below its melting point a substance is a solid; between its melting and boiling points it is a liquid; above its boiling point it is a gas.';
const rangeLine = (s: MeltBoil, t: number) => {
  const st = stateAt(s, t);
  return st === 'solid'
    ? `${degC(t)} is below the melting point of ${s.name} (${degC(s.mp)}), so it is a solid.`
    : st === 'liquid'
      ? `${degC(t)} is between the melting point (${degC(s.mp)}) and the boiling point (${degC(s.bp)}) of ${s.name}, so it is a liquid.`
      : `${degC(t)} is above the boiling point of ${s.name} (${degC(s.bp)}), so it is a gas.`;
};

function stateChanges(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const c = rng.pick(CHANGES);
    const prompt = rng.chance(0.5) ? `A substance changes directly from a ${c.from} to a ${c.to}. What is this change of state called?` : `${rng.pick(CHANGE_EXAMPLES[c.key])} Which change of state is this?`;
    return {
      prompt,
      parts: [part(fixedChoice(CHANGE_NAMES, CHANGES.indexOf(c)))],
      hints: ['Decide which state the substance starts in and which state it ends in.', 'Solid → liquid is melting, liquid → gas is evaporation or boiling, and solid → gas without melting is sublimation. Each has a reverse.'],
      solution: [`The substance goes from a ${c.from} to a ${c.to}.`, `That change is called ${c.name}.`],
    };
  }
  if (d === 2) {
    const c = rng.pick(CHANGES);
    return {
      prompt: `${rng.pick(CHANGE_EXAMPLES[c.key])} Name the change of state, and say whether energy is taken in or given out by the substance as it changes.`,
      parts: [part(fixedChoice(CHANGE_NAMES, CHANGES.indexOf(c)), { label: 'Change of state:' }), part(fixedChoice(ENERGY, c.takesIn ? 0 : 1), { label: 'Energy is:' })],
      hints: ['First decide the starting state and the final state.', ENERGY_RULE],
      solution: [
        `The substance changes from a ${c.from} to a ${c.to}: ${c.name}.`,
        c.takesIn ? `Its particles end up moving more freely, so the substance must take in energy to overcome the forces between them.` : `Its particles end up moving less freely and closer together, so the substance gives out energy to its surroundings.`,
      ],
    };
  }
  const kind = rng.pick(['state', 'liquid', 'heat', 'cool'] as const);
  if (kind === 'state') {
    const list = rng.sample(MP_BP, 4);
    const s = rng.pick(list);
    const want = rng.pick(STATES);
    const t = tempIn(rng, s, want);
    return {
      prompt: `The table gives the melting and boiling points of four substances. What is the state of ${s.name} at ${degC(t)}?`,
      figure: mpTable(list),
      parts: [part(fixedChoice(STATE_CHOICES, STATES.indexOf(want)))],
      hints: [RANGE_RULE, 'Be careful with negative temperatures: −40 °C is colder than −10 °C.'],
      solution: [rangeLine(s, t)],
    };
  }
  if (kind === 'liquid') {
    for (let i = 0; i < 100; i++) {
      const list = rng.sample(MP_BP, 4);
      const target = list[0];
      const t = tempIn(rng, target, 'liquid');
      if (list.slice(1).every((s) => clearAt(s, t) && stateAt(s, t) !== 'liquid')) {
        const shown = rng.shuffle(list);
        return {
          prompt: `The table gives the melting and boiling points of four substances. Which of them is a liquid at ${degC(t)}?`,
          figure: mpTable(shown),
          parts: [part(mc(rng, cap(target.name), list.slice(1).map((s) => cap(s.name))))],
          hints: [RANGE_RULE, `Look for the substance whose melting point is below ${deg(t)} °C and whose boiling point is above it.`],
          solution: shown.map((s) => rangeLine(s, t)),
        };
      }
    }
  }
  const heat = kind === 'heat' || kind === 'liquid';
  const s = rng.pick(MP_BP);
  const others = rng.sample(MP_BP.filter((x) => x !== s), 2);
  const list = rng.shuffle([s, ...others]);
  // Start and end states, in the direction of the temperature change.
  const order: State[] = heat ? ['solid', 'liquid', 'gas'] : ['gas', 'liquid', 'solid'];
  // Each of the four answers is equally likely: one change, the other change, both, or neither.
  const [i0, i1] = rng.pick([[0, 1], [1, 2], [0, 2], [0, 0], [1, 1], [2, 2]].map((p, k) => (k < 3 ? [p, p, p] : [p])).flat());
  let t1 = tempIn(rng, s, order[i0]);
  let t2 = tempIn(rng, s, order[i1]);
  for (let k = 0; k < 20 && t1 === t2; k++) t2 = tempIn(rng, s, order[i1]);
  if (t1 === t2) {
    const [lo, hi] = stateRange(s, order[i0]);
    [t1, t2] = heat ? [lo, hi] : [hi, lo];
  }
  // Within one state the two temperatures may come out in either order.
  if (heat ? t2 < t1 : t2 > t1) [t1, t2] = [t2, t1];
  const steps = i1 - i0;
  const OPTIONS = heat ? ['It melts only.', 'It boils only.', 'It melts and then boils.', 'It does not change state.'] : ['It condenses only.', 'It freezes only.', 'It condenses and then freezes.', 'It does not change state.'];
  const idx = steps === 0 ? 3 : steps === 2 ? 2 : order[i0] === (heat ? 'solid' : 'gas') ? 0 : 1;
  return {
    prompt: `A sample of ${s.name} is ${heat ? 'heated' : 'cooled'} from ${degC(t1)} to ${degC(t2)}. Use the table. Which changes of state happen?`,
    figure: mpTable(list),
    parts: [part(fixedChoice(OPTIONS, idx))],
    hints: ['Find the state of the substance at the starting temperature and at the final temperature.', RANGE_RULE],
    solution: [rangeLine(s, t1), rangeLine(s, t2), `${OPTIONS[idx]}`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.2: pure substances and mixtures

type Kind = 'element' | 'compound' | 'mixture';
const KINDS: Kind[] = ['element', 'compound', 'mixture'];
const KIND_CHOICES = ['Element', 'Compound', 'Mixture'];

interface Sample {
  md: string;
  kind: Kind;
  /** For a mixture: whether it is the same all the way through. */
  homo?: boolean;
  why: string;
}
const SAMPLES: Sample[] = [
  { md: `oxygen, ${$('O2')}`, kind: 'element', why: 'oxygen' },
  { md: `iron, ${$('Fe')}`, kind: 'element', why: 'iron' },
  { md: `copper, ${$('Cu')}`, kind: 'element', why: 'copper' },
  { md: `helium, ${$('He')}`, kind: 'element', why: 'helium' },
  { md: `nitrogen, ${$('N2')}`, kind: 'element', why: 'nitrogen' },
  { md: `sulfur, ${$('S')}`, kind: 'element', why: 'sulfur' },
  { md: `gold, ${$('Au')}`, kind: 'element', why: 'gold' },
  { md: `chlorine, ${$('Cl2')}`, kind: 'element', why: 'chlorine' },
  { md: `aluminium, ${$('Al')}`, kind: 'element', why: 'aluminium' },
  { md: `water, ${$('H2O')}`, kind: 'compound', why: 'hydrogen and oxygen chemically joined in a fixed ratio' },
  { md: `carbon dioxide, ${$('CO2')}`, kind: 'compound', why: 'carbon and oxygen chemically joined in a fixed ratio' },
  { md: `sodium chloride (table salt), ${$('NaCl')}`, kind: 'compound', why: 'sodium and chlorine chemically joined in a fixed ratio' },
  { md: `ammonia, ${$('NH3')}`, kind: 'compound', why: 'nitrogen and hydrogen chemically joined in a fixed ratio' },
  { md: `glucose, ${$('C6H12O6')}`, kind: 'compound', why: 'carbon, hydrogen and oxygen chemically joined in a fixed ratio' },
  { md: `calcium carbonate, ${$('CaCO3')}`, kind: 'compound', why: 'calcium, carbon and oxygen chemically joined in a fixed ratio' },
  { md: `methane, ${$('CH4')}`, kind: 'compound', why: 'carbon and hydrogen chemically joined in a fixed ratio' },
  { md: `copper(II) oxide, ${$('CuO')}`, kind: 'compound', why: 'copper and oxygen chemically joined in a fixed ratio' },
  { md: 'air', kind: 'mixture', homo: true, why: 'nitrogen, oxygen, argon and other gases, not chemically joined' },
  { md: 'sea water', kind: 'mixture', homo: true, why: 'water with many dissolved salts, in no fixed ratio' },
  { md: 'salt water', kind: 'mixture', homo: true, why: 'salt dissolved in water, in no fixed ratio' },
  { md: 'vinegar', kind: 'mixture', homo: true, why: 'acetic acid dissolved in water' },
  { md: 'brass (copper and zinc melted together)', kind: 'mixture', homo: true, why: 'copper and zinc, in a ratio that can vary' },
  { md: 'steel', kind: 'mixture', homo: true, why: 'iron with a little carbon and other elements, in a ratio that can vary' },
  { md: 'soil', kind: 'mixture', homo: false, why: 'sand, clay, water and rotting plant material' },
  { md: 'granite', kind: 'mixture', homo: false, why: 'grains of several different minerals that you can see' },
  { md: 'muddy water', kind: 'mixture', homo: false, why: 'bits of soil spread through water' },
  { md: 'sand and water', kind: 'mixture', homo: false, why: 'sand that does not dissolve, sitting in water' },
  { md: 'oil and water', kind: 'mixture', homo: false, why: 'two liquids that do not mix and form layers' },
  { md: 'a fruit salad', kind: 'mixture', homo: false, why: 'pieces of different fruits that you can pick apart' },
  { md: 'concrete', kind: 'mixture', homo: false, why: 'cement, sand and stones that you can see' },
];

const KIND_RULE = 'An element contains only one kind of atom. A compound is two or more elements chemically joined in a fixed ratio. A mixture contains two or more substances that are not chemically joined.';

const PARTICLE_SAMPLES: Array<{ md: string; kind: Kind }> = [
  { md: 'The sample contains only one kind of atom, and the atoms are joined in pairs.', kind: 'element' },
  { md: 'Every particle in the sample is a molecule made of one carbon atom bonded to two oxygen atoms.', kind: 'compound' },
  { md: 'The sample contains separate helium atoms and separate neon atoms, moving about among each other.', kind: 'mixture' },
  { md: `The sample contains nitrogen molecules, ${$('N2')}, and oxygen molecules, ${$('O2')}, which are not joined to each other.`, kind: 'mixture' },
  { md: 'The sample contains only copper atoms, packed together in a regular pattern.', kind: 'element' },
  { md: 'The sample contains water molecules with sugar molecules spread among them.', kind: 'mixture' },
  { md: 'Every particle in the sample is a molecule of two hydrogen atoms bonded to one oxygen atom.', kind: 'compound' },
  { md: 'The sample is made of sodium ions and chloride ions, always in equal numbers, held together in a regular lattice.', kind: 'compound' },
  { md: `The sample contains hydrogen molecules, ${$('H2')}, and oxygen molecules, ${$('O2')}, that have not reacted.`, kind: 'mixture' },
  { md: `Every particle in the sample is an ozone molecule, ${$('O3')}: three oxygen atoms bonded together.`, kind: 'element' },
  { md: 'The substance cannot be broken down into simpler substances by any chemical reaction.', kind: 'element' },
  { md: 'The substance always has the same composition, and it can be broken down into simpler substances only by a chemical reaction.', kind: 'compound' },
  { md: 'Its parts can be present in any proportions, and they can be separated by physical methods such as filtering or evaporating.', kind: 'mixture' },
];

const MIX_KINDS = ['Homogeneous mixture', 'Heterogeneous mixture'];

const CLASSIFY_REASONING: Array<{ prompt: string; answer: string; wrong: string[]; why: string[] }> = [
  {
    prompt: 'A white solid is heated strongly in a test tube with nothing else added. It breaks down into a grey metal and a colourless gas. What can you conclude about the white solid?',
    answer: 'It is a compound: heating broke it down into simpler substances.',
    wrong: ['It is an element: it is made of only one kind of atom.', 'It is a mixture of a grey metal and a gas that were there all along.', 'It is a homogeneous mixture, because it looked the same all the way through.'],
    why: ['The grey metal and the gas look nothing like the white solid, so they are new substances made by a chemical change.', 'An element cannot be broken down into simpler substances, and a mixture would just separate into the parts it already had.', 'So the white solid is a compound.'],
  },
  {
    prompt: 'A clear, colourless liquid starts to boil at 82 °C, and its temperature keeps rising as it boils, up to 96 °C. What is the liquid most likely to be?',
    answer: 'A mixture: a pure substance boils at one fixed temperature.',
    wrong: ['An element, because it is colourless.', 'A compound, because it is clear.', 'A pure substance, because it boils below 100 °C.'],
    why: ['A pure substance (an element or a compound) melts and boils at one fixed temperature.', 'A liquid that boils over a range of temperatures must contain more than one substance, so it is a mixture.'],
  },
  {
    prompt: 'A grey solid melts at exactly the same temperature every time it is tested, and no physical method or chemical reaction can split it into simpler substances. What is it?',
    answer: 'An element',
    wrong: ['A compound', 'A mixture', 'A solution'],
    why: ['A fixed melting point shows it is a pure substance.', 'A compound can be broken down by a chemical reaction; this substance cannot be broken down at all, so it is an element.'],
  },
  {
    prompt: 'Passing electricity through pure water always produces hydrogen gas and oxygen gas, with twice as much hydrogen as oxygen by volume. What does this show about water?',
    answer: 'Water is a compound of hydrogen and oxygen, joined in a fixed ratio.',
    wrong: ['Water is a mixture of hydrogen and oxygen gases.', 'Water is an element, because it is a pure substance.', 'Water is a heterogeneous mixture, because two gases come out of it.'],
    why: ['Water is broken down into two simpler substances, so it is not an element.', 'The ratio is always the same, and water has properties quite unlike hydrogen and oxygen, so the elements are chemically joined: water is a compound.'],
  },
  {
    prompt: 'Grey iron filings and yellow sulfur powder are stirred together. A magnet held over the powder pulls out the iron filings. What is the grey-yellow powder?',
    answer: 'A mixture: the iron and the sulfur keep their own properties and can be separated physically.',
    wrong: ['A compound: the iron and the sulfur have joined together.', 'An element: it contains only one kind of atom.', 'A pure substance: it looks the same all the way through.'],
    why: ['The iron is still magnetic, so it has kept its own properties.', 'A magnet separates it without any chemical reaction, so the powder is a mixture.'],
  },
  {
    prompt: 'Iron filings and sulfur powder are heated together. The powder glows red and forms a black solid that a magnet does not attract. What is the black solid?',
    answer: 'A compound: the iron and sulfur have joined chemically, so the iron is no longer magnetic.',
    wrong: ['A mixture, because it was made from two substances.', 'An element, because it is a single solid.', 'A mixture: the iron is still there and could be pulled out with a magnet.'],
    why: ['The black solid has new properties: it is not magnetic, unlike iron, and is not yellow, unlike sulfur.', 'A new substance with a fixed composition has formed (iron sulfide), so it is a compound.'],
  },
  {
    prompt: 'A drink is made by dissolving sugar in water. Which description of the drink is correct?',
    answer: 'It is a homogeneous mixture: it is the same all the way through, and the amounts of sugar and water can vary.',
    wrong: ['It is a compound, because the sugar and the water have joined together.', 'It is a heterogeneous mixture, because it contains two substances.', 'It is a pure substance, because it looks clear.'],
    why: ['The sugar and water are not chemically joined, and you can add more or less sugar, so it is a mixture.', 'The sugar is spread evenly and you cannot see separate parts, so it is homogeneous.'],
  },
];

const describeSample = (s: Sample) =>
  `${cap(s.md)}: ${s.kind === 'mixture' ? `a ${s.homo ? 'homogeneous' : 'heterogeneous'} mixture of ${s.why}` : s.kind === 'element' ? `an element, made of only ${s.why} atoms` : `a compound of ${s.why}`}.`;

function classifyMatter(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const s = rng.pick(SAMPLES);
    return {
      prompt: `Is ${s.md}${s.md.includes('$') ? ',' : ''} an element, a compound or a mixture?`,
      parts: [part(fixedChoice(KIND_CHOICES, KINDS.indexOf(s.kind)))],
      hints: [KIND_RULE, 'A formula with one element symbol (such as $\\ce{O2}$) is an element; a formula with two or more symbols is a compound.'],
      solution: [describeSample(s)],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const p = rng.pick(PARTICLE_SAMPLES);
      return {
        prompt: `${p.md} Is it an element, a compound or a mixture?`,
        parts: [part(fixedChoice(KIND_CHOICES, KINDS.indexOf(p.kind)))],
        hints: [KIND_RULE, 'Count the kinds of particle: one kind of atom, one kind of molecule made of different atoms, or more than one kind of particle.'],
        solution: [
          p.kind === 'element' ? 'Only one kind of atom is present (atoms of one element may still be joined into molecules), so it is an element.' : p.kind === 'compound' ? 'Every particle is the same, and each contains different elements chemically joined in a fixed ratio, so it is a compound.' : 'More than one kind of particle is present, and they are not chemically joined to each other, so it is a mixture.',
        ],
      };
    }
    const s = rng.pick(SAMPLES.filter((x) => x.kind === 'mixture'));
    return {
      prompt: `Classify this mixture as homogeneous or heterogeneous: ${s.md}.`,
      parts: [part(fixedChoice(MIX_KINDS, s.homo ? 0 : 1))],
      hints: ['A homogeneous mixture is the same all the way through: you cannot see its separate parts. A heterogeneous mixture has parts you can see or that separate out.'],
      solution: [describeSample(s)],
    };
  }
  if (rng.chance(0.5)) {
    const r = rng.pick(CLASSIFY_REASONING);
    return {
      prompt: r.prompt,
      parts: [part(mc(rng, r.answer, r.wrong))],
      hints: [KIND_RULE, 'Ask whether new substances were made (a chemical change) or whether the parts just kept their own properties.'],
      solution: r.why,
    };
  }
  const target = rng.pick(['pure substance', 'mixture', 'element', 'compound', 'homogeneous mixture'] as const);
  const test = (s: Sample) => (target === 'pure substance' ? s.kind !== 'mixture' : target === 'homogeneous mixture' ? s.kind === 'mixture' && !!s.homo : s.kind === target);
  const opts = mixedSample(rng, SAMPLES, 5, test);
  return {
    prompt: `Select every ${target} in the list.`,
    parts: [part(multi(rng, opts.map((s) => ({ md: cap(s.md), correct: test(s) })), true))],
    hints: [KIND_RULE, 'Elements and compounds are pure substances. A mixture is homogeneous if it is the same all the way through.'],
    solution: opts.map(describeSample),
  };
}

// ---------------------------------------------------------------------------- solutions

interface SolutionCase {
  setup: string;
  solute: string;
  solvent: string;
  solution: string;
  /** Leave out "which is the solute?" when there is more than one solute. */
  noSolute?: boolean;
}
const SOLUTION_CASES: SolutionCase[] = [
  { setup: 'NAME stirs sugar into water until it disappears, making sugar water.', solute: 'sugar', solvent: 'water', solution: 'sugar water' },
  { setup: 'NAME dissolves salt in water to make salt water for a science experiment.', solute: 'salt', solvent: 'water', solution: 'salt water' },
  { setup: 'Blue crystals of copper(II) sulfate dissolve in water to make a clear blue liquid.', solute: 'copper(II) sulfate', solvent: 'water', solution: 'the clear blue liquid' },
  { setup: 'Iodine is dissolved in ethanol to make an antiseptic liquid.', solute: 'iodine', solvent: 'ethanol', solution: 'the antiseptic liquid' },
  { setup: 'Carbon dioxide gas is dissolved in water under pressure to make sparkling water.', solute: 'carbon dioxide', solvent: 'water', solution: 'sparkling water' },
  { setup: 'Brass is made by melting a small amount of zinc into a larger amount of copper and letting the mixture cool.', solute: 'zinc', solvent: 'copper', solution: 'brass' },
  { setup: 'NAME dissolves purple potassium permanganate crystals in water, and the whole beaker turns purple.', solute: 'potassium permanganate', solvent: 'water', solution: 'the purple liquid' },
  { setup: 'Air is a solution of gases: about 78% nitrogen, 21% oxygen and small amounts of argon and other gases.', solute: 'oxygen', solvent: 'nitrogen', solution: 'air', noSolute: true },
];
const SOLUTION_RULE = 'The solute is the substance that dissolves, the solvent is the substance it dissolves in (the one present in the larger amount), and the solution is the mixture they make.';

function solutions(rng: Rng, d: Difficulty): GenOutput {
  const name = rng.pick(NAMES);
  if (d === 1) {
    const c = rng.pick(SOLUTION_CASES);
    const ask = c.noSolute ? rng.pick(['solvent', 'solution'] as const) : rng.pick(['solute', 'solvent', 'solution'] as const);
    const right = c[ask];
    const others = [c.solute, c.solvent, c.solution].filter((x) => x !== right);
    return {
      prompt: `${c.setup.replace('NAME', name)} ${ask === 'solution' ? 'What is the solution?' : `Which substance is the ${ask}?`}`,
      parts: [part(mc(rng, cap(right), others.map(cap)))],
      hints: [SOLUTION_RULE],
      solution: [`${cap(c.solute)} ${c.noSolute ? 'and the other gases are the solutes' : 'is the solute'}, ${c.solvent} is the solvent, and ${c.solution} is the solution.`, `So the ${ask} is ${right}.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['total', 'solvent', 'solute', 'liquids'] as const);
    if (kind === 'liquids') {
      const [a, b] = rng.shuffle(['ethanol', 'water']);
      const va = rng.int(2, 9) * 10;
      let vb = rng.int(2, 9) * 10;
      if (vb === va) vb += 15;
      const solvent = va > vb ? a : b;
      const solute = solvent === a ? b : a;
      return {
        prompt: `${name} mixes ${q(va, 'mL')} of ${a} with ${q(vb, 'mL')} of ${b}. The two liquids mix completely. Which liquid is the solvent?`,
        parts: [part(mc(rng, cap(solvent), [cap(solute), 'Neither: two liquids cannot form a solution']))],
        hints: ['When both substances start as liquids, the solvent is the one present in the larger amount.'],
        solution: [`There is more ${solvent} (${q(Math.max(va, vb), 'mL')}) than ${solute} (${q(Math.min(va, vb), 'mL')}).`, `So ${solvent} is the solvent and ${solute} is the solute.`],
      };
    }
    const solute = rng.pick(['sugar', 'salt', 'potassium nitrate', 'copper(II) sulfate', 'glucose']);
    const m = rng.float(2, 40, 1);
    const w = rng.float(50, 300, 1);
    const total = m + w;
    if (kind === 'total') {
      return {
        prompt: `${name} dissolves ${q(f1(m), 'g')} of ${solute} in ${q(f1(w), 'g')} of water. What is the mass of the solution?`,
        parts: [numPart(r1(total), { decimals: 1, tolerance: 0.05, suffix: 'g' })],
        calculator: true,
        hints: ['Mass is not lost when a solid dissolves: mass of solution = mass of solute + mass of solvent.'],
        solution: [`$${f1(m)} + ${f1(w)} = ${f1(total)}\\ \\text{g}$`],
      };
    }
    if (kind === 'solvent') {
      return {
        prompt: `A solution of ${solute} in water has a mass of ${q(f1(total), 'g')} and contains ${q(f1(m), 'g')} of ${solute}. What mass of water does it contain?`,
        parts: [numPart(r1(w), { decimals: 1, tolerance: 0.05, suffix: 'g' })],
        calculator: true,
        hints: ['Mass of solution = mass of solute + mass of solvent, so mass of solvent = mass of solution − mass of solute.'],
        solution: [`$${f1(total)} - ${f1(m)} = ${f1(w)}\\ \\text{g}$ of water`],
      };
    }
    return {
      prompt: `${name} dissolves some ${solute} in ${q(f1(w), 'g')} of water and gets ${q(f1(total), 'g')} of solution, with no solid left over. What mass of ${solute} dissolved?`,
      parts: [numPart(m, { decimals: 1, tolerance: 0.05, suffix: 'g' })],
      calculator: true,
      hints: ['Mass of solute = mass of solution − mass of solvent.'],
      solution: [`$${f1(total)} - ${f1(w)} = ${f1(m)}\\ \\text{g}$ of ${solute}`],
    };
  }
  const kind = rng.pick(['beaker', 'evaporate', 'volume'] as const);
  if (kind === 'beaker') {
    const beaker = rng.float(80, 130, 1);
    const water = rng.float(100, 250, 1);
    const solute = rng.float(3, 30, 1);
    const what = rng.pick(['sugar', 'salt', 'potassium nitrate', 'citric acid']);
    return {
      prompt: `${name} measures masses on a balance. Empty beaker: ${q(f1(beaker), 'g')}. Beaker with water: ${q(f1(beaker + water), 'g')}. After stirring in some ${what} until it has all dissolved, the beaker with the solution: ${q(f1(beaker + water + solute), 'g')}. Find the mass of the solution and the mass of ${what} that dissolved.`,
      parts: [numPart(r1(water + solute), { decimals: 1, tolerance: 0.05, suffix: 'g', label: 'Mass of solution:' }), numPart(solute, { decimals: 1, tolerance: 0.05, suffix: 'g', label: `Mass of ${what}:` })],
      calculator: true,
      hints: ['Take away the mass of the empty beaker to find the mass of what is inside it.', 'Mass of solution = mass of solute + mass of water.'],
      solution: [
        `Water: $${f1(beaker + water)} - ${f1(beaker)} = ${f1(water)}\\ \\text{g}$`,
        `Solution: $${f1(beaker + water + solute)} - ${f1(beaker)} = ${f1(water + solute)}\\ \\text{g}$`,
        `${cap(what)}: $${f1(water + solute)} - ${f1(water)} = ${f1(solute)}\\ \\text{g}$`,
      ],
    };
  }
  if (kind === 'evaporate') {
    const dish = rng.float(25, 60, 1);
    const salt = rng.float(2, 15, 1);
    const water = rng.float(30, 90, 1);
    return {
      prompt: `An empty evaporating dish has a mass of ${q(f1(dish), 'g')}. Some salt solution is poured in, and the dish and solution have a mass of ${q(f1(dish + salt + water), 'g')}. The dish is heated until all the water has evaporated, and the dish with the dry salt then has a mass of ${q(f1(dish + salt), 'g')}. Find the mass of salt the solution contained and the mass of water that evaporated.`,
      parts: [numPart(salt, { decimals: 1, tolerance: 0.05, suffix: 'g', label: 'Mass of salt:' }), numPart(water, { decimals: 1, tolerance: 0.05, suffix: 'g', label: 'Mass of water:' })],
      calculator: true,
      hints: ['The mass lost on heating is the water that evaporated.', 'The mass left in the dish, minus the dish, is the salt.'],
      solution: [`Salt: $${f1(dish + salt)} - ${f1(dish)} = ${f1(salt)}\\ \\text{g}$`, `Water: $${f1(dish + salt + water)} - ${f1(dish + salt)} = ${f1(water)}\\ \\text{g}$`, `Check: $${f1(salt)} + ${f1(water)} = ${f1(salt + water)}\\ \\text{g}$ of solution.`],
    };
  }
  const v1 = rng.int(8, 30) * 5;
  const m = rng.float(2, 25, 1);
  const v2 = rng.int(2, 10) * 5;
  const what = rng.pick(['sugar', 'salt', 'glucose']);
  return {
    prompt: `${name} dissolves ${q(f1(m), 'g')} of ${what} in ${q(v1, 'mL')} of water, then stirs in another ${q(v2, 'mL')} of water. Each millilitre of water has a mass of ${q('1.00', 'g')}. What is the mass of the final solution?`,
    parts: [numPart(r1(m + v1 + v2), { decimals: 1, tolerance: 0.05, suffix: 'g' })],
    calculator: true,
    hints: ['Change each volume of water to a mass: 1 mL of water has a mass of 1.00 g.', 'Adding more water adds its mass to the solution.'],
    solution: [`Water: $${v1} + ${v2} = ${v1 + v2}\\ \\text{mL}$, which has a mass of $${v1 + v2}\\ \\text{g}$.`, `Solution: $${f1(m)} + ${v1 + v2} = ${f1(m + v1 + v2)}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.3: separating mixtures

type Method = 'filtration' | 'evaporation' | 'crystallization' | 'simple' | 'fractional' | 'chromatography' | 'magnet' | 'funnel' | 'decanting';
const METHOD_NAME: Record<Method, string> = {
  filtration: 'filtration',
  evaporation: 'evaporation',
  crystallization: 'crystallization',
  simple: 'simple distillation',
  fractional: 'fractional distillation',
  chromatography: 'paper chromatography',
  magnet: 'using a magnet',
  funnel: 'a separating funnel',
  decanting: 'decanting',
};
const METHOD_PROPERTY: Record<Method, string> = {
  filtration: 'One part is a solid that does not dissolve, and the other is a liquid or a solution.',
  evaporation: 'The solvent evaporates, but the dissolved solid does not.',
  crystallization: 'The dissolved solid forms crystals as a hot, concentrated solution cools.',
  simple: 'The liquid boils at a much lower temperature than the dissolved solid, so it can be boiled off and condensed back into a liquid.',
  fractional: 'The liquids mix completely but boil at different temperatures.',
  chromatography: 'The substances are carried along the paper by the solvent at different speeds.',
  magnet: 'One part is magnetic and the other is not.',
  funnel: 'The two liquids do not mix, so they form separate layers.',
  decanting: 'The solid is dense and settles to the bottom, so the liquid can be poured off it.',
};
/** Methods whose properties sound alike, so they are never offered as distractors for each other. */
const METHOD_GROUP: Record<Method, number> = { filtration: 1, decanting: 1, evaporation: 2, crystallization: 2, simple: 2, fractional: 3, chromatography: 4, magnet: 5, funnel: 6 };
const METHOD_HOW: Record<Method, string> = {
  filtration: 'Filtration: the liquid passes through the filter paper as the filtrate, and the insoluble solid stays on the paper as the residue.',
  evaporation: 'Evaporation: heating the solution drives off the solvent as a vapour and leaves the dissolved solid behind.',
  crystallization: 'Crystallization: the solution is heated until it is concentrated, then left to cool so crystals form; they are filtered off and dried.',
  simple: 'Simple distillation: the liquid boils off, its vapour is cooled in a condenser, and the pure liquid (the distillate) is collected; the dissolved solid stays behind.',
  fractional: 'Fractional distillation: the liquid with the lowest boiling point boils off first and rises up the fractionating column; the others follow as the temperature rises.',
  chromatography: 'Paper chromatography: a solvent soaks up the paper and carries each dissolved substance a different distance.',
  magnet: 'A magnet pulls out the magnetic part and leaves the rest behind.',
  funnel: 'A separating funnel: the liquids settle into two layers, and the bottom layer is run off through the tap.',
  decanting: 'Decanting: once the solid has settled, the liquid is carefully poured off the top.',
};

interface SepCase {
  mix: string;
  goal: string;
  hint: string;
  answer: Method;
  bad: Method[];
}
const SEP_CASES: SepCase[] = [
  { mix: 'sand and water', goal: 'remove the sand from the water', hint: 'Sand does not dissolve in water.', answer: 'filtration', bad: ['magnet', 'chromatography', 'fractional', 'funnel', 'crystallization'] },
  { mix: 'chalk powder stirred into water', goal: 'collect the chalk', hint: 'Chalk does not dissolve in water.', answer: 'filtration', bad: ['magnet', 'chromatography', 'fractional', 'funnel'] },
  { mix: 'salt water', goal: 'get the salt back as a dry solid', hint: 'The salt is dissolved, and water evaporates far more easily than salt.', answer: 'evaporation', bad: ['filtration', 'magnet', 'funnel', 'decanting'] },
  { mix: 'salt water', goal: 'collect pure water from it', hint: 'Water boils at 100 °C, but salt does not boil until well over 1000 °C.', answer: 'simple', bad: ['filtration', 'evaporation', 'magnet', 'funnel'] },
  { mix: 'sea water', goal: 'collect drinkable water from it', hint: 'The salts are dissolved; water boils at a far lower temperature than they do.', answer: 'simple', bad: ['filtration', 'evaporation', 'magnet', 'decanting'] },
  { mix: 'water coloured with a dissolved purple dye', goal: 'collect pure, colourless water', hint: 'The dye stays behind when the water boils.', answer: 'simple', bad: ['filtration', 'magnet', 'funnel', 'decanting'] },
  { mix: 'ethanol and water, which mix completely', goal: 'separate the two liquids', hint: 'Ethanol boils at 78 °C and water at 100 °C.', answer: 'fractional', bad: ['filtration', 'funnel', 'magnet', 'evaporation'] },
  { mix: 'liquid air', goal: 'separate the nitrogen from the oxygen', hint: 'Nitrogen boils at −196 °C and oxygen at −183 °C, and the liquids mix completely.', answer: 'fractional', bad: ['filtration', 'funnel', 'magnet', 'chromatography'] },
  { mix: 'crude oil', goal: 'separate it into fuels with different boiling ranges', hint: 'Crude oil is a mixture of many liquids that mix together but have different boiling points.', answer: 'fractional', bad: ['filtration', 'magnet', 'chromatography', 'evaporation'] },
  { mix: 'the coloured dyes in a drop of black ink', goal: 'separate the dyes from each other', hint: 'All the dyes dissolve in water, but water carries some of them along a strip of paper faster than others.', answer: 'chromatography', bad: ['filtration', 'magnet', 'funnel', 'evaporation'] },
  { mix: 'the coloured pigments in a spinach-leaf extract', goal: 'find out how many different pigments it contains', hint: 'The pigments dissolve in a solvent, which carries them along paper at different speeds.', answer: 'chromatography', bad: ['filtration', 'magnet', 'funnel', 'decanting'] },
  { mix: 'iron filings and sand', goal: 'separate them', hint: 'Iron is magnetic and sand is not.', answer: 'magnet', bad: ['filtration', 'evaporation', 'chromatography', 'simple'] },
  { mix: 'steel pins dropped into a box of sawdust', goal: 'recover the pins', hint: 'Steel is magnetic; sawdust is not.', answer: 'magnet', bad: ['filtration', 'evaporation', 'fractional', 'funnel'] },
  { mix: 'cooking oil and water', goal: 'separate the two liquids', hint: 'Oil does not mix with water and floats on it as a separate layer.', answer: 'funnel', bad: ['filtration', 'evaporation', 'magnet', 'chromatography'] },
  { mix: 'water with heavy gravel that has settled to the bottom of a bucket', goal: 'remove most of the water quickly', hint: 'The gravel sinks and stays at the bottom.', answer: 'decanting', bad: ['magnet', 'chromatography', 'crystallization'] },
  { mix: 'copper(II) sulfate solution', goal: 'obtain large blue crystals of copper(II) sulfate', hint: 'Heating the solid to dryness would break up the blue crystals, so the solution is only concentrated and then left to cool.', answer: 'crystallization', bad: ['filtration', 'magnet', 'funnel', 'chromatography'] },
];

const SEQUENCES: Array<{ mix: string; want: string; right: string; wrong: string[]; why: string[] }> = [
  {
    mix: 'sand and salt',
    want: 'dry salt and dry sand',
    right: 'Add water and stir; filter off the sand; evaporate the water from the filtrate.',
    wrong: ['Filter the dry mixture; add water to what passes through; evaporate.', 'Add water and stir; evaporate all the water; then filter.', 'Add water and stir; filter; then evaporate the sand left on the filter paper to get the salt.'],
    why: ['Salt dissolves in water but sand does not, so adding water puts the salt into solution.', 'Filtering keeps the sand on the paper (the residue) and lets the salt solution through (the filtrate).', 'Evaporating the water from the filtrate leaves the salt.'],
  },
  {
    mix: 'chalk powder and sugar',
    want: 'the chalk and crystals of sugar',
    right: 'Add water and stir; filter off the chalk; crystallize the sugar from the filtrate.',
    wrong: ['Filter the dry mixture; add water to what passes through; crystallize.', 'Add water and stir; crystallize the sugar; then filter the whole mixture to remove the chalk from the sugar crystals.', 'Add water and stir; filter; then crystallize the chalk left on the filter paper.'],
    why: ['Sugar dissolves in water but chalk does not.', 'Filtering keeps the chalk on the paper and lets the sugar solution through.', 'The sugar is crystallized from the filtrate; strong heating would char it.'],
  },
  {
    mix: 'iron filings, sand and salt',
    want: 'each of the three solids on its own',
    right: 'Pull out the iron with a magnet; add water to the rest and stir; filter off the sand; evaporate the water from the filtrate.',
    wrong: ['Add water and stir; filter; evaporate the filtrate; the iron and sand stay together on the filter paper as one solid.', 'Add water and stir; evaporate all the water; then pull out the iron with a magnet.', 'Filter the dry mixture; pull out the salt with a magnet; evaporate.'],
    why: ['Only iron is magnetic, so a magnet removes it first.', 'Salt dissolves in water and sand does not, so filtering separates them.', 'Evaporating the filtrate leaves the salt.'],
  },
];

const FILTER_CASES: Array<{ solid: string; solution: string; dissolved: string }> = [
  { solid: 'sand', solution: 'salt solution', dissolved: 'salt' },
  { solid: 'chalk', solution: 'sugar solution', dissolved: 'sugar' },
  { solid: 'sand', solution: 'copper(II) sulfate solution', dissolved: 'copper(II) sulfate' },
  { solid: 'charcoal powder', solution: 'potassium nitrate solution', dissolved: 'potassium nitrate' },
];

function separation(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    if (d === 2 && rng.chance(0.4)) {
      const m = rng.pick(Object.keys(METHOD_NAME) as Method[]);
      const pool = (Object.keys(METHOD_NAME) as Method[]).filter((x) => METHOD_GROUP[x] !== METHOD_GROUP[m]);
      return {
        prompt: `Separating a mixture by ${METHOD_NAME[m] === 'a separating funnel' ? 'using a separating funnel' : METHOD_NAME[m]} works because of a difference between its parts. Which difference does it rely on?`,
        parts: [part(mc(rng, METHOD_PROPERTY[m], rng.sample(pool, 3).map((x) => METHOD_PROPERTY[x])))],
        hints: ['Picture what happens to each part of the mixture during the method.', 'Every method works because one part behaves differently from the other: size of particles, boiling point, magnetism, density or solubility.'],
        solution: [METHOD_HOW[m], `It relies on this: ${METHOD_PROPERTY[m][0].toLowerCase()}${METHOD_PROPERTY[m].slice(1)}`],
      };
    }
    const c = rng.pick(SEP_CASES);
    return {
      prompt: `You have ${c.mix}, and you want to ${c.goal}.${d === 1 ? ` ${c.hint}` : ''} Which method should you use?`,
      parts: [part(mc(rng, cap(METHOD_NAME[c.answer]), rng.sample(c.bad, 3).map((x) => cap(METHOD_NAME[x]))))],
      hints: d === 1 ? ['Use the property given in the question to pick the method.'] : ['Decide which part is dissolved, which is insoluble, which is magnetic, and which parts are liquids.', 'Then pick the method that uses the difference between the parts.'],
      solution: [c.hint, METHOD_HOW[c.answer], `Use ${METHOD_NAME[c.answer]}.`],
    };
  }
  const kind = rng.pick(['sequence', 'filter', 'liquids'] as const);
  if (kind === 'sequence') {
    const s = rng.pick(SEQUENCES);
    return {
      prompt: `${rng.pick(NAMES)} has a mixture of ${s.mix} and wants to get ${s.want}. Which plan works?`,
      parts: [part(mc(rng, s.right, s.wrong))],
      hints: ['Decide which parts dissolve in water and which part is magnetic.', 'Each step should remove one part, and the step that recovers a dissolved solid comes last.'],
      solution: s.why,
    };
  }
  if (kind === 'filter') {
    const f = rng.pick(FILTER_CASES);
    const right = `Residue: ${f.solid}. Filtrate: ${f.solution}.`;
    return {
      prompt: `A mixture of ${f.solid} and ${f.solution} is poured through filter paper in a funnel. What is the residue, and what is the filtrate?`,
      parts: [part(mc(rng, right, [`Residue: ${f.solution}. Filtrate: ${f.solid}.`, `Residue: ${f.solid} and ${f.dissolved}. Filtrate: pure water.`, `Residue: crystals of ${f.dissolved}. Filtrate: water and ${f.solid}.`]))],
      hints: ['The residue is what stays on the filter paper; the filtrate is what passes through.', 'Dissolved particles are small enough to pass through the paper with the water.'],
      solution: [`${cap(f.solid)} does not dissolve, so it stays on the paper as the residue.`, `The ${f.dissolved} is dissolved, so it passes through with the water: the filtrate is ${f.solution}.`],
    };
  }
  const [a, b] = ['liquid A', 'liquid B'];
  const ta = rng.int(30, 90);
  let tb = rng.int(60, 160);
  if (Math.abs(tb - ta) < 15) tb = ta + rng.int(20, 50);
  const low = ta < tb ? a : b;
  const high = low === a ? b : a;
  if (rng.chance(0.5)) {
    return {
      prompt: `${cap(a)} boils at ${degC(ta)} and ${b} boils at ${degC(tb)}. The two liquids mix completely. Which method separates them, and which liquid is collected first?`,
      parts: [part(mc(rng, `Fractional distillation; ${low} is collected first.`, [`Fractional distillation; ${high} is collected first.`, `A separating funnel; ${low} is run off first.`, `Filtration; ${low} passes through the paper first.`]))],
      hints: ['Liquids that mix completely do not form layers, so a separating funnel cannot work.', 'In distillation, the liquid with the lower boiling point turns to vapour first.'],
      solution: ['The liquids mix completely but have different boiling points, so fractional distillation separates them.', `${cap(low)} has the lower boiling point, so it boils off and is collected first.`],
    };
  }
  const dense = rng.pick([a, b]);
  const light = dense === a ? b : a;
  const da = dense === a ? rng.float(1.1, 1.6, 2) : rng.float(0.65, 0.95, 2);
  const db = dense === b ? rng.float(1.1, 1.6, 2) : rng.float(0.65, 0.95, 2);
  return {
    prompt: `${cap(a)} (density ${q(da.toFixed(2), 'g/mL')}) and ${b} (density ${q(db.toFixed(2), 'g/mL')}) do not mix: shaken together, they settle into two layers. Which method separates them, and which liquid comes out of the method first?`,
    parts: [part(mc(rng, `A separating funnel; ${dense} is run off first through the tap.`, [`A separating funnel; ${light} is run off first through the tap.`, `Fractional distillation; ${dense} is collected first.`, `Filtration; ${light} passes through the paper first.`]))],
    hints: ['Liquids that do not mix form layers, and the denser liquid forms the bottom layer.', 'A separating funnel has its tap at the bottom.'],
    solution: ['Liquids that do not mix form two layers, so a separating funnel separates them.', `${cap(dense)} is denser, so it forms the bottom layer and is run off first through the tap.`],
  };
}

// ---------------------------------------------------------------------------- paper chromatography

const RF_DEF = '$R_f = \\dfrac{\\text{distance moved by the spot}}{\\text{distance moved by the solvent}}$, both measured from the baseline.';
const COLOURS = ['red', 'yellow', 'blue', 'green', 'purple', 'orange', 'pink'];
const SOURCES = ['a food colouring', 'a sample of black ink', 'the coating of a coloured sweet', 'a felt-tip pen', 'a plant extract'];

/** Rf values in the same solvent, at least 0.1 apart. */
function rfSet(rng: Rng, n: number): number[] {
  for (let i = 0; i < 100; i++) {
    const vals = rng.sample([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9], n).sort((x, y) => x - y);
    if (vals.every((v, k) => k === 0 || v - vals[k - 1] >= 0.1 - 1e-9)) return vals;
  }
  return [0.15, 0.35, 0.55, 0.75, 0.9].slice(0, n);
}

function chromatography(rng: Rng, d: Difficulty): GenOutput {
  const colour = rng.pick(COLOURS);
  const source = rng.pick(SOURCES);
  if (d === 1) {
    const f = rng.float(5, 12, 1);
    const s = rng.float(0.8, f - 0.5, 1);
    const rf = s / f;
    return {
      prompt: `A chromatogram of ${source} is made. The solvent moved ${q(f1(f), 'cm')} from the baseline, and the ${colour} spot moved ${q(f1(s), 'cm')}. Calculate the $R_f$ value of the ${colour} dye, to 2 decimal places.`,
      parts: [numPart(rf, { decimals: 2, label: '$R_f =$' })],
      calculator: true,
      hints: [RF_DEF],
      solution: [`$R_f = \\dfrac{${f1(s)}}{${f1(f)}} = ${f2(rf)}$`, 'An $R_f$ value has no unit, and it is always less than 1, because a spot never moves farther than the solvent.'],
    };
  }
  if (d === 2) {
    const base = rng.pick([1, 1.5, 2]);
    const front = rng.float(base + 6, base + 12, 1);
    const spot = rng.float(base + 0.8, front - 0.5, 1);
    if (rng.chance(0.5)) {
      const rf = (spot - base) / (front - base);
      return {
        prompt: `In a paper chromatography experiment on ${source}, the pencil baseline is ${q(f1(base), 'cm')} above the bottom edge of the paper. At the end, the solvent front is ${q(f1(front), 'cm')} above the bottom edge, and the centre of the ${colour} spot is ${q(f1(spot), 'cm')} above it. Find the $R_f$ value of the ${colour} dye, to 2 decimal places.`,
        parts: [numPart(rf, { decimals: 2, label: '$R_f =$' })],
        calculator: true,
        hints: [RF_DEF, 'The distances here are measured from the bottom edge, so take away the height of the baseline first.'],
        solution: [`Spot: $${f1(spot)} - ${f1(base)} = ${f1(spot - base)}\\ \\text{cm}$`, `Solvent: $${f1(front)} - ${f1(base)} = ${f1(front - base)}\\ \\text{cm}$`, `$R_f = \\dfrac{${f1(spot - base)}}{${f1(front - base)}} = ${f2(rf)}$`],
      };
    }
    const f = rng.float(6, 12, 1);
    const [c1, c2] = rng.sample(COLOURS, 2);
    const s1 = rng.float(0.8, f / 2 - 0.3, 1);
    const s2 = rng.float(f / 2 + 0.3, f - 0.5, 1);
    return {
      prompt: `${cap(source)} separates into ${an(c1)} spot and ${an(c2)} spot. Measured from the baseline, the ${c1} spot moved ${q(f1(s1), 'cm')}, the ${c2} spot moved ${q(f1(s2), 'cm')}, and the solvent moved ${q(f1(f), 'cm')}. Find the $R_f$ value of each dye, to 2 decimal places.`,
      parts: [numPart(s1 / f, { decimals: 2, label: `${cap(c1)}: $R_f =$` }), numPart(s2 / f, { decimals: 2, label: `${cap(c2)}: $R_f =$` })],
      calculator: true,
      hints: [RF_DEF, 'Both dyes are divided by the same solvent distance.'],
      solution: [`${cap(c1)}: $R_f = \\dfrac{${f1(s1)}}{${f1(f)}} = ${f2(s1 / f)}$`, `${cap(c2)}: $R_f = \\dfrac{${f1(s2)}}{${f1(f)}} = ${f2(s2 / f)}$`, `The ${c2} dye has the larger $R_f$: it is carried farther by the solvent.`],
    };
  }
  const kind = rng.pick(['distance', 'identify', 'mixture'] as const);
  if (kind === 'distance') {
    const rf = rng.pick([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85]);
    if (rng.chance(0.5)) {
      const f = rng.float(6, 12, 1);
      const s = rf * f;
      return {
        prompt: `In a certain solvent, ${an(colour)} dye has an $R_f$ value of ${f2(rf)}. In a test with this solvent, the solvent moves ${q(f1(f), 'cm')} from the baseline. How far from the baseline will the ${colour} spot be, to 1 decimal place?`,
        parts: [numPart(s, { decimals: 1, suffix: 'cm' })],
        calculator: true,
        hints: [RF_DEF, 'Rearrange: distance moved by the spot $= R_f \\times$ distance moved by the solvent.'],
        solution: [`Distance of the spot $= ${f2(rf)} \\times ${f1(f)} = ${fmtFixed(s, 2)}$, about $${f1(s)}\\ \\text{cm}$.`],
      };
    }
    const s = rng.float(1.5, 7, 1);
    const f = s / rf;
    return {
      prompt: `${cap(an(colour))} dye has an $R_f$ value of ${f2(rf)} in a certain solvent. Its spot ends up ${q(f1(s), 'cm')} from the baseline. How far did the solvent move from the baseline, to 1 decimal place?`,
      parts: [numPart(f, { decimals: 1, suffix: 'cm' })],
      calculator: true,
      hints: [RF_DEF, 'Rearrange: distance moved by the solvent $= \\dfrac{\\text{distance moved by the spot}}{R_f}$.'],
      solution: [`Distance moved by the solvent $= \\dfrac{${f1(s)}}{${f2(rf)}} = ${fmtFixed(f, 2)}$, about $${f1(f)}\\ \\text{cm}$.`, `Check: the solvent moved farther than the spot, as it must.`],
    };
  }
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const n = kind === 'identify' ? 4 : 5;
  const rfs = rng.shuffle(rfSet(rng, n));
  const dyes = rng.shuffle(rfs.map((rf, k) => ({ name: `Dye ${letters[k]}`, rf })));
  const figure: TableFigure = { type: 'table', headers: ['Dye', '$R_f$ in this solvent'], rows: [...dyes].sort((x, y) => x.name.localeCompare(y.name)).map((x) => [x.name, f2(x.rf)]) };
  const f = rng.float(7, 12, 1);
  if (kind === 'identify') {
    const t = rng.pick(dyes);
    const s = Math.round(t.rf * f * 10) / 10;
    const rf = s / f;
    return {
      prompt: `An unknown dye is tested by paper chromatography, using the same solvent as the dyes in the table. Its spot moves ${q(f1(s), 'cm')} from the baseline, and the solvent moves ${q(f1(f), 'cm')}. Which dye is it?`,
      figure,
      parts: [part(mc(rng, t.name, dyes.filter((x) => x !== t).map((x) => x.name)))],
      calculator: true,
      hints: [RF_DEF, 'Work out the $R_f$ of the unknown dye, then find the dye in the table with the same value.'],
      solution: [`$R_f = \\dfrac{${f1(s)}}{${f1(f)}} = ${f2(rf)}$`, `The closest value in the table is ${t.name} ($R_f = ${f2(t.rf)}$), so the unknown dye is ${t.name}.`],
    };
  }
  const inside = rng.sample(dyes, 2).sort((x, y) => x.rf - y.rf);
  const spots = inside.map((x) => Math.round(x.rf * f * 10) / 10);
  return {
    prompt: `A sample of ink is tested with the same solvent as the dyes in the table. It gives two spots, ${q(f1(spots[0]), 'cm')} and ${q(f1(spots[1]), 'cm')} from the baseline, and the solvent moves ${q(f1(f), 'cm')}. Select every dye that the ink contains.`,
    figure,
    parts: [part(multi(rng, [...dyes].sort((x, y) => x.name.localeCompare(y.name)).map((x) => ({ md: x.name, correct: inside.includes(x) })), true))],
    calculator: true,
    hints: [RF_DEF, 'Find the $R_f$ value of each spot and match it to the table.'],
    solution: [
      `First spot: $R_f = \\dfrac{${f1(spots[0])}}{${f1(f)}} = ${f2(spots[0] / f)}$, closest to ${inside[0].name}.`,
      `Second spot: $R_f = \\dfrac{${f1(spots[1])}}{${f1(f)}} = ${f2(spots[1] / f)}$, closest to ${inside[1].name}.`,
      `The ink contains ${inside[0].name} and ${inside[1].name}.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.4: physical and chemical change

type ChangeKind = 'physical' | 'chemical';
const CHANGE_KINDS = ['Physical change', 'Chemical change'];

const SIMPLE_CHANGES: Array<[string, ChangeKind, string]> = [
  ['An ice cube melts in a drink.', 'physical', 'It is still water, only now a liquid.'],
  ['Water boils in a kettle.', 'physical', 'The steam is still water, only now a gas.'],
  ['Sugar dissolves in a cup of tea.', 'physical', 'The sugar is still there and could be got back by evaporating the water.'],
  ['A sheet of paper is torn into pieces.', 'physical', 'The pieces are still paper; only their size and shape have changed.'],
  ['A log is cut into planks.', 'physical', 'The planks are still wood; only the shape has changed.'],
  ['A glass bottle smashes on the floor.', 'physical', 'The pieces are still glass.'],
  ['A copper wire is bent into a loop.', 'physical', 'It is still copper; only the shape has changed.'],
  ['Steam condenses on a cold window.', 'physical', 'The droplets are still water.'],
  ['Salt is stirred into water and disappears.', 'physical', 'The salt can be got back by evaporating the water.'],
  ['Dry ice (solid carbon dioxide) turns into a gas.', 'physical', 'It is still carbon dioxide, only now a gas.'],
  ['Wood burns in a campfire.', 'chemical', 'New substances form: ash, carbon dioxide and water vapour, with heat and light given out.'],
  ['An iron nail rusts in damp air.', 'chemical', 'A new reddish-brown substance, rust (iron oxide), forms.'],
  ['A cake bakes in an oven.', 'chemical', 'The cooked cake is a new substance that cannot be turned back into batter.'],
  ['An egg is fried.', 'chemical', 'The cooked egg has new properties and cannot be turned back into a raw egg.'],
  ['Milk goes sour.', 'chemical', 'New substances form that change its taste and smell.'],
  ['A match burns.', 'chemical', 'New substances form, with heat and light given out.'],
  ['A banana turns brown and rots.', 'chemical', 'New substances form as the fruit decays.'],
  ['Bread is toasted until it turns brown.', 'chemical', 'The brown surface is a new substance.'],
  ['A silver spoon slowly darkens (tarnishes).', 'chemical', 'A dark new substance forms on the surface of the silver.'],
  ['Fireworks explode in the night sky.', 'chemical', 'New substances form, with heat, light and sound given out.'],
];

const R = {
  gas: 'Chemical: a new gas is produced, seen as bubbles or fizzing.',
  ppt: 'Chemical: a new solid (a precipitate) forms when two solutions are mixed.',
  colour: 'Chemical: a new substance with a different colour forms.',
  energy: 'Chemical: heat and light are given out as new substances form.',
  state: 'Physical: only the state changes; it is still the same substance.',
  dissolve: 'Physical: the solid dissolves, and it could be got back by evaporating the water.',
  shape: 'Physical: only the shape or size changes.',
  mix: 'Physical: the substances are only mixed, and they could be separated again.',
};
const CHEM_REASONS = [R.gas, R.ppt, R.colour, R.energy];
const PHYS_REASONS = [R.state, R.dissolve, R.shape, R.mix];

const EVIDENCE_CHANGES: Array<{ md: string; kind: ChangeKind; reason: string; alsoTrue?: string[] }> = [
  { md: 'Zinc granules are added to dilute hydrochloric acid. The zinc fizzes and slowly disappears.', kind: 'chemical', reason: R.gas },
  { md: 'Vinegar is poured onto baking soda, and the mixture froths up.', kind: 'chemical', reason: R.gas },
  { md: 'An antacid tablet is dropped into a glass of water and fizzes.', kind: 'chemical', reason: R.gas },
  { md: 'Clear, colourless solutions of silver nitrate and sodium chloride are mixed, and a white solid appears.', kind: 'chemical', reason: R.ppt, alsoTrue: [R.colour] },
  { md: 'Clear, colourless solutions of potassium iodide and lead(II) nitrate are mixed, and a bright yellow solid appears.', kind: 'chemical', reason: R.ppt, alsoTrue: [R.colour] },
  { md: 'Green copper(II) carbonate powder is heated strongly and turns into a black powder.', kind: 'chemical', reason: R.colour, alsoTrue: [R.gas] },
  { md: 'A shiny iron nail is left in damp air for a week and becomes coated with flaky reddish-brown rust.', kind: 'chemical', reason: R.colour },
  { md: 'A copper roof slowly turns green over many years.', kind: 'chemical', reason: R.colour },
  { md: 'A strip of magnesium ribbon burns with a dazzling white flame and leaves a white powder.', kind: 'chemical', reason: R.energy, alsoTrue: [R.colour] },
  { md: 'Natural gas burns on a gas stove with a hot blue flame.', kind: 'chemical', reason: R.energy },
  { md: 'Water in a kettle boils, and bubbles rise through it.', kind: 'physical', reason: R.state },
  { md: 'A bar of chocolate melts in a hot car and sets solid again when it cools.', kind: 'physical', reason: R.state },
  { md: 'Wax near a candle flame melts into a pool of liquid and hardens again when the candle is blown out.', kind: 'physical', reason: R.state },
  { md: 'A lump of dry ice gives off a cold, white fog as it turns into carbon dioxide gas.', kind: 'physical', reason: R.state },
  { md: 'Sugar is stirred into hot tea and disappears.', kind: 'physical', reason: R.dissolve, alsoTrue: [R.mix] },
  { md: 'Salt is stirred into a pan of water and disappears.', kind: 'physical', reason: R.dissolve, alsoTrue: [R.mix] },
  { md: 'Grey iron filings and yellow sulfur powder are stirred together into a speckled powder.', kind: 'physical', reason: R.mix },
  { md: 'Sand is mixed into gravel.', kind: 'physical', reason: R.mix },
  { md: 'A sheet of aluminium foil is crumpled into a ball.', kind: 'physical', reason: R.shape },
  { md: 'A glass bottle is crushed into small pieces for recycling.', kind: 'physical', reason: R.shape },
];

const TRICKY_CHANGES: Array<{ md: string; kind: ChangeKind; why: string }> = [
  { md: 'Sugar is heated until it turns black and gives off steam.', kind: 'chemical', why: 'the black solid is a new substance (mostly carbon)' },
  { md: 'A glow stick is bent and starts to glow.', kind: 'chemical', why: 'substances inside react and give out light' },
  { md: 'A cake mixture rises and turns brown in the oven.', kind: 'chemical', why: 'new substances form, including a gas that makes it rise' },
  { md: 'Hydrogen peroxide solution breaks down into water and oxygen gas.', kind: 'chemical', why: 'two new substances form' },
  { md: 'Two clear, colourless solutions are mixed and a white solid forms.', kind: 'chemical', why: 'a precipitate, a new solid, forms' },
  { md: 'An iron gate rusts in the rain.', kind: 'chemical', why: 'rust is a new substance' },
  { md: 'Water boils and bubbles form in it.', kind: 'physical', why: 'the bubbles are water vapour, still water' },
  { md: 'Dry ice gives off a white fog as it turns into a gas.', kind: 'physical', why: 'it is still carbon dioxide, just changing state' },
  { md: 'Salt dissolves in water.', kind: 'physical', why: 'the salt can be got back by evaporating the water' },
  { md: 'A metal rod gets longer when it is heated.', kind: 'physical', why: 'it is still the same metal; only its size changes' },
  { md: 'The filament of a light bulb glows white-hot when it is switched on.', kind: 'physical', why: 'the filament is still the same metal and stops glowing when switched off' },
  { md: 'Iodine crystals turn straight into a purple vapour when warmed.', kind: 'physical', why: 'it is still iodine, just changing state' },
];

const CLAIMS: Array<{ claim: string; answer: string; wrongNo: string }> = [
  { claim: 'Bubbles form when water boils, so boiling is a chemical change.', answer: 'No: the bubbles are water vapour, the same substance as the liquid, so boiling is a physical change.', wrongNo: 'No: a change is chemical only if there is a flame.' },
  { claim: 'Salt disappears when it dissolves in water, so dissolving is a chemical change.', answer: 'No: the salt is still there and can be got back by evaporating the water, so dissolving is a physical change.', wrongNo: 'No: dissolving is chemical only when the water is hot.' },
  { claim: 'Frying an egg is a physical change, because the egg just turns from runny to solid.', answer: 'No: the cooked egg is a new substance with new properties and cannot be turned back, so it is a chemical change.', wrongNo: 'No: it is physical only if the egg is boiled instead.' },
  { claim: 'A light bulb gives out heat and light, so a chemical change happens inside it.', answer: 'No: the glowing filament stays the same metal and stops glowing when switched off, so it is a physical change.', wrongNo: 'No: light is never a sign of a chemical change.' },
  { claim: 'Rusting is a physical change, because the nail is still made of iron.', answer: 'No: rust is a new substance, iron oxide, with different properties, so rusting is a chemical change.', wrongNo: 'No: rusting is not a change at all, because the nail keeps its shape.' },
  { claim: 'Melting ice takes in energy, so melting is a chemical change.', answer: 'No: changes of state also take in or give out energy; melted ice is still water, so melting is a physical change.', wrongNo: 'No: melting gives out energy, so it cannot be chemical.' },
];

function changeType(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [md, kind, why] = rng.pick(SIMPLE_CHANGES);
    return {
      prompt: `${md} Is this a physical change or a chemical change?`,
      parts: [part(fixedChoice(CHANGE_KINDS, kind === 'physical' ? 0 : 1))],
      hints: ['Ask: is a new substance made? If so, it is a chemical change. If the substance only changes state, shape or size, or dissolves, it is a physical change.'],
      solution: [why, `So it is a ${kind} change.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(EVIDENCE_CHANGES);
    const opposite = e.kind === 'chemical' ? PHYS_REASONS : CHEM_REASONS;
    const same = (e.kind === 'chemical' ? CHEM_REASONS : PHYS_REASONS).filter((r) => r !== e.reason && !(e.alsoTrue ?? []).includes(r));
    const wrong = [...rng.sample(opposite, 2), ...rng.sample(same, 1)];
    return {
      prompt: `${e.md} Which statement correctly classifies this change and gives the evidence?`,
      parts: [part(mc(rng, e.reason, wrong))],
      hints: ['Evidence of a chemical change: a new gas, a precipitate, a colour change, or heat and light given out, because a new substance forms.', 'Bubbles in boiling water and the disappearing of a dissolving solid are not new substances.'],
      solution: [e.kind === 'chemical' ? 'A new substance forms, so it is a chemical change.' : 'No new substance forms, so it is a physical change.', e.reason],
    };
  }
  if (rng.chance(0.5)) {
    const opts = mixedSample(rng, TRICKY_CHANGES, 5, (x) => x.kind === 'chemical');
    return {
      prompt: 'Select every chemical change.',
      parts: [part(multi(rng, opts.map((o) => ({ md: o.md, correct: o.kind === 'chemical' })), true))],
      hints: ['A chemical change makes a new substance. Bubbles, light or heat on their own do not prove it: ask what the substance is afterwards.'],
      solution: opts.map((o) => `${o.md} ${cap(o.kind)} change: ${o.why}.`),
    };
  }
  const c = rng.pick(CLAIMS);
  return {
    prompt: `A student says: “${c.claim}” Is the student right?`,
    parts: [part(mc(rng, c.answer, ['Yes, the student is right.', 'Yes: any change that takes in or gives out energy is a chemical change.', c.wrongNo]))],
    hints: ['The test for a chemical change is whether a new substance forms, not whether there are bubbles, light or energy changes.'],
    solution: [c.answer],
  };
}

// ---------------------------------------------------------------------------- physical and chemical properties

const PROPERTY_KINDS = ['Physical property', 'Chemical property'];
const SUBSTANCE_PROPERTIES: Array<{ name: string; physical: string[]; chemical: string[] }> = [
  { name: 'magnesium', physical: ['It is a silvery-grey metal.', 'It melts at 650 °C.', 'It conducts electricity.', 'It has a density of 1.74 g/cm³.'], chemical: ['It burns in air with a bright white flame.', 'It reacts with dilute hydrochloric acid, giving off hydrogen.'] },
  { name: 'iron', physical: ['It is attracted to a magnet.', 'It melts at 1538 °C.', 'It is a good conductor of heat.', 'It is grey and shiny when freshly cut.'], chemical: ['It rusts in damp air.', 'It reacts with sulfur when heated, forming iron sulfide.'] },
  { name: 'ethanol', physical: ['It is a colourless liquid.', 'It boils at 78 °C.', 'It mixes completely with water.', 'It has a density of 0.79 g/mL.'], chemical: ['It burns with a blue flame, forming carbon dioxide and water.', 'It is flammable.'] },
  { name: 'sodium', physical: ['It is soft enough to cut with a knife.', 'It melts at 98 °C.', 'It has a density of 0.97 g/cm³.', 'It is shiny when freshly cut.'], chemical: ['It reacts violently with water, giving off hydrogen.', 'It tarnishes quickly in air as it reacts with oxygen.'] },
  { name: 'copper', physical: ['It is reddish brown.', 'It can be drawn out into thin wires.', 'It conducts electricity very well.', 'It melts at 1085 °C.'], chemical: ['It slowly turns green in moist air over many years.', 'It does not react with dilute hydrochloric acid.'] },
  { name: 'hydrogen', physical: ['It is a colourless gas.', 'It is much less dense than air.', 'It boils at −253 °C.', 'It has no smell.'], chemical: ['It burns in air with a squeaky pop, forming water.', 'It is flammable.'] },
  { name: 'carbon dioxide', physical: ['It is a colourless gas.', 'It is denser than air.', 'It turns straight from a solid into a gas at −78 °C.', 'It dissolves a little in water.'], chemical: ['It turns limewater cloudy.', 'It does not burn, and most things cannot burn in it.'] },
  { name: 'gold', physical: ['It is yellow and shiny.', 'It can be hammered into very thin sheets.', 'It has a density of 19.3 g/cm³.', 'It melts at 1064 °C.'], chemical: ['It does not react with air or water, so it never tarnishes.', 'It does not react with most acids.'] },
  { name: 'methane', physical: ['It is a colourless gas.', 'It boils at −162 °C.', 'It is less dense than air.', 'It hardly dissolves in water.'], chemical: ['It burns in oxygen, forming carbon dioxide and water.', 'It is flammable.'] },
];
const PROPERTY_RULE = 'A physical property can be observed or measured without changing the substance into a new one (colour, density, melting point, hardness, conductivity). A chemical property describes how the substance reacts to form new substances (burning, rusting, reacting with acid or water), including whether it reacts at all.';

function properties(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(SUBSTANCE_PROPERTIES);
  if (d === 1) {
    const chem = rng.chance(0.5);
    const statement = rng.pick(chem ? s.chemical : s.physical);
    return {
      prompt: `Here is a fact about ${s.name}: “${statement}” Is it a physical property or a chemical property?`,
      parts: [part(fixedChoice(PROPERTY_KINDS, chem ? 1 : 0))],
      hints: [PROPERTY_RULE],
      solution: [chem ? `This describes how ${s.name} reacts (or does not react) to form new substances, so it is a chemical property.` : `This can be observed or measured without turning ${s.name} into a new substance, so it is a physical property.`],
    };
  }
  if (d === 2) {
    const askChem = rng.chance(0.6);
    const right = rng.pick(askChem ? s.chemical : s.physical);
    const wrong = askChem ? rng.sample(s.physical, 3) : s.chemical;
    return {
      prompt: `Which of these is a ${askChem ? 'chemical' : 'physical'} property of ${s.name}?`,
      parts: [part(mc(rng, right, wrong))],
      hints: [PROPERTY_RULE],
      solution: [`“${right}” ${askChem ? 'describes how it reacts to form new substances' : 'can be observed or measured without making a new substance'}, so it is a ${askChem ? 'chemical' : 'physical'} property.`, `The others are ${askChem ? 'physical' : 'chemical'} properties.`],
    };
  }
  const askChem = rng.chance(0.5);
  const pool = rng.sample(SUBSTANCE_PROPERTIES, 3).flatMap((x) => [...x.physical.map((p) => ({ md: `${cap(x.name)}: ${p[0].toLowerCase()}${p.slice(1)}`, chem: false })), ...x.chemical.map((p) => ({ md: `${cap(x.name)}: ${p[0].toLowerCase()}${p.slice(1)}`, chem: true }))]);
  const opts = mixedSample(rng, pool, 5, (o) => o.chem === askChem);
  return {
    prompt: `Select every ${askChem ? 'chemical' : 'physical'} property in the list.`,
    parts: [part(multi(rng, opts.map((o) => ({ md: o.md, correct: o.chem === askChem })), true))],
    hints: [PROPERTY_RULE, 'Not reacting is still a chemical property: it tells you how the substance behaves in reactions.'],
    solution: opts.map((o) => `${o.md} (${o.chem ? 'chemical' : 'physical'} property)`),
  };
}

// ---------------------------------------------------------------------------- density

const RHO = '$\\rho = \\dfrac{m}{V}$';
const WATER_RULE = 'Water has a density of $1.00\\ \\text{g/cm}^3$ (that is, $1.00\\ \\text{g/mL}$).';

const SOLIDS: Array<{ name: string; rho: number }> = [
  { name: 'magnesium', rho: 1.74 },
  { name: 'aluminium', rho: 2.7 },
  { name: 'titanium', rho: 4.51 },
  { name: 'zinc', rho: 7.14 },
  { name: 'iron', rho: 7.87 },
  { name: 'copper', rho: 8.96 },
  { name: 'silver', rho: 10.49 },
  { name: 'lead', rho: 11.34 },
  { name: 'gold', rho: 19.32 },
];
const LIQUIDS: Array<{ name: string; rho: number }> = [
  { name: 'hexane', rho: 0.66 },
  { name: 'ethanol', rho: 0.79 },
  { name: 'vegetable oil', rho: 0.92 },
  { name: 'water', rho: 1.0 },
  { name: 'glycerol', rho: 1.26 },
];
const OBJECTS = ['a small block', 'a pebble', 'a key', 'a metal bolt', 'a piece of rock', 'a toy figure'];

function density(rng: Rng, d: Difficulty): GenOutput {
  const name = rng.pick(NAMES);
  if (d === 1) {
    const liquid = rng.chance(0.35);
    const v = rng.float(liquid ? 20 : 2, liquid ? 100 : 60, 1);
    const target = liquid ? rng.float(0.6, 1.6, 2) : rng.float(0.5, 12, 2);
    const m = Math.max(0.5, Math.round(target * v * 10) / 10);
    const rho = m / v;
    const unit = liquid ? 'g/mL' : 'g/cm³';
    return {
      prompt: liquid
        ? `A sample of a liquid has a mass of ${q(f1(m), 'g')} and a volume of ${q(f1(v), 'mL')}. What is its density, to 2 decimal places?`
        : `${cap(rng.pick(OBJECTS))} has a mass of ${q(f1(m), 'g')} and a volume of ${cm3(f1(v))}. What is its density, to 2 decimal places?`,
      parts: [numPart(rho, { decimals: 2, suffix: unit, label: '$\\rho =$' })],
      calculator: true,
      hints: [`Density is mass per unit volume: ${RHO}.`],
      solution: [`$\\rho = \\dfrac{${f1(m)}\\ \\text{g}}{${f1(v)}\\ ${liquid ? '\\text{mL}' : '\\text{cm}^3'}} = ${f2(rho)}\\ ${liquid ? '\\text{g/mL}' : '\\text{g/cm}^3'}$`],
    };
  }
  if (d === 2) {
    const mat = rng.chance(0.6) ? rng.pick(SOLIDS) : rng.pick(LIQUIDS.filter((x) => x.name !== 'water'));
    const liquid = LIQUIDS.includes(mat);
    const vu = liquid ? '\\text{mL}' : '\\text{cm}^3';
    const du = liquid ? '\\text{g/mL}' : '\\text{g/cm}^3';
    if (rng.chance(0.5)) {
      const v = rng.float(liquid ? 10 : 2, liquid ? 250 : 50, 1);
      const m = mat.rho * v;
      return {
        prompt: `${cap(mat.name)} has a density of $${f2(mat.rho)}\\ ${du}$. What is the mass of $${f1(v)}\\ ${vu}$ of ${mat.name}, to 1 decimal place?`,
        parts: [numPart(m, { decimals: 1, suffix: 'g', label: '$m =$' })],
        calculator: true,
        hints: [`Start from ${RHO} and rearrange for the mass: $m = \\rho V$.`],
        solution: [`$m = \\rho V = ${f2(mat.rho)} \\times ${f1(v)} = ${f1(m)}\\ \\text{g}$`],
      };
    }
    const m = rng.float(5, 300, 1);
    const v = m / mat.rho;
    return {
      prompt: `${name} needs ${q(f1(m), 'g')} of ${mat.name}, which has a density of $${f2(mat.rho)}\\ ${du}$. What volume of ${mat.name} is that, to 1 decimal place?`,
      parts: [numPart(v, { decimals: 1, suffix: liquid ? 'mL' : 'cm³', label: '$V =$' })],
      calculator: true,
      hints: [`Start from ${RHO} and rearrange for the volume: $V = \\dfrac{m}{\\rho}$.`],
      solution: [`$V = \\dfrac{m}{\\rho} = \\dfrac{${f1(m)}}{${f2(mat.rho)}} = ${f1(v)}\\ ${vu}$`],
    };
  }
  const kind = rng.pick(['metal', 'float', 'liquid'] as const);
  if (kind === 'metal') {
    const list = rng.sample(SOLIDS, 5);
    const t = rng.pick(list);
    const v1 = rng.int(20, 60);
    const vol = rng.int(4, 25);
    const m = Math.round(t.rho * vol * 10) / 10;
    const rho = m / vol;
    const figure: TableFigure = { type: 'table', headers: ['Metal', 'Density (g/cm³)'], rows: [...list].sort((a, b) => a.rho - b.rho).map((x) => [cap(x.name), f2(x.rho)]) };
    return {
      prompt: `${name} finds the mass of a metal object: ${q(f1(m), 'g')}. A measuring cylinder holds ${q(v1, 'mL')} of water; when the object is lowered in, the water rises to ${q(v1 + vol, 'mL')}. Find the density of the metal, to 2 decimal places, and use the table to identify it. ($1\\ \\text{mL} = 1\\ \\text{cm}^3$.)`,
      figure,
      parts: [numPart(rho, { decimals: 2, suffix: 'g/cm³', label: '$\\rho =$' }), part(mc(rng, cap(t.name), list.filter((x) => x !== t).map((x) => cap(x.name))), { label: 'Metal:' })],
      calculator: true,
      hints: ['The rise in the water level is the volume of the object.', `Then ${RHO}, and look for the closest density in the table.`],
      solution: [`$V = ${v1 + vol} - ${v1} = ${vol}\\ \\text{mL} = ${vol}\\ \\text{cm}^3$`, `$\\rho = \\dfrac{${f1(m)}}{${vol}} = ${f2(rho)}\\ \\text{g/cm}^3$`, `The closest value in the table is ${t.name} (${f2(t.rho)} g/cm³), so the metal is ${t.name}.`],
    };
  }
  if (kind === 'float') {
    const dims = [rng.int(4, 16) / 2, rng.int(4, 16) / 2, rng.int(2, 12) / 2];
    const v = dims[0] * dims[1] * dims[2];
    let rho = 0;
    let m = 0;
    for (let i = 0; i < 50; i++) {
      const target = rng.chance(0.5) ? rng.float(0.2, 0.9, 2) : rng.float(1.1, 3, 2);
      m = Math.round(target * v * 10) / 10;
      rho = m / v;
      if (Math.abs(rho - 1) >= 0.05 && m > 0) break;
    }
    const floats = rho < 1;
    const what = rng.pick(['a block of wood', 'a block of plastic', 'a block of wax', 'a block of stone', 'a block of rubber', 'a block of foam']);
    return {
      prompt: `${cap(what)} measures ${q(f1(dims[0]), 'cm')} by ${q(f1(dims[1]), 'cm')} by ${q(f1(dims[2]), 'cm')} and has a mass of ${q(f1(m), 'g')}. Find its density, to 2 decimal places, and say whether it floats or sinks in water. ${WATER_RULE}`,
      parts: [numPart(rho, { decimals: 2, suffix: 'g/cm³', label: '$\\rho =$' }), part(fixedChoice(['It floats.', 'It sinks.'], floats ? 0 : 1), { label: 'In water:' })],
      calculator: true,
      hints: ['Volume of a rectangular block = length × width × height.', `Then ${RHO}. An object less dense than water floats; one denser than water sinks.`],
      solution: [`$V = ${f1(dims[0])} \\times ${f1(dims[1])} \\times ${f1(dims[2])} = ${fmt(v, 3)}\\ \\text{cm}^3$`, `$\\rho = \\dfrac{${f1(m)}}{${fmt(v, 3)}} = ${f2(rho)}\\ \\text{g/cm}^3$`, `${f2(rho)} is ${floats ? 'less' : 'more'} than 1.00, so it ${floats ? 'floats' : 'sinks'}.`],
    };
  }
  const t = rng.pick(LIQUIDS);
  const cyl = rng.float(60, 150, 1);
  const vol = rng.int(20, 80);
  const m = Math.round(t.rho * vol * 10) / 10;
  const rho = m / vol;
  const figure: TableFigure = { type: 'table', headers: ['Liquid', 'Density (g/mL)'], rows: LIQUIDS.map((x) => [cap(x.name), f2(x.rho)]) };
  return {
    prompt: `An empty measuring cylinder has a mass of ${q(f1(cyl), 'g')}. ${name} pours in ${q(vol, 'mL')} of a colourless or pale liquid, and the cylinder and liquid then have a mass of ${q(f1(cyl + m), 'g')}. Find the density of the liquid, to 2 decimal places, and use the table to identify it.`,
    figure,
    parts: [numPart(rho, { decimals: 2, suffix: 'g/mL', label: '$\\rho =$' }), part(mc(rng, cap(t.name), LIQUIDS.filter((x) => x !== t).map((x) => cap(x.name))), { label: 'Liquid:' })],
    calculator: true,
    hints: ['Mass of the liquid = mass of the cylinder with liquid − mass of the empty cylinder.', `Then ${RHO}, and look for the closest density in the table.`],
    solution: [`$m = ${f1(cyl + m)} - ${f1(cyl)} = ${f1(m)}\\ \\text{g}$`, `$\\rho = \\dfrac{${f1(m)}}{${vol}} = ${f2(rho)}\\ \\text{g/mL}$`, `The closest value in the table is ${t.name} (${f2(t.rho)} g/mL), so the liquid is ${t.name}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.5: hazard pictograms

type Picto = 'flame' | 'oxidizer' | 'explosive' | 'corrosive' | 'toxic' | 'harmful' | 'health' | 'gas' | 'environment';
const PICTOS: Picto[] = ['flame', 'oxidizer', 'explosive', 'corrosive', 'toxic', 'harmful', 'health', 'gas', 'environment'];
const PICTURE: Record<Picto, string> = {
  flame: 'a flame',
  oxidizer: 'a flame above a circle',
  explosive: 'a bomb bursting apart',
  corrosive: 'liquid dripping from two test tubes onto a hand and onto a metal bar, both being eaten away',
  toxic: 'a skull and crossbones',
  harmful: 'an exclamation mark (!)',
  health: 'the outline of a person’s head and chest with a star-shaped burst on the chest',
  gas: 'a gas cylinder',
  environment: 'a dead tree and a dead fish',
};
const MEANING: Record<Picto, string> = {
  flame: 'Flammable: it catches fire easily.',
  oxidizer: 'Oxidizer: it gives off oxygen and can make other materials burn fiercely.',
  explosive: 'Explosive: it can explode if it is heated, struck or rubbed.',
  corrosive: 'Corrosive: it can burn skin, damage eyes and eat away metals.',
  toxic: 'Acutely toxic: a small amount can poison or kill if it is swallowed, breathed in or gets on the skin.',
  harmful: 'Harmful or irritant: it can irritate the skin, eyes or airways, or harm you in larger amounts.',
  health: 'Serious long-term health hazard: it may cause cancer, damage organs or cause breathing problems.',
  gas: 'Gas under pressure: the container may burst if it is heated.',
  environment: 'Hazardous to the environment: it is poisonous to fish and other water life.',
};
const PRECAUTION: Record<Picto, string> = {
  flame: 'Keep it away from flames, sparks and hot surfaces, because it catches fire easily.',
  oxidizer: 'Store it away from paper, fuels and anything else that burns, because it makes fires burn fiercely.',
  explosive: 'Never heat, grind or strike it, because it can explode.',
  corrosive: 'Wear goggles and gloves, and wash off any splash at once, because it burns skin and eyes.',
  toxic: 'Avoid all contact and never let it near your mouth, because a small amount can poison you.',
  harmful: 'Keep it off your skin and out of your eyes, because it is an irritant.',
  health: 'Do not breathe in its dust or vapour, because it can damage your health over time.',
  gas: 'Keep the cylinder upright, secured and away from heat, because it holds gas under pressure.',
  environment: 'Never pour it down the sink, because it is poisonous to water life.',
};
/** Pictograms whose precautions overlap (fire, or contact with the body) are not offered against each other. */
const PICTO_GROUP: Record<Picto, number> = { flame: 1, oxidizer: 1, explosive: 1, corrosive: 2, toxic: 2, harmful: 2, health: 2, gas: 3, environment: 4 };
const HAZARD_STORIES: Record<Picto, string[]> = {
  flame: ['A solvent gives off a vapour that catches fire easily.', 'A liquid fuel ignites if a spark comes near it.'],
  oxidizer: ['A white solid gives off oxygen when heated and makes paper near it burn fiercely.', 'A concentrated solution makes other materials burst into flame and burn much more strongly.'],
  explosive: ['A powder can explode if it is struck with a hammer or heated.', 'A substance can blow apart violently when it is rubbed or dropped.'],
  corrosive: ['A concentrated acid can cause severe burns to skin and eyes and eats through metal.', 'A concentrated solution of sodium hydroxide can burn skin and blind if it splashes in the eyes.'],
  toxic: ['Swallowing even a few drops of a liquid could kill.', 'A tiny amount of a powder, if breathed in, is enough to cause serious poisoning.'],
  harmful: ['A dilute solution may irritate the skin and eyes.', 'A powder can make the eyes and throat sore if it gets into them.'],
  health: ['Breathing in a dust over many years can cause lung disease.', 'A liquid may cause cancer after repeated exposure.'],
  gas: ['Oxygen is stored at high pressure in a steel cylinder that could burst if heated.', 'A cylinder holds compressed nitrogen gas.'],
  environment: ['A copper compound is poisonous to fish and other water life.', 'A solution, if poured down the drain, would kill plants and animals in rivers.'],
};

const HAZARD_NAME: Record<Picto, string> = {
  flame: 'flammable (it catches fire easily)',
  oxidizer: 'an oxidizer (it makes other materials burn fiercely)',
  explosive: 'explosive',
  corrosive: 'corrosive (it burns skin and eats away metals)',
  toxic: 'acutely toxic (a small amount can poison or kill)',
  harmful: 'harmful or an irritant',
  health: 'a serious long-term health hazard',
  gas: 'a gas stored under pressure',
  environment: 'hazardous to the environment (poisonous to water life)',
};
/** Pairs a real label would not show together: the exclamation mark is not used with the skull or the corrosion pictogram. */
const okPair = (a: Picto, b: Picto) => !(a === 'harmful' && (b === 'toxic' || b === 'corrosive')) && !(b === 'harmful' && (a === 'toxic' || a === 'corrosive'));
const PICTO_NAME: Record<Picto, string> = {
  flame: 'flame',
  oxidizer: 'flame over circle',
  explosive: 'exploding bomb',
  corrosive: 'corrosion',
  toxic: 'skull and crossbones',
  harmful: 'exclamation mark',
  health: 'health hazard',
  gas: 'gas cylinder',
  environment: 'environment',
};
const pictoText = (p: Picto) => `A red-bordered diamond showing ${PICTURE[p]}`;
/** "The corrosion pictogram (…) means the substance is corrosive (…)." */
const explain = (p: Picto) => `The ${PICTO_NAME[p]} pictogram${PICTURE[p] === `a ${PICTO_NAME[p]}` ? '' : ` (${PICTURE[p]})`} means the substance is ${HAZARD_NAME[p]}.`;
const LABELS = { pictogram: 'A chemical label shows a hazard pictogram: a red-bordered diamond containing' };

function hazardSymbols(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PICTOS);
  const others = PICTOS.filter((x) => x !== p);
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `${LABELS.pictogram} ${PICTURE[p]}. What does it warn you about?`,
        parts: [part(mc(rng, MEANING[p], rng.sample(others, 3).map((x) => MEANING[x])))],
        hints: ['Each pictogram shows its hazard as simply as it can: fire, an explosion, damage to skin, poison, harm to water life.'],
        solution: [explain(p)],
      };
    }
    return {
      prompt: `Which hazard pictogram warns that a substance is ${HAZARD_NAME[p]}?`,
      parts: [part(mc(rng, pictoText(p), rng.sample(others, 3).map(pictoText)))],
      hints: ['Picture what the hazard does, then find the symbol that shows it.'],
      solution: [explain(p)],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const pool = others.filter((x) => PICTO_GROUP[x] !== PICTO_GROUP[p]);
      return {
        prompt: `${LABELS.pictogram} ${PICTURE[p]}. Which precaution is this pictogram telling you to take?`,
        parts: [part(mc(rng, PRECAUTION[p], rng.sample(pool, 3).map((x) => PRECAUTION[x])))],
        hints: ['First work out what hazard the pictogram shows; then pick the precaution that protects against that hazard.'],
        solution: [explain(p), `So: ${PRECAUTION[p][0].toLowerCase()}${PRECAUTION[p].slice(1)}`],
      };
    }
    return {
      prompt: `${rng.pick(HAZARD_STORIES[p])} Which pictogram should its label show?`,
      parts: [part(mc(rng, pictoText(p), rng.sample(others, 3).map(pictoText)))],
      hints: ['Name the hazard first (fire, explosion, burns, poison, long-term harm, pressure, harm to water life), then match it to its pictogram.'],
      solution: [explain(p)],
    };
  }
  let pair = rng.sample(PICTOS, 2);
  while (!okPair(pair[0], pair[1])) pair = rng.sample(PICTOS, 2);
  if (rng.chance(0.5)) {
    const opts = rng.shuffle([...pair, ...rng.sample(PICTOS.filter((x) => !pair.includes(x)), 3)]);
    return {
      prompt: `A bottle’s label shows two hazard pictograms: one with ${PICTURE[pair[0]]}, and one with ${PICTURE[pair[1]]}. Select every hazard the substance has.`,
      parts: [part(multi(rng, opts.map((x) => ({ md: MEANING[x], correct: pair.includes(x) })), true))],
      hints: ['Decode each pictogram separately; a label shows one pictogram for each kind of hazard.'],
      solution: pair.map(explain),
    };
  }
  const stories = pair.map((x) => rng.pick(HAZARD_STORIES[x]).replace(/\.$/, ''));
  const opts = rng.shuffle([...pair, ...rng.sample(PICTOS.filter((x) => !pair.includes(x)), 3)]);
  return {
    prompt: `A safety data sheet describes a substance with two hazards: “${stories[0]}”, and “${stories[1]}”. Select every pictogram its label should show.`,
    parts: [part(multi(rng, opts.map((x) => ({ md: pictoText(x), correct: pair.includes(x) })), true))],
    hints: ['Name each hazard, then match each one to its pictogram.'],
    solution: pair.map(explain),
  };
}

// ---------------------------------------------------------------------------- lab safety

const SAFETY_BASIC: Array<{ ask: string; answer: string; wrong: string[]; why: string }> = [
  { ask: 'What should you wear to protect your eyes whenever chemicals are being heated or mixed?', answer: 'Safety goggles', wrong: ['Sunglasses', 'Nothing, as long as you are careful', 'Ordinary reading glasses'], why: 'Safety goggles fit closely around the eyes and stop splashes from the side; ordinary glasses do not.' },
  { ask: 'A student with long hair is about to light a Bunsen burner. What should she do first?', answer: 'Tie her hair back.', wrong: ['Lean in close to watch the flame light.', 'Leave her hair loose so that it covers her face.', 'Spray her hair with water.'], why: 'Loose hair can swing into the flame and catch fire.' },
  { ask: 'How should you smell a liquid in the laboratory, if your teacher tells you to?', answer: 'Hold it away from your face and gently waft the vapour towards your nose with your hand.', wrong: ['Put your nose over the beaker and breathe in deeply.', 'Taste a tiny drop instead.', 'Pour a little on your hand and sniff it.'], why: 'Wafting lets you detect a smell with only a tiny amount of vapour.' },
  { ask: 'A white powder in an unlabelled dish looks exactly like table sugar. What should you do?', answer: 'Never taste it; tell the teacher about the unlabelled dish.', wrong: ['Taste a few grains to check.', 'Taste it only if your hands are clean.', 'Add it to your drink, since it is probably sugar.'], why: 'Many dangerous chemicals look like harmless ones. Nothing in a laboratory is ever tasted.' },
  { ask: 'You knock over a small beaker of dilute acid on the bench. What should you do?', answer: 'Tell the teacher straight away, and follow their instructions to clean it up.', wrong: ['Wipe it up quickly with your sleeve.', 'Leave it for the next class to deal with.', 'Cover it with paper and carry on working.'], why: 'The teacher knows how to clean up each chemical safely, and must know about every spill.' },
  { ask: 'Where may you eat or drink during a chemistry lesson?', answer: 'Only outside the laboratory, never inside it.', wrong: ['At your bench, if you keep the food in its packet.', 'Anywhere, if you wash your hands first.', 'At the back of the laboratory, away from the chemicals.'], why: 'Food and drink in a laboratory can pick up traces of chemicals and carry them into your mouth.' },
  { ask: 'A glass beaker breaks on the floor. What should you do?', answer: 'Tell the teacher, and dispose of the pieces in the special container for broken glass.', wrong: ['Pick up the pieces with your bare hands and put them in the paper bin.', 'Push the pieces under the bench with your foot.', 'Leave them where they are.'], why: 'Broken glass can cut people, including those who empty the paper bin.' },
  { ask: 'What should you do before you start a practical?', answer: 'Follow the instructions and find out the hazards of the chemicals you will use.', wrong: ['Start straight away to save time, and read the instructions later.', 'Mix a little of each chemical to see what happens.', 'Smell each chemical to work out what it is.'], why: 'Knowing the hazards first tells you which precautions to take before anything can go wrong.' },
  { ask: 'Why should bags and stools be kept out of the walkways in a laboratory?', answer: 'So that nobody trips while carrying chemicals or hot equipment.', wrong: ['So that the bags do not get dirty.', 'So that the teacher can count them.', 'There is no reason; walkways can be used for storage.'], why: 'A trip while carrying acid or hot glassware can injure several people at once.' },
  { ask: 'What should you do at the end of every practical, after tidying up?', answer: 'Wash your hands.', wrong: ['Rub your eyes to clear them.', 'Taste your fingers to check they are clean.', 'Nothing, if you wore gloves.'], why: 'Washing removes any traces of chemicals before you eat or touch your face.' },
];

const SAFETY_APPLY: Array<{ ask: string; answer: string; wrong: string[]; why: string }> = [
  { ask: 'When you heat a liquid in a test tube, which way should the open end point?', answer: 'Away from yourself and everyone else, because the liquid can suddenly spurt out.', wrong: ['Towards yourself, so that you can see inside.', 'Towards your partner, who is watching the reaction.', 'Straight at the window, so that steam escapes outside.'], why: 'A liquid heated in a narrow tube can boil suddenly and shoot out of the open end.' },
  { ask: 'A concentrated acid has to be diluted with water. How should it be done?', answer: 'Add the acid slowly to the water while stirring, because a lot of heat is given out.', wrong: ['Pour the water quickly into the acid.', 'Pour the acid and the water into a beaker at the same moment.', 'Add the water to the acid in a sealed bottle and shake it.'], why: 'Mixing a concentrated acid with water gives out a lot of heat. Adding a little acid at a time to plenty of water lets the water absorb the heat, so the mixture cannot boil and spit acid.' },
  { ask: 'A reaction gives off a poisonous gas. Where should it be carried out?', answer: 'In a fume cupboard, which draws the gas away from the room.', wrong: ['On the open bench next to a window.', 'In a sealed flask on the bench, so that the gas cannot escape.', 'In a quiet corner at the back of the laboratory.'], why: 'A fume cupboard pulls gases away from people. Sealing a flask that makes gas could make it burst.' },
  { ask: 'Some leftover chemical solutions need to be got rid of after a practical. What should you do?', answer: 'Follow the teacher’s instructions and use the waste containers provided.', wrong: ['Pour them all down the sink.', 'Pour them back into the stock bottles so they are not wasted.', 'Tip them into the paper bin.'], why: 'Some chemicals harm water life or react with each other. Putting them back would contaminate the stock bottle.' },
  { ask: 'A chemical splashes into a student’s eye. What should be done first?', answer: 'Rinse the eye with plenty of clean running water at the eyewash station for several minutes, and tell the teacher.', wrong: ['Rub the eye to remove the chemical.', 'Wait to see whether it starts to hurt.', 'Cover the eye with a tissue and carry on.'], why: 'Running water washes the chemical out and dilutes it before it can do more damage.' },
  { ask: 'A Bunsen burner is lit but will not be needed for a few minutes. What is the safest thing to do?', answer: 'Close the air hole to give the visible yellow safety flame, or turn the burner off.', wrong: ['Leave the hot blue flame burning, since it is hard to see.', 'Walk away and leave it burning.', 'Cover the top of the burner with a book.'], why: 'The blue flame is hard to see, so someone could reach into it. The yellow flame is easy to see.' },
  { ask: 'Ethanol, a flammable liquid, is needed for an experiment. What precaution matters most?', answer: 'Turn off all Bunsen burners nearby and keep the ethanol away from flames.', wrong: ['Heat the ethanol directly over a Bunsen flame to warm it up.', 'Keep the ethanol bottle next to a lit burner so that it is handy.', 'Pour it into an open beaker and leave it in the sun.'], why: 'Ethanol vapour catches fire very easily, so there must be no flames nearby.' },
  { ask: 'A solid has to be heated in a test tube over a Bunsen burner. How should the test tube be held?', answer: 'In a test-tube holder, tilted, with the open end pointing away from everyone.', wrong: ['In your fingers, since the top of the tube stays cool.', 'Upright, with the open end pointing at your face so that you can watch.', 'With a stopper pushed in tightly, so that nothing escapes.'], why: 'The tube gets too hot to hold, the contents can spit out of the open end, and a stoppered tube can burst as the gas inside expands.' },
  { ask: 'A hot beaker has just been taken off a tripod. Where should it be put down?', answer: 'On a heat-proof mat, and left to cool before it is touched.', wrong: ['Straight into a sink of cold water.', 'On the edge of the bench, where it is easy to reach.', 'On a sheet of paper.'], why: 'Hot glass looks the same as cold glass, and putting it into cold water can crack it.' },
];

const ACTIONS: Array<{ md: string; safe: boolean }> = [
  { md: 'Wears safety goggles for the whole practical.', safe: true },
  { md: 'Ties back long hair before lighting the Bunsen burner.', safe: true },
  { md: 'Points the test tube away from people while heating it.', safe: true },
  { md: 'Holds the test tube in a test-tube holder while heating it.', safe: true },
  { md: 'Uses a fume cupboard for a reaction that gives off a harmful gas.', safe: true },
  { md: 'Adds concentrated acid slowly to water while stirring.', safe: true },
  { md: 'Wafts a smell gently towards their nose.', safe: true },
  { md: 'Tells the teacher at once about a broken thermometer.', safe: true },
  { md: 'Puts leftover solutions into the waste container provided.', safe: true },
  { md: 'Washes their hands at the end of the practical.', safe: true },
  { md: 'Keeps bags and stools out of the walkways.', safe: true },
  { md: 'Puts a hot beaker down on a heat-proof mat.', safe: true },
  { md: 'Eats a snack at the bench during the practical.', safe: false },
  { md: 'Tastes a white solid to check whether it is salt.', safe: false },
  { md: 'Pours water into concentrated acid.', safe: false },
  { md: 'Looks down into the test tube while heating it.', safe: false },
  { md: 'Leaves a lit Bunsen burner unattended.', safe: false },
  { md: 'Pours a leftover solution back into the stock bottle.', safe: false },
  { md: 'Pours unused chemicals down the sink without asking.', safe: false },
  { md: 'Pushes their goggles up onto their forehead to see better.', safe: false },
  { md: 'Heats a test tube with a stopper pushed tightly into it.', safe: false },
  { md: 'Keeps a bottle of ethanol next to a lit Bunsen burner.', safe: false },
  { md: 'Breathes in deeply over a test tube to smell a gas.', safe: false },
  { md: 'Wipes up spilled acid with bare hands.', safe: false },
];

function labSafety(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    const s = rng.pick(d === 1 ? SAFETY_BASIC : SAFETY_APPLY);
    return {
      prompt: s.ask,
      parts: [part(mc(rng, s.answer, s.wrong))],
      hints: d === 1 ? ['Choose the action that protects you and the people around you.'] : ['Think about what could go wrong: a spurting liquid, heat, a gas, a fire. Choose the action that prevents it.'],
      solution: [s.why, `So: ${s.answer[0].toLowerCase()}${s.answer.slice(1)}`],
    };
  }
  const wantSafe = rng.chance(0.4);
  const opts = mixedSample(rng, ACTIONS, 5, (a) => a.safe === wantSafe);
  const name = rng.pick(NAMES);
  return {
    prompt: `During a practical, ${name} does each of the things listed. Select every action that is ${wantSafe ? 'safe' : 'unsafe'}.`,
    parts: [part(multi(rng, opts.map((a) => ({ md: a.md, correct: a.safe === wantSafe })), true))],
    hints: ['For each action, ask what could go wrong: a burn, a splash, a fire, poisoning, or someone tripping.', 'Never taste, never add water to concentrated acid, never heat a sealed container, and never leave a flame unattended.'],
    solution: opts.map((a) => `${a.safe ? 'Safe' : 'Unsafe'}: ${a.md}`),
  };
}

// ---------------------------------------------------------------------------- skills

export const MATTER_SKILLS: SkillDef[] = [
  skill({ id: 'c10-states', name: 'States of matter', description: 'Identify solids, liquids and gases from how their particles are arranged and move, and explain their properties with the particle model.', outcomes: ['10-A1'], lessonId: L(1), format: 'mc', gen: states }),
  skill({ id: 'c10-state-changes', name: 'Changes of state', description: 'Name each change of state, say whether energy is taken in or given out, and use melting and boiling points to give a substance’s state.', outcomes: ['10-A1'], lessonId: L(1), format: 'mc', gen: stateChanges }),
  skill({ id: 'c10-classify-matter', name: 'Elements, compounds and mixtures', description: 'Classify matter as an element, a compound or a mixture, and mixtures as homogeneous or heterogeneous.', outcomes: ['10-A1'], lessonId: L(2), format: 'mc', gen: classifyMatter }),
  skill({ id: 'c10-solutions', name: 'Solutes, solvents and solutions', description: 'Name the solute, solvent and solution, and use mass of solution = mass of solute + mass of solvent.', outcomes: ['10-A1'], lessonId: L(2), gen: solutions }),
  skill({ id: 'c10-separation', name: 'Separating mixtures', description: 'Choose a method to separate a mixture from the properties of its parts, and plan a separation in steps.', outcomes: ['10-A2'], lessonId: L(3), format: 'mc', gen: separation }),
  skill({ id: 'c10-chromatography', name: 'Paper chromatography and Rf values', description: 'Calculate Rf values, use them to find distances, and identify substances by matching Rf values.', outcomes: ['10-A2'], lessonId: L(3), calculator: true, gen: chromatography }),
  skill({ id: 'c10-change-type', name: 'Physical and chemical changes', description: 'Classify a change as physical or chemical from its evidence.', outcomes: ['10-A2'], lessonId: L(4), format: 'mc', gen: changeType }),
  skill({ id: 'c10-properties', name: 'Physical and chemical properties', description: 'Sort the properties of a substance into physical and chemical properties.', outcomes: ['10-A2'], lessonId: L(4), format: 'mc', gen: properties }),
  skill({ id: 'c10-density', name: 'Density', description: 'Use ρ = m/V to find a density, mass or volume, predict floating and sinking, and identify a substance by its density.', outcomes: ['10-A2'], lessonId: L(4), calculator: true, gen: density }),
  skill({ id: 'c10-hazard-symbols', name: 'Hazard pictograms', description: 'Match the hazard pictograms on chemical labels to their meanings and precautions.', outcomes: ['10-A2'], lessonId: L(5), format: 'mc', gen: hazardSymbols }),
  skill({ id: 'c10-lab-safety', name: 'Working safely in the laboratory', description: 'Choose safe ways to heat, mix, smell, clean up and dispose of chemicals in a laboratory.', outcomes: ['10-A2'], lessonId: L(5), format: 'mc', gen: labSafety }),
];
