import { BulletPointsPopupContent } from "@/components/popups/bullet-points-popup-content"
import { ExplorePopupContent } from "@/components/popups/explore-popup-content"
import { SimpleExplanationPopupContent } from "@/components/popups/simple-explanation-popup-content"
import { SummaryPopupContent } from "@/components/popups/summary-popup-content"
import { TranslationPopupContent } from "@/components/popups/translation-popup-content"
import { Popup } from "@/components/ui/popup"
import { cn } from "@/lib/utils"
import { CircleHelp, Globe, List, Sparkles, Telescope } from "lucide-react"
import { forwardRef, useState, type RefObject } from "react"

interface CommandsPopupProps {
  selectedText: string
  style: React.CSSProperties
  onClose: () => void
}

export const CommandsPopup = forwardRef(
  (
    { selectedText, onClose, style }: CommandsPopupProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const [selectedCommand, setSelectedCommand] = useState<string | null>(null)

    const onBack = () => {
      setSelectedCommand(null)
    }

    return (
      <Popup
        ref={ref}
        style={style}
        onClose={onClose}
        className={cn({ "max-w-[300px] p-2": !selectedCommand })}>
        {selectedCommand ? (
          <>
            {selectedCommand === "explore" && (
              <ExplorePopupContent selectedText={selectedText} />
            )}
            {selectedCommand === "summarize" && (
              <SummaryPopupContent
                selectedText={selectedText}
                onBack={onBack}
              />
            )}
            {selectedCommand === "explain" && (
              <SimpleExplanationPopupContent
                selectedText={selectedText}
                onBack={onBack}
              />
            )}
            {selectedCommand === "translate" && (
              <TranslationPopupContent
                selectedText={selectedText}
                onBack={onBack}
              />
            )}
            {selectedCommand === "bullet-points" && (
              <BulletPointsPopupContent
                selectedText={selectedText}
                onBack={onBack}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2 overflow-hidden">
            <button
              onClick={() => setSelectedCommand("explore")}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-card rounded-[0.6rem]">
              <Telescope className="h-5 w-5" />
              Explore
            </button>
            <button
              onClick={() => setSelectedCommand("summarize")}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-card rounded-[0.6rem]">
              <Sparkles className="h-5 w-5" />
              Summarize
            </button>
            <button
              onClick={() => setSelectedCommand("bullet-points")}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-card rounded-[0.6rem]">
              <List className="h-5 w-5" />
              Turn into Bullet points
            </button>
            <button
              onClick={() => setSelectedCommand("explain")}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-card rounded-[0.6rem]">
              <CircleHelp className="h-5 w-5" />
              Explain in simpler words
            </button>
            <button
              onClick={() => setSelectedCommand("translate")}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-card rounded-[0.6rem]">
              <Globe className="h-5 w-5" />
              Translate to Italian
            </button>
          </div>
        )}
      </Popup>
    )
  }
)
