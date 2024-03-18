import { BulletPointsPopupContent } from "@/components/popups/commands-popup/bullet-points-popup-content"
import { LanguagesMenu } from "@/components/popups/commands-popup/languages-menu"
import { SimpleExplanationPopupContent } from "@/components/popups/commands-popup/simple-explanation-popup-content"
import { SummaryPopupContent } from "@/components/popups/commands-popup/summary-popup-content"
import { TranslationPopupContent } from "@/components/popups/commands-popup/translation-popup-content"
import { ExplorePopupContent } from "@/components/popups/explore-popup/explore-popup-content"
import { Popup } from "@/components/ui/popup"
import { cn } from "@/lib/utils"
import { SidebarView, type SidebarStatus } from "@/types"
import { CircleHelp, Globe, List, Sparkles, Telescope } from "lucide-react"
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
  const [language, setLanguage] = useState("English")

  const onBack = () => {
    setView(PopupView.Menu)
  }

  const onSelectLanguage = (language) => {
    setLanguage(language)
    setView(PopupView.Translate)
  }

  return (
    <Popup
      style={style}
      onClose={onClose}
      className={cn({
        "max-w-[300px] p-2":
          view === PopupView.Menu || view === PopupView.LanguageMenu
      })}>
      {view === PopupView.Explore && (
        <ExplorePopupContent selectedText={selectedText} />
      )}
      {view === PopupView.Summarize && (
        <SummaryPopupContent selectedText={selectedText} onBack={onBack} />
      )}
      {view === PopupView.Explain && (
        <SimpleExplanationPopupContent
          selectedText={selectedText}
          onBack={onBack}
        />
      )}
      {view === PopupView.Translate && (
        <TranslationPopupContent
          selectedText={selectedText}
          onBack={onBack}
          language={language}
        />
      )}
      {view === PopupView.BulletPoints && (
        <BulletPointsPopupContent selectedText={selectedText} onBack={onBack} />
      )}
      {view === PopupView.Menu && (
        <div className="flex flex-col gap-2 overflow-hidden">
          <button
            onClick={() =>
              setSidebarStatus({
                show: true,
                view: SidebarView.Search,
                selectedText
              })
            }
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <Telescope className="size-5" />
            Search
          </button>
          <button
            onClick={() => setView(PopupView.Summarize)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <Sparkles className="size-5" />
            Summarize
          </button>
          <button
            onClick={() => setView(PopupView.BulletPoints)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <List className="size-5" />
            Turn into Bullet points
          </button>
          <button
            onClick={() => setView(PopupView.Explain)}
            className="flex items-center gap-3 rounded-[0.6rem] px-3 py-1.5 hover:bg-card">
            <CircleHelp className="size-5" />
            Explain in simpler words
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
