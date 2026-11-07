import { expect, test, type Page } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/**
 * iPadOS can drop an Apple Pencil's events (Scribble, palm rejection): a stroke's pointerup or
 * pointerdown may never arrive, or the stroke may be cancelled halfway while the pencil keeps
 * writing. None of these may lose the writing. The events are sent by hand, as the iPad would.
 */
type Kind = 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel';

async function pen(page: Page, type: Kind, id: number, x: number, y: number, touching = type !== 'pointerup' && type !== 'pointercancel') {
  const box = (await page.getByRole('img', { name: /Whiteboard, page 1/ }).boundingBox())!;
  await page.evaluate(
    ([type, id, x, y, touching]) => {
      const c = document.querySelector('canvas[aria-label^="Whiteboard, page 1"]')!;
      c.dispatchEvent(
        new PointerEvent(type as string, { pointerType: 'pen', pointerId: id as number, isPrimary: true, clientX: x as number, clientY: y as number, buttons: touching ? 1 : 0, pressure: touching ? 0.5 : 0, bubbles: true, cancelable: true }),
      );
    },
    [type, id, box.x + x, box.y + y, touching] as const,
  );
}

/** A pen line from (x0, y) to (x1, y), sent as moves. */
async function line(page: Page, id: number, x0: number, x1: number, y: number) {
  for (let i = 0; i <= 10; i++) await pen(page, 'pointermove', id, x0 + ((x1 - x0) * i) / 10, y);
}

/** Dark ink pixels on the finished-ink canvas inside a box given in CSS pixels. */
const inkIn = (page: Page, x: number, y: number, w: number, h: number) =>
  page.locator('canvas[aria-label^="Whiteboard, page 1"]').evaluate(
    (c, [x, y, w, h]) => {
      const base = c.previousElementSibling as HTMLCanvasElement;
      const k = base.width / base.clientWidth;
      const data = base.getContext('2d')!.getImageData(Math.round(x * k), Math.round(y * k), Math.round(w * k), Math.round(h * k)).data;
      let n = 0;
      for (let i = 0; i < data.length; i += 4) if (data[i] < 90 && data[i + 1] < 90 && data[i + 2] < 90 && data[i + 3] > 200) n++;
      return n;
    },
    [x, y, w, h] as const,
  );

test('pencil writing is kept when iPadOS loses or cancels its events', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toBeVisible();
  await page.keyboard.press('w');
  await expect(page.getByRole('dialog', { name: 'Whiteboard' })).toBeVisible();

  // 1. A stroke whose pointerup never comes: the next stroke still draws, and both are kept.
  await pen(page, 'pointerdown', 11, 60, 60);
  await line(page, 11, 60, 200, 60);
  await pen(page, 'pointerdown', 12, 60, 110);
  await line(page, 12, 60, 200, 110);
  await pen(page, 'pointerup', 12, 200, 110);
  await expect.poll(() => inkIn(page, 80, 50, 100, 20)).toBeGreaterThan(50);
  await expect.poll(() => inkIn(page, 80, 100, 100, 20)).toBeGreaterThan(50);

  // 2. A stroke whose pointerdown was swallowed: the pencil's moves on the glass still draw.
  await line(page, 13, 60, 200, 160);
  await pen(page, 'pointerup', 13, 200, 160);
  await expect.poll(() => inkIn(page, 80, 150, 100, 20)).toBeGreaterThan(50);

  // 3. A stroke cancelled halfway while the pencil keeps writing: the rest of it is kept too.
  await pen(page, 'pointerdown', 14, 60, 210);
  await line(page, 14, 60, 120, 210);
  await pen(page, 'pointercancel', 14, 120, 210);
  await line(page, 14, 120, 300, 210);
  await pen(page, 'pointerup', 14, 300, 210);
  await expect.poll(() => inkIn(page, 200, 200, 80, 20)).toBeGreaterThan(30);

  // 4. A stroke whose pointerup is lost, then the pencil hovers: the stroke ends and is kept.
  await pen(page, 'pointerdown', 15, 60, 260);
  await line(page, 15, 60, 200, 260);
  await pen(page, 'pointermove', 15, 220, 290, false);
  await expect.poll(() => inkIn(page, 80, 250, 100, 20)).toBeGreaterThan(50);

  // Hovering draws nothing.
  await pen(page, 'pointermove', 16, 60, 330, false);
  await pen(page, 'pointermove', 16, 200, 330, false);
  expect(await inkIn(page, 60, 320, 140, 20)).toBe(0);
  expect(errors).toEqual([]);
});
