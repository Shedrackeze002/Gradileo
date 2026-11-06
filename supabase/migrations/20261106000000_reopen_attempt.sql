-- Teachers can reopen a submitted attempt (6 November 2026). A student who submitted by mistake
-- gets a fresh attempt with newly generated questions. The old attempt is kept for the record,
-- marked with reopened_at and reopened_by, but it no longer counts: not towards the attempt
-- limit, the best score, the gradebook or "has submitted" checks such as deadline reminders.
-- The grade-submission Edge Function (action "reopen") does the work; students cannot set
-- these columns because they have no UPDATE grant on them.

alter table public.submissions
  add column if not exists reopened_at timestamptz,
  add column if not exists reopened_by uuid references public.profiles (id) on delete set null;

-- Reminders: a reopened attempt is not a submission, so a student with only a reopened attempt
-- is reminded again until they hand in the new one.
create or replace function public.remind_now(p_assignment_id uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  a public.assignments;
  n integer;
begin
  select * into a from public.assignments where id = p_assignment_id;
  if not found or not public.is_teacher_of(a.class_id) then raise exception 'Assignment not found.' using errcode = '42501'; end if;
  if a.status <> 'published' then raise exception 'Publish the assignment first.'; end if;
  insert into public.notifications (user_id, kind, title, body, link, assignment_id)
  select e.student_id, 'reminder', 'Reminder from your teacher: ' || a.title,
         case when a.due_at is null then 'Please complete it soon.' else 'Due ' || public.fmt_due(a.due_at, a.class_id) || '. Please complete it soon.' end,
         '/s/work/' || a.id, a.id
  from public.enrollments e
  where e.class_id = a.class_id
    and (a.assigned_to is null or e.student_id = any (a.assigned_to))
    and not exists (select 1 from public.submissions s where s.assignment_id = a.id and s.student_id = e.student_id and s.status <> 'in_progress' and s.reopened_at is null);
  get diagnostics n = row_count;
  return n;
end $$;

create or replace function public.send_due_reminders()
returns integer language plpgsql security definer set search_path = '' as $$
declare
  r record;
  n integer := 0;
begin
  for r in
    select id from public.assignments
    where status = 'published' and notified_at is null and (open_at is null or open_at <= now())
  loop
    perform public.notify_assignment(r.id);
  end loop;

  for r in
    with due as (
      select a.id, a.title, a.class_id, a.due_at, a.assigned_to,
             (select min(h) from unnest(a.reminder_hours) as h where h > 0 and a.due_at - make_interval(hours => h) <= now()) as urgent
      from public.assignments a
      where a.status = 'published' and a.due_at > now() and (a.open_at is null or a.open_at <= now())
    )
    select d.id as assignment_id, d.title, d.urgent, d.due_at, e.student_id
    from due d
    join public.enrollments e on e.class_id = d.class_id and (d.assigned_to is null or e.student_id = any (d.assigned_to))
    where d.urgent is not null
      and not exists (select 1 from public.submissions s where s.assignment_id = d.id and s.student_id = e.student_id and s.status <> 'in_progress' and s.reopened_at is null)
      and not exists (select 1 from public.reminder_log l where l.assignment_id = d.id and l.student_id = e.student_id and l.hours = d.urgent and l.due_at = d.due_at)
  loop
    insert into public.reminder_log (assignment_id, student_id, hours, due_at) values (r.assignment_id, r.student_id, r.urgent, r.due_at) on conflict do nothing;
    insert into public.notifications (user_id, kind, title, body, link, assignment_id)
    values (r.student_id, 'reminder', 'Reminder: ' || r.title || ' is due soon',
            '“' || r.title || '” is due in less than ' || public.human_hours(r.urgent) || ' and you haven’t submitted it yet.',
            '/s/work/' || r.assignment_id, r.assignment_id);
    n := n + 1;
  end loop;
  return n;
end $$;
