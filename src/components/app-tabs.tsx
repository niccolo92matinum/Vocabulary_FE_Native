import TopTabs from 'expo-router/js-top-tabs';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  return (
    <TopTabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background, paddingTop: insets.top },
        tabBarIndicatorStyle: { backgroundColor: colors.text },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontWeight: '600', textTransform: 'none' },
      }}>
      <TopTabs.Screen name="index" options={{ title: 'Home' }} />
      <TopTabs.Screen name="words" options={{ title: 'Words' }} />
      <TopTabs.Screen name="explore" options={{ title: 'Explore' }} />
    </TopTabs>
  );
}
