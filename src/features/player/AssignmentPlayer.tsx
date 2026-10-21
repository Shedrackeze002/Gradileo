/** Focused, distraction-free view for completing an assignment, quiz or exam. */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock, Eye, RefreshCw, Send, X } from 'lucide-react';
import { itemFromRef, TYPE_LABEL, type StoredResponse } from '@engine/assemble.ts';
import { gradeItem, type ItemResult } from '@engine/grade.ts';
import { freshSeed } from '@engine/rng.ts';
import { cleanIntegrity, exitCount, isLocked, mustSubmit, type Integrity, type IntegrityEventKind } from '@engine/integrity.ts';
import type { ItemRef } from '@engine/types.ts';
import { skillInfo } from '@engine/curriculum/index.ts';
import { SkillsGate } from '@/components/SkillsGate.tsx';
import { refSkillIds } from '@/lib/useSkills.ts';
import { api } from '@/data/index.ts';
import { useAssignment, useSubmit } from '@/data/hooks.ts';
import type { Submission } from '@/data/types.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { FocusShell } from '@/components/layout/AppShell.tsx';
import { Button, Modal, PageSpinner, useToast } from '@/components/ui/index.ts';
import { HintPanel, QuestionView, SolutionPanel } from '@/components/question/QuestionView.tsx';
import { cn } from '@/lib/cn.ts';
import { endExamMode, ExamMode } from './ExamMode.tsx';

const MAX_TRIES = 3;

// De-duplicate concurrent starts (React StrictMode runs effects twice in development).
const starting = new Map<string, Promise<Submission>>();
function startOnce(assignmentId: string): Promise<Submission> {
  const hit = starting.get(assignmentId);
  if (hit) return hit;
  const p = api().startSubmission(assignmentId).finally(() => setTimeout(() => starting.delete(assignmentId), 1500));
  starting.set(assignmentId, p);
  return p;
}

export default function AssignmentPlayer() {
  const { assignmentId = '' } = useParams();
  const me = useMe();
  const a = useAssignment(assignmentId);
  const [sub, setSub] = useState<Submission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!a.data) return;
    let alive = true;
    startOnce(a.data.id)
      .then((s) => alive && setSub(s))
      .catch((e) => alive && setError((e as Error).message));
    return () => {
      alive = false;
    };
  }, [a.data, me.id]);

  if (error)
    return (
      <FocusShell>
        <div className="mx-auto max-w-md p-8 text-center">
          <p className="text-ink-2">{error}</p>
          <Button className="mt-4" onClick={() => navigate(`/s/work/${assignmentId}`)}>
            Back
          </Button>
        </div>
      </FocusShell>
    );
  if (!a.data || !sub) return <PageSpinner label="Preparing your questions…" />;
  return (
    <SkillsGate skillIds={refSkillIds(a.data.content, sub.items)}>
      <Player key={sub.id} assignment={a.data} submission={sub} />
    </SkillsGate>
  );
}

