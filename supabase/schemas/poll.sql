-- ============================================================
-- POLL
-- A poll belongs to a group and optionally to a specific session.
-- Pre-session polls (e.g. "what should we do next time?") have
-- session_id = null until a session is created from the result.
-- ============================================================

CREATE TABLE poll (
  id            UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id      UUID             NOT NULL REFERENCES user_group(id) ON DELETE CASCADE,
  session_id    UUID             REFERENCES session(id) ON DELETE SET NULL,
  scope         poll_scope       NOT NULL DEFAULT 'what',
  title         TEXT             NOT NULL,
  description   TEXT,
  status        poll_status      NOT NULL DEFAULT 'open',
  is_weighted   BOOLEAN          NOT NULL DEFAULT false,
  -- Overrides the group's default method for this specific poll.
  -- null = use user_group.poll_weight_method.
  weight_method poll_weight_method,
  closes_at     TIMESTAMPTZ,
  created_by    UUID             NOT NULL REFERENCES profile(id),
  created_at    TIMESTAMPTZ      NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ      NOT NULL DEFAULT now()
);

-- ============================================================
-- POLL OPTION
-- ============================================================

CREATE TABLE poll_option (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id     UUID        NOT NULL REFERENCES poll(id) ON DELETE CASCADE,
  label       TEXT        NOT NULL,
  description TEXT,
  -- Optionally links this option to an existing session item
  -- (e.g. a candidate book or game that already exists in the system).
  item_id     UUID        REFERENCES session_item(id) ON DELETE SET NULL,
  created_by  UUID        NOT NULL REFERENCES profile(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- POLL BALLOT  (one submission envelope per user per poll)
-- ============================================================

CREATE TABLE poll_ballot (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id      UUID        NOT NULL REFERENCES poll(id) ON DELETE CASCADE,
  user_id      UUID        NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  -- Total weight this user has to distribute across options.
  -- null for unweighted polls.
  total_weight FLOAT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (poll_id, user_id)
);

-- ============================================================
-- POLL BALLOT RANKING  (actual preferences inside a ballot)
--
-- One table covers all voting methods:
--   Plurality / Approval   → rank = 1 for each approved option
--   Borda / IRV / Condorcet / Kemeny-Young
--                          → rank = 1, 2, 3… (1 = most preferred)
--   Range voting           → weight = numeric score (e.g. 0–10)
--   Weighted plurality     → weight = share of user's total_weight
-- ============================================================

CREATE TABLE poll_ballot_ranking (
  id        UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  ballot_id UUID    NOT NULL REFERENCES poll_ballot(id) ON DELETE CASCADE,
  option_id UUID    NOT NULL REFERENCES poll_option(id) ON DELETE CASCADE,
  rank      INTEGER,
  weight    FLOAT,
  UNIQUE (ballot_id, option_id)
);
