/**
 * Grade 12 Physics, Unit 1, lessons 1.3 to 1.5: the conservation of momentum (30-A2). Collisions
 * and explosions along one line, kinetic energy in elastic and inelastic collisions, and
 * collisions and explosions in two dimensions, worked by components. Every number a question
 * needs is in the question, and every collision is one that could happen: no question gives
 * objects more kinetic energy after a collision than they had before it.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { AXES, An, G, RAD, an, clean, minusIf, positive, rounded, way, type Axis } from './common.ts';

const L = (n: number) => `p30-1-${n}`;
const P = 'kg·m/s';
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';

/** "moves east at 3 m/s", or "is at rest". */
const moves = (ax: Axis, v: number) => (v === 0 ? 'is at rest' : `moves ${way(ax, v)} at ${q(Math.abs(v), 'm/s')}`);
/** A signed number in a line of working, in brackets when it is negative. */
const sg = (x: number, dp = 2) => (x < 0 ? `(${num(x, dp)})` : num(x, dp));
const ke = (m: number, v: number) => 0.5 * m * v * v;

// ---------------------------------------------------------------------------- 1.3 collisions along one line

/** Things that join when they collide, with masses (kg) and speeds (m/s). */
const JOINERS = [
  { a: 'cart', b: 'cart', ms: [0.5, 1, 1.5, 2, 3], us: [0.6, 0.8, 1.2, 1.5, 2, 3], still: 'that is at rest', join: 'They stick together.' },
  { a: 'railway wagon', b: 'railway wagon', ms: [8000, 10000, 12000, 15000, 20000], us: [1.5, 2, 3, 4], still: 'that is at rest', join: 'They couple together.' },
  { a: 'rugby player', b: 'rugby player', ms: [70, 80, 90, 100, 110], us: [3, 4, 5, 6, 7], still: 'who is standing still', join: 'They hold on to each other.' },
];

function stickAtRest(rng: Rng): GenOutput {
  const k = rng.pick(JOINERS);
  const m1 = rng.pick(k.ms);
  const m2 = rng.pick(k.ms);
  const u = rng.pick(k.us);
  const p = clean(m1 * u);
  const v = p / (m1 + m2);
  return {
    prompt: `${An(m1)} ${q(m1, 'kg')} ${k.a} moving at ${q(u, 'm/s')} runs into ${an(m2)} ${q(m2, 'kg')} ${k.b} ${k.still}. ${k.join} How fast do they move just after the collision? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['The total momentum just after the collision equals the total momentum just before it.', 'After the collision the two move as one object, with the two masses added.'],
    solution: [`Momentum before: $${m1} \\times ${u} + 0 = ${p}$ ${P}`, `After the collision, one object of mass $${m1} + ${m2} = ${clean(m1 + m2)}$ kg carries the same momentum.`, `$v = \\dfrac{${p}}{${clean(m1 + m2)}} = ${num(v, 2)}$ m/s`],
  };
}

function stickBothMoving(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const k = rng.pick(JOINERS);
  const headOn = rng.chance(0.5);
  const c = retry(
    () => ({ m1: rng.pick(k.ms), m2: rng.pick(k.ms), u1: rng.pick(k.us), u2: rng.pick(k.us) }),
    (t) => (headOn ? Math.abs(t.m1 * t.u1 - t.m2 * t.u2) / (t.m1 + t.m2) >= 0.01 : t.u1 > t.u2),
  );
  const u2 = headOn ? -c.u2 : c.u2;
  const p1 = clean(c.m1 * c.u1);
  const p2 = clean(c.m2 * u2);
  const total = clean(p1 + p2);
  const v = total / (c.m1 + c.m2);
  const meet = headOn
    ? `collides head-on with ${an(c.m2)} ${q(c.m2, 'kg')} ${k.b} moving ${ax.neg} at ${q(c.u2, 'm/s')}`
    : `catches up with ${an(c.m2)} ${q(c.m2, 'kg')} ${k.b} moving ${ax.pos} at ${q(c.u2, 'm/s')}`;
  return {
    prompt: `${positive(ax)} ${An(c.m1)} ${q(c.m1, 'kg')} ${k.a} moving ${ax.pos} at ${q(c.u1, 'm/s')} ${meet}. ${k.join} Find their velocity just after the collision, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['Give each velocity its sign, then add the two momenta.', 'The total momentum after equals the total momentum before, and the two masses move as one.'],
    solution: [
      `Momentum before: $${c.m1} \\times ${c.u1} + ${c.m2} \\times ${sg(u2)} = ${p1} + ${sg(p2)} = ${total}$ ${P}`,
      `$v = \\dfrac{${total}}{${c.m1} + ${c.m2}} = ${num(v, 2)}$ m/s, so they move ${way(ax, v)}`,
    ],
  };
}

function bounceUnknown(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const c = retry(
    () => {
      const m1 = rng.pick([1, 2, 3, 4]);
      const m2 = rng.pick([1, 2, 3, 5]);
      const u1 = rng.pick([3, 4, 5, 6]);
      const u2 = rng.pick([0, 0, -1, -2]);
      const e = rng.pick([0.4, 0.5, 0.6, 0.7, 0.8]);
      const p = m1 * u1 + m2 * u2;
      const v1 = Math.round(((p - m2 * e * (u1 - u2)) / (m1 + m2)) * 10) / 10;
      const v2 = (p - m1 * v1) / m2;
      return { m1, m2, u1, u2, v1, v2, p };
    },
    (t) => t.v2 > t.v1 + 0.2 && ke(t.m1, t.v1) + ke(t.m2, t.v2) < ke(t.m1, t.u1) + ke(t.m2, t.u2),
  );
  return {
    prompt: `${positive(ax)} Cart A, of mass ${q(c.m1, 'kg')}, moves ${ax.pos} at ${q(c.u1, 'm/s')} and collides with cart B, of mass ${q(c.m2, 'kg')}, which ${moves(ax, c.u2)}. Just after the collision, cart A ${moves(ax, c.v1)}. Find the velocity of cart B just after the collision, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(c.v2, 2, 'm/s')],
    hints: ['Find the total momentum before the collision, with a sign for each velocity.', 'Take the momentum of cart A after the collision away from the total. What is left is the momentum of cart B.'],
    solution: [
      `Momentum before: $${c.m1} \\times ${c.u1} + ${c.m2} \\times ${sg(c.u2)} = ${clean(c.p)}$ ${P}`,
      `Cart A after: $${c.m1} \\times ${sg(c.v1)} = ${clean(c.m1 * c.v1)}$ ${P}, so cart B has $${clean(c.p)} - ${sg(clean(c.m1 * c.v1))} = ${clean(c.p - c.m1 * c.v1)}$ ${P}.`,
      `$v_B = \\dfrac{${clean(c.p - c.m1 * c.v1)}}{${c.m2}} = ${num(c.v2, 2)}$ m/s, so cart B moves ${way(ax, c.v2)}`,
    ],
  };
}

function unknownMass(rng: Rng): GenOutput {
  const c = retry(
    () => ({ m1: rng.pick([0.5, 1, 1.5, 2]), m2: rng.pick([0.5, 1, 1.5, 2, 3, 4]), u: rng.pick([1.2, 2, 2.4, 3, 3.6, 4]) }),
    (t) => Number.isInteger(Math.round(((t.m1 * t.u) / (t.m1 + t.m2)) * 1e6) / 1e4),
  );
  const v = clean((c.m1 * c.u) / (c.m1 + c.m2));
  const p = clean(c.m1 * c.u);
  return {
    prompt: `${An(c.m1)} ${q(c.m1, 'kg')} cart moving at ${q(c.u, 'm/s')} hits a second cart that is at rest. The two stick together and move on at ${q(v, 'm/s')}. What is the mass of the second cart?`,
    parts: [numPart(c.m2, { suffix: 'kg', tolerance: 0.011 })],
    hints: ['The total momentum is the same after the collision as before.', 'Find the total mass that moves after the collision, then take away the mass of the first cart.'],
    solution: [`Momentum before: $${c.m1} \\times ${c.u} = ${p}$ ${P}`, `Total mass after: $\\dfrac{${p}}{${v}} = ${clean(c.m1 + c.m2)}$ kg`, `Second cart: $${clean(c.m1 + c.m2)} - ${c.m1} = ${c.m2}$ kg`],
  };
}

// ---------------------------------------------------------------------------- 1.3 recoil and explosions

function pushApart(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const k = rng.pick([
    { who: 'Two skaters stand at rest on smooth ice and push each other apart', one: 'skater', ma: [50, 60, 70], mb: [60, 75, 80, 90], va: [1.5, 2, 2.4, 3] },
    { who: 'Two carts at rest on a smooth track are pushed apart by a spring between them', one: 'cart', ma: [0.5, 1, 1.5], mb: [1, 2, 2.5, 3], va: [0.6, 0.9, 1.2, 1.8] },
  ]);
  const c = retry(() => ({ ma: rng.pick(k.ma), mb: rng.pick(k.mb), va: rng.pick(k.va) }), (t) => t.ma !== t.mb);
  const p = clean(c.ma * c.va);
  const v = p / c.mb;
  return {
    prompt: `${k.who}. The ${q(c.ma, 'kg')} ${k.one} moves ${ax.pos} at ${q(c.va, 'm/s')}. How fast does the ${q(c.mb, 'kg')} ${k.one} move? Give your answer to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['The total momentum was zero before the push, so it is zero after it.', 'The two momenta are equal in size and opposite in direction.'],
    solution: [`The ${q(c.ma, 'kg')} ${k.one} has momentum $${c.ma} \\times ${c.va} = ${p}$ ${P}, directed ${ax.pos}.`, `The other must have ${q(p, P)} directed ${ax.neg}, so the total stays zero.`, `$v = \\dfrac{${p}}{${c.mb}} = ${num(v, 2)}$ m/s, ${ax.neg}`],
  };
}

