/** More Mathematics Topics, Unit 9: direct and inverse proportion, density and pressure. */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

type Out = GenOutput;

const isExact = (v: number, places = 3) => Math.abs(roundTo(v, places) - v) < 1e-9;
/** An exact answer, or one to 2 decimal places. */
const answer = (v: number, opts: { label?: string; suffix?: string } = {}): Part => (isExact(v) ? numPart(roundTo(v, 3), { ...opts, exact: false }) : numPart(v, { ...opts, decimals: 2 }));
const shown = (v: number) => (isExact(v) ? fmt(v) : `${fmt(v, 4)}\\ldots`);
const G = (x: number) => fmtGroupTex(x, 4);

// ---------------------------------------------------------------------------
// 9.1 Direct and inverse proportion
// ---------------------------------------------------------------------------

type Power = 1 | 2 | 3 | 0.5;

interface PropCtx {
  power: Power;
  inverse: boolean;
  /** "The extension $e$ cm of a spring is directly proportional to the mass $m$ kg hung on it." */
  text: string;
  y: string;
  x: string;
  yUnit: string;
  xUnit: string;
}

const CONTEXTS: PropCtx[] = [
  { power: 1, inverse: false, text: 'The extension $e$ cm of a spring is directly proportional to the mass $m$ kg hung on it.', y: 'e', x: 'm', yUnit: 'cm', xUnit: 'kg' },
  { power: 1, inverse: false, text: 'The volume $V$ litres of water in a tank is directly proportional to the time $t$ minutes it has been filling.', y: 'V', x: 't', yUnit: 'litres', xUnit: 'minutes' },
  { power: 2, inverse: false, text: 'The distance $d$ metres a stone falls is directly proportional to the square of the time $t$ seconds since it was dropped.', y: 'd', x: 't', yUnit: 'm', xUnit: 's' },
  { power: 2, inverse: false, text: 'The stopping distance $s$ metres of a cart is directly proportional to the square of its speed $v$ m/s.', y: 's', x: 'v', yUnit: 'm', xUnit: 'm/s' },
  { power: 3, inverse: false, text: 'The mass $M$ grams of a solid ball is directly proportional to the cube of its radius $r$ cm.', y: 'M', x: 'r', yUnit: 'g', xUnit: 'cm' },
  { power: 0.5, inverse: false, text: 'The time $T$ seconds a pendulum takes to swing is directly proportional to the square root of its length $l$ cm.', y: 'T', x: 'l', yUnit: 's', xUnit: 'cm' },
  { power: 1, inverse: true, text: 'The time $t$ hours it takes to paint a hall is inversely proportional to the number of painters $n$.', y: 't', x: 'n', yUnit: 'hours', xUnit: 'painters' },
  { power: 1, inverse: true, text: 'The time $t$ hours a journey takes is inversely proportional to the average speed $v$ km/h.', y: 't', x: 'v', yUnit: 'hours', xUnit: 'km/h' },
  { power: 2, inverse: true, text: 'The brightness $B$ of a lamp, in lux, is inversely proportional to the square of the distance $d$ metres from it.', y: 'B', x: 'd', yUnit: 'lux', xUnit: 'm' },
  { power: 2, inverse: true, text: 'The force $F$ newtons between two magnets is inversely proportional to the square of the distance $d$ cm between them.', y: 'F', x: 'd', yUnit: 'N', xUnit: 'cm' },
];

