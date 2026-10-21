/**
 * Figures for the surface area and volume videos, built only from standard diagram parts (lines,
 * curves, shaded regions and labels), so each goes into a diagram with `figure`. Boxes, prisms,
 * cylinders and their nets come from `src/video/solids.ts`, and layers of unit cubes from the
 * Math 6 helpers (`m6-10-figures.ts`). This adds:
 *
 * - `isoCubes`: an object built from unit cubes, in a true isometric drawing seen from the front
 *   right, as on isometric dot paper. Only what can really be seen is drawn: a stack behind a
 *   taller one is hidden, and part of a face can show. Arrows mark where to look from.
 * - `squares`: a view drawn on grid paper, one square for each cube face you see (front, side or
 *   top views), or a net of a cube, with a letter or number in any square.
 * - `faceParts`: the faces of a `triangularPrism` that it does not shade itself, and dots on its
 *   vertices, for counting faces, edges and vertices.
 * - `cylinderNetOneSide`: a cylinder net drawn wrongly, with both circles on the same side.
 * - `discLayers`: thin layers across a cylinder, like a stack of coins, for its volume.
 *
 * Heights are orange and base lengths and radii blue, as in `solids.ts`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

// ---------------------------------------------------------------- Isometric cubes

const C30 = Math.cos(Math.PI / 6);

/**
 * Lattice coordinates of the isometric drawing of the point (x, y, z): x along the columns (to the
 * right), y along the rows (toward the front), z up. The drawing is at (u·cos 30°, v / 2), with
 * u = x − y and v = 2z − x − y, so every corner of every cube lands on a whole (u, v).
 */
const lattice = (x: number, y: number, z: number): [number, number] => [x - y, 2 * z - x - y];

type V3 = [number, number, number];

/**
 * An object built from unit cubes, in a true isometric drawing seen from the front right (the top,
 * the front and the right side show). `heights[r][c]` cubes stand in row `r` and column `c`; row 0
 * is the **back** row, as in the lessons, and the last row is the front. `at` places the front
 * bottom left corner.
 *
 * The drawing shows only what is really seen: each face of a cube is split into two triangles of
 * the isometric grid, and each triangle is drawn from the cube nearest the viewer. A cube behind a
 * taller stack is hidden, or shows only a sliver.
 *
 * Parts: each stack `s<r>-<c>` (a group of its faces and the edges around them, so emphasising a
 * stack makes its outline glow; an edge between two stacks is drawn once for each). With `arrows`,
 * an arrow and label for each direction to look from: `front`, `side` (from the right) and `top`
 * (each a group of its arrow and label). `isoShow` lists the parts that draw the whole object.
 */
