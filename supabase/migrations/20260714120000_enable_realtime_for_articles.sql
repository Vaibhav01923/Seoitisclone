-- Newly-generated articles are written from the separate /article page
-- (often a different browser tab) and have no way to notify the dashboard's
-- React state directly. The dashboard listens for INSERT on public.articles
-- via Supabase Realtime, but articles was never added to the
-- supabase_realtime publication — this table's changes were never actually
-- streamed, so that listener would have silently received nothing.
alter publication supabase_realtime add table public.articles;
