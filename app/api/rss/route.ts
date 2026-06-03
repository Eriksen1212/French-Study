import { NextRequest, NextResponse } from "next/server";
import { parseRSSFeed, RSS_FEEDS } from "@/lib/rss";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const index = parseInt(searchParams.get("feed") ?? "0", 10);
  const feed = RSS_FEEDS[index] ?? RSS_FEEDS[0];

  try {
    const articles = await parseRSSFeed(feed.url, feed.name);
    return NextResponse.json({ articles, source: feed.name });
  } catch (err) {
    return NextResponse.json(
      { error: "Impossible de charger le flux RSS.", details: String(err) },
      { status: 500 }
    );
  }
}
