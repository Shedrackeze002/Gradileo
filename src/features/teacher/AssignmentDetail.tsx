import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowUpDown, BellRing, CalendarPlus, CameraOff, ChevronRight, Download, Eye, Lightbulb, Lock, MoreHorizontal, Pencil, Send, Sparkles, Trash2, Type, Wand2 } from 'lucide-react';
import { TYPE_LABEL, gradeSubmission, isQuestionType } from '@engine/assemble.ts';
import { cameraOffCount, exitCount, isLocked } from '@engine/integrity.ts';
import { SkillsGate } from '@/components/SkillsGate.tsx';
import { refSkillIds } from '@/lib/useSkills.ts';
import { api } from '@/data/index.ts';
import { useAssignment, useDeleteAssignment, useEvents, usePublishAssignment, useRoster, useSaveAssignment, useSubmissions, useUnlockAttempt } from '@/data/hooks.ts';
import type { Assignment, Profile, SkillEvent, Submission } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, EmptyState, IconButton, Input, Menu, MenuItem, Modal, PageHeader, PageSpinner, ProgressBar, StatTile, Tabs, useToast } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { dueLabel, fmtDateTime, fromLocalInput, relative, toLocalInput } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';
import { downloadText, itemCount, skillLabel, toCsv } from '../shared/derive.ts';
import { ReopenAttempt } from './ReopenAttempt.tsx';
import { assignmentStats, pct, rosterStatus, scoreCell, statusLabel, StatusBadge, useClassId, type RosterRow } from './shared.tsx';

type Sort = 'name' | 'status' | 'score';
const STATUS_ORDER = ['needs_grading', 'missing', 'in_progress', 'not_started', 'late', 'submitted', 'returned'];

export default function AssignmentDetail() {
  const classId = useClassId();
  const { assignmentId = '' } = useParams();
  const a = useAssignment(assignmentId);
  const roster = useRoster(classId);
  const subs = useSubmissions({ assignmentId });
  const [tab, setTab] = useState<'students' | 'skills'>('students');

  const rows = useMemo(() => (a.data ? rosterStatus(a.data, roster.data ?? [], subs.data ?? []) : []), [a.data, roster.data, subs.data]);
  const st = assignmentStats(rows);

  if (a.isLoading || roster.isLoading) return <PageSpinner />;
  if (!a.data) return <EmptyState title="Assignment not found" action={<Button to={`/t/c/${classId}/assignments`}>All assignments</Button>} />;
  const as = a.data;
  const questions = isQuestionType(as.type);
  const due = dueLabel(as.dueAt);

  return (
    <div className="space-y-6">
      <PageHeader
        back={{ to: `/t/c/${classId}/assignments`, label: 'Assignments' }}
        eyebrow={TYPE_LABEL[as.type]}
        title={as.title}
        subtitle={
          <>
            {as.status === 'draft' ? 'Draft, not visible to students' : as.dueAt ? `${due.tone === 'overdue' ? 'Closed' : 'Due'} ${fmtDateTime(as.dueAt)}` : 'No due date'} · {as.assignedTo === 'all' ? 'Whole class' : `${as.assignedTo.length} students`}
            {questions && ` · ${itemCount(as)} questions`}
          </>
        }
        actions={<HeaderActions a={as} classId={classId} rows={rows} />}
      />

      {as.aiRationale && (
        <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-sm">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <div>
            <div className="font-semibold text-brand-800">Assigned from an AI suggestion</div>
            <p className="mt-0.5 text-ink-2">{as.aiRationale}</p>
          </div>
        </div>
      )}

      {as.status === 'published' && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatTile label={questions ? 'Submitted' : 'Completed'} value={`${st.submitted}/${st.assigned}`} hint={<ProgressBar value={st.assigned ? (st.submitted / st.assigned) * 100 : 0} />} />
          {questions ? <StatTile label="Average" value={pct(st.average)} hint={st.median !== null ? `Median ${st.median}%` : 'No scores yet'} /> : <StatTile label="In progress" value={rows.filter((r) => r.status === 'in_progress').length} />}
          <StatTile label="Needs grading" value={st.needsGrading} tone={st.needsGrading ? 'warn' : 'neutral'} hint={st.needsGrading ? 'Written responses waiting' : 'Auto-graded'} />
          <StatTile label="Missing" value={st.missing} tone={st.missing ? 'bad' : 'neutral'} hint={as.dueAt && due.tone !== 'overdue' ? `${rows.filter((r) => r.status === 'not_started' || r.status === 'in_progress').length} still to finish` : undefined} />
        </div>
      )}

      {as.instructions && (
        <Card>
          <CardBody>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-3">Instructions</div>
            <Markdown md={as.instructions} sanitize />
          </CardBody>
        </Card>
      )}

      {as.status === 'draft' ? (
        <EmptyState title="This assignment is a draft" action={<Button to={`/t/c/${classId}/assignments/${as.id}/edit`}>Continue editing</Button>}>
          Publish it to notify students and start tracking their work.
        </EmptyState>
      ) : (
        <>
          {questions && (
            <Tabs
              value={tab}
              onChange={setTab}
              items={[
                { value: 'students', label: 'Students' },
                { value: 'skills', label: 'Skills & mistakes' },
              ]}
            />
          )}
          {tab === 'students' || !questions ? (
            <StudentTable rows={rows} a={as} classId={classId} />
          ) : (
            <SkillsGate skillIds={refSkillIds(as.content)}>
              <SkillBreakdown a={as} rows={rows} classId={classId} />
            </SkillsGate>
          )}
        </>
      )}
    </div>
  );
}

