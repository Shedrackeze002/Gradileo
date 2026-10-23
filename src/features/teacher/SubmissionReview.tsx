import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { CameraOff, ChevronLeft, ChevronRight, Clock, Eye, Lightbulb, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { isQuestionType, itemFromRef } from '@engine/assemble.ts';
import { cameraOffCount, exitCount } from '@engine/integrity.ts';
import { markSteps, type MarkResult } from '@engine/ai/marking.ts';
import { api } from '@/data/index.ts';
import { qk, useAssignment, useProfile, useRoster, useSubmission, useSubmissions, useSuggestMark } from '@/data/hooks.ts';
import type { Assignment, Submission } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, EmptyState, PageHeader, PageSpinner, Textarea, useToast } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { canvasPageImages } from '@/features/whiteboard/pageImages.ts';
import { ReviewList } from '@/components/question/ReviewList.tsx';
import { SkillsGate } from '@/components/SkillsGate.tsx';
import { refSkillIds } from '@/lib/useSkills.ts';
import { fmtDateTime } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

const fmtTime = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
};
import { scoreCell, useClassId } from './shared.tsx';

/** Waits for the attempt's question generators before showing the review. */
export default function SubmissionReview() {
  const { submissionId = '' } = useParams();
  const sub = useSubmission(submissionId);
  const a = useAssignment(sub.data?.assignmentId ?? undefined);
  return (
    <SkillsGate skillIds={refSkillIds(a.data?.content, sub.data?.items)}>
      <Review />
    </SkillsGate>
  );
}

