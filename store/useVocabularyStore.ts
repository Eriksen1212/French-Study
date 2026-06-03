"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VocabularyWord } from "@/types";

interface VocabularyState {
  words: VocabularyWord[];
  addWord: (word: Omit<VocabularyWord, "id" | "savedAt" | "memorized">) => void;
  removeWord: (id: string) => void;
  toggleMemorized: (id: string) => void;
  clearAll: () => void;
}

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set, get) => ({
      words: [],
      addWord: (word) => {
        const exists = get().words.some(
          (w) => w.word.toLowerCase() === word.word.toLowerCase()
        );
        if (exists) return;
        set((state) => ({
          words: [
            {
              ...word,
              id: crypto.randomUUID(),
              savedAt: Date.now(),
              memorized: false,
            },
            ...state.words,
          ],
        }));
      },
      removeWord: (id) =>
        set((state) => ({ words: state.words.filter((w) => w.id !== id) })),
      toggleMemorized: (id) =>
        set((state) => ({
          words: state.words.map((w) =>
            w.id === id ? { ...w, memorized: !w.memorized } : w
          ),
        })),
      clearAll: () => set({ words: [] }),
    }),
    { name: "french-vocabulary" }
  )
);
