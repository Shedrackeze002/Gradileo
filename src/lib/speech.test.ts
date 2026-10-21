import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TUTOR_VOICE_VERSION } from '@engine/ai/tutor.ts';
import { loadTutorAudio, loadTutorVoice, playClip, readAlong, readingSeconds, unlockAudio } from './speech.ts';

/** A stand-in for an <audio> element: playing moves currentTime on when the test says so. */
function fakeAudio(play: () => Promise<void> = () => Promise.resolve()) {
  return { currentTime: 0, playbackRate: 1, ended: false, muted: false, play: vi.fn(play), pause: vi.fn() } as unknown as HTMLAudioElement & { play: ReturnType<typeof vi.fn>; pause: ReturnType<typeof vi.fn> };
}

describe('the tutor without sound', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('keeps the words up for as long as reading them takes', async () => {
    const n = readAlong('one two three four five six seven eight nine ten eleven', 1);
    let read: boolean | undefined;
    void n.done.then((r) => (read = r));
    await vi.advanceTimersByTimeAsync(readingSeconds('one two three four five six seven eight nine ten eleven') * 1000 - 50);
    expect(read).toBeUndefined();
    await vi.advanceTimersByTimeAsync(100);
    expect(read).toBe(true);
  });

  it('reports a stopped line as not read', async () => {
    const n = readAlong('Hello there.', 1);
    n.stop();
    await expect(n.done).resolves.toBe(false);
  });
});

describe('playing a recorded line', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('seeks to the line, plays it at the speed asked for, and pauses at its end', async () => {
    const audio = fakeAudio();
    const n = playClip(audio, [12, 15], 'A line.', 1.15);
    expect(audio.currentTime).toBe(12);
    expect(audio.playbackRate).toBe(1.15);
    expect(audio.play).toHaveBeenCalled();
    let read: boolean | undefined;
    void n.done.then((r) => (read = r));
    audio.currentTime = 14.9;
    await vi.advanceTimersByTimeAsync(30);
    expect(read).toBeUndefined();
    audio.currentTime = 15.01;
    await vi.advanceTimersByTimeAsync(30);
    expect(read).toBe(true);
    expect(audio.pause).toHaveBeenCalled();
  });

  it('stops at once when asked', async () => {
    const audio = fakeAudio();
    const n = playClip(audio, [1, 4], 'A line.', 1);
    n.stop();
    await expect(n.done).resolves.toBe(false);
    expect(audio.pause).toHaveBeenCalled();
  });

  it('shows the words for their reading time when the sound cannot play', async () => {
    const audio = fakeAudio(() => Promise.reject(new Error('NotAllowedError')));
    const n = playClip(audio, [1, 2], 'Five words in this line.', 1);
    let read: boolean | undefined;
    void n.done.then((r) => (read = r));
    await vi.advanceTimersByTimeAsync(500);
    expect(read).toBeUndefined();
    await vi.advanceTimersByTimeAsync(readingSeconds('Five words in this line.') * 1000);
    expect(read).toBe(true);
  });

  it('does not hold the lesson up when the recording stalls', async () => {
    const audio = fakeAudio();
    const n = playClip(audio, [1, 3], 'A line.', 1);
    let read: boolean | undefined;
    void n.done.then((r) => (read = r));
    await vi.advanceTimersByTimeAsync(13_000);
    expect(read).toBeUndefined();
    await vi.advanceTimersByTimeAsync(1_100);
    expect(read).toBe(true);
  });
});

describe('unlocking the sound in the tap that starts the tutor', () => {
  it('plays silently and pauses, unless a line has started meanwhile', async () => {
    const quiet = fakeAudio();
    unlockAudio(quiet);
    expect(quiet.muted).toBe(true);
    await Promise.resolve();
    await Promise.resolve();
    expect(quiet.pause).toHaveBeenCalled();
    expect(quiet.muted).toBe(false);

    vi.useFakeTimers();
    const busy = fakeAudio();
    unlockAudio(busy);
    const n = playClip(busy, [0.5, 2], 'Hi!', 1);
    await Promise.resolve();
    await Promise.resolve();
    expect(busy.pause).not.toHaveBeenCalled();
    expect(busy.muted).toBe(false);
    n.stop();
    vi.useRealTimers();
  });
});

describe('loading a lesson’s recording', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reads the manifest next to the app', async () => {
    const manifest = { v: TUTOR_VOICE_VERSION, lessonId: 'm5-1-1', audio: 'm5-1-1.x1.mp3', voice: { name: 'af_heart', speed: 0.85 }, hash: 'x1', slides: {}, phrases: {} };
    const fetch = vi.fn(async () => new Response(JSON.stringify(manifest), { headers: { 'content-type': 'application/json' } }));
    vi.stubGlobal('fetch', fetch);
    const v = await loadTutorVoice('m5-1-1');
    expect(v?.audio).toBe('m5-1-1.x1.mp3');
    expect(String((fetch.mock.calls[0] as unknown[])[0])).toMatch(/tutor\/m5-1-1\.json$/);
  });

  it('is null when the lesson has no recording yet (the site answers with its page)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<!doctype html>', { headers: { 'content-type': 'text/html' } })));
    expect(await loadTutorVoice('m5-1-1')).toBeNull();
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new Error('offline'))));
    expect(await loadTutorVoice('m5-1-1')).toBeNull();
  });
});

describe('downloading a lesson’s recording', () => {
  afterEach(() => vi.unstubAllGlobals());
  const voice = { v: TUTOR_VOICE_VERSION, lessonId: 'm5-1-1', audio: 'm5-1-1.x1.mp3', voice: { name: 'af_heart', speed: 0.85 }, hash: 'x1', slides: {}, phrases: {} };

  it('keeps the whole file in memory, so playing needs no partial downloads', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(new Blob([new Uint8Array([1, 2, 3])], { type: 'audio/mpeg' }))));
    const create = vi.fn(() => 'blob:recording');
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL: create }));
    expect(await loadTutorAudio(voice)).toBe('blob:recording');
    expect(create).toHaveBeenCalled();
  });

  it('is null when the file is missing or the network fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 404 })));
    expect(await loadTutorAudio(voice)).toBeNull();
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new Error('offline'))));
    expect(await loadTutorAudio(voice)).toBeNull();
  });
});
