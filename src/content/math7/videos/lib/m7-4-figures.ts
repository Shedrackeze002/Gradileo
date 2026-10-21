/**
 * Figures for the integer videos (adding and subtracting integers):
 *
 * - `intLine`: a horizontal number line of integers with moves along it. A move is a row of
 *   one-step hops (or one long arc) above the line, with an arrowhead at its end and its size
 *   written above it; labelled points ("start", "end") are marked on the line and named under the
 *   numbers.
 *
 * Two-colour counters and zero pairs come from the Grade 6 helpers (`counters`, `ids`), and the
 * thermometer and the vertical number line from `vertical`. Like the figures in `src/video/`, each
 * is built only from standard diagram parts and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** An integer as TeX, with its sign when `signed` (+3, −3, 0). */
const num = (v: number, signed = false) => (v > 0 && signed ? `+${v}` : String(v));

/**
 * A number line of integers from `min` to `max`, `length` units long, with a mark every `step`
 * and a number under every `every`-th mark (and always under 0, which is drawn taller, in white).
 * `signed` writes the positive numbers with a plus sign.
 *
 * Each move goes from `from` to `to`: hops of `hop` each (1 by default; 0 for one long arc), drawn
 * above the line, with an arrowhead on the last hop and `label` (TeX) above the middle of the move.
 * Each point is a dot on the line in its tone, with `tex` written under the numbers.
 *
 * Parts: `axis` (a group: the line, its marks and numbers), each point by its id (a group: the dot
 * `<id>-dot` and its label `<id>-tex`), and each move by its id (a group: its hops `<id>-<k>`, its
 * arrowhead `<id>-head` and its label `<id>-label`).
 */
export function intLine(o: {
  name?: string;
  min: number;
  max: number;
  step?: number;
  every?: number;
  length?: number;
  at?: P;
  signed?: boolean;
  points?: { id: string; value: number; tex: string; tone?: DiagramTone }[];
  moves?: { id: string; from: number; to: number; hop?: number; tone?: DiagramTone; label?: string }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const step = o.step ?? 1;
  const every = o.every ?? 1;
  const X = (v: number) => x0 + ((v - o.min) / (o.max - o.min)) * L;
  const unit = L / (o.max - o.min);
  const points: Record<string, P> = { [n('L')]: [x0 - 0.3, y0], [n('R')]: [x0 + L + 0.3, y0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') }];
  const count = Math.round((o.max - o.min) / step);
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * step;
    const zero = v === 0;
    const h = zero ? 0.3 : 0.2;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), y0 - h], [n(`t${i}b`)]: [X(v), y0 + h] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: zero ? 3.5 : 2.5, group: n('axis') });
    if (zero || (every > 0 && i % every === 0)) {
      points[n(`nb${i}`)] = [X(v), y0 - 0.22];
      items.push({ kind: 'label', id: n(`num${i}`), at: n(`nb${i}`), tex: num(v, o.signed), tone: zero ? 'ink' : 'muted', place: 'below', group: n('axis') });
    }
  }
  for (const m of o.moves ?? []) {
    const id = n(m.id);
    const tone = m.tone ?? 'theta';
    const size = m.hop === 0 ? Math.abs(m.to - m.from) : (m.hop ?? 1);
    const hops = Math.max(1, Math.round(Math.abs(m.to - m.from) / size));
    const dir = Math.sign(m.to - m.from);
    const span = size * unit;
    const peak = Math.min(1.5, Math.max(0.3, 0.32 * span + 0.08));
    let last: string[] = [];
    for (let k = 0; k < hops; k++) {
      const a = X(m.from + dir * k * size);
      const b = X(m.from + dir * (k + 1) * size);
      const names: string[] = [];
      for (let s = 0; s <= 14; s++) {
        const t = s / 14;
        const name = `${id}-${k}-${s}`;
        points[name] = [a + (b - a) * (0.06 + 0.88 * t), y0 + 0.14 + peak * Math.sin(Math.PI * (0.06 + 0.88 * t))];
        names.push(name);
      }
      items.push({ kind: 'curve', id: `${id}-${k}`, points: names, tone, weight: 3, group: id });
      last = names;
    }
    // The arrowhead: a short line along the end of the last hop, pointing where it lands.
    items.push({ kind: 'line', id: `${id}-head`, from: last[11], to: last[14], tone, weight: 3, arrow: true, group: id });
    if (m.label) {
      const mid = (X(m.from) + X(m.to)) / 2;
      points[`${id}-lab`] = [mid, y0 + 0.14 + peak + 0.08];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: m.label, tone, place: 'above', group: id });
    }
  }
  for (const p of o.points ?? []) {
    const id = n(p.id);
    const tone = p.tone ?? 'theta';
    Object.assign(points, { [`${id}-at`]: [X(p.value), y0], [`${id}-lab`]: [X(p.value), y0 - 0.95] });
    items.push(
      { kind: 'label', id: `${id}-dot`, at: `${id}-at`, tex: '', tone, place: 'center', dot: true, group: id },
      { kind: 'label', id: `${id}-tex`, at: `${id}-lab`, tex: p.tex, tone, place: 'below', group: id },
    );
  }
  return { points, items };
}

/** A label (TeX) at a point. Part: its `id` (in `group`, if given). */
export function note(o: { name?: string; id: string; at: P; tex: string; tone?: DiagramTone; place?: 'above' | 'below' | 'left' | 'right' | 'center'; group?: string }): Part {
  const n = namer(o.name);
  return {
    points: { [n(`${o.id}-at`)]: o.at },
    items: [{ kind: 'label', id: n(o.id), at: n(`${o.id}-at`), tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: n(o.group) } : {}) }],
  };
}

/** Where `intLine` puts a value (its x), for drawing beside it. */
export const xOn = (v: number, min: number, max: number, length = 12, x0 = 0) => x0 + ((v - min) / (max - min)) * length;
