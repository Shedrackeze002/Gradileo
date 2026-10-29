/** Renders one generated (or teacher-authored) question with the right input for each part. */
import { ArrowDown, ArrowUp, Calculator, Check, CheckCircle2, Lightbulb, X, XCircle } from 'lucide-react';
import type { AnswerSpec, Choice, Item, Part } from '@engine/types.ts';
import type { ItemResult, PartResult } from '@engine/grade.ts';
import { answerMarkdown } from '@engine/answers.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { MathInput, type MathMode } from '@/components/math/MathInput.tsx';
import { Figure } from '@/components/figures/Figure.tsx';
import { cn } from '@/lib/cn.ts';
import { CanvasAnswer, CanvasAnswerView } from '@/features/whiteboard/CanvasAnswer.tsx';
import { GraphInput } from './GraphInput.tsx';
import { CoefficientsInput, FormulaInput } from './ChemInputs.tsx';

export interface QuestionViewProps {
  item: Item;
  responses: string[];
  onChange: (responses: string[]) => void;
  result?: ItemResult | null;
  locked?: boolean;
  showAnswers?: boolean;
  onEnter?: () => void;
  header?: React.ReactNode;
  autoFocus?: boolean;
  /** A written response's working on the answer canvas (encodeCanvas). */
  canvas?: string;
  /** Given where the canvas is saved: written responses can then be solved on a canvas. */
  onCanvasChange?: (canvas: string | undefined) => void;
}

