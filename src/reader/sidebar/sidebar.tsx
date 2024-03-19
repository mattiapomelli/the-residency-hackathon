import { BulletPointsView } from "@/reader/sidebar/bullet-points-view"
import { ChatView } from "@/reader/sidebar/chat-view"
import { SearchView } from "@/reader/sidebar/search-view"
import { SummaryView } from "@/reader/sidebar/summary-view"
import { TranslationView } from "@/reader/sidebar/translation-view"
import { SidebarView, type Article } from "@/types"
import { X } from "lucide-react"

interface SidebarProps {
  article: Article
  view: SidebarView
  selectedText: string
  language?: string
  onClose: () => void
}

export function Sidebar({
  selectedText,
  view,
  article,
  language,
  onClose
}: SidebarProps) {
  return (
    <aside className="relative flex h-screen w-[400px] flex-col overflow-auto border-l py-10">
      <button
        onClick={() => onClose()}
        className="absolute right-4 top-4 flex items-center justify-center rounded-md p-2 hover:bg-card">
        <X className="size-5" />
      </button>
      {view === SidebarView.Search && (
        <SearchView article={article} query={selectedText} />
      )}
      {view === SidebarView.Summary && <SummaryView text={selectedText} />}
      {view === SidebarView.BulletPoints && (
        <BulletPointsView text={selectedText} />
      )}
      {view === SidebarView.Translate && (
        <TranslationView text={selectedText} language={language} />
      )}
      {view === SidebarView.Chat && <ChatView article={article} />}
    </aside>
  )
}
