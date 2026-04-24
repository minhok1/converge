import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  inviteLink: string
}

export default function InviteSection({ inviteLink }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-border">
      <h3 className="font-semibold text-sm text-foreground mb-1">Invite Members</h3>
      <p className="text-xs text-muted-foreground mb-3">Share this link to invite new members to the group.</p>
      <div className="flex gap-2">
        <Input
          readOnly
          value={inviteLink}
          className="flex-1 text-xs bg-[#f4f3ee] border-0 text-muted-foreground"
        />
        <Button
          onClick={handleCopy}
          className="bg-foreground text-primary-foreground hover:bg-foreground/90 shrink-0 gap-1.5"
          size="sm"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  )
}
