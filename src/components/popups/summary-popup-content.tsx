import { BackButton } from "@/components/back-button"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"

import { sendToBackground } from "@plasmohq/messaging"

interface SummaryPopupContentProps {
  selectedText: string
  onBack: () => void
}

export function SummaryPopupContent({
  selectedText,
  onBack
}: SummaryPopupContentProps) {
  const { data: summary, isPending } = useQuery({
    queryKey: ["summary", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "summarize",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
    },
    staleTime: Infinity
  })

  return (
    <div className="flex gap-4 px-4 flex-col">
      <div>
        <BackButton onClick={onBack} />
      </div>
      {isPending ? (
        <div className="flex justify-center w-full py-4">
          <Spinner />
        </div>
      ) : (
        <p>{summary}</p>
      )}
    </div>
  )
}
