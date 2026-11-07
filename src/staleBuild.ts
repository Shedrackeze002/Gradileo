/**
 * After a new version of the site goes live, a tab opened earlier still asks for the old build's
 * code files, which no longer exist, so a lazily loaded page or a lesson's question generators
 * fail to load and the screen stays blank. Reload once to pick up the new build. The guard stops a
 * loop when the failure has another cause (offline, a real outage).
 */
const KEY = 'gradileo.staleReloadAt';
const WINDOW_MS = 60_000;

/** Reloads the page unless it already did so in the last minute. Returns true when it reloads. */
export function reloadForNewBuild(): boolean {
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(KEY) ?? 0);
  } catch {
    /* storage blocked: still reload, the guard below is best effort */
  }
  if (Date.now() - last < WINDOW_MS) return false;
  try {
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
  window.location.reload();
  return true;
}

export function watchForNewBuild(): void {
  window.addEventListener('vite:preloadError', (event) => {
    if (reloadForNewBuild()) event.preventDefault();
  });
}
