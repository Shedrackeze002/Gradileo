// Sending email from gradileo.com through Resend. Run by .github/workflows/send-email.yml (see
// docs/SETUP.md 3.3, "Sending email from your domain"). Running it again only adds what is missing,
// and gives send-emails a fresh key.
//
//   node scripts/resend-email.mjs setup    1. adds gradileo.com to Resend (sending only);
//                                          2. adds Resend's DNS records, and a DMARC record when
//                                             the domain has none, through Cloudflare's API;
//                                          3. waits for Resend to verify the domain;
//                                          4. makes a sending-only key for gradileo.com, sends a
//                                             test message to admin@gradileo.com with it, and
//                                             writes it, the sender and the reply-to address to
//                                             $KEY_FILE (JSON) for the next step, which stores
//                                             them in Supabase Vault.
//   node scripts/resend-email.mjs cleanup  deletes the older keys this script made, once the new
//                                          one is stored (its id is in $KEY_FILE.id).
//
// Nothing here touches the domain's own MX and SPF records, which Cloudflare Email Routing owns
// (scripts/cloudflare-email.mjs): Resend's records live on send.gradileo.com and
// resend._domainkey.gradileo.com.
//
// Environment (repository secrets):
//   RESEND_API_KEY          a Resend key with Full access (it adds the domain and makes keys)
//   CLOUDFLARE_EMAIL_TOKEN  the email token, which also needs Zone: DNS: Edit
//   CLOUDFLARE_API_TOKEN    the deploy token, used to find the domain's zone and, failing the email
//                           token, to add the records
//   KEY_FILE                where to write the new settings (default: $RUNNER_TEMP/email-settings.json)
//   VERIFY_WAIT_MINUTES     how long to wait for Resend to verify the domain (default 20)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DOMAIN = 'gradileo.com';
// The address the emails come from, and where replies go (admin@ forwards to the owner's inbox).
const FROM = `Gradileo <no-reply@${DOMAIN}>`;
const REPLY_TO = `admin@${DOMAIN}`;
// The name of the sending key given to Supabase; older keys with this name are deleted.
const KEY_NAME = 'Gradileo reminders (Supabase)';
const RESEND = 'https://api.resend.com';
const CLOUDFLARE = 'https://api.cloudflare.com/client/v4';
const DMARC = 'v=DMARC1; p=none; adkim=r; aspf=r';
const POLL_SECONDS = 20;

const env = process.env;
// The workflow's next step reads the settings from here.
const KEY_FILE = env.KEY_FILE || join(env.RUNNER_TEMP ?? '.', 'email-settings.json');
const fail = (message) => {
  console.error(`::error::${message}`);
  process.exit(1);
};
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// One Resend API call; throws with Resend's reason. Resend allows a few calls a second, so a
// refusal for speed waits and tries again.
async function resend(method, path, body) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(RESEND + path, {
      method,
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    });
    if (res.status === 429 && attempt < 5) {
      await sleep(2);
      continue;
    }
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
    const why = data.message ?? res.statusText;
    const hint =
      res.status === 401 || res.status === 403
        ? ' RESEND_API_KEY must be a key with Full access (Resend → API Keys).'
        : '';
    throw new Error(`Resend ${method} ${path}: ${res.status} ${why}.${hint}`);
  }
}

// One Cloudflare API call with the given token; throws with Cloudflare's reason.
async function cloudflare(method, path, token, body) {
  const res = await fetch(CLOUDFLARE + path, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok && data.success) return data.result;
  const why = (data.errors ?? []).map((e) => `${e.code} ${e.message}`).join('; ') || res.statusText;
  const error = new Error(`Cloudflare ${method} ${path}: ${res.status} ${why}.`);
  error.refused = res.status === 401 || res.status === 403;
  throw error;
}

// The full DNS name of a record Resend names relative to the domain ("send", "@", "").
const fullName = (name) =>
  !name || name === '@' || name === DOMAIN ? DOMAIN : name.endsWith(`.${DOMAIN}`) ? name : `${name}.${DOMAIN}`;
// TXT values compare without the quotes Cloudflare may add.
const bare = (value) => String(value ?? '').replace(/^"|"$/g, '').trim();

