import { ChevronRight, Users } from 'lucide-react'
import { Badge } from '@/Shared/Badge/Badge'

interface Group {
  id: string
  name: string
  memberCount: number
  currentBook: string
  phase: string
  color: string
}

interface Props {
  group: Group
}

export default function GroupCard({ group }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-border flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
      <div
        className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-white text-sm font-semibold"
        style={{ backgroundColor: group.color }}
      >
        {group.name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-semibold text-sm text-foreground">{group.name}</p>
          <Badge className="text-[10px] px-1.5 py-0 bg-[#f4f3ee] text-muted-foreground border-0 font-normal hover:bg-[#f4f3ee]">
            {group.phase}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">Reading: {group.currentBook}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
          <Users size={11} />
          <span>{group.memberCount} members</span>
        </div>
      </div>

      <ChevronRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </div>
  )
}
