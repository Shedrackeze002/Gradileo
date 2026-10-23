-- Behavioural tests for the Gradileo schema: run after 00_supabase_stub.sql and the
-- migrations on a throwaway database. Any failed check raises an exception.
\set ON_ERROR_STOP 1
set client_min_messages = warning;

create or replace function public._assert(cond boolean, msg text) returns void language plpgsql as $$
begin
  if not coalesce(cond, false) then raise exception 'ASSERTION FAILED: %', msg; end if;
end $$;
grant execute on function public._assert(boolean, text) to anon, authenticated;

-- Runs a statement that must fail.
create or replace function public._fails(stmt text, msg text) returns void language plpgsql as $$
begin
  begin
    execute stmt;
  exception when others then
    -- Mistakes in the test itself (syntax, unknown names, bad casts) must not count as "expected failure".
    if sqlstate in ('42601', '42703', '42P01', '42883', '42804', '22P02', '42702') then
      raise;
    end if;
    return;
  end;
  raise exception 'ASSERTION FAILED (statement succeeded): %', msg;
end $$;
grant execute on function public._fails(text, text) to anon, authenticated;

-- ---------------------------------------------------------------- users
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a1', 'teacher1@school.ca', '{"full_name":"Ms Teacher","role":"teacher"}'),
  ('00000000-0000-0000-0000-0000000000a2', 'teacher2@school.ca', '{"full_name":"Mr Other","role":"teacher"}'),
  ('00000000-0000-0000-0000-0000000000b1', 'sam@home.ca', '{"full_name":"Sam Student","role":"student"}');
insert into auth.users (id, email, raw_user_meta_data, raw_app_meta_data) values
  ('00000000-0000-0000-0000-0000000000b2', 'lee.k@students.educore.local', '{}', '{"role":"student","full_name":"Lee Kim","username":"lee.k"}');
-- A student cannot make themselves a teacher through app_metadata (only the service role sets it),
-- and a self-chosen username in user metadata is ignored.
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000b9', 'sneaky@home.ca', '{"full_name":"Sneaky","role":"student","username":"lee.k2"}');

select _assert((select role from profiles where id = '00000000-0000-0000-0000-0000000000a1') = 'teacher', 'teacher profile created');
select _assert((select role from profiles where id = '00000000-0000-0000-0000-0000000000b1') = 'student', 'student profile created');
select _assert((select username from profiles where id = '00000000-0000-0000-0000-0000000000b2') = 'lee.k', 'generated student gets username');
select _assert((select username from profiles where id = '00000000-0000-0000-0000-0000000000b9') is null, 'self-chosen username ignored');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a1') = 'pending', 'self-registered teachers wait for approval');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000b1') is null, 'students have no teacher status');

-- Bootstrap the first administrator (done once with SQL), who approves the other teacher.
update profiles set platform_admin = true, teacher_status = 'approved' where id = '00000000-0000-0000-0000-0000000000a1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000a2', 'Too early')$$, 'pending teachers cannot create classes');
select _fails($$update profiles set teacher_status = 'approved', platform_admin = true where id = '00000000-0000-0000-0000-0000000000a2'$$, 'users cannot approve or promote themselves');
select _fails($$select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a2', 'approved')$$, 'non-admins cannot approve teachers');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a2', 'approved');
reset role;
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a2') = 'approved', 'admin approved the teacher');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a2' and kind = 'admin') = 1, 'teacher told about approval');

-- ---------------------------------------------------------------- teacher creates a class
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into classes (teacher_id, name, section, course_id) values ('00000000-0000-0000-0000-0000000000a1', 'Math 10C', 'Block A', 'math-10c');
select _assert((select count(*) from classes) = 1, 'teacher sees own class');
select _assert((select join_code from classes) ~ '^[A-HJ-NP-Z2-9]{6}$', 'join code generated');
select _assert((select settings ->> 'timezone' from classes) = 'America/Edmonton', 'default settings merged');
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000a2', 'Fake')$$, 'cannot create a class for another teacher');
select _fails($$update classes set join_code = 'AAAAAA'$$, 'join code only changes via RPC');
reset role;

create temp table ctx as select id as class_id, join_code from classes limit 1;
grant select on ctx to authenticated, anon;

-- ---------------------------------------------------------------- students join
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000b1', 'Mine')$$, 'students cannot create classes');
select _assert((select count(*) from classes) = 0, 'not enrolled yet: no classes visible');
select join_class((select lower(join_code) from ctx));
select _assert((select count(*) from classes) = 1, 'joined class is visible');
select _fails($$select join_class('ZZZZZZ')$$, 'unknown join code rejected');
reset role;

-- Self-registration with a join code enrols automatically.
insert into auth.users (id, email, raw_user_meta_data)
select '00000000-0000-0000-0000-0000000000b3', 'ana@home.ca', jsonb_build_object('full_name', 'Ana Lopez', 'role', 'student', 'join_code', join_code) from ctx;
-- The generated student is enrolled by the create-students function (service role).
insert into enrollments (class_id, student_id) select class_id, '00000000-0000-0000-0000-0000000000b2' from ctx;
select _assert((select count(*) from enrollments) = 3, 'three students enrolled');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title like '%joined%') = 2, 'teacher told about self-joins');

-- ---------------------------------------------------------------- privacy between users
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 4, 'teacher sees self and 3 students');
select _fails($$insert into enrollments (class_id, student_id) select class_id, '00000000-0000-0000-0000-0000000000b9' from ctx$$, 'teachers cannot enrol arbitrary users directly');
select _fails($$update profiles set role = 'student' where id = '00000000-0000-0000-0000-0000000000a1'$$, 'role cannot be changed');
update profiles set full_name = 'Ms T. Teacher' where id = '00000000-0000-0000-0000-0000000000a1';
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 1, 'other teacher sees only self');
select _assert((select count(*) from classes) = 0, 'other teacher sees no foreign classes');
select _assert((select count(*) from enrollments) = 0, 'other teacher sees no foreign enrollments');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 2, 'student sees self and own teacher only');
select _assert((select count(*) from enrollments) = 1, 'student sees only own enrollment');
reset role;

