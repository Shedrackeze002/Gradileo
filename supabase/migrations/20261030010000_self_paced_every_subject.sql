-- Self-paced study for every subject. start_self_paced only accepted mathematics course ids
-- ("math-…"), so a student who chose Chemistry or English on "Find your course" was told "That
-- course was not found." (the demo mode does not run this check, so its tests passed). It now
-- accepts any course id of the app's form: a short subject word, a hyphen and a short name
-- ("chem-20", "eng-10", "math-10c"), still nothing else.

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
  if p_course_id is null or p_course_id !~ '^[a-z]{2,6}-[0-9a-z-]{1,12}$' then raise exception 'That course was not found.'; end if;
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
