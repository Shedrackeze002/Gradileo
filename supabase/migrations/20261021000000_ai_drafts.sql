-- "Draft with AI" in the assignment builder runs in the ai-agent Edge Function; its hourly limit
-- counts calls in tutor_requests, as the tutor's limits do (one row per call, no content).
alter table public.tutor_requests drop constraint tutor_requests_kind_check;
alter table public.tutor_requests add constraint tutor_requests_kind_check check (kind in ('script', 'ask', 'draft'));
