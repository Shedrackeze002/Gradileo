/**
 * The full-screen whiteboard opened from present mode. It keeps its pages while it is closed, so
 * the teacher can go back to the slide and return to the same board; boards can be saved to the
 * lesson and opened again in a later class.
 */
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FilePlus2, FolderOpen, Grid3x3, Grip, Plus, Rows3, Save, Square, X } from 'lucide-react';
import { BACKGROUNDS, BOARD_W, hasInk, inkCommit, inkDoc, inkRedo, inkUndo, type BoardBackground, type BoardPage, type InkDoc } from '@/lib/ink.ts';
import type { Board } from '@/data/types.ts';
import { Button, Menu, MenuItem, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { InkSurface } from './InkSurface.tsx';
import { InkToolbar, type InkTools } from './InkToolbar.tsx';
import { useBoardFit } from './useBoardFit.ts';

interface PageState {
  background: BoardBackground;
  doc: InkDoc;
}

const BG_ICON = { plain: Square, grid: Grid3x3, lined: Rows3, dots: Grip } as const;
const BG_NAME = { plain: 'Plain', grid: 'Squared', lined: 'Lined', dots: 'Dotted' } as const;

const blankPage = (background: BoardBackground = 'grid'): PageState => ({ background, doc: inkDoc() });
const toPages = (pages: PageState[]): BoardPage[] => pages.map((p) => ({ background: p.background, strokes: p.doc.strokes }));

export interface WhiteboardProps {
  open: boolean;
  onClose: () => void;
  tools: InkTools;
  /** Used to name a new board. */
  lessonTitle: string;
  /** Saved boards for this lesson; when given with onSave, boards can be saved and reopened. */
  boards?: Board[];
  onSave?: (b: { id?: string; title: string; pages: BoardPage[] }) => Promise<Board>;
}

export function Whiteboard({ open, onClose, tools, lessonTitle, boards, onSave }: WhiteboardProps) {
  const [pages, setPages] = useState<PageState[]>(() => [blankPage()]);
  const [ix, setIx] = useState(0);
  const [boardId, setBoardId] = useState<string | undefined>();
  const [title, setTitle] = useState(() => `${lessonTitle} board`);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fitRef, fit] = useBoardFit();
  const toast = useToast();
  const page = pages[Math.min(ix, pages.length - 1)];

  const updatePage = useCallback(
    (fn: (p: PageState) => PageState) => {
      setPages((ps) => ps.map((p, k) => (k === ix ? fn(p) : p)));
      setDirty(true);
    },
    [ix],
  );
  const undo = useCallback(() => updatePage((p) => ({ ...p, doc: inkUndo(p.doc) })), [updatePage]);
  const redo = useCallback(() => updatePage((p) => ({ ...p, doc: inkRedo(p.doc) })), [updatePage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (mod && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (!mod && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === 'p') tools.setMode('pen');
        else if (k === 'h') tools.setMode('highlighter');
        else if (k === 'e') tools.setMode('eraser');
        else if (e.key === 'Escape') onClose();
        else return;
      } else return;
      e.stopPropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, undo, redo, tools, onClose]);

  const confirmDiscard = () => !dirty || !pages.some((p) => p.doc.strokes.length) || window.confirm('Replace this board? Ink that has not been saved will be lost.');

  const load = (b: Board) => {
    if (!confirmDiscard()) return;
    setPages(b.pages.length ? b.pages.map((p) => ({ background: p.background, doc: inkDoc(p.strokes) })) : [blankPage()]);
    setIx(0);
    setBoardId(b.id);
    setTitle(b.title);
    setDirty(false);
  };

  const fresh = () => {
    if (!confirmDiscard()) return;
    setPages([blankPage(page.background)]);
    setIx(0);
    setBoardId(undefined);
    setTitle(`${lessonTitle} board`);
    setDirty(false);
  };

  const save = async () => {
    if (!onSave) return;
    setSaving(true);
    try {
      const saved = await onSave({ id: boardId, title: title.trim() || `${lessonTitle} board`, pages: toPages(pages) });
      setBoardId(saved.id);
      setDirty(false);
      toast({ kind: 'success', title: 'Board saved to the lesson', body: 'Open it again from Boards, or share it with students from the lesson page.' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save the board', body: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const addPage = () => {
    setPages((ps) => [...ps.slice(0, ix + 1), blankPage(page.background), ...ps.slice(ix + 1)]);
    setIx(ix + 1);
    setDirty(true);
  };

  return (
    <div className={cn('fixed inset-0 z-50 flex flex-col bg-canvas', !open && 'hidden')} role="dialog" aria-modal="true" aria-label="Whiteboard">
      <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
        {onSave ? (
          <input value={title} onChange={(e) => (setTitle(e.target.value), setDirty(true))} aria-label="Board name" maxLength={120} className="h-9 min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 text-[15px] font-semibold hover:border-line focus:border-brand-300 focus:outline-none sm:max-w-xs" />
        ) : (
          <span className="flex-1 px-2 text-[15px] font-semibold">Whiteboard</span>
        )}
        <div className="flex items-center gap-0.5 rounded-xl border border-line p-0.5">
          <button type="button" className="rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35" disabled={ix === 0} onClick={() => setIx(ix - 1)} aria-label="Previous page">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[78px] text-center text-sm tabular-nums text-ink-2">
            Page {ix + 1} of {pages.length}
          </span>
          <button type="button" className="rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35" disabled={ix >= pages.length - 1} onClick={() => setIx(ix + 1)} aria-label="Next page">
            <ChevronRight className="h-5 w-5" />
          </button>
          <button type="button" className="rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35" disabled={pages.length >= 50} onClick={addPage} aria-label="Add a page" title="Add a page">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-0.5 rounded-xl border border-line p-0.5" role="radiogroup" aria-label="Paper">
          {BACKGROUNDS.map((bg) => {
            const Icon = BG_ICON[bg];
            return (
              <button key={bg} type="button" role="radio" aria-checked={page.background === bg} aria-label={`${BG_NAME[bg]} paper`} title={`${BG_NAME[bg]} paper`} onClick={() => updatePage((p) => ({ ...p, background: bg }))} className={cn('rounded-lg p-1.5 text-ink-2 hover:bg-surface-2', page.background === bg && 'bg-brand-100 text-brand-800 hover:bg-brand-100')}>
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>
        {onSave && (
          <>
            <Menu
              trigger={() => (
                <Button variant="ghost" size="sm" icon={<FolderOpen className="h-4 w-4" />}>
                  Boards
                </Button>
              )}
            >
              {(close) => (
                <div className="max-h-[60vh] overflow-y-auto">
                  <MenuItem icon={<FilePlus2 className="h-4 w-4" />} onClick={() => (close(), fresh())}>
                    New board
                  </MenuItem>
                  {(boards ?? []).length > 0 && <div className="mx-2.5 my-1 border-t border-line" />}
                  {(boards ?? []).map((b) => (
                    <MenuItem key={b.id} icon={<FolderOpen className="h-4 w-4" />} onClick={() => (close(), load(b))}>
                      <span className="min-w-0 flex-1 truncate">{b.title}</span>
                      {b.id === boardId && <span className="text-xs text-ink-3">open</span>}
                    </MenuItem>
                  ))}
                  {(boards ?? []).length === 0 && <p className="px-2.5 py-2 text-xs text-ink-3">Boards you save appear here.</p>}
                </div>
              )}
            </Menu>
            <Button size="sm" variant={dirty && hasInk(toPages(pages)) ? 'primary' : 'secondary'} icon={<Save className="h-4 w-4" />} loading={saving} disabled={!hasInk(toPages(pages))} onClick={save}>
              {boardId && !dirty ? 'Saved' : 'Save to lesson'}
            </Button>
          </>
        )}
        <Button size="sm" variant="secondary" icon={<X className="h-4 w-4" />} onClick={onClose}>
          Back to slide
        </Button>
      </header>
      <main className="relative min-h-0 flex-1">
        <div ref={fitRef} className="absolute inset-x-3 bottom-20 top-3 flex items-center justify-center sm:inset-x-5 sm:bottom-24 sm:top-5">
          {fit.w > 0 && (
            <div className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-line" style={{ width: fit.w, height: fit.h }}>
              {open && (
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
                  active
                  label={`Whiteboard, page ${ix + 1}`}
                />
              )}
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3 sm:bottom-5">
          <InkToolbar
            className="pointer-events-auto"
            tools={tools}
            onUndo={undo}
            onRedo={redo}
            onClear={() => updatePage((p) => ({ ...p, doc: inkCommit(p.doc, []) }))}
            canUndo={page.doc.past.length > 0}
            canRedo={page.doc.future.length > 0}
            canClear={page.doc.strokes.length > 0}
          />
        </div>
      </main>
    </div>
  );
}
