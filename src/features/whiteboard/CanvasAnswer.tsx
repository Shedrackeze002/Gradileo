/**
 * The answer area of a written response: students solve the question on a canvas (pen,
 * highlighter, eraser, pages, squared or lined paper, full screen) or type, and can use both.
 * The canvas is kept in the response as text (encodeCanvas); a stroke that would make it longer
 * than a submission allows is not kept, and the student is told why.
 */
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Grid3x3, Grip, Keyboard, Maximize2, Minimize2, PenLine, Plus, Rows3, Square } from 'lucide-react';
import { BACKGROUNDS, BOARD_W, CANVAS_MAX_LENGTH, CANVAS_MAX_PAGES, CANVAS_POINT_GAP, decodeCanvas, encodeCanvas, hasInk, inkCommit, inkDoc, inkRedo, inkUndo, type BoardBackground, type BoardPage, type InkDoc } from '@/lib/ink.ts';
import { Tabs } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { BoardPageCanvas } from './BoardView.tsx';
import { InkSurface } from './InkSurface.tsx';
import { usePageLock } from './pageLock.ts';
import { InkToolbar, useInkTools } from './InkToolbar.tsx';
import { useBoardFit } from './useBoardFit.ts';

interface PageState {
  background: BoardBackground;
  doc: InkDoc;
}

const BG_ICON = { plain: Square, grid: Grid3x3, lined: Rows3, dots: Grip } as const;
const BG_NAME = { plain: 'Plain', grid: 'Squared', lined: 'Lined', dots: 'Dotted' } as const;

const toPages = (pages: PageState[]): BoardPage[] => pages.map((p) => ({ background: p.background, strokes: p.doc.strokes }));
function fromCanvas(canvas: string | undefined): PageState[] {
  const pages = decodeCanvas(canvas);
  return pages.length ? pages.map((p) => ({ background: p.background, doc: inkDoc(p.strokes) })) : [{ background: 'grid', doc: inkDoc() }];
}

export interface CanvasAnswerProps {
  text: string;
  onText: (text: string) => void;
  canvas?: string;
  onCanvas: (canvas: string | undefined) => void;
  placeholder?: string;
}

