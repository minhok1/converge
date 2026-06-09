import { useQuery } from '@tanstack/react-query'
import type { Group } from '@/types'
import { mockGroups } from '@/mocks/data'
import { apiGet } from './apiClient'

const useMock = process.env.EXPO_PUBLIC_USE_MOCK !== 'false'

async function getGroups(): Promise<Group[]> {
  if (useMock) return mockGroups
  return apiGet<Group[]>('/groups')
}

export function useGroupsQuery() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })
}