const EXPLOSION_IDEAS: Q[] = [
  { q: 'A firework at rest explodes into many pieces. What is the total momentum of all the pieces just after the explosion?', a: 'Zero', w: ['It depends on the energy of the explosion', 'The momentum of the largest piece', 'The sum of the sizes of all the momenta'], why: 'The forces of the explosion act between the pieces, so the total momentum stays what it was: zero. The momenta of the pieces add to zero as vectors.' },
  { q: 'Two carts at rest are pushed apart by a spring. One has twice the mass of the other. How do their speeds compare?', a: 'The lighter cart moves twice as fast', w: ['They move at the same speed', 'The heavier cart moves twice as fast', 'The lighter cart moves four times as fast'], why: 'The two momenta are equal in size, so half the mass must have twice the speed.' },
  { q: 'A rifle recoils when it fires. Why is the speed of the recoil much smaller than the speed of the bullet?', a: 'The rifle has a much larger mass, and the two momenta are equal in size', w: ['The rifle has less momentum than the bullet', 'The force on the rifle is smaller than the force on the bullet', 'The force acts on the rifle for a shorter time'], why: 'The momenta are equal and opposite. With hundreds of times the mass, the rifle has hundreds of times less speed.' },
  { q: 'An astronaut floating at rest in space throws a tool away. What happens to the astronaut?', a: 'The astronaut moves the opposite way, with momentum equal in size to that of the tool', w: ['Nothing, because there is nothing to push against', 'The astronaut moves the same way as the tool', 'The astronaut moves the opposite way at the same speed as the tool'], why: 'The total momentum stays zero. The astronaut has far more mass than the tool, so the astronaut moves much more slowly.' },
  { q: 'In an explosion, which of these quantities increases?', a: 'The total kinetic energy', w: ['The total momentum', 'The total mass', 'None of them'], why: 'Stored chemical or elastic energy becomes kinetic energy. The total momentum cannot change, because no outside force acts.' },
  { q: 'How does a rocket speed up in space, where there is nothing to push against?', a: 'It throws exhaust gas backwards, and gains equal momentum forwards', w: ['It pushes against the space behind it', 'It cannot speed up in space', 'It pushes against its own hull'], why: 'The rocket and its exhaust are one system. Momentum given to the gas one way is matched by momentum of the rocket the other way.' },
];

function recoilGrams(rng: Rng): GenOutput {
  const M = rng.pick([3, 4, 5]);
  const g = rng.pick([8, 10, 12]);
  const v = rng.pick([600, 750, 800, 900]);
  const p = clean((g / 1000) * v);
  return {
    prompt: `${An(M)} ${q(M, 'kg')} rifle at rest fires ${an(g)} ${q(g, 'g')} bullet at ${q(v, 'm/s')}. How fast does the rifle recoil? Give your answer to 2 decimal places.`,
    parts: [rounded(p / M, 2, 'm/s')],
    hints: ['Change the grams to kilograms.', 'The momentum of the rifle is equal in size to the momentum of the bullet.'],
    solution: [`Bullet: $p = ${g / 1000} \\times ${v} = ${p}$ ${P}`, `Rifle: $v = \\dfrac{${p}}{${M}} = ${num(p / M, 2)}$ m/s, opposite to the bullet`],
  };
}

function astronautThrow(rng: Rng): GenOutput {
  const M = rng.pick([80, 90, 100, 120]);
  const m = rng.pick([1.5, 2, 2.5, 4]);
  const v = rng.pick([4, 5, 6, 8]);
  const p = clean(m * v);
  return {
    prompt: `An astronaut of mass ${q(M, 'kg')}, floating at rest beside a space station, throws ${an(m)} ${q(m, 'kg')} tool away at ${q(v, 'm/s')}. How fast does the astronaut move afterwards? Give your answer to 3 decimal places.`,
    parts: [rounded(p / M, 3, 'm/s')],
    hints: ['The total momentum was zero before the throw, so it is zero after it.', 'The momentum of the astronaut is equal in size to the momentum of the tool.'],
    solution: [`Tool: $p = ${m} \\times ${v} = ${p}$ ${P}`, `Astronaut: $v = \\dfrac{${p}}{${M}} = ${num(p / M, 3)}$ m/s, opposite to the tool`],
  };
}

function cannonRecoil(rng: Rng): GenOutput {
  const M = rng.pick([800, 1000, 1200, 1500]);
  const m = rng.pick([4, 5, 6, 8]);
  const v = rng.pick([120, 150, 180, 200]);
  const p = m * v;
  return {
    prompt: `${An(M)} ${q(M, 'kg')} cannon at rest on smooth ground fires ${an(m)} ${q(m, 'kg')} ball horizontally at ${q(v, 'm/s')}. How fast does the cannon recoil? Give your answer to 2 decimal places.`,
    parts: [rounded(p / M, 2, 'm/s')],
    hints: ['The total momentum was zero before the shot, so it is zero after it.', 'The momentum of the cannon is equal in size to the momentum of the ball.'],
    solution: [`Ball: $p = ${m} \\times ${v} = ${p}$ ${P}`, `Cannon: $v = \\dfrac{${p}}{${M}} = ${num(p / M, 2)}$ m/s, opposite to the ball`],
  };
}

