/**
 * "Draft with AI" in the assignment builder: the teacher chooses the lessons, how many questions,
 * the difficulty, the kinds of question and anything else they want, and the AI drafts the
 * assignment (engine/ai/builder.ts). The draft lands in the builder for the teacher to check, edit,
 * preview and publish; nothing reaches students before that.
 */
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { TYPE_LABEL, type AssignmentType } from '@engine/assemble.ts';
import { MAX_DRAFT_QUESTIONS, type DraftFormat, type DraftRequest, type DraftResult, type DraftType } from '@engine/ai/builder.ts';
import { getCourse, lessonById } from '@engine/curriculum/index.ts';
import { useDraftAssignment } from '@/data/hooks.ts';
import { Badge, Button, Checkbox, Modal, Select, Switch, Textarea } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';

const FORMATS: Array<{ format: DraftFormat; label: string; hint: string }> = [
  { format: 'generated', label: 'Generated questions', hint: 'From the course’s question bank: fresh numbers for every student, graded automatically, with hints and worked solutions.' },
  { format: 'choice', label: 'Multiple choice', hint: 'Written by the AI, with wrong choices that come from common mistakes.' },
  { format: 'short', label: 'Short answer', hint: 'Written by the AI: a number or a word, graded automatically. Numeric answers are checked against the AI’s own working.' },
  { format: 'written', label: 'Written response', hint: 'Students solve it on a canvas or type their working; you grade it with the AI’s marking guide.' },
];

const DEFAULT_COUNT: Record<DraftType, number> = { homework: 12, practice: 10, classwork: 10, quiz: 10, exam: 20 };

export type DraftMode = 'replace' | 'add';

