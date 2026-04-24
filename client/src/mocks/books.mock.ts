import type { Book, CurrentSessionState } from '@/types'

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genres: ['Science Fiction', 'Space'],
    addedBy: 'Alice',
    coverColor: '#7c9a8c',
  },
  {
    id: '2',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genres: ['Fiction', 'Philosophy'],
    addedBy: 'You',
    coverColor: '#6b7fa3',
  },
  {
    id: '3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genres: ['Literary Fiction', 'AI'],
    addedBy: 'Bob',
    coverColor: '#a07070',
  },
]

export const mockCurrentSession: CurrentSessionState = {
  phase: 'Brainstorming',
  activeMembers: 2,
  totalMembers: 4,
  books: mockBooks,
}
