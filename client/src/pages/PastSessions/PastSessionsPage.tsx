import { useState, useEffect } from 'react'
import type { Session } from '@/types'
import { getPastSessions } from '@/services/sessions.service'
import SessionCard from './components/SessionCard'

export default function PastSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    getPastSessions().then(setSessions)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border bg-white">
        <h2 className="text-base font-semibold text-foreground">Past Sessions</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{sessions.length} sessions completed</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  )
}