async function setup() {
  if (!env.RESEND_API_KEY) fail('Add the repository secret RESEND_API_KEY (a Resend key with Full access).');
  const tokens = [env.CLOUDFLARE_EMAIL_TOKEN, env.CLOUDFLARE_API_TOKEN].filter(Boolean);
  if (!tokens.length) fail('Set the CLOUDFLARE_EMAIL_TOKEN repository secret.');

  // 1. The domain in Resend, for sending only (receiving stays with Cloudflare Email Routing).
  const { data: domains = [] } = await resend('GET', '/domains');
  let domain = domains.find((d) => d.name === DOMAIN);
  if (!domain) {
    domain = await resend('POST', '/domains', { name: DOMAIN, capabilities: { sending: 'enabled', receiving: 'disabled' } });
    console.log(`Added ${DOMAIN} to Resend.`);
  } else console.log(`${DOMAIN} is already in Resend (status: ${domain.status}).`);
  domain = await resend('GET', `/domains/${domain.id}`);

  // 2. The DNS records. Only records below the domain are written, so its own MX and SPF records
  // (Cloudflare Email Routing) are never touched.
  let zone;
  for (const token of tokens) {
    [zone] = await cloudflare('GET', `/zones?name=${DOMAIN}`, token).catch(() => []);
    if (zone) break;
  }
  if (!zone) fail(`Neither Cloudflare token can see a zone named ${DOMAIN} (they need Zone: Read).`);
  const records = (domain.records ?? [])
    .filter((r) => ['TXT', 'MX', 'CNAME'].includes(r.type) && fullName(r.name) !== DOMAIN)
    .map((r) => ({ type: r.type, name: fullName(r.name), content: r.value, priority: r.priority, record: r.record }));
  let dmarc = [];
  for (const token of tokens) {
    const found = await cloudflare('GET', `/zones/${zone.id}/dns_records?type=TXT&name=_dmarc.${DOMAIN}`, token).catch(() => null);
    if (found) {
      dmarc = found;
      break;
    }
  }
  if (!dmarc.some((r) => bare(r.content).startsWith('v=DMARC1')))
    records.push({ type: 'TXT', name: `_dmarc.${DOMAIN}`, content: DMARC, record: 'DMARC' });
  if (!records.length) fail('Resend listed no DNS records for the domain.');

  // Writes one record with the first token that may; returns what it did.
  async function write(record) {
    const want = {
      type: record.type,
      name: record.name,
      content: record.content,
      ttl: 1,
      ...(record.type === 'MX' ? { priority: record.priority ?? 10 } : {}),
      ...(record.type === 'CNAME' ? { proxied: false } : {}),
      comment: `Resend (${record.record}) for sending email from ${DOMAIN}`,
    };
    let lastError;
    for (const token of tokens) {
      try {
        const existing = await cloudflare('GET', `/zones/${zone.id}/dns_records?type=${record.type}&name=${record.name}`, token);
        const same = existing.find(
          (r) => bare(r.content) === bare(record.content) && (record.type !== 'MX' || r.priority === want.priority),
        );
        if (same) return 'already there';
        // A name holds one DKIM key ("p=…"), one SPF value ("v=spf1 …") and one bounce MX, so an
        // old one of the same kind is replaced.
        const kind = (value) => bare(value).split('=')[0];
        const old = record.type === 'TXT'
          ? existing.find((r) => kind(r.content) === kind(record.content))
          : existing[0];
        if (old) {
          await cloudflare('PUT', `/zones/${zone.id}/dns_records/${old.id}`, token, want);
          return 'updated';
        }
        await cloudflare('POST', `/zones/${zone.id}/dns_records`, token, want);
        return 'added';
      } catch (error) {
        lastError = error;
        if (!error.refused) throw error;
      }
    }
    lastError.message +=
      ' Give the email token (CLOUDFLARE_EMAIL_TOKEN) the permission Zone → DNS → Edit for ' +
      `${DOMAIN}, then run this workflow again.`;
    throw lastError;
  }
  for (const record of records) {
    const done = await write(record);
    console.log(`${record.type} ${record.name} (${record.record}): ${done}.`);
  }

  // 3. Verification. Resend checks the records itself; asking it to check now saves waiting.
  if (domain.status !== 'verified') {
    await resend('POST', `/domains/${domain.id}/verify`);
    const minutes = Number(env.VERIFY_WAIT_MINUTES ?? 20);
    console.log(`Waiting up to ${minutes} minutes for Resend to verify ${DOMAIN}…`);
    const deadline = Date.now() + minutes * 60_000;
    while (domain.status !== 'verified' && Date.now() < deadline) {
      await sleep(POLL_SECONDS);
      domain = await resend('GET', `/domains/${domain.id}`);
      if (domain.status === 'failed') {
        // A failed check is retried: DNS can take a few minutes to reach Resend.
        await resend('POST', `/domains/${domain.id}/verify`);
      }
    }
    if (domain.status !== 'verified') {
      const waiting = (domain.records ?? []).filter((r) => r.status !== 'verified').map((r) => `${r.type} ${r.name}`);
      fail(
        `Resend has not verified ${DOMAIN} yet (status: ${domain.status}; waiting on ${waiting.join(', ') || 'the domain'}). ` +
          'DNS can take a while to spread: run this workflow again in an hour.',
      );
    }
  }
  console.log(`Resend has verified ${DOMAIN}.`);

  // 4. A key that can only send, and only from this domain, for Supabase.
  const key = await resend('POST', '/api-keys', { name: KEY_NAME, permission: 'sending_access', domain_id: domain.id });
  console.log(`::add-mask::${key.token}`);
  const sent = await fetch(`${RESEND}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [REPLY_TO],
      subject: `Gradileo now sends email from ${DOMAIN}`,
      text:
        `This test message came from ${FROM} through Resend, which means reminders and other ` +
        `Gradileo emails now come from ${DOMAIN}. Replies go to ${REPLY_TO}.`,
    }),
  });
  if (!sent.ok) {
    const why = (await sent.json().catch(() => ({}))).message ?? sent.statusText;
    fail(`The new key could not send a test message: ${sent.status} ${why}.`);
  }
  console.log(`Sent a test message to ${REPLY_TO}.`);
  const settings = { resend_api_key: key.token, email_from: FROM, email_reply_to: REPLY_TO };
  writeFileSync(KEY_FILE, JSON.stringify(settings), { mode: 0o600 });
  writeFileSync(`${KEY_FILE}.id`, key.id, { mode: 0o600 });
}

async function cleanup() {
  const keep = readFileSync(`${KEY_FILE}.id`, 'utf8').trim();
  const { data: keys = [] } = await resend('GET', '/api-keys');
  for (const key of keys.filter((k) => k.name === KEY_NAME && k.id !== keep)) {
    await resend('DELETE', `/api-keys/${key.id}`);
    console.log('Deleted an older sending key.');
  }
  console.log(`Done: Gradileo sends email as ${FROM}, and replies go to ${REPLY_TO}.`);
}

const command = process.argv[2];
try {
  if (command === 'setup') await setup();
  else if (command === 'cleanup') await cleanup();
  else fail('Usage: node scripts/resend-email.mjs setup|cleanup');
} catch (error) {
  fail(error.message);
}
