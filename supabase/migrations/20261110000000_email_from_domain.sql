-- Email from gradileo.com (10 November 2026).
--
-- The send-emails Edge Function delivers class reminders through Resend. Until now it needed three
-- Edge Function secrets and two Vault secrets set by hand, and none were set, so no reminder was
-- ever emailed. From now on:
--   * the shared secret between pg_cron and send-emails is made here, once, inside the database,
--     so nobody ever sees or copies it;
--   * the Resend key, the sender and the reply-to address live in Vault, where the *Set up sending
--     email* workflow (scripts/resend-email.mjs) writes them, together with educore_project_url;
--   * send-emails reads them through email_settings(), which answers only a caller that presents
--     the shared secret, and only the service role may call it.

-- The shared secret. Vault is missing on a plain PostgreSQL server (the database tests), so a
-- failure is only a notice there.
do $$
begin
  begin
    if not exists (select 1 from vault.secrets where name = 'educore_cron_secret') then
      perform vault.create_secret(
        encode(extensions.gen_random_bytes(32), 'hex'),
        'educore_cron_secret',
        'Shared secret between pg_cron (trigger_email_delivery) and the send-emails Edge Function'
      );
    end if;
  exception when others then
    raise notice 'Vault is not available here; create the educore_cron_secret Vault secret yourself.';
  end;
end $$;

-- The email settings for send-emails, or null when the token is not the shared secret.
create or replace function public.email_settings(cron_token text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  s jsonb;
begin
  begin
    execute $q$select jsonb_object_agg(name, decrypted_secret) from vault.decrypted_secrets
               where name in ('educore_cron_secret', 'gradileo_resend_api_key',
                              'gradileo_email_from', 'gradileo_email_reply_to')$q$
      into s;
  exception when others then
    return null;
  end;
  if coalesce(s ->> 'educore_cron_secret', '') = '' or cron_token is distinct from s ->> 'educore_cron_secret' then
    return null;
  end if;
  return jsonb_build_object(
    'resend_api_key', s ->> 'gradileo_resend_api_key',
    'email_from', s ->> 'gradileo_email_from',
    'email_reply_to', s ->> 'gradileo_email_reply_to'
  );
end $$;

revoke execute on function public.email_settings(text) from public, anon, authenticated;
grant execute on function public.email_settings(text) to service_role;
