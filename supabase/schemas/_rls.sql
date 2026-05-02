-- ============================================================
-- ROW LEVEL SECURITY
-- Prefixed with _ so tooling processes enums and tables first.
--
-- Access model:
--   • Public groups are readable by any authenticated user.
--   • Private group data is only readable by members.
--   • Writes require membership; some actions require admin/owner.
-- ============================================================

-- ── Helper functions ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_group_member(gid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM group_member
    WHERE group_id = gid AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION is_group_admin(gid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM group_member
    WHERE group_id = gid
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
  );
$$;

-- ── profile ───────────────────────────────────────────────────

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profile: readable by any authenticated user"
  ON profile FOR SELECT TO authenticated USING (true);

CREATE POLICY "profile: users update their own"
  ON profile FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- ── group_category ────────────────────────────────────────────

ALTER TABLE group_category ENABLE ROW LEVEL SECURITY;

CREATE POLICY "group_category: readable by any authenticated user"
  ON group_category FOR SELECT TO authenticated USING (true);

-- ── user_group ────────────────────────────────────────────────

ALTER TABLE user_group ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_group: public groups readable by all"
  ON user_group FOR SELECT TO authenticated
  USING (is_public = true OR is_group_member(id));

CREATE POLICY "user_group: authenticated users can create"
  ON user_group FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "user_group: admins/owners can update"
  ON user_group FOR UPDATE TO authenticated
  USING (is_group_admin(id)) WITH CHECK (is_group_admin(id));

CREATE POLICY "user_group: only owner can delete"
  ON user_group FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_member
      WHERE group_id = id AND user_id = auth.uid() AND role = 'owner'
    )
  );

-- ── group_member ──────────────────────────────────────────────

ALTER TABLE group_member ENABLE ROW LEVEL SECURITY;

CREATE POLICY "group_member: members can read the membership list"
  ON group_member FOR SELECT TO authenticated
  USING (is_group_member(group_id));

CREATE POLICY "group_member: users can join (insert own row)"
  ON group_member FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "group_member: admins can update member roles"
  ON group_member FOR UPDATE TO authenticated
  USING (is_group_admin(group_id));

CREATE POLICY "group_member: users can leave; admins can remove"
  ON group_member FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR is_group_admin(group_id));

-- ── session ───────────────────────────────────────────────────

ALTER TABLE session ENABLE ROW LEVEL SECURITY;

CREATE POLICY "session: members can read"
  ON session FOR SELECT TO authenticated
  USING (is_group_member(group_id));

CREATE POLICY "session: members can create"
  ON session FOR INSERT TO authenticated
  WITH CHECK (is_group_member(group_id) AND created_by = auth.uid());

CREATE POLICY "session: admins or creator can update"
  ON session FOR UPDATE TO authenticated
  USING (is_group_admin(group_id) OR created_by = auth.uid());

CREATE POLICY "session: admins can delete"
  ON session FOR DELETE TO authenticated
  USING (is_group_admin(group_id));

-- ── session_item ──────────────────────────────────────────────

ALTER TABLE session_item ENABLE ROW LEVEL SECURITY;

CREATE POLICY "session_item: members can read"
  ON session_item FOR SELECT TO authenticated
  USING (is_group_member((SELECT group_id FROM session WHERE id = session_id)));

CREATE POLICY "session_item: members can add items"
  ON session_item FOR INSERT TO authenticated
  WITH CHECK (
    added_by = auth.uid()
    AND is_group_member((SELECT group_id FROM session WHERE id = session_id))
  );

CREATE POLICY "session_item: creator or admin can delete"
  ON session_item FOR DELETE TO authenticated
  USING (
    added_by = auth.uid()
    OR is_group_admin((SELECT group_id FROM session WHERE id = session_id))
  );

-- ── poll ──────────────────────────────────────────────────────

ALTER TABLE poll ENABLE ROW LEVEL SECURITY;

CREATE POLICY "poll: members can read"
  ON poll FOR SELECT TO authenticated
  USING (is_group_member(group_id));

CREATE POLICY "poll: members can create"
  ON poll FOR INSERT TO authenticated
  WITH CHECK (is_group_member(group_id) AND created_by = auth.uid());

CREATE POLICY "poll: admins or creator can update"
  ON poll FOR UPDATE TO authenticated
  USING (is_group_admin(group_id) OR created_by = auth.uid());

-- ── poll_option ───────────────────────────────────────────────

ALTER TABLE poll_option ENABLE ROW LEVEL SECURITY;

