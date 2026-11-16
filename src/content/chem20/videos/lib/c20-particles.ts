import type { ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';

// Simulated particles for Chemistry 20 (src/video/particles.ts), shared by several videos.

/**
 * Liquids heated side by side, one box each, whose molecules attract one another with different
 * strengths (`bond`: 1 is the simulation's usual). They share one heater: the clip `heat` warms
 * every box in steps, and the liquid with the weakest forces between its molecules boils first.
 * In the simulation a liquid boils at a temperature of about 0.9 × its `bond`; gravity is scaled with
 * the forces (`heavy` = `bond`), so a weakly held liquid is not pinned to the floor once it boils.
 */
export const boilingRace = (id: string, liquids: Array<{ id: string; label: string; bond: number; tone: Tone; n?: number }>, height = 400): ParticlesEl => {
  const weakest = Math.min(...liquids.map((l) => l.bond));
  const start = 0.36 * Math.max(...liquids.map((l) => l.bond));
  const steps = [...liquids].sort((a, b) => a.bond - b.bond).map((l) => 0.9 * l.bond + 0.2 * weakest);
  const all = (t: number) => Object.fromEntries(liquids.map((l) => [l.id, t]));
  return {
    kind: 'particles',
    id,
    boxes: liquids.map((l): ParticleBox => ({ id: l.id, state: 'liquid', width: 8, height: 10, temp: start, kinds: [{ n: l.n ?? 24, bond: l.bond, heavy: l.bond, tone: l.tone }], label: l.label })),
    clips: { heat: { phases: steps.flatMap((t) => [{ dur: 3, heat: all(t) }, { dur: 4 }]) } },
    thermometers: true,
    height,
  };
};

/**
 * Substances side by side at one temperature, each ball standing for a whole molecule, with the
 * forces between molecules set by `bond`: weak forces leave a gas, stronger ones a liquid, and the
 * strongest a solid, all at the same temperature (shown on the thermometers). In the simulation a
 * substance melts at about 0.33 × its `bond` and boils at about 0.9 × its `bond`. A gas feels no
 * gravity here, so its molecules fill the box.
 */
export const sameTemperature = (id: string, temp: number, subs: Array<{ id: string; label: string; bond: number; tone: Tone; n?: number }>, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: subs.map((s): ParticleBox => {
    const r = temp / s.bond;
    const state = r < 0.33 ? 'solid' : r < 0.9 ? 'liquid' : 'gas';
    return { id: s.id, state, width: 8, height: 9, temp, kinds: [{ n: s.n ?? (state === 'gas' ? 14 : 24), bond: s.bond, heavy: state === 'gas' ? 0 : s.bond, tone: s.tone }], label: s.label };
  }),
  clips: {},
  thermometers: true,
  height,
});

/**
 * Water as whole molecules (an oxygen atom and two hydrogen atoms, bonded), heated to boiling by the
 * clip `boil`: the molecules fly apart from one another, but each one stays whole.
 */
export const boilingWater = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'w',
      state: 'liquid',
      width: 10,
      height: 10,
      temp: 0.3,
      kinds: [
        { n: 0, bond: 1, heavy: 1, tone: 'bad', name: 'oxygen' },
        { n: 0, bond: 1, heavy: 1, size: 0.8, tone: 'theta', name: 'hydrogen' },
      ],
      molecules: [{ atoms: [0, 1, 1], n: 10, bent: true }],
      label: 'water',
    },
  ],
  clips: { boil: { phases: [{ dur: 4, heat: { w: 2.5 } }, { dur: 8 }] } },
  thermometers: true,
  height,
});
