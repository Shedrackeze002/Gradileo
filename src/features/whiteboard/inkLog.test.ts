import { beforeEach, describe, expect, it } from 'vitest';
import { clearInkLog, inkLog, inkLogText } from './inkLog.ts';

describe('the drawing log', () => {
  beforeEach(() => clearInkLog());

  it('keeps what happened with its small values, and nothing empty', () => {
    inkLog('stroke end', { by: 'pen', keep: true, points: 12.345, cancelled: undefined, why: '' });
    const text = inkLogText();
    expect(text).toMatch(/\d\d:\d\d:\d\d\.\d{3} stroke end by=pen keep=true points=12.35\n/);
    expect(text).not.toMatch(/cancelled|why/);
  });

  it('keeps only the latest lines', () => {
    for (let i = 0; i < 450; i++) inkLog('toolbar', { n: i });
    const lines = inkLogText().split('\n').filter((l) => l.includes(' toolbar '));
    expect(lines).toHaveLength(400);
    expect(lines[0]).toMatch(/n=50$/);
    expect(lines[399]).toMatch(/n=449$/);
  });
});
