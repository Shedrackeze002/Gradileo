// The monthly Search Console report (the Search Console report workflow). It reads the last 28
// days of Google searches that showed gradileo.com and writes a Markdown report of what to improve:
//
//   - pages on page 2: queries where a page shows on average at position 8 to 20 with enough
//     impressions that moving up a few places would bring real visitors;
//   - low click-through: queries on page 1 that are seen often but rarely clicked, where a better
//     title or description in src/seo/overrides.json would help;
//   - the pages that bring the most visitors, and totals compared with the 28 days before.
//
// It signs in as a Google service account that has been added to the Search Console property, with
// the key in GSC_SERVICE_ACCOUNT_KEY (the JSON file Google gives, as one secret). The key is only
// read from the environment and never printed.
//
//   node scripts/search-console-report.mjs report.md
import { createSign } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const SITE = process.env.GSC_SITE || 'sc-domain:gradileo.com';
const out = process.argv[2] || 'search-console-report.md';

const raw = process.env.GSC_SERVICE_ACCOUNT_KEY;
if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT_KEY is not set, so there is no report. See docs/SETUP.md ("Search Console report").');
  process.exit(0);
}
const key = JSON.parse(raw);

const b64url = (b) => Buffer.from(b).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({ iss: key.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const sign = createSign('RSA-SHA256');
  sign.update(`${head}.${claims}`);
  const jwt = `${head}.${claims}.${b64url(sign.sign(key.private_key))}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  if (!res.ok) throw new Error(`Google sign-in failed: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).access_token;
}

const token = await accessToken();

async function query(startDate, endDate, dimensions, rowLimit = 25000) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, dataState: 'final' }),
  });
  if (res.status === 403) throw new Error(`Search Console refused (HTTP 403). Add ${key.client_email} as a user of ${SITE} in Search Console (Settings, Users and permissions).`);
  if (!res.ok) throw new Error(`Search Console query failed: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).rows ?? [];
}

// Search Console's data is final about three days after the day.
const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);
const [end, start, prevEnd, prevStart] = [day(3), day(30), day(31), day(58)];

const [rows, pages, now, before] = await Promise.all([
  query(start, end, ['query', 'page']),
  query(start, end, ['page']),
  query(start, end, []),
  query(prevStart, prevEnd, []),
]);

const path = (url) => url.replace(/^https:\/\/(www\.)?gradileo\.com/, '') || '/';
const pct = (x) => `${(x * 100).toFixed(1)}%`;
const pos = (x) => x.toFixed(1);
const total = (r) => r[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
const T = total(now);
const P = total(before);

const pageTwo = rows
  .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 20)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);
const lowCtr = rows
  .filter((r) => r.position < 8 && r.impressions >= 50 && r.ctr < 0.02)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20);
const top = [...pages].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 15);

const table = (head, list, row) => (list.length ? [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...list.map((r) => `| ${row(r).join(' | ')} |`)].join('\n') : '_None this month._');
const cell = (s) => String(s).replace(/\|/g, '\\|');

const report = `# Search Console report, ${start} to ${end}

Google showed gradileo.com **${T.impressions.toLocaleString('en')}** times and sent **${T.clicks.toLocaleString('en')}** visits (click-through ${pct(T.ctr)}, average position ${pos(T.position)}). In the 28 days before: ${P.impressions.toLocaleString('en')} impressions and ${P.clicks.toLocaleString('en')} visits.

## Pages on page 2

Queries where a page sits on average at position 8 to 20 with at least 20 impressions. Moving these up a few places brings the most new visitors: check that the lesson answers the query early (a clear definition first), link to it from related lessons, and give it a title and description that use the searcher's words (\`src/seo/overrides.json\`).

${table(['Query', 'Page', 'Impressions', 'Clicks', 'Position'], pageTwo, (r) => [cell(r.keys[0]), path(r.keys[1]), r.impressions, r.clicks, pos(r.position)])}

## Seen but rarely clicked

Queries on page 1 with at least 50 impressions and a click-through under 2%. The page ranks, so its title and description are what to change.

${table(['Query', 'Page', 'Impressions', 'Click-through', 'Position'], lowCtr, (r) => [cell(r.keys[0]), path(r.keys[1]), r.impressions, pct(r.ctr), pos(r.position)])}

## Pages that bring the most visitors

${table(['Page', 'Clicks', 'Impressions', 'Position'], top, (r) => [path(r.keys[0]), r.clicks, r.impressions, pos(r.position)])}
`;

writeFileSync(out, report);
console.log(`Report written to ${out}: ${T.clicks} clicks, ${T.impressions} impressions, ${pageTwo.length} page-2 queries, ${lowCtr.length} low click-through queries.`);
