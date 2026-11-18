/**
 * Helpers shared by the Grade 12 Physics generators. The rounded answers and the constants are the
 * ones Grade 11 Physics uses, so an answer is marked the same way in both courses.
 */
import { fixedChoice, part } from '../../helpers.ts';
import type { Part } from '../../../types.ts';

export { An, G, RAD, an, br, clean, direction, dpWords, round, rounded, sciPart, sciTex, SCI_TIP } from '../../phys20/gen/common.ts';

/** A line that motion happens along: its positive direction and its negative one, as a sentence says them. */
export interface Axis {
  pos: string;
  neg: string;
}
export const AXES: Axis[] = [
  { pos: 'east', neg: 'west' },
  { pos: 'north', neg: 'south' },
  { pos: 'to the right', neg: 'to the left' },
];
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** The direction of a signed quantity along an axis. */
export const way = (ax: Axis, v: number) => (v >= 0 ? ax.pos : ax.neg);
/** "Take east as the positive direction." */
export const positive = (ax: Axis) => `Take ${ax.pos} as the positive direction.`;
/** "Include a minus sign if it is west." */
export const minusIf = (ax: Axis, what = 'it is') => `Include a minus sign if ${what} ${ax.neg}.`;
/** A choice between the two directions of an axis. */
export const whichWay = (ax: Axis, v: number, label = 'Direction'): Part => part(fixedChoice([cap(ax.pos), cap(ax.neg)], v >= 0 ? 0 : 1), { label });
/** A signed number as a line of working writes it: +4, −2.5. */
export const signed = (x: number, dp = 2) => {
  const r = Math.round(x * 10 ** dp) / 10 ** dp;
  return r < 0 ? `-${String(-r)}` : `+${String(r)}`;
};
