-- Lightweight anti-abuse rate limiting for public, unauthenticated routes
-- that trigger real OpenAI/crawl costs (/api/analyze, /api/setup when hit
-- without a session). No Redis/Upstash in this project — Postgres is
-- already the only shared state store, and a single atomic upsert avoids
-- the race a naive read-then-write app-side check would have under
-- concurrent requests from the same IP.

create table if not exists public.rate_limits (
  key text primary key,
  count int not null default 1,
  window_start timestamptz not null default now()
);

-- Only ever touched via the service-role client from server-side rate-limit
-- checks — no direct client access needed or wanted.
alter table public.rate_limits enable row level security;

create or replace function public.check_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  insert into public.rate_limits (key, count, window_start)
  values (p_key, 1, now())
  on conflict (key) do update
    set count = case
        when public.rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
          then 1
        else public.rate_limits.count + 1
      end,
      window_start = case
        when public.rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
          then now()
        else public.rate_limits.window_start
      end
  returning count into v_count;

  return v_count <= p_limit;
end;
$$;
