-- A teacher can no longer make a second active class for a course they already teach in the same
-- section or period (the app checks first; this index is the backstop). Several groups of one
-- course stay possible, each with its own section. Archived classes do not count, so restoring one
-- that would clash is refused until the other is archived or given a section.

-- Existing clashes are archived, never deleted: in each clash the class with the most students
-- (then the oldest) stays active and the others are archived, so no roster or work is lost.
with ranked as (
  select c.id,
         row_number() over (
           partition by c.teacher_id, c.course_id, lower(btrim(coalesce(c.section, '')))
           order by (select count(*) from public.enrollments e where e.class_id = c.id) desc, c.created_at
         ) as rn
  from public.classes c
  where c.kind = 'teacher' and not c.archived
)
update public.classes set archived = true where id in (select id from ranked where rn > 1);

create unique index classes_one_active_per_course
  on public.classes (teacher_id, course_id, lower(btrim(coalesce(section, ''))))
  where kind = 'teacher' and not archived;
