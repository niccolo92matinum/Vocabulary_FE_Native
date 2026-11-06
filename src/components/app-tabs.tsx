import TopTabs from 'expo-router/js-top-tabs';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoutButton } from './logout-button';
import { ThemedText } from './themed-text';

import { Colors, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { backgroundColor: colors.background, paddingTop: insets.top + Spacing.two }]}>
        <ThemedText type="smallBold" numberOfLines={1} style={styles.userName}>
          {user?.name ?? user?.email ?? ''}
        </ThemedText>
        <LogoutButton />
      </View>
      <TopTabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.background },
          tabBarIndicatorStyle: { backgroundColor: colors.text },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: { fontWeight: '600', textTransform: 'none' },
        }}>
        <TopTabs.Screen name="index" options={{ title: 'Home' }} />
        <TopTabs.Screen name="words" options={{ title: 'Words' }} />
        <TopTabs.Screen name="explore" options={{ title: 'Explore' }} />
      </TopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  userName: {
    flexShrink: 1,
    marginRight: Spacing.two,
  },
});
