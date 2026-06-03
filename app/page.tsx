import Link from "next/link";
import DailyQuote from "@/components/dashboard/DailyQuote";
import ProgressStats from "@/components/dashboard/ProgressStats";

const QUICK_LINKS = [
  {
    href: "/reading",
    label: "Lire des articles",
    desc: "Actualités françaises en temps réel",
    icon: "📰",
    color: "bg-blue-500",
  },
  {
    href: "/listening",
    label: "Pratiquer l'écoute",
    desc: "Vidéos YouTube + dictée",
    icon: "🎧",
    color: "bg-purple-500",
  },
  {
    href: "/vocabulary",
    label: "Réviser les mots",
    desc: "Flashcards et liste de vocabulaire",
    icon: "📚",
    color: "bg-green-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bonjour&nbsp;! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">
          Continuez votre apprentissage du français, niveau B1–B2.
        </p>
      </div>

      <DailyQuote />

      <ProgressStats />

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Activités
        </h2>
        <div className="space-y-3">
          {QUICK_LINKS.map(({ href, label, desc, icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div
                className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-xl text-white flex-shrink-0`}
              >
                {icon}
              </div>
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <span className="ml-auto text-gray-300 text-xl">›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
