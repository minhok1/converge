import { useQuery } from '@tanstack/react-query'
import type { CurrentSessionState } from '@/types'
import { mockCurrentSession } from '@/mocks/data'
import { apiGet } from './apiClient'

const useMock = process.env.EXPO_PUBLIC_USE_MOCK !== 'false'

async function getCurrentSession(): Promise<CurrentSessionState> {
  if (useMock) return mockCurrentSession
  return apiGet<CurrentSessionState>('/sessions/current')
}

export function useCurrentSessionQuery() {
  return useQuery({
    queryKey: ['current-session'],
    queryFn: getCurrentSession,
  })
}
