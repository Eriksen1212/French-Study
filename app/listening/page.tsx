import VideoGrid from "@/components/listening/VideoGrid";
import NotesEditor from "@/components/listening/NotesEditor";

export default function ListeningPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Écoute 🎧</h1>
        <p className="text-gray-500 text-sm mt-1">
          Regardez des vidéos en français, puis entraînez-vous avec la dictée ou le
          shadowing.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Vidéos recommandées
        </h2>
        <VideoGrid />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Dictée &amp; Shadowing
        </h2>
        <NotesEditor />
      </section>
    </div>
  );
}