-- ---------------------------------------------------------------- assignments
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into assignments (class_id, title, type, content, due_at)
select class_id, 'Homework 1', 'homework', '{"sections":[{"skillId":"m1-referents","count":3,"difficulty":"mixed"}],"custom":[]}', now() + interval '3 days' from ctx;
select _assert((select settings ->> 'attempts' from assignments where title = 'Homework 1') = '3', 'default settings by type');
insert into assignments (class_id, title, type, settings) select class_id, 'Empty quiz', 'quiz', '{}' from ctx;
select _fails($$select publish_assignment((select id from assignments where title = 'Empty quiz'))$$, 'cannot publish a quiz without questions');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 0, 'drafts are hidden from students');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select publish_assignment((select id from assignments where title = 'Homework 1'));
select _assert((select published_at is not null from assignments where title = 'Homework 1'), 'published_at set');
-- Targeted and future-dated assignments
insert into assignments (class_id, title, type, content, assigned_to, status)
select class_id, 'Only Sam', 'practice', '{"sections":[{"skillId":"m1-referents","count":2,"difficulty":1}],"custom":[]}', array['00000000-0000-0000-0000-0000000000b1'::uuid], 'published' from ctx;
insert into assignments (class_id, title, type, content, open_at, status)
select class_id, 'Opens tomorrow', 'lesson', '{"sections":[],"custom":[],"lessonId":"m10c-1-1"}', now() + interval '1 day', 'published' from ctx;
reset role;

select _assert((select count(*) from notifications where kind = 'assignment' and title like '%Homework 1') = 3, 'all 3 students notified on publish');
select _assert((select count(*) from notifications where kind = 'assignment' and title like '%Only Sam') = 1, 'targeted assignment notifies only target');
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 0, 'future assignment not announced yet');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 1, 'Lee sees Homework 1 only (not targeted, not future)');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 2, 'Sam sees Homework 1 and his targeted practice');
reset role;

-- Opening time arrives: the scheduler announces it.
update assignments set open_at = now() - interval '1 minute' where title = 'Opens tomorrow';
select send_due_reminders();
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 3, 'announced once open');
select send_due_reminders();
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 3, 'announced only once');

-- ---------------------------------------------------------------- submissions
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select (select id from assignments where title = 'Homework 1'), class_id, '00000000-0000-0000-0000-0000000000b1', 1 from ctx$$, 'students cannot create assignment attempts directly');
insert into submissions (assignment_id, class_id, student_id, seed, practice_skill_ids) select null, class_id, '00000000-0000-0000-0000-0000000000b1', 7, array['m1-referents'] from ctx;
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select null, class_id, '00000000-0000-0000-0000-0000000000b2', 7 from ctx$$, 'cannot create practice for someone else');
reset role;

-- The grade-submission function (service role) creates assignment attempts.
insert into submissions (assignment_id, class_id, student_id, seed, items)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 42, '[{"skillId":"m1-referents","seed":5,"difficulty":1}]'
from assignments a where a.title = 'Homework 1';
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 43 from assignments a where a.title = 'Homework 1'$$, 'only one open attempt per assignment');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
update submissions set responses = '{"0":{"answers":["b"],"hintsUsed":0}}' where assignment_id is not null;
select _assert((select responses -> '0' ->> 'hintsUsed' from submissions where assignment_id is not null) = '0', 'student saves answers');
select _fails($$update submissions set score = 10, percent = 100 where assignment_id is not null$$, 'student cannot set a score');
select _fails($$update submissions set status = 'graded' where assignment_id is not null$$, 'student cannot change status');
-- Homework allows "try a similar question", so the item list may change.
update submissions set items = '[{"skillId":"m1-referents","seed":6,"difficulty":1}]' where assignment_id is not null;
reset role;

update assignments set settings = settings || '{"retrySimilar":false}' where title = 'Homework 1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$update submissions set items = '[{"skillId":"m1-referents","seed":999,"difficulty":1}]' where assignment_id is not null$$, 'items locked when retries are off');
reset role;
update assignments set settings = settings || '{"retrySimilar":true}' where title = 'Homework 1';

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from submissions) = 0, 'students cannot see each other''s work');
update submissions set responses = '{}' where student_id = '00000000-0000-0000-0000-0000000000b1';
reset role;
select _assert((select responses ? '0' from submissions where assignment_id is not null and student_id = '00000000-0000-0000-0000-0000000000b1' and status = 'in_progress'), 'cannot edit another student''s work');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from submissions) = 0, 'other teacher cannot see submissions');
select _assert((select count(*) from assignments) = 0, 'other teacher cannot see assignments');
reset role;

-- ---------------------------------------------------------------- reminders
-- Due in 90 minutes, reminders at 24h and 2h. Sam already submitted.
insert into assignments (class_id, title, type, content, due_at, reminder_hours, status)
select class_id, 'Due soon', 'homework', '{"sections":[{"skillId":"m1-referents","count":1,"difficulty":1}],"custom":[]}', now() + interval '90 minutes', '{24,2}', 'published' from ctx;
insert into submissions (assignment_id, class_id, student_id, seed, status, submitted_at)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 1, 'graded', now() from assignments a where a.title = 'Due soon';
-- Lee has an attempt in progress but has not submitted: still reminded.
insert into submissions (assignment_id, class_id, student_id, seed)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b2', 2 from assignments a where a.title = 'Due soon';

select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%') = 2, 'two unfinished students reminded');
select _assert(not exists (select 1 from notifications where kind = 'reminder' and title like '%Due soon%' and user_id = '00000000-0000-0000-0000-0000000000b1'), 'submitted student not reminded');
select _assert((select bool_and(body like '%less than 2 hours%') from notifications where kind = 'reminder' and title like '%Due soon%'), 'only the most urgent threshold is used');
select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%') = 2, 'reminders are not repeated');
-- Extending the deadline re-arms reminders.
update assignments set due_at = now() + interval '20 hours' where title = 'Due soon';
select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%' and body like '%24 hours%') = 2, 'new deadline gets its own reminder');
-- Nothing for assignments far from due, drafts, or past due.
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Homework 1%') = 0, 'no reminder before the first threshold');

-- remind_now
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select remind_now((select id from assignments limit 1))$$, 'other teacher cannot send reminders');
reset role;
create temp table due_soon as select id from assignments where title = 'Due soon';
grant select on due_soon to authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select remind_now((select id from due_soon))) = 2, 'remind now skips students who submitted');
reset role;

-- ---------------------------------------------------------------- notifications & announcements
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from notifications) > 0 and (select count(*) from notifications where user_id <> '00000000-0000-0000-0000-0000000000b1') = 0, 'students see only their notifications');
update notifications set read_at = now();
select _fails($$update notifications set title = 'hacked'$$, 'only read_at is writable');
select _fails($$insert into announcements (class_id, author_id, title) select class_id, '00000000-0000-0000-0000-0000000000b1', 'hi' from ctx$$, 'students cannot post announcements');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into announcements (class_id, author_id, title, body) select class_id, '00000000-0000-0000-0000-0000000000a1', 'Test on Friday', 'Unit 1 test.' from ctx;
reset role;
select _assert((select count(*) from notifications where kind = 'announcement' and title = 'Test on Friday') = 3, 'announcement notifies the class');

