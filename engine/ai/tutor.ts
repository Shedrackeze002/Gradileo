/**
 * The AI tutor: what it says while it walks a student through a lesson's slides, like a teacher
 * presenting, and its answers to the student's own questions. MiniMax writes both; the offline
 * versions are made from the slide text, so the tutor always works, without a key or when the API
 * fails. Runs in the browser (demo mode) and in the `ai-tutor` Edge Function.
 */
import { extractJson } from './parse.ts';
import { minimaxChat, type MiniMaxConfig } from './minimax.ts';
import { checkBeats, joinThousands } from './tutorCheck.ts';

/** Bump when the prompt changes, so narration saved under the old prompt is written again. */
export const TUTOR_PROMPT_VERSION = 2;

export const SLIDE_KINDS = ['title', 'hook', 'content', 'example', 'check', 'summary', 'video', 'link', 'end'] as const;
export type TutorSlideKind = (typeof SLIDE_KINDS)[number];

/** One slide as the tutor sees it: what appears at each step, in order. */
export interface TutorSlide {
  id: string;
  kind: TutorSlideKind;
  title: string;
  /**
   * The Markdown (maths in `$...$`) that appears at each step; one spoken beat per step. A
   * question is "[YOUR TURN] <skill>", a video "[VIDEO] <title>" and a diagram "[FIGURE]".
   */
  steps: string[];
}

/** A run of slides from one lesson, narrated in one request. */
export interface TutorChunk {
  lessonTitle: string;
  /** "Unit 2 · Trigonometry" */
  unit: string;
  slides: TutorSlide[];
}

export interface TutorScript {
  /** `rejected` lists what failed the checks (tutorCheck.ts) when a slide's lines were read from the slide instead. */
  slides: Array<{ id: string; beats: string[]; rejected?: string[] }>;
}

export interface TutorScriptResult {
  script: TutorScript;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
}

export interface TutorMessage {
  role: 'student' | 'tutor';
  text: string;
}

/** A student's question about the slide in front of them. */
export interface TutorQuestion {
  lessonTitle: string;
  unit: string;
  slideTitle: string;
  /** The slide's content as Markdown. */
  slideText: string;
  question: string;
  /** The conversation so far, oldest first. */
  history: TutorMessage[];
}

export interface TutorAnswer {
  /** Markdown with maths in `$...$`, shown on screen. */
  show: string;
  /** The same answer in plain words, for the voice. */
  say: string;
}

export interface TutorAnswerResult {
  answer: TutorAnswer;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
}

// ---------------------------------------------------------------- input limits

const LIMITS = { slides: 12, steps: 30, step: 2000, title: 200, total: 30_000, question: 500, slideText: 4000, history: 6, message: 800 };

const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Checks a chunk sent by a browser and trims it to the limits; throws when it is unusable. */
export function normalizeChunk(v: unknown): TutorChunk {
  if (!v || typeof v !== 'object') throw new Error('Missing lesson slides.');
  const o = v as Record<string, unknown>;
  if (!Array.isArray(o.slides) || o.slides.length === 0) throw new Error('Missing lesson slides.');
  if (o.slides.length > LIMITS.slides) throw new Error('Too many slides in one request.');
  let total = 0;
  const slides = o.slides.map((s): TutorSlide => {
    const x = (s ?? {}) as Record<string, unknown>;
    const kind = SLIDE_KINDS.includes(x.kind as TutorSlideKind) ? (x.kind as TutorSlideKind) : 'content';
    const raw = Array.isArray(x.steps) ? x.steps : [];
    if (raw.length > LIMITS.steps) throw new Error('A slide has too many steps.');
    const steps = raw.map((t) => text(t, LIMITS.step));
    total += steps.reduce((n, t) => n + t.length, 0);
    const id = text(x.id, 80);
    if (!id) throw new Error('A slide has no id.');
    return { id, kind, title: text(x.title, LIMITS.title), steps: steps.length ? steps : [''] };
  });
  if (total > LIMITS.total) throw new Error('These slides are too long for one request.');
  return { lessonTitle: text(o.lessonTitle, LIMITS.title), unit: text(o.unit, LIMITS.title), slides };
}

