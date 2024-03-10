const { getJson } = require("serpapi")

export interface GoogleSearchResult {
  displayed_link: string
  favicon: string
  link: string
  position: number
  redirect_link: string
  snippet: string
  snippet_highlighted_words: string[]
  source: string
  title: string
}

export interface GoogleInlineImage {
  source: string
  thumbnail: string
  original: string
  title: string
  source_name: string
}

export interface GoogleSearchResponse {
  organic_results: GoogleSearchResult[]
  inline_images?: GoogleInlineImage[]
}

export async function getGoogleResults(query: string) {
  const results = (await getJson({
    engine: "google",
    api_key: process.env.PLASMO_PUBLIC_SERP_API_KEY,
    q: query
  })) as GoogleSearchResponse

  return results
}
