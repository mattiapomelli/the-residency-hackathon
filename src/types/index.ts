export interface Article {
  content: string
  title: string
  textContent: string
  publishedTime?: string | null
  byline?: string | null
  readingTime: string
  url: string
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
