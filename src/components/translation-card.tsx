import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface TranslationCardProps {
  selectedText: string
}

export function TranslationCard({ selectedText }: TranslationCardProps) {
  const { data: translation, isFetching } = useQuery({
    queryKey: ["translation", selectedText],
    queryFn: async () => {
      const res = await sendToBackground({
        name: "translate",
        body: {
          selectedText,
          pageContent: document.body.innerText
        }
      })

      return res
    }
  })

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <h4 className="font-bold text-lg mb-2">Translation</h4>
        {isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <p className="text-muted-foreground">{translation}</p>
        )}
      </div>
    </div>
  )
}