function movingSplit(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const what = rng.pick(['firework', 'shell']);
  const c = retry(
    () => ({ m1: rng.pick([1, 2, 3]), m2: rng.pick([1, 2, 3, 4]), u: rng.pick([2, 3, 4, 5, 6]), v1: rng.pick([8, 10, 12, 15, -2, -4]) }),
    (t) => Math.abs(((t.m1 + t.m2) * t.u - t.m1 * t.v1) / t.m2 - t.v1) >= 1 && (t.m1 + t.m2) * t.u !== t.m1 * t.v1,
  );
  const M = c.m1 + c.m2;
  const p = M * c.u;
  const v2 = (p - c.m1 * c.v1) / c.m2;
  return {
    prompt: `${positive(ax)} ${An(M)} ${q(M, 'kg')} ${what} moving ${ax.pos} at ${q(c.u, 'm/s')} explodes into two pieces. Just after the explosion, one piece, of mass ${q(c.m1, 'kg')}, moves ${way(ax, c.v1)} at ${q(Math.abs(c.v1), 'm/s')}. Find the velocity of the other piece, of mass ${q(c.m2, 'kg')}, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(v2, 2, 'm/s')],
    hints: ['The total momentum just after the explosion equals the momentum of the whole object just before it.', 'Take the momentum of the first piece away from the total. What is left belongs to the second piece.'],
    solution: [
      `Momentum before: $${M} \\times ${c.u} = ${p}$ ${P}`,
      `First piece: $${c.m1} \\times ${sg(c.v1)} = ${c.m1 * c.v1}$ ${P}, so the second piece has $${p} - ${sg(c.m1 * c.v1)} = ${p - c.m1 * c.v1}$ ${P}.`,
      `$v = \\dfrac{${p - c.m1 * c.v1}}{${c.m2}} = ${num(v2, 2)}$ m/s, so it moves ${way(ax, v2)}`,
    ],
  };
}

function thrownFromMoving(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const M = rng.pick([50, 60, 70, 80]);
  const m = rng.pick([2, 4, 5]);
  const u = rng.pick([2, 3, 4]);
  const forward = rng.chance(0.5);
  const vb = rng.pick([8, 10, 12, 15]) * (forward ? 1 : -1);
  const p = (M + m) * u;
  const v = (p - m * vb) / M;
  return {
    prompt: `${positive(ax)} ${An(M)} ${q(M, 'kg')} skater glides ${ax.pos} at ${q(u, 'm/s')}, holding ${an(m)} ${q(m, 'kg')} ball. The skater throws the ball so that it moves ${way(ax, vb)} at ${q(Math.abs(vb), 'm/s')}, measured from the ice. Find the velocity of the skater just after the throw, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(v, 2, 'm/s')],
    hints: ['Before the throw, the skater and the ball move together: use their total mass.', 'The momentum of the skater afterwards is the total momentum minus the momentum of the ball.'],
    solution: [
      `Momentum before: $(${M} + ${m}) \\times ${u} = ${p}$ ${P}`,
      `Ball after: $${m} \\times ${sg(vb)} = ${m * vb}$ ${P}, so the skater has $${p} - ${sg(m * vb)} = ${p - m * vb}$ ${P}.`,
      `$v = \\dfrac{${p - m * vb}}{${M}} = ${num(v, 2)}$ m/s, so the skater moves ${way(ax, v)}`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.4 kinetic energy in collisions

const ENERGY_IDEAS: Q[] = [
  { q: 'Which quantity is conserved in every collision between objects that form an isolated system?', a: 'The total momentum', w: ['The total kinetic energy', 'The velocity of each object', 'The momentum of each object'], why: 'Momentum is conserved in every collision. Kinetic energy is conserved only in an elastic one.' },
  { q: 'What is an elastic collision?', a: 'One in which the total kinetic energy is the same after the collision as before', w: ['One in which the objects stick together', 'One in which the objects bounce apart', 'One in which momentum is not conserved'], why: 'Objects can bounce apart and still lose kinetic energy. Only a collision that keeps all of its kinetic energy is elastic.' },
  { q: 'Two cars collide and lock together. What kind of collision is this?', a: 'Completely inelastic', w: ['Elastic', 'An explosion', 'It cannot be told'], why: 'When the objects stick together, the collision loses as much kinetic energy as the conservation of momentum allows. It is called completely inelastic.' },
  { q: 'In an inelastic collision, what happens to the kinetic energy that is lost?', a: 'It becomes thermal energy, sound and the work of bending the objects', w: ['It is destroyed', 'It becomes momentum', 'It becomes gravitational potential energy'], why: 'Energy is always conserved. The kinetic energy that disappears has warmed the objects, changed their shape and made sound.' },
  { q: 'Which of these collisions is closest to elastic?', a: 'Two steel balls bouncing off each other', w: ['A ball of clay hitting the floor', 'Two cars crumpling together', 'A dart sticking in a board'], why: 'Hard steel balls spring back to their shape and lose almost no kinetic energy. The others change shape for good or stick.' },
  { q: 'Two balls of clay with equal and opposite momenta collide head-on and stick. How much of their kinetic energy is lost?', a: 'All of it', w: ['None of it', 'Half of it', 'It depends on their masses'], why: 'The total momentum is zero, so the lump is at rest after the collision: all of the kinetic energy has become thermal energy.' },
];

function stickEnergyLoss(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const m1 = rng.pick([1, 2, 3, 4]);
      const m2 = rng.pick([1, 2, 3, 4, 6]);
      const v = rng.pick([1, 2, 3, 4]);
      return { m1, m2, v, u: (v * (m1 + m2)) / m1 };
    },
    (t) => Number.isInteger(Math.round(t.u * 1e6) / 1e5) && t.u <= 8,
  );
  const u = clean(c.u);
  const before = clean(ke(c.m1, u));
  const after = clean(ke(c.m1 + c.m2, c.v));
  return {
    prompt: `${An(c.m1)} ${q(c.m1, 'kg')} cart moving at ${q(u, 'm/s')} hits ${an(c.m2)} ${q(c.m2, 'kg')} cart at rest, and the two stick together. Find their speed just after the collision, and the kinetic energy lost in the collision.`,
    parts: [numPart(c.v, { suffix: 'm/s', label: 'Speed after' }), numPart(clean(before - after), { suffix: 'J', label: 'Kinetic energy lost' })],
    hints: ['Use the conservation of momentum to find the speed after the collision.', 'Find the kinetic energy, $\\dfrac{1}{2}mv^2$, before and after, and subtract.'],
    solution: [
      `$v = \\dfrac{${c.m1} \\times ${u}}{${c.m1} + ${c.m2}} = ${c.v}$ m/s`,
      `Before: $\\dfrac{1}{2} \\times ${c.m1} \\times ${u}^2 = ${before}$ J. After: $\\dfrac{1}{2} \\times ${c.m1 + c.m2} \\times ${c.v}^2 = ${after}$ J.`,
      `Lost: $${before} - ${after} = ${clean(before - after)}$ J`,
    ],
  };
}

