import type { UserProfile } from '@/types'
import { mockProfile } from '@/mocks/profile.mock'
import { apiGet } from './apiClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getProfile(): Promise<UserProfile> {
  if (USE_MOCK) return mockProfile
  return apiGet<UserProfile>('/profile')
}
