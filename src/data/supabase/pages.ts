/**
 * The database's API returns at most the project's "Max Rows" per request (1,000 on Supabase by
 * default), silently leaving the rest out. Lists that can be longer, such as a class's mastery,
 * practice events and submissions, are read a page at a time with a stable order.
 */
export const PAGE_SIZE = 1000;

type Page<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

/** Every row up to `max`, asking for one page (rows `from` to `to`, inclusive) at a time. */
export async function allRows<T>(page: (from: number, to: number) => Page<T>, max: number): Promise<T[]> {
  const rows: T[] = [];
  while (rows.length < max) {
    const want = Math.min(PAGE_SIZE, max - rows.length);
    const { data, error } = await page(rows.length, rows.length + want - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if (!data || data.length < want) break;
  }
  return rows;
}
