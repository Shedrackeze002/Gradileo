/** The pen, highlighter and eraser controls shared by the whiteboard and drawing on slides. */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Circle, Eraser, Hand, Highlighter, MousePointer2, MoveUpRight, Pen, RectangleHorizontal, Redo2, Shapes, Slash, Square, Trash2, Triangle, TriangleRight, Undo2 } from 'lucide-react';
import { INK_COLORS, INK_SIZES, SHAPE_KINDS, SHAPE_NAMES, type InkColor, type ShapeKind } from '@/lib/ink.ts';
import { cn } from '@/lib/cn.ts';
import type { InkMode } from './InkSurface.tsx';
import { useInkTheme } from './useInkTheme.ts';

export interface InkTools {
  mode: InkMode;
  setMode: (m: InkMode) => void;
  /** The shape the shape tool draws; choosing one turns the shape tool on. */
  shape: ShapeKind;
  setShape: (k: ShapeKind) => void;
  color: InkColor;
  setColor: (c: InkColor) => void;
  size: number;
  setSize: (s: number) => void;
  penOnly: boolean;
  setPenOnly: (on: boolean) => void;
  /** Turns on pen-only mode the first time a pen is used (the teacher can turn it off again). */
  onPen: () => void;
}

export function useInkTools(): InkTools {
  const [mode, setMode] = useState<InkMode>('pen');
  const [shape, setShape] = useState<ShapeKind>('rectangle');
  const [color, setColor] = useState<InkColor>('ink');
  const [size, setSize] = useState(INK_SIZES[1]);
  const [penOnly, setPenOnly] = useState(false);
  const [penSeen, setPenSeen] = useState(false);
  return {
    mode,
    setMode,
    shape,
    setShape: (k) => {
      setShape(k);
      setMode('shape');
    },
    color,
    setColor: (c) => {
      setColor(c);
      if (mode === 'eraser') setMode('pen');
    },
    size,
    setSize,
    penOnly,
    setPenOnly,
    onPen: () => {
      if (penSeen) return;
      setPenSeen(true);
      setPenOnly(true);
    },
  };
}

const COLOR_NAMES: Record<InkColor, string> = { ink: 'Black', blue: 'Blue', red: 'Red', green: 'Green', orange: 'Orange', purple: 'Purple' };

const SHAPE_ICONS: Record<ShapeKind, ReactNode> = {
  line: <Slash className="h-5 w-5" />,
  arrow: <MoveUpRight className="h-5 w-5" />,
  rectangle: <RectangleHorizontal className="h-5 w-5" />,
  square: <Square className="h-5 w-5" />,
  circle: <Circle className="h-5 w-5" />,
  ellipse: <Circle className="h-5 w-5 scale-y-[0.62]" />,
  triangle: <Triangle className="h-5 w-5" />,
  rightTriangle: <TriangleRight className="h-5 w-5" />,
};
const SIZE_NAMES = ['Thin', 'Medium', 'Thick'];

function ToolButton({ on, label, onClick, children, disabled }: { on?: boolean; label: string; onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={on}
      title={label}
      className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 disabled:opacity-35', on && 'bg-brand-100 text-brand-800 hover:bg-brand-100')}
    >
      {children}
    </button>
  );
}

/**
 * The drawing toolbar. The shape picker opens beside it (above by default, or below where the
 * toolbar sits above the canvas), outside the toolbar so its sideways scrolling cannot clip it.
 */
