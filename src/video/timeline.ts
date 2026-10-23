/**
 * Turns a script and the length of each narrated line into a timeline, and works out what the
 * stage shows at any moment. Rendering is a pure function of that state, so the same script and
 * narration always give the same frames, and a frame that has not changed can be reused.
 */
import { asList, captionOf, plainMarkdown, sceneElements, type El, type Explainer, type TryEl } from './script.ts';

/**
 * Timing, in seconds. The pauses give a viewer time to read each new step before the narrator
 * moves on, so the videos never feel rushed (the owner asked for a calm, natural pace).
 */
export const TIMING = {
  /** Before the first line of a scene (the scene fades in meanwhile). */
  sceneIn: 1,
  /** After the last line of a scene. */
  sceneOut: 1.6,
  /** Scene fade in and out. */
  fade: 0.35,
  /** Between lines. */
  gap: 0.8,
  /** Extra time after a line that puts something new on the stage, to read it. */
  settle: 0.6,
  /** Highlight changes. */
  focus: 0.45,
  /** Hiding an element. */
  hide: 0.4,
};

/**
 * The faster pace Math 10C, 10-3 and 10-4 were made at, before the calm pace (14 October 2026).
 * Those courses keep it (the owner's decision), so a video of theirs made again uses it too:
 * `video/build.ts --pace old` (with the voice at speed 1).
 */
export const OLD_PACE: Partial<typeof TIMING> = { sceneIn: 0.6, sceneOut: 0.9, gap: 0.35, settle: 0 };

/** How long an element takes to appear. */
export function revealTime(kind: El['kind']): number {
  switch (kind) {
    case 'calc':
      return 1.6;
    case 'triangle':
      return 1.1;
    case 'similar':
      return 0.9;
    case 'diagram':
    case 'screen':
      return 1;
    case 'math':
      return 0.8;
    default:
      return 0.6;
  }
}

export type TimelineEvent =
  | { t: number; kind: 'show' | 'hide'; target: string }
  | { t: number; kind: 'focus'; el: string; parts: string[] }
  | { t: number; kind: 'timer'; target: string; dur: number };

export interface TimedLine {
  /** "scene.line", the key of the line's narration. */
  key: string;
  say: string;
  caption: string;
  /** When the narration starts and ends. */
  start: number;
  end: number;
}

/** A question in the video, in plain lesson Markdown, for Gradileo's player to ask. */
export interface Cue {
  id: string;
  /** When Gradileo's player pauses to ask the question. */
  t: number;
  prompt: string;
  choices?: string[];
  answer: number | string;
  working?: string;
}

export interface Timeline {
  id: string;
  duration: number;
  scenes: Array<{ start: number; end: number; chapter: string | null; kinds: Record<string, El['kind']>; events: TimelineEvent[] }>;
  lines: TimedLine[];
  chapters: Array<{ title: string; t: number }>;
  cues: Cue[];
}

const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** `durations` maps each line's key ("scene.line") to the length of its narration in seconds. */
export function compile(x: Explainer, durations: Record<string, number>): Timeline {
  const scenes: Timeline['scenes'] = [];
  const lines: TimedLine[] = [];
  const chapters: Timeline['chapters'] = [];
  const cues: Cue[] = [];
  let t = 0;
  let chapter: string | null = null;
  x.scenes.forEach((s, si) => {
    const start = t;
    const kinds: Record<string, El['kind']> = {};
    const tries = new Map<string, TryEl>();
    for (const e of sceneElements(s)) {
      kinds[e.id] = e.kind;
      if (e.kind === 'try') tries.set(e.id, e);
    }
    if (s.chapter) {
      chapter = s.chapter;
      chapters.push({ title: s.chapter, t: r3(start) });
    }
    const events: TimelineEvent[] = [];
    t += TIMING.sceneIn;
    s.lines.forEach((l, li) => {
      const key = `${si}.${li}`;
      const dur = durations[key];
      if (!(dur > 0)) throw new Error(`No narration length for line ${key}.`);
      const at = r3(t);
      for (const target of asList(l.show)) events.push({ t: at, kind: 'show', target });
      for (const target of asList(l.hide)) events.push({ t: at, kind: 'hide', target });
      const focus = new Map<string, string[]>();
      for (const f of asList(l.focus)) {
        const [el, part] = f.split('.');
        const parts = focus.get(el) ?? [];
        if (part !== undefined) parts.push(part);
        focus.set(el, parts);
      }
      for (const [el, parts] of focus) events.push({ t: at, kind: 'focus', el, parts });
      const end = r3(t + dur);
      lines.push({ key, say: l.say, caption: captionOf(l), start: at, end });
      // A "Your turn" shown on this line counts down once the line is spoken; Gradileo pauses there.
      for (const target of asList(l.show)) {
        const q = tries.get(target);
        if (!q) continue;
        if (l.wait) events.push({ t: end, kind: 'timer', target, dur: l.wait });
        cues.push({
          id: `${x.id}:${q.id}`,
          t: r3(end + 0.2),
          prompt: plainMarkdown(q.prompt),
          ...(q.choices ? { choices: q.choices.map(plainMarkdown) } : {}),
          answer: typeof q.answer === 'string' ? plainMarkdown(q.answer) : q.answer,
          ...(q.working ? { working: plainMarkdown(q.working) } : {}),
        });
      }
      t = end + TIMING.gap + (asList(l.show).length ? TIMING.settle : 0) + (l.wait ?? 0);
    });
    t += TIMING.sceneOut - TIMING.gap;
    scenes.push({ start: r3(start), end: r3(t), chapter, kinds, events });
  });
  return { id: x.id, duration: r3(t), scenes, lines, chapters, cues };
}

