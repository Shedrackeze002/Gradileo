-- Lesson progress: a teacher marks the lessons they have covered with a class, so the curriculum
-- page can show what is left (for example 3/14 topics and 14/50 lessons covered) and hide the
-- lessons already taught. Progress is kept per teacher and per class: each teacher has their own
-- list for each class, and students never see it. Written to run safely more than once.

create table if not exists public.lesson_progress (
  class_id uuid not null references public.classes (id) on delete cascade,
  teacher_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 40),
  completed_at timestamptz not null default now(),
  primary key (class_id, teacher_id, lesson_id)
);
create index if not exists lesson_progress_teacher_idx on public.lesson_progress (teacher_id);

alter table public.lesson_progress enable row level security;

-- A teacher reads and changes only their own progress, and only for a class they teach.
drop policy if exists lesson_progress_own on public.lesson_progress;
create policy lesson_progress_own on public.lesson_progress for all to authenticated
  using (teacher_id = (select auth.uid()) and public.is_teacher_of(class_id))
  with check (teacher_id = (select auth.uid()) and public.is_teacher_of(class_id));

revoke all on public.lesson_progress from anon, authenticated;
grant select, insert, delete on public.lesson_progress to authenticated;