-- ---------------------------------------------------------------- insights & mastery
insert into insights (class_id, student_id, source, data)
select class_id, null, 'offline', '{"headline":"h","actions":[{"id":"x1","status":"proposed"},{"id":"x2","status":"proposed"}]}' from ctx;
insert into skill_mastery (student_id, skill_id, p_known, level) values ('00000000-0000-0000-0000-0000000000b1', 'm1-referents', 0.5, 'familiar');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from insights) = 0, 'students cannot read teacher insights');
select _assert((select count(*) from skill_mastery) = 1, 'student sees own mastery');
select _fails($$update skill_mastery set p_known = 1$$, 'students cannot change mastery');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select set_insight_action_status((select id from insights limit 1), 'x2', 'done');
select _assert((select data -> 'actions' -> 1 ->> 'status' from insights limit 1) = 'done', 'action status updated');
select _assert((select data -> 'actions' -> 0 ->> 'status' from insights limit 1) = 'proposed', 'other actions untouched');
select _assert((select count(*) from skill_mastery) = 1, 'teacher sees students'' mastery');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select set_insight_action_status((select id from insights limit 1), 'x1', 'done')$$, 'other teacher cannot touch insights');
select _assert((select count(*) from skill_mastery) = 0, 'other teacher cannot see mastery');
reset role;

-- ---------------------------------------------------------------- platform administration
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a3', 'newteacher@school.ca', '{"full_name":"New Teacher","role":"teacher"}');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and kind = 'admin' and title like '%waiting for approval%') = 1, 'admins told about a pending teacher');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select admin_overview()$$, 'non-admins cannot see the overview');
select _fails($$select * from admin_users()$$, 'non-admins cannot list users');
select _fails($$select * from admin_classes()$$, 'non-admins cannot list classes');
select _fails($$select admin_set_setting('teacher_signup', '"open"')$$, 'non-admins cannot change settings');
select _fails($$select * from admin_audit()$$, 'non-admins cannot read the audit log');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', true)$$, 'non-admins cannot promote');
select _fails($$select count(*) from platform_settings$$, 'settings table is not readable directly');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((admin_overview() ->> 'pendingTeachers')::int = 1, 'overview counts pending teachers');
select _assert((admin_overview() ->> 'teachers')::int = 2, 'overview counts approved teachers');
select _assert((admin_overview() ->> 'classes')::int = 1, 'overview counts classes');
select _assert(jsonb_array_length(admin_overview() -> 'signupsByWeek') = 12, 'twelve weeks of sign-ups');
select _assert((select count(*) from admin_users(null, 'teacher', 'pending')) = 1, 'list pending teachers');
select _assert((select total from admin_users('lee', null, null) limit 1) = 1, 'search users by username');
select _assert((select students from admin_classes() limit 1) = 3, 'class list counts students');
select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a3', 'rejected');
select _assert((select count(*) from admin_users(null, null, 'pending')) = 0, 'no pending teachers left');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a1', false)$$, 'the last administrator cannot be removed');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000b1', true)$$, 'students cannot become administrators');
select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', true);
select _assert((select count(*) from admin_users(null, null, 'admin')) = 2, 'second administrator added');
select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', false);
select _fails($$select admin_set_setting('teacher_signup', '"anyone"')$$, 'invalid setting value rejected');
select _fails($$select admin_set_setting('free_money', 'true')$$, 'unknown setting rejected');
select admin_set_setting('teacher_signup', '"open"');
reset role;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a4', 'open@school.ca', '{"full_name":"Open Teacher","role":"teacher"}');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a4') = 'approved', 'open sign-up approves teachers immediately');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from admin_audit()) = 5, 'every successful administrative action is audited (failed ones are not)');
select _assert(exists (select 1 from admin_audit() where action = 'teacher_rejected' and target_name = 'New Teacher' and actor_name = 'Ms T. Teacher'), 'audit names actor and target');
reset role;

-- Disabled accounts lose administrator and teaching rights immediately.
update profiles set disabled_at = now() where id = '00000000-0000-0000-0000-0000000000a1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert(not is_platform_admin(), 'disabled administrator is not an administrator');
select _assert(not can_teach(), 'disabled teacher cannot teach');
reset role;
update profiles set disabled_at = null where id = '00000000-0000-0000-0000-0000000000a1';

select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _assert(signup_config() ->> 'teacherSignup' = 'open', 'sign-up page can read the sign-up mode');
select _fails($$select admin_overview()$$, 'anonymous visitors cannot see the overview');
reset role;

-- ---------------------------------------------------------------- presenting: hidden blocks and whiteboards
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into lesson_prefs (class_id, lesson_id, hidden) select class_id, 'm10c-1-1', array['md-abc'] from ctx;
select _assert((select hidden from lesson_prefs) = array['md-abc'], 'teacher hides a block from the slides');
insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', 'Private board', '[{"background":"grid","strokes":[]}]' from ctx;
insert into boards (class_id, lesson_id, title, pages, shared) select class_id, 'm10c-1-1', 'Shared board', '[]', true from ctx;
select _fails($$insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', 'Bad', '{}' from ctx$$, 'board pages must be a list');
select _fails($$insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', '', '[]' from ctx$$, 'boards need a name');
select _assert((select count(*) from boards) = 2, 'teacher sees every board of the class');
update boards set title = 'Renamed board', updated_at = now() where title = 'Private board';
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from boards) = 1 and (select title from boards) = 'Shared board', 'students see only shared boards');
select _assert((select count(*) from lesson_prefs) = 0, 'students cannot read presenting choices');
select _fails($$insert into boards (class_id, lesson_id, title) select class_id, 'm10c-1-1', 'Mine' from ctx$$, 'students cannot save boards');
select _fails($$insert into lesson_prefs (class_id, lesson_id) select class_id, 'm10c-1-2' from ctx$$, 'students cannot hide blocks');
update boards set shared = true;
delete from boards;
reset role;
select _assert((select count(*) from boards where shared) = 1, 'students cannot share a board');
select _assert((select count(*) from boards) = 2, 'students cannot delete boards');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from boards) = 0, 'other teachers see no boards');
select _assert((select count(*) from lesson_prefs) = 0, 'other teachers see no presenting choices');
select _fails($$insert into boards (class_id, lesson_id, title) select class_id, 'm10c-1-1', 'Theirs' from ctx$$, 'other teachers cannot save boards to the class');
reset role;

