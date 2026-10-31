import { describe, expect, it } from 'vitest';
import { CANVAS_MAX_LENGTH, CANVAS_MAX_PAGES, cleanCanvas, decodeCanvas, encodeCanvas, type BoardPage, type Stroke } from './ink.ts';

const stroke = (points: number[], extra: Partial<Stroke> = {}): Stroke => ({ tool: 'pen', color: 'ink', size: 6, points, ...extra });

describe('canvas answers', () => {
  it('keeps strokes in a few characters a point and reads them back', () => {
    const pages: BoardPage[] = [
      { background: 'grid', strokes: [stroke([100.4, 200.6, 0.5, 103, 198, 0.62, 110, 190, 1]), stroke([400, 300, 0.3], { tool: 'highlighter', color: 'orange', size: 9 })] },
      { background: 'lined', strokes: [stroke([10, 10, 0.5, 20, 30, 0.5], { color: 'blue', size: 4.5 })] },
    ];
    const text = encodeCanvas(pages);
    expect(text).toBe('g;pk6:100,201,5 3,-3,6 7,-8,10;ho9:400,300,3|l;pb4.5:10,10,5 10,20,5');
    expect(decodeCanvas(text)).toEqual([
      { background: 'grid', strokes: [stroke([100, 201, 0.5, 103, 198, 0.6, 110, 190, 1]), stroke([400, 300, 0.3], { tool: 'highlighter', color: 'orange', size: 9 })] },
      { background: 'lined', strokes: [stroke([10, 10, 0.5, 20, 30, 0.5], { color: 'blue', size: 4.5 })] },
    ]);
  });

  it('keeps a yellow highlighter', () => {
    const pages: BoardPage[] = [{ background: 'plain', strokes: [stroke([50, 60, 0.5, 90, 60, 0.5], { tool: 'highlighter', color: 'yellow', size: 6 })] }];
    expect(encodeCanvas(pages)).toBe('p;hy6:50,60,5 40,0,5');
    expect(decodeCanvas(encodeCanvas(pages))).toEqual(pages);
  });

  it('drops points that round to the one before', () => {
    expect(encodeCanvas([{ background: 'plain', strokes: [stroke([5, 5, 0.5, 5.2, 4.9, 0.5, 9, 5, 0.5])] }])).toBe('p;pk6:5,5,5 4,0,5');
  });

  it('leaves out strokes past the length limit, so the text always fits', () => {
    const long = stroke(Array.from({ length: 3000 }, (_, i) => [i % 1500, 800 - (i % 700), 0.5]).flat());
    const pages: BoardPage[] = [{ background: 'grid', strokes: Array.from({ length: 10 }, () => long) }];
    const text = encodeCanvas(pages);
    expect(text.length).toBeLessThanOrEqual(CANVAS_MAX_LENGTH);
    expect(decodeCanvas(text)[0].strokes.length).toBeGreaterThan(0);
    expect(decodeCanvas(text)[0].strokes.length).toBeLessThan(10);
    expect(encodeCanvas(pages, Infinity).length).toBeGreaterThan(CANVAS_MAX_LENGTH);
  });

  it('checks what a client sends: bad pieces are dropped and blank canvases are not kept', () => {
    expect(cleanCanvas(undefined)).toBeUndefined();
    expect(cleanCanvas(42)).toBeUndefined();
    expect(cleanCanvas('g')).toBeUndefined();
    expect(cleanCanvas('g;pk6:1,2,3;zz6:1,1,1;pk6:1,2;pk99:1,1,1;pk6:99999,1,1;pk6:1,1,11;bk6:1,1,1')).toBe('g;pk6:1,2,3');
    expect(cleanCanvas('x;pk6:1,2,3')).toBe('g;pk6:1,2,3');
    const many = Array.from({ length: 9 }, () => 'p;pk6:1,1,5').join('|');
    expect(decodeCanvas(cleanCanvas(many))).toHaveLength(CANVAS_MAX_PAGES);
  });
});
