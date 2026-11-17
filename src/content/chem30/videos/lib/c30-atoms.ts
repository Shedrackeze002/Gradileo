import type { AtomsEl, AtomsPhase, Tone } from '@/video/script.ts';

// Atoms for Chemistry 30's redox videos, drawn by src/video/atoms.ts: electrons circle in their
// shells, and a clip moves them from the atom that is oxidized to the atom that is reduced. Only the
// first twenty elements are drawn this way (their shells fill 2, 8, 8, 2).

export interface RedoxAtom {
  id: string;
  symbol: string;
  protons: number;
  name: string;
  at: [number, number];
  tone?: Tone;
}

/**
 * Atoms that pass electrons (clip `give`): after a pause, each step in turn moves `n` outer
 * electrons from one atom to another (or away, with `to: null`), or fills an atom up to a number of
 * electrons (an electron arriving from elsewhere).
 */
export const redox = (id: string, atoms: RedoxAtom[], steps: Array<{ from: string; to: string | null; n: number } | { fill: string; to: number }>, span: [number, number] = [20, 7.2], height = 400): AtomsEl => ({
  kind: 'atoms',
  id,
  span,
  atoms: atoms.map((a) => ({ id: a.id, symbol: a.symbol, protons: a.protons, at: a.at, tone: a.tone ?? 'brand', name: a.name })),
  clips: {
    give: {
      phases: [
        { dur: 1.5 },
        ...steps.map((s): AtomsPhase => ('fill' in s ? { dur: 2, fill: { [s.fill]: s.to } } : { dur: 1.5 + s.n, give: [{ from: s.from, to: s.to, n: s.n }] })),
        { dur: 1 },
      ],
    },
  },
  poster: 'give',
  height,
});
