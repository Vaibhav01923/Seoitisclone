-- Tracks when a subscription entered Dodo's "on_hold" (renewal payment
-- failed, dunning in progress) state, so the app can apply its own 3-day
-- grace period on top of Dodo's retries before locking the account out —
-- rather than either granting indefinite access or cutting it off instantly.
-- Cleared on any successful payment/renewal.
alter table public.user_plans add column if not exists payment_failed_at timestamptz;
