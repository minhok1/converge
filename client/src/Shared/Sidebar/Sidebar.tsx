import { BookOpen, Clock, User, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/session', icon: BookOpen, label: 'Current Session' },
  { to: '/past', icon: Clock, label: 'Past Sessions' },
  { to: '/groups', icon: Users, label: 'Groups' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-border px-4 py-6 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="text-lg font-semibold text-foreground">Converge</h1>
        <p className="text-xs text-muted-foreground mt-0.5">April 2026</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-[#f4f3ee] text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-[#f4f3ee] hover:text-foreground'
              )
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">4 members</p>
      </div>
    </aside>
  )
}
