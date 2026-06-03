"use client";

import Link from "next/link";
import { useVocabularyStore } from "@/store/useVocabularyStore";

export default function ProgressStats() {
  const words = useVocabularyStore((s) => s.words);
  const total = words.length;
  const memorized = words.filter((w) => w.memorized).length;
  const pct = total > 0 ? Math.round((memorized / total) * 100) : 0;

  const stats = [
    { label: "Sauvegardés", value: total, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Mémorisés", value: memorized, color: "text-green-600", bg: "bg-green-50" },
    { label: "À revoir", value: total - memorized, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Progression
        </h2>
        <Link href="/vocabulary" className="text-xs text-blue-600 hover:underline">
          Voir tout →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {total > 0 ? (
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Mémorisation</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-2">
          Lisez des articles et cliquez sur les mots pour les sauvegarder&nbsp;!
        </p>
      )}
    </div>
  );
}