-- ---------------------------------------------------------------- live class questions
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into live_questions (class_id, lesson_id, skill_id, difficulty, seed) select class_id, 'm10c-1-1', 'm1-referents', 1, 42 from ctx;
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 43 from ctx$$, 'only one open question per class');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 4, 43 from ctx$$, 'difficulty is 1 to 3');
reset role;
create temp table lq as select id from live_questions limit 1;
grant select on lq to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_questions) = 1, 'students see their class''s question');
insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b1', '["a"]' from ctx;
update live_answers set responses = '["b"]', answered_at = now() where student_id = '00000000-0000-0000-0000-0000000000b1';
select _assert((select responses ->> 0 from live_answers) = 'b', 'students change their answer while the question is open');
select _fails($$insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b2', '["a"]' from ctx$$, 'students cannot answer for someone else');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 7 from ctx$$, 'students cannot ask questions');
-- Row-level security hides the question from a student's update, so nothing changes.
update live_questions set status = 'closed';
reset role;
select _assert((select status from live_questions) = 'open', 'students cannot close questions');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b2', '["c"]' from ctx;
select _assert((select count(*) from live_answers) = 1, 'students see only their own answers');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_questions) = 0, 'other teachers see no live questions');
select _assert((select count(*) from live_answers) = 0, 'other teachers see no live answers');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 9 from ctx$$, 'other teachers cannot ask the class');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_answers) = 2, 'the teacher sees every answer');
update live_questions set status = 'closed', closed_at = now();
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$update live_answers set responses = '["a"]' where student_id = '00000000-0000-0000-0000-0000000000b1'$$, 'answers are locked once the question closes');
select _fails($$insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b9', '["a"]' from ctx$$, 'no new answers once the question closes');
reset role;
select _assert((select responses ->> 0 from live_answers where student_id = '00000000-0000-0000-0000-0000000000b1') = 'b', 'locked answer unchanged');

-- ---------------------------------------------------------------- self-paced study
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b9","role":"authenticated"}', false);
set role authenticated;
select start_self_paced('math-20-1', array['m201-1-1', 'm201-1-2']);
select start_self_paced('math-20-1', array['m201-1-2', 'm201-1-3']);
select _assert((select count(*) from classes where kind = 'self') = 1, 'one self-paced class per course');
select _assert((select teacher_id is null and settings ->> 'aiAutopilot' = 'true' from classes where kind = 'self'), 'self-paced classes have no teacher and the AI autopilot on');
select _assert((select count(*) from publications) = 3, 'every lesson passed is published, again on later calls');
select _fails($$select start_self_paced('../etc', array[]::text[])$$, 'unknown course names are rejected');
-- Only a class's teacher may update it, so a student's update changes nothing.
update classes set name = 'Mine' where kind = 'self';
reset role;
select _assert((select name from classes where kind = 'self') = 'Self-paced', 'students cannot change their self-paced class directly');
create temp table selfc as select id, join_code from classes where kind = 'self';
grant select on selfc to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select join_class((select join_code from selfc))$$, 'a self-paced class cannot be joined with its code');
select _assert((select count(*) from classes where kind = 'self') = 0, 'students do not see other students'' self-paced classes');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select start_self_paced('math-10c', array[]::text[])$$, 'teachers do not study self-paced');
select _assert((select count(*) from classes where kind = 'self') = 0, 'teachers do not see self-paced classes');
reset role;
select _fails($$insert into classes (teacher_id, name, course_id, kind) values (null, 'Bad', 'math-10c', 'teacher')$$, 'a teacher''s class needs a teacher');

-- ---------------------------------------------------------------- join requests
-- The teacher asks for approval; Sneaky (not in the class, studying on their own) uses the code.
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
update classes set settings = settings || '{"joinApproval": true}' where id = (select class_id from ctx);
reset role;
select _assert((select settings -> 'joinApproval' from classes where id = (select class_id from ctx)) = 'true'::jsonb, 'the teacher turns on approval');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b9","role":"authenticated"}', false);
set role authenticated;
select _fails($$select join_class((select join_code from ctx))$$, 'the older join function does not skip approval');
select _assert((select request_to_join((select lower(join_code) from ctx), 'Hi, I am in Block A') ->> 'status') = 'pending', 'a code sends a request when the class asks for approval');
select _assert((select request_to_join((select join_code from ctx), 'Again') ->> 'status') = 'pending', 'asking twice is harmless');
select _assert((select count(*) from classes where id = (select class_id from ctx)) = 0, 'not in the class before approval');
select _assert((select teacher_name from my_join_requests()) = 'Ms T. Teacher' and (select count(*) from my_join_requests()) = 1, 'the student sees their request with the teacher''s name');
select _fails($$insert into join_requests (class_id, student_id) select class_id, '00000000-0000-0000-0000-0000000000b9' from ctx$$, 'requests are made only through the functions');
select _fails($$update join_requests set status = 'approved'$$, 'students cannot approve their own request');
select _fails($$select class_join_requests((select class_id from ctx))$$, 'students cannot list a class''s requests');
select _fails($$select decide_join_request((select id from join_requests limit 1), true)$$, 'students cannot decide requests');
select _fails($$select request_to_join('ZZZZZZ')$$, 'unknown codes are rejected');
reset role;
select _assert(not has_function_privilege('authenticated', 'public.add_join_request(public.classes, uuid, text, text)', 'execute'), 'the internal helper is not callable by users');
select _assert((select message from join_requests) = 'Hi, I am in Block A', 'the first message is kept while the request is pending');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title = 'Sneaky asked to join Math 10C') = 1, 'the teacher is told once');
create temp table jr as select id from join_requests;
grant select on jr to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from join_requests) = 0, 'other teachers do not see the requests');
select _fails($$select class_join_requests((select class_id from ctx))$$, 'other teachers cannot list the requests');
select _fails($$select decide_join_request((select id from jr), true)$$, 'other teachers cannot decide');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select full_name from class_join_requests((select class_id from ctx))) = 'Sneaky', 'the teacher sees who is asking');
select decide_join_request((select id from jr), true);
select decide_join_request((select id from jr), false);
select _assert((select count(*) from class_join_requests((select class_id from ctx))) = 0, 'an approved request is no longer pending');
reset role;
select _assert(exists (select 1 from enrollments where class_id = (select class_id from ctx) and student_id = '00000000-0000-0000-0000-0000000000b9'), 'approval enrols the student');
select _assert((select status from join_requests) = 'approved', 'a decided request cannot be decided again');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000b9' and title = 'You joined Math 10C') = 1, 'the student is told');
select _assert((select count(*) from classes c join enrollments e on e.class_id = c.id where e.student_id = '00000000-0000-0000-0000-0000000000b9' and c.kind = 'self') = 1, 'the student keeps their self-paced course');