function HeaderActions({ a, classId, rows }: { a: Assignment; classId: string; rows: RosterRow[] }) {
  const toast = useToast();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const del = useDeleteAssignment(classId);
  const publish = usePublishAssignment(classId);
  const [extend, setExtend] = useState(false);
  const [rename, setRename] = useState(false);
  const [reminding, setReminding] = useState(false);
  const pending = rows.filter((r) => r.status === 'not_started' || r.status === 'in_progress' || r.status === 'missing').length;

  function exportCsv() {
    const header = ['Student', 'Username', 'Status', 'Score %', 'Attempts', 'Submitted', 'Late', 'Hints used'];
    const lines = rows.map((r) => [
      r.student.fullName,
      r.student.username ?? r.student.email,
      statusLabel(r.status),
      r.best?.percent ?? null,
      r.attempts,
      r.best?.submittedAt ?? null,
      r.best?.late ? 'yes' : '',
      r.best ? Object.values(r.best.responses).reduce((s, x) => s + (x.hintsUsed ?? 0), 0) : null,
    ]);
    downloadText(`${a.title.replace(/[^\w-]+/g, '_')}.csv`, toCsv([header, ...lines]));
  }

  if (a.status === 'draft')
    return (
      <>
        <Button variant="secondary" icon={<Type className="h-4 w-4" />} onClick={() => setRename(true)}>
          Rename
        </Button>
        <Button variant="secondary" icon={<Pencil className="h-4 w-4" />} to={`/t/c/${classId}/assignments/${a.id}/edit`}>
          Edit
        </Button>
        <Button
          icon={<Send className="h-4 w-4" />}
          loading={publish.isPending}
          onClick={async () => {
            try {
              await publish.mutateAsync(a.id);
              toast({ kind: 'success', title: 'Published', body: 'Students have been notified.' });
            } catch (e) {
              toast({ kind: 'error', title: 'Could not publish', body: (e as Error).message });
            }
          }}
        >
          Publish
        </Button>
        {rename && <RenameModal a={a} classId={classId} onClose={() => setRename(false)} />}
      </>
    );

  return (
    <>
      <Button
        variant="secondary"
        icon={<BellRing className="h-4 w-4" />}
        disabled={pending === 0}
        loading={reminding}
        onClick={async () => {
          setReminding(true);
          try {
            const n = await api().remindNow(a.id);
            toast({ kind: 'success', title: n ? `Reminded ${n} student${n === 1 ? '' : 's'}` : 'Everyone has submitted' });
          } catch (e) {
            toast({ kind: 'error', title: 'Could not send reminders', body: (e as Error).message });
          } finally {
            setReminding(false);
          }
        }}
        title="Notify students who have not submitted"
      >
        Remind{pending ? ` (${pending})` : ''}
      </Button>
      <Button variant="secondary" icon={<Pencil className="h-4 w-4" />} to={`/t/c/${classId}/assignments/${a.id}/edit`}>
        Edit
      </Button>
      <Menu
        trigger={() => (
          <IconButton label="More actions" className="border border-line-strong bg-surface">
            <MoreHorizontal className="h-5 w-5" />
          </IconButton>
        )}
      >
        {(close) => (
          <>
            <MenuItem
              icon={<Type className="h-4 w-4" />}
              onClick={() => {
                close();
                setRename(true);
              }}
            >
              Rename
            </MenuItem>
            <MenuItem
              icon={<CalendarPlus className="h-4 w-4" />}
              onClick={() => {
                close();
                setExtend(true);
              }}
            >
              Change due date
            </MenuItem>
            <MenuItem
              icon={<Download className="h-4 w-4" />}
              onClick={() => {
                close();
                exportCsv();
              }}
            >
              Export CSV
            </MenuItem>
            <MenuItem
              danger
              icon={<Trash2 className="h-4 w-4" />}
              onClick={async () => {
                close();
                if (!window.confirm(`Delete “${a.title}” and all of its submissions?`)) return;
                await del.mutateAsync(a.id);
                await qc.invalidateQueries({ queryKey: ['submissions'] });
                navigate(`/t/c/${classId}/assignments`);
              }}
            >
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
      {extend && <ExtendModal a={a} classId={classId} onClose={() => setExtend(false)} />}
      {rename && <RenameModal a={a} classId={classId} onClose={() => setRename(false)} />}
    </>
  );
}

function RenameModal({ a, classId, onClose }: { a: Assignment; classId: string; onClose: () => void }) {
  const [title, setTitle] = useState(a.title);
  const save = useSaveAssignment(classId);
  const toast = useToast();
  const clean = title.replace(/\s+/g, ' ').trim();
  async function submit() {
    if (!clean || clean === a.title) return onClose();
    try {
      await save.mutateAsync({ id: a.id, classId, title: clean });
      toast({ kind: 'success', title: 'Renamed', body: a.status === 'published' ? 'Students see the new name straight away.' : undefined });
      onClose();
    } catch (e) {
      toast({ kind: 'error', title: 'Could not rename', body: (e as Error).message });
    }
  }
  return (
    <Modal
      open
      onClose={onClose}
      title="Rename assignment"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={save.isPending} disabled={!clean} onClick={submit}>
            Save
          </Button>
        </>
      }
    >
      <Input
        label="Name"
        value={title}
        maxLength={120}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            void submit();
          }
        }}
      />
    </Modal>
  );
}

