import { useState } from 'react'
import { Input } from '@/Shared/Input/Input'
import { Button } from '@/Shared/Button/Button'
import { Plus } from 'lucide-react'

interface Props {
  onAdd: (title: string, author: string) => void
}

export default function AddBookForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), author.trim())
    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm border border-border">
      <h2 className="text-base font-semibold text-foreground mb-4">Add a book</h2>
      <div className="flex gap-2 flex-col sm:flex-row">
        <Input
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-[#f4f3ee] border-0 placeholder:text-muted-foreground"
        />
        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="flex-1 bg-[#f4f3ee] border-0 placeholder:text-muted-foreground"
        />
        <Button type="submit" className="bg-foreground text-primary-foreground hover:bg-foreground/90 shrink-0">
          <Plus size={16} />
          Add Book
        </Button>
      </div>
    </form>
  )
}
