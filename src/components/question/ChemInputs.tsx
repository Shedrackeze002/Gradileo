/** Answer boxes for chemistry: a formula, and the coefficients that balance an equation. */
import { ce } from '@engine/chem/formula.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { cn } from '@/lib/cn.ts';

type Status = 'correct' | 'incorrect' | null;

// The same marks as the maths input: green when right, red when wrong.
const ring = (status: Status) =>
  status === 'correct' ? 'border-good bg-good-soft/40 focus:border-good focus:ring-good/15' : status === 'incorrect' ? 'border-bad bg-bad-soft/40 focus:border-bad focus:ring-bad/15' : '';

/** A formula typed in plain text (Na2SO4, SO4^2-), shown as it will be read. */
export function FormulaInput({
  value,
  onChange,
  disabled,
  status,
  placeholder,
  onEnter,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  status: Status;
  placeholder?: string;
  onEnter?: () => void;
  autoFocus?: boolean;
}) {
  const shown = value.trim();
  return (
    <div>
      <input
        className={cn('input h-12 font-mono', ring(status))}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Formula"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        placeholder={placeholder ?? 'For example Na2SO4, or SO4^2- for an ion'}
      />
      {shown && (
        <p className="mt-1.5 text-sm text-ink-3" aria-live="polite">
          Reads as <Markdown md={`$${ce(shown.replace(/[{}$\\]/g, ''))}$`} inline />
        </p>
      )}
    </div>
  );
}

/** A box before each formula of an equation, for its coefficient; an empty box is 1. */
export function CoefficientsInput({
  reactants,
  products,
  value,
  onChange,
  disabled,
  status,
}: {
  reactants: string[];
  products: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  status: Status;
}) {
  const species = [...reactants, ...products];
  const boxes = species.map((_, i) => value.split(',')[i] ?? '');
  const set = (i: number, v: string) => onChange(species.map((_, j) => (j === i ? v.replace(/\D/g, '').slice(0, 3) : boxes[j])).join(','));
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-lg" role="group" aria-label="Coefficients">
      {species.map((f, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i === reactants.length ? (
            <span className="mx-1 text-ink-3" aria-label="gives">
              →
            </span>
          ) : i > 0 ? (
            <span className="text-ink-3">+</span>
          ) : null}
          <input
            className={cn('input h-11 w-14 px-2 text-center', ring(status))}
            inputMode="numeric"
            value={boxes[i]}
            disabled={disabled}
            placeholder="1"
            aria-label={`Coefficient of ${f}`}
            onChange={(e) => set(i, e.target.value)}
          />
          <Markdown md={`$${ce(f)}$`} inline />
        </span>
      ))}
    </div>
  );
}
