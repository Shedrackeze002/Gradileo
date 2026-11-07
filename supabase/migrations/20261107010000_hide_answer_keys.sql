-- Security audit (7 Nov 2026): students could read the answers of teacher-written and AI-drafted
-- questions by selecting assignments.content through the API before submitting.
--
-- From now on signed-in users can read every column of an assignment except `content`. The content
-- comes from assignment_contents(), which gives a class's teacher everything and gives a student
-- the questions without their answers until the answers are due to be seen:
--   * feedback 'instant' (homework, practice): the browser checks each answer as it goes, so it
--     needs them from the start, as before;
--   * 'after_submit': once the student has handed in an attempt;
--   * 'after_due': once an attempt is handed in and the due date has passed.
-- Grading runs in the grade-submission Edge Function with the service role, which still reads the
-- whole row.

-- The answer fields of each teacher-written question; everything else stays.
create or replace function public.strip_answer_key(c jsonb)
returns jsonb language sql immutable set search_path = '' as $$
  select case
    when jsonb_typeof(c -> 'custom') = 'array' then
      jsonb_set(c, '{custom}', coalesce((
        select jsonb_agg(case when jsonb_typeof(q) = 'object' then q - 'correct' - 'value' - 'tolerance' - 'accepted' - 'solution' else q end order by n)
        from jsonb_array_elements(c -> 'custom') with ordinality as t(q, n)
      ), '[]'::jsonb))
    else c
  end;
$$;

create or replace function public.assignment_contents(p_ids uuid[])
returns table (id uuid, content jsonb)
language sql stable security definer set search_path = '' as $$
  select a.id,
    case
      when public.is_teacher_of(a.class_id) then a.content
      when coalesce(a.settings ->> 'feedback', 'instant') = 'instant' then a.content
      when exists (
        select 1 from public.submissions s
        where s.assignment_id = a.id and s.student_id = (select auth.uid()) and s.status <> 'in_progress'
      ) and (a.settings ->> 'feedback' <> 'after_due' or a.due_at is null or a.due_at <= now()) then a.content
      else public.strip_answer_key(a.content)
    end
  from public.assignments a
  where a.id = any (p_ids[1:500])
    and (
      public.is_teacher_of(a.class_id)
      or (a.status = 'published' and (a.open_at is null or a.open_at <= now()) and public.is_enrolled(a.class_id)
          and (a.assigned_to is null or (select auth.uid()) = any (a.assigned_to)))
    );
$$;

revoke all on function public.strip_answer_key(jsonb) from public, anon;
revoke all on function public.assignment_contents(uuid[]) from public, anon;
grant execute on function public.strip_answer_key(jsonb) to authenticated;
grant execute on function public.assignment_contents(uuid[]) to authenticated;

-- Every column but content.
revoke select on public.assignments from authenticated;
grant select (id, class_id, title, type, instructions, settings, open_at, due_at, allow_late, reminder_hours,
              assigned_to, status, created_at, published_at, notified_at, created_by, ai_rationale)
  on public.assignments to authenticated;

-- A platform-wide count of AI tutor calls in a day (ai-tutor's daily budget) reads by time alone.
create index if not exists tutor_requests_time on public.tutor_requests (created_at desc);
