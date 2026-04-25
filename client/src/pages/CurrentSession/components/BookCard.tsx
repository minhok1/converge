import { ChevronRight } from 'lucide-react'
import { Badge } from '@/Shared/Badge/Badge'
import type { Book } from '@/types'

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-border flex items-start gap-3 cursor-pointer hover:shadow-md transition-shadow group">
      <div
        className="w-14 h-20 rounded-md shrink-0 flex items-end justify-center pb-1"
        style={{ backgroundColor: book.coverColor }}
      >
        <span className="text-white text-[9px] font-medium opacity-70 text-center leading-tight px-1">
          {book.title.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground leading-snug">{book.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {book.genres.map((g) => (
            <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#f4f3ee] text-accent-foreground border-0 font-normal">
              {g}
            </Badge>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">Added by {book.addedBy}</p>
      </div>

      <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
    </div>
  )
}