/** Checks a question sent by a browser and trims it to the limits; throws when it is empty. */
export function normalizeQuestion(v: unknown): TutorQuestion {
  const o = (v ?? {}) as Record<string, unknown>;
  const question = text(o.question, LIMITS.question);
  if (!question) throw new Error('Type a question first.');
  const history = (Array.isArray(o.history) ? o.history : [])
    .slice(-LIMITS.history)
    .map((m) => {
      const x = (m ?? {}) as Record<string, unknown>;
      return { role: x.role === 'tutor' ? 'tutor' : 'student', text: text(x.text, LIMITS.message) } as TutorMessage;
    })
    .filter((m) => m.text);
  return {
    lessonTitle: text(o.lessonTitle, LIMITS.title),
    unit: text(o.unit, LIMITS.title),
    slideTitle: text(o.slideTitle, LIMITS.title),
    slideText: text(o.slideText, LIMITS.slideText),
    question,
    history,
  };
}

// ---------------------------------------------------------------- speech

/** Reads a `{...}` group (or a single token) at `i`; returns its content and the index after it. */
function group(s: string, i: number): [string, number] {
  while (s[i] === ' ') i++;
  if (s[i] !== '{') {
    if (s[i] === '\\') {
      const m = /^\\[a-zA-Z]+/.exec(s.slice(i));
      if (m) return [m[0], i + m[0].length];
    }
    return [s[i] ?? '', i + 1];
  }
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') depth++;
    else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

const COMMANDS: Record<string, string> = {
  times: ' times ',
  cdot: ' times ',
  div: ' divided by ',
  pm: ' plus or minus ',
  mp: ' minus or plus ',
  le: ' is less than or equal to ',
  leq: ' is less than or equal to ',
  ge: ' is greater than or equal to ',
  geq: ' is greater than or equal to ',
  ne: ' is not equal to ',
  neq: ' is not equal to ',
  approx: ' is about ',
  lt: ' is less than ',
  gt: ' is greater than ',
  pi: ' pi ',
  theta: ' theta ',
  alpha: ' alpha ',
  beta: ' beta ',
  infty: ' infinity ',
  circ: ' degrees ',
  degree: ' degrees ',
  angle: ' angle ',
  triangle: ' triangle ',
  sin: ' sine ',
  cos: ' cosine ',
  tan: ' tangent ',
  log: ' log ',
  ln: ' natural log of ',
  to: ' to ',
  rightarrow: ' gives ',
  Rightarrow: ' so ',
  implies: ' so ',
  cdots: ' and so on ',
  ldots: ' and so on ',
  dots: ' and so on ',
  perp: ' is perpendicular to ',
  parallel: ' is parallel to ',
  cong: ' is congruent to ',
  sim: ' is similar to ',
  in: ' in ',
  checkmark: ' ',
};

/** LaTeX maths in plain words, for the voice: `\frac{3}{4}x^2` → "3 over 4 x squared". */
export function mathToWords(tex: string): string {
  // In cases, "&" separates a value from the condition it holds under.
  tex = tex.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, body: string) => body.replace(/&/g, ' \\text{when} '));
  let out = '';
  for (let i = 0; i < tex.length; ) {
    const c = tex[i];
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(tex.slice(i));
      const name = m?.[1] ?? '';
      i += 1 + name.length;
      if (name === 'begin' || name === 'end') {
        // The environment's name ("aligned", "cases") is not said; an array's column spec ({r}) is skipped too.
        const [env, j] = group(tex, i);
        i = j;
        if (name === 'begin' && env === 'array' && tex[i] === '{') i = group(tex, i)[1];
        out += ' ';
      } else if (name === 'overset' || name === 'underset' || name === 'stackrel') {
        // A carried digit written above another is a mark on the working; only the digit below is said.
        const [, j] = group(tex, i);
        const [b, k] = group(tex, j);
        out += ` ${mathToWords(b)} `;
        i = k;
      } else if (name === 'phantom' || name === 'hphantom' || name === 'vphantom') {
        i = group(tex, i)[1];
        out += ' ';
      } else if (name === '\\') {
        out += '; ';
      } else if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
        const [a, j] = group(tex, i);
        const [b, k] = group(tex, j);
        out += ` ${mathToWords(a)} over ${mathToWords(b)} `;
        i = k;
      } else if (name === 'sqrt') {
        let n = '';
        if (tex[i] === '[') {
          const end = tex.indexOf(']', i);
          n = tex.slice(i + 1, end < 0 ? tex.length : end).trim();
          i = end < 0 ? tex.length : end + 1;
        }
        const [a, j] = group(tex, i);
        out += ` the ${n === '3' ? 'cube' : n && n !== '2' ? `${n}th` : 'square'} root of ${mathToWords(a)} `;
        i = j;
      } else if (['text', 'mathrm', 'textbf', 'mathbf', 'operatorname', 'textit', 'overline', 'overrightarrow', 'vec', 'hat', 'boxed', 'cancel', 'bcancel', 'xcancel'].includes(name)) {
        const [a, j] = group(tex, i);
        out += name.startsWith('text') || name === 'mathrm' || name === 'operatorname' ? ` ${a} ` : ` ${mathToWords(a)} `;
        i = j;
      } else if (name === '%') out += ' percent ';
      else if (name === '$') out += '$';
      else if (name in COMMANDS) out += COMMANDS[name];
      else if (/^[a-zA-Z]+$/.test(name)) out += ' ';
      else out += ' ';
    } else if (c === '^') {
      const [g, j] = group(tex, i + 1);
      const w = mathToWords(g).trim();
      out += w === '2' ? ' squared ' : w === '3' ? ' cubed ' : w === 'degrees' ? ' degrees ' : ` to the power of ${w} `;
      i = j;
    } else if (c === '_') {
      const [g, j] = group(tex, i + 1);
      out += ` ${mathToWords(g)} `;
      i = j;
    } else if (c === '=') {
      out += ' equals ';
      i++;
    } else if (c === '+') {
      out += ' plus ';
      i++;
    } else if (c === '-' || c === '−') {
      out += /(^|[=(,]|plus|minus|times|equals|over)\s*$/.test(out.trim()) || !out.trim() ? ' negative ' : ' minus ';
      i++;
    } else if (c === '<') {
      out += ' is less than ';
      i++;
    } else if (c === '>') {
      out += ' is greater than ';
      i++;
    } else if (c === '*') {
      out += ' times ';
      i++;
    } else if (c === '/') {
      out += ' over ';
      i++;
    } else if (c === '{' || c === '}' || c === '|' || c === '&') {
      out += ' ';
      i++;
    } else {
      out += c;
      i++;
    }
  }
  return out.replace(/\s+/g, ' ').replace(/ ;/g, ';').trim();
}

