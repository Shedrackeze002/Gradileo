import { describe, expect, it } from 'vitest';
import { HAND_SPAN, PALM_MS, PALM_RADII, PalmGuard, REST_MS, STUCK_MS, TAP_MS } from './screenLock.ts';

describe('PalmGuard', () => {
  it('takes a touch while the pencil writes for a palm, and just after it lifts lets only a quick tap press', () => {
    const g = new PalmGuard();
    expect(g.start(1, 0)).toBe(false); // no pencil yet: a finger
    expect(g.end(1)).toBe(false);
    g.pen('pointerdown', 100, 100, 1000);
    expect(g.start(2, 1010)).toBe(true);
    g.pen('pointermove', 120, 100, 1200);
    g.pen('pointerup', 130, 100, 1300);
    // Just after the lift a touch is not blocked outright: a quick tap presses, a longer touch does not.
    expect(g.start(3, 1300 + PALM_MS - 1)).toBe(false);
    expect(g.start(5, 1400)).toBe(false);
    expect(g.start(4, 1300 + PALM_MS + 1)).toBe(false); // the hand has had time to move away
    expect(g.end(2, 1500)).toBe(true);
    expect(g.end(3, 1300 + PALM_MS - 1 + TAP_MS - 50)).toBe(false);
    expect(g.end(5, 1400 + TAP_MS + 50)).toBe(true);
    expect(g.end(4, 1300 + PALM_MS + 1 + TAP_MS + 50)).toBe(false);
  });

  it('does not take a pencil hovering above the glass for writing', () => {
    const g = new PalmGuard();
    g.pen('pointerdown', 100, 100, 0);
    g.pen('pointerup', 100, 100, 100);
    // The pencil hovers near the toolbar while a finger taps a tool, long after the last stroke.
    for (let t = 200; t <= 5000; t += 50) g.pen('pointermove', 400, 700, t, false);
    expect(g.start(1, 5000, 20 * 20, 420, 720)).toBe(false);
    expect(g.end(1, 5100)).toBe(false);
  });

  it('lets a hovering pencil end a stroke whose pointerup was lost', () => {
    const g = new PalmGuard();
    g.pen('pointerdown', 100, 100, 0);
    g.pen('pointermove', 110, 100, 50);
    // The pointerup never comes; the pencil is next seen hovering.
    g.pen('pointermove', 115, 100, 80, false);
    expect(g.start(1, 80 + PALM_MS + 1)).toBe(false);
    expect(g.end(1, 80 + PALM_MS + 100)).toBe(false);
  });

  it('does not block every touch forever when the pencil’s pointerup is lost', () => {
    const g = new PalmGuard();
    g.pen('pointerdown', 100, 100, 0);
    expect(g.start(1, 500)).toBe(true);
    g.end(1, 600);
    expect(g.start(2, STUCK_MS + PALM_MS + 10)).toBe(false);
    expect(g.end(2, STUCK_MS + PALM_MS + 100)).toBe(false);
  });

  it('forgets a touch whose end never came, so it cannot block taps beside it', () => {
    const g = new PalmGuard();
    g.pen('pointerdown', 0, 0, 0);
    g.pen('pointerup', 0, 0, 10);
    const later = 10 + PALM_MS + 1;
    expect(g.start(1, later, 0, 400, 700)).toBe(false); // its touchend is lost
    g.keepOnly([2]);
    expect(g.start(2, later + 5000, 0, 420, 700)).toBe(false);
    expect(g.end(2, later + 5100)).toBe(false);
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
    expect(g.end(9, 10_100)).toBe(false);
  });

  it('once a pencil is in use, takes a broad contact, touches side by side and a long rest for a hand', () => {
    const g = new PalmGuard();
    // Before any pencil, nothing but timing is judged: a touch screen without one works as ever.
    expect(g.start(1, 0, PALM_RADII * 2, 100, 100)).toBe(false);
    expect(g.start(2, 10, 0, 110, 100)).toBe(false);
    expect(g.end(1, 5000)).toBe(false);
    expect(g.end(2, 5000)).toBe(false);

    g.pen('pointerdown', 0, 0, 10_000);
    g.pen('pointerup', 0, 0, 10_100);
    const later = 10_100 + PALM_MS + 1;
    // A fingertip tap, long after the pencil lifted, still presses.
    expect(g.start(3, later, 20 * 20, 400, 700)).toBe(false);
    expect(g.end(3, later + 150)).toBe(false);
    // The broad side of a hand does not.
    expect(g.start(4, later, PALM_RADII + 1, 400, 700)).toBe(true);
    expect(g.end(4, later + 150)).toBe(true);
    // Two contacts side by side are one hand, both of them.
    expect(g.start(5, later, 0, 400, 700)).toBe(false);
    expect(g.start(6, later + 30, 0, 400 + HAND_SPAN - 10, 700)).toBe(true);
    expect(g.end(5, later + 100)).toBe(true);
    expect(g.end(6, later + 100)).toBe(true);
    // A finger of the other hand, far from the resting one, still presses.
    expect(g.start(7, later, 0, 900, 700)).toBe(false);
    expect(g.start(8, later + 30, 0, 200, 80)).toBe(false);
    expect(g.end(8, later + 150)).toBe(false);
    // A touch that stays down is resting, not tapping.
    expect(g.end(7, later + REST_MS + 1)).toBe(true);
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
