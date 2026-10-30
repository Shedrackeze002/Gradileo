-- Where a learner goes to school (roadmap item 5, step 1): "Find your course" asks for the country
-- or curriculum and the year in that system's own words, and saves the curriculum here so the
-- curriculum maps (step 3) can show the learner's own syllabus. The ids are those of
-- engine/curricula.ts ("us", "uk", "ng", "other" …); the learner changes their own.

alter table public.profiles add column curriculum text
  check (curriculum is null or curriculum ~ '^[a-z]{2,12}$');
comment on column public.profiles.curriculum is 'Where the learner goes to school: an id from engine/curricula.ts, chosen on Find your course.';

grant update (curriculum) on public.profiles to authenticated;
