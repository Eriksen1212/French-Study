"use client";

import { useState } from "react";
import { useVocabularyStore } from "@/store/useVocabularyStore";

export default function FlashcardView() {
  const { words, toggleMemorized } = useVocabularyStore();
  const queue = words.filter((w) => !w.memorized);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (queue.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">🎉</p>
        <p className="text-sm font-medium">Bravo ! Tous les mots sont mémorisés.</p>
        <p className="text-sm mt-1 text-gray-300">
          Ajoutez de nouveaux mots depuis la page Lecture.
        </p>
      </div>
    );
  }

  const current = queue[index % queue.length];

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % queue.length), 100);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i - 1 + queue.length) % queue.length), 100);
  };

  const markMemorized = () => {
    toggleMemorized(current.id);
    setFlipped(false);
    setIndex((i) => Math.min(i, queue.length - 2));
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400 text-center font-medium">
        {(index % queue.length) + 1}&nbsp;/&nbsp;{queue.length} à apprendre
      </p>

      <div
        className="cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className={`min-h-52 rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all duration-200 ${
            flipped
              ? "bg-blue-50 border-2 border-blue-300"
              : "bg-white border-2 border-gray-200 hover:border-blue-200"
          }`}
        >
          {!flipped ? (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-3">{current.word}</p>
              <p className="text-xs text-gray-400">Cliquez pour voir le contexte</p>
            </>
          ) : (
            <>
              <p className="text-sm text-blue-800 italic leading-relaxed text-center">
                «{current.context || "Pas de contexte disponible."}»
              </p>
              <p className="text-xs text-blue-400 mt-3">Source&nbsp;: {current.source}</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={prev}
          className="py-2.5 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors text-gray-600"
        >
          ← Précédent
        </button>
        <button
          onClick={markMemorized}
          className="py-2.5 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600 transition-colors font-medium"
        >
          ✓ Mémorisé
        </button>
        <button
          onClick={next}
          className="py-2.5 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors text-gray-600"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
