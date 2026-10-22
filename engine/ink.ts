/**
 * Ink: the strokes of the whiteboard, of drawing on slides and of canvas answers.
 *
 * Strokes are stored in board units (a full board is BOARD_W × BOARD_H), so a saved board looks
 * the same on a projector, a laptop and an iPad. Each stroke keeps its points as a flat list of
 * x, y, pressure triples; pressure is 0 to 1 and is 0.5 for a mouse or a finger.
 *
 * A student's working on a written response's canvas is kept in the response as one short string
 * (encodeCanvas), so a page of handwriting fits in the submission and the server can check it.
 */

export type InkTool = 'pen' | 'highlighter';
export type InkColor = 'ink' | 'blue' | 'red' | 'green' | 'orange' | 'purple';
export type BoardBackground = 'plain' | 'grid' | 'lined' | 'dots';

export interface Stroke {
  tool: InkTool;
  color: InkColor;
  /** Base width in board units (the width at medium pressure). */
  size: number;
  /** x, y, pressure triples in board units. */
  points: number[];
}

export interface BoardPage {
  background: BoardBackground;
  strokes: Stroke[];
}

export const BOARD_W = 1600;
export const BOARD_H = 900;
export const INK_COLORS: InkColor[] = ['ink', 'blue', 'red', 'green', 'orange', 'purple'];
export const BACKGROUNDS: BoardBackground[] = ['plain', 'grid', 'lined', 'dots'];
const TOOLS: InkTool[] = ['pen', 'highlighter'];

const okSize = (v: unknown): v is number => typeof v === 'number' && v > 0 && v <= 60;

/**
 * Reads saved pages defensively: boards come from storage and the database, so anything that is
 * not a well-formed stroke is dropped rather than trusted.
 */
export function parsePages(raw: unknown, maxPages = 50): BoardPage[] {
  if (!Array.isArray(raw)) return [];
  const pages: BoardPage[] = [];
  for (const p of raw.slice(0, maxPages)) {
    if (!p || typeof p !== 'object') continue;
    const page = p as { background?: unknown; strokes?: unknown };
    const background = BACKGROUNDS.includes(page.background as BoardBackground) ? (page.background as BoardBackground) : 'plain';
    const strokes: Stroke[] = [];
    if (Array.isArray(page.strokes)) {
      for (const s of page.strokes) {
        if (!s || typeof s !== 'object') continue;
        const st = s as Partial<Stroke>;
        const points = Array.isArray(st.points) ? st.points : [];
        if (!points.length || points.length % 3 !== 0 || !points.every((v) => typeof v === 'number' && Number.isFinite(v))) continue;
        strokes.push({
          tool: TOOLS.includes(st.tool as InkTool) ? (st.tool as InkTool) : 'pen',
          color: INK_COLORS.includes(st.color as InkColor) ? (st.color as InkColor) : 'ink',
          size: okSize(st.size) ? st.size : 6,
          points,
        });
      }
    }
    pages.push({ background, strokes });
  }
  return pages;
}

/** Whether a set of pages has any ink at all. */
export const hasInk = (pages: BoardPage[]) => pages.some((p) => p.strokes.length > 0);

// ---------------------------------------------------------------------------
// Canvas answers

/** Pages a student can use for one written response. */
export const CANVAS_MAX_PAGES = 4;
/** Longest encoded canvas: about 8,000 points, several pages of handwriting. */
export const CANVAS_MAX_LENGTH = 60_000;
/** Smallest gap between recorded points on an answer canvas, in board units (keeps answers small). */
export const CANVAS_POINT_GAP = 3;

const BG_CODE: Record<BoardBackground, string> = { plain: 'p', grid: 'g', lined: 'l', dots: 'd' };
const TOOL_CODE: Record<InkTool, string> = { pen: 'p', highlighter: 'h' };
const COLOR_CODE: Record<InkColor, string> = { ink: 'k', blue: 'b', red: 'r', green: 'g', orange: 'o', purple: 'u' };
const invert = <K extends string>(m: Record<K, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k])) as Record<string, K>;
const BG_OF = invert(BG_CODE);
const TOOL_OF = invert(TOOL_CODE);
const COLOR_OF = invert(COLOR_CODE);
/** Further than this from the board, a point is not believable. */
const FAR = 10_000;

