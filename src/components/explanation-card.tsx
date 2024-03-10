import { Spinner } from "@/components/ui/spinner"
import { useQuery } from "@tanstack/react-query"

import { sendToBackground } from "@plasmohq/messaging"

interface ExplanationCardProps {
  selectedText: string
}

export function ExplanationCard({ selectedText }: ExplanationCardProps) {
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
    <div className="flex gap-4 flex-col">
      <div>
        <h4 className="font-bold text-lg mb-2">Explanation</h4>
        {isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <p className="text-muted-foreground">{explanation}</p>
        )}
      </div>
    </div>
  )
}
