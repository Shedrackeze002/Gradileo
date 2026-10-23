-- Class forum (roadmap item 8). Students post questions for their class and choose who sees each
-- one: only the teacher, the whole class, or the whole class without their name. The teacher sees
-- every post and who wrote it, replies, pins, marks questions answered, hides or removes posts,
-- and is told about new questions and replies; a student is told about replies to their question.
-- A class without a teacher (self-paced) has no forum, because nobody would moderate it.
--
-- Posts are read only through class_forum(), never from the table, so a classmate can never learn
-- who wrote a question posted without a name (or that student's replies under it).

create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  -- Null for a question (a topic); otherwise the question this replies to.
  topic_id uuid references public.forum_posts (id) on delete cascade,
  title text check (title is null or char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 4000 and btrim(body) <> ''),
  -- Who sees a question: only the 'teacher', the whole 'class', or the class without the
  -- author's name ('anonymous'). A reply has its question's.
  visibility text not null default 'class' check (visibility in ('teacher', 'class', 'anonymous')),
  pinned boolean not null default false,
  answered boolean not null default false,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  check ((topic_id is null) = (title is not null))
);
create index forum_posts_class_idx on public.forum_posts (class_id, created_at desc);
create index forum_posts_topic_idx on public.forum_posts (topic_id, created_at);
create index forum_posts_author_idx on public.forum_posts (author_id, created_at desc);

alter table public.forum_posts enable row level security;
-- No policies and no grants: only the functions below read and write posts.
revoke all on public.forum_posts from anon, authenticated;

-- "Amara O.": how a student's name shows to classmates.
create or replace function public.forum_short_name(p_full text)
returns text language sql immutable set search_path = '' as $$
  select case
    when array_length(regexp_split_to_array(btrim(coalesce(p_full, '')), '\s+'), 1) > 1
      then split_part(btrim(p_full), ' ', 1) || ' ' || upper(left(regexp_replace(btrim(p_full), '^.*\s', ''), 1)) || '.'
    else coalesce(nullif(btrim(p_full), ''), 'Student')
  end;
$$;

-- The class's forum as the caller may see it, oldest first. The teacher sees everything with
-- every author. A student sees the class's questions that are not hidden and their own posts;
-- in a question posted without a name, its author's posts show no author.
create or replace function public.class_forum(p_class_id uuid)
returns table (
  id uuid, topic_id uuid, title text, body text, visibility text, pinned boolean, answered boolean, hidden boolean,
  created_at timestamptz, author_id uuid, author_name text, author_role text, mine boolean
) language plpgsql stable security definer set search_path = '' as $$
declare
  me uuid := (select auth.uid());
  v_teacher boolean := public.is_teacher_of(p_class_id);
begin
  if me is null or not (v_teacher or public.is_enrolled(p_class_id)) then raise exception 'You can only read your own class''s forum.' using errcode = '42501'; end if;
  if (select c.teacher_id from public.classes c where c.id = p_class_id) is null then raise exception 'This class has no teacher, so it has no forum.' using errcode = '55000'; end if;
  return query
  select p.id, p.topic_id, p.title, p.body, p.visibility, p.pinned, p.answered, p.hidden, p.created_at,
    case when masked then null else p.author_id end,
    case
      when masked then 'A classmate'
      when a.role = 'teacher' or v_teacher then a.full_name
      else public.forum_short_name(a.full_name)
    end,
    a.role,
    p.author_id = me
  from public.forum_posts p
  join public.forum_posts t on t.id = coalesce(p.topic_id, p.id)
  join public.profiles a on a.id = p.author_id
  cross join lateral (select not v_teacher and t.visibility = 'anonymous' and p.author_id = t.author_id and p.author_id <> me as masked) m
  where p.class_id = p_class_id
    and (
      v_teacher
      or (
        (t.author_id = me or (t.visibility <> 'teacher' and not t.hidden))
        and (not p.hidden or p.author_id = me)
      )
    )
  order by p.created_at, p.id;
end $$;

