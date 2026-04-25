import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/Shared/Avatar/Avatar'
import { Button } from '@/Shared/Button/Button'
import { Plus } from 'lucide-react'
import type { UserProfile } from '@/types'
import { getProfile } from '@/services/profile.service'
import StatsGrid from './components/StatsGrid'
import WeightInfo from './components/WeightInfo'
import InviteSection from './components/InviteSection'

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  if (!profile) return null

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border bg-white">
        <h2 className="text-base font-semibold text-foreground">Profile</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Your club statistics and settings</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-accent text-accent-foreground text-xl font-semibold">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.role}</p>
            </div>
          </div>
          <StatsGrid profile={profile} />
        </div>

        <WeightInfo weight={profile.weight} />
        <InviteSection inviteLink={profile.inviteLink} />
      </div>

      <div className="px-6 py-4 border-t border-border bg-white">
        <Button className="w-full bg-foreground text-primary-foreground hover:bg-foreground/90 h-12 text-sm font-medium gap-2">
          <Plus size={16} />
          Start New Session
        </Button>
      </div>
    </div>
  )
}
