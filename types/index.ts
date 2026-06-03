export interface VocabularyWord {
  id: string;
  word: string;
  context: string;
  source: string;
  savedAt: number;
  memorized: boolean;
}

export interface Article {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  channel: string;
  level: "A2" | "B1" | "B2" | "C1";
  description: string;
}
