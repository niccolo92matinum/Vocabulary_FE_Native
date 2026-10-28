import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVocabularyStore } from '@/store/vocabulary-store';

export default function WordsScreen() {
  const theme = useTheme();
  const words = useVocabularyStore((s) => s.words);
  const addWord = useVocabularyStore((s) => s.addWord);
  const removeWord = useVocabularyStore((s) => s.removeWord);
  const toggleLearned = useVocabularyStore((s) => s.toggleLearned);

  const [term, setTerm] = useState('');
  const [translation, setTranslation] = useState('');

  const onAdd = () => {
    if (!term.trim() || !translation.trim()) return;
    addWord(term, translation);
    setTerm('');
    setTranslation('');
  };

  const inputStyle = [styles.input, { color: theme.text, borderColor: theme.textSecondary }];

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={inputStyle}
        placeholder="Word"
        placeholderTextColor={theme.textSecondary}
        value={term}
        onChangeText={setTerm}
      />
      <TextInput
        style={inputStyle}
        placeholder="Translation"
        placeholderTextColor={theme.textSecondary}
        value={translation}
        onChangeText={setTranslation}
        onSubmitEditing={onAdd}
      />
      <Pressable style={[styles.button, { backgroundColor: theme.text }]} onPress={onAdd}>
        <ThemedText style={{ color: theme.background }}>Add word</ThemedText>
      </Pressable>

      <FlatList
        data={words}
        keyExtractor={(w) => w.id}
        ListEmptyComponent={<ThemedText themeColor="textSecondary">No words yet.</ThemedText>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => toggleLearned(item.id)}
            onLongPress={() => removeWord(item.id)}>
            <ThemedText style={item.learned && styles.learned}>
              {item.term} — {item.translation}
            </ThemedText>
            <ThemedText>{item.learned ? '✓' : ''}</ThemedText>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.four, gap: Spacing.two },
  input: { borderWidth: 1, borderRadius: 8, padding: Spacing.two },
  button: { borderRadius: 8, padding: Spacing.two, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.two },
  learned: { textDecorationLine: 'line-through', opacity: 0.6 },
});
