import { ChevronRight, BookOpen, Users } from 'lucide-react'
import { Badge } from '@/Shared/Badge/Badge'
import type { Session } from '@/types'

interface Props {
  session: Session
}

export default function SessionCard({ session }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-border flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
      <div className="w-10 h-10 rounded-lg bg-[#f4f3ee] flex items-center justify-center shrink-0">
        <BookOpen size={18} className="text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-medium text-sm text-foreground">{session.month} {session.year}</p>
          <Badge className="text-[10px] px-1.5 py-0 bg-[#f4f3ee] text-muted-foreground border-0 font-normal hover:bg-[#f4f3ee]">
            {session.phase}
          </Badge>
        </div>
        <p className="text-sm text-foreground leading-snug truncate">{session.winner}</p>
        <p className="text-xs text-muted-foreground">{session.winnerAuthor}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
          <Users size={11} />
          <span>{session.memberCount} members</span>
        </div>
      </div>

      <ChevronRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </div>
  )
}
