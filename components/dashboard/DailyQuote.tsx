import { getDailyQuote } from "@/lib/quotes";

export default function DailyQuote() {
  const quote = getDailyQuote();

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 text-white">
      <p className="text-xs uppercase tracking-widest text-blue-200 mb-3 font-medium">
        Citation du jour
      </p>
      <blockquote className="text-lg font-medium leading-relaxed mb-2">
        «&nbsp;{quote.quote}&nbsp;»
      </blockquote>
      <p className="text-sm text-blue-200 italic mb-3">{quote.translation}</p>
      <p className="text-sm text-blue-300 font-medium">— {quote.author}</p>
    </div>
  );
}
