import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Compass, Home, User, Users } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeScreen } from '@/screens/Home/HomeScreen'
import { MyGroupsScreen } from '@/screens/MyGroups/MyGroupsScreen'
import { ProfileScreen } from '@/screens/Profile/ProfileScreen'
import { AdventuresScreen } from '@/screens/Adventures/AdventuresScreen'
import { colors } from '@/theme/tokens'
import { t } from '@/i18n'

export type RootTabParamList = {
  Home: undefined
  MyGroups: undefined
  Profile: undefined
  Adventures: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export function AppNavigator() {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="MyGroups"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: colors.border,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
          height: 56 + Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color }) => <Home color={color} size={19} />,
        }}
      />
      <Tab.Screen
        name="MyGroups"
        component={MyGroupsScreen}
        options={{
          tabBarLabel: t('tabs.myGroups'),
          tabBarIcon: ({ color }) => <Users color={color} size={19} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({ color }) => <User color={color} size={19} />,
        }}
      />
      <Tab.Screen
        name="Adventures"
        component={AdventuresScreen}
        options={{
          tabBarLabel: t('tabs.adventures'),
          tabBarIcon: ({ color }) => <Compass color={color} size={19} />,
        }}
      />
    </Tab.Navigator>
  )
}
