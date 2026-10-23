/**
 * A canvas answer's pages as pictures, for the AI to read when it suggests a mark: dark ink on white
 * paper whatever the screen's theme, and only up to the last page with working on it.
 */
import { BOARD_H, BOARD_W, decodeCanvas, drawBackground, drawStrokes, inkPalette } from '@/lib/ink.ts';

/** Under this many characters a page stays a PNG (sharp lines); a busier page becomes a JPEG. */
const PNG_LIMIT = 700_000;

export function canvasPageImages(canvas: string | undefined, width = 1200): string[] {
  const pages = decodeCanvas(canvas);
  const last = pages.reduce((n, p, i) => (p.strokes.length ? i : n), -1);
  return pages.slice(0, last + 1).map((page) => {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = Math.round((width * BOARD_H) / BOARD_W);
    const ctx = c.getContext('2d');
    if (!ctx) return '';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);
    const s = width / BOARD_W;
    ctx.setTransform(s, 0, 0, s, 0, 0);
    drawBackground(ctx, page.background, BOARD_W, BOARD_H, '#d4d7e0');
    drawStrokes(ctx, page.strokes, inkPalette(false));
    const png = c.toDataURL('image/png');
    return png.length <= PNG_LIMIT ? png : c.toDataURL('image/jpeg', 0.85);
  }).filter(Boolean);
}
