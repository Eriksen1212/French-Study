"use client";

import { useState } from "react";
import { useVocabularyStore } from "@/store/useVocabularyStore";

interface Props {
  text: string;
  source: string;
}

export default function ClickableText({ text, source }: Props) {
  const addWord = useVocabularyStore((s) => s.addWord);
  const [savedWord, setSavedWord] = useState<string | null>(null);

  const tokens = text.split(/(\s+|[.,!?;:()«»""''…\-–])/);

  const handleClick = (token: string) => {
    const clean = token.replace(/[.,!?;:()«»""''…\-–\s]/g, "").toLowerCase();
    if (clean.length < 2) return;
    addWord({ word: clean, context: text.slice(0, 200), source });
    setSavedWord(clean);
    setTimeout(() => setSavedWord(null), 1800);
  };

  return (
    <div className="relative">
      {savedWord && (
        <div className="absolute -top-9 left-0 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md z-10 animate-bounce">
          «{savedWord}» sauvegardé&nbsp;!
        </div>
      )}
      <p className="text-gray-700 leading-relaxed text-base select-text">
        {tokens.map((token, i) => {
          const isWord = /[a-zA-ZÀ-ÿ]{2,}/.test(token);
          return isWord ? (
            <span
              key={i}
              onClick={() => handleClick(token)}
              className="cursor-pointer rounded px-0.5 hover:bg-yellow-100 hover:text-yellow-900 transition-colors"
              title="Cliquer pour sauvegarder"
            >
              {token}
            </span>
          ) : (
            <span key={i}>{token}</span>
          );
        })}
      </p>
    </div>
  );
}
