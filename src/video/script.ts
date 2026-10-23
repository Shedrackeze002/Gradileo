/**
 * Explainer video scripts. A script is a list of scenes. Each scene puts elements on the stage, and
 * the narrator reads its lines; each line can show, highlight or hide elements as it is spoken. The
 * build (video/build.ts) voices every line, so all timing comes from the narration, then renders
 * the frames, captions and thumbnail. Scripts live in src/content/<course>/videos/<lesson>.ts.
 *
 * Elements are addressed by id; a part of an element by "id.part": a line, bullet or table row by
 * its index ("steps.0"), a triangle's sides and angles by name ("tri.opp"), a diagram's parts by
 * their ids ("d.sight"). Showing an element shows all of it; showing a part shows the element with
 * just that part, so a list of parts can be revealed one at a time. Hiding an element hides all of
 * it; hiding a part that was shown on its own hides just that part (to swap one label for another).
 */

/** The name on every frame, thumbnail and YouTube description. */
export const BRAND = 'Gradileo';

/** Colours with a fixed meaning in every video (trigonometry uses the first four). */
export type Tone = 'theta' | 'opp' | 'adj' | 'hyp' | 'brand' | 'good' | 'bad';

export interface TitleEl {
  kind: 'title';
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

/** A paragraph of Markdown with $inline maths$. */
export interface TextEl {
  kind: 'text';
  id: string;
  md: string;
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

/** Display maths, one line per step. */
export interface MathEl {
  kind: 'math';
  id: string;
  lines: string[];
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

export interface BulletsEl {
  kind: 'bullets';
  id: string;
  items: string[];
  /** Ticks instead of dots (for summaries). */
  check?: boolean;
}

export interface CalloutEl {
  kind: 'callout';
  id: string;
  tone: 'definition' | 'mistake' | 'tip' | 'key';
  title: string;
  md: string;
}

export interface TableEl {
  kind: 'table';
  id: string;
  head: string[];
  rows: string[][];
}

/** The parts of a right triangle, named from the angle θ. */
export type TriPart = 'theta' | 'other' | 'opp' | 'adj' | 'hyp';

/**
 * A right triangle with θ at the bottom left, the right angle at the bottom right and the other
 * angle at the top. Parts: shape, theta, other, opp, adj, hyp.
 */
export interface TriangleEl {
  kind: 'triangle';
  id: string;
  /** Lengths used for drawing (adjacent along the bottom, opposite up the right side). */
  adj: number;
  opp: number;
  /** TeX labels for the sides and angles. */
  labels?: Partial<Record<TriPart, string>>;
  /** Vertex names: [θ vertex, right-angle vertex, other vertex]. */
  vertices?: [string, string, string];
  /** Draw the triangle in a setting: a ramp, a tree, a ladder against a wall, a building. */
  setting?: 'ramp' | 'tree' | 'ladder' | 'building';
  /** Reflect left to right, so θ is at the bottom right. */
  mirror?: boolean;
}

/** Similar right triangles side by side, all with the same angle θ. Parts: "0", "1", "2"… */
export interface SimilarEl {
  kind: 'similar';
  id: string;
  /** θ in degrees. */
  angle: number;
  /** The adjacent side of each triangle. */
  sizes: number[];
  /** Decimal places for the side labels. */
  decimals?: number;
}

/** A calculator screen: the keys are typed out, then the result appears. */
export interface CalcEl {
  kind: 'calc';
  id: string;
  keys: string;
  result: string;
}

/**
 * "Your turn": a question the viewer tries while the video counts down. In Gradileo the player
 * pauses here and asks the question; the answer is shown with the part "answer".
 */
export interface TryEl {
  kind: 'try';
  id: string;
  prompt: string;
  choices?: string[];
  /** The correct choice (its index) or the answer as text. */
  answer: number | string;
  /** How the answer is worked out, shown with "answer". */
  working?: string;
}

/** A colour for a diagram part: a fixed video colour, white ink, or muted grey. */
export type DiagramTone = Tone | 'ink' | 'muted';

/** Scenery drawn behind a diagram's lines (see DiagramThing). */
export type ThingType = 'ground' | 'water' | 'cliff' | 'tower' | 'lighthouse' | 'building' | 'flagpole' | 'tree' | 'person' | 'boat';

/** Where a label sits beside a point. */
export type Place = 'above' | 'below' | 'left' | 'right' | 'above left' | 'above right' | 'below left' | 'below right' | 'center';

/**
 * A part of a diagram. Every part has an id, so a line can show or emphasise it ("d.sight"), and
 * names the points it uses. Parts are drawn in order, so list scenery first. A part in a `group`
 * also appears, and is emphasised, with its group ("d.shape" shows every edge of a solid).
 */
export type DiagramItem = (
  /**
   * A straight line from one point to another, drawn on from `from`. Its label sits beside its
   * middle (or at `labelAt`, 0 to 1 along it), away from the middle of the diagram unless `labelSide`
   * says which side, looking from `from` to `to`. `weight` sets its thickness in pixels.
   */
  | { kind: 'line'; id: string; from: string; to: string; tone?: DiagramTone; dashed?: boolean; label?: string; labelSide?: 'left' | 'right'; labelAt?: number; weight?: number; /** An arrowhead at `to`. */ arrow?: boolean }
  /**
   * A curve through points (the edge of a cylinder, a sphere's outline), drawn on in order, and
   * joined back to the start when `closed`. Labels as for a line, `labelAt` measured along it.
   */
  | { kind: 'curve'; id: string; points: string[]; closed?: boolean; tone?: DiagramTone; dashed?: boolean; label?: string; labelSide?: 'left' | 'right'; labelAt?: number; weight?: number }
  /**
   * The angle at `at` between the directions to `from` and `to` (the smaller one), with a label on
   * its bisector, or at `labelAt` (0 to 1 from `from` to `to`; beyond 1 places it outside, for an
   * angle that contains a smaller one).
   */
  | { kind: 'angle'; id: string; at: string; from: string; to: string; tone?: DiagramTone; label?: string; /** Arc radius in pixels. */ r?: number; /** Label distance from the vertex in pixels. */ labelDist?: number; labelAt?: number }
  /** A right-angle mark at `at`, between the directions to `from` and `to`. */
  | { kind: 'right'; id: string; at: string; from: string; to: string }
  /** A shaded polygon, such as the triangle being solved; `shade` is its opacity (0.1 by default). */
  | { kind: 'region'; id: string; points: string[]; tone?: DiagramTone; shade?: number }
  /** A label (TeX) beside a point (or on it, with `place: 'center'`); a point's name, with a dot when `dot` is set (hollow when `open`). */
  | { kind: 'label'; id: string; at: string; tex: string; tone?: DiagramTone; place?: Place; dot?: boolean; /** With `dot`, a hollow dot (an endpoint not included). */ open?: boolean }
  /**
   * Scenery. Ground and water run across the diagram at the height of `at`. A cliff, tower,
   * lighthouse, building, flagpole or tree stands on `at` and reaches `top`; a cliff or building
   * extends to the `side` of that line. A person stands on `at` with their eyes at `top`. A boat
   * floats at `at`.
   */
  | { kind: 'thing'; id: string; type: ThingType; at: string; top?: string; side?: 'left' | 'right'; /** Width in diagram units (cliff, building). */ width?: number }
) & { group?: string };

/**
 * A diagram drawn to scale from named points (x to the right, y up, in any unit): lines, angles,
 * labels and scenery such as a cliff and a boat. It fits the space it is given; `height` sets
 * that space in stage pixels.
 */
export interface DiagramEl {
  kind: 'diagram';
  id: string;
  points: Record<string, [number, number]>;
  items: DiagramItem[];
  height?: number;
}

/**
 * A picture of Gradileo itself in a browser window, for videos about the platform: a shot that
 * video/tools/screens.ts takes from the demo (video/out/screens/<shot>.png). Its `spots` are parts
 * of the page that the tool finds by name (a button, a panel); a line emphasises one to ring it and
 * dim the rest of the picture (focus: "app.draft"), and the ring moves on with the emphasis.
 */
export interface ScreenEl {
  kind: 'screen';
  id: string;
  /** The shot's name in video/tools/screens.ts. */
  shot: string;
  /** The address in the window's bar, such as "gradileo.com/t/c/…". */
  url: string;
  /** The part of the page to show, in the shot's pixels: x, y, width, height. All of it by default. */
  view?: [number, number, number, number];
  /** The shot's spots that lines point at. */
  spots?: string[];
  /** Height on the stage in pixels; it fills its column otherwise. */
  height?: number;
}

export type El = TitleEl | TextEl | MathEl | BulletsEl | CalloutEl | TableEl | TriangleEl | SimilarEl | DiagramEl | CalcEl | TryEl | ScreenEl;

export interface Line {
  /** What the narrator says, written as it should be spoken. */
  say: string;
  /** The caption, when it should read differently from what is said. */
  caption?: string;
  show?: string | string[];
  hide?: string | string[];
  /**
   * Emphasise parts ("tri.opp"); the parts listed for an element replace its earlier emphasis,
   * and the element id alone ("tri") clears it.
   */
  focus?: string | string[];
  /** Extra seconds after the line, for example while a "Your turn" counts down. */
  wait?: number;
}

export interface Scene {
  /** Starts a chapter (shown at the top and listed in the YouTube description). */
  chapter?: string;
  /** center: one column; split: a figure on the left and text on the right. */
  layout: 'center' | 'split';
  /** Width of the left column of a split scene in stage pixels (540 by default), for wide figures. */
  leftWidth?: number;
  main?: El[];
  left?: El[];
  right?: El[];
  lines: Line[];
}

export interface Explainer {
  /** The video's id, also its file name: the lesson id, with "-b", "-c"… for further videos. */
  id: string;
  /** The lesson the video teaches; empty for a video about Gradileo itself (the introduction). */
  lessonId: string;
  /** The header and thumbnail label of a video that teaches no lesson. */
  label?: string;
  /** YouTube tags of a video that teaches no lesson (a lesson's video takes its tags from the lesson). */
  tags?: string[];
  title: string;
  /** A shorter title for the thumbnail, when the title is long. */
  thumbnailTitle?: string;
  /**
   * The id of the figure to show on the thumbnail; the first triangle or diagram otherwise, or
   * none with `false` (for a figure too detailed to read at thumbnail size).
   */
  thumbnail?: string | false;
  /** One or two sentences for the YouTube description. */
  summary: string;
  scenes: Scene[];
}

export const asList = (v: string | string[] | undefined): string[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/** Every element of a scene. */
export const sceneElements = (s: Scene): El[] => [...(s.main ?? []), ...(s.left ?? []), ...(s.right ?? [])];

/** The points a diagram part uses. */
export function itemPoints(item: DiagramItem): string[] {
  switch (item.kind) {
    case 'line':
      return [item.from, item.to];
    case 'curve':
      return item.points;
    case 'angle':
    case 'right':
      return [item.at, item.from, item.to];
    case 'region':
      return item.points;
    case 'label':
      return [item.at];
    case 'thing':
      return item.top ? [item.at, item.top] : [item.at];
  }
}

/** Problems with a script: unknown ids, repeated ids, empty lines, unknown diagram points and parts. Empty when it is fine. */
/** A four-digit whole number with no comma, not part of a longer number or a decimal. */
const YEAR_LIKE = /(?<![\d.,])\d{4}(?![\d]|[.,]\d)/g;
/** A minus sign straight after a space or label in maths, which KaTeX sets as subtraction ("− 5"). */
const LOOSE_MINUS = /(\\q?quad|\\text\{[^}]*\})\s*-(?=[\w(\\])/;

/**
 * The letter a, or A, used as a variable, which the voice reads as the article ("uh to the m",
 * "uh x plus B y").
 */
const BARE_A = /(?<![\w"])(?:a (?=to the|over [a-z]\b|and [a-z]\b|squared|cubed)|A (?=x\b|over [A-Z]\b|is (?:negative|positive|zero)\b))/;

/** "The point" before a number: "the point four, zero" can be heard as the decimal 0.40. */
const POINT_NUMBER = /\bthe point (?=(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|negative|\d)\b)/i;

/**
 * What a line's caption says: its own `caption`, or what is said without the quotes that make
 * the voice name a lone letter ("a" is read "ay", where a bare a is read as the article).
 */
export function captionOf(l: Line): string {
  return l.caption ?? l.say.replace(/"([A-Za-z])"/g, '$1');
}

export function checkScript(x: Explainer): string[] {
  const problems: string[] = [];
  if (!x.scenes.length) problems.push('The script has no scenes.');
  x.scenes.forEach((s, si) => {
    const ids = new Set<string>();
    const diagrams = new Map<string, Set<string>>();
    const screens = new Set<string>();
    for (const e of sceneElements(s)) {
      if (ids.has(e.id)) problems.push(`Scene ${si + 1}: the id "${e.id}" is used twice.`);
      ids.add(e.id);
      if (e.kind === 'math') {
        e.lines.forEach((m, mi) => {
          if (LOOSE_MINUS.test(m)) problems.push(`Scene ${si + 1}: maths "${e.id}.${mi}" has a minus after a space or label; write it in braces ({-5}), or it is set as subtraction.`);
        });
      }
      if (e.kind === 'screen') {
        // A screen's parts are its spots.
        diagrams.set(e.id, new Set(e.spots ?? []));
        screens.add(e.id);
      }
      if (e.kind !== 'diagram') continue;
      const parts = new Set<string>();
      const groups = new Set<string>();
      for (const item of e.items) {
        if (parts.has(item.id)) problems.push(`Scene ${si + 1}: diagram "${e.id}" uses the part id "${item.id}" twice.`);
        parts.add(item.id);
        if (item.group) groups.add(item.group);
        for (const pt of itemPoints(item)) if (!(pt in e.points)) problems.push(`Scene ${si + 1}: diagram "${e.id}", part "${item.id}" uses no point "${pt}".`);
      }
      // A line can show or emphasise a part by its id, or a group of parts by the group's name.
      diagrams.set(e.id, new Set([...parts, ...groups]));
    }
    if (!s.lines.length) problems.push(`Scene ${si + 1} has no lines.`);
    s.lines.forEach((l, li) => {
      if (!l.say.trim()) problems.push(`Scene ${si + 1}, line ${li + 1} says nothing.`);
      // The voice reads a bare four-digit whole number like a year (5280 as "fifty-two eighty").
      for (const [n] of l.say.matchAll(YEAR_LIKE)) problems.push(`Scene ${si + 1}, line ${li + 1}: write ${n} as ${n[0]},${n.slice(1)} or in words, or it is read like a year.`);
      const bare = l.say.match(BARE_A);
      if (bare) problems.push(`Scene ${si + 1}, line ${li + 1}: write the variable ${bare[0].trim()} as "${bare[0].trim()}" (in quotes), or it is read as the article.`);
      if (POINT_NUMBER.test(l.say)) problems.push(`Scene ${si + 1}, line ${li + 1}: say "the point at" before coordinates, or "the point four" can be heard as a decimal.`);
      for (const target of [...asList(l.show), ...asList(l.hide), ...asList(l.focus)]) {
        const [el, part] = target.split('.');
        if (!ids.has(el)) problems.push(`Scene ${si + 1}, line ${li + 1}: no element "${target}".`);
        else if (part !== undefined && diagrams.has(el) && !diagrams.get(el)!.has(part)) problems.push(`Scene ${si + 1}, line ${li + 1}: ${screens.has(el) ? 'screen' : 'diagram'} "${el}" has no part "${part}".`);
      }
    });
  });
  return problems;
}

const TONE_MACRO = /\\(opp|adj|hyp|thc|brand|good|bad)\{/g;

/**
 * Script text as plain lesson Markdown, for showing a video's questions in the app: tones become
 * bold and the colour macros are dropped (the video's colours are for its dark stage).
 */
export function plainMarkdown(md: string): string {
  return md.replace(/\[\[\w+:([^\]]+)\]\]/g, '**$1**').replace(TONE_MACRO, '{');
}
