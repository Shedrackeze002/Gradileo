-- Students a teacher created sign in with a username, but their profile never got it: the
-- sign-up trigger runs before the account's app metadata (where create-students puts the
-- username) is stored. The roster, the gradebook export and Settings then showed the internal
-- sign-in address (name@students…) instead of the username. create-students now writes the
-- username itself; this fills it in for the accounts made before.

update public.profiles p
set username = lower(trim(u.raw_app_meta_data ->> 'username'))
from auth.users u
where u.id = p.id
  and p.role = 'student'
  and p.username is null
  and nullif(trim(u.raw_app_meta_data ->> 'username'), '') is not null
  and not exists (select 1 from public.profiles o where o.username = lower(trim(u.raw_app_meta_data ->> 'username')));
