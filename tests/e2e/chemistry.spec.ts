import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/** The ion each main-group element forms, as a student would type it, without a caret. */
const IONS: Record<string, string> = {
  lithium: 'Li+', sodium: 'Na+', potassium: 'K+', magnesium: 'Mg2+', calcium: 'Ca2+', strontium: 'Sr2+', barium: 'Ba2+', aluminium: 'Al3+',
  nitrogen: 'N3-', phosphorus: 'P3-', oxygen: 'O2-', sulfur: 'S2-', fluorine: 'F-', chlorine: 'Cl-', bromine: 'Br-', iodine: 'I-',
};

test('a student writes an ion’s formula, sees it as it will be read, and is marked right', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/s/practice?skills=c20-ion-formula');
  const prompt = page.getByText(/Write the formula of the ion that (\w+) forms/);
  await expect(prompt).toBeVisible();
  const element = /ion that (\w+) forms/.exec((await prompt.textContent()) ?? '')![1];
  await page.getByRole('textbox', { name: 'Formula' }).fill(IONS[element]);
  await expect(page.getByText('Reads as')).toBeVisible();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Correct!')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Chemistry 20 is not offered for a new class while it is being written', async ({ page }) => {
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await expect(page.getByRole('heading', { name: 'Create a class' })).toBeVisible();
  await expect(page.getByText('Chemistry 20')).toHaveCount(0);
});
