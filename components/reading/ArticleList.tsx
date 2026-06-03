"use client";

import { useEffect, useState } from "react";
import type { Article } from "@/types";
import { RSS_FEEDS } from "@/lib/rss";
import ClickableText from "./ClickableText";

export default function ArticleList() {
  const [feedIndex, setFeedIndex] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    setExpandedIndex(null);

    fetch(`/api/rss?feed=${feedIndex}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setArticles(data.articles);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [feedIndex]);

  return (
    <div>
      {/* Feed selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {RSS_FEEDS.map((feed, i) => (
          <button
            key={feed.name}
            onClick={() => setFeedIndex(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              feedIndex === i
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {feed.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
          Chargement des articles...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          <strong>Erreur&nbsp;:</strong> {error}
          <p className="mt-1 text-red-400 text-xs">
            Certains flux RSS peuvent être temporairement indisponibles.
          </p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-gray-400 py-12">Aucun article trouvé.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="space-y-3">
          {articles.map((article, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                className="w-full text-left p-4"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                      {article.source}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 text-sm leading-snug">
                      {article.title}
                    </h3>
                    {article.pubDate && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(article.pubDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-gray-400 text-xl transition-transform flex-shrink-0 ${
                      expandedIndex === i ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </div>
              </button>

              {expandedIndex === i && (
                <div className="px-4 pb-5 border-t border-gray-50 pt-4 space-y-3">
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Cliquez sur un mot pour le sauvegarder dans votre vocabulaire.
                  </p>
                  <ClickableText
                    text={article.description || article.title}
                    source={article.title}
                  />
                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline gap-1"
                    >
                      Lire l'article complet →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
