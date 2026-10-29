/**
 * Figures for the first half of the Electrochemical Changes videos (Grade 12 Chemistry, unit 2,
 * lessons 2.1 to 2.4), built only from standard diagram parts (lines, curves, shaded regions and
 * labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `nailBeaker`: an iron nail standing in a beaker of blue copper(II) sulfate solution, with the
 *   coat of copper that forms on it.
 * - `gift`: one particle giving electrons to another (iron to a copper(II) ion), and what each
 *   becomes: the oxidised one and the reduced one.
 * - `electronCount`: several particles giving electrons to several others, with the electrons
 *   lost and gained counted (two aluminium atoms, three copper(II) ions, six electrons).
 * - `wireBeaker`: a metal wire in a beaker of solution, with crystals growing on it if it reacts.
 * - `ladder`: a redox table drawn as a ladder of reduction half-reactions, oxidising agents on
 *   the left and reducing agents on the right, with boxes that pick out one species and arrows
 *   that show which way each kind of agent gets stronger.
 * - `breathTube`: a breath tester's tube of orange dichromate crystals turning green from the end
 *   the breath goes in.
 * - `oval`: a closed oval line round part of a figure, such as the electrons an atom is counted
 *   with in a Lewis structure (src/video/chem.ts).
 * - `tag`, `link`, `room` and `join`: a label, a line or arrow, two unused points that keep space,
 *   and several parts as one.
 *
 * Colours keep one meaning in every video of the unit: oxidation (electrons lost, and the reducing
 * agent that loses them) is orange, reduction (electrons gained, and the oxidising agent that
 * gains them) is blue, and electrons are yellow.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** A line from one point to another (an arrow with `arrow`), with an optional label (TeX) beside its middle. Part: its `id`. */
export function link(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number; arrow?: boolean; dashed?: boolean } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** A closed oval line, `rx` across and `ry` up from its centre `c`. Part: its `id`. */
export function oval(id: string, c: P, rx: number, ry: number, o: { tone?: DiagramTone; dashed?: boolean; group?: string } = {}): Part {
  const points: Record<string, P> = {};
  const ids = Array.from({ length: 36 }, (_, j) => {
    const a = (2 * Math.PI * j) / 36;
    points[`${id}-${j}`] = [c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)];
    return `${id}-${j}`;
  });
  return { points, items: [{ kind: 'curve', id, points: ids, closed: true, tone: o.tone ?? 'ink', weight: 3, ...(o.dashed ? { dashed: true } : {}), ...(o.group ? { group: o.group } : {}) }] };
}

/** Two points that nothing uses, so the diagram keeps room out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Point names round a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
}

/** A shaded rectangle with an edge, both in the group `id`. */
function box(points: Record<string, P>, items: DiagramItem[], id: string, x0: number, y0: number, x1: number, y1: number, tone: DiagramTone, shade: number, edge = true) {
  const ids = rect(points, `${id}-r`, x0, y0, x1, y1);
  items.push({ kind: 'region', id: `${id}-fill`, points: ids, tone, shade, group: id });
  if (edge) items.push({ kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2.5, group: id });
}

/** A ball: a shaded circle with an edge and a label (TeX) in the middle, all in the group `id`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, tex: string) {
  const ids = ring(points, `${id}-o`, c, r, 24);
  points[`${id}-c`] = c;
  items.push(
    { kind: 'region', id: `${id}-fill`, points: ids, tone, shade: 0.28, group: id },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2.5, group: id },
    { kind: 'label', id: `${id}-tex`, at: `${id}-c`, tex, place: 'center', group: id },
  );
}

/** An open beaker: its two sides and floor, in the group `id`. */
function beakerOutline(points: Record<string, P>, items: DiagramItem[], id: string, x0: number, x1: number, y0: number, top: number) {
  Object.assign(points, { [`${id}-tl`]: [x0, top], [`${id}-bl`]: [x0, y0], [`${id}-br`]: [x1, y0], [`${id}-tr`]: [x1, top] });
  items.push(
    { kind: 'line', id: `${id}-l`, from: `${id}-tl`, to: `${id}-bl`, tone: 'muted', weight: 3, group: id },
    { kind: 'line', id: `${id}-b`, from: `${id}-bl`, to: `${id}-br`, tone: 'muted', weight: 3, group: id },
    { kind: 'line', id: `${id}-r`, from: `${id}-br`, to: `${id}-tr`, tone: 'muted', weight: 3, group: id },
  );
}

