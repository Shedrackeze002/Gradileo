import { useEffect } from 'react';

/**
 * On an iPad, a resting palm or the pencil anywhere on the page can start Safari's text selection,
 * which highlights the page instead of drawing. A screen that draws locks selection on the whole
 * page while it is open (inputs stay editable). The lock is counted, so it lifts only when the
 * last screen that holds it closes.
 */
let locks = 0;

export function lockPage(): () => void {
  if (locks++ === 0) document.documentElement.classList.add('ink-lock');
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.documentElement.classList.remove('ink-lock');
  };
}

/** Holds the page lock while `on` is true. */
export function usePageLock(on: boolean) {
  useEffect(() => (on ? lockPage() : undefined), [on]);
}
