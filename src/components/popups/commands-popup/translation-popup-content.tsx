import { BackButton } from "@/components/back-button"
import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface TranslationPopupContentProps {
  selectedText: string
  language: string
  onBack: () => void
}

export function TranslationPopupContent({
  selectedText,
  language,
  onBack
}: TranslationPopupContentProps) {
  const { data: translation, isFetching } = useQuery({
    queryKey: ["translation", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "translate",
        body: {
          selectedText,
          pageContent: document.body.innerText,
          language
        }
      })

      return res
    }
  })

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <BackButton onClick={onBack} />
      </div>
      {isFetching ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <p>{translation}</p>
      )}
    </div>
  )
}