export function QuestionView({ item, responses, onChange, result, locked, showAnswers, onEnter, header, autoFocus, canvas, onCanvasChange }: QuestionViewProps) {
  const set = (i: number, v: string) => {
    const next = item.parts.map((_, j) => responses[j] ?? '');
    next[i] = v;
    onChange(next);
  };
  // One canvas per question, with its first written part.
  const canvasPart = item.parts.findIndex((p) => p.answer.kind === 'manual');
  return (
    <div className="space-y-5" data-question="">
      {header}
      <div className="flex items-start gap-3">
        <Markdown md={item.prompt} className="min-w-0 flex-1 text-[17px] leading-[1.65]" sanitize={item.id.startsWith('custom:')} />
        {item.calculator && (
          <span className="mt-1 hidden shrink-0 items-center gap-1 rounded-full bg-surface-2 px-2 py-1 text-xs text-ink-3 sm:inline-flex" title="A calculator is appropriate for this question">
            <Calculator className="h-3.5 w-3.5" /> Calculator
          </span>
        )}
      </div>
      {item.figure && <Figure fig={item.figure} />}
      <div className="space-y-4">
        {item.parts.map((p, i) => (
          <PartInput
            key={i}
            part={p}
            value={responses[i] ?? ''}
            onChange={(v) => set(i, v)}
            result={result?.parts[i]}
            locked={locked}
            showAnswer={showAnswers}
            onEnter={onEnter}
            autoFocus={autoFocus && i === 0}
            functions={FUNCTION_COURSES.test(item.skillId)}
            canvas={i === canvasPart ? canvas : undefined}
            onCanvas={i === canvasPart ? onCanvasChange : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function modeFor(spec: AnswerSpec): MathMode {
  switch (spec.kind) {
    case 'numeric':
      return 'number';
    case 'line':
    case 'equation-fn':
      return 'equation';
    case 'point':
      return 'point';
    case 'numbers':
      return 'list';
    default:
      return 'expr';
  }
}

/** Courses whose answers use sin, cos, tan, ln, log and e: Math 30-1, 30-2 and 31. */
const FUNCTION_COURSES = /^(m301|m302|m31)-/;

function PartInput({
  part,
  value,
  onChange,
  result,
  locked,
  showAnswer,
  onEnter,
  autoFocus,
  functions,
  canvas,
  onCanvas,
}: {
  part: Part;
  value: string;
  onChange: (v: string) => void;
  result?: PartResult;
  locked?: boolean;
  showAnswer?: boolean;
  onEnter?: () => void;
  autoFocus?: boolean;
  functions?: boolean;
  canvas?: string;
  onCanvas?: (canvas: string | undefined) => void;
}) {
  const spec = part.answer;
  const status = result && !result.invalid ? (result.correct ? 'correct' : 'incorrect') : null;
  let input: React.ReactNode;
  switch (spec.kind) {
    case 'mc':
      input = <ChoiceList choices={spec.choices} selected={value ? [value] : []} onToggle={(id) => onChange(id)} locked={locked} correct={showAnswer || result ? [spec.correct] : undefined} reveal={showAnswer} layout={spec.layout} />;
      break;
    case 'multi':
      input = (
        <>
          <p className="mb-2 text-sm text-ink-3">Select all that apply.</p>
          <ChoiceList
            multi
            choices={spec.choices}
            selected={value ? value.split(',').filter(Boolean) : []}
            onToggle={(id) => {
              const cur = new Set(value.split(',').filter(Boolean));
              if (cur.has(id)) cur.delete(id);
              else cur.add(id);
              onChange(spec.choices.map((c) => c.id).filter((c) => cur.has(c)).join(','));
            }}
            locked={locked}
            correct={showAnswer ? spec.correct : undefined}
            reveal={showAnswer}
            layout={spec.layout}
          />
        </>
      );
      break;
    case 'order':
      input = <OrderList items={spec.items} ends={spec.ends} value={value} onChange={onChange} locked={locked} />;
      break;
    case 'graph-line':
    case 'graph-points':
      input = (
        <GraphInput
          grid={spec.grid}
          mode={spec.kind === 'graph-line' ? 'line' : 'points'}
          maxPoints={spec.kind === 'graph-points' ? spec.points.length + 2 : 2}
          value={value}
          onChange={onChange}
          disabled={locked}
          status={status}
          solutionLine={showAnswer && spec.kind === 'graph-line' && status !== 'correct' ? spec.line : null}
        />
      );
      break;
    case 'manual':
      input = locked && canvas ? (
        <CanvasAnswerView text={value} canvas={canvas} />
      ) : onCanvas && !locked ? (
        <CanvasAnswer text={value} onText={onChange} canvas={canvas} onCanvas={onCanvas} placeholder="Write your answer. Explain your reasoning in full sentences." />
      ) : (
        <textarea
          className="input min-h-[140px] leading-relaxed"
          value={value}
          disabled={locked}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your answer. Explain your reasoning in full sentences."
        />
      );
      break;
    case 'text':
      input = <input className="input h-12" value={value} disabled={locked} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onEnter?.()} placeholder={part.placeholder ?? 'Your answer'} />;
      break;
    case 'formula':
      input = <FormulaInput value={value} onChange={onChange} disabled={locked} status={status} placeholder={part.placeholder} onEnter={onEnter} autoFocus={autoFocus} />;
      break;
    case 'coefficients':
      input = <CoefficientsInput reactants={spec.reactants} products={spec.products} value={value} onChange={onChange} disabled={locked} status={status} />;
      break;
    default:
      input = (
        <MathInput
          value={value}
          onChange={onChange}
          mode={modeFor(spec)}
          disabled={locked}
          status={status}
          suffix={part.suffix ?? (spec.kind === 'numeric' ? spec.unit : undefined)}
          placeholder={part.placeholder}
          onEnter={onEnter}
          autoFocus={autoFocus}
          functions={functions}
          label={part.label ? <Markdown md={part.label} inline /> : undefined}
        />
      );
  }
  const isChoice = spec.kind === 'mc' || spec.kind === 'multi';
  return (
    <div>
      {part.label && (isChoice || spec.kind === 'order' || spec.kind.startsWith('graph') || spec.kind === 'manual' || spec.kind === 'text' || spec.kind === 'formula' || spec.kind === 'coefficients') && (
        <div className="mb-2 font-medium text-ink">
          <Markdown md={part.label} inline />
        </div>
      )}
      {input}
      {result && result.message && !result.correct && (
        <div className={cn('mt-2 flex items-start gap-2 rounded-xl px-3 py-2 text-sm', result.invalid ? 'bg-warn-soft text-warn-ink' : 'bg-bad-soft text-bad-ink')}>
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{result.message}</span>
        </div>
      )}
      {showAnswer && result && !result.correct && !isChoice && spec.kind !== 'manual' && (
        <div className="mt-2 flex items-start gap-2 rounded-xl bg-good-soft px-3 py-2 text-sm text-good-ink">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Correct answer: <Markdown md={answerMarkdown(spec, part)} inline />
          </span>
        </div>
      )}
    </div>
  );
}

function ChoiceList({
  choices,
  selected,
  onToggle,
  locked,
  multi,
  correct,
  reveal,
  layout,
}: {
  choices: Choice[];
  selected: string[];
  onToggle: (id: string) => void;
  locked?: boolean;
  multi?: boolean;
  correct?: string[];
  reveal?: boolean;
  layout?: 'list' | 'grid';
}) {
  const grid = layout === 'grid' || choices.some((c) => c.figure);
  return (
    <div role={multi ? 'group' : 'radiogroup'} className={cn('grid gap-2.5', grid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
      {choices.map((c, i) => {
        const isSel = selected.includes(c.id);
        const isRight = correct?.includes(c.id);
        const showRight = reveal && isRight;
        const showWrong = !!correct && isSel && !isRight;
        const showGood = !!correct && isSel && isRight;
        return (
          <button
            key={c.id}
            type="button"
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={isSel}
            disabled={locked}
            onClick={() => onToggle(c.id)}
            className={cn(
              'group flex w-full items-start gap-3 rounded-xl border-2 bg-surface px-3.5 py-3 text-left transition',
              !locked && 'hover:border-brand-300 hover:bg-brand-50/50',
              isSel && !correct && 'border-brand bg-brand-50',
              !isSel && !showRight && 'border-line',
              showGood && 'border-good bg-good-soft/50',
              showWrong && 'border-bad bg-bad-soft/50',
              showRight && !isSel && 'border-good border-dashed',
              locked && 'cursor-default',
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold',
                multi ? 'rounded-md' : 'rounded-full',
                isSel ? 'bg-brand text-brand-ink' : 'border border-line-strong text-ink-3',
                showGood && 'bg-good text-white',
                showWrong && 'bg-bad text-white',
              )}
            >
              {showGood ? <Check className="h-3.5 w-3.5" /> : showWrong ? <X className="h-3.5 w-3.5" /> : String.fromCharCode(65 + i)}
            </span>
            <span className="min-w-0 flex-1">
              {c.md && <Markdown md={c.md} inline className="text-[15.5px] leading-relaxed" />}
              {c.figure && <Figure fig={c.figure} compact className="mt-1 border-0 p-0" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OrderList({ items, ends = ['Least', 'Greatest'], value, onChange, locked }: { items: Choice[]; ends?: [string, string]; value: string; onChange: (v: string) => void; locked?: boolean }) {
  const order = value ? value.split(',') : items.map((c) => c.id);
  const byId = new Map(items.map((c) => [c.id, c]));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const next = order.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next.join(','));
  };
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-medium uppercase tracking-wide text-ink-3">
        <span>{ends[0]}</span>
        <span>Use the arrows to reorder</span>
      </div>
      <ol className="space-y-2">
        {order.map((id, i) => (
          <li key={id} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2">
            <span className="w-5 text-sm font-semibold text-ink-3">{i + 1}</span>
            <Markdown md={byId.get(id)?.md ?? id} inline className="flex-1 text-[16px]" />
            {!locked && (
              <span className="flex gap-1">
                <button type="button" aria-label="Move up" className="rounded-lg border border-line p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-30" disabled={i === 0} onClick={() => move(i, -1)}>
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Move down" className="rounded-lg border border-line p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-30" disabled={i === order.length - 1} onClick={() => move(i, 1)}>
                  <ArrowDown className="h-4 w-4" />
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-1 text-right text-xs font-medium uppercase tracking-wide text-ink-3">{ends[1]}</div>
    </div>
  );
}

export function HintPanel({ hints, used, onReveal, disabled }: { hints: string[]; used: number; onReveal: () => void; disabled?: boolean }) {
  if (!hints.length) return null;
  return (
    <div className="space-y-2">
      {hints.slice(0, used).map((h, i) => (
        <div key={i} className="flex animate-slide-up items-start gap-2.5 rounded-xl border border-warn/30 bg-warn-soft/60 px-3.5 py-2.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-warn-ink">Hint {i + 1}</div>
            <Markdown md={h} className="text-[15px]" />
          </div>
        </div>
      ))}
      {used < hints.length && !disabled && (
        <button type="button" onClick={onReveal} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-warn-ink hover:bg-warn-soft">
          <Lightbulb className="h-4 w-4" />
          {used === 0 ? 'Get a hint' : 'Next hint'}
          <span className="text-xs text-ink-3">
            ({used}/{hints.length})
          </span>
        </button>
      )}
    </div>
  );
}

export function SolutionPanel({ item, className }: { item: Item; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-brand-200 bg-brand-50/60 p-4', className)}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">Worked solution</div>
      <ol className="space-y-2.5">
        {item.solution.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">{i + 1}</span>
            <Markdown md={s} className="min-w-0 flex-1 text-[15.5px]" />
          </li>
        ))}
      </ol>
      {item.answerDisplay && (
        <div className="mt-3 border-t border-brand-200 pt-3 text-[15px]">
          <span className="font-semibold">Answer: </span>
          <Markdown md={item.answerDisplay} inline />
        </div>
      )}
    </div>
  );
}