function ExtendModal({ a, classId, onClose }: { a: Assignment; classId: string; onClose: () => void }) {
  const [due, setDue] = useState(toLocalInput(a.dueAt));
  const save = useSaveAssignment(classId);
  const toast = useToast();
  const quick = (days: number) => {
    const d = new Date(a.dueAt && new Date(a.dueAt) > new Date() ? a.dueAt : Date.now());
    d.setDate(d.getDate() + days);
    if (!a.dueAt || new Date(a.dueAt) < new Date()) d.setHours(21, 0, 0, 0);
    setDue(toLocalInput(d.toISOString()));
  };
  return (
    <Modal
      open
      onClose={onClose}
      title="Change due date"
      description="Students who have not submitted will see the new deadline and get reminders before it."
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={save.isPending}
            onClick={async () => {
              await save.mutateAsync({ id: a.id, classId, dueAt: fromLocalInput(due) });
              toast({ kind: 'success', title: 'Due date updated' });
              onClose();
            }}
          >
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <Input type="datetime-local" label="New due date" value={due} onChange={(e) => setDue(e.target.value)} />
        <div className="flex gap-2">
          {[1, 2, 7].map((d) => (
            <Button key={d} size="xs" variant="secondary" onClick={() => quick(d)}>
              +{d} day{d > 1 ? 's' : ''}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function StudentTable({ rows, a, classId }: { rows: RosterRow[]; a: Assignment; classId: string }) {
  const [sort, setSort] = useState<Sort>('status');
  const unlock = useUnlockAttempt();
  const toast = useToast();
  const questions = isQuestionType(a.type);
  const sorted = [...rows].sort((x, y) => {
    if (sort === 'name') return x.student.fullName.localeCompare(y.student.fullName);
    if (sort === 'score') return (y.best?.percent ?? -1) - (x.best?.percent ?? -1);
    return STATUS_ORDER.indexOf(x.status) - STATUS_ORDER.indexOf(y.status) || x.student.fullName.localeCompare(y.student.fullName);
  });
  const SortBtn = ({ k, children, className }: { k: Sort; children: React.ReactNode; className?: string }) => (
    <button type="button" onClick={() => setSort(k)} className={cn('inline-flex items-center gap-1 font-semibold', sort === k ? 'text-ink' : 'text-ink-3 hover:text-ink', className)}>
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
  return (
    <div className="card overflow-hidden">
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-surface-2/60 text-left text-xs">
            <tr>
              <th className="px-4 py-2.5">
                <SortBtn k="name">Student</SortBtn>
              </th>
              <th className="px-3 py-2.5">
                <SortBtn k="status">Status</SortBtn>
              </th>
              {questions && (
                <th className="px-3 py-2.5 text-right">
                  <SortBtn k="score">Score</SortBtn>
                </th>
              )}
              {questions && <th className="hidden px-3 py-2.5 font-semibold text-ink-3 md:table-cell">Attempts</th>}
              <th className="hidden px-3 py-2.5 font-semibold text-ink-3 md:table-cell">Submitted</th>
              {questions && <th className="hidden px-3 py-2.5 font-semibold text-ink-3 lg:table-cell">Signals</th>}
              <th className="w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sorted.map((r) => {
              const hints = r.best ? Object.values(r.best.responses).reduce((s, x) => s + (x.hintsUsed ?? 0), 0) : 0;
              const link = r.best ? `/t/c/${classId}/submissions/${r.best.id}` : null;
              return (
                <tr key={r.student.id} className="hover:bg-surface-2/40">
                  <td className="px-4 py-2.5">
                    <Link to={`/t/c/${classId}/students/${r.student.id}`} className="flex items-center gap-2.5 font-medium hover:text-brand">
                      <Avatar name={r.student.fullName} color={r.student.avatarColor} size={28} />
                      {r.student.fullName}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={r.status} />
                      {r.open && a.settings.lockdown && isLocked(a.settings, r.open.integrity) && (
                        <>
                          <Badge tone="bad" icon={<Lock className="h-3 w-3" />}>
                            Locked
                          </Badge>
                          <Button
                            size="xs"
                            variant="secondary"
                            loading={unlock.isPending}
                            aria-label={`Unlock ${r.student.fullName}'s attempt`}
                            onClick={async () => {
                              try {
                                await unlock.mutateAsync(r.open!.id);
                                toast({ kind: 'success', title: `${r.student.fullName} can carry on`, body: 'Their attempt is unlocked.' });
                              } catch (e) {
                                toast({ kind: 'error', title: 'Could not unlock', body: (e as Error).message });
                              }
                            }}
                          >
                            Unlock
                          </Button>
                        </>
                      )}
                      {r.latest && !r.open && <ReopenAttempt s={r.latest} studentName={r.student.fullName} questions={questions} />}
                    </span>
                  </td>
                  {questions && (
                    <td className="px-3 py-2.5 text-right">
                      {r.best?.percent !== null && r.best?.percent !== undefined ? <span className={cn('rounded-md px-2 py-0.5 font-semibold', scoreCell(r.best.percent))}>{Math.round(r.best.percent)}%</span> : <span className="text-ink-3">—</span>}
                    </td>
                  )}
                  {questions && (
                    <td className="hidden px-3 py-2.5 text-ink-2 md:table-cell">
                      {r.attempts}
                      {a.settings.attempts ? ` / ${a.settings.attempts}` : ''}
                    </td>
                  )}
                  <td className="hidden px-3 py-2.5 text-ink-2 md:table-cell" title={fmtDateTime(r.best?.submittedAt)}>
                    {r.best?.submittedAt ? relative(r.best.submittedAt) : r.open ? (r.open.integrity?.awaitingStart ? 'Reopened, not started yet' : `Started ${relative(r.open.startedAt)}`) : '—'}
                  </td>
                  {questions && (
                    <td className="hidden px-3 py-2.5 lg:table-cell">
                      <span className="flex gap-1">
                        {hints > 0 && (
                          <Badge tone="warn" icon={<Lightbulb className="h-3 w-3" />}>
                            {hints}
                          </Badge>
                        )}
                        <IntegrityBadges s={r.best ?? r.open} examMode={!!a.settings.lockdown} />
                      </span>
                    </td>
                  )}
                  <td className="px-2 py-2.5">
                    {link && (
                      <Link to={link} className="inline-flex rounded-lg p-1.5 text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label={`Review ${r.student.fullName}'s work`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface SkillAgg {
  skillId: string;
  total: number;
  correct: number;
  assisted: number;
  missedBy: Set<string>;
}

function SkillBreakdown({ a, rows, classId }: { a: Assignment; rows: RosterRow[]; classId: string }) {
  const events = useEvents(classId, undefined, 120);
  const aggs = useMemo(() => {
    const m = new Map<string, SkillAgg>();
    for (const r of rows) {
      const s: Submission | null = r.best;
      if (!s || !s.items.length) continue;
      const g = gradeSubmission(s.items, s.responses, a.content, a.id);
      for (const it of g.items) {
        if (it.manual) continue;
        const x = m.get(it.skillId) ?? { skillId: it.skillId, total: 0, correct: 0, assisted: 0, missedBy: new Set<string>() };
        x.total++;
        if (it.result.correct) x.correct++;
        else x.missedBy.add(r.student.id);
        if (it.assisted) x.assisted++;
        m.set(it.skillId, x);
      }
    }
    return [...m.values()].sort((p, q) => p.correct / p.total - q.correct / q.total);
  }, [rows, a]);
  const names = new Map(rows.map((r) => [r.student.id, r.student] as [string, Profile]));
  const wrong = useMemo(() => {
    const out = new Map<string, SkillEvent[]>();
    for (const e of events.data ?? []) {
      if (e.assignmentId !== a.id || e.correct || !e.answer) continue;
      const list = out.get(e.skillId) ?? [];
      if (list.length < 3) list.push(e);
      out.set(e.skillId, list);
    }
    return out;
  }, [events.data, a.id]);

  if (!aggs.length) return <EmptyState title="No submissions yet">Skill results appear as soon as students submit.</EmptyState>;
  return (
    <div className="space-y-3">
      {aggs.map((x) => {
        const p = Math.round((x.correct / x.total) * 100);
        const missed = [...x.missedBy];
        return (
          <Card key={x.skillId}>
            <CardHeader
              title={x.skillId === 'custom' ? 'Your questions' : skillLabel(x.skillId)}
              subtitle={`${x.correct}/${x.total} correct${x.assisted ? ` · ${x.assisted} with hints` : ''}`}
              action={<span className={cn('rounded-lg px-2.5 py-1 font-display text-lg font-semibold', scoreCell(p))}>{p}%</span>}
            />
            <CardBody className="space-y-3 pt-3">
              <ProgressBar value={p} tone={p >= 80 ? 'good' : p >= 60 ? 'warn' : 'bad'} label={`${p}% correct`} />
              {missed.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-ink-3">Missed by:</span>
                  {missed.slice(0, 8).map((id) => (
                    <Link key={id} to={`/t/c/${classId}/students/${id}`} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium hover:bg-surface-3">
                      {names.get(id)?.fullName ?? 'Student'}
                    </Link>
                  ))}
                  {missed.length > 8 && <span className="text-xs text-ink-3">+{missed.length - 8} more</span>}
                </div>
              )}
              {(wrong.get(x.skillId) ?? []).length > 0 && (
                <div className="space-y-1.5 rounded-xl bg-surface-2/60 p-3">
                  <div className="text-xs font-semibold text-ink-3">Sample wrong answers</div>
                  {wrong.get(x.skillId)!.map((e) => (
                    <div key={e.id} className="text-sm">
                      <span className="font-medium">{names.get(e.studentId)?.fullName.split(' ')[0] ?? 'Student'}</span> answered <code className="rounded bg-bad-soft px-1 text-bad-ink">{e.answer}</code>
                      {e.expected && (
                        <>
                          {' '}
                          (expected <code className="rounded bg-good-soft px-1 text-good-ink">{e.expected}</code>)
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {missed.length > 0 && x.skillId !== 'custom' && (
                <div className="flex justify-end">
                  <Button size="sm" variant="soft" icon={<Wand2 className="h-4 w-4" />} to={`/t/c/${classId}/assignments/new?type=practice&skills=${x.skillId}&students=${missed.join(',')}`}>
                    Assign follow-up practice to {missed.length}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}


/** Tab switches, or in exam mode the exits, camera-off events and automatic submission. */
export function IntegrityBadges({ s, examMode }: { s: Submission | null; examMode: boolean }) {
  if (!s) return null;
  const i = s.integrity;
  if (!examMode)
    return i.blurCount >= 3 ? (
      <Badge tone="info" icon={<Eye className="h-3 w-3" />}>
        Left tab {i.blurCount}×
      </Badge>
    ) : null;
  const exits = exitCount(i);
  const camera = cameraOffCount(i);
  return (
    <>
      {exits > 0 && (
        <Badge tone={exits >= 3 ? 'warn' : 'info'} icon={<Eye className="h-3 w-3" />}>
          Left exam mode {exits}×
        </Badge>
      )}
      {camera > 0 && (
        <Badge tone="warn" icon={<CameraOff className="h-3 w-3" />}>
          Camera off {camera}×
        </Badge>
      )}
      {i.autoSubmitted && <Badge tone="bad">Submitted automatically</Badge>}
    </>
  );
}
