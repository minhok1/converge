-- ============================================================
-- ENUMS
-- Prefixed with _ so tooling processes this file first.
-- ============================================================

CREATE TYPE member_role AS ENUM (
  'owner',
  'admin',
  'member'
);

-- Voting methods the poll system supports
CREATE TYPE poll_weight_method AS ENUM (
  'plurality',        -- simple majority, one vote per person
  'approval',         -- vote for as many options as you approve
  'borda_count',      -- rank all options, points assigned by rank position
  'instant_runoff',   -- ranked-choice, lowest-voted option eliminated each round
  'condorcet',        -- head-to-head pairwise comparison across all options
  'kemeny_young',     -- finds the aggregate ranking that best matches all ballots
  'range_voting'      -- each voter scores every option on a numeric scale
);

CREATE TYPE competitive_track_method AS ENUM (
  'points',     -- aggregate numeric score per session
  'win_loss',   -- binary win / loss / draw outcome
  'rankings'    -- finishing position (1st, 2nd, 3rd…)
);

-- The lifecycle phase a session moves through.
-- Which phases are reachable depends on the group's settings:
--   has_polls = true  → 'voting' phase is used
--   has_session_ratings = true → 'rating' phase is used
--   otherwise the path is: upcoming → active → completed
CREATE TYPE session_phase AS ENUM (
  'upcoming',    -- scheduled, not yet started
  'voting',      -- pre-session poll(s) are open (what/when/where)
  'active',      -- session is currently happening
  'rating',      -- session ended, rating window is open
  'completed',   -- fully closed, all data recorded
  'cancelled'
);

CREATE TYPE poll_status AS ENUM (
  'open',
  'closed'
);

CREATE TYPE poll_scope AS ENUM (
  'what',    -- what should the group do / read / play?
  'when',    -- when should the group meet?
  'where',   -- where should the group meet?
  'custom'   -- any other group-specific poll
);