-- Posts a question (no topic) or a reply, and returns its id. Students may post ten times in ten
-- minutes. The teacher hears about every question and every student's reply; a question's author
-- hears about replies to it.
create or replace function public.forum_post(p_class_id uuid, p_topic_id uuid, p_title text, p_body text, p_visibility text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  me uuid := (select auth.uid());
  v_teacher boolean := public.is_teacher_of(p_class_id);
  v_body text := btrim(coalesce(p_body, ''));
  v_title text := btrim(coalesce(p_title, ''));
  c public.classes;
  t public.forum_posts;
  v_id uuid;
  v_vis text;
begin
  if me is null or not (v_teacher or public.is_enrolled(p_class_id)) then raise exception 'You can only post in your own class''s forum.' using errcode = '42501'; end if;
  select * into c from public.classes where id = p_class_id;
  if c.teacher_id is null then raise exception 'This class has no teacher, so it has no forum.' using errcode = '55000'; end if;
  if v_body = '' then raise exception 'Write something first.' using errcode = '22023'; end if;
  if char_length(v_body) > 4000 then raise exception 'Keep your post under 4,000 characters.' using errcode = '22023'; end if;
  if not v_teacher and (select count(*) from public.forum_posts where author_id = me and created_at > now() - interval '10 minutes') >= 10 then
    raise exception 'You have posted ten times in the last ten minutes. Wait a little before posting again.' using errcode = '54000';
  end if;

  if p_topic_id is null then
    if v_title = '' then raise exception 'Give your question a title.' using errcode = '22023'; end if;
    if char_length(v_title) > 120 then raise exception 'Keep the title under 120 characters.' using errcode = '22023'; end if;
    -- The teacher's own posts are for the whole class, with their name.
    v_vis := case when v_teacher then 'class' when p_visibility in ('teacher', 'class', 'anonymous') then p_visibility else 'teacher' end;
    insert into public.forum_posts (class_id, author_id, title, body, visibility) values (p_class_id, me, v_title, v_body, v_vis) returning id into v_id;
    if not v_teacher then
      insert into public.notifications (user_id, kind, title, body, link)
      values (c.teacher_id, 'announcement', 'New question in the forum', v_title, '/t/c/' || p_class_id || '/forum/' || v_id);
    end if;
    return v_id;
  end if;

  select * into t from public.forum_posts where id = p_topic_id and class_id = p_class_id and topic_id is null;
  if not found or not (v_teacher or t.author_id = me or (t.visibility <> 'teacher' and not t.hidden)) then
    raise exception 'That question was not found.' using errcode = '42501';
  end if;
  insert into public.forum_posts (class_id, author_id, topic_id, body, visibility) values (p_class_id, me, t.id, v_body, t.visibility) returning id into v_id;
  if t.author_id <> me then
    insert into public.notifications (user_id, kind, title, body, link)
    values (t.author_id, 'announcement', 'New reply to your question', t.title,
            case when t.author_id = c.teacher_id then '/t/c/' || p_class_id || '/forum/' || t.id else '/s/forum/' || t.id end);
  end if;
  if not v_teacher and t.author_id <> c.teacher_id then
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', 'New reply in the forum', t.title, '/t/c/' || p_class_id || '/forum/' || t.id);
  end if;
  return v_id;
end $$;

-- The teacher pins, marks answered, hides or shows a post (null leaves a flag as it is). A
-- question's author may mark it answered.
create or replace function public.forum_moderate(p_post_id uuid, p_pinned boolean, p_answered boolean, p_hidden boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  me uuid := (select auth.uid());
  p public.forum_posts;
begin
  select * into p from public.forum_posts where id = p_post_id;
  if not found then raise exception 'That post was not found.' using errcode = '42501'; end if;
  if public.is_teacher_of(p.class_id) then
    update public.forum_posts set pinned = coalesce(p_pinned, pinned), answered = coalesce(p_answered, answered), hidden = coalesce(p_hidden, hidden) where id = p_post_id;
  elsif p.author_id = me and p.topic_id is null and p_pinned is null and p_hidden is null then
    update public.forum_posts set answered = coalesce(p_answered, answered) where id = p_post_id;
  else
    raise exception 'Only the teacher can do that.' using errcode = '42501';
  end if;
end $$;

-- Removes a post (and a question's replies): its author or the teacher.
create or replace function public.forum_delete(p_post_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.forum_posts;
begin
  select * into p from public.forum_posts where id = p_post_id;
  if not found or not (p.author_id = (select auth.uid()) or public.is_teacher_of(p.class_id)) then
    raise exception 'You can only remove your own posts.' using errcode = '42501';
  end if;
  delete from public.forum_posts where id = p_post_id;
end $$;

revoke execute on function public.class_forum(uuid) from public, anon;
revoke execute on function public.forum_post(uuid, uuid, text, text, text) from public, anon;
revoke execute on function public.forum_moderate(uuid, boolean, boolean, boolean) from public, anon;
revoke execute on function public.forum_delete(uuid) from public, anon;
grant execute on function public.class_forum(uuid) to authenticated;
grant execute on function public.forum_post(uuid, uuid, text, text, text) to authenticated;
grant execute on function public.forum_moderate(uuid, boolean, boolean, boolean) to authenticated;
grant execute on function public.forum_delete(uuid) to authenticated;