export function DraftWithAI({
  classId,
  courseId,
  type,
  initialLessons,
  published,
  hasContent,
  onClose,
  onDraft,
}: {
  classId: string;
  courseId: string;
  type: AssignmentType;
  initialLessons: string[];
  published: Set<string>;
  hasContent: boolean;
  onClose: () => void;
  onDraft: (result: DraftResult, mode: DraftMode) => void;
}) {
  const course = getCourse(courseId)!;
  const draftType = (['homework', 'practice', 'classwork', 'quiz', 'exam'] as const).includes(type as DraftType) ? (type as DraftType) : 'homework';
  const [lessons, setLessons] = useState<Set<string>>(new Set(initialLessons));
  const firstUnit = initialLessons.length ? lessonById(initialLessons[0])?.unitId : undefined;
  const [unitId, setUnitId] = useState(firstUnit ?? course.units[0].id);
  const [count, setCount] = useState(DEFAULT_COUNT[draftType]);
  const [difficulty, setDifficulty] = useState<DraftRequest['difficulty']>('mixed');
  const [formats, setFormats] = useState<Set<DraftFormat>>(new Set(['generated', 'choice', 'short']));
  const [focusWeak, setFocusWeak] = useState(true);
  const [notes, setNotes] = useState('');
  const [mode, setMode] = useState<DraftMode>('replace');
  const draft = useDraftAssignment(classId);
  const unit = course.units.find((u) => u.id === unitId)!;

  const toggle = <T,>(set: Set<T>, value: T, on: boolean) => {
    const next = new Set(set);
    if (on) next.add(value);
    else next.delete(value);
    return next;
  };
  const ready = lessons.size > 0 && formats.size > 0 && count >= 1;

  async function run() {
    const request: DraftRequest = { type: draftType, lessonIds: course.lessons.map((l) => l.id).filter((id) => lessons.has(id)), count, difficulty, formats: [...formats], focusWeak, notes: notes.trim() };
    const result = await draft.mutateAsync(request);
    onDraft(result, hasContent ? mode : 'replace');
  }

  return (
    <Modal
      open
      onClose={draft.isPending ? () => undefined : onClose}
      title={`Draft ${TYPE_LABEL[draftType].toLowerCase()} with AI`}
      description="Choose what it should cover. You check and edit every question before students see it."
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={draft.isPending}>
            Cancel
          </Button>
          <Button icon={<Sparkles className="h-4 w-4" />} onClick={run} loading={draft.isPending} disabled={!ready}>
            {draft.isPending ? 'Drafting… (up to a minute)' : 'Draft with AI'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="label mb-0">Lessons to cover</div>
            <span className="text-xs text-ink-3">{lessons.size ? `${lessons.size} selected` : 'Choose at least one'}</span>
          </div>
          {lessons.size > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {course.lessons
                .filter((l) => lessons.has(l.id))
                .map((l) => (
                  <button key={l.id} type="button" onClick={() => setLessons(toggle(lessons, l.id, false))} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800 hover:bg-brand-100" aria-label={`Remove ${l.number} ${l.title}`}>
                    {l.number} {l.title} ×
                  </button>
                ))}
            </div>
          )}
          <Select value={unitId} onChange={(e) => setUnitId(e.target.value)} aria-label="Unit">
            {course.units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.number}: {u.title}
              </option>
            ))}
          </Select>
          <div className="divide-y divide-line rounded-xl border border-line">
            {unit.lessons.map((lid) => {
              const l = lessonById(lid)!;
              return (
                <div key={lid} className="flex items-center gap-2 px-3 py-2">
                  <Checkbox checked={lessons.has(lid)} onChange={(on) => setLessons(toggle(lessons, lid, on))} label={`${l.number} ${l.title}`} />
                  {!published.has(lid) && <Badge className="ml-auto">Not published</Badge>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">Number of questions</span>
            <input type="number" min={1} max={MAX_DRAFT_QUESTIONS} className="input" value={count} onChange={(e) => setCount(Math.max(1, Math.min(MAX_DRAFT_QUESTIONS, Math.round(Number(e.target.value) || 1))))} />
          </label>
          <div>
            <span className="label">Difficulty</span>
            <div className="inline-flex w-full rounded-xl bg-surface-2 p-1" role="group" aria-label="Difficulty">
              {(['easier', 'mixed', 'harder'] as const).map((d) => (
                <button key={d} type="button" aria-pressed={difficulty === d} onClick={() => setDifficulty(d)} className={cn('flex-1 rounded-lg px-3 py-1.5 text-sm font-medium', difficulty === d ? 'bg-surface text-ink shadow-card' : 'text-ink-3')}>
                  {d === 'easier' ? 'Easier' : d === 'harder' ? 'Harder' : 'Easy to hard'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <div className="label mb-0">Kinds of question</div>
          {FORMATS.map((f) => (
            <label key={f.format} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-3 py-2.5 hover:bg-surface-2/40">
              <input type="checkbox" className="mt-1 h-[18px] w-[18px] accent-[rgb(var(--brand))]" checked={formats.has(f.format)} onChange={(e) => setFormats(toggle(formats, f.format, e.target.checked))} />
              <span>
                <span className="block text-sm font-medium">{f.label}</span>
                <span className="block text-xs text-ink-3">{f.hint}</span>
              </span>
            </label>
          ))}
        </section>

        <Switch checked={focusWeak} onChange={setFocusWeak} label="Focus on what the class finds hard" description="More questions on the skills your students have not mastered yet." />

        <Textarea label="Anything else? (optional)" rows={3} maxLength={600} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Include two word problems about sports. No calculator needed. End with one challenge question." />

        {hasContent && (
          <div>
            <span className="label">This assignment already has questions</span>
            <div className="inline-flex rounded-xl bg-surface-2 p-1" role="group" aria-label="What to do with them">
              {(['replace', 'add'] as const).map((m) => (
                <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', mode === m ? 'bg-surface text-ink shadow-card' : 'text-ink-3')}>
                  {m === 'replace' ? 'Replace them' : 'Add to them'}
                </button>
              ))}
            </div>
          </div>
        )}

        {draft.isError && <p className="rounded-xl bg-bad-soft p-3 text-sm text-bad-ink">{(draft.error as Error).message || 'The draft could not be made. Please try again.'}</p>}
      </div>
    </Modal>
  );
}