/**
 * An iron nail standing in a beaker of copper(II) sulfate solution (6 wide and 6 tall, `at` its
 * bottom left corner), with labels on leader lines.
 *
 * Parts: `beaker`, `solution` (a group: the blue liquid and its label), `nail` (a group: the nail
 * and its label) and `coat` (a group: the reddish-brown copper on the part of the nail under the
 * solution, and its label).
 */
export function nailBeaker(o: { name?: string; at?: P } = {}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const level = y0 + 4.2;
  beakerOutline(points, items, n('beaker'), x0, x0 + 6, y0, y0 + 5.6);
  box(points, items, n('sol'), x0 + 0.08, y0 + 0.08, x0 + 5.92, level, 'adj', 0.3, false);
  // The nail: a shaft from near the floor up out of the solution, with a head on top.
  box(points, items, n('shaft'), x0 + 2.8, y0 + 0.5, x0 + 3.2, y0 + 6.9, 'muted', 0.85, false);
  box(points, items, n('head'), x0 + 2.35, y0 + 6.9, x0 + 3.65, y0 + 7.25, 'muted', 0.85, false);
  box(points, items, n('copper'), x0 + 2.68, y0 + 0.4, x0 + 3.32, level, 'opp', 0.8, false);
  for (const it of items) {
    if (it.id.startsWith(n('sol'))) it.group = n('solution');
    else if (it.id.startsWith(n('shaft')) || it.id.startsWith(n('head'))) it.group = n('nail');
    else if (it.id.startsWith(n('copper'))) it.group = n('coat');
  }
  const parts = [
    { points, items },
    link(n('nail-ptr'), [x0 + 3.75, y0 + 6.2], [x0 + 6.4, y0 + 6.6], { tone: 'muted', weight: 2, group: n('nail') }),
    tag(n('nail-l'), [x0 + 6.4, y0 + 6.6], '\\text{iron nail}', { place: 'right', group: n('nail') }),
    link(n('coat-ptr'), [x0 + 3.4, y0 + 2.6], [x0 + 6.4, y0 + 2.6], { tone: 'opp', weight: 2, group: n('coat') }),
    tag(n('coat-l'), [x0 + 6.4, y0 + 2.6], '\\text{copper}', { place: 'right', tone: 'opp', group: n('coat') }),
    tag(n('sol-l'), [x0 + 3, y0 - 0.3], '\\ce{Cu^2+(aq)}\\text{, blue}', { place: 'below', tone: 'adj', group: n('solution') }),
    // Room for the labels on the right.
    room(n('room'), [x0 - 0.2, y0 - 1.2], [x0 + 9.4, y0 + 7.4]),
  ];
  return join(parts);
}

/**
 * One particle giving electrons to another: the giver on the left, the taker on the right, an
 * arrow between them carrying the electrons, and below each an arrow down to what it becomes,
 * with "oxidised" (orange) under the giver and "reduced" (blue) under the taker (unless `words`
 * is false).
 *
 * Parts: `giver` and `taker` (groups: a ball and its label), `e` (a group: the arrow and the
 * electrons' label), `giver-after` and `taker-after` (groups: the arrow down, the product and the
 * word under it).
 */