export function isoCubes(o: {
  name?: string;
  heights: number[][];
  at?: P;
  tone?: DiagramTone;
  arrows?: { front?: string; side?: string; top?: string };
}): Part {
  const n = namer(o.name);
  const [ax, ay] = o.at ?? [0, 0];
  const tone = o.tone ?? 'adj';
  const rows = o.heights.length;
  const cols = Math.max(...o.heights.map((r) => r.length));
  const tall = Math.max(...o.heights.flat());
  // Row r is y = r, so y grows toward the front, and the faces that face +x, +y and +z are seen.
  const has = (x: number, y: number, z: number) => y >= 0 && y < rows && x >= 0 && z >= 0 && z < (o.heights[y]?.[x] ?? 0);
  const points: Record<string, P> = {};
  const pt = (u: number, v: number) => {
    const key = n(`p${u < 0 ? 'm' : ''}${Math.abs(u)}_${v < 0 ? 'm' : ''}${Math.abs(v)}`);
    points[key] = [ax + u * C30, ay + v / 2];
    return key;
  };
  // The front bottom left corner of the object is (0, rows, 0); move it to `at`.
  const [u0, v0] = lattice(0, rows, 0);
  const at3 = (q: V3) => {
    const [u, v] = lattice(...q);
    return pt(u - u0, v - v0);
  };

  type Face = { id: string; stack: string; dir: 'top' | 'front' | 'right'; corners: V3[]; tris: V3[][]; seen: boolean[] };
  const faces: Face[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < (o.heights[y][x] ?? 0); z++) {
        const stack = `${y}-${x}`;
        // Each face's corners go round it, starting and ending on its short diagonal, so the two
        // triangles either side of that diagonal are triangles of the isometric grid.
        if (!has(x, y, z + 1)) {
          const c: V3[] = [[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]];
          faces.push({ id: `t${x}-${y}-${z}`, stack, dir: 'top', corners: c, tris: [[c[0], c[1], c[2]], [c[0], c[2], c[3]]], seen: [false, false] });
        }
        if (!has(x, y + 1, z)) {
          const c: V3[] = [[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]];
          faces.push({ id: `f${x}-${y}-${z}`, stack, dir: 'front', corners: c, tris: [[c[0], c[1], c[2]], [c[0], c[2], c[3]]], seen: [false, false] });
        }
        if (!has(x + 1, y, z)) {
          const c: V3[] = [[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]];
          faces.push({ id: `r${x}-${y}-${z}`, stack, dir: 'right', corners: c, tris: [[c[0], c[1], c[2]], [c[0], c[2], c[3]]], seen: [false, false] });
        }
      }
    }
  }
  // A depth buffer over the triangles of the grid: the nearest face (largest x + y + z) wins.
  const best = new Map<string, { depth: number; face: number; tri: number }>();
  faces.forEach((f, fi) =>
    f.tris.forEach((t, ti) => {
      const uv = t.map((q) => lattice(...q));
      const key = `${uv[0][0] + uv[1][0] + uv[2][0]},${uv[0][1] + uv[1][1] + uv[2][1]}`;
      const depth = t.reduce((s, q) => s + q[0] + q[1] + q[2], 0);
      const cur = best.get(key);
      if (!cur || depth > cur.depth) best.set(key, { depth, face: fi, tri: ti });
    }),
  );
  for (const b of best.values()) faces[b.face].seen[b.tri] = true;

  const SHADE = { top: 0.75, front: 0.5, right: 0.28 } as const;
  const items: DiagramItem[] = [];
  const visible = faces.filter((f) => f.seen.some(Boolean));
  const stackOf = new Map(visible.map((f) => [f.id, f.stack]));
  for (const f of visible) {
    const corners = f.seen[0] && f.seen[1] ? f.corners : f.seen[0] ? f.tris[0] : f.tris[1];
    items.push({ kind: 'region', id: n(f.id), points: corners.map(at3), tone, shade: SHADE[f.dir], group: n(`s${f.stack}`) });
  }
  // Edges: every side of a seen triangle that does not run between two triangles of one face.
  const edges = new Map<string, { a: V3; b: V3; faces: Set<string> }>();
  for (const f of visible) {
    f.tris.forEach((t, ti) => {
      if (!f.seen[ti]) return;
      for (let i = 0; i < 3; i++) {
        const a = t[i];
        const b = t[(i + 1) % 3];
        const ka = lattice(...a).join(',');
        const kb = lattice(...b).join(',');
        const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
        const e = edges.get(key) ?? { a, b, faces: new Set<string>() };
        e.faces.add(f.id);
        edges.set(key, e);
      }
    });
  }
  // A side seen from only one face is an edge if it is not that face's own diagonal.
  const diagonal = (f: Face, a: V3, b: V3) => {
    const [p, q] = [f.corners[0], f.corners[2]].map((c) => lattice(...c).join(','));
    const [x, y] = [a, b].map((c) => lattice(...c).join(','));
    return (x === p && y === q) || (x === q && y === p);
  };
  let k = 0;
  for (const e of edges.values()) {
    if (e.faces.size === 1) {
      const f = visible.find((g) => e.faces.has(g.id))!;
      // The diagonal of a face seen only in part is an edge of what shows; of a whole face, it is not.
      if (diagonal(f, e.a, e.b) && f.seen[0] && f.seen[1]) continue;
    }
    // Once for each stack the edge borders, so every stack has its whole outline.
    for (const stack of new Set([...e.faces].map((id) => stackOf.get(id)!))) {
      items.push({ kind: 'line', id: n(`e${k++}`), from: at3(e.a), to: at3(e.b), tone: 'ink', weight: 2.2, group: n(`s${stack}`) });
    }
  }
  // Arrows showing where to look from, each with its label at the tail.
  const arrow = (id: string, from: V3, to: V3, label: string, place: Place) => {
    items.push(
      { kind: 'line', id: n(`${id}-arrow`), from: at3(from), to: at3(to), tone: 'theta', weight: 4, arrow: true, group: n(id) },
      { kind: 'label', id: n(`${id}-label`), at: at3(from), tex: label, tone: 'theta', place, group: n(id) },
    );
  };
  if (o.arrows?.front) arrow('front', [cols / 2, rows + 2.2, 0], [cols / 2, rows + 0.35, 0], o.arrows.front, 'below left');
  if (o.arrows?.side) arrow('side', [cols + 2.2, rows / 2, 0], [cols + 0.35, rows / 2, 0], o.arrows.side, 'below right');
  if (o.arrows?.top) arrow('top', [cols / 2, rows / 2, tall + 2.2], [cols / 2, rows / 2, tall + 0.35], o.arrows.top, 'above');
  return { points, items };
}

