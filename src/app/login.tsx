import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const signIn = useAuthStore((s) => s.signIn);
  const error = useAuthStore((s) => s.error);
  const [busy, setBusy] = useState(false);

  const onPress = async () => {
    setBusy(true);
    await signIn();
    setBusy(false);
    if (useAuthStore.getState().status === 'signedIn') {
      router.replace('/');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Vocabulary</Text>
      <Text style={styles.subtitle}>Sign in to save and sync your words</Text>

      {busy ? (
        <ActivityIndicator size="large" />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onPress}
          disabled={busy}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  error: {
    color: '#d33',
    textAlign: 'center',
  },
});
