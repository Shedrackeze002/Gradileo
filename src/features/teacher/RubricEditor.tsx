/**
 * The rubric of a written question in the assignment builder: start from a ready-made English
 * rubric (engine/rubric.ts) or an empty one, then rename criteria, change what each level says, make
 * a criterion count more, or add and remove criteria.
 */
import { Plus, Trash2 } from 'lucide-react';
import type { CustomQuestion } from '@engine/assemble.ts';
import { MAX_CRITERIA, RUBRIC_LEVELS, RUBRIC_TEMPLATES, rubricFromTemplate, rubricMax, weightOf, type Rubric, type RubricCriterion } from '@engine/rubric.ts';
import { Button, IconButton } from '@/components/ui/index.ts';
import { uid } from '@/lib/ids.ts';

const OWN = 'own';
const blankCriterion = (): RubricCriterion => ({ id: uid('r'), name: '', descriptors: ['', '', '', ''] });

export function RubricEditor({ q, onChange }: { q: CustomQuestion; onChange: (q: CustomQuestion) => void }) {
  const rubric = q.rubric;
  const set = (r: Rubric | undefined) => onChange({ ...q, rubric: r });
  const template = rubric ? RUBRIC_TEMPLATES.find((t) => t.name === rubric.name)?.id ?? OWN : '';
  const setCriterion = (i: number, c: RubricCriterion) => rubric && set({ ...rubric, criteria: rubric.criteria.map((x, j) => (j === i ? c : x)) });
  const points = q.points ?? 1;

  return (
    <div className="space-y-3 rounded-xl border border-line bg-surface-2/40 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm font-medium" htmlFor={`rubric-${q.id}`}>
          Rubric
        </label>
        <select
          id={`rubric-${q.id}`}
          className="input h-9 w-auto py-0 text-sm"
          value={template}
          onChange={(e) => {
            const v = e.target.value;
            if (!v) set(undefined);
            else if (v === OWN) set({ name: 'My rubric', criteria: rubric?.criteria.length ? rubric.criteria : [blankCriterion()] });
            else set(rubricFromTemplate(v) ?? undefined);
          }}
        >
          <option value="">No rubric: one mark out of {points}</option>
          {RUBRIC_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
          <option value={OWN}>My own rubric</option>
        </select>
        {!rubric && <span className="text-xs text-ink-3">For essays and paragraphs: mark each criterion, and students see what each level looks like.</span>}
      </div>
      {rubric && (
        <>
          <p className="text-xs text-ink-3">
            {RUBRIC_TEMPLATES.find((t) => t.id === template)?.use ?? 'Your own criteria.'} Students see this rubric while they write. You give each criterion a level from 4 Excellent to 1 Beginning (0 when it is not shown), and the total, out of {rubricMax(rubric.criteria)}, is scaled to the question&apos;s {points} point{points === 1 ? '' : 's'}.
          </p>
          <div className="space-y-2">
            {rubric.criteria.map((c, i) => (
              <div key={c.id} className="rounded-lg border border-line bg-surface p-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <input className="input h-9 min-w-0 flex-1 text-sm" value={c.name} placeholder="Criterion, e.g. Evidence and analysis" aria-label={`Criterion ${i + 1}`} onChange={(e) => setCriterion(i, { ...c, name: e.target.value })} />
                  <select className="input h-9 w-auto py-0 text-sm" value={weightOf(c)} aria-label={`How much ${c.name || `criterion ${i + 1}`} counts`} onChange={(e) => setCriterion(i, { ...c, weight: Number(e.target.value) })}>
                    <option value={1}>Counts once</option>
                    <option value={2}>Counts twice</option>
                    <option value={3}>Counts three times</option>
                  </select>
                  <IconButton
                    label="Remove criterion"
                    className="h-8 w-8"
                    onClick={() => {
                      const criteria = rubric.criteria.filter((_, j) => j !== i);
                      set(criteria.length ? { ...rubric, criteria } : undefined);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
                <details className="mt-2 text-sm" open={!c.descriptors.some(Boolean)}>
                  <summary className="cursor-pointer text-xs font-semibold text-brand">What each level looks like</summary>
                  <div className="mt-2 space-y-1.5">
                    {RUBRIC_LEVELS.filter((l) => l.level > 0).map((l, k) => (
                      <label key={l.level} className="flex items-start gap-2">
                        <span className="w-24 shrink-0 pt-2 text-xs font-medium text-ink-2">
                          {l.level} {l.name}
                        </span>
                        <textarea
                          rows={1}
                          className="input min-h-[2.25rem] py-1.5 text-sm"
                          value={c.descriptors[k] ?? ''}
                          onChange={(e) => setCriterion(i, { ...c, descriptors: c.descriptors.map((d, j) => (j === k ? e.target.value : d)) })}
                        />
                      </label>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>
          {rubric.criteria.length < MAX_CRITERIA && (
            <Button size="xs" variant="ghost" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => set({ ...rubric, criteria: [...rubric.criteria, blankCriterion()] })}>
              Add criterion
            </Button>
          )}
        </>
      )}
    </div>
  );
}
