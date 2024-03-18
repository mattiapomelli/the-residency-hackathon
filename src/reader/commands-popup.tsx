import { LanguagesMenu } from "@/components/popups/commands-popup/languages-menu"
import { Popup } from "@/components/ui/popup"
import { cn } from "@/lib/utils"
import { SidebarView, type SidebarStatus } from "@/types"
import { Globe, List, Sparkles, Telescope } from "lucide-react"
import { useState } from "react"

enum PopupView {
  Menu = "menu",
  Explore = "explore",
  Summarize = "summarize",
  Explain = "explain",
  Translate = "translate",
  BulletPoints = "bullet-points",
  LanguageMenu = "language-menu"
}

interface CommandsPopupProps {
  selectedText: string
  style: React.CSSProperties
  onClose: () => void
  setSidebarStatus: (status: SidebarStatus) => void
}

export function CommandsPopup({
  selectedText,
  onClose,
  style,
  setSidebarStatus
}: CommandsPopupProps) {
  const [view, setView] = useState(PopupView.Menu)

  const onBack = () => {
    setView(PopupView.Menu)
  }

  const onSelectLanguage = (language: string) => {
    setSidebarStatus({
      show: true,
      view: SidebarView.Translate,
      selectedText,
      language
    })
    onClose()
  }

  const onSelectCommand = (view: SidebarView) => {
    setSidebarStatus({
      show: true,
      view,
      selectedText
    })
    onClose()
  }

  return (
    <Popup
      style={style}
      onClose={onClose}
      className={cn({
        "max-w-[300px] p-2":
          view === PopupView.Menu || view === PopupView.LanguageMenu
      })}>
      {view === PopupView.Menu && (
        <div className="flex flex-col gap-2 overflow-hidden">
          <button
            onClick={() => onSelectCommand(SidebarView.Search)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <Telescope className="size-5" />
            Search
          </button>
          <button
            onClick={() => onSelectCommand(SidebarView.Summary)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <Sparkles className="size-5" />
            Summarize
          </button>
          <button
            onClick={() => onSelectCommand(SidebarView.BulletPoints)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <List className="size-5" />
            Turn into Bullet points
          </button>
          <button
            onClick={() => setView(PopupView.LanguageMenu)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <Globe className="size-5" />
            Translate
          </button>
        </div>
      )}
      {view === PopupView.LanguageMenu && (
        <LanguagesMenu onBack={onBack} onSelect={onSelectLanguage} />
      )}
    </Popup>
  )
}
