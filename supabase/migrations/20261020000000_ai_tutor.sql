-- The AI tutor walks a student through a lesson's slides, saying what a teacher would say at each
-- step, and answers the student's questions. Its narration is written once per run of slides and
-- saved here, keyed by a hash of the prompt version, model and slide content, so every later
-- student gets it at once and a change to the lesson gets new narration.

create table public.tutor_scripts (
  key text primary key check (key ~ '^[0-9a-f]{64}$'),
  lesson_id text not null check (char_length(lesson_id) <= 40),
  model text not null,
  script jsonb not null,
  created_at timestamptz not null default now()
);

create index tutor_scripts_lesson on public.tutor_scripts (lesson_id);

-- One row per call to the tutor (no content), for its hourly limits.
create table public.tutor_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('script', 'ask')),
  created_at timestamptz not null default now()
);

create index tutor_requests_user_time on public.tutor_requests (user_id, kind, created_at desc);

-- Only the ai-tutor Edge Function (service role) reads and writes these.
alter table public.tutor_scripts enable row level security;
alter table public.tutor_requests enable row level security;
revoke all on public.tutor_scripts from anon, authenticated;
revoke all on public.tutor_requests from anon, authenticated;
