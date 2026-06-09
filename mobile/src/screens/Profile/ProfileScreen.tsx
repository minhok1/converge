import { Bell, ChevronRight, Copy, Settings, Shield } from 'lucide-react-native'
import { useState } from 'react'
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { PageHeader } from '@/Shared/PageHeader'
import { PageShell } from '@/Shared/PageShell'
import { useProfileQuery } from '@/services/profile.service'
import { t } from '@/i18n'

const weightCards = [
  { id: '1', emoji: '📚', name: 'The Page Turners', weight: 1.2, color: '#8a817c' },
  { id: '2', emoji: '🎲', name: 'Roll & Write Club', weight: 1.0, color: '#a08a7c' },
]

export function ProfileScreen() {
  const { data: profile } = useProfileQuery()
  const [copied, setCopied] = useState(false)
  const inviteLink = profile?.inviteLink ?? ''

  if (!profile) return null

  async function copyInviteLink() {
    if (!inviteLink) return
    await Clipboard.setStringAsync(inviteLink)
    setCopied(true)
    Alert.alert(t('profile.copiedTitle'), t('profile.copiedDescription'))
  }

  return (
    <PageShell>
      <PageHeader subtitle={t('profile.subtitle')} title={t('profile.title')} />

      <View className="items-center py-6">
        <View className="mb-3 h-20 w-20 items-center justify-center rounded-full bg-slate-900">
          <Text className="text-3xl font-bold text-white">{profile.name.charAt(0)}</Text>
        </View>
        <Text className="text-xl font-bold text-slate-900">{profile.name}</Text>
        <Text className="mt-1 text-sm text-slate-400">{t('profile.emailPlaceholder')}</Text>
      </View>

      <View className="mb-4 flex-row gap-2.5">
        <View className="flex-1 items-center rounded-2xl border border-slate-100 bg-white py-3">
          <Text className="text-2xl font-bold text-slate-900">2</Text>
          <Text className="text-xs text-slate-400">{t('profile.statsGroups')}</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-slate-100 bg-white py-3">
          <Text className="text-2xl font-bold text-slate-900">{profile.sessions}</Text>
          <Text className="text-xs text-slate-400">{t('profile.statsSessions')}</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-slate-100 bg-white py-3">
          <Text className="text-2xl font-bold text-slate-900">{profile.wins}</Text>
          <Text className="text-xs text-slate-400">{t('profile.statsWins')}</Text>
        </View>
      </View>

      <View className="mb-4 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        {[
          { key: 'notifications', icon: <Bell color="#94a3b8" size={16} /> },
          { key: 'privacy', icon: <Shield color="#94a3b8" size={16} /> },
          { key: 'appearance', icon: <Settings color="#94a3b8" size={16} /> },
        ].map((item, index) => (
          <View
            key={item.key}
            className={`flex-row items-center justify-between px-4 py-3.5 ${
              index < 2 ? 'border-b border-slate-50' : ''
            }`}
          >
            <View className="flex-row items-center gap-2">
              {item.icon}
              <Text className="text-sm font-medium text-slate-700">{t(`profile.menu${item.key.charAt(0).toUpperCase()}${item.key.slice(1)}`)}</Text>
            </View>
            <ChevronRight color="#cbd5e1" size={16} />
          </View>
        ))}
      </View>

      <View className="mb-4 rounded-2xl border border-slate-100 bg-white px-4 py-3.5">
        <Text className="mb-1 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
          {t('profile.weightsTitle')}
        </Text>
        {weightCards.map((group) => (
          <View key={group.id} className="flex-row items-center gap-3 py-1.5">
            <View className="h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: group.color }}>
              <Text className="text-sm">{group.emoji}</Text>
            </View>
            <Text className="flex-1 text-sm text-slate-700">{group.name}</Text>
            <Text className="text-sm font-semibold text-slate-900">x{group.weight.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View className="mb-4 rounded-2xl border border-slate-100 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900">{t('profile.inviteTitle')}</Text>
        <Text className="mt-1 text-sm text-slate-500">{t('profile.inviteDescription')}</Text>
        <TextInput
          className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600"
          editable={false}
          value={inviteLink}
        />
        <Pressable className="mt-2 flex-row items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5" onPress={copyInviteLink}>
          <Copy color="#ffffff" size={14} />
          <Text className="text-sm font-semibold text-white">{copied ? t('profile.copiedButton') : t('profile.copyButton')}</Text>
        </Pressable>
      </View>

      <TouchableOpacity className="mb-2 rounded-2xl bg-green-600 py-3.5">
        <Text className="text-center text-sm font-semibold text-white">{t('profile.startSessionButton')}</Text>
      </TouchableOpacity>
    </PageShell>
  )
}
