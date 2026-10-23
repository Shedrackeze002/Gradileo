/**
 * Minimal MiniMax Chat Completions client (OpenAI-compatible endpoint).
 * Runs in Deno (Supabase Edge Functions) and in the browser.
 *
 * Docs: https://platform.minimax.io/docs/api-reference/text-chat-openai
 */

export interface MiniMaxConfig {
  apiKey: string;
  /** Default: MiniMax-M3.1-Flash */
  model?: string;
  /** Default: https://api.minimax.io (international). Mainland China: https://api.minimax.cn */
  baseUrl?: string;
  /** low | medium | high | xhigh | max — lower is faster and cheaper. */
  reasoningEffort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
}

export const DEFAULT_MODEL = 'MiniMax-M3.1-Flash';
export const DEFAULT_BASE_URL = 'https://api.minimax.io';

/** A piece of a message: text, or an image as a data URL (PNG or JPEG) for the model to read. */
export type ChatPart = { type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } };

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ChatPart[];
}

export interface ChatResult {
  content: string;
  model: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
}

export async function minimaxChat(cfg: MiniMaxConfig, messages: ChatMessage[]): Promise<ChatResult> {
  const url = `${(cfg.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')}/v1/chat/completions`;
  const model = cfg.model ?? DEFAULT_MODEL;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), cfg.timeoutMs ?? 90_000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        temperature: cfg.temperature ?? 0.4,
        max_completion_tokens: cfg.maxTokens ?? 4000,
        reasoning_effort: cfg.reasoningEffort ?? 'low',
        // Keep the model's reasoning out of `content` (M3.1 Flash always reasons first).
        reasoning_split: true,
      }),
      signal: controller.signal,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`MiniMax API error ${res.status}: ${text.slice(0, 400)}`);
    const json = JSON.parse(text) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
      usage?: ChatResult['usage'];
      base_resp?: { status_code?: number; status_msg?: string };
    };
    if (json.base_resp && json.base_resp.status_code && json.base_resp.status_code !== 0) {
      throw new Error(`MiniMax API error ${json.base_resp.status_code}: ${json.base_resp.status_msg ?? ''}`);
    }
    const content = json.choices?.[0]?.message?.content ?? '';
    if (!content) throw new Error('MiniMax returned an empty response');
    return { content, model: json.model ?? model, usage: json.usage };
  } finally {
    clearTimeout(timer);
  }
}