export function gift(o: { name?: string; giver: string; taker: string; giverAfter: string; takerAfter: string; electrons: string; words?: boolean; r?: number; gap?: number }): Part {
  const n = namer(o.name);
  const r = o.r ?? 1.35;
  const gap = o.gap ?? 5.2;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  ball(points, items, n('giver'), [0, 0], r, 'opp', o.giver);
  ball(points, items, n('taker'), [gap, 0], r, 'adj', o.taker);
  const after = (id: string, x: number, tex: string, word: string, tone: DiagramTone) =>
    join([
      link(n(`${id}-down`), [x, -r - 0.25], [x, -r - 1.45], { tone: 'muted', weight: 2.5, arrow: true, group: n(`${id}-after`) }),
      tag(n(`${id}-new`), [x, -r - 1.55], tex, { place: 'below', group: n(`${id}-after`) }),
      ...(o.words === false ? [] : [tag(n(`${id}-word`), [x, -r - 2.75], `\\text{${word}}`, { place: 'below', tone, group: n(`${id}-after`) })]),
    ]);
  return join([
    { points, items },
    link(n('e-arrow'), [r + 0.35, 0], [gap - r - 0.35, 0], { tone: 'theta', weight: 3.5, arrow: true, group: n('e') }),
    tag(n('e-l'), [gap / 2, 0.2], o.electrons, { place: 'above', tone: 'theta', group: n('e') }),
    after('giver', 0, o.giverAfter, 'oxidised', 'opp'),
    after('taker', gap, o.takerAfter, 'reduced', 'adj'),
    room(n('room'), [-r - 0.4, -r - 3.6], [gap + r + 0.4, r + 0.3]),
  ]);
}

/**
 * Several particles giving electrons to several others: the givers in a row along the top, the
 * takers in a row along the bottom, one arrow down from the givers to the takers carrying all the
 * electrons, the electrons lost counted above (such as 2 × 3 = 6 lost) and those gained below.
 *
 * Parts: `givers` and `takers` (groups: every ball in the row), `e` (a group: the arrow and its
 * label), `lost` and `gained` (the counts).
 */
export function electronCount(o: { name?: string; giver: string; givers: number; taker: string; takers: number; electrons: string; lost: string; gained: string }): Part {
  const n = namer(o.name);
  const r = 0.9;
  const step = 2.2;
  const low = -4.2;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const row = (id: string, y: number, k: number, tone: DiagramTone, tex: string) => {
    for (let i = 0; i < k; i++) ball(points, items, n(`${id}-${i}`), [(i - (k - 1) / 2) * step, y], r, tone, tex);
    for (const it of items) if (it.id.startsWith(n(`${id}-`))) it.group = n(id);
  };
  row('givers', 0, o.givers, 'opp', o.giver);
  row('takers', low, o.takers, 'adj', o.taker);
  const half = ((Math.max(o.givers, o.takers) - 1) * step) / 2 + r + 0.4;
  return join([
    { points, items },
    link(n('e-arrow'), [0, -r - 0.25], [0, low + r + 0.25], { tone: 'theta', weight: 3.5, arrow: true, group: n('e') }),
    tag(n('e-l'), [0.25, low / 2], o.electrons, { place: 'right', tone: 'theta', group: n('e') }),
    tag(n('lost'), [0, r + 0.2], o.lost, { place: 'above', tone: 'opp' }),
    tag(n('gained'), [0, low - r - 0.2], o.gained, { place: 'below', tone: 'adj' }),
    room(n('room'), [-half, low - r - 1.3], [half, r + 1.3]),
  ]);
}

/**
 * A metal wire standing in a beaker of solution (4 wide, `at` its bottom left corner). The
 * solution is shaded `tone` (very lightly when `clear`), with an optional second shade `turns`
 * that can be shown over it as the solution changes colour. With `crystals`, needles grow out of
 * the wire under the solution.
 *
 * Parts: `beaker`, `solution` (the liquid), `turns` (the new colour, if any), `wire`, `crystals`
 * (a group of needles), and `label` (the caption below).
 */
