import { readFileSync } from 'node:fs';
import { expect, test, type BrowserContext } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

const manifest = JSON.parse(readFileSync(new URL('../../src/content/videos.json', import.meta.url), 'utf8')) as Record<string, { title: string; cues: Array<{ t: number }> }>;

/**
 * A stand-in for YouTube's IFrame Player API, so the test needs no network: a player whose clock
 * runs while it plays, and which the test can move with `seek`.
 */
const FAKE_YOUTUBE = `
window.YT = {
  PlayerState: { PLAYING: 1, PAUSED: 2 },
  Player: class {
    constructor(el, opts) {
      this.t = 0; this.state = -1; this.since = 0; this.opts = opts;
      el.setAttribute('data-fake-youtube', opts.videoId);
      window.__player = this;
      // Like YouTube, the player is ready a moment after it is made.
      setTimeout(() => opts.events && opts.events.onReady && opts.events.onReady({ target: this }), 50);
    }
    now() { return this.state === 1 ? this.t + (performance.now() - this.since) / 1000 : this.t; }
    playVideo() { if (this.state !== 1) { this.since = performance.now(); this.state = 1; } }
    pauseVideo() { this.t = this.now(); this.state = 2; }
    seek(t) { this.t = t; this.since = performance.now(); }
    getCurrentTime() { return this.now(); }
    getPlayerState() { return this.state; }
    getPlaybackRate() { return 1; }
    fail() { this.opts.events && this.opts.events.onError && this.opts.events.onError({ data: 150 }); }
    destroy() {}
  },
};
window.onYouTubeIframeAPIReady && window.onYouTubeIframeAPIReady();
`;

async function fakeYouTube(context: BrowserContext) {
  await context.route('https://www.youtube.com/iframe_api', (r) => r.fulfill({ contentType: 'text/javascript', body: FAKE_YOUTUBE }));
  // A 1×1 image for YouTube thumbnails on the admin page.
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  await context.route('https://i.ytimg.com/**', (r) => r.fulfill({ contentType: 'image/png', body: png }));
}

