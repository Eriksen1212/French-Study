"use client";

import { useState } from "react";
import { useVocabularyStore } from "@/store/useVocabularyStore";

type Filter = "all" | "learning" | "memorized";

export default function WordList() {
  const { words, removeWord, toggleMemorized } = useVocabularyStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = words.filter((w) => {
    const matchFilter =
      filter === "all" ||
      (filter === "memorized" && w.memorized) ||
      (filter === "learning" && !w.memorized);
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (words.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">📚</p>
        <p className="text-sm font-medium">Votre vocabulaire est vide.</p>
        <p className="text-sm mt-1">
          Lisez des articles et cliquez sur les mots pour les sauvegarder.
        </p>
      </div>
    );
  }

  const filterLabels: Record<Filter, string> = {
    all: "Tous",
    learning: "À apprendre",
    memorized: "Mémorisés",
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un mot…"
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      />

      <div className="flex gap-2">
        {(["all", "learning", "memorized"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        {filtered.length} mot{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-2">
        {filtered.map((word) => (
          <div
            key={word.id}
            className={`bg-white border rounded-xl p-4 flex items-start gap-3 transition-colors ${
              word.memorized ? "border-green-200" : "border-gray-100"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${word.memorized ? "text-green-700" : "text-gray-900"}`}>
                {word.word}
              </p>
              {word.context && (
                <p
                  className="text-xs text-gray-400 mt-0.5 truncate"
                  title={word.context}
                >
                  «{word.context.slice(0, 90)}»
                </p>
              )}
              <p className="text-xs text-gray-300 mt-0.5">{word.source}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleMemorized(word.id)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  word.memorized
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {word.memorized ? "✓ Mémorisé" : "À apprendre"}
              </button>
              <button
                onClick={() => removeWord(word.id)}
                className="text-gray-300 hover:text-red-400 transition-colors text-base"
                title="Supprimer"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
