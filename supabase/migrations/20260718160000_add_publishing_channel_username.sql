-- WordPress publishing previously hardcoded the basic-auth username as
-- "admin" (see app/api/publishing/publish/route.ts) since it was never
-- collected from the user — breaks for anyone whose WP admin username isn't
-- literally "admin". Nullable: empty stays backward compatible with
-- existing channels, falling back to "admin" server-side.
alter table public.publishing_channels add column if not exists username text;
