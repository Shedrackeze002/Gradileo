import type { ScatterEl } from '@/video/script.ts';

/**
 * Rutherford's gold foil (src/video/scatter.ts): ten shots that all go straight through (clip
 * `first`), then fourteen more (clip `rest`), of which shot 14 is turned aside a little, shot 17
 * bounces back and shot 20 is turned through most of a right angle. Each clip ends with time for
 * the last shots to cross the picture. Used by Chemistry 9 and Chemistry 10.
 */
export const goldFoilShots = (id: string, height = 540): ScatterEl => ({
  kind: 'scatter',
  id,
  shots: 24,
  close: [
    { shot: 14, miss: 0.03 },
    { shot: 17, miss: -0.0005 },
    { shot: 20, miss: 0.008 },
  ],
  clips: {
    first: { phases: [{ dur: 7, fire: 10 }, { dur: 5 }] },
    rest: { phases: [{ dur: 9, fire: 14 }, { dur: 5 }] },
  },
  poster: 'rest',
  height,
});
