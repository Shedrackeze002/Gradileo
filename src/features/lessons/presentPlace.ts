/**
 * Where a presentation is, kept for the browser tab: the slide and step, whether drawing and the
 * whiteboard are open, the ink on each slide and the whiteboard's pages. Safari on an iPad reloads
 * a page it had to drop (or one pulled down from the top), and the teacher carries on from the
 * same slide with their ink instead of starting again. Kept in sessionStorage, so it lasts as long
 * as the tab and is never sent anywhere.
 */
import { parsePages, type BoardPage, type Stroke } from '@/lib/ink.ts';

/** Larger than this, the ink is left out (sessionStorage holds about 5 MB). */
const MAX_CHARS = 3_000_000;

export interface PresentPlace {
  slide: string;
  step: number;
  drawing: boolean;
  board: boolean;
  /** Ink on each slide, by slide id. */
  notes: Record<string, Stroke[]>;
}

export interface KeptBoard {
  pages: BoardPage[];
  ix: number;
  boardId?: string;
  title: string;
  dirty: boolean;
}

export const placeKey = (classId: string, lessonId: string) => `gradileo-present:${classId}:${lessonId}`;

function read(key: string): Record<string, unknown> | null {
  try {
    const v: unknown = JSON.parse(sessionStorage.getItem(key) ?? 'null');
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: object, light: object) {
  try {
    const full = JSON.stringify(value);
    sessionStorage.setItem(key, full.length <= MAX_CHARS ? full : JSON.stringify(light));
  } catch {
    /* storage full or blocked: a reload starts from the beginning, as before */
  }
}

const strokesOf = (raw: unknown): Stroke[] => parsePages([{ strokes: raw }])[0]?.strokes ?? [];

export function readPlace(key: string): Partial<PresentPlace> {
  const v = read(key);
  if (!v) return {};
  const notes: Record<string, Stroke[]> = {};
  if (v.notes && typeof v.notes === 'object') {
    for (const [id, raw] of Object.entries(v.notes as Record<string, unknown>)) {
      const strokes = strokesOf(raw);
      if (strokes.length) notes[id] = strokes;
    }
  }
  return {
    slide: typeof v.slide === 'string' ? v.slide : undefined,
    step: typeof v.step === 'number' && v.step >= 0 ? v.step : undefined,
    drawing: v.drawing === true,
    board: v.board === true,
    notes,
  };
}

export function keepPlace(key: string, place: PresentPlace) {
  write(key, place, { ...place, notes: {} });
}

export function readBoard(key: string): KeptBoard | null {
  const v = read(key);
  if (!v) return null;
  const pages = parsePages(v.pages);
  if (!pages.length) return null;
  return {
    pages,
    ix: typeof v.ix === 'number' ? Math.max(0, Math.min(pages.length - 1, Math.floor(v.ix))) : 0,
    boardId: typeof v.boardId === 'string' ? v.boardId : undefined,
    title: typeof v.title === 'string' ? v.title.slice(0, 120) : '',
    dirty: v.dirty === true,
  };
}

export function keepBoard(key: string, board: KeptBoard) {
  // Too much ink to keep: keep nothing, rather than a board with pages missing.
  write(key, board, {});
}

/** The teacher left the presentation: the next one starts from the beginning. */
export function forgetPlace(key: string) {
  try {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}:board`);
  } catch {
    /* blocked storage keeps nothing anyway */
  }
}
