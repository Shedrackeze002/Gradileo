// Writes Gradileo's public pages into dist/ after the app is built: a page for every lesson, one
// for every course, the list of courses and the sitemap (src/seo/pages.tsx). They are plain HTML
// that uses the app's stylesheet, so search engines read each lesson without signing in.
//
// The explainer videos on each lesson page are the ones on YouTube, read from the video_links
// table with the site's public key. Without the backend (a build with no Supabase settings, or
// no network) the pages are written without videos.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, loadEnv } from 'vite';

const DIST = 'dist';
const base = process.env.BASE_PATH ?? '/';

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** JSON for a <script> block: "<" is escaped so no text in it can close the block. */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

async function videoLinks() {
  // A saved copy of the table, for previewing the pages without the backend.
  if (process.env.VIDEO_LINKS_FILE) return JSON.parse(readFileSync(process.env.VIDEO_LINKS_FILE, 'utf8'));
  const env = loadEnv('production', process.cwd(), 'VITE_');
  const url = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('Public pages: no Supabase settings, so the lesson pages have no videos.');
    return [];
  }
  const rows = [];
  try {
    for (let from = 0; ; from += 1000) {
      const res = await fetch(`${url}/rest/v1/video_links?select=video_id,youtube_id,updated_at&order=video_id`, {
        headers: { apikey: key, authorization: `Bearer ${key}`, range: `${from}-${from + 999}`, 'range-unit': 'items' },
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const page = await res.json();
      rows.push(...page);
      if (page.length < 1000) break;
    }
  } catch (e) {
    console.warn(`Public pages: the video links could not be read (${e.message}), so the lesson pages have no videos.`);
    return [];
  }
  return rows;
}

function lessonSources() {
  const sources = new Map();
  for (const course of readdirSync('src/content', { withFileTypes: true })) {
    if (!course.isDirectory()) continue;
    let files = [];
    try {
      files = readdirSync(join('src/content', course.name, 'lessons'));
    } catch {
      continue;
    }
    for (const f of files) if (f.endsWith('.md')) sources.set(f.slice(0, -3), readFileSync(join('src/content', course.name, 'lessons', f), 'utf8'));
  }
  return sources;
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');
// The app's stylesheets and the theme script (which the Content-Security-Policy allows by its hash).
const styles = [...shell.matchAll(/<link rel="stylesheet"[^>]*>/g)].map((m) => m[0]).join('\n    ');
const themeScript = shell.match(/<script>[\s\S]*?<\/script>/)?.[0] ?? '';
const favicon = shell.match(/<link rel="icon"[^>]*>/)?.[0] ?? '';

// Vite would load react-router-dom's CommonJS build, whose named exports Node cannot read, so it
// is pointed at the ES module build (the lesson blocks import it for their buttons).
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  mode: 'production',
  // No dependency pre-bundling: it is for the browser, and it complains when the server closes.
  optimizeDeps: { noDiscovery: true, include: [] },
  logLevel: 'error',
  resolve: { alias: { 'react-router-dom': fileURLToPath(new URL('../node_modules/react-router-dom/dist/index.mjs', import.meta.url)) } },
});
let pages;
try {
  const { buildPublicPages, SITE } = await vite.ssrLoadModule('/src/seo/pages.tsx');
  const links = await videoLinks();
  pages = await buildPublicPages(lessonSources(), links);

  for (const p of pages) {
    const url = SITE + p.path;
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${escapeHtml(p.title)}</title>
    <meta name="description" content="${escapeHtml(p.description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#6a43e3" />
    ${favicon}
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Gradileo" />
    <meta property="og:title" content="${escapeHtml(p.title)}" />
    <meta property="og:description" content="${escapeHtml(p.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    ${themeScript}
    ${styles}
    <script type="application/ld+json">${jsonLd(p.data)}</script>
  </head>
  <body>
    ${p.body}
  </body>
</html>
`;
    const out = join(DIST, p.file);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, base === '/' ? html : html.replace(/href="\/(?!\/)/g, `href="${base}`));
  }

  const listed = ['/', '/signup', '/privacy', '/terms', ...pages.filter((p) => p.listed).map((p) => p.path)];
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n')}\n</urlset>\n`,
  );
  const lessons = pages.filter((p) => p.path.startsWith('/lessons/')).length;
  const withVideo = pages.filter((p) => p.path.startsWith('/lessons/') && /"VideoObject"/.test(JSON.stringify(p.data))).length;
  console.log(`Public pages written: ${lessons} lessons (${withVideo} with videos), ${pages.length - lessons - 1} courses and the course list; sitemap has ${listed.length} addresses.`);
} finally {
  await vite.close();
}
