import { describe, expect, it } from 'vitest';
import { PALM_MS, PalmGuard } from './screenLock.ts';

describe('PalmGuard', () => {
  it('takes a touch while the pencil writes, or just after it lifts, for a palm', () => {
    const g = new PalmGuard();
    expect(g.start(1, 0)).toBe(false); // no pencil yet: a finger
    expect(g.end(1)).toBe(false);
    g.pen('pointerdown', 100, 100, 1000);
    expect(g.start(2, 1010)).toBe(true);
    g.pen('pointermove', 120, 100, 1200);
    g.pen('pointerup', 130, 100, 1300);
    expect(g.start(3, 1300 + PALM_MS - 1)).toBe(true);
    expect(g.start(4, 1300 + PALM_MS + 1)).toBe(false); // the hand has had time to move away
    expect(g.end(2)).toBe(true);
    expect(g.end(3)).toBe(true);
    expect(g.end(4)).toBe(false);
  });

  it('counts a hand already resting on the screen when the pencil lands', () => {
    const g = new PalmGuard();
    expect(g.start(7, 0)).toBe(false);
    g.pen('pointerdown', 50, 50, 5000);
    expect(g.end(7)).toBe(true);
  });

  it('starts a reused touch number afresh', () => {
    const g = new PalmGuard();
    g.pen('pointerdown', 0, 0, 0);
    expect(g.start(9, 10)).toBe(true); // its end never arrives
    g.pen('pointerup', 0, 0, 20);
    expect(g.start(9, 10_000)).toBe(false);
  });

  it('knows the pencil’s own touch', () => {
    const g = new PalmGuard();
    expect(g.isPen({ touchType: 'stylus', clientX: 0, clientY: 0 }, 0)).toBe(true);
    g.pen('pointerdown', 200, 300, 1000);
    expect(g.isPen({ touchType: 'direct', clientX: 200, clientY: 300 }, 1005)).toBe(true);
    expect(g.isPen({ clientX: 201, clientY: 301 }, 1005)).toBe(true);
    expect(g.isPen({ clientX: 260, clientY: 380 }, 1005)).toBe(false);
    expect(g.isPen({ clientX: 200, clientY: 300 }, 1500)).toBe(false);
  });
});
