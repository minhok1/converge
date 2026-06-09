import { useQuery } from '@tanstack/react-query'
import type { Session } from '@/types'
import { mockSessions } from '@/mocks/data'
import { apiGet } from './apiClient'

const useMock = process.env.EXPO_PUBLIC_USE_MOCK !== 'false'

async function getPastSessions(): Promise<Session[]> {
  if (useMock) return mockSessions
  return apiGet<Session[]>('/sessions')
}

export function usePastSessionsQuery() {
  return useQuery({
    queryKey: ['past-sessions'],
    queryFn: getPastSessions,
  })
}
