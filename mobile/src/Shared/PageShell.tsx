import { PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface PageShellProps extends PropsWithChildren {
  scrollable?: boolean
  padded?: boolean
}

export function PageShell({ children, scrollable = true, padded = true }: PageShellProps) {
  if (!scrollable) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-slate-50">
        <View className={padded ? 'flex-1 px-5' : 'flex-1'}>{children}</View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-slate-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName={padded ? 'px-5 pb-24' : 'pb-24'}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
