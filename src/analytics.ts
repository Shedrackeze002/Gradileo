/**
 * Cloudflare Web Analytics: counts page views and visitors on gradileo.com without cookies,
 * fingerprinting or personal data (see the privacy policy, section 6). It runs only in a
 * production build that has a site token (VITE_CF_BEACON_TOKEN, set as a repository variable
 * and written into the build by the deploy workflow) and only on the live domain, so the demo,
 * local development and the tests are never counted. The beacon follows the app's page changes
 * by itself, so each screen a visitor opens counts as a page view.
 */
const LIVE_HOSTS = ['gradileo.com', 'www.gradileo.com'];

/** The beacon's settings for this page, or null when this page must not be counted. */
export function beaconSettings(token: string | undefined, host: string, production: boolean): string | null {
  const site = token?.trim();
  if (!production || !site || !LIVE_HOSTS.includes(host)) return null;
  return JSON.stringify({ token: site, spa: true });
}

export function startAnalytics(): void {
  const settings = beaconSettings(import.meta.env.VITE_CF_BEACON_TOKEN, window.location.hostname, import.meta.env.PROD);
  if (!settings || document.querySelector('script[data-cf-beacon]')) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', settings);
  document.head.appendChild(script);
}