-- Signing up with the code sends a request; the teacher declines it; asking again renews it.
insert into auth.users (id, email, raw_user_meta_data)
select '00000000-0000-0000-0000-0000000000b8', 'max@home.ca', jsonb_build_object('full_name', 'Max Roy', 'role', 'student', 'join_code', join_code) from ctx;
select _assert(not exists (select 1 from enrollments where student_id = '00000000-0000-0000-0000-0000000000b8'), 'signing up with the code does not skip approval');
select _assert((select status from join_requests where student_id = '00000000-0000-0000-0000-0000000000b8') = 'pending', 'signing up with the code sends a request');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select decide_join_request((select id from join_requests where student_id = '00000000-0000-0000-0000-0000000000b8'), false);
reset role;
select _assert((select status from join_requests where student_id = '00000000-0000-0000-0000-0000000000b8') = 'declined', 'the teacher declines');
select _assert(not exists (select 1 from enrollments where student_id = '00000000-0000-0000-0000-0000000000b8'), 'a declined student is not enrolled');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000b8' and title like '%was declined') = 1, 'the student is told about the decline');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b8","role":"authenticated"}', false);
set role authenticated;
select _assert((select request_to_join((select join_code from ctx)) ->> 'status') = 'pending', 'a student may ask again after a decline');
reset role;
select _assert((select status from join_requests where student_id = '00000000-0000-0000-0000-0000000000b8') = 'pending', 'asking again renews the request');

-- ---------------------------------------------------------------- course requests
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select request_course('course', 'AP Calculus BC', 12, 'For students who want to write the AP exam.');
select _fails($$select request_course('course', 'AB', 12, null)$$, 'a request needs a real name');
select _fails($$select request_course('lesson', 'Matrices', 11, null)$$, 'only courses and topics can be requested');
select _fails($$select request_course('topic', 'Matrices', 13, null)$$, 'grades go from 1 to 12');
select _fails($$insert into course_requests (requester_id, kind, title) values ('00000000-0000-0000-0000-0000000000b1', 'topic', 'Matrices')$$, 'requests are made only through the function');
select _fails($$select admin_course_requests()$$, 'only administrators see the inbox');
select _fails($$select admin_update_course_request((select id from course_requests limit 1), 'done', null, null)$$, 'only administrators update requests');
select request_course('topic', 'Matrices', 11, null);
select request_course('topic', 'Vectors', 12, null);
select request_course('topic', 'Complex numbers', 12, null);
select request_course('topic', 'Conic sections', 12, null);
select _fails($$select request_course('topic', 'Proofs', 12, null)$$, 'at most 5 requests a day');
select _assert((select count(*) from course_requests) = 5, 'the student sees their own requests');
reset role;
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title = 'New course request: AP Calculus BC') = 1, 'administrators are told about new requests');
create temp table cr as select id from course_requests where title = 'AP Calculus BC';
grant select on cr to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from course_requests) = 0, 'students do not see other people''s requests');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select admin_course_requests()$$, 'teachers who are not administrators do not see the inbox');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select requester_name from admin_course_requests('new') where title = 'AP Calculus BC') = 'Sam Student', 'the administrator sees who asked');
select _fails($$select admin_update_course_request((select id from cr), 'approved', null, 'https://evil.example/x')$$, 'issue links must point to a GitHub issue');
select admin_update_course_request((select id from cr), 'approved', null, 'https://github.com/Shedrackeze002/EduCore/issues/42');
select admin_update_course_request((select id from cr), 'approved', 'Planned for the spring.', 'https://github.com/Shedrackeze002/EduCore/issues/42');
reset role;
select _assert((select status = 'approved' and issue_url like '%/issues/42' and admin_note = 'Planned for the spring.' from course_requests where id = (select id from cr)), 'the administrator approves with the issue link');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000b1' and title = 'Your request is planned: AP Calculus BC') = 1, 'the student is told once when the request is approved');
select _assert((select count(*) from admin_audit_log where action = 'course_request_approved') = 1, 'the decision is audited');

-- ---------------------------------------------------------------- lesson edit suggestions
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select suggest_lesson_edit('m10c-1-1', 'Units', 'aaaaaaaa', '## Units', '## Units\n\nBetter.', null)$$, 'students cannot suggest lesson edits');
reset role;

-- Mr Other (an approved teacher, not an administrator) suggests edits.
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select suggest_lesson_edit('m10c-1-1', 'Units', 'aaaaaaaa', '## Units', '## Units', null)$$, 'a suggestion must change something');
select _fails($$select suggest_lesson_edit('m10c-1-1', 'Units', 'not-a-hash', '## Units', '## Units\n\nBetter.', null)$$, 'section fingerprints are checked');
select suggest_lesson_edit('m10c-1-1', 'Units', 'aaaaaaaa', '## Units', '## Units\n\nClearer wording.', 'Students found it confusing.');
select suggest_lesson_edit('m10c-1-1', 'Units', 'aaaaaaaa', '## Units', '## Units\n\nA second idea.', null);
select suggest_lesson_edit('m10c-1-2', 'Estimating', 'bbbbbbbb', '## Estimating', '## Estimating\n\nWithdrawn soon.', null);
select withdraw_lesson_edit((select id from lesson_edits where lesson_id = 'm10c-1-2'));
select _assert((select status from lesson_edits where lesson_id = 'm10c-1-2') = 'withdrawn', 'authors can withdraw a waiting suggestion');
select _fails($$select admin_lesson_edits()$$, 'teachers who are not administrators cannot review edits');
select _fails($$select admin_decide_lesson_edit((select id from lesson_edits limit 1), 'approved', null)$$, 'teachers cannot approve their own edits');
select _fails($$insert into lesson_edits (lesson_id, section_title, base_hash, original, markdown, author_id) values ('m10c-1-1', 'X', 'aaaaaaaa', '', 'x', '00000000-0000-0000-0000-0000000000a2')$$, 'edits are made only through the functions');
select _assert((select count(*) from lesson_edits) = 3, 'authors see their own suggestions');
reset role;
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title = 'Lesson edit suggested: Units') = 2, 'administrators are told about suggestions');
create temp table le as select id, markdown from lesson_edits where lesson_id = 'm10c-1-1';
grant select on le to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from lesson_edits) = 0, 'students do not see suggestions waiting for review');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from admin_lesson_edits('pending')) = 2 and (select author_name from admin_lesson_edits('pending') limit 1) = 'Mr Other', 'the administrator sees waiting suggestions and who made them');
select admin_decide_lesson_edit((select id from le where markdown like '%Clearer%'), 'approved', null);
select _fails($$select admin_decide_lesson_edit((select id from le where markdown like '%Clearer%'), 'declined', null)$$, 'a decided suggestion cannot be decided again');
select admin_decide_lesson_edit((select id from le where markdown like '%second%'), 'approved', 'Combined with the earlier edit.');
reset role;
select _assert((select status from lesson_edits where markdown like '%Clearer%') = 'replaced', 'approving a new edit for a section replaces the earlier one');
select _assert((select count(*) from lesson_edits where status = 'approved') = 1, 'one approved edit per section');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select markdown from lesson_edits) like '%second idea%', 'everyone reads approved edits');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select admin_decide_lesson_edit((select id from le where markdown like '%second%'), 'reverted', null);
reset role;
select _assert((select count(*) from lesson_edits where status = 'approved') = 0, 'reverting returns the section to the file');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a2' and title like 'Your lesson edit%') = 3, 'the author is told about each decision');
select _assert((select count(*) from admin_audit_log where action like 'lesson_edit_%') = 3, 'decisions are audited');

