import type { AtomsEl, AtomsPhase, Tone } from '@/video/script.ts';

// Atoms for Chemistry 10, drawn by src/video/atoms.ts: electrons circle in their shells, and a clip
// takes electrons away or adds them, so the charge appears as protons and electrons stop balancing.

/** The noble gases helium, neon and argon, each with a full outer shell. */
export const nobleGases = (id: string, height = 380): AtomsEl => ({
  kind: 'atoms',
  id,
  span: [21, 7],
  atoms: [
    { id: 'he', symbol: 'He', protons: 2, at: [3.5, 3.5], tone: 'good', name: 'helium' },
    { id: 'ne', symbol: 'Ne', protons: 10, at: [10.5, 3.5], tone: 'good', name: 'neon' },
    { id: 'ar', symbol: 'Ar', protons: 18, at: [17.5, 3.5], tone: 'good', name: 'argon' },
  ],
  clips: {},
  height,
});

/**
 * One atom that becomes an ion in the clip `ion`: it loses `change` outer electrons (they drift
 * away), or with a negative `change` gains that many.
 */
export const oneIon = (id: string, a: { symbol: string; protons: number; name: string; tone?: Tone }, change: number, height = 380): AtomsEl => {
  const turn: AtomsPhase = change > 0 ? { dur: 1 + change, give: [{ from: 'a', to: null, n: change }] } : { dur: 1 - change * 0.8, fill: { a: a.protons - change } };
  return {
    kind: 'atoms',
    id,
    span: [10, 7],
    atoms: [{ id: 'a', symbol: a.symbol, protons: a.protons, at: [5, 3.5], tone: a.tone ?? (change > 0 ? 'brand' : 'good'), name: a.name }],
    clips: { ion: { phases: [{ dur: 1 }, turn] } },
    poster: 'ion',
    height,
  };
};

type Side = { symbol: string; protons: number; name: string; tone?: Tone };

/**
 * Two atoms that slide together until their outer shells overlap, then share `n` electrons each
 * (n = 1 a single bond, 2 a double, 3 a triple) in the clip `share`. `gap` is the distance between
 * the nuclei once bonded: a little less than the two outer shells' radii added together.
 */
export const twoShare = (id: string, a: Side, b: Side, gap: number, n = 1, height = 380): AtomsEl => {
  const w = 15;
  const y = 3.6;
  return {
    kind: 'atoms',
    id,
    span: [w, 7.2],
    atoms: [
      { id: 'a', symbol: a.symbol, protons: a.protons, at: [3, y], tone: a.tone ?? 'good', name: a.name },
      { id: 'b', symbol: b.symbol, protons: b.protons, at: [w - 3, y], tone: b.tone ?? 'adj', name: b.name },
    ],
    clips: {
      share: {
        phases: [
          { dur: 2, move: { a: [w / 2 - gap / 2, y], b: [w / 2 + gap / 2, y] } },
          { dur: 1 + n, share: [{ a: 'a', b: 'b', n }] },
        ],
      },
    },
    poster: 'share',
    height,
  };
};

/**
 * A polar bond: two atoms share a pair (clip `share`, as in `twoShare`), then the more
 * electronegative one, `b`, pulls the shared pair `by` of the way towards its nucleus (clip `pull`;
 * clip `go` plays both in turn). The `charges` part then marks `b` δ− and `a` δ+.
 */
export const polarShare = (id: string, a: Side, b: Side, gap: number, by: number, height = 380): AtomsEl => {
  const el = twoShare(id, a, b, gap, 1, height);
  const pull: AtomsPhase[] = [{ dur: 2.2, pull: [{ to: 'b', from: 'a', by }] }, { dur: 0.4 }];
  return { ...el, clips: { ...el.clips, pull: { phases: pull }, go: { phases: [...el.clips.share.phases, ...pull] } }, poster: 'go' };
};

