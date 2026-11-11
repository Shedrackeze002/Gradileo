/**
 * A normal curve for the More Mathematics Topics statistics videos, built from standard diagram
 * parts, so it goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** Diagram units per standard deviation, and the height of the peak. */
const SX = 1.6;
const H = 4;
const y = (z: number) => H * Math.exp((-z * z) / 2);

/**
 * A bell curve from z = −3.2 to 3.2 over a baseline, with shaded areas between given z values
 * and ticks with labels (TeX) below the baseline.
 *
 * Parts: `<name>-curve` and `<name>-base` (the group `<name>-axes`), each shaded area
 * `<name>-<id>` (a group), and each tick `<name>-t<i>` (a group: the tick and its label).
 */
export function normalCurve(name: string, o: { areas?: { id: string; from: number; to: number; tone?: DiagramTone; label?: string }[]; ticks?: { z: number; tex: string; tone?: DiagramTone }[] } = {}): Part {
  const n = (s: string) => `${name}-${s}`;
  const points: Record<string, P> = { [n('b0')]: [-3.4 * SX, 0], [n('b1')]: [3.4 * SX, 0] };
  const items: DiagramItem[] = [];
  const steps = 64;
  const keys: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const z = -3.2 + (6.4 * i) / steps;
    points[n(`c${i}`)] = [z * SX, y(z)];
    keys.push(n(`c${i}`));
  }
  for (const a of o.areas ?? []) {
    const from = Math.max(a.from, -3.2);
    const to = Math.min(a.to, 3.2);
    const ring: string[] = [];
    const count = 32;
    points[n(`${a.id}-s`)] = [from * SX, 0];
    ring.push(n(`${a.id}-s`));
    for (let i = 0; i <= count; i++) {
      const z = from + ((to - from) * i) / count;
      points[n(`${a.id}-${i}`)] = [z * SX, y(z)];
      ring.push(n(`${a.id}-${i}`));
    }
    points[n(`${a.id}-e`)] = [to * SX, 0];
    ring.push(n(`${a.id}-e`));
    items.push({ kind: 'region', id: n(`${a.id}-fill`), points: ring, tone: a.tone ?? 'adj', shade: 0.45, group: n(a.id) });
    if (a.label) {
      const mid = (from + to) / 2;
      points[n(`${a.id}-lab`)] = [mid * SX, Math.min(y(mid) * 0.45, 1.6) + 0.15];
      items.push({ kind: 'label', id: n(`${a.id}-tex`), at: n(`${a.id}-lab`), tex: a.label, tone: a.tone ?? 'adj', place: 'center', group: n(a.id) });
    }
  }
  items.push(
    { kind: 'line', id: n('base'), from: n('b0'), to: n('b1'), weight: 2.5, group: n('axes') },
    { kind: 'curve', id: n('curve'), points: keys, tone: 'brand', weight: 3.5, group: n('axes') },
  );
  (o.ticks ?? []).forEach((t, i) => {
    points[n(`t${i}a`)] = [t.z * SX, 0];
    points[n(`t${i}b`)] = [t.z * SX, -0.25];
    items.push(
      { kind: 'line', id: n(`t${i}line`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 2.5, tone: t.tone ?? 'ink', group: n(`t${i}`) },
      { kind: 'label', id: n(`t${i}tex`), at: n(`t${i}b`), tex: t.tex, tone: t.tone ?? 'muted', place: 'below', group: n(`t${i}`) },
    );
  });
  return { points, items };
}
