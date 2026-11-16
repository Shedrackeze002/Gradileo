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
