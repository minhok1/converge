import { Text, View } from 'react-native'

interface PageHeaderProps {
  subtitle: string
  title: string
}

export function PageHeader({ subtitle, title }: PageHeaderProps) {
  return (
    <View className="pb-4 pt-3">
      <Text className="mb-1 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
        {subtitle}
      </Text>
      <Text className="text-3xl font-bold text-slate-900">{title}</Text>
    </View>
  )
}