export function wireBeaker(o: { name?: string; at?: P; tone: DiagramTone; clear?: boolean; turns?: DiagramTone; wire: DiagramTone; crystals?: boolean; label: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const level = y0 + 3.4;
  beakerOutline(points, items, n('beaker'), x0, x0 + 4, y0, y0 + 4.4);
  box(points, items, n('solution'), x0 + 0.08, y0 + 0.08, x0 + 3.92, level, o.clear ? 'muted' : o.tone, o.clear ? 0.1 : 0.3, false);
  if (o.turns) box(points, items, n('turns'), x0 + 0.08, y0 + 0.08, x0 + 3.92, level, o.turns, 0.3, false);
  box(points, items, n('wire'), x0 + 1.88, y0 + 0.4, x0 + 2.12, y0 + 5.4, o.wire, 0.9, false);
  const parts: Part[] = [{ points, items }];
  if (o.crystals) {
    // Short needles sticking out of both sides of the wire, all along it under the solution.
    for (let i = 0; i < 6; i++) {
      const y = y0 + 0.8 + i * 0.45;
      const len = 0.45 + 0.25 * ((i * 7) % 3);
      parts.push(
        link(n(`ndl-${i}`), [x0 + 1.88, y], [x0 + 1.88 - len, y + 0.22], { tone: 'ink', weight: 2.5, group: n('crystals') }),
        link(n(`ndr-${i}`), [x0 + 2.12, y + 0.2], [x0 + 2.12 + len, y + 0.4], { tone: 'ink', weight: 2.5, group: n('crystals') }),
      );
    }
  }
  parts.push(tag(n('label'), [x0 + 2, y0 - 0.25], o.label, { place: 'below' }));
  return join(parts);
}

/** A row of a redox table: a reduction half-reaction, oxidising agent first, and its potential. */
export interface LadderRow {
  id: string;
  /** The oxidising agent (TeX), such as "\\ce{Ag+}". */
  oa: string;
  /** The electrons it takes (TeX), such as "\\ce{2e-}". */
  e: string;
  /** The reducing agent it becomes (TeX). */
  ra: string;
  /** Its standard reduction potential, as written: "+0.80", "-0.76". */
  E?: string;
}

/**
 * A redox table drawn as a ladder: one reduction half-reaction a row, from the strongest oxidising
 * agent at the top, with the oxidising agents (blue) right-aligned in a column on the left and the
 * reducing agents (orange) in a column on the right, and with `values` each row's potential at the
 * far right. With `arrows`, an arrow beside each column shows the way its agents get stronger: up
 * the oxidising agents, down the reducing agents.
 *
 * Drawn in stage pixels: give `width`, the space the diagram has on the stage (1100 in a centred
 * scene, a split scene's column otherwise), and a diagram height of at least the rows' height
 * plus 150, so the figure is drawn at its natural size and its boxes fit the labels.
 *
 * Parts: `head` (the column headings), each row by its `id` (a group: the agents, the electrons,
 * the arrow and the potential), `<id>-oa-box` and `<id>-ra-box` (a box round the row's oxidising
 * or reducing agent), and `oa-arrow` and `ra-arrow` (groups: an arrow and its label).
 */
export function ladder(o: { name?: string; rows: LadderRow[]; width: number; values?: boolean; arrows?: boolean; rowH?: number; oaW?: number; raW?: number }): Part {
  const n = namer(o.name);
  const rowH = o.rowH ?? 50;
  const oaW = o.oaW ?? 130;
  const raW = o.raW ?? 150;
  const values = o.values ?? true;
  const arrows = o.arrows ?? false;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Columns, in pixels from the right edge of the oxidising agents. The electrons and arrow of each
  // row end just before the reducing agent, so the arrows line up; the potentials sit far enough
  // right that their heading clears "reducing agents".
  const raX = 190;
  const eX = raX + Math.max(raW + 120, 350);
  const oaArrow = -oaW - 35;
  const raArrow = (values ? eX : raX + raW) + 35;
  const last = -(o.rows.length - 1) * rowH;
  const label = (id: string, x: number, y: number, tex: string, place: Place, tone: DiagramTone, group: string) => {
    points[`${id}-at`] = [x, y];
    items.push({ kind: 'label', id, at: `${id}-at`, tex, place, tone, group });
  };
  // Boxes first, so they sit behind the labels.
  o.rows.forEach((row, i) => {
    const y = -i * rowH;
    box(points, items, n(`${row.id}-oa-box`), -oaW - 4, y - rowH * 0.44, 2, y + rowH * 0.44, 'adj', 0.22);
    box(points, items, n(`${row.id}-ra-box`), raX - 2, y - rowH * 0.44, raX + raW + 4, y + rowH * 0.44, 'opp', 0.22);
  });
  const headY = rowH * 0.95;
  label(n('head-oa'), 0, headY, '\\text{oxidising agents}', 'left', 'adj', n('head'));
  label(n('head-ra'), raX, headY, '\\text{reducing agents}', 'right', 'opp', n('head'));
  if (values) label(n('head-e'), eX, headY, 'E^\\circ\\ (\\text{V})', 'left', 'muted', n('head'));
  o.rows.forEach((row, i) => {
    const y = -i * rowH;
    const g = n(row.id);
    label(n(`${row.id}-oa`), 0, y, row.oa, 'left', 'adj', g);
    label(n(`${row.id}-e`), raX + 2, y, `+\\ ${row.e}\\ \\longrightarrow`, 'left', 'ink', g);
    label(n(`${row.id}-ra`), raX, y, row.ra, 'right', 'opp', g);
    if (values && row.E !== undefined) label(n(`${row.id}-E`), eX, y, row.E.replace('-', '{-}'), 'left', 'muted', g);
  });
  if (arrows) {
    Object.assign(points, {
      [n('oaa-a')]: [oaArrow, last - rowH * 0.3],
      [n('oaa-b')]: [oaArrow, rowH * 0.3],
      [n('raa-a')]: [raArrow, rowH * 0.3],
      [n('raa-b')]: [raArrow, last - rowH * 0.3],
      [n('oaa-l')]: [oaArrow - 4, last / 2],
      [n('raa-l')]: [raArrow + 4, last / 2],
    });
    items.push(
      { kind: 'line', id: n('oaa'), from: n('oaa-a'), to: n('oaa-b'), tone: 'adj', weight: 4, arrow: true, group: n('oa-arrow') },
      { kind: 'label', id: n('oaa-word'), at: n('oaa-l'), tex: '\\text{stronger}', place: 'left', tone: 'muted', group: n('oa-arrow') },
      { kind: 'line', id: n('raa'), from: n('raa-a'), to: n('raa-b'), tone: 'opp', weight: 4, arrow: true, group: n('ra-arrow') },
      { kind: 'label', id: n('raa-word'), at: n('raa-l'), tex: '\\text{stronger}', place: 'right', tone: 'muted', group: n('ra-arrow') },
    );
  }
  // Keep the figure at its natural size: the width the diagram is given, centred on the columns.
  const left = arrows ? oaArrow - 160 : -oaW - 10;
  const right = arrows ? raArrow + 160 : values ? eX + 10 : raX + raW + 10;
  const mid = (left + right) / 2;
  const half = (o.width - 128) / 2;
  Object.assign(points, { [n('room-a')]: [mid - half, last - rowH * 0.6], [n('room-b')]: [mid + half, headY + rowH * 0.3] });
  return { points, items };
}

/**
 * A breath tester's tube lying on its side, packed with orange dichromate crystals, with breath
 * blowing in at the left end. The green of chromium(III) spreads from that end.
 *
 * Parts: `tube` (the glass), `orange` (the crystals), `green` (the crystals that have turned
 * green, drawn over the orange), `breath` (a group: the arrow and its label), and the labels
 * `orange-l` and `green-l`.
 */
export function breathTube(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const t = rect(points, n('glass'), 0, 0, 10, 1.6);
  items.push({ kind: 'curve', id: n('tube'), points: t, closed: true, tone: 'muted', weight: 3 });
  box(points, items, n('orange'), 0.12, 0.12, 9.88, 1.48, 'opp', 0.7, false);
  box(points, items, n('green'), 0.12, 0.12, 3.6, 1.48, 'good', 1, false);
  for (const it of items) {
    if (it.id.startsWith(n('orange'))) it.group = n('orange');
    if (it.id.startsWith(n('green'))) it.group = n('green');
  }
  return join([
    { points, items },
    link(n('breath-arrow'), [-3, 0.8], [-0.3, 0.8], { tone: 'muted', weight: 3.5, arrow: true, group: n('breath') }),
    tag(n('breath-l'), [-1.65, 1.1], '\\text{breath}', { place: 'above', tone: 'muted', group: n('breath') }),
    tag(n('orange-l'), [7.3, -0.3], '\\ce{Cr2O7^2-}\\text{: orange}', { place: 'below', tone: 'opp' }),
    tag(n('green-l'), [1.6, -0.3], '\\ce{Cr^3+}\\text{: green}', { place: 'below', tone: 'good' }),
    room(n('room'), [-3.2, -1.6], [10.2, 2.2]),
  ]);
}
