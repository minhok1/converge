import { Outlet } from 'react-router-dom'
import Sidebar from '@/Shared/Sidebar/Sidebar'
import BottomNav from '@/Shared/BottomNav/BottomNav'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
