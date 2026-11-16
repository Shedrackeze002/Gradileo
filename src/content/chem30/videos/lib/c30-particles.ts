import type { ParticleBox, ParticlesEl } from '@/video/script.ts';

/**
 * Dinitrogen tetroxide and nitrogen dioxide in a sealed tube. Each nitrogen dioxide molecule is
 * drawn as one particle: kind 0 is a free one (brown), kind 1 one half of a dinitrogen tetroxide
 * molecule (pale, two bonded together). A dinitrogen tetroxide molecule that is hit hard enough
 * splits into two nitrogen dioxide molecules; two nitrogen dioxide molecules that meet pair up.
 */
export const n2o4Box = (id: string, o: { dimers?: number; free?: number; label?: string; split?: number; temp?: number; reach?: number; pair?: number; heat?: number } = {}): ParticleBox => ({
  id,
  state: 'gas',
  width: 11,
  height: 8,
  temp: o.temp ?? 0.6,
  kinds: [
    { n: o.free ?? 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'opp', name: 'nitrogen dioxide' },
    { n: 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'adj', name: 'dinitrogen tetroxide' },
  ],
  molecules: o.dimers ? [{ atoms: [1, 1], n: o.dimers }] : [],
  reactions: [
    // Forward: a dinitrogen tetroxide molecule hit hard enough splits in two.
    { a: 1, b: 1, to: [0, 1], free: [0, null], chance: o.split ?? 0.01, reach: o.reach ?? 1.15, heat: -(o.heat ?? 0) },
    { a: 1, b: 0, to: [0, 0], free: [0, null], chance: o.split ?? 0.01, reach: o.reach ?? 1.15, heat: -(o.heat ?? 0) },
    // Reverse: two nitrogen dioxide molecules that meet pair up.
    { a: 0, b: 0, to: [1, 1], join: true, reach: o.reach ?? 1.15, chance: o.pair ?? 0.01, heat: o.heat ?? 0 },
  ],
  tally: { kinds: [0], label: 'nitrogen dioxide molecules' },
  label: o.label ?? 'sealed tube',
});

/** Splitting and pairing chances that settle with about a quarter of the molecules split, in about ten seconds. */
const RATES = { split: 0.0001, pair: 0.001 };

export const n2o4 = (id: string, o: Parameters<typeof n2o4Box>[1] & { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [n2o4Box('t', { ...RATES, dimers: 30, ...o })],
  clips: { go: { phases: [{ dur: 20 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 440,
});

/** The same tube started two ways: all dinitrogen tetroxide, and all nitrogen dioxide. */
export const n2o4BothWays = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [n2o4Box('a', { ...RATES, dimers: 20, label: 'start: all dinitrogen tetroxide' }), n2o4Box('b', { ...RATES, free: 40, label: 'start: all nitrogen dioxide' })],
  clips: { go: { phases: [{ dur: 18 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 400,
});