/**
 * One stroke as text: tool, colour and size, then its points as "x,y,p" in whole board units with
 * pressure in tenths. The first point is where the stroke starts and each later one is the step
 * from the point before, so most points take only a few characters.
 */
function encodeStroke(s: Stroke): string {
  const out: string[] = [];
  let px = 0;
  let py = 0;
  for (let i = 0; i < s.points.length; i += 3) {
    const x = Math.round(s.points[i]);
    const y = Math.round(s.points[i + 1]);
    const p = Math.max(0, Math.min(10, Math.round(s.points[i + 2] * 10)));
    if (i > 0 && x === px && y === py) continue;
    out.push(i === 0 ? `${x},${y},${p}` : `${x - px},${y - py},${p}`);
    px = x;
    py = y;
  }
  return `${TOOL_CODE[s.tool]}${COLOR_CODE[s.color]}${Math.round(s.size * 10) / 10}:${out.join(' ')}`;
}

function decodeStroke(text: string): Stroke | null {
  const m = /^([a-z])([a-z])(\d{1,2}(?:\.\d)?):(.+)$/.exec(text);
  const tool = m && TOOL_OF[m[1]];
  const color = m && COLOR_OF[m[2]];
  const size = m ? Number(m[3]) : 0;
  if (!m || !tool || !color || !okSize(size)) return null;
  const points: number[] = [];
  let x = 0;
  let y = 0;
  for (const triple of m[4].split(' ')) {
    const t = triple.split(',');
    if (t.length !== 3 || !t.every((v) => /^-?\d{1,5}$/.test(v))) return null;
    x += Number(t[0]);
    y += Number(t[1]);
    const p = Number(t[2]);
    if (Math.abs(x) > FAR || Math.abs(y) > FAR || p > 10) return null;
    points.push(x, y, p / 10);
  }
  return { tool, color, size, points };
}

/**
 * The text kept in a response for a written answer's canvas: pages separated by "|", each page its
 * paper ("g" for squared) followed by its strokes, separated by ";". Strokes that would make the
 * text longer than `maxLength` are left out, so the result always fits in a submission.
 */
export function encodeCanvas(pages: BoardPage[], maxLength = CANVAS_MAX_LENGTH): string {
  let text = '';
  for (const [i, page] of pages.slice(0, CANVAS_MAX_PAGES).entries()) {
    let part = (i ? '|' : '') + BG_CODE[page.background];
    if (text.length + part.length > maxLength) break;
    for (const s of page.strokes) {
      if (!s.points.length) continue;
      const st = ';' + encodeStroke(s);
      if (text.length + part.length + st.length > maxLength) break;
      part += st;
    }
    text += part;
  }
  return text;
}

/** Reads a canvas answer; pieces that are not well formed are dropped. */
export function decodeCanvas(raw: unknown): BoardPage[] {
  if (typeof raw !== 'string' || !raw) return [];
  return raw
    .split('|')
    .slice(0, CANVAS_MAX_PAGES)
    .map((text) => {
      const [bg, ...strokes] = text.split(';');
      return {
        background: BG_OF[bg] ?? 'grid',
        strokes: strokes.map(decodeStroke).filter((s): s is Stroke => s !== null),
      };
    });
}

/** A canvas answer from a client, checked and rewritten within the limits; undefined when blank. */
export function cleanCanvas(raw: unknown): string | undefined {
  const pages = decodeCanvas(typeof raw === 'string' ? raw.slice(0, CANVAS_MAX_LENGTH * 2) : raw);
  return hasInk(pages) ? encodeCanvas(pages) : undefined;
}
