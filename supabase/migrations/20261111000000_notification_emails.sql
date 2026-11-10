-- Notification emails (11 November 2026, the owner's request): a student whose account has no
-- email address (a username made by the teacher, or a name-only class-link account) may add one,
-- theirs or a parent's, so class reminders reach it by email.
--
-- The address counts only once it is confirmed with a six-digit code sent to it, so nobody can make
-- Gradileo email an address they do not control. Everything is written by the notify-email Edge
-- Function with the service role; a student may only read their own row, and teachers never see it.

create table public.notification_emails (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  -- The confirmed address that reminders go to (null until one is confirmed).
  email text check (char_length(email) <= 254),
  verified_at timestamptz,
  -- An address waiting for its code, and the code's hash (sha-256 of user id and code).
  pending_email text check (char_length(pending_email) <= 254),
  code_hash text,
  code_expires_at timestamptz,
  attempts int not null default 0,
  -- Codes sent in the current hour, to stop the form being used to send mail to strangers.
  codes_sent int not null default 0,
  window_started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.notification_emails is 'An email address a student without one added for class reminders; written only by the notify-email Edge Function.';

alter table public.notification_emails enable row level security;
create policy notification_emails_select on public.notification_emails for select to authenticated
  using (user_id = (select auth.uid()));
revoke all on public.notification_emails from anon, authenticated;
grant select (user_id, email, verified_at, pending_email, updated_at) on public.notification_emails to authenticated;

-- The Resend key, sender and reply-to for Edge Functions other than the scheduled send-emails
-- (which proves itself with the cron secret through email_settings()). Service role only.
create or replace function public.email_sender()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  s jsonb;
begin
  begin
    execute $q$select jsonb_object_agg(name, decrypted_secret) from vault.decrypted_secrets
               where name in ('gradileo_resend_api_key', 'gradileo_email_from', 'gradileo_email_reply_to')$q$
      into s;
  exception when others then
    return null;
  end;
  return jsonb_build_object(
    'resend_api_key', s ->> 'gradileo_resend_api_key',
    'email_from', s ->> 'gradileo_email_from',
    'email_reply_to', s ->> 'gradileo_email_reply_to'
  );
end $$;

revoke execute on function public.email_sender() from public, anon, authenticated;
grant execute on function public.email_sender() to service_role;
