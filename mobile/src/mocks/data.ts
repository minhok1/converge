import type { CurrentSessionState, Group, Session, UserProfile } from '@/types'

export const mockGroups: Group[] = [
  { id: '1', name: 'Book Club', memberCount: 4, currentBook: 'Project Hail Mary', phase: 'Brainstorming', color: '#8a817c' },
  { id: '2', name: 'Sci-Fi Lovers', memberCount: 6, currentBook: 'Dune', phase: 'Voting', color: '#a08a7c' },
  { id: '3', name: 'Non-Fiction Crew', memberCount: 3, currentBook: 'Atomic Habits', phase: 'Reading', color: '#7c8a9e' },
]

export const mockCurrentSession: CurrentSessionState = {
  phase: 'Brainstorming',
  activeMembers: 2,
  totalMembers: 4,
  books: [
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
  ],
}

export const mockSessions: Session[] = [
  { id: '1', month: 'March', year: 2026, winner: 'The Remains of the Day', winnerAuthor: 'Kazuo Ishiguro', memberCount: 4, phase: 'Completed' },
  { id: '2', month: 'February', year: 2026, winner: 'Educated', winnerAuthor: 'Tara Westover', memberCount: 3, phase: 'Completed' },
  { id: '3', month: 'January', year: 2026, winner: 'The Alchemist', winnerAuthor: 'Paulo Coelho', memberCount: 4, phase: 'Completed' },
]

export const mockProfile: UserProfile = {
  name: 'You',
  role: 'Book Club Member',
  weight: 1.2,
  satisfaction: 80,
  sessions: 12,
  wins: 8,
  inviteLink: 'https://converge.app/join/book-club-xyz',
}
