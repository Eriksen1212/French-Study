"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Tableau de bord", icon: "⊞" },
  { href: "/reading", label: "Lecture", icon: "📰" },
  { href: "/listening", label: "Écoute", icon: "🎧" },
  { href: "/vocabulary", label: "Vocabulaire", icon: "📚" },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar — md and up */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-gray-200 px-4 py-8 fixed top-0 left-0 z-10">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="text-2xl">🇫🇷</span>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">Français</p>
            <p className="text-xs text-gray-400">Niveau B1–B2</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Bottom nav — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 flex">
        {NAV_ITEMS.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
              pathname === href ? "text-blue-700" : "text-gray-500"
            }`}
          >
            <span className="text-xl mb-0.5">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
