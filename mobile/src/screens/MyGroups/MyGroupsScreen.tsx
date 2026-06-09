import { ChevronRight, Plus } from 'lucide-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { AvatarStack } from '@/Shared/AvatarStack'
import { PageHeader } from '@/Shared/PageHeader'
import { PageShell } from '@/Shared/PageShell'
import { t } from '@/i18n'
import { useGroupsQuery } from '@/services/groups.service'
import type { Group } from '@/types'

const groupUiMetadata: Record<string, { emoji: string; sessionName: string; avatars: string[] }> = {
  '1': { emoji: '📚', sessionName: 'April Session', avatars: ['Y', 'A', 'B', 'C'] },
  '2': { emoji: '🎲', sessionName: 'June Night', avatars: ['Y', 'D', 'E'] },
  '3': { emoji: '✨', sessionName: 'July Planning', avatars: ['Y', 'M', 'K'] },
}

function phaseLabel(phase: Group['phase']): string {
  if (phase === 'Voting') return t('myGroups.phaseVoting')
  if (phase === 'Reading') return t('myGroups.phaseResults')
  return t('myGroups.phaseBrainstorming')
}

function phaseDotClassName(phase: Group['phase']): string {
  if (phase === 'Voting') return 'bg-green-500'
  if (phase === 'Reading') return 'bg-amber-500'
  return 'bg-purple-500'
}

function phaseTextClassName(phase: Group['phase']): string {
  if (phase === 'Voting') return 'text-green-700'
  if (phase === 'Reading') return 'text-amber-700'
  return 'text-purple-700'
}

export function MyGroupsScreen() {
  const { data: groups = [] } = useGroupsQuery()

  return (
    <PageShell>
      <PageHeader subtitle={t('myGroups.subtitle')} title={t('myGroups.title')} />

      <View className="gap-3">
        {groups.map((group) => {
          const meta = groupUiMetadata[group.id] ?? {
            emoji: '📚',
            sessionName: t('myGroups.fallbackSessionName'),
            avatars: ['Y'],
          }

          return (
            <TouchableOpacity key={group.id} activeOpacity={0.9} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <View className="flex-row items-center gap-3 px-4 py-3" style={{ backgroundColor: group.color }}>
                <Text className="text-2xl">{meta.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-white">{group.name}</Text>
                  <Text className="text-xs text-white/70">{group.memberCount} members</Text>
                </View>
                <ChevronRight color="#ffffff88" size={18} />
              </View>

              <View className="flex-row items-center justify-between px-4 py-3">
                <View>
                  <Text className="text-xs text-slate-400">{meta.sessionName}</Text>
                  <View className="mt-1 flex-row items-center gap-1.5">
                    <View className={`h-2 w-2 rounded-full ${phaseDotClassName(group.phase)}`} />
                    <Text className={`text-xs font-semibold capitalize ${phaseTextClassName(group.phase)}`}>
                      {phaseLabel(group.phase)}
                    </Text>
                  </View>
                </View>

                <AvatarStack avatars={meta.avatars} colorHex={group.color} />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>

      <TouchableOpacity className="mb-2 mt-4 flex-row items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5">
        <Plus color="#ffffff" size={18} />
        <Text className="text-sm font-semibold text-white">{t('myGroups.createButton')}</Text>
      </TouchableOpacity>
    </PageShell>
  )
}
