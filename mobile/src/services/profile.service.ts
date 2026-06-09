import { useQuery } from '@tanstack/react-query'
import type { UserProfile } from '@/types'
import { mockProfile } from '@/mocks/data'
import { apiGet } from './apiClient'

const useMock = process.env.EXPO_PUBLIC_USE_MOCK !== 'false'

async function getProfile(): Promise<UserProfile> {
  if (useMock) return mockProfile
  return apiGet<UserProfile>('/profile')
}

export function useProfileQuery() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}
