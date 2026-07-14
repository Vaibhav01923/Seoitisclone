-- brand_id-filtered queries on these tables (dashboard's per-brand loads,
-- team access checks) had no supporting index — only the primary key. Row
-- counts are small today so this wasn't yet a bottleneck, but every one of
-- these tables grows with normal usage (scans, articles, publishing runs),
-- so add the indexes before it becomes one.
create index if not exists tracked_prompts_brand_id_idx on public.tracked_prompts using btree (brand_id);
create index if not exists articles_brand_id_idx on public.articles using btree (brand_id);
create index if not exists engage_tasks_brand_id_idx on public.engage_tasks using btree (brand_id);
create index if not exists publishing_channels_brand_id_idx on public.publishing_channels using btree (brand_id);
create index if not exists publishing_log_brand_id_idx on public.publishing_log using btree (brand_id);

-- brands' only existing index touching user_id is the composite unique
-- (domain, user_id) — domain is the leading column, so a user_id-only filter
-- (e.g. app/api/setup/route.ts's `.eq("user_id", userId)`) can't use it.
create index if not exists brands_user_id_idx on public.brands using btree (user_id);
