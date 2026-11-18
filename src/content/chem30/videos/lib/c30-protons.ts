import type { MoleculesEl, MolAtom } from '@/video/script.ts';

// Brønsted–Lowry acids and bases as balls and sticks (src/video/molecules.ts): an acid molecule
// moves up to a base, and its hydrogen ion, a bare proton (the green ball `Hp`), leaves the acid
// and bonds to the base. The bond it leaves turns red and fades; the new one comes in green.

type At = [number, number];
interface Side {
  /** The particle's atoms, by name, with their places relative to its centre (y down). */
  atoms: Record<string, { el: MolAtom; at: At }>;
  /** Its bonds, not counting the proton's. */
  bonds: string;
  /** The atom the proton is bonded to (in the acid) or bonds to (in the base). */
  holds: string;
}

const CA: At = [2.2, 2.6];
const CB: At = [6.8, 2.6];
const add = (c: At, p: At): At => [Math.round((c[0] + p[0]) * 1000) / 1000, Math.round((c[1] + p[1]) * 1000) / 1000];
const polar = (len: number, deg: number): At => [len * Math.cos((deg * Math.PI) / 180), -len * Math.sin((deg * Math.PI) / 180)];

/** `conjugates: false` names the new ions plainly ("F⁻: fluoride ion") instead of as conjugates. */
interface Options {
  conjugates?: boolean;
  height?: number;
}

const place = (side: Side, c: At) => Object.fromEntries(Object.entries(side.atoms).map(([k, a]) => [k, add(c, a.at)]));

/**
 * An acid gives a proton to a base (clip `go`): the acid moves up to the base, then the proton
 * moves across to the base's atom `holds`. The names under them go from acid and base to the
 * conjugate base and conjugate acid; the charges appear on the two new ions.
 */
const transfer = (
  id: string,
  acid: Side & { proton: number },
  base: Side,
  names: { acid: string; base: string; conjAcid: string; conjBase: string; plainAcid: string; plainBase: string },
  charges: Record<string, number>,
  o: Options,
): MoleculesEl => {
  const height = o.height ?? 380;
  const [conjBase, conjAcid] = o.conjugates === false ? [names.plainBase, names.plainAcid] : [names.conjBase, names.conjAcid];
  const atoms: Record<string, MolAtom> = { Hp: { el: 'H', tone: 'good' } };
  for (const s of [acid, base]) for (const [k, a] of Object.entries(s.atoms)) atoms[k] = a.el;
  const before = `${acid.bonds} ${base.bonds} ${acid.holds}-Hp`.trim();
  const after = `${acid.bonds} ${base.bonds} ${base.holds}-Hp`.trim();
  const near: At = [CA[0] + 1.3, CA[1]];
  const y = 4.4;
  return {
    kind: 'molecules',
    id,
    atoms,
    stages: {
      apart: {
        at: { ...place(acid, CA), ...place(base, CB), Hp: add(CA, [acid.proton, 0]) },
        bonds: before,
        names: [
          { text: names.acid, at: [CA[0] + 0.3, y], tone: 'opp' },
          { text: names.base, at: [CB[0] + 0.2, y], tone: 'adj' },
        ],
      },
      meet: { at: { ...place(acid, near), ...place(base, CB), Hp: add(near, [acid.proton, 0]) }, bonds: before },
      after: {
        at: { ...place(acid, CA), ...place(base, CB), Hp: add(CB, [-1, 0]) },
        bonds: after,
        charges,
        names: [
          { text: conjBase, at: [CA[0] + 0.3, y], tone: 'opp' },
          { text: conjAcid, at: [CB[0] + 0.2, y], tone: 'adj' },
        ],
      },
    },
    start: 'apart',
    clips: { go: { phases: [{ dur: 0.6 }, { dur: 2, to: 'meet' }, { dur: 2.6, to: 'after' }, { dur: 1.2 }] } },
    span: [9.4, 5],
    poster: 'go',
    height,
  };
};

/** Water giving a proton (its other hydrogen up and to the left), or taking one (both hydrogens to the right). */
const waterGives = (o: string, h: string): Side & { proton: number } => ({ atoms: { [o]: { el: 'O', at: [0, 0] }, [h]: { el: 'H', at: polar(0.95, 104.5) } }, bonds: `${o}-${h}`, holds: o, proton: 0.95 });
const waterTakes = (o: string, h1: string, h2: string): Side => ({
  atoms: { [o]: { el: 'O', at: [0, 0] }, [h1]: { el: 'H', at: polar(0.95, 52) }, [h2]: { el: 'H', at: polar(0.95, -52) } },
  bonds: `${o}-${h1} ${o}-${h2}`,
  holds: o,
});
const ammonia: Side = {
  atoms: { N: { el: 'N', at: [0, 0] }, Ha: { el: 'H', at: polar(1, 75) }, Hb: { el: 'H', at: polar(1, 0) }, Hc: { el: 'H', at: polar(1, -75) } },
  bonds: 'N-Ha N-Hb N-Hc',
  holds: 'N',
};

/** Hydrogen fluoride gives a proton to water: hydronium and fluoride ions. */
export const hfAndWater = (id: string, o: Options = {}): MoleculesEl =>
  transfer(
    id,
    { atoms: { F: { el: 'F', at: [0, 0] } }, bonds: '', holds: 'F', proton: 0.95 },
    waterTakes('O', 'H1', 'H2'),
    { acid: 'HF: the acid', base: 'H₂O: the base', conjBase: 'F⁻: conjugate base', conjAcid: 'H₃O⁺: conjugate acid', plainBase: 'F⁻: fluoride ion', plainAcid: 'H₃O⁺: hydronium ion' },
    { F: -1, O: 1 },
    o,
  );

/** Water gives a proton to ammonia: ammonium and hydroxide ions. */
export const ammoniaAndWater = (id: string, o: Options = {}): MoleculesEl =>
  transfer(
    id,
    waterGives('O', 'H1'),
    ammonia,
    { acid: 'H₂O: the acid', base: 'NH₃: the base', conjBase: 'OH⁻: conjugate base', conjAcid: 'NH₄⁺: conjugate acid', plainBase: 'OH⁻: hydroxide ion', plainAcid: 'NH₄⁺: ammonium ion' },
    { O: -1, N: 1 },
    o,
  );

/** Hydrogen chloride gives a proton to ammonia: ammonium chloride, the white smoke. */
export const hclAndAmmonia = (id: string, o: Options = {}): MoleculesEl =>
  transfer(
    id,
    { atoms: { Cl: { el: 'Cl', at: [0, 0] } }, bonds: '', holds: 'Cl', proton: 1.2 },
    ammonia,
    { acid: 'HCl: the acid', base: 'NH₃: the base', conjBase: 'Cl⁻: conjugate base', conjAcid: 'NH₄⁺: conjugate acid', plainBase: 'Cl⁻: chloride ion', plainAcid: 'NH₄⁺: ammonium ion' },
    { Cl: -1, N: 1 },
    o,
  );

/** One water molecule gives a proton to another: hydronium and hydroxide ions. */
export const waterAndWater = (id: string, o: Options = {}): MoleculesEl =>
  transfer(
    id,
    waterGives('Oa', 'Ha'),
    waterTakes('Ob', 'H1', 'H2'),
    { acid: 'H₂O: the acid', base: 'H₂O: the base', conjBase: 'OH⁻: conjugate base', conjAcid: 'H₃O⁺: conjugate acid', plainBase: 'OH⁻: hydroxide ion', plainAcid: 'H₃O⁺: hydronium ion' },
    { Oa: -1, Ob: 1 },
    o,
  );