-- ---------------------------------------------------------------- exam mode
insert into assignments (class_id, title, type, content, settings, status)
select class_id, 'Locked exam', 'exam', '{"sections":[{"skillId":"m1-referents","count":1,"difficulty":1}],"custom":[]}', '{"lockdown":true,"maxExits":2,"onMaxExits":"lock","attempts":1}', 'published' from ctx;
insert into submissions (assignment_id, class_id, student_id, seed, items)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 1, '[{"skillId":"m1-referents","seed":5,"difficulty":1}]' from assignments a where a.title = 'Locked exam';
create temp table ex as select id from submissions where assignment_id = (select id from assignments where title = 'Locked exam');
grant select on ex to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
update submissions set integrity = '{"blurCount":1,"events":[{"at":"t1","kind":"tab"}],"extraExits":50}' where id = (select id from ex);
update submissions set integrity = '{"blurCount":0,"events":[]}' where id = (select id from ex);
reset role;
select _assert(not ((select integrity from submissions where id = (select id from ex)) ? 'extraExits'), 'students cannot give themselves extra exits');
select _assert((select jsonb_array_length(integrity -> 'events') = 1 and (integrity ->> 'blurCount')::int = 1 from submissions where id = (select id from ex)), 'exits cannot be erased');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
update submissions set integrity = '{"blurCount":2,"events":[{"at":"t1","kind":"tab"},{"at":"t2","kind":"fullscreen"}]}' where id = (select id from ex);
select _fails($$update submissions set responses = '{"0":{"answers":["x"],"hintsUsed":0}}' where id = (select id from ex)$$, 'a locked attempt''s answers cannot change');
reset role;
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title = 'Sam Student''s attempt at Locked exam is locked') = 1, 'the teacher is told when an attempt locks');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select unlock_attempt((select id from ex))$$, 'only the class''s teacher can unlock an attempt');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select unlock_attempt((select id from ex));
reset role;
select _assert((select (integrity ->> 'extraExits')::int from submissions where id = (select id from ex)) = 2, 'unlocking allows as many exits again');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000b1' and title = 'Your teacher unlocked Locked exam') = 1, 'the student is told about the unlock');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
update submissions set responses = '{"0":{"answers":["x"],"hintsUsed":0}}', integrity = '{"blurCount":2,"events":[{"at":"t1","kind":"tab"},{"at":"t2","kind":"fullscreen"}]}' where id = (select id from ex);
reset role;
select _assert((select responses -> '0' -> 'answers' ->> 0 = 'x' and (integrity ->> 'extraExits')::int = 2 from submissions where id = (select id from ex)), 'after the unlock the student carries on and keeps the allowance');

-- ---------------------------------------------------------------- explainer video links
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select admin_set_video_link('m10c-2-1', 'dQw4w9WgXcQ')$$, 'only administrators link videos');
select _fails($$insert into video_links (video_id, youtube_id) values ('m10c-2-1', 'dQw4w9WgXcQ')$$, 'video links are written only through the function');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select admin_set_video_link('m10c-2-1', 'not an id')$$, 'a YouTube id is checked');
select _fails($$select admin_set_video_link('', null)$$, 'a video id is checked, also when removing a link');
select admin_set_video_link('m10c-2-1', 'dQw4w9WgXcQ');
select admin_set_video_link('m10c-2-1', 'abcdefghijk');
reset role;
select _assert((select youtube_id from video_links where video_id = 'm10c-2-1') = 'abcdefghijk', 'an administrator links a video and can change the link');
select _assert((select count(*) from admin_audit_log where action = 'video_link_set') = 2, 'linking videos is audited');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select youtube_id from video_links where video_id = 'm10c-2-1') = 'abcdefghijk', 'students see the links');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select admin_set_video_link('m10c-2-1', null);
reset role;
select _assert((select count(*) from video_links) = 0, 'an administrator removes a link');
select _assert((select count(*) from admin_audit_log where action = 'video_link_removed' and details ->> 'video' = 'm10c-2-1') = 1, 'removing a link is audited');

-- ---------------------------------------------------------------- joining by link with a name
-- join-class (the service role) makes name-only accounts and asks the teacher; anyone with the
-- link sees just the class's and teacher's names.
grant select on ctx to service_role;
select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _assert((select class_name from class_for_join((select lower(join_code) from ctx))) = 'Math 10C', 'anyone with the link sees the class name');
select _assert((select count(*) from class_for_join('ZZZZZZ')) = 0, 'an unknown link shows nothing');
select _fails($$select request_to_join_by_name('00000000-0000-0000-0000-0000000000b1', (select class_id from ctx))$$, 'anon cannot make requests by name');
select _fails($$select name_only_takeover('00000000-0000-0000-0000-0000000000b1')$$, 'anon cannot take over accounts');
select _fails($$select prune_name_only_accounts()$$, 'anon cannot prune accounts');
reset role;

insert into auth.users (id, email, raw_app_meta_data) values
  ('00000000-0000-0000-0000-0000000000c1', 'n-1@students.educore.local', '{"role":"student","full_name":"Ama Mensah"}'),
  ('00000000-0000-0000-0000-0000000000c2', 'n-2@students.educore.local', '{"role":"student","full_name":"ama  mensah"}'),
  ('00000000-0000-0000-0000-0000000000c3', 'n-3@students.educore.local', '{"role":"student","full_name":"Kofi Boateng"}');
