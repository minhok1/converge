import { Award, TrendingUp, Users, Trophy } from 'lucide-react'
import type { UserProfile } from '@/types'

interface Props {
  profile: UserProfile
}

export default function StatsGrid({ profile }: Props) {
  const stats = [
    { label: 'Weight', value: String(profile.weight), icon: Award },
    { label: 'Satisfaction', value: `${profile.satisfaction}%`, icon: TrendingUp },
    { label: 'Sessions', value: String(profile.sessions), icon: Users },
    { label: 'Wins', value: String(profile.wins), icon: Trophy },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-[#f4f3ee] rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
            <Icon size={13} />
            {label}
          </div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  )
}
