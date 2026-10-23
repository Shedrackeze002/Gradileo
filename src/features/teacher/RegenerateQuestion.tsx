/**
 * "Regenerate" on one question in the assignment builder: the AI writes a new question in the same
 * format, on the same skill, and the teacher can say what should change. The new question replaces
 * the old one in the builder, marked for checking; nothing reaches students before the teacher
 * publishes.
 */
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { CustomQuestion } from '@engine/assemble.ts';
import { writtenFormatOf, type DraftType } from '@engine/ai/builder.ts';
import { useRegenerateQuestion } from '@/data/hooks.ts';
import { Button, Modal, Textarea } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';

const FORMAT_LABEL = { choice: 'multiple choice', short: 'short answer', written: 'written response' } as const;

export function RegenerateQuestion({
  classId,
  type,
  question,
  lessonIds,
  onClose,
  onReplace,
}: {
  classId: string;
  type: DraftType;
  question: CustomQuestion;
  /** The lessons the assignment covers, for a question not linked to a skill. */
  lessonIds: string[];
  onClose: () => void;
  onReplace: (q: CustomQuestion) => void;
}) {
  const format = writtenFormatOf(question);
  const [notes, setNotes] = useState('');
  const [problem, setProblem] = useState<string | null>(null);
  const regen = useRegenerateQuestion(classId);
  if (!format) return null;

  async function run() {
    setProblem(null);
    try {
      const r = await regen.mutateAsync({ type, format: format!, skillId: question.skillId, lessonIds, current: question.prompt, notes: notes.trim(), points: question.points });
      if (r.question) onReplace({ ...r.question, points: question.points ?? r.question.points });
      else setProblem(r.problem ?? 'The AI did not write a new question. Please try again.');
    } catch (e) {
      setProblem((e as Error).message || 'The question could not be regenerated. Please try again.');
    }
  }

  return (
    <Modal
      open
      onClose={regen.isPending ? () => undefined : onClose}
      title="Regenerate this question"
      description={`The AI writes a new ${FORMAT_LABEL[format]} question on the same skill. You check it before students see it.`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={regen.isPending}>
            Cancel
          </Button>
          <Button icon={<RefreshCw className="h-4 w-4" />} onClick={run} loading={regen.isPending}>
            {regen.isPending ? 'Writing…' : 'Regenerate'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {question.prompt.trim() && (
          <div>
            <div className="label">The question now</div>
            <div className="max-h-40 overflow-auto rounded-xl border border-line bg-surface-2/40 p-3 text-sm">
              <Markdown md={question.prompt} sanitize />
            </div>
          </div>
        )}
        <Textarea label="What should change? (optional)" rows={3} maxLength={400} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Use a sports context. Make it a little harder. Whole numbers only." />
        {problem && <p className="rounded-xl bg-bad-soft p-3 text-sm text-bad-ink">{problem}</p>}
      </div>
    </Modal>
  );
}