function Review() {
  const classId = useClassId();
  const { submissionId = '' } = useParams();
  const sub = useSubmission(submissionId);
  const a = useAssignment(sub.data?.assignmentId ?? undefined);
  const student = useProfile(sub.data?.studentId);
  const siblings = useSubmissions({ assignmentId: sub.data?.assignmentId ?? undefined }, !!sub.data?.assignmentId);
  const roster = useRoster(classId);
  const navigate = useNavigate();

  const order = useMemo(() => {
    const names = new Map((roster.data ?? []).map((p) => [p.id, p.fullName]));
    return (siblings.data ?? [])
      .filter((s) => s.status !== 'in_progress')
      .sort((x, y) => (y.pendingManual > 0 ? 1 : 0) - (x.pendingManual > 0 ? 1 : 0) || (names.get(x.studentId) ?? '').localeCompare(names.get(y.studentId) ?? '') || x.attempt - y.attempt);
  }, [siblings.data, roster.data]);

  if (sub.isLoading || (sub.data?.assignmentId && a.isLoading)) return <PageSpinner />;
  if (!sub.data) return <EmptyState title="Submission not found" />;
  const s = sub.data;
  const idx = order.findIndex((x) => x.id === s.id);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const timeMs = Object.values(s.responses).reduce((t, r) => t + (r.timeMs ?? 0), 0);
  const hints = Object.values(s.responses).reduce((t, r) => t + (r.hintsUsed ?? 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        back={a.data ? { to: `/t/c/${classId}/assignments/${a.data.id}`, label: a.data.title } : { to: `/t/c/${classId}`, label: 'Overview' }}
        title={
          <span className="flex items-center gap-3">
            <Avatar name={student.data?.fullName ?? '?'} color={student.data?.avatarColor} size={40} />
            {student.data?.fullName ?? 'Student'}
          </span>
        }
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            <span>Attempt {s.attempt}</span>
            <span>·</span>
            <span>{s.submittedAt ? `Submitted ${fmtDateTime(s.submittedAt)}` : 'In progress'}</span>
            {s.late && <Badge tone="warn">Late</Badge>}
            {s.status === 'returned' && <Badge tone="good">Returned</Badge>}
          </span>
        }
        actions={
          order.length > 1 && (
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" disabled={!prev} onClick={() => prev && navigate(`/t/c/${classId}/submissions/${prev.id}`)} icon={<ChevronLeft className="h-4 w-4" />}>
                Previous
              </Button>
              <span className="px-2 text-sm text-ink-3">
                {idx + 1} of {order.length}
              </span>
              <Button variant="secondary" size="sm" disabled={!next} onClick={() => next && navigate(`/t/c/${classId}/submissions/${next.id}`)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-4">
          {s.items.length === 0 ? (
            <Card>
              <CardBody className="text-ink-2">{a.data && !isQuestionType(a.data.type) ? 'The student marked this as complete.' : 'No questions in this submission.'}</CardBody>
            </Card>
          ) : (
            <ReviewList
              key={s.id}
              items={s.items}
              responses={s.responses}
              content={a.data?.content ?? { sections: [], custom: [] }}
              assignmentId={a.data?.id ?? 'practice'}
              renderExtra={(i) => (a.data ? <ManualGrader key={`${s.id}-${i}`} s={s} a={a.data} index={i} /> : null)}
            />
          )}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-ink-3">Score</div>
                <div className="mt-1 font-display text-4xl font-semibold">{s.percent !== null ? `${Math.round(s.percent)}%` : '—'}</div>
              </div>
              {s.maxScore ? (
                <div className={cn('rounded-lg px-2.5 py-1 text-sm font-semibold', scoreCell(s.percent))}>
                  {Math.round((s.score ?? 0) * 10) / 10} / {s.maxScore}
                </div>
              ) : null}
            </div>
            {s.pendingManual > 0 && <p className="mt-3 rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn-ink">{s.pendingManual} written response{s.pendingManual === 1 ? '' : 's'} to grade.</p>}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="flex items-center gap-1.5 text-ink-3">
                  <Clock className="h-4 w-4" /> Time on task
                </dt>
                <dd className="font-medium">{timeMs ? `${Math.max(1, Math.round(timeMs / 60000))} min` : '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1.5 text-ink-3">
                  <Lightbulb className="h-4 w-4" /> Hints used
                </dt>
                <dd className="font-medium">{hints}</dd>
              </div>
              {a.data?.settings.lockdown ? (
                <>
                  <div className="flex justify-between">
                    <dt className="flex items-center gap-1.5 text-ink-3">
                      <ShieldCheck className="h-4 w-4" /> Left exam mode
                    </dt>
                    <dd className="font-medium">{exitCount(s.integrity)}×</dd>
                  </div>
                  {a.data.settings.camera && (
                    <div className="flex justify-between">
                      <dt className="flex items-center gap-1.5 text-ink-3">
                        <CameraOff className="h-4 w-4" /> Camera turned off
                      </dt>
                      <dd className="font-medium">{s.integrity.camera ? `${cameraOffCount(s.integrity)}×` : 'Never on'}</dd>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-ink-3">
                    <Eye className="h-4 w-4" /> Left the tab
                  </dt>
                  <dd className="font-medium">{s.integrity?.blurCount ?? 0}×</dd>
                </div>
              )}
            </dl>
            {a.data?.settings.lockdown && (s.integrity.events?.length ?? 0) > 0 && (
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer font-medium text-brand">Exam mode record</summary>
                <ol className="mt-2 space-y-1 text-ink-2" aria-label="Exam mode record">
                  {s.integrity.events!.map((e, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span>{e.kind === 'tab' ? 'Switched tab or app' : e.kind === 'fullscreen' ? 'Left full screen' : 'Camera turned off'}</span>
                      <span className="tabular-nums text-ink-3">{fmtTime(e.at)}</span>
                    </li>
                  ))}
                </ol>
                {s.integrity.autoSubmitted && <p className="mt-2 font-medium text-bad-ink">Submitted automatically at the exit limit.</p>}
              </details>
            )}
          </Card>
          {s.status !== 'in_progress' && <FeedbackCard key={s.id} s={s} />}
        </aside>
      </div>
    </div>
  );
}

function ManualGrader({ s, a, index }: { s: Submission; a: Assignment; index: number }) {
  const item = itemFromRef(s.items[index], a.content, a.id);
  const resp = s.responses[index];
  const [score, setScore] = useState<number | null>(resp?.manualScore ?? null);
  const [comment, setComment] = useState(resp?.comment ?? '');
  const [busy, setBusy] = useState(false);
  const qc = useQueryClient();
  const toast = useToast();
  if (!item || !item.parts.some((p) => p.answer.kind === 'manual')) return null;
  const pts = Math.max(1, Math.round(item.points ?? 1));
  const steps = markSteps(pts);
  return (
    <div className="space-y-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4">
      <SuggestedMark
        s={s}
        index={index}
        canvas={resp?.canvas}
        points={pts}
        onUse={(m) => {
          setScore(m.points / pts);
          if (!comment.trim() && m.comment) setComment(m.comment);
        }}
      />
      <div className="text-sm font-semibold">Your grade</div>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Points">
        {steps.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={score !== null && Math.abs(score * pts - p) < 1e-6}
            onClick={() => setScore(p / pts)}
            className={cn('h-9 min-w-[2.75rem] rounded-lg border px-2 text-sm font-semibold transition', score !== null && Math.abs(score * pts - p) < 1e-6 ? 'border-brand bg-brand text-brand-ink' : 'border-line bg-surface hover:border-line-strong')}
          >
            {p}
          </button>
        ))}
        <span className="self-center pl-1 text-sm text-ink-3">/ {pts}</span>
      </div>
      <Textarea rows={2} placeholder="Comment for the student (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
      <div className="flex justify-end">
        <Button
          size="sm"
          disabled={score === null}
          loading={busy}
          onClick={async () => {
            if (score === null) return;
            setBusy(true);
            try {
              const updated = await api().gradeManual(s.id, index, score, comment.trim() || undefined);
              qc.setQueryData(qk.submission(s.id), updated);
              await qc.invalidateQueries({ queryKey: ['submissions'] });
              toast({ kind: 'success', title: 'Grade saved' });
            } catch (e) {
              toast({ kind: 'error', title: 'Could not save', body: (e as Error).message });
            } finally {
              setBusy(false);
            }
          }}
        >
          Save grade
        </Button>
      </div>
    </div>
  );
}

const CONFIDENCE = { high: 'High confidence', medium: 'Medium confidence', low: 'Low confidence' } as const;

/** "Suggest a mark": the AI reads the question, the marking guide and the answer (canvas included). */
function SuggestedMark({ s, index, canvas, points, onUse }: { s: Submission; index: number; canvas?: string; points: number; onUse: (m: { points: number; comment: string }) => void }) {
  const suggest = useSuggestMark(s.id, index);
  const [result, setResult] = useState<MarkResult | null>(null);
  const m = result?.suggestion;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="soft"
          icon={<Sparkles className="h-4 w-4" />}
          loading={suggest.isPending}
          onClick={async () => {
            try {
              setResult(await suggest.mutateAsync(canvasPageImages(canvas)));
            } catch {
              setResult(null);
            }
          }}
        >
          {suggest.isPending ? 'Reading the answer…' : result ? 'Suggest again' : 'Suggest a mark'}
        </Button>
        {!result && !suggest.isPending && <span className="text-xs text-ink-3">The AI reads the answer{canvas ? ' and the working on the canvas' : ''} against the marking guide. You decide the mark.</span>}
      </div>
      {suggest.isError && <p className="rounded-lg bg-bad-soft px-3 py-2 text-sm text-bad-ink">{(suggest.error as Error).message || 'Could not suggest a mark. Please try again.'}</p>}
      {result && !m && result.note && <p className="rounded-lg bg-info-soft px-3 py-2 text-sm text-info-ink">{result.note}</p>}
      {m && (
        <div className="space-y-2 rounded-xl border border-line bg-surface p-3 text-sm" aria-label="Suggested mark">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">
              Suggested: {m.points} / {points}
            </span>
            <Badge tone={m.confidence === 'high' ? 'good' : m.confidence === 'low' ? 'warn' : 'neutral'}>{CONFIDENCE[m.confidence]}</Badge>
            <Button size="xs" className="ml-auto" onClick={() => onUse(m)}>
              Use this mark
            </Button>
          </div>
          <Markdown md={m.reasons} sanitize className="text-ink-2" />
          {m.comment && (
            <div className="text-ink-3">
              <span className="font-medium text-ink-2">Comment for the student: </span>
              {m.comment}
            </div>
          )}
          {result.note && <p className="rounded-lg bg-warn-soft px-3 py-2 text-warn-ink">{result.note}</p>}
          <p className="text-xs text-ink-3">A suggestion only. Nothing is saved until you choose a mark and press Save grade.</p>
        </div>
      )}
    </div>
  );
}

function FeedbackCard({ s }: { s: Submission }) {
  const [text, setText] = useState(s.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const qc = useQueryClient();
  const toast = useToast();
  return (
    <Card className="p-5">
      <div className="text-sm font-semibold">Feedback</div>
      <p className="mt-0.5 text-xs text-ink-3">Returning the work notifies the student with your message.</p>
      <Textarea className="mt-3" rows={4} placeholder="What went well, and one thing to work on…" value={text} onChange={(e) => setText(e.target.value)} />
      <Button
        className="mt-3 w-full"
        icon={<Send className="h-4 w-4" />}
        loading={busy}
        disabled={s.pendingManual > 0}
        title={s.pendingManual > 0 ? 'Grade the written responses first' : undefined}
        onClick={async () => {
          setBusy(true);
          try {
            const updated = await api().returnSubmission(s.id, text.trim());
            qc.setQueryData(qk.submission(s.id), updated);
            await qc.invalidateQueries({ queryKey: ['submissions'] });
            toast({ kind: 'success', title: 'Returned to the student' });
          } catch (e) {
            toast({ kind: 'error', title: 'Could not return', body: (e as Error).message });
          } finally {
            setBusy(false);
          }
        }}
      >
        {s.status === 'returned' ? 'Update and return again' : 'Return to student'}
      </Button>
    </Card>
  );
}

