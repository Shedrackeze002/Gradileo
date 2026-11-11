/**
 * A "choose a new password" link signs its owner in before they have chosen one. This remembers,
 * for the tab, that the visitor arrived by such a link, so the app sends them to the reset page
 * whichever address the link lands on.
 */
const KEY = 'gradileo-password-recovery';
const EVENT = 'gradileo:password-recovery';

function store(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function markRecovery() {
  store()?.setItem(KEY, '1');
  window.dispatchEvent(new Event(EVENT));
}

export function clearRecovery() {
  store()?.removeItem(KEY);
}

export function recoveryPending(): boolean {
  return store()?.getItem(KEY) === '1';
}

export function onRecovery(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

// The link carries "type=recovery" in the address; note it before the sign-in library clears it.
if (typeof window !== 'undefined' && /[#&?]type=recovery(&|$)/.test(`${window.location.hash}${window.location.search}`)) store()?.setItem(KEY, '1');