/** What the voice says for working set out in columns, which it cannot read out. */
export const WORKING = 'Look at how the working is set out.';

/** Markdown with `$...$` maths as plain words for the voice. */
export function speakable(md: string): string {
  let s = md.replace(/\r\n/g, '\n');
  // Maths first, so a `$` for money (written `\$`) is left alone. Working set out in columns (an
  // array: column addition, long division) cannot be read aloud digit by digit, so it is pointed to.
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, m: string) => (/\\begin\{array\}/.test(m) ? ` ${WORKING} ` : ` ${mathToWords(m)}. `));
  s = s.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (_, pre: string, m: string) => `${pre}${mathToWords(m)}`);
  s = s.replace(/\\\$/g, '$');
  // Tables: a row is read as a list; the line under the header is dropped.
  s = s
    .split('\n')
    .filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l))
    .map((l) => (/^\s*\|/.test(l) ? `${l.replace(/^\s*\||\|\s*$/g, '').split('|').map((x) => x.trim()).filter(Boolean).join(', ')}.` : l))
    .join('\n');
  s = s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*(?:[-*+]|\d+[.)])\s+/gm, '')
    .replace(/(\*\*|__|\*|`)/g, '');
  // "4 572 306" is one number; with its spaces the voice says three.
  return joinThousands(
    s
      .split(/\n{2,}/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .map((p) => (/[.!?:;]$/.test(p) ? p : `${p}.`))
      .join(' '),
  );
}

// ---------------------------------------------------------------- offline narration

const tag = (step: string, t: string) => step.startsWith(`[${t}]`);

/** What the tutor says at each step without the AI: the step's own words, with a lead-in. */
export function offlineBeats(slide: TutorSlide, lessonTitle: string): string[] {
  return slide.steps.map((step, k) => {
    if (slide.kind === 'title') return `Hi! Today’s lesson is ${speakable(lessonTitle).replace(/[.!?]+$/, '')}. I’m your AI tutor, and we’ll go through it together, one step at a time. You can pause me whenever you like, and ask me a question at any point.`;
    if (slide.kind === 'end') return 'Great work! You’ve finished this lesson. Now practise its skills: each question has hints and a worked solution, and that is how you build mastery.';
    if (tag(step, 'YOUR TURN')) return 'Your turn! Try this question on your own. Take your time, and press Check when you’re ready.';
    if (tag(step, 'VIDEO')) return 'Here’s a short video that explains this part. Press play, and when it’s finished, press Continue.';
    if (tag(step, 'FIGURE')) return 'Take a look at this diagram.';
    if (slide.kind === 'link') return 'Here’s an activity to explore. Have a go, then press Continue.';
    // A table read cell by cell is hard to follow; the student reads it on screen.
    const table = /^\s*\|/m.test(step);
    const said = speakable(table ? step.split('\n').filter((l) => !/^\s*\|/.test(l)).join('\n') : step);
    if (!said) return table ? 'Take a look at this table.' : 'Take a look at this.';
    if (table) return `${said} Take a look at the table.`;
    if (slide.kind === 'example' && k === 0) return `Let’s work through an example. ${said}`;
    if (slide.kind === 'summary' && k === 0) return `Let’s sum up. ${said}`;
    if (slide.kind === 'hook' && k === 0) return `Let’s begin. ${said}`;
    return said;
  });
}

export function offlineScript(chunk: TutorChunk): TutorScript {
  return { slides: chunk.slides.map((s) => ({ id: s.id, beats: offlineBeats(s, chunk.lessonTitle) })) };
}

// ---------------------------------------------------------------- the recorded voice

/**
 * The tutor speaks with the explainer videos' voice. Every lesson's narration is recorded ahead of
 * time (video/tools/tutor-voice.ts) into one audio file, and a manifest says where each line is;
 * both are served next to the app at `tutor/<lessonId>.json`.
 */
export const TUTOR_VOICE_VERSION = 1;

/** What the tutor says that is not about one slide; recorded into every lesson's audio. */
export const TUTOR_PHRASES = {
  'praise-1': 'That’s right, well done! Let’s keep going.',
  'praise-2': 'Yes, that’s correct. Great work! Let’s keep going.',
  'praise-3': 'Correct! Nicely done. Let’s keep going.',
  'praise-4': 'Spot on. Well done! Let’s keep going.',
  wrong: 'Not quite, and that’s okay: mistakes are how we learn. Look at the solution, try another question, or ask me to explain where it went wrong. Press Continue when you’re ready.',
  answer: 'Good question! I’ve written my answer for you here. Have a read, and ask me again if anything is unclear.',
} as const;
export type TutorPhrase = keyof typeof TUTOR_PHRASES;
export const PRAISE_PHRASES: TutorPhrase[] = ['praise-1', 'praise-2', 'praise-3', 'praise-4'];

/** Where a line is in a lesson's recording: start and end, in seconds. */
export type Clip = [number, number];

export interface TutorVoiceSlide {
  /** What the tutor says at each step, as the captions show it. */
  beats: string[];
  /** Where each beat is in the recording; null for a step with nothing to say. */
  clips: Array<Clip | null>;
  /** Whether MiniMax wrote the beats; false when they were read from the slide instead. */
  ai: boolean;
}

export interface TutorVoice {
  v: number;
  lessonId: string;
  /** The recording's file name, in the same folder as the manifest. */
  audio: string;
  voice: { name: string; speed: number };
  /** Changes whenever anything recorded does. */
  hash: string;
  /** Keyed by tutorSlideKey, so a slide that changes (or a teacher's own slide) is simply not found. */
  slides: Record<string, TutorVoiceSlide>;
  phrases: Partial<Record<TutorPhrase, Clip>>;
  /** The TUTOR_PROMPT_VERSION MiniMax's lines were written with; lines from an older prompt are written again. */
  prompt?: number;
}

/** cyrb53: a 53-bit string hash, the same in the browser and in Node. */
export function hash53(s: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/** A slide's key in a recording; it changes when anything the slide shows does. */
export function tutorSlideKey(s: Pick<TutorSlide, 'kind' | 'title' | 'steps'>): string {
  return hash53(JSON.stringify([s.kind, s.title, s.steps]));
}

const isClip = (c: unknown): c is Clip => Array.isArray(c) && c.length === 2 && c.every((x) => typeof x === 'number' && Number.isFinite(x) && x >= 0) && c[1] > c[0];

/** A manifest fetched from the site, checked; null when it is missing, old or malformed. */
export function parseTutorVoice(raw: unknown, lessonId: string): TutorVoice | null {
  const o = (raw ?? {}) as Record<string, unknown>;
  if (o.v !== TUTOR_VOICE_VERSION || o.lessonId !== lessonId || typeof o.audio !== 'string' || !/^[\w.-]+\.mp3$/.test(o.audio)) return null;
  if (!o.slides || typeof o.slides !== 'object') return null;
  const slides: Record<string, TutorVoiceSlide> = {};
  for (const [key, v] of Object.entries(o.slides as Record<string, unknown>)) {
    const s = (v ?? {}) as Record<string, unknown>;
    if (!Array.isArray(s.beats) || !Array.isArray(s.clips) || s.beats.length !== s.clips.length) continue;
    slides[key] = { beats: s.beats.map((b) => (typeof b === 'string' ? b : '')), clips: s.clips.map((c) => (isClip(c) ? c : null)), ai: s.ai === true };
  }
  const phrases: Partial<Record<TutorPhrase, Clip>> = {};
  for (const [id, c] of Object.entries((o.phrases ?? {}) as Record<string, unknown>)) if (id in TUTOR_PHRASES && isClip(c)) phrases[id as TutorPhrase] = c;
  const voice = (o.voice ?? {}) as Record<string, unknown>;
  return {
    v: TUTOR_VOICE_VERSION,
    lessonId,
    audio: o.audio,
    voice: { name: String(voice.name ?? ''), speed: Number(voice.speed) || 1 },
    hash: String(o.hash ?? ''),
    slides,
    phrases,
    ...(typeof o.prompt === 'number' ? { prompt: o.prompt } : {}),
  };
}

// ---------------------------------------------------------------- prompts

const VOICE_RULES = `- Your words are read aloud by a text-to-speech voice. Write maths in words ("x squared plus three x", "three quarters", "negative five", "forty percent", "the square root of two"), never LaTeX, symbols, emoji or Markdown.
- Never mention course names, grade levels, countries or real places, and never ask for personal information.`;

export function scriptPrompt(chunk: TutorChunk): { system: string; user: string } {
  return {
    system: `You are a friendly, patient mathematics tutor for school students (about 10 to 18 years old) anywhere in the English-speaking world. You are taking ONE student through a lesson on screen, the way a good teacher presents slides. Each slide shows its content in numbered steps; for every step you write what you SAY while that step appears.
Rules:
- Talk to the student ("you", "we"), warmly and encouragingly, never patronising.
- Teach, don't just read: say what the step shows and why it matters, in plain words. One to three short sentences per step (at most 55 words).
- Beat n is said while step n appears, so it is about step n only: never sum up, repeat or run ahead to the next step. In a worked example the first step is the question, so the first beat says what is being asked, before any working.
- Use only the facts, numbers and examples on the slides; never invent new ones, and never state a calculation or a fact the slide does not show. In a worked example, explain the reasoning of each step as it appears, and give the answer only when the step shows it.
- Say every number exactly as the slide has it, in full, without rounding or dropping a digit: 5 273.468 is "five thousand two hundred seventy-three and four hundred sixty-eight thousandths" (or "five thousand two hundred seventy-three point four six eight"), never "five thousand two hundred seventy-three and four hundred sixty-eight".
- Never say "and" inside a whole number: 306 is "three hundred six", not "three hundred and six". "And" is only for the decimal point.
- Speak in full sentences; never just read out a heading or a label on its own.
- A step that starts [YOUR TURN] is a question the student answers on screen: invite them to try it on their own and press Check. Never give or hint at its answer.
- A step that starts [VIDEO] is an explainer video: introduce it in one sentence, then tell them to press play and press Continue when it ends.
- A step that starts [FIGURE] is a diagram: say what to look at in it.
- The title slide welcomes the student and says what the lesson is about; the end slide congratulates them and suggests practising the lesson's skills.
${VOICE_RULES}
Output ONLY one JSON object, no prose and no code fences: {"slides":[{"id": string, "beats": [{"n": number, "say": string}, ...]}]}, with the slides in the order given, the same ids, and exactly one beat per step, numbered like the steps.`,
    user: `Lesson: ${chunk.lessonTitle}${chunk.unit ? `\nUnit: ${chunk.unit}` : ''}\n\nSLIDES:\n${JSON.stringify(chunk.slides.map((s) => ({ id: s.id, kind: s.kind, title: s.title, steps: s.steps.map((show, k) => ({ n: k + 1, show })) })))}`,
  };
}

export function questionPrompt(q: TutorQuestion): { system: string; user: string } {
  return {
    system: `You are a friendly, patient mathematics tutor for school students (about 10 to 18 years old). The student is working through a lesson with you and has a question about the slide in front of them.
Rules:
- Answer the question simply and correctly, step by step, using the ideas and methods on the slide. Keep it short: under 120 words.
- If they ask for the answer to a "Your turn" question they have not checked yet, don't give the final answer: give a hint and the first step, and encourage them to finish it. If they have already checked it and tell you the correct answer, explain the method and where their answer went wrong.
- If the question is not about mathematics or this lesson, kindly bring them back to the lesson.
- If you are not sure, say so and suggest how they could check.
${VOICE_RULES}
Output ONLY one JSON object, no prose and no code fences: {"show": string (the answer for the screen, Markdown with maths in $...$), "say": string (the same answer in plain spoken words, no symbols)}.`,
    user: JSON.stringify({ lesson: q.lessonTitle, unit: q.unit, slide: { title: q.slideTitle, content: q.slideText }, conversation: q.history, question: q.question }),
  };
}

// ---------------------------------------------------------------- parsing

/** A beat for the voice: anything that still looks like maths or Markdown is put in words. */
function cleanBeat(v: unknown): string {
  // A model sometimes starts a line with the step's tag ("[VIDEO] Watch…").
  const t = text(v, 600).replace(/^\[(YOUR TURN|VIDEO|FIGURE)\]\s*/i, '');
  if (t.includes('$') || /[*_#|`]/.test(t)) return speakable(t);
  if (/\\[a-zA-Z]/.test(t)) return mathToWords(t);
  return t;
}

