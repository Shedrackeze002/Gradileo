-- Gradileo's public lesson pages (gradileo.com/lessons/...) show each lesson's explainer videos.
-- The site build reads which videos are on YouTube with the public (anon) key, so anyone may read
-- a video's YouTube id and when it was linked. These are the ids of public YouTube videos. Who
-- linked a video (updated_by) stays private: anon is granted only the other three columns.

create policy video_links_read_public on public.video_links for select to anon using (true);

grant select (video_id, youtube_id, updated_at) on public.video_links to anon;