function Player({ assignment, submission }: { assignment: NonNullable<ReturnType<typeof useAssignment>['data']>; submission: Submission }) {
  const navigate = useNavigate();
  const toast = useToast();
  const qc = useQueryClient();
  const submitM = useSubmit();
  const instant = assignment.settings.feedback === 'instant';
  const [items, setItems] = useState<ItemRef[]>(submission.items);
  const [responses, setResponses] = useState<Record<number, StoredResponse>>(submission.responses ?? {});
  const [idx, setIdx] = useState(() => {
    const first = submission.items.findIndex((_, i) => !submission.responses?.[i]?.checked && !(submission.responses?.[i]?.answers ?? []).some((x) => x));
    return first < 0 ? 0 : first;
  });
  const [results, setResults] = useState<Record<number, ItemResult>>(() => {
    const r: Record<number, ItemResult> = {};
    submission.items.forEach((ref, i) => {
      const resp = submission.responses?.[i];
      if (resp?.checked) {
        const it = itemFromRef(ref, assignment.content, assignment.id);
        if (it) r[i] = gradeItem(it, resp.answers);
      }
    });
    return r;
  });
  const [confirm, setConfirm] = useState(false);
  const [integrity, setIntegrity] = useState<Integrity>(() => cleanIntegrity(submission.integrity));
  const startedAt = useRef(Date.now());
  const examMode = !!assignment.settings.lockdown;
  const locked = examMode && isLocked(assignment.settings, integrity);
  const done = useRef(false);

  // Exam mode: record an exit (a tab switch and leaving full screen at the same moment count once).
  const record = useCallback((kind: IntegrityEventKind) => {
    if (done.current) return;
    setIntegrity((i) => {
      const events = i.events ?? [];
      const last = events[events.length - 1];
      const exit = kind !== 'camera';
      const twin = exit && last && last.kind !== 'camera' && Date.now() - new Date(last.at).getTime() < 1500;
      const blurCount = i.blurCount + (kind === 'tab' ? 1 : 0);
      if (!examMode || twin) return { ...i, blurCount };
      return { ...i, blurCount, events: [...events, { at: new Date().toISOString(), kind }].slice(-200) };
    });
  }, [examMode]);

  const item = useMemo(() => itemFromRef(items[idx], assignment.content, assignment.id), [items, idx, assignment]);
  const resp: StoredResponse = responses[idx] ?? { answers: [], hintsUsed: 0 };
  const result = results[idx];
  const checked = !!resp.checked;

  // Integrity: count tab switches during quizzes and exams (and anything in exam mode).
  useEffect(() => {
    if (assignment.type !== 'quiz' && assignment.type !== 'exam' && !examMode) return;
    const onVis = () => document.visibilityState === 'hidden' && record('tab');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [assignment.type, examMode, record]);

  // A locked attempt carries on by itself once the teacher unlocks it.
  useEffect(() => {
    if (!locked) return;
    const t = setInterval(() => {
      api()
        .getSubmission(submission.id)
        .then((fresh) => {
          const extra = fresh ? cleanIntegrity(fresh.integrity).extraExits : undefined;
          if (extra !== undefined) setIntegrity((i) => (extra === i.extraExits ? i : { ...i, extraExits: extra }));
        })
        .catch(() => undefined);
    }, 4000);
    return () => clearInterval(t);
  }, [locked, submission.id]);

  // Autosave
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      api().saveProgress(submission.id, { responses, items, integrity }).catch(() => undefined);
    }, 700);
    return () => clearTimeout(saveTimer.current);
  }, [responses, items, integrity, submission.id]);

  const update = (patch: Partial<StoredResponse>) => setResponses((r) => ({ ...r, [idx]: { ...(r[idx] ?? { answers: [], hintsUsed: 0 }), ...patch } }));

  const doSubmit = useCallback(async (finalIntegrity?: Integrity) => {
    try {
      done.current = true;
      await submitM.mutateAsync({ submissionId: submission.id, responses, items, integrity: finalIntegrity ?? integrity });
      endExamMode(submission.id);
      await qc.invalidateQueries({ queryKey: ['submissions'] });
      toast({ kind: 'success', title: 'Submitted!', body: instant || assignment.settings.feedback === 'after_submit' ? 'Your results are ready.' : 'Results will appear after the due date.' });
      navigate(`/s/work/${assignment.id}`, { replace: true });
    } catch (e) {
      done.current = false;
      toast({ kind: 'error', title: 'Could not submit', body: (e as Error).message });
    }
  }, [submitM, submission.id, responses, items, integrity, qc, toast, instant, assignment, navigate]);

  // Exam mode set to submit at the limit.
  const limitSubmitted = useRef(false);
  useEffect(() => {
    if (!examMode || limitSubmitted.current || !mustSubmit(assignment.settings, integrity)) return;
    limitSubmitted.current = true;
    toast({ kind: 'info', title: 'Submitted automatically', body: `You left exam mode ${exitCount(integrity)} times.` });
    void doSubmit({ ...integrity, autoSubmitted: true });
  }, [examMode, assignment.settings, integrity, doSubmit, toast]);

  // Timer
  const limitMs = assignment.settings.timeLimitMinutes ? assignment.settings.timeLimitMinutes * 60_000 : null;
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!limitMs) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [limitMs]);
  const remaining = limitMs ? new Date(submission.startedAt).getTime() + limitMs - now : null;
  const autoSubmitted = useRef(false);
  useEffect(() => {
    if (remaining !== null && remaining <= 0 && !autoSubmitted.current) {
      autoSubmitted.current = true;
      toast({ kind: 'info', title: 'Time is up', body: 'Your answers were submitted automatically.' });
      void doSubmit();
    }
  }, [remaining, doSubmit, toast]);

  if (!item) return <PageSpinner />;

  const answered = (i: number) => !!responses[i]?.canvas || (responses[i]?.answers ?? []).some((x) => x && x.trim());
  const unanswered = items.filter((_, i) => !answered(i)).length;
  const isManual = item.parts.some((p) => p.answer.kind === 'manual');

  const check = () => {
    const r = gradeItem(item, resp.answers);
    if (r.parts.some((p) => p.invalid) && !r.correct) {
      setResults((x) => ({ ...x, [idx]: r }));
      return;
    }
    setResults((x) => ({ ...x, [idx]: r }));
    update({ checked: true, at: new Date().toISOString(), timeMs: Date.now() - startedAt.current });
    startedAt.current = Date.now();
  };

  const trySimilar = () => {
    const ref = items[idx];
    if ('custom' in ref) return;
    const history = [...(resp.history ?? []), { ref, answers: resp.answers, hintsUsed: resp.hintsUsed }];
    const next = items.slice();
    next[idx] = { ...ref, seed: freshSeed() };
    setItems(next);
    setResponses((r) => ({ ...r, [idx]: { answers: [], hintsUsed: 0, history } }));
    setResults((x) => {
      const y = { ...x };
      delete y[idx];
      return y;
    });
  };

  const go = (d: number) => setIdx((i) => Math.max(0, Math.min(items.length - 1, i + d)));
  const last = idx === items.length - 1;
  const tries = (resp.history?.length ?? 0) + 1;
  const canSimilar = instant && assignment.settings.retrySimilar && checked && result && !result.correct && !('custom' in items[idx]) && tries < MAX_TRIES;
  const mm = remaining !== null ? Math.max(0, Math.floor(remaining / 60000)) : 0;
  const ss = remaining !== null ? Math.max(0, Math.floor((remaining % 60000) / 1000)) : 0;

  return (
    <FocusShell>
      {examMode && (
        <ExamMode
          submissionId={submission.id}
          settings={assignment.settings}
          label={TYPE_LABEL[assignment.type].toLowerCase()}
          integrity={integrity}
          locked={locked}
          onEvent={record}
          onCameraStarted={() => setIntegrity((i) => (i.camera ? i : { ...i, camera: true }))}
          onSubmitNow={() => void doSubmit()}
          submitting={submitM.isPending}
        />
      )}
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
          <button type="button" onClick={() => navigate(`/s/work/${assignment.id}`)} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" aria-label="Save and exit">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{assignment.title}</div>
            <div className="text-xs text-ink-3">
              {TYPE_LABEL[assignment.type]} · Question {idx + 1} of {items.length}
            </div>
          </div>
          {remaining !== null && (
            <div className={cn('flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-sm font-semibold', remaining < 5 * 60_000 ? 'bg-bad-soft text-bad-ink' : 'bg-surface-2 text-ink-2')} aria-live="polite">
              <Clock className="h-4 w-4" /> {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
            </div>
          )}
          <Button size="sm" variant={unanswered === 0 ? 'primary' : 'secondary'} icon={<Send className="h-4 w-4" />} onClick={() => setConfirm(true)}>
            Submit
          </Button>
        </div>
        <div className="mx-auto flex max-w-4xl gap-1.5 overflow-x-auto px-4 pb-2.5 scrollbar-thin">
          {items.map((_, i) => {
            const r = results[i];
            const st = instant && responses[i]?.checked ? (r?.correct ? 'right' : 'wrong') : answered(i) ? 'answered' : 'empty';
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Question ${i + 1}`}
                className={cn(
                  'flex h-8 min-w-[32px] items-center justify-center rounded-lg text-xs font-semibold transition',
                  st === 'right' && 'bg-good text-white',
                  st === 'wrong' && 'bg-bad text-white',
                  st === 'answered' && 'bg-brand-100 text-brand-800',
                  st === 'empty' && 'bg-surface-2 text-ink-3',
                  i === idx && 'ring-2 ring-brand ring-offset-2 ring-offset-surface',
                )}
              >
                {st === 'right' ? <Check className="h-4 w-4" /> : st === 'wrong' ? <X className="h-4 w-4" /> : i + 1}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-32 pt-6">
        <div className="card p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
            <span>Question {idx + 1}</span>
            {skillInfo(item.skillId) && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 normal-case tracking-normal">{skillInfo(item.skillId)!.name}</span>}
            {tries > 1 && <span className="rounded-md bg-warn-soft px-1.5 py-0.5 normal-case tracking-normal text-warn-ink">Try {tries}</span>}
          </div>
          <QuestionView
            key={`${idx}:${JSON.stringify(items[idx])}`}
            item={item}
            responses={resp.answers}
            onChange={(answers) => !checked && update({ answers })}
            canvas={resp.canvas}
            onCanvasChange={(canvas) => !checked && update({ canvas })}
            result={instant ? result : result?.parts.some((p) => p.invalid) ? result : null}
            locked={checked}
            showAnswers={checked && !!resp.revealed}
            onEnter={() => (instant && !checked ? check() : undefined)}
            autoFocus
          />
          <div className="mt-5 space-y-3">
            {assignment.settings.hints && !checked && !isManual && <HintPanel hints={item.hints} used={resp.hintsUsed} onReveal={() => update({ hintsUsed: resp.hintsUsed + 1 })} />}
            {instant && checked && result && (
              <div className={cn('flex animate-pop items-center gap-2 rounded-xl px-4 py-3 font-semibold', result.correct ? 'bg-good-soft text-good-ink' : 'bg-bad-soft text-bad-ink')}>
                {result.correct ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                {result.correct ? (resp.hintsUsed ? 'Correct — next time, try it without hints.' : 'Correct!') : result.score > 0 ? 'Partly correct.' : 'Not quite.'}
              </div>
            )}
            {instant && checked && result && !result.correct && (
              <div className="flex flex-wrap gap-2">
                {!resp.revealed && assignment.settings.showSolutions && (
                  <Button variant="secondary" size="sm" icon={<Eye className="h-4 w-4" />} onClick={() => update({ revealed: true })}>
                    Show worked solution
                  </Button>
                )}
                {canSimilar && (
                  <Button variant="soft" size="sm" icon={<RefreshCw className="h-4 w-4" />} onClick={trySimilar}>
                    Try a similar question
                  </Button>
                )}
              </div>
            )}
            {instant && checked && (resp.revealed || (result?.correct && assignment.settings.showSolutions)) && item.solution.length > 0 && (
              <details open={!!resp.revealed} className="group">
                <summary className="cursor-pointer text-sm font-medium text-brand">{resp.revealed ? 'Worked solution' : 'See the worked solution'}</summary>
                <SolutionPanel item={item} className="mt-2" />
              </details>
            )}
          </div>
        </div>
        {examMode ? (
          exitCount(integrity) > 0 && <p className="mt-3 text-center text-xs text-ink-3">You left exam mode {exitCount(integrity)} time{exitCount(integrity) > 1 ? 's' : ''}. Your teacher can see this.</p>
        ) : (
          integrity.blurCount > 0 && (assignment.type === 'quiz' || assignment.type === 'exam') && <p className="mt-3 text-center text-xs text-ink-3">You left this page {integrity.blurCount} time{integrity.blurCount > 1 ? 's' : ''}. Your teacher can see this.</p>
        )}
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" icon={<ArrowLeft className="h-4 w-4" />} disabled={idx === 0} onClick={() => go(-1)}>
            <span className="hidden sm:inline">Previous</span>
          </Button>
          <div className="flex-1" />
          {instant && !checked && !isManual ? (
            <Button size="lg" onClick={check} disabled={!answered(idx)}>
              Check answer
            </Button>
          ) : last ? (
            <Button size="lg" icon={<Send className="h-4 w-4" />} onClick={() => setConfirm(true)}>
              Finish
            </Button>
          ) : (
            <Button size="lg" onClick={() => go(1)}>
              {instant ? 'Next question' : 'Save & next'} <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Submit your work?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Keep working
            </Button>
            <Button loading={submitM.isPending} onClick={() => doSubmit()} icon={<Send className="h-4 w-4" />}>
              Submit
            </Button>
          </>
        }
      >
        {unanswered > 0 ? (
          <p className="text-ink-2">
            You have <strong>{unanswered}</strong> unanswered question{unanswered > 1 ? 's' : ''}. Unanswered questions are marked incorrect.
          </p>
        ) : (
          <p className="text-ink-2">You’ve answered every question. {assignment.settings.feedback === 'after_due' ? 'Results will be released after the due date.' : 'You’ll see your results right away.'}</p>
        )}
      </Modal>
    </FocusShell>
  );
}
