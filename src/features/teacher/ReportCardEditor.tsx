/**
 * One report card: the teacher edits what the AI drafted (with a live preview), then shares it with
 * the student, turns on a private link for a parent, and prints it or saves it as a PDF.
 */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Copy, EyeOff, Link2, Link2Off, Printer, Send, Trash2 } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import type { ReportCardContent } from '@engine/ai/reportCard.ts';
import { api } from '@/data/index.ts';
import { useClass, useProfile, useReportCard } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Button, Card, CardBody, EmptyState, Input, PageHeader, PageSpinner, Textarea, useToast } from '@/components/ui/index.ts';
import { ReportCardView } from '@/features/reports/ReportCardView.tsx';
import { useClassId } from './shared.tsx';

const LISTS = [
  { key: 'strengths', label: 'Strengths' },
  { key: 'nextSteps', label: 'Next steps' },
  { key: 'studentTips', label: 'Tips for the student' },
  { key: 'parentTips', label: 'For parents and carers' },
] as const;

/** The private link a parent opens, without signing in. */
export const reportLink = (token: string) => `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/report/${token}`;

export default function ReportCardEditor() {
  const classId = useClassId();
  const { reportId = '' } = useParams();
  const card = useReportCard(reportId);
  const cls = useClass(classId);
  const student = useProfile(card.data?.studentId);
  const me = useMe();
  const qc = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<ReportCardContent | null>(null);
  const [period, setPeriod] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (card.data && !draft) {
      setDraft(card.data.content);
      setPeriod(card.data.period);
    }
  }, [card.data, draft]);

  if (card.isLoading || cls.isLoading) return <PageSpinner />;
  if (!card.data || !cls.data) return <EmptyState title="Report card not found" />;
  if (!draft) return <PageSpinner />;
  const c = card.data;
  // Blank lines in a list are left out of the card (the boxes keep them while the teacher types).
  const tidy = (xs: string[]) => xs.map((x) => x.trim()).filter(Boolean);
  const content: ReportCardContent = { ...draft, period, strengths: tidy(draft.strengths), nextSteps: tidy(draft.nextSteps), studentTips: tidy(draft.studentTips), parentTips: tidy(draft.parentTips) };
  const dirty = JSON.stringify(content) !== JSON.stringify(c.content) || period !== c.period;
  const studentName = student.data?.fullName ?? 'Student';
  const set = (patch: Partial<ReportCardContent>) => setDraft({ ...draft, ...patch });

  async function run(label: string, fn: () => Promise<unknown>, done?: string) {
    setBusy(label);
    try {
      await fn();
      await qc.invalidateQueries({ queryKey: ['reportCards'] });
      await qc.invalidateQueries({ queryKey: ['reportCard', reportId] });
      if (done) toast({ kind: 'success', title: done });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not do that', body: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }
  const save = () => api().saveReportCard(c.id, { period, content });

  return (
    <div className="space-y-6">
      <PageHeader
        className="print:hidden"
        back={{ to: `/t/c/${classId}/reports`, label: 'Report cards' }}
        title={`${studentName}’s report card`}
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone={c.status === 'shared' ? 'good' : 'neutral'}>{c.status === 'shared' ? 'Shared with the student' : 'Draft: only you can see it'}</Badge>
            <span>{c.source === 'minimax' ? 'Drafted by the AI' : 'Drafted from the data (the AI was not available)'}</span>
          </span>
        }
        actions={
          <Button variant="secondary" icon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>
            Print or save as PDF
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-4 print:hidden">
          <Card>
            <CardBody className="space-y-4">
              <p className="rounded-xl bg-info-soft px-3 py-2 text-sm text-info-ink">Check every line against what you know of the student. Write {'{name}'} where the student’s first name goes.</p>
              <Input label="Period" value={period} onChange={(e) => setPeriod(e.target.value.slice(0, 80))} />
              <Textarea label="How they are doing" rows={4} value={draft.summary} onChange={(e) => set({ summary: e.target.value })} />
              {LISTS.map((l) => (
                <Textarea key={l.key} label={l.label} hint="One point per line." rows={3} value={draft[l.key].join('\n')} onChange={(e) => set({ [l.key]: e.target.value.split('\n') } as Partial<ReportCardContent>)} />
              ))}
              <Textarea label="Your comment" rows={3} value={draft.feedback} onChange={(e) => set({ feedback: e.target.value })} />
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="ghost" icon={<Trash2 className="h-4 w-4" />} disabled={!!busy} onClick={() => window.confirm('Delete this report card?') && run('delete', async () => {
                  await api().deleteReportCard(c.id);
                  navigate(`/t/c/${classId}/reports`);
                })}>
                  Delete
                </Button>
                <Button variant="secondary" disabled={!dirty || !!busy} loading={busy === 'save'} onClick={() => run('save', save, 'Saved')}>
                  Save
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <div className="text-sm font-semibold">Share</div>
              {c.status === 'draft' ? (
                <>
                  <p className="text-sm text-ink-3">The student sees the card on their Progress page and is notified. You can still edit it afterwards.</p>
                  <Button icon={<Send className="h-4 w-4" />} loading={busy === 'share'} disabled={!!busy} onClick={() => run('share', async () => {
                    if (dirty) await save();
                    await api().shareReportCard(c.id, true);
                  }, 'Shared with the student')}>
                    {dirty ? 'Save and share with the student' : 'Share with the student'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2 rounded-xl border border-line p-3">
                    <div className="text-sm font-medium">Private link for a parent</div>
                    {c.shareToken ? (
                      <>
                        <div className="flex gap-2">
                          <input className="input h-9 text-sm" readOnly value={reportLink(c.shareToken)} aria-label="Private link" onFocus={(e) => e.target.select()} />
                          <Button size="sm" variant="secondary" icon={<Copy className="h-4 w-4" />} onClick={async () => {
                            await navigator.clipboard?.writeText(reportLink(c.shareToken!)).catch(() => undefined);
                            toast({ kind: 'success', title: 'Link copied' });
                          }}>
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-ink-3">Anyone with the link can read this card, without signing in. Send it only to the student’s parents or carers.</p>
                        <Button size="sm" variant="ghost" icon={<Link2Off className="h-4 w-4" />} loading={busy === 'unlink'} disabled={!!busy} onClick={() => run('unlink', () => api().reportCardLink(c.id, false), 'Link turned off')}>
                          Turn the link off
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-ink-3">A link that shows this card, and nothing else, to whoever has it. Turn it off at any time.</p>
                        <Button size="sm" variant="secondary" icon={<Link2 className="h-4 w-4" />} loading={busy === 'link'} disabled={!!busy} onClick={() => run('link', () => api().reportCardLink(c.id, true))}>
                          Make a private link
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dirty && (
                      <Button loading={busy === 'save'} disabled={!!busy} onClick={() => run('save', save, 'Saved: the student sees the new version')}>
                        Save changes
                      </Button>
                    )}
                    <Button variant="ghost" icon={<EyeOff className="h-4 w-4" />} loading={busy === 'unshare'} disabled={!!busy} onClick={() => run('unshare', () => api().shareReportCard(c.id, false), 'Taken back to a draft')}>
                      Stop sharing
                    </Button>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <ReportCardView content={content} studentName={studentName} classTitle={cls.data.name} courseTitle={getCourse(cls.data.courseId)?.title ?? ''} teacherName={me.fullName} sharedAt={c.sharedAt} />
        </div>
      </div>
    </div>
  );
}
