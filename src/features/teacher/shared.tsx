/** Helpers shared by the teacher screens. */
import { useParams } from 'react-router-dom';
import { CheckCircle2, CircleDashed, Clock, Hourglass, PenLine, Send, XCircle } from 'lucide-react';
import type { Assignment, Profile, Submission } from '@/data/types.ts';
import { Badge, type Tone } from '@/components/ui/index.ts';
import { bestSubmission } from '../shared/derive.ts';

export function useClassId(): string {
  const { classId } = useParams();
  return classId ?? '';
}

export type RosterStatus = 'not_started' | 'in_progress' | 'needs_grading' | 'submitted' | 'late' | 'returned' | 'missing';

export interface RosterRow {
  student: Profile;
  status: RosterStatus;
  best: Submission | null;
  open: Submission | null;
  /** The most recent submitted attempt (the one a teacher would reopen). */
  latest: Submission | null;
  attempts: number;
}

export function targetsOf(a: Assignment, roster: Profile[]): Profile[] {
  return a.assignedTo === 'all' ? roster : roster.filter((p) => (a.assignedTo as string[]).includes(p.id));
}

/** Status of every assigned student for one assignment. */
export function rosterStatus(a: Assignment, roster: Profile[], subs: Submission[], now = new Date()): RosterRow[] {
  const overdue = !!a.dueAt && new Date(a.dueAt) < now;
  return targetsOf(a, roster).map((student) => {
    const mine = subs.filter((s) => s.assignmentId === a.id && s.studentId === student.id);
    const best = bestSubmission(mine);
    const open = mine.find((s) => s.status === 'in_progress') ?? null;
    let status: RosterStatus;
    if (best) {
      const pending = mine.some((s) => s.status !== 'in_progress' && s.pendingManual > 0);
      status = pending ? 'needs_grading' : best.status === 'returned' ? 'returned' : best.late ? 'late' : 'submitted';
    } else if (overdue) status = 'missing';
    else if (open) status = 'in_progress';
    else status = 'not_started';
    const done = mine.filter((s) => s.status !== 'in_progress');
    const latest = done.reduce<Submission | null>((l, s) => (!l || s.attempt > l.attempt ? s : l), null);
    return { student, status, best, open, latest, attempts: done.length };
  });
}

export interface AssignmentStats {
  assigned: number;
  submitted: number;
  missing: number;
  needsGrading: number;
  average: number | null;
  median: number | null;
}

export function assignmentStats(rows: RosterRow[]): AssignmentStats {
  const done = rows.filter((r) => r.best);
  const scores = done.map((r) => r.best!.percent).filter((p): p is number => p !== null).sort((a, b) => a - b);
  const avg = scores.length ? Math.round(scores.reduce((s, x) => s + x, 0) / scores.length) : null;
  const med = scores.length ? Math.round(scores.length % 2 ? scores[(scores.length - 1) / 2] : (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2) : null;
  return {
    assigned: rows.length,
    submitted: done.length,
    missing: rows.filter((r) => r.status === 'missing').length,
    needsGrading: rows.filter((r) => r.status === 'needs_grading').length,
    average: avg,
    median: med,
  };
}

const STATUS: Record<RosterStatus, { label: string; tone: Tone; icon: typeof Clock }> = {
  not_started: { label: 'Not started', tone: 'neutral', icon: CircleDashed },
  in_progress: { label: 'In progress', tone: 'info', icon: Hourglass },
  needs_grading: { label: 'Needs grading', tone: 'warn', icon: PenLine },
  submitted: { label: 'Submitted', tone: 'good', icon: CheckCircle2 },
  late: { label: 'Submitted late', tone: 'warn', icon: Clock },
  returned: { label: 'Returned', tone: 'good', icon: Send },
  missing: { label: 'Missing', tone: 'bad', icon: XCircle },
};

export function StatusBadge({ status }: { status: RosterStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <Badge tone={s.tone} icon={<Icon className="h-3 w-3" />}>
      {s.label}
    </Badge>
  );
}

export function statusLabel(status: RosterStatus): string {
  return STATUS[status].label;
}

/** Background + text classes for a score cell. */
export function scoreCell(p: number | null): string {
  if (p === null) return 'text-ink-3';
  if (p >= 80) return 'bg-good-soft text-good-ink';
  if (p >= 60) return 'bg-warn-soft text-warn-ink';
  return 'bg-bad-soft text-bad-ink';
}

export function pct(p: number | null | undefined): string {
  return p === null || p === undefined ? '—' : `${Math.round(p)}%`;
}