/** The parts that draw an `isoCubes` object (`part`) in diagram `fig`: every stack that shows. */
export function isoShow(fig: string, part: Part): string[] {
  const groups = new Set<string>();
  for (const item of part.items) if (item.group && /(^|-)s\d+-\d+$/.test(item.group)) groups.add(item.group);
  return [...groups].map((g) => `${fig}.${g}`);
}

// ---------------------------------------------------------------- Squares on grid paper

/**
 * Unit squares on grid paper: a front, side or top view, or a net of a cube. `cells` are
 * [column, row] from the bottom left; `marks` puts a letter or number (TeX) in a square, by its
 * index in `cells`. `label` goes under the drawing; `grid` draws faint grid paper around it.
 *
 * Parts: each square `q<i>` (its fill and outline, in the group named by `group(i)`, or `c<column>`
 * by default), each mark `m<i>` (in the same group), `label` and `grid`.
 */
export function squares(o: {
  name?: string;
  cells: [number, number][];
  at?: P;
  tone?: DiagramTone;
  tones?: Record<number, DiagramTone>;
  marks?: Record<number, string>;
  label?: string;
  group?: (i: number, cell: [number, number]) => string;
  grid?: { cols: number; rows: number };
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  if (o.grid) {
    const g = o.grid;
    for (let i = 0; i <= g.cols; i++) {
      Object.assign(points, { [n(`gv${i}a`)]: [x0 - 1 + i, y0 - 1], [n(`gv${i}b`)]: [x0 - 1 + i, y0 - 1 + g.rows] });
      items.push({ kind: 'line', id: n(`gv${i}`), from: n(`gv${i}a`), to: n(`gv${i}b`), tone: 'muted', weight: 1, group: n('grid') });
    }
    for (let j = 0; j <= g.rows; j++) {
      Object.assign(points, { [n(`gh${j}a`)]: [x0 - 1, y0 - 1 + j], [n(`gh${j}b`)]: [x0 - 1 + g.cols, y0 - 1 + j] });
      items.push({ kind: 'line', id: n(`gh${j}`), from: n(`gh${j}a`), to: n(`gh${j}b`), tone: 'muted', weight: 1, group: n('grid') });
    }
  }
  o.cells.forEach(([c, r], i) => {
    const group = n(o.group ? o.group(i, [c, r]) : `c${c}`);
    const corners: P[] = [[x0 + c, y0 + r], [x0 + c + 1, y0 + r], [x0 + c + 1, y0 + r + 1], [x0 + c, y0 + r + 1]];
    const names = corners.map((q, m) => {
      points[n(`q${i}-${m}`)] = q;
      return n(`q${i}-${m}`);
    });
    items.push(
      { kind: 'region', id: n(`q${i}`), points: names, tone: o.tones?.[i] ?? o.tone ?? 'adj', shade: 0.45, group },
      { kind: 'curve', id: n(`q${i}-e`), points: names, closed: true, tone: 'ink', weight: 2.5, group },
    );
    const mark = o.marks?.[i];
    if (mark) {
      points[n(`m${i}-at`)] = [x0 + c + 0.5, y0 + r + 0.5];
      items.push({ kind: 'label', id: n(`m${i}`), at: n(`m${i}-at`), tex: mark, place: 'center', group });
    }
  });
  if (o.label) {
    const xs = o.cells.map(([c]) => c);
    const ys = o.cells.map(([, r]) => r);
    points[n('lab')] = [x0 + (Math.min(...xs) + Math.max(...xs) + 1) / 2, y0 + Math.min(...ys) - 0.2];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, tone: 'muted', place: 'below' });
  }
  return { points, items };
}

