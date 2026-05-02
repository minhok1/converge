-- ============================================================
-- SESSION
-- ============================================================

CREATE TABLE session (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id    UUID         NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  title       TEXT         NOT NULL,
  description TEXT,

  -- Current lifecycle phase. The reachable phases for a session depend
  -- on the parent group's settings (see session_phase enum for details).
  phase       session_phase NOT NULL DEFAULT 'upcoming',

  -- Location and time (populated only when the group/override enables them)
  location     TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  created_by  UUID         NOT NULL REFERENCES profile(id),

  -- Per-session overrides — null means "inherit from the group setting".
  override_has_location BOOLEAN,
  override_has_time     BOOLEAN,
  override_has_polls    BOOLEAN,
  override_has_ratings  BOOLEAN,
  override_has_comments BOOLEAN,
  override_track_method competitive_track_method,

  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ============================================================
-- SESSION ITEM
-- The subject of a session: the book, board game, film, topic…
-- A session can have multiple items (e.g. several game options
-- that were put to a vote; was_chosen flags the winner).
-- ============================================================

CREATE TABLE session_item (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID        NOT NULL REFERENCES session(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  description TEXT,
  -- Flexible bag for domain-specific fields: ISBN, BoardGameGeek ID,
  -- image URL, external link, match details, etc.
  metadata    JSONB,
  was_chosen  BOOLEAN     NOT NULL DEFAULT false,
  added_by    UUID        NOT NULL REFERENCES profile(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
