import { Compass } from 'lucide-react-native'
import { Text, View } from 'react-native'
import { PageHeader } from '@/Shared/PageHeader'
import { PageShell } from '@/Shared/PageShell'
import { t } from '@/i18n'

export function AdventuresScreen() {
  return (
    <PageShell scrollable={false}>
      <PageHeader subtitle={t('adventures.subtitle')} title={t('adventures.title')} />

      <View className="flex-1 items-center justify-center px-6 pb-20">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <Compass color="#94a3b8" size={34} />
        </View>
        <Text className="mb-2 text-xl font-bold text-slate-900">{t('adventures.comingSoonTitle')}</Text>
        <Text className="text-center text-sm leading-6 text-slate-400">{t('adventures.comingSoonDescription')}</Text>
      </View>
    </PageShell>
  )
}