update profiles set name_only = true where id in ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000c3');
set role service_role;
select request_to_join_by_name('00000000-0000-0000-0000-0000000000c1', (select class_id from ctx));
reset role;
select _fails($$select request_to_join_by_name('00000000-0000-0000-0000-0000000000b1', (select class_id from ctx))$$, 'only name-only students ask by name');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000c1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select request_to_join_by_name('00000000-0000-0000-0000-0000000000c1', (select class_id from ctx))$$, 'students cannot call the service function');
select _fails($$select name_only_takeover('00000000-0000-0000-0000-0000000000c1')$$, 'students cannot look up a takeover');
select _fails($$select decide_join_requests((select class_id from ctx), '[]')$$, 'students cannot decide requests in bulk');
select _assert((select status from my_join_requests()) = 'pending' and not (select linked from my_join_requests()), 'the name-only student waits for the teacher');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select name_only and email is null and match_id is null from class_join_requests((select class_id from ctx)) where full_name = 'Ama Mensah'), 'the teacher sees a name from the link, with no email');
select _assert((select decide_join_requests((select class_id from ctx), jsonb_build_array(jsonb_build_object('id', id, 'approve', true))) from join_requests where student_id = '00000000-0000-0000-0000-0000000000c1') = 1, 'the teacher approves in bulk');
reset role;
select _assert(exists (select 1 from enrollments where class_id = (select class_id from ctx) and student_id = '00000000-0000-0000-0000-0000000000c1'), 'approval enrols the name-only student');

-- Ama comes back on another device (c2, the same name typed differently); Kofi is a stranger.
set role service_role;
select request_to_join_by_name('00000000-0000-0000-0000-0000000000c2', (select class_id from ctx));
select request_to_join_by_name('00000000-0000-0000-0000-0000000000c3', (select class_id from ctx));
reset role;
create temp table nj as select r.id, r.student_id from join_requests r where r.student_id in ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000c3');
grant select on nj to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select decide_join_requests((select class_id from ctx), '[]')$$, 'other teachers cannot decide in bulk');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select match_id = '00000000-0000-0000-0000-0000000000c1' and match_name = 'Ama Mensah' from class_join_requests((select class_id from ctx)) where student_id = '00000000-0000-0000-0000-0000000000c2'), 'the teacher sees the matching student already in the class');
select _assert((select match_id is null from class_join_requests((select class_id from ctx)) where student_id = '00000000-0000-0000-0000-0000000000c3'), 'a new name matches nobody');
select _fails($$select decide_join_requests((select class_id from ctx), jsonb_build_array(jsonb_build_object('id', (select id from nj where student_id = '00000000-0000-0000-0000-0000000000c2'), 'approve', true, 'sameAs', '00000000-0000-0000-0000-0000000000b1')))$$, 'a request cannot take over a student with their own email account');
select _assert(decide_join_requests((select class_id from ctx), jsonb_build_array(
  jsonb_build_object('id', (select id from nj where student_id = '00000000-0000-0000-0000-0000000000c2'), 'approve', true, 'sameAs', '00000000-0000-0000-0000-0000000000c1'),
  jsonb_build_object('id', (select id from nj where student_id = '00000000-0000-0000-0000-0000000000c3'), 'approve', false))) = 2, 'the teacher matches one and declines the other at once');
reset role;
select _assert(not exists (select 1 from enrollments where student_id = '00000000-0000-0000-0000-0000000000c2'), 'a matched device is not enrolled as a new student');
select _assert((select status from join_requests where student_id = '00000000-0000-0000-0000-0000000000c3') = 'declined', 'the stranger is declined');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000c2","role":"authenticated"}', false);
set role authenticated;
select _assert((select linked from my_join_requests()), 'the device learns it was matched');
reset role;
set role service_role;
select _assert(name_only_takeover('00000000-0000-0000-0000-0000000000c2') = '00000000-0000-0000-0000-0000000000c1', 'the device may take over the matched student');
select _assert(name_only_takeover('00000000-0000-0000-0000-0000000000c3') is null, 'a declined device takes over nothing');
reset role;

-- The daily clean-up removes the declined stranger, and keeps the student in the class and the
-- device that is about to take over.
update auth.users set created_at = now() - interval '3 days' where id in ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000c3');
update join_requests set decided_at = now() - interval '2 days' where student_id = '00000000-0000-0000-0000-0000000000c3';
select _assert(prune_name_only_accounts() = 1, 'one stale name-only account is removed');
select _assert(not exists (select 1 from profiles where id = '00000000-0000-0000-0000-0000000000c3'), 'the declined stranger is gone');
select _assert(exists (select 1 from profiles where id = '00000000-0000-0000-0000-0000000000c1') and exists (select 1 from profiles where id = '00000000-0000-0000-0000-0000000000c2'), 'the class member and the matched device stay');
select _assert(not has_function_privilege('authenticated', 'public.prune_name_only_accounts()', 'execute'), 'users cannot prune accounts');