export function InkToolbar({ tools, onUndo, onRedo, onClear, canUndo, canRedo, canClear, className, pickerSide = 'top' }: { tools: InkTools; onUndo: () => void; onRedo: () => void; onClear: () => void; canUndo: boolean; canRedo: boolean; canClear: boolean; className?: string; pickerSide?: 'top' | 'bottom' }) {
  const { palette } = useInkTheme();
  const [picking, setPicking] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!picking) return;
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setPicking(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Escape closes the picker only, not present mode behind it.
      e.stopPropagation();
      setPicking(false);
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [picking]);
  const sep = <span className="mx-1 h-7 w-px shrink-0 bg-line" />;
  const shapeOn = tools.mode === 'shape';
  return (
    <div ref={box} className={cn('relative max-w-full', className)}>
      {picking && (
        <div role="group" aria-label="Shapes" data-ink-picker className={cn('absolute left-1/2 z-50 flex -translate-x-1/2 gap-0.5 rounded-2xl border border-line bg-surface p-1.5 shadow-pop', pickerSide === 'top' ? 'bottom-full mb-2' : 'top-full mt-2')}>
          {SHAPE_KINDS.map((k) => (
            <ToolButton
              key={k}
              label={SHAPE_NAMES[k]}
              on={shapeOn && tools.shape === k}
              onClick={() => {
                tools.setShape(k);
                setPicking(false);
              }}
            >
              {SHAPE_ICONS[k]}
            </ToolButton>
          ))}
        </div>
      )}
      <div role="toolbar" aria-label="Drawing tools" className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-2xl border border-line bg-surface p-1.5 shadow-pop">
        <ToolButton label="Pen (P)" on={tools.mode === 'pen'} onClick={() => tools.setMode('pen')}>
          <Pen className="h-5 w-5" />
        </ToolButton>
        <ToolButton label="Highlighter (H)" on={tools.mode === 'highlighter'} onClick={() => tools.setMode('highlighter')}>
          <Highlighter className="h-5 w-5" />
        </ToolButton>
        <ToolButton label="Eraser (E)" on={tools.mode === 'eraser'} onClick={() => tools.setMode('eraser')}>
          <Eraser className="h-5 w-5" />
        </ToolButton>
        <ToolButton
          label={shapeOn ? `Shapes (S): ${SHAPE_NAMES[tools.shape]}. Tap to choose another shape.` : 'Shapes (S)'}
          on={shapeOn}
          onClick={() => {
            if (!shapeOn) tools.setMode('shape');
            setPicking((p) => !shapeOn || !p);
          }}
        >
          {shapeOn ? SHAPE_ICONS[tools.shape] : <Shapes className="h-5 w-5" />}
        </ToolButton>
        <ToolButton label="Pointer (L): point to something without drawing" on={tools.mode === 'pointer'} onClick={() => tools.setMode('pointer')}>
          <MousePointer2 className="h-5 w-5" />
        </ToolButton>
        {sep}
        {INK_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={COLOR_NAMES[c]}
            aria-pressed={tools.color === c}
            title={COLOR_NAMES[c]}
            onClick={() => tools.setColor(c)}
            className={cn('flex h-10 w-9 shrink-0 items-center justify-center rounded-xl hover:bg-surface-2', tools.color === c && tools.mode !== 'eraser' && 'bg-surface-2')}
          >
            <span className={cn('h-6 w-6 rounded-full ring-offset-2 ring-offset-surface', tools.color === c && tools.mode !== 'eraser' && 'ring-2 ring-ink-3')} style={{ background: palette[c] }} />
          </button>
        ))}
        {sep}
        {INK_SIZES.map((s, i) => (
          <button key={s} type="button" aria-label={`${SIZE_NAMES[i]} line`} aria-pressed={tools.size === s} title={`${SIZE_NAMES[i]} line`} onClick={() => tools.setSize(s)} className={cn('flex h-10 w-9 shrink-0 items-center justify-center rounded-xl hover:bg-surface-2', tools.size === s && 'bg-surface-2')}>
            <span className="rounded-full bg-ink-2" style={{ width: 4 + i * 5, height: 4 + i * 5 }} />
          </button>
        ))}
        {sep}
        <ToolButton label="Undo (Ctrl+Z)" onClick={onUndo} disabled={!canUndo}>
          <Undo2 className="h-5 w-5" />
        </ToolButton>
        <ToolButton label="Redo (Ctrl+Shift+Z)" onClick={onRedo} disabled={!canRedo}>
          <Redo2 className="h-5 w-5" />
        </ToolButton>
        <ToolButton label="Clear the page" onClick={onClear} disabled={!canClear}>
          <Trash2 className="h-5 w-5" />
        </ToolButton>
        {sep}
        <ToolButton label={tools.penOnly ? 'Pen only: fingers and palms are ignored. Tap to draw with a finger too.' : 'Fingers draw. Tap to draw with a pen only (palm rejection).'} on={!tools.penOnly} onClick={() => tools.setPenOnly(!tools.penOnly)}>
          <Hand className="h-5 w-5" />
        </ToolButton>
      </div>
    </div>
  );
}
