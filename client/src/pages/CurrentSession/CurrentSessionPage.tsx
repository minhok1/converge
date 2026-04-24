import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Book, CurrentSessionState } from '@/types'
import { getCurrentSession, addBook } from '@/services/books.service'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'

const COVER_COLORS = ['#8a9e8c', '#9ea88a', '#a08a7c', '#8a8aa0', '#a08a9e']

export default function CurrentSessionPage() {
  const [session, setSession] = useState<CurrentSessionState | null>(null)

  useEffect(() => {
    getCurrentSession().then(setSession)
  }, [])

  async function handleAddBook(title: string, author: string) {
    const newBook = await addBook(title, author)
    const colored: Book = {
      ...newBook,
      coverColor: COVER_COLORS[(session?.books.length ?? 0) % COVER_COLORS.length],
    }
    setSession((prev) => prev ? { ...prev, books: [...prev.books, colored] } : prev)
  }

  if (!session) return null

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white">
        <div className="flex items-center gap-3">
          <Badge className="bg-[#f4f3ee] text-foreground border-0 text-xs font-medium hover:bg-[#f4f3ee]">
            {session.phase}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users size={13} />
            <span>{session.activeMembers}/{session.totalMembers}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
        <AddBookForm onAdd={handleAddBook} />
        <BookList books={session.books} />
      </div>

      <div className="px-6 py-4 border-t border-border bg-white">
        <Button className="w-full bg-foreground text-primary-foreground hover:bg-foreground/90 h-12 text-sm font-medium">
          ▷ Start Voting
        </Button>
      </div>
    </div>
  )
}
