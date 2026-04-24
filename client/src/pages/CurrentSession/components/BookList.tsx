import type { Book } from '@/types'
import BookCard from './BookCard'

interface Props {
  books: Book[]
}

export default function BookList({ books }: Props) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-3">{books.length} books suggested</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
