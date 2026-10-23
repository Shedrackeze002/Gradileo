import { expect, test, type Page } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/** Drags the mouse across part of the board. */
async function drag(page: Page, from: [number, number], to: [number, number]) {
  const box = (await page.getByRole('img', { name: /Whiteboard, page 1/ }).boundingBox())!;
  await page.mouse.move(box.x + from[0], box.y + from[1]);
  await page.mouse.down();
  await page.mouse.move(box.x + to[0], box.y + to[1], { steps: 10 });
  await page.mouse.up();
}

/** How many red laser pixels the board's top canvas shows. */
const laserPixels = (page: Page) =>
  page.getByRole('img', { name: /Whiteboard, page 1/ }).evaluate((c) => {
    const canvas = c as HTMLCanvasElement;
    const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 1] < 120 && data[i + 3] > 100) n++;
    return n;
  });

test('the whiteboard draws shapes, and its pointer points without drawing', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  await expect(page.locator('[aria-roledescription="slide"]')).toBeVisible();
  await page.keyboard.press('w');
  const board = page.getByRole('dialog', { name: 'Whiteboard' });
  await expect(board).toBeVisible();
  const undo = board.getByRole('button', { name: 'Undo (Ctrl+Z)' });
  await expect(undo).toBeDisabled();

  // Shapes: the picker opens from the toolbar, and a drag places the chosen shape as ink.
  await board.getByRole('button', { name: 'Shapes (S)' }).click();
  const picker = board.getByRole('group', { name: 'Shapes' });
  await expect(picker.getByRole('button')).toHaveCount(8);
  await picker.getByRole('button', { name: 'Circle', exact: true }).click();
  await expect(picker).toBeHidden();
  await expect(board.getByRole('button', { name: /^Shapes \(S\): Circle/ })).toHaveAttribute('aria-pressed', 'true');
  await drag(page, [150, 120], [300, 200]);
  await expect(undo).toBeEnabled();

  // Escape closes the picker without leaving the board.
  await board.getByRole('button', { name: /^Shapes \(S\)/ }).click();
  await expect(picker).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(picker).toBeHidden();
  await expect(board).toBeVisible();

  // The pointer shows a laser where the mouse goes, fades, and adds nothing to the board.
  await undo.click();
  await expect(undo).toBeDisabled();
  await page.keyboard.press('l');
  await expect(board.getByRole('button', { name: /^Pointer \(L\)/ })).toHaveAttribute('aria-pressed', 'true');
  const box = (await page.getByRole('img', { name: /Whiteboard, page 1/ }).boundingBox())!;
  await page.mouse.move(box.x + 200, box.y + 150);
  await page.mouse.move(box.x + 320, box.y + 220, { steps: 8 });
  await expect.poll(() => laserPixels(page)).toBeGreaterThan(20);
  await drag(page, [200, 150], [400, 260]);
  await expect.poll(() => laserPixels(page), { timeout: 3000 }).toBe(0);
  await expect(undo).toBeDisabled();
  expect(errors).toEqual([]);
});
