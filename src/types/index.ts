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

export interface Article {
  content: string
  title: string
  textContent: string
  publishedTime?: string | null
  byline?: string | null
  readingTime: string
}

export enum SidebarView {
  Chat = "chat",
  Search = "search",
  Summary = "summary",
  BulletPoints = "bullet-points",
  Translate = "translate"
}

export interface SidebarStatus {
  show: boolean
  view: SidebarView
  selectedText: string
  language?: string
}
