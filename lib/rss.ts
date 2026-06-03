import { XMLParser } from "fast-xml-parser";
import type { Article } from "@/types";

export const RSS_FEEDS = [
  { name: "France 24", url: "https://www.france24.com/fr/rss", category: "Actualité" },
  { name: "RFI Français Facile", url: "https://www.rfi.fr/fr/podcasts/journal-en-francais-facile/feed", category: "Apprentissage" },
  { name: "Le Monde", url: "https://www.lemonde.fr/rss/une.xml", category: "Actualité" },
  { name: "TV5MONDE", url: "https://information.tv5monde.com/info/rss.xml", category: "Actualité" },
] as const;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "#text" in value) {
    return String((value as Record<string, unknown>)["#text"] ?? "");
  }
  return String(value ?? "");
}

function extractLink(item: Record<string, unknown>): string {
  const link = item.link;
  if (typeof link === "string") return link;
  if (typeof link === "object" && link !== null) {
    const obj = link as Record<string, unknown>;
    if (obj["@_href"]) return String(obj["@_href"]);
    if (obj["#text"]) return String(obj["#text"]);
  }
  const guid = item.guid;
  if (typeof guid === "string" && guid.startsWith("http")) return guid;
  if (typeof guid === "object" && guid !== null) {
    const gObj = guid as Record<string, unknown>;
    if (gObj["#text"]) return String(gObj["#text"]);
  }
  return "";
}

export async function parseRSSFeed(url: string, sourceName: string): Promise<Article[]> {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 FrenchStudyApp/1.0" },
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    isArray: (name) => ["item", "entry"].includes(name),
  });

  const result = parser.parse(xml);

  const items: Record<string, unknown>[] =
    result?.rss?.channel?.item ??
    result?.feed?.entry ??
    [];

  return items.slice(0, 12).map((item) => ({
    title: stripHtml(extractText(item.title)),
    description: stripHtml(
      extractText(item.description ?? item.summary ?? item["content:encoded"] ?? "")
    ).slice(0, 500),
    link: extractLink(item),
    pubDate: extractText(item.pubDate ?? item.published ?? item.updated ?? ""),
    source: sourceName,
  }));
}
