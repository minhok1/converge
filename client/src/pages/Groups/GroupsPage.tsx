import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/Shared/Button/Button'
import type { Group } from '@/types'
import { getGroups, createGroup } from '@/services/groups.service'
import GroupCard from './components/GroupCard'

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    getGroups().then(setGroups)
  }, [])

  async function handleCreateGroup() {
    const name = window.prompt('Group name')
    if (!name?.trim()) return
    const newGroup = await createGroup(name.trim())
    setGroups((prev) => [...prev, newGroup])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white">
        <div>
          <h2 className="text-base font-semibold text-foreground">Groups</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{groups.length} groups joined</p>
        </div>
        <Button size="sm" onClick={handleCreateGroup} className="bg-foreground text-primary-foreground hover:bg-foreground/90 text-xs">
          <Plus size={14} />
          New Group
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}