function classify(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const [a, b] = rng.pick<[number, number]>([[1, 1], [1, 2], [2, 1], [1, 3], [3, 1]]);
  const s = rng.pick([0.5, 1, 2]);
  const e = rng.pick([1, 1, 0.5, 0]);
  const m1 = a * s;
  const m2 = b * s;
  const u = 2 * (a + b);
  const v1 = 2 * (a - e * b);
  const v2 = 2 * a * (1 + e);
  const before = clean(ke(m1, u));
  const after = clean(ke(m1, v1) + ke(m2, v2));
  const then = v1 === v2 ? `the two balls move ${ax.pos} together at ${q(v1, 'm/s')}` : `ball A ${moves(ax, v1)} and ball B moves ${ax.pos} at ${q(v2, 'm/s')}`;
  return {
    prompt: `Ball A, of mass ${q(m1, 'kg')}, moves ${ax.pos} at ${q(u, 'm/s')} and hits ball B, of mass ${q(m2, 'kg')}, which is at rest. Just after the collision, ${then}. Find the total kinetic energy before and after the collision, and say what kind of collision it is.`,
    parts: [numPart(before, { suffix: 'J', label: 'Before' }), numPart(after, { suffix: 'J', label: 'After' }), part(fixedChoice(['Elastic', 'Inelastic'], e === 1 ? 0 : 1), { label: 'The collision is' })],
    hints: ['Kinetic energy is $\\dfrac{1}{2}mv^2$ for each ball. It has no direction, so add the two values.', 'The collision is elastic only if the total kinetic energy is the same after as before.'],
    solution: [
      `Before: $\\dfrac{1}{2} \\times ${m1} \\times ${u}^2 = ${before}$ J`,
      `After: $\\dfrac{1}{2} \\times ${m1} \\times ${sg(v1)}^2 + \\dfrac{1}{2} \\times ${m2} \\times ${v2}^2 = ${clean(ke(m1, v1))} + ${clean(ke(m2, v2))} = ${after}$ J`,
      e === 1 ? 'The total kinetic energy is unchanged, so the collision is elastic' : `${clean(before - after)} J of kinetic energy is lost, so the collision is inelastic`,
    ],
  };
}

function percentLost(rng: Rng): GenOutput {
  const c = retry(
    () => ({ m1: rng.pick([1, 2, 3, 4, 5]), m2: rng.pick([1, 2, 3, 4, 5]), u1: rng.pick([2, 3, 4, 5, 6]), u2: rng.pick([0, 0, 1, 2]) }),
    (t) => t.m1 * t.u1 !== t.m2 * t.u2,
  );
  const p = c.m1 * c.u1 - c.m2 * c.u2;
  const v = p / (c.m1 + c.m2);
  const before = ke(c.m1, c.u1) + ke(c.m2, c.u2);
  const after = ke(c.m1 + c.m2, v);
  const lost = before - after;
  return {
    prompt: `${An(c.m1)} ${q(c.m1, 'kg')} cart moving at ${q(c.u1, 'm/s')} collides head-on with ${an(c.m2)} ${q(c.m2, 'kg')} cart ${c.u2 ? `moving the opposite way at ${q(c.u2, 'm/s')}` : 'at rest'}. The two stick together. Find the kinetic energy lost in the collision, to 2 decimal places, and the percentage of the kinetic energy before the collision that is lost, to 1 decimal place.`,
    parts: [rounded(lost, 2, 'J', 'Kinetic energy lost'), rounded((lost / before) * 100, 1, '%', 'Percentage lost')],
    hints: ['Use the conservation of momentum to find the velocity after the collision.', 'Find the total kinetic energy before and after, and subtract.', 'Percentage lost = energy lost ÷ energy before × 100.'],
    solution: [
      `$v = \\dfrac{${c.m1} \\times ${c.u1} ${c.u2 ? `- ${c.m2} \\times ${c.u2}` : ''}}{${c.m1} + ${c.m2}} = ${num(v, 3)}$ m/s`,
      `Before: $\\dfrac{1}{2} \\times ${c.m1} \\times ${c.u1}^2 ${c.u2 ? `+ \\dfrac{1}{2} \\times ${c.m2} \\times ${c.u2}^2` : ''} = ${num(before, 2)}$ J. After: $\\dfrac{1}{2} \\times ${c.m1 + c.m2} \\times ${num(v, 3)}^2 = ${num(after, 2)}$ J.`,
      `Lost: $${num(before, 2)} - ${num(after, 2)} = ${num(lost, 2)}$ J, which is $\\dfrac{${num(lost, 2)}}{${num(before, 2)}} \\times 100 = ${num((lost / before) * 100, 1)}\\%$`,
    ],
  };
}

