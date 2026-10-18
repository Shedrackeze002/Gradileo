/**
 * A pronunciation check: Whisper transcribes each narrated line and the words are compared with
 * the script. Lines that differ are listed for someone to listen to; homophones (sine and sign)
 * and number formats are allowed for.
 */
import { pipeline, type AutomaticSpeechRecognitionPipeline } from '@huggingface/transformers';
import type { Pcm } from './wav.ts';

export { normalise, wer } from '../../src/video/words.ts';

let asr: Promise<AutomaticSpeechRecognitionPipeline> | null = null;

function to16k({ rate, samples }: Pcm): Float32Array {
  const n = Math.round((samples.length * 16000) / rate);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const s = (i * rate) / 16000;
    const j = Math.floor(s);
    const f = s - j;
    out[i] = (samples[j] ?? 0) * (1 - f) + (samples[j + 1] ?? 0) * f;
  }
  return out;
}

// The library's overloads are too large for TypeScript to resolve, so the call is typed by hand.
const load = pipeline as unknown as (task: 'automatic-speech-recognition', model: string, options: { dtype: 'fp32' }) => Promise<AutomaticSpeechRecognitionPipeline>;

export async function transcribe(pcm: Pcm): Promise<string> {
  asr ??= load('automatic-speech-recognition', 'onnx-community/whisper-base.en', { dtype: 'fp32' });
  const audio = to16k(pcm);
  // Whisper hears 30 seconds at a time, so a longer line is heard in overlapping windows.
  const r = await (await asr)(audio, audio.length > 30 * 16000 ? { chunk_length_s: 30, stride_length_s: 5 } : undefined);
  return (Array.isArray(r) ? r[0].text : r.text).trim();
}
