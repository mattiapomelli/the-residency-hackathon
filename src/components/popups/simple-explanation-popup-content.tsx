import { BackButton } from "@/components/back-button"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface SimpleExplanationPopupContentProps {
  selectedText: string
  onBack: () => void
}

export function SimpleExplanationPopupContent({
  selectedText,
  onBack
}: SimpleExplanationPopupContentProps) {
  const { data: explanation, isFetching } = useQuery({
    queryKey: ["explanation", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "explain",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
    }
  })

  return (
    <div className="flex px-4 gap-4 flex-col">
      <div>
        <BackButton onClick={onBack} />
      </div>
      {isFetching ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <p>{explanation}</p>
      )}
    </div>
  )
}
