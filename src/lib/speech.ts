/**
 * The device's own text-to-speech, for the AI tutor's voice. Picks the most natural English voice
 * the device has, speaks sentence by sentence (some browsers cut a long utterance off), and works
 * out how long the words take to read when there is no voice, so the tutor keeps the same pace with
 * the sound off.
 */

export const speechSupported = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

/** Names of the better-sounding voices on common devices, best first. */
const PREFERRED = [/natural/i, /neural/i, /premium/i, /enhanced/i, /google (uk|us) english/i, /samantha/i, /ava/i, /serena/i, /karen/i, /daniel/i, /moira/i, /tessa/i, /aria/i, /jenny/i, /libby/i, /sonia/i, /google/i];

export function rankVoice(v: Pick<SpeechSynthesisVoice, 'name' | 'lang' | 'localService'>): number {
  if (!/^en(-|_|$)/i.test(v.lang)) return -1;
  const at = PREFERRED.findIndex((re) => re.test(v.name));
  let score = at < 0 ? 0 : (PREFERRED.length - at) * 10;
  if (/^en[-_](US|GB|CA|AU|IE|NZ)$/i.test(v.lang)) score += 3;
  // Novelty and robotic voices some systems list.
  if (/whisper|zarvox|trinoids|bells|bad news|bahh|boing|bubbles|cellos|jester|organ|superstar|wobble|albert|fred|junior|ralph|kathy|espeak/i.test(v.name)) score -= 100;
  return score;
}

/** The voices, once the browser has loaded them (Chrome loads them after the page). */
export function loadVoices(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  if (!speechSupported()) return Promise.resolve([]);
  const now = window.speechSynthesis.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', done);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', done);
    setTimeout(done, timeoutMs);
  });
}

export function bestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null;
  let score = -1;
  for (const v of voices) {
    const s = rankVoice(v);
    if (s > score) {
      best = v;
      score = s;
    }
  }
  return best;
}

/** Seconds to read `text` aloud at `rate` (about 165 words a minute at 1). */
export function readingSeconds(text: string, rate = 1): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return words / (2.75 * rate) + 0.6;
}

/** Sentences short enough for every browser to finish. */
export function sentences(text: string): string[] {
  // No look-behind in the pattern: older Safari cannot parse it.
  return text
    .replace(/([.!?])\s+(?=[A-Z0-9"“‘(])/g, '$1\u0000')
    .split('\u0000')
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface Narration {
  /** True when the whole text was read; false when it was stopped. */
  done: Promise<boolean>;
  stop(): void;
}

/**
 * Says `text` with `voice`, or, with no voice (muted, or none on the device), waits as long as
 * reading it would take. Either way `done` resolves when it is over.
 */
export function narrate(text: string, opts: { voice: SpeechSynthesisVoice | null; rate: number; muted: boolean }): Narration {
  let stopped = false;
  let finish: (read: boolean) => void = () => undefined;
  const done = new Promise<boolean>((resolve) => (finish = resolve));
  const timers: ReturnType<typeof setTimeout>[] = [];
  const stop = () => {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    if (speaking) window.speechSynthesis.cancel();
    finish(false);
  };
  const speaking = !opts.muted && speechSupported() && !!text.trim();
  if (!speaking) {
    timers.push(setTimeout(() => !stopped && finish(true), readingSeconds(text, opts.rate) * 1000));
    return { done, stop };
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const parts = sentences(text);
  const sayNext = (i: number) => {
    if (stopped) return;
    if (i >= parts.length) {
      stopped = true;
      finish(true);
      return;
    }
    const u = new SpeechSynthesisUtterance(parts[i]);
    if (opts.voice) {
      u.voice = opts.voice;
      u.lang = opts.voice.lang;
    } else u.lang = 'en-US';
    u.rate = opts.rate;
    let moved = false;
    const next = () => {
      if (moved) return;
      moved = true;
      sayNext(i + 1);
    };
    u.onend = next;
    u.onerror = next;
    // Some browsers never report the end of an utterance; carry on after a generous wait.
    timers.push(setTimeout(next, readingSeconds(parts[i], opts.rate) * 2000 + 4000));
    synth.speak(u);
  };
  sayNext(0);
  return { done, stop };
}

/**
 * Lets the page speak later: some browsers (Safari on iPhone and iPad) only allow speech that
 * starts from a tap, so call this in the tap that starts the tutor.
 */
export function primeSpeech() {
  if (!speechSupported()) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  window.speechSynthesis.speak(u);
}

/** Stops anything the page is saying (on leaving the tutor). */
export function hush() {
  if (speechSupported()) window.speechSynthesis.cancel();
}
