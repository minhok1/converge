import { Text, View } from 'react-native'

interface AvatarStackProps {
  avatars: string[]
  colorHex: string
}

export function AvatarStack({ avatars, colorHex }: AvatarStackProps) {
  return (
    <View className="ml-3 flex-row">
      {avatars.slice(0, 3).map((avatar, index) => (
        <View
          key={`${avatar}-${index}`}
          className="-ml-2 h-7 w-7 items-center justify-center rounded-full border-2 border-white"
          style={{ backgroundColor: colorHex }}
        >
          <Text className="text-[11px] font-bold text-white">{avatar}</Text>
        </View>
      ))}
      {avatars.length > 3 && (
        <View className="-ml-2 h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-200">
          <Text className="text-[10px] font-bold text-slate-500">+{avatars.length - 3}</Text>
        </View>
      )}
    </View>
  )
}
