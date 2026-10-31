import { expect, test, type Page } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

const slideLabel = (page: Page) => page.locator('[aria-roledescription="slide"]').getAttribute('aria-label');

/** How many yellow highlighter pixels a canvas shows. */
const yellowPixels = (page: Page, name: RegExp) =>
  page.getByRole('img', { name }).evaluate((c) => {
    const canvas = c.previousElementSibling as HTMLCanvasElement;
    const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 1] > 140 && data[i + 2] < 80 && data[i + 3] > 40) n++;
    return n;
  });

test('the tools are named, and the highlighter marks in yellow while the pen keeps its own colour', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toBeVisible();
  await page.keyboard.press('w');
  const board = page.getByRole('dialog', { name: 'Whiteboard' });
  const tools = board.getByRole('toolbar', { name: 'Drawing tools' });
  for (const name of ['Pen', 'Highlight', 'Eraser', 'Shapes', 'Pointer']) await expect(tools.getByText(name, { exact: true })).toBeVisible();

  await tools.getByRole('button', { name: 'Highlighter (H)' }).click();
  await expect(tools.getByRole('button', { name: 'Yellow' })).toHaveAttribute('aria-pressed', 'true');
  const box = (await page.getByRole('img', { name: /Whiteboard, page 1/ }).boundingBox())!;
  await page.mouse.move(box.x + 100, box.y + 120);
  await page.mouse.down();
  await page.mouse.move(box.x + 400, box.y + 130, { steps: 12 });
  await page.mouse.up();
  await expect.poll(() => yellowPixels(page, /Whiteboard, page 1/)).toBeGreaterThan(200);

  // The pen is still black, and choosing blue for it leaves the highlighter yellow.
  await tools.getByRole('button', { name: 'Pen (P)' }).click();
  await expect(tools.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'true');
  await tools.getByRole('button', { name: 'Blue' }).click();
  await tools.getByRole('button', { name: 'Highlighter (H)' }).click();
  await expect(tools.getByRole('button', { name: 'Yellow' })).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('after a reload the presentation carries on at the same slide with its ink, and starts afresh once left', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toBeVisible();
  for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Next' }).click();
  const where = await slideLabel(page);
  expect(where).not.toMatch(/^Slide 1 of/);
  await page.keyboard.press('d');
  const ink = page.getByRole('img', { name: 'Drawing on the slide' });
  const box = (await ink.boundingBox())!;
  await page.mouse.move(box.x + 80, box.y + 80);
  await page.mouse.down();
  await page.mouse.move(box.x + 260, box.y + 160, { steps: 10 });
  await page.mouse.up();
  const clear = page.getByRole('toolbar', { name: 'Drawing tools' }).getByRole('button', { name: 'Clear the page' });
  await expect(clear).toBeEnabled();

  await page.reload();
  await expect(page.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', where!);
  await expect(clear).toBeEnabled();

  await page.getByRole('button', { name: 'Exit presentation' }).click();
  await expect(page).toHaveURL(/\/t\/c\/c_math10a\/lessons\/m10c-2-1/);
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /^Slide 1 of/);
  expect(errors).toEqual([]);
});

test('on a touch screen the presentation stays put, panels still scroll, and a palm near the pencil presses nothing', async ({ page }) => {
  const errors = trackErrors(page);
  await page.setViewportSize({ width: 820, height: 600 });
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/screen-lock/);

  /** Sends a one-finger touch to the element at a point; true when the page cancelled it. */
  const touch = (type: 'touchstart' | 'touchmove' | 'touchend', x: number, y: number, id = 1) =>
    page.evaluate(
      ([type, x, y, id]) => {
        const target = document.elementFromPoint(x as number, y as number)!;
        const t = new Touch({ identifier: id as number, target, clientX: x as number, clientY: y as number });
        const e = new TouchEvent(type as string, { touches: type === 'touchend' ? [] : [t], changedTouches: [t], bubbles: true, cancelable: true });
        target.dispatchEvent(e);
        return e.defaultPrevented;
      },
      [type, x, y, id] as const,
    );
  const pen = (type: 'pointerdown' | 'pointerup', x: number, y: number) =>
    page.evaluate(([type, x, y]) => document.elementFromPoint(x as number, y as number)!.dispatchEvent(new PointerEvent(type as string, { pointerType: 'pen', clientX: x as number, clientY: y as number, bubbles: true })), [type, x, y] as const);

  // A finger dragging over the slide does not move the page.
  const slide = (await page.locator('[aria-roledescription="slide"]').boundingBox())!;
  const [sx, sy] = [slide.x + slide.width / 2, slide.y + slide.height / 2];
  expect(await touch('touchstart', sx, sy)).toBe(false);
  expect(await touch('touchmove', sx, sy + 40)).toBe(true);
  await touch('touchend', sx, sy + 40);

  // A palm on Next while the pencil writes does not press it; a finger a moment later does.
  const next = (await page.getByRole('button', { name: 'Next' }).boundingBox())!;
  const [nx, ny] = [next.x + next.width / 2, next.y + next.height / 2];
  await pen('pointerdown', sx, sy);
  expect(await touch('touchstart', nx, ny, 2)).toBe(true);
  expect(await touch('touchend', nx, ny, 2)).toBe(true);
  await pen('pointerup', sx + 30, sy);
  await page.waitForTimeout(900);
  expect(await touch('touchstart', nx, ny, 3)).toBe(false);
  expect(await touch('touchend', nx, ny, 3)).toBe(false);

  // The slide overview is longer than the screen and still scrolls under a finger.
  await page.keyboard.press('o');
  const overview = page.getByRole('dialog', { name: 'All slides' });
  await expect(overview).toBeVisible();
  const ob = (await overview.boundingBox())!;
  const [ox, oy] = [ob.x + ob.width / 2, ob.y + ob.height / 2];
  expect(await touch('touchstart', ox, oy, 4)).toBe(false);
  expect(await touch('touchmove', ox, oy - 50, 4)).toBe(false);
  await touch('touchend', ox, oy - 50, 4);

  // Leaving present mode unlocks the page.
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Exit presentation' }).click();
  await expect(page.locator('html')).not.toHaveClass(/screen-lock/);
  expect(errors).toEqual([]);
});
