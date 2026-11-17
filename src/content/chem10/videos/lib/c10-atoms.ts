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