-- ---------------------------------------------------------------- students' questions during a presentation
create temp table pres (started_at timestamptz);
grant select, insert, delete on pres to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select ask_class_question((select class_id from ctx), 'Why?', true)$$, 'no questions while nobody presents');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select start_presenting((select class_id from ctx), 'm10c-1-1')$$, 'other teachers cannot present to the class');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into pres select start_presenting((select class_id from ctx), 'm10c-1-1');
select _assert(start_presenting((select class_id from ctx), 'm10c-1-1') = (select started_at from pres), 'the heartbeat keeps the start time');
select _fails($$select start_presenting((select class_id from ctx), repeat('x', 41))$$, 'lesson ids are short');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select lesson_id from class_presentations where ended_at is null) = 'm10c-1-1', 'students see what is being presented');
select _assert((select body from ask_class_question((select class_id from ctx), '  Why is the square root of 2 irrational?  ', true)) = 'Why is the square root of 2 irrational?', 'questions are trimmed');
select ask_class_question((select class_id from ctx), 'Can you show the second step again?', false);
select _assert((select count(*) from class_questions) = 2, 'a student sees their own questions');
select _assert((select bool_and(presented_at = (select started_at from pres) and lesson_id = 'm10c-1-1' and status = 'new') from class_questions), 'questions belong to the presentation');
select _assert((select count(*) from class_questions where anonymous) = 1, 'the student chooses whether the class sees their name');
select _fails($$select ask_class_question((select class_id from ctx), '   ', true)$$, 'empty questions are refused');
select _fails($$select ask_class_question((select class_id from ctx), repeat('x', 301), true)$$, 'long questions are refused');
select _fails($$insert into class_questions (class_id, lesson_id, student_id, body, presented_at) select class_id, 'm10c-1-1', '00000000-0000-0000-0000-0000000000b1', 'Hi', now() from ctx$$, 'students cannot add questions directly');
-- Row-level security hides the questions from a student's update, so nothing changes.
update class_questions set status = 'answered';
select ask_class_question((select class_id from ctx), q, true) from unnest(array['Three?', 'Four?', 'Five?']) q;
select _fails($$select ask_class_question((select class_id from ctx), 'Six?', true)$$, 'five questions in ten minutes at most');
select _fails($$select stop_presenting((select class_id from ctx))$$, 'students cannot stop the presentation');
select _fails($$select start_presenting((select class_id from ctx), 'm10c-1-1')$$, 'students cannot present');
reset role;
select _assert((select count(*) from class_questions where status = 'new') = 5, 'students cannot mark their own questions');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from class_questions) = 0, 'students do not see classmates'' questions');
select _assert((select not anonymous from ask_class_question((select class_id from ctx), 'Is this on the test?', null)), 'names show to the class unless the student hides them');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from class_questions) = 0, 'other teachers see no questions');
select _assert((select count(*) from class_presentations) = 0, 'other teachers do not see the presentation');
update class_questions set status = 'skipped';
reset role;
select _assert((select count(*) from class_questions where status = 'skipped') = 0, 'other teachers cannot mark questions');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from class_questions) = 6, 'the teacher sees every question');
select _assert((select count(distinct student_id) from class_questions) = 2, 'the teacher sees who asked');
update class_questions set status = 'answered', decided_at = now() where body = 'Can you show the second step again?';
update class_questions set status = 'skipped', decided_at = now() where body = 'Is this on the test?';
select _fails($$update class_questions set body = 'Changed' where body = 'Four?'$$, 'nobody rewrites a student''s question');
delete from class_questions where body = 'Five?';
select stop_presenting((select class_id from ctx));
reset role;
select _assert((select count(*) filter (where status = 'answered') = 1 and count(*) filter (where status = 'skipped') = 1 and count(*) = 5 from class_questions), 'the teacher answers, skips and removes questions');
select _assert((select ended_at is not null from class_presentations), 'stopping ends the presentation');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select ask_class_question((select class_id from ctx), 'Still there?', true)$$, 'no questions after the presentation ends');
reset role;

-- The same lesson picked up again within ten minutes keeps its questions together. A presentation
-- left open in a closed tab ends by itself after five minutes without a heartbeat.
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert(start_presenting((select class_id from ctx), 'm10c-1-1') = (select started_at from pres), 'presenting the lesson again soon after stopping carries on');
reset role;
update class_presentations set seen_at = now() - interval '6 minutes';

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select ask_class_question((select class_id from ctx), 'Hello?', true)$$, 'a presentation without a heartbeat ends by itself');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert(start_presenting((select class_id from ctx), 'm10c-1-1') = (select started_at from pres), 'the same lesson picked up soon keeps its start');
select _assert(start_presenting((select class_id from ctx), 'm10c-1-2') > (select started_at from pres), 'another lesson starts afresh');
select stop_presenting((select class_id from ctx));
reset role;
update class_presentations set ended_at = now() - interval '11 minutes';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
delete from pres;
insert into pres select started_at from class_presentations;
select _assert(start_presenting((select class_id from ctx), 'm10c-1-2') > (select started_at from pres), 'the same lesson after a long break starts afresh');
reset role;
select _assert(not has_function_privilege('anon', 'public.ask_class_question(uuid, text, boolean)', 'execute'), 'anon cannot ask questions');
select _assert(not has_function_privilege('anon', 'public.start_presenting(uuid, text)', 'execute'), 'anon cannot present');

-- ---------------------------------------------------------------- report cards
-- ai-agent (service role) writes a draft; the teacher edits and shares it; the student sees it once
-- shared, and a parent reads it by its private link until the teacher turns the link off.
insert into report_cards (class_id, student_id, period, content, source)
select class_id, '00000000-0000-0000-0000-0000000000b1', 'Term 1', '{"summary":"{name} is doing well."}', 'offline' from ctx;
create temp table rc as select id from report_cards limit 1;
grant select on rc to authenticated, anon;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from report_cards) = 0, 'a student does not see a draft report card');
select _fails($$insert into report_cards (class_id, student_id, content, source) select class_id, '00000000-0000-0000-0000-0000000000b1', '{}', 'offline' from ctx$$, 'students cannot write report cards');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from report_cards) = 0, 'other teachers see no report cards');
select _fails($$select share_report_card((select id from rc), true)$$, 'other teachers cannot share a report card');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
update report_cards set content = '{"summary":"{name} has grown a lot."}', updated_at = now();
select _fails($$update report_cards set status = 'shared'$$, 'sharing goes through share_report_card');
select _fails($$select report_card_link((select id from rc), true)$$, 'no private link before the card is shared');
select _assert((select status from share_report_card((select id from rc), true)) = 'shared', 'the teacher shares the card');
create temp table tok as select report_card_link((select id from rc), true) as t;
select _assert((select char_length(t) from tok) = 64, 'the private link has a long random token');
select _assert(report_card_link((select id from rc), true) = (select t from tok), 'the link stays the same while it is on');
reset role;
grant select on tok to anon, authenticated;
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000b1' and title = 'Your report card is ready') = 1, 'the student is told');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select content ->> 'summary' from report_cards) = '{name} has grown a lot.', 'the student sees the shared card');
update report_cards set content = '{"summary":"Top marks"}';
select _fails($$select share_report_card((select id from rc), false)$$, 'students cannot unshare a card');
reset role;
select _assert((select content ->> 'summary' from report_cards) = '{name} has grown a lot.', 'students cannot change their report card');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from report_cards) = 0, 'students do not see classmates'' report cards');
reset role;

select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _assert((select shared_report_card((select t from tok)) ->> 'studentName') = 'Sam', 'a parent reads the card by its link, with the first name only');
select _assert(shared_report_card(repeat('0', 64)) is null, 'a wrong token reads nothing');
select _fails($$select count(*) from report_cards$$, 'anon cannot read report cards directly');
select _fails($$select share_report_card((select id from rc), true)$$, 'anon cannot share report cards');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select share_token from share_report_card((select id from rc), false)) is null, 'unsharing ends the private link');
reset role;
select _assert(shared_report_card((select t from tok)) is null, 'an ended link reads nothing');

-- ---------------------------------------------------------------- anon
select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _fails($$select count(*) from classes$$, 'anon has no table access');
select _fails($$select count(*) from video_links$$, 'anon cannot read video links');
select _fails($$select send_due_reminders()$$, 'anon cannot run the scheduler');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select send_due_reminders()$$, 'users cannot run the scheduler');
reset role;

select 'ALL DATABASE TESTS PASSED' as result;