const powTex = (x: string, p: Power) => (p === 1 ? x : p === 0.5 ? `\\sqrt{${x}}` : `${x}^{${p}}`);
const powVal = (x: number, p: Power) => (p === 0.5 ? Math.sqrt(x) : x ** p);
const xValues = (rng: Rng, p: Power, n: number) => {
  const pool = p === 0.5 ? [4, 9, 16, 25, 36, 49, 64, 81, 100, 144] : p === 3 ? [1, 2, 3, 4, 5, 6] : p === 2 ? [2, 3, 4, 5, 6, 8, 10] : [2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
  return rng.shuffle([...pool]).slice(0, n);
};

function proportion(rng: Rng, d: Difficulty, inverse: boolean): Out {
  const pool = CONTEXTS.filter((c) => c.inverse === inverse && (d === 1 ? c.power === 1 : inverse ? true : c.power !== 1));
  const c = rng.pick(pool);
  const p = c.power;
  const k = inverse ? rng.pick(p === 2 ? [36, 72, 144, 200, 400] : [24, 36, 48, 60, 120]) : rng.pick(p === 3 ? [2, 4, 0.5] : p === 0.5 ? [0.2, 0.25, 0.5] : p === 2 ? [0.5, 1.5, 2, 4, 5] : [1.5, 2, 3, 4, 5, 2.5]);
  const [x1, x2] = xValues(rng, p, 2) as [number, number];
  const f = (x: number) => (inverse ? k / powVal(x, p) : k * powVal(x, p));
  const y1 = f(x1);
  const y2 = f(x2);
  const law = inverse ? `${c.y} = \\frac{k}{${powTex(c.x, p)}}` : `${c.y} = k${powTex(c.x, p)}`;
  const kStep = inverse
    ? `$${shown(y1)} = \\frac{k}{${powTex(String(x1), p)}}$, so $k = ${shown(y1)} \\times ${fmt(powVal(x1, p))} = ${fmt(k)}$.`
    : `$${shown(y1)} = k \\times ${powTex(String(x1), p)} = ${fmt(powVal(x1, p))}k$, so $k = ${shown(y1)} \\div ${fmt(powVal(x1, p))} = ${fmt(k)}$.`;
  const given = `When $${c.x} = ${fmt(x1)}$, $${c.y} = ${G(roundTo(y1, 4))}$.`;
  // A hard question works backwards: find x from y.
  if (d === 3) {
    const xx = x2;
    const yy = y2;
    const back = inverse
      ? [`$${shown(yy)} = \\frac{${fmt(k)}}{${powTex(c.x, p)}}$, so $${powTex(c.x, p)} = ${fmt(k)} \\div ${shown(yy)} = ${fmt(powVal(xx, p))}$.`]
      : [`$${shown(yy)} = ${fmt(k)}${powTex(c.x, p)}$, so $${powTex(c.x, p)} = ${shown(yy)} \\div ${fmt(k)} = ${fmt(powVal(xx, p))}$.`];
    return {
      prompt: `${c.text} ${given} Find $${c.x}$ when $${c.y} = ${G(roundTo(yy, 4))}$.`,
      parts: [answer(xx, { label: `$${c.x}$ =`, suffix: c.xUnit === 'painters' ? undefined : c.xUnit })],
      hints: [`Write the rule as $${law}$ and use the values you are given to find $k$.`, `Then put $${c.y} = ${G(roundTo(yy, 4))}$ into the rule and solve for $${c.x}$${p === 2 ? ' (take the positive square root)' : p === 0.5 ? ' (square both sides)' : p === 3 ? ' (take the cube root)' : ''}.`],
      solution: [`$${law}$`, kStep, `So $${law.replace('k', fmt(k))}$.`, ...back, `$${c.x} = ${fmt(xx)}$`],
      calculator: true,
    };
  }
  return {
    prompt: `${c.text} ${given} ${d === 1 ? `Find the constant $k$ in $${law}$, and` : 'Find'} $${c.y}$ when $${c.x} = ${fmt(x2)}$.`,
    parts: [...(d === 1 ? [answer(k, { label: '$k$ =' })] : []), answer(y2, { label: `$${c.y}$ =`, suffix: c.yUnit })],
    hints: [`${inverse ? 'Inversely' : 'Directly'} proportional to ${p === 1 ? `$${c.x}$` : p === 0.5 ? `the square root of $${c.x}$` : `the ${p === 2 ? 'square' : 'cube'} of $${c.x}$`} means $${law}$ for some constant $k$.`, `Substitute the pair of values you are given to find $k$, then use the rule with $${c.x} = ${fmt(x2)}$.`],
    solution: [`$${law}$`, kStep, `When $${c.x} = ${fmt(x2)}$: $${c.y} = ${inverse ? `\\frac{${fmt(k)}}{${powTex(String(x2), p)}}` : `${fmt(k)} \\times ${powTex(String(x2), p)}`} ${isExact(y2) ? '=' : '\\approx'} ${isExact(y2) ? G(roundTo(y2, 3)) : fmt(y2, 2)}$${c.yUnit === 'painters' ? '' : ` ${c.yUnit}`}`],
    calculator: d > 1,
  };
}

// ---------------------------------------------------------------------------
// 9.2 Density and pressure
// ---------------------------------------------------------------------------

const MATERIALS = ['metal', 'stone', 'wood', 'plastic', 'glass', 'alloy'];

function density(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // An alloy of two metals: total mass ÷ total volume.
    const d1 = roundTo(rng.int(70, 110) / 10, 1);
    const d2 = roundTo(rng.int(20, 60) / 10, 1);
    const v1 = rng.int(20, 80);
    const v2 = rng.int(20, 80);
    const m1 = roundTo(d1 * v1, 2);
    const m2 = roundTo(d2 * v2, 2);
    const rho = (m1 + m2) / (v1 + v2);
    return {
      prompt: `An alloy is made by melting together $${fmt(m1)}$ g of metal A, with a density of $${fmt(d1)}$ g/cm³, and $${fmt(m2)}$ g of metal B, with a density of $${fmt(d2)}$ g/cm³. Find the density of the alloy, to 2 decimal places. (Assume the volumes add.)`,
      parts: [numPart(rho, { decimals: 2, suffix: 'g/cm³' })],
      hints: ['Density $= \\dfrac{\\text{mass}}{\\text{volume}}$, so volume $= \\dfrac{\\text{mass}}{\\text{density}}$.', 'Find the volume of each metal, then divide the total mass by the total volume. Do not average the two densities.'],
      solution: [
        `Volume of A $= ${fmt(m1)} \\div ${fmt(d1)} = ${v1}$ cm³, and volume of B $= ${fmt(m2)} \\div ${fmt(d2)} = ${v2}$ cm³.`,
        `Total mass $= ${fmt(m1)} + ${fmt(m2)} = ${fmt(m1 + m2)}$ g, and total volume $= ${v1 + v2}$ cm³.`,
        `Density $= ${fmt(m1 + m2)} \\div ${v1 + v2} = ${fmt(rho, 4)}\\ldots \\approx ${fmt(rho, 2)}$ g/cm³`,
      ],
      calculator: true,
    };
  }
  const mat = rng.pick(MATERIALS);
  const rho = roundTo(rng.int(5, 120) / 10, 1);
  if (d === 1) {
    const v = rng.int(10, 250);
    const m = roundTo(rho * v, 2);
    return {
      prompt: `A piece of ${mat} has a mass of $${fmt(m)}$ g and a volume of $${v}$ cm³. Find its density.`,
      parts: [numPart(rho, { suffix: 'g/cm³', exact: false })],
      hints: ['Density $= \\dfrac{\\text{mass}}{\\text{volume}}$.', 'The mass is in grams and the volume in cm³, so the density is in g/cm³.'],
      solution: [`Density $= \\dfrac{${fmt(m)}}{${v}} = ${fmt(rho)}$ g/cm³`],
    };
  }
  // A cuboid's mass from its size, or a volume from a mass.
  const [l, w, h] = [rng.int(2, 12), rng.int(2, 10), rng.int(2, 8)];
  const v = l * w * h;
  const m = roundTo(rho * v, 2);
  if (rng.chance(0.5)) {
    return {
      prompt: `A block of ${mat} is a cuboid $${l}$ cm by $${w}$ cm by $${h}$ cm. The density of the ${mat} is $${fmt(rho)}$ g/cm³. Find the mass of the block.`,
      parts: [numPart(m, { suffix: 'g', exact: false })],
      hints: ['First find the volume of the cuboid: length $\\times$ width $\\times$ height.', 'Mass $=$ density $\\times$ volume.'],
      solution: [`Volume $= ${l} \\times ${w} \\times ${h} = ${v}$ cm³`, `Mass $= ${fmt(rho)} \\times ${v} = ${G(m)}$ g`],
    };
  }
  return {
    prompt: `A piece of ${mat} has a mass of $${G(m)}$ g. The density of the material is $${fmt(rho)}$ g/cm³. Find the volume of the piece.`,
    parts: [numPart(v, { suffix: 'cm³', exact: false })],
    hints: ['Rearrange density $= \\dfrac{\\text{mass}}{\\text{volume}}$.', 'Volume $= \\dfrac{\\text{mass}}{\\text{density}}$.'],
    solution: [`Volume $= \\dfrac{\\text{mass}}{\\text{density}} = \\dfrac{${G(m)}}{${fmt(rho)}} = ${v}$ cm³`],
  };
}

