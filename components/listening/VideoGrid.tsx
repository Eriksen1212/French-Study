"use client";

import { useState } from "react";
import type { YoutubeVideo } from "@/types";
import { YOUTUBE_VIDEOS } from "@/lib/videos";

const LEVELS = ["Tous", "B1", "B2", "C1"] as const;

export default function VideoGrid() {
  const [selected, setSelected] = useState<YoutubeVideo | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>("Tous");

  const filtered =
    levelFilter === "Tous"
      ? YOUTUBE_VIDEOS
      : YOUTUBE_VIDEOS.filter((v) => v.level === levelFilter);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevelFilter(l)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              levelFilter === l
                ? "bg-purple-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelected(video)}
            className="text-left bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-purple-200 hover:shadow-sm transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-36 object-cover bg-gray-100"
            />
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                  {video.level}
                </span>
                <span className="text-xs text-gray-400 truncate">{video.channel}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Video lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                      {selected.level}
                    </span>
                    <span className="text-xs text-gray-400">{selected.channel}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{selected.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selected.description}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl flex-shrink-0"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
