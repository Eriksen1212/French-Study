import ArticleList from "@/components/reading/ArticleList";

export default function ReadingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lecture 📰</h1>
        <p className="text-gray-500 text-sm mt-1">
          Lisez des articles en français. Cliquez sur les mots inconnus pour les
          sauvegarder dans votre vocabulaire.
        </p>
      </div>
      <ArticleList />
    </div>
  );
}