test('an administrator links an explainer video, and the lesson plays it and pauses to ask its question', async ({ context, page }) => {
  await fakeYouTube(context);
  const errors = trackErrors(page);
  const video = manifest['m10c-2-1'];
  const cue = video.cues[0];
  await signInDemo(page, 'Teacher');

  // Without a YouTube link the lesson shows no video.
  await page.goto('/t/c/c_math10a/lessons/m10c-2-1');
  await expect(page.getByRole('heading', { name: 'Naming the sides' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Explainer video' })).toHaveCount(0);

  // The administrator finds the video (each course is folded until opened) and pastes its link.
  await page.goto('/admin/videos');
  await page.getByLabel('Find a video').fill('m10c-2-1');
  await expect(page.getByText('2 matches.')).toBeVisible();
  // Other courses have videos with the same title (Math 10-3 also teaches the tangent ratio), so
  // pick the row by its video id as well.
  const row = page.getByRole('listitem').filter({ hasText: video.title }).filter({ hasText: 'm10c-2-1 ·' });
  await row.getByLabel('YouTube link').fill('not a link');
  await row.getByRole('button', { name: 'Link video' }).click();
  await expect(row.getByText(/Paste the link of the video on YouTube/)).toBeVisible();
  await row.getByLabel('YouTube link').fill('https://youtu.be/dQw4w9WgXcQ?si=share');
  await row.getByRole('button', { name: 'Link video' }).click();
  await expect(page.getByText('Video linked. Its lesson now shows it.')).toBeVisible();
  await expect(row.getByText('On YouTube')).toBeVisible();

  // The lesson shows the video; at the "Your turn" it pauses and asks the question.
  await page.goto('/t/c/c_math10a/lessons/m10c-2-1');
  const section = page.getByRole('region', { name: 'Explainer video' });
  await expect(section.getByText(video.title)).toBeVisible();
  await expect(section.locator('[data-fake-youtube="dQw4w9WgXcQ"]')).toHaveCount(1);
  // Captions are on from the start.
  expect(await page.evaluate(() => (window as unknown as { __player: { opts: { playerVars: Record<string, unknown> } } }).__player.opts.playerVars)).toMatchObject({ cc_load_policy: 1, cc_lang_pref: 'en' });
  await page.evaluate((t) => {
    const p = (window as unknown as { __player: { seek(t: number): void; playVideo(): void } }).__player;
    p.seek(t);
    p.playVideo();
  }, cue.t - 1);
  await expect(section.getByText('Your turn: answer below to carry on')).toBeVisible({ timeout: 5000 });
  const question = section.getByRole('group', { name: 'Your turn' });
  await expect(question.getByText(/What is/)).toBeVisible();
  // Focus moves to the question, so keyboard and screen-reader users know an answer is needed.
  await expect(question).toBeFocused();
  expect(await page.evaluate(() => (window as unknown as { __player: { getPlayerState(): number } }).__player.getPlayerState())).toBe(2);
  await question.getByRole('button', { name: /^B/ }).click();
  await expect(question.getByText('Right!')).toBeVisible();
  await question.getByRole('button', { name: 'Carry on with the video' }).click();
  await expect(question).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as { __player: { getPlayerState(): number } }).__player.getPlayerState())).toBe(1);

  // A video YouTube cannot play (removed, private, not allowed elsewhere) offers a link instead.
  await page.evaluate(() => (window as unknown as { __player: { fail(): void } }).__player.fail());
  await expect(section.getByRole('link', { name: 'Watch on YouTube' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  // With part 2 linked too, the lesson offers both parts.
  await page.goto('/admin/videos');
  await page.getByLabel('Find a video').fill('m10c-2-1-b');
  const part2 = page.getByRole('listitem').filter({ hasText: manifest['m10c-2-1-b'].title }).filter({ hasText: 'm10c-2-1-b ·' });
  await part2.getByLabel('YouTube link').fill('abcdefghijk');
  await part2.getByRole('button', { name: 'Link video' }).click();
  await expect(part2.getByText('On YouTube', { exact: true })).toBeVisible();
  await page.goto('/t/c/c_math10a/lessons/m10c-2-1');
  const parts = page.getByRole('group', { name: 'Video parts' });
  await expect(parts.getByRole('button', { name: 'Part 1' })).toHaveAttribute('aria-pressed', 'true');
  await parts.getByRole('button', { name: 'Part 2' }).click();
  await expect(parts.getByRole('button', { name: 'Part 2' })).toHaveAttribute('aria-pressed', 'true');
  await expect(section.getByText(manifest['m10c-2-1-b'].title)).toBeVisible();
  await expect(section.locator('[data-fake-youtube="abcdefghijk"]')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('present mode plays each explainer part as a slide just before the section it teaches', async ({ context, page }) => {
  await fakeYouTube(context);
  // The slide embeds YouTube's own player; a blank page stands in for it.
  await context.route('https://www.youtube-nocookie.com/embed/**', (r) => r.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Player</title>' }));
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');

  // Only part 1 of the lesson's two parts is on YouTube.
  await page.goto('/admin/videos');
  await page.getByLabel('Find a video').fill('m10c-2-1');
  const part1 = manifest['m10c-2-1'];
  const row = page.getByRole('listitem').filter({ hasText: part1.title }).filter({ hasText: 'm10c-2-1 ·' });
  await row.getByLabel('YouTube link').fill('https://youtu.be/dQw4w9WgXcQ');
  await row.getByRole('button', { name: 'Link video' }).click();
  await expect(row.getByText('On YouTube', { exact: true })).toBeVisible();

  // The video comes right after the introduction, before the lesson's first section; part 2 has no slide.
  await page.goto('/present/c_math10a/m10c-2-1');
  const slide = page.locator('[aria-roledescription="slide"]');
  await expect(slide).toHaveAttribute('aria-label', /^Slide 1 of \d+: The Tangent Ratio$/);
  await page.keyboard.press('o');
  const overview = page.getByRole('dialog', { name: 'All slides' });
  // The slide kinds are set in capitals, so compare them in lower case.
  const titles = (await overview.getByRole('button').filter({ hasText: /^(Video|Introduction|Teaching)/i }).allInnerTexts()).map((t) => t.toLowerCase());
  const at = titles.findIndex((t) => t.startsWith('video'));
  // The slide is titled by the part ("Naming the Sides"); the deck already names the lesson.
  const partTitle = part1.title.replace(/^.*?Part \d+:\s*/, '');
  expect(titles[at]).toContain(partTitle.toLowerCase());
  expect(titles[at - 1]).toMatch(/^introduction/);
  expect(titles[at + 1]).toContain('naming the sides');
  expect(titles.filter((t) => t.startsWith('video'))).toHaveLength(1);

  // Its slide plays the video with captions on, ready for the teacher to start.
  await overview.getByRole('button').filter({ hasText: /^video/i }).filter({ hasText: partTitle }).click();
  await expect(slide).toHaveAttribute('aria-label', new RegExp(partTitle));
  const player = slide.locator('iframe');
  await expect(player).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/dQw4w9WgXcQ\?.*cc_load_policy=1/);
  await expect(slide.getByText(/Explainer video · Part 1 of 2 · \d+:\d\d/)).toBeVisible();

  // The teacher carries on presenting: the next slide is the section the video taught.
  await page.keyboard.press('ArrowRight');
  await expect(slide).toHaveAttribute('aria-label', /Naming the sides/);
  await expect(slide.locator('iframe')).toHaveCount(0);
  expect(errors).toEqual([]);
});