function ballisticPendulum(rng: Rng): GenOutput {
  const speeds = (t: { g: number; M: number; h: number }) => {
    const v = Math.sqrt(2 * G * (t.h / 100));
    return { v, u: ((t.M + t.g / 1000) * v) / (t.g / 1000) };
  };
  const { g, M, h } = retry(
    () => ({ g: rng.pick([8, 10, 12, 15, 20]), M: rng.pick([1, 1.5, 2, 2.5, 4]), h: rng.pick([3, 4, 5, 6, 8, 10]) }),
    (t) => speeds(t).u >= 150 && speeds(t).u <= 600,
  );
  const m = g / 1000;
  const { v, u } = speeds({ g, M, h });
  return {
    prompt: `${An(g)} ${q(g, 'g')} bullet is fired into ${an(M)} ${q(M, 'kg')} block of wood that hangs at rest on long strings. The bullet stays in the block, and the block swings up until it is ${q(h, 'cm')} higher than where it started. ${G_NOTE} Find the speed of the block and bullet just after the impact, to 2 decimal places, and the speed of the bullet just before the impact, to the nearest metre per second.`,
    parts: [rounded(v, 2, 'm/s', 'Block and bullet'), rounded(u, 0, 'm/s', 'Bullet')],
    hints: ['After the impact, mechanical energy is conserved as the block swings up: $\\dfrac{1}{2}v^2 = gh$.', 'During the impact, momentum is conserved, but kinetic energy is not: the collision is completely inelastic.'],
    solution: [
      `The swing: $v = \\sqrt{2gh} = \\sqrt{2 \\times 9.81 \\times ${h / 100}} = ${num(v, 2)}$ m/s`,
      `The impact: $${m} \\times u = (${M} + ${m}) \\times ${num(v, 2)}$`,
      `$u = \\dfrac{${clean(M + m)} \\times ${num(v, 2)}}{${m}} = ${num(u, 0)}$ m/s`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.4 elastic collisions

const ELASTIC_RULES = '$v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}\\,u$ and $v_2 = \\dfrac{2m_1}{m_1 + m_2}\\,u$';

const ELASTIC_IDEAS: Q[] = [
  { q: 'A moving ball makes an elastic head-on collision with an identical ball at rest. What happens?', a: 'The first ball stops, and the second moves off with the velocity the first one had', w: ['Both move on together at half the speed', 'The first ball bounces back at the same speed', 'Both move on at the same speed as before'], why: 'With equal masses, the balls exchange velocities. This conserves both the momentum and the kinetic energy.' },
  { q: 'A light ball makes an elastic head-on collision with a much heavier ball at rest. What does the light ball do?', a: 'It bounces back with almost the speed it came in with', w: ['It stops', 'It carries on forwards, a little more slowly', 'It sticks to the heavy ball'], why: 'The heavy ball hardly moves, so it takes almost no kinetic energy. The light ball keeps its speed, reversed.' },
  { q: 'A heavy ball makes an elastic head-on collision with a much lighter ball at rest. How fast does the light ball move off?', a: 'At almost twice the speed of the heavy ball', w: ['At the same speed as the heavy ball', 'At half the speed of the heavy ball', 'At almost four times the speed of the heavy ball'], why: 'The heavy ball hardly slows down. The balls separate as fast as they approached, so the light ball leaves at almost twice the speed of the heavy one.' },
  { q: 'In an elastic head-on collision, how does the speed at which the objects move apart compare with the speed at which they approached?', a: 'The two speeds are equal', w: ['They move apart more slowly', 'They move apart faster', 'It depends on the masses'], why: 'This follows from conserving both momentum and kinetic energy. In an inelastic collision the objects move apart more slowly.' },
  { q: 'Which two quantities are both conserved in an elastic collision?', a: 'The total momentum and the total kinetic energy', w: ['The total momentum and the velocity of each object', 'The total kinetic energy and the speed of each object', 'The momentum and the kinetic energy of each object'], why: 'The totals are conserved. Each object’s own momentum and kinetic energy usually change.' },
];

function equalMassSwap(rng: Rng): GenOutput {
  const m = rng.pick([0.16, 0.17, 0.2]);
  const u = rng.pick([1.5, 2, 2.5, 3, 4]);
  return {
    prompt: `${An(m)} ${q(m, 'kg')} billiard ball moving at ${q(u, 'm/s')} makes an elastic head-on collision with an identical ball at rest. Find the speed of each ball just after the collision.`,
    parts: [numPart(0, { suffix: 'm/s', label: 'The first ball' }), numPart(u, { suffix: 'm/s', label: 'The second ball' })],
    hints: ['In an elastic head-on collision between equal masses, the two exchange velocities.'],
    solution: ['The masses are equal, so the balls exchange velocities.', `The first ball stops, and the second moves off at ${u} m/s`],
  };
}

function elasticAtRest(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const c = retry(() => ({ m1: rng.pick([1, 2, 3, 4, 6]), m2: rng.pick([1, 2, 3, 4, 6]), u: rng.pick([2, 3, 4, 5, 6]) }), (t) => t.m1 !== t.m2);
  const sum = c.m1 + c.m2;
  const v1 = ((c.m1 - c.m2) * c.u) / sum;
  const v2 = (2 * c.m1 * c.u) / sum;
  return {
    prompt: `${positive(ax)} ${An(c.m1)} ${q(c.m1, 'kg')} ball moving ${ax.pos} at ${q(c.u, 'm/s')} makes an elastic head-on collision with ${an(c.m2)} ${q(c.m2, 'kg')} ball at rest. Find the velocity of each ball just after the collision, to 2 decimal places. ${minusIf(ax, 'a velocity is')}`,
    parts: [rounded(v1, 2, 'm/s', `The ${c.m1} kg ball`), rounded(v2, 2, 'm/s', `The ${c.m2} kg ball`)],
    hints: [`For an elastic head-on collision with a target at rest: ${ELASTIC_RULES}.`, 'The ball that comes in is $m_1$. A lighter ball bounces back, so its velocity is negative.'],
    solution: [
      `$v_1 = \\dfrac{${c.m1} - ${c.m2}}{${c.m1} + ${c.m2}} \\times ${c.u} = ${num(v1, 2)}$ m/s, so the ${c.m1} kg ball ${v1 < 0 ? `bounces back, moving ${ax.neg}` : `carries on, moving ${ax.pos}`}`,
      `$v_2 = \\dfrac{2 \\times ${c.m1}}{${c.m1} + ${c.m2}} \\times ${c.u} = ${num(v2, 2)}$ m/s, ${ax.pos}`,
    ],
  };
}

function elasticBothMoving(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const [a, b] = rng.pick<[number, number]>([[1, 3], [3, 1], [1, 2], [2, 1], [2, 3], [3, 2], [1, 1]]);
  const s = rng.pick([0.5, 1, 2]);
  const k = a + b >= 5 ? 1 : rng.pick([1, 2]);
  const u2 = rng.pick([-3, -2, -1, 1, 2]);
  const u1 = u2 + (a + b) * k;
  const v1 = u1 - 2 * b * k;
  const v2 = u2 + 2 * a * k;
  const m1 = a * s;
  const m2 = b * s;
  const total = clean(m1 * u1 + m2 * u2);
  return {
    prompt: `${positive(ax)} Ball A, of mass ${q(m1, 'kg')}, moves ${ax.pos} at ${q(u1, 'm/s')}. Ball B, of mass ${q(m2, 'kg')}, ${moves(ax, u2)} along the same line. The balls collide, and the collision is elastic. Just after it, ball A ${moves(ax, v1)}. Find the velocity of ball B just after the collision, and the speed at which the two balls move apart. ${minusIf(ax, 'the velocity is')}`,
    parts: [numPart(v2, { suffix: 'm/s', label: 'Velocity of ball B' }), numPart(Math.abs(v2 - v1), { suffix: 'm/s', label: 'Speed of separation' })],
    hints: ['Use the conservation of momentum, with a sign for each velocity, to find the velocity of ball B.', 'The speed of separation is the difference between the two velocities after the collision. In an elastic collision it equals the speed of approach.'],
    solution: [
      `Momentum before: $${m1} \\times ${u1} + ${m2} \\times ${sg(u2)} = ${total}$ ${P}`,
      `$v_B = \\dfrac{${total} - ${m1} \\times ${sg(v1)}}{${m2}} = ${v2}$ m/s`,
      `Speed of separation: $${v2} - ${sg(v1)} = ${v2 - v1}$ m/s, the same as the speed of approach, $${u1} - ${sg(u2)} = ${u1 - u2}$ m/s`,
    ],
  };
}

function energyTransferred(rng: Rng): GenOutput {
  const c = retry(() => ({ m1: rng.pick([1, 2, 3, 4, 5, 8]), m2: rng.pick([1, 2, 3, 4, 5, 8, 12]), u: rng.pick([2, 3, 4, 5, 6, 8, 10]) }), (t) => t.m1 !== t.m2);
  const v2 = (2 * c.m1 * c.u) / (c.m1 + c.m2);
  const before = ke(c.m1, c.u);
  const got = ke(c.m2, v2);
  return {
    prompt: `${An(c.m1)} ${q(c.m1, 'kg')} ball moving at ${q(c.u, 'm/s')} makes an elastic head-on collision with ${an(c.m2)} ${q(c.m2, 'kg')} ball at rest. Find the speed of the ${q(c.m2, 'kg')} ball just after the collision, to 2 decimal places, and the percentage of the kinetic energy of the first ball that passes to it, to 1 decimal place.`,
    parts: [rounded(v2, 2, 'm/s', 'Speed'), rounded((got / before) * 100, 1, '%', 'Energy passed on')],
    hints: [`For an elastic head-on collision with a target at rest: ${ELASTIC_RULES}.`, 'Compare the kinetic energy of the second ball after the collision with the kinetic energy of the first ball before it.'],
    solution: [
      `$v_2 = \\dfrac{2 \\times ${c.m1}}{${c.m1} + ${c.m2}} \\times ${c.u} = ${num(v2, 2)}$ m/s`,
      `First ball before: $\\dfrac{1}{2} \\times ${c.m1} \\times ${c.u}^2 = ${num(before, 2)}$ J. Second ball after: $\\dfrac{1}{2} \\times ${c.m2} \\times ${num(v2, 2)}^2 = ${num(got, 2)}$ J.`,
      `$\\dfrac{${num(got, 2)}}{${num(before, 2)}} \\times 100 = ${num((got / before) * 100, 1)}\\%$`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.5 momentum in two directions

const ANGLES = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70];

function momentumComponents(rng: Rng): GenOutput {
  const b = rng.pick([{ name: 'hockey puck', m: 0.17, vs: [10, 20, 30] }, { name: 'soccer ball', m: 0.43, vs: [10, 15, 20] }, { name: 'cart', m: 2, vs: [1.5, 2.5, 4] }, { name: 'curling stone', m: 19, vs: [1.5, 2, 3] }]);
  const v = rng.pick(b.vs);
  const th = rng.pick(ANGLES);
  const p = clean(b.m * v);
  return {
    prompt: `${An(b.m)} ${q(b.m, 'kg')} ${b.name} moves at ${q(v, 'm/s')} in a direction ${th}° north of east. Find the east and north components of its momentum, each to 2 decimal places.`,
    parts: [rounded(p * Math.cos(th * RAD), 2, P, 'East'), rounded(p * Math.sin(th * RAD), 2, P, 'North')],
    hints: ['Find the size of the momentum first: $p = mv$.', 'The component next to the angle uses the cosine, and the component opposite it uses the sine.'],
    solution: [`$p = ${b.m} \\times ${v} = ${p}$ ${P}`, `East: $${p}\\cos ${th}° = ${num(p * Math.cos(th * RAD), 2)}$ ${P}`, `North: $${p}\\sin ${th}° = ${num(p * Math.sin(th * RAD), 2)}$ ${P}`],
  };
}

function perpendicularTotal(rng: Rng): GenOutput {
  const px = rng.int(4, 40);
  const py = rng.int(4, 40);
  const R = Math.hypot(px, py);
  const th = Math.atan2(py, px) / RAD;
  return {
    prompt: `Two pucks slide on ice. One has a momentum of ${q(px, P)} east, and the other has a momentum of ${q(py, P)} north. Find the size of their total momentum, and its direction as an angle north of east, each to 1 decimal place.`,
    parts: [rounded(R, 1, P, 'Size'), rounded(th, 1, '° north of east', 'Angle')],
    hints: ['The two momenta are at right angles, so the total is the hypotenuse of a right triangle.', '$\\tan\\theta = \\dfrac{\\text{north component}}{\\text{east component}}$'],
    solution: [`$p = \\sqrt{${px}^2 + ${py}^2} = ${num(R, 1)}$ ${P}`, `$\\theta = \\tan^{-1}\\left(\\dfrac{${py}}{${px}}\\right) = ${num(th, 1)}°$ north of east`],
  };
}

/** Two things that meet at right angles and stay together. */
const CROSSERS = [
  { a: 'car', b: 'car', ma: [900, 1000, 1200, 1500], mb: [1200, 1500, 1800, 2000], ua: [10, 12, 15, 20], ub: [8, 10, 12, 15, 18], where: 'At a crossroads,', join: 'The two lock together.' },
  { a: 'player', b: 'player', ma: [70, 80, 90], mb: [85, 100, 110], ua: [5, 6, 7, 8], ub: [3, 4, 5, 6], where: 'On a rugby field,', join: 'The two hold on to each other.' },
];

function crossing(rng: Rng) {
  const k = rng.pick(CROSSERS);
  const m1 = rng.pick(k.ma);
  const m2 = rng.pick(k.mb);
  const u1 = rng.pick(k.ua);
  const u2 = rng.pick(k.ub);
  const px = m1 * u1;
  const py = m2 * u2;
  return { k, m1, m2, u1, u2, px, py, v: Math.hypot(px, py) / (m1 + m2), th: Math.atan2(py, px) / RAD };
}

function stickPerpendicular(rng: Rng): GenOutput {
  const c = crossing(rng);
  return {
    prompt: `${c.k.where} ${an(c.m1)} ${q(c.m1, 'kg')} ${c.k.a} moving east at ${q(c.u1, 'm/s')} collides with ${an(c.m2)} ${q(c.m2, 'kg')} ${c.k.b} moving north at ${q(c.u2, 'm/s')}. ${c.k.join} Find their speed just after the collision, and their direction as an angle north of east, each to 1 decimal place.`,
    parts: [rounded(c.v, 1, 'm/s', 'Speed'), rounded(c.th, 1, '° north of east', 'Angle')],
    hints: ['Momentum is conserved in each direction. The east momentum comes from one, and the north momentum from the other.', 'Find the size of the total momentum with the Pythagorean theorem, then divide by the total mass.', '$\\tan\\theta = \\dfrac{\\text{north momentum}}{\\text{east momentum}}$'],
    solution: [
      `East: $${c.m1} \\times ${c.u1} = ${c.px}$ ${P}. North: $${c.m2} \\times ${c.u2} = ${c.py}$ ${P}.`,
      `$p = \\sqrt{${c.px}^2 + ${c.py}^2} = ${num(Math.hypot(c.px, c.py), 0)}$ ${P}, so $v = \\dfrac{${num(Math.hypot(c.px, c.py), 0)}}{${c.m1} + ${c.m2}} = ${num(c.v, 1)}$ m/s`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${c.py}}{${c.px}}\\right) = ${num(c.th, 1)}°$ north of east`,
    ],
  };
}

function crashReconstruction(rng: Rng): GenOutput {
  const k = CROSSERS[0];
  const m1 = rng.pick(k.ma);
  const m2 = rng.pick(k.mb);
  const u1 = rng.pick(k.ua);
  const th = Math.round((Math.atan2(m2 * rng.pick(k.ub), m1 * u1) / RAD) * 10) / 10;
  const px = m1 * u1;
  const py = px * Math.tan(th * RAD);
  const v = px / ((m1 + m2) * Math.cos(th * RAD));
  return {
    prompt: `At a crossroads, ${an(m1)} ${q(m1, 'kg')} car moving east at ${q(u1, 'm/s')} collides with ${an(m2)} ${q(m2, 'kg')} car moving north. The cars lock together and slide off in a direction ${th}° north of east. Find the speed of the northbound car just before the collision, and the speed of the two cars just after it, each to 1 decimal place.`,
    parts: [rounded(py / m2, 1, 'm/s', 'Northbound car'), rounded(v, 1, 'm/s', 'After the collision')],
    hints: ['The east momentum after the collision is the momentum of the eastbound car before it.', 'The north momentum is the east momentum × $\\tan\\theta$, and it all came from the northbound car.', 'After the collision, east momentum = total momentum × $\\cos\\theta$.'],
    solution: [
      `East momentum: $${m1} \\times ${u1} = ${px}$ ${P}`,
      `North momentum: $${px} \\times \\tan ${th}° = ${num(py, 0)}$ ${P}, so the northbound car moved at $\\dfrac{${num(py, 0)}}{${m2}} = ${num(py / m2, 1)}$ m/s`,
      `Total momentum: $\\dfrac{${px}}{\\cos ${th}°} = ${num(px / Math.cos(th * RAD), 0)}$ ${P}, so $v = \\dfrac{${num(px / Math.cos(th * RAD), 0)}}{${m1 + m2}} = ${num(v, 1)}$ m/s`,
    ],
  };
}

function perpendicularEnergy(rng: Rng): GenOutput {
  const m1 = rng.pick([0.2, 0.3, 0.4, 0.5]);
  const m2 = rng.pick([0.2, 0.3, 0.4, 0.5]);
  const u1 = rng.pick([2, 3, 4, 5]);
  const u2 = rng.pick([2, 3, 4, 5]);
  const px = clean(m1 * u1);
  const py = clean(m2 * u2);
  const p = Math.hypot(px, py);
  const v = p / (m1 + m2);
  const before = ke(m1, u1) + ke(m2, u2);
  const after = ke(m1 + m2, v);
  return {
    prompt: `Two balls of clay slide on smooth ice: ${an(m1)} ${q(m1, 'kg')} ball moving east at ${q(u1, 'm/s')} and ${an(m2)} ${q(m2, 'kg')} ball moving north at ${q(u2, 'm/s')}. They collide and stick together. Find their speed just after the collision, and the kinetic energy lost in the collision, each to 2 decimal places.`,
    parts: [rounded(v, 2, 'm/s', 'Speed'), rounded(before - after, 2, 'J', 'Kinetic energy lost')],
    hints: ['Momentum is a vector: add the east and north momenta with the Pythagorean theorem.', 'Kinetic energy is not a vector: add the two values before the collision as plain numbers.'],
    solution: [
      `East: $${m1} \\times ${u1} = ${px}$ ${P}. North: $${m2} \\times ${u2} = ${py}$ ${P}.`,
      `$p = \\sqrt{${px}^2 + ${py}^2} = ${num(p, 3)}$ ${P}, so $v = \\dfrac{${num(p, 3)}}{${clean(m1 + m2)}} = ${num(v, 2)}$ m/s`,
      `Before: $\\dfrac{1}{2} \\times ${m1} \\times ${u1}^2 + \\dfrac{1}{2} \\times ${m2} \\times ${u2}^2 = ${num(before, 2)}$ J. After: $\\dfrac{1}{2} \\times ${clean(m1 + m2)} \\times ${num(v, 2)}^2 = ${num(after, 2)}$ J.`,
      `Lost: $${num(before, 2)} - ${num(after, 2)} = ${num(before - after, 2)}$ J`,
    ],
  };
}

// ---------------------------------------------------------------------------- 1.5 glancing collisions and explosions

const TWO_D_IDEAS: Q[] = [
  { q: 'A puck moving east hits a puck at rest, and then moves off north of east. In which direction must the second puck move?', a: 'South of east', w: ['North of east', 'Due east', 'Due west'], order: ['North of east', 'Due east', 'South of east', 'Due west'], why: 'There was no north-south momentum before the collision. The north momentum of the first puck must be cancelled by south momentum of the second.' },
  { q: 'What is conserved in a collision in two dimensions?', a: 'The total momentum in each direction, separately', w: ['Only the momentum along the original direction of motion', 'Only the size of the total momentum, not its direction', 'The speed of each object'], why: 'Momentum is a vector. Its east-west component and its north-south component are each conserved.' },
  { q: 'A shell at rest explodes into three pieces. One flies north and one flies east. In which direction does the third piece move?', a: 'South of west', w: ['North of east', 'North of west', 'South of east'], why: 'The three momenta must add to zero, so the third piece cancels both the north momentum and the east momentum.' },
  { q: 'A moving puck makes an elastic collision, not head-on, with an identical puck at rest. What is the angle between the paths of the two pucks afterwards?', a: '90°', w: ['45°', '60°', '180°'], order: ['45°', '60°', '90°', '180°'], why: 'For equal masses, conserving momentum and kinetic energy together makes the two velocities after the collision the legs of a right triangle.' },
  { q: 'Two cars collide at a crossroads, one moving east and one moving north, and lock together. In which direction does the wreck move?', a: 'North of east', w: ['Due north', 'Due east', 'South of east'], order: ['Due north', 'North of east', 'Due east', 'South of east'], why: 'The wreck keeps the east momentum of one car and the north momentum of the other.' },
];

/** A ball that strikes a ball at rest and is turned aside, with all the numbers of the collision. */
function glancing(rng: Rng) {
  return retry(
    () => {
      const m1 = rng.pick([0.2, 0.3, 0.4, 0.5, 1, 2]);
      const m2 = rng.pick([0.2, 0.3, 0.4, 0.5, 1, 2]);
      const u = rng.pick([2, 3, 4, 5, 6]);
      const v1 = Math.round(u * rng.pick([0.5, 0.6, 0.7, 0.8]) * 10) / 10;
      const th1 = rng.pick([20, 25, 30, 35, 40]);
      const x1 = m1 * v1 * Math.cos(th1 * RAD);
      const y1 = m1 * v1 * Math.sin(th1 * RAD);
      const x2 = m1 * u - x1;
      const v2 = Math.hypot(x2, y1) / m2;
      return { m1, m2, u, v1, th1, x1, y1, x2, v2, th2: Math.atan2(y1, x2) / RAD, lost: ke(m1, u) - ke(m1, v1) - ke(m2, v2) };
    },
    (t) => t.lost >= 0.05 && t.th2 >= 10 && t.th2 <= 80 && t.v2 >= 0.3,
  );
}

function glancingSolution(c: ReturnType<typeof glancing>): string[] {
  return [
    `Ball A after: east $${c.m1} \\times ${c.v1} \\times \\cos ${c.th1}° = ${num(c.x1, 3)}$ ${P}, north $${c.m1} \\times ${c.v1} \\times \\sin ${c.th1}° = ${num(c.y1, 3)}$ ${P}.`,
    `East: the total is $${c.m1} \\times ${c.u} = ${clean(c.m1 * c.u)}$ ${P}, so ball B has $${clean(c.m1 * c.u)} - ${num(c.x1, 3)} = ${num(c.x2, 3)}$ ${P} east.`,
    `North: the total is zero, so ball B has ${num(c.y1, 3)} ${P} south.`,
    `$p_B = \\sqrt{${num(c.x2, 3)}^2 + ${num(c.y1, 3)}^2} = ${num(Math.hypot(c.x2, c.y1), 3)}$ ${P}, so $v_B = \\dfrac{${num(Math.hypot(c.x2, c.y1), 3)}}{${c.m2}} = ${num(c.v2, 2)}$ m/s`,
    `$\\theta = \\tan^{-1}\\left(\\dfrac{${num(c.y1, 3)}}{${num(c.x2, 3)}}\\right) = ${num(c.th2, 1)}°$ south of east`,
  ];
}

function glancingBalance(rng: Rng): GenOutput {
  const c = glancing(rng);
  const th2 = Math.round(c.th2);
  const v2 = c.y1 / (c.m2 * Math.sin(th2 * RAD));
  return {
    prompt: `A ball moving east hits a ball at rest. After the collision, the first ball, of mass ${q(c.m1, 'kg')}, moves at ${q(c.v1, 'm/s')} in a direction ${c.th1}° north of east, and the second ball, of mass ${q(c.m2, 'kg')}, moves in a direction ${th2}° south of east. Use the north-south components of the momentum to find the speed of the second ball, to 2 decimal places.`,
    parts: [rounded(v2, 2, 'm/s')],
    hints: ['There was no north-south momentum before the collision, so there is none after it.', 'The north component of the momentum of the first ball equals the south component of the momentum of the second: $m_1v_1\\sin\\theta_1 = m_2v_2\\sin\\theta_2$.'],
    solution: [
      `First ball, north: $${c.m1} \\times ${c.v1} \\times \\sin ${c.th1}° = ${num(c.y1, 3)}$ ${P}`,
      `Second ball, south: $${c.m2} \\times v_2 \\times \\sin ${th2}° = ${num(c.y1, 3)}$`,
      `$v_2 = \\dfrac{${num(c.y1, 3)}}{${c.m2} \\times \\sin ${th2}°} = ${num(v2, 2)}$ m/s`,
    ],
  };
}

const GLANCING_HINTS = ['Resolve the momentum of ball A after the collision into east and north components.', 'East: the two components after the collision add up to the momentum before it. North: they add up to zero.', 'Put the two components of ball B together with the Pythagorean theorem and the tangent.'];

function glancingFull(rng: Rng): GenOutput {
  const c = glancing(rng);
  return {
    prompt: `Ball A, of mass ${q(c.m1, 'kg')}, moves east at ${q(c.u, 'm/s')} and strikes ball B, of mass ${q(c.m2, 'kg')}, which is at rest. After the collision, ball A moves at ${q(c.v1, 'm/s')} in a direction ${c.th1}° north of east. Find the speed of ball B after the collision, to 2 decimal places, and its direction as an angle south of east, to 1 decimal place.`,
    parts: [rounded(c.v2, 2, 'm/s', 'Speed'), rounded(c.th2, 1, '° south of east', 'Angle')],
    hints: GLANCING_HINTS,
    solution: glancingSolution(c),
  };
}

function glancingLost(rng: Rng): GenOutput {
  const c = glancing(rng);
  const before = ke(c.m1, c.u);
  return {
    prompt: `Ball A, of mass ${q(c.m1, 'kg')}, moves east at ${q(c.u, 'm/s')} and strikes ball B, of mass ${q(c.m2, 'kg')}, which is at rest. After the collision, ball A moves at ${q(c.v1, 'm/s')} in a direction ${c.th1}° north of east. Find the speed of ball B after the collision, and the kinetic energy lost in the collision, each to 2 decimal places.`,
    parts: [rounded(c.v2, 2, 'm/s', 'Speed of ball B'), rounded(c.lost, 2, 'J', 'Kinetic energy lost')],
    hints: [...GLANCING_HINTS.slice(0, 2), 'Kinetic energy has no direction: use the speeds, not the components.'],
    solution: [
      ...glancingSolution(c).slice(0, 4),
      `Before: $\\dfrac{1}{2} \\times ${c.m1} \\times ${c.u}^2 = ${num(before, 2)}$ J. After: $\\dfrac{1}{2} \\times ${c.m1} \\times ${c.v1}^2 + \\dfrac{1}{2} \\times ${c.m2} \\times ${num(c.v2, 2)}^2 = ${num(before - c.lost, 2)}$ J.`,
      `Lost: $${num(before, 2)} - ${num(before - c.lost, 2)} = ${num(c.lost, 2)}$ J`,
    ],
  };
}

function threePieces(rng: Rng): GenOutput {
  const m1 = rng.pick([1, 1.5, 2, 3]);
  const m2 = rng.pick([1, 2, 2.5, 3]);
  const m3 = rng.pick([1, 1.5, 2, 4]);
  const v1 = rng.pick([4, 5, 6, 8]);
  const v2 = rng.pick([3, 4, 5, 6]);
  const px = clean(m1 * v1);
  const py = clean(m2 * v2);
  const p = Math.hypot(px, py);
  const th = Math.atan2(py, px) / RAD;
  return {
    prompt: `A shell at rest explodes into three pieces. A ${q(m1, 'kg')} piece moves east at ${q(v1, 'm/s')}, and a ${q(m2, 'kg')} piece moves north at ${q(v2, 'm/s')}. Find the speed of the third piece, of mass ${q(m3, 'kg')}, to 2 decimal places, and its direction as an angle south of west, to 1 decimal place.`,
    parts: [rounded(p / m3, 2, 'm/s', 'Speed'), rounded(th, 1, '° south of west', 'Angle')],
    hints: ['The total momentum was zero before the explosion, so the three momenta add to zero.', 'The third piece must have west momentum equal to the east momentum of the first, and south momentum equal to the north momentum of the second.'],
    solution: [
      `East: $${m1} \\times ${v1} = ${px}$ ${P}. North: $${m2} \\times ${v2} = ${py}$ ${P}.`,
      `The third piece has ${q(px, P)} west and ${q(py, P)} south: $p = \\sqrt{${px}^2 + ${py}^2} = ${num(p, 3)}$ ${P}`,
      `$v = \\dfrac{${num(p, 3)}}{${m3}} = ${num(p / m3, 2)}$ m/s`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${py}}{${px}}\\right) = ${num(th, 1)}°$ south of west`,
    ],
  };
}

export const COLLISION_SKILLS: SkillDef[] = [
  skill({ id: 'p30-conservation', name: 'Conservation of momentum in collisions', description: 'Use the conservation of momentum to find a velocity or a mass in a collision along one line.', outcomes: ['30-A2'], lessonId: L(3), calculator: true, gen: bank([stickAtRest, stickBothMoving, either(bounceUnknown, unknownMass)], ['The total momentum just after a collision equals the total momentum just before it: $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$']) }),
  skill({ id: 'p30-explosion', name: 'Recoil and explosions', description: 'Find the velocities of objects that push apart or explode, from rest or while moving.', outcomes: ['30-A2'], lessonId: L(3), calculator: true, gen: bank([either(pushApart, fromBank(EXPLOSION_IDEAS, ['The forces of an explosion act inside the system, so they cannot change its total momentum.'])), either(recoilGrams, astronautThrow, cannonRecoil), either(movingSplit, thrownFromMoving)], ['The total momentum after an explosion equals the total momentum before it, which is zero if everything started at rest']) }),
  skill({ id: 'p30-collision-energy', name: 'Kinetic energy in collisions', description: 'Compare the kinetic energy before and after a collision, say whether it is elastic or inelastic, and find the energy lost.', outcomes: ['30-A2'], lessonId: L(4), calculator: true, gen: bank([either(stickEnergyLoss, fromBank(ENERGY_IDEAS, ['Momentum is conserved in every collision. Kinetic energy is conserved only in an elastic one.'])), classify, either(percentLost, ballisticPendulum)], ['Kinetic energy is $\\dfrac{1}{2}mv^2$ for each object, added as plain numbers']) }),
  skill({ id: 'p30-elastic', name: 'Elastic collisions', description: 'Find the velocities after an elastic head-on collision, and the kinetic energy passed from one object to the other.', outcomes: ['30-A2'], lessonId: L(4), calculator: true, gen: bank([either(equalMassSwap, fromBank(ELASTIC_IDEAS, ['An elastic collision conserves both the total momentum and the total kinetic energy.'])), elasticAtRest, either(elasticBothMoving, energyTransferred)], [`For an elastic head-on collision with a target at rest: ${ELASTIC_RULES}`]) }),
  skill({ id: 'p30-momentum-components', name: 'Momentum at right angles', description: 'Resolve a momentum into components, add momenta at right angles, and find the velocity of objects that collide at right angles and stick.', outcomes: ['30-A2'], lessonId: L(5), calculator: true, gen: bank([either(momentumComponents, perpendicularTotal), stickPerpendicular, either(crashReconstruction, perpendicularEnergy)], ['Momentum is conserved in each direction separately: work with east and north components']) }),
  skill({ id: 'p30-momentum-2d', name: 'Glancing collisions and explosions', description: 'Use the conservation of momentum in each direction for glancing collisions and for explosions in two dimensions.', outcomes: ['30-A2'], lessonId: L(5), calculator: true, gen: bank([either(glancingBalance, fromBank(TWO_D_IDEAS, ['Momentum is conserved in each direction separately.'])), glancingFull, either(threePieces, glancingLost)], ['Momentum is conserved in each direction separately: work with east and north components']) }),
];
