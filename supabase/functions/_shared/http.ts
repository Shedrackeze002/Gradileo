/** HTTP helpers shared by the Gradileo Edge Functions. */

const allowed = (Deno.env.get('ALLOWED_ORIGINS') ?? '*').split(',').map((s) => s.trim()).filter(Boolean);

function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allow = allowed.includes('*') ? '*' : allowed.includes(origin) ? origin : allowed[0] ?? '';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function serve(fn: (req: Request) => Promise<unknown>) {
  Deno.serve(async (req) => {
    const cors = corsFor(req);
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
    const respond = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
    try {
      return respond(await fn(req));
    } catch (e) {
      if (e instanceof HttpError) return respond({ error: e.message }, e.status);
      console.error(e);
      return respond({ error: 'Something went wrong. Please try again.' }, 500);
    }
  });
}

export async function readJson(req: Request, maxLength = 1_000_000): Promise<Record<string, unknown>> {
  const text = await req.text();
  if (text.length > maxLength) throw new HttpError(413, 'Request is too large.');
  try {
    const v = text ? JSON.parse(text) : {};
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error();
    return v as Record<string, unknown>;
  } catch {
    throw new HttpError(400, 'Invalid JSON body.');
  }
}

/** Run work after the response is sent when the runtime supports it. */
export function background(p: Promise<unknown>) {
  const rt = (globalThis as { EdgeRuntime?: { waitUntil(p: Promise<unknown>): void } }).EdgeRuntime;
  const safe = p.catch((e) => console.error('background task failed', e));
  if (rt?.waitUntil) rt.waitUntil(safe);
}
