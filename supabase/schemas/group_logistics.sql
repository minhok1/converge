-- ============================================================
-- INVITATION LINK
-- Groups can have multiple shareable invite links with optional
-- expiry and use limits.
-- ============================================================

CREATE TABLE invitation_link (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id   UUID        NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  created_by UUID        NOT NULL REFERENCES profile(id),
  code       TEXT        UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(8), 'hex'),
  expires_at TIMESTAMPTZ,
  max_uses   INTEGER     CHECK (max_uses > 0),  -- null = unlimited
  use_count  INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ANNOUNCEMENT
-- ============================================================

CREATE TABLE announcement (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id   UUID        NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  created_by UUID        NOT NULL REFERENCES profile(id),
  title      TEXT        NOT NULL,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
