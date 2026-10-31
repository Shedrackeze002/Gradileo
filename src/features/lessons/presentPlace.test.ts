import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { forgetPlace, keepBoard, keepPlace, placeKey, readBoard, readPlace } from './presentPlace.ts';

/** A tab's sessionStorage, for tests that run outside a browser. */
function fakeStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    get size() {
      return m.size;
    },
  };
}

describe('a presentation kept for the tab', () => {
  let store: ReturnType<typeof fakeStorage>;
  beforeEach(() => {
    store = fakeStorage();
    (globalThis as { sessionStorage?: unknown }).sessionStorage = store;
  });
  afterEach(() => {
    delete (globalThis as { sessionStorage?: unknown }).sessionStorage;
  });
  const key = placeKey('c1', 'm10c-2-1');
  const stroke = { tool: 'pen' as const, color: 'red' as const, size: 6, points: [10, 20, 0.5, 30, 40, 0.6] };

  it('comes back after a reload: slide, step, tools and ink', () => {
    keepPlace(key, { slide: 's4', step: 2, drawing: true, board: false, notes: { s4: [stroke], s5: [] } });
    const back = readPlace(key);
    expect(back).toMatchObject({ slide: 's4', step: 2, drawing: true, board: false });
    expect(back.notes).toEqual({ s4: [stroke] });
  });

  it('keeps the whiteboard, and forgets both when the teacher leaves', () => {
    keepBoard(`${key}:board`, { pages: [{ background: 'grid', strokes: [{ ...stroke, tool: 'highlighter', color: 'yellow' }] }], ix: 3, title: 'Board', dirty: true });
    const board = readBoard(`${key}:board`)!;
    expect(board.pages[0].strokes[0].color).toBe('yellow');
    expect(board.ix).toBe(0);
    expect(board.dirty).toBe(true);
    keepPlace(key, { slide: 'title', step: 0, drawing: false, board: true, notes: {} });
    forgetPlace(key);
    expect(store.size).toBe(0);
    expect(readPlace(key)).toEqual({});
    expect(readBoard(`${key}:board`)).toBeNull();
  });

  it('ignores what it cannot read, and leaves out ink too large to keep', () => {
    store.setItem(key, '{not json');
    expect(readPlace(key)).toEqual({});
    store.setItem(key, JSON.stringify({ slide: 5, step: -1, notes: { s1: [{ points: 'x' }] } }));
    expect(readPlace(key)).toEqual({ slide: undefined, step: undefined, drawing: false, board: false, notes: {} });
    const long = { ...stroke, points: Array.from({ length: 1_200_000 }, (_, i) => i % 500) };
    keepPlace(key, { slide: 's2', step: 0, drawing: true, board: false, notes: { s2: [long] } });
    expect(readPlace(key)).toMatchObject({ slide: 's2', notes: {} });
  });
});
