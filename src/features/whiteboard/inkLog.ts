/**
 * A short trail of what the drawing tools did: which pointer touched the board, which strokes were
 * kept or dropped, and what pressed Undo, Clear or a tool (the pencil, a finger or a resting palm).
 * It holds no ink and no text, only event names, sizes and times. It stays in the browser tab
 * (sessionStorage) and goes nowhere unless the teacher copies it from present mode's settings, to
 * send when writing vanishes on a device where the cause cannot be seen from outside.
 */
const KEY = 'gradileo-ink-log';
const MAX = 400;

let lines: string[] | null = null;
let saving = 0;

function load(): string[] {
  if (lines) return lines;
  try {
    const v: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
    lines = Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(-MAX) : [];
  } catch {
    lines = [];
  }
  return lines;
}

function save() {
  saving = 0;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(lines ?? []));
  } catch {
    /* storage full or blocked: the trail lasts until the page reloads */
  }
}

const clock = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`;

/** Adds a line to the trail: what happened, and a few small values that explain it. */
export function inkLog(what: string, data?: Record<string, string | number | boolean | null | undefined>) {
  const all = load();
  const extra = data
    ? Object.entries(data)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${k}=${typeof v === 'number' ? Math.round(v * 100) / 100 : String(v).slice(0, 60)}`)
        .join(' ')
    : '';
  all.push(`${clock(new Date())} ${what}${extra ? ` ${extra}` : ''}`);
  if (all.length > MAX) all.splice(0, all.length - MAX);
  if (!saving && typeof window !== 'undefined') saving = window.setTimeout(save, 1000);
}

/** What a pointer event was, in a few words. */
export function pointerNote(e: { pointerType: string; pointerId: number; buttons: number; pressure: number; width: number; height: number }) {
  return { by: e.pointerType, id: e.pointerId, buttons: e.buttons, pressure: e.pressure, size: `${Math.round(e.width)}x${Math.round(e.height)}` };
}

/** The trail as text, with the device it came from. */
export function inkLogText(): string {
  const head = typeof window === 'undefined' ? '' : `Gradileo drawing log\n${navigator.userAgent}\nscreen ${window.innerWidth}x${window.innerHeight} @${window.devicePixelRatio} touch points ${navigator.maxTouchPoints}\n`;
  return `${head}${load().join('\n')}\n`;
}

/** Empties the trail (for tests). */
export function clearInkLog() {
  lines = [];
}
