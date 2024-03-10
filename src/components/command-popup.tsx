import { InfoCard } from "@/components/info-card"
import { Popup } from "@/components/popup"
import { SummaryCard } from "@/components/summary-card"
import { CircleHelp, Sparkles } from "lucide-react"
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

    if (selectedCommand === "explain") {
      return (
        <Popup ref={ref} style={style} onClose={onClose}>
          <InfoCard selectedText={selectedText} />
        </Popup>
      )
    }

    if (selectedCommand === "summarize") {
      return (
        <Popup ref={ref} style={style} onClose={onClose}>
          <SummaryCard selectedText={selectedText} />
        </Popup>
      )
    }

    return (
      <div
        ref={ref}
        style={style}
        className="bg-gray-200 p-1 rounded-lg w-[260px] cursor-pointer text-sm max-h-[400px] overflow-y-auto">
        {/* <X
          className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-foreground"
          onClick={onClose}
        /> */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedCommand("explain")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-md">
            <CircleHelp className="h-5 w-5" />
            Explain
          </button>
          <button
            onClick={() => setSelectedCommand("summarize")}
            className="flex items-center gap-3 py-1.5 px-3 hover:bg-gray-300 rounded-md">
            <Sparkles className="h-5 w-5" />
            Summarize
          </button>
        </div>
      </div>
    )
  }
)
