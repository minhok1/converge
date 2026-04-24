import type { Session } from '@/types'

export const mockSessions: Session[] = [
  { id: '1', month: 'March', year: 2026, winner: 'The Remains of the Day', winnerAuthor: 'Kazuo Ishiguro', memberCount: 4, phase: 'Completed' },
  { id: '2', month: 'February', year: 2026, winner: 'Educated', winnerAuthor: 'Tara Westover', memberCount: 3, phase: 'Completed' },
  { id: '3', month: 'January', year: 2026, winner: 'The Alchemist', winnerAuthor: 'Paulo Coelho', memberCount: 4, phase: 'Completed' },
  { id: '4', month: 'December', year: 2025, winner: 'Atomic Habits', winnerAuthor: 'James Clear', memberCount: 4, phase: 'Completed' },
  { id: '5', month: 'November', year: 2025, winner: 'The Great Gatsby', winnerAuthor: 'F. Scott Fitzgerald', memberCount: 3, phase: 'Completed' },
]
