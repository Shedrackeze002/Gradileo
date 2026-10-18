/**
 * Narration with Kokoro, an open-weight text-to-speech model (Apache 2.0) that runs on the CPU, so
 * voicing costs nothing. Each line is voiced once and cached by its text, voice and speed.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { AutoTokenizer, env, type PreTrainedTokenizer, type StyleTextToSpeech2Model } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';
import { readWav, seconds, trimSilence, writeWav, type Pcm } from './wav.ts';

export const MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX';

/**
 * Kokoro voices at most 512 tokens (510 phonemes and its start and end markers) and silently drops
 * the rest, so a longer line is voiced in parts of whole sentences, joined with a sentence's pause.
 */
const MAX_TOKENS = 512;
const SENTENCE_PAUSE = 0.6;

export interface Voice {
  /** A Kokoro voice, for example af_heart. */
  name: string;
  speed: number;
}

let tts: Promise<KokoroTTS> | null = null;
let counter: Promise<(text: string) => Promise<number>> | null = null;

export function useCache(dir: string) {
  env.cacheDir = path.join(dir, 'models');
  mkdirSync(path.join(dir, 'tts'), { recursive: true });
}

export function clipFile(cache: string, text: string, voice: Voice): string {
  const hash = createHash('sha1').update(`${MODEL}|${voice.name}|${voice.speed}|${text}`).digest('hex').slice(0, 16);
  return path.join(cache, 'tts', `${hash}.wav`);
}

/** How many tokens Kokoro makes of a line: its own phonemizer and tokenizer, with a stand-in model. */
function tokenCount(): Promise<(text: string) => Promise<number>> {
  counter ??= AutoTokenizer.from_pretrained(MODEL).then((tokenizer) => {
    let count = 0;
    const counting = (text: string, options: object) => {
      count = tokenizer(text).input_ids.dims.at(-1);
      return tokenizer(text, options);
    };
    const standIn = async () => ({ waveform: { data: new Float32Array(1) } });
    const dry = new KokoroTTS(standIn as unknown as StyleTextToSpeech2Model, counting as unknown as PreTrainedTokenizer);
    return async (text: string) => {
      await dry.generate(text);
      return count;
    };
  });
  return counter;
}

/** A line cut into runs of whole sentences that Kokoro can voice whole. */
async function parts(text: string): Promise<string[]> {
  const count = await tokenCount();
  const runs: string[] = [];
  let run = '';
  for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z"])/)) {
    const longer = run ? `${run} ${sentence}` : sentence;
    if (run && (await count(longer)) > MAX_TOKENS) {
      runs.push(run);
      run = sentence;
    } else run = longer;
  }
  runs.push(run);
  for (const r of runs) if ((await count(r)) > MAX_TOKENS) throw new Error(`Too long for the voice to say in one go; split this sentence: ${r}`);
  return runs;
}

async function voiceText(text: string, voice: Voice): Promise<Pcm> {
  tts ??= KokoroTTS.from_pretrained(MODEL, { dtype: 'fp32', device: 'cpu' });
  const audio = await (await tts).generate(text, { voice: voice.name as 'af_heart', speed: voice.speed });
  return trimSilence({ rate: audio.sampling_rate, samples: audio.audio });
}

/** Voices a line (or reads it from the cache) and returns the clip. */
export async function narrate(cache: string, text: string, voice: Voice): Promise<{ file: string; pcm: Pcm; seconds: number }> {
  const runs = (await (await tokenCount())(text)) > MAX_TOKENS ? await parts(text) : [text];
  // A line voiced in parts has its own cache entry, so a clip cut short before this is not reused.
  const file = clipFile(cache, runs.length > 1 ? `${runs.join(' | ')} | in parts` : text, voice);
  if (!existsSync(file)) {
    const clips: Pcm[] = [];
    for (const run of runs) clips.push(await voiceText(run, voice));
    const rate = clips[0].rate;
    const pause = new Float32Array(Math.round(rate * SENTENCE_PAUSE));
    const pieces = clips.flatMap((c, i) => (i ? [pause, c.samples] : [c.samples]));
    const samples = new Float32Array(pieces.reduce((n, p) => n + p.length, 0));
    pieces.reduce((at, p) => (samples.set(p, at), at + p.length), 0);
    writeWav(file, { rate, samples });
  }
  const pcm = readWav(file);
  return { file, pcm, seconds: seconds(pcm) };
}
