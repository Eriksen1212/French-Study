"use client";

import { useState } from "react";
import { useVocabularyStore } from "@/store/useVocabularyStore";

interface SavedNote {
  text: string;
  savedAt: number;
}

export default function NotesEditor() {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [saved, setSaved] = useState(false);
  const addWord = useVocabularyStore((s) => s.addWord);

  const handleSaveNote = () => {
    if (!draft.trim()) return;
    setNotes((prev) => [{ text: draft.trim(), savedAt: Date.now() }, ...prev]);
    setDraft("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleSaveWord = (raw: string) => {
    const clean = raw.replace(/[.,!?;:()«»""''…\-–\s]/g, "").toLowerCase();
    if (clean.length > 1) {
      addWord({ word: clean, context: raw, source: "Écoute / Dictée" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes de dictée / shadowing
        </label>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSaveNote();
          }}
          placeholder="Écrivez ce que vous entendez, ou prenez vos notes ici… (Ctrl+Entrée pour sauvegarder)"
          className="w-full h-32 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            {saved ? "✓ Sauvegardé !" : "Sauvegarder la note"}
          </button>
          <button
            onClick={() => setDraft("")}
            className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          >
            Effacer
          </button>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Notes sauvegardées
          </h3>
          {notes.map((note) => (
            <div key={note.savedAt} className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-700 mb-3">{note.text}</p>
              <div className="flex flex-wrap gap-1">
                {note.text
                  .split(/\s+/)
                  .filter((w) => /[a-zA-ZÀ-ÿ]{2,}/.test(w))
                  .map((word, j) => (
                    <button
                      key={j}
                      onClick={() => handleSaveWord(word)}
                      className="text-xs bg-gray-100 hover:bg-purple-100 hover:text-purple-700 px-2 py-0.5 rounded-full transition-colors"
                      title="Sauvegarder ce mot"
                    >
                      {word}
                    </button>
                  ))}
              </div>
              <p className="text-xs text-gray-300 mt-2">
                {new Date(note.savedAt).toLocaleTimeString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
