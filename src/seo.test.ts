// What search engines and link previews read from gradileo.com: robots.txt, the sitemap, the
// preview tags and the structured data in index.html.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

/** Google's reading of robots.txt: the longest matching rule wins, and "$" ends a path. */
function blocked(robots: string, path: string): boolean {
  const rules = robots
    .split('\n')
    .map((l) => l.trim().match(/^(Allow|Disallow):\s*(\S+)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map(([, kind, rule]) => ({ allow: kind === 'Allow', rule, re: new RegExp('^' + rule.replace(/[.*+?^{}()|[\]\\]/g, (c) => (c === '*' ? '.*' : `\\${c}`)).replace(/\\\$$|\$$/, '$')) }))
    .filter((r) => r.re.test(path))
    .sort((a, b) => b.rule.length - a.rule.length);
  return !!rules[0] && !rules[0].allow;
}

describe('robots.txt', () => {
  const robots = read('public/robots.txt');

  it('keeps the public pages open', () => {
    for (const p of ['/', '/signup', '/login', '/privacy', '/terms', '/sitemap.xml']) expect(blocked(robots, p), p).toBe(false);
  });

  it('keeps the signed-in pages and private links out', () => {
    for (const p of ['/t', '/t/c/abc/students', '/s', '/s/learn/m10-1-1', '/admin', '/present/c1/m10-1-1', '/report/tok', '/join/ABC123', '/settings']) expect(blocked(robots, p), p).toBe(true);
  });

  it('points to the sitemap', () => {
    expect(robots).toMatch(/^Sitemap: https:\/\/gradileo\.com\/sitemap\.xml$/m);
  });
});

describe('index.html', () => {
  const html = read('index.html');

  it('has a title, description and link preview', () => {
    expect(html).toMatch(/<title>[^<]*Physics[^<]*<\/title>/);
    for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) expect(html).toContain(`property="${p}"`);
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });

  it('describes the organisation in valid structured data', () => {
    const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    const data = JSON.parse(block ?? '');
    const org = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Organization');
    expect(org.url).toBe('https://gradileo.com/');
    expect(org.sameAs).toContain('https://www.youtube.com/@Gradileo');
  });
});
