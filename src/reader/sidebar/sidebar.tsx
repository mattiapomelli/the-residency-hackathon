import { BulletPointsView } from "@/reader/sidebar/bullet-points-view"
import { SearchView } from "@/reader/sidebar/search-view"
import { SummaryView } from "@/reader/sidebar/summary-view"
import { TranslationView } from "@/reader/sidebar/translation-view"
import { SidebarView, type Article } from "@/types"

interface SidebarProps {
  article: Article
  view: SidebarView
  selectedText: string
  language?: string
}

export function Sidebar({
  selectedText,
  view,
  article,
  language
}: SidebarProps) {
  return (
    <aside className="h-screen w-[400px] overflow-auto border-l px-4 py-10">
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
    </aside>
  )
}
