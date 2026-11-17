import type { MotionEl, MotionForce } from '@/video/script.ts';

// Moving bodies for the extra chemistry lessons (src/video/motion.ts), drawn as a sketch.

const field = (on: string): MotionForce => ({ on, name: 'Electric field', n: 50, tone: 'hyp' });

/**
 * Time of flight: an ion of mass 25 and one of mass 100, with the same charge, are pushed by the
 * same electric force through the same 1 m accelerating region, so both gain the same kinetic
 * energy (force × distance). The light one leaves it at 2 m/s after 1 s, and the heavy one at
 * 1 m/s after 2 s; then both drift to the detector at 10 m, arriving at 5.25 s and 10.5 s. Four
 * times the mass takes twice the time, t ∝ √m (clips `push`, in slow motion, then `drift`; show the part `clock` to time them).
 */
export const timeOfFlight = (id: string, height = 360): MotionEl => ({
  kind: 'motion',
  id,
  span: [0, 10.6],
  height,
  plain: true,
  forceScale: 2,
  lanes: [{ label: 'Lighter ion, mass 25' }, { label: 'Heavier ion, mass 100' }],
  bodies: [
    { id: 'light', shape: 'ball', mass: 25, label: '25', x: 0.5, width: 0.8, tone: 'adj', lane: 0 },
    { id: 'heavy', shape: 'ball', mass: 100, label: '100', x: 0.5, width: 0.8, tone: 'opp', lane: 1 },
  ],
  clips: {
    push: {
      phases: [
        { dur: 1, slow: 2, forces: [field('light'), field('heavy')], note: 'Same push, same distance' },
        { dur: 1, slow: 2, forces: [field('heavy')], note: 'Same push, same distance' },
      ],
    },
    drift: {
      phases: [
        { dur: 3.25, slow: 1.2, note: 'Ion drift' },
        { dur: 5.25, slow: 1.2, set: { light: 0 }, note: 'Lighter ion detected: 5.25 s' },
        // The heavy ion stops at the detector, and the clock stops with it.
        { dur: 0.01, set: { heavy: 0 }, note: 'Heavier ion detected: 10.5 s' },
        { dur: 1.5, freeze: true, note: 'Heavier ion detected: 10.5 s' },
      ],
    },
  },
});