export interface ElState {
  /** How far the element has appeared (0 to 1), or faded after being hidden. */
  p: number;
  /** Parts shown so far and how far each has appeared. */
  parts: Record<string, number>;
  /** Whether the element was shown whole (every part visible). */
  whole: boolean;
  /** Emphasis of each part (0 to 1). */
  focus: Record<string, number>;
  /** A "Your turn" countdown (0 to 1). */
  timer?: number;
}

export interface FrameState {
  scene: number;
  /** Scene opacity (fades between scenes). */
  fade: number;
  chapter: string | null;
  els: Record<string, ElState>;
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3;
export const easeInOut = (x: number) => {
  const v = clamp01(x);
  return v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2;
};
const q = (x: number) => Math.round(x * 1000) / 1000;

/** What the stage shows at time t. */
export function stateAt(tl: Timeline, t: number): FrameState {
  let si = tl.scenes.findIndex((s) => t < s.end);
  if (si < 0) si = tl.scenes.length - 1;
  const s = tl.scenes[si];
  const fade = q(Math.min(clamp01((t - s.start) / TIMING.fade), clamp01((s.end - t) / TIMING.fade)));
  const shown: Record<string, { at: number; hiddenAt: number | null; whole: boolean; parts: Record<string, number>; partHidden: Record<string, number> }> = {};
  const focus: Record<string, Record<string, { on: number | null; off: number | null }>> = {};
  const timers: Record<string, { at: number; dur: number }> = {};
  for (const ev of s.events) {
    if (ev.t > t) break;
    if (ev.kind === 'show') {
      const [el, part] = ev.target.split('.');
      const cur = shown[el];
      const fresh = !cur || cur.hiddenAt !== null;
      const st = fresh ? { at: ev.t, hiddenAt: null, whole: false, parts: {}, partHidden: {} } : cur;
      if (part === undefined) st.whole = true;
      else if (!(part in st.parts) || part in st.partHidden) {
        st.parts[part] = ev.t;
        delete st.partHidden[part];
      }
      shown[el] = st;
    } else if (ev.kind === 'hide') {
      const [el, part] = ev.target.split('.');
      const cur = shown[el];
      if (!cur || cur.hiddenAt !== null) continue;
      // A part shown on its own can be hidden on its own; anything else hides the whole element.
      if (part !== undefined && part in cur.parts && !cur.whole) {
        if (!(part in cur.partHidden)) cur.partHidden[part] = ev.t;
      } else cur.hiddenAt = ev.t;
    } else if (ev.kind === 'focus') {
      const f = (focus[ev.el] ??= {});
      for (const [part, v] of Object.entries(f)) if (v.on !== null && !ev.parts.includes(part)) f[part] = { on: null, off: ev.t };
      for (const part of ev.parts) if (!f[part] || f[part].on === null) f[part] = { on: ev.t, off: null };
    } else if (ev.kind === 'timer') {
      timers[ev.target] = { at: ev.t, dur: ev.dur };
    }
  }
  const els: Record<string, ElState> = {};
  for (const [el, st] of Object.entries(shown)) {
    const reveal = revealTime(s.kinds[el] ?? 'text');
    const appear = easeOut((t - st.at) / reveal);
    const p = st.hiddenAt === null ? appear : appear * (1 - easeOut((t - st.hiddenAt) / TIMING.hide));
    if (p <= 0 && st.hiddenAt !== null) continue;
    const parts: Record<string, number> = {};
    for (const [part, at] of Object.entries(st.parts)) {
      const hid = st.partHidden[part];
      if (hid === undefined) parts[part] = q(easeOut((t - at) / reveal));
      else {
        const v = easeOut((t - at) / reveal) * (1 - easeOut((t - hid) / TIMING.hide));
        if (v > 0) parts[part] = q(v);
      }
    }
    const fs: Record<string, number> = {};
    for (const [part, v] of Object.entries(focus[el] ?? {})) {
      const e = v.on !== null ? easeInOut((t - v.on) / TIMING.focus) : v.off !== null ? 1 - easeInOut((t - v.off) / TIMING.focus) : 0;
      if (e > 0) fs[part] = q(e);
    }
    const timer = timers[el];
    els[el] = { p: q(p), parts, whole: st.whole, focus: fs, ...(timer ? { timer: q(clamp01((t - timer.at) / timer.dur)) } : {}) };
  }
  return { scene: si, fade, chapter: s.chapter, els };
}

/** How far a part has appeared: the whole element, or just this part. */
export function partShown(st: ElState | undefined, part: string): number {
  if (!st) return 0;
  return st.whole ? st.p : Math.min(st.p, st.parts[part] ?? 0);
}

/** For parts that showing the whole element does not include (a question's answer). */
export function ownPart(st: ElState | undefined, part: string): number {
  return st ? Math.min(st.p, st.parts[part] ?? 0) : 0;
}

/** "m:ss" for a time in seconds. */
export function clock(t: number): string {
  const s = Math.floor(t);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * YouTube chapters: they need to start at 0:00, there must be at least three, and each must last
 * at least ten seconds. A chapter too short to list gives its start to the next one (and a short
 * last chapter joins the one before). Null when fewer than three are left.
 */
export function youtubeChapters(tl: Timeline): Array<{ title: string; t: number }> | null {
  const list = tl.chapters.length && tl.chapters[0].t === 0 ? tl.chapters : [{ title: 'Introduction', t: 0 }, ...tl.chapters];
  const out: Array<{ title: string; t: number }> = [];
  for (const c of list) {
    const last = out[out.length - 1];
    if (last && c.t - last.t < 10) out[out.length - 1] = { title: c.title, t: last.t };
    else out.push({ ...c });
  }
  if (out.length > 1 && tl.duration - out[out.length - 1].t < 10) out.pop();
  return out.length >= 3 ? out : null;
}
