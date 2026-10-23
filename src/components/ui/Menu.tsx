import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn.ts';

/** Space between the trigger and the menu, and between the menu and the edge of the window. */
const GAP = 8;

/**
 * A button's drop-down menu. It is drawn over the whole page (in a portal, fixed in place beside
 * its trigger) so a card that clips its content, or the cards after it, never hide it; it opens
 * upwards when there is no room below.
 */
export function Menu({ trigger, children, align = 'right', className }: { trigger: (open: boolean) => ReactNode; children: (close: () => void) => ReactNode; align?: 'left' | 'right'; className?: string }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t) && !pop.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Escape closes the menu only, not the page behind it (present mode leaves on Escape).
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Placed before the browser paints (measured while hidden), and again as the page scrolls or resizes.
  useLayoutEffect(() => {
    if (!open) return setPos(null);
    const place = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const h = pop.current?.offsetHeight ?? 0;
      const below = r.bottom + GAP;
      const top = below + h > window.innerHeight - GAP && r.top - GAP - h >= GAP ? r.top - GAP - h : below;
      setPos(align === 'right' ? { top, right: Math.max(GAP, window.innerWidth - r.right) } : { top, left: Math.max(GAP, r.left) });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, align]);

  // Keyboard users land on the first item: the menu is no longer next to its trigger in the page.
  useEffect(() => {
    if (open && pos) pop.current?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus({ preventScroll: true });
  }, [open, pos !== null]);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open &&
        createPortal(
          <div
            ref={pop}
            style={{ position: 'fixed', top: pos?.top ?? 0, left: pos?.left, right: pos?.right, visibility: pos ? undefined : 'hidden' }}
            className={cn('z-[65] max-h-[calc(100vh-16px)] min-w-[220px] animate-slide-up overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-pop', className)}
          >
            {children(() => setOpen(false))}
          </div>,
          document.body,
        )}
    </div>
  );
}

export function MenuItem({ onClick, icon, children, danger }: { onClick: () => void; icon?: ReactNode; children: ReactNode; danger?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition hover:bg-surface-2', danger ? 'text-bad-ink' : 'text-ink')}>
      {icon && <span className="text-ink-3">{icon}</span>}
      {children}
    </button>
  );
}
