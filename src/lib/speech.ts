/**
 * The AI tutor's voice: the explainer videos' voice, recorded ahead of time for every lesson
 * (video/tools/tutor-voice.ts). One audio file holds all of a lesson's lines and a manifest says
 * where each one is, so the tutor plays a line by seeking to it and pausing at its end. With the
 * sound off, or for a line with no recording, the words stay on screen for as long as reading them
 * takes, so the tutor keeps the same pace either way.
 */
import { parseTutorVoice, type Clip, type TutorVoice } from '@engine/ai/tutor.ts';

export interface Narration {
  /** True when the line was said (or read) to the end; false when it was stopped. */
  done: Promise<boolean>;
  stop(): void;
}

/** Seconds to read `text` at `rate` (about 165 words a minute at 1). */
export function readingSeconds(text: string, rate = 1): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return words / (2.75 * rate) + 0.6;
}

const base = () => import.meta.env.BASE_URL ?? '/';

/** The lesson's recorded voice, or null when it has none yet (the site answers a missing file with the app's page). */
export async function loadTutorVoice(lessonId: string): Promise<TutorVoice | null> {
  try {
    // A slow answer should not keep the student waiting at the start card.
    const res = await fetch(`${base()}tutor/${lessonId}.json`, { signal: AbortSignal.timeout?.(8000) });
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) return null;
    return parseTutorVoice(await res.json(), lessonId);
  } catch {
    return null;
  }
}

export const tutorAudioUrl = (voice: TutorVoice) => `${base()}tutor/${voice.audio}`;

/** No voice: the words stay up for as long as reading them takes. */
export function readAlong(text: string, rate: number): Narration {
  let finish: (read: boolean) => void = () => undefined;
  const done = new Promise<boolean>((resolve) => (finish = resolve));
  const timer = setTimeout(() => finish(true), readingSeconds(text, rate) * 1000);
  return {
    done,
    stop: () => {
      clearTimeout(timer);
      finish(false);
    },
  };
}

/** Audio elements a line is playing on, so unlocking one does not pause it. */
const inUse = new WeakSet<HTMLAudioElement>();

/**
 * Lets the page play `audio` later: Safari on iPhone and iPad only plays a sound element that first
 * started in a tap, so call this in the tap that starts the tutor.
 */
export function unlockAudio(audio: HTMLAudioElement) {
  const wasMuted = audio.muted;
  audio.muted = true;
  const restore = () => {
    audio.muted = wasMuted;
  };
  const p = audio.play();
  if (!p) return restore();
  p.then(() => {
    if (!inUse.has(audio)) audio.pause();
    restore();
  }, restore);
}

/**
 * Plays one line of a lesson's recording at `rate`: seeks to the line, plays it and pauses at its
 * end. If the sound cannot play (the file failed, or the browser refused), the words stay up for
 * their reading time instead.
 */
export function playClip(audio: HTMLAudioElement, clip: Clip, text: string, rate: number): Narration {
  let over = false;
  let finish: (read: boolean) => void = () => undefined;
  const done = new Promise<boolean>((resolve) => (finish = resolve));
  let fallback: Narration | null = null;
  let tick: ReturnType<typeof setInterval> | undefined;
  let guard: ReturnType<typeof setTimeout> | undefined;
  const end = (read: boolean) => {
    if (over) return;
    over = true;
    clearInterval(tick);
    clearTimeout(guard);
    fallback?.stop();
    inUse.delete(audio);
    audio.pause();
    finish(read);
  };
  inUse.add(audio);
  audio.playbackRate = rate;
  // Before the file has loaded, this sets where playing starts.
  audio.currentTime = clip[0];
  // Pauses at the line's end; the gap of silence after each line covers the last few milliseconds.
  tick = setInterval(() => (audio.currentTime >= clip[1] || audio.ended) && end(true), 25);
  // A line that never gets going (a stalled download) does not hold the lesson up for long.
  guard = setTimeout(() => end(true), ((clip[1] - clip[0]) / rate + 12) * 1000);
  audio.play().catch(() => {
    if (over) return;
    fallback = readAlong(text, rate);
    void fallback.done.then((read) => read && end(true));
  });
  return { done, stop: () => end(false) };
}
