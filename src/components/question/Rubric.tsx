/**
 * Rubrics for written responses (engine/rubric.ts): the guide students read while they write, the
 * levels their teacher gave once it is marked, and the grid a teacher marks with.
 */
import { ClipboardList } from 'lucide-react';
import { levelDescriptor, levelName, pointsOf, RUBRIC_LEVELS, rubricEarned, rubricMax, rubricScore01, weightOf, type RubricCriterion, type RubricLevels } from '@engine/rubric.ts';
import { cn } from '@/lib/cn.ts';

const LEVEL_TONE: Record<number, string> = {
  4: 'border-good/40 bg-good-soft text-good-ink',
  3: 'border-brand-200 bg-brand-50 text-brand-700',
  2: 'border-warn/40 bg-warn-soft text-warn-ink',
  1: 'border-bad/30 bg-bad-soft text-bad-ink',
  0: 'border-line bg-surface-2 text-ink-2',
};

const counts = (c: RubricCriterion) => (weightOf(c) > 1 ? ` (counts ${weightOf(c)}×)` : '');

/** What each criterion looks like at each level: shown to students while they write. */
export function RubricGuide({ criteria, open = false }: { criteria: RubricCriterion[]; open?: boolean }) {
  return (
    <details className="group mt-3 rounded-xl border border-line bg-surface-2/40 text-sm" open={open}>
      <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 font-semibold text-ink-2">
        <ClipboardList className="h-4 w-4 text-brand" />
        How this is marked
        <span className="font-normal text-ink-3">: {criteria.map((c) => c.name).join(', ')}</span>
      </summary>
      <div className="space-y-3 border-t border-line px-3 py-3">
        {criteria.map((c) => (
          <div key={c.id}>
            <div className="font-semibold text-ink">
              {c.name}
              <span className="font-normal text-ink-3">{counts(c)}</span>
            </div>
            <dl className="mt-1 grid gap-1 sm:grid-cols-2">
              {RUBRIC_LEVELS.filter((l) => l.level > 0).map((l) => (
                <div key={l.level} className="flex gap-2">
                  <dt className="w-24 shrink-0 font-medium text-ink-2">
                    {l.level} {l.name}
                  </dt>
                  <dd className="text-ink-2">{levelDescriptor(c, l.level) || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </details>
  );
}

/** The level the teacher gave on each criterion, with what that level means. */
export function RubricResult({ criteria, levels, points }: { criteria: RubricCriterion[]; levels: RubricLevels; points: number }) {
  const score = rubricScore01(criteria, levels);
  return (
    <div className="rounded-xl border border-line bg-surface p-3 text-sm" aria-label="Rubric marks">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold">Rubric</span>
        <span className="text-ink-3">
          {rubricEarned(criteria, levels)} / {rubricMax(criteria)}
          {score !== null && ` · ${pointsOf(score, points)} / ${points} points`}
        </span>
      </div>
      <ul className="space-y-2">
        {criteria.map((c) => {
          const level = levels[c.id] ?? 0;
          return (
            <li key={c.id} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
              <span className="font-medium sm:w-44 sm:shrink-0">
                {c.name}
                <span className="font-normal text-ink-3">{counts(c)}</span>
              </span>
              <span className={cn('inline-flex w-fit shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold', LEVEL_TONE[level])}>
                {level} · {levelName(level)}
              </span>
              <span className="text-ink-2">{levelDescriptor(c, level) || 'Not shown in this response.'}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The teacher's grid: one level per criterion, with the description of the level chosen. */
export function RubricGrid({ criteria, levels, onChange, points, suggested }: { criteria: RubricCriterion[]; levels: RubricLevels; onChange: (levels: RubricLevels) => void; points: number; suggested?: RubricLevels }) {
  const score = rubricScore01(criteria, levels);
  return (
    <div className="space-y-3">
      {criteria.map((c) => {
        const level = levels[c.id];
        return (
          <div key={c.id}>
            <div className="mb-1 text-sm font-medium">
              {c.name}
              <span className="font-normal text-ink-3">{counts(c)}</span>
            </div>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={c.name}>
              {RUBRIC_LEVELS.map((l) => (
                <button
                  key={l.level}
                  type="button"
                  role="radio"
                  aria-checked={level === l.level}
                  title={levelDescriptor(c, l.level) || undefined}
                  onClick={() => onChange({ ...levels, [c.id]: l.level })}
                  className={cn(
                    'relative h-9 rounded-lg border px-2.5 text-sm font-semibold transition',
                    level === l.level ? 'border-brand bg-brand text-brand-ink' : 'border-line bg-surface hover:border-line-strong',
                  )}
                >
                  {l.level} {l.name}
                  {suggested?.[c.id] === l.level && level !== l.level && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand" aria-label="suggested" />}
                </button>
              ))}
            </div>
            {level !== undefined && <p className="mt-1 text-xs text-ink-3">{levelDescriptor(c, level) || 'The response does not show this.'}</p>}
          </div>
        );
      })}
      <div className="text-sm text-ink-2">
        Rubric: <span className="font-semibold">{rubricEarned(criteria, levels)}</span> / {rubricMax(criteria)}
        {score !== null ? (
          <>
            {' '}
            · <span className="font-semibold">{pointsOf(score, points)}</span> / {points} points
          </>
        ) : (
          <span className="text-ink-3"> · give a level on every criterion</span>
        )}
      </div>
    </div>
  );
}