/** What is wrong with lines written for a slide, checked against the slide's own words (tutorCheck.ts); empty when nothing is. */
export function slideProblems(s: TutorSlide, lessonTitle: string, beats: string[]): string[] {
  return checkBeats([lessonTitle, s.title].map(speakable), s.steps.map(speakable), beats);
}

/**
 * The model's script, checked against the slides: a slide it gets wrong (left out, or with a line
 * that fails the checks in tutorCheck.ts) comes from the offline narration, and a missing beat
 * from the slide's step.
 */
export function parseScript(raw: unknown, chunk: TutorChunk): TutorScript {
  const offline = offlineScript(chunk);
  const got = new Map<string, unknown[]>();
  const list = raw && typeof raw === 'object' && Array.isArray((raw as { slides?: unknown }).slides) ? ((raw as { slides: unknown[] }).slides) : [];
  for (const s of list) {
    const o = (s ?? {}) as Record<string, unknown>;
    if (typeof o.id !== 'string' || !Array.isArray(o.beats)) continue;
    // Beats come as {"n", "say"}, placed by their step number, or as plain strings in order.
    const beats: unknown[] = [];
    o.beats.forEach((b, k) => {
      const n = b && typeof b === 'object' ? Number((b as Record<string, unknown>).n) : NaN;
      const at = Number.isInteger(n) && n >= 1 && n <= LIMITS.steps ? n - 1 : k;
      beats[at] = b && typeof b === 'object' ? (b as Record<string, unknown>).say : b;
    });
    got.set(o.id, beats);
  }
  if (!got.size) throw new Error('The tutor script had no slides');
  return {
    slides: chunk.slides.map((s, i) => {
      const written = got.get(s.id);
      const fallback = offline.slides[i].beats;
      const beats = s.steps.map((_, k) => (written && k < written.length ? cleanBeat(written[k]) : '') || fallback[k]);
      const rejected = slideProblems(s, chunk.lessonTitle, beats);
      return rejected.length ? { id: s.id, beats: fallback, rejected } : { id: s.id, beats };
    }),
  };
}

