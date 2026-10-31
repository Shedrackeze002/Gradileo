/**
 * An iPad or iPhone, in any browser: every browser there runs on Safari's engine. iPadOS reports
 * itself as a Mac to websites, so a Mac with a touch screen is an iPad.
 */
export function appleTouchDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
}

/** Opened from the Home Screen as its own app, without the browser's bars. */
export function homeScreenApp(): boolean {
  if (typeof window === 'undefined') return false;
  const mode = (m: string) => !!window.matchMedia?.(`(display-mode: ${m})`).matches;
  return mode('standalone') || mode('fullscreen') || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}