// ---------------------------------------------------------------- Faces, edges and vertices

/**
 * Extra parts for a `triangularPrism` named `name` (or unnamed), for counting its faces, edges and
 * vertices: its two triangle ends in yellow (`front-end` and `back-end`, the group `ends`), its
 * three rectangles in blue (`right-rect`, `left-rect` and `bottom-rect`, the group `rects`; the
 * hidden ones fainter), and a dot on each of its six vertices (`v-A`… `v-F`, the group
 * `vertices`). Its points are the prism's. With `only`, just those parts (by id, without the name).
 */
export function faceParts(name?: string, only?: string[]): Part {
  const n = namer(name);
  const face = (id: string, pts: string[], tone: DiagramTone, shade: number, group: string): DiagramItem => ({ kind: 'region', id: n(id), points: pts.map(n), tone, shade, group: n(group) });
  const items: DiagramItem[] = [
    face('back-end', ['D', 'E', 'F'], 'theta', 0.22, 'ends'),
    face('bottom-rect', ['A', 'B', 'E', 'D'], 'adj', 0.2, 'rects'),
    face('left-rect', ['A', 'C', 'F', 'D'], 'adj', 0.2, 'rects'),
    face('right-rect', ['B', 'E', 'F', 'C'], 'adj', 0.4, 'rects'),
    face('front-end', ['A', 'B', 'C'], 'theta', 0.45, 'ends'),
    ...['A', 'B', 'C', 'D', 'E', 'F'].map((v): DiagramItem => ({ kind: 'label', id: n(`v-${v}`), at: n(v), tex: '', tone: 'theta', dot: true, group: n('vertices') })),
  ];
  return { points: {}, items: only ? items.filter((i) => only.map(n).includes(i.id)) : items };
}

// ---------------------------------------------------------------- Cylinders