/** Water: an oxygen atom shares a pair with each of two hydrogen atoms (clip `share`), bent. */
export const waterShare = (id: string, height = 400): AtomsEl => ({
  kind: 'atoms',
  id,
  span: [11, 6.8],
  atoms: [
    { id: 'o', symbol: 'O', protons: 8, at: [5.5, 3.2], tone: 'bad', name: 'oxygen', labelAbove: true },
    { id: 'h1', symbol: 'H', protons: 1, at: [1.4, 5.4], tone: 'adj', name: 'hydrogen' },
    { id: 'h2', symbol: 'H', protons: 1, at: [9.6, 5.4], tone: 'adj', name: 'hydrogen' },
  ],
  clips: {
    share: {
      phases: [
        { dur: 2, move: { h1: [3.76, 4.54], h2: [7.24, 4.54] } },
        { dur: 2, share: [{ a: 'o', b: 'h1', n: 1 }, { a: 'o', b: 'h2', n: 1 }] },
      ],
    },
  },
  poster: 'share',
  height,
});

/**
 * A central atom that shares one pair with each of its hydrogen atoms (clip `share`): carbon with
 * four (methane), nitrogen with three (ammonia). The hydrogen atoms come in from the sides.
 */
export const hydride = (id: string, centre: { symbol: string; protons: number; name: string; tone?: Tone }, hydrogens: number, height = 460): AtomsEl => {
  const c: [number, number] = [6, 4.2];
  const dirs: Array<[number, number]> = [[0, -1], [1, 0], [0, 1], [-1, 0]].slice(0, hydrogens) as Array<[number, number]>;
  const far = 4;
  const near = 2.25;
  const hs = dirs.map(([dx, dy], i) => ({ id: `h${i + 1}`, from: [c[0] + dx * far, c[1] + dy * far * 0.9] as [number, number], to: [c[0] + dx * near, c[1] + dy * near] as [number, number] }));
  return {
    kind: 'atoms',
    id,
    span: [12, 8.4],
    atoms: [
      { id: 'c', symbol: centre.symbol, protons: centre.protons, at: c, tone: centre.tone ?? 'good', name: centre.name },
      ...hs.map((h) => ({ id: h.id, symbol: 'H', protons: 1, at: h.from, tone: 'adj' as Tone })),
    ],
    clips: {
      share: {
        phases: [
          { dur: 2, move: Object.fromEntries(hs.map((h) => [h.id, h.to])) },
          { dur: 1 + hydrogens * 0.6, share: hs.map((h) => ({ a: 'c', b: h.id, n: 1 })) },
        ],
      },
    },
    poster: 'share',
    height,
  };
};

/**
 * Atoms that start with no electrons (`[id, symbol, protons, name, tone]`), in a row, and the clip
 * `fill` gives each in turn as many electrons as it has protons: along a period, each has one more
 * than the last; down a group, each has one more shell. Used by Chemistry 8 and Chemistry 10.
 */
export const fillRow = (id: string, row: Array<[string, string, number, string, Tone]>, o: { gap?: number; height?: number; each?: number } = {}): AtomsEl => {
  const gap = o.gap ?? 4;
  const tall = Math.max(...row.map(([, , p]) => (p > 18 ? 4 : p > 10 ? 3 : p > 2 ? 2 : 1)));
  const h = 1.2 * tall + 2.4;
  return {
    kind: 'atoms',
    id,
    span: [gap * row.length, h],
    atoms: row.map(([aid, symbol, protons, name, tone], i) => ({ id: aid, symbol, protons, electrons: 0, at: [gap / 2 + i * gap, h / 2] as [number, number], tone, name })),
    clips: { fill: { phases: [{ dur: 0.5 }, ...row.map(([aid, , protons]) => ({ dur: o.each ?? 1.4, fill: { [aid]: protons } }))] } },
    poster: 'fill',
    height: o.height ?? 340,
  };
};

/** Period two, lithium to neon, filling one atom after another (clip `fill`). */
export const periodTwo = (id: string, height = 340): AtomsEl =>
  fillRow(
    id,
    [
      ['li', 'Li', 3, 'lithium', 'opp'],
      ['be', 'Be', 4, 'beryllium', 'opp'],
      ['b', 'B', 5, 'boron', 'adj'],
      ['c', 'C', 6, 'carbon', 'adj'],
      ['n', 'N', 7, 'nitrogen', 'adj'],
      ['o', 'O', 8, 'oxygen', 'adj'],
      ['f', 'F', 9, 'fluorine', 'adj'],
      ['ne', 'Ne', 10, 'neon', 'good'],
    ],
    { height },
  );
