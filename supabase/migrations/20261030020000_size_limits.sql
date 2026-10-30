-- Size limits that match what the app itself allows (found by an audit of every database call,
-- 30 October 2026). Each limit stays, so nothing unbounded can be stored, but none is now tighter
-- than the app: before, the database could refuse work the app had accepted.
--
-- 1. A submission's answers were limited to 400 KB, but a drawn (canvas) answer may be up to
--    60,000 characters and an exam up to 150 questions, so a written exam with several full
--    drawings could not be saved or handed in. Now 10 MB, above the app's own maximum.
-- 2. A whiteboard's pages were limited to 3 MB; a long lesson's board (up to 50 pages of ink)
--    could pass that and fail to save. Now 10 MB.
-- 3. A live class answer allows 20 responses of 400 characters, which with JSON quoting already
--    passes 8,000 bytes. Now 32,000.
-- 4. start_self_paced checked a course id's shape (a short word, a hyphen, at most 12 more
--    characters); a longer mapped course id would have been "not found" again. It now accepts any
--    id of lower-case letters, digits and hyphens up to 40 characters, as the app's ids are.

alter table public.submissions drop constraint if exists submissions_responses_check;
alter table public.submissions add constraint submissions_responses_check check (pg_column_size(responses) < 10000000);

alter table public.boards drop constraint if exists boards_pages_check;
alter table public.boards add constraint boards_pages_check check (jsonb_typeof(pages) = 'array' and octet_length(pages::text) <= 10000000);

alter table public.live_answers drop constraint if exists live_answers_responses_check;
alter table public.live_answers add constraint live_answers_responses_check check (jsonb_typeof(responses) = 'array' and octet_length(responses::text) <= 32000);

create or replace function public.start_self_paced(p_course_id text, p_lesson_ids text[])
returns public.classes language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  c public.classes;
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if me.role <> 'student' then raise exception 'Self-paced study is for students.'; end if;
  if me.disabled_at is not null then raise exception 'This account is disabled.' using errcode = '42501'; end if;
  if p_course_id is null or p_course_id !~ '^[a-z0-9-]{3,40}$' then raise exception 'That course was not found.'; end if;
  select k.* into c
  from public.classes k join public.enrollments e on e.class_id = k.id
  where k.kind = 'self' and e.student_id = me.id and k.course_id = p_course_id and not k.archived
  limit 1;
  if not found then
    insert into public.classes (teacher_id, name, course_id, kind, settings)
    values (null, 'Self-paced', p_course_id, 'self', '{"aiAutopilot": true, "reminderHours": []}'::jsonb)
    returning * into c;
    insert into public.enrollments (class_id, student_id) values (c.id, me.id);
  end if;
  insert into public.publications (class_id, lesson_id)
  select c.id, l.id from (select distinct x as id from unnest(coalesce(p_lesson_ids, '{}'::text[])) as x limit 400) l
  where char_length(l.id) between 1 and 40
  on conflict do nothing;
  return c;
end $$;

revoke execute on function public.start_self_paced(text, text[]) from public, anon;
grant execute on function public.start_self_paced(text, text[]) to authenticated;
