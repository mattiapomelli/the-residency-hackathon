import type { GoogleSearchResponse } from "@/lib/serp"

export interface PopupInfo {
  explanation: string
  googleResults: GoogleSearchResponse
}

export interface ArticleInfo {
  byline: string
  content: string
  excerpt: string
  lang: string | null
  dir: string | null
  lenght: number
  publishedTime: string
  siteName: string
  textContent: string
  title: string
}
