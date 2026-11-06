import { Alert, Platform, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

export function LogoutButton() {
  const signOut = useAuthStore((s) => s.signOut);

  const onPress = () => {
    if (Platform.OS === 'web') {
      signOut();
      return;
    }
    Alert.alert('Logout', 'Do you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Logout"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <ThemedText type="smallBold" style={styles.text}>
        Logout
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    color: '#d33',
  },
});
