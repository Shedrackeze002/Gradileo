import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Eye, Lightbulb, ListChecks, RotateCcw, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { isQuestionType, TYPE_LABEL } from '@engine/assemble.ts';
import { LEVEL_LABEL, type MasteryLevel } from '@engine/mastery.ts';
import { skillInfo, lessonById } from '@engine/curriculum/index.ts';
import { api } from '@/data/index.ts';
import { qk, useAssignment, useSubmissions } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Button, Card, CardBody, Checkbox, EmptyState, PageHeader, PageSpinner, useToast } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { ReviewList } from '@/components/question/ReviewList.tsx';
import { MasterySwatch } from '@/components/mastery/Mastery.tsx';
import { dueLabel, fmtDateTime } from '@/lib/dates.ts';
import { VideoEmbed } from '../lessons/LessonBlocks.tsx';
import { bestSubmission, heldUntilDue, itemCount, percentTone, resultsVisible } from '../shared/derive.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { cn } from '@/lib/cn.ts';

export default function AssignmentIntro() {
  const { assignmentId = '' } = useParams();
  const me = useMe();
  const a = useAssignment(assignmentId);
  const subs = useSubmissions({ assignmentId, studentId: me.id });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [review, setReview] = useState(false);
  const [consent, setConsent] = useState(false);

  const mine = useMemo(() => (subs.data ?? []).filter((s) => s.studentId === me.id), [subs.data, me.id]);
  if (a.isLoading || subs.isLoading) return <PageSpinner />;
  if (!a.data) return <EmptyState title="Assignment not found" action={<Button to="/s/work">Back to classwork</Button>} />;
  const as = a.data;
  const best = bestSubmission(mine);
  const open = mine.find((s) => s.status === 'in_progress');
  const used = mine.filter((s) => s.status !== 'in_progress').length;
  const attemptsLeft = as.settings.attempts ? as.settings.attempts - used : Infinity;
  const due = dueLabel(as.dueAt);
  const closed = !!as.dueAt && new Date(as.dueAt) < new Date() && !as.allowLate;
  const visible = resultsVisible(as);
  const qType = isQuestionType(as.type);
  const lesson = as.content.lessonId ? lessonById(as.content.lessonId) : undefined;

  const markComplete = async () => {
    setBusy(true);
    try {
      const s = open ?? (await api().startSubmission(as.id));
      await api().submit(s.id, { responses: {}, items: [] });
      await qc.invalidateQueries({ queryKey: ['submissions'] });
      toast({ kind: 'success', title: 'Marked as complete' });
    } catch (e) {
      toast({ kind: 'error', title: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        back={{ to: '/s/work', label: 'Classwork' }}
        eyebrow={TYPE_LABEL[as.type]}
        title={as.title}
        subtitle={
          <span className={cn(due.tone === 'overdue' ? 'text-bad-ink' : due.tone === 'urgent' ? 'text-warn-ink' : '')}>
            {/* "Due today at 3:00 PM · Fri, Nov 13 at 3:00 PM" adds the date; "Due Fri, Nov 13" would only repeat it. */}
            {as.dueAt && !/today|tomorrow|Overdue|Was due/.test(due.text) ? `Due ${fmtDateTime(as.dueAt)}` : `${due.text}${as.dueAt ? ` · ${fmtDateTime(as.dueAt)}` : ''}`}
          </span>
        }
      />

      {as.createdBy === 'ai' && as.aiRationale && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-4 text-sm">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <div>
            <div className="font-semibold text-brand-800">Picked for you</div>
            <div className="mt-0.5 text-ink-2">{as.aiRationale}</div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-3">
              <TypeIcon type={as.type} />
              <div className="text-sm text-ink-3">{qType ? `${itemCount(as)} questions` : as.type === 'lesson' ? 'Lesson reading' : as.type === 'video' ? 'Video' : 'Reading'}</div>
            </div>
            {as.instructions ? <Markdown md={as.instructions} sanitize /> : <p className="text-ink-3">No extra instructions.</p>}
            {as.type === 'video' && as.content.resourceUrl && <VideoEmbed url={as.content.resourceUrl} title={as.title} />}
            {as.type === 'reading' && as.content.readingText && (
              <div className="rounded-2xl border border-line p-4">
                <Markdown md={as.content.readingText} sanitize />
              </div>
            )}
            {as.type === 'reading' && as.content.resourceUrl && (
              <a href={as.content.resourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-brand hover:underline">
                Open the reading <ArrowRight className="h-4 w-4" />
              </a>
            )}
            {lesson && (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-line p-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Lesson {lesson.number}</div>
                  <div className="font-semibold">{lesson.title}</div>
                </div>
                <Button variant="soft" to={`/s/learn/${lesson.id}`} icon={<BookOpen className="h-4 w-4" />}>
                  Open
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardBody className="space-y-3">
            {qType && (
              <ul className="space-y-2 text-sm text-ink-2">
                <li className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-ink-3" /> {itemCount(as)} questions
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ink-3" /> {as.settings.timeLimitMinutes ? `${as.settings.timeLimitMinutes}-minute time limit` : 'No time limit'}
                </li>
                <li className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-ink-3" /> {as.settings.attempts ? `${used} of ${as.settings.attempts} attempts used` : 'Unlimited attempts'}
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-ink-3" /> {as.settings.hints ? 'Hints available' : 'No hints'}
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-ink-3" />
                  {as.settings.feedback === 'instant' ? 'Instant feedback' : heldUntilDue(as) ? 'Results after the due date' : 'Results after you submit'}
                </li>
              </ul>
            )}
            {qType && as.settings.lockdown && <ExamModeNotice label={TYPE_LABEL[as.type].toLowerCase()} maxExits={as.settings.maxExits ?? null} onMax={as.settings.onMaxExits ?? 'lock'} camera={!!as.settings.camera} consent={consent} setConsent={setConsent} />}
            {best && (
              <div className="rounded-xl bg-surface-2 p-3">
                <div className="text-xs text-ink-3">{qType ? 'Your best result' : 'Status'}</div>
                {qType ? (
                  visible ? (
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-semibold">{best.percent !== null ? `${Math.round(best.percent)}%` : '—'}</span>
                      <Badge tone={percentTone(best.percent)}>{best.pendingManual ? 'Partly graded' : best.late ? 'Late' : 'Submitted'}</Badge>
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-ink-2">Submitted {fmtDateTime(best.submittedAt)}. Results appear after the due date.</div>
                  )
                ) : (
                  <div className="mt-1 flex items-center gap-2 font-medium text-good-ink">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                  </div>
                )}
              </div>
            )}
            {qType ? (
              open ? (
                <Button className="w-full" size="lg" onClick={() => navigate('take')} disabled={!!as.settings.lockdown && !!as.settings.camera && !consent}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : attemptsLeft > 0 && !closed ? (
                <Button
                  className="w-full"
                  size="lg"
                  loading={busy}
                  disabled={!!as.settings.lockdown && !!as.settings.camera && !consent}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await api().startSubmission(as.id);
                      await qc.invalidateQueries({ queryKey: qk.submissions({ assignmentId, studentId: me.id }) });
                      navigate('take');
                    } catch (e) {
                      toast({ kind: 'error', title: (e as Error).message });
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {best ? 'Try again' : 'Start'} <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <p className="text-center text-sm text-ink-3">{closed ? 'This assignment is closed.' : 'No attempts left.'}</p>
              )
            ) : !best ? (
              <Button className="w-full" size="lg" loading={busy} onClick={markComplete} icon={<CheckCircle2 className="h-5 w-5" />}>
                Mark as complete
              </Button>
            ) : null}
          </CardBody>
        </Card>
      </div>

      {best && qType && visible && (
        <div className="mt-6 space-y-4">
          {best.feedback && (
            <Card className="border-info/30">
              <CardBody>
                <div className="text-sm font-semibold text-info-ink">Feedback from your teacher</div>
                <p className="mt-1 text-ink-2">{best.feedback}</p>
              </CardBody>
            </Card>
          )}
          {best.masteryChanges && best.masteryChanges.some((c) => c.after !== c.before) && (
            <Card>
              <CardBody>
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-5 w-5 text-good" /> Mastery changes
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {best.masteryChanges
                    .filter((c) => c.after !== c.before)
                    .map((c) => (
                      <div key={c.skillId} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                        <span className="min-w-0 flex-1 truncate">{skillInfo(c.skillId)?.name}</span>
                        <MasterySwatch level={c.before as MasteryLevel} />
                        <ArrowRight className="h-3.5 w-3.5 text-ink-3" />
                        <MasterySwatch level={c.after as MasteryLevel} />
                        <span className="text-xs font-medium">{LEVEL_LABEL[c.after as MasteryLevel]}</span>
                      </div>
                    ))}
                </div>
              </CardBody>
            </Card>
          )}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Review your answers</h2>
            <Button variant="ghost" size="sm" onClick={() => setReview((r) => !r)}>
              {review ? 'Hide' : 'Show'}
            </Button>
          </div>
          {review && <ReviewList items={best.items} responses={best.responses} content={as.content} assignmentId={as.id} showSolutions={as.settings.showSolutions} />}
        </div>
      )}
    </div>
  );
}

/** What exam mode means, shown before a student starts; with the camera option, their consent. */
function ExamModeNotice({ label, maxExits, onMax, camera, consent, setConsent }: { label: string; maxExits: number | null; onMax: 'lock' | 'submit'; camera: boolean; consent: boolean; setConsent: (v: boolean) => void }) {
  return (
    <div className="space-y-2 rounded-xl border border-brand-200 bg-brand-50/60 p-3 text-sm text-ink-2" aria-label="Exam mode">
      <div className="flex items-center gap-2 font-semibold text-brand-800">
        <ShieldCheck className="h-4 w-4" /> Exam mode
      </div>
      <p>
        This {label} opens in full screen. Leaving full screen or switching to another tab or app is recorded and shown to your teacher.
        {maxExits ? ` After ${maxExits} ${maxExits === 1 ? 'exit' : 'exits'}, it ${onMax === 'submit' ? 'is submitted automatically' : 'locks until your teacher unlocks it'}.` : ''}
      </p>
      {camera && (
        <>
          <p>
            Your camera must stay on while you work. Gradileo does not record, save or send any video or pictures; your teacher only sees whether the camera stayed on. If you have questions, talk to your teacher, and share this notice with a parent or guardian.
          </p>
          <Checkbox checked={consent} onChange={setConsent} label={<span className="text-sm">I understand and agree to keep my camera on</span>} />
        </>
      )}
    </div>
  );
}
