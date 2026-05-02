-- ============================================================
-- PUSH SUBSCRIPTION
-- Web Push (VAPID) endpoint stored per user so the server can
-- send session reminders and group notifications.
-- ============================================================

CREATE TABLE push_subscription (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  endpoint   TEXT        NOT NULL,
  auth       TEXT        NOT NULL,
  p256dh     TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, endpoint)
);

-- ============================================================
-- CALENDAR SYNC
-- Per-user per-group calendar integration. Stores the OAuth
-- tokens needed to push sessions to an external calendar.
-- ============================================================

CREATE TABLE calendar_sync (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  group_id      UUID        NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  provider      TEXT        NOT NULL,  -- 'google' | 'outlook' | 'apple'
  access_token  TEXT        NOT NULL,
  refresh_token TEXT,
  expires_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, group_id, provider)
);
