-- ============================================================
-- RATING
-- Separate table because users can rate:
--   (a) the session as a whole (item_id = null)
--   (b) a specific session item (item_id = <id>)
-- This also allows querying average ratings for an item
-- independently of any single session (e.g. avg score for a book
-- across every group that read it).
-- ============================================================

CREATE TABLE rating (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID        NOT NULL REFERENCES session(id) ON DELETE CASCADE,
  item_id    UUID        REFERENCES session_item(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  score      SMALLINT    NOT NULL CHECK (score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, item_id, user_id)
);

-- ============================================================
-- COMMENT
-- ============================================================

CREATE TABLE comment (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID        NOT NULL REFERENCES session(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Soft delete so threads stay coherent when a message is removed
  deleted_at TIMESTAMPTZ
);
