import type { CurrentSessionState, Book } from '@/types'
import { mockCurrentSession } from '@/mocks/books.mock'
import { apiGet, apiPost } from './apiClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getCurrentSession(): Promise<CurrentSessionState> {
  if (USE_MOCK) return mockCurrentSession
  return apiGet<CurrentSessionState>('/sessions/current')
}

export async function addBook(title: string, author: string): Promise<Book> {
  if (USE_MOCK) {
    const book: Book = {
      id: Date.now().toString(),
      title,
      author,
      genres: [],
      addedBy: 'You',
      coverColor: '#8a9e8c',
    }
    return book
  }
  return apiPost<Book>('/books', { title, author })
}
