import { describe, expect, it } from 'vitest';
import { atomShells, electronAngles, energyDiagram, lewis, particles, periodicTable } from './chem.ts';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';

const figures: Record<string, Part> = {
  sodium: atomShells({ name: 'na', protons: 11, neutrons: 12, shells: [2, 8, 1] }),
  water: lewis({
    atoms: [
      { id: 'O', symbol: 'O', at: [0, 0], dots: [2, 0, 0, 2] },
      { id: 'H1', symbol: 'H', at: [1.2, -1.1] },
      { id: 'H2', symbol: 'H', at: [-1.2, -1.1] },
    ],
    bonds: [
      { from: 'O', to: 'H1' },
      { from: 'O', to: 'H2', dots: true },
    ],
  }),
  oxygen: lewis({ name: 'o2', atoms: [{ id: 'a', symbol: 'O', at: [0, 0], dots: [2, 0, 2, 2] }, { id: 'b', symbol: 'O', at: [1.6, 0], dots: [2, 2, 2, 0] }], bonds: [{ from: 'a', to: 'b', order: 2 }] }),
  chloride: lewis({ atoms: [{ id: 'Cl', symbol: 'Cl', at: [0, 0], dots: [2, 2, 2, 2] }], charge: '-' }),
  solid: particles({ state: 'solid' }),
  liquid: particles({ name: 'l', state: 'liquid', open: true }),
  air: particles({ name: 'air', state: 'gas', kinds: [{ id: 'n2', tone: 'adj', count: 8, atoms: 2 }, { id: 'o2', tone: 'bad', count: 2, atoms: 2 }] }),
  exo: energyDiagram({ reactants: 4, products: 1.5, peak: 5.5 }),
  table: periodicTable({ name: 't', numbers: true, highlights: [{ id: 'alkali', cells: ['Li', 'Na', 'K'], tone: 'opp' }] }),
  big: periodicTable({ upTo: 54 }),
};

const part = (p: Part, id: string) => p.items.find((i) => i.id === id);

