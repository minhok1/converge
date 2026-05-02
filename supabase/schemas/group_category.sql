-- ============================================================
-- GROUP CATEGORY
-- Acts as a group template. Each row represents a category +
-- optional subcategory pairing (e.g. category='sports',
-- subcategory='tennis') and carries:
--   • API config  — the external API we've set up for that niche
--                   (actual API keys live in server env variables;
--                    api_slug identifies which one to use)
--   • Default settings — pre-filled values shown when the user
--                        creates a group of this category. The user
--                        can override every field when creating the group.
-- Rows with subcategory = null are top-level categories (e.g. 'sports').
-- Rows with a subcategory are more specific templates (e.g. 'tennis').
-- ============================================================

CREATE TABLE group_category (
  id          UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT  NOT NULL,
  subcategory TEXT,

  -- Slug that maps to an API key stored in server env variables.
  -- null = no external API configured for this category.
  api_slug    TEXT,

  -- ── Default group settings ─────────────────────────────────
  -- These are the values pre-selected in the group creation form.
  -- All are nullable: null means "no opinion / leave it to the user".

  default_has_admin_role                      BOOLEAN,
  default_has_announcements                   BOOLEAN,
  default_has_session_location                BOOLEAN,
  default_has_session_time                    BOOLEAN,
  default_has_polls                           BOOLEAN,
  default_polls_are_weighted                  BOOLEAN,
  default_poll_weight_method                  poll_weight_method,
  default_is_competitive                      BOOLEAN,
  default_has_elo                             BOOLEAN,
  default_competitive_track_method            competitive_track_method,
  default_competitive_uniform_across_sessions BOOLEAN,
  default_has_session_ratings                 BOOLEAN,
  default_has_user_comments                   BOOLEAN,

  UNIQUE (category, subcategory)
);

-- Seed: top-level categories with sensible defaults
INSERT INTO group_category (category, subcategory, api_slug,
  default_is_competitive, default_has_elo, default_has_session_ratings,
  default_has_user_comments, default_has_polls, default_has_session_location,
  default_has_session_time)
VALUES
  ('sports',      null, 'sports_api',     true,  true,  false, false, false, true,  true),
  ('book_club',   null, 'books_api',      false, false, true,  true,  true,  false, true),
  ('board_games', null, 'boardgames_api', false, false, true,  true,  true,  false, true),
  ('debate',      null, null,             false, false, true,  true,  true,  false, true),
  ('learning',    null, null,             false, false, true,  true,  false, false, true),
  ('custom',      null, null,             false, false, false, false, false, false, false);
