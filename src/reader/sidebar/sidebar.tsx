import { SearchView } from "@/reader/sidebar/search-view"
import { SidebarView, type Article } from "@/types"

interface SidebarProps {
  article: Article
  view: SidebarView
  selectedText: string
}

export function Sidebar({ selectedText, view, article }: SidebarProps) {
  return (
    <aside className="w-[400px] border-l px-4 py-10">
      {view === SidebarView.Search && (
        <SearchView article={article} query={selectedText} />
      )}
    </aside>
  )
}