describe('chemistry figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, p) => {
    const ids = p.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of p.items) for (const name of itemPoints(item)) expect(p.points).toHaveProperty([name]);
  });

  it('puts electrons at the four sides, two opposite each other, then in pairs', () => {
    const deg = (list: number[]) => list.map((a) => Math.round((a * 180) / Math.PI));
    expect(deg(electronAngles(1, 0))).toEqual([90]);
    expect(deg(electronAngles(2, 0))).toEqual([90, -90]);
    expect(deg(electronAngles(4, 0))).toEqual([90, -90, 0, 180]);
    // Six electrons: the top and bottom get a pair, the right and left keep one each.
    expect(deg(electronAngles(6, (20 * Math.PI) / 180))).toEqual([100, -80, 0, 180, 80, -100]);
    expect(electronAngles(8, 0.2)).toHaveLength(8);
  });

  it('draws a shell for each number, with that many electrons on it', () => {
    const na = figures.sodium;
    for (const [k, count] of [[1, 2], [2, 8], [3, 1]]) {
      expect(na.items.filter((i) => i.group === `na-shell-${k}` && i.kind === 'label')).toHaveLength(count);
      expect(part(na, `na-ring-${k}`)).toMatchObject({ kind: 'curve', closed: true, group: `na-shell-${k}` });
    }
    expect(part(na, 'na-nucleus-label')).toMatchObject({ tex: '\\begin{gathered}11p^+\\\\ 12n^0\\end{gathered}', group: 'na-nucleus' });
    expect(part(atomShells({ nucleus: '\\text{Na}', shells: [1] }), 'nucleus-label')).toMatchObject({ tex: '\\text{Na}' });
    // The lone outer electron sits at the top of the third shell, 1.4 + 3 × 1.1 from the centre.
    expect(na.points['na-e3-0'][0]).toBeCloseTo(0);
    expect(na.points['na-e3-0'][1]).toBeCloseTo(4.7);
  });

  it('draws bonds as lines or shared dots, lone pairs beside each atom, and brackets for an ion', () => {
    const w = figures.water;
    expect(w.items.filter((i) => i.group === 'O-dots')).toHaveLength(4);
    expect(part(w, 'bond-O-H1-0')).toMatchObject({ kind: 'line', group: 'bond-O-H1' });
    expect(w.items.filter((i) => i.group === 'bond-O-H2')).toHaveLength(2);
    expect(part(w, 'O')).toMatchObject({ tex: '\\text{O}', place: 'center' });
    expect(figures.oxygen.items.filter((i) => i.group === 'o2-bond-a-b')).toHaveLength(2);
    const cl = figures.chloride;
    expect(cl.items.filter((i) => i.group === 'bracket' && i.kind === 'line')).toHaveLength(6);
    expect(part(cl, 'charge')).toMatchObject({ tex: '-', place: 'above right' });
    // A single atom is drawn at the scale of a structure three units wide.
    const xs = Object.values(cl.points).map((p) => p[0]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThanOrEqual(3);
    expect(() => lewis({ atoms: [{ id: 'a', symbol: 'C', at: [0, 0] }], bonds: [{ from: 'a', to: 'b' }] })).toThrow('no atom "b"');
  });

  it('keeps every particle inside its container, and gas particles apart', () => {
    for (const p of [figures.solid, figures.liquid, figures.air]) {
      const inside = p.items.filter((i) => i.kind === 'region').flatMap((i) => itemPoints(i).map((name) => p.points[name]));
      expect(inside.length).toBeGreaterThan(0);
      for (const [x, y] of inside) {
        expect(x).toBeGreaterThan(0);
        expect(x).toBeLessThan(6);
        expect(y).toBeGreaterThan(0);
        expect(y).toBeLessThan(6);
      }
    }
    expect(figures.solid.items.filter((i) => i.kind === 'region')).toHaveLength(16);
    // Air: 8 nitrogen and 2 oxygen molecules, two atoms each.
    expect(figures.air.items.filter((i) => i.group === 'air-n2' && i.kind === 'region')).toHaveLength(16);
    expect(figures.air.items.filter((i) => i.group === 'air-o2' && i.kind === 'region')).toHaveLength(4);
    expect(part(figures.liquid, 'l-lid')).toBeUndefined();
    expect(part(figures.solid, 'lid')).toMatchObject({ group: 'box' });
    // The same seed places them the same way every time.
    expect(particles({ state: 'gas', seed: 3 })).toEqual(particles({ state: 'gas', seed: 3 }));
  });

  it('draws an exothermic reaction with ΔH pointing down and Ea up to the top of the hump', () => {
    const e = figures.exo;
    expect(part(e, 'dh-arrow')).toMatchObject({ label: '\\Delta H', tone: 'good', arrow: true, group: 'dh' });
    expect(e.points['dh-c'][1]).toBeCloseTo(1.5);
    expect(e.points['ea-c'][1]).toBeCloseTo(5.5);
    // The hump reaches the peak and no higher; the labels sit on the open side of each level.
    expect(Math.max(...Object.entries(e.points).filter(([k]) => /^k\d+$/.test(k)).map(([, p]) => p[1]))).toBeCloseTo(5.5, 1);
    expect(part(e, 'reactants')).toMatchObject({ place: 'above right' });
    expect(part(e, 'products')).toMatchObject({ place: 'below left' });
    const endo = energyDiagram({ reactants: 1, products: 3, peak: 5 });
    expect(part(endo, 'dh-arrow')).toMatchObject({ tone: 'bad' });
    expect(part(endo, 'products')).toMatchObject({ place: 'above left' });
  });

  it('lays out the main-group elements by period and group, with highlights', () => {
    const t = figures.table;
    expect(part(t, 't-Na')).toMatchObject({ tex: '\\overset{11}{\\text{Na}}', group: 't-table' });
    expect(t.points['t-Na-c']).toEqual([0.5, 1.5]);
    expect(part(t, 't-group-18')).toMatchObject({ tex: '18' });
    expect(t.items.filter((i) => i.group === 't-alkali')).toHaveLength(3);
    expect(part(t, 't-Ga')).toBeUndefined();
    expect(part(figures.big, 'Xe')).toBeDefined();
    expect(() => periodicTable({ highlights: [{ id: 'x', cells: ['Br'], tone: 'opp' }] })).toThrow('no cell "Br"');
  });
});
