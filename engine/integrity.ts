/**
 * Exam mode (lockdown) records: when a student leaves full screen, switches tabs or turns the
 * camera off during an attempt. The app, the demo and the grading function all read and merge
 * these records with the same rules, so a student's later save never erases earlier exits or
 * the extra allowance only a teacher can grant.
 */
import type { AssignmentSettings } from './assemble.ts';

export type IntegrityEventKind = 'tab' | 'fullscreen' | 'camera';

export interface IntegrityEvent {
  at: string;
  kind: IntegrityEventKind;
}

export interface Integrity {
  /** Times the student left the page (kept for older attempts and summaries). */
  blurCount: number;
  /** Exam mode log, oldest first. */
  events?: IntegrityEvent[];
  /** Exits a teacher has allowed on top of the limit (set by unlocking; students cannot change it). */
  extraExits?: number;
  /** The attempt was submitted because the exit limit was reached. */
  autoSubmitted?: boolean;
  /** The camera was on when the attempt started (exam mode with camera). */
  camera?: boolean;
  /**
   * A teacher reopened the work and the student has not opened this fresh attempt yet. Its clock
   * starts when they do, not when the teacher pressed Reopen. Only the server (or the demo) sets
   * and clears it; `cleanIntegrity` drops it, so a student's save never writes it.
   */
  awaitingStart?: boolean;
}

export const MAX_EVENTS = 200;
const KINDS = new Set<IntegrityEventKind>(['tab', 'fullscreen', 'camera']);

const count = (v: unknown, max = 10_000) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.min(max, Math.floor(v))) : 0);

/** A safe copy of whatever was stored or sent. */
export function cleanIntegrity(raw: unknown): Integrity {
  const r = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const events = Array.isArray(r.events)
    ? r.events
        .filter((e): e is { at: unknown; kind: unknown } => !!e && typeof e === 'object')
        .filter((e) => typeof e.kind === 'string' && KINDS.has(e.kind as IntegrityEventKind) && typeof e.at === 'string')
        .slice(0, MAX_EVENTS)
        .map((e) => ({ at: (e.at as string).slice(0, 40), kind: e.kind as IntegrityEventKind }))
    : undefined;
  const out: Integrity = { blurCount: count(r.blurCount) };
  if (events?.length) out.events = events;
  if (count(r.extraExits)) out.extraExits = count(r.extraExits);
  if (r.autoSubmitted === true) out.autoSubmitted = true;
  if (r.camera === true) out.camera = true;
  return out;
}

/**
 * A student's new record merged into the stored one: exits only ever grow, and the teacher's
 * extra allowance comes from the stored record.
 */
export function mergeIntegrity(stored: unknown, incoming: unknown): Integrity {
  const a = cleanIntegrity(stored);
  const b = cleanIntegrity(incoming);
  const events = (b.events?.length ?? 0) >= (a.events?.length ?? 0) ? b.events : a.events;
  const out: Integrity = { blurCount: Math.max(a.blurCount, b.blurCount) };
  if (events?.length) out.events = events;
  if (a.extraExits) out.extraExits = a.extraExits;
  if (a.autoSubmitted || b.autoSubmitted) out.autoSubmitted = true;
  if (a.camera || b.camera) out.camera = true;
  return out;
}

/** Exits from exam conditions: leaving full screen or switching tabs. */
export function exitCount(i: Integrity | undefined | null): number {
  return (i?.events ?? []).filter((e) => e.kind === 'tab' || e.kind === 'fullscreen').length;
}

export function cameraOffCount(i: Integrity | undefined | null): number {
  return (i?.events ?? []).filter((e) => e.kind === 'camera').length;
}

type Lockdown = Pick<AssignmentSettings, 'lockdown' | 'maxExits' | 'onMaxExits'>;

/** Exits left before the limit, or null when there is no limit. */
export function exitsLeft(s: Lockdown, i: Integrity | undefined | null): number | null {
  if (!s.lockdown || !s.maxExits || s.maxExits <= 0) return null;
  return Math.max(0, s.maxExits + (i?.extraExits ?? 0) - exitCount(i));
}

/** The attempt is locked until the teacher unlocks it. */
export function isLocked(s: Lockdown, i: Integrity | undefined | null): boolean {
  return (s.onMaxExits ?? 'lock') === 'lock' && exitsLeft(s, i) === 0;
}

/** The attempt should be submitted now. */
export function mustSubmit(s: Lockdown, i: Integrity | undefined | null): boolean {
  return s.onMaxExits === 'submit' && exitsLeft(s, i) === 0;
}
