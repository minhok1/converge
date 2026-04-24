import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/Shared/Layout/Layout'
import CurrentSessionPage from '@/pages/CurrentSession/CurrentSessionPage'
import PastSessionsPage from '@/pages/PastSessions/PastSessionsPage'
import GroupsPage from '@/pages/Groups/GroupsPage'
import ProfilePage from '@/pages/Profile/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/session" replace />} />
          <Route path="session" element={<CurrentSessionPage />} />
          <Route path="past" element={<PastSessionsPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
