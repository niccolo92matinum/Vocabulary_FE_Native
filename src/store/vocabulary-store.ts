import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Word = {
  id: string;
  term: string;
  translation: string;
  learned: boolean;
};

type VocabularyState = {
  words: Word[];
  addWord: (term: string, translation: string) => void;
  removeWord: (id: string) => void;
  toggleLearned: (id: string) => void;
  clear: () => void;
};

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set) => ({
      words: [],
      addWord: (term, translation) =>
        set((state) => ({
          words: [
            ...state.words,
            { id: Date.now().toString(), term: term.trim(), translation: translation.trim(), learned: false },
          ],
        })),
      removeWord: (id) => set((state) => ({ words: state.words.filter((w) => w.id !== id) })),
      toggleLearned: (id) =>
        set((state) => ({
          words: state.words.map((w) => (w.id === id ? { ...w, learned: !w.learned } : w)),
        })),
      clear: () => set({ words: [] }),
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
