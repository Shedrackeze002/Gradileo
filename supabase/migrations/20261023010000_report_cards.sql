-- AI report cards (roadmap item 7). For one student in a class, the ai-agent Edge Function writes a
-- draft (MiniMax with no name, or the offline writer) from the student's mastery and work; the
-- teacher edits it, then shares it. A shared card shows on the student's Progress page, with a
-- notification. The teacher can also turn on a private link, so a parent can read a shared card
-- (and print it as a PDF) without signing in; turning the link off, or unsharing, ends it.

create table public.report_cards (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  period text not null default '' check (char_length(period) <= 80),
  -- engine/ai/reportCard.ts ReportCardContent: the text uses {name} for the student's first name.
  content jsonb not null,
  status text not null default 'draft' check (status in ('draft', 'shared')),
  source text not null check (source in ('minimax', 'offline')),
  model text,
  -- The private link's token (64 hex characters), or null when the link is off.
  share_token text unique check (share_token is null or char_length(share_token) = 64),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  shared_at timestamptz
);
create index report_cards_class_idx on public.report_cards (class_id, student_id, created_at desc);
create index report_cards_student_idx on public.report_cards (student_id, created_at desc) where status = 'shared';

alter table public.report_cards enable row level security;

-- The class's teacher sees, edits and removes every card; a student sees their own shared cards.
-- Cards are written by ai-agent (service role); sharing and links go through the functions below.
create policy report_cards_select on public.report_cards for select to authenticated
  using (public.is_teacher_of(class_id) or (student_id = (select auth.uid()) and status = 'shared'));
create policy report_cards_update on public.report_cards for update to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));
create policy report_cards_delete on public.report_cards for delete to authenticated
  using (public.is_teacher_of(class_id));

revoke all on public.report_cards from anon, authenticated;
grant select, delete on public.report_cards to authenticated;
grant update (period, content, updated_at) on public.report_cards to authenticated;

-- Shares a card with its student (and tells them), or takes it back to a draft, which also ends
-- its private link.
create or replace function public.share_report_card(p_id uuid, p_share boolean)
returns public.report_cards language plpgsql security definer set search_path = '' as $$
declare
  r public.report_cards;
  v_class text;
begin
  select * into r from public.report_cards where id = p_id;
  if not found or not public.is_teacher_of(r.class_id) then raise exception 'That report card was not found.' using errcode = '42501'; end if;
  if p_share then
    update public.report_cards set status = 'shared', shared_at = now(), updated_at = now() where id = p_id returning * into r;
    select name into v_class from public.classes where id = r.class_id;
    insert into public.notifications (user_id, kind, title, body, link)
    values (r.student_id, 'announcement', 'Your report card is ready', v_class || case when r.period <> '' then ': ' || r.period else '' end, '/s/progress');
  else
    update public.report_cards set status = 'draft', share_token = null, updated_at = now() where id = p_id returning * into r;
  end if;
  return r;
end $$;

-- Turns a shared card's private link on (returning its token, the same one while it stays on) or off.
create or replace function public.report_card_link(p_id uuid, p_on boolean)
returns text language plpgsql security definer set search_path = '' as $$
declare
  r public.report_cards;
  v_token text;
begin
  select * into r from public.report_cards where id = p_id;
  if not found or not public.is_teacher_of(r.class_id) then raise exception 'That report card was not found.' using errcode = '42501'; end if;
  if p_on and r.status <> 'shared' then raise exception 'Share the report card with the student first.' using errcode = '22023'; end if;
  v_token := case when p_on then coalesce(r.share_token, replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '')) end;
  update public.report_cards set share_token = v_token where id = p_id;
  return v_token;
end $$;

-- A shared card by its private link, for a parent who is not signed in: the card, the student's
-- first name, the class and the teacher. Nothing else about the student is returned.
create or replace function public.shared_report_card(p_token text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'period', r.period,
    'content', r.content,
    'sharedAt', r.shared_at,
    'studentName', split_part(btrim(p.full_name), ' ', 1),
    'className', c.name,
    'courseId', c.course_id,
    'teacherName', t.full_name
  )
  from public.report_cards r
  join public.profiles p on p.id = r.student_id
  join public.classes c on c.id = r.class_id
  join public.profiles t on t.id = c.teacher_id
  where char_length(p_token) = 64 and r.share_token = p_token and r.status = 'shared';
$$;

revoke execute on function public.share_report_card(uuid, boolean) from public, anon;
revoke execute on function public.report_card_link(uuid, boolean) from public, anon;
revoke execute on function public.shared_report_card(text) from public;
grant execute on function public.share_report_card(uuid, boolean) to authenticated;
grant execute on function public.report_card_link(uuid, boolean) to authenticated;
grant execute on function public.shared_report_card(text) to anon, authenticated;

-- Writing a card runs in ai-agent; its hourly limit counts calls in tutor_requests.
alter table public.tutor_requests drop constraint tutor_requests_kind_check;
alter table public.tutor_requests add constraint tutor_requests_kind_check check (kind in ('script', 'ask', 'draft', 'regenerate', 'mark', 'report'));
