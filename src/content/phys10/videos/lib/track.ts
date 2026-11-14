import type { MotionForce, MotionPhase } from '@/video/script.ts';

// Small helpers shared by the Grade 10 Physics videos of Unit 1, where things move along a track
// before forces are taught: the motion is still worked out by src/video/motion.ts, but the forces
// behind it are not drawn.

/** A phase that gives bodies their velocities and lets them run for `dur` seconds. */
export const run = (dur: number, set: Record<string, number>): MotionPhase => ({ dur, set });

/** Bodies brought to rest where they are (an instant, so the clock does not move on). */
export const halt = (...ids: string[]): MotionPhase => ({ dur: 0.001, set: Object.fromEntries(ids.map((id) => [id, 0])) });

/** A steady force that speeds a body up or slows it down, acting without an arrow (a = n ÷ mass). */
export const drive = (on: string, n: number): MotionForce => ({ on, name: 'Drive', n, hidden: true });

/** Brakes: a force that only slows the body, and stops with it. */
export const brake = (on: string, n: number): MotionForce => ({ on, name: 'Brakes', n: -Math.abs(n), resist: true, hidden: true });
