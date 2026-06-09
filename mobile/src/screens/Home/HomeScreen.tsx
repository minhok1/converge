import { Search } from 'lucide-react-native'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PageHeader } from '@/Shared/PageHeader'
import { PageShell } from '@/Shared/PageShell'
import { t } from '@/i18n'

const recommendedGroups = [
  { id: 'rec1', name: 'Sci-Fi Readers', emoji: '🚀', members: 12, color: '#3b82f6', tags: ['Sci-Fi', 'Fantasy'] },
  { id: 'rec2', name: 'Eurogame Enthusiasts', emoji: '♟️', members: 8, color: '#22c55e', tags: ['Strategy', 'Euro'] },
  { id: 'rec3', name: 'Mystery Book Lovers', emoji: '🔍', members: 15, color: '#f43f5e', tags: ['Mystery', 'Thriller'] },
  { id: 'rec4', name: 'Dungeon Crawlers', emoji: '⚔️', members: 6, color: '#f59e0b', tags: ['RPG', 'Adventure'] },
]

const trendingGroups = [
  { id: 'tr1', emoji: '🌍', name: 'Travel Journals', members: 24, color: '#0d9488' },
  { id: 'tr2', emoji: '🎭', name: 'Film Club', members: 19, color: '#ec4899' },
  { id: 'tr3', emoji: '🎵', name: 'Music Picks', members: 31, color: '#6366f1' },
  { id: 'tr4', emoji: '🍕', name: 'Foodie Friends', members: 9, color: '#eab308' },
]

export function HomeScreen() {
  return (
    <PageShell>
      <PageHeader subtitle={t('home.subtitle')} title={t('home.title')} />

      <View className="mb-3 flex-row items-center rounded-xl bg-slate-100 px-3 py-2.5">
        <Search color="#94a3b8" size={16} />
        <TextInput
          className="ml-2 flex-1 text-sm text-slate-900"
          placeholder={t('home.searchPlaceholder')}
          placeholderTextColor="#94a3b8"
          accessibilityLabel={t('home.searchAccessibilityLabel')}
        />
      </View>

      <View className="mb-5 flex-row flex-wrap gap-2">
        {t('home.filters')
          .split('|')
          .map((filter) => (
            <TouchableOpacity key={filter} className="rounded-full bg-slate-100 px-3 py-1.5">
              <Text className="text-[11px] font-semibold text-slate-500">{filter}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <Text className="mb-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
        {t('home.recommendedTitle')}
      </Text>
      <View className="mb-6 gap-3">
        {recommendedGroups.map((group) => (
          <View key={group.id} className="flex-row items-center rounded-2xl border border-slate-100 bg-white p-3">
            <View
              className="h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${group.color}22` }}
            >
              <Text className="text-2xl">{group.emoji}</Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-slate-900">{group.name}</Text>
              <Text className="mt-0.5 text-xs text-slate-400">{group.members} members</Text>
              <View className="mt-1 flex-row gap-1">
                {group.tags.map((tag) => (
                  <View key={tag} className="rounded-full bg-slate-100 px-2 py-0.5">
                    <Text className="text-[10px] text-slate-500">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity className="rounded-full bg-slate-900 px-3 py-1.5">
              <Text className="text-[11px] font-semibold text-white">{t('home.joinButton')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text className="mb-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
        {t('home.trendingTitle')}
      </Text>
      <View className="mb-2 flex-row flex-wrap justify-between">
        {trendingGroups.map((group) => (
          <View
            key={group.id}
            className="mb-2 w-[48.5%] rounded-2xl p-3"
            style={{ backgroundColor: group.color }}
          >
            <Text className="mb-2 text-2xl">{group.emoji}</Text>
            <Text className="text-sm font-semibold text-white">{group.name}</Text>
            <Text className="text-xs text-white/75">{group.members} members</Text>
          </View>
        ))}
      </View>
    </PageShell>
  )
}
