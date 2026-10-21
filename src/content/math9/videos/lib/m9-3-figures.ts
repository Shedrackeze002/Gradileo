/**
 * Figures for the rational numbers videos, built only from standard diagram parts (labels, lines
 * and curves), so each goes into a diagram with `figure`:
 *
 * - `ratLine`: a number line for fractions and decimals, positive and negative. Small ticks every
 *   `step`, taller ticks with their numbers written under them (TeX, so a tick can read
 *   `-\tfrac34`), dots with labels above or below, arrows (moves) above the line for adding and
 *   multiplying, and thick spans for a distance from zero.
 *
 * Fraction strips come from `bar` (Grade 5 helpers) and thermometers from `vertical` (Grade 6
 * helpers).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A number as TeX: rounded so 0.1 steps read 0.3, not 0.30000000000000004. */
const show = (v: number) => String(Number(v.toFixed(6)));

/**
 * A number line from `min` to `max`, `length` units long (12 by default), with a small tick every
 * `step`. Each of `numbers` gets a taller tick and its TeX written under it; without `numbers`,
 * every whole number is numbered.
 *
 * Points are dots on the line, each with its label above (raised `lift` units, 0.3 by default) or
 * below the numbers (`below`). Moves are arcs above the line from one value to another, with an
 * arrowhead where they land and a label above the middle; `height` sets an arc's height and `base`
 * lifts it, to stack one move above another. Spans are thick stretches of the line.
 *
 * Parts: `axis` (a group: the line, its ticks and numbers), each point by its id (a group: the dot
 * `<id>-dot` and the label `<id>-tex`), each move by its id (a group: the arc `<id>-arc`, the
 * arrowhead `<id>-head` and the label `<id>-label`), and each span by its id.
 */
export function ratLine(o: {
  name?: string;
  min: number;
  max: number;
  step: number;
  length?: number;
  at?: P;
  numbers?: { value: number; tex: string; tone?: DiagramTone }[];
  points?: { id: string; value: number; tex: string; tone?: DiagramTone; below?: boolean; lift?: number }[];
  moves?: { id: string; from: number; to: number; tone?: DiagramTone; label?: string; height?: number; base?: number }[];
  spans?: { id: string; from: number; to: number; tone?: DiagramTone }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const X = (v: number) => x0 + ((v - o.min) / (o.max - o.min)) * L;
  const points: Record<string, P> = { [n('L')]: [x0 - 0.3, y0], [n('R')]: [x0 + L + 0.3, y0] };
  const items: DiagramItem[] = [];
  // Spans first, so the ticks and dots are drawn over them.
  for (const s of o.spans ?? []) {
    Object.assign(points, { [n(`${s.id}-a`)]: [X(s.from), y0], [n(`${s.id}-b`)]: [X(s.to), y0] });
    items.push({ kind: 'line', id: n(s.id), from: n(`${s.id}-a`), to: n(`${s.id}-b`), tone: s.tone ?? 'theta', weight: 10 });
  }
  items.push({ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') });
  const numbers = o.numbers ?? Array.from({ length: Math.floor(o.max) - Math.ceil(o.min) + 1 }, (_, k) => ({ value: Math.ceil(o.min) + k, tex: show(Math.ceil(o.min) + k), tone: undefined }));
  const numbered = (v: number) => numbers.some((m) => Math.abs(m.value - v) < 1e-9);
  const count = Math.round((o.max - o.min) / o.step);
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * o.step;
    const big = numbered(v);
    const zero = Math.abs(v) < 1e-9;
    const h = big ? 0.24 : 0.14;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), y0 - h], [n(`t${i}b`)]: [X(v), y0 + h] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: zero ? 3.5 : big ? 2.5 : 2, group: n('axis') });
  }
  numbers.forEach((m, k) => {
    points[n(`nb${k}`)] = [X(m.value), y0 - 0.26];
    const zero = Math.abs(m.value) < 1e-9;
    items.push({ kind: 'label', id: n(`num${k}`), at: n(`nb${k}`), tex: m.tex, tone: m.tone ?? (zero ? 'ink' : 'muted'), place: 'below', group: n('axis') });
  });
  for (const m of o.moves ?? []) {
    const id = n(m.id);
    const tone = m.tone ?? 'theta';
    const a = X(m.from);
    const b = X(m.to);
    const span = Math.abs(b - a);
    const peak = m.height ?? Math.min(1.3, Math.max(0.35, 0.3 * span + 0.15));
    const lift = y0 + 0.16 + (m.base ?? 0);
    const names: string[] = [];
    for (let s = 0; s <= 16; s++) {
      const t = 0.04 + (0.92 * s) / 16;
      const name = `${id}-${s}`;
      points[name] = [a + (b - a) * t, lift + peak * Math.sin(Math.PI * t)];
      names.push(name);
    }
    items.push({ kind: 'curve', id: `${id}-arc`, points: names, tone, weight: 3.5, group: id });
    items.push({ kind: 'line', id: `${id}-head`, from: names[13], to: names[16], tone, weight: 3.5, arrow: true, group: id });
    if (m.label) {
      points[`${id}-lab`] = [(a + b) / 2, lift + peak + 0.06];
      items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: m.label, tone, place: 'above', group: id });
    }
  }
  for (const p of o.points ?? []) {
    const id = n(p.id);
    const tone = p.tone ?? 'theta';
    Object.assign(points, { [`${id}-at`]: [X(p.value), y0], [`${id}-lab`]: [X(p.value), p.below ? y0 - 0.95 : y0 + (p.lift ?? 0.3)] });
    items.push(
      { kind: 'label', id: `${id}-dot`, at: `${id}-at`, tex: '', tone, place: 'center', dot: true, group: id },
      { kind: 'label', id: `${id}-tex`, at: `${id}-lab`, tex: p.tex, tone, place: p.below ? 'below' : 'above', group: id },
    );
  }
  return { points, items };
}

/** The ids of a figure's parts, `<fig>.<id>` for each id. */
export const parts = (fig: string, ...ids: string[]): string[] => ids.map((id) => `${fig}.${id}`);
