-- ============================================================
-- SESSION RESULT  (competitive groups)
-- One row per participant per session. Which columns are
-- populated depends on the group's competitive_track_method.
-- ============================================================

CREATE TABLE session_result (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID        NOT NULL REFERENCES session(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,

  score       INTEGER,                                         -- points track method
  outcome     TEXT        CHECK (outcome IN ('win', 'loss', 'draw')), -- win_loss track method
  rank        INTEGER     CHECK (rank > 0),                   -- rankings track method

  -- ELO snapshot at time of recording (denormalised for fast leaderboard reads)
  elo_before  INTEGER,
  elo_after   INTEGER,

  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, user_id)
);

-- ============================================================
-- ELO HISTORY
-- Full audit trail of every ELO change per user per group.
-- group_member.elo_rating is the live current value;
-- this table lets you reconstruct the full ELO progression curve.
-- ============================================================

CREATE TABLE elo_history (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  group_id    UUID        NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  session_id  UUID        NOT NULL REFERENCES session(id) ON DELETE CASCADE,
  elo_before  INTEGER     NOT NULL,
  elo_after   INTEGER     NOT NULL,
  delta       INTEGER     NOT NULL GENERATED ALWAYS AS (elo_after - elo_before) STORED,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
