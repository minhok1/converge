-- ============================================================
-- USER_GROUP
-- Named user_group (not group) because GROUP is a reserved word
-- in PostgreSQL. Every setting here can be pre-populated from
-- the chosen group_category row; the user overrides as needed.
-- ============================================================

CREATE TABLE user_group (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  description TEXT,

  -- null = fully custom (no template applied)
  category_id UUID        REFERENCES group_category(id) ON DELETE SET NULL,

  is_public   BOOLEAN     NOT NULL DEFAULT false,
  created_by  UUID        NOT NULL REFERENCES profile(id),

  -- ── Admin ──────────────────────────────────────────────────
  has_admin_role BOOLEAN  NOT NULL DEFAULT false,

  -- ── Announcements ──────────────────────────────────────────
  has_announcements BOOLEAN NOT NULL DEFAULT false,

  -- ── Session metadata ───────────────────────────────────────
  has_session_location BOOLEAN NOT NULL DEFAULT false,
  has_session_time     BOOLEAN NOT NULL DEFAULT false,

  -- ── Polls ──────────────────────────────────────────────────
  has_polls           BOOLEAN            NOT NULL DEFAULT false,
  polls_are_weighted  BOOLEAN            NOT NULL DEFAULT false,
  poll_weight_method  poll_weight_method,

  -- ── Competitive ────────────────────────────────────────────
  is_competitive                      BOOLEAN                   NOT NULL DEFAULT false,
  has_elo                             BOOLEAN                   NOT NULL DEFAULT false,
  competitive_track_method            competitive_track_method,
  competitive_uniform_across_sessions BOOLEAN                   NOT NULL DEFAULT true,

  -- ── Community ──────────────────────────────────────────────
  has_session_ratings BOOLEAN NOT NULL DEFAULT false,
  has_user_comments   BOOLEAN NOT NULL DEFAULT false,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- GROUP MEMBER
-- ============================================================

CREATE TABLE group_member (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id   UUID        NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  role       member_role NOT NULL DEFAULT 'member',
  -- Live ELO rating for this user in this group.
  -- Only meaningful when user_group.has_elo = true.
  elo_rating INTEGER     NOT NULL DEFAULT 1000,
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (group_id, user_id)
);