CREATE POLICY "poll_option: members can read"
  ON poll_option FOR SELECT TO authenticated
  USING (is_group_member((SELECT group_id FROM poll WHERE id = poll_id)));

CREATE POLICY "poll_option: members can add options"
  ON poll_option FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND is_group_member((SELECT group_id FROM poll WHERE id = poll_id))
  );

-- ── poll_ballot ───────────────────────────────────────────────

ALTER TABLE poll_ballot ENABLE ROW LEVEL SECURITY;

CREATE POLICY "poll_ballot: members can read"
  ON poll_ballot FOR SELECT TO authenticated
  USING (is_group_member((SELECT group_id FROM poll WHERE id = poll_id)));

CREATE POLICY "poll_ballot: members can submit their own ballot"
  ON poll_ballot FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND is_group_member((SELECT group_id FROM poll WHERE id = poll_id))
  );

-- ── poll_ballot_ranking ───────────────────────────────────────

ALTER TABLE poll_ballot_ranking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "poll_ballot_ranking: members can read"
  ON poll_ballot_ranking FOR SELECT TO authenticated
  USING (
    is_group_member((
      SELECT p.group_id FROM poll p
      JOIN poll_ballot pb ON pb.poll_id = p.id
      WHERE pb.id = ballot_id
    ))
  );

CREATE POLICY "poll_ballot_ranking: users can insert their own rankings"
  ON poll_ballot_ranking FOR INSERT TO authenticated
  WITH CHECK (
    (SELECT user_id FROM poll_ballot WHERE id = ballot_id) = auth.uid()
  );

-- ── rating ────────────────────────────────────────────────────

ALTER TABLE rating ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rating: members can read"
  ON rating FOR SELECT TO authenticated
  USING (is_group_member((SELECT group_id FROM session WHERE id = session_id)));

CREATE POLICY "rating: members can submit their own"
  ON rating FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND is_group_member((SELECT group_id FROM session WHERE id = session_id))
  );

CREATE POLICY "rating: users can update their own"
  ON rating FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ── comment ───────────────────────────────────────────────────

ALTER TABLE comment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comment: members can read non-deleted comments"
  ON comment FOR SELECT TO authenticated
  USING (
    is_group_member((SELECT group_id FROM session WHERE id = session_id))
    AND deleted_at IS NULL
  );

CREATE POLICY "comment: members can post"
  ON comment FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND is_group_member((SELECT group_id FROM session WHERE id = session_id))
  );

CREATE POLICY "comment: users can edit their own"
  ON comment FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ── session_result ────────────────────────────────────────────

ALTER TABLE session_result ENABLE ROW LEVEL SECURITY;

CREATE POLICY "session_result: members can read"
  ON session_result FOR SELECT TO authenticated
  USING (is_group_member((SELECT group_id FROM session WHERE id = session_id)));

CREATE POLICY "session_result: only admins can record results"
  ON session_result FOR INSERT TO authenticated
  WITH CHECK (is_group_admin((SELECT group_id FROM session WHERE id = session_id)));

-- ── elo_history ───────────────────────────────────────────────

ALTER TABLE elo_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "elo_history: members can read"
  ON elo_history FOR SELECT TO authenticated
  USING (is_group_member(group_id));

-- ── invitation_link ───────────────────────────────────────────

ALTER TABLE invitation_link ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can look up a link by code (for the join flow)
CREATE POLICY "invitation_link: readable by any authenticated user"
  ON invitation_link FOR SELECT TO authenticated USING (true);

CREATE POLICY "invitation_link: admins can manage"
  ON invitation_link FOR ALL TO authenticated
  USING (is_group_admin(group_id)) WITH CHECK (is_group_admin(group_id));

-- ── announcement ──────────────────────────────────────────────

ALTER TABLE announcement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcement: members can read"
  ON announcement FOR SELECT TO authenticated
  USING (is_group_member(group_id));

CREATE POLICY "announcement: admins can create/update/delete"
  ON announcement FOR ALL TO authenticated
  USING (is_group_admin(group_id)) WITH CHECK (is_group_admin(group_id));

-- ── push_subscription ─────────────────────────────────────────

ALTER TABLE push_subscription ENABLE ROW LEVEL SECURITY;

CREATE POLICY "push_subscription: users manage their own"
  ON push_subscription FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ── calendar_sync ─────────────────────────────────────────────

ALTER TABLE calendar_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "calendar_sync: users manage their own"
  ON calendar_sync FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
