/** The largest 16:9 board that fits in an element, for the whiteboard and canvas answers. */
import { useLayoutEffect, useRef, useState } from 'react';
import { BOARD_H, BOARD_W } from '@/lib/ink.ts';

/** Width and height of the largest 16:9 board that fits in the element. */
export function useBoardFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const w = Math.min(el.clientWidth, (el.clientHeight * BOARD_W) / BOARD_H);
      setSize({ w: Math.floor(w), h: Math.floor((w * BOARD_H) / BOARD_W) });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}
