import { describe, expect, it } from 'vitest';
import { cleanIntegrity, exitCount, exitsLeft, isLocked, mergeIntegrity, mustSubmit, overtimeLabel, overtimeSeconds, storedIntegrity } from './integrity.ts';

const ev = (kind: 'tab' | 'fullscreen' | 'camera', n = 1) => Array.from({ length: n }, (_, i) => ({ at: `2026-10-13T10:0${i}:00Z`, kind }));

describe('exam mode records', () => {
  it('cleans whatever is stored or sent', () => {
    expect(cleanIntegrity(null)).toEqual({ blurCount: 0 });
    expect(cleanIntegrity({ blurCount: 2.7, events: [{ at: 'x', kind: 'tab' }, { at: 1, kind: 'tab' }, { at: 'y', kind: 'hack' }], extraExits: -3, autoSubmitted: 'yes' })).toEqual({ blurCount: 2, events: [{ at: 'x', kind: 'tab' }] });
  });

  it('never loses exits and keeps the teacher’s allowance', () => {
    const stored = { blurCount: 3, events: ev('tab', 3), extraExits: 3 };
    const merged = mergeIntegrity(stored, { blurCount: 1, events: ev('tab', 1), extraExits: 99 });
    expect(merged.blurCount).toBe(3);
    expect(exitCount(merged)).toBe(3);
    expect(merged.extraExits).toBe(3);
    expect(mergeIntegrity(stored, { blurCount: 4, events: [...ev('tab', 3), ...ev('fullscreen')] }).events).toHaveLength(4);
  });

  it('locks or submits at the limit, and an unlock allows more exits', () => {
    const lock = { lockdown: true, maxExits: 2, onMaxExits: 'lock' as const };
    expect(exitsLeft(lock, { blurCount: 0, events: ev('tab') })).toBe(1);
    expect(isLocked(lock, { blurCount: 0, events: [...ev('tab'), ...ev('fullscreen')] })).toBe(true);
    expect(isLocked(lock, { blurCount: 0, events: [...ev('tab'), ...ev('fullscreen')], extraExits: 2 })).toBe(false);
    expect(isLocked(lock, { blurCount: 0, events: ev('camera', 5) })).toBe(false);
    expect(mustSubmit({ ...lock, onMaxExits: 'submit' }, { blurCount: 0, events: ev('tab', 2) })).toBe(true);
    expect(exitsLeft({ lockdown: true, maxExits: null }, { blurCount: 0, events: ev('tab', 9) })).toBeNull();
    expect(isLocked({ lockdown: false, maxExits: 1 }, { blurCount: 0, events: ev('tab', 9) })).toBe(false);
  });

  it('measures work that came in after the time limit, with a minute of slack', () => {
    const start = '2026-11-11T10:00:00.000Z';
    expect(overtimeSeconds(start, 30, '2026-11-11T10:29:00.000Z')).toBe(0);
    expect(overtimeSeconds(start, 30, '2026-11-11T10:30:45.000Z')).toBe(0);
    expect(overtimeSeconds(start, 30, '2026-11-11T10:42:00.000Z')).toBe(720);
    expect(overtimeSeconds(start, null, '2026-11-12T10:00:00.000Z')).toBe(0);
    expect(overtimeSeconds(null, 30, '2026-11-12T10:00:00.000Z')).toBe(0);
    expect(overtimeLabel(61)).toBe('1 minute');
    expect(overtimeLabel(720)).toBe('12 minutes');
    expect(overtimeLabel(5 * 3600)).toBe('5 hours');
    expect(overtimeLabel(3 * 86400)).toBe('3 days');
  });

  it('keeps what only the server writes when a stored record is read, and never from a student’s save', () => {
    const raw = { blurCount: 1, awaitingStart: true, overtimeSeconds: 720.9 };
    expect(storedIntegrity(raw)).toEqual({ blurCount: 1, awaitingStart: true, overtimeSeconds: 720 });
    expect(cleanIntegrity(raw)).toEqual({ blurCount: 1 });
    expect(mergeIntegrity({ blurCount: 0 }, raw)).toEqual({ blurCount: 1 });
    expect(storedIntegrity({ blurCount: 0, overtimeSeconds: -5 })).toEqual({ blurCount: 0 });
  });
});
