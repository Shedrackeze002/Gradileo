-- "Regenerate" on one question in the assignment builder and AI-suggested marks for written
-- responses run in the ai-agent Edge Function; their hourly limits count calls in tutor_requests,
-- as the drafts' and the tutor's limits do (one row per call, no content).
alter table public.tutor_requests drop constraint tutor_requests_kind_check;
alter table public.tutor_requests add constraint tutor_requests_kind_check check (kind in ('script', 'ask', 'draft', 'regenerate', 'mark'));
