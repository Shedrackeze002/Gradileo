import { describe, expect, it } from 'vitest';
import { allRows, PAGE_SIZE } from './pages.ts';

/** A table of `n` rows behind an API that returns at most PAGE_SIZE rows a request. */
function table(n: number) {
  const calls: Array<[number, number]> = [];
  const page = (from: number, to: number) => {
    calls.push([from, to]);
    const rows = Array.from({ length: Math.max(0, Math.min(n, to + 1) - from) }, (_, i) => from + i).slice(0, PAGE_SIZE);
    return Promise.resolve({ data: rows, error: null });
  };
  return { page, calls };
}

describe('allRows', () => {
  it('reads every row of a long list a page at a time, in order', async () => {
    const t = table(2500);
    const rows = await allRows(t.page, 20000);
    expect(rows).toHaveLength(2500);
    expect(rows[1999]).toBe(1999);
    expect(t.calls).toEqual([[0, 999], [1000, 1999], [2000, 2999]]);
  });

  it('stops at the cap, and asks once for a short list', async () => {
    expect(await allRows(table(5000).page, 1500)).toHaveLength(1500);
    const t = table(12);
    expect(await allRows(t.page, 5000)).toHaveLength(12);
    expect(t.calls).toHaveLength(1);
  });

  it('reports an error from any page', async () => {
    await expect(allRows(() => Promise.resolve({ data: null, error: { message: 'permission denied for table skill_mastery' } }), 100)).rejects.toThrow('permission denied');
  });
});
