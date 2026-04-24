import type { Session } from '@/types'
import { mockSessions } from '@/mocks/sessions.mock'
import { apiGet } from './apiClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getPastSessions(): Promise<Session[]> {
  if (USE_MOCK) return mockSessions
  return apiGet<Session[]>('/sessions')
}
