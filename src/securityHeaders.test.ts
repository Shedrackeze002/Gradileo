// The site's Content-Security-Policy allows index.html's one inline script by its hash, so an edit
// to that script must update public/_headers too.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

describe('security headers', () => {
  const headers = read('public/_headers');
  const csp = headers.match(/^\s+Content-Security-Policy(?:-Report-Only)?: (.+)$/m)?.[1] ?? '';

  it('allows every inline script in index.html by its hash', () => {
    const scripts = [...read('index.html').matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const s of scripts) expect(csp).toContain(`'sha256-${createHash('sha256').update(s).digest('base64')}'`);
  });

  it('keeps the basic protections on every page', () => {
    for (const h of ['Strict-Transport-Security', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy']) expect(headers).toContain(`${h}:`);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");
  });
});
