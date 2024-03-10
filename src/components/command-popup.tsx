import { ExplanationCard } from "@/components/explanation-card"
import { InfoCard } from "@/components/info-card"
import { Popup } from "@/components/popup"
import { SummaryCard } from "@/components/summary-card"
import { TranslationCard } from "@/components/translation-card"
import { CircleHelp, Globe, Sparkles, Telescope } from "lucide-react"
import { forwardRef, useState, type RefObject } from "react"

interface CommandPopupProps {
  selectedText: string
  style: React.CSSProperties
  onClose: () => void
}

export const CommandPopup = forwardRef(
  (
    { selectedText, onClose, style }: CommandPopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const [selectedCommand, setSelectedCommand] = useState<string | null>(null)

    if (selectedCommand) {
      return (
        <Popup ref={ref} style={style} onClose={onClose}>
          {selectedCommand === "explore" && (
            <InfoCard selectedText={selectedText} />
          )}
          {selectedCommand === "summarize" && (
            <SummaryCard selectedText={selectedText} />
          )}
          {selectedCommand === "explain" && (
            <ExplanationCard selectedText={selectedText} />
          )}
          {selectedCommand === "translate" && (
            <TranslationCard selectedText={selectedText} />
          )}
        </Popup>
      )
    }

    return (
      <div
        ref={ref}
        style={style}
        className="bg-gray-200 p-1.5 rounded-[0.8rem] overflow-hidden w-[260px] cursor-pointer text-sm max-h-[400px] overflow-y-auto">
        {/* <X
          className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-foreground"
          onClick={onClose}
        /> */}
        <div className="flex flex-col gap-2 overflow-hidden">
          <button
            onClick={() => setSelectedCommand("explore")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-[0.6rem]">
            <Telescope className="h-5 w-5" />
            Explore
          </button>
          <button
            onClick={() => setSelectedCommand("explain")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-[0.6rem]">
            <CircleHelp className="h-5 w-5" />
            Explain in simpler words
          </button>
          <button
            onClick={() => setSelectedCommand("summarize")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-[0.6rem]">
            <Sparkles className="h-5 w-5" />
            Summarize
          </button>
          <button
            onClick={() => setSelectedCommand("translate")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-[0.6rem]">
            <Globe className="h-5 w-5" />
            Translate to Italian
          </button>
        </div>
      </div>
    )
  }
)