/** Points round a circle of radius r about c, added to `points` as `<key><i>`. */
function ring(points: Record<string, P>, key: string, c: P, r: number, steps = 64): string[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = (2 * Math.PI * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${key}${i}`;
  });
}

/**
 * A cylinder net drawn wrongly: the rectangle (2πr long, h tall) with both circles on its top
 * edge. Parts: `body` and both circles, `lid1` and `lid2` (the group `circles`), and a dashed red
 * ring where the bottom circle belongs, labelled open (the group `open`, shown when asked).
 */
export function cylinderNetOneSide(o: { name?: string; r: number; h: number }): Part {
  const n = namer(o.name);
  const C = 2 * Math.PI * o.r;
  const points: Record<string, P> = {};
  const body: P[] = [[0, 0], [C, 0], [C, o.h], [0, o.h]];
  const bodyNames = body.map((q, i) => {
    points[n(`b${i}`)] = q;
    return n(`b${i}`);
  });
  const lid1 = ring(points, n('l1-'), [C * 0.28, o.h + o.r], o.r);
  const lid2 = ring(points, n('l2-'), [C * 0.72, o.h + o.r], o.r);
  // Where the second circle should be: a dashed red ring under the rectangle, left open.
  const hole = ring(points, n('o-'), [C / 2, -o.r], o.r);
  points[n('ol')] = [C / 2, -o.r];
  const items: DiagramItem[] = [
    { kind: 'region', id: n('body'), points: bodyNames, tone: 'brand', shade: 0.2 },
    { kind: 'curve', id: n('body-e'), points: bodyNames, closed: true, weight: 2.5, group: n('body') },
    { kind: 'region', id: n('lid1'), points: lid1, tone: 'good', shade: 0.2, group: n('circles') },
    { kind: 'curve', id: n('lid1-e'), points: lid1, closed: true, weight: 2.5, group: n('circles') },
    { kind: 'region', id: n('lid2'), points: lid2, tone: 'good', shade: 0.2, group: n('circles') },
    { kind: 'curve', id: n('lid2-e'), points: lid2, closed: true, weight: 2.5, group: n('circles') },
    { kind: 'curve', id: n('open-ring'), points: hole, closed: true, dashed: true, tone: 'bad', weight: 3, group: n('open') },
    { kind: 'label', id: n('open-label'), at: n('ol'), tex: '\\text{open}', tone: 'bad', place: 'center', group: n('open') },
  ];
  return { points, items };
}

/**
 * Thin layers across a cylinder of radius `r` and height `h` standing on `at` (as drawn by
 * `cylinder` in `solids.ts`, which must use the same `at`, `r` and `h`): the front half of a ring at
 * every whole unit of height, like a stack of coins. Parts: each ring `layer<k>` (k = 1 to h − 1),
 * in the group `layers`.
 */
export function discLayers(o: { name?: string; at?: P; r: number; h: number; every?: number }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const step = o.every ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 1; k * step < o.h - 1e-9; k++) {
    const yy = y + k * step;
    const names: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const a = Math.PI + (i * Math.PI) / 24;
      const key = n(`L${k}-${i}`);
      points[key] = [x + o.r * Math.cos(a), yy + o.r * 0.3 * Math.sin(a)];
      names.push(key);
    }
    items.push({ kind: 'curve', id: n(`layer${k}`), points: names, tone: 'muted', weight: 2, group: n('layers') });
  }
  return { points, items };
}

/** A label (TeX) at a point, such as the name under a solid. Part: its `id` (in `group`, if given). */
export function note(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * The curved surface of a cylinder unrolled: a rectangle as long as the circumference (2πr) and as
 * tall as the height, with its bottom left corner at `at`. Labels go under the bottom edge (`c`, in
 * the middle) and beside the right edge (`h`); `area` is written inside. Parts: `rect` (a group:
 * the shading and outline), `c`, `h` and `area`.
 */
export function unrolled(o: { name?: string; r: number; h: number; at?: P; labels?: { c?: string; h?: string; area?: string } }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const C = 2 * Math.PI * o.r;
  const points: Record<string, P> = { [n('A')]: [x, y], [n('B')]: [x + C, y], [n('C')]: [x + C, y + o.h], [n('D')]: [x, y + o.h], [n('M')]: [x + C / 2, y + o.h / 2] };
  const corners = ['A', 'B', 'C', 'D'].map(n);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('rect-fill'), points: corners, tone: 'brand', shade: 0.22, group: n('rect') },
    { kind: 'curve', id: n('rect-edge'), points: corners, closed: true, weight: 2.5, group: n('rect') },
  ];
  if (o.labels?.c) items.push({ kind: 'line', id: n('c'), from: n('A'), to: n('B'), tone: 'adj', weight: 5, label: o.labels.c, labelSide: 'right' });
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('B'), to: n('C'), tone: 'opp', weight: 5, label: o.labels.h, labelSide: 'right' });
  if (o.labels?.area) items.push({ kind: 'label', id: n('area'), at: n('M'), tex: o.labels.area, place: 'center' });
  return { points, items };
}

/**
 * The triangle at the end of a tent, drawn flat and large: base `b` along the bottom from `at`, and
 * height `t` up to the apex above the middle of the base. Parts: `tri` (the shaded triangle and its
 * outline, a group), the labelled base `b` (blue), sloped sides `s1` and `s2` (pink, the group
 * `sides`) and the dashed height `t` (orange) with its right-angle mark.
 */
export function endTriangle(o: { name?: string; b: number; t: number; at?: P; labels?: { b?: string; s?: string; t?: string } }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('A')]: [x, y], [n('B')]: [x + o.b, y], [n('C')]: [x + o.b / 2, y + o.t], [n('M')]: [x + o.b / 2, y] };
  const corners = ['A', 'B', 'C'].map(n);
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: corners, tone: 'theta', shade: 0.25, group: n('tri') },
    { kind: 'curve', id: n('edge'), points: corners, closed: true, weight: 3, group: n('tri') },
    { kind: 'line', id: n('b'), from: n('A'), to: n('B'), tone: 'adj', weight: 4.5, ...(o.labels?.b ? { label: o.labels.b, labelSide: 'right' as const } : {}) },
    { kind: 'line', id: n('s1'), from: n('A'), to: n('C'), tone: 'hyp', weight: 4.5, group: n('sides'), ...(o.labels?.s ? { label: o.labels.s, labelSide: 'left' as const } : {}) },
    { kind: 'line', id: n('s2'), from: n('B'), to: n('C'), tone: 'hyp', weight: 4.5, group: n('sides'), ...(o.labels?.s ? { label: o.labels.s, labelSide: 'right' as const } : {}) },
    { kind: 'line', id: n('t'), from: n('M'), to: n('C'), tone: 'opp', dashed: true, weight: 4, group: n('height'), ...(o.labels?.t ? { label: o.labels.t, labelSide: 'right' as const, labelAt: 0.4 } : {}) },
    { kind: 'right', id: n('t-mark'), at: n('M'), from: n('B'), to: n('C'), group: n('height') },
  ];
  return { points, items };
}

/**
 * A diameter across the top of a `cylinder` of radius `r` and height `h` standing on `at` (the same
 * values as the cylinder), in pink, with its label above the back of the rim. Parts: `d` (a group:
 * the line `d-line` and the label `d-label`).
 */
export function topDiameter(o: { name?: string; at?: P; r: number; h: number; label: string }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('dl')]: [x - o.r, y + o.h], [n('dr')]: [x + o.r, y + o.h], [n('dlab')]: [x, y + o.h + o.r * 0.3] };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('d-line'), from: n('dl'), to: n('dr'), tone: 'hyp', weight: 4, group: n('d') },
    { kind: 'label', id: n('d-label'), at: n('dlab'), tex: o.label, tone: 'hyp', place: 'above', group: n('d') },
  ];
  return { points, items };
}

/**
 * Thin slices across a `triangularPrism` with the same `b`, `t`, `l`, `apex` and `at`: a copy of the
 * triangle end every `l / count` of the way back, like the slices of a loaf. Parts: each slice
 * `slice<k>`, in the group `slices`.
 */
export function prismSlices(o: { name?: string; at?: P; b: number; t: number; l: number; apex?: number; count: number }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  // The same direction of depth as `solids.ts`: back and to the right, at half scale.
  const dx = 0.5 * Math.cos(Math.PI / 6);
  const dy = 0.5 * Math.sin(Math.PI / 6);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 1; k < o.count; k++) {
    const s = (o.l * k) / o.count;
    const corners: P[] = [[x, y], [x + o.b, y], [x + (o.apex ?? o.b / 2), y + o.t]];
    const names = corners.map((c, i) => {
      points[n(`sl${k}-${i}`)] = [c[0] + s * dx, c[1] + s * dy];
      return n(`sl${k}-${i}`);
    });
    items.push({ kind: 'curve', id: n(`slice${k}`), points: names, closed: true, tone: 'theta', weight: 1.8, group: n('slices') });
  }
  return { points, items };
}