export function CanvasAnswer({ text, onText, canvas, onCanvas, placeholder }: CanvasAnswerProps) {
  const [tab, setTab] = useState<'canvas' | 'type'>(() => (text.trim() && !canvas ? 'type' : 'canvas'));
  usePageLock(tab === 'canvas');
  const [pages, setPages] = useState(() => fromCanvas(canvas));
  const [ix, setIx] = useState(0);
  const [full, setFull] = useState(false);
  const [tooBig, setTooBig] = useState(false);
  const [fitRef, fit] = useBoardFit();
  const tools = useInkTools();
  const page = pages[Math.min(ix, pages.length - 1)];

  const change = (next: PageState[]) => {
    const out = toPages(next);
    const encoded = hasInk(out) ? encodeCanvas(out, Infinity) : undefined;
    if (encoded && encoded.length > CANVAS_MAX_LENGTH) {
      // Not kept: a fresh copy of the page's strokes makes the surface drop the stroke just drawn.
      setPages((ps) => ps.map((p, k) => (k === ix ? { ...p, doc: { ...p.doc, strokes: p.doc.strokes.slice() } } : p)));
      setTooBig(true);
      return;
    }
    setTooBig(false);
    setPages(next);
    onCanvas(encoded);
  };
  const updatePage = (fn: (p: PageState) => PageState) => change(pages.map((p, k) => (k === ix ? fn(p) : p)));

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFull(false);
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [full]);

  const navButton = 'rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35';
  return (
    <div className={full ? 'fixed inset-0 z-50 flex flex-col gap-3 bg-canvas p-3 sm:p-4' : 'space-y-3'} role={full ? 'dialog' : undefined} aria-modal={full || undefined} aria-label={full ? 'Answer canvas' : undefined}>
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          value={tab}
          onChange={(t) => (setTab(t), t === 'type' && setFull(false))}
          items={[
            { value: 'canvas', label: <><PenLine className="h-4 w-4" /> Solve on the canvas</> },
            { value: 'type', label: <><Keyboard className="h-4 w-4" /> Type</> },
          ]}
        />
        {tab === 'canvas' && (
          <>
            <div className="flex-1" />
            <div className="flex items-center gap-0.5 rounded-xl border border-line p-0.5">
              <button type="button" className={navButton} disabled={ix === 0} onClick={() => setIx(ix - 1)} aria-label="Previous page">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[78px] text-center text-sm tabular-nums text-ink-2">
                Page {ix + 1} of {pages.length}
              </span>
              <button type="button" className={navButton} disabled={ix >= pages.length - 1} onClick={() => setIx(ix + 1)} aria-label="Next page">
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={navButton}
                disabled={pages.length >= CANVAS_MAX_PAGES}
                onClick={() => (change([...pages.slice(0, ix + 1), { background: page.background, doc: inkDoc() }, ...pages.slice(ix + 1)]), setIx(ix + 1))}
                aria-label="Add a page"
                title={pages.length >= CANVAS_MAX_PAGES ? `Up to ${CANVAS_MAX_PAGES} pages` : 'Add a page'}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-0.5 rounded-xl border border-line p-0.5" role="radiogroup" aria-label="Paper">
              {BACKGROUNDS.map((bg) => {
                const Icon = BG_ICON[bg];
                return (
                  <button key={bg} type="button" role="radio" aria-checked={page.background === bg} aria-label={`${BG_NAME[bg]} paper`} title={`${BG_NAME[bg]} paper`} onClick={() => updatePage((p) => ({ ...p, background: bg }))} className={cn(navButton, page.background === bg && 'bg-brand-100 text-brand-800 hover:bg-brand-100')}>
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
            <button type="button" className={cn(navButton, 'rounded-xl border border-line p-2')} onClick={() => setFull(!full)} aria-label={full ? 'Exit full screen' : 'Full screen'} title={full ? 'Exit full screen (Esc)' : 'Full screen'}>
              {full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </>
        )}
      </div>
      {/* The canvas stays mounted while the student types, so the board keeps its size and history. */}
      <div className={cn(tab !== 'canvas' && 'hidden', full ? 'flex min-h-0 flex-1 flex-col gap-3' : 'space-y-3')}>
        <InkToolbar
          className="mx-auto w-fit"
          tools={tools}
          onUndo={() => updatePage((p) => ({ ...p, doc: inkUndo(p.doc) }))}
          onRedo={() => updatePage((p) => ({ ...p, doc: inkRedo(p.doc) }))}
          onClear={() => updatePage((p) => ({ ...p, doc: inkCommit(p.doc, []) }))}
          canUndo={page.doc.past.length > 0}
          canRedo={page.doc.future.length > 0}
          canClear={page.doc.strokes.length > 0}
        />
        <div ref={fitRef} className={cn('flex items-center justify-center', full ? 'min-h-0 flex-1' : 'aspect-video w-full')}>
          {fit.w > 0 && (
            <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-line-strong" style={{ width: fit.w, height: fit.h }}>
              <InkSurface
                strokes={page.doc.strokes}
                onCommit={(strokes) => updatePage((p) => ({ ...p, doc: inkCommit(p.doc, strokes) }))}
                mode={tools.mode}
                color={tools.color}
                size={tools.size}
                unitsWide={BOARD_W}
                background={page.background}
                penOnly={tools.penOnly}
                onPen={tools.onPen}
                pointGap={CANVAS_POINT_GAP}
                active
                label={`Answer canvas, page ${ix + 1}`}
              />
            </div>
          )}
        </div>
        {full && <p className="hidden text-center text-sm text-ink-3 portrait:block">Turn your device sideways for a bigger canvas.</p>}
        {tooBig && <p className="rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn-ink">This answer’s canvas is full, so that stroke was not kept. Erase some working, or type the rest of your answer.</p>}
        {text.trim() !== '' && !full && <p className="text-xs text-ink-3">Your typed answer is kept too. Your teacher sees both.</p>}
      </div>
      {tab === 'type' && (
        <>
          <textarea className="input min-h-[140px] leading-relaxed" value={text} onChange={(e) => onText(e.target.value)} placeholder={placeholder} aria-label="Typed answer" />
          {canvas && <p className="text-xs text-ink-3">Your working on the canvas is kept too. Your teacher sees both.</p>}
        </>
      )}
    </div>
  );
}

/** A submitted written response: the student's working on the canvas, page by page, and what they typed. */
export function CanvasAnswerView({ text, canvas }: { text: string; canvas?: string }) {
  const pages = useMemo(() => decodeCanvas(canvas), [canvas]);
  const last = pages.reduce((n, p, i) => (p.strokes.length ? i : n), -1);
  return (
    <div className="space-y-3">
      {pages.slice(0, last + 1).map((p, i) => (
        <figure key={i}>
          <BoardPageCanvas page={p} label={`The student’s working, page ${i + 1}`} />
          {last > 0 && <figcaption className="mt-1 text-center text-xs text-ink-3">Page {i + 1}</figcaption>}
        </figure>
      ))}
      {text.trim() && <div className="whitespace-pre-wrap rounded-xl border border-line bg-surface-2 px-3.5 py-3 text-[15.5px] leading-relaxed">{text}</div>}
      {last < 0 && !text.trim() && <p className="text-sm text-ink-3">No answer.</p>}
    </div>
  );
}
