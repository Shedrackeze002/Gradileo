import { useMemo, useState, type ReactNode } from 'react';
import { CheckCircle2, ChevronDown, CircleDashed, Lightbulb, XCircle } from 'lucide-react';
import { itemFromRef, type AssignmentContent, type StoredResponse } from '@engine/assemble.ts';
import { gradeItem } from '@engine/grade.ts';
import type { ItemRef } from '@engine/types.ts';
import { skillInfo } from '@engine/curriculum/index.ts';
import { QuestionView, SolutionPanel } from './QuestionView.tsx';
import { cn } from '@/lib/cn.ts';
import { SkillsGate } from '@/components/SkillsGate.tsx';
import { refSkillIds } from '@/lib/useSkills.ts';

type ReviewListProps = {
  items: ItemRef[];
  responses: Record<number, StoredResponse>;
  content: AssignmentContent;
  assignmentId: string;
  showSolutions?: boolean;
  renderExtra?: (index: number) => ReactNode;
};

/** Every question of an attempt with the student's answers, once the questions' generators have loaded. */
export function ReviewList(props: ReviewListProps) {
  return (
    <SkillsGate skillIds={refSkillIds(props.content, props.items)}>
      <Rows {...props} />
    </SkillsGate>
  );
}

function Rows({ items, responses, content, assignmentId, showSolutions = true, renderExtra }: ReviewListProps) {
  const rows = useMemo(
    () =>
      items.map((ref, i) => {
        const item = itemFromRef(ref, content, assignmentId);
        const resp = responses[i] ?? { answers: [], hintsUsed: 0 };
        const manual = !!item && item.parts.some((p) => p.answer.kind === 'manual');
        // A teacher's mark on an auto-graded question replaces the automatic one.
        const overridden = !manual && typeof resp.manualScore === 'number';
        const result = item && !manual ? gradeItem(item, resp.answers ?? []) : null;
        return { item, resp, result, manual, overridden };
      }),
    [items, responses, content, assignmentId],
  );
  const [open, setOpen] = useState<number | null>(() => {
    const pending = rows.findIndex((r) => r.manual && (r.resp.manualScore ?? null) === null);
    return pending >= 0 ? pending : rows.findIndex((r) => r.result && !r.result.correct);
  });
  return (
    <div className="space-y-2">
      {rows.map(({ item, resp, result, manual, overridden }, i) => {
        if (!item) return null;
        const isOpen = open === i;
        const ms = resp.manualScore;
        const marked = (m: number) => (m >= 0.999 ? 'right' : m > 0 ? 'partial' : 'wrong');
        const status = manual ? (ms === undefined || ms === null ? 'pending' : marked(ms)) : overridden ? marked(ms!) : result?.correct ? 'right' : result && result.score > 0 ? 'partial' : 'wrong';
        return (
          <div key={i} className={cn('overflow-hidden rounded-2xl border bg-surface', isOpen ? 'border-line-strong shadow-card' : 'border-line')}>
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-2/60">
              {status === 'right' ? <CheckCircle2 className="h-5 w-5 shrink-0 text-good" /> : status === 'pending' ? <CircleDashed className="h-5 w-5 shrink-0 text-ink-3" /> : <XCircle className={cn('h-5 w-5 shrink-0', status === 'partial' ? 'text-warn' : 'text-bad')} />}
              <span className="w-8 text-sm font-semibold text-ink-3">Q{i + 1}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{manual ? 'Written response' : skillInfo(item.skillId)?.name ?? 'Question'}</span>
              {resp.hintsUsed > 0 && (
                <span className="hidden items-center gap-1 text-xs text-warn-ink sm:inline-flex">
                  <Lightbulb className="h-3.5 w-3.5" /> {resp.hintsUsed} hint{resp.hintsUsed > 1 ? 's' : ''}
                </span>
              )}
              {(resp.history?.length ?? 0) > 0 && <span className="hidden text-xs text-ink-3 sm:inline">{resp.history!.length + 1} tries</span>}
              <span className="text-xs text-ink-3">{status === 'pending' ? 'Needs grading' : manual ? `${Math.round((ms ?? 0) * 100)}%` : `${status === 'right' ? 'Correct' : status === 'partial' ? 'Partly correct' : 'Incorrect'}${overridden ? ' · marked by the teacher' : ''}`}</span>
              <ChevronDown className={cn('h-4 w-4 text-ink-3 transition', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div className="space-y-4 border-t border-line p-4 sm:p-5">
                <QuestionView item={item} responses={resp.answers ?? []} canvas={resp.canvas} onChange={() => {}} result={overridden ? null : result} locked showAnswers={showSolutions} />
                {overridden && (
                  <div className="rounded-xl bg-info-soft px-3 py-2 text-sm text-info-ink">
                    The teacher changed the mark on this question to {Math.round(ms! * 100)}%{result ? ` (it was marked ${result.correct ? 'correct' : result.score > 0 ? 'partly correct' : 'incorrect'} automatically)` : ''}.
                  </div>
                )}
                {resp.comment && (
                  <div className="rounded-xl bg-info-soft px-3 py-2 text-sm text-info-ink">
                    <span className="font-semibold">Teacher comment: </span>
                    {resp.comment}
                  </div>
                )}
                {renderExtra?.(i)}
                {showSolutions && item.solution.length > 0 && <SolutionPanel item={item} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
