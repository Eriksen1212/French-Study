"use client";

import { useState } from "react";
import WordList from "@/components/vocabulary/WordList";
import FlashcardView from "@/components/vocabulary/FlashcardView";

type View = "list" | "flashcard";

export default function VocabularyPage() {
  const [view, setView] = useState<View>("list");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vocabulaire 📚</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez et révisez vos mots sauvegardés.
        </p>
      </div>

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
        {(["list", "flashcard"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              view === v
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {v === "list" ? "Liste" : "Flashcards"}
          </button>
        ))}
      </div>

      {view === "list" ? <WordList /> : <FlashcardView />}
    </div>
  );
}
