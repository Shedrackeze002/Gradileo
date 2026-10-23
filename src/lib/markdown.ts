/**
 * Markdown + KaTeX rendering. Math is extracted before Markdown parsing so that
 * characters like _ and * inside LaTeX are never mangled.
 */
import katex from 'katex';
// Chemistry in the maths: \ce{H2SO4}, \ce{2H2 + O2 -> 2H2O}.
import 'katex/contrib/mhchem';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({ gfm: true, breaks: false });

const cache = new Map<string, string>();
const MAX_CACHE = 800;

function renderTex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore', output: 'html' });
  } catch {
    return `<code>${tex.replace(/</g, '&lt;')}</code>`;
  }
}

export function renderMath(tex: string, display = false): string {
  const key = `${display ? 'D' : 'I'}::${tex}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const html = renderTex(tex, display);
  if (cache.size > MAX_CACHE) cache.clear();
  cache.set(key, html);
  return html;
}

/**
 * Render Markdown with $inline$ and $$display$$ math. `\$` is a literal dollar sign.
 * The HTML is always sanitized: lessons can include teacher edits approved by an administrator,
 * and sanitizing leaves Gradileo's own lessons and questions unchanged (checked for every lesson and
 * generated question). `sanitize` is kept for callers that mark user-authored content.
 */
export function renderMarkdown(md: string, opts: { inline?: boolean; sanitize?: boolean } = {}): string {
  const key = `${opts.inline ? 'i' : 'b'}::${md}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const maths: string[] = [];
  let src = md.replace(/\\\$/g, '\u0000DOLLAR\u0000');
  src = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => {
    maths.push(renderTex(tex.trim(), true));
    return `\u0000M${maths.length - 1}\u0000`;
  });
  src = src.replace(/\$([^$\n]+?)\$/g, (_, tex: string) => {
    maths.push(renderTex(tex.trim(), false));
    return `\u0000M${maths.length - 1}\u0000`;
  });
  let html = opts.inline ? (marked.parseInline(src) as string) : (marked.parse(src) as string);
  html = html.replace(/\u0000M(\d+)\u0000/g, (_, i: string) => maths[Number(i)]).replace(/\u0000DOLLAR\u0000/g, '$');
  // Wrap tables for horizontal scrolling on small screens.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  html = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
  if (cache.size > MAX_CACHE) cache.clear();
  cache.set(key, html);
  return html;
}