export function parseAnswer(raw: unknown): TutorAnswer {
  const o = (raw ?? {}) as Record<string, unknown>;
  const show = text(o.show, 3000);
  const say = cleanBeat(o.say) || speakable(show);
  if (!show && !say) throw new Error('The tutor gave no answer');
  return { show: show || say, say };
}

export const OFFLINE_ANSWER: TutorAnswer = {
  show: 'I can’t answer new questions right now. Try going back a step and reading it again, or look at the worked example on the slides. When you practise this lesson’s skills, every question has hints and a full worked solution.',
  say: 'I can’t answer new questions right now. Try going back a step and reading it again, or look at the worked example. When you practise this lesson’s skills, every question has hints and a full worked solution.',
};

// ---------------------------------------------------------------- calls

/** The narration for a chunk of slides: MiniMax when configured, else (or on any failure) offline. */
export async function writeTutorScript(chunk: TutorChunk, ai?: MiniMaxConfig | null): Promise<TutorScriptResult> {
  if (!ai?.apiKey) return { script: offlineScript(chunk), source: 'offline', model: null };
  try {
    const p = scriptPrompt(chunk);
    const res = await minimaxChat({ ...ai, maxTokens: 6000, timeoutMs: 110_000, temperature: 0.5 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    return { script: parseScript(extractJson(res.content), chunk), source: 'minimax', model: res.model };
  } catch (e) {
    return { script: offlineScript(chunk), source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/** The tutor's answer to a student's question: MiniMax when configured, else a helpful offline reply. */
export async function answerTutorQuestion(q: TutorQuestion, ai?: MiniMaxConfig | null): Promise<TutorAnswerResult> {
  if (!ai?.apiKey) return { answer: OFFLINE_ANSWER, source: 'offline', model: null };
  try {
    const p = questionPrompt(q);
    const res = await minimaxChat({ ...ai, maxTokens: 1500, timeoutMs: 45_000, temperature: 0.4 }, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    return { answer: parseAnswer(extractJson(res.content)), source: 'minimax', model: res.model };
  } catch (e) {
    return { answer: OFFLINE_ANSWER, source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}