function pressure(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // A box resting on a face measured in centimetres: convert the area to m².
    const dims = retry(() => [rng.int(2, 8) * 10, rng.int(2, 8) * 10, rng.int(2, 8) * 10].sort((a, b) => a - b), (ds) => ds[0] !== ds[2]);
    const [a, b, c] = dims as [number, number, number];
    const most = rng.chance(0.5);
    const area = most ? a * b : b * c;
    const F = rng.int(4, 40) * 10;
    const P = F / (area / 10000);
    return {
      prompt: `A box is a cuboid $${a}$ cm by $${b}$ cm by $${c}$ cm and has a weight of $${F}$ N. It can rest on any of its faces. Find the ${most ? 'greatest' : 'least'} pressure it can exert on the floor, in N/m²${isExact(P) ? '' : ', to 2 decimal places'}.`,
      parts: [answer(P, { suffix: 'N/m²' })],
      hints: [`Pressure $= \\dfrac{\\text{force}}{\\text{area}}$. The ${most ? 'greatest' : 'least'} pressure comes from the ${most ? 'smallest' : 'largest'} face.`, 'Convert the area to m² first: $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$.'],
      solution: [
        `The ${most ? 'smallest' : 'largest'} face is $${most ? a : b}$ cm by $${most ? b : c}$ cm, with area $${G(area)}$ cm² $= ${G(area)} \\div 10\\,000 = ${fmt(area / 10000)}$ m².`,
        `Pressure $= \\dfrac{${F}}{${fmt(area / 10000)}} ${isExact(P) ? '=' : '\\approx'} ${isExact(P) ? G(P) : fmt(P, 2)}$ N/m²`,
      ],
      calculator: true,
    };
  }
  const A = roundTo(rng.int(2, 40) / 10, 1);
  const P = rng.int(5, 90) * 10;
  const F = roundTo(P * A, 2);
  const thing = rng.pick(['A crate', 'A statue', 'A water tank', 'A cupboard', 'A stack of bricks']);
  if (d === 1) {
    return {
      prompt: `${thing} exerts a force of $${G(F)}$ N on the ground over an area of $${fmt(A)}$ m². Find the pressure on the ground.`,
      parts: [numPart(P, { suffix: 'N/m²', exact: false })],
      hints: ['Pressure $= \\dfrac{\\text{force}}{\\text{area}}$.', 'A force in newtons over an area in m² gives a pressure in N/m² (pascals).'],
      solution: [`Pressure $= \\dfrac{${G(F)}}{${fmt(A)}} = ${G(P)}$ N/m²`],
    };
  }
  const findForce = rng.chance(0.5);
  return findForce
    ? {
        prompt: `${thing} rests on an area of $${fmt(A)}$ m² and exerts a pressure of $${G(P)}$ N/m². Find the force it exerts on the ground.`,
        parts: [numPart(F, { suffix: 'N', exact: false })],
        hints: ['Rearrange pressure $= \\dfrac{\\text{force}}{\\text{area}}$.', 'Force $=$ pressure $\\times$ area.'],
        solution: [`Force $= ${G(P)} \\times ${fmt(A)} = ${G(F)}$ N`],
      }
    : {
        prompt: `${thing} has a weight of $${G(F)}$ N and exerts a pressure of $${G(P)}$ N/m² on the ground. Find the area it rests on.`,
        parts: [numPart(A, { suffix: 'm²', exact: false })],
        hints: ['Rearrange pressure $= \\dfrac{\\text{force}}{\\text{area}}$.', 'Area $= \\dfrac{\\text{force}}{\\text{pressure}}$.'],
        solution: [`Area $= \\dfrac{${G(F)}}{${G(P)}} = ${fmt(A)}$ m²`],
      };
}

export const PROPORTION_SKILLS: SkillDef[] = [
  skill({ id: 'mx-direct-proportion', name: 'Direct proportion', description: 'Find and use the rule when one quantity is directly proportional to another, its square, cube or square root', outcomes: ['PR1'], lessonId: 'mx-9-1', gen: (rng, d) => proportion(rng, d, false) }),
  skill({ id: 'mx-inverse-proportion', name: 'Inverse proportion', description: 'Find and use the rule when one quantity is inversely proportional to another or to its square', outcomes: ['PR1'], lessonId: 'mx-9-1', gen: (rng, d) => proportion(rng, d, true) }),
  skill({ id: 'mx-density', name: 'Density', description: 'Use density = mass ÷ volume to find a density, a mass or a volume', outcomes: ['PR2'], lessonId: 'mx-9-2', gen: density }),
  skill({ id: 'mx-pressure', name: 'Pressure', description: 'Use pressure = force ÷ area to find a pressure, a force or an area', outcomes: ['PR2'], lessonId: 'mx-9-2', gen: pressure }),
];
