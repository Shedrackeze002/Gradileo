/**
 * Report cards for a class: every student with their latest card, a button to draft one with AI
 * (from the student's mastery and work), and one to draft every student's card for a period at once.
 * Each draft opens in the editor; nothing reaches a student or a parent until the teacher shares it.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, Sparkles } from 'lucide-react';
import { api } from '@/data/index.ts';
import { useClass, useReportCards, useRoster } from '@/data/hooks.ts';
import type { ReportCard } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, EmptyState, Input, PageHeader, PageSpinner, Textarea, useToast } from '@/components/ui/index.ts';
import { fmtDate } from '@/lib/dates.ts';
import { useClassId } from './shared.tsx';

/** "October 2026": the default name for the period a card covers. */
export const defaultPeriod = (d = new Date()) => d.toLocaleDateString('en', { month: 'long', year: 'numeric' });

export default function ReportCardsPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const roster = useRoster(classId);
  const cards = useReportCards({ classId });
  const qc = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const [period, setPeriod] = useState(defaultPeriod);
  const [notes, setNotes] = useState('');
  const [writing, setWriting] = useState<Set<string>>(new Set());
  const [batch, setBatch] = useState<{ done: number; total: number } | null>(null);

  const latest = useMemo(() => {
    const m = new Map<string, ReportCard>();
    for (const c of cards.data ?? []) if (!m.has(c.studentId)) m.set(c.studentId, c);
    return m;
  }, [cards.data]);

  if (cls.isLoading || roster.isLoading) return <PageSpinner />;
  const students = [...(roster.data ?? [])].sort((a, b) => a.fullName.localeCompare(b.fullName));
  const without = students.filter((s) => latest.get(s.id)?.period !== period.trim());

  async function write(studentId: string): Promise<ReportCard | null> {
    setWriting((w) => new Set(w).add(studentId));
    try {
      return await api().writeReportCard(classId, studentId, { period: period.trim(), notes: notes.trim() });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not write the report card', body: (e as Error).message });
      return null;
    } finally {
      setWriting((w) => {
        const next = new Set(w);
        next.delete(studentId);
        return next;
      });
    }
  }

  async function writeOne(studentId: string) {
    const card = await write(studentId);
    if (!card) return;
    await qc.invalidateQueries({ queryKey: ['reportCards'] });
    navigate(`/t/c/${classId}/reports/${card.id}`);
  }

  async function writeAll() {
    const list = without;
    setBatch({ done: 0, total: list.length });
    let ok = 0;
    // Two at a time: quick enough for a class, gentle on the AI.
    for (let i = 0; i < list.length; i += 2) {
      const done = await Promise.all(list.slice(i, i + 2).map((s) => write(s.id)));
      ok += done.filter(Boolean).length;
      setBatch({ done: Math.min(i + 2, list.length), total: list.length });
      await qc.invalidateQueries({ queryKey: ['reportCards'] });
    }
    setBatch(null);
    toast({ kind: ok === list.length ? 'success' : 'error', title: `${ok} report card${ok === 1 ? '' : 's'} drafted`, body: 'Open each one to check it, edit it and share it.' });
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Report cards" subtitle="The AI drafts each student’s report card from their mastery and work. You check and edit it, then share it with the student and, if you like, a parent." />

      <Card>
        <CardBody className="grid gap-4 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
          <Input label="Period" value={period} onChange={(e) => setPeriod(e.target.value.slice(0, 80))} hint="Shown on the card, e.g. Term 1 or October 2026." />
          <Textarea label="Notes for the AI (optional)" rows={2} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. We finished Unit 2 this term. Mention the group project." />
          <Button icon={<Sparkles className="h-4 w-4" />} onClick={writeAll} loading={!!batch} disabled={!without.length || !!batch || !period.trim()}>
            {batch ? `Drafting ${batch.done} of ${batch.total}…` : `Draft for ${without.length} student${without.length === 1 ? '' : 's'}`}
          </Button>
        </CardBody>
      </Card>

      {students.length === 0 ? (
        <EmptyState title="No students yet">Report cards appear here once students join the class.</EmptyState>
      ) : (
        <Card>
          <div className="divide-y divide-line">
            {students.map((s) => {
              const card = latest.get(s.id);
              return (
                <div key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <Avatar name={s.fullName} color={s.avatarColor} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{s.fullName}</div>
                    <div className="text-xs text-ink-3">{card ? `${card.period || 'Report card'} · updated ${fmtDate(card.updatedAt)}` : 'No report card yet'}</div>
                  </div>
                  {card && <Badge tone={card.status === 'shared' ? 'good' : 'neutral'}>{card.status === 'shared' ? 'Shared' : 'Draft'}</Badge>}
                  {card && (
                    <Button size="sm" variant="secondary" icon={<FileText className="h-4 w-4" />} to={`/t/c/${classId}/reports/${card.id}`}>
                      Open
                    </Button>
                  )}
                  <Button size="sm" variant={card ? 'ghost' : 'soft'} icon={<Sparkles className="h-4 w-4" />} loading={writing.has(s.id)} disabled={!!batch || !period.trim()} onClick={() => writeOne(s.id)} aria-label={`Write ${s.fullName}’s report card`}>
                    {card ? 'Write a new one' : 'Write with AI'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
