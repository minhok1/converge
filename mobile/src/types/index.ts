export interface Book {
  id: string
  title: string
  author: string
  genres: string[]
  addedBy: string
  coverColor: string
}

export interface CurrentSessionState {
  phase: 'Brainstorming' | 'Voting' | 'Reading'
  activeMembers: number
  totalMembers: number
  books: Book[]
}

export interface Session {
  id: string
  month: string
  year: number
  winner: string
  winnerAuthor: string
  memberCount: number
  phase: 'Completed' | 'Voting' | 'Reading' | 'Brainstorming'
}

export interface Group {
  id: string
  name: string
  memberCount: number
  currentBook: string
  phase: 'Brainstorming' | 'Voting' | 'Reading'
  color: string
}

export interface UserProfile {
  name: string
  role: string
  weight: number
  satisfaction: number
  sessions: number
  wins: number
  inviteLink: string
}
