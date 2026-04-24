import type { Group } from '@/types'
import { mockGroups } from '@/mocks/groups.mock'
import { apiGet, apiPost } from './apiClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getGroups(): Promise<Group[]> {
  if (USE_MOCK) return mockGroups
  return apiGet<Group[]>('/groups')
}

export async function createGroup(name: string): Promise<Group> {
  if (USE_MOCK) {
    return {
      id: Date.now().toString(),
      name,
      memberCount: 1,
      currentBook: '',
      phase: 'Brainstorming',
      color: '#8a817c',
    }
  }
  return apiPost<Group>('/groups', { name })
}
