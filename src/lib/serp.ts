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
  knowledge_graph?: {
    title: string
    type: string
    description: string
  }
}

export async function getGoogleResults(query: string) {
  const results = (await getJson({
    engine: "google",
    api_key: process.env.PLASMO_PUBLIC_SERP_API_KEY,
    q: query
  })) as GoogleSearchResponse

  return results
}

export interface GoogleImageSearchResult {
  position: number
  thumbnail: string
  original: string
  original_width: number
  original_height: number
  title: string
  source: string
}

export interface GoogleImageSearchResponse {
  images_results: GoogleImageSearchResult[]
}

export async function getGoogleImages(query: string) {
  const results = (await getJson({
    engine: "google_images",
    api_key: process.env.PLASMO_PUBLIC_SERP_API_KEY,
    q: query,
    limit: 10
  })) as GoogleSearchResponse

  return results
}
